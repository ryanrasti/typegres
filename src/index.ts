export { Database } from "./database";
export { Table } from "./table";
export { sql, Sql } from "./builder/sql";
export { PgExecutor, PgliteExecutor } from "./executor";
export type { Config } from "./config";
export type { Executor } from "./executor";

import { Database } from "./database";
import { PgExecutor, PgliteExecutor } from "./executor";

// Convenience factory for quick scripts and the playground. Real apps
// should compose PgExecutor.create(...) + new Database(exec) themselves
// so they can hold onto the executor for lifecycle management.
export const typegres = async (
  opts: { type: "pglite" } | { type: "pg"; connectionString: string },
): Promise<Database> => {
  const exec = opts.type === "pglite"
    ? await PgliteExecutor.create()
    : await PgExecutor.create(opts.connectionString);
  return new Database(exec);
};

// Re-export the generated type catalog so callers can write
// `import { Int8, Text } from "typegres"` instead of reaching into a
// subpath (and so the playground's Monaco module declaration, which only
// stubs `typegres`, resolves every type).
export * from "./types";
