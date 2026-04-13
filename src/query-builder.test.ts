import { test, expect, beforeAll, afterAll } from "vitest";
import { pgliteExecutor } from "./executor";
import type { Executor } from "./executor";
import { val } from "./val";
import { sql } from "./sql-builder";

let exec: Executor;

beforeAll(async () => {
  exec = await pgliteExecutor();
});

afterAll(async () => {
  await exec.close();
});

test("val compiles to parameterized sql", () => {
  const five = val(5);
  expect(five.compile().compile("pg")).toEqual({ text: "$1", values: [5] });
});

test("val(5) + val(3) compiles to operator expression", () => {
  const expr = val(5)["+"](val(3));
  const compiled = expr.compile().compile("pg");
  expect(compiled.text).toBe("($1 + $2)");
  expect(compiled.values).toEqual([5, 3]);
});

test("val('hello').upper() compiles to function call", () => {
  const expr = val("hello").upper();
  const compiled = expr.compile().compile("pg");
  expect(compiled.text).toBe('"upper"($1)');
  expect(compiled.values).toEqual(["hello"]);
});

test("e2e: select literal values via pglite", async () => {
  const expr = val(1)["+"](val(2));
  const compiled = expr.compile();
  const wrappedSql = sql`SELECT ${compiled} as "result"`;
  const rows = await exec.execute(wrappedSql);
  expect(rows).toEqual([{ result: "3" }]);
});

test("e2e: string upper via pglite", async () => {
  const expr = val("hello").upper();
  const compiled = expr.compile();
  const wrappedSql = sql`SELECT ${compiled} as "result"`;
  const rows = await exec.execute(wrappedSql);
  expect(rows).toEqual([{ result: "HELLO" }]);
});
