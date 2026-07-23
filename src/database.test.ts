import { test, describe, expect, beforeAll, afterAll } from "vitest";
import { Int8, Text } from "./types/postgres";
import { sql } from "./builder/sql";
import { setupDb, db, conn } from "./test-helpers";
import { PgDriver } from "./drivers/pg";
import type { Driver } from "./drivers/types";
import { requireDatabaseUrl } from "./pg";
import type { Connection } from "./database";
import { Database } from "./database";

setupDb();

let poolDriver: Driver;
let poolDb: Database;
let poolConn: Connection;

beforeAll(async () => {
  poolDriver = await PgDriver.create(requireDatabaseUrl(), { max: 10 });
  poolDb = new Database({ dialect: "postgres" });
  poolConn = poolDb.attach(poolDriver);
});

afterAll(async () => {
  await poolDriver.close();
});

test("transaction commits on success", async () => {
  await conn.execute(sql`CREATE TABLE txtest (id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name text NOT NULL)`);

  class TxTest extends db.Table("txtest") {
    id = Int8.column({ nonNull: true, generated: true });    name = Text.column({ nonNull: true });  }

  await conn.transaction(async (tx) => {
    await tx.execute(TxTest.insert({ name: "Alice" }));
    await tx.execute(TxTest.insert({ name: "Bob" }));
  });

  const rows = await conn.execute(
    TxTest.from().select(({ txtest }) => ({ name: txtest.name })),
  );

  expect(rows).toEqual([{ name: "Alice" }, { name: "Bob" }]);
  await conn.execute(sql`DROP TABLE txtest`);
});

test("transaction rollbacks on error", async () => {
  await conn.execute(sql`CREATE TABLE txtest2 (id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name text NOT NULL)`);

  class TxTest2 extends db.Table("txtest2") {
    id = Int8.column({ nonNull: true, generated: true });    name = Text.column({ nonNull: true });  }

  await expect(
    conn.transaction(async (tx) => {
      await tx.execute(TxTest2.insert({ name: "Alice" }));
      throw new Error("rollback!");
    }),
  ).rejects.toThrow("rollback!");

  const rows = await conn.execute(
    TxTest2.from().select(({ txtest2 }) => ({ name: txtest2.name })),
  );

  expect(rows).toEqual([]);
  await conn.execute(sql`DROP TABLE txtest2`);
});

test("transaction pins one backend connection", async () => {
  await poolConn.transaction(async (tx) => {
    const pid1 = await tx.execute(sql`SELECT pg_backend_pid() AS pid`);
    const pid2 = await tx.execute(sql`SELECT pg_backend_pid() AS pid`);
    expect(pid1.rows[0]?.["pid"]).toBe(pid2.rows[0]?.["pid"]);
  });
});

test("transaction preserves session-local temp tables", async () => {
  await poolConn.transaction(async (tx) => {
    await tx.execute(sql`CREATE TEMP TABLE tx_session_test (id int4)`);
    await tx.execute(sql`INSERT INTO tx_session_test (id) VALUES (1)`);
    const result = await tx.execute(sql`SELECT id FROM tx_session_test`);
    expect(result.rows).toEqual([{ id: "1" }]);
  });
});

test("nested transactions flatten", async () => {
  await poolConn.transaction(async (tx) => {
    const pid1 = await tx.execute(sql`SELECT pg_backend_pid() AS pid`);
    await tx.transaction(async (tx2) => {
      const pid2 = await tx2.execute(sql`SELECT pg_backend_pid() AS pid`);
      expect(pid2.rows[0]?.["pid"]).toBe(pid1.rows[0]?.["pid"]);
    });
  });
});

test("nested transaction rejects stronger isolation than active", async () => {
  await expect(
    poolConn.transaction({ isolation: "read committed" }, async (tx) => {
      await tx.transaction({ isolation: "serializable" }, async () => {});
    }),
  ).rejects.toThrow(/Cannot nest a 'serializable' transaction inside a 'read committed'/);

  await expect(
    poolConn.transaction({ isolation: "repeatable read" }, async (tx) => {
      await tx.transaction({ isolation: "serializable" }, async () => {});
    }),
  ).rejects.toThrow(/Cannot nest a 'serializable' transaction inside a 'repeatable read'/);
});

test("nested transaction accepts weaker-or-equal isolation", async () => {
  // Outer 'serializable' satisfies any inner request.
  await poolConn.transaction({ isolation: "serializable" }, async (tx) => {
    await tx.transaction({ isolation: "read committed" }, async () => {});
    await tx.transaction({ isolation: "repeatable read" }, async () => {});
    await tx.transaction({ isolation: "serializable" }, async () => {});
    await tx.transaction(async () => {}); // no opts: opt-out, just flatten
  });
});

test("nested transaction rejects any explicit level inside an ambient outer", async () => {
  // Outer was opened without an isolation option → BEGIN deferred to
  // session default, which we can't introspect. Any explicit nested
  // request would silently bind to whatever session config produced.
  for (const level of ["read committed", "repeatable read", "serializable"] as const) {
    await expect(
      poolConn.transaction(async (tx) => {
        await tx.transaction({ isolation: level }, async () => {});
      }),
    ).rejects.toThrow(/inside an ambient/);
  }
  // Ambient inside ambient: fine — caller deferred to session both times.
  await poolConn.transaction(async (tx) => {
    await tx.transaction(async () => {});
  });
});

// Database.defaultConnection: when exactly one connection is attached (the
// Durable Object model — one object, one connection), the execute-family
// terminators fall back to it, so `.execute()` needs no argument. Ambiguous
// (zero or several attached) throws. This is dialect-agnostic bookkeeping;
// exercised here over the pg harness.
describe("defaultConnection", () => {
  // Defined inside each test, not at describe scope: poolDb is only assigned
  // in beforeAll, which runs after the describe body is collected.
  const makeWidgets = () =>
    class Widgets extends poolDb.Table("widgets_dc") {
      id = Int8.column({ nonNull: true, generated: true });
      name = Text.column({ nonNull: true });
    };

  test("no connection attached → throws", () => {
    const empty = new Database({ dialect: "postgres" });
    expect(() => empty.defaultConnection).toThrow(/no connection attached/);
  });

  test("exactly one attached → terminators resolve it with no argument", async () => {
    // poolDb has a single attached connection (poolConn, from beforeAll).
    expect(poolDb.defaultConnection).toBe(poolConn);

    const Widgets = makeWidgets();
    await poolConn.execute(sql`CREATE TABLE widgets_dc (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )`);
    await Widgets.insert({ name: "a" }).execute(); // no conn arg
    const rows = await Widgets.from()
      .select(({ widgets_dc }) => ({ name: widgets_dc.name }))
      .execute(); // no conn arg
    expect(rows).toEqual([{ name: "a" }]);
    await poolConn.execute(sql`DROP TABLE widgets_dc`);
  });

  test("ambiguous (two attached) → throws until one closes", async () => {
    // Fresh db + its own drivers so close() doesn't touch the shared pool.
    const fdb = new Database({ dialect: "postgres" });
    const d1 = await PgDriver.create(requireDatabaseUrl(), { max: 1 });
    const d2 = await PgDriver.create(requireDatabaseUrl(), { max: 1 });
    const c1 = fdb.attach(d1);
    const c2 = fdb.attach(d2);
    expect(() => fdb.defaultConnection).toThrow(/2 connections attached/);

    // Connection.close() deregisters (then closes its driver), restoring an
    // unambiguous default.
    await c2.close();
    expect(fdb.defaultConnection).toBe(c1);
    await c1.close();
  });

  test("explicit conn still wins over the default", async () => {
    const Widgets = makeWidgets();
    await poolConn.execute(sql`CREATE TABLE widgets_dc (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )`);
    await Widgets.insert({ name: "b" }).execute(poolConn); // explicit
    const rows = await Widgets.from()
      .select(({ widgets_dc }) => ({ name: widgets_dc.name }))
      .execute(poolConn);
    expect(rows).toEqual([{ name: "b" }]);
    await poolConn.execute(sql`DROP TABLE widgets_dc`);
  });
});
