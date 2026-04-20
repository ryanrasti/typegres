import pg from "pg";
import type { Sql } from "./builder/sql";
import { defaultPgConnectionString } from "./pg";

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

// pg adapter — returns raw text strings (no driver-side deserialization)
export const pgExecutor = (
  connectionString = defaultPgConnectionString(),
  poolOptions: pg.PoolConfig = {},
): Executor => {
  // Override all type parsers to return raw strings
  const rawTypes = {
    getTypeParser: () => (v: string) => v,
  };
  const pool = new pg.Pool({ connectionString, ...poolOptions, types: rawTypes as any });

  return {
    async execute(query: Sql): Promise<QueryResult> {
      const compiled = query.compile("pg");
      return pool.query(compiled.text, compiled.values);
    },

    async runInSingleConnection<T>(cb: (execute: ExecuteFn) => Promise<T>): Promise<T> {
      const client = await pool.connect();
      const execute: ExecuteFn = async (query) => {
        const compiled = query.compile("pg");
        return client.query(compiled.text, compiled.values);
      };
      try {
        return await cb(execute);
      } finally {
        client.release();
      }
    },

    async close() {
      await pool.end();
    },
  };
};

// pglite adapter — returns raw text strings (no driver-side deserialization)
export const pgliteExecutor = async (): Promise<Executor> => {
  // eslint-disable-next-line no-restricted-syntax -- optional dep, lazy loaded
  const { PGlite } = await import("@electric-sql/pglite");
  const db = new PGlite();

  // Query all type OIDs so we can override all parsers to return raw strings
  const { rows: types } = await db.query<{ oid: number }>(
    "SELECT oid FROM pg_type",
  );
  const rawParsers: { [key: number]: (v: string) => string } = Object.fromEntries(
    types.map((t) => [t.oid, (v: string) => v]),
  );

  return {
    async execute(query: Sql): Promise<QueryResult> {
      const compiled = query.compile("pg");
      return db.query(compiled.text, compiled.values, {
        parsers: rawParsers,
      });
    },
    async runInSingleConnection<T>(cb: (execute: ExecuteFn) => Promise<T>): Promise<T> {
      const execute: ExecuteFn = async (query) => {
        const compiled = query.compile("pg");
        return db.query(compiled.text, compiled.values, {
          parsers: rawParsers,
        });
      };
      return cb(execute);
    },
    async close() {
      await db.close();
    },
  };
};
