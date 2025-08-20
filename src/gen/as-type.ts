import camelcase from "camelcase";
import type { FunctionDefinition } from "./gen";

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
      return `Types.FromItem.ofSchema({${columns.join(", ")}})`;
    } else {
      return `Types.FromItem<{${columns.join(", ")}}>`;
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
  if (type === "any") {
    return `Types.Any<unknown, ${cardinality}>`;
  }
  return `Types.${pgNameToIdent(type, true)}<${cardinality}>`;
};
