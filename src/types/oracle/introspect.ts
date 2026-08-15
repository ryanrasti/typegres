import oracledb from "oracledb";
import type { EmitFn, Nullability } from "../emission/facts.ts";

export type OracleTypname =
  | "any"
  | "number"
  | "binary_float"
  | "binary_double"
  | "varchar2"
  | "nvarchar2"
  | "char"
  | "clob"
  | "nclob"
  | "date"
  | "timestamp"
  | "timestamptz"
  | "timestampltz"
  | "time"
  | "timetz"
  | "intervalym"
  | "intervalds"
  | "bool"
  | "raw"
  | "blob"
  | "json"
  | "vector"
  | "rowid"
  | "urowid"
  | "xmltype";

// SYS.STANDARD exposes PL/SQL declarations. Collapse PL/SQL-only
// BINARY_INTEGER into SQL NUMBER; keep SQL types distinct. Types not
// modeled by typegres (OBJECT, REF CURSOR, TABLE, MLSLABEL, …) return
// undefined and their whole overload is omitted.
export const oracleTypeName = (dataType: string): OracleTypname | undefined => {
  switch (dataType) {
    case "NUMBER":
    case "BINARY_INTEGER": return "number";
    case "BINARY_FLOAT": return "binary_float";
    case "BINARY_DOUBLE": return "binary_double";
    case "VARCHAR2": return "varchar2";
    case "NVARCHAR2": return "nvarchar2";
    case "CHAR": return "char";
    case "CLOB": return "clob";
    case "NCLOB": return "nclob";
    case "DATE": return "date";
    case "TIMESTAMP": return "timestamp";
    case "TIMESTAMP WITH TIME ZONE": return "timestamptz";
    case "TIMESTAMP WITH LOCAL TIME ZONE": return "timestampltz";
    case "TIME": return "time";
    case "TIME WITH TIME ZONE": return "timetz";
    case "INTERVAL YEAR TO MONTH": return "intervalym";
    case "INTERVAL DAY TO SECOND": return "intervalds";
    case "BOOLEAN": return "bool";
    case "RAW": return "raw";
    case "BLOB": return "blob";
    case "JSON": return "json";
    case "VECTOR": return "vector";
    case "ROWID": return "rowid";
    case "UROWID": return "urowid";
    case "OPAQUE/XMLTYPE": return "xmltype";
    default: return undefined;
  }
};

// SQL spelling for CAST(NULL AS …) during catalog verification and
// for generated classes' __typname. This deliberately follows the
// collapsed typegres type, not the PL/SQL declaration's spelling.
export const ORACLE_CAST_TARGET: { [K in OracleTypname]: string } = {
  any: "VARCHAR2(4000)",
  number: "NUMBER",
  binary_float: "BINARY_FLOAT",
  binary_double: "BINARY_DOUBLE",
  varchar2: "VARCHAR2(4000)",
  nvarchar2: "NVARCHAR2(2000)",
  char: "CHAR(2000)",
  clob: "CLOB",
  nclob: "NCLOB",
  date: "DATE",
  timestamp: "TIMESTAMP",
  timestamptz: "TIMESTAMP WITH TIME ZONE",
  timestampltz: "TIMESTAMP WITH LOCAL TIME ZONE",
  time: "TIME",
  timetz: "TIME WITH TIME ZONE",
  intervalym: "INTERVAL YEAR TO MONTH",
  intervalds: "INTERVAL DAY TO SECOND",
  bool: "BOOLEAN",
  raw: "RAW(2000)",
  blob: "BLOB",
  json: "JSON",
  vector: "VECTOR",
  rowid: "ROWID",
  urowid: "UROWID",
  xmltype: "XMLTYPE",
};

type StandardArgRow = {
  OBJECT_NAME: string;
  OVERLOAD: string | null;
  POSITION: string;
  DATA_TYPE: string;
  DEFAULTED: "Y" | "N";
  IN_OUT: string;
};

type SqlFnRow = {
  FUNC_ID: string;
  NAME: string;
  MINARGS: string;
  MAXARGS: string;
  DATATYPE: string;
  AGGREGATE: "YES" | "NO";
  DISP_TYPE: string;
};

type SqlFnArgRow = {
  FUNC_ID: string;
  ARGNUM: string;
  DATATYPE: string;
};

// The catalog supplies signatures, not trust. Only reviewed, commonly
// useful pure functions belong in the generated API; unknown names are
// excluded even when Oracle marks them DETERMINISTIC.
const CATALOG_FUNCTION_ALLOWLIST = new Set([
  // Numeric.
  "ABS", "ACOS", "ASIN", "ATAN", "ATAN2", "BITAND", "CEIL", "COS", "COSH",
  "EXP", "FLOOR", "LN", "LOG", "MOD", "NANVL", "POWER", "REMAINDER", "ROUND",
  "SIGN", "SIN", "SINH", "SQRT", "TAN", "TANH", "TRUNC",

  // Character, binary, and hashing.
  "ASCII", "CHR", "CONCAT", "CONVERT", "DUMP", "HEXTORAW", "INITCAP", "INSTR",
  "INSTRB", "LENGTH", "LENGTHB", "LOWER", "LPAD", "LTRIM", "NCHR", "ORA_HASH",
  "RAWTOHEX", "REGEXP_COUNT", "REGEXP_INSTR", "REGEXP_LIKE", "REGEXP_REPLACE",
  "REGEXP_SUBSTR", "REPLACE", "RPAD", "RTRIM", "SOUNDEX", "STANDARD_HASH",
  "SUBSTR", "SUBSTRB", "TRANSLATE", "TRIM", "UNISTR", "UPPER", "VSIZE",

  // Null selection, conversion, date/time, intervals, and JSON comparison.
  "ADD_MONTHS", "COALESCE", "FROM_TZ", "GREATEST", "JSON_EQUAL",
  "LAST_DAY", "LEAST", "MONTHS_BETWEEN", "NEW_TIME", "NEXT_DAY", "NULLIF",
  "NUMTODSINTERVAL", "NUMTOYMINTERVAL", "NVL", "TO_BINARY_DOUBLE",
  "TO_BINARY_FLOAT", "TO_BLOB", "TO_BOOLEAN", "TO_CHAR", "TO_CLOB", "TO_DATE",
  "TO_DSINTERVAL", "TO_NCHAR", "TO_NCLOB", "TO_NUMBER", "TO_TIMESTAMP",
  "TO_TIMESTAMP_TZ", "TO_YMINTERVAL", "TZ_OFFSET",

  // Common aggregates.
  "ANY_VALUE", "APPROX_COUNT_DISTINCT", "AVG", "CORR", "COUNT", "COVAR_POP",
  "COVAR_SAMP", "LISTAGG", "MAX", "MEDIAN", "MIN", "STDDEV", "STDDEV_POP",
  "STDDEV_SAMP", "SUM", "VARIANCE", "VAR_POP", "VAR_SAMP",
]);

const rowsOf = async <T>(
  conn: oracledb.Connection,
  sql: string,
  binds: oracledb.BindParameters = [],
): Promise<T[]> => {
  const result = await conn.execute<T>(sql, binds, { outFormat: oracledb.OUT_FORMAT_OBJECT });
  return (result.rows ?? []) as T[];
};

const safeSqlName = (name: string): boolean => /^[A-Z][A-Z0-9_$#]*$/.test(name);

const verifyCall = async (
  conn: oracledb.Connection,
  name: string,
  args: OracleTypname[],
  aggregate = false,
): Promise<{ valid: boolean; nullability: Nullability }> => {
  if (!safeSqlName(name)) { return { valid: false, nullability: "propagates" }; }
  const callArgs = args.map((t) => `CAST(NULL AS ${ORACLE_CAST_TARGET[t]})`).join(", ");
  const sql = `SELECT ${name}(${callArgs}) AS "V" FROM DUAL`;
  try {
    // Parse first: this rejects PL/SQL-only overloads whose types look
    // SQL-valid (STANDARD's ADD_MONTHS(NUMBER, DATE), for example)
    // without conflating syntax/type errors with value-domain errors.
    await conn.getStatementInfo(sql);
  } catch {
    return { valid: false, nullability: "propagates" };
  }
  if (aggregate) {
    return { valid: true, nullability: name === "COUNT" ? "never" : "always" };
  }
  try {
    const rows = await rowsOf<{ V: unknown }>(conn, sql);
    const value = rows[0]?.V;
    return {
      valid: true,
      nullability: value === null || value === undefined ? "propagates" : "never",
    };
  } catch {
    // Signature parsed but NULL is outside its runtime domain. Keep the
    // catalog fact; exact error/null semantics can be refined later.
    return { valid: true, nullability: "propagates" };
  }
};

const scalarFacts = async (
  conn: oracledb.Connection,
  sqlFnNames: Set<string>,
): Promise<EmitFn[]> => {
  const rows = await rowsOf<StandardArgRow>(conn, `
    SELECT a.object_name, a.overload, a.position, a.data_type,
           a.defaulted, a.in_out
    FROM all_arguments a
    WHERE a.owner = 'SYS'
      AND a.package_name = 'STANDARD'
      AND a.object_name IS NOT NULL
    ORDER BY a.object_name, NVL(TO_NUMBER(a.overload), 0), a.position
  `);

  const groups = new Map<string, StandardArgRow[]>();
  for (const row of rows) {
    if (!sqlFnNames.has(row.OBJECT_NAME)) { continue; }
    const key = `${row.OBJECT_NAME}\0${row.OVERLOAD ?? "0"}`;
    const group = groups.get(key) ?? [];
    group.push(row);
    groups.set(key, group);
  }

  const byName = new Map<string, EmitFn["overloads"]>();
  for (const group of groups.values()) {
    const ret = group.find((r) => Number(r.POSITION) === 0 && r.IN_OUT.includes("OUT"));
    const args = group.filter((r) => Number(r.POSITION) > 0 && r.IN_OUT.includes("IN"));
    if (!ret || args.length === 0) { continue; }
    const returnType = oracleTypeName(ret.DATA_TYPE);
    const argTypes = args.map((a) => oracleTypeName(a.DATA_TYPE));
    if (!returnType || argTypes.some((t) => t === undefined)) { continue; }

    const name = group[0]!.OBJECT_NAME;
    const verified = await verifyCall(conn, name, argTypes as OracleTypname[]);
    if (!verified.valid) { continue; }
    const overload = {
      args: args.map((arg, i) => ({
        type: argTypes[i]!,
        ...(arg.DEFAULTED === "Y" ? { optional: true as const } : {}),
      })),
      returns: returnType,
      nullability: verified.nullability,
    };
    const list = byName.get(name) ?? [];
    // Type collapsing (BINARY_INTEGER → number) can make catalog
    // overloads identical. Keep one emitted signature.
    const key = JSON.stringify(overload);
    if (!list.some((o) => JSON.stringify(o) === key)) { list.push(overload); }
    byName.set(name, list);
  }

  return [...byName].map(([sql, overloads]) => ({
    sql,
    kind: "scalar" as const,
    overloads,
  }));
};

const sqlFnType = (dataType: string): OracleTypname | undefined => {
  switch (dataType) {
    case "NUMERIC": return "number";
    case "STRING": return "varchar2";
    case "DATETYPE": return "date";
    case "BINARY": return "raw";
    case "BOOLEAN": return "bool";
    case "EXPR": return "any";
    default: return undefined;
  }
};

// V$SQLFN_ARG_METADATA is the broad SQL catalog: 529 function IDs
// carry per-position coarse domains (NUMERIC/STRING/DATETYPE/BINARY/
// BOOLEAN/EXPR). This pass covers scalars and aggregates that aren't
// declared in STANDARD. STANDARD's exact SQL types are layered on next.
const sqlFnFacts = async (
  conn: oracledb.Connection,
  metadata: SqlFnRow[],
  argRows: SqlFnArgRow[],
): Promise<EmitFn[]> => {
  const argsById = new Map<string, SqlFnArgRow[]>();
  for (const row of argRows) {
    const list = argsById.get(row.FUNC_ID) ?? [];
    list.push(row);
    argsById.set(row.FUNC_ID, list);
  }

  const byFact = new Map<string, EmitFn>();
  const aggregateNames = new Set(
    metadata.filter((row) => row.AGGREGATE === "YES").map((row) => row.NAME),
  );
  for (const row of metadata) {
    if (row.DISP_TYPE !== "NORMAL" || !safeSqlName(row.NAME)) { continue; }
    // The view repeats aggregate names with AGGREGATE=NO for internal
    // evaluation forms. AVG(NULL) still parses as an aggregate, so
    // call verification alone can't distinguish those duplicate rows.
    if (row.AGGREGATE === "NO" && aggregateNames.has(row.NAME)) { continue; }
    const catalogArgs = argsById.get(row.FUNC_ID);
    if (!catalogArgs?.length) { continue; }
    const minArgs = Number(row.MINARGS);
    const maxArgs = Number(row.MAXARGS);
    if (minArgs < 1) { continue; }

    const argTypes = catalogArgs
      .sort((a, b) => Number(a.ARGNUM) - Number(b.ARGNUM))
      .map((a) => sqlFnType(a.DATATYPE));
    if (argTypes.some((t) => t === undefined)) { continue; }
    // A variadic catalog entry can list only the repeated domain even
    // when MINARGS > 1 (COALESCE: one EXPR row, minargs=2). Repeat the
    // final domain until the minimum callable shape is represented.
    while (argTypes.length < minArgs) { argTypes.push(argTypes.at(-1)); }

    const returnType = row.DATATYPE === "ARG 1" ? "arg0" : sqlFnType(row.DATATYPE);
    if (!returnType) { continue; }
    const typedArgs = argTypes as OracleTypname[];
    const aggregate = row.AGGREGATE === "YES";
    const verified = await verifyCall(conn, row.NAME, typedArgs, aggregate);
    if (!verified.valid) { continue; }

    const overload = {
      args: typedArgs.map((type, i) => ({
        type,
        ...(maxArgs !== 0 && i >= minArgs ? { optional: true as const } : {}),
      })),
      ...(maxArgs === 0 ? { variadic: true as const } : {}),
      returns: returnType,
      nullability: verified.nullability,
    };
    const kind = aggregate ? "aggregate" as const : "scalar" as const;
    const key = `${kind}\0${row.NAME}`;
    const fact = byFact.get(key) ?? { sql: row.NAME, kind, overloads: [] };
    const callShape = JSON.stringify({ args: overload.args, variadic: overload.variadic });
    const existingIndex = fact.overloads.findIndex((o) =>
      JSON.stringify({ args: o.args, variadic: o.variadic }) === callShape,
    );
    if (existingIndex < 0) {
      fact.overloads.push(overload);
    } else {
      const existing = fact.overloads[existingIndex]!;
      // Duplicate metadata may claim both ARG 1 and a concrete return
      // for the same call (AVG(NUMERIC)). Concrete is the narrower fact.
      if (existing.returns === "arg0" && overload.returns !== "arg0") {
        fact.overloads.splice(existingIndex, 1, overload);
      }
    }
    byFact.set(key, fact);
  }
  return [...byFact.values()].map((fact) => {
    if (fact.kind !== "scalar") { return fact; }
    const hasConcreteHost = fact.overloads.some((o) => o.args[0]?.type !== "any");
    return hasConcreteHost
      ? { ...fact, overloads: fact.overloads.filter((o) => o.args[0]?.type !== "any") }
      : fact;
  });
};

const operatorFacts = (metadata: SqlFnRow[]): EmitFn[] => {
  const seen = new Set<string>();
  const out: EmitFn[] = [];
  for (const row of metadata) {
    if (row.DISP_TYPE !== "REL-OP" || Number(row.MINARGS) !== 2) { continue; }
    if (!/^(?:=|!=|<|<=|>|>=)$/.test(row.NAME) || seen.has(row.NAME)) { continue; }
    seen.add(row.NAME);
    out.push({
      sql: row.NAME,
      kind: "binop",
      overloads: [{
        args: [{ type: "any" }, { type: "any" }],
        returns: "bool",
        nullability: "propagates",
      }],
    });
  }
  return out;
};

const mergeFacts = (facts: EmitFn[]): EmitFn[] => {
  const merged = new Map<string, EmitFn>();
  for (const fact of facts) {
    const key = `${fact.kind}\0${fact.sql}`;
    const existing = merged.get(key) ?? { ...fact, overloads: [] };
    for (const overload of fact.overloads) {
      const overloadKey = JSON.stringify(overload);
      if (!existing.overloads.some((o) => JSON.stringify(o) === overloadKey)) {
        existing.overloads.push(overload);
      }
    }
    merged.set(key, existing);
  }
  return [...merged.values()];
};

export const introspect = async (conn: oracledb.Connection): Promise<EmitFn[]> => {
  const metadata = await rowsOf<SqlFnRow>(conn, `
    SELECT func_id, name, minargs, maxargs, datatype, aggregate, disp_type
    FROM v$sqlfn_metadata
    ORDER BY name, func_id, minargs, maxargs, datatype, aggregate, disp_type
  `);
  const argRows = await rowsOf<SqlFnArgRow>(conn, `
    SELECT func_id, argnum, datatype
    FROM v$sqlfn_arg_metadata
    ORDER BY func_id, argnum
  `);
  const trustedMetadata = metadata.filter((row) => CATALOG_FUNCTION_ALLOWLIST.has(row.NAME));
  const names = new Set(trustedMetadata.map((r) => r.NAME.toUpperCase()));
  const exactScalars = await scalarFacts(conn, names);
  const exactNames = new Set(exactScalars.map((f) => f.sql));
  const coarseFacts = (await sqlFnFacts(conn, trustedMetadata, argRows)).filter((f) =>
    f.kind === "aggregate" || !exactNames.has(f.sql));
  return mergeFacts([
    ...coarseFacts,
    ...exactScalars,
    // Operator symbols carry no executable function body and are
    // independently constrained to the six reviewed relational forms.
    ...operatorFacts(metadata),
  ]);
};
