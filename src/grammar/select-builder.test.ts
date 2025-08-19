import { describe, it, expect } from "vitest";
import { select } from "./select";
import * as db from "../gen/tables";
import * as Types from "../types";
import { dummyDb } from "../test/db";
import { values } from "../query/values";

describe("Select Builder Methods", () => {
  describe("select() method", () => {
    it("should allow changing the select clause", () => {
      const baseQuery = select((u) => ({ id: u.id }), { from: db.Users });
      const modifiedQuery = baseQuery.select((u) => ({
        name: u.name,
        email: u.email,
      }));

      const result = modifiedQuery.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."email" AS "email", "users"."name" AS "name" FROM "users" as "users"',
      );
      expect(result.parameters).toEqual([]);
    });

    it("should preserve other clauses when changing select", () => {
      const baseQuery = select((u) => ({ id: u.id }), {
        from: db.Users,
        where: (u) => u.active["="](Types.Int4.new(1)),
      });
      const modifiedQuery = baseQuery.select((u) => ({ name: u.name }));

      const result = modifiedQuery.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."name" AS "name" FROM "users" as "users" WHERE ("users"."active" = cast($1 as int4))',
      );
      expect(result.parameters).toEqual([1]);
    });

    it("should throw error when changing select after set operations", () => {
      const unionQuery = select((u) => ({ id: u.id }), {
        from: db.Users,
        union: select((u) => ({ id: u.id }), { from: db.Users }),
      });

      expect(() => {
        unionQuery.select((u) => ({ name: u.name }));
      }).toThrow("Cannot dynamically change select() after a set operation");
    });
  });

  describe("selectMerge() method", () => {
    it("should merge new columns with existing select", () => {
      const baseQuery = select((u) => ({ id: u.id, name: u.name }), {
        from: db.Users,
      });
      const mergedQuery = baseQuery.selectMerge((u) => ({
        email: u.email,
        role: u.role,
      }));

      const result = mergedQuery.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."email" AS "email", "users"."id" AS "id", "users"."name" AS "name", "users"."role" AS "role" FROM "users" as "users"',
      );
      expect(result.parameters).toEqual([]);
    });

    it("should override columns with same name in merge", () => {
      const baseQuery = select(
        (u) => ({
          id: u.id,
          fullName: u.name,
        }),
        { from: db.Users },
      );

      const mergedQuery = baseQuery.selectMerge((u) => ({
        fullName: u.email, // Override fullName with email
      }));

      const result = mergedQuery.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."email" AS "fullName", "users"."id" AS "id" FROM "users" as "users"',
      );
      expect(result.parameters).toEqual([]);
    });
  });

  describe("where() method", () => {
    it("should add where clause to query", () => {
      const query = select((u) => u, { from: db.Users }).where((u) =>
        u.active["="](Types.Int4.new(1)),
      );

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."active" AS "active", "users"."email" AS "email", "users"."id" AS "id", "users"."name" AS "name", "users"."role" AS "role" FROM "users" as "users" WHERE ("users"."active" = cast($1 as int4))',
      );
      expect(result.parameters).toEqual([1]);
    });

    it("should combine multiple where clauses with AND", () => {
      const query = select((u) => u, { from: db.Users })
        .where((u) => u.active["="](Types.Int4.new(1)))
        .where((u) => u.role["="](Types.Text.new("admin")));

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."active" AS "active", "users"."email" AS "email", "users"."id" AS "id", "users"."name" AS "name", "users"."role" AS "role" FROM "users" as "users" WHERE (("users"."role" = cast($1 as text)) AND ("users"."active" = cast($2 as int4)))',
      );
      expect(result.parameters).toEqual(["admin", 1]);
    });

    it("should work with complex boolean expressions", () => {
      const query = select((u) => u, { from: db.Users }).where((u) =>
        u.active["="](Types.Int4.new(1)).or(
          u.role["="](Types.Text.new("admin")),
        ),
      );

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."active" AS "active", "users"."email" AS "email", "users"."id" AS "id", "users"."name" AS "name", "users"."role" AS "role" FROM "users" as "users" WHERE (("users"."active" = cast($1 as int4)) OR ("users"."role" = cast($2 as text)))',
      );
      expect(result.parameters).toEqual([1, "admin"]);
    });
  });

  describe("orderBy() method", () => {
    it("should add ORDER BY clause", () => {
      const query = select((p) => p, { from: db.Person }).orderBy(
        (p) => p.createdAt,
      );

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "person"."createdAt" AS "createdAt", "person"."firstName" AS "firstName", "person"."gender" AS "gender", "person"."id" AS "id", "person"."lastName" AS "lastName" FROM "person" as "person" ORDER BY "person"."createdAt"',
      );
      expect(result.parameters).toEqual([]);
    });

    it("should support DESC ordering", () => {
      const query = select((p) => p, { from: db.Person }).orderBy(
        (p) => p.createdAt,
        { desc: true },
      );

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "person"."createdAt" AS "createdAt", "person"."firstName" AS "firstName", "person"."gender" AS "gender", "person"."id" AS "id", "person"."lastName" AS "lastName" FROM "person" as "person" ORDER BY "person"."createdAt" DESC',
      );
      expect(result.parameters).toEqual([]);
    });

    it("should support multiple ORDER BY columns", () => {
      const query = select((p) => p, { from: db.Person })
        .orderBy((p) => p.lastName, { asc: true })
        .orderBy((p) => p.firstName, { desc: true });

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "person"."createdAt" AS "createdAt", "person"."firstName" AS "firstName", "person"."gender" AS "gender", "person"."id" AS "id", "person"."lastName" AS "lastName" FROM "person" as "person" ORDER BY "person"."lastName" ASC, "person"."firstName" DESC',
      );
      expect(result.parameters).toEqual([]);
    });

    it("should append to existing ORDER BY", () => {
      const query = select((p) => p, { from: db.Person })
        .orderBy((p) => p.lastName)
        .orderBy((p) => p.firstName);

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "person"."createdAt" AS "createdAt", "person"."firstName" AS "firstName", "person"."gender" AS "gender", "person"."id" AS "id", "person"."lastName" AS "lastName" FROM "person" as "person" ORDER BY "person"."lastName", "person"."firstName"',
      );
      expect(result.parameters).toEqual([]);
    });

    it("should support NULLS FIRST/LAST", () => {
      const query = select((p) => p, { from: db.Person }).orderBy(
        (p) => p.lastName,
        { desc: true, nulls: "last" },
      );

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "person"."createdAt" AS "createdAt", "person"."firstName" AS "firstName", "person"."gender" AS "gender", "person"."id" AS "id", "person"."lastName" AS "lastName" FROM "person" as "person" ORDER BY "person"."lastName" DESC NULLS LAST',
      );
      expect(result.parameters).toEqual([]);
    });
  });

  describe("groupBy() method", () => {
    it("should add GROUP BY clause", () => {
      const query = select(
        (u) => ({
          role: u.role,
          count: u.id.count(),
        }),
        {
          from: db.Users,
        },
      ).groupBy((u) => [u.role]);

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT count("users"."id") AS "count", "users"."role" AS "role" FROM "users" as "users" GROUP BY ("users"."role")',
      );
      expect(result.parameters).toEqual([]);
    });

    it("should support multiple GROUP BY columns", () => {
      const query = select(
        (u) => ({
          role: u.role,
          active: u.active,
          count: u.id.count(),
        }),
        { from: db.Users },
      ).groupBy((u) => [u.role, u.active]);

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."active" AS "active", count("users"."id") AS "count", "users"."role" AS "role" FROM "users" as "users" GROUP BY ("users"."role", "users"."active")',
      );
      expect(result.parameters).toEqual([]);
    });

    it("should append to existing GROUP BY", () => {
      const query = select(
        (u) => ({
          role: u.role,
          active: u.active,
          count: u.id.count(),
        }),
        { from: db.Users },
      )
        .groupBy((u) => [u.role])
        .groupBy((u) => [u.active]);

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."active" AS "active", count("users"."id") AS "count", "users"."role" AS "role" FROM "users" as "users" GROUP BY ("users"."role"), ("users"."active")',
      );
      expect(result.parameters).toEqual([]);
    });
  });

  describe("having() method", () => {
    it("should add HAVING clause", () => {
      const query = select(
        (u) => ({
          role: u.role,
          userCount: u.id.count(),
        }),
        { from: db.Users },
      )
        .groupBy((u) => [u.role])
        .having((u) => u.id.count()[">="](2));

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."role" AS "role", count("users"."id") AS "userCount" FROM "users" as "users" GROUP BY ("users"."role") HAVING (count("users"."id") >= $1)',
      );
      expect(result.parameters).toEqual([2]);
    });

    it("should combine multiple HAVING clauses with AND", () => {
      const query = select(
        (u) => ({
          role: u.role,
          userCount: u.id.count(),
          avgId: u.id.avg(),
        }),
        { from: db.Users },
      )
        .groupBy((u) => [u.role])
        .having((u) => u.id.count()[">="](2))
        .having((u) => u.id.avg()["<"](Types.Numeric.new(100)));

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT avg("users"."id") AS "avgId", "users"."role" AS "role", count("users"."id") AS "userCount" FROM "users" as "users" GROUP BY ("users"."role") HAVING ((avg("users"."id") < cast($1 as numeric)) AND (count("users"."id") >= $2))',
      );
      expect(result.parameters).toEqual([100, 2]);
    });
  });

  describe("limit() method", () => {
    it("should add LIMIT clause", () => {
      const query = select((u) => u, { from: db.Users }).limit(
        Types.Int4.new(10),
      );

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."active" AS "active", "users"."email" AS "email", "users"."id" AS "id", "users"."name" AS "name", "users"."role" AS "role" FROM "users" as "users" LIMIT cast($1 as int4)',
      );
      expect(result.parameters).toEqual([10]);
    });

    it("should support LIMIT ALL", () => {
      const query = select((u) => u, { from: db.Users }).limit("all");

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."active" AS "active", "users"."email" AS "email", "users"."id" AS "id", "users"."name" AS "name", "users"."role" AS "role" FROM "users" as "users" LIMIT ALL',
      );
      expect(result.parameters).toEqual([]);
    });

    it("should replace existing limit", () => {
      const query = select((u) => u, { from: db.Users })
        .limit(Types.Int4.new(10))
        .limit(Types.Int4.new(5));

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."active" AS "active", "users"."email" AS "email", "users"."id" AS "id", "users"."name" AS "name", "users"."role" AS "role" FROM "users" as "users" LIMIT cast($1 as int4)',
      );
      expect(result.parameters).toEqual([5]);
    });
  });

  describe("offset() method", () => {
    it("should add OFFSET clause", () => {
      const query = select((u) => u, { from: db.Users }).offset(
        Types.Int4.new(20),
      );

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."active" AS "active", "users"."email" AS "email", "users"."id" AS "id", "users"."name" AS "name", "users"."role" AS "role" FROM "users" as "users" OFFSET cast($1 as int4)',
      );
      expect(result.parameters).toEqual([20]);
    });

    it("should support OFFSET with ROW/ROWS", () => {
      const query = select((u) => u, { from: db.Users }).offset([
        Types.Int4.new(20),
        { rows: true },
      ]);

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."active" AS "active", "users"."email" AS "email", "users"."id" AS "id", "users"."name" AS "name", "users"."role" AS "role" FROM "users" as "users" OFFSET cast($1 as int4) ROWS',
      );
      expect(result.parameters).toEqual([20]);
    });

    it("should replace existing offset", () => {
      const query = select((u) => u, { from: db.Users })
        .offset(Types.Int4.new(20))
        .offset(Types.Int4.new(30));

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."active" AS "active", "users"."email" AS "email", "users"."id" AS "id", "users"."name" AS "name", "users"."role" AS "role" FROM "users" as "users" OFFSET cast($1 as int4)',
      );
      expect(result.parameters).toEqual([30]);
    });
  });

  describe("fetch() method", () => {
    it("should add FETCH clause", () => {
      const query = select((u) => u, { from: db.Users }).fetch([
        "first",
        Types.Int4.new(5),
        "rows",
        "only",
      ]);

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."active" AS "active", "users"."email" AS "email", "users"."id" AS "id", "users"."name" AS "name", "users"."role" AS "role" FROM "users" as "users" FETCH FIRST cast($1 as int4) ROWS ONLY',
      );
      expect(result.parameters).toEqual([5]);
    });

    it("should support FETCH NEXT", () => {
      const query = select((u) => u, { from: db.Users })
        .offset(Types.Int4.new(10))
        .fetch(["next", Types.Int4.new(5), "rows", "withTies"]);

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."active" AS "active", "users"."email" AS "email", "users"."id" AS "id", "users"."name" AS "name", "users"."role" AS "role" FROM "users" as "users" OFFSET cast($1 as int4) FETCH NEXT cast($2 as int4) ROWS WITH TIES',
      );
      expect(result.parameters).toEqual([10, 5]);
    });
  });

  describe("as() and subquery() methods", () => {
    it("should create a FromItem with alias", () => {
      const subquery = select((u) => ({ id: u.id }), { from: db.Users }).as(
        "user_ids",
      );

      expect(subquery).toBeDefined();
      expect(subquery.fromAlias.name).toBe("user_ids");
    });

    it("should use default alias if not provided", () => {
      const subquery = select((u) => ({ id: u.id }), { from: db.Users }).as();

      expect(subquery.fromAlias.name).toBe("select");
    });

    it("subquery() should be an alias for as()", () => {
      const subquery = select((u) => ({ id: u.id }), {
        from: db.Users,
      }).subquery("sub");

      expect(subquery.fromAlias.name).toBe("sub");
    });

    it("should allow using subquery in FROM clause", () => {
      const subquery = select((u) => ({ userId: u.id }), { from: db.Users })
        .where((u) => u.active["="](Types.Int4.new(1)))
        .as("active_users");

      const outerQuery = select((au) => ({ userId: au.userId }), {
        from: subquery,
      });

      const result = outerQuery.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "active_users"."userId" AS "userId" FROM (SELECT "users"."id" AS "userId" FROM "users" as "users" WHERE ("users"."active" = cast($1 as int4))) as "active_users"',
      );
      expect(result.parameters).toEqual([1]);
    });
  });

  describe("Incremental query building", () => {
    it("should build query incrementally with multiple methods", () => {
      let query = select((u) => ({ id: u.id, name: u.name }), {
        from: db.Users,
      });

      // Step 1: Basic select
      let result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."id" AS "id", "users"."name" AS "name" FROM "users" as "users"',
      );
      expect(result.parameters).toEqual([]);

      // Step 2: Add where clause
      query = query.where((u) => u.active["="](Types.Int4.new(1)));
      result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."id" AS "id", "users"."name" AS "name" FROM "users" as "users" WHERE ("users"."active" = cast($1 as int4))',
      );
      expect(result.parameters).toEqual([1]);

      // Step 3: Add order by
      query = query.orderBy((u) => u.name, { asc: true });
      result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."id" AS "id", "users"."name" AS "name" FROM "users" as "users" WHERE ("users"."active" = cast($1 as int4)) ORDER BY "users"."name" ASC',
      );
      expect(result.parameters).toEqual([1]);

      // Step 4: Add limit
      query = query.limit(Types.Int4.new(10));
      result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."id" AS "id", "users"."name" AS "name" FROM "users" as "users" WHERE ("users"."active" = cast($1 as int4)) ORDER BY "users"."name" ASC LIMIT cast($2 as int4)',
      );
      expect(result.parameters).toEqual([1, 10]);

      // Step 5: Add offset
      query = query.offset(Types.Int4.new(5));
      result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."id" AS "id", "users"."name" AS "name" FROM "users" as "users" WHERE ("users"."active" = cast($1 as int4)) ORDER BY "users"."name" ASC LIMIT cast($2 as int4) OFFSET cast($3 as int4)',
      );
      expect(result.parameters).toEqual([1, 10, 5]);
    });

    it("should build complex aggregation query incrementally", () => {
      // Start with basic select
      let queryBase = select(
        (u) => ({
          role: u.role,
        }),
        { from: db.Users },
      );

      // Add aggregation
      let query = queryBase.selectMerge((u) => ({
        userCount: u.id.count(),
        avgId: u.id.avg(),
      }));

      // Add grouping
      query = query.groupBy((u) => [u.role]);

      // Add having clause
      query = query.having((u) => u.id.count()[">="](2));

      // Add ordering
      query = query.orderBy((u) => u.id.count(), { desc: true });

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT avg("users"."id") AS "avgId", "users"."role" AS "role", count("users"."id") AS "userCount" FROM "users" as "users" GROUP BY ("users"."role") HAVING (count("users"."id") >= $1) ORDER BY count("users"."id") DESC',
      );
      expect(result.parameters).toEqual([2]);
    });
  });

  describe("Method chaining", () => {
    it("should support fluent method chaining", () => {
      const query = select((u) => u, { from: db.Users })
        .where((u) => u.active["="](Types.Int4.new(1)))
        .orderBy((u) => u.name, { asc: true })
        .limit(Types.Int4.new(10))
        .offset(Types.Int4.new(20));

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "users"."active" AS "active", "users"."email" AS "email", "users"."id" AS "id", "users"."name" AS "name", "users"."role" AS "role" FROM "users" as "users" WHERE ("users"."active" = cast($1 as int4)) ORDER BY "users"."name" ASC LIMIT cast($2 as int4) OFFSET cast($3 as int4)',
      );
      expect(result.parameters).toEqual([1, 10, 20]);
    });

    it("should maintain immutability - original query unchanged", () => {
      const originalQuery = select((u) => u, { from: db.Users });
      const modifiedQuery = originalQuery
        .where((u) => u.active["="](Types.Int4.new(1)))
        .limit(Types.Int4.new(10));

      const originalResult = originalQuery.compile().compile(dummyDb);
      const modifiedResult = modifiedQuery.compile().compile(dummyDb);

      expect(originalResult.sql).toBe(
        'SELECT "users"."active" AS "active", "users"."email" AS "email", "users"."id" AS "id", "users"."name" AS "name", "users"."role" AS "role" FROM "users" as "users"',
      );
      expect(originalResult.parameters).toEqual([]);
      
      expect(modifiedResult.sql).toBe(
        'SELECT "users"."active" AS "active", "users"."email" AS "email", "users"."id" AS "id", "users"."name" AS "name", "users"."role" AS "role" FROM "users" as "users" WHERE ("users"."active" = cast($1 as int4)) LIMIT cast($2 as int4)',
      );
      expect(modifiedResult.parameters).toEqual([1, 10]);
    });
  });

  describe("Complex scenarios", () => {
    it("should handle subquery with aggregation", () => {
      // Create a subquery that gets user counts by role
      const roleCountsSubquery = select(
        (u) => ({
          role: u.role,
          userCount: u.id.count(),
        }),
        { from: db.Users },
      )
        .groupBy((u) => [u.role])
        .as("role_counts");

      // Use the subquery
      const mainQuery = select((rc) => rc, { from: roleCountsSubquery }).where(
        (rc) => rc.userCount[">="](2),
      );

      const result = mainQuery.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT "role_counts"."role" AS "role", "role_counts"."userCount" AS "userCount" FROM (SELECT "users"."role" AS "role", count("users"."id") AS "userCount" FROM "users" as "users" GROUP BY ("users"."role")) as "role_counts" WHERE ("role_counts"."userCount" >= $1)',
      );
      expect(result.parameters).toEqual([2]);
    });

    it("should work with VALUES as source", () => {
      const data = values(
        { name: Types.Text.new("Alice"), age: Types.Int4.new(25) },
        { name: Types.Text.new("Bob"), age: Types.Int4.new(30) },
        { name: Types.Text.new("Charlie"), age: Types.Int4.new(35) },
      );

      const query = select(
        (v) => ({
          name: v.name,
          ageGroup: v.age["/"](Types.Int4.new(10))["*"](Types.Int4.new(10)),
        }),
        { from: data },
      )
        .where((v) => v.age[">="](Types.Int4.new(30)))
        .orderBy((v) => v.age);

      const result = query.compile().compile(dummyDb);
      expect(result.sql).toBe(
        'SELECT (("values"."age" / cast($1 as int4)) * cast($2 as int4)) AS "ageGroup", "values"."name" AS "name" FROM (VALUES (cast($3 as int4), cast($4 as text)), (cast($5 as int4), cast($6 as text)), (cast($7 as int4), cast($8 as text))) as "values"("age", "name") WHERE ("values"."age" >= cast($9 as int4)) ORDER BY "values"."age"',
      );
      expect(result.parameters).toEqual([10, 10, 25, "Alice", 30, "Bob", 35, "Charlie", 30]);
    });
  });
});