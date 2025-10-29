import { newMessagePortRpcSession, RpcStub, RpcTarget } from "capnweb";
import { describe, expect, it } from "vitest";
import { select } from "../grammar/select";
import { Int4, Text } from "../types";

// Define our simple RPC interface
class HelloService extends RpcTarget {
  hello(): string {
    return "hello world";
  }

  simpleQuery() {
    const query = select(() => ({
      val: Int4.new(42),
      message: Text.new("Hello from Typegres!"),
    }));
    console.log("Server: returning Select instance");

    return query;
  }
}

describe("Cap'n Web + Typegres Integration", () => {
  it("should call hello() and return 'hello world'", async () => {
    const channel = new MessageChannel();
    const server = newMessagePortRpcSession(channel.port1, new HelloService());
    const client: RpcStub<HelloService> = newMessagePortRpcSession<HelloService>(channel.port2);

    const result = await client.hello();
    expect(result).toBe("hello world");

    client[Symbol.dispose]();
    server[Symbol.dispose]();
  });

  it("should build a simple Typegres query over RPC with promise pipelining", async () => {
    const channel = new MessageChannel();

    // Add message inspection
    const originalPort1PostMessage = channel.port1.postMessage.bind(channel.port1);
    const originalPort2PostMessage = channel.port2.postMessage.bind(channel.port2);

    let messageCount = 0;
    channel.port1.postMessage = (message) => {
      console.log(`Message ${++messageCount} port1->port2:`, JSON.stringify(message, null, 2));
      originalPort1PostMessage(message);
    };

    channel.port2.postMessage = (message) => {
      console.log(`Message ${++messageCount} port2->port1:`, JSON.stringify(message, null, 2));
      originalPort2PostMessage(message);
    };

    const server = newMessagePortRpcSession(channel.port1, new HelloService());
    const client: RpcStub<HelloService> = newMessagePortRpcSession<HelloService>(channel.port2);

    console.log("Client: calling simpleQuery().limit(1).sql()");

    // This tests promise pipelining:
    // 1. simpleQuery() returns a Select instance (proxy)
    // 2. .limit(1) is called on that proxy
    // 3. .sql() is called on the result
    const sql = await client.simpleQuery().limit(1).sql();

    console.log("Client: received SQL:", sql);

    expect(sql).toBe('SELECT cast($1 as text) AS "message", cast($2 as int4) AS "val" LIMIT $3');

    client[Symbol.dispose]();
    server[Symbol.dispose]();
  });

  it("should test promise pipelining with multiple chained calls", async () => {
    const channel = new MessageChannel();
    const server = newMessagePortRpcSession(channel.port1, new HelloService());
    const client: RpcStub<HelloService> = newMessagePortRpcSession<HelloService>(channel.port2);

    console.log("Client: testing longer chain without callbacks");

    // Test a longer chain (without callbacks that can't serialize)
    const sql = await client.simpleQuery().limit(10).offset(5).sql();

    console.log("Client: received SQL from chain:", sql);

    expect(sql).toBe('SELECT cast($1 as text) AS "message", cast($2 as int4) AS "val" LIMIT $3 OFFSET $4');

    client[Symbol.dispose]();
    server[Symbol.dispose]();
  });
});
