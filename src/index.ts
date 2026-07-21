// Root package surface: schema, SQL, tables, @expose — no driver implementations.
// Backends live under `typegres/drivers/*` so Workers never resolve optional
// node peers. Prefer:
//   import { Database, sql, expose } from "typegres";
//   import { DoSqliteDriver } from "typegres/drivers/do";
//   import { PgDriver } from "typegres/drivers/pg";

export { Database, Connection } from "./database";
export type { TransactionIsolation, TransactionOptions } from "./database";
export { Table } from "./table";
export { Relation } from "./relation";
export { sql, Sql } from "./builder/sql";
export { QueryBuilder } from "./builder/query";
export { TypegresLiveEvents } from "./live/pg/events";
export { ensurePgLiveEventsTable } from "./live/pg/events-ddl";
export { expose } from "./exoeval/tool";
export type { ToolFunction } from "./exoeval/tool";
export { RpcClient, inMemoryChannel, safeStringify } from "./exoeval/rpc";
export type { RawChannel } from "./exoeval/rpc";
export type { Config } from "./config";
export type { Driver, SyncDriver, ExecuteFn, ExecuteSyncFn, QueryResult } from "./drivers/types";

import type { Connection } from "./database";
import { Database } from "./database";
import type { Driver } from "./drivers/types";
import type { DialectName } from "./builder/sql";

// Convenience factory for scripts / playground. Drivers are loaded via
// dynamic import so a static `import { Database } from "typegres"` does not
// pull optional peers into Worker bundles that never call typegres().
export const typegres = async <C = undefined>(
  opts:
    | { type: "pglite" }
    | { type: "pg"; connectionString: string }
    | { type: "sqlite"; filename?: string },
): Promise<{ db: Database<C>; conn: Connection<C> }> => {
  let driver: Driver;
  let dialect: DialectName;
  if (opts.type === "pglite") {
    // eslint-disable-next-line no-restricted-syntax -- optional peer path
    const { PgliteDriver } = await import("./drivers/pglite");
    driver = await PgliteDriver.create();
    dialect = "postgres";
  } else if (opts.type === "pg") {
    // eslint-disable-next-line no-restricted-syntax -- optional peer path
    const { PgDriver } = await import("./drivers/pg");
    driver = await PgDriver.create(opts.connectionString);
    dialect = "postgres";
  } else {
    // eslint-disable-next-line no-restricted-syntax -- optional peer path
    const { SqliteDriver } = await import("./drivers/sqlite");
    driver = await SqliteDriver.create(opts.filename ?? ":memory:");
    dialect = "sqlite";
  }
  const db = new Database<C>({ dialect });
  const conn = db.attach(driver);
  return { db, conn };
};
