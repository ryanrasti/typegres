// Driver contract — free of optional peer imports so workerd / browser
// bundles can depend on it without resolving node-only packages.

import type { CompiledSql } from "../builder/sql";
import type { DialectName } from "../builder/sql";

// Rows come back as plain objects keyed by column name. Values are
// strings (every driver's type parser is overridden to return raw text)
// or null (SQL NULL). Typed coercion happens downstream in
// QueryBuilder/InsertBuilder/etc.
export type QueryResult = { rows: { [key: string]: string | null }[] };
// Drivers receive an already-compiled `CompiledSql`. Compilation happens in
// Database (which owns the CompileContext); the driver's only job is to
// hand the query to its underlying pool/wasm and normalize the result rows.
export type ExecuteFn = (sql: CompiledSql) => Promise<QueryResult>;

export type ExecuteSyncFn = (sql: CompiledSql) => QueryResult;
// Callers `await` either flavor (a no-op on the sync one).
export type AnyExecuteFn = ExecuteFn | ExecuteSyncFn;

export type TransactionIsolation = "read committed" | "repeatable read" | "serializable";
export type TransactionOptions = { isolation?: TransactionIsolation };

export interface Driver {
  readonly dialect: DialectName;
  execute: ExecuteFn;
  // Present when the engine is sync under the hood (better-sqlite3, DO
  // SqlStorage). Required by sqlite live capture, which needs multiple
  // statements with no awaits between them.
  executeSync?: ExecuteSyncFn;
  // Own connection pinning and the database's transaction protocol. The
  // callback receives the only executor valid inside that transaction.
  // Sync drivers must pass executeSync itself (one handle, one channel).
  runInTransaction<T>(
    opts: TransactionOptions,
    cb: (execute: AnyExecuteFn) => Promise<T>,
  ): Promise<T>;
  close(): Promise<void>;
}

// A driver that guarantees the synchronous path; sqlite live requires one.
export interface SyncDriver extends Driver {
  executeSync: ExecuteSyncFn;
  // Statement clock, incremented internally per executed statement — the
  // sqlite analog of pg's xids. Live capture stamps events with it; live
  // iterations read it as their cursor. Shared by all Connections on
  // this driver.
  readonly liveSeq: bigint;
}

export const isSyncDriver = (d: Driver): d is SyncDriver => d.executeSync !== undefined;
