// The unified emitter — signature facts in, generated TypeScript out.
// ONE method pipeline serves both dialects; there are no dialect
// branches in it. Every difference is driven by the facts or the type
// table:
//   - variadic overloads ⇒ rest-args impl style + rest matchers
//     (postgres facts never carry variadic — its output is unchanged
//     by the facts, not by a flag);
//   - doc strings ⇒ emitted doc lines (postgres facts carry none);
//   - kind "unaryop" ⇒ unaryOpCall (sqlite-only kind);
//   - isSrf/outColumns ⇒ Srf wrappers (postgres-only facts);
//   - T-threading ⇒ fires only when the type table marks pseudotypes
//     generic/element (sqlite's table marks none);
//   - deterministic: false ⇒ not emitted (postgres pre-filters via
//     provolatile, so the field is absent there).
// Class chrome (imports/statics/heritage), index/barrel files, and
// output paths are DATA the dialect entries pass in
// (postgres/emit.ts, sqlite/emit.ts).

import * as fs from "node:fs";
import * as path from "node:path";
import camelcase from "camelcase";
import { OPERATOR_ALIASES, UNARY_OPERATOR_ALIASES } from "./common.ts";

// --- facts ---------------------------------------------------------------
// The facts contract (zod schemas + inferred types) lives in
// ./facts.ts — re-exported here so dialect entries import one module.

import type { EmitArg, EmitOverload, EmitFn } from "./facts.ts";
export type { Nullability, EmitArg, EmitOverload, EmitFn } from "./facts.ts";

// --- type table ------------------------------------------------------------

export interface TypeEntry {
  typname: string;
  className: string;
  primitiveTs?: string | undefined;      // typeof-primitive accepted alongside instances
  primitiveTsUnion?: string | undefined; // decl-side union when broader than one typeof (sqlite any/blob)
  generic?: boolean | undefined;         // container pseudotype: class takes <T, N>
  element?: boolean | undefined;         // renders as T inside containers
  // Same-return primitive-collision tie-break: when overloads collide
  // on their primitive signature AND agree on the return type, the
  // highest summed rank wins the primitive (sqlite: real outranks
  // integer, so every number — fractional included — dispatches
  // through the value-preserving REAL cast). Unset ⇒ the
  // owner-overload rule decides.
  losslessRank?: number | undefined;
}

export interface EmitConfig {
  typeTable: Map<string, TypeEntry>;
  // Method names owned by hand-written base members (skipped here).
  noMethod: Set<string>;
}

// --- naming -----------------------------------------------------------------
// camelCase(sql) for functions; operators get the SQL symbol as a
// bracket method plus a readable alias (shared table + PG's collision
// rule against the host's real functions). Unary "-" is alias-only
// (bracket would collide with binary minus); keyword operators
// (IS NOT, ...) get camelCase aliases.

const namesFor = (fn: EmitFn, hostFunctionNames: Set<string>): string[] => {
  if (fn.kind === "scalar" || fn.kind === "aggregate") { return [camelcase(fn.sql)]; }
  const names: string[] = [];
  if (!(fn.kind === "unaryop" && fn.sql === "-")) { names.push(`['${fn.sql}']`); }
  const alias = fn.kind === "unaryop"
    ? UNARY_OPERATOR_ALIASES[fn.sql]
    : /[A-Za-z]/.test(fn.sql) ? camelcase(fn.sql) : OPERATOR_ALIASES[fn.sql];
  if (alias && !hostFunctionNames.has(alias)) { names.push(alias); }
  return names;
};

// --- type resolution ----------------------------------------------------------
// Containers (Anyarray<T, N> etc.) need an element arg; bare
// references close directly with <N>; references to an element type
// from inside a container forward the owner's T.

type ResolvedType =
  | { kind: "T" }
  | { kind: "unknown" }
  | { kind: "simple"; className: string }
  | { kind: "container"; className: string; elementArg: "T" | "types.Any<any>" };

const resolveType = (
  typname: string | null,
  owner: TypeEntry,
  table: Map<string, TypeEntry>,
): ResolvedType => {
  const t = typname === null ? undefined : table.get(typname);
  if (!t) { return { kind: "unknown" }; }
  if (t.generic) {
    return { kind: "container", className: t.className, elementArg: owner.generic ? "T" : "types.Any<any>" };
  }
  if (owner.generic && t.element) { return { kind: "T" }; }
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

// --- the method pipeline --------------------------------------------------------

const paramsOf = (o: EmitOverload): EmitArg[] => o.args.slice(1);

// Overloads hosted on a class: those whose receiver (first) arg carries its type.
const hostedOverloads = (fn: EmitFn, host: TypeEntry): EmitOverload[] =>
  fn.overloads.filter((o) => o.args[0]?.type === host.typname);

export const emitMethods = (host: TypeEntry, allFns: EmitFn[], cfg: EmitConfig): string[] => {
  const table = cfg.typeTable;
  const lines: string[] = [];

  // Hosted definitions, and the host's real function names (backs the
  // per-host operator-alias collision rule — pg's `mod`/`pow`).
  const fns = allFns.filter((fn) =>
    fn.deterministic !== false &&
    hostedOverloads(fn, host).length > 0 &&
    !((fn.kind === "scalar" || fn.kind === "aggregate") && cfg.noMethod.has(camelcase(fn.sql))));
  const hostFunctionNames = new Set(
    fns.filter((f) => f.kind === "scalar" || f.kind === "aggregate").map((f) => camelcase(f.sql)),
  );

  const primitiveTsFor = (typname: string | null): string => {
    const t = typname === null ? undefined : table.get(typname);
    return t?.primitiveTs ?? "";
  };
  const primitiveUnionFor = (typname: string | null): string | null => {
    const t = typname === null ? undefined : table.get(typname);
    return t?.primitiveTsUnion ?? t?.primitiveTs ?? null;
  };

  // Build generic param + TS type for a single arg.
  const buildArgGeneric = (arg: EmitArg, i: number, allowPrimitive: boolean): string => {
    const resolved = resolveType(arg.type, host, table);
    const constraint = formatTypeWithNull(resolved, "any");
    const t = arg.type === null ? undefined : table.get(arg.type);
    if (!t) { return `M${i} extends ${constraint}`; }
    if (t.generic && host.generic) {
      return `M${i} extends ${constraint}${allowPrimitive ? " | runtime.TsTypeOf<T>[]" : ""}`;
    }
    if (t.element && host.generic) {
      return `M${i} extends ${constraint}${allowPrimitive ? " | runtime.TsTypeOf<T>" : ""}`;
    }
    if (t.generic || t.element) {
      return `M${i} extends ${constraint}`;
    }
    return allowPrimitive
      ? `M${i} extends ${constraint} | ${primitiveUnionFor(arg.type)}`
      : `M${i} extends ${constraint}`;
  };

  // Does this overload's return follow the receiver? `arg0` binds the
  // receiver as T so its class (and nullable form) survive the call.
  const receiverGeneric = (o: EmitOverload): boolean => o.returns === "arg0";

  // Return type string. `returns: "arg0"` binds the receiver as T
  // (receiverGeneric above); everything else closes over the claimed
  // type name with the overload's null semantics.
  const buildRetType = (fn: EmitFn, o: EmitOverload): string => {
    // `returns: "arg0"` (sqlite min/max/nullif): the return follows the
    // RECEIVER's class — bind it as T and unwrap its nullable form, so
    // `integerExpr.min()` stays Integer<0 | 1> instead of widening to Any.
    if (receiverGeneric(o)) {
      return `T extends { [meta]: { __nullable: infer U } } ? U : types.${host.className}<0 | 1>`;
    }
    const retName = o.returns;
    const retBase = resolveType(retName, host, table);
    const params = paramsOf(o);
    if (fn.kind === "aggregate") {
      return formatTypeWithNull(retBase, o.nullability === "never" ? "1" : "0 | 1");
    }
    const included = (pos: number): boolean => !o.nullPositions || o.nullPositions.includes(pos);
    const nullParts = [
      ...(included(0) ? ["N"] : []),
      ...params
        .map((a, i) => (included(o.args.indexOf(a)) ? `runtime.NullOf<M${i}>` : null))
        .filter((x): x is string => x !== null),
    ];
    const nullUnion = nullParts.join(" | ");
    if (o.nullability === "maybe_null") {
      return formatTypeWithNull(retBase, `runtime.MaybeNull<${nullUnion}>`);
    }
    if (o.nullability === "never") {
      return formatTypeWithNull(retBase, "1");
    }
    if (o.nullability === "always" || o.nullability === "on_error") {
      return formatTypeWithNull(retBase, "0 | 1");
    }
    if (params.length === 0) {
      return formatTypeWithNull(retBase, nullParts[0] ?? "N");
    }
    return formatTypeWithNull(retBase, `runtime.StrictNull<${nullUnion}>`);
  };

  // Runtime expression for a case's return-type constructor.
  // `arg0` is always the receiver's own class — runtime.pgType(this).
  // On pg's abstract hosts, T-returns resolve via pgElement(this) and
  // pseudotype self-returns via pgType(this).
  const runtimeRetType = (o: EmitOverload): string => {
    if (o.returns === "arg0") { return "runtime.pgType(this)"; }
    const retName = o.returns;
    const retBase = resolveType(retName, host, table);
    if (retBase.kind === "T") { return "runtime.pgElement(this)"; }
    if (retName === host.typname && (host.generic || host.element)) { return "runtime.pgType(this)"; }
    const retT = retName === null ? undefined : table.get(retName);
    return retT ? `types.${retT.className}` : `types.${host.className}`;
  };

  // Match cases for one overload: optional trailing args expand to one
  // case per admissible arity; variadic tails use rest matchers.
  const buildMatchCases = (fn: EmitFn, o: EmitOverload, allowPrimitive: boolean): string[] => {
    const params = paramsOf(o);
    const variadic = o.variadic === true;
    const fixed = params;  // variadic tail: first occurrence fixed, repeats via rest matcher
    const matcher = (arg: EmitArg, rest: boolean): string => {
      const t = arg.type === null ? undefined : table.get(arg.type);
      if (!t) { return `{ type: types.Any${rest ? ", rest: true" : ""} }`; }
      return `{ type: types.${t.className}${allowPrimitive ? ", allowPrimitive: true" : ""}${rest ? ", rest: true" : ""} }`;
    };
    const requiredCount = fixed.filter((a) => !a.optional).length;
    const cases: string[] = [];
    for (let arity = requiredCount; arity <= fixed.length; arity++) {
      const ms = fixed.slice(0, arity).map((a) => matcher(a, false));
      if (variadic && arity === fixed.length) {
        ms.push(matcher(o.args[o.args.length - 1]!, true));
      }
      cases.push(`[[${ms.join(", ")}], ${runtimeRetType(o)}]`);
      if (variadic && arity === fixed.length) { break; }
    }
    return cases;
  };

  // Whether an overload's non-receiver args are all the host's own type.
  const argsMatchOwner = (o: EmitOverload): boolean =>
    paramsOf(o).every((a) => a.type === host.typname);

  // An overload paired with the fn it came from. One emitted method can
  // span several fns (sqlite's min/max: scalar + aggregate merge under
  // one name), and kind/doc live on the fn.
  interface FnOverload { fn: EmitFn; o: EmitOverload }

  // Decide allowPrimitive per overload within a group. Two types can
  // share a TS primitive (pg: int8/inet are both `string`; sqlite:
  // integer/real are both `number`), so letting both overloads accept
  // it lets the wrong one win. Rule:
  //   - Group overloads by their TS-primitive signature across args.
  //   - Singleton: accepts primitives.
  //   - Colliding with EQUAL return types: the highest losslessRank
  //     sum wins (sqlite routes numbers to Real — no truncation).
  //   - Otherwise: only the owner-typed overload accepts primitives
  //     (its serialization cast makes the type claim true); the rest
  //     require explicit casts.
  const computeAllowPrimitive = (pairs: FnOverload[]): Map<EmitOverload, boolean> => {
    const primSig = (p: FnOverload): string =>
      paramsOf(p.o).map((a) => primitiveTsFor(a.type)).join("|");
    const rankOf = (p: FnOverload): number =>
      paramsOf(p.o).reduce((n, a) => n + (a.type ? (table.get(a.type)?.losslessRank ?? 0) : 0), 0);

    const byPrimSig = new Map<string, FnOverload[]>();
    for (const p of pairs) {
      const k = primSig(p);
      if (!byPrimSig.has(k)) { byPrimSig.set(k, []); }
      byPrimSig.get(k)!.push(p);
    }

    const out = new Map<EmitOverload, boolean>();
    for (const colliding of byPrimSig.values()) {
      if (colliding.length === 1) {
        out.set(colliding[0]!.o, true);
        continue;
      }
      const returns = new Set(colliding.map((p) => p.o.returns));
      const ranks = colliding.map(rankOf);
      const maxRank = Math.max(...ranks);
      if (returns.size === 1 && maxRank > Math.min(...ranks)) {
        for (const [i, p] of colliding.entries()) {
          out.set(p.o, ranks[i] === maxRank);
        }
        continue;
      }
      const ownerOverload = colliding.find((p) => argsMatchOwner(p.o));
      for (const p of colliding) {
        out.set(p.o, p === ownerOverload);
      }
    }
    return out;
  };

  // Signature header: name + generics + params. Optional args carry
  // `?`; a variadic tail becomes a typed rest param.
  const buildSig = (fn: EmitFn, o: EmitOverload, allowPrimitive: boolean, name: string): string => {
    const params = paramsOf(o);
    const variadic = o.variadic === true;
    // A variadic tail repeats — its first occurrence is still a fixed
    // param (required or optional per the fact); `...rest` covers the
    // repeats. When the receiver itself is the tail (concat), no fixed
    // params remain and the method is rest-only.
    const fixed = params;
    if (receiverGeneric(o)) {
      // T binds the receiver (the return refers to it), so args don't
      // need their own generics — plain unions suffice.
      const paramSrc = fixed.map((a, i) => {
        const resolved = formatTypeWithNull(resolveType(a.type, host, table), "any");
        const prim = allowPrimitive ? primitiveUnionFor(a.type) : null;
        return `arg${i}${a.optional ? "?" : ""}: ${resolved}${prim ? ` | ${prim}` : ""}`;
      });
      if (variadic) {
        const last = o.args[o.args.length - 1]!;
        const resolved = formatTypeWithNull(resolveType(last.type, host, table), "any");
        const prim = primitiveUnionFor(last.type);
        paramSrc.push(`...rest: (${resolved}${prim ? ` | ${prim}` : ""})[]`);
      }
      return `${name}<T extends types.Any<any>>(${["this: T", ...paramSrc].join(", ")})`;
    }
    const genericDecl = fixed.length > 0
      ? `<${fixed.map((a, i) => buildArgGeneric(a, i, allowPrimitive)).join(", ")}>`
      : "";
    const paramSrc = fixed.map((a, i) => `arg${i}${a.optional ? "?" : ""}: M${i}`);
    if (variadic) {
      const last = o.args[o.args.length - 1]!;
      const resolved = formatTypeWithNull(resolveType(last.type, host, table), "any");
      const prim = primitiveUnionFor(last.type);
      paramSrc.push(`...rest: (${resolved}${prim ? ` | ${prim}` : ""})[]`);
    }
    return `${name}${genericDecl}(${paramSrc.join(", ")})`;
  };

  // Body: match dispatch + the caller for the fn's kind.
  const buildBody = (fn: EmitFn, pairs: FnOverload[], allowMap: Map<EmitOverload, boolean>, inputExpr: string): string => {
    const cases = pairs.flatMap((p) => buildMatchCases(p.fn, p.o, allowMap.get(p.o) ?? false));
    const matchCall = `runtime.match(${inputExpr}, [${cases.join(", ")}])`;
    const callArgs = `[this, ...__rest]`;
    const caller = fn.isSrf
      ? `new runtime.Srf("${fn.sql}", ${callArgs}, [["${fn.sql}", __rt]])`
      : fn.kind === "binop"
        ? `runtime.opCall(runtime.sql\`${fn.sql}\`, [this, ...__rest] as [unknown, unknown], __rt)`
        : fn.kind === "unaryop"
          ? `runtime.unaryOpCall(runtime.sql\`${fn.sql}\`, this, __rt)`
          : `runtime.funcCall("${fn.sql}", ${callArgs}, __rt)`;
    return `const [__rt, ...__rest] = ${matchCall}; return ${caller} as any;`;
  };

  const wrapSrfRet = (fn: EmitFn, retType: string): string =>
    `runtime.Srf<{ ${fn.sql}: ${retType} }, "${fn.sql}">`;

  // --- emit every hosted definition ---
  // Scalar/aggregate fns sharing a camelCase name (sqlite's min/max:
  // the 2+-arg scalar and the aggregate form) merge into one method;
  // everything else is its own unit.
  const units: EmitFn[][] = [];
  const funcUnits = new Map<string, EmitFn[]>();
  for (const fn of fns) {
    if (fn.kind === "scalar" || fn.kind === "aggregate") {
      const key = camelcase(fn.sql);
      const existing = funcUnits.get(key);
      if (existing) { existing.push(fn); continue; }
      const unit = [fn];
      funcUnits.set(key, unit);
      units.push(unit);
    } else {
      units.push([fn]);
    }
  }

  for (const unit of units) {
    const fn = unit[0]!;
    const pairs: FnOverload[] = unit.flatMap((f) =>
      hostedOverloads(f, host).map((o) => ({ fn: f, o })));
    const o0 = pairs[0]!.o;

    // Multi-column SRF: shape comes from outColumns, match doesn't apply.
    if (fn.isSrf && fn.outColumns && fn.outColumns.length > 0) {
      const params = paramsOf(o0);
      const argNames = params.map((_, i) => `arg${i}`);
      const allArgs = argNames.length > 0 ? `this, ${argNames.join(", ")}` : "this";
      // Omitted optionals arrive as explicit undefined — filter before
      // the Srf splices args into SQL.
      const argsExpr = params.some((a) => a.optional)
        ? `[${allArgs}].filter((a) => a !== undefined)`
        : `[${allArgs}]`;
      const colEntries = fn.outColumns.map((c) => { const t = table.get(c.type)!; return `${c.name}: types.${t.className}<1>`; });
      const colRuntime = fn.outColumns.map((c) => { const t = table.get(c.type)!; return `["${c.name}", types.${t.className}]`; });
      const sig = buildSig(fn, o0, true, camelcase(fn.sql));
      const ret = `runtime.Srf<{ ${colEntries.join("; ")} }, "${fn.sql}">`;
      lines.push(...(fn.doc ? [`  /** \`${fn.sql}\` — ${fn.doc} */`] : []));
      lines.push(`  @expose.unchecked()`);
      lines.push(`  ${sig}: ${ret} { return new runtime.Srf("${fn.sql}", ${argsExpr}, [${colRuntime.join(", ")}]) as any; }`);
      continue;
    }

    const [primary, alias] = namesFor(fn, hostFunctionNames);
    if (!primary) { continue; }
    const docOf = (f: EmitFn): string[] => (f.doc ? [`  /** \`${f.sql}\` — ${f.doc} */`] : []);
    const doc = docOf(fn);

    const emitOne = (name: string): void => {
      const allowMap = computeAllowPrimitive(pairs);
      const variadicGroup = pairs.some((p) => p.o.variadic);
      const hasOptionals = pairs.some((p) => paramsOf(p.o).some((a) => a.optional));
      // A receiver-generic decl types `this` as T; the impl then needs
      // an explicit permissive `this` to stay overload-compatible.
      const thisParam = pairs.some((p) => receiverGeneric(p.o)) ? "this: any, " : "";
      const wrapRet = fn.isSrf ? wrapSrfRet : (_: EmitFn, r: string) => r;

      if (pairs.length === 1 && !hasOptionals) {
        // Single overload: typed one-liner (sig doubles as the impl).
        const sig = buildSig(fn, o0, allowMap.get(o0) ?? true, name);
        const retType = wrapRet(fn, buildRetType(fn, o0));
        const fixedCount = paramsOf(o0).length;  // variadic tail's first occurrence is a fixed param
        const inputExpr = `[${[
          ...Array.from({ length: fixedCount }, (_, i) => `arg${i}`),
          ...(o0.variadic ? ["...rest"] : []),
        ].join(", ")}]`;
        lines.push(...doc);
        lines.push(`  @expose.unchecked()`);
        lines.push(`  ${sig}: ${retType} { ${buildBody(fn, pairs, allowMap, inputExpr)} }`);
        return;
      }

      // Multiple overloads (or optionals): TS overload signatures over
      // one typed-as-any implementation dispatching via match. The
      // decorator goes on the implementation only.
      for (const p of pairs) {
        const sig = buildSig(p.fn, p.o, allowMap.get(p.o) ?? false, name);
        const retType = (p.fn.isSrf ? wrapSrfRet : (_: EmitFn, r: string) => r)(p.fn, buildRetType(p.fn, p.o));
        lines.push(...docOf(p.fn));
        lines.push(`  ${sig}: ${retType};`);
      }
      if (variadicGroup) {
        lines.push(`  @expose.unchecked()`);
        lines.push(`  ${name}(${thisParam}...args: unknown[]): any { ${buildBody(fn, pairs, allowMap, "args")} }`);
        return;
      }
      // Impl sig covers all arities — required up to min, optional up to max.
      const requiredArities = pairs.map((p) => paramsOf(p.o).filter((a) => !a.optional).length);
      const arities = pairs.map((p) => paramsOf(p.o).length);
      const minArity = Math.min(...requiredArities);
      const maxArity = Math.max(...arities);
      const implParams = Array.from({ length: maxArity }, (_, i) =>
        `arg${i}${i >= minArity ? "?" : ""}: unknown`,
      ).join(", ");
      const inputExpr = `[${Array.from({ length: maxArity }, (_, i) => `arg${i}`).join(", ")}]`;
      lines.push(`  @expose.unchecked()`);
      lines.push(`  ${name}(${thisParam}${implParams}): any { ${buildBody(fn, pairs, allowMap, inputExpr)} }`);
    };

    emitOne(primary);
    if (alias) { emitOne(alias); }
  }

  return lines;
};

// --- class files -------------------------------------------------------------
// Chrome (header/imports/class decl/statics) is dialect data around
// the unified method pipeline. The pieces below are structurally
// identical across dialects; the entries compose them with their own
// heritage, brands, and doc lines.

export interface ClassChrome {
  prologue: string;   // everything before the methods
  epilogue: string;   // closing brace etc.
}

// The import block every generated class file shares. `parentImport`
// is the dialect's parent-class import line — a DIRECT import, not
// `types.Parent`: class `extends` clauses evaluate at module-load
// time, and the barrel may not have finished loading when this file
// runs. Method bodies use `types.X` freely — those are lazy, so load
// order doesn't matter. expose: @expose.unchecked exposes every
// codegen'd method to exoeval-bound code without arg validation
// (runtime.match already validates internally).
export const chromeImportLines = (parentImport: string): string[] => [
  'import * as runtime from "../../runtime";',
  'import { meta } from "../../sql-value";',
  'import { expose } from "../../../exoeval/tool";',
  parentImport,
  'import * as types from "../index";',
  "",
];

// The [meta] declare block — the narrow self-typing every concrete
// class carries. `clsRef` is the bare class name, or `types.Cls` when
// a hand-written override is the barrel export (the generated class
// then points at the override so nullability transforms and
// runtime.pgType land on the full class).
export const metaDeclareLines = (clsRef: string): string[] => [
  `  declare [meta]: {`,
  `    __class: typeof ${clsRef};`,
  `    __raw: runtime.Sql;`,
  `    __nullability: N;`,
  `    __nullable: ${clsRef}<0 | 1>;`,
  `    __nonNullable: ${clsRef}<1>;`,
  `    __aggregate: ${clsRef}<number>;`,
  `    __any: ${clsRef}<any>;`,
  `  };`,
];

// __typname (the CAST/render target) + __typnameText (dispatch and
// error-message key). `override` when an ancestor already defines
// them (sqlite's views extend Any, which does; pg's concrete classes
// are first definers).
export const typnameStaticLines = (sqlLiteral: string, typnameText: string, override: boolean): string[] => {
  const kw = override ? "override " : "";
  return [
    `  static ${kw}__typname = runtime.sql\`${sqlLiteral}\`;`,
    `  static ${kw}__typnameText = "${typnameText}";`,
  ];
};

// Hand-written override files (overrides/<typname>.ts) shadow their
// generated class in the barrel and in parent imports.
export const scanOverrideNames = (overridesDir: string): Set<string> => {
  const overrides = new Set<string>();
  if (fs.existsSync(overridesDir)) {
    for (const file of fs.readdirSync(overridesDir)) {
      if (file.endsWith(".ts")) {
        overrides.add(file.replace(".ts", ""));
      }
    }
  }
  return overrides;
};

// One barrel line per class: the override when one exists, else the
// generated file.
const barrelExportLine = (t: TypeEntry, overridden: boolean): string =>
  `export { ${t.className} } from "./${overridden ? "overrides" : "generated"}/${t.typname}";`;

export const emitClassFile = (host: TypeEntry, chrome: ClassChrome, fns: EmitFn[], cfg: EmitConfig): string =>
  [chrome.prologue, ...emitMethods(host, fns, cfg), chrome.epilogue].join("\n");

// --- tree writer ---------------------------------------------------------------
// The output step both dialects share: a clean generated/ dir of class
// files, then the barrel's marker block. Text outside [generated-start]/[generated-end]
// is hand-written and preserved.

export const writeGeneratedTree = (opts: {
  generatedDir: string;
  barrelPath: string;
  types: TypeEntry[];
  facts: EmitFn[];
  cfg: EmitConfig;
  chromeFor: (t: TypeEntry) => ClassChrome;
  overrides: Set<string>;
}): void => {
  fs.rmSync(opts.generatedDir, { recursive: true, force: true });
  fs.mkdirSync(opts.generatedDir, { recursive: true });
  for (const t of opts.types) {
    fs.writeFileSync(
      path.join(opts.generatedDir, `${t.typname}.ts`),
      emitClassFile(t, opts.chromeFor(t), opts.facts, opts.cfg),
    );
  }
  const src = fs.readFileSync(opts.barrelPath, "utf8");
  const start = src.indexOf("// [generated-start]");
  const end = src.indexOf("// [generated-end]");
  if (start < 0 || end < 0) {
    throw new Error(`${opts.barrelPath}: missing [generated-start]/[generated-end] markers`);
  }
  const exports = [...opts.types]
    .sort((a, b) => a.typname.localeCompare(b.typname))
    .map((t) => barrelExportLine(t, opts.overrides.has(t.typname)));
  const block = ["// [generated-start]", ...exports].join("\n") + "\n";
  fs.writeFileSync(opts.barrelPath, src.slice(0, start) + block + src.slice(end));
};
