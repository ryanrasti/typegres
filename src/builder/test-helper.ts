import { beforeAll, afterAll } from "vitest";
import { pgliteExecutor } from "../executor";
import type { Executor } from "../executor";
import { Database } from "../database";
import { sql } from "./sql";

export let exec: Executor;
export let db: Database;

beforeAll(async () => {
  exec = await pgliteExecutor();
  db = new Database(exec);
});

afterAll(async () => {
  await exec.close();
});

export const withinTransaction = async (fn: () => Promise<void>) => {
  await exec.execute(sql`BEGIN`);
  try {
    await fn();
  } finally {
    await exec.execute(sql`ROLLBACK`);
  }
};
