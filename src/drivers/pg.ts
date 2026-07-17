import type { CompiledSql } from "../builder/sql";
import type { DialectName } from "../builder/sql";
import type pg from "pg";
import type { Driver, ExecuteFn, QueryResult } from "./types";

// pg adapter — returns raw text strings (no driver-side deserialization).
// `pg` is an *optional* peer dep (see package.json#peerDependenciesMeta).
// Dynamic import keeps bundlers from pulling pg into browser builds and
// lets a missing peer fail late with a real module-not-found error.
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
