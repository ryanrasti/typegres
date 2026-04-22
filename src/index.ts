export { Database } from "./database";
export { Table } from "./table";
export { sql, Sql } from "./builder/sql";
export { QueryBuilder } from "./builder/query";
export { PgDriver, PgliteDriver } from "./driver";
export type { Config } from "./config";
export type { Driver } from "./driver";

import { Database } from "./database";
import { PgDriver, PgliteDriver } from "./driver";

// Convenience factory for quick scripts and the playground. Real apps
// should compose PgDriver.create(...) + new Database(driver) themselves
// so they can hold onto the driver for lifecycle management.
export const typegres = async (
  opts: { type: "pglite" } | { type: "pg"; connectionString: string },
): Promise<Database> => {
  const driver = opts.type === "pglite"
    ? await PgliteDriver.create()
    : await PgDriver.create(opts.connectionString);
  return new Database(driver);
};

// Re-export the generated type catalog so callers can write
// `import { Int8, Text } from "typegres"` instead of reaching into a
// subpath (and so the playground's Monaco module declaration, which only
// stubs `typegres`, resolves every type).
export * from "./types";
