import { afterEach, beforeAll } from "vitest";
import { sql } from "../../builder/sql";
import { conn } from "../../test-helpers";
import { TypegresLiveEvents } from "./events";

// Opt-in for live tests: creates `_typegres_live_events` once at the start
// of the file's suite, and truncates it after every test so each case
// starts clean — no per-test boilerplate.
export const setupLiveEvents = (): void => {
  beforeAll(async () => {
    await conn.execute(TypegresLiveEvents.createTableSql(conn.database));
  });
  afterEach(async () => {
    await conn.execute(sql`TRUNCATE _typegres_live_events`);
  });
};
