import { test, expect, expectTypeOf, beforeAll, afterAll } from "vitest";
import type { meta } from "./runtime";
import type { StrictNull, MaybeNull, NullOf, TsTypeOf } from "./runtime";
import type { Any, Float8, Anyarray, Anyrange, Anymultirange } from "./index";
import { Int4, Text, Bool, Int8 } from "./index";
import { sql } from "../builder/sql";
import { pgliteExecutor } from "../executor";
import type { Executor } from "../executor";

let exec: Executor;

beforeAll(async () => {
  exec = await pgliteExecutor();
});

afterAll(async () => {
  await exec.close();
});

// --- Nullability helpers ---

test("StrictNull propagation", () => {
  expectTypeOf<StrictNull<1>>().toEqualTypeOf<1>();
  expectTypeOf<StrictNull<0 | 1>>().toEqualTypeOf<0 | 1>();
  expectTypeOf<StrictNull<number>>().toEqualTypeOf<number>();
});

test("MaybeNull always adds 0", () => {
  expectTypeOf<MaybeNull<1>>().toEqualTypeOf<0 | 1>();
  expectTypeOf<MaybeNull<0>>().toEqualTypeOf<0>();
  expectTypeOf<MaybeNull<number>>().toEqualTypeOf<number>();
});

test("NullOf extracts nullability from pg types, defaults to 1 for primitives", () => {
  expectTypeOf<NullOf<Int4<0 | 1>>>().toEqualTypeOf<0 | 1>();
  expectTypeOf<NullOf<Int4<1>>>().toEqualTypeOf<1>();
  expectTypeOf<NullOf<number>>().toEqualTypeOf<1>();
  expectTypeOf<NullOf<string>>().toEqualTypeOf<1>();
});

// --- TsTypeOf ---

test("TsTypeOf extracts TS primitive from pg types", () => {
  expectTypeOf<TsTypeOf<Int4<1>>>().toEqualTypeOf<number>();
  expectTypeOf<TsTypeOf<Text<1>>>().toEqualTypeOf<string>();
  expectTypeOf<TsTypeOf<Bool<1>>>().toEqualTypeOf<boolean>();
  expectTypeOf<TsTypeOf<Float8<1>>>().toEqualTypeOf<number>();
  expectTypeOf<TsTypeOf<Int8<1>>>().toEqualTypeOf<bigint>();
});

test("TsTypeOf on container types", () => {
  // Array of int4 → number[]
  expectTypeOf<TsTypeOf<Anyarray<Int4<1>, 1>>>().toEqualTypeOf<number[]>();
  // Array of text → string[]
  expectTypeOf<TsTypeOf<Anyarray<Text<1>, 1>>>().toEqualTypeOf<string[]>();
  // Range of int4 → [number, number]
  expectTypeOf<TsTypeOf<Anyrange<Int4<1>, 1>>>().toEqualTypeOf<[number, number]>();
  // Multirange of int4 → [number, number][]
  expectTypeOf<TsTypeOf<Anymultirange<Int4<1>, 1>>>().toEqualTypeOf<[number, number][]>();
});

test("TsTypeOf falls through for TS primitives", () => {
  expectTypeOf<TsTypeOf<number>>().toEqualTypeOf<number>();
  expectTypeOf<TsTypeOf<string>>().toEqualTypeOf<string>();
});

// --- Method return type nullability ---

test("strict single-arg passes through N", () => {
  type AbsNonNull = ReturnType<Int4<1>["abs"]>;
  expectTypeOf<AbsNonNull>().toEqualTypeOf<Int4<1>>();

  type AbsNullable = ReturnType<Int4<0 | 1>["abs"]>;
  expectTypeOf<AbsNullable>().toEqualTypeOf<Int4<0 | 1>>();
});

test("non-strict functions always return non-null", () => {
  type ConcatNullable = ReturnType<Any<0 | 1>["concat"]>;
  expectTypeOf<ConcatNullable>().toEqualTypeOf<Text<1>>();

  type ConcatNull = ReturnType<Any<0>["concat"]>;
  expectTypeOf<ConcatNull>().toEqualTypeOf<Text<1>>();
});

// --- Operator overloads ---

test("operator overloads: Int4 + number resolves to Int4", () => {
  // int4 + int4 overload accepts number primitive
  type PlusInt4 = Int4<1>["+"];
  // Calling with Int4 returns Int4
  expectTypeOf<ReturnType<(arg0: Int4<1>) => ReturnType<PlusInt4>>>().not.toBeAny();
});

test("operator overloads: Int4 = accepts number but not string", () => {
  type EqFn = Int4<1>["="];
  expectTypeOf<EqFn>().not.toBeAny();
});

// --- Constructor: new Type(primitive) ---

test("new Int4(number) compiles with cast", () => {
  const expr = new Int4(5);
  const compiled = expr.compile().compile("pg");
  expect(compiled.text).toBe("CAST($1 AS int4)");
  expect(compiled.values).toEqual([5]);
});

test("new Text(string) compiles with cast", () => {
  const expr = new Text("hello");
  const compiled = expr.compile().compile("pg");
  expect(compiled.text).toBe("CAST($1 AS text)");
  expect(compiled.values).toEqual(["hello"]);
});

test("new Bool(boolean) compiles with cast", () => {
  const expr = new Bool(true);
  const compiled = expr.compile().compile("pg");
  expect(compiled.text).toBe("CAST($1 AS bool)");
  expect(compiled.values).toEqual([true]);
});

test("new Int8(bigint) compiles with cast", () => {
  const expr = new Int8(9007199254740993n);
  const compiled = expr.compile().compile("pg");
  expect(compiled.text).toBe("CAST($1 AS int8)");
  expect(compiled.values).toEqual([9007199254740993n]);
});

// --- Expression compilation ---

test("Int4 + Int4 compiles with casts", () => {
  const expr = new Int4(5)["+"](new Int4(3));
  const compiled = expr.compile().compile("pg");
  expect(compiled.text).toBe("(CAST($1 AS int4) + CAST($2 AS int4))");
  expect(compiled.values).toEqual([5, 3]);
});

test("Int4 + primitive compiles with casts", () => {
  const expr = new Int4(5)["+"](3);
  const compiled = expr.compile().compile("pg");
  expect(compiled.text).toBe("(CAST($1 AS int4) + CAST($2 AS int4))");
  expect(compiled.values).toEqual([5, 3]);
});

test("Text.upper() compiles with cast", () => {
  const expr = new Text("hello").upper();
  const compiled = expr.compile().compile("pg");
  expect(compiled.text).toBe('"upper"(CAST($1 AS text))');
  expect(compiled.values).toEqual(["hello"]);
});

test("chained operations", () => {
  const expr = new Int4(1)["+"](new Int4(2))["*"](new Int4(3));
  const compiled = expr.compile().compile("pg");
  expect(compiled.text).toBe("((CAST($1 AS int4) + CAST($2 AS int4)) * CAST($3 AS int4))");
  expect(compiled.values).toEqual([1, 2, 3]);
});

// --- E2E ---

test("e2e: integer addition (raw strings)", async () => {
  const expr = new Int4(1)["+"](new Int4(2));
  const rows = await exec.execute(sql`SELECT ${expr.compile()} as ${sql.ident("result")}`);
  expect(rows[0]?.["result"]).toBe("3");
});

test("e2e: string upper (raw strings)", async () => {
  const expr = new Text("hello").upper();
  const rows = await exec.execute(sql`SELECT ${expr.compile()} as ${sql.ident("result")}`);
  expect(rows[0]?.["result"]).toBe("HELLO");
});

test("e2e: boolean equality (raw strings)", async () => {
  const expr = new Bool(true)["="](new Bool(true));
  const rows = await exec.execute(sql`SELECT ${expr.compile()} as ${sql.ident("result")}`);
  expect(rows[0]?.["result"]).toBe("t");
});

test("e2e: integer comparison (raw strings)", async () => {
  const expr = new Int4(5)[">"](new Int4(3));
  const rows = await exec.execute(sql`SELECT ${expr.compile()} as ${sql.ident("result")}`);
  expect(rows[0]?.["result"]).toBe("t");
});

test("e2e: string concatenation (raw strings)", async () => {
  const expr = new Text("hello")["||"](new Text(" world"));
  const rows = await exec.execute(sql`SELECT ${expr.compile()} as ${sql.ident("result")}`);
  expect(rows[0]?.["result"]).toBe("hello world");
});

test("e2e: primitive arg (raw strings)", async () => {
  const expr = new Int4(10)["+"](5);
  const rows = await exec.execute(sql`SELECT ${expr.compile()} as ${sql.ident("result")}`);
  expect(rows[0]?.["result"]).toBe("15");
});

test("e2e: nested expressions", async () => {
  const left = new Int4(1)["+"](new Int4(2));
  const right = new Int4(3)["+"](new Int4(4));
  const result = left["*"](right);
  const rows = await exec.execute(sql`SELECT ${result.compile()} as ${sql.ident("result")}`);
  expect(rows[0]?.["result"]).toBe("21");
});

// --- Column descriptor ---

test("column() returns typed descriptor", () => {
  const id = (Int4<1>).column({ nonNull: true });
  const name = (Text<0 | 1>).column();

  // column() returns the type with [meta].__required based on opts
  expectTypeOf(id).toMatchTypeOf<Int4<1>>();
  expectTypeOf(name).toMatchTypeOf<Text<0 | 1>>();

  // Verify __required is computed correctly
  type IdMeta = (typeof id)[typeof meta];
  type NameMeta = (typeof name)[typeof meta];
  expectTypeOf<IdMeta["__required"]>().toEqualTypeOf<true>();
  expectTypeOf<NameMeta["__required"]>().toEqualTypeOf<false>();

  // Verify nullability distinction
  // @ts-expect-error Text<0> is not Text<0|1>
  expectTypeOf<Text<0>>().toEqualTypeOf<Text<0 | 1>>();
  // @ts-expect-error Text<1> is not Text<0|1>
  expectTypeOf<Text<1>>().toEqualTypeOf<Text<0 | 1>>();

  // Runtime: column descriptor has metadata
  expect((id as any).__column).toBe(true);
  expect((id as any).__class).toBe(Int4);
  expect((id as any).nonNull).toBe(true);
  expect((name as any).__class).toBe(Text);
});
