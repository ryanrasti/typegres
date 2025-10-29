import { RpcStub, RpcTarget, newMessagePortRpcSession } from "capnweb";
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
    console.log("returning simpleQuery SQL:", query);

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

  it("should build a simple Typegres query over RPC", async () => {
    const channel = new MessageChannel();
    const server = newMessagePortRpcSession(channel.port1, new HelloService());
    const client: RpcStub<HelloService> = newMessagePortRpcSession<HelloService>(channel.port2);

    const sql = await client.simpleQuery().limit(1).sql();

    expect(sql).toBe('SELECT cast($1 as text) AS "message", cast($2 as int4) AS "val"');

    client[Symbol.dispose]();
    server[Symbol.dispose]();
  });
});
