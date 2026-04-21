// Browser shim for Node's AsyncLocalStorage. Same contract, single slot of
// context — no per-async-chain isolation, which is fine for the playground:
// it runs one query at a time with no cross-async context sharing.
export class AsyncLocalStorage<T> {
  #val: T | undefined;

  getStore(): T | undefined {
    return this.#val;
  }

  run<R>(val: T, fn: () => R): R {
    const prev = this.#val;
    this.#val = val;
    try { return fn(); } finally { this.#val = prev; }
  }
}
