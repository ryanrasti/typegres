import { beforeAll, afterAll } from "vitest";
import { pgExecutor } from "../executor";
import type { Executor } from "../executor";
import { Database } from "../database";

export let exec: Executor;
export let db: Database;

beforeAll(async () => {
  exec = pgExecutor(undefined, { max: 1 });
  db = new Database(exec);
});

afterAll(async () => {
  await exec.close();
});

export const withinTransaction = async (fn: () => Promise<void>) => {
  await db.transaction(async () => {
    await fn();
    throw new Error("__test_rollback__");
  }).catch((e) => {
    if ((e as Error).message !== "__test_rollback__") {
      throw e;
    }
  });
};
