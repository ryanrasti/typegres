import type { CompiledSql } from "../builder/sql";
import type { ExecuteFn, ExecuteSyncFn, QueryResult, SyncDriver } from "./types";
import { normalizeRow, stripMatchedOuterParens } from "./shared-sqlite";

// Duck-typed Cloudflare SqlStorage — no @cloudflare/workers-types dependency.
export interface SqlStorageLike {
  exec(query: string, ...bindings: unknown[]): { toArray(): { [key: string]: unknown }[] };
}

// Duck-typed Cloudflare DurableObjectStorage (the parts we need). The
// whole storage handle, not just `.sql`: workerd rejects SQL BEGIN/
// SAVEPOINT on SqlStorage — transactions must use storage.transaction().
export interface DoStorageLike {
  readonly sql: SqlStorageLike;
  transaction<T>(cb: () => Promise<T>): Promise<T>;
}

// typegres Driver over a Durable Object's SQLite storage:
//   const conn = db.attach(new DoSqliteDriver(ctx.storage));
// No node-only peer imports — safe to bundle into workerd.
//
// Contract notes:
//   - numbers bind as REAL (integer affinity from the dialect CAST);
//   - SqlStorage REJECTS BigInt (unlike better-sqlite3) — we do not coerce;
//     callers / the dialect must not emit bigint bindings for this backend;
//   - results are native JS values, normalized to strings for deserialize;
//   - blobs come back as ArrayBuffer (better-sqlite3 gives Uint8Array/Buffer).
export class DoSqliteDriver implements SyncDriver {
  readonly dialect = "sqlite" as const;

  #liveSeq = 0n;
  get liveSeq(): bigint {
    return this.#liveSeq;
  }

  constructor(private readonly storage: DoStorageLike) {}

  execute: ExecuteFn = (compiled: CompiledSql): Promise<QueryResult> =>
    Promise.resolve(this.executeSync(compiled));

  executeSync = ({ text, values }: CompiledSql): QueryResult => {
    this.#liveSeq++;
    const query = stripMatchedOuterParens(text);
    const rows = this.storage.sql.exec(query, ...values).toArray().map(normalizeRow);
    return { rows };
  };

  // storage.transaction() commits on resolution, rolls back on throw.
  runInTransaction = <T>(cb: () => Promise<T>): Promise<T> => this.storage.transaction(cb);

  // One handle: the single-connection execute IS executeSync (callers
  // assert this identity — see Connection.transaction).
  runInSingleConnection = <T>(cb: (execute: ExecuteSyncFn) => Promise<T>): Promise<T> =>
    cb(this.executeSync);

  close = (): Promise<void> => Promise.resolve();
}
