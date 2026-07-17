import type { CompiledSql } from "../builder/sql";
import type { DialectName } from "../builder/sql";
import type BetterSqlite3 from "better-sqlite3";
import type { Driver, ExecuteFn, QueryResult } from "./types";
import { normalizeRow, stripMatchedOuterParens } from "./shared-sqlite";

// better-sqlite3 adapter. Synchronous under the hood; wrapped in
// Promise.resolve for the async Driver contract. `better-sqlite3` is an
// optional peer (see package.json).
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
    // QueryBuilder.bind() wraps statements in `(...)` for subquery splicing;
    // SQLite refuses top-level parenthesized statements — unwrap one matched pair.
    return this.runOne(stripMatchedOuterParens(text), values);
  }

  private runOne(text: string, values: readonly unknown[]): QueryResult {
    const stmt = this.db.prepare(text);
    // .all() only works on SELECT-like statements. For INSERT/UPDATE/
    // DELETE without RETURNING, fall back to .run().
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
