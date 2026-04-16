import { test, expect, beforeAll, afterAll } from "vitest";
import { Int8, Text } from "./types";
import { sql } from "./builder/sql";
import { exec, db } from "./builder/test-helper";
import { pgExecutor } from "./executor";
import type { Executor } from "./executor";
import { Database } from "./database";

let concurrentExec: Executor;
let concurrentDb: Database;

beforeAll(async () => {
  concurrentExec = pgExecutor(undefined, { max: 10 });
  concurrentDb = new Database(concurrentExec);
});

afterAll(async () => {
  await concurrentExec.close();
});

test("transaction commits on success", async () => {
  await exec.execute(sql`CREATE TABLE txtest (id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name text NOT NULL)`);

  class TxTest extends db.Table("txtest") {
    id = (Int8<1>).column({ nonNull: true, generated: true });
    name = (Text<1>).column({ nonNull: true });
  }

  await db.transaction(async () => {
    await db.execute(TxTest.insert({ name: "Alice" }));
    await db.execute(TxTest.insert({ name: "Bob" }));
  });

  const rows = await db.execute(
    TxTest.from().select(({ txtest }) => ({ name: txtest.name })),
  );

  expect(rows).toEqual([{ name: "Alice" }, { name: "Bob" }]);
  await exec.execute(sql`DROP TABLE txtest`);
});

test("transaction rollbacks on error", async () => {
  await exec.execute(sql`CREATE TABLE txtest2 (id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name text NOT NULL)`);

  class TxTest2 extends db.Table("txtest2") {
    id = (Int8<1>).column({ nonNull: true, generated: true });
    name = (Text<1>).column({ nonNull: true });
  }

  await expect(
    db.transaction(async () => {
      await db.execute(TxTest2.insert({ name: "Alice" }));
      throw new Error("rollback!");
    }),
  ).rejects.toThrow("rollback!");

  const rows = await db.execute(
    TxTest2.from().select(({ txtest2 }) => ({ name: txtest2.name })),
  );

  expect(rows).toEqual([]);
  await exec.execute(sql`DROP TABLE txtest2`);
});

test("transaction pins one backend connection under concurrent queries", async () => {
  await concurrentDb.transaction(async () => {
    const rows = await Promise.all(
      Array.from({ length: 5 }, () =>
        concurrentExec.execute(sql`SELECT pg_backend_pid() AS pid, pg_sleep(0.05)`),
      ),
    );
    const pids = new Set(rows.map((r) => r[0]?.pid));
    expect(pids.size).toBe(1);
  });
});

test("transaction preserves session-local temp tables", async () => {
  await concurrentDb.transaction(async () => {
    await concurrentExec.execute(sql`CREATE TEMP TABLE tx_session_test (id int4)`);
    const rows = await Promise.all(
      Array.from({ length: 5 }, () =>
        concurrentExec.execute(sql`
          SELECT to_regclass('pg_temp.tx_session_test') IS NOT NULL AS exists, pg_sleep(0.05)
        `),
      ),
    );
    expect(rows.every((r) => r[0]?.exists === "t")).toBe(true);
  });
});

test("transaction applies repeatable read isolation", async () => {
  await concurrentDb.transaction(async () => {
    const rows = await concurrentExec.execute(sql`SHOW transaction_isolation`);
    expect(rows[0]?.transaction_isolation.toLowerCase()).toContain("repeatable read");
  });
});
