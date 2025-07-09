import { describe, it, expect } from "vitest";
import { sql } from "kysely";
import { Pool } from "pg";
import { typegres} from "./db";

export const testDb = await typegres({
  type: "pg",
  PoolClass: Pool,
  config: {
    host: "localhost",
    port: 1234,
    user: "postgres",
    password: "postgres",
    database: "test",
  }
});

describe("App", () => {
  it("run a select query", async () => {
    const one = await testDb._internal
      .selectNoFrom([sql<number>`1`.as("val")])
      .executeTakeFirst();
    // We're not using the default pg parsing, so it's a
    // string here:
    expect(one?.val).toEqual("1");
  });
});
