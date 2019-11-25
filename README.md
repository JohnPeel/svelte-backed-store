# svelte-backed-store

Provides svelte stores backed by localStorage or sessionStorage.

## Getting Started

Install the package...
```bash
npm install svelte-backed-store
```

...and import it in your `stores.js`...
```js
import "svelte-backed-store";
```

...then use the store method on `localStorage` or `sessionStorage`:
```js
export const myStore = localStorage.store("myKey", "myInitilValue");
```

## For use in Sapper

This project includes a simple polyfill for localStorage and sessionStorage for the server side.

As such, it should work just fine in a Sapper project.

## Development

This project is very simple, but pull requests and issue reports are welcome.

## License

[MIT](LICENSE)