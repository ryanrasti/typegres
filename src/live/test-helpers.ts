import { afterEach, beforeAll } from "vitest";
import { sql } from "../builder/sql";
import { driver } from "../test-helpers";
import { TypegresLiveEvents } from "./events";

// Opt-in for live tests: creates `_typegres_live_events` once at the start
// of the file's suite, and truncates it after every test so each case
// starts clean — no per-test boilerplate.
export const setupLiveEvents = (): void => {
  beforeAll(async () => {
    await driver.execute(TypegresLiveEvents.createTableSql());
  });
  afterEach(async () => {
    await driver.execute(sql`TRUNCATE _typegres_live_events`);
  });
};
