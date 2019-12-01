# svelte-backed-store

Provides svelte stores backed by localStorage or sessionStorage.

## Getting Started (the easy way)

Install the package...

```bash
npm install svelte-backed-store
```

...and import the polyfill in your `stores.js`...

```js
import "svelte-backed-store/polyfill";
```

...and use the store method on localStorage or sessionStorage:

```js
export const myStore = localStorage.store("myKey", "myInitialValue");
```

## Getting Started (the slightly harder way)

Install the package...

```bash
npm install svelte-backed-store
```

...and import it in your `stores.js`...

```js
import { backedStore } from "svelte-backed-store";
```

...then bind backedStore to any Storage instance (e.g. localStorage or sessionStorage)...

```js
const localStore = backedStore.bind(localStorage);
```

...and use the store:

```js
export const myStore = localStore("myKey", "myInitialValue");
```

## For use in Sapper

When using the polyfill version, it includes a simple Storage polyfill for localStorage and sessionStorage on the server-side.

As such, it should work just fine in any Sapper project.

Without the polyfill version, you can use Storage exported from this project to create a localStorage/sessionStorage for the server-side.

```js
import { globals } from "svelte/internal";
import { Storage, backedStore } from "svelte-backed-store";

if (typeof localStorage === "undefined") {
    globals.localStorage = new Storage();
}
const localStore = backedStore.bind(globals.localStorage);

export const myStore = localStore("myKey", "myInitialValue");
```

## Readonly stores

To create a readonly store call `toReadOnly`.

```js
import "svelte-backed-store/polyfill";
import { toReadOnly } from "svelte-backed-store";
export const myStore = toReadOnly(localStorage.store("myKey", "myInitialValue"));
```

## Development

This project is very simple, but pull requests and issue reports are welcome.

## License

[MIT](LICENSE)