import type { Pool, PoolConfig } from "pg";
import { Kysely, PostgresDialect, Transaction } from "kysely";
import { PGliteDialect } from "kysely-pglite-dialect";
import { PGlite, PGliteOptions } from "@electric-sql/pglite";
import { sql } from "kysely";

// Transaction interface for callback-based transactions
export interface TypegresTransaction extends Typegres {
  readonly isTransaction: true;
}

export class Typegres {
  protected kysely: Kysely<{}> | Transaction<{}>;

  protected constructor(kysely: Kysely<{}> | Transaction<{}>) {
    this.kysely = kysely;
  }

  // Execute raw SQL query using template literal
  sql<T = unknown>(
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): { execute: () => Promise<T[]> } {
    const kysely = this.kysely;
    return {
      async execute(): Promise<T[]> {
        // Use kysely's sql template literal directly
        const query = sql(strings, ...values);
        const compiled = query.compile(kysely);
        const result = await kysely.executeQuery(compiled);

        return result.rows as T[];
      },
    };
  }

  // Execute a compiled query with parameters
  async executeCompiled(
    compiledSql: string,
    parameters: unknown[],
  ): Promise<unknown[]> {
    const result = await this.kysely.executeQuery({
      sql: compiledSql,
      parameters: parameters,
      query: {} as any, // This is a workaround for the CompiledQuery type
    });
    return result.rows;
  }

  // Get the internal Kysely instance for query execution
  // This is used by the query builder's execute method
  get _internal(): Kysely<{}> | Transaction<{}> {
    return this.kysely;
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
  async transaction<T>(
    callback: (tx: TypegresTransaction) => Promise<T>,
  ): Promise<T> {
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

async function createKyselyInstance(
  dbConfig: DatabaseConfig,
): Promise<Kysely<{}>> {
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
