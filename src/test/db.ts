import { Transaction } from "kysely";
import {
  DummyDriver,
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from 'kysely'
import { SeedDatabase, testSeeds } from "./seeds";


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
  db: Kysely<{}>,
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
