import { describe, test, expect } from "vitest";
import { tool } from "./tool";
import { RpcClient, inMemoryChannel } from "./rpc";

// Minimal end-to-end test of the exoeval RPC mechanism, in-memory.
//
// Wire format (defined in `./rpc.ts`):
//   client → server: a JS expression string. The IIFE invokes the user's
//     function with two args — `api` (the cap root) and `captures` (the
//     safeStringified captures object). Callers destructure: `(api, {
//     minId }) => ...`.
//   server → client: safeStringify(returnValue)
//
// `inMemoryChannel` (from `./rpc.ts`) stands in for whatever real transport
// (HTTP, WebSocket, MessagePort) would handle this — it's a same-process
// handler so the tests exercise the protocol without any wire machinery.

class Api {
  @tool.unchecked()
  greet(name: string): string {
    return `Hello, ${name}!`;
  }

  @tool.unchecked()
  add(a: number, b: number): number {
    return a + b;
  }

  @tool.unchecked()
  echo<T>(value: T): T {
    return value;
  }
}

describe("exoeval rpc — in-memory", () => {
  test("call a method on the cap root", async () => {
    const rpc = new RpcClient<Api>(inMemoryChannel(new Api()));
    const result = await rpc.run((api) => api.greet("world"));
    expect(result).toBe("Hello, world!");
  });

  test("captures arrive as the closure's second argument (destructure-friendly)", async () => {
    const rpc = new RpcClient<Api>(inMemoryChannel(new Api()));
    const x = 7;
    const y = 35;
    const result = await rpc.run((api, { x, y }) => api.add(x, y), { x, y });
    expect(result).toBe(42);
  });

  test("echo round-trips JSON-serializable values", async () => {
    const rpc = new RpcClient<Api>(inMemoryChannel(new Api()));
    expect(await rpc.run((api) => api.echo({ a: 1, b: ["x", "y"] }), {})).toEqual({
      a: 1,
      b: ["x", "y"],
    });
  });

  test("capture key 'api' is fine — captures are an object, not a binding", async () => {
    const rpc = new RpcClient<Api>(inMemoryChannel(new Api()));
    const result = await rpc.run(
      (api, { api: shadowed }) => api.greet(shadowed),
      { api: "world" },
    );
    expect(result).toBe("Hello, world!");
  });

  // Demonstrates the safeStringify guard: even though `Leaky` has a method
  // (callable via @tool) that returns the receiver itself, the response
  // serializer refuses to walk a class instance. Without this check, every
  // own-enumerable instance field of `Leaky` would leak into the wire even
  // though only `getSelf` is @tool-marked.
  test("safeStringify refuses to serialize a class instance returned from the wire", async () => {
    class Leaky {
      // TS-private is *not* runtime-private — `secret` is an own enumerable
      // string-keyed property on the instance. JSON.stringify would happily
      // emit it; safeStringify catches the class-instance return.
      private secret = "internals";

      @tool()
      getSelf(): Leaky {
        return this;
      }
    }
    const rpc = new RpcClient<Leaky>(inMemoryChannel(new Leaky()));
    await expect(rpc.run((api) => api.getSelf())).rejects.toThrow(
      /cannot serialize Leaky instance/,
    );
  });

  test("runIter streams items when closure returns an iterable", async () => {
    class StreamApi {
      @tool.unchecked()
      *count(n: number): Iterable<number> {
        for (let i = 0; i < n; i++) yield i;
      }
    }
    const rpc = new RpcClient<StreamApi>(inMemoryChannel(new StreamApi()));
    const out: number[] = [];
    for await (const v of rpc.runIter((api) => api.count(3))) out.push(v);
    expect(out).toEqual([0, 1, 2]);
  });

  test("runIter streams items from an async iterable", async () => {
    class AsyncStreamApi {
      @tool.unchecked()
      async *ticks(n: number): AsyncIterable<{ i: number }> {
        for (let i = 0; i < n; i++) yield { i };
      }
    }
    const rpc = new RpcClient<AsyncStreamApi>(inMemoryChannel(new AsyncStreamApi()));
    const out: { i: number }[] = [];
    for await (const v of rpc.runIter((api) => api.ticks(2))) out.push(v);
    expect(out).toEqual([{ i: 0 }, { i: 1 }]);
  });

  test("run() of an iterable closure takes the first item only", async () => {
    class StreamApi {
      @tool.unchecked()
      *count(n: number): Iterable<number> {
        for (let i = 0; i < n; i++) yield i;
      }
    }
    const rpc = new RpcClient<StreamApi>(inMemoryChannel(new StreamApi()));
    const result = await rpc.run((api) => api.count(5));
    expect(result).toBe(0);
  });

  test("non-@tool methods are not callable from the wire", async () => {
    class Internal {
      @tool()
      open(): string {
        return "ok";
      }
      // No decorator → exoeval refuses to dispatch.
      secret(): string {
        return "leaked";
      }
    }
    const rpc = new RpcClient<Internal>(inMemoryChannel(new Internal() as any));
    expect(await rpc.run((api) => api.open())).toBe("ok");
    await expect(
      rpc.run((api) => api.secret()),
    ).rejects.toThrow();
  });
});
