import { getLocalTarget, RpcStub, RpcTarget } from "capnweb";
import { getTool } from "../exoeval/tool";
import { isPlainObject, isThenable } from "../util";

// --- capnweb shim for @expose classes ---
//
// Adapts typegres's @expose capability vocabulary to capnweb RPC. A class instance crossing
// the RPC boundary is wrapped in a Proxy over a capnweb RpcTarget where ONLY @expose-marked
// members are visible, presented the way capnweb requires (as prototype properties). The
// wrapping propagates recursively through return values, promises, arrays and plain objects,
// so an @expose method returning another capability object (e.g. a query builder) composes
// over the wire with no per-class glue.
//
// Two directions:
//  - toRpc   (typegres -> wire): wrap instances into capability proxies; wrap functions so
//    their arguments are unwrapped and their results wrapped.
//  - fromRpc (wire -> typegres): unwrap shim proxies back to the raw objects; adapt incoming
//    functions (e.g. capnweb record-replay closures) so typegres can call them with raw
//    values and receive raw values back.
//
// The unwrap direction is explicit: stubs always arrive as stubs, and fromRpc recovers the
// object behind a stub that points back at our side via capnweb's getLocalTarget() (the
// CapabilityServerSet-style escape hatch), then maps shim proxies to their raw objects via
// `proxyTargets`. Genuinely remote stubs pass through as capabilities. Because capnweb
// replays fully-local closures synchronously and getLocalTarget() is synchronous, a chain
// like `.where(row => row.id.eq(5))` runs synchronously end to end.

// --- typed client surface ---
//
// capnweb's own RpcStub<T> typing can't apply here twice over: its
// RpcCompatible constraint rejects the raw classes the shim exists to
// adapt, and its Stubify/MapCallbackValue transforms describe plain
// capnweb — not the shimmed world, where a record-replay closure sees
// raw objects (getLocalTarget + proxyTargets) and calls synchronously.
// ShimStub<T>/doRpc() present that reality to the type system.

// A capability return really is disposable client-side; plain-data
// returns just never use the member. Arrays distribute so capability
// elements (hydrated rows) carry their own disposers.
type Stubbed<R> = R extends readonly (infer E)[] ? Stubbed<E>[] & Disposable
  : R extends object ? R & Disposable
  : R;

// The client-side view of an @expose-shimmed capability: every member
// reachable as an async method/property.
export type ShimStub<T> = Disposable & {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<Stubbed<Awaited<R>>>
    : Promise<Awaited<T[K]>>;
};

/**
 * Typed record-replay entry point: run `fn` as a capnweb closure against the
 * capability behind `stub`. The callback is typed against the UNMANGLED T —
 * which is what a replayed closure actually experiences under the shim — and
 * the result is the callback's own return type. (A capability-returning
 * callback still yields a stub at runtime; unwrap with fromRpc if needed
 * in-process.)
 */
export const doRpc = <T, R>(stub: ShimStub<T>, fn: (api: T) => R): Promise<Stubbed<Awaited<R>>> => {
  const mappable = stub as unknown as { map: (cb: unknown) => unknown };
  return Promise.resolve(mappable.map(fn)) as Promise<Stubbed<Awaited<R>>>;
};

// The Proxy base must be an RpcTarget so capnweb classifies the proxy as a capability
// (pass-by-reference) rather than trying to serialize it by value.
class ExposedCapability extends RpcTarget {}

// obj -> its wrapper (proxy or adapted function); guarantees wrapping is stable per object.
const wrapCache = new WeakMap<object, object>();

// wrapper -> the raw object it was created from, for the unwrap direction.
const proxyTargets = new WeakMap<object, object>();

// Values capnweb serializes natively; passing them through keeps their wire representation.
const isRpcSerializableBuiltin = (value: object): boolean =>
  value instanceof Date ||
  value instanceof Error ||
  value instanceof ArrayBuffer ||
  ArrayBuffer.isView(value) ||
  (typeof Headers !== "undefined" && value instanceof Headers) ||
  (typeof Request !== "undefined" && value instanceof Request) ||
  (typeof Response !== "undefined" && value instanceof Response) ||
  (typeof ReadableStream !== "undefined" && value instanceof ReadableStream) ||
  (typeof WritableStream !== "undefined" && value instanceof WritableStream);

/**
 * typegres -> wire. Wrap a value so it can be handed to capnweb: class instances become
 * capability proxies exposing only their @expose surface; containers and promises are
 * traversed; functions are adapted so args/results cross the boundary correctly.
 */
export const toRpc = (value: unknown): unknown => {
  if (value === null || (typeof value !== "object" && typeof value !== "function")) {
    return value;
  }
  if (value instanceof RpcTarget) {
    // A capability, and capnweb stubs are callable — so this MUST come
    // before the function branch, or an outgoing stub gets adapted as a
    // closure instead of passing through by reference. Covers native
    // capnweb capabilities (stub, promise, hand-written RpcTarget) and
    // our own shim proxies (base is an ExposedCapability extends
    // RpcTarget).
    return value;
  }
  if (typeof value === "function") {
    return wrapOutgoingFunction(value as (...args: unknown[]) => unknown);
  }
  if (isThenable(value)) {
    return value.then(toRpc);
  }
  if (Array.isArray(value)) {
    return value.map(toRpc);
  }
  if (isPlainObject(value)) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, toRpc(v)]));
  }
  if (isRpcSerializableBuiltin(value)) {
    return value;
  }
  return wrapInstance(value);
};

/**
 * wire -> typegres. Unwrap shim proxies back to the raw objects they were created from, and
 * adapt incoming functions (closure replays, callback stubs) so they accept and return raw
 * values. Remote stubs and plain data pass through.
 */
export const fromRpc = (value: unknown): unknown => {
  if (value === null || (typeof value !== "object" && typeof value !== "function")) {
    return value;
  }
  const target = proxyTargets.get(value as object);
  if (target !== undefined) {
    return target;
  }
  if (value instanceof RpcStub) {
    // A stub may point back at an object on our side of the connection -- the peer passing
    // one of our own capabilities back, or a replayed closure returning one. Recover it
    // (usually a shim proxy, which the recursive call maps to its raw object).
    const local = getLocalTarget(value);
    if (local !== undefined) {
      return fromRpc(local);
    }
    // A genuinely remote capability. It's callable, so return here rather than falling
    // through to the function branch -- pass it along by reference, don't adapt it.
    return value;
  }
  if (typeof value === "function") {
    // Reaching here, a plain function is necessarily a delivered record-replay closure:
    // a function passed by reference arrives as an RpcStub (handled above). Adapt it so
    // typegres can call it with raw values.
    return wrapIncomingFunction(value as (...args: unknown[]) => unknown);
  }
  if (value instanceof RpcTarget) {
    // A foreign (non-stub) RpcTarget -- nothing to unwrap.
    return value;
  }
  if (isThenable(value)) {
    return value.then(fromRpc);
  }
  if (Array.isArray(value)) {
    return value.map(fromRpc);
  }
  if (isPlainObject(value)) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fromRpc(v)]));
  }
  return value;
};

// A typegres-side function heading to the wire: callers on the wire side pass wire values and
// expect wire values back.
const wrapOutgoingFunction = (fn: (...args: unknown[]) => unknown): object => {
  const cached = wrapCache.get(fn);
  if (cached) {
    return cached;
  }
  const wrapped = (...args: unknown[]) => toRpc(fn(...args.map(fromRpc)));
  wrapCache.set(fn, wrapped);
  proxyTargets.set(wrapped, fn);
  return wrapped;
};

// Releases retained dup()s of incoming functions once their adapted wrappers are
// garbage-collected (there is no earlier deterministic point: typegres may hold a callback
// indefinitely, e.g. inside a stashed query builder).
const releaseOnGc = new FinalizationRegistry((retained: object) => {
  (retained as Partial<Disposable>)[Symbol.dispose]?.();
});

// A wire-side function heading to typegres: typegres calls it with raw values and expects raw
// values back. Note the replay function of a fully-local capnweb closure returns synchronously,
// and this adapter preserves that (fromRpc only defers via .then for actual thenables).
//
// The function capnweb delivers is only guaranteed valid for the duration of the delivering
// call -- a replayed closure's captures are owned by the call's args payload. But typegres
// retains callbacks past the call (a .select() callback replays at execute() time), so dup()
// the function to extend its lifetime, and release the dup when the wrapper is collected.
const wrapIncomingFunction = (fn: (...args: unknown[]) => unknown): object => {
  const cached = wrapCache.get(fn);
  if (cached) {
    return cached;
  }
  const dupable = fn as { dup?: () => (...args: unknown[]) => unknown };
  const retained = typeof dupable.dup === "function" ? dupable.dup() : fn;
  const wrapped = (...args: unknown[]) => fromRpc(retained(...args.map(toRpc)));
  if (retained !== fn) {
    releaseOnGc.register(wrapped, retained);
  }
  wrapCache.set(fn, wrapped);
  proxyTargets.set(wrapped, fn);
  return wrapped;
};

const wrapInstance = (obj: object): object => {
  const cached = wrapCache.get(obj);
  if (cached) {
    return cached;
  }

  // Method lookups bind a fresh function each time; cache per name so repeated gets (and
  // closure captures) see a stable identity.
  const memberCache = new Map<string, unknown>();

  const lookup = (prop: string): unknown => {
    if (memberCache.has(prop)) {
      return memberCache.get(prop);
    }
    const member = toRpc(getTool(obj, obj, prop));
    if (typeof member === "function") {
      memberCache.set(prop, member);
    }
    return member;
  };

  const proxy = new Proxy(new ExposedCapability(), {
    get(base, prop, receiver) {
      if (typeof prop === "symbol") {
        return Reflect.get(base, prop, receiver);
      }
      return lookup(prop);
    },

    has(base, prop) {
      if (typeof prop === "symbol") {
        return Reflect.has(base, prop);
      }
      return lookup(prop) !== undefined;
    },

    // capnweb refuses to touch own (instance) properties of an RpcTarget over RPC -- members
    // must look like prototype properties. Reporting no own string keys makes every exposed
    // member (including @expose fields) appear prototype-provided.
    getOwnPropertyDescriptor(base, prop) {
      if (typeof prop === "symbol") {
        return Reflect.getOwnPropertyDescriptor(base, prop);
      }
      return undefined;
    },

    // The exposed surface is read-only, but the RPC machinery attaches symbol-keyed metadata
    // (e.g. a Symbol.dispose disposer on delivered results); let symbols through to the base.
    set(base, prop, value, receiver) {
      if (typeof prop === "symbol") {
        return Reflect.set(base, prop, value, receiver);
      }
      return false;
    },

    defineProperty(base, prop, descriptor) {
      if (typeof prop === "symbol") {
        return Reflect.defineProperty(base, prop, descriptor);
      }
      return false;
    },

    deleteProperty() {
      return false;
    },
  });

  wrapCache.set(obj, proxy);
  proxyTargets.set(proxy, obj);
  return proxy;
};
