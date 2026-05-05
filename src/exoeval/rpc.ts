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

// Single-method RPC: the closure's static return type picks the shape.
// If it (or its eventual Promise resolution) is an iterable / async-
// iterable, `run` returns an AsyncIterable<U>; otherwise Promise<U>.
// At runtime the returned object satisfies both interfaces — `await`
// resolves to the first value, `for await` yields every value — but
// TS exposes only the appropriate one so callers can't accidentally
// await a stream and get just the first chunk.
type Awaited1<T> = T extends PromiseLike<infer U> ? U : T;
type RunResult<R> =
    Awaited1<R> extends AsyncIterable<infer U> ? AsyncIterable<U>
    : Promise<Awaited1<R>>;

export class RpcClient<A> {
    private channel: RawChannel;

    constructor(channel: RawChannel) {
        this.channel = channel;
    }

    run<R, C extends object = {}>(
        fn: (api: A, captures: C) => R,
        captures: C = {} as C,
    ): RunResult<R> {
        const fnString = fn.toString();
        // Captures are passed as the IIFE's second argument so callers can
        // destructure (`(api, { minId }) => ...`). Inlining as `const`s
        // earlier broke under bundlers that rename outer-scope bindings.
        // safeStringify rather than JSON.stringify so a class-instance
        // capture fails loud rather than leaking instance fields.
        const asString = `(${fnString})(api, ${safeStringify(captures)})`;
        const iterable = this.#stream(asString);

        // Hybrid: thenable + async iterable. The static return type
        // narrows to one or the other; the runtime supports both.
        return {
            [Symbol.asyncIterator]: () => iterable[Symbol.asyncIterator](),
            then: <T1, T2>(
                onFulfilled?: ((v: unknown) => T1 | PromiseLike<T1>) | null | undefined,
                onRejected?: ((r: unknown) => T2 | PromiseLike<T2>) | null | undefined,
            ): Promise<T1 | T2> => {
                const first = (async () => {
                    for await (const v of iterable) return v;
                    throw new Error("RpcClient.run: channel produced no values");
                })();
                return first.then(onFulfilled, onRejected);
            },
        } as unknown as RunResult<R>;
    }

    async *#stream(code: string): AsyncIterable<unknown> {
        for await (const chunk of this.channel(code)) {
            yield JSON.parse(chunk);
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
    // Only async iterables count as "streams." Plain arrays and other
    // sync iterables are *complete* values that happen to be iterable;
    // streaming them item-by-item would silently change the shape of
    // one-shot results (e.g. `qb.execute(db)` returns rows[] — should
    // yield once, not once per row). Async generators, AsyncIterables
    // (db.live, custom subscriptions) are the explicit streaming shape.
    if (
      result != null &&
      typeof result === "object" &&
      Symbol.asyncIterator in (result as object)
    ) {
      for await (const item of result as AsyncIterable<unknown>) {
        yield safeStringify(item);
      }
      return;
    }
    yield safeStringify(result);
  };
