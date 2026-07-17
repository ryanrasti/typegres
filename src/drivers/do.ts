import type { CompiledSql } from "../builder/sql";
import type { Driver, ExecuteFn, QueryResult } from "./types";
import { normalizeRow, stripMatchedOuterParens } from "./shared-sqlite";

// Duck-typed Cloudflare SqlStorage — no @cloudflare/workers-types dependency.
export interface SqlStorageLike {
  exec(query: string, ...bindings: unknown[]): { toArray(): { [key: string]: unknown }[] };
}

// typegres Driver over a Durable Object's SQLite (Cloudflare SqlStorage).
// No node-only peer imports — safe to bundle into workerd.
//
// Contract notes:
//   - numbers bind as REAL (integer affinity from the dialect CAST);
//   - SqlStorage REJECTS BigInt (unlike better-sqlite3) — we do not coerce;
//     callers / the dialect must not emit bigint bindings for this backend;
//   - results are native JS values, normalized to strings for deserialize;
//   - blobs come back as ArrayBuffer (better-sqlite3 gives Uint8Array/Buffer).
export class DoSqliteDriver implements Driver {
  readonly dialect = "sqlite" as const;

  constructor(private readonly sql: SqlStorageLike) {}

  execute: ExecuteFn = ({ text, values }: CompiledSql): Promise<QueryResult> => {
    const query = stripMatchedOuterParens(text);
    const rows = this.sql.exec(query, ...values).toArray().map(normalizeRow);
    return Promise.resolve({ rows });
  };

  runInSingleConnection = <T>(cb: (execute: ExecuteFn) => Promise<T>): Promise<T> =>
    cb(this.execute);

  close = (): Promise<void> => Promise.resolve();
}
