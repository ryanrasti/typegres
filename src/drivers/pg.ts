import type { CompiledSql } from "../builder/sql";
import type { DialectName } from "../builder/sql";
import pgLib from "pg";
import type { Driver, ExecuteFn, QueryResult } from "./types";

// pg adapter — returns raw text strings (no driver-side deserialization).
// `pg` is an *optional* peer dep (see package.json#peerDependenciesMeta),
// imported statically because this module only loads when the caller
// imports `typegres/drivers/pg` — bundles that never import this entry
// point never resolve the peer. Pool construction is synchronous; pg
// connects lazily on first query.
export class PgDriver implements Driver {
  readonly dialect: DialectName = "postgres";

  static create(
    connectionString: string,
    poolOptions: pgLib.PoolConfig = {},
  ): PgDriver {
    return new PgDriver(
      new pgLib.Pool({
        connectionString,
        ...poolOptions,
        types: { getTypeParser: () => (v: string) => v },
      }),
    );
  }

  private constructor(private pool: pgLib.Pool) {}

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
