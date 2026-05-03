export { Database } from "./database";
export type { TransactionIsolation, TransactionOptions } from "./database";
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
export const typegres = async <C = undefined>(
  opts: { type: "pglite" } | { type: "pg"; connectionString: string },
): Promise<Database<C>> => {
  const driver = opts.type === "pglite"
    ? await PgliteDriver.create()
    : await PgDriver.create(opts.connectionString);
  return new Database<C>(driver);
};

export * from "./types";
