// SQLite function-signature inference tool.
//
// Phase 1.1 (SQLite generalization plan).
//
// Reads `pragma_function_list` from an in-memory sqlite instance, runs
// a typed input matrix through each function, and records the observed
// return types per input combination. Output is a JSON snapshot at
// `functions.json` that Phase 1.1 substep C will turn into TS class
// definitions.
//
// -----------------------------------------------------------------------
// Known limits of runtime-only inference (fix later — see plan below):
//
//   1. Null-return ambiguity: `abs(NULL) → NULL` is legitimate null
//      propagation; `datetime(-1) → NULL` is an *error signal*. Both look
//      identical to `SELECT typeof(...)`. We can't tell whether a signature
//      is "valid but nullable" or "invalid — reject at type level".
//   2. Nonsensical coercions surface as valid: SQLite quietly coerces
//      X'01' (blob) → a numeric for `acos()`, so we emit `Blob.acos()`.
//      Semantically wrong; a user would never write that.
//   3. Aggregates/windows probed with a specific arg type get bucketed
//      onto that type: `Integer.count()` gets emitted because we probed
//      count with an integer. `count` really belongs on the shared
//      SqliteValue base (works over any expression).
//   4. Multi-arity overloads collapse: we keep only the shortest arity
//      per (owner, name) to avoid TS "duplicate implementation" errors.
//      `format()`, `substr(x,y)`/`substr(x,y,z)`, etc. lose overloads.
//   5. Heterogeneous arg combinations skipped entirely (see argTuples).
//      `substr(text, int, int)` isn't emitted.
//
// -----------------------------------------------------------------------
// Best final plan (defer to Phase 1.4-ish):
//
//   LLM-over-docs with runtime as sanity check. Concretely:
//
//   a. Fetch the SQLite doc pages (lang_corefunc.html, lang_datefunc.html,
//      lang_aggfunc.html, lang_mathfunc.html, json1.html, windowfunctions.html)
//      into a vendored snapshot. Version-pin to the sqlite build we
//      target so codegen stays reproducible in CI.
//
//   b. Provide the model a **deterministic template** — one JSON schema
//      per function that must be filled:
//        {
//          name: string,
//          overloads: [{
//            args: Array<{ type: SqliteType | "any", nullable: boolean, notes?: string }>,
//            variadic: boolean,
//            returnType: SqliteType | "arg[0]" | "arg[N]",  // may reference args
//            returnNullable: "propagates" | "always" | "on_error",
//            kind: "scalar" | "aggregate" | "window",
//            jsDoc: string
//          }],
//        }
//      The schema forces the model to commit to null semantics
//      (propagates vs error-signal) and canonical return types, which is
//      exactly what runtime probing can't disambiguate.
//
//   c. Batch by doc page (~20-30 functions each) to amortize prompt cost
//      and keep the model's context focused on a coherent group.
//
//   d. **Sanity check** by replaying this runtime tool's observations
//      against the LLM output. Divergences are flagged, not silently
//      preferred either way — a human confirms. Cases:
//        - Model says arg X is invalid, runtime succeeds → probably fine
//          (SQLite's affinity coercion is looser than docs).
//        - Model says arg X returns Y, runtime returns Z → hard mismatch,
//          block codegen until resolved.
//        - Model omits a function pragma_function_list emits → block.
//
//   e. Emit .ts from the *merged* signature (docs-primary, runtime-verified).
//      Runtime file (this one) keeps generating `functions.json` as the
//      inventory; the LLM step produces `signatures.json` on top.
//
// The current runtime-only output serves as a useful diff target for step
// (d) — divergences point at exactly the semantically-nonsense methods
// (Blob.acos etc.) that docs would prune.
//
// -----------------------------------------------------------------------
// Current design choices (this file):
//   - Same-type matrix (all args the same storage class) covers polymorphic
//     dispatch on primary type: abs(int)→int, abs(real)→real, etc.
//     Heterogeneous combinations (e.g. substr(text, int, int)) are skipped.
//   - narg semantics: 0..N = fixed arity; -1 = variadic; -3 = "≥ 2" (min/max).
//     Variadic gets probed at arity 1 and 2. narg > 3 skipped (rare).
//   - Aggregates ('a') and window functions ('w') are noted but their
//     return-type inference happens over a single-row grouping so `typeof()`
//     works. Windows use OVER () so they compile as expressions.
//   - Blob input literal is `X'01'` (a single byte, enough to trigger blob
//     handling paths).
import Database from "better-sqlite3";
import * as fs from "node:fs";
import * as path from "node:path";

type SqliteType = "integer" | "real" | "text" | "blob" | "null";
const TYPES: SqliteType[] = ["integer", "real", "text", "blob", "null"];

// SQL literal that produces each type. `typeof(literal)` returns the
// storage class name; we use these both as inputs and to key our matrix.
const LITERALS: Record<SqliteType, string> = {
  integer: "1",
  real:    "1.5",
  text:    "'x'",
  blob:    "X'01'",
  null:    "NULL",
};

interface FunctionRow {
  name: string;
  builtin: number;
  type: "s" | "a" | "w";
  enc: string;
  narg: number;
  flags: number;
}

interface Observation {
  args: readonly SqliteType[];
  result?: SqliteType;
  error?: string;
}

interface FunctionSig {
  name: string;
  type: "s" | "a" | "w";
  narg: number; // raw from pragma; -1 variadic, -3 ≥2
  variadic: boolean;
  observations: Observation[];
}

const listFunctions = (db: Database.Database): FunctionRow[] => {
  return db
    .prepare<[], FunctionRow>("SELECT name, builtin, type, enc, narg, flags FROM pragma_function_list ORDER BY name, narg")
    .all();
};

// Probe arities to try for a given narg. Positive → that exact arity.
// -1 (variadic) → 1, 2. -3 (min/max: ≥2) → 2, 3. Skip narg > 3.
const aritiesToProbe = (narg: number): number[] => {
  if (narg === 0) {return [0];}
  if (narg > 0 && narg <= 3) {return [narg];}
  if (narg > 3) {return [];} // skip; hand-curate
  if (narg === -1) {return [1, 2];}
  if (narg === -3) {return [2, 3];}
  return []; // unknown negative; skip
};

// Enumerate arg-type tuples for a given arity. For arity ≤ 2 we do the
// full 5^arity Cartesian product; for arity 3 we only do same-type tuples
// to keep the matrix small.
const argTuples = (arity: number): SqliteType[][] => {
  if (arity === 0) {return [[]];}
  if (arity === 1) {return TYPES.map((t) => [t]);}
  if (arity === 2) {return TYPES.flatMap((a) => TYPES.map((b) => [a, b]));}
  if (arity === 3) {return TYPES.map((t) => [t, t, t]);}
  return [];
};

// Build the actual probe SQL. For scalar functions: `SELECT typeof(fn(...))`.
// For aggregates: same but wrap in a subquery so the aggregate has a row
// to consume. For windows: `SELECT typeof(fn(...) OVER ())` — again inside
// a subquery so there's data.
const probeSql = (fn: FunctionRow, args: SqliteType[]): string => {
  const argList = args.map((t) => LITERALS[t]).join(", ");
  const call = `${fn.name}(${argList})`;
  if (fn.type === "s") {
    return `SELECT typeof(${call}) AS t`;
  }
  if (fn.type === "a") {
    // Aggregate needs rows to aggregate over. Feed a 1-row dummy.
    return `SELECT typeof(${call}) AS t FROM (SELECT 1)`;
  }
  // Window
  return `SELECT typeof(${call} OVER ()) AS t FROM (SELECT 1)`;
};

const probe = (db: Database.Database, fn: FunctionRow, args: SqliteType[]): Observation => {
  const sql = probeSql(fn, args);
  try {
    const row = db.prepare(sql).get() as { t: string } | undefined;
    const result = (row?.t ?? "null") as SqliteType;
    return { args: [...args], result };
  } catch (e) {
    return { args: [...args], error: (e as Error).message };
  }
};

const inferFunctionSig = (db: Database.Database, fn: FunctionRow): FunctionSig => {
  const arities = aritiesToProbe(fn.narg);
  const observations: Observation[] = [];
  for (const a of arities) {
    for (const tuple of argTuples(a)) {
      observations.push(probe(db, fn, tuple));
    }
  }
  return {
    name: fn.name,
    type: fn.type,
    narg: fn.narg,
    variadic: fn.narg < 0,
    observations,
  };
};

// Group by function name so overloads (same name, different arities like
// count(0), count(1)) show up as separate arity entries under one function.
const groupByName = (sigs: FunctionSig[]): { [name: string]: FunctionSig[] } => {
  const acc = new Map<string, FunctionSig[]>();
  for (const s of sigs) {
    const arr = acc.get(s.name) ?? [];
    arr.push(s);
    acc.set(s.name, arr);
  }
  return Object.fromEntries(acc);
};

// --- Class distribution + TS emission -----------------------------------

// Storage-class name → typegres class name.
const CLASS_FOR: Record<Exclude<SqliteType, "null">, string> = {
  integer: "Integer",
  real:    "Real",
  text:    "Text",
  blob:    "Blob",
};

// A method to emit on a class: name (camelCased), the SQL function name,
// the arg-type sequence (first arg is the receiver, so args[0] === owner),
// and the observed return storage class.
interface Method {
  tsName: string;   // e.g. "abs"
  sqlName: string;  // e.g. "abs"
  ownerType: Exclude<SqliteType, "null">;
  argTypes: readonly Exclude<SqliteType, "null">[]; // after arg[0] (owner) — remaining args
  resultType: Exclude<SqliteType, "null">;
  fnType: "s" | "a" | "w";
  variadic: boolean;
}

// Camelcase without a dependency — small enough to inline.
const camel = (s: string): string =>
  s.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());

// Distribute a function's observations into per-owner-type Methods. Rules:
//   - Consider only "clean" same-type observations (all args same storage
//     class, non-null result, no error). Heterogeneous overloads (e.g.
//     substr(text, int, int)) are punted to hand-curated overrides.
//   - For each type X where args=[X,...,X] gives result R (non-null),
//     emit a method on X returning R.
//   - Zero-arg functions (arity 0) become static on SqliteValue — collected
//     separately below.
const methodsFor = (sig: FunctionSig): Method[] => {
  const out: Method[] = [];
  for (const obs of sig.observations) {
    if (obs.error || !obs.result || obs.result === "null") {continue;}
    if (obs.args.length === 0) {continue;}
    const first = obs.args[0]!;
    if (first === "null") {continue;}
    const allSame = obs.args.every((a) => a === first);
    if (!allSame) {continue;} // heterogeneous — defer
    out.push({
      tsName: camel(sig.name),
      sqlName: sig.name,
      ownerType: first,
      argTypes: obs.args.slice(1) as Exclude<SqliteType, "null">[],
      resultType: obs.result as Exclude<SqliteType, "null">,
      fnType: sig.type,
      variadic: sig.variadic,
    });
  }
  return out;
};

// Deduplicate methods with the same (owner, tsName) — keep the shortest
// arity (usually the base overload; TS overloads require a unified
// implementation signature which the first-pass codegen doesn't emit,
// so multiple declarations per method name collide as duplicate
// implementations. Multi-arity overloads land in a follow-up).
const dedup = (methods: Method[]): Method[] => {
  const seen = new Map<string, Method>();
  for (const m of methods) {
    const k = `${m.ownerType}::${m.tsName}`;
    const prev = seen.get(k);
    if (!prev || m.argTypes.length < prev.argTypes.length) {seen.set(k, m);}
  }
  return [...seen.values()];
};

// Whether an override for the given SQLite storage class exists under
// overrides/. Callers pass the override root (typically `src/types/sqlite`)
// so codegen:check with `--out-dir` still checks the committed overrides.
const overrideExistsFor = (overridesRoot: string, ownerType: string): boolean =>
  fs.existsSync(path.join(overridesRoot, "overrides", `${ownerType}.ts`));

const emitClassFile = (
  ownerType: Exclude<SqliteType, "null">,
  methods: readonly Method[],
  overridesRoot: string,
): string => {
  const className = CLASS_FOR[ownerType];
  const argClass = (t: Exclude<SqliteType, "null">): string => `types.${CLASS_FOR[t]}`;
  const lines: string[] = [];
  lines.push("// Auto-generated by src/types/sqlite/generate.ts — do not edit.");
  lines.push("// One method per (owner-type, function-name); same-type-args only.");
  lines.push("// Heterogeneous overloads (e.g. substr) will be added via hand-");
  lines.push("// curated overrides (Phase 1.4).");
  lines.push('import { SqliteValue } from "../base";');
  lines.push('import { sql, type Sql } from "../../../builder/sql";');
  lines.push('import { meta } from "../../sql-value";');
  lines.push('import * as runtime from "../../runtime";');
  lines.push('import * as types from "../index";');
  lines.push("");
  lines.push(`export class ${className}<in out N extends number> extends SqliteValue<N> {`);
  lines.push("  declare [meta]: {");
  lines.push(`    __class: typeof ${className};`);
  lines.push("    __raw: Sql;");
  lines.push("    __nullability: N;");
  lines.push(`    __nullable: ${className}<0 | 1>;`);
  lines.push(`    __nonNullable: ${className}<1>;`);
  lines.push(`    __aggregate: ${className}<number>;`);
  lines.push(`    __any: ${className}<any>;`);
  lines.push("  };");
  lines.push(`  static override __typname = sql\`${ownerType.toUpperCase()}\`;`);
  lines.push(`  static override __typnameText = "${ownerType}";`);
  // Return-type marker for TsTypeOf. Overrides under overrides/ provide
  // the runtime parser AND a narrower return type (integer/real →
  // number, bool → boolean). Codegen still emits a `declare` here for
  // the classes that don't have an override (text → string, blob →
  // Uint8Array) so their rows type correctly.
  const declaredTsType: Record<Exclude<SqliteType, "null">, string> = {
    integer: "number",
    real:    "number",
    text:    "string",
    blob:    "Uint8Array",
  };
  if (!overrideExistsFor(overridesRoot, ownerType)) {
    lines.push(`  declare deserialize: (raw: string) => ${declaredTsType[ownerType]};`);
  }
  lines.push("");

  // Per-storage-class JS primitive that gets accepted alongside the
  // typegres instance. Blob has no meaningful JS primitive so its
  // methods reject non-Blob args at runtime (see registry sentinel).
  const primitiveOf: Record<Exclude<SqliteType, "null">, string | null> = {
    integer: "number",
    real:    "number",
    text:    "string",
    blob:    null,
  };
  for (const m of methods) {
    const retClass = argClass(m.resultType);
    const params = m.argTypes.map((t, i) => {
      const prim = primitiveOf[t];
      const tParam = prim
        ? `M${i} extends ${argClass(t)}<any> | ${prim}`
        : `M${i} extends ${argClass(t)}<any>`;
      return { tParam, argParam: `arg${i}: M${i}` };
    });
    const tsGenerics = params.length > 0
      ? `<${params.map((p) => p.tParam).join(", ")}>`
      : "";
    const paramList = params.map((p) => p.argParam).join(", ");
    const nullTerms = ["N", ...m.argTypes.map((_, i) => `runtime.NullOf<M${i}>`)];
    const nullExpr = nullTerms.length === 1 ? nullTerms[0]! : `runtime.StrictNull<${nullTerms.join(" | ")}>`;
    // Runtime dispatch via runtime.match for arg validation + serialization,
    // then runtime.funcCall for the actual Func node (dialect-tagged via
    // the target return type's static .dialect).
    const matchers = m.argTypes.map((t) => {
      const prim = primitiveOf[t];
      return prim
        ? `{ type: ${argClass(t)}, allowPrimitive: true }`
        : `{ type: ${argClass(t)} }`;
    }).join(", ");
    const inputArgs = m.argTypes.map((_, i) => `arg${i}`).join(", ");
    lines.push(`  ${m.tsName}${tsGenerics}(${paramList}): ${retClass}<${nullExpr}> {`);
    lines.push(`    const [__rt, ...__rest] = runtime.match([${inputArgs}], [[[${matchers}], ${retClass}]]);`);
    lines.push(`    return runtime.funcCall("${m.sqlName}", [this, ...__rest], __rt) as ${retClass}<${nullExpr}>;`);
    lines.push("  }");
  }
  lines.push("}");
  lines.push("");
  return lines.join("\n");
};

const emitClasses = (
  sigs: FunctionSig[],
  generatedDir: string,
  overridesRoot: string,
): void => {
  const allMethods = sigs.flatMap(methodsFor);
  const byOwner: Record<Exclude<SqliteType, "null">, Method[]> = {
    integer: [], real: [], text: [], blob: [],
  };
  for (const m of allMethods) {
    byOwner[m.ownerType].push(m);
  }

  for (const owner of Object.keys(byOwner) as Exclude<SqliteType, "null">[]) {
    const methods = dedup(byOwner[owner]).sort((a, b) => a.tsName.localeCompare(b.tsName));
    const src = emitClassFile(owner, methods, overridesRoot);
    const out = path.join(generatedDir, `${owner}.ts`);
    fs.writeFileSync(out, src);
    console.log(`  ${owner}.ts: ${methods.length} methods`);
  }
};

const main = () => {
  const db = new Database(":memory:");
  const sqliteVersion = (db.prepare("SELECT sqlite_version() AS v").get() as { v: string }).v;
  const functions = listFunctions(db);

  const sigs: FunctionSig[] = [];
  for (const fn of functions) {
    sigs.push(inferFunctionSig(db, fn));
  }
  db.close();

  const output = {
    sqlite_version: sqliteVersion,
    generated_at: new Date().toISOString(),
    function_count: functions.length,
    functions: groupByName(sigs),
  };

  const outDirFlag = process.argv.indexOf("--out-dir");
  const outDir = outDirFlag >= 0
    ? path.resolve(process.argv[outDirFlag + 1]!)
    : path.resolve(import.meta.dirname);
  // Create both outDir and outDir/generated up front so the JSON write
  // below doesn't ENOENT when `--out-dir` points at a fresh tmp path
  // (codegen:check).
  const generatedDir = path.join(outDir, "generated");
  fs.mkdirSync(generatedDir, { recursive: true });
  const jsonPath = path.join(outDir, "functions.json");
  fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2) + "\n");
  console.log(`Wrote ${functions.length} functions to ${jsonPath}`);
  // codegen:check writes to a tmp dir but the committed overrides
  // still live under `src/types/sqlite/overrides/`. Point the
  // override-detection helper at the source tree so `--out-dir`
  // runs see the same override set as a normal codegen run.
  const overridesRoot = path.resolve(import.meta.dirname);
  emitClasses(sigs, generatedDir, overridesRoot);
  // Barrel always targets the committed source path (matches PG codegen).
  // The re-emit is idempotent — a `--out-dir` (codegen:check) run rewrites
  // the same block back to the same file with the same content, and the
  // diff step only inspects the `generated/` subdir anyway.
  updateBarrel(path.join(overridesRoot, "index.ts"));
};

// Rewrite the [generated-start]...[generated-end] block of index.ts to
// list all classes we just emitted. Classes that have a hand-written
// override under overrides/<name>.ts are re-exported from there;
// everything else comes straight from generated/.
const updateBarrel = (barrelPath: string): void => {
  const classes = ["Blob", "Bool", "Integer", "Real", "Text"];
  const overridesDir = path.join(path.dirname(barrelPath), "overrides");
  const hasOverride = (c: string): boolean =>
    fs.existsSync(path.join(overridesDir, `${c.toLowerCase()}.ts`));
  const block =
    "// [generated-start]\n" +
    classes
      .map((c) => {
        const dir = hasOverride(c) ? "overrides" : "generated";
        return `export { ${c} } from "./${dir}/${c.toLowerCase()}";`;
      })
      .join("\n") +
    "\n// [generated-end]";
  const cur = fs.readFileSync(barrelPath, "utf8");
  const next = cur.replace(
    /\/\/ \[generated-start\][\s\S]*?\/\/ \[generated-end\]/,
    block,
  );
  fs.writeFileSync(barrelPath, next);
};

main();
