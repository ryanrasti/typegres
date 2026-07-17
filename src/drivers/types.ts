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

export interface Driver {
  readonly dialect: DialectName;
  execute: ExecuteFn;
  runInSingleConnection<T>(cb: (execute: ExecuteFn) => Promise<T>): Promise<T>;
  close(): Promise<void>;
}
