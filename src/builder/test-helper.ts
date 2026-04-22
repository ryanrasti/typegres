import { beforeAll, afterAll } from "vitest";
import { PgDriver } from "../driver";
import type { Driver } from "../driver";
import { requireDatabaseUrl } from "../pg";
import { Database } from "../database";
import { sql } from "./sql";

export let driver: Driver;
export let db: Database;

// Per-worker schema isolates tables so test files can run in parallel against
// one Postgres. search_path is set at connection startup (via libpq options),
// so bare table names (`dogs`, `_live_events`, ...) resolve inside the
// worker's schema without changes to test bodies.
const schema = `test_w${process.env["VITEST_WORKER_ID"] ?? "1"}`;

beforeAll(async () => {
  driver = await PgDriver.create(requireDatabaseUrl(), {
    max: 1,
    options: `-csearch_path=${schema}`,
  });
  db = new Database(driver);
  await db.execute(sql`DROP SCHEMA IF EXISTS ${sql.ident(schema)} CASCADE`);
  await db.execute(sql`CREATE SCHEMA ${sql.ident(schema)}`);
});

afterAll(async () => {
  await db.execute(sql`DROP SCHEMA IF EXISTS ${sql.ident(schema)} CASCADE`);
  await driver.close();
});

// Runs `fn` inside a transaction that always rolls back. The tx is passed
// in so tests explicitly operate on the txn-bound Database — queries, sql
// fragments, and mutations all go through it.
export const withinTransaction = async (fn: (tx: Database) => Promise<void>) => {
  await db.transaction(async (tx) => {
    await fn(tx);
    throw new Error("__test_rollback__");
  }).catch((e) => {
    if ((e as Error).message !== "__test_rollback__") {
      throw e;
    }
  });
};
