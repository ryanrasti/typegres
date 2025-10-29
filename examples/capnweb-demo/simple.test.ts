import { RpcStub, RpcTarget, newMessagePortRpcSession } from "capnweb";
import { Int4, select, typegres } from "typegres";
import { describe, expect, it } from "vitest";

// Define our simple RPC interface
class HelloService extends RpcTarget {
  hello(): string {
    return "hello world";
  }

  tg() {
    return typegres({ type: "pglite" });
  }

  async query() {
    const val = select(() => ({ val: Int4.new(1) }));
    console.log("Query result:", await val);
    return val.sql().sql;
  }
}

describe("Cap'n Web Simple Test", () => {
  it("should call hello() and return 'hello world'", async () => {
    // Create a MessageChannel (pair of MessagePorts)
    const channel = new MessageChannel();

    // Initialize the server on port1
    const server = newMessagePortRpcSession(channel.port1, new HelloService());

    // Initialize the client on port2
    const client: RpcStub<HelloService> = newMessagePortRpcSession<HelloService>(channel.port2);

    // Make the RPC call
    const result = await client.hello();

    // Verify the result
    expect(result).toBe("hello world");

    // Clean up
    client[Symbol.dispose]();
    server[Symbol.dispose]();
  });

  it("should call query() and return the expected row", async () => {
    const channel = new MessageChannel();

    const server = newMessagePortRpcSession(channel.port1, new HelloService());
    const client: RpcStub<HelloService> = newMessagePortRpcSession<HelloService>(channel.port2);

    const result = await client.query();

    expect(result).toEqual([{ val: 1 }]);

    // Clean up
    client[Symbol.dispose]();
    server[Symbol.dispose]();
  });

  it("should handle multiple calls", async () => {
    const channel = new MessageChannel();

    // Server with a counter
    class CounterService extends RpcTarget {
      private count = 0;

      increment(): number {
        return ++this.count;
      }

      getCount(): number {
        return this.count;
      }
    }

    const server = newMessagePortRpcSession(channel.port1, new CounterService());
    const client: RpcStub<CounterService> = newMessagePortRpcSession<CounterService>(channel.port2);

    // Make multiple calls
    expect(await client.increment()).toBe(1);
    expect(await client.increment()).toBe(2);
    expect(await client.increment()).toBe(3);
    expect(await client.getCount()).toBe(3);

    // Clean up
    client[Symbol.dispose]();
    server[Symbol.dispose]();
  });

  it("should handle concurrent calls", async () => {
    const channel = new MessageChannel();

    class SlowService extends RpcTarget {
      async delay(ms: number, value: string): Promise<string> {
        await new Promise((resolve) => setTimeout(resolve, ms));
        return value;
      }
    }

    const server = newMessagePortRpcSession(channel.port1, new SlowService());
    const client: RpcStub<SlowService> = newMessagePortRpcSession<SlowService>(channel.port2);

    // Launch concurrent calls
    const [result1, result2, result3] = await Promise.all([
      client.delay(30, "first"),
      client.delay(20, "second"),
      client.delay(10, "third"),
    ]);

    expect(result1).toBe("first");
    expect(result2).toBe("second");
    expect(result3).toBe("third");

    // Clean up
    client[Symbol.dispose]();
    server[Symbol.dispose]();
  });
});
