import { RpcStub, RpcTarget, newMessagePortRpcSession } from "capnweb";
import { describe, it, expect } from "vitest";
import { select, Select } from "../grammar/select";
import { Int4, Text } from "../types";

class QueryService extends RpcTarget {
  getQuery() {
    return select(() => ({
      id: Int4.new(1),
      name: Text.new("Alice"),
      age: Int4.new(30),
    }))
      .subquery()
      .select();
  }

  test() {
    return { foo: "bar" };
  }
}

describe("Cap'n Web map() with Select callbacks", () => {
  it("should test if foo() works with Select's map method", async () => {
    const channel = new MessageChannel();
    const server = newMessagePortRpcSession(channel.port1, new QueryService());
    const client: RpcStub<QueryService> = newMessagePortRpcSession<QueryService>(channel.port2);

    const mapped = client.test();
    console.log("Mapped type:", typeof mapped);
    console.log("awaited mapped:", await mapped);
    expect(await mapped).toEqual({ foo: "bar" });
  });

  it("should test if map() works with Select's map method", async () => {
    const channel = new MessageChannel();
    const server = newMessagePortRpcSession(channel.port1, new QueryService());
    const client: RpcStub<QueryService> = newMessagePortRpcSession<QueryService>(channel.port2);

    // Get a query from the server
    const query = client.getQuery();
    console.log("Query type:", typeof query);

    // Let's see what map returns
    const mapped = query.select((row) => {
      console.log("Inside map callback, q is:", row);
      return {
        userId: row.id,
        userName: row.name,
      };
    });
    console.log("Mapped type:", typeof mapped);
    console.log("mapped object (not awaited):", mapped);
    
    // Don't await mapped - call sql() directly on the promise/stub
    const sql = mapped.sql();
    console.log("sql:", sql);

    try {
      const result = await sql;
      console.log("Result:", result);
      // Add actual assertion
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result).toContain('SELECT');
    } catch (e) {
      console.log("Error calling sql():", e.message);
      console.log("Stack trace:", e.stack);
      console.log("Mapped object:", mapped);
      throw e; // Re-throw to fail the test
    }

    client[Symbol.dispose]();
    server[Symbol.dispose]();
  });
});
