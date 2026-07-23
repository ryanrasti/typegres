import { z } from "zod";
import { expose } from "../exoeval/tool";

// `.live()` returns a LiveQuery: iterate it locally (`for await`), or call
// `.observe(observer)` to push. AsyncIterables can't cross an RPC boundary,
// but `.observe` is an @expose'd method and functions cross by reference — a
// remote client does `.live().observe({ onNext: byRef(cb) })`, the callback
// arrives as a stub, and every push is a bidirectional RPC back to it.

// onThrow/onReturn are `?: fn | undefined` (not just `?: fn`) so the zod
// z.object below — whose `.optional()` yields `fn | undefined` — satisfies
// this type under exactOptionalPropertyTypes.
export type LiveObserver<Rows> = {
  /**
   * Called with the full rowset on subscribe and after every committed
   * mutation that changes it. The push is awaited before the next
   * iteration runs: a slow consumer gets backpressure (intervening
   * commits coalesce into the next rowset), and a dead one — e.g. a
   * disconnected RPC peer — rejects, tearing the subscription down
   * instead of leaking a watcher.
   */
  onNext: (rows: Rows) => unknown;
  onThrow?: ((error: unknown) => unknown) | undefined;
  /** Called if the live stream ends without error (bus stopped). */
  onReturn?: (() => unknown) | undefined;
};

// Validates observer shape without wrapping the callbacks — they may be RPC
// stubs whose identity (and .dup()) must survive. z.custom is the field
// check because zod v4's `z.function()` is a function factory, not a field
// schema; z.object only rebuilds the container, so the stub refs pass through.
// Typed `(...args: unknown[]) => unknown` so the schema's type is assignable
// to every LiveObserver field — onNext `(rows: Rows) => …`, onThrow
// `(error) => …`, and the zero-arg onReturn `() => …` — which is what lets the
// @expose decorator reconcile the schema with the generic method param.
const zCallback = z.custom<(...args: unknown[]) => unknown>((v) => typeof v === "function");
export const zLiveObserver = z.object({
  onNext: zCallback,
  onThrow: zCallback.optional(),
  onReturn: zCallback.optional(),
});

// A callback that arrived over RPC is only guaranteed alive for the
// duration of the call that delivered it (its args payload is disposed on
// return) — but a subscription outlives that call by design. Stubs expose
// dup() to extend their lifetime; retain via dup() when present, and
// release when the subscription ends. Plain local functions pass through.
type Retained<F> = { fn: F; release: () => void };
const retain = <F extends (...args: never[]) => unknown>(fn: F): Retained<F> => {
  const dupable = fn as { dup?: () => F };
  if (typeof dupable.dup === "function") {
    const duped = dupable.dup();
    return {
      fn: duped,
      release: () => {
        (duped as Partial<Disposable>)[Symbol.dispose]?.();
      },
    };
  }
  return { fn, release: () => {} };
};

/**
 * A live subscription: drives the underlying iterator and pushes each
 * committed rowset into the observer. Construct via `LiveSubscription.start`
 * (the constructor is private); iterating stops on `unsubscribe()` /
 * disposal, when the stream ends, or when a push throws. Generic in `Rows`
 * so the retained callbacks stay typed on the instance — `Rows` appears only
 * in the private machinery, not in the public surface.
 */
export class LiveSubscription<Rows = unknown> {
  readonly #iter: AsyncIterator<Rows>;
  readonly #onNext: Retained<(rows: Rows) => unknown>;
  readonly #onThrow: Retained<(error: unknown) => unknown> | undefined;
  readonly #onReturn: Retained<() => unknown> | undefined;
  #stopped = false;

  private constructor(
    iter: AsyncIterator<Rows>,
    onNext: Retained<(rows: Rows) => unknown>,
    onThrow: Retained<(error: unknown) => unknown> | undefined,
    onReturn: Retained<() => unknown> | undefined,
  ) {
    this.#iter = iter;
    this.#onNext = onNext;
    this.#onThrow = onThrow;
    this.#onReturn = onReturn;
  }

  static start<Rows>(iterable: AsyncIterable<Rows>, observer: LiveObserver<Rows>): LiveSubscription<Rows> {
    const sub = new LiveSubscription(
      iterable[Symbol.asyncIterator](),
      retain(observer.onNext),
      observer.onThrow ? retain(observer.onThrow) : undefined,
      observer.onReturn ? retain(observer.onReturn) : undefined,
    );
    void sub.#run();
    return sub;
  }

  #stop(): void {
    if (!this.#stopped) {
      this.#stopped = true;
      // return() may reject on an already-closed or transport-broken
      // iterator; the subscription is ending regardless, so swallow it
      // rather than surface an unhandled rejection during teardown.
      void Promise.resolve(this.#iter.return?.()).catch(() => {});
    }
  }

  async #run(): Promise<void> {
    try {
      while (true) {
        const r = await this.#iter.next();
        if (this.#stopped || r.done) {
          break;
        }
        await this.#onNext.fn(r.value);
      }
      if (!this.#stopped) {
        await this.#onReturn?.fn();
      }
    } catch (err) {
      this.#stop();
      try {
        await this.#onThrow?.fn(err);
      } catch {
        // Peer already gone; nothing left to notify.
      }
    } finally {
      this.#onNext.release();
      this.#onThrow?.release();
      this.#onReturn?.release();
    }
  }

  @expose()
  unsubscribe(): void {
    this.#stop();
  }

  [Symbol.dispose](): void {
    this.#stop();
  }
}

/**
 * The result of `.live()`: an AsyncIterable (iterate locally) that also
 * exposes `.observe(observer)` (push form — crosses RPC). A class, not a
 * plain object, so the shim wraps it as a capability with `observe`
 * @expose-visible; `[Symbol.asyncIterator]` is symbol-keyed, so it stays
 * local and never crosses the wire.
 */
export class LiveQuery<Rows> {
  readonly #iterable: AsyncIterable<Rows>;

  constructor(iterable: AsyncIterable<Rows>) {
    this.#iterable = iterable;
  }

  [Symbol.asyncIterator](): AsyncIterator<Rows> {
    return this.#iterable[Symbol.asyncIterator]();
  }

  @expose(zLiveObserver)
  observe(observer: LiveObserver<Rows>): LiveSubscription<Rows> {
    return LiveSubscription.start(this.#iterable, observer);
  }
}

export const asObservable = <Rows>(iterable: AsyncIterable<Rows>): LiveQuery<Rows> =>
  new LiveQuery(iterable);
