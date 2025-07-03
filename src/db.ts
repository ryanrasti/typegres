import type { Pool, PoolConfig } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { PGliteDialect } from "kysely-pglite-dialect";
import { PGlite, PGliteOptions } from "@electric-sql/pglite";

// For PoC piggybacking on Kysely:
export type Typegres = Kysely<{}>;

export type DatabaseConfig =
  | { type: "pg"; PoolClass: typeof Pool; config?: PoolConfig }
  | { type: "pglite"; PGliteClass?: typeof PGlite; options?: PGliteOptions };

export const typegres = async (dbConfig: DatabaseConfig): Promise<Typegres> => {
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
            })
          ),
        })
      ),
    });
  }

  dbConfig satisfies never;
  throw new Error("Invalid database configuration");
};
