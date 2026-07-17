import type { CompiledSql } from "../builder/sql";
import type { DialectName } from "../builder/sql";
import type { Driver, ExecuteFn, QueryResult } from "./types";

// pglite adapter — returns raw text strings (no driver-side deserialization).
// `@electric-sql/pglite` is an optional peer. Dynamic import keeps it out of
// bundles that don't need it.
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
