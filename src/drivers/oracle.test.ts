// Driver-level smoke for Oracle. Skips unless ORACLE_URL is set so the
// default `npm test` / CI check job stays Docker-free. `bin/startora`
// boots gvenzl/oracle-free:23-slim-faststart and prints the URL.
//
// Exercises: connect, compile :n placeholders, execute a FROM DUAL
// select, bind a param, normalize a NUMBER to a string. No typed
// surface, no query builder — those land in later steps.
import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { OracleDriver } from "./oracle";
import { Database } from "../database";
import { compile, sql } from "../builder/sql";
import type { Connection } from "../database";

const url = process.env["ORACLE_URL"];
const parseUrl = (s: string) => {
  const m = /^([^/]+)\/([^@]+)@(.+)$/.exec(s);
  if (!m) {
    throw new Error(`ORACLE_URL must be user/password@host:port/service, got ${JSON.stringify(s)}`);
  }
  return { user: m[1]!, password: m[2]!, connectString: m[3]! };
};

// Always-on: Connection construction + compile + statement execute, no Oracle process.
test("oracle Connection constructs without a live engine", async () => {
  const db = new Database();
  const conn = db.connect({
    dialect: "oracle",
    execute: async () => ({ rows: [{ v: "1" }] }),
    runInSingleConnection: async () => {
      throw new Error("unused");
    },
    close: async () => {},
  });
  expect(conn.dialect).toBe("oracle");
  expect(compile(sql`SELECT ${1} FROM DUAL`, { database: db })).toEqual({
    text: "SELECT :1 FROM DUAL",
    values: [1],
  });
  expect(await conn.execute(sql`SELECT 1 FROM DUAL`)).toEqual({ rows: [{ v: "1" }] });
  await expect(conn.live(null as never)[Symbol.asyncIterator]().next()).rejects.toThrow(/not supported/);
  await conn.close();
});

describe.skipIf(!url)("oracle driver", () => {
  let driver: OracleDriver;
  let db: Database;
  let conn: Connection;

  beforeAll(async () => {
    driver = await OracleDriver.create(parseUrl(url!));
    db = new Database();
    conn = db.connect(driver);
  });

  afterAll(async () => {
    await conn.close();
  });

  test("dialect is oracle", () => {
    expect(conn.dialect).toBe("oracle");
    expect(db.dialect).toBe("oracle");
  });

  test("compile emits :n placeholders", () => {
    const compiled = compile(sql`SELECT ${1}, ${"x"} FROM DUAL`, { database: db });
    expect(compiled).toEqual({ text: "SELECT :1, :2 FROM DUAL", values: [1, "x"] });
  });

  test("SELECT 1 FROM DUAL returns a string", async () => {
    const result = await conn.execute(
      sql`SELECT 1 AS ${db.scopedIdent("v")} FROM DUAL`,
    );
    expect(result.rows).toEqual([{ v: "1" }]);
  });

  test("bound param round-trips as a string", async () => {
    const result = await conn.execute(
      sql`SELECT ${7} AS ${db.scopedIdent("v")} FROM DUAL`,
    );
    expect(result.rows).toEqual([{ v: "7" }]);
  });

  test("NULL comes back as null", async () => {
    const result = await conn.execute(
      sql`SELECT NULL AS ${db.scopedIdent("v")} FROM DUAL`,
    );
    expect(result.rows).toEqual([{ v: null }]);
  });
});
