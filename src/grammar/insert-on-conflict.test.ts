import { describe, it, expect } from "vitest";
import { insert } from "./insert";
import { values } from "../query/values";
import { Int4, Text } from "../types";
import { dummyDb, withDb } from "../test/db";
import { makeDb } from "../gen/tables";
import { testDb } from "../db.test";
import { assert, Equals } from "tsafe";
import { sql } from "kysely";

const db = makeDb();

describe("INSERT ON CONFLICT tests", () => {
  describe("Compilation tests", () => {
    it("should parse INSERT with ON CONFLICT DO NOTHING", () => {
      const parsed = insert(
        { into: db.users, columns: ["id", "name", "email"] },
        values({
          id: Int4.new(1),
          name: Text.new("John"),
          email: Text.new("john@example.com"),
        }),
        {
          onConflict: { doNothing: true },
        },
      );

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'INSERT INTO "users" ("email", "id", "name") (VALUES (cast($1 as text), cast($2 as int4), cast($3 as text))) ON CONFLICT DO NOTHING',
      );
      expect(result.parameters).toEqual(["john@example.com", 1, "John"]);
    });

    it("should parse INSERT with ON CONFLICT on index column", async () => {
      const parsed = insert(
        { into: db.users, columns: ["id", "name", "email"] },
        values({
          id: Int4.new(1),
          name: Text.new("John"),
          email: Text.new("john@example.com"),
        }),
        {
          onConflict: {
            target: (row) => row.id,
            doNothing: true,
          },
        },
      );

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'INSERT INTO "users" ("email", "id", "name") (VALUES (cast($1 as text), cast($2 as int4), cast($3 as text))) ON CONFLICT ("id") DO NOTHING',
      );
      expect(result.parameters).toEqual(["john@example.com", 1, "John"]);
    });

    it("should parse INSERT with ON CONFLICT on multiple columns", async () => {
      const parsed = insert(
        { into: db.users, columns: ["id", "name", "email"] },
        values({
          id: Int4.new(1),
          name: Text.new("John"),
          email: Text.new("john@example.com"),
        }),
        {
          onConflict: {
            target: [(row) => row.name, (row) => row.email],
            doNothing: true,
          },
        },
      );

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'INSERT INTO "users" ("email", "id", "name") (VALUES (cast($1 as text), cast($2 as int4), cast($3 as text))) ON CONFLICT ("name", "email") DO NOTHING',
      );
      expect(result.parameters).toEqual(["john@example.com", 1, "John"]);
    });

    it("should parse INSERT with ON CONFLICT with WHERE clause", async () => {
      const parsed = insert(
        { into: db.users, columns: ["id", "name", "email", "active"] },
        values({
          id: Int4.new(1),
          name: Text.new("John"),
          email: Text.new("john@example.com"),
          active: Int4.new(1),
        }),
        {
          onConflict: {
            target: (row) => row.id,
            where: (row) => row.active["="](1),
            doNothing: true,
          },
        },
      );

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'INSERT INTO "users" ("active", "email", "id", "name") (VALUES (cast($1 as int4), cast($2 as text), cast($3 as int4), cast($4 as text))) ON CONFLICT ("id") WHERE ("users"."active" = $5) DO NOTHING',
      );
      expect(result.parameters).toEqual([1, "john@example.com", 1, "John", 1]);
    });

    it("should parse INSERT with ON CONFLICT ON CONSTRAINT", async () => {
      const parsed = insert(
        { into: db.users, columns: ["id", "name", "email"] },
        values({
          id: Int4.new(1),
          name: Text.new("John"),
          email: Text.new("john@example.com"),
        }),
        {
          onConflict: {
            onConstraint: sql.raw("users_pkey"),
            doNothing: true,
          },
        },
      );

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'INSERT INTO "users" ("email", "id", "name") (VALUES (cast($1 as text), cast($2 as int4), cast($3 as text))) ON CONFLICT ON CONSTRAINT users_pkey DO NOTHING',
      );
      expect(result.parameters).toEqual(["john@example.com", 1, "John"]);
    });

    it("should parse INSERT with ON CONFLICT DO UPDATE SET", async () => {
      const parsed = insert(
        { into: db.users, columns: ["id", "name", "email"] },
        values({
          id: Int4.new(1),
          name: Text.new("John"),
          email: Text.new("john@example.com"),
        }),
        {
          onConflict: {
            target: (row) => row.id,
            doUpdateSet: (_row, excluded) => ({
              name: excluded.name,
              email: excluded.email,
            }),
          },
        },
      );

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'INSERT INTO "users" ("email", "id", "name") (VALUES (cast($1 as text), cast($2 as int4), cast($3 as text))) ON CONFLICT ("id") DO UPDATE SET "name" = "excluded"."name", "email" = "excluded"."email"',
      );
      expect(result.parameters).toEqual(["john@example.com", 1, "John"]);
    });

    it("should parse INSERT with ON CONFLICT DO UPDATE SET with WHERE", async () => {
      const parsed = insert(
        { into: db.users, columns: ["id", "name", "email", "active"] },
        values({
          id: Int4.new(1),
          name: Text.new("John"),
          email: Text.new("john@example.com"),
          active: Int4.new(1),
        }),
        {
          onConflict: {
            target: (row) => row.id,
            doUpdateSet: [
              (_row, excluded) => ({
                name: excluded.name,
                email: excluded.email,
              }),
              {
                where: (_row, excluded) => excluded.active["="](Int4.new(1)),
              },
            ],
          },
        },
      );

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'INSERT INTO "users" ("active", "email", "id", "name") (VALUES (cast($1 as int4), cast($2 as text), cast($3 as int4), cast($4 as text))) ON CONFLICT ("id") DO UPDATE SET "name" = "excluded"."name", "email" = "excluded"."email" WHERE ("excluded"."active" = cast($5 as int4))',
      );
      expect(result.parameters).toEqual([1, "john@example.com", 1, "John", 1]);
    });
  });

  describe("e2e tests", () => {
    it("should execute INSERT with ON CONFLICT using all options", async () => {
      await withDb(testDb, async (kdb) => {
        // Clean up any existing test data first
        await kdb.sql`DELETE FROM users WHERE id = 1`.execute();

        // First, insert an initial user
        await kdb.sql`
          INSERT INTO users (id, name, email, active) 
          VALUES (1, 'InitialUser', 'initial@example.com', 1)
        `.execute();

        // Now do an upsert with all conflict options:
        // - conflict target: id column
        // - where clause on conflict target
        // - do update set using excluded table
        // - where clause on update
        const parsed = insert(
          { into: db.users, columns: ["active", "email", "id", "name"] },
          values({
            id: Int4.new(1),
            name: Text.new("UpdatedUser"),
            email: Text.new("updated@example.com"),
            active: Int4.new(1),
          }),
          {
            onConflict: {
              target: (row) => row.id,
              where: (row) => row.active["="](1),
              doUpdateSet: [
                (row, excluded) => ({
                  name: excluded.name.textcat(" (updated)"),
                  email: excluded.email,
                  active: row.active["+"](excluded.active),
                }),
                {
                  where: (row, excluded) => excluded.email["<>"](row.email),
                },
              ],
            },
            returning: (row) => ({
              id: row.id,
              name: row.name,
              email: row.email,
              active: row.active,
            }),
          },
        );

        const result = await parsed.execute(kdb);

        assert<
          Equals<
            typeof result,
            {
              id: number;
              name: string;
              email: string;
              active: number | null;
            }[]
          >
        >();

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("UpdatedUser (updated)");
        expect(result[0].email).toBe("updated@example.com");
        expect(result[0].active).toBe(2); // 1 + 1

        // Verify by selecting
        const checkResult = await kdb.sql`
          SELECT id, name, email, active FROM users 
          WHERE id = 1
        `.execute();

        expect(checkResult[0]).toMatchObject({
          name: "UpdatedUser (updated)",
          email: "updated@example.com",
          active: "2",
        });

        // Clean up
        await kdb.sql`DELETE FROM users WHERE id = 1`.execute();
      });
    });
  });
});
