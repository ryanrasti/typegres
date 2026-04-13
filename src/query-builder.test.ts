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

// --- SQL compilation ---

test("val(number) compiles with cast", () => {
  const compiled = val(5).compile().compile("pg");
  expect(compiled.text).toBe("CAST($1 AS int4)");
  expect(compiled.values).toEqual([5]);
});

test("val(string) compiles with cast", () => {
  const compiled = val("hello").compile().compile("pg");
  expect(compiled.text).toBe("CAST($1 AS text)");
  expect(compiled.values).toEqual(["hello"]);
});

test("val(boolean) compiles with cast", () => {
  const compiled = val(true).compile().compile("pg");
  expect(compiled.text).toBe("CAST($1 AS bool)");
  expect(compiled.values).toEqual([true]);
});

test("val(bigint) compiles with cast", () => {
  const compiled = val(9007199254740993n).compile().compile("pg");
  expect(compiled.text).toBe("CAST($1 AS int8)");
  expect(compiled.values).toEqual([9007199254740993n]);
});

test("val(5) + val(3) compiles with casts", () => {
  const expr = val(5)["+"](val(3));
  const compiled = expr.compile().compile("pg");
  expect(compiled.text).toBe("(CAST($1 AS int4) + CAST($2 AS int4))");
  expect(compiled.values).toEqual([5, 3]);
});

test("val(5) + 3 compiles with casts (primitive arg)", () => {
  const expr = val(5)["+"](3);
  const compiled = expr.compile().compile("pg");
  expect(compiled.text).toBe("(CAST($1 AS int4) + CAST($2 AS int4))");
  expect(compiled.values).toEqual([5, 3]);
});

test("val('hello').upper() compiles with cast", () => {
  const expr = val("hello").upper();
  const compiled = expr.compile().compile("pg");
  expect(compiled.text).toBe('"upper"(CAST($1 AS text))');
  expect(compiled.values).toEqual(["hello"]);
});

test("chained operations preserve casts", () => {
  const expr = val(1)["+"](val(2))["*"](val(3));
  const compiled = expr.compile().compile("pg");
  expect(compiled.text).toBe("((CAST($1 AS int4) + CAST($2 AS int4)) * CAST($3 AS int4))");
  expect(compiled.values).toEqual([1, 2, 3]);
});

// --- E2E with pglite ---

test("e2e: integer addition", async () => {
  const expr = val(1)["+"](val(2));
  const rows = await exec.execute(sql`SELECT ${expr.compile()} as "result"`);
  expect(rows[0]?.["result"]).toBe(3);
});

test("e2e: string upper", async () => {
  const expr = val("hello").upper();
  const rows = await exec.execute(sql`SELECT ${expr.compile()} as "result"`);
  expect(rows[0]?.["result"]).toBe("HELLO");
});

test("e2e: boolean equality", async () => {
  const expr = val(true)["="](val(true));
  const rows = await exec.execute(sql`SELECT ${expr.compile()} as "result"`);
  expect(rows[0]?.["result"]).toBe(true);
});

test("e2e: integer comparison", async () => {
  const expr = val(5)[">"](val(3));
  const rows = await exec.execute(sql`SELECT ${expr.compile()} as "result"`);
  expect(rows[0]?.["result"]).toBe(true);
});

test("e2e: string concatenation", async () => {
  const expr = val("hello")["||"](val(" world"));
  const rows = await exec.execute(sql`SELECT ${expr.compile()} as "result"`);
  expect(rows[0]?.["result"]).toBe("hello world");
});

test("e2e: primitive arg (number + number)", async () => {
  const expr = val(10)["+"](5);
  const rows = await exec.execute(sql`SELECT ${expr.compile()} as "result"`);
  expect(rows[0]?.["result"]).toBe(15);
});
