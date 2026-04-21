import type { Sql } from "./builder/sql";
import { compile } from "./builder/sql";
import type pg from "pg";

// Rows come back as plain objects keyed by column name. Values are always
// strings here because every type parser is overridden to return raw text;
// typed coercion happens downstream in QueryBuilder/InsertBuilder/etc.
export type QueryResult = { rows: { [key: string]: string }[] };
export type ExecuteFn = (query: Sql) => Promise<QueryResult>;

export interface Executor {
  execute: ExecuteFn;
  runInSingleConnection<T>(cb: (execute: ExecuteFn) => Promise<T>): Promise<T>;
  close(): Promise<void>;
}

// pg adapter — returns raw text strings (no driver-side deserialization).
// `pg` is loaded lazily so it's an optional peer dep; callers without pg
// (e.g. pglite-only builds) never touch it.
export class PgExecutor implements Executor {
  static async create(
    connectionString: string,
    poolOptions: pg.PoolConfig = {},
  ): Promise<PgExecutor> {
    // eslint-disable-next-line no-restricted-syntax -- optional dep, lazy loaded
    const pgMod = (await import(/* webpackIgnore: true */ "pg")).default;
    const pool = new pgMod.Pool({
      connectionString,
      ...poolOptions,
      types: { getTypeParser: () => (v: string) => v },
    });
    return new PgExecutor(pool);
  }

  private constructor(private pool: pg.Pool) {}

  async execute(query: Sql): Promise<QueryResult> {
    const c = compile(query, "pg");
    return this.pool.query(c.text, c.values);
  }

  async runInSingleConnection<T>(cb: (execute: ExecuteFn) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    try {
      return await cb(async (query) => {
        const c = compile(query, "pg");
        return client.query(c.text, c.values);
      });
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
type PgliteDb = {
  query<R>(sql: string, params?: unknown[], opts?: { parsers: { [key: number]: (v: string) => string } }): Promise<{ rows: R[] }>;
  close(): Promise<void>;
};

export class PgliteExecutor implements Executor {
  static async create(): Promise<PgliteExecutor> {
    // eslint-disable-next-line no-restricted-syntax -- optional dep, lazy loaded
    const { PGlite } = await import("@electric-sql/pglite");
    const db = new PGlite() as unknown as PgliteDb;
    // Query all type OIDs so we can override all parsers to return raw strings.
    const { rows: types } = await db.query<{ oid: number }>("SELECT oid FROM pg_type");
    const parsers: { [key: number]: (v: string) => string } = Object.fromEntries(
      types.map((t) => [t.oid, (v: string) => v]),
    );
    return new PgliteExecutor(db, parsers);
  }

  private constructor(
    private db: PgliteDb,
    private parsers: { [key: number]: (v: string) => string },
  ) {}

  async execute(query: Sql): Promise<QueryResult> {
    const c = compile(query, "pg");
    return this.db.query(c.text, c.values, { parsers: this.parsers }) as Promise<QueryResult>;
  }

  async runInSingleConnection<T>(cb: (execute: ExecuteFn) => Promise<T>): Promise<T> {
    return cb(this.execute.bind(this));
  }

  async close(): Promise<void> {
    await this.db.close();
  }
}
