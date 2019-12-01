class StorageProxyHandler implements ProxyHandler<InternalStorage> {
  get(target: InternalStorage, property: PropertyKey, receiver: any): any {
    if (!Reflect.has(target, property)) {
      return target.getItem(String(property));
    }
    return Reflect.get(target, property, receiver);
  }

  set(target: InternalStorage, property: PropertyKey, value: any, receiver: any): boolean {
    if (!Reflect.has(target, property)) {
      target.setItem(String(property), String(value));
      return true;
    }
    return Reflect.set(target, property, value, receiver);
  }
}

class InternalStorage implements Storage {
  private _data: Map<string, string>;
  public prototype: InternalStorage = InternalStorage.prototype;

  constructor() {
    this._data = new Map();
    return new Proxy<InternalStorage>(this, new StorageProxyHandler());
  }

  get length(): number {
    return this._data.size;
  }

  clear(): void {
    this._data.clear();
  }

  getItem(key: string): string | null {
    return this._data.get(key) || null;
  }

  key(index: number): string | null {
    return Array.from(this._data.keys())[index] || null;
  }

  removeItem(key: string): void {
    this._data.delete(key);
  }

  setItem(key: string, value: string): void {
    this._data.set(key, value);
  }

  [name: string]: any;
}

export { InternalStorage as Storage };