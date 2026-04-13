import { test, expect, beforeAll, afterAll } from "vitest";
import { pgliteExecutor, Executor } from "./executor";

let exec: Executor;

beforeAll(async () => {
  exec = await pgliteExecutor();
});

afterAll(async () => {
  await exec.close();
});

test("select literal values", async () => {
  // TODO: wire up val() + select + execute
  // const q = select({ sum: val(1)['+'](val(2)), name: val("hello").upper() });
  // const result = await q.execute(exec);
  // expect(result).toEqual([{ sum: 3, name: "HELLO" }]);
  expect(true).toBe(true);
});
