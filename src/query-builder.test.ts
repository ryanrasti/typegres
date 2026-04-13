import { test, expect, beforeAll, afterAll } from "vitest";
import { pgliteExecutor } from "./executor";
import type { Executor } from "./executor";
import { Int4, Text, Bool } from "./types";
import { sql } from "./sql-builder";

let exec: Executor;

beforeAll(async () => {
  exec = await pgliteExecutor();
});

afterAll(async () => {
  await exec.close();
});

// --- values() e2e tests ---

test("e2e: values with single row", async () => {
  const rows = await exec.execute(
    sql`SELECT * FROM (VALUES (${new Int4(1).compile()}, ${new Text("hello").compile()})) AS t(${sql.ident("a")}, ${sql.ident("b")})`,
  );
  expect(rows).toEqual([{ a: 1, b: "hello" }]);
});

test("e2e: values with multiple rows", async () => {
  const rows = await exec.execute(
    sql`SELECT * FROM (VALUES (${new Int4(1).compile()}, ${new Text("a").compile()}), (${new Int4(2).compile()}, ${new Text("b").compile()})) AS t(${sql.ident("x")}, ${sql.ident("y")})`,
  );
  expect(rows).toEqual([
    { x: 1, y: "a" },
    { x: 2, y: "b" },
  ]);
});

test("e2e: values with select expression", async () => {
  const rows = await exec.execute(
    sql`SELECT ${sql.ident("a")} + ${sql.ident("b")} as ${sql.ident("sum")} FROM (VALUES (${new Int4(10).compile()}, ${new Int4(20).compile()})) AS t(${sql.ident("a")}, ${sql.ident("b")})`,
  );
  expect(rows).toEqual([{ sum: 30 }]);
});

test("e2e: values with string functions", async () => {
  const rows = await exec.execute(
    sql`SELECT "upper"(${sql.ident("name")}) as ${sql.ident("result")} FROM (VALUES (${new Text("hello").compile()})) AS t(${sql.ident("name")})`,
  );
  expect(rows).toEqual([{ result: "HELLO" }]);
});

test("e2e: values with mixed types", async () => {
  const rows = await exec.execute(
    sql`SELECT * FROM (VALUES (${new Int4(42).compile()}, ${new Text("test").compile()}, ${new Bool(true).compile()})) AS t(${sql.ident("num")}, ${sql.ident("str")}, ${sql.ident("flag")})`,
  );
  expect(rows).toEqual([{ num: 42, str: "test", flag: true }]);
});
