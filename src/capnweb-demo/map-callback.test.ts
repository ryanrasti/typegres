import { RpcStub, RpcTarget, newMessagePortRpcSession } from "capnweb";
import { describe, it, expect } from "vitest";
import { select, Select } from "../grammar/select";
import { Int4, Text } from "../types";
import { values } from "../query/values";
import { doRpc } from "./src/do-rpc";
import { Typegres, typegres } from "typegres";
import { User } from "./src/models";

let _tg: Typegres | undefined;
const getTg = async () => {
  if (!_tg) {
    _tg = await typegres({ type: "pglite" });
  }
  return _tg;
};

class QueryService extends RpcTarget {
  values() {
    return values(
      {
        id: Int4.new(1),
        name: Text.new("Alice"),
        age: Int4.new(30),
      },
      {
        id: Int4.new(2),
        name: Text.new("Bob"),
        age: Int4.new(31),
      },
      {
        id: Int4.new(3),
        name: Text.new("Charlie"),
        age: Int4.new(32),
      },
    );
  }

  getQuery() {
    return select(() => ({
      id: Int4.new(1),
      name: Text.new("Alice"),
      age: Int4.new(30),
    }))
      .subquery()
      .select();
  }

  getRealQuery() {
    return User.select();
  }

  test() {
    return { foo: "bar" };
  }

  tg() {
    console.log("tg() called");
    return getTg();
  }
}

const createClient = () => {
  const channel = new MessageChannel();
  const server = newMessagePortRpcSession(channel.port1, new QueryService());
  const client: RpcStub<QueryService> = newMessagePortRpcSession<QueryService>(channel.port2);
  return client;
};

describe("Cap'n Web map() with Select callbacks", () => {
  it("should test if foo() works with Select's map method", async () => {
    const client = createClient();

    const mapped = client.test();
    console.log("Mapped type:", typeof mapped);
    console.log("awaited mapped:", await mapped);
    expect(await mapped).toEqual({ foo: "bar" });
  });

  it("should test if map() works with Select's map method", async () => {
    const client = createClient();

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

    const result = await sql;
    console.log("Result:", result);
    expect(result).toBe(
      'SELECT "subquery"."id" AS "userId", "subquery"."name" AS "userName" FROM (SELECT cast($1 as int4) AS "age", cast($2 as int4) AS "id", cast($3 as text) AS "name") as "subquery"',
    );
  });

  it("should test if map() works with Select's map method -- E2E", async () => {
    const client = createClient();
    const tg = client.tg();

    const rows = await client
      .getQuery()
      .select((row) => {
        console.log("Inside map callback, q is:", row);
        return {
          userId: row.id,
          userName: row.name,
        };
      })
      .execute(tg);
    console.log("Rows:", rows);
    expect(rows).toEqual([{ userId: 1, userName: "Alice" }]);
  });

  it("should test if can do more complex queries", async () => {
    const client = createClient();

    const query = client.getQuery();
    console.log("Query type:", typeof query);

    const mapped = query
      .select((row) => {
        console.log("Inside map callback, q is:", row);
        return {
          userId: row.id,
          userName: row.name,
        };
      })
      .where((row) => {
        const pred = row.age[">="](31);
        console.log("DBG row type:", typeof row, (row as any)?.constructor?.name);
        console.log("DBG row.age type:", typeof (row as any)?.age, (row as any)?.age?.constructor?.name);
        console.log(
          "DBG pred type:",
          typeof pred,
          (pred as any)?.constructor?.name,
          "toExpression:",
          typeof (pred as any)?.toExpression,
        );
        return pred;
      })
      .orderBy((row) => row.name);
    console.log("Mapped type:", typeof mapped);
    console.log("mapped object (not awaited):", mapped);

    const sql = mapped.sql();
    console.log("sql:", sql);

    const result = await sql;
    console.log("Result:", result);
    expect(result).toBe(
      'SELECT "subquery"."id" AS "userId", "subquery"."name" AS "userName" FROM (SELECT cast($1 as int4) AS "age", cast($2 as int4) AS "id", cast($3 as text) AS "name") as "subquery" WHERE ("subquery"."age" >= $4) ORDER BY "subquery"."name"',
    );
  });

  it("should test if can do more complex queries -- using doRpc", async () => {
    const client = createClient();

    const mapped = await doRpc(
      (query) => {
        return query
          .select((row) => {
            console.log("Inside map callback, q is:", row);
            return {
              userId: row.id,
              userName: row.name,
            };
          })
          .where((row) => {
            const pred = row.age[">="](31);
            console.log("DBG row type:", typeof row, (row as any)?.constructor?.name);
            console.log("DBG row.age type:", typeof (row as any)?.age, (row as any)?.age?.constructor?.name);
            console.log(
              "DBG pred type:",
              typeof pred,
              (pred as any)?.constructor?.name,
              "toExpression:",
              typeof (pred as any)?.toExpression,
            );
            return pred;
          })
          .orderBy((row) => row.name);
      },
      [client.getQuery()] as const,
    );
    console.log("Mapped type:", typeof mapped);
    console.log("mapped object (not awaited):", mapped);

    const sql = mapped.sql();
    console.log("sql:", sql);

    const result = await sql;
    console.log("Result:", result);
    expect(result).toBe(
      'SELECT "subquery"."id" AS "userId", "subquery"."name" AS "userName" FROM (SELECT cast($1 as int4) AS "age", cast($2 as int4) AS "id", cast($3 as text) AS "name") as "subquery" WHERE ("subquery"."age" >= $4) ORDER BY "subquery"."name"',
    );
  });

  it("should test if can do more complex queries -- using doRpc E2e", async () => {
    const client = createClient();
    const tg = client.tg();

    const rows = await doRpc(
      (query, tg) => {
        return query
          .select((row) => {
            console.log("Inside map callback, q is:", row);
            return {
              userId: row.id,
              userName: row.name,
            };
          })
          .where((row) => {
            const pred = row.age[">="](29);
            console.log("DBG row type:", typeof row, (row as any)?.constructor?.name);
            console.log("DBG row.age type:", typeof (row as any)?.age, (row as any)?.age?.constructor?.name);
            console.log(
              "DBG pred type:",
              typeof pred,
              (pred as any)?.constructor?.name,
              "toExpression:",
              typeof (pred as any)?.toExpression,
            );
            return pred;
          })
          .orderBy((row) => row.name)
          .execute(tg);
      },
      [client.getQuery(), tg] as const,
    );
    console.log("Rows:", rows);
    expect(rows).toEqual([{ userId: 1, userName: "Alice" }]);
  });


  it("should test if can do more complex queries -- using doRpc E2e with one()", async () => {
    const client = createClient();
    const tg = client.tg();
    const tgLocal = await getTg();
    await tgLocal.sql`CREATE TABLE IF NOT EXISTS "user" (id INT PRIMARY KEY, username TEXT, created_at TIMESTAMP)`.execute();
    await tgLocal.sql`INSERT INTO "user" (id, username, created_at) VALUES (1, 'Alice', '2021-01-01 00:00:00')`.execute();

    const user = await doRpc(
      (query, tg) => {
        return query
          .select((row) => {
            console.log("Inside map callback, q is:", row);
            return {
              userId: row.id,
              userName: row.username,
            };
          })
          .execute(tg);
      },
      [client.getRealQuery(), tg] as const,
    );
    console.log("User:", user);
    expect(user).toBeInstanceOf(User);
    expect(user).toEqual({ userId: 1, userName: "Alice" });
  });
});
