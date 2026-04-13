import { PGlite } from "@electric-sql/pglite";
import camelcase from "camelcase";
import * as fs from "node:fs";
import * as path from "node:path";

const GENERATED_DIR = path.resolve(import.meta.dirname, "../types/generated");
const OVERRIDES_DIR = path.resolve(import.meta.dirname, "../types/overrides");
const TYPES_INDEX = path.resolve(import.meta.dirname, "../types/index.ts");

// Map pg type names to TS-friendly class names
const pgNameToClassName = (name: string): string => {
  return camelcase(name, { pascalCase: true });
};

// Types that get a generic <T extends Any> parameter
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

// Inheritance hierarchy:
// Any
//   └─ Anycompatible
//        └─ Anyelement
//             ├─ Anycompatiblenonarray
//             │    └─ Anynonarray
//             │         └─ Anyenum
//             ├─ Anycompatiblearray<T>
//             │    └─ Anyarray<T>
//             ├─ Anycompatiblerange<T>
//             │    └─ Anyrange<T>
//             └─ Anycompatiblemultirange<T>
//                  └─ Anymultirange<T>
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

  // Get functions: name, arg types, return type
  const { rows: funcs } = await db.query<{
    proname: string;
    proargtypes: string;
    prorettype: number;
  }>(`
    SELECT p.proname, p.proargtypes::text, p.prorettype
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

  // Get operators
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

// Resolve a type OID to its TS name, applying generic substitutions
// Only apply T substitution when the owning class is itself generic (an any* type)
const resolveTypeName = (
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
      return `${t.className}<T>`;
    }
  } else {
    // Non-generic class referencing a generic any* type: use <Any>
    if (GENERIC_TYPES.has(t.typname) || ELEMENT_TYPES.has(t.typname)) {
      return `${t.className}<Any>`;
    }
  }

  return t.className;
};

const generateTypeFile = (
  pgType: PgType,
  funcs: PgFunc[],
  typeMap: Map<number, PgType>,
): string => {
  const isGeneric = GENERIC_TYPES.has(pgType.typname);
  const isElement = ELEMENT_TYPES.has(pgType.typname);
  const extendsClass = EXTENDS_MAP[pgType.typname];

  // First pass: deduplicate and collect only emitted functions
  const seen = new Set<string>();
  const emitted: PgFunc[] = [];

  for (const f of funcs) {
    const key = f.isOperator ? `['${f.name}']` : camelcase(f.name);
    if (seen.has(key)) continue;
    // Skip operators overloaded incompatibly by subtypes — each subtype defines its own version
    if (pgType.typname === "anyelement" && f.isOperator && f.name === "<@") continue; // overloaded: array<@array, range<@range, elem<@multirange
    if (pgType.typname === "anycompatible" && f.isOperator && f.name === "||") continue; // overloaded: text||text, array||array
    seen.add(key);
    emitted.push(f);
  }

  // Collect referenced types only from emitted functions
  const referencedTypes = new Set<string>();
  for (const f of emitted) {
    for (const argOid of f.argTypes.slice(1)) {
      const resolved = resolveTypeName(argOid, pgType, typeMap);
      const t = typeMap.get(argOid);
      // Only import if it's a concrete class name (not T)
      if (t && resolved !== "T" && t.className !== pgType.className) {
        // Strip generic param for import
        referencedTypes.add(t.className);
      }
    }
    const ret = typeMap.get(f.returnType);
    const resolvedRet = resolveTypeName(f.returnType, pgType, typeMap);
    if (ret && resolvedRet !== "T" && ret.className !== pgType.className) {
      referencedTypes.add(ret.className);
    }
  }

  // Track value imports (for extends) separately from type imports
  const valueImports = new Set<string>();
  if (extendsClass) {
    valueImports.add(extendsClass);
  }

  // Only any* types are generic — concrete types are not
  const needsGenericT = isGeneric || isElement;

  if (needsGenericT && !referencedTypes.has("Any") && !valueImports.has("Any")) {
    referencedTypes.add("Any");
  }

  const lines: string[] = [];
  lines.push("// Auto-generated — do not edit");

  const hasFuncs = emitted.some((f) => !f.isOperator);
  const hasOps = emitted.some((f) => f.isOperator);
  const runtimeImports = [
    ...(hasFuncs ? ["PgFunc"] : []),
    ...(hasOps ? ["PgOp"] : []),
  ];
  if (runtimeImports.length > 0) {
    lines.push(`import { ${runtimeImports.join(", ")} } from "../../codegen/runtime.js";`);
  }

  // Value imports (for extends)
  if (valueImports.size > 0) {
    const sorted = [...valueImports].sort();
    for (const name of sorted) {
      lines.push(`import { ${name} } from "../index.js";`);
    }
  }

  // Type-only imports (exclude any that are already value-imported)
  const typeOnlyImports = [...referencedTypes].filter((n) => !valueImports.has(n)).sort();
  if (typeOnlyImports.length > 0) {
    for (const name of typeOnlyImports) {
      lines.push(`import type { ${name} } from "../index.js";`);
    }
  }

  lines.push("");

  // Build class declaration
  let classDecl = `export class ${pgType.className}`;
  if (isGeneric || isElement || needsGenericT) {
    classDecl += `<T extends Any>`;
  }
  if (extendsClass) {
    // If parent is Any, no generic param. Otherwise pass T through.
    if (extendsClass === "Any") {
      classDecl += ` extends ${extendsClass}`;
    } else {
      classDecl += ` extends ${extendsClass}<T>`;
    }
  }
  classDecl += " {";
  lines.push(classDecl);

  for (const f of emitted) {
    const restArgs = f.argTypes.slice(1);
    const params = restArgs
      .map((oid, i) => {
        const typeName = resolveTypeName(oid, pgType, typeMap);
        return `arg${i}: ${typeName}`;
      })
      .join(", ");

    const retName = resolveTypeName(f.returnType, pgType, typeMap);
    const argsExpr = restArgs.map((_, i) => `arg${i}`).join(", ");
    const allArgs = argsExpr ? `this, ${argsExpr}` : "this";

    if (f.isOperator) {
      lines.push(
        `  ['${f.name}'](${params}): ${retName} { return PgOp("${f.name}", [${allArgs}]) as any; }`,
      );
    } else {
      lines.push(
        `  ${camelcase(f.name)}(${params}): ${retName} { return PgFunc("${f.name}", [${allArgs}]) as any; }`,
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
        `export { ${t.className} } from "./overrides/${t.typname}.js";`,
      );
    } else {
      lines.push(
        `export { ${t.className} } from "./generated/${t.typname}.js";`,
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
