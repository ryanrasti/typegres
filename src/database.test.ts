import { test, expect, beforeAll, afterAll } from "vitest";
import { Int8, Text } from "./types";
import { sql } from "./builder/sql";
import { setupDb, db } from "./test-helpers";
import { PgDriver } from "./driver";
import type { Driver } from "./driver";
import { requireDatabaseUrl } from "./pg";
import { Database } from "./database";

setupDb();

let poolDriver: Driver;
let poolDb: Database;

beforeAll(async () => {
  poolDriver = await PgDriver.create(requireDatabaseUrl(), { max: 10 });
  poolDb = new Database(poolDriver);
});

afterAll(async () => {
  await poolDriver.close();
});

test("transaction commits on success", async () => {
  await db.execute(sql`CREATE TABLE txtest (id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name text NOT NULL)`);

  class TxTest extends db.Table("txtest") {
    id = (Int8<1>).column({ nonNull: true, generated: true });    name = (Text<1>).column({ nonNull: true });  }

  await db.transaction(async (tx) => {
    await tx.execute(TxTest.insert({ name: "Alice" }));
    await tx.execute(TxTest.insert({ name: "Bob" }));
  });

  const rows = await db.execute(
    TxTest.from().select(({ txtest }) => ({ name: txtest.name })),
  );

  expect(rows).toEqual([{ name: "Alice" }, { name: "Bob" }]);
  await db.execute(sql`DROP TABLE txtest`);
});

test("transaction rollbacks on error", async () => {
  await db.execute(sql`CREATE TABLE txtest2 (id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name text NOT NULL)`);

  class TxTest2 extends db.Table("txtest2") {
    id = (Int8<1>).column({ nonNull: true, generated: true });    name = (Text<1>).column({ nonNull: true });  }

  await expect(
    db.transaction(async (tx) => {
      await tx.execute(TxTest2.insert({ name: "Alice" }));
      throw new Error("rollback!");
    }),
  ).rejects.toThrow("rollback!");

  const rows = await db.execute(
    TxTest2.from().select(({ txtest2 }) => ({ name: txtest2.name })),
  );

  expect(rows).toEqual([]);
  await db.execute(sql`DROP TABLE txtest2`);
});

test("transaction pins one backend connection", async () => {
  await poolDb.transaction(async (tx) => {
    const pid1 = await tx.execute(sql`SELECT pg_backend_pid() AS pid`);
    const pid2 = await tx.execute(sql`SELECT pg_backend_pid() AS pid`);
    expect(pid1.rows[0]?.["pid"]).toBe(pid2.rows[0]?.["pid"]);
  });
});

test("transaction preserves session-local temp tables", async () => {
  await poolDb.transaction(async (tx) => {
    await tx.execute(sql`CREATE TEMP TABLE tx_session_test (id int4)`);
    await tx.execute(sql`INSERT INTO tx_session_test (id) VALUES (1)`);
    const result = await tx.execute(sql`SELECT id FROM tx_session_test`);
    expect(result.rows).toEqual([{ id: "1" }]);
  });
});

test("nested transactions flatten", async () => {
  await poolDb.transaction(async (tx) => {
    const pid1 = await tx.execute(sql`SELECT pg_backend_pid() AS pid`);
    await tx.transaction(async (tx2) => {
      const pid2 = await tx2.execute(sql`SELECT pg_backend_pid() AS pid`);
      expect(pid2.rows[0]?.["pid"]).toBe(pid1.rows[0]?.["pid"]);
    });
  });
});

test("nested transaction rejects stronger isolation than active", async () => {
  await expect(
    poolDb.transaction({ isolation: "read committed" }, async (tx) => {
      await tx.transaction({ isolation: "serializable" }, async () => {});
    }),
  ).rejects.toThrow(/Cannot nest a 'serializable' transaction inside a 'read committed'/);

  await expect(
    poolDb.transaction({ isolation: "repeatable read" }, async (tx) => {
      await tx.transaction({ isolation: "serializable" }, async () => {});
    }),
  ).rejects.toThrow(/Cannot nest a 'serializable' transaction inside a 'repeatable read'/);
});

test("nested transaction accepts weaker-or-equal isolation", async () => {
  // Outer 'serializable' satisfies any inner request.
  await poolDb.transaction({ isolation: "serializable" }, async (tx) => {
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
      poolDb.transaction(async (tx) => {
        await tx.transaction({ isolation: level }, async () => {});
      }),
    ).rejects.toThrow(/inside an ambient/);
  }
  // Ambient inside ambient: fine — caller deferred to session both times.
  await poolDb.transaction(async (tx) => {
    await tx.transaction(async () => {});
  });
});
