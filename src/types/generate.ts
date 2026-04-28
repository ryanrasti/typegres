import pg from "pg";
import camelcase from "camelcase";
import * as fs from "node:fs";
import * as path from "node:path";
import { pathToFileURL } from "node:url";
import { requireDatabaseUrl } from "../pg.ts";
import { getTypeDef } from "./deserialize.ts";
import {
  introspect,
  groupByFirstArg,
  pgNameToClassName,
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

// Types that become T when referenced from other classes
// (they represent "the element type" in polymorphic signatures)
const ELEMENT_TYPES = new Set([
  "anyelement",
  "anynonarray",
  "anycompatible",
  "anycompatiblenonarray",
  "anyenum",
]);

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
const OPERATOR_ALIASES: { [op: string]: string } = {
  "=": "eq",
  "<>": "ne",
  "<": "lt",
  "<=": "lte",
  ">": "gt",
  ">=": "gte",
  "+": "plus",
  "-": "minus",
  "*": "times",
  "/": "divide",
  "%": "mod",
  "^": "pow",
};

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


// Resolution of a pg-type OID to its TS representation, before the
// nullability param is filled in. Containers (Anyarray<T, N> etc.) need an
// element arg; bare references close directly with <N>; references to an
// element type from inside a container forward the owner's T.
type ResolvedType =
  | { kind: "T" }
  | { kind: "unknown" }
  | { kind: "simple"; className: string }
  | { kind: "container"; className: string; elementArg: "T" | "types.Any<any>" };

const resolveBaseTypeName = (
  oid: number,
  ownerType: PgType,
  typeMap: Map<number, PgType>,
): ResolvedType => {
  const t = typeMap.get(oid);
  if (!t) { return { kind: "unknown" }; }

  const ownerIsContainer = GENERIC_TYPES.has(ownerType.typname);

  if (GENERIC_TYPES.has(t.typname)) {
    return {
      kind: "container",
      className: t.className,
      elementArg: ownerIsContainer ? "T" : "types.Any<any>",
    };
  }

  // Inside a container, references to element-type classes forward the
  // owner's T — that's the semantic "the element type" slot.
  if (ownerIsContainer && ELEMENT_TYPES.has(t.typname)) {
    return { kind: "T" };
  }

  return { kind: "simple", className: t.className };
};

const formatTypeWithNull = (r: ResolvedType, nullParam: string): string => {
  switch (r.kind) {
    case "T":         return "T";
    case "unknown":   return "unknown";
    case "simple":    return `types.${r.className}<${nullParam}>`;
    case "container": return `types.${r.className}<${r.elementArg}, ${nullParam}>`;
  }
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
  // Only container types carry a T param. Element types (anyelement,
  // anynonarray, anycompatible, anycompatiblenonarray, anyenum) dropped T to
  // break the self-referential variance loop: Int4 used to extend
  // Anynonarray<Int4<N>, N>, which forced TS to relate Int4 to itself to
  // compute variance. Containers still keep T (they genuinely need the
  // element type in their method signatures).
  const needsGenericT = isGeneric;
  const parentIsContainer = extendsClass !== undefined
    && [...GENERIC_TYPES].some((n) => pgNameToClassName(n) === extendsClass);

  // Group both functions and operators by name so real pg overloads (e.g.
  // substring(bit, int4) and substring(bit, int4, int4)) become a single
  // method with multiple TS overload signatures.
  const funcGroups = new Map<string, PgFunc[]>();
  const operatorGroups = new Map<string, PgFunc[]>();

  for (const f of funcs) {
    // Skip operators/functions overloaded incompatibly by subtypes — each subtype defines its own version
    if (pgType.typname === "anyelement" && f.isOperator && f.name === "<@") { continue; } // overloaded: array<@array, range<@range, elem<@multirange
    if (pgType.typname === "anycompatible" && f.isOperator && f.name === "||") { continue; } // overloaded: text||text, array||array, bytea||bytea, etc.
    if (pgType.typname === "anynonarray" && f.isOperator && f.name === "||") { continue; } // overloaded: text||anynonarray, but concrete types define their own ||
    if (pgType.typname === "anycompatible" && !f.isOperator && f.name === "width_bucket") { continue; } // overloaded with different arities by float8, numeric

    const groups = f.isOperator ? operatorGroups : funcGroups;
    const key = f.isOperator ? f.name : camelcase(f.name);
    if (!groups.has(key)) { groups.set(key, []); }
    groups.get(key)!.push(f);
  }

  const lines: string[] = [];
  lines.push("// Auto-generated — do not edit");
  lines.push('import * as runtime from "../runtime";');

  // Parent class needs a direct import, not `types.Parent`: class `extends`
  // clauses evaluate at module-load time, and the barrel may not have finished
  // loading when this file runs. Method bodies use `types.X` freely — those
  // are lazy, so load order doesn't matter.
  const parentTypname = pgType.typname === "any"
    ? undefined
    : extendsClass
      ? Object.keys(EXTENDS_MAP).find((k) => pgNameToClassName(k) === extendsClass)
        ?? "any"
      : "anynonarray";
  if (parentTypname) {
    const parentClass = pgNameToClassName(parentTypname);
    const dir = overrideNames.has(parentTypname) ? "overrides" : "generated";
    lines.push(`import { ${parentClass} } from "../${dir}/${parentTypname}";`);
  }

  lines.push('import * as types from "../index";');

  lines.push("");

  // Build class declaration. Explicit `in out N` variance annotation skips
  // TS's structural variance inference, which otherwise walks the full method
  // surface across 77 concrete classes × ~100 mutually-referencing methods
  // and recurses deep enough to overflow stock tsc's default stack. With the
  // annotation, stock tsc typechecks cleanly in ~1.5s at default stack.
  let classDecl = `export class ${pgType.className}`;
  if (needsGenericT) {
    classDecl += `<T extends types.Any<any>, in out N extends number>`;
  } else {
    classDecl += `<in out N extends number>`;
  }
  if (extendsClass) {
    // Parent takes T only if it's a container itself.
    classDecl += parentIsContainer
      ? ` extends ${extendsClass}<T, N>`
      : ` extends ${extendsClass}<N>`;
  } else if (pgType.typname !== "any") {
    classDecl += ` extends Anynonarray<N>`;
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
    // If override exists, reference via types.Cls (barrel namespace) so [meta] points to the override
    const tsType = tsPrimitiveFor(pgType.typname);
    const cls = pgType.className;
    const ref = overrideNames.has(pgType.typname) ? `types.${cls}` : cls;
    // Subclass [meta] redeclarations replace the parent's — repeat __raw
    // and __nullability from Any to keep them visible on concrete instances.
    lines.push(`  declare [runtime.meta]: {`);
    lines.push(`    __class: typeof ${ref};`);
    lines.push(`    __raw: runtime.Sql;`);
    lines.push(`    __nullability: N;`);
    lines.push(`    __nullable: ${ref}<0 | 1>;`);
    lines.push(`    __nonNullable: ${ref}<1>;`);
    lines.push(`    __aggregate: ${ref}<number>;`);
    lines.push(`    __any: ${ref}<any>;`);
    lines.push(`  };`);
    lines.push(`  static __typname = runtime.sql\`${pgType.typname}\`;`);
    lines.push(`  static __typnameText = "${pgType.typname}";`);
    // Only narrow the deserialize return type if there's no override — the
    // override is the source of truth (e.g. Record widens to
    // RowTypeToTsType<T>, which isn't expressible here).
    if (!overrideNames.has(pgType.typname)) {
      lines.push(`  declare deserialize: (raw: string) => ${tsType};`);
    }
  } else {
    // any* hierarchy type — inherits [meta] from parent, no re-declaration needed
  }

  const ownerTsPrimitive = tsPrimitiveFor(pgType.typname);

  // --- Method codegen helpers ---

  // Build generic param + TS type for a single arg
  const buildArgGeneric = (oid: number, i: number, allowPrimitive: boolean): string => {
    const resolved = resolveBaseTypeName(oid, pgType, typeMap);
    const constraint = formatTypeWithNull(resolved, "any");
    const t = typeMap.get(oid);
    if (!t) { return `M${i} extends ${constraint}`; }
    if (GENERIC_TYPES.has(t.typname) && needsGenericT) {
      return `M${i} extends ${constraint}${allowPrimitive ? " | runtime.TsTypeOf<T>[]" : ""}`;
    }
    if (ELEMENT_TYPES.has(t.typname) && needsGenericT) {
      return `M${i} extends ${constraint}${allowPrimitive ? " | runtime.TsTypeOf<T>" : ""}`;
    }
    if (GENERIC_TYPES.has(t.typname) || ELEMENT_TYPES.has(t.typname)) {
      return `M${i} extends ${constraint}`;
    }
    return allowPrimitive
      ? `M${i} extends ${constraint} | ${tsPrimitiveFor(t.typname)}`
      : `M${i} extends ${constraint}`;
  };

  // Build return type string for a function
  const buildRetType = (f: PgFunc): string => {
    const retBase = resolveBaseTypeName(f.returnType, pgType, typeMap);
    const restArgs = f.argTypes.slice(1);
    if (f.isAggregate) {
      return formatTypeWithNull(retBase, f.name === "count" ? "1" : "0 | 1");
    }
    const nullParts = ["N", ...restArgs.map((_, i) => `runtime.NullOf<M${i}>`)];
    const nullUnion = nullParts.join(" | ");
    if (MAYBE_NULL_OPS.has(f.name)) {
      return formatTypeWithNull(retBase, `runtime.MaybeNull<${nullUnion}>`);
    }
    if (!f.isStrict) {
      return formatTypeWithNull(retBase, "1");
    }
    if (restArgs.length === 0) {
      return formatTypeWithNull(retBase, "N");
    }
    return formatTypeWithNull(retBase, `runtime.StrictNull<${nullUnion}>`);
  };

  // Runtime expression for a function's return-type constructor.
  // For methods on abstract hierarchy types, the actual concrete class isn't
  // known statically — resolve via pgElement(this) (container → element) or
  // pgType(this) (abstract → self). Otherwise use the concrete class directly.
  const runtimeRetType = (f: PgFunc): string => {
    const retBase = resolveBaseTypeName(f.returnType, pgType, typeMap);
    if (retBase.kind === "T") { return "runtime.pgElement(this)"; }
    if (f.returnType === f.argTypes[0] && (isGeneric || isElement)) { return "runtime.pgType(this)"; }
    const retT = typeMap.get(f.returnType);
    return retT ? `types.${retT.className}` : `types.${pgType.className}`;
  };

  // Build a match case string: [[{type, allowPrimitive?}, ...], retType]
  const buildMatchCase = (f: PgFunc, restrictPrimitive: boolean): string => {
    const matchers = f.argTypes.slice(1).map((oid) => {
      const t = typeMap.get(oid);
      if (!t) { return `{ type: types.Any }`; }
      const ap = restrictPrimitive
        ? tsPrimitiveFor(t.typname) === ownerTsPrimitive
        : true;
      return ap ? `{ type: types.${t.className}, allowPrimitive: true }` : `{ type: types.${t.className} }`;
    });
    return `[[${matchers.join(", ")}], ${runtimeRetType(f)}]`;
  };

  // Whether an overload's arg types all share the owner's TS primitive, used
  // to decide if primitive inputs (e.g. `5`, `"foo"`) are accepted without
  // ambiguity. Applied per-overload for signatures; globally (any overload
  // restricts) for the match-impl body.
  const argsMatchOwnerPrimitive = (f: PgFunc): boolean =>
    f.argTypes.slice(1).every((oid) => {
      const t = typeMap.get(oid);
      return t !== undefined && tsPrimitiveFor(t.typname) === ownerTsPrimitive;
    });

  // Method name(s) as emitted. Operators get the bracketed form plus a
  // readable alias if one is defined (eq/lt/plus/…); pg's catalog
  // doesn't give these a nice function name, so codegen synthesizes one.
  // Functions get just the camelcased pg name.
  const methodName = (f: PgFunc): string =>
    f.isOperator ? `['${f.name}']` : camelcase(f.name);
  const aliasName = (f: PgFunc): string | null =>
    f.isOperator && f.name in OPERATOR_ALIASES ? OPERATOR_ALIASES[f.name]! : null;

  // Build the "header" of a method signature: name + generic decl + params.
  // `nameOverride` lets us emit the same signature under an alias name
  // (e.g. `eq` next to `['=']`).
  const buildSig = (f: PgFunc, allowPrimitive: boolean, nameOverride?: string): string => {
    const restArgs = f.argTypes.slice(1);
    const genericDecl = restArgs.length > 0
      ? `<${restArgs.map((oid, i) => buildArgGeneric(oid, i, allowPrimitive)).join(", ")}>`
      : "";
    const params = restArgs.map((_, i) => `arg${i}: M${i}`).join(", ");
    return `${nameOverride ?? methodName(f)}${genericDecl}(${params})`;
  };

  // Build the runtime body: match dispatch + caller. Uniform across 0-arg,
  // n-arg, functions, operators, and single-column SRFs — the only thing
  // that changes is which runtime entry point wraps __rt. `...__rest` spread
  // tolerates overloads of differing arity within the same group.
  const buildBody = (funcs: PgFunc[], restrictPrimitive: boolean): string => {
    const f0 = funcs[0]!;
    const maxArity = Math.max(...funcs.map((f) => f.argTypes.length - 1));
    const inputArgs = Array.from({ length: maxArity }, (_, i) => `arg${i}`);
    const cases = funcs.map((fn) => buildMatchCase(fn, restrictPrimitive));
    const matchCall = `runtime.match([${inputArgs.join(", ")}], [${cases.join(", ")}])`;
    const caller = f0.isSrf
      ? `new runtime.PgSrf("${f0.name}", [this, ...__rest], [["${f0.name}", __rt]])`
      : f0.isOperator
        ? `runtime.PgOp(runtime.sql\`${f0.name}\`, [this, ...__rest] as [unknown, unknown], __rt)`
        : `runtime.PgFunc("${f0.name}", [this, ...__rest], __rt)`;
    return `const [__rt, ...__rest] = ${matchCall}; return ${caller} as any;`;
  };

  // Wrap a bare pg return type for SRFs: `Int4<N>` → `PgSrf<{ name: Int4<N> }, "name">`.
  const wrapSrfRet = (f: PgFunc, retType: string): string =>
    `runtime.PgSrf<{ ${f.name}: ${retType} }, "${f.name}">`;

  // --- Emit methods ---

  // One loop handles: functions, operators, and single-column SRFs. Every
  // group goes through match; signatures become TS overloads when the pg
  // overload set has more than one entry.
  // Multi-column SRFs are handled separately below (row shape is driven by
  // OUT params, not by args, so match doesn't apply).
  const allGroups = [...funcGroups.values(), ...operatorGroups.values()];
  for (const group of allGroups) {
    const f0 = group[0]!;

    // Multi-column SRF: special-cased, shape comes from outColumns.
    if (f0.isSrf && f0.outColumns && f0.outColumns.length > 0) {
      const restArgs = f0.argTypes.slice(1);
      const argNames = restArgs.map((_, i) => `arg${i}`);
      const allArgs = argNames.length > 0 ? `this, ${argNames.join(", ")}` : "this";
      const colEntries = f0.outColumns.map((c) => { const t = typeMap.get(c.typeOid)!; return `${c.name}: types.${t.className}<1>`; });
      const colRuntime = f0.outColumns.map((c) => { const t = typeMap.get(c.typeOid)!; return `["${c.name}", types.${t.className}]`; });
      const sig = buildSig(f0, true);
      const ret = `runtime.PgSrf<{ ${colEntries.join("; ")} }, "${f0.name}">`;
      lines.push(`  ${sig}: ${ret} { return new runtime.PgSrf("${f0.name}", [${allArgs}], [${colRuntime.join(", ")}]) as any; }`);
      continue;
    }

    const wrapRet = f0.isSrf ? wrapSrfRet : (_: PgFunc, r: string) => r;
    // Skip the alias if pg already has a function with that name on this
    // type (e.g. `mod`, `pow`) — the pg function wins, its signature is
    // authoritative, and a synthesized alias would collide.
    const rawAlias = aliasName(f0);
    const alias = rawAlias && !funcGroups.has(rawAlias) ? rawAlias : null;

    const emit = (nameOverride?: string): void => {
      if (group.length === 1) {
        const sig = buildSig(f0, true, nameOverride);
        const retType = wrapRet(f0, buildRetType(f0));
        lines.push(`  ${sig}: ${retType} { ${buildBody(group, false)} }`);
        return;
      }
      // Multiple overloads: emit TS overload signatures, then one typed-as-any
      // implementation dispatching via match with restrictPrimitive on.
      for (const overload of group) {
        const sig = buildSig(overload, argsMatchOwnerPrimitive(overload), nameOverride);
        const retType = wrapRet(overload, buildRetType(overload));
        lines.push(`  ${sig}: ${retType};`);
      }
      // Impl sig must cover all arities — required up to min, optional up to max.
      const arities = group.map((f) => f.argTypes.length - 1);
      const minArity = Math.min(...arities);
      const maxArity = Math.max(...arities);
      const implParams = Array.from({ length: maxArity }, (_, i) =>
        `arg${i}${i >= minArity ? "?" : ""}: unknown`,
      ).join(", ");
      lines.push(`  ${nameOverride ?? methodName(f0)}(${implParams}): any { ${buildBody(group, true)} }`);
    };

    emit();
    if (alias) { emit(alias); }
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
  const db = new pg.Pool({ connectionString: requireDatabaseUrl() });

  try {
    const { typeMap, pgFuncs } = await introspect(db, Object.keys(OPERATOR_ALIASES));
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
