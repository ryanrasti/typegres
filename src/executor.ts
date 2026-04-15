import pg from "pg";
import type { Sql } from "./builder/sql";

export interface Executor {
  execute(query: Sql): Promise<{ [key: string]: string }[]>;
  close(): Promise<void>;
}

// pg adapter — returns raw text strings (no driver-side deserialization)
export const pgExecutor = (connectionString: string): Executor => {
  // Override all type parsers to return raw strings
  const rawTypes = {
    getTypeParser: () => (v: string) => v,
  };
  const pool = new pg.Pool({ connectionString, types: rawTypes as any });

  return {
    async execute(query: Sql): Promise<{ [key: string]: string }[]> {
      const compiled = query.compile("pg");
      const { rows } = await pool.query(compiled.text, compiled.values);
      return rows as { [key: string]: string }[];
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
    async close() {
      await db.close();
    },
  };
};
