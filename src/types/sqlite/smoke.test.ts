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
import { Integer, Real, Text, Blob, Bool } from "./index";

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

test("emitted Integer method accepts a JS-native primitive arg", async () => {
  // atan2 takes a second numeric arg — the emitted signature allows a
  // number primitive alongside the typed Integer.
  const expr = Integer.from(1).atan2(1);
  const r = await conn.execute(sql`SELECT ${expr.toSql()} as v`);
  expect(parseFloat(r.rows[0]!["v"]!)).toBeCloseTo(Math.PI / 4, 5);
});

test("same-return integer/real twins route primitives to Real (no truncation)", async () => {
  // atan2's Integer and Real overloads both return Real, so a number
  // primitive must serialize via the value-preserving Real case —
  // CAST(? AS REAL), not CAST(? AS INTEGER) (which truncated 0.5 → 0
  // and returned π/2). Where returns DIFFER (minus/plus/...),
  // fractional numbers fail dispatch instead (see the
  // integral-vs-fractional test below).
  const expr = Integer.from(1).atan2(0.5);
  const compiled = compile(expr.toSql(), { database: db });
  // Receiver literal casts INTEGER (Integer.from(1)); the primitive
  // ARG casts REAL.
  expect(compiled.text).toContain("CAST(? AS REAL)");
  const r = await conn.execute(sql`SELECT ${expr.toSql()} as v`);
  expect(parseFloat(r.rows[0]!["v"]!)).toBeCloseTo(Math.atan2(1, 0.5), 5);
});

test("integer positions never silently truncate fractional numbers", async () => {
  // Integral numbers take the integer overload — INTEGER semantics.
  const intDiv = Integer.from(7).divide(2);
  expect((await conn.execute(sql`SELECT ${intDiv.toSql()} as v`)).rows[0]!["v"]).toBe("3");
  // Fractional numbers don't fit any primitive-accepting overload on
  // an Integer receiver — rejected at dispatch, not truncated to 0.
  expect(() => (Integer.from(7) as any).divide(0.5)).toThrow(/No matching overload/);
  // Explicit truncation stays available as a cast.
  const trunc = Integer.from(2.9);
  expect((await conn.execute(sql`SELECT ${trunc.toSql()} as v`)).rows[0]!["v"]).toBe("2");
});

test("Blob roundtrip: driver normalizes to \\x-hex; deserialize parses back", async () => {
  const r = await conn.execute(sql`SELECT ${Blob.from(new Uint8Array([1, 255])).toSql()} as v`);
  expect(r.rows[0]!["v"]).toBe("\\x01ff");
  expect(Blob.from(new Uint8Array()).deserialize(r.rows[0]!["v"]!)).toEqual(new Uint8Array([1, 255]));
});

test(".in() accepts Uint8Array (the blob primitive)", async () => {
  const hit = Blob.from(new Uint8Array([1, 2])).in(new Uint8Array([1, 2]), new Uint8Array([3]));
  expect((await conn.execute(sql`SELECT ${hit.toSql()} as v`)).rows[0]!["v"]).toBe("1");
});

test("json_each: table-valued function via db.from", async () => {
  const each = Text.from('{"a":1,"b":2}').jsonEach();
  const rows = await conn.execute(db.from(each).orderBy(({ json_each }) => json_each.key));
  expect(rows).toMatchObject([
    { key: "a", value: "1", type: "integer" },
    { key: "b", value: "2", type: "integer" },
  ]);
});

test("optional-arity dispatch: omitted and supplied optional args both match", async () => {
  // Regression: match had no arity gate, so a zero-matcher case
  // ([[ ]], e.g. round()'s no-arg overload) vacuously matched ANY
  // call and serialization crashed indexing past the matcher list.
  const r0 = await conn.execute(sql`SELECT ${Real.from(2.567).round().toSql()} as v`);
  expect(parseFloat(r0.rows[0]!["v"]!)).toBe(3);
  const r2 = await conn.execute(sql`SELECT ${Real.from(2.567).round(2).toSql()} as v`);
  expect(parseFloat(r2.rows[0]!["v"]!)).toBeCloseTo(2.57, 5);
  // Wrong-typed args reject cleanly, not with a crash.
  expect(() => (Text.from("now") as any).date(123)).toThrow(/No matching overload/);
  // Extra args on a single-overload one-liner follow JS convention:
  // dropped (the impl binds declared params only), never reaching SQL.
  const s = await conn.execute(sql`SELECT ${(Integer.from(-5) as any).sign(1, 2).toSql()} as v`);
  expect(s.rows[0]!["v"]).toBe("-1");
});

test("wrong primitive type: TS refuses AND runtime.match throws", () => {
  // Strict runtime model: match validates every call (RPC or direct),
  // so casting past TS doesn't fall through to SQLite coercion — it
  // throws at the gate. SQLite's dynamism is reachable only via
  // explicit cast().
  // @ts-expect-error — atan2 does not accept a string
  const bad = () => Integer.from(1).atan2("nope");
  expect(bad).toThrow(/No matching overload/);
});

test("breadth: string / arithmetic / JSON / datetime surface composes", async () => {
  // string
  const up = Text.from("abc").upper()["||"]("!");
  expect((await conn.execute(sql`SELECT ${up.toSql()} as v`)).rows[0]!["v"]).toBe("ABC!");
  // arithmetic: integer division truncates (typed positions CAST to INTEGER)
  const div = Integer.from(7).divide(2);
  expect((await conn.execute(sql`SELECT ${div.toSql()} as v`)).rows[0]!["v"]).toBe("3");
  // JSON: jsonExtract honestly returns Any (SQL value of unknown
  // class) — numeric methods aren't on Any, so the user asserts
  // intent via cast() to keep going. That's the narrow-views model.
  const j = Text.from('{"a":{"b":41}}').jsonExtract("$.a.b").cast(Integer).plus(1);
  expect((await conn.execute(sql`SELECT ${j.toSql()} as v`)).rows[0]!["v"]).toBe("42");
  // datetime — receiver is the FORMAT string (100% SQL call-order
  // fidelity: strftime(format, time, ...) ⇒ format.strftime(time)).
  const year = Text.from("%Y").strftime("2025-01-15");
  const r = await conn.execute(sql`SELECT ${year.toSql()} as a`);
  expect(r.rows[0]).toEqual({ a: "2025" });
  // comparisons return Bool
  const cmp = Integer.from(3).gt(2).and(Bool.from(true));
  expect((await conn.execute(sql`SELECT ${cmp.toSql()} as v`)).rows[0]!["v"]).toBe("1");
});

test("placed methods: wrong-view calls are type errors AND runtime-absent (RPC strictness)", async () => {
  // Methods live on the class whose storage class matches their
  // receiver argument's documented domain. That curates BOTH gates: TS refuses
  // wrong-view calls, and — decisive for RPC callers, who only see
  // the prototype — the method simply doesn't exist on the wrong
  // view. An Integer stub can't dispatch .upper() at all.
  const t = Text.from("x");
  const i = Integer.from(2);
  // @ts-expect-error — plus is numeric-only
  const _e1 = () => t.plus(1);
  // @ts-expect-error — upper is Text-only
  const _e2 = () => i.upper();
  // @ts-expect-error — jsonExtract is Text/Blob-only
  const _e3 = () => i.jsonExtract("$");
  // Runtime dispatch surface matches the types (prototype placement):
  expect((t as any).plus).toBeUndefined();
  expect((i as any).upper).toBeUndefined();
  expect((i as any).jsonExtract).toBeUndefined();
  expect(typeof (i as any).plus).toBe("function");
  // runtime.match rejects wrong-typed args at the gate even on a
  // correctly-placed method:
  expect(() => (t as any).like(Buffer.from([1]))).toThrow(/No matching overload/);

  // arg0-returns narrow through the generic this (min/max/nullif).
  const m = i.max();
  const n = i.nullif(2);
  const r = await conn.execute(sql`SELECT ${n.toSql()} as v, ${i.min().toSql()} as w`);
  expect(r.rows[0]).toEqual({ v: null, w: "2" });
  // Type-level: nullable variants of the receiver's view, not Any.
  const _m: Integer<0 | 1> = m;
  const _n: Integer<0 | 1> = n;
});

test("numeric binop primitives: integral numbers cast to the claim; fractional reject", async () => {
  // TS can't split integral from fractional `number`, so the decl
  // accepts any number while claiming Integer. The runtime keeps the
  // claim honest: integral operands serialize via a lossless
  // CAST(? AS INTEGER); fractional operands fail dispatch instead of
  // silently truncating.
  const one = Integer.from(1);
  const viaPrim = one.minus(2);
  const _viaPrim: Integer<1> = viaPrim;
  const r1 = await conn.execute(sql`SELECT ${viaPrim.toSql()} as v, typeof(${viaPrim.toSql()}) as t`);
  expect(r1.rows[0]).toEqual({ v: "-1", t: "integer" });
  // The compiled SQL carries the forced cast.
  const compiled = compile(viaPrim.toSql(), { database: db });
  expect(compiled.text).toContain("CAST(? AS INTEGER)");
  expect(() => (one as any).minus(2.5)).toThrow(/No matching overload/);

  // Cross-type stays honest via instances — distinguishable in TS.
  const viaReal = one.minus(Real.from(2.5));
  const _viaReal: Real<1> = viaReal;
  const r2 = await conn.execute(sql`SELECT ${viaReal.toSql()} as v, typeof(${viaReal.toSql()}) as t`);
  expect(r2.rows[0]).toEqual({ v: "-1.5", t: "real" });
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
