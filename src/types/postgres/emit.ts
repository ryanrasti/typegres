import pg from "pg";
import camelcase from "camelcase";
import { OPERATOR_ALIASES } from "../emission/common.ts";
import {
  writeGeneratedTree,
  chromeImportLines,
  metaDeclareLines,
  typnameStaticLines,
  scanOverrideNames,
  type EmitFn,
  type TypeEntry,
  type Nullability,
  type ClassChrome,
} from "../emission/emit.ts";
import * as path from "node:path";
import { pathToFileURL } from "node:url";
import { requireDatabaseUrl } from "../../pg.ts";
import {
  introspect,
  groupByFirstArg,
  type PgType,
  type PgFunc,
} from "./introspect.ts";

// `--out-dir <path>` lets codegen:check write to a temp dir instead of
// clobbering the committed sources.
const outDirFlag = process.argv.indexOf("--out-dir");
const GENERATED_DIR = outDirFlag >= 0
  ? path.resolve(process.argv[outDirFlag + 1]!)
  : path.resolve(import.meta.dirname, "generated");
const OVERRIDES_DIR = path.resolve(import.meta.dirname, "overrides");
const TYPES_INDEX = path.resolve(import.meta.dirname, "index.ts");

// TS-primitive `typeof` accepted by each pg type via allowPrimitive. The
// concrete override files (overrides/int4.ts, overrides/bool.ts, ...)
// set `static primitiveTs` to the same value — this map only exists
// so codegen can build `M0 extends Cls<any> | number` in method arg
// constraints and disambiguate primitive-sig-colliding overloads. Add
// an entry here when adding a matching overrides/<name>.ts; everything
// unlisted defaults to "string" (identity).
const primitiveTsFor = (typname: string): string => {
  switch (typname) {
    case "bool":   return "boolean";
    case "int2":
    case "int4":
    case "float4":
    case "float8":
    case "oid":    return "number";
    default:       return "string";
  }
};

// Types that get a generic <T extends Any<any>> parameter
const GENERIC_TYPES = new Set([
  "anyarray",
  "anycompatiblearray",
  "anyrange",
  "anycompatiblerange",
  "anymultirange",
  "anycompatiblemultirange",
]);

// Types that become T when referenced from other classes
// (they represent "the element type" in polymorphic signatures)
const ELEMENT_TYPES = new Set([
  "anyelement",
  "anynonarray",
  "anycompatible",
  "anycompatiblenonarray",
  "anyenum",
]);

const EXTENDS_MAP: { [key: string]: string } = {
  anycompatible: "Any",
  anyelement: "Anycompatible",
  anycompatiblenonarray: "Anyelement",
  anynonarray: "Anycompatiblenonarray",
  anyenum: "Anynonarray",
  anycompatiblearray: "Anyelement",
  anyarray: "Anycompatiblearray",
  anycompatiblerange: "Anyelement",
  anyrange: "Anycompatiblerange",
  anycompatiblemultirange: "Anyelement",
  anymultirange: "Anycompatiblemultirange",
};

// Operators that can return null from non-null inputs (e.g. JSON key not
// found). Includes the pg function names for the same ops, since those
// are emitted when the operator doesn't have a readable alias in
// OPERATOR_ALIASES (see introspect.ts oprcode filter).
const MAYBE_NULL_OPS = new Set([
  "->", "->>", "#>", "#>>",
  "jsonb_object_field", "jsonb_object_field_text",
  "jsonb_extract_path", "jsonb_extract_path_text",
  "json_object_field", "json_object_field_text",
  "json_extract_path", "json_extract_path_text",
]);

// Readable aliases for operators pg doesn't give a nice function name
// (comparison + arithmetic). Emitted as a second method next to the
// bracketed form:
//     ['=']<M>(arg: M): Bool<...>   // already emitted
//     eq<M>(arg: M): Bool<...>      // alias
//
// introspect.ts hides pg's oprcode implementations only for operators
// in this map — so `int4eq`, `int42pl`, etc. don't clutter the types,
// but pg's readable function names for unaliased operators (`texticlike`
// for ~~*, `jsonb_object_field` for ->, `array_prepend` for ||, ...)
// stay available alongside the bracketed form.

// --- Facts ------------------------------------------------------------------
// Catalog-independent signature facts — the instance the unified
// emitter consumes. Generated on the fly from the catalog (never
// committed): the catalog IS the source of truth, so unlike sqlite's
// LLM-extracted JSONs there is nothing to review or verify. Types are
// typnames (strings), not OIDs; args INCLUDE the receiver position
// (the emitter places by the FIRST arg's type — the same rule as
// sqlite). Order: per-host catalog buckets, functions before
// operators, so per-host emission order is stable.
const produceFacts = (typeMap: Map<number, PgType>, pgFuncs: PgFunc[]): EmitFn[] => {
  const nameOf = (oid: number): string | null => typeMap.get(oid)?.typname ?? null;
  const grouped = groupByFirstArg(pgFuncs);
  const out: EmitFn[] = [];
  for (const [oid, funcs] of grouped) {
    const host = typeMap.get(oid);
    if (!host) { continue; }
    // Group real pg overloads (same name) into one fact; skip the
    // subtype-incompatible overload sets that each subtype defines
    // for itself.
    const funcGroups = new Map<string, PgFunc[]>();
    const operatorGroups = new Map<string, PgFunc[]>();
    for (const f of funcs) {
      if (host.typname === "anyelement" && f.isOperator && f.name === "<@") { continue; } // overloaded: array<@array, range<@range, elem<@multirange
      if (host.typname === "anycompatible" && f.isOperator && f.name === "||") { continue; } // overloaded: text||text, array||array, bytea||bytea, etc.
      if (host.typname === "anynonarray" && f.isOperator && f.name === "||") { continue; } // overloaded: text||anynonarray, but concrete types define their own ||
      if (host.typname === "anycompatible" && !f.isOperator && f.name === "width_bucket") { continue; } // overloaded with different arities by float8, numeric
      const groups = f.isOperator ? operatorGroups : funcGroups;
      const key = f.isOperator ? f.name : camelcase(f.name);
      if (!groups.has(key)) { groups.set(key, []); }
      groups.get(key)!.push(f);
    }
    const toFact = (group: PgFunc[]): EmitFn => {
      const f0 = group[0]!;
      const nullability = (f: PgFunc): Nullability => {
        if (f.isAggregate) { return f.name === "count" ? "never" : "always"; }
        if (MAYBE_NULL_OPS.has(f.name)) { return "maybe_null"; }
        return f.isStrict ? "propagates" : "never";
      };
      return {
        sql: f0.name,
        kind: f0.isOperator ? "binop" : f0.isAggregate ? "aggregate" : "scalar",
        isSrf: f0.isSrf ?? false,
        outColumns: f0.outColumns?.map((c) => ({ name: c.name, type: typeMap.get(c.typeOid)!.typname })),
        overloads: group.map((f) => ({
          args: f.argTypes.map((argOid) => ({ type: nameOf(argOid) })),
          returns: nameOf(f.returnType),
          nullability: nullability(f),
        })),
      };
    };
    out.push(
      ...[...funcGroups.values()].map(toFact),
      ...[...operatorGroups.values()].map(toFact),
    );
  }
  return out;
};

const scanOverrides = (): Set<string> => scanOverrideNames(OVERRIDES_DIR);

// --- class chrome ------------------------------------------------------------
// The pg class shell around the unified method pipeline: imports,
// heritage (pseudotype hierarchy), meta declare + statics for
// concrete types.
const pgChrome = (
  pgType: TypeEntry,
  nameTable: Map<string, TypeEntry>,
  overrideNames: Set<string>,
): ClassChrome => {
  const isGeneric = GENERIC_TYPES.has(pgType.typname);
  const extendsClass = EXTENDS_MAP[pgType.typname];
  const parentIsContainer = extendsClass !== undefined
    && [...GENERIC_TYPES].some((n) => nameTable.get(n)?.className === extendsClass);

  const parentTypname = pgType.typname === "any"
    ? undefined
    : extendsClass
      ? Object.keys(EXTENDS_MAP).find((k) => nameTable.get(k)?.className === extendsClass)
        ?? "any"
      : "anynonarray";
  const parentImport = pgType.typname === "any"
    ? 'import { SqlValue } from "../../sql-value";'
    : `import { ${nameTable.get(parentTypname!)!.className} } from "../${
        overrideNames.has(parentTypname!) ? "overrides" : "generated"}/${parentTypname}";`;

  const lines: string[] = [];
  lines.push("// Auto-generated — do not edit");
  lines.push(...chromeImportLines(parentImport));

  // Explicit `in out N` variance annotation skips TS's structural
  // variance inference across 77 mutually-referencing classes.
  let classDecl = `export class ${pgType.className}`;
  if (isGeneric) {
    classDecl += `<T extends types.Any<any>, in out N extends number>`;
  } else {
    classDecl += `<in out N extends number>`;
  }
  if (extendsClass) {
    // Parent takes T only if it's a container itself.
    classDecl += parentIsContainer
      ? ` extends ${extendsClass}<T, N>`
      : ` extends ${extendsClass}<N>`;
  } else if (pgType.typname === "any") {
    classDecl += ` extends SqlValue<N>`;
  } else {
    classDecl += ` extends Anynonarray<N>`;
  }
  classDecl += " {";
  lines.push(classDecl);

  if (pgType.typname === "any") {
    // Handled by override — no-op here
  } else if (!EXTENDS_MAP[pgType.typname]) {
    // Concrete type — narrow [meta] + statics; `declare deserialize`
    // return-type marker unless a hand-written override provides it.
    const cls = pgType.className;
    const ref = overrideNames.has(pgType.typname) ? `types.${cls}` : cls;
    lines.push(...metaDeclareLines(ref));
    lines.push(...typnameStaticLines(pgType.typname, pgType.typname, false));
    if (!overrideNames.has(pgType.typname)) {
      lines.push(`  declare deserialize: (raw: string) => ${primitiveTsFor(pgType.typname)};`);
    }
  } else {
    // any* hierarchy type — inherits [meta] from parent, no re-declaration needed
  }

  return { prologue: lines.join("\n"), epilogue: "}\n" };
};

export const generate = async () => {
  const db = new pg.Pool({ connectionString: requireDatabaseUrl() });

  try {
    const { typeMap, pgFuncs } = await introspect(db, Object.keys(OPERATOR_ALIASES));
    const types: TypeEntry[] = [...typeMap.values()].map((t) => ({
      typname: t.typname,
      className: t.className,
      primitiveTs: primitiveTsFor(t.typname),
      generic: GENERIC_TYPES.has(t.typname),
      element: ELEMENT_TYPES.has(t.typname),
    }));
    const nameTable = new Map(types.map((t) => [t.typname, t]));
    const overrideNames = scanOverrides();

    writeGeneratedTree({
      generatedDir: GENERATED_DIR,
      barrelPath: TYPES_INDEX,
      types,
      // Facts instance — catalog-independent (typnames, not OIDs),
      // generated on the fly. This is what the unified emitter
      // consumes; sqlite's equivalent is its committed docs/*.json.
      facts: produceFacts(typeMap, pgFuncs),
      cfg: { typeTable: nameTable, noMethod: new Set() },
      chromeFor: (host) => pgChrome(host, nameTable, overrideNames),
      overrides: overrideNames,
    });
    console.log(`Generated ${types.length} types in ${GENERATED_DIR}`);
  } finally {
    await db.end();
  }
};

// Run only when executed directly, not when imported.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  generate().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
