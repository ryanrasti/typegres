import { RawBuilder, sql } from "kysely";

// Helper for joining SQL parts
export const sqlJoin = (
  rawParts: unknown[],
  joiner?: RawBuilder<any>,
): RawBuilder<any> => {
  const parts = rawParts.filter((p) => p !== undefined);
  return parts.length === 0 ? sql`` : sql.join(parts, joiner ?? sql`, `);
};

// Type for clause compilers
export type SubCompiler<C extends { [k in string]: unknown }> = {
  [k in keyof C]: (value: NonNullable<C[k]>) => RawBuilder<any>;
};

// Helper for compiling clauses
export const compileClauses = <C extends { [k in string]: unknown }>(
  clause: C,
  sub: SubCompiler<C>,
): RawBuilder<any> | undefined => {
  const mapped = Object.entries(sub).flatMap(([key, compile]) => {
    const value = clause[key];
    if (value === undefined) {
      return [];
    }
    return [compile(value)];
  });
  if (mapped.length === 0) {
    return undefined;
  }
  return sqlJoin(mapped, sql` `);
};
