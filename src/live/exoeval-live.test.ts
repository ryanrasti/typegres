// `.live()` over the EXOEVAL RPC wire (the path site/ uses) — as opposed
// to the capnweb shim. The client ships the closure as JS source, the
// server re-evaluates it under exoEval, and a streaming (async-iterable)
// return is drained chunk-by-chunk over inMemoryChannel.
//
// The load-bearing detail this guards: `.live()` returns a LiveQuery class
// instance, and inMemoryChannel detects a stream via
// `Symbol.asyncIterator in result`. That walks the prototype chain, so a
// LiveQuery (with `[Symbol.asyncIterator]` on its prototype) is streamed
// exactly like a bare async iterable — each *rowset* is serialized, never
// the LiveQuery itself. If LiveQuery ever lost that prototype method, the
// channel would fall through to `safeStringify(result)` and throw
// "cannot serialize LiveQuery instance". (The equivalent coverage in
// site/src/demo/demo.test.ts is not part of the core suite.)

import { test, expect, beforeAll, afterAll } from "vitest";
import { Database, type Connection } from "../database";
import { SqliteDriver } from "../drivers/sqlite";
import { sql } from "../builder/sql";
import { Integer, Text } from "../types/sqlite";
import { expose } from "../exoeval/tool";
import { RpcClient, inMemoryChannel } from "../exoeval/rpc";

const db = new Database({ dialect: "sqlite" });

class Notes extends db.Table("notes", { live: true }) {
  @expose() id = Integer.column({ nonNull: true });
  @expose() user_id = Integer.column({ nonNull: true });
  @expose() body = Text.column({ nonNull: true });
}

class Api {
  @expose() conn: Connection;
  constructor(conn: Connection) {
    this.conn = conn;
  }
  @expose() notes() {
    return Notes.from();
  }
}

let conn: Connection;
beforeAll(async () => {
  conn = db.attach(await SqliteDriver.create(":memory:"));
  await conn.execute(
    sql`CREATE TABLE notes (id INTEGER PRIMARY KEY, user_id INTEGER NOT NULL, body TEXT NOT NULL)`,
  );
});
afterAll(async () => {
  await conn.close();
});

test("exoeval: a client-authored .live() streams the rowset and re-yields on commit", async () => {
  await Notes.insert({ id: 1, user_id: 1, body: "hello" }).execute(conn);
  const rpc = new RpcClient<Api>(inMemoryChannel(new Api(conn)));

  // The site's shape: the closure returns `.live(api.conn)` (iterator form),
  // shipped as source and re-evaluated server-side; the client iterates the
  // streamed rowsets.
  const stream = rpc.run((api) =>
    api
      .notes()
      .where(({ notes }) => notes.user_id.eq(1))
      .select(({ notes }) => ({ id: notes.id, body: notes.body }))
      .live(api.conn),
  );
  const it = (stream as AsyncIterable<{ id: number; body: string }[]>)[Symbol.asyncIterator]();

  // Initial snapshot over the wire.
  const first = await it.next();
  expect(first.done).toBe(false);
  expect(first.value).toEqual([{ id: 1, body: "hello" }]);

  // A matching commit re-yields the full rowset.
  await Notes.insert({ id: 2, user_id: 1, body: "world" }).execute(conn);
  const second = await it.next();
  expect(second.done).toBe(false);
  expect(second.value!.map((r: { body: string }) => r.body).sort()).toEqual(["hello", "world"]);

  await it.return?.();
});
