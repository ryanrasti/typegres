import type { CompiledSql } from "./builder/sql";
import type { DialectName } from "./builder/sql";
import type pg from "pg";
import type BetterSqlite3 from "better-sqlite3";
import {
  type Driver,
  type ExecuteFn,
  type QueryResult,
  normalizeRow,
  stripMatchedOuterParens,
} from "./driver-shared";

export type { Driver, ExecuteFn, QueryResult } from "./driver-shared";
export { DoSqliteDriver, type SqlStorageLike } from "./driver-do-sqlite";

// pg adapter — returns raw text strings (no driver-side deserialization).
// `pg` is an *optional* peer dep (see package.json#peerDependenciesMeta):
// pglite-only consumers don't need it installed. The dynamic import keeps
// bundlers from pulling pg into browser builds (site / playground) and
// lets a missing peer fail late with a real module-not-found error rather
// than at load time.
export class PgDriver implements Driver {
  readonly dialect: DialectName = "postgres";

  static async create(
    connectionString: string,
    poolOptions: pg.PoolConfig = {},
  ): Promise<PgDriver> {
    // eslint-disable-next-line no-restricted-syntax -- optional peer, see class comment
    const pgMod = (await import(/* webpackIgnore: true */ "pg")).default;
    const pool = new pgMod.Pool({
      connectionString,
      ...poolOptions,
      types: { getTypeParser: () => (v: string) => v },
    });
    return new PgDriver(pool);
  }

  private constructor(private pool: pg.Pool) {}

  async execute({ text, values }: CompiledSql): Promise<QueryResult> {
    return this.pool.query(text, values as unknown[]);
  }

  async runInSingleConnection<T>(cb: (execute: ExecuteFn) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    try {
      return await cb(({ text, values }) => client.query(text, values as unknown[]));
    } finally {
      client.release();
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}

// pglite adapter — returns raw text strings (no driver-side deserialization).
// There's no connection pool; the single in-process db instance serves all
// requests, so runInSingleConnection just routes through execute.
//
// Like `pg`, `@electric-sql/pglite` is an *optional* peer dep — pg-only
// consumers don't pay the ~5MB wasm cost. The dynamic import keeps it out
// of bundles that don't need it (server-only builds, the playground bundles
// it explicitly).
type PgliteDb = {
  query<R>(sql: string, params?: unknown[], opts?: { parsers: { [key: number]: (v: string) => string } }): Promise<{ rows: R[] }>;
  close(): Promise<void>;
};

export class PgliteDriver implements Driver {
  readonly dialect: DialectName = "postgres";

  static async create(): Promise<PgliteDriver> {
    // eslint-disable-next-line no-restricted-syntax -- optional peer, see class comment
    const { PGlite } = await import("@electric-sql/pglite");
    const db = new PGlite() as unknown as PgliteDb;
    // Query all type OIDs so we can override all parsers to return raw strings.
    const { rows: types } = await db.query<{ oid: number }>("SELECT oid FROM pg_type");
    const parsers: { [key: number]: (v: string) => string } = Object.fromEntries(
      types.map((t) => [t.oid, (v: string) => v]),
    );
    return new PgliteDriver(db, parsers);
  }

  private constructor(
    private db: PgliteDb,
    private parsers: { [key: number]: (v: string) => string },
  ) {}

  async execute({ text, values }: CompiledSql): Promise<QueryResult> {
    return this.db.query(text, values as unknown[], { parsers: this.parsers }) as Promise<QueryResult>;
  }

  async runInSingleConnection<T>(cb: (execute: ExecuteFn) => Promise<T>): Promise<T> {
    return cb(this.execute.bind(this));
  }

  async close(): Promise<void> {
    await this.db.close();
  }
}

// better-sqlite3 adapter. Synchronous under the hood; we wrap in
// Promise.resolve to satisfy the async Driver contract. Single
// in-process db serves all requests, so runInSingleConnection is a
// pass-through (nothing to acquire/release).
//
// Row value normalization: better-sqlite3 returns typed JS values
// (number, string, Buffer, bigint, null). Typegres' downstream
// deserialize() expects strings (PG contract). We stringify here so
// SQLite reads round-trip through the same code path.
// `better-sqlite3` is an optional peer (see package.json).
export class SqliteDriver implements Driver {
  readonly dialect: DialectName = "sqlite";

  static async create(
    filename: string = ":memory:",
    options: BetterSqlite3.Options = {},
  ): Promise<SqliteDriver> {
    // eslint-disable-next-line no-restricted-syntax -- optional peer, matches PgDriver/PgliteDriver pattern
    const mod = (await import("better-sqlite3")).default;
    const db = new mod(filename, options);
    return new SqliteDriver(db);
  }

  private constructor(private db: BetterSqlite3.Database) {}

  async execute({ text, values }: CompiledSql): Promise<QueryResult> {
    // QueryBuilder.FinalizedQuery.bind() wraps its output in `(...)` so
    // it can be spliced as a subquery. SQLite refuses to prepare a
    // top-level parenthesized statement ("near '(': syntax error"),
    // while PG tolerates it. Unwrap one layer here as a driver-side
    // affordance; only strips a *matched* outer pair to avoid mangling
    // user-authored `sql\`(SELECT ...)\`` fragments.
    return this.runOne(stripMatchedOuterParens(text), values);
  }

  private runOne(text: string, values: readonly unknown[]): QueryResult {
    const stmt = this.db.prepare(text);
    // .all() only works on SELECT-like statements. For INSERT/UPDATE/
    // DELETE that lack RETURNING, .all() throws — fall back to .run().
    if (stmt.reader) {
      const rows = stmt.all(...values) as { [key: string]: unknown }[];
      return { rows: rows.map(normalizeRow) };
    }
    stmt.run(...values);
    return { rows: [] };
  }

  async runInSingleConnection<T>(cb: (execute: ExecuteFn) => Promise<T>): Promise<T> {
    return cb((compiled) => Promise.resolve(this.execute(compiled)));
  }

  async close(): Promise<void> {
    this.db.close();
    return Promise.resolve();
  }
}
