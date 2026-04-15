import { PGlite } from "@electric-sql/pglite";
import camelcase from "camelcase";
import * as fs from "node:fs";
import * as path from "node:path";

const GENERATED_DIR = path.resolve(import.meta.dirname, "generated");
const OVERRIDES_DIR = path.resolve(import.meta.dirname, "overrides");
const TYPES_INDEX = path.resolve(import.meta.dirname, "index.ts");

// Map pg type names to TS-friendly class names
export const pgNameToClassName = (name: string): string => {
  return camelcase(name, { pascalCase: true });
};

import { getTypeDef } from "./deserialize.ts";

const tsPrimitiveFor = (typname: string): string =>
  getTypeDef(typname).tsType;

// Types that get a generic <T extends Any<any>> parameter
const GENERIC_TYPES = new Set([
  "anyarray",
  "anycompatiblearray",
  "anyrange",
  "anycompatiblerange",
  "anymultirange",
  "anycompatiblemultirange",
]);

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

// Types that become T when referenced from other classes
// (they represent "the element type" in polymorphic signatures)
const ELEMENT_TYPES = new Set([
  "anyelement",
  "anynonarray",
  "anycompatible",
  "anycompatiblenonarray",
  "anyenum",
]);

// Operators that can return null from non-null inputs (e.g. JSON key not found)
const MAYBE_NULL_OPS = new Set(["->", "->>", "#>", "#>>"]);

// Inheritance hierarchy:
// Any<N>
//   └─ Anycompatible<T, N>
//        └─ Anyelement<T, N>
//             ├─ Anycompatiblenonarray<T, N>
//             │    └─ Anynonarray<T, N>
//             │         ├─ Anyenum<T, N>
//             │         ├─ Int4<N>  (T = Int4<N>)
//             │         ├─ Text<N>  (T = Text<N>)
//             │         └─ ... all concrete types
//             ├─ Anycompatiblearray<T, N>
//             │    └─ Anyarray<T, N>
//             ├─ Anycompatiblerange<T, N>
//             │    └─ Anyrange<T, N>
//             └─ Anycompatiblemultirange<T, N>
//                  └─ Anymultirange<T, N>
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

interface PgType {
  oid: number;
  typname: string;
  className: string;
}

interface PgFunc {
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

const introspect = async (db: PGlite) => {
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
      AND p.provolatile IN ('i', 's')                                           -- no side effects (exclude volatile)
      AND p.proretset = false                                                   -- no set-returning functions (for now)
      AND array_length(string_to_array(trim(p.proargtypes::text), ' '), 1) > 0 -- must have at least one arg
      AND p.proargtypes::text != ''
      AND p.oid NOT IN (SELECT oprcode FROM pg_operator WHERE oprcode != 0)     -- exclude operator implementations (e.g. int4eq)
      AND p.oid NOT IN (SELECT amproc FROM pg_amproc)                           -- exclude index support functions (e.g. btint4cmp, hashint4)
    ORDER BY p.proname
  `);

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

  // Build function list, filtering to only known types
  const pgFuncs: PgFunc[] = [];

  for (const f of funcs) {
    const argOids = f.proargtypes
      .trim()
      .split(/\s+/)
      .map(Number);
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
    if (
      typeMap.has(o.oprleft) &&
      typeMap.has(o.oprright) &&
      typeMap.has(o.oprresult)
    ) {
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
    const argOids = f.proargtypes
      .trim()
      .split(/\s+/)
      .map(Number);
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
      AND p.provolatile IN ('i', 's')
      AND array_length(string_to_array(trim(p.proargtypes::text), ' '), 1) > 0
      AND p.proargtypes::text != ''
      AND p.oid NOT IN (SELECT oprcode FROM pg_operator WHERE oprcode != 0)
      AND p.oid NOT IN (SELECT amproc FROM pg_amproc)
    ORDER BY p.proname
  `);

  for (const f of srfFuncs) {
    const argOids = f.proargtypes
      .trim()
      .split(/\s+/)
      .map(Number);
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
const groupByFirstArg = (pgFuncs: PgFunc[]) => {
  const grouped = new Map<number, PgFunc[]>();

  for (const f of pgFuncs) {
    const firstArg = f.argTypes[0];
    if (firstArg === undefined) { continue; }
    if (!grouped.has(firstArg)) {
      grouped.set(firstArg, []);
    }
    grouped.get(firstArg)!.push(f);
  }

  return grouped;
};

// Resolve a type OID to its base TS name (without nullability param)
// Only apply T substitution when the owning class is itself generic (an any* type)
const resolveBaseTypeName = (
  oid: number,
  ownerType: PgType,
  typeMap: Map<number, PgType>,
): string => {
  const t = typeMap.get(oid);
  if (!t) { return "unknown"; }

  const ownerIsGeneric = GENERIC_TYPES.has(ownerType.typname) || ELEMENT_TYPES.has(ownerType.typname);

  if (ownerIsGeneric) {
    // Inside a generic class: element types become T, containers get <T>
    if (ELEMENT_TYPES.has(t.typname) && t.typname !== ownerType.typname) {
      return "T";
    }
    // Self-references and container references get <T>
    if (GENERIC_TYPES.has(t.typname) || ELEMENT_TYPES.has(t.typname)) {
      return `types.${t.className}<T, `;
    }
  } else {
    // Non-generic class referencing a generic any* type: use <types.Any<any>>
    if (GENERIC_TYPES.has(t.typname) || ELEMENT_TYPES.has(t.typname)) {
      return `types.${t.className}<types.Any<any>, `;
    }
  }

  return `types.${t.className}`;
};

// Format a type reference with nullability param
const formatTypeWithNull = (baseName: string, nullParam: string): string => {
  // "T" is a raw generic — no nullability param on it
  if (baseName === "T") { return "T"; }
  // Types that already opened a generic (end with ", ") just need the null param + close
  if (baseName.endsWith(", ")) { return `${baseName}${nullParam}>`; }
  // Regular types get <nullParam>
  return `${baseName}<${nullParam}>`;
};

const generateTypeFile = (
  pgType: PgType,
  funcs: PgFunc[],
  typeMap: Map<number, PgType>,
  overrideNames: Set<string>,
): string => {
  const isGeneric = GENERIC_TYPES.has(pgType.typname);
  const isElement = ELEMENT_TYPES.has(pgType.typname);
  const extendsClass = EXTENDS_MAP[pgType.typname];
  const needsGenericT = isGeneric || isElement;

  // Separate functions (dedup by name) and operators (keep all overloads, group by name)
  const seenFuncs = new Set<string>();
  const emittedFuncs: PgFunc[] = [];
  const operatorGroups = new Map<string, PgFunc[]>();

  for (const f of funcs) {
    // Skip operators/functions overloaded incompatibly by subtypes — each subtype defines its own version
    if (pgType.typname === "anyelement" && f.isOperator && f.name === "<@") { continue; } // overloaded: array<@array, range<@range, elem<@multirange
    if (pgType.typname === "anycompatible" && f.isOperator && f.name === "||") { continue; } // overloaded: text||text, array||array, bytea||bytea, etc.
    if (pgType.typname === "anynonarray" && f.isOperator && f.name === "||") { continue; } // overloaded: text||anynonarray, but concrete types define their own ||
    if (pgType.typname === "anycompatible" && !f.isOperator && f.name === "width_bucket") { continue; } // overloaded with different arities by float8, numeric

    if (f.isOperator) {
      if (!operatorGroups.has(f.name)) { operatorGroups.set(f.name, []); }
      operatorGroups.get(f.name)!.push(f);
    } else {
      const key = camelcase(f.name);
      if (seenFuncs.has(key)) { continue; }
      seenFuncs.add(key);
      emittedFuncs.push(f);
    }
  }

  // Flatten for import collection
  const allOperators = [...operatorGroups.values()].flat();
  const emitted = [...emittedFuncs, ...allOperators];

  // Collect referenced types only from emitted functions
  const referencedTypes = new Set<string>();
  for (const f of emitted) {
    for (const argOid of f.argTypes.slice(1)) {
      const resolved = resolveBaseTypeName(argOid, pgType, typeMap);
      const t = typeMap.get(argOid);
      if (t && resolved !== "T" && t.className !== pgType.className) {
        referencedTypes.add(t.className);
      }
    }
    const ret = typeMap.get(f.returnType);
    const resolvedRet = resolveBaseTypeName(f.returnType, pgType, typeMap);
    if (ret && resolvedRet !== "T" && ret.className !== pgType.className) {
      referencedTypes.add(ret.className);
    }
  }

  // Track value imports (for extends) separately from type imports
  const valueImports = new Set<string>();
  if (extendsClass) {
    valueImports.add(extendsClass);
  } else if (pgType.typname !== "any") {
    // Concrete types extend Anynonarray
    valueImports.add("Anynonarray");
  }

  if (needsGenericT && !referencedTypes.has("Any") && !valueImports.has("Any")) {
    referencedTypes.add("Any");
  }

  // Determine which null helpers we need
  const needsStrictNull = emitted.some((f) => f.isStrict && f.argTypes.length > 1 && !(f.isOperator && MAYBE_NULL_OPS.has(f.name)));
  const needsMaybeNull = emitted.some((f) => f.isOperator && MAYBE_NULL_OPS.has(f.name));

  // Determine which runtime type helpers and concrete type value imports we need
  let needsPgType = false;
  let needsPgElement = false;
  for (const f of emitted) {
    const retBase = resolveBaseTypeName(f.returnType, pgType, typeMap);
    if (retBase === "T") {
      needsPgElement = true;
    } else if (f.returnType === f.argTypes[0] && (isGeneric || isElement)) {
      needsPgType = true;
    } else {
      // Concrete class used as type arg — needs a value import
      const retT = typeMap.get(f.returnType);
      if (retT && retT.className !== pgType.className) {
        valueImports.add(retT.className);
      }
    }
  }

  const lines: string[] = [];
  lines.push("// Auto-generated — do not edit");

  const hasFuncs = emitted.some((f) => !f.isOperator);
  const hasOps = emitted.some((f) => f.isOperator);
  const needsNullOf = emitted.some((f) => f.argTypes.length > 1);
  // TsTypeOf needed when any arg references a generic any* type
  const needsTsTypeOf = emitted.some((f) =>
    f.argTypes.slice(1).some((oid) => {
      const t = typeMap.get(oid);
      return t && (GENERIC_TYPES.has(t.typname) || ELEMENT_TYPES.has(t.typname));
    }),
  );
  // Concrete types need meta for the [meta] declaration
  const needsMeta = !EXTENDS_MAP[pgType.typname] && pgType.typname !== "any";
  const runtimeImports = [
    ...(needsMeta ? ["meta"] : []),
    ...(hasFuncs ? ["PgFunc"] : []),
    ...(hasOps ? ["PgOp"] : []),
    ...(needsStrictNull ? ["StrictNull"] : []),
    ...(needsMaybeNull ? ["MaybeNull"] : []),
    ...(needsNullOf ? ["NullOf"] : []),
    ...(needsTsTypeOf ? ["TsTypeOf"] : []),
    ...(needsPgType ? ["pgType"] : []),
    ...(needsPgElement ? ["pgElement"] : []),
    ...(emitted.some((f) => f.isSrf && !f.outColumns) ? ["PgSrfFunc"] : []),
    ...(emitted.some((f) => f.isSrf && f.outColumns) ? ["PgSrfMulti"] : []),
    ...(emitted.some((f) => f.isSrf) ? ["PgSrf"] : []),
  ];
  if (runtimeImports.length > 0) {
    lines.push(`import { ${runtimeImports.join(", ")} } from "../runtime";`);
  }
  // Concrete types need Sql for their constructor (accepts Sql | primitive)
  if (!EXTENDS_MAP[pgType.typname] && pgType.typname !== "any") {
    lines.push('import { Sql } from "../../builder/sql";');
  }
  // Extends: import parent class directly from its source file.
  // This avoids circular deps at class definition time — the parent must be
  // fully loaded before the child class evaluates `extends`.
  for (const name of [...valueImports].sort()) {
    const matchingType = [...typeMap.values()].find((t) => t.className === name);
    if (matchingType && overrideNames.has(matchingType.typname)) {
      lines.push(`import { ${name} } from "../overrides/${matchingType.typname}";`);
    } else if (matchingType) {
      lines.push(`import { ${name} } from "../generated/${matchingType.typname}";`);
    }
  }

  // Everything else (PgFunc/PgOp type args, type annotations): namespace import
  // from the barrel. `types.ClassName` is only accessed in method bodies at call
  // time, so all modules are loaded by then — no circular dep issue.
  lines.push('import * as types from "../index";');

  lines.push("");

  // Build class declaration — every class gets N extends number for nullability
  let classDecl = `export class ${pgType.className}`;
  if (needsGenericT) {
    classDecl += `<T extends types.Any<any>, N extends number>`;
  } else {
    classDecl += `<N extends number>`;
  }
  if (extendsClass) {
    if (extendsClass === "Any") {
      classDecl += ` extends ${extendsClass}<N>`;
    } else {
      classDecl += ` extends ${extendsClass}<T, N>`;
    }
  } else if (pgType.typname !== "any") {
    // Concrete types extend Anynonarray (scalars in the type hierarchy)
    classDecl += ` extends Anynonarray<${pgType.className}<N>, N>`;
  }
  classDecl += " {";
  lines.push(classDecl);

  // [meta]: typed metadata bag hidden behind a symbol for clean autocomplete.
  // Contains __class, __nullable, __nonNullable for type-level utilities.
  // deserialize(): defined on Any override via registry, concrete types narrow the return type.
  if (pgType.typname === "any") {
    // Handled by override — no-op here
  } else if (!EXTENDS_MAP[pgType.typname]) {
    // Concrete type — narrow [meta] and deserialize return type
    const tsType = tsPrimitiveFor(pgType.typname);
    const cls = pgType.className;
    lines.push(`  declare [meta]: {`);
    lines.push(`    __class: typeof ${cls};`);
    lines.push(`    __nullable: ${cls}<0 | 1>;`);
    lines.push(`    __nonNullable: ${cls}<1>;`);
    lines.push(`    __aggregate: ${cls}<number>;`);
    lines.push(`  };`);
    lines.push(`  static __typname = "${pgType.typname}";`);
    lines.push(`  constructor(raw: Sql | ${tsType}) { super(raw); }`);
    lines.push(`  declare deserialize: (raw: string) => ${tsType};`);
  } else {
    // any* hierarchy type — inherits [meta] from parent, no re-declaration needed
  }

  // Owner's TS primitive — used to decide if an operator overload arg gets a TS primitive union
  const ownerTsPrimitive = tsPrimitiveFor(pgType.typname);

  // Helper: build a single method signature for a function/operator
  // allowPrimitive: whether to add TS primitive union to arg constraints
  // isOverloadSig: if true, emit as overload declaration (no body)
  const buildMethodSig = (f: PgFunc, allowPrimitive: boolean, isOverloadSig: boolean): string => {
    const restArgs = f.argTypes.slice(1);
    const isMaybeNullOp = f.isOperator && MAYBE_NULL_OPS.has(f.name);

    // Build generic constraint for each arg
    // For operator overloads: only allow TS primitive when allowPrimitive is true
    const genericParams = restArgs.map((oid, i) => {
      const baseName = resolveBaseTypeName(oid, pgType, typeMap);
      const pgTypeConstraint = formatTypeWithNull(baseName, "any");
      const t = typeMap.get(oid);
      if (!t) { return `M${i} extends ${pgTypeConstraint}`; }
      if (GENERIC_TYPES.has(t.typname) && needsGenericT) {
        return `M${i} extends ${pgTypeConstraint}${allowPrimitive ? " | TsTypeOf<T>[]" : ""}`;
      }
      if (ELEMENT_TYPES.has(t.typname) && needsGenericT) {
        return `M${i} extends ${pgTypeConstraint}${allowPrimitive ? " | TsTypeOf<T>" : ""}`;
      }
      if (GENERIC_TYPES.has(t.typname) || ELEMENT_TYPES.has(t.typname)) {
        return `M${i} extends ${pgTypeConstraint}`;
      }
      // Concrete type — only add TS primitive if allowPrimitive
      if (allowPrimitive) {
        return `M${i} extends ${pgTypeConstraint} | ${tsPrimitiveFor(t.typname)}`;
      }
      return `M${i} extends ${pgTypeConstraint}`;
    });
    const genericDecl = genericParams.length > 0 ? `<${genericParams.join(", ")}>` : "";

    // Build parameter list
    const params = restArgs.map((_, i) => `arg${i}: M${i}`).join(", ");

    // Build return type with null propagation
    const retBase = resolveBaseTypeName(f.returnType, pgType, typeMap);
    let retType: string;
    if (f.isAggregate) {
      // Aggregates collapse rows to a scalar: count → 1 (never null), others → 0 | 1 (null on empty group)
      const aggNull = f.name === "count" ? "1" : "0 | 1";
      retType = formatTypeWithNull(retBase, aggNull);
    } else {
      const nullParts = ["N", ...restArgs.map((_, i) => `NullOf<M${i}>`)];
      const nullUnion = nullParts.join(" | ");
      if (isMaybeNullOp) {
        retType = formatTypeWithNull(retBase, `MaybeNull<${nullUnion}>`);
      } else if (!f.isStrict) {
        retType = formatTypeWithNull(retBase, "1");
      } else if (restArgs.length === 0) {
        retType = formatTypeWithNull(retBase, "N");
      } else {
        retType = formatTypeWithNull(retBase, `StrictNull<${nullUnion}>`);
      }
    }

    // Determine runtime type arg
    // pgType/pgElement return the right class at runtime but TS can't verify generics — needs `as any`
    let typeArg: string;
    // Always cast: PgFunc/PgOp construct instances with N=number but the method
    // signature specifies the precise N. Cast is safe — signature is source of truth.
    let needsCast = true;
    if (retBase === "T") {
      typeArg = "pgElement(this)";
      needsCast = true; // TS can't know element type at compile time
    } else if (f.returnType === f.argTypes[0] && (isGeneric || isElement)) {
      typeArg = "pgType(this)";
      needsCast = true; // TS can't know self type for generics at compile time
    } else {
      const retT = typeMap.get(f.returnType);
      // Use types.ClassName namespace for lazy resolution (avoids circular deps at load time)
      typeArg = retT ? `types.${retT.className}` : "undefined";
      // If return type is a generic any* type, TS can't verify T flows through the constructor
      if (retT && (GENERIC_TYPES.has(retT.typname) || ELEMENT_TYPES.has(retT.typname))) {
        needsCast = true;
      }
    }

    const argsExpr = restArgs.map((_, i) => `arg${i}`).join(", ");
    const allArgs = argsExpr ? `this, ${argsExpr}` : "this";

    if (isOverloadSig) {
      // Overload declaration — no body
      if (f.isOperator) {
        return `  ['${f.name}']${genericDecl}(${params}): ${retType};`;
      }
      return `  ${camelcase(f.name)}${genericDecl}(${params}): ${retType};`;
    }

    // SRF — returns a PgSrf Fromable, not a scalar
    if (f.isSrf) {
      if (f.outColumns && f.outColumns.length > 0) {
        // Multi-column SRF: OUT params define the columns
        const colEntries = f.outColumns.map((c) => {
          const t = typeMap.get(c.typeOid)!;
          return `${c.name}: types.${t.className}<1>`;
        });
        const colRuntime = f.outColumns.map((c) => {
          const t = typeMap.get(c.typeOid)!;
          return `["${c.name}", types.${t.className}]`;
        });
        const srfRetType = `PgSrf<{ ${colEntries.join("; ")} }, "${f.name}">`;
        return `  ${camelcase(f.name)}${genericDecl}(${params}): ${srfRetType} { return PgSrfMulti("${f.name}", [${allArgs}], [${colRuntime.join(", ")}]) as any; }`;
      }
      // Single-column SRF: function name as column name
      const colName = f.name;
      const srfRetType = `PgSrf<{ ${colName}: ${retType} }, "${f.name}">`;
      return `  ${camelcase(f.name)}${genericDecl}(${params}): ${srfRetType} { return PgSrfFunc("${f.name}", [${allArgs}], "${colName}", ${typeArg}) as any; }`;
    }

    // Implementation — has body. Cast needed when pgType/pgElement can't be verified by TS.
    const cast = needsCast ? " as any" : "";
    if (f.isOperator) {
      return `  ['${f.name}']${genericDecl}(${params}): ${retType} { return PgOp("${f.name}", [${allArgs}], ${typeArg})${cast}; }`;
    }
    return `  ${camelcase(f.name)}${genericDecl}(${params}): ${retType} { return PgFunc("${f.name}", [${allArgs}], ${typeArg})${cast}; }`;
  };

  // Emit functions — single signature with TS primitive allowed
  for (const f of emittedFuncs) {
    lines.push(buildMethodSig(f, true, false));
  }

  // Emit operators — grouped by name, each group becomes TS overloads
  // Rule: only the overload where tsPrimitiveFor(argType) === ownerTsPrimitive gets the primitive union.
  // This prevents ambiguous overload resolution when passing raw TS values.
  for (const [opName, overloads] of operatorGroups) {
    if (overloads.length === 1) {
      // Single overload — just emit with primitive allowed
      lines.push(buildMethodSig(overloads[0]!, true, false));
    } else {
      // Multiple overloads — emit overload signatures, then implementation
      for (const overload of overloads) {
        // Allow TS primitive only when all arg types share the same TS primitive as the owner
        const argAllowPrimitive = overload.argTypes.slice(1).every((oid) => {
          const t = typeMap.get(oid);
          return t && tsPrimitiveFor(t.typname) === ownerTsPrimitive;
        });
        lines.push(buildMethodSig(overload, argAllowPrimitive, true));
      }
      // Implementation signature — accepts unknown, dispatches at runtime
      lines.push(`  ['${opName}'](${overloads[0]!.argTypes.slice(1).map((_, i) => `arg${i}: unknown`).join(", ")}): any { return PgOp("${opName}", [this, ${overloads[0]!.argTypes.slice(1).map((_, i) => `arg${i}`).join(", ")}], types.${pgType.className}); }`);
    }
  }

  lines.push("}");
  lines.push("");

  return lines.join("\n");
};

const scanOverrides = (): Set<string> => {
  const overrides = new Set<string>();
  if (fs.existsSync(OVERRIDES_DIR)) {
    for (const file of fs.readdirSync(OVERRIDES_DIR)) {
      if (file.endsWith(".ts")) {
        overrides.add(file.replace(".ts", ""));
      }
    }
  }
  return overrides;
};

const generateIndex = (typeMap: Map<number, PgType>, overrides: Set<string>) => {

  const lines: string[] = [];
  lines.push("// Auto-generated block — do not edit between markers");
  lines.push("// [generated-start]");

  const sortedTypes = [...typeMap.values()].sort((a, b) =>
    a.typname.localeCompare(b.typname),
  );

  for (const t of sortedTypes) {
    if (overrides.has(t.typname)) {
      lines.push(
        `export { ${t.className} } from "./overrides/${t.typname}";`,
      );
    } else {
      lines.push(
        `export { ${t.className} } from "./generated/${t.typname}";`,
      );
    }
  }

  lines.push("// [generated-end]");
  lines.push("");

  return lines.join("\n");
};

export const generate = async () => {
  const db = new PGlite();

  try {
    const { typeMap, pgFuncs } = await introspect(db);
    const grouped = groupByFirstArg(pgFuncs);
    const overrideNames = scanOverrides();

    // Clean generated dir
    fs.rmSync(GENERATED_DIR, { recursive: true, force: true });
    fs.mkdirSync(GENERATED_DIR, { recursive: true });

    // Generate a file per type
    for (const [oid, pgType] of typeMap) {
      const funcs = grouped.get(oid) ?? [];
      const content = generateTypeFile(pgType, funcs, typeMap, overrideNames);
      const filePath = path.join(GENERATED_DIR, `${pgType.typname}.ts`);
      fs.writeFileSync(filePath, content);
    }

    // Generate index
    const indexContent = generateIndex(typeMap, overrideNames);
    fs.writeFileSync(TYPES_INDEX, indexContent);

    console.log(`Generated ${typeMap.size} types in ${GENERATED_DIR}`);
  } finally {
    await db.close();
  }
};

// Run only when executed directly, not when imported
const isMain = process.argv[1] && import.meta.filename?.endsWith(process.argv[1].replace(/.*\//, ""));
if (isMain) {
  generate().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
