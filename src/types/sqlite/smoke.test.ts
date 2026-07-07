// End-to-end smoke tests for the SQLite dialect. Exercises the full
// pipeline: typed-value construction → composed method calls →
// compile with sqlite ctx (? placeholders) → better-sqlite3 execute
// → row normalization → user gets a value.
//
// These tests are the first-real-world validation of the Phase 0
// dialect wiring on the SQLite side. If the ctx doesn't dispatch,
// the tests fail with `$1` in the SQL text; if the codegen'd methods
// don't compose, TS fails at build time; if the driver adapter is
// broken, the runtime throws.
import { test, expect, beforeAll, afterAll } from "vitest";
import { SqliteDriver } from "../../driver";
import type { Connection } from "../../database";
import { Database } from "../../database";
import { compile, sql } from "../../builder/sql";
import { Integer, Text } from "./index";

let driver: SqliteDriver;
let db: Database;
let conn: Connection;

beforeAll(async () => {
  driver = await SqliteDriver.create(":memory:");
  db = new Database({ dialect: "sqlite" });
  conn = db.attach(driver);
});

afterAll(async () => {
  await conn.close();
});

test("Integer.abs on a negative literal", async () => {
  const expr = Integer.from(-5).abs();
  const r = await conn.execute(sql`SELECT ${expr.toSql()} as v`);
  expect(r.rows[0]!["v"]).toBe("5");
});

test("Integer.abs composed with itself is idempotent", async () => {
  const expr = Integer.from(-3).abs().abs();
  const r = await conn.execute(sql`SELECT ${expr.toSql()} as v`);
  expect(r.rows[0]!["v"]).toBe("3");
});

test("Text.upper on a literal", async () => {
  const expr = Text.from("hello").upper();
  const r = await conn.execute(sql`SELECT ${expr.toSql()} as v`);
  expect(r.rows[0]!["v"]).toBe("HELLO");
});

test("Text.upper composed with Text.length", async () => {
  const expr = Text.from("hello").upper().length();
  const r = await conn.execute(sql`SELECT ${expr.toSql()} as v`);
  expect(r.rows[0]!["v"]).toBe("5");
});

test("Text.lower composed with Text.upper (round-trip)", async () => {
  const expr = Text.from("Hello").upper().lower();
  const r = await conn.execute(sql`SELECT ${expr.toSql()} as v`);
  expect(r.rows[0]!["v"]).toBe("hello");
});

test("isNull returns 1 for NULL, 0 for a value", async () => {
  const nullExpr = Text.from(sql`NULL`).isNull();
  const notNullExpr = Text.from("x").isNull();
  const r = await conn.execute(
    sql`SELECT ${nullExpr.toSql()} AS n, ${notNullExpr.toSql()} AS nn`,
  );
  // SQLite returns 1/0 as integer for boolean expressions; we normalize to strings
  expect(r.rows[0]!["n"]).toBe("1");
  expect(r.rows[0]!["nn"]).toBe("0");
});

test("isNotNull is inverse of isNull", async () => {
  const expr = Text.from("x").isNotNull();
  const r = await conn.execute(sql`SELECT ${expr.toSql()} as v`);
  expect(r.rows[0]!["v"]).toBe("1");
});

test(".in() matches a literal in a small list", async () => {
  const expr = Integer.from(3).in(1, 2, 3);
  const r = await conn.execute(sql`SELECT ${expr.toSql()} as v`);
  expect(r.rows[0]!["v"]).toBe("1");
});

test(".in() rejects when no literal matches", async () => {
  const expr = Integer.from(99).in(1, 2, 3);
  const r = await conn.execute(sql`SELECT ${expr.toSql()} as v`);
  expect(r.rows[0]!["v"]).toBe("0");
});

test("codegen'd Integer method accepts a JS-native primitive arg", async () => {
  // atan2 takes a second Integer arg — the emit shape allows a
  // number primitive alongside the typed Integer via runtime.match.
  const expr = Integer.from(1).atan2(1);
  const r = await conn.execute(sql`SELECT ${expr.toSql()} as v`);
  expect(parseFloat(r.rows[0]!["v"]!)).toBeCloseTo(Math.PI / 4, 5);
});

test("codegen'd method rejects the wrong JS primitive type at runtime", async () => {
  // atan2 doesn't accept a string primitive — runtime.match throws.
  expect(() => Integer.from(1).atan2("nope" as unknown as number))
    .toThrow(/No matching overload/);
});

test("placeholder emission uses ? not $N", async () => {
  // Integer.from(5) wraps in a TypedParam; compile should emit `?`.
  const expr = Integer.from(5);
  const r = await conn.execute(sql`SELECT ${expr.toSql()} as v`);
  expect(r.rows[0]!["v"]).toBe("5");
  // Direct compile probe — belt-and-suspenders.
  const compiled = compile(expr.toSql(), { database: db });
  expect(compiled.text).toContain("?");
  expect(compiled.text).not.toContain("$");
});
