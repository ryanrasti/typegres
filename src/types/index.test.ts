import { test, expect, expectTypeOf, beforeAll, afterAll } from "vitest";
import type { meta } from "./runtime";
import type { StrictNull, MaybeNull, NullOf, TsTypeOf } from "./runtime";
import type { Any, Float8, Anyrange, Anymultirange } from "./index";
import { Int4, Text, Bool, Int8, Record, Anyarray } from "./index";
import { sql, Alias } from "../builder/sql";
import { pgExecutor } from "../executor";
import type { Executor } from "../executor";

let exec: Executor;

beforeAll(async () => {
  exec = pgExecutor(undefined, { max: 1 });
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
  // Range / multirange have no override; deserialize falls through to
  // Any.deserialize which returns unknown. Pg's range output format is
  // non-trivial (quoting, bracket kinds, infinity bounds) so callers who
  // want structured bounds can do their own parsing.
  expectTypeOf<TsTypeOf<Anyrange<Int4<1>, 1>>>().toEqualTypeOf<unknown>();
  expectTypeOf<TsTypeOf<Anymultirange<Int4<1>, 1>>>().toEqualTypeOf<unknown>();
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

test("Int4.from(number) compiles with cast", () => {
  const expr = Int4.from(5);
  const compiled = expr.toSql().compile("pg");
  expect(compiled.text).toBe("CAST($1 AS int4)");
  expect(compiled.values).toEqual([5]);
});

test("Text.from(string) compiles with cast", () => {
  const expr = Text.from("hello");
  const compiled = expr.toSql().compile("pg");
  expect(compiled.text).toBe("CAST($1 AS text)");
  expect(compiled.values).toEqual(["hello"]);
});

test("Bool.from(boolean) compiles with cast", () => {
  const expr = Bool.from(true);
  const compiled = expr.toSql().compile("pg");
  expect(compiled.text).toBe("CAST($1 AS bool)");
  expect(compiled.values).toEqual([true]);
});

test("Int8.from(bigint) compiles with cast", () => {
  const expr = Int8.from(9007199254740993n);
  const compiled = expr.toSql().compile("pg");
  expect(compiled.text).toBe("CAST($1 AS int8)");
  expect(compiled.values).toEqual([9007199254740993n]);
});

// --- Expression compilation ---

test("Int4 + Int4 compiles with casts", () => {
  const expr = Int4.from(5)["+"](Int4.from(3));
  const compiled = expr.toSql().compile("pg");
  expect(compiled.text).toBe("(CAST($1 AS int4) + CAST($2 AS int4))");
  expect(compiled.values).toEqual([5, 3]);
});

test("Int4 + primitive compiles with casts", () => {
  const expr = Int4.from(5)["+"](3);
  const compiled = expr.toSql().compile("pg");
  expect(compiled.text).toBe("(CAST($1 AS int4) + CAST($2 AS int4))");
  expect(compiled.values).toEqual([5, 3]);
});

test("Text.upper() compiles with cast", () => {
  const expr = Text.from("hello").upper();
  const compiled = expr.toSql().compile("pg");
  expect(compiled.text).toBe('"upper"(CAST($1 AS text))');
  expect(compiled.values).toEqual(["hello"]);
});

test("chained operations", () => {
  const expr = Int4.from(1)["+"](Int4.from(2))["*"](Int4.from(3));
  const compiled = expr.toSql().compile("pg");
  expect(compiled.text).toBe("((CAST($1 AS int4) + CAST($2 AS int4)) * CAST($3 AS int4))");
  expect(compiled.values).toEqual([1, 2, 3]);
});

// --- E2E ---

test("e2e: integer addition (raw strings)", async () => {
  const expr = Int4.from(1)["+"](Int4.from(2));
  const result = await exec.execute(sql`SELECT ${expr.toSql()} as ${sql.ident("result")}`);
  expect(result.rows[0]?.["result"]).toBe("3");
});

test("e2e: string upper (raw strings)", async () => {
  const expr = Text.from("hello").upper();
  const result = await exec.execute(sql`SELECT ${expr.toSql()} as ${sql.ident("result")}`);
  expect(result.rows[0]?.["result"]).toBe("HELLO");
});

test("e2e: boolean equality (raw strings)", async () => {
  const expr = Bool.from(true)["="](Bool.from(true));
  const result = await exec.execute(sql`SELECT ${expr.toSql()} as ${sql.ident("result")}`);
  expect(result.rows[0]?.["result"]).toBe("t");
});

test("e2e: integer comparison (raw strings)", async () => {
  const expr = Int4.from(5)[">"](Int4.from(3));
  const result = await exec.execute(sql`SELECT ${expr.toSql()} as ${sql.ident("result")}`);
  expect(result.rows[0]?.["result"]).toBe("t");
});

test("e2e: string concatenation (raw strings)", async () => {
  const expr = Text.from("hello")["||"](Text.from(" world"));
  const result = await exec.execute(sql`SELECT ${expr.toSql()} as ${sql.ident("result")}`);
  expect(result.rows[0]?.["result"]).toBe("hello world");
});

test("e2e: primitive arg (raw strings)", async () => {
  const expr = Int4.from(10)["+"](5);
  const result = await exec.execute(sql`SELECT ${expr.toSql()} as ${sql.ident("result")}`);
  expect(result.rows[0]?.["result"]).toBe("15");
});

test("e2e: nested expressions", async () => {
  const left = Int4.from(1)["+"](Int4.from(2));
  const right = Int4.from(3)["+"](Int4.from(4));
  const expr = left["*"](right);
  const result = await exec.execute(sql`SELECT ${expr.toSql()} as ${sql.ident("result")}`);
  expect(result.rows[0]?.["result"]).toBe("21");
});

// --- Column descriptor ---

test("column() returns typed instance bound to alias", () => {
  const alias = new Alias("users");
  const id = (Int4<1>).column(alias, "id", { nonNull: true });
  const name = (Text<0 | 1>).column(alias, "name");

  // column() returns an Any instance with the __required type brand.
  expectTypeOf(id).toMatchTypeOf<Int4<1>>();
  expectTypeOf(name).toMatchTypeOf<Text<0 | 1>>();
  expect(id).toBeInstanceOf(Int4);
  expect(name).toBeInstanceOf(Text);

  // Verify __required is computed correctly at the type level.
  type IdMeta = (typeof id)[typeof meta];
  type NameMeta = (typeof name)[typeof meta];
  expectTypeOf<IdMeta["__required"]>().toEqualTypeOf<true>();
  expectTypeOf<NameMeta["__required"]>().toEqualTypeOf<false>();

  // Verify nullability distinction
  // @ts-expect-error Text<0> is not Text<0|1>
  expectTypeOf<Text<0>>().toEqualTypeOf<Text<0 | 1>>();
  // @ts-expect-error Text<1> is not Text<0|1>
  expectTypeOf<Text<1>>().toEqualTypeOf<Text<0 | 1>>();
});

// --- Bool logic ---

test("Bool.and / or / not", async () => {
  const a = Bool.from(true) as Bool<1>;
  const b = Bool.from(false) as Bool<1>;

  // and
  const andResult = await exec.execute(sql`SELECT ${a.and(b).toSql()} as result`);
  expect(andResult.rows[0]!["result"]).toBe("f");

  // or
  const orResult = await exec.execute(sql`SELECT ${a.or(b).toSql()} as result`);
  expect(orResult.rows[0]!["result"]).toBe("t");

  // not
  const notResult = await exec.execute(sql`SELECT ${a.not().toSql()} as result`);
  expect(notResult.rows[0]!["result"]).toBe("f");

  // chaining: (true AND false) OR true → true
  const chainResult = await exec.execute(sql`SELECT ${a.and(b).or(a).toSql()} as result`);
  expect(chainResult.rows[0]!["result"]).toBe("t");

  // type: and/or propagate nullability
  expectTypeOf(a.and(b)).toEqualTypeOf<Bool<1>>();
  const nullable = Bool.from(sql`NULL::bool`) as Bool<0 | 1>;
  expectTypeOf(nullable.and(a)).toEqualTypeOf<Bool<0 | 1>>();
  expectTypeOf(a.not()).toEqualTypeOf<Bool<1>>();
});

// --- coalesce ---

test("coalesce nullability", async () => {
  const nonNull = Text.from("hello") as Text<1>;
  const nullable = Text.from(sql`NULL::text`) as Text<0 | 1>;

  // non-null coalesce anything → non-null
  expectTypeOf(nonNull.coalesce(nullable)).toEqualTypeOf<Text<1>>();

  // nullable coalesce non-null → non-null
  expectTypeOf(nullable.coalesce(nonNull)).toEqualTypeOf<Text<1>>();

  // nullable coalesce nullable → nullable
  expectTypeOf(nullable.coalesce(nullable)).toEqualTypeOf<Text<0 | 1>>();

  // runtime: coalesce picks first non-null
  const result = await exec.execute(sql`SELECT ${nullable.coalesce(nonNull).toSql()} as val`);
  expect(result.rows[0]!["val"]).toBe("hello");

  // chaining
  const fallback = Text.from("default") as Text<1>;
  const chained = nullable.coalesce(nullable).coalesce(fallback);
  expectTypeOf(chained).toEqualTypeOf<Text<1>>();
  const chainResult = await exec.execute(sql`SELECT ${chained.toSql()} as val`);
  expect(chainResult.rows[0]!["val"]).toBe("default");

  // @ts-expect-error — Int4 is not assignable to Text
  nonNull.coalesce(Int4.from(1) as Int4<1>);
});

// --- IS NULL / IS NOT NULL ---

test("isNull / isNotNull", async () => {
  const val = Int4.from(5);
  const nullable = Text.from(sql`NULL::text`);

  // type: always returns Bool<1> (the check itself is never null)
  expectTypeOf(val.isNull()).toEqualTypeOf<Bool<1>>();
  expectTypeOf(val.isNotNull()).toEqualTypeOf<Bool<1>>();
  expectTypeOf(nullable.isNull()).toEqualTypeOf<Bool<1>>();

  // runtime
  const r1 = await exec.execute(sql`SELECT ${val.isNull().toSql()} as result`);
  expect(r1.rows[0]!["result"]).toBe("f");

  const r2 = await exec.execute(sql`SELECT ${val.isNotNull().toSql()} as result`);
  expect(r2.rows[0]!["result"]).toBe("t");

  const r3 = await exec.execute(sql`SELECT ${nullable.isNull().toSql()} as result`);
  expect(r3.rows[0]!["result"]).toBe("t");
});

// --- Container element-type forwarding (unnest) ---

test("Anyarray.unnest() preserves element type at the type level", () => {
  // Before the container→T forwarding fix, codegen resolved the unnest
  // return type to the abstract Anyelement base, dropping the element type
  // info at both the type and runtime levels. Now `T` threads through,
  // so unnesting an Int4 array yields Int4-typed rows.
  type ArrType = ReturnType<typeof Anyarray.of<Int4<any>>>;
  type SrfRow = ReturnType<InstanceType<ArrType>["unnest"]>["rowType"];
  expectTypeOf<SrfRow["unnest"]>().toMatchTypeOf<Int4<any>>();
});

// TODO: Anyarray.of() stores the element *instance* as static __element, but
// runtime.pgElement expects the element *constructor*. Fixing this requires
// changing Anyarray.of to store element.constructor (or introducing a
// separate constructor field). Once fixed, extend this test with e2e
// execution asserting that the yielded rows deserialize through the
// element type's parser.

// --- Composite + array deserialization edge cases ---

// Helper: build a Record class bound to a column schema. `.from(sql`\``)`
// gives us an instance so we can call the prototype-installed deserialize.
const makeRecord = <T extends { [k: string]: Any<any> }>(cols: T) =>
  Record.of(cols).from(sql``);

test("record deserialize: NULL vs empty string", () => {
  const r = makeRecord({
    a: Int4.from(null as any),
    b: Text.from(null as any),
    c: Int4.from(null as any),
  });

  // Unquoted empty between commas = pg NULL.
  expect(r.deserialize("(1,,3)")).toEqual({ a: 1, b: null, c: 3 });

  // Quoted empty = real empty string.
  expect(r.deserialize('(1,"",3)')).toEqual({ a: 1, b: "", c: 3 });

  // Mixed: trailing field null.
  expect(r.deserialize("(1,hi,)")).toEqual({ a: 1, b: "hi", c: null });

  // All-null composite.
  expect(r.deserialize("(,,)")).toEqual({ a: null, b: null, c: null });
});

test("record deserialize: quoted strings with commas and backslash escapes", () => {
  const r = makeRecord({
    a: Text.from(null as any),
    b: Text.from(null as any),
  });

  // Quoted value containing commas — must not split the field.
  expect(r.deserialize('("a,b,c",hi)')).toEqual({ a: "a,b,c", b: "hi" });

  // Backslash-escaped quote inside quoted value.
  expect(r.deserialize('("say \\"hi\\"",ok)')).toEqual({ a: 'say "hi"', b: "ok" });
});

test("array deserialize: NULL element vs literal \"NULL\" string", () => {
  const IntArr = Anyarray.of(Int4.from(null as any));
  const arr = IntArr.from(sql``);

  // Unquoted NULL is pg null.
  expect(arr.deserialize("{1,NULL,3}")).toEqual([1, null, 3]);
  expect(arr.deserialize("{NULL}")).toEqual([null]);

  const TextArr = Anyarray.of(Text.from(null as any));
  const tarr = TextArr.from(sql``);

  // Quoted "NULL" is the 4-char string.
  expect(tarr.deserialize('{"NULL",x}')).toEqual(["NULL", "x"]);
  // Mixed: unquoted NULL stays null even next to a literal "NULL".
  expect(tarr.deserialize('{NULL,"NULL",x}')).toEqual([null, "NULL", "x"]);
});

test("array deserialize: quoted strings with commas and empty elements", () => {
  const TextArr = Anyarray.of(Text.from(null as any));
  const arr = TextArr.from(sql``);

  // Comma inside quoted element — don't split.
  expect(arr.deserialize('{"a,b","c,d"}')).toEqual(["a,b", "c,d"]);

  // Quoted empty string — valid array element.
  expect(arr.deserialize('{"","hi"}')).toEqual(["", "hi"]);

  // Empty array.
  expect(arr.deserialize("{}")).toEqual([]);
});

test("array of records: nested deserialize", () => {
  // record(a int4, b text) → {"(1,hi)","(2,bye)"} → [{a:1,b:"hi"}, {a:2,b:"bye"}]
  const R = Record.of({ a: Int4.from(null as any), b: Text.from(null as any) });
  const Arr = Anyarray.of(R.from(sql``));
  const arr = Arr.from(sql``);

  expect(arr.deserialize('{"(1,hi)","(2,bye)"}')).toEqual([
    { a: 1, b: "hi" },
    { a: 2, b: "bye" },
  ]);

  // Nested composite with a NULL inner field.
  expect(arr.deserialize('{"(1,)","(2,ok)"}')).toEqual([
    { a: 1, b: null },
    { a: 2, b: "ok" },
  ]);
});

test("record containing an array: nested deserialize", () => {
  // Pg wraps the inner array in quotes when embedded in a composite, so
  // commas inside {a,b} don't break the composite split.
  const TextArr = Anyarray.of(Text.from(null as any));
  const R = Record.of({
    id: Int4.from(null as any),
    tags: TextArr.from(sql``),
  });
  const r = R.from(sql``);

  // "{a,b,c}" is the array field; composite parser sees it as one value.
  // Array parser then splits {a,b,c} into its elements.
  expect(r.deserialize('(1,"{a,b,c}")')).toEqual({
    id: 1,
    tags: ["a", "b", "c"],
  });

  // Empty array inside composite.
  expect(r.deserialize('(1,"{}")')).toEqual({ id: 1, tags: [] });
});

// --- Type.from() ---

test("Type.from() precise nullability", () => {
  // Primitive → non-null (1)
  expectTypeOf(Int4.from(5)).toEqualTypeOf<Int4<1>>();
  expectTypeOf(Text.from("hello")).toEqualTypeOf<Text<1>>();
  expectTypeOf(Bool.from(true)).toEqualTypeOf<Bool<1>>();
  expectTypeOf(Int8.from(42n)).toEqualTypeOf<Int8<1>>();

  // Sql → nullable (0|1)
  expectTypeOf(Int4.from(sql`1`)).toEqualTypeOf<Int4<0 | 1>>();
  expectTypeOf(Text.from(sql`'hello'`)).toEqualTypeOf<Text<0 | 1>>();
});
