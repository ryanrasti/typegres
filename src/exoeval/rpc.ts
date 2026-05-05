import { exoEval } from "./index";

// ExoEval wire protocol:
//   client -> server: a JS expression string (exoeval subset), assuming
//     a single free variable `api` (the cap root) and a `captures` object
//     as the closure's second arg.
//   server -> client: AsyncIterable of JSON-serialized chunks. One-shot
//     calls yield exactly once; streaming calls (closure returns an
//     iterable / async-iterable like `db.live(qb)`) yield once per item.
// Notes:
//   - captures are passed as the IIFE's second argument so destructuring
//     works (`(api, { minId }) => ...`) and bundler-renamed parameters
//     don't desync from the JSON capture map.
//   - safeStringify (vs raw JSON.stringify) guards against accidentally
//     serializing class instances, which would leak all their own-
//     enumerable fields. Only plain objects, arrays, and primitives reach
//     the wire.
//
// TODO(framework): error envelope. Wrap responses as {ok: true, value} |
// {ok: false, error: {name, message, stack?}} so server errors propagate
// to the client with class + stack preserved (optional pass-through).

export type RawChannel = (message: string) => AsyncIterable<string>;

export class RpcClient<A> {
    private channel: RawChannel;

    constructor(channel: RawChannel) {
        this.channel = channel;
    }

    // One-shot: take the first yielded value from the channel and return
    // it as a Promise. Errors out if the channel produces nothing.
    async run<R, C extends object = {}>(fn: (api: A, captures: C) => R, captures: C = {} as C): Promise<R> {
        for await (const v of this.runIter(fn, captures)) {
            return v as R;
        }
        throw new Error("RpcClient.run: channel produced no values");
    }

    // Streaming: yield each value the channel emits. Used when the
    // closure returns an iterable / async-iterable (e.g. `db.live(qb)`).
    async *runIter<R, C extends object = {}>(fn: (api: A, captures: C) => R, captures: C = {} as C): AsyncIterable<R> {
        const fnString = fn.toString();
        const asString = `(${fnString})(api, ${safeStringify(captures)})`;
        for await (const chunk of this.channel(asString)) {
            yield JSON.parse(chunk) as R;
        }
    }
}

/**
 * JSON.stringify with a guard against accidentally serializing class instances.
 *
 * The default JSON.stringify walks every own-enumerable string-keyed property,
 * which means TS-`private` fields (which are runtime-public, only the type
 * system hides them), class fields, and other instance state can leak into
 * the wire response.
 * 
 * `safeStringify` throws on any class instance — only plain objects, arrays,
 * and primitives reach the wire.
 */
export const safeStringify = (value: unknown): string =>
  JSON.stringify(value, (_key, val) => {
    if (val !== null && typeof val === "object") {
      const proto = Object.getPrototypeOf(val);
      if (proto !== Object.prototype && proto !== Array.prototype && proto !== null) {
        const name = (proto as { constructor?: { name?: string } } | null)?.constructor?.name ?? "anonymous";
        throw new TypeError(
          `safeStringify: cannot serialize ${name} instance over RPC. Return plain data (or a deserialized row) instead of a class instance.`,
        );
      }
    }
    return val;
  });

/**
 * Build a `RawChannel` that handles RPC calls in-process: parse the code,
 * evaluate it under exoeval with `api` bound to the given root capability,
 * and return the result via safeStringify.
 *
 * Real deployments swap this for a transport that sends the same code string
 * over a wire (HTTP body, WebSocket frame, MessagePort message, etc.) and
 * runs the same evaluate-and-stringify logic on the server end. The contract
 * is: input is a JS expression string, output is a JSON-serialized result.
 */
export const inMemoryChannel = <A>(api: A): RawChannel =>
  async function* (code: string): AsyncIterable<string> {
    const result = await exoEval(code, { api });
    // If the closure returned a (sync or async) iterable, stream its
    // items one at a time; otherwise yield a single value. Strings and
    // class instances (e.g. typegres' Record) deliberately fall through
    // to the single-yield branch even though strings are iterable —
    // safeStringify handles class shapes there.
    if (
      result != null &&
      typeof result === "object" &&
      (Symbol.asyncIterator in (result as object) || Symbol.iterator in (result as object))
    ) {
      for await (const item of result as AsyncIterable<unknown> | Iterable<unknown>) {
        yield safeStringify(item);
      }
      return;
    }
    yield safeStringify(result);
  };
