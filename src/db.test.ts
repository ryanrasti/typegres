import { describe, it, expect } from "vitest";
import { db } from "./test/db";
import { sql } from "kysely";
import { PGlite, types } from "@electric-sql/pglite";

describe("App", () => {
  it("run a select query", async () => {
    const one = await db
      .selectNoFrom([sql<number>`1`.as("val")])
      .executeTakeFirst();
    // We're not using the default pg parsing, so it's a
    // string here:
    expect(one?.val).toEqual("1");
  });

  it("test pglite", async () => {
    const db = await PGlite.create({
      parsers: Object.fromEntries(
        Object.values(types).map((value) => {
          return [value, (x: string) => x];
        })
      ),
    });
    const resp = await db.query("select 1::int4 as message;");
    const rows = resp.rows as { message: string }[];
    console.log(rows);

    expect(rows[0].message).toEqual("1");
  });
});
