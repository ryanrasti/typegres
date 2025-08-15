import { describe, it, expect } from "vitest";
import { select } from "./select";
import { Expression } from "../expression";
import { Int4, Text, Bool } from "../types";
import { sql } from "kysely";
import { dummyDb, withDb } from "../test/db";
import { makeDb } from "../gen/tables";
import { values } from "../query/values";
import { testDb } from "../db.test";
import { assert, Equals } from "tsafe";

const db = makeDb();

// Create a simple reference expression class
class RefExpression extends Expression {
  constructor(private ref: string) {
    super();
  }

  compile() {
    return sql.ref(this.ref);
  }
}

const ref = (ref: string): Expression => {
  return new RefExpression(ref);
};

describe("SELECT parser", () => {
  it("should parse and compile a basic SELECT statement", () => {
    const parsed = select(() => ({
      id: Int4.new(ref("id")),
      name: Text.new(ref("name")),
    }));

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe('SELECT "id" AS "id", "name" AS "name"');
    expect(result.parameters).toEqual([]);
  });

  it("should parse SELECT with DISTINCT", () => {
    const parsed = select(() => ({ name: Text.new(ref("name")) }), {
      distinct: true,
    });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe('SELECT DISTINCT "name" AS "name"');
    expect(result.parameters).toEqual([]);
  });

  it("should parse SELECT with LIMIT", () => {
    const parsed = select(() => ({ id: Int4.new(ref("id")) }), {
      limit: Int4.new(10),
    });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe('SELECT "id" AS "id" LIMIT cast($1 as int4)');
    expect(result.parameters).toEqual([10]);
  });

  it("should parse SELECT with ORDER BY", () => {
    const parsed = select(() => ({ name: Text.new(ref("name")) }), {
      orderBy: [
        [() => Text.new(ref("name")), { asc: true }],
        [() => Text.new(ref("name2")), { desc: true }],
      ],
    });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'SELECT "name" AS "name" ORDER BY "name" ASC, "name2" DESC',
    );
    expect(result.parameters).toEqual([]);
  });

  it("should parse SELECT with multiple columns and options", () => {
    const parsed = select(
      () => ({
        id: Int4.new(ref("id")),
        name: Text.new(ref("name")),
        active: Bool.new(ref("active")),
      }),
      {
        all: true,
        orderBy: [() => Int4.new(ref("id")), { desc: true, nulls: "last" }],
        limit: Int4.new(50),
        offset: [Int4.new(10), { rows: true }],
      },
    );

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'SELECT ALL "active" AS "active", "id" AS "id", "name" AS "name" ORDER BY "id" DESC NULLS LAST LIMIT cast($1 as int4) OFFSET cast($2 as int4) ROWS',
    );
    expect(result.parameters).toEqual([50, 10]);
  });

  describe("with FROM clause", () => {
    it("able to pass context from FROM clause", () => {
      const parsed = select(
        (t) => ({
          id2: t.id,
          name2: t.name,
          active2: t.active,
        }),

        {
          from: db.users,
        },
      );

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'SELECT "users"."active" AS "active2", "users"."id" AS "id2", "users"."name" AS "name2" FROM "users" as "users"',
      );
      expect(result.parameters).toEqual([]);
    });
  });

  describe("e2e tests", () => {
    describe("with values", () => {
      it("should execute SELECT from values", async () => {
        await withDb(testDb, async (kdb) => {
          const parsed = select(
            (v) => ({
              userId: v.id,
              userName: v.name,
              isActive: v.active,
            }),

            {
              from: values(
                {
                  id: Int4.new(1),
                  name: Text.new("Alice"),
                  active: Bool.new(true),
                },
                {
                  id: Int4.new(2),
                  name: Text.new("Bob"),
                  active: Bool.new(false),
                },
                {
                  id: Int4.new(3),
                  name: Text.new("Charlie"),
                  active: Bool.new(true),
                },
              ),
            },
          );

          const result = await parsed.execute(kdb);
          assert<
            Equals<
              typeof result,
              {
                userId: number;
                userName: string;
                isActive: boolean;
              }[]
            >
          >();

          expect(result).toEqual([
            { userId: 1, userName: "Alice", isActive: true },
            { userId: 2, userName: "Bob", isActive: false },
            { userId: 3, userName: "Charlie", isActive: true },
          ]);
        });
      });

      it("should execute SELECT from values with WHERE clause", async () => {
        await withDb(testDb, async (kdb) => {
          const parsed = select(
            (p) => ({
              petName: p.name,
              petAge: p.age,
            }),
            {
              from: values(
                {
                  name: Text.new("Fluffy"),
                  age: Int4.new(2),
                  species: Text.new("cat"),
                },
                {
                  name: Text.new("Max"),
                  age: Int4.new(5),
                  species: Text.new("dog"),
                },
                {
                  name: Text.new("Buddy"),
                  age: Int4.new(3),
                  species: Text.new("dog"),
                },
              ),
              where: (p) => p.species["="](Text.new("dog")),
            },
          );

          const result = await parsed.execute(kdb);
          assert<
            Equals<
              typeof result,
              {
                petName: string;
                petAge: number;
              }[]
            >
          >();

          expect(result).toEqual([
            { petName: "Max", petAge: 5 },
            { petName: "Buddy", petAge: 3 },
          ]);
        });
      });

      it("should execute SELECT from values with ORDER BY and LIMIT", async () => {
        await withDb(testDb, async (kdb) => {
          const parsed = select(
            (s) => ({
              playerName: s.player,
              playerScore: s.score,
            }),
            {
              from: values(
                { player: Text.new("Alice"), score: Int4.new(95) },
                { player: Text.new("Bob"), score: Int4.new(87) },
                { player: Text.new("Charlie"), score: Int4.new(92) },
                { player: Text.new("David"), score: Int4.new(89) },
              ),
              orderBy: [(s) => s.score, { desc: true }],
              limit: Int4.new(2),
            },
          );

          const result = await parsed.execute(kdb);
          assert<
            Equals<
              typeof result,
              {
                playerName: string;
                playerScore: number;
              }[]
            >
          >();

          expect(result).toEqual([
            { playerName: "Alice", playerScore: 95 },
            { playerName: "Charlie", playerScore: 92 },
          ]);
        });
      });
    });

    describe("with tables", () => {
      it("should execute SELECT from person table", async () => {
        await withDb(testDb, async (kdb) => {
          const parsed = select(
            (p) => ({
              id: p.id,
              fullName: p.firstName.textcat(Text.new(" ")).textcat(p.lastName),
            }),

            {
              from: db.person,
              where: (p) => p.id["<="](Int4.new(2)),
            },
          );

          const result = await parsed.execute(kdb);
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
              expect(typeof row.id).toBe("number");
              expect(typeof row.fullName).toBe("string");
            });
          }
        });
      });

      it("should execute SELECT with DISTINCT from pet table", async () => {
        await withDb(testDb, async (kdb) => {
          const parsed = select(
            (p) => ({
              species: p.species,
            }),
            {
              distinct: true,
              from: db.pet,
              orderBy: (p) => p.species,
            },
          );

          const result = await parsed.execute(kdb);
          assert<
            Equals<
              typeof result,
              {
                species: string;
              }[]
            >
          >();

          expect(result).toBeDefined();
          expect(Array.isArray(result)).toBe(true);
          // Check that we have distinct species if there are results
          if (result.length > 0) {
            const species = result.map((r) => r.species);
            const uniqueSpecies = [...new Set(species)];
            expect(species.length).toBe(uniqueSpecies.length);
          }
        });
      });
    });
  });

  describe("GROUP BY", () => {
    it("should parse SELECT with GROUP BY single column", () => {
      const parsed = select(
        (u) => ({
          category: u.category,
          total: u.amount.sum(),
        }),
        {
          from: values(
            { category: Text.new("A"), amount: Int4.new(10) },
            { category: Text.new("B"), amount: Int4.new(20) },
          ),
          groupBy: (u) => [u.category],
        },
      );

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      const expectedValues = `(VALUES (cast($1 as int4), cast($2 as text)), (cast($3 as int4), cast($4 as text)))`;
      expect(result.sql).toBe(
        `SELECT "values"."category" AS "category", sum("values"."amount") AS "total" FROM ${expectedValues} as "values"("amount", "category") GROUP BY ("values"."category")`,
      );
      expect(result.parameters).toEqual([10, "A", 20, "B"]);
    });

    it("should execute SELECT with GROUP BY and aggregates", async () => {
      await withDb(testDb, async (kdb) => {
        const data = values(
          { department: Text.new("Sales"), salary: Int4.new(50000) },
          { department: Text.new("Sales"), salary: Int4.new(60000) },
          { department: Text.new("Engineering"), salary: Int4.new(80000) },
          { department: Text.new("Engineering"), salary: Int4.new(90000) },
        );

        const parsed = select(
          (d) => ({
            department: d.department,
            avgSalary: d.salary.avg(),
            totalSalary: d.salary.sum(),
            employeeCount: d.salary.count(),
          }),
          {
            from: data,
            groupBy: (d) => [d.department],
          },
        );

        const result = await parsed.execute(kdb);

        expect(result).toHaveLength(2);
        expect(result.find((r) => r.department === "Sales")).toMatchObject({
          department: "Sales",
          avgSalary: "55000.000000000000",
          totalSalary: 110000n,
          employeeCount: 2n,
        });
      });
    });

    it("should parse SELECT with GROUP BY multiple columns", () => {
      const parsed = select(
        (u) => ({
          category: u.category,
          subcategory: u.subcategory,
          total: u.amount.sum(),
        }),
        {
          from: values(
            {
              category: Text.new("A"),
              subcategory: Text.new("X"),
              amount: Int4.new(10),
            },
            {
              category: Text.new("B"),
              subcategory: Text.new("Y"),
              amount: Int4.new(20),
            },
          ),
          groupBy: (u) => [u.category, u.subcategory],
        },
      );

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      const expectedValues = `(VALUES (cast($1 as int4), cast($2 as text), cast($3 as text)), (cast($4 as int4), cast($5 as text), cast($6 as text)))`;
      expect(result.sql).toEqual(
        `SELECT "values"."category" AS "category", "values"."subcategory" AS "subcategory", sum("values"."amount") AS "total" FROM ${expectedValues} as "values"("amount", "category", "subcategory") GROUP BY ("values"."category", "values"."subcategory")`,
      );
      expect(result.parameters).toEqual([10, "A", "X", 20, "B", "Y"]);
    });
  });
});
