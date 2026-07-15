// Side-effect-free runtime surface: schema, SQL, tables, @expose — no
// optional peer drivers. Prefer this entry (or selective subpaths) from
// workerd / Durable Object bundles so pg / better-sqlite3 / pglite never
// enter the module graph. Node apps can keep using `typegres` root.

export { Database, Connection } from "./database";
export type { TransactionIsolation, TransactionOptions } from "./database";
export { Table } from "./table";
export { sql, Sql } from "./builder/sql";
export { QueryBuilder } from "./builder/query";
export { expose } from "./exoeval/tool";
export type { ToolFunction } from "./exoeval/tool";
export type { Driver, ExecuteFn, QueryResult } from "./driver-shared";
