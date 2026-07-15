export { Database, Connection } from "./database";
export type { TransactionIsolation, TransactionOptions } from "./database";
export { Table } from "./table";
export { sql, Sql } from "./builder/sql";
export { QueryBuilder } from "./builder/query";
// Node drivers (optional peers). Prefer subpath `typegres/do-sqlite` for
// Durable Object / workerd bundles so pg / better-sqlite3 / pglite never
// enter the module graph.
export { PgDriver, PgliteDriver, SqliteDriver } from "./driver";
export { DoSqliteDriver } from "./driver-do-sqlite";
export { TypegresLiveEvents } from "./live/events";
export { expose } from "./exoeval/tool";
export type { ToolFunction } from "./exoeval/tool";
export { RpcClient, inMemoryChannel, safeStringify } from "./exoeval/rpc";
export type { RawChannel } from "./exoeval/rpc";
export type { Config } from "./config";
export type { Driver } from "./driver-shared";
export type { SqlStorageLike } from "./driver-do-sqlite";

import type { Connection } from "./database";
import { Database } from "./database";
import { PgDriver, PgliteDriver, SqliteDriver } from "./driver";
import type { Driver } from "./driver-shared";
import type { DialectName } from "./builder/sql";

// Convenience factory for quick scripts and the playground. Returns
// `{ db, conn }` — the immutable metadata handle and its attached
// runtime Connection. Real apps typically build these separately at
// module load / bootstrap.
export const typegres = async <C = undefined>(
  opts:
    | { type: "pglite" }
    | { type: "pg"; connectionString: string }
    | { type: "sqlite"; filename?: string },
): Promise<{ db: Database<C>; conn: Connection<C> }> => {
  let driver: Driver;
  let dialect: DialectName;
  if (opts.type === "pglite") {
    driver = await PgliteDriver.create();
    dialect = "postgres";
  } else if (opts.type === "pg") {
    driver = await PgDriver.create(opts.connectionString);
    dialect = "postgres";
  } else {
    driver = await SqliteDriver.create(opts.filename ?? ":memory:");
    dialect = "sqlite";
  }
  const db = new Database<C>({ dialect });
  const conn = db.attach(driver);
  return { db, conn };
};

