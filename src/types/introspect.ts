import type { Pool } from "pg";
import camelcase from "camelcase";

// Map pg type names to TS-friendly class names
export const pgNameToClassName = (name: string): string =>
  camelcase(name, { pascalCase: true });

// Internal Postgres types that are never used in SQL — exclude from codegen
const EXCLUDED_TYPES = new Set([
  "cstring",
  "internal",
  "trigger",
  "event_trigger",
  "void",
  "language_handler",
  "fdw_handler",
  "index_am_handler",
  "tsm_handler",
  "table_am_handler",
  "opaque",
  "pg_ddl_command",
]);

export interface PgType {
  oid: number;
  typname: string;
  className: string;
}

export interface PgFunc {
  name: string;
  argTypes: number[];
  returnType: number;
  isOperator?: boolean;
  isStrict?: boolean;
  isAggregate?: boolean;
  isSrf?: boolean;
  // For multi-column SRFs: OUT param names and types
  outColumns?: { name: string; typeOid: number }[];
}

export interface Introspection {
  typeMap: Map<number, PgType>;
  pgFuncs: PgFunc[];
}

export const introspect = async (
  db: Pool,
  // Operator names whose oprcode functions should be hidden (we emit a
  // readable alias for the operator instead, so the pg impl function —
  // `int4eq`, `texticlike`, etc. — would just be noise). For operators
  // without an alias (`@>`, `->`, `~~*`, etc.), we let the pg function
  // name through as a more readable alternative to the bracketed form.
  aliasedOperators: readonly string[] = [],
): Promise<Introspection> => {
  // Get all built-in base types and pseudo-types (not array types)
  const { rows: types } = await db.query<{ oid: number; typname: string }>(`
    SELECT t.oid, t.typname
    FROM pg_type t
    JOIN pg_namespace n ON t.typnamespace = n.oid
    WHERE n.nspname = 'pg_catalog'
      AND t.typtype IN ('b', 'p')
      AND t.typelem = 0
      AND t.typname NOT LIKE '\\_%'
    ORDER BY t.typname
  `);

  const typeMap = new Map<number, PgType>();
  for (const t of types) {
    if (EXCLUDED_TYPES.has(t.typname)) { continue; }
    typeMap.set(t.oid, {
      oid: t.oid,
      typname: t.typname,
      className: pgNameToClassName(t.typname),
    });
  }

  // Get functions: name, arg types, return type, strictness
  const { rows: funcs } = await db.query<{
    proname: string;
    proargtypes: string;
    prorettype: number;
    proisstrict: boolean;
  }>(`
    SELECT p.proname, p.proargtypes::text, p.prorettype, p.proisstrict
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'pg_catalog'
      AND p.prokind = 'f'                                                       -- only plain functions
      AND p.provolatile = 'i'                                                   -- only pure (immutable) functions; stable fns include pg_stat_* etc.
      AND p.proretset = false                                                   -- no set-returning functions (for now)
      AND array_length(string_to_array(trim(p.proargtypes::text), ' '), 1) > 0 -- must have at least one arg
      AND p.proargtypes::text != ''
      AND p.oid NOT IN (SELECT oprcode FROM pg_operator WHERE oprcode != 0 AND oprname = ANY($1::text[]))  -- exclude oprcode only for operators we give readable aliases
      AND p.oid NOT IN (SELECT amproc FROM pg_amproc)                           -- exclude index support functions (e.g. btint4cmp, hashint4)
    ORDER BY p.proname
  `, [aliasedOperators]);

  // Get operators (operators are always strict in terms of null propagation)
  const { rows: operators } = await db.query<{
    oprname: string;
    oprleft: number;
    oprright: number;
    oprresult: number;
  }>(`
    SELECT o.oprname, o.oprleft, o.oprright, o.oprresult
    FROM pg_operator o
    JOIN pg_namespace n ON o.oprnamespace = n.oid
    WHERE n.nspname = 'pg_catalog'
      AND o.oprleft != 0
      AND o.oprright != 0
    ORDER BY o.oprname
  `);

  const pgFuncs: PgFunc[] = [];

  for (const f of funcs) {
    const argOids = f.proargtypes.trim().split(/\s+/).map(Number);
    if (argOids.every((oid) => typeMap.has(oid)) && typeMap.has(f.prorettype)) {
      pgFuncs.push({
        name: f.proname,
        argTypes: argOids,
        returnType: f.prorettype,
        isStrict: f.proisstrict,
      });
    }
  }

  for (const o of operators) {
    if (typeMap.has(o.oprleft) && typeMap.has(o.oprright) && typeMap.has(o.oprresult)) {
      pgFuncs.push({
        name: o.oprname,
        argTypes: [o.oprleft, o.oprright],
        returnType: o.oprresult,
        isOperator: true,
        isStrict: true,
      });
    }
  }

  // Get aggregate functions
  const { rows: aggFuncs } = await db.query<{
    proname: string;
    proargtypes: string;
    prorettype: number;
  }>(`
    SELECT p.proname, p.proargtypes::text, p.prorettype
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'pg_catalog'
      AND p.prokind = 'a'
      AND p.proretset = false
      AND array_length(string_to_array(trim(p.proargtypes::text), ' '), 1) > 0
      AND p.proargtypes::text != ''
    ORDER BY p.proname
  `);

  for (const f of aggFuncs) {
    const argOids = f.proargtypes.trim().split(/\s+/).map(Number);
    if (argOids.every((oid) => typeMap.has(oid)) && typeMap.has(f.prorettype)) {
      pgFuncs.push({
        name: f.proname,
        argTypes: argOids,
        returnType: f.prorettype,
        isAggregate: true,
      });
    }
  }

  // Get set-returning functions (with OUT param info for multi-column SRFs)
  const { rows: srfFuncs } = await db.query<{
    proname: string;
    proargtypes: string;
    prorettype: number;
    proisstrict: boolean;
    proargnames: string[] | null;
    proargmodes: string[] | null;
    proallargtypes: number[] | null;
  }>(`
    SELECT p.proname, p.proargtypes::text, p.prorettype, p.proisstrict,
           p.proargnames, p.proargmodes::text[], p.proallargtypes::int[]
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'pg_catalog'
      AND p.prokind = 'f'
      AND p.proretset = true
      AND p.provolatile = 'i'
      AND array_length(string_to_array(trim(p.proargtypes::text), ' '), 1) > 0
      AND p.proargtypes::text != ''
      AND p.oid NOT IN (SELECT oprcode FROM pg_operator WHERE oprcode != 0)
      AND p.oid NOT IN (SELECT amproc FROM pg_amproc)
    ORDER BY p.proname
  `);

  for (const f of srfFuncs) {
    const argOids = f.proargtypes.trim().split(/\s+/).map(Number);
    if (!argOids.every((oid) => typeMap.has(oid))) { continue; }

    // Extract OUT columns from proargmodes/proargnames/proallargtypes
    let outColumns: { name: string; typeOid: number }[] | undefined;
    if (f.proargmodes && f.proargnames && f.proallargtypes) {
      const outs: { name: string; typeOid: number }[] = [];
      for (let i = 0; i < f.proargmodes.length; i++) {
        if (f.proargmodes[i] === "o" || f.proargmodes[i] === "t") { // 'o' = OUT, 't' = TABLE
          const name = f.proargnames[i];
          const typeOid = f.proallargtypes[i];
          if (name && typeOid && typeMap.has(typeOid)) {
            outs.push({ name, typeOid });
          }
        }
      }
      if (outs.length > 0) {
        outColumns = outs;
      }
    }

    // For single-column SRFs, need the return type to be known
    if (!outColumns && !typeMap.has(f.prorettype)) { continue; }

    pgFuncs.push({
      name: f.proname,
      argTypes: argOids,
      returnType: f.prorettype,
      isStrict: f.proisstrict,
      isSrf: true,
      ...(outColumns ? { outColumns } : {}),
    });
  }

  return { typeMap, pgFuncs };
};

// Group functions by their first argument type (the "self" type)
export const groupByFirstArg = (pgFuncs: PgFunc[]): Map<number, PgFunc[]> => {
  const grouped = new Map<number, PgFunc[]>();
  for (const f of pgFuncs) {
    const firstArg = f.argTypes[0];
    if (firstArg === undefined) { continue; }
    if (!grouped.has(firstArg)) { grouped.set(firstArg, []); }
    grouped.get(firstArg)!.push(f);
  }
  return grouped;
};
