// Property verifier for the sqlite facts (docs/*.json, loaded by
// emit.ts as SIGNATURES) — fast-check generated inputs (seeded per
// function, so CI is reproducible; failures shrink to minimal args)
// against the real SQLite engine (better-sqlite3, the same build the
// driver uses).
//
// Per overload:
//   1. Valid non-null inputs never throw, and typeof(result) matches
//      the claimed return type ("never"/"propagates" ⇒ exactly the
//      claim; "always"/"on_error" ⇒ the claim or NULL).
//   2. nul: "propagates" ⇒ NULL in any single arg position → NULL out.
//   3. nul: "never" ⇒ non-NULL result even with NULL inputs.
//   4. EQUIVALENCE: the emitted typed surface (runtime.match dispatch,
//      primitive serialization, CAST choices, arg order) computes the
//      exact same value and storage class as handwritten SQL. This is
//      the value-level oracle — it tests the layer typegres wrote, with
//      the engine as ground truth.
// Plus the completeness gate: every pragma_function_list name is
// either defined in SIGNATURES or listed in EXCLUSIONS — and every
// non-operator definition exists in pragma_function_list (typo guard).

import { describe, test, expect, beforeAll, afterAll } from "vitest";
import Database from "better-sqlite3";
import * as fs from "node:fs";
import * as path from "node:path";
import fc from "fast-check";
import camelcase from "camelcase";
import { SIGNATURES, EXCLUSIONS } from "./emit.ts";
import type { EmitFn as FnDef, EmitOverload as Overload, EmitArg as ArgDef } from "../emission/facts.ts";
import { UNARY_OPERATOR_ALIASES } from "../emission/common.ts";
import { Database as TypegresDatabase } from "../../database";
import { compile, sql } from "../../builder/sql";
import * as types from "./index";

let db: Database.Database;
beforeAll(() => { db = new Database(":memory:"); });
afterAll(() => { db.close(); });

// Statement texts repeat per (fn, shape) across fast-check runs —
// cache the prepared handles.
const stmtCache = new Map<string, Database.Statement>();
const prep = (text: string): Database.Statement => {
  let s = stmtCache.get(text);
  if (!s) { s = db.prepare(text); stmtCache.set(text, s); }
  return s;
};

// Compile context for the typed-surface side (no driver needed — the
// compiled text/values run on the raw better-sqlite3 handle above).
const tg = new TypegresDatabase({ dialect: "sqlite" });

// Stable per-function seed so CI runs are reproducible; on failure
// fast-check prints the seed + shrunk counterexample.
const seedFor = (s: string): number => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7);
const RUNS = 12;

// --- arbitraries ------------------------------------------------------------
// Canonical values are the TYPED-side primitives (what a user passes
// to a method: number/string/boolean/Uint8Array). toRaw() derives the
// engine-native bind for the handwritten-SQL side: integer-claimed
// numbers bind as BigInt (sqlite3_bind_int64 — better-sqlite3 binds
// every JS number as REAL), booleans as 0n/1n (not bindable at all).

const ARB_TYPE: { [k in string]: fc.Arbitrary<unknown> } = {
  integer: fc.integer({ min: -(2 ** 31), max: 2 ** 31 }),
  real: fc.double({ noNaN: true, noDefaultInfinity: true, min: -1e12, max: 1e12 }),
  text: fc.oneof(fc.string({ maxLength: 12 }), fc.constantFrom("", "quo'te", "αβγ", "Hello World")),
  blob: fc.uint8Array({ maxLength: 8 }),
  bool: fc.boolean(),
  // `any` args reach SQL as bare params (no CAST), where JS numbers
  // land as REAL — so integral numbers are equivalent on both sides.
  any: fc.oneof(
    fc.integer({ min: -1000, max: 1000 }),
    fc.double({ noNaN: true, noDefaultInfinity: true, min: -1e6, max: 1e6 }),
    fc.string({ maxLength: 8 }),
    fc.boolean(),
    fc.uint8Array({ maxLength: 6 }),
  ),
};

const jsonScalar = fc.oneof(
  fc.integer({ min: -100, max: 100 }),
  fc.double({ noNaN: true, noDefaultInfinity: true, min: -1e6, max: 1e6 }),
  fc.string({ maxLength: 6 }),
  fc.boolean(),
  fc.constant(null),
);
const ARB_HINT: { [k in string]: fc.Arbitrary<unknown> } = {
  json: fc.oneof(
    fc.dictionary(fc.string({ minLength: 1, maxLength: 4 }), jsonScalar, { maxKeys: 4 }).map((o) => JSON.stringify(o)),
    fc.array(jsonScalar, { maxLength: 5 }).map((a) => JSON.stringify(a)),
    fc.constantFrom('{}', '[]', '{"a":{"b":"c"},"d":[true,null]}'),
  ),
  jsonpath: fc.constantFrom("$", "$.a", "$[0]", "$.a.b", "$[1]"),
  "json-array": fc.array(jsonScalar, { maxLength: 5 }).map((a) => JSON.stringify(a)),
  "jsonpath-element": fc.constantFrom("$[0]", "$[1]", "$[2]"),
  // JSON can't hold BLOB values — value-position args draw from this.
  plain: fc.oneof(
    fc.integer({ min: -1000, max: 1000 }),
    fc.double({ noNaN: true, noDefaultInfinity: true, min: -1e6, max: 1e6 }),
    fc.string({ maxLength: 8 }),
  ),
  // No 'now': it is statement-time-dependent, and the equivalence
  // property runs the raw and typed statements at different instants.
  datetime: fc
    .date({ min: new Date("1970-01-02"), max: new Date("2099-12-30") })
    .chain((d) => fc.constantFrom(d.toISOString().slice(0, 10), d.toISOString().slice(0, 19).replace("T", " "))),
  "datetime-modifier": fc.constantFrom("+1 day", "-2 hours", "start of month", "weekday 0", "+3 minutes"),
  "strftime-format": fc.constantFrom("%Y", "%Y-%m-%d", "%H:%M", "%s", "%j", "%d/%m"),
  "printf-format": fc.constantFrom("%s", "x=%s!", "[%s]", "%d", "%.2f"),
  "like-pattern": fc.constantFrom("%", "a%", "_b%", "%o%", "abc"),
  "escape-char": fc.constantFrom("\\", "!", "#"),
  percent: fc.double({ noNaN: true, noDefaultInfinity: true, min: 0, max: 100 }),
  fraction: fc.double({ noNaN: true, noDefaultInfinity: true, min: 0, max: 1 }),
  "unit-interval": fc.double({ noNaN: true, noDefaultInfinity: true, min: 0, max: 1 }),
  // Allocation sizes — unbounded integers would allocate GB blobs
  // (zeroblob) or exceed SQLITE_MAX_LENGTH.
  "byte-count": fc.integer({ min: 0, max: 1024 }),
};

const arbFor = (a: ArgDef): fc.Arbitrary<unknown> =>
  a.hint ? ARB_HINT[a.hint]! : ARB_TYPE[a.type!]!;

// Engine-native bind for the handwritten-SQL side.
const toRaw = (a: ArgDef, v: unknown): unknown =>
  typeof v === "boolean" ? (v ? 1n : 0n)
  : a.type === "integer" && typeof v === "number" ? BigInt(v)
  : v;

// BigInt/blob-safe arg rendering for assertion messages.
const fmt = (args: unknown[]): string =>
  `(${args.map((v) => (typeof v === "bigint" ? `${v}n` : v instanceof Uint8Array ? `blob[${v.length}]` : JSON.stringify(v))).join(", ")})`;

// --- probe construction ----------------------------------------------------

const probe = (fn: FnDef, args: unknown[], extraRow?: unknown): string => {
  const qs = args.map(() => "?");
  let sqlText: string;
  if (fn.kind === "binop") {
    sqlText = `SELECT typeof((? ${fn.sql} ?)) AS t`;
  } else if (fn.kind === "unaryop") {
    sqlText = `SELECT typeof((${fn.sql} ?)) AS t`;
  } else if (fn.kind === "aggregate") {
    // arg0 comes from rows; remaining args are per-call.
    sqlText = `WITH d(v) AS (SELECT ? UNION ALL SELECT ?) SELECT typeof(${fn.sql}(v${qs.slice(1).map((q) => `, ${q}`).join("")})) AS t FROM d`;
    args = [args[0], extraRow ?? args[0], ...args.slice(1)];
  } else {
    sqlText = `SELECT typeof(${fn.sql}(${qs.join(", ")})) AS t`;
  }
  const row = prep(sqlText).get(...args) as { t: string };
  return row.t;
};

// Expected storage class for a claimed return type given the args used.
const expectedTypeof = (o: Overload, args: ArgDef[]): string | null => {
  if (o.returns === "arg0") { return args[0]!.type === "bool" ? "integer" : args[0]!.type === "any" ? null : args[0]!.type; }
  if (o.returns === "bool") { return "integer"; }
  if (o.returns === "any") { return null; } // any non-null storage class is fine
  return o.returns;
};

// Arg shapes per overload: optional args exercised both present and
// absent; variadic exercised at +1 repeat.
const shapesOf = (o: Overload): ArgDef[][] => {
  const req = o.args.filter((a) => !a.optional);
  const shapes: ArgDef[][] = [o.args];
  if (req.length !== o.args.length) { shapes.push(req); }
  if (o.variadic) { shapes.push([...o.args, o.args[o.args.length - 1]!]); }
  return shapes;
};

describe("completeness gate", () => {
  test("every pragma_function_list entry is defined or excluded; every non-operator definition exists", () => {
    const pragmaNames = new Set(
      (db.prepare("SELECT DISTINCT name FROM pragma_function_list").all() as { name: string }[]).map((r) => r.name),
    );
    const defined = new Set(SIGNATURES.map((f) => f.sql));
    const excluded = new Set(EXCLUSIONS);

    const unaccounted = [...pragmaNames].filter((n) => !defined.has(n) && !excluded.has(n));
    expect(unaccounted, `pragma functions neither defined nor excluded`).toEqual([]);

    // Operators aren't listed in pragma_function_list (except -> and
    // ->>, which appear as both) — the typo guard applies to
    // functions only. Table-valued functions are eponymous virtual
    // tables, not pragma_function_list entries — their typo guard is
    // that they prepare in FROM position.
    const phantom = SIGNATURES.filter((f) => !f.isSrf && (f.kind === "scalar" || f.kind === "aggregate") && !pragmaNames.has(f.sql)).map((f) => f.sql);
    expect(phantom, `defined but not in pragma_function_list (typo?)`).toEqual([]);
    const srfPhantom = SIGNATURES.filter((f) => f.isSrf).filter((f) => {
      try { db.prepare(`SELECT * FROM ${f.sql}('{}')`); return false; } catch { return true; }
    }).map((f) => f.sql);
    expect(srfPhantom, `SRF defined but not a table-valued function (typo?)`).toEqual([]);

    const doubleBooked = SIGNATURES.filter((f) => excluded.has(f.sql)).map((f) => f.sql);
    expect(doubleBooked, `both defined and excluded`).toEqual([]);
  });
});

describe("determinism facts", () => {
  test("scalar `deterministic` matches the engine's SQLITE_DETERMINISTIC flag", () => {
    // The flag (0x800) is only meaningful on scalar registrations —
    // aggregates never carry it (it's a scalar-expression concept for
    // indexes/generated columns), so the schema convention is
    // aggregates ⇒ deterministic: true (same input set ⇒ same result).
    const rows = db.prepare("SELECT name, flags FROM pragma_function_list WHERE type = 's'").all() as { name: string; flags: number }[];
    const engine = new Map<string, boolean>();
    for (const r of rows) { engine.set(r.name, engine.get(r.name) || !!(r.flags & 0x800)); }
    for (const f of SIGNATURES) {
      if (f.isSrf) {
        // Virtual tables carry no SQLITE_DETERMINISTIC flag; the
        // schema convention is isSrf ⇒ deterministic: true.
        expect(f.deterministic, `${f.sql} (SRF) must claim deterministic: true`).toBe(true);
      } else if (f.kind === "scalar") {
        expect(f.deterministic, `${f.sql} deterministic fact vs engine flag`).toBe(engine.get(f.sql));
      } else if (f.kind === "aggregate") {
        expect(f.deterministic, `${f.sql} (aggregate) must claim deterministic: true`).toBe(true);
      }
    }
  });

  test("non-deterministic functions are not emitted to the typed surface", () => {
    // Mirrors PG's provolatile='i' filter: random/changes/... exist as
    // facts but never as generated methods — reach them via raw
    // sql`random()`.
    const generatedDir = path.join(import.meta.dirname, "generated");
    const generated = fs.readdirSync(generatedDir)
      .filter((f) => f.endsWith(".ts"))
      .map((f) => fs.readFileSync(path.join(generatedDir, f), "utf8"))
      .join("\n");
    const nondet = SIGNATURES.filter((f) => f.deterministic === false);
    expect(nondet.length, "expected some non-deterministic facts").toBeGreaterThan(0);
    for (const f of nondet) {
      expect(generated.includes(`funcCall(${JSON.stringify(f.sql)}`), `${f.sql} must not be emitted`).toBe(false);
    }
  });
});

// Table-valued claims: exact projected column list (names, in order)
// and per-row storage class for concretely-claimed columns, across
// generated args in FROM position.
const verifySrf = (fn: FnDef): void => {
  const cols = fn.outColumns!;
  const stmt = db.prepare(`SELECT * FROM ${fn.sql}('{"a":1}')`);
  expect(stmt.columns().map((c) => c.name), `${fn.sql} projected columns`).toEqual(cols.map((c) => c.name));
  for (const [oi, o] of fn.overloads.entries()) {
    for (const shape of shapesOf(o)) {
      fc.assert(
        fc.property(fc.tuple(...shape.map(arbFor)), (canon) => {
          const args = canon.map((v, i) => toRaw(shape[i]!, v));
          const sel = cols.map((c) => `typeof("${c.name}") AS "${c.name}"`).join(", ");
          let rows: { [column: string]: string }[];
          try {
            rows = db.prepare(`SELECT ${sel} FROM ${fn.sql}(${shape.map(() => "?").join(", ")})`).all(...args) as { [column: string]: string }[];
          } catch (e) {
            throw new Error(`${fn.sql} threw on claimed-valid args ${fmt(args)}: ${(e as Error).message}`, { cause: e });
          }
          for (const row of rows) {
            for (const c of cols) {
              if (c.type === "any") { continue; }
              expect([c.type, "null"], `${fn.sql}${fmt(args)} column ${c.name} storage class`).toContain(row[c.name]);
            }
          }
        }),
        { seed: seedFor(fn.sql) + oi, numRuns: RUNS },
      );
    }
  }
};

describe("signature claims vs engine behavior", () => {
  for (const fn of SIGNATURES) {
    test(`${fn.kind} ${fn.sql}`, () => {
      if (fn.isSrf) {
        verifySrf(fn);
        return;
      }
      for (const [oi, o] of fn.overloads.entries()) {
        for (const [si, shape] of shapesOf(o).entries()) {
          // Aggregates draw arg0 from rows — generate one extra row value.
          const arbs = [...shape.map(arbFor), ...(fn.kind === "aggregate" ? [arbFor(shape[0]!)] : [])];
          fc.assert(
            fc.property(fc.tuple(...arbs), (canon) => {
              const extraRow = fn.kind === "aggregate" ? toRaw(shape[0]!, canon[shape.length]) : undefined;
              const args = canon.slice(0, shape.length).map((v, i) => toRaw(shape[i]!, v));
              // (1) no-throw + return storage class
              let t: string;
              try {
                t = probe(fn, args, extraRow);
              } catch (e) {
                throw new Error(`${fn.sql} threw on claimed-valid args ${fmt(args)}: ${(e as Error).message}`, { cause: e });
              }
              const want = expectedTypeof(o, shape);
              if (o.nullability === "never" || o.nullability === "propagates") {
                if (want !== null) {
                  expect(t, `${fn.sql}${fmt(args)} storage class`).toBe(want);
                } else {
                  expect(t, `${fn.sql}${fmt(args)} must be non-null`).not.toBe("null");
                }
              } else {
                if (want !== null) {
                  expect([want, "null"], `${fn.sql}${fmt(args)} storage class`).toContain(t);
                }
              }
              // (2) NULL propagation / (3) never-null — scalar/op only
              // (aggregates skip NULL rows by definition).
              if (fn.kind !== "aggregate") {
                for (let i = 0; i < shape.length; i++) {
                  if (o.nullPositions && !o.nullPositions.includes(i)) { continue; }
                  const withNull = args.map((v, j) => (j === i ? null : v));
                  const tn = probe(fn, withNull);
                  if (o.nullability === "propagates") {
                    expect(tn, `${fn.sql} with NULL at arg ${i} must propagate NULL`).toBe("null");
                  } else if (o.nullability === "never") {
                    expect(tn, `${fn.sql} with NULL at arg ${i} must stay non-NULL`).not.toBe("null");
                  }
                }
              }
            }),
            { seed: seedFor(fn.sql) + oi * 31 + si, numRuns: RUNS },
          );
        }
      }
    });
  }
});

// --- typed surface ≡ engine ---------------------------------------------------
// The value-level oracle. For generated args, evaluate the SAME call
// two ways and demand identical (value, storage class):
//   raw:   handwritten `SELECT fn(?, ...)` with engine-native binds
//   typed: the emitted method surface — runtime.match dispatch →
//          serialization/CASTs → compiled SQL
// A divergence means the layer typegres wrote (dispatch, casts, arg
// order, serialization) changed the meaning of the call — exactly the
// class of bug the facts can't catch (e.g. a primitive routed through
// a truncating CAST).
//
// Two modes:
//   instance:  non-receiver args wrapped as typed instances
//              (Integer.from(7)...) — pins THIS overload exactly, so
//              every overload (including mixed integer/real arithmetic)
//              is checked against its own raw form.
//   primitive: non-receiver args as bare JS primitives — the common
//              path users take. A primitive can only ever select ONE
//              overload per receiver class (match routes it to the
//              owner / lossless winner), so this mode runs only when
//              dispatch is unambiguous: the fn has a single overload
//              hosted on this receiver.

const HOST_CLASS: { [k in string]: { from: (v: unknown) => unknown } } = {
  integer: types.Integer, real: types.Real, text: types.Text,
  blob: types.Blob, bool: types.Bool, any: types.Any,
};
// Hand-written base members with bespoke signatures — not the generated surface.
const NOT_GENERATED = new Set(["coalesce", "in"]);

const methodName = (fn: FnDef): string =>
  fn.kind === "scalar" || fn.kind === "aggregate" ? camelcase(fn.sql)
  : fn.kind === "unaryop" ? (UNARY_OPERATOR_ALIASES[fn.sql] ?? fn.sql)
  : fn.sql;

const rawCallSql = (fn: FnDef, n: number): string => {
  if (fn.kind === "binop") { return `(? ${fn.sql} ?)`; }
  if (fn.kind === "unaryop") { return `(${fn.sql} ?)`; }
  return `${fn.sql}(${Array.from({ length: n }, () => "?").join(", ")})`;
};

const sameValue = (a: unknown, b: unknown): boolean => {
  if (a instanceof Uint8Array && b instanceof Uint8Array) {
    return a.length === b.length && a.every((x, i) => x === b[i]);
  }
  return Object.is(a, b);
};

// Does a canonical value fit a claimed storage class's primitive domain?
const fitsClaim = (t: string, v: unknown): boolean =>
  t === "integer" ? typeof v === "number" && Number.isInteger(v)
  : t === "real" ? typeof v === "number"
  : t === "text" ? typeof v === "string"
  : t === "blob" ? v instanceof Uint8Array
  : t === "bool" ? typeof v === "boolean"
  : true; // any

// Wrap a canonical value as the typed instance pinning the claimed
// overload. Hint-driven values that don't fit the claim (JSON text
// generated for a JSONB-blob arg — we can't synthesize real JSONB)
// wrap as their natural class instead, exercising the text overload.
const wrap = (a: ArgDef, v: unknown): unknown => {
  const cls = (fitsClaim(a.type!, v)
    ? HOST_CLASS[a.type!]!
    : typeof v === "string" ? types.Text
    : typeof v === "number" ? types.Real
    : types.Any) as { from: (v: unknown) => unknown };
  return cls.from(v);
};

describe("typed surface ≡ engine", () => {
  for (const fn of SIGNATURES) {
    if (fn.isSrf || fn.deterministic === false || NOT_GENERATED.has(fn.sql)) { continue; }
    test(`${fn.kind} ${fn.sql}`, () => {
      for (const [oi, o] of fn.overloads.entries()) {
        const hostedCount = fn.overloads.filter((x) => x.args[0]?.type === o.args[0]?.type).length;
        for (const [si, shape] of shapesOf(o).entries()) {
          // Zero-arg shapes have no receiver — like pg, they're not on
          // the method surface (pi(), unixepoch()); reach them via raw sql.
          if (shape.length === 0) { continue; }
          const modes: ("instance" | "primitive")[] = hostedCount === 1 ? ["instance", "primitive"] : ["instance"];
          for (const [mi, mode] of modes.entries()) {
            fc.assert(
              fc.property(fc.tuple(...shape.map(arbFor)), (canon) => {
                // raw: engine-native binds, handwritten call
                const rawArgs = canon.map((v, i) => toRaw(shape[i]!, v));
                const rawSql = rawCallSql(fn, shape.length);
                const raw = prep(`SELECT typeof(${rawSql}) AS t, ${rawSql} AS v`).get(...rawArgs, ...rawArgs) as { t: string; v: unknown };
                // typed: the method surface
                const receiver = wrap(shape[0]!, canon[0]) as { [m: string]: (...a: unknown[]) => { toSql: () => unknown } };
                const rest = canon.slice(1).map((v, i) => (mode === "instance" ? wrap(shape[i + 1]!, v) : v));
                const expr = receiver[methodName(fn)]!(...rest).toSql();
                const compiled = compile(sql`SELECT typeof(${expr}) AS t, ${expr} AS v`, { database: tg });
                const typed = prep(compiled.text).get(...(compiled.values as unknown[])) as { t: string; v: unknown };
                expect(typed.t, `${fn.sql}${fmt(canon)} [${mode}] typed storage class vs raw`).toBe(raw.t);
                expect(sameValue(typed.v, raw.v), `${fn.sql}${fmt(canon)} [${mode}] typed value ${String(typed.v)} vs raw ${String(raw.v)}`).toBe(true);
              }),
              { seed: seedFor(fn.sql) ^ (oi * 61 + si * 7 + mi), numRuns: RUNS },
            );
          }
        }
      }
    });
  }
});
