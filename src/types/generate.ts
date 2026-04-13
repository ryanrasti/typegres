import { PGlite } from "@electric-sql/pglite";
import camelcase from "camelcase";
import * as fs from "node:fs";
import * as path from "node:path";

const GENERATED_DIR = path.resolve(import.meta.dirname, "generated");
const OVERRIDES_DIR = path.resolve(import.meta.dirname, "overrides");
const TYPES_INDEX = path.resolve(import.meta.dirname, "index.ts");

// Map pg type names to TS-friendly class names
const pgNameToClassName = (name: string): string => {
  return camelcase(name, { pascalCase: true });
};

import { getTypeDef } from "./deserialize.ts";

const tsPrimitiveFor = (typname: string): string =>
  getTypeDef(typname).tsType;

// Types that get a generic <T extends Any<number>> parameter
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
const EXTENDS_MAP: Record<string, string> = {
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
  isOperator: boolean;
  isStrict: boolean;
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
    if (EXCLUDED_TYPES.has(t.typname)) continue;
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
        isOperator: false,
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
        isStrict: true, // operators always propagate nulls
      });
    }
  }

  return { typeMap, pgFuncs };
};

// Group functions by their first argument type (the "self" type)
const groupByFirstArg = (pgFuncs: PgFunc[]) => {
  const grouped = new Map<number, PgFunc[]>();

  for (const f of pgFuncs) {
    const firstArg = f.argTypes[0];
    if (firstArg === undefined) continue;
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
  if (!t) return "unknown";

  const ownerIsGeneric = GENERIC_TYPES.has(ownerType.typname) || ELEMENT_TYPES.has(ownerType.typname);

  if (ownerIsGeneric) {
    // Inside a generic class: element types become T, containers get <T>
    if (ELEMENT_TYPES.has(t.typname) && t.typname !== ownerType.typname) {
      return "T";
    }
    // Self-references and container references get <T>
    if (GENERIC_TYPES.has(t.typname) || ELEMENT_TYPES.has(t.typname)) {
      return `${t.className}<T, `;
    }
  } else {
    // Non-generic class referencing a generic any* type: use <Any<number>>
    if (GENERIC_TYPES.has(t.typname) || ELEMENT_TYPES.has(t.typname)) {
      return `${t.className}<Any<number>, `;
    }
  }

  return t.className;
};

// Format a type reference with nullability param
const formatTypeWithNull = (baseName: string, nullParam: string): string => {
  // "T" is a raw generic — no nullability param on it
  if (baseName === "T") return "T";
  // Types that already opened a generic (end with ", ") just need the null param + close
  if (baseName.endsWith(", ")) return `${baseName}${nullParam}>`;
  // Regular types get <nullParam>
  return `${baseName}<${nullParam}>`;
};

const generateTypeFile = (
  pgType: PgType,
  funcs: PgFunc[],
  typeMap: Map<number, PgType>,
): string => {
  const isGeneric = GENERIC_TYPES.has(pgType.typname);
  const isElement = ELEMENT_TYPES.has(pgType.typname);
  const extendsClass = EXTENDS_MAP[pgType.typname];
  const needsGenericT = isGeneric || isElement;

  // First pass: deduplicate and collect only emitted functions
  const seen = new Set<string>();
  const emitted: PgFunc[] = [];

  for (const f of funcs) {
    const key = f.isOperator ? `['${f.name}']` : camelcase(f.name);
    if (seen.has(key)) continue;
    // Skip operators/functions overloaded incompatibly by subtypes — each subtype defines its own version
    if (pgType.typname === "anyelement" && f.isOperator && f.name === "<@") continue; // overloaded: array<@array, range<@range, elem<@multirange
    if (pgType.typname === "anycompatible" && f.isOperator && f.name === "||") continue; // overloaded: text||text, array||array, bytea||bytea, etc.
    if (pgType.typname === "anynonarray" && f.isOperator && f.name === "||") continue; // overloaded: text||anynonarray, but concrete types define their own ||
    if (pgType.typname === "anycompatible" && !f.isOperator && f.name === "width_bucket") continue; // overloaded with different arities by float8, numeric
    seen.add(key);
    emitted.push(f);
  }

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
  const runtimeImports = [
    ...(hasFuncs ? ["PgFunc"] : []),
    ...(hasOps ? ["PgOp"] : []),
    ...(needsStrictNull ? ["StrictNull"] : []),
    ...(needsMaybeNull ? ["MaybeNull"] : []),
    ...(needsNullOf ? ["NullOf"] : []),
    ...(needsTsTypeOf ? ["TsTypeOf"] : []),
    ...(needsPgType ? ["pgType"] : []),
    ...(needsPgElement ? ["pgElement"] : []),
  ];
  if (runtimeImports.length > 0) {
    lines.push(`import { ${runtimeImports.join(", ")} } from "../runtime";`);
  }
  // Any needs getTypeDef for deserialize dispatch
  if (pgType.typname === "any") {
    lines.push('import { getTypeDef } from "../deserialize";');
  }

  // Value imports (for extends)
  if (valueImports.size > 0) {
    const sorted = [...valueImports].sort();
    for (const name of sorted) {
      lines.push(`import { ${name} } from "../index";`);
    }
  }

  // Type-only imports (exclude any that are already value-imported)
  const typeOnlyImports = [...referencedTypes].filter((n) => !valueImports.has(n)).sort();
  if (typeOnlyImports.length > 0) {
    for (const name of typeOnlyImports) {
      lines.push(`import type { ${name} } from "../index";`);
    }
  }

  lines.push("");

  // Build class declaration — every class gets N extends number for nullability
  let classDecl = `export class ${pgType.className}`;
  if (needsGenericT) {
    classDecl += `<T extends Any<number>, N extends number>`;
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

  // __class: typed constructor reference. Set once in Any, narrowed by subclasses.
  // __typname: pg type name for registry lookup. Set on Any and concrete types.
  // deserialize(): defined on Any via registry, concrete types narrow the return type.
  if (pgType.typname === "any") {
    lines.push("  __class = this.constructor as typeof Any;");
    lines.push("  static __typname = \"any\";");
    lines.push("  deserialize(raw: string): unknown { return getTypeDef((this.constructor as typeof Any).__typname).deserialize(raw); }");
  } else if (!EXTENDS_MAP[pgType.typname]) {
    // Concrete type — narrow __class and deserialize return type
    const tsType = tsPrimitiveFor(pgType.typname);
    lines.push(`  declare __class: typeof ${pgType.className};`);
    lines.push(`  static __typname = "${pgType.typname}";`);
    lines.push(`  declare deserialize: (raw: string) => ${tsType};`);
  } else {
    // any* hierarchy type — __class narrows through inheritance
    lines.push(`  declare __class: typeof ${pgType.className};`);
  }

  for (const f of emitted) {
    const restArgs = f.argTypes.slice(1);
    const isMaybeNullOp = f.isOperator && MAYBE_NULL_OPS.has(f.name);

    // Build generic constraint for each arg: M0 extends Int4<any> | number
    const genericParams = restArgs.map((oid, i) => {
      const baseName = resolveBaseTypeName(oid, pgType, typeMap);
      const pgTypeConstraint = formatTypeWithNull(baseName, "any");
      const t = typeMap.get(oid);
      if (!t) return `M${i} extends ${pgTypeConstraint}`;
      if (GENERIC_TYPES.has(t.typname) && needsGenericT) {
        // Container types on a generic class — accept TS array of element's TS type
        return `M${i} extends ${pgTypeConstraint} | TsTypeOf<T>[]`;
      }
      if (ELEMENT_TYPES.has(t.typname) && needsGenericT) {
        // Element types on a generic class — accept the element's TS type directly
        return `M${i} extends ${pgTypeConstraint} | TsTypeOf<T>`;
      }
      if (GENERIC_TYPES.has(t.typname) || ELEMENT_TYPES.has(t.typname)) {
        // any* type referenced from a concrete class — accept unknown
        return `M${i} extends ${pgTypeConstraint} | unknown`;
      }
      // Concrete types — accept the TS primitive
      return `M${i} extends ${pgTypeConstraint} | ${tsPrimitiveFor(t.typname)}`;
    });
    const genericDecl = genericParams.length > 0 ? `<${genericParams.join(", ")}>` : "";

    // Build parameter list — arg type is just M0 (the generic captures both pg type and primitive)
    const params = restArgs
      .map((_, i) => `arg${i}: M${i}`)
      .join(", ");

    // Build return type with null propagation
    // NullOf<M> extracts N from pg types, defaults to 1 for primitives
    // Three modes:
    //   1. Strict (proisstrict=true): null in → null out, StrictNull<N | NullOf<M>...>
    //   2. Non-strict (proisstrict=false): handles nulls explicitly, always returns non-null (1)
    //   3. Maybe-null operators (-> ->> #> #>>): can introduce nulls, MaybeNull<N | NullOf<M>...>
    const retBase = resolveBaseTypeName(f.returnType, pgType, typeMap);
    let retType: string;
    const nullParts = ["N", ...restArgs.map((_, i) => `NullOf<M${i}>`)];
    const nullUnion = nullParts.join(" | ");
    if (isMaybeNullOp) {
      // JSON access etc. — can return null even from non-null inputs
      retType = formatTypeWithNull(retBase, `MaybeNull<${nullUnion}>`);
    } else if (!f.isStrict) {
      // Non-strict functions handle nulls explicitly — always return non-null
      retType = formatTypeWithNull(retBase, "1");
    } else if (restArgs.length === 0) {
      // Strict, no extra args — nullability passes through from this
      retType = formatTypeWithNull(retBase, "N");
    } else {
      // Strict, multiple args — union all nullability params
      retType = formatTypeWithNull(retBase, `StrictNull<${nullUnion}>`);
    }

    const argsExpr = restArgs.map((_, i) => `arg${i}`).join(", ");
    const allArgs = argsExpr ? `this, ${argsExpr}` : "this";

    // Determine runtime type arg:
    //   - Return is T (element of container) → pgElement(this)
    //   - Return is same type as self and class is generic → pgType(this)
    //   - Otherwise → concrete class reference
    let typeArg: string;
    if (retBase === "T") {
      typeArg = "pgElement(this)";
    } else if (f.returnType === f.argTypes[0] && (isGeneric || isElement)) {
      typeArg = "pgType(this)";
    } else {
      const retT = typeMap.get(f.returnType);
      typeArg = retT?.className ?? "undefined";
    }

    if (f.isOperator) {
      lines.push(
        `  ['${f.name}']${genericDecl}(${params}): ${retType} { return PgOp("${f.name}", [${allArgs}], ${typeArg}) as any; }`,
      );
    } else {
      lines.push(
        `  ${camelcase(f.name)}${genericDecl}(${params}): ${retType} { return PgFunc("${f.name}", [${allArgs}], ${typeArg}) as any; }`,
      );
    }
  }

  lines.push("}");
  lines.push("");

  return lines.join("\n");
};

const generateIndex = (typeMap: Map<number, PgType>) => {
  const overrides = new Set<string>();
  if (fs.existsSync(OVERRIDES_DIR)) {
    for (const file of fs.readdirSync(OVERRIDES_DIR)) {
      if (file.endsWith(".ts")) {
        overrides.add(file.replace(".ts", ""));
      }
    }
  }

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

    // Clean generated dir
    fs.rmSync(GENERATED_DIR, { recursive: true, force: true });
    fs.mkdirSync(GENERATED_DIR, { recursive: true });

    // Generate a file per type
    for (const [oid, pgType] of typeMap) {
      const funcs = grouped.get(oid) ?? [];
      const content = generateTypeFile(pgType, funcs, typeMap);
      const filePath = path.join(GENERATED_DIR, `${pgType.typname}.ts`);
      fs.writeFileSync(filePath, content);
    }

    // Generate index
    const indexContent = generateIndex(typeMap);
    fs.writeFileSync(TYPES_INDEX, indexContent);

    console.log(`Generated ${typeMap.size} types in ${GENERATED_DIR}`);
  } finally {
    await db.close();
  }
};

// CLI entry point
generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
