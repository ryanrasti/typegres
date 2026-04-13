import type { Sql, CompiledSql } from "./sql-builder";

export interface Executor {
  execute(query: Sql): Promise<Record<string, string>[]>;
  close(): Promise<void>;
}

// pglite adapter
export const pgliteExecutor = async (): Promise<Executor> => {
  const { PGlite } = await import("@electric-sql/pglite");
  const db = new PGlite();

  return {
    async execute(query: Sql): Promise<Record<string, string>[]> {
      const compiled = query.compile("pg");
      const { rows } = await db.query(compiled.text, compiled.values);
      return rows as Record<string, string>[];
    },
    async close() {
      await db.close();
    },
  };
};
