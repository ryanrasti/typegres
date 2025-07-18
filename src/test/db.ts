import { Transaction } from "kysely";
import {
  DummyDriver,
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from "kysely";
import { SeedDatabase, testSeeds } from "./seeds";
import { Typegres } from "../db";

export const dummyDb = new Kysely<SeedDatabase>({
  dialect: {
    createAdapter: () => new PostgresAdapter(),
    createDriver: () => new DummyDriver(),
    createIntrospector: (db) => new PostgresIntrospector(db),
    createQueryCompiler: () => new PostgresQueryCompiler(),
  },
});

class ExpectedRollbackException extends Error {
  constructor(public result: unknown) {
    super("ExpectedRollbackException");
  }
}

export const withDb = async (
  db: Typegres,
  fn: (db: Typegres) => Promise<void>,
): Promise<void> => {
  try {
    await db._internal.transaction().execute(async (txn) => {
      await testSeeds(txn as unknown as Transaction<SeedDatabase>);
      throw new ExpectedRollbackException(
        await fn(Typegres._createFromKysely(txn as unknown as Transaction<{}>)),
      );
    });
  } catch (e) {
    if (!(e instanceof ExpectedRollbackException)) {
      throw e;
    }
    return;
  }
  throw new Error("Expected rollback but it did not happen.");
};
