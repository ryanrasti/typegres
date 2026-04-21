import { beforeAll, afterAll } from "vitest";
import { PgExecutor } from "../executor";
import type { Executor } from "../executor";
import { defaultPgConnectionString } from "../pg";
import { Database } from "../database";
import { sql } from "./sql";

export let exec: Executor;
export let db: Database;

// Per-worker schema isolates tables so test files can run in parallel against
// one Postgres. search_path is set at connection startup (via libpq options),
// so bare table names (`dogs`, `_live_events`, ...) resolve inside the
// worker's schema without changes to test bodies.
const schema = `test_w${process.env["VITEST_WORKER_ID"] ?? "1"}`;

beforeAll(async () => {
  exec = await PgExecutor.create(defaultPgConnectionString(), {
    max: 1,
    options: `-csearch_path=${schema}`,
  });
  db = new Database(exec);
  await db.execute(sql`DROP SCHEMA IF EXISTS ${sql.ident(schema)} CASCADE`);
  await db.execute(sql`CREATE SCHEMA ${sql.ident(schema)}`);
});

afterAll(async () => {
  await db.execute(sql`DROP SCHEMA IF EXISTS ${sql.ident(schema)} CASCADE`);
  await exec.close();
});

export const withinTransaction = async (fn: () => Promise<void>) => {
  await db.transaction(async () => {
    await fn();
    throw new Error("__test_rollback__");
  }).catch((e) => {
    if ((e as Error).message !== "__test_rollback__") {
      throw e;
    }
  });
};
