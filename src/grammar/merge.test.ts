import { describe, it, expect } from "vitest";
import { merge } from "./merge";
import { Int4, Text } from "../types";
import { dummyDb, withDb } from "../test/db";
import { makeDb } from "../gen/tables";
import { testDb } from "../db.test";
import { values } from "../query/values";
import { assert, Equals } from "tsafe";

const db = makeDb();

describe("MERGE parser", () => {
  it("should parse and compile a basic MERGE with UPDATE", () => {
    const sourceData = values(
      { id: Int4.new(1), name: Text.new("Updated Name") },
      { id: Int4.new(2), name: Text.new("Another Update") },
    );

    const parsed = merge(
      {
        into: db.users,
        using: sourceData,
        on: (target, source) => target.id["="](source.id),
      },
      {
        whenMatchedThenUpdateSet: (_, source) => ({ name: source.name }),
      },
    );

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'MERGE INTO "users" as "users" USING (VALUES (cast($1 as int4), cast($2 as text)), (cast($3 as int4), cast($4 as text))) as "values"("id", "name") ON ("users"."id" = "values"."id") WHEN MATCHED THEN UPDATE SET "name" = "values"."name"',
    );
    expect(result.parameters).toEqual([1, "Updated Name", 2, "Another Update"]);
  });

  it("should parse MERGE with INSERT when not matched", () => {
    const sourceData = values({
      id: Int4.new(3),
      name: Text.new("New User"),
      email: Text.new("new@example.com"),
    });

    const parsed = merge(
      {
        into: db.users,
        using: sourceData,
        on: (target, source) => target.id["="](source.id),
      },
      {
        whenNotMatchedThenInsert: {
          values: (_, source) => ({
            id: source.id,
            name: source.name,
            email: source.email,
          }),
        },
      },
    );

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'MERGE INTO "users" as "users" USING (VALUES (cast($1 as text), cast($2 as int4), cast($3 as text))) as "values"("email", "id", "name") ON ("users"."id" = "values"."id") WHEN NOT MATCHED THEN INSERT ("id", "name", "email") VALUES ("values"."id", "values"."name", "values"."email")',
    );
    expect(result.parameters).toEqual(["new@example.com", 3, "New User"]);
  });

  it("should parse MERGE with DELETE when matched with condition", () => {
    const parsed = merge(
      {
        into: db.users,
        using: db.posts,
        on: (user, post) => user.id["="](post.user_id),
      },
      [
        {
          whenMatched: {
            and: (_, post) => post.published["="](0),
            thenDelete: true,
          },
        },
      ],
    );

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'MERGE INTO "users" as "users" USING "posts" as "posts" ON ("users"."id" = "posts"."user_id") WHEN MATCHED AND ("posts"."published" = $1) THEN DELETE',
    );
    expect(result.parameters).toEqual([0]);
  });

  it("should parse MERGE with multiple WHEN clauses", () => {
    const sourceData = values(
      { id: Int4.new(1), name: Text.new("Update1"), active: Int4.new(1) },
      { id: Int4.new(2), name: Text.new("Update2"), active: Int4.new(0) },
    );

    const parsed = merge(
      {
        into: db.users,
        using: sourceData,
        on: (target, source) => target.id["="](source.id),
      },
      {
        whenMatched: {
          and: (_, source) => source.active["="](0),
          thenDelete: true,
        },
        whenMatchedThenUpdateSet: (_, source) => ({ name: source.name }),
        whenNotMatchedThenInsert: {
          values: (_, source) => ({
            id: source.id,
            name: source.name,
          }),
        },
      },
    );

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'MERGE INTO "users" as "users" USING (VALUES (cast($1 as int4), cast($2 as int4), cast($3 as text)), (cast($4 as int4), cast($5 as int4), cast($6 as text))) as "values"("active", "id", "name") ON ("users"."id" = "values"."id") WHEN MATCHED AND ("values"."active" = $7) THEN DELETE WHEN MATCHED THEN UPDATE SET "name" = "values"."name" WHEN NOT MATCHED THEN INSERT ("id", "name") VALUES ("values"."id", "values"."name")',
    );
    expect(result.parameters).toEqual([1, 1, "Update1", 0, 2, "Update2", 0]);
  });

  it("should parse MERGE with RETURNING clause", () => {
    const sourceData = values({ id: Int4.new(1), name: Text.new("Updated") });

    const parsed = merge(
      {
        into: db.users,
        using: sourceData,
        on: (target, source) => target.id["="](source.id),
      },
      {
        whenMatchedThenUpdateSet: (_, source) => ({ name: source.name }),
      },
      {
        returning: (target) => ({
          id: target.id,
          name: target.name,
        }),
      },
    );

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'MERGE INTO "users" as "users" USING (VALUES (cast($1 as int4), cast($2 as text))) as "values"("id", "name") ON ("users"."id" = "values"."id") WHEN MATCHED THEN UPDATE SET "name" = "values"."name" RETURNING "users"."id" AS "id", "users"."name" AS "name"',
    );
    expect(result.parameters).toEqual([1, "Updated"]);
  });

  it("should parse MERGE with DO NOTHING action", () => {
    const parsed = merge(
      {
        into: db.users,
        using: db.posts,
        on: (user, post) => user.id["="](post.user_id),
      },
      {
        whenMatched: {
          and: (_, post) => post.published["="](1),
          thenDoNothing: true,
        },
      },
    );

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'MERGE INTO "users" as "users" USING "posts" as "posts" ON ("users"."id" = "posts"."user_id") WHEN MATCHED AND ("posts"."published" = $1) THEN DO NOTHING',
    );
    expect(result.parameters).toEqual([1]);
  });

  it("should parse MERGE with ONLY modifier", () => {
    const sourceData = values({ id: Int4.new(1), name: Text.new("Updated") });

    const parsed = merge(
      {
        into: db.users,
        only: true,
        using: sourceData,
        on: (target, source) => target.id["="](source.id),
      },
      {
        whenMatchedThenUpdateSet: (_, source) => ({ name: source.name }),
      },
    );

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'MERGE INTO ONLY "users" as "users" USING (VALUES (cast($1 as int4), cast($2 as text))) as "values"("id", "name") ON ("users"."id" = "values"."id") WHEN MATCHED THEN UPDATE SET "name" = "values"."name"',
    );
    expect(result.parameters).toEqual([1, "Updated"]);
  });

  it("should parse MERGE with OVERRIDING SYSTEM VALUE", () => {
    const sourceData = values({
      id: Int4.new(100),
      name: Text.new("System Override"),
    });

    const parsed = merge(
      {
        into: db.users,
        using: sourceData,
        on: (target, source) => target.id["="](source.id),
      },
      {
        whenNotMatchedThenInsert: {
          columns: ["id", "name"],
          values: (_, source) => ({
            id: source.id,
            name: source.name,
          }),
          overriding: ["system", "value"],
        },
      },
    );

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'MERGE INTO "users" as "users" USING (VALUES (cast($1 as int4), cast($2 as text))) as "values"("id", "name") ON ("users"."id" = "values"."id") WHEN NOT MATCHED THEN INSERT ("id", "name") OVERRIDING SYSTEM VALUE VALUES ("values"."id", "values"."name")',
    );
    expect(result.parameters).toEqual([100, "System Override"]);
  });

  it("should parse MERGE with OVERRIDING USER VALUE", () => {
    const sourceData = values({
      id: Int4.new(200),
      name: Text.new("User Override"),
      email: Text.new("override@example.com"),
    });

    const parsed = merge(
      {
        into: db.users,
        using: sourceData,
        on: (target, source) => target.id["="](source.id),
      },
      {
        whenNotMatchedThenInsert: {
          columns: ["name", "email"],
          values: (_, source) => ({
            name: source.name,
            email: source.email,
          }),
          overriding: ["user", "value"],
        },
      },
    );

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'MERGE INTO "users" as "users" USING (VALUES (cast($1 as text), cast($2 as int4), cast($3 as text))) as "values"("email", "id", "name") ON ("users"."id" = "values"."id") WHEN NOT MATCHED THEN INSERT ("name", "email") OVERRIDING USER VALUE VALUES ("values"."name", "values"."email")',
    );
    expect(result.parameters).toEqual([
      "override@example.com",
      200,
      "User Override",
    ]);
  });

  it("should handle duplicate when clause types passed as list", () => {
    const sourceData = values(
      { id: Int4.new(1), name: Text.new("First"), priority: Int4.new(1) },
      { id: Int4.new(2), name: Text.new("Second"), priority: Int4.new(2) },
      { id: Int4.new(3), name: Text.new("Third"), priority: Int4.new(3) },
    );

    const parsed = merge(
      {
        into: db.users,
        using: sourceData,
        on: (target, source) => target.id["="](source.id),
      },
      [
        {
          whenMatched: {
            and: (_, source) => source.priority["="](1),
            thenUpdateSet: (_, source) => ({
              name: source.name,
              active: Int4.new(1),
            }),
          },
        },
        {
          whenMatched: {
            and: (_, source) => source.priority["="](2),
            thenUpdateSet: (_, source) => ({
              name: source.name,
              active: Int4.new(0),
            }),
          },
          whenMatchedThenDelete: true,
          whenNotMatchedThenInsert: {
            values: (_, source) => ({
              id: source.id,
              name: source.name,
            }),
          },
        },
      ],
    );

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'MERGE INTO "users" as "users" USING (VALUES (cast($1 as int4), cast($2 as text), cast($3 as int4)), (cast($4 as int4), cast($5 as text), cast($6 as int4)), (cast($7 as int4), cast($8 as text), cast($9 as int4))) as "values"("id", "name", "priority") ON ("users"."id" = "values"."id") WHEN MATCHED AND ("values"."priority" = $10) THEN UPDATE SET "name" = "values"."name", "active" = cast($11 as int4) WHEN MATCHED AND ("values"."priority" = $12) THEN UPDATE SET "name" = "values"."name", "active" = cast($13 as int4) WHEN MATCHED THEN DELETE WHEN NOT MATCHED THEN INSERT ("id", "name") VALUES ("values"."id", "values"."name")',
    );
    expect(result.parameters).toEqual([
      1,
      "First",
      1,
      2,
      "Second",
      2,
      3,
      "Third",
      3,
      1,
      1,
      2,
      0,
    ]);
  });

  describe("e2e tests", () => {
    it("should execute MERGE with UPDATE and INSERT", async () => {
      await withDb(testDb, async (kdb) => {
        // Insert initial data
        await kdb.sql`
          INSERT INTO users (id, name, email, active)
          VALUES (201, 'ExistingUser', 'existing@example.com', 1)
        `.execute();

        const sourceData = values(
          {
            id: Int4.new(201),
            name: Text.new("UpdatedUser"),
            email: Text.new("updated@example.com"),
          },
          {
            id: Int4.new(202),
            name: Text.new("NewUser"),
            email: Text.new("new@example.com"),
          },
        );

        const parsed = merge(
          {
            into: db.users,
            using: sourceData,
            on: (target, source) => target.id["="](source.id),
          },
          [
            {
              whenMatchedThenUpdateSet: (_, source) => ({
                name: source.name,
                email: source.email,
              }),
            },
            {
              whenNotMatchedThenInsert: {
                values: (_, source) => ({
                  id: source.id,
                  name: source.name,
                  email: source.email,
                  active: Int4.new(1),
                }),
              },
            },
          ],
          {
            returning: (target) => ({
              id: target.id,
              name: target.name,
              email: target.email,
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
            }[]
          >
        >();

        expect(result).toHaveLength(2);
        expect(result).toContainEqual({
          id: 201,
          name: "UpdatedUser",
          email: "updated@example.com",
        });
        expect(result).toContainEqual({
          id: 202,
          name: "NewUser",
          email: "new@example.com",
        });

        // Verify the changes
        const checkResult = await kdb.sql`
          SELECT id, name, email FROM users WHERE id IN (201, 202) ORDER BY id
        `.execute();

        expect(checkResult).toHaveLength(2);
        expect(checkResult[0]).toMatchObject({
          id: "201",
          name: "UpdatedUser",
          email: "updated@example.com",
        });
        expect(checkResult[1]).toMatchObject({
          id: "202",
          name: "NewUser",
          email: "new@example.com",
        });

        // Clean up
        await kdb.sql`DELETE FROM users WHERE id IN (201, 202)`.execute();
      });
    });

    it("should execute MERGE with conditional DELETE", async () => {
      await withDb(testDb, async (kdb) => {
        // Insert test data
        await kdb.sql`
          INSERT INTO users (id, name, email, active)
          VALUES 
            (301, 'ActiveUser', 'active@example.com', 1),
            (302, 'InactiveUser', 'inactive@example.com', 0)
        `.execute();

        const sourceData = values(
          { id: Int4.new(301), active: Int4.new(1) },
          { id: Int4.new(302), active: Int4.new(0) },
        );

        const parsed = merge(
          {
            into: db.users,
            using: sourceData,
            on: (target, source) => target.id["="](source.id),
          },
          {
            whenMatched: {
              and: (_, source) => source.active["="](0),
              thenDelete: true,
            },
            whenMatchedThenDoNothing: true,
          },
          {
            returning: (target) => ({
              deletedId: target.id,
              deletedName: target.name,
            }),
          },
        );

        const result = await parsed.execute(kdb);

        assert<
          Equals<
            typeof result,
            {
              deletedId: number;
              deletedName: string;
            }[]
          >
        >();

        // Only inactive user should be deleted
        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
          deletedId: 302,
          deletedName: "InactiveUser",
        });

        // Verify only active user remains
        const checkResult = await kdb.sql`
          SELECT id, name FROM users WHERE id IN (301, 302)
        `.execute();

        expect(checkResult).toHaveLength(1);
        expect(checkResult[0]).toMatchObject({ id: "301", name: "ActiveUser" });

        // Clean up
        await kdb.sql`DELETE FROM users WHERE id = 301`.execute();
      });
    });
  });
});
