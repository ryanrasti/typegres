import { exoEval } from "./index";

// ExoEval wire protocol:
//   client -> server: a JS expression string (exoeval subset), specifically
//     assuming a single free variable `api` (the cap root)
//  server -> client: JSON-serialized return value
// Additional notes:
//   - captures (variables from the client's scope) are inlined as `const x = <JSON-serialized value>;`
//     before a final IIFE declaration against the cap root.
//   - safeStringify (vs raw JSON.stringify) guards against accidentally serializing class instances,
//     which would leak all their own-enumerable fields into the wire. Only plain objects, arrays, and
//     primitives are allowed to reach the wire.
//
// TODO(framework): error envelope. Wrap responses as {ok: true, value} |
// {ok: false, error: {name, message, stack?}} so server errors propagate
// to the client with class + stack preserved (optional pass-through).

export type RawChannel = (message: string) => Promise<string>;

export class RpcClient<A> {
    private channel: RawChannel;

    constructor(channel: RawChannel) {
        this.channel = channel;
    }

    async run<R, C extends object = {}>(fn: (api: A, captures: C) => R, captures: C = {} as C) {
        const fnString = fn.toString();
        // Captures are passed as the IIFE's second argument so callers can
        // destructure (`(api, { minId }) => ...`). Inlining as `const`s
        // earlier broke under bundlers that rename outer-scope bindings:
        // SWC renames a function-parameter `token` to `token1` if a closure
        // captures it lexically, but the wire still ships the *captures
        // map* keyed by the original name — closure references resolve to
        // a `token1` that doesn't exist. Passing captures explicitly
        // sidesteps that: the closure's parameter name is whatever the
        // function declaration says, and bundlers don't rename it.
        // safeStringify rather than JSON.stringify so a class-instance
        // capture fails loud rather than leaking instance fields.
        const asString = `(${fnString})(api, ${safeStringify(captures)})`;
        const response = await this.channel(asString);
        return JSON.parse(response);
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
  async (code: string): Promise<string> => {
    const result = await exoEval(code, { api });
    return safeStringify(result);
  };
