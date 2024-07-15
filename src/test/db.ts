import { Kysely, PostgresDialect, Transaction } from "kysely";
import { Pool } from "pg";
import { SeedDatabase, testSeeds } from "./seeds";

const dialect = new PostgresDialect({
  pool: new Pool({
    host: "localhost",
    user: "postgres",
    port: 1234,
    max: 10,
    database: "test",
    types: {
      getTypeParser: (_oid, format?: "text" | "binary") => {
        if (format === "binary") {
          throw new Error("Binary format not supported");
        }
        return (v: string | Buffer) => v;
      },
    },
  }),
});

export const db = new Kysely<SeedDatabase>({
  dialect,
});

class ExpectedRollbackException extends Error {
  constructor(public result: unknown) {
    super("ExpectedRollbackException");
  }
}

export const withDb = async (
  fn: (db: Transaction<any>) => Promise<void>,
): Promise<void> => {
  try {
    await db.transaction().execute(async (txn) => {
      await testSeeds(txn);
      throw new ExpectedRollbackException(await fn(txn));
    });
  } catch (e) {
    if (!(e instanceof ExpectedRollbackException)) {
      throw e;
    }
    return;
  }
  throw new Error("Expected rollback but it did not happen.");
};
