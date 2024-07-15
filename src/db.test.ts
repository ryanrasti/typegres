import { describe, it, expect } from "vitest";
import { db } from "./test/db";
import { sql } from "kysely";

describe("App", () => {
  it("run a select query", async () => {
    const one = await db
      .selectNoFrom([sql<number>`1`.as("val")])
      .executeTakeFirst();
    // We're not using the default pg parsing, so it's a
    // string here:
    expect(one?.val).toEqual("1");
  });
});
