import type { Pool, PoolConfig } from "pg";
import { Kysely, PostgresDialect, Transaction } from "kysely";
import { PGliteDialect } from "kysely-pglite-dialect";
import { PGlite, PGliteOptions } from "@electric-sql/pglite";
import { sql } from "kysely";
import { RpcTarget } from "capnweb";

// Transaction interface for callback-based transactions
export interface TypegresTransaction extends Typegres {
  readonly isTransaction: true;
}

export type QueryHistoryEntry = {
  sql: string;
  params: unknown[];
  timestamp: number;
};

export class Typegres extends RpcTarget {
  protected kysely: Kysely<{}> | Transaction<{}>;
  private _lastSql: string | undefined;
  private _lastParams: unknown[] | undefined;
  private _queryHistory: QueryHistoryEntry[] = [];
  private readonly MAX_HISTORY = 5;

  protected constructor(kysely: Kysely<{}> | Transaction<{}>) {
    super();
    this.kysely = kysely;
  }

  private _addToHistory(sql: string, params: unknown[]): void {
    const entry: QueryHistoryEntry = {
      sql,
      params: [...params],
      timestamp: Date.now(),
    };
    this._queryHistory.push(entry);
    // Keep only last MAX_HISTORY entries
    if (this._queryHistory.length > this.MAX_HISTORY) {
      this._queryHistory.shift();
    }
  }

  // Execute raw SQL query using template literal
  sql<T = unknown>(strings: TemplateStringsArray, ...values: unknown[]): { execute: () => Promise<T[]> } {
    const kysely = this.kysely;
    return {
      execute: async (): Promise<T[]> => {
        // Use kysely's sql template literal directly
        const query = sql(strings, ...values);
        const compiled = query.compile(kysely);
        this._lastSql = compiled.sql;
        this._lastParams = [...compiled.parameters];
        this._addToHistory(compiled.sql, compiled.parameters);
        const result = await kysely.executeQuery(compiled);

        return result.rows as T[];
      },
    };
  }

  // Execute a compiled query with parameters
  async executeCompiled(compiledSql: string, parameters: unknown[]): Promise<unknown[]> {
    this._lastSql = compiledSql;
    this._lastParams = parameters;
    this._addToHistory(compiledSql, parameters);
    console.log("Executing query:", this.kysely);
    const result = await this.kysely.executeQuery({
      sql: compiledSql,
      parameters: parameters,
      query: {} as any, // This is a workaround for the CompiledQuery type
    });
    return result.rows;
  }

  // Get the internal Kysely instance for query execution
  // This is used by the query builder's compile method
  get _internal(): Kysely<{}> | Transaction<{}> {
    return this.kysely;
  }

  // Track and retrieve the last executed query
  getLastQuery(): { sql: string; params: unknown[] } | undefined {
    if (this._lastSql === undefined) return undefined;
    return {
      sql: this._lastSql,
      params: this._lastParams ?? [],
    };
  }

  // Get query history (last 5 queries)
  getQueryHistory(): QueryHistoryEntry[] {
    return [...this._queryHistory];
  }

  // Close the connection
  async end(): Promise<void> {
    await this.kysely.destroy();
  }

  // Create a new Typegres instance
  static async create(dbConfig: DatabaseConfig): Promise<Typegres> {
    const kysely = await createKyselyInstance(dbConfig);
    return new Typegres(kysely);
  }

  static _createFromKysely(kysely: Kysely<{}>): Typegres {
    return new Typegres(kysely);
  }

  // Transaction with callback - auto commit/rollback
  async transaction<T>(callback: (tx: TypegresTransaction) => Promise<T>): Promise<T> {
    // Just delegate to Kysely's transaction handling
    return await this.kysely.transaction().execute(async (kyselyTx) => {
      const tx = new TypegresTransactionImpl(kyselyTx);
      return await callback(tx);
    });
  }
}

export type DatabaseConfig =
  | { type: "pg"; PoolClass: typeof Pool; config?: PoolConfig }
  | { type: "pglite"; PGliteClass?: typeof PGlite; options?: PGliteOptions };

async function createKyselyInstance(dbConfig: DatabaseConfig): Promise<Kysely<{}>> {
  if (dbConfig.type === "pg") {
    const { PoolClass, config } = dbConfig;
    return new Kysely<{}>({
      dialect: new PostgresDialect({
        pool: new PoolClass({
          ...config,
          types: {
            getTypeParser: (_oid, format?: "text" | "binary") => {
              if (format === "binary") {
                throw new Error("Binary format not supported");
              }
              return (v: string | Buffer) => v;
            },
          },
        }),
      }),
    });
  }
  if (dbConfig.type === "pglite") {
    const { PGliteClass, options } = dbConfig;
    return new Kysely<{}>({
      dialect: new PGliteDialect(
        await (PGliteClass ?? PGlite).create({
          ...options,
          parsers: Object.fromEntries(
            [...Array(2000).keys()].map((value) => {
              return [value, (x: string) => x];
            }),
          ),
        }),
      ),
    });
  }

  dbConfig satisfies never;
  throw new Error("Invalid database configuration");
}

// Internal transaction implementation
class TypegresTransactionImpl extends Typegres implements TypegresTransaction {
  readonly isTransaction = true as const;

  constructor(kyselyTx: Transaction<{}>) {
    super(kyselyTx);
  }

  // Override end to prevent closing the connection during transaction
  async end(): Promise<void> {
    throw new Error("Cannot close connection during transaction");
  }
}

// Export the factory function for backward compatibility
export const typegres = Typegres.create;
