import { RpcStub, RpcTarget, newMessagePortRpcSession } from "capnweb";
import { describe, it } from "vitest";
import { select } from "../grammar/select";
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
}

describe("Cap'n Web map() with Select callbacks", () => {
  it("should test if map() works with Select's map method", async () => {
    const channel = new MessageChannel();
    const server = newMessagePortRpcSession(channel.port1, new QueryService());
    const client: RpcStub<QueryService> = newMessagePortRpcSession<QueryService>(channel.port2);

    // Get a query from the server
    const query = client.getQuery();
    console.log("Query type:", typeof query);

    // Let's see what map returns
    const mapped = query.map((q) => {
      console.log("Inside map callback, q is:", q);
      return q.select((row) => ({
        userId: row.id,
        userName: row.name,
      }));
    });
    console.log("Mapped type:", typeof mapped);
    console.log("awaited mapped:", await mapped);

    try {
      const result = await mapped.sql();
      console.log("Result:", result);
    } catch (e) {
      console.log("Error calling sql():", e.message);
      console.log("Mapped object:", mapped);
    }

    client[Symbol.dispose]();
    server[Symbol.dispose]();
  });
});
