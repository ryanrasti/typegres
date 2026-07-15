import type { CompiledSql } from "./builder/sql";
import {
  type Driver,
  type ExecuteFn,
  type QueryResult,
  normalizeRow,
  stripMatchedOuterParens,
} from "./driver-shared";

// Duck-typed Cloudflare SqlStorage so this module needs no
// @cloudflare/workers-types dependency. A Durable Object passes
// `ctx.storage.sql`; tests can pass any object with the same shape.
export interface SqlStorageLike {
  exec(query: string, ...bindings: unknown[]): { toArray(): { [key: string]: unknown }[] };
}

// typegres Driver over a Durable Object's SQLite (Cloudflare SqlStorage).
// Contract pinned by examples/chat/test/sqlstorage.probe.test.ts:
//   - numbers bind as REAL (integer affinity comes from the dialect CAST);
//   - SqlStorage REJECTS BigInt, so typegres's boolean 0n/1n must become 0/1;
//   - results are native JS values, normalized to strings for deserialize;
//   - blobs come back as ArrayBuffer (better-sqlite3 gives Uint8Array/Buffer).
//
// This module has NO node-only peer imports — safe to bundle into workerd.
export class DoSqliteDriver implements Driver {
  readonly dialect = "sqlite" as const;

  constructor(private readonly sql: SqlStorageLike) {}

  execute: ExecuteFn = ({ text, values }: CompiledSql): Promise<QueryResult> => {
    const query = stripMatchedOuterParens(text);
    // SqlStorage rejects BigInt; typegres emits 0n/1n for booleans.
    const bound = values.map((v) => (typeof v === "bigint" ? Number(v) : v));
    const rows = this.sql.exec(query, ...bound).toArray().map(normalizeRow);
    return Promise.resolve({ rows });
  };

  // A Durable Object is single-threaded and single-connection.
  runInSingleConnection = <T>(cb: (execute: ExecuteFn) => Promise<T>): Promise<T> =>
    cb(this.execute);

  // Storage lifecycle belongs to the DO; nothing to close.
  close = (): Promise<void> => Promise.resolve();
}
