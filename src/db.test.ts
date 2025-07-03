import { describe, it, expect } from "vitest";
import { Kysely, sql } from "kysely";
import { Pool } from "pg";
import { db, Typegres } from "./db";
import { SeedDatabase } from "./test/seeds";

export const testDb = await db({
  type: "pg",
  PoolClass: Pool,
  config: {
    host: "localhost",
    port: 1234,
    user: "postgres",
    password: "postgres",
    database: "test",
  }
}) as unknown as Kysely<SeedDatabase> & Typegres;

describe("App", () => {
  it("run a select query", async () => {
    const one = await testDb
      .selectNoFrom([sql<number>`1`.as("val")])
      .executeTakeFirst();
    // We're not using the default pg parsing, so it's a
    // string here:
    expect(one?.val).toEqual("1");
  });
});
