import type { Sql } from "./builder/sql";

export interface Executor {
  execute(query: Sql): Promise<Record<string, string>[]>;
  close(): Promise<void>;
}

// pglite adapter — returns raw text strings (no driver-side deserialization)
export const pgliteExecutor = async (): Promise<Executor> => {
  const { PGlite } = await import("@electric-sql/pglite");
  const db = new PGlite();

  // Query all type OIDs so we can override all parsers to return raw strings
  const { rows: types } = await db.query<{ oid: number }>(
    "SELECT oid FROM pg_type",
  );
  const rawParsers: Record<number, (v: string) => string> = {};
  for (const t of types) {
    rawParsers[t.oid] = (v: string) => v;
  }

  return {
    async execute(query: Sql): Promise<Record<string, string>[]> {
      const compiled = query.compile("pg");
      const { rows } = await db.query(compiled.text, compiled.values, {
        parsers: rawParsers,
      });
      return rows as Record<string, string>[];
    },
    async close() {
      await db.close();
    },
  };
};
