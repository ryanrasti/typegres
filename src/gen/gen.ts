import camelcase from "camelcase";
import fs from "fs";
import { $ } from "zx";
import { typeMap } from "../types/serialization";

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
};

const allowAutoboxing = (definitions: FunctionDefinition[]) => {
  const firstRet = definitions[0]?.ret;
  // If there are multiple possible return types, then don't allow autoboxing:
  return definitions.every((defn) => defn.ret === firstRet);
};

const functionDefinitionToTyped = (
  name: string,
  defn: FunctionDefinition[],
) => {
  return `[${defn
    .map((defn) => {
      const { args, ret } = defn;
      const hasRecord = [...args, ret].some((arg) =>
        asType(arg, { runtime: true, set: defn }).includes(".of(R)"),
      );
      const hasGeneric = [...args, ret].some(
        (arg) =>
          asType(arg) === "T" ||
          asType(arg, { runtime: true }).includes(".of(T)"),
      );
      const rawTyped = `{args: [${args
        .map((t) => asType(t, { runtime: true }))
        .join(", ")}], ret: ${asType(ret, {
        runtime: true,
        set: defn,
      })}, isOperator: ${defn.operator_name === name}, isReserved: ${defn.is_reserved || false}}`;

      return hasRecord
        ? `({R}) => (${rawTyped})`
        : hasGeneric
          ? `({T}) => (${rawTyped})`
          : rawTyped;
    })
    .join(", ")}]`;
};

type FunctionsFile = {
  pg_catalog: {
    [key: string]: FunctionDefinition[];
  };
};

const keepFunction = (name: string, definitionns: FunctionDefinition[]) => {
  return (
    // Skip functions that start with _send/recv/in/out
    !/_?(?:send|recv|in|out)$/.test(name) &&
    // Skip functions that end with _send/recv/in/out
    !/^(?:send|recv|in|out)$/.test(name) &&
    // Skip functions that reference "internal" type:
    !definitionns.some(
      (def) => def.ret === "internal" || def.args.includes("internal"),
    )
  );
};

export const pgNameToIdent = (pgName: string, pascalCase?: boolean) => {
  const normalized =
    pgName.startsWith('"') && pgName.endsWith('"')
      ? pgName.slice(1, -1)
      : pgName;
  const hasSpecialChars = /[^a-zA-Z0-9_]/.test(normalized);
  if (hasSpecialChars) {
    return `[${JSON.stringify(normalized)}]`;
  }

  return camelcase(normalized, { pascalCase });
};

export const asType = (
  type: string,
  {
    runtime = false,
    aggregate,
    nullable,
    set,
  }: {
    runtime?: boolean;
    aggregate?: boolean;
    nullable?: boolean;
    set?: Pick<FunctionDefinition, "retset" | "is_retset" | "retset_names">;
  } = {
    runtime: false,
  },
): string => {
  const columns = set?.retset.map(
    (t, i) => `${set.retset_names[i]}: ${asType(t, { runtime, nullable })}`,
  );
  if (set && set.is_retset && columns) {
    if (runtime) {
      return `Types.Setof.ofSchema({${columns.join(", ")}})`;
    } else {
      return `Types.Setof<{from: {${columns.join(", ")}}}>`;
    }
  }

  const cardinality = aggregate
    ? "number"
    : nullable === true
      ? "0"
      : nullable === false
        ? "1"
        : "0 | 1";

  if (type === "record") {
    return runtime
      ? `Types.Record.of(${
          columns && columns.length > 0 ? `{${columns.join(", ")}}` : "R"
        })`
      : `Types.Record<${cardinality}, ${
          columns ? `{${columns.join(", ")}}` : "R"
        }>`;
  }

  if (type.startsWith("_")) {
    const inner = asType(type.slice(1), { runtime });
    return runtime
      ? `Types.Array.of(${inner})`
      : `Types.Array<${cardinality}, ${inner}>`;
  }
  if (type === "anycompatiblearray" || type === "anyarray") {
    return runtime ? `Types.Array.of(T)` : `Types.Array<${cardinality}, T>`;
  }
  if (
    type === "anycompatible" ||
    type === "anyelement" ||
    type === "anyenum" ||
    type === "anynonarray"
  ) {
    return `T`;
  }

  if (type === "anyrange" || type === "anymultirange") {
    return runtime
      ? // TODO: this should be an `.of(<subtype>)` call but it doesn't
        //  seem absolutely necessary since we don't have anyrange/anymultirange
        //  return types
        `Types.${pgNameToIdent(type, true)}`
      : `Types.${pgNameToIdent(type, true)}<${cardinality}, T>`;
  }
  return `Types.${pgNameToIdent(type, true)}<${cardinality}>`;
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
  const addType = (
    rawType: string,
    oid: number,
    fn?: [string, FunctionDefinition] | undefined,
  ) => {
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
          [fn[0]]: [...(types[type]?.functions?.[fn[0]] ?? []), fn[1]].flatMap(
            (x) => (x ? [x] : []),
          ),
        }),
      },
      oid,
    };
  };

  const input = JSON.parse(
    fs.readFileSync("./functions.json", "utf-8"),
  ) as FunctionsFile;
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
        (arg) =>
          asType(arg) === "T" ||
          asType(arg).includes("<T>") ||
          asType(arg).includes(", T>"),
      );
      const hasRecordGeneric = definition.args.some((arg) =>
        asType(arg).includes(", R>"),
      );
      addType(definition.ret, definition.ret_oid);
      for (const [idx, argType] of definition.args.entries()) {
        addType(
          argType,
          definition.arg_oids[idx],
          idx === 0 ? [name, definition] : undefined,
        );
      }
      for (const [idx, argType] of definition.retset.entries()) {
        addType(argType, definition.retset_oids[idx]);
      }
      const args = definition.args.map((argType, idx) => {
        const rawType = asType(argType, { aggregate: definition.is_agg });
        return `a${idx}: ${rawType}`;
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
    await output.write(
      `export function ${pgNameToIdent(name)}(...args: unknown[]) {\n`,
    );
    await output.write(
      `    return sqlFunction(${JSON.stringify(
        name,
      )}, ${functionDefinitionToTyped(name, defintitions)}, args);\n`,
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
        await output.write(
          `import { typeMap } from '../../types/serialization';\n`,
        );
      }
      const isInstantiatable = asType(type) !== "T";

      if (isInstantiatable) {
        await output.write(`import { Expression } from '../../expression';\n`);
      }
      await output.write(`\n`);
      await output.write(
        `type Parsed = ${
          hasParser
            ? `ReturnType<typeof typeMap[${JSON.stringify(type)}]['parse']>`
            : "string"
        }\n`,
      );
      if (isInstantiatable) {
        await output.write(
          `type SerializeParam = ${
            hasParser
              ? `Parameters<typeof typeMap[${JSON.stringify(
                  type,
                )}]['serialize']>[0]`
              : "string"
          }\n`,
        );
      }

      const className = pgNameToIdent(type, true);
      await output.write(
        `export class ${className}<N extends number> extends AnynonarrayBase<Parsed, N> {\n`,
      );

      if (isInstantiatable) {
        await output.write(
          `    static new(v: SerializeParam): ${asType(type, {
            nullable: false,
          })};\n`,
        );
        await output.write(
          `    static new(v: null): ${asType(type, { nullable: true })};\n`,
        );
        await output.write(`    static new(v: Expression): ${asType(type)};\n`);
        await output.write(
          `    static new(v: SerializeParam | null | Expression): ${asType(
            type,
          )} { return new ${asType(type)}(v); }\n`,
        );

        if (hasParser) {
          await output.write(
            `    static serializeParamTypes: readonly SerializeParam[] | undefined = undefined;\n`,
          );
        }
      }
    }

    if (hasParser) {
      await output.write(
        `    static parse(v: string) { return typeMap[${JSON.stringify(
          type,
        )}].parse(v); }\n`,
      );
    } else if (type === "any" || type === "array" || type === "record") {
      await output.write(
        `    static parse(v: string): unknown { return v; }\n`,
      );
    } else {
      await output.write(`    static parse(v: string) { return v; }\n`);
    }

    await output.write(
      `    static typeString(): string | undefined  { return ${JSON.stringify(
        type,
      )} } \n`,
    );

    if (type !== "any") {
      await output.write(
        `    asAggregate(): Types.${pgNameToIdent(type, true)}<number${
          type === "array" || type === "anyrange" || type === "anymultirange"
            ? ", T"
            : type === "record"
              ? ", R"
              : ""
        }> | undefined {
          return undefined;
        }
       \n`,
      );
      
      await output.write(
        `    asNullable(): Types.${pgNameToIdent(type, true)}<0 | 1${
          type === "array" || type === "anyrange" || type === "anymultirange"
            ? ", T"
            : type === "record"
              ? ", R"
              : ""
        }> {
          return Types.${pgNameToIdent(type, true)}.new(this.toExpression()) as Types.${pgNameToIdent(type, true)}<0 | 1${
          type === "array" || type === "anyrange" || type === "anymultirange"
            ? ", T"
            : type === "record"
              ? ", R"
              : ""
        }>;
        }
       \n`,
      );
    }

    const isThisGeneric =
      type === "any" || type === "anynonarray" || type === "anyenum";

    const functionsByOperatorName = Object.values(typeDef?.functions ?? {})
      .flatMap((v) => (v ? v : []))
      .filter((defn) => defn.operator_name != null && defn.args.length === 2)
      .reduce(
        (acc, defn) => ({
          ...acc,
          [defn.operator_name ?? ""]: [
            ...(acc[defn.operator_name ?? ""] ?? []),
            defn,
          ],
        }),
        {} as Record<string, FunctionDefinition[]>,
      );

    for (const [rawName, definitions] of Object.entries({
      ...typeDef?.functions,
      ...functionsByOperatorName,
    })) {
      // Special case we're not handling now where this overrides parent class
      // call in an incompatible way
      if (
        (rawName === "width_bucket" || rawName == "<@" || rawName == "||") &&
        type !== "any"
      ) {
        continue;
      }

      const autoBoxable = allowAutoboxing(definitions ?? []);
      for (const definition of definitions ?? []) {
        const opts = definition.is_agg
          ? [
              rawName === "count"
                ? { nullable: false, aggregate: true }
                : { aggregate: true },
            ]
          : [{ nullable: false }, {}, { aggregate: true }];
        for (const opt of opts) {
          const args = definition.args.map((argType, idx) => {
            const normalType = asType(argType, opt);
            const rawType = isThisGeneric && idx === 0 ? "T" : normalType;
            const type =
              (argType in typeMap || rawType === "T") && autoBoxable && idx > 0
                ? `${rawType} | Types.Input<${asType(argType)}>`
                : rawType;
            const name = idx === 0 ? "this" : `a${idx}`;
            return `${name}: ${type}`;
          });
          const argString = args.join(", ");

          const hasGeneric = definition.args
            .slice(1)
            .some(
              (arg) =>
                asType(arg) === "T" ||
                asType(arg).includes("<T>") ||
                asType(arg).includes(", T>"),
            );
          const hasRecordGeneric = definition.args
            .slice(1)
            .some((arg) => asType(arg).includes(", R>"));

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
      await output.write(
        `    ${pgNameToIdent(rawName)}(...args: unknown[]) {\n`,
      );
      await output.write(
        `        return sqlFunction(${JSON.stringify(
          rawName,
        )}, ${functionDefinitionToTyped(
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
  for (const type of Object.keys(types).toSorted((a, b) =>
    pgNameToIdent(a).localeCompare(pgNameToIdent(b)),
  )) {
    if (type === "array" || type === "any") {
      continue;
    }
    await output2.write(
      `export { ${pgNameToIdent(type, true)} } from './${type}';\n`,
    );
  }
};

main();
