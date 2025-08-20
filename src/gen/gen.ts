import fs from "fs";
import { $ } from "zx";
import { typeMap } from "../types/serialization";
import { asType, pgNameToIdent } from "./as-type";

// edge cases:
// * if ends with `[]`, then:
//     * type should be array<x>
//     * no generated class
// * anycompatible / anycompatiblearray
// introduces generic T extends Type["any"]

export type FunctionDefinition = {
  args: string[];
  arg_oids: number[];
  ret: string;
  ret_oid: number;
  is_retset: boolean;
  retset: string[];
  retset_names: string[];
  retset_oids: number[];
  is_agg: boolean;
  operator_name: string | null;
  is_reserved?: boolean;
  is_variadic?: boolean;
};

const allowAutoboxing = (definitions: FunctionDefinition[]) => {
  const firstRet = definitions[0]?.ret;
  // If there are multiple possible return types, then don't allow autoboxing:
  return definitions.every((defn) => defn.ret === firstRet);
};

const functionDefinitionToTyped = (name: string, defn: FunctionDefinition[]) => {
  return `[${defn
    .map((defn) => {
      const { args, ret } = defn;
      const hasRecord = [...args, ret].some((arg) => asType(arg, { runtime: true, set: defn }).includes(".of(R)"));
      const hasGeneric = [...args, ret].some(
        (arg) => asType(arg) === "T" || asType(arg, { runtime: true }).includes(".of(T)"),
      );
      const rawTyped = `{args: [${args.map((t) => asType(t, { runtime: true })).join(", ")}], ret: ${asType(ret, {
        runtime: true,
        set: defn,
      })}, isOperator: ${defn.operator_name === name}, isReserved: ${defn.is_reserved || false}, isVariadic: ${
        defn.is_variadic || false
      }}`;

      return hasRecord ? `({R}) => (${rawTyped})` : hasGeneric ? `({T}) => (${rawTyped})` : rawTyped;
    })
    .join(", ")}]`;
};

type FunctionsFile = {
  pg_catalog: {
    [key: string]: FunctionDefinition[];
  };
};

const keepFunction = (name: string, definitionns: FunctionDefinition[]) => {
  const falsePositives = [
    // ends with `in`:
    "sin",
  ];
  if (falsePositives.includes(name)) {
    return true;
  }

  return (
    // Skip functions that start with _send/recv/in/out
    !/_?(?:send|recv|in|out)$/.test(name) &&
    // Skip functions that end with _send/recv/in/out
    !/^(?:send|recv|in|out)$/.test(name) &&
    // Skip functions that reference "internal" type:
    !definitionns.some((def) => def.ret === "internal" || def.args.includes("internal"))
  );
};

const main = async () => {
  // For each entry we generate a form:
  // function abbrev(cidr: types.text): types.cidr
  // function abbrev(cidr: types.text): types.inet
  // function abbrev(...args: unknown[]) {
  //     return sqlFunction(<full json>)
  // }

  const types: {
    [key in string]?: {
      functions: {
        [key in string]?: FunctionDefinition[];
      };
      oid: number;
    };
  } = {};
  const addType = (rawType: string, oid: number, fn?: [string, FunctionDefinition] | undefined) => {
    if (rawType.startsWith("_")) {
      return;
    }

    const type =
      rawType === "anyarray" || rawType === "anycompatiblearray"
        ? "array"
        : rawType === "anyelement" || rawType === "anycompatible"
          ? "any"
          : rawType;

    types[type] = {
      ...types[type],
      functions: {
        ...types[type]?.functions,
        ...(fn && {
          [fn[0]]: [...(types[type]?.functions?.[fn[0]] ?? []), fn[1]].flatMap((x) => (x ? [x] : [])),
        }),
      },
      oid,
    };
  };

  const input = JSON.parse(fs.readFileSync("./functions.json", "utf-8")) as FunctionsFile;
  const output = await fs.promises.open("./functions.ts", "w");

  await output.write("import { sqlFunction } from '../sql-function';\n");
  await output.write("import * as Types from '../types';\n");
  await output.write("\n");

  for (const [name, defintitions] of Object.entries(input.pg_catalog)) {
    if (!keepFunction(name, defintitions)) {
      continue;
    }

    for (const definition of defintitions) {
      const hasGeneric = definition.args.some(
        (arg) => asType(arg) === "T" || asType(arg).includes("<T>") || asType(arg).includes(", T>"),
      );
      const hasRecordGeneric = definition.args.some((arg) => asType(arg).includes(", R>"));
      addType(definition.ret, definition.ret_oid);
      for (const [idx, argType] of definition.args.entries()) {
        addType(argType, definition.arg_oids[idx], idx === 0 ? [name, definition] : undefined);
      }
      for (const [idx, argType] of definition.retset.entries()) {
        addType(argType, definition.retset_oids[idx]);
      }
      const args = definition.args.flatMap((argType, idx) => {
        const rawType = asType(argType, { aggregate: definition.is_agg });
        const ret = `a${idx}: ${rawType}`;
        if (idx === definition.args.length - 1 && definition.is_variadic) {
          return [ret, `...variadic: ${rawType}[]`];
        }

        return [ret];
      });
      const argString = args.join(", ");
      await output.write(
        `export function ${pgNameToIdent(name)}${
          hasRecordGeneric
            ? "<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>"
            : hasGeneric
              ? "<T extends Types.Any>"
              : ""
        }(${argString}): ${asType(definition.ret, { set: definition })}\n`,
      );
    }
    await output.write(`export function ${pgNameToIdent(name)}(...args: unknown[]) {\n`);
    await output.write(
      `    return sqlFunction(${JSON.stringify(name)}, ${functionDefinitionToTyped(name, defintitions)}, args);\n`,
    );
    await output.write("}\n");
    await output.write("\n");
  }
  await output.close();

  await $`[[ -d ./types ]] && rm -rf ./types || true`;
  await $`mkdir -p ./types`;

  // First generate each type in its own file with the functions **as methods**
  // in cidr.ts:
  // export default class {
  //    abbrev(): types.cidr
  // }

  for (const [type, typeDef] of Object.entries(types)) {
    const hasFunctions = Object.keys(typeDef?.functions ?? {}).length > 0;

    const output = await fs.promises.open(`./types/${type}.ts`, "w");
    if (hasFunctions) {
      await output.write(`import { sqlFunction } from '../../sql-function';\n`);
    }
    await output.write(`import * as Types from '../../types';\n`);

    const hasParser = type in typeMap;

    if (type === "array") {
      await output.write(`import { default as AnyBase } from '../../types/any';\n`);
      await output.write(`\n`);

      const className = pgNameToIdent(type, true);
      await output.write(
        `export class ${className}<N extends number, T extends AnyBase> extends AnyBase<NonNullable<T["resultType"]>[], N> {\n`,
      );
    } else if (type === "record") {
      await output.write(`import { default as AnyBase } from '../../types/any';\n`);
      await output.write(`import { default as AnynonarrayBase } from '../../types/any';\n`);
      await output.write(`\n`);

      const className = pgNameToIdent(type, true);
      await output.write(
        `export class ${className}<N extends number, R extends { [K in string]: AnyBase<unknown, 0 | 1> }> extends AnynonarrayBase<{ [K in keyof R]: R[K]["resultType"]}, N> {\n`,
      );
    } else if (type === "any") {
      await output.write(`import type { default as AnyBase } from '../../types/any';\n`);
      const className = pgNameToIdent(type, true);
      await output.write(`export class ${className} {\n`);
    } else if (type === "anyrange" || type === "anymultirange") {
      await output.write(`import { default as AnynonarrayBase } from '../../types/any';\n`);
      await output.write(`import type { default as AnyBase } from '../../types/any';\n`);
      await output.write(`\n`);
      const className = pgNameToIdent(type, true);
      await output.write(
        `export class ${className}<N extends number, T extends AnyBase> extends AnynonarrayBase<unknown, N> {\n`,
      );
    } else {
      await output.write(`import { default as AnynonarrayBase } from '../../types/any';\n`);
      if (hasParser) {
        await output.write(`import { typeMap } from '../../types/serialization';\n`);
      }
      const isInstantiatable = asType(type) !== "T";

      if (isInstantiatable) {
        await output.write(`import { Expression } from '../../expression';\n`);
      }
      await output.write(`\n`);
      await output.write(
        `type Parsed = ${hasParser ? `ReturnType<typeof typeMap[${JSON.stringify(type)}]['parse']>` : "string"}\n`,
      );
      if (isInstantiatable) {
        await output.write(
          `type SerializeParam = ${
            hasParser ? `Parameters<typeof typeMap[${JSON.stringify(type)}]['serialize']>[0]` : "string"
          }\n`,
        );
      }

      const className = pgNameToIdent(type, true);
      await output.write(`export class ${className}<N extends number> extends AnynonarrayBase<Parsed, N> {\n`);

      if (isInstantiatable) {
        await output.write(
          `    static new(v: SerializeParam): ${asType(type, {
            nullable: false,
          })};\n`,
        );
        await output.write(`    static new(v: null): ${asType(type, { nullable: true })};\n`);
        await output.write(`    static new(v: Expression): ${asType(type)};\n`);
        await output.write(
          `    static new(v: SerializeParam | null | Expression): ${asType(type)} { return new ${asType(type)}(v); }\n`,
        );

        if (hasParser) {
          await output.write(`    static serializeParamTypes: readonly SerializeParam[] | undefined = undefined;\n`);
        }
      }
    }

    if (hasParser) {
      await output.write(`    static parse(v: string) { return typeMap[${JSON.stringify(type)}].parse(v); }\n`);
    } else if (type === "any" || type === "array" || type === "record") {
      await output.write(`    static parse(v: string): unknown { return v; }\n`);
    } else {
      await output.write(`    static parse(v: string) { return v; }\n`);
    }

    await output.write(`    static typeString(): string | undefined  { return ${JSON.stringify(type)} } \n`);

    if (type !== "any") {
      for (const [fnName, nullability] of [
        ["asAggregate", "number"],
        ["asNullable", "0 | 1"],
        ["asNonNullable", "1"],
      ]) {
        await output.write(
          `    ${fnName}(): Types.${pgNameToIdent(type, true)}<${nullability}${
            type === "array" || type === "anyrange" || type === "anymultirange" ? ", T" : type === "record" ? ", R" : ""
          }> | undefined {
          return undefined;
        }
       \n`,
        );
      }
    }

    const isThisGeneric = type === "any" || type === "anynonarray" || type === "anyenum";

    const functionsByOperatorName = Object.values(typeDef?.functions ?? {})
      .flatMap((v) => (v ? v : []))
      .filter((defn) => defn.operator_name != null && defn.args.length === 2)
      .reduce(
        (acc, defn) => ({
          ...acc,
          [defn.operator_name ?? ""]: [...(acc[defn.operator_name ?? ""] ?? []), defn],
        }),
        {} as Record<string, FunctionDefinition[]>,
      );

    for (const [rawName, definitions] of Object.entries({
      ...typeDef?.functions,
      ...functionsByOperatorName,
    })) {
      // Special case we're not handling now where this overrides parent class
      // call in an incompatible way
      if ((rawName === "width_bucket" || rawName == "<@" || rawName == "||") && type !== "any") {
        continue;
      }

      const autoBoxable = allowAutoboxing(definitions ?? []);
      for (const definition of definitions ?? []) {
        const opts = definition.is_agg
          ? [rawName === "count" ? { nullable: false, aggregate: true } : { aggregate: true }]
          : [{ nullable: false }, {}, { aggregate: true }];
        for (const opt of opts) {
          const args = definition.args.flatMap((argType, idx) => {
            const normalType = asType(argType, opt);
            const rawType = isThisGeneric && idx === 0 ? "T" : normalType;
            const type =
              (argType in typeMap || rawType === "T") && autoBoxable && idx > 0
                ? `${rawType} | Types.Input<${asType(argType)}>`
                : rawType;
            const name = idx === 0 ? "this" : `a${idx}`;
            const ret = `${name}: ${type}`;
            if (idx === definition.args.length - 1 && definition.is_variadic) {
              return [ret, `...variadic: ${type}[]`];
            }
            return [ret];
          });

          const argString = args.join(", ");

          const hasGeneric = definition.args
            .slice(1)
            .some((arg) => asType(arg) === "T" || asType(arg).includes("<T>") || asType(arg).includes(", T>"));
          const hasRecordGeneric = definition.args.slice(1).some((arg) => asType(arg).includes(", R>"));

          await output.write(
            `    ${pgNameToIdent(rawName)}${
              isThisGeneric
                ? `<T extends ${type === "any" ? "AnyBase" : "this"}>`
                : hasGeneric
                  ? "<T extends Types.Any>"
                  : hasRecordGeneric
                    ? "<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>"
                    : ""
            }(${argString}): ${asType(definition.ret, {
              ...opt,
              aggregate: false,
              set: definition,
            })}\n`,
          );
        }
      }
      await output.write(`    ${pgNameToIdent(rawName)}(...args: unknown[]) {\n`);
      await output.write(
        `        return sqlFunction(${JSON.stringify(rawName)}, ${functionDefinitionToTyped(
          rawName,
          definitions ?? [],
        )}, [this, ...args]);\n`,
      );
      await output.write("    }\n");
      await output.write("\n");
    }
    await output.write(`}\n`);
    await output.close();
  }

  // Then generate a file that imports all the types and exports them
  // as a single object
  const output2 = await fs.promises.open(`./types/index.ts`, "w");
  for (const type of Object.keys(types).toSorted((a, b) => pgNameToIdent(a).localeCompare(pgNameToIdent(b)))) {
    if (type === "array" || type === "any") {
      continue;
    }
    await output2.write(`export { ${pgNameToIdent(type, true)} } from './${type}';\n`);
  }
};

if (require.main === module) {
  main();
}
