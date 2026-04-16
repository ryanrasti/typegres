import pg from "pg";
import { AsyncLocalStorage } from "node:async_hooks";
import type { Sql } from "./builder/sql";
import { defaultPgConnectionString } from "./pg";

export type IsolationLevel = "read committed" | "repeatable read" | "serializable";

export interface Executor {
  execute(query: Sql): Promise<{ [key: string]: string }[]>;
  transaction?<T>(isolation: IsolationLevel, fn: () => Promise<T>): Promise<T>;
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
  const txClient = new AsyncLocalStorage<{ client: pg.PoolClient; tail: Promise<unknown> }>();

  return {
    async execute(query: Sql): Promise<{ [key: string]: string }[]> {
      const compiled = query.compile("pg");
      const tx = txClient.getStore();
      if (!tx) {
        const { rows } = await pool.query(compiled.text, compiled.values);
        return rows as { [key: string]: string }[];
      }

      const run = async () => {
        const { rows } = await tx.client.query(compiled.text, compiled.values);
        return rows as { [key: string]: string }[];
      };
      const result = tx.tail.then(run, run);
      tx.tail = result.then(() => undefined, () => undefined);
      return result;
    },

    async transaction<T>(isolation: IsolationLevel, fn: () => Promise<T>): Promise<T> {
      if (txClient.getStore()) {
        throw new Error("Nested transactions are not supported");
      }

      const client = await pool.connect();
      try {
        await client.query(`BEGIN ISOLATION LEVEL ${isolation.toUpperCase()}`);
        const result = await txClient.run({ client, tail: Promise.resolve() }, fn);
        await client.query("COMMIT");
        return result;
      } catch (e) {
        await client.query("ROLLBACK");
        throw e;
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
  const rawParsers: { [key: number]: (v: string) => string } = {};
  for (const t of types) {
    rawParsers[t.oid] = (v: string) => v;
  }

  return {
    async execute(query: Sql): Promise<{ [key: string]: string }[]> {
      const compiled = query.compile("pg");
      const { rows } = await db.query(compiled.text, compiled.values, {
        parsers: rawParsers,
      });
      return rows as { [key: string]: string }[];
    },
    async transaction<T>(isolation: IsolationLevel, fn: () => Promise<T>): Promise<T> {
      await db.query(`BEGIN`);
      await db.query(`SET TRANSACTION ISOLATION LEVEL ${isolation.toUpperCase()}`);
      try {
        const result = await fn();
        await db.query(`COMMIT`);
        return result;
      } catch (e) {
        await db.query(`ROLLBACK`);
        throw e;
      }
    },
    async close() {
      await db.close();
    },
  };
};
