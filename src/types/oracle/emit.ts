// Oracle dialect codegen: SYS.STANDARD typed scalar declarations,
// V$SQLFN_METADATA aggregate/operator inventory, and live engine
// verification feed the shared emitter. Generated files are committed.

import oracledb from "oracledb";
import * as path from "node:path";
import { pathToFileURL } from "node:url";
import {
  writeGeneratedTree,
  chromeImportLines,
  metaDeclareLines,
  typnameStaticLines,
  scanOverrideNames,
  type ClassChrome,
  type EmitConfig,
  type TypeEntry,
} from "../emission/emit.ts";
import type { EmitFn } from "../emission/facts.ts";
import { requireOraclePoolAttributes } from "../../drivers/oracle-url.ts";
import {
  introspect,
  ORACLE_CAST_TARGET,
  type OracleTypname,
} from "./introspect.ts";

const outDirFlag = process.argv.indexOf("--out-dir");
const GENERATED_DIR = outDirFlag >= 0
  ? path.resolve(process.argv[outDirFlag + 1]!)
  : path.resolve(import.meta.dirname, "generated");
const OVERRIDES_DIR = path.resolve(import.meta.dirname, "overrides");
const TYPES_INDEX = path.resolve(import.meta.dirname, "index.ts");

const TYPES: (TypeEntry & { typname: OracleTypname })[] = [
  { typname: "any", className: "Any", primitiveTsUnion: "number | string | boolean | Uint8Array" },
  { typname: "number", className: "Number", primitiveTs: "number" },
  { typname: "binary_float", className: "BinaryFloat", primitiveTs: "number" },
  { typname: "binary_double", className: "BinaryDouble", primitiveTs: "number" },
  { typname: "varchar2", className: "Varchar2", primitiveTs: "string" },
  { typname: "nvarchar2", className: "Nvarchar2", primitiveTs: "string" },
  { typname: "char", className: "Char", primitiveTs: "string" },
  { typname: "clob", className: "Clob", primitiveTs: "string" },
  { typname: "nclob", className: "Nclob", primitiveTs: "string" },
  { typname: "date", className: "Date", primitiveTs: "string" },
  { typname: "timestamp", className: "Timestamp", primitiveTs: "string" },
  { typname: "timestamptz", className: "Timestamptz", primitiveTs: "string" },
  { typname: "timestampltz", className: "Timestampltz", primitiveTs: "string" },
  { typname: "time", className: "Time", primitiveTs: "string" },
  { typname: "timetz", className: "Timetz", primitiveTs: "string" },
  { typname: "intervalym", className: "IntervalYm", primitiveTs: "string" },
  { typname: "intervalds", className: "IntervalDs", primitiveTs: "string" },
  { typname: "bool", className: "Bool", primitiveTs: "boolean" },
  { typname: "raw", className: "Raw", primitiveTsUnion: "Uint8Array" },
  { typname: "blob", className: "Blob", primitiveTsUnion: "Uint8Array" },
  { typname: "json", className: "Json", primitiveTs: "string" },
  { typname: "vector", className: "Vector", primitiveTs: "string" },
  { typname: "rowid", className: "Rowid", primitiveTs: "string" },
  { typname: "urowid", className: "Urowid", primitiveTs: "string" },
  { typname: "xmltype", className: "XmlType", primitiveTs: "string" },
];

const CONFIG: EmitConfig = {
  typeTable: new Map(TYPES.map((t) => [t.typname, t])),
  noMethod: new Set(["coalesce", "in"]),
};

// Oracle's catalogs describe ordinary functions well, but expose
// operators as undocumented optimizer names and leave a few ubiquitous
// functions untyped. Keep this deliberately small and SQL-verified.
const ORACLE_REPLACED_FUNCTIONS = new Set([
  "CORR", "COVAR_POP", "COVAR_SAMP", "GREATEST", "LEAST", "LISTAGG", "NULLIF",
  "STDDEV_POP", "STDDEV_SAMP", "VAR_POP", "VAR_SAMP",
]);

const ORACLE_SUPPLEMENT: EmitFn[] = [
  ...["+", "-", "*", "/"].map((sql): EmitFn => ({
    sql,
    kind: "binop",
    overloads: ["number", "binary_float", "binary_double"].map((type) => ({
      args: [{ type }, { type }], returns: type, nullability: "propagates",
    })),
  })),
  {
    sql: "-", kind: "unaryop",
    overloads: ["number", "binary_float", "binary_double"].map((type) => ({
      args: [{ type }], returns: type, nullability: "propagates",
    })),
  },
  {
    sql: "+", kind: "binop",
    overloads: [
      { args: [{ type: "date" }, { type: "number" }], returns: "date", nullability: "propagates" },
      { args: [{ type: "timestamp" }, { type: "intervalds" }], returns: "timestamp", nullability: "propagates" },
    ],
  },
  {
    sql: "-", kind: "binop",
    overloads: [
      { args: [{ type: "date" }, { type: "number" }], returns: "date", nullability: "propagates" },
      { args: [{ type: "date" }, { type: "date" }], returns: "number", nullability: "propagates" },
      { args: [{ type: "timestamp" }, { type: "timestamp" }], returns: "intervalds", nullability: "propagates" },
      { args: [{ type: "timestamp" }, { type: "intervalds" }], returns: "timestamp", nullability: "propagates" },
    ],
  },
  ...["LIKE", "NOT LIKE"].map((sql): EmitFn => ({
    sql,
    kind: "binop",
    overloads: [{
      args: [{ type: "varchar2" }, { type: "varchar2" }],
      returns: "bool",
      nullability: "propagates",
    }],
  })),
  {
    sql: "LNNVL", kind: "scalar",
    overloads: [{ args: [{ type: "bool" }], returns: "bool", nullability: "never" }],
  },
  {
    sql: "WIDTH_BUCKET", kind: "scalar",
    overloads: [{
      args: ["number", "number", "number", "number"].map((type) => ({ type })),
      returns: "number",
      nullability: "propagates",
    }],
  },
  {
    sql: "NVL2", kind: "scalar",
    overloads: ["number", "varchar2", "bool"].map((type) => ({
      args: [{ type: "any" }, { type }, { type }],
      returns: type,
      nullability: "propagates" as const,
      nullPositions: [1, 2],
    })),
  },
  ...["GREATEST", "LEAST"].map((sql): EmitFn => ({
    sql,
    kind: "scalar",
    overloads: [
      "number", "binary_float", "binary_double", "varchar2", "date", "timestamp",
      "timestamptz", "timestampltz", "intervalym", "intervalds",
    ].map((type) => ({
      args: [{ type }],
      variadic: true,
      returns: type,
      nullability: "propagates" as const,
    })),
  })),
  {
    sql: "NULLIF", kind: "scalar",
    overloads: ["number", "varchar2", "date", "bool"].map((type) => ({
      args: [{ type }, { type }],
      returns: type,
      nullability: "always" as const,
    })),
  },
  {
    sql: "LISTAGG", kind: "aggregate",
    overloads: [{
      args: [{ type: "any" }, { type: "varchar2", optional: true }],
      returns: "varchar2",
      nullability: "always",
    }],
  },
  ...["CORR", "COVAR_POP", "COVAR_SAMP"].map((sql): EmitFn => ({
    sql,
    kind: "aggregate",
    overloads: [{
      args: [{ type: "number" }, { type: "number" }],
      returns: "number",
      nullability: "always",
    }],
  })),
  ...["STDDEV_POP", "STDDEV_SAMP", "VAR_POP", "VAR_SAMP"].map((sql): EmitFn => ({
    sql,
    kind: "aggregate",
    overloads: [{ args: [{ type: "number" }], returns: "number", nullability: "always" }],
  })),
  {
    sql: "TO_CHAR", kind: "scalar",
    overloads: [
      "number", "binary_float", "binary_double", "date", "timestamp", "timestamptz",
      "timestampltz", "time", "timetz", "intervalym", "intervalds",
    ].map((type) => ({ args: [{ type }], returns: "varchar2", nullability: "propagates" as const })),
  },
  {
    sql: "TO_NCHAR", kind: "scalar",
    overloads: ["number", "binary_float", "binary_double", "date"].map((type) => ({
      args: [{ type }], returns: "nvarchar2", nullability: "propagates" as const,
    })),
  },
  ...["TO_BINARY_DOUBLE", "TO_BINARY_FLOAT"].map((sql): EmitFn => ({
    sql,
    kind: "scalar",
    overloads: [{
      args: [{ type: "varchar2" }],
      returns: sql === "TO_BINARY_DOUBLE" ? "binary_double" : "binary_float",
      nullability: "propagates",
    }],
  })),
];
const OVERRIDE_NAMES = scanOverrideNames(OVERRIDES_DIR);

const chromeFor = (typname: OracleTypname): ClassChrome => {
  const lines = ["// Auto-generated by src/types/oracle/emit.ts from Oracle catalogs — do not edit."];
  const parentImport = typname === "any"
    ? 'import { SqlValue } from "../../sql-value";'
    : 'import { Any } from "../overrides/any";';
  lines.push(...chromeImportLines(parentImport));
  const cls = CONFIG.typeTable.get(typname)!.className;
  lines.push(`export class ${cls}<in out N extends number> extends ${typname === "any" ? "SqlValue" : "Any"}<N> {`);
  if (typname !== "any") {
    lines.push(`  declare readonly __view: "${typname}";`);
    lines.push(...metaDeclareLines(`types.${cls}`));
    lines.push(...typnameStaticLines(ORACLE_CAST_TARGET[typname], typname, true));
    if (!OVERRIDE_NAMES.has(typname)) {
      lines.push("  declare deserialize: (raw: string) => string;");
    }
    lines.push("");
  }
  return { prologue: lines.join("\n"), epilogue: "}\n" };
};

export const generate = async (): Promise<void> => {
  // Catalog NUMBER columns (positions, ids) must stay strings to match
  // the introspector row declarations and avoid precision loss.
  oracledb.fetchAsString = [oracledb.NUMBER];
  const pool = await oracledb.createPool(requireOraclePoolAttributes());
  try {
    const conn = await pool.getConnection();
    try {
      const catalogFacts = (await introspect(conn))
        .filter((fact) => !ORACLE_REPLACED_FUNCTIONS.has(fact.sql))
        .map((fact) => fact.sql === "REGEXP_SUBSTR"
          ? {
              ...fact,
              overloads: fact.overloads.map((overload) => ({
                ...overload,
                nullability: "always" as const,
              })),
            }
          : fact);
      writeGeneratedTree({
        generatedDir: GENERATED_DIR,
        barrelPath: TYPES_INDEX,
        types: TYPES,
        facts: [...catalogFacts, ...ORACLE_SUPPLEMENT],
        cfg: CONFIG,
        chromeFor: (t) => chromeFor(t.typname as OracleTypname),
        overrides: OVERRIDE_NAMES,
      });
      console.log(`Generated ${TYPES.length} Oracle types in ${GENERATED_DIR}`);
    } finally {
      await conn.close();
    }
  } finally {
    await pool.close(0);
  }
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  generate().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
