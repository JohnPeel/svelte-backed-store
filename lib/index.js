~(function() {
  if (
    typeof window === "undefined" &&
    (typeof sessionStorage === "undefined" ||
      typeof localStorage === "undefined")
  ) {
    class Storage {
      get length() {
        return this._data.size;
      }

      getItem(keyName) {
        keyName = String(keyName);
        return this._data.has(keyName) ? String(this._data.get(keyName)) : null;
      }

      setItem(keyName, keyValue) {
        this._data.set(String(keyName), String(keyValue));
      }

      removeItem(keyName) {
        this._data.delete(keyName);
      }

      clear() {
        this._data.clear();
      }

      key(index) {
        return Array.from(this._data.keys())[index];
      }
    }

    const proxyHandler = {
      set(target, property, value, _receiver) {
        if (Object.getPrototypeOf(target).hasOwnProperty(property))
          target[property] = value;
        else target.setItem(property, value);
        return true;
      },
      get(target, property, _receiver) {
        if (Object.getPrototypeOf(target).hasOwnProperty(property))
          return target[property];
        return target.getItem(property) || undefined;
      }
    };

    if (typeof localStorage === "undefined") {
      global.LocalStorage = Storage;
      global.LocalStorage.prototype._data = new Map();
      global.localStorage = new Proxy(new LocalStorage(), proxyHandler);
    }

    if (typeof sessionStorage === "undefined") {
      global.SessionStorage = Storage;
      global.SessionStorage.prototype._data = new Map();
      global.sessionStorage = new Proxy(new SessionStorage(), proxyHandler);
    }
  }

  const writable = require("svelte/store").writable;

  function backedStore(keyName, defaultValue) {
    const { subscribe, set, update } = writable(
      JSON.parse(this.getItem(keyName)) || defaultValue
    );
    subscribe(value => this.setItem(keyName, JSON.stringify(value)));

    return {
      subscribe,
      set,
      update
    };
  }

  Object.getPrototypeOf(localStorage).store = backedStore;
  Object.getPrototypeOf(sessionStorage).store = backedStore;
})();
