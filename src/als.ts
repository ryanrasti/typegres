// Node's AsyncLocalStorage. The browser variant lives in als-browser.ts and
// is selected via the `#als` subpath import in package.json.
export { AsyncLocalStorage } from "node:async_hooks";
