import { test, expect, expectTypeOf, beforeAll, afterAll } from "vitest";
import { pgliteExecutor } from "./executor";
import type { Executor } from "./executor";
import { Database } from "./query-builder";
import { Int4, Text, Bool } from "./types";

let exec: Executor;
let db: Database;

beforeAll(async () => {
  exec = await pgliteExecutor();
  db = new Database(exec);
});

afterAll(async () => {
  await exec.close();
});

// --- values() ---

test("values with single typed row", async () => {
  const q = db.values({ a: new Int4(1), b: new Text("hello") });
  const compiled = q.compile().compile("pg");
  expect(compiled.text).toContain("VALUES");
  expect(compiled.text).toContain("CAST");
});

test("values with multiple rows, second row uses primitives", async () => {
  const q = db.values({ x: new Int4(1), y: new Text("a") }, { x: 2, y: "b" });
  const compiled = q.compile().compile("pg");
  expect(compiled.text).toContain("VALUES");
});

// --- values().select() ---

test("values with select identity", async () => {
  const q = db.values({ num: new Int4(42), name: new Text("test") }).select((n) => n.values);
  const compiled = q.compile().compile("pg");
  expect(compiled.text).toContain("SELECT");
  expect(compiled.text).toContain("VALUES");
});

test("values with select computed column", async () => {
  const q = db.values({ a: new Int4(5), b: new Int4(3) }).select((n) => ({
    sum: n.values.a["+"](n.values.b),
  }));
  const compiled = q.compile().compile("pg");
  expect(compiled.text).toContain("SELECT");
  expect(compiled.text).toContain("+");
});

// --- e2e ---

test("e2e: values single row", async () => {
  const result = await db.values({ a: new Int4(1), b: new Text("hello") }).execute();
  expectTypeOf(result).toEqualTypeOf<{ a: number; b: string }[]>();
  expect(result).toEqual([{ a: 1, b: "hello" }]);
});

test("e2e: values multiple rows", async () => {
  const result = await db.values({ x: new Int4(1), y: new Text("a") }, { x: 2, y: "b" }).execute();
  expectTypeOf(result).toEqualTypeOf<{ x: number; y: string }[]>();
  expect(result).toEqual([
    { x: 1, y: "a" },
    { x: 2, y: "b" },
  ]);
});

test("e2e: values with select expression", async () => {
  const result = await db
    .values({ a: new Int4(10), b: new Int4(20) })
    .select((n) => ({
      sum: n.values.a["+"](n.values.b),
    }))
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ sum: number }[]>();
  expect(result).toEqual([{ sum: 30 }]);
});

test("e2e: values with string upper", async () => {
  const result = await db
    .values({ name: new Text("hello") })
    .select((n) => ({
      upper: n.values.name.upper(),
    }))
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ upper: string }[]>();
  expect(result).toEqual([{ upper: "HELLO" }]);
});

test("e2e: values with mixed types", async () => {
  const result = await db
    .values({ num: new Int4(42), str: new Text("test"), flag: new Bool(true) })
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ num: number; str: string; flag: boolean }[]>();
  expect(result).toEqual([{ num: 42, str: "test", flag: true }]);
});

test("e2e: values with primitive second row", async () => {
  const result = await db.values({ a: new Int4(1) }, { a: 2 }, { a: 3 }).execute();
  expectTypeOf(result).toEqualTypeOf<{ a: number }[]>();
  expect(result).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }]);
});

// --- where ---

test("e2e: where filters rows", async () => {
  const result = await db
    .values({ a: new Int4(1), b: new Text("yes") }, { a: 2, b: "no" }, { a: 3, b: "yes" })
    .where((n) => n.values.a[">"](2))
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ a: number; b: string }[]>();
  expect(result).toEqual([{ a: 3, b: "yes" }]);
});

test("e2e: where with equality", async () => {
  const result = await db
    .values({ x: new Int4(10) }, { x: 20 }, { x: 10 })
    .where((n) => n.values.x["="](10))
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ x: number }[]>();
  expect(result).toEqual([{ x: 10 }, { x: 10 }]);
});

test("where compiles to SQL", () => {
  const q = db.values({ a: new Int4(1) }).where((n) => n.values.a[">"](5));
  const compiled = q.compile().compile("pg");
  expect(compiled.text).toContain("WHERE");
});

// --- groupBy ---

test("groupBy compiles to SQL", () => {
  const q = db
    .values(
      { category: new Text("a"), amount: new Int4(10) },
      { category: "a", amount: 20 },
      { category: "b", amount: 30 },
    )
    .groupBy((n) => [n.values.category]);
  const compiled = q.compile().compile("pg");
  expect(compiled.text).toContain("GROUP BY");
});

test("e2e: groupBy select using numeric index", async () => {
  // n.values.category is the same expression used in groupBy — should work directly
  const result = await db
    .values(
      { category: new Text("x"), val: new Int4(1) },
      { category: "x", val: 2 },
      { category: "y", val: 3 },
    )
    .groupBy((n) => [n.values.category])
    .select(({ 0: cat }) => ({
      cat: cat,
    }))
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ cat: string }[]>();
  expect(result.sort((a, b) => a.cat.localeCompare(b.cat))).toEqual([{ cat: "x" }, { cat: "y" }]);
});

test("e2e: groupBy with select", async () => {
  const result = await db
    .values(
      { category: new Text("a"), amount: new Int4(10) },
      { category: "a", amount: 20 },
      { category: "b", amount: 30 },
    )
    .groupBy((n) => [n.values.category])
    .select((n) => ({
      category: n.values.category,
    }))
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ category: string }[]>();
  expect(result.sort((a, b) => a.category.localeCompare(b.category))).toEqual([
    { category: "a" },
    { category: "b" },
  ]);
});
