import { describe, it, expect } from "vitest";
import { with_, Cte } from "./with";
import { select } from "./select";
import { insert } from "./insert";
import { update } from "./update";
import { merge } from "./merge";
import { values } from "../query/values";
import { Int4, Text } from "../types";
import { dummyDb, withDb } from "../test/db";
import { testDb } from "../db.test";
import { makeDb } from "../gen/tables";
import { assert, Equals } from "tsafe";

const db = makeDb();

describe("WITH (CTE) parser", () => {
  describe("Basic CTEs", () => {
    it("should compile a simple WITH clause", () => {
      const query = with_(
        (cte) => ({
          numbers: cte(
            values({ n: Int4.new(1) }, { n: Int4.new(2) }, { n: Int4.new(3) }),
          ),
        }),
        ({ numbers }) => select((n) => ({ value: n.n }), { from: numbers }),
      );

      const compiled = query.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'WITH "numbers"("n") AS (VALUES (cast($1 as int4)), (cast($2 as int4)), (cast($3 as int4))) (SELECT "numbers"."n" AS "value" FROM "numbers" as "numbers")',
      );
      expect(result.parameters).toEqual([1, 2, 3]);
    });

    it("should compile multiple CTEs", () => {
      const query = with_(
        (cte) => ({
          first: cte(values({ a: Int4.new(1), b: Text.new("one") })),
          second: cte(values({ x: Int4.new(10), y: Text.new("ten") })),
        }),
        ({ first, second }) =>
          select(
            (f, { s }) => ({
              a: f.a,
              b: f.b,
              x: s.x,
              y: s.y,
            }),
            {
              from: first.join(second, "s", () => true),
            },
          ) as any,
      );

      const compiled = query.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'WITH "first"("a", "b") AS (VALUES (cast($1 as int4), cast($2 as text))) "second"("x", "y") AS (VALUES (cast($3 as int4), cast($4 as text))) (SELECT "first"."a" AS "a", "first"."b" AS "b", "s"."x" AS "x", "s"."y" AS "y" FROM "first" as "first" JOIN "second" as "s" ON cast($5 as bool))',
      );
      expect(result.parameters).toEqual([1, "one", 10, "ten", true]);
    });

    it("should support CTE referencing another CTE", () => {
      const query = with_(
        (cte) => ({
          base: cte(
            values(
              { id: Int4.new(1), name: Text.new("Alice") },
              { id: Int4.new(2), name: Text.new("Bob") },
            ),
          ),
          get filtered() {
            return cte(
              select((b) => ({ id: b.id, name: b.name }), {
                from: this.base,
                where: (b) => b.id[">"](Int4.new(1)),
              }),
            );
          },
        }),
        ({ filtered }) =>
          select((f) => ({ id: f.id, name: f.name }), { from: filtered }),
      );

      const compiled = query.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'WITH "base"("id", "name") AS (VALUES (cast($1 as int4), cast($2 as text)), (cast($3 as int4), cast($4 as text))) "filtered" AS (SELECT "base"."id" AS "id", "base"."name" AS "name" FROM "base" as "base" WHERE ("base"."id" > cast($5 as int4))) (SELECT "filtered"."id" AS "id", "filtered"."name" AS "name" FROM "filtered" as "filtered")',
      );
      expect(result.parameters).toEqual([1, "Alice", 2, "Bob", 1]);
    });
  });

  describe("RECURSIVE CTEs", () => {
    it("should support CTEs out of order with recursive flag", () => {
      const query = with_(
        (cte) => ({
          // derived references base, but is defined first
          get derived() {
            return cte(
              select((b) => ({ value: b.n["*"](Int4.new(2)) }), {
                from: this.base,
              }),
            );
          },
          base: cte(
            values({ n: Int4.new(1) }, { n: Int4.new(2) }, { n: Int4.new(3) }),
          ),
        }),
        ({ derived }) =>
          select((d) => ({ result: d.value }), { from: derived }),
        { recursive: true },
      );

      const compiled = query.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'WITH RECURSIVE "derived" AS (SELECT ("base"."n" * cast($1 as int4)) AS "value" FROM "base" as "base") "base"("n") AS (VALUES (cast($2 as int4)), (cast($3 as int4)), (cast($4 as int4))) (SELECT "derived"."value" AS "result" FROM "derived" as "derived")',
      );
      expect(result.parameters).toEqual([2, 1, 2, 3]);
    });

    it("should compile a recursive CTE", () => {
      const query = with_(
        (cte) => ({
          get numbers(): Cte<{ n: Int4<1> }> {
            const recursive = select(
              (prev: { n: Int4<1> }) => ({ n: prev.n["+"](Int4.new(1)) }),
              {
                from: this.numbers,
                where: (prev) => prev.n["<"](Int4.new(10)),
              },
            );
            return cte(
              select(() => ({ n: Int4.new(1) }), {
                unionAll: recursive,
              }),
            );
          },
        }),
        ({ numbers }) => select((n) => ({ value: n.n }), { from: numbers }),
        { recursive: true },
      );

      const compiled = query.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'WITH RECURSIVE "numbers" AS (SELECT cast($1 as int4) AS "n" UNION ALL SELECT ("numbers"."n" + cast($2 as int4)) AS "n" FROM "numbers" as "numbers" WHERE ("numbers"."n" < cast($3 as int4))) (SELECT "numbers"."n" AS "value" FROM "numbers" as "numbers")',
      );
      expect(result.parameters).toEqual([1, 1, 10]);
    });

    it("should handle fibonacci sequence with recursive CTE", () => {
      const query = with_(
        (cte) => ({
          get fib(): Cte<{ n: Int4<1>; fib: Int4<1>; nextfib: Int4<1> }> {
            const recursive = select(
              (f) => ({
                n: f.n["+"](Int4.new(1)),
                fib: f.nextfib,
                nextfib: f.fib["+"](f.nextfib),
              }),
              {
                from: this.fib,
                where: (f) => f.n["<"](Int4.new(10)),
              },
            );
            return cte(
              select(
                () => ({
                  n: Int4.new(1),
                  fib: Int4.new(0),
                  nextfib: Int4.new(1),
                }),
                { unionAll: recursive },
              ),
            );
          },
        }),
        ({ fib }) => select((f) => ({ n: f.n, value: f.fib }), { from: fib }),
        { recursive: true },
      );

      const compiled = query.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'WITH RECURSIVE "fib" AS (SELECT cast($1 as int4) AS "n", cast($2 as int4) AS "fib", cast($3 as int4) AS "nextfib" UNION ALL SELECT ("fib"."n" + cast($4 as int4)) AS "n", "fib"."nextfib" AS "fib", ("fib"."fib" + "fib"."nextfib") AS "nextfib" FROM "fib" as "fib" WHERE ("fib"."n" < cast($5 as int4))) (SELECT "fib"."n" AS "n", "fib"."fib" AS "value" FROM "fib" as "fib")',
      );
      expect(result.parameters).toEqual([1, 0, 1, 1, 10]);
    });
  });

  describe("CTEs with DML", () => {
    it("should support INSERT with RETURNING in CTE", () => {
      const inserted = insert(
        { into: db.users, columns: ["name", "email"] },
        values({
          name: Text.new("Alice"),
          email: Text.new("alice@example.com"),
        }),
        {
          returning: (u) => ({ id: u.id, name: u.name }),
        },
      );
      const query = with_(
        (cte) => ({
          inserted: cte(inserted),
        }),
        ({ inserted }) =>
          select((i) => ({ userId: i.id, userName: i.name }), {
            from: inserted,
          }),
      );

      const compiled = query.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'WITH "inserted" AS (INSERT INTO "users" ("name", "email") (VALUES (cast($1 as text), cast($2 as text))) RETURNING "users"."id" AS "id", "users"."name" AS "name") (SELECT "inserted"."id" AS "userId", "inserted"."name" AS "userName" FROM "inserted" as "inserted")',
      );
      expect(result.parameters).toEqual(["alice@example.com", "Alice"]);
    });

    it("should support UPDATE with RETURNING in CTE", () => {
      const query = with_(
        (cte) => ({
          updated: cte(
            update(db.users, {
              set: () => ({ email: Text.new("updated@example.com") }),
              where: (u) => u.active["="](Int4.new(0)),
              returning: (u) => ({ id: u.id, email: u.email }),
            }),
          ),
        }),
        ({ updated }) =>
          select((u) => ({ userId: u.id, newEmail: u.email }), {
            from: updated,
          }),
      );

      const compiled = query.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'WITH "updated" AS (UPDATE "users" as "users" SET "email" = cast($1 as text) WHERE ("users"."active" = cast($2 as int4)) RETURNING "users"."id" AS "id", "users"."email" AS "email") (SELECT "updated"."id" AS "userId", "updated"."email" AS "newEmail" FROM "updated" as "updated")',
      );
      expect(result.parameters).toEqual(["updated@example.com", 0]);
    });
  });

  describe("MATERIALIZED hints", () => {
    it("should support MATERIALIZED hint", () => {
      const query = with_(
        (cte) => ({
          expensive: cte(
            select(() => ({ n: Int4.new(1) }), {}),
            { materialized: true },
          ),
        }),
        ({ expensive }) => select((e) => ({ value: e.n }), { from: expensive }),
      );

      const compiled = query.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'WITH "expensive" AS MATERIALIZED (SELECT cast($1 as int4) AS "n") (SELECT "expensive"."n" AS "value" FROM "expensive" as "expensive")',
      );
      expect(result.parameters).toEqual([1]);
    });

    it("should support NOT MATERIALIZED hint", () => {
      const query = with_(
        (cte) => ({
          simple: cte(values({ n: Int4.new(1) }), { notMaterialized: true }),
        }),
        ({ simple }) => select((s) => ({ value: s.n }), { from: simple }),
      );

      const compiled = query.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'WITH "simple"("n") AS NOT MATERIALIZED (VALUES (cast($1 as int4))) (SELECT "simple"."n" AS "value" FROM "simple" as "simple")',
      );
      expect(result.parameters).toEqual([1]);
    });
  });

  describe("Complex nested queries", () => {
    it("should handle CTEs with joins", () => {
      const query = with_(
        (cte) => ({
          users: cte(
            values(
              { id: Int4.new(1), name: Text.new("Alice") },
              { id: Int4.new(2), name: Text.new("Bob") },
            ),
          ),
          orders: cte(
            values(
              { id: Int4.new(1), userId: Int4.new(1), amount: Int4.new(100) },
              { id: Int4.new(2), userId: Int4.new(1), amount: Int4.new(200) },
              { id: Int4.new(3), userId: Int4.new(2), amount: Int4.new(150) },
            ),
          ),
        }),
        ({ users, orders }) =>
          select(
            (u, { o }) => ({
              userName: u.name,
              orderId: o.id,
              amount: o.amount,
            }),
            {
              from: users.join(orders, "o", (u, { o }) => u.id["="](o.userId)),
            },
          ),
      );

      const compiled = query.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'WITH "users"("id", "name") AS (VALUES (cast($1 as int4), cast($2 as text)), (cast($3 as int4), cast($4 as text))) "orders"("amount", "id", "userId") AS (VALUES (cast($5 as int4), cast($6 as int4), cast($7 as int4)), (cast($8 as int4), cast($9 as int4), cast($10 as int4)), (cast($11 as int4), cast($12 as int4), cast($13 as int4))) (SELECT "users"."name" AS "userName", "o"."id" AS "orderId", "o"."amount" AS "amount" FROM "users" as "users" JOIN "orders" as "o" ON ("users"."id" = "o"."userId"))',
      );
      expect(result.parameters).toEqual([
        1,
        "Alice",
        2,
        "Bob",
        100,
        1,
        1,
        200,
        2,
        1,
        150,
        3,
        2,
      ]);
    });

    it("should handle nested WITH clauses in final query", () => {
      const query = with_(
        (cte) => ({
          base: cte(values({ n: Int4.new(1) })),
        }),
        ({ base }) =>
          select((b) => ({ doubled: b.n["*"](Int4.new(2)) }), { from: base }),
      );

      const compiled = query.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'WITH "base"("n") AS (VALUES (cast($1 as int4))) (SELECT ("base"."n" * cast($2 as int4)) AS "doubled" FROM "base" as "base")',
      );
      expect(result.parameters).toEqual([1, 2]);
    });
  });

  describe("e2e tests", () => {
    it("should execute a simple CTE query", async () => {
      await withDb(testDb, async (kdb) => {
        const query = with_(
          (cte) => ({
            numbers: cte(
              values(
                { n: Int4.new(1), label: Text.new("one") },
                { n: Int4.new(2), label: Text.new("two") },
                { n: Int4.new(3), label: Text.new("three") },
              ),
            ),
          }),
          ({ numbers }) =>
            select((n) => ({ value: n.n, name: n.label }), {
              from: numbers,
              where: (n) => n.n[">="](Int4.new(2)),
              orderBy: (n) => n.n,
            }),
        );

        const result = await query.execute(kdb);
        assert<
          Equals<
            typeof result,
            {
              value: number;
              name: string;
            }[]
          >
        >();

        expect(result).toEqual([
          { value: 2, name: "two" },
          { value: 3, name: "three" },
        ]);
      });
    });

    it("should execute a recursive CTE for generating series", async () => {
      await withDb(testDb, async (kdb) => {
        const query = with_(
          (cte) => ({
            get series(): Cte<{ n: Int4<1> }> {
              return cte(
                select(() => ({ n: Int4.new(1) }), {
                  unionAll: select(
                    (s) => {
                      return { n: s.n["+"](Int4.new(1)) };
                    },
                    {
                      from: this.series,
                      where: (s) => s.n["<"](Int4.new(5)),
                    },
                  ),
                }),
              );
            },
          }),
          ({ series }) =>
            select((s) => ({ num: s.n }), {
              from: series,
              orderBy: (s) => s.n,
            }),
          { recursive: true },
        );

        const result = await query.execute(kdb);
        assert<
          Equals<
            typeof result,
            {
              num: number;
            }[]
          >
        >();

        expect(result).toEqual([
          { num: 1 },
          { num: 2 },
          { num: 3 },
          { num: 4 },
          { num: 5 },
        ]);
      });
    });

    it("should execute CTE with data modification", async () => {
      await withDb(testDb, async (kdb) => {
        // First insert some test data
        await kdb.sql`
          INSERT INTO person ("firstName", "lastName", gender)
          VALUES ('TestCTE', 'User', 'male')
        `.execute();

        // Use CTE to update and return the modified rows
        const query = with_(
          (cte) => ({
            updated: cte(
              update(db.person, {
                set: () => ({ firstName: Text.new("UpdatedCTE") }),
                where: (p) => p.firstName["="](Text.new("TestCTE")),
                returning: (p) => ({
                  id: p.id,
                  firstName: p.firstName,
                  lastName: p.lastName,
                }),
              }),
            ),
          }),
          ({ updated }) =>
            select(
              (u) => ({
                personId: u.id,
                fullName: u.firstName.textcat(" ").textcat(u.lastName),
              }),
              { from: updated },
            ),
        );

        const result = await query.execute(kdb);
        assert<
          Equals<
            typeof result,
            {
              personId: number;
              fullName: string | null;
            }[]
          >
        >();

        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
          fullName: "UpdatedCTE User",
        });

        // Verify the update actually happened
        const checkResult = await kdb.sql`
          SELECT "firstName" FROM person 
          WHERE "lastName" = 'User'
        `.execute();

        expect((checkResult[0] as any).firstName).toBe("UpdatedCTE");
      });
    });

    it("should parse CTE with MERGE", () => {
      const sourceData = values(
        { id: Int4.new(1), name: Text.new("Updated1") },
        { id: Int4.new(2), name: Text.new("Updated2") },
      );

      const query = with_(
        (cte) => ({
          source_data: cte(sourceData),
        }),
        ({ source_data }) =>
          merge(
            {
              into: db.users,
              using: source_data,
              on: (target, source) => target.id["="](source.id),
            },
            [
              {
                whenMatchedThenUpdateSet: (_, source) => ({
                  name: source.name,
                }),
              },
              {
                whenNotMatchedThenInsert: {
                  values: (_, source) => ({
                    id: source.id,
                    name: source.name,
                  }),
                },
              },
            ],
            {
              returning: (target) => ({
                id: target.id,
                name: target.name,
              }),
            },
          ),
      );

      const compiled = query.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'WITH "source_data"("id", "name") AS (VALUES (cast($1 as int4), cast($2 as text)), (cast($3 as int4), cast($4 as text))) MERGE INTO "users" as "users" USING "source_data" as "source_data" ON ("users"."id" = "source_data"."id") WHEN MATCHED THEN UPDATE SET "name" = "source_data"."name" WHEN NOT MATCHED THEN INSERT ("id", "name") VALUES ("source_data"."id", "source_data"."name") RETURNING "users"."id" AS "id", "users"."name" AS "name"',
      );
      expect(result.parameters).toEqual([1, "Updated1", 2, "Updated2"]);
    });
  });
});
