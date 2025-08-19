import { describe, it, expect } from "vitest";
import * as db from "../gen/tables";
import * as Types from "../types";
import { dummyDb, withDb } from "../test/db";
import { testDb } from "../db.test";
import { assert, Equals } from "tsafe";
import { select } from "../grammar";

// Compile tests - just check SQL output without executing
describe("compile tests", () => {
  it("should create a basic select query", () => {
    // Basic select all
    const query1 = db.Users.select();
    const compiled1 = query1.compile();
    const result1 = compiled1.compile(dummyDb);

    expect(result1.sql).toBe(
      'SELECT "users"."active" AS "active", "users"."email" AS "email", "users"."id" AS "id", "users"."name" AS "name", "users"."role" AS "role" FROM "users" as "users"',
    );
    expect(result1.parameters).toEqual([]);

    // Select specific columns
    const query2 = db.Users.select((u) => ({ id: u.id, name: u.name }));
    const compiled2 = query2.compile();
    const result2 = compiled2.compile(dummyDb);

    expect(result2.sql).toBe(
      'SELECT "users"."id" AS "id", "users"."name" AS "name" FROM "users" as "users"',
    );
    expect(result2.parameters).toEqual([]);
  });

  it("should support additional options like where clause", () => {
    const query = db.Users.select((u) => u).where((u) =>
      u.active["="](Types.Int4.new(1)),
    );
    const compiled = query.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'SELECT "users"."active" AS "active", "users"."email" AS "email", "users"."id" AS "id", "users"."name" AS "name", "users"."role" AS "role" FROM "users" as "users" WHERE ("users"."active" = cast($1 as int4))',
    );
    expect(result.parameters).toEqual([1]);
  });

  it("should support ORDER BY and LIMIT", () => {
    const query = db.Person.select((p) => ({
      id: p.id,
      firstName: p.firstName,
    }))
      .orderBy((p) => p.createdAt, { desc: true })
      .limit(Types.Int4.new(10));
    const compiled = query.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'SELECT "person"."firstName" AS "firstName", "person"."id" AS "id" FROM "person" as "person" ORDER BY "person"."createdAt" DESC LIMIT cast($1 as int4)',
    );
    expect(result.parameters).toEqual([10]);
  });

  it("should support soft delete pattern through override", () => {
    // Create a class that extends the Users table with soft delete logic using the active column
    class ActiveUsers extends db.Users.extend<ActiveUsers>() {
      nameName() {
        return this.name.textcat(this.name);
      }

      static select<S extends Types.RowLike>(
        selectCb?: (t: ActiveUsers, _j: any) => S,
      ) {
        return select(selectCb ?? ((t: ActiveUsers, _j: any) => t as S), {
          from: this,
          where: (t) => t.active["="](1),
        });
      }
    }

    // Should automatically filter for active users
    const query = ActiveUsers.select((au) => ({
      id: au.id,
      nameName: au.nameName(),
    }));
    const compiled = query.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'SELECT "users"."id" AS "id", textcat("users"."name", "users"."name") AS "nameName" FROM "users" as "users" WHERE ("users"."active" = $1)',
    );
    expect(result.parameters).toEqual([1]);
  });

  it("should work with joins", () => {
    // Use the select function directly with the joined from
    const query = select(
      (u, { posts }) => ({
        name: u.name,
        postTitle: posts.title,
      }),
      {
        from: db.Users.asFromItem().join(db.Posts, "posts", (u, { posts }) =>
          u.id["="](posts.user_id),
        ),
      },
    );

    const compiled = query.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toContain("JOIN");
    expect(result.sql).toContain("posts");
    expect(result.sql).toContain("title");
  });
});

// E2E tests - actually execute queries against a test database
describe("e2e tests", () => {
  it("should execute basic select from Users table", async () => {
    await withDb(testDb, async (kdb) => {
      // Test select all
      const query1 = db.Users.select((p) => p);
      const result1 = await query1.execute(kdb);

      assert<
        Equals<
          typeof result1,
          {
            active: number | null;
            email: string;
            id: number;
            name: string;
            role: string | null;
          }[]
        >
      >();

      expect(result1).toBeDefined();
      expect(Array.isArray(result1)).toBe(true);

      // Test select specific columns
      const query2 = db.Users.select((u) => ({
        userId: u.id,
        userName: u.name,
      }));
      const result2 = await query2.execute(kdb);

      assert<
        Equals<
          typeof result2,
          {
            userId: number;
            userName: string;
          }[]
        >
      >();

      expect(result2).toBeDefined();
      expect(Array.isArray(result2)).toBe(true);
    });
  });

  it("should execute select with WHERE clause", async () => {
    await withDb(testDb, async (kdb) => {
      // Test select with WHERE on Person table
      const query = db.Person.select((p) => ({
        id: p.id,
        fullName: p.firstName.textcat(Types.Text.new(" ")).textcat(p.lastName),
      })).where((p) => p.id["<="](Types.Int4.new(2)));
      const result = await query.execute(kdb);

      assert<
        Equals<
          typeof result,
          {
            id: number;
            fullName: string | null;
          }[]
        >
      >();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      // The test might run without seed data, so we just check the types are correct
      if (result.length > 0) {
        result.forEach((row) => {
          expect(row).toHaveProperty("id");
          expect(row).toHaveProperty("fullName");
          expect(row.id).toBeLessThanOrEqual(2);
        });
      }
    });
  });

  it("should execute select with ORDER BY and LIMIT", async () => {
    await withDb(testDb, async (kdb) => {
      // Test select with ORDER BY and LIMIT on Pet table
      const query = db.Pet.select((p) => ({ name: p.name, age: p.age }))
        .orderBy((p) => p.age, { desc: true })
        .limit(Types.Int4.new(2));

      const result = await query.execute(kdb);

      assert<
        Equals<
          typeof result,
          {
            name: string;
            age: number;
          }[]
        >
      >();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      // Should have at most 2 results
      expect(result.length).toBeLessThanOrEqual(2);

      // Check ordering if there are results
      if (result.length > 1) {
        for (let i = 1; i < result.length; i++) {
          expect(result[i - 1].age).toBeGreaterThanOrEqual(result[i].age);
        }
      }
    });
  });
});
