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

    async run<R>(fn: (api: A) => R, captures: object = {}) {
        const fnString = fn.toString();
        const captureAssignments = []
        for (const [key, value] of Object.entries(captures)) {
            if (key === 'api') {
                throw new Error("Capture keys cannot be named 'api'");
            }
            // `captures` should always be a literal object
            //  of the form { a, b, c } so all keys should be
            //  valid identifiers. safeStringify rather than JSON.stringify
            //  so a class-instance capture fails loud rather than leaking
            //  its instance fields into the wire.
            captureAssignments.push(`const ${key} = ${safeStringify(value)};\n`);
        }
        // Wire is just the code string — captures are inlined as `const x = ...;`
        // declarations above the IIFE, so there's nothing else to send. The
        // server's job is to evaluate this string with `api` bound in scope.
        const asString = `${captureAssignments.join('')}\n(${fnString})(api)`;
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
const safeStringify = (value: unknown): string =>
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
