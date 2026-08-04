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
export { LiveSubscription, LiveQuery } from "./live/observer";
export type { LiveObserver } from "./live/observer";
export { TypegresLiveEvents } from "./live/pg/events";
export { ensurePgLiveEventsTable } from "./live/pg/events-ddl";
export { expose } from "./exoeval/tool";
export type { ToolFunction } from "./exoeval/tool";
export { RpcClient, inMemoryChannel, safeStringify } from "./exoeval/rpc";
export type { RawChannel } from "./exoeval/rpc";
export type { Config } from "./config";
export type { Driver, SyncDriver, ExecuteFn, ExecuteSyncFn, QueryResult } from "./drivers/types";

import { Database } from "./database";

/**
 * The entry point: a synchronous, module-load-safe schema handle.
 *
 *   import { typegres } from "typegres";
 *   import { SqliteDriver } from "typegres/drivers/sqlite";
 *
 *   const db = typegres();
 *   db.connect(SqliteDriver.create("dev.db"));
 *
 *   class Users extends db.Table("users") { … }
 *
 * Synchronous by design: table classes are declared at module scope
 * against `db`, so making this async would force top-level await through
 * every module that defines a table. Backends arrive later via
 * `db.connect(driver)`, with the driver imported from `typegres/drivers/*`
 * — an explicit import keeps optional peers out of bundles that don't use
 * them, and keeps `connect` synchronous for every driver but PGlite.
 *
 * No arguments: the driver is the source of truth for the dialect, so the
 * backend is named exactly once, where the driver is built.
 */
export const typegres = <C = undefined>(): Database<C> => new Database<C>();
