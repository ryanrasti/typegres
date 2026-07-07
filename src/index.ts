export { Database, Connection } from "./database";
export type { TransactionIsolation, TransactionOptions } from "./database";
export { Table } from "./table";
export { sql, Sql } from "./builder/sql";
export { QueryBuilder } from "./builder/query";
export { PgDriver, PgliteDriver } from "./driver";
export { TypegresLiveEvents } from "./live/events";
export { expose } from "./exoeval/tool";
export type { ToolFunction } from "./exoeval/tool";
export { RpcClient, inMemoryChannel, safeStringify } from "./exoeval/rpc";
export type { RawChannel } from "./exoeval/rpc";
export type { Config } from "./config";
export type { Driver } from "./driver";

import type { Connection } from "./database";
import { Database } from "./database";
import { PgDriver, PgliteDriver } from "./driver";

// Convenience factory for quick scripts and the playground. Returns
// `{ db, conn }` — the immutable metadata handle and its attached
// runtime Connection. Real apps typically build these separately at
// module load / bootstrap.
export const typegres = async <C = undefined>(
  opts: { type: "pglite" } | { type: "pg"; connectionString: string },
): Promise<{ db: Database<C>; conn: Connection<C> }> => {
  const driver = opts.type === "pglite"
    ? await PgliteDriver.create()
    : await PgDriver.create(opts.connectionString);
  const db = new Database<C>({ dialect: "postgres" });
  const conn = db.attach(driver);
  return { db, conn };
};

export * from "./types/postgres";
