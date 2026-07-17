import { beforeAll, afterAll, expect } from "vitest";
import { PgDriver } from "./drivers/pg";
import type { Driver } from "./drivers/types";
import { requireDatabaseUrl } from "./pg";
import { Database } from "./database";
import { compile, sql } from "./builder/sql";
import type { Sql } from "./builder/sql";
import type { TransactionIsolation , Connection } from "./database";

export let driver: Driver;
export let db: Database;
export let conn: Connection;

// Per-worker schema isolates tables so test files can run in parallel against
// one Postgres. search_path is set at connection startup (via libpq options),
// so bare table names (`dogs`, `_live_events`, ...) resolve inside the
// worker's schema without changes to test bodies.
const schema = `test_w${process.env["VITEST_WORKER_ID"] ?? "1"}`;

// Opt-in DB lifecycle. Call once at the top of any test file that uses
// `db`/`conn` or `withinTransaction` — registers beforeAll/afterAll
// for that file's suite. Unit-only test files don't call it and avoid
// booting Postgres.
export const setupDb = (): void => {
  db = new Database({ dialect: "postgres" });
  beforeAll(async () => {
    driver = await PgDriver.create(requireDatabaseUrl(), {
      max: 1,
      options: `-csearch_path=${schema}`,
    });
    conn = db.attach(driver);
    await conn.execute(sql`DROP SCHEMA IF EXISTS ${db.scopedIdent(schema)} CASCADE`);
    await conn.execute(sql`CREATE SCHEMA ${db.scopedIdent(schema)}`);
  });

  afterAll(async () => {
    await conn.execute(sql`DROP SCHEMA IF EXISTS ${db.scopedIdent(schema)} CASCADE`);
    await conn.close();
  });
};

// Runs `fn` inside a transaction that always rolls back. The tx is passed
// in so tests explicitly operate on the txn-bound Connection — queries, sql
// fragments, and mutations all go through it. Pass `isolation` when the
// test (or anything it calls) needs at least that level — e.g. live tests
// that nest a `repeatable read` runLiveIteration inside.
export const withinTransaction = async (
  fn: (tx: Connection) => Promise<void>,
  opts?: { isolation?: TransactionIsolation },
) => {
  await conn.transaction(opts ?? {}, async (tx) => {
    await fn(tx);
    throw new Error("__test_rollback__");
  }).catch((e) => {
    if ((e as Error).message !== "__test_rollback__") {
      throw e;
    }
  });
};

// Compare two Sql trees by compiling both — text checked after whitespace
// normalization, params checked literally. Expected templates should write
// each parameterized value as `${value}` (the sql tag auto-wraps non-Sql
// interpolations as Params), so $1, $2, ... line up on both sides.
//
// Whitespace is collapsed and trimmed adjacent to () and , so the expected
// template can be freely indented across lines / aligned with extra spaces.
export const expectSqlEqual = (actual: Sql, expected: Sql, database: Database): void => {
  const normalize = (s: string) =>
    s.replace(/\s+/g, " ").replace(/\s*([(),])\s*/g, "$1").trim();
  const ctx = { database };
  const a = compile(actual, ctx);
  const e = compile(expected, ctx);
  expect(normalize(a.text)).toEqual(normalize(e.text));
  expect(a.values).toEqual(e.values);
};
