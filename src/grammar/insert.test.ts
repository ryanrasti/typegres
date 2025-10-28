import { assert, Equals } from "tsafe";
import { describe, expect, it } from "vitest";
import { testDb } from "../db.test";
import * as db from "../gen/tables";
import { values } from "../query/values";
import { dummyDb, withDb } from "../test/db";
import { Int4, Text } from "../types";
import { insert } from "./insert";
import { Select, select } from "./select";

describe("INSERT parser", () => {
  it("should parse and compile a basic INSERT statement with SELECT", () => {
    const selectQuery = select(() => ({
      name: Text.new("John"),
      email: Text.new("john@example.com"),
    }));

    const parsed = insert({ into: db.Users }, selectQuery);

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'INSERT INTO "users" ("email", "name") (SELECT cast($1 as text) AS "email", cast($2 as text) AS "name")',
    );
    expect(result.parameters).toEqual(["john@example.com", "John"]);
  });

  it("should parse and compile a basic INSERT statement with VALUES", () => {
    const parsed = insert(
      { into: db.Users },
      values(
        { name: Text.new("John"), email: Text.new("john@example.com") },
        { name: Text.new("Jane"), email: Text.new("jane@example.com") },
      ),
    );

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'INSERT INTO "users" ("email", "name") (VALUES (cast($1 as text), cast($2 as text)), (cast($3 as text), cast($4 as text)))',
    );
    expect(result.parameters).toEqual(["john@example.com", "John", "jane@example.com", "Jane"]);
  });

  it("should parse INSERT with RETURNING clause", () => {
    const selectQuery = select(() => ({
      name: Text.new("Jane"),
      email: Text.new("jane@example.com"),
    }));

    const parsed = insert({ into: db.Users }, selectQuery, {
      returning: (insertRow) => ({ id: insertRow.id, name: insertRow.name }),
    });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'INSERT INTO "users" ("email", "name") (SELECT cast($1 as text) AS "email", cast($2 as text) AS "name") RETURNING "users"."id" AS "id", "users"."name" AS "name"',
    );
    expect(result.parameters).toEqual(["jane@example.com", "Jane"]);
  });

  it("should parse INSERT with SELECT FROM another table", () => {
    const selectQuery = select(
      (u) => ({
        name: u.name,
        email: u.email,
      }),
      { from: db.UpdateTestUsers },
    );

    const parsed = insert({ into: db.Users }, selectQuery);

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'INSERT INTO "users" ("email", "name") (SELECT "update_test_users"."email" AS "email", "update_test_users"."name" AS "name" FROM "update_test_users" as "update_test_users")',
    );
    expect(result.parameters).toEqual([]);
  });

  it("should parse INSERT with simple SELECT values", () => {
    const selectQuery = select(() => ({
      name: Text.new("Test"),
      email: Text.new("test@example.com"),
    }));

    const parsed = insert({ into: db.Users }, selectQuery);

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toContain('INSERT INTO "users"');
    expect(result.sql).toContain("SELECT");
    expect(result.parameters).toEqual(["test@example.com", "Test"]);
  });

  it("should parse INSERT with DEFAULT VALUES", () => {
    const parsed = insert({ into: db.Users }, "defaultValues");

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe('INSERT INTO "users" DEFAULT VALUES');
    expect(result.parameters).toEqual([]);
  });

  it("should parse INSERT with OVERRIDING SYSTEM VALUE", () => {
    const insufficientSelectQuery = select(() => ({
      id: Int4.new(999),
    }));

    const selectQuery = select(() => ({
      id: Int4.new(999),
      name: Text.new("Override User"),
      email: Text.new("override@example.com"),
    }));
    selectQuery satisfies Select<{ id: Int4<1>; email: Text<1> }, any, any>;

    // This should error at compile time due to missing required columns:
    insert(
      {
        into: db.Users,
        overriding: ["system", "value"],
      },
      // @ts-expect-error - missing required columns:
      insufficientSelectQuery,
    );

    const parsed = insert(
      {
        into: db.Users,
        overriding: ["system", "value"],
      },
      selectQuery,
    );

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'INSERT INTO "users" ("email", "id", "name") OVERRIDING SYSTEM VALUE (SELECT cast($1 as text) AS "email", cast($2 as int4) AS "id", cast($3 as text) AS "name")',
    );
    expect(result.parameters).toEqual(["override@example.com", 999, "Override User"]);
  });

  describe("e2e tests", () => {
    describe("with tables", () => {
      it("should execute INSERT on person table", async () => {
        await withDb(testDb, async (kdb) => {
          const parsed = insert(
            { into: db.Person },
            values({
              firstName: Text.new("InsertTest"),
              lastName: Text.new("User"),
              gender: Text.new("female"),
            }),
            {
              returning: (insertRow) => ({
                id: insertRow.id,
                firstName: insertRow.firstName,
                lastName: insertRow.lastName,
              }),
            },
          );

          const result = await parsed.execute(kdb);

          expect(result).toHaveLength(1);
          expect(result[0]).toMatchObject({
            firstName: "InsertTest",
            lastName: "User",
          });
          expect(result[0].id).toBeDefined();
        });
      });

      it("should execute INSERT with multiple rows", async () => {
        await withDb(testDb, async (kdb) => {
          const selectQuery = select(
            (v) => ({
              firstName: v.firstName,
              lastName: v.lastName,
              gender: v.gender,
            }),

            {
              from: values(
                {
                  firstName: Text.new("Person1"),
                  lastName: Text.new("Test1"),
                  gender: Text.new("male"),
                },
                {
                  firstName: Text.new("Person2"),
                  lastName: Text.new("Test2"),
                  gender: Text.new("female"),
                },
                {
                  firstName: Text.new("Person3"),
                  lastName: Text.new("Test3"),
                  gender: Text.new("male"),
                },
              ),
            },
          );

          const parsed = insert({ into: db.Person }, selectQuery, {
            returning: (insertRow) => ({
              id: insertRow.id,
              firstName: insertRow.firstName,
            }),
          });

          const result = await parsed.execute(kdb);

          expect(result).toHaveLength(3);
          expect(result[0].firstName).toBe("Person1");
          expect(result[1].firstName).toBe("Person2");
          expect(result[2].firstName).toBe("Person3");
          result.forEach((row) => {
            expect(row.id).toBeDefined();
          });
        });
      });

      it("should execute INSERT on pet table with foreign key", async () => {
        await withDb(testDb, async (kdb) => {
          // First insert a person to be the owner
          const personResult = await kdb.sql`
            INSERT INTO person ("firstName", "lastName", gender)
            VALUES ('PetOwner', 'ForInsert', 'male')
            RETURNING id
          `.execute();

          const ownerId = Number((personResult[0] as any).id);

          const selectQuery = select(() => ({
            name: Text.new("InsertedPet"),
            ownerId: Int4.new(ownerId),
            species: Text.new("bird"),
            age: Int4.new(2),
          }));

          const parsed = insert({ into: db.Pet }, selectQuery, {
            returning: (insertRow) => ({
              id: insertRow.id,
              name: insertRow.name,
              species: insertRow.species,
              ownerId: insertRow.ownerId,
            }),
          });

          const result = await parsed.execute(kdb);

          assert<
            Equals<
              typeof result,
              {
                id: number;
                name: string;
                species: string;
                ownerId: number;
              }[]
            >
          >();

          expect(result).toHaveLength(1);
          expect(result[0]).toMatchObject({
            name: "InsertedPet",
            species: "bird",
            ownerId: ownerId,
          });
          expect(result[0].id).toBeDefined();
        });
      });

      it("should execute INSERT on posts table", async () => {
        await withDb(testDb, async (kdb) => {
          // First insert a user
          const userResult = await kdb.sql`
            INSERT INTO users (name, email)
            VALUES ('PostAuthor', 'author@example.com')
            RETURNING id
          `.execute();

          const userId = Number((userResult[0] as any).id);

          const selectQuery = select(() => ({
            title: Text.new("Inserted Post"),
            content: Text.new("This is the content of the inserted post"),
            user_id: Int4.new(userId),
            published: Int4.new(0),
          }));

          const parsed = insert(
            {
              into: db.Posts,
            },
            selectQuery,
            {
              returning: (insertRow) => ({
                id: insertRow.id,
                title: insertRow.title,
                user_id: insertRow.user_id,
              }),
            },
          );

          const result = await parsed.execute(kdb);

          assert<
            Equals<
              typeof result,
              {
                id: number;
                title: string;
                user_id: number;
              }[]
            >
          >();

          expect(result).toHaveLength(1);
          expect(result[0]).toMatchObject({
            title: "Inserted Post",
            user_id: userId,
          });
          expect(result[0].id).toBeDefined();
        });
      });

      it("should execute INSERT with SELECT FROM existing table", async () => {
        await withDb(testDb, async (kdb) => {
          // Use unique test data to avoid conflicts
          const timestamp = Date.now();

          // Create some source data with unique identifiers
          await kdb.sql`
            INSERT INTO update_test_users (name, email, active)
            VALUES (${`CopyUser1_${timestamp}`}, ${`copy1_${timestamp}@example.com`}, 1),
                   (${`CopyUser2_${timestamp}`}, ${`copy2_${timestamp}@example.com`}, 0)
          `.execute();

          const selectQuery = select(
            (u) => ({
              name: u.name,
              email: u.email,
            }),
            {
              from: db.UpdateTestUsers,
              where: (u) => u.name["="](Text.new(`CopyUser1_${timestamp}`)),
            },
          );

          const parsed = insert({ into: db.Users }, selectQuery, {
            returning: (insertRow) => ({
              id: insertRow.id,
              name: insertRow.name,
              email: insertRow.email,
            }),
          });

          const result = await parsed.execute(kdb);

          expect(result).toHaveLength(1);
          expect(result[0].name).toBe(`CopyUser1_${timestamp}`);
          expect(result[0].email).toBe(`copy1_${timestamp}@example.com`);
          expect(result[0].id).toBeDefined();
        });
      });
    });
  });

  describe("INSERT fluent API", () => {
    describe("Basic fluent API", () => {
      it("should support insert with default values", () => {
        const query = insert({ into: db.Users });

        const compiled = query.compile();
        const result = compiled.compile(dummyDb);

        expect(result.sql).toBe('INSERT INTO "users" DEFAULT VALUES');
        expect(result.parameters).toEqual([]);
      });

      it("should support adding values after construction", () => {
        const query = insert({ into: db.Users }).values(
          values({
            name: Text.new("John"),
            email: Text.new("john@example.com"),
          }),
        );

        const compiled = query.compile();
        const result = compiled.compile(dummyDb);

        expect(result.sql).toBe('INSERT INTO "users" ("email", "name") (VALUES (cast($1 as text), cast($2 as text)))');
        expect(result.parameters).toEqual(["john@example.com", "John"]);
      });

      it("should support adding SELECT as values", () => {
        const query = insert({ into: db.Users }).values(
          select(() => ({
            name: Text.new("John"),
            email: Text.new("john@example.com"),
          })),
        );

        const compiled = query.compile();
        const result = compiled.compile(dummyDb);

        expect(result.sql).toBe(
          'INSERT INTO "users" ("email", "name") (SELECT cast($1 as text) AS "email", cast($2 as text) AS "name")',
        );
        expect(result.parameters).toEqual(["john@example.com", "John"]);
      });

      it("should support returning clause with entire row", () => {
        const query = insert({ into: db.Users })
          .values(
            values({
              name: Text.new("John"),
              email: Text.new("john@example.com"),
            }),
          )
          .returning((row) => row);

        const compiled = query.compile();
        const result = compiled.compile(dummyDb);

        expect(result.sql).toBe(
          'INSERT INTO "users" ("email", "name") (VALUES (cast($1 as text), cast($2 as text))) RETURNING "users"."active" AS "active", "users"."email" AS "email", "users"."id" AS "id", "users"."name" AS "name", "users"."role" AS "role"',
        );
        expect(result.parameters).toEqual(["john@example.com", "John"]);
      });

      it("should support returning clause with custom selection", () => {
        const query = insert({ into: db.Users })
          .values(
            values({
              name: Text.new("John"),
              email: Text.new("john@example.com"),
            }),
          )
          .returning((row) => ({ id: row.id, name: row.name }));

        const compiled = query.compile();
        const result = compiled.compile(dummyDb);

        expect(result.sql).toBe(
          'INSERT INTO "users" ("email", "name") (VALUES (cast($1 as text), cast($2 as text))) RETURNING "users"."id" AS "id", "users"."name" AS "name"',
        );
        expect(result.parameters).toEqual(["john@example.com", "John"]);
      });

      it("should support onConflict clause", () => {
        const query = insert({ into: db.Users })
          .values(
            values({
              name: Text.new("John"),
              email: Text.new("john@example.com"),
            }),
          )
          .onConflict({ doNothing: true });

        const compiled = query.compile();
        const result = compiled.compile(dummyDb);

        expect(result.sql).toBe(
          'INSERT INTO "users" ("email", "name") (VALUES (cast($1 as text), cast($2 as text))) ON CONFLICT DO NOTHING',
        );
        expect(result.parameters).toEqual(["john@example.com", "John"]);
      });
    });

    describe("Method chaining order independence", () => {
      it("should work with values -> returning -> onConflict", () => {
        const query = insert({ into: db.Users })
          .values(values({ name: Text.new("John"), email: Text.new("john@example.com") }))
          .returning((row) => ({ id: row.id }))
          .onConflict({ doNothing: true });

        const result = query.compile().compile(dummyDb);
        expect(result.sql).toBe(
          'INSERT INTO "users" ("email", "name") (VALUES (cast($1 as text), cast($2 as text))) ON CONFLICT DO NOTHING RETURNING "users"."id" AS "id"',
        );
        expect(result.parameters).toEqual(["john@example.com", "John"]);
      });

      it("should work with onConflict -> values -> returning", () => {
        const query = insert({ into: db.Users })
          .onConflict({ doNothing: true })
          .values(values({ name: Text.new("John"), email: Text.new("john@example.com") }))
          .returning((row) => ({ id: row.id }));

        const result = query.compile().compile(dummyDb);
        expect(result.sql).toBe(
          'INSERT INTO "users" ("email", "name") (VALUES (cast($1 as text), cast($2 as text))) ON CONFLICT DO NOTHING RETURNING "users"."id" AS "id"',
        );
        expect(result.parameters).toEqual(["john@example.com", "John"]);
      });

      it("should work with returning -> onConflict -> values", () => {
        const query = insert({ into: db.Users })
          .returning((row) => ({ id: row.id }))
          .onConflict({ doNothing: true })
          .values(values({ name: Text.new("John"), email: Text.new("john@example.com") }));

        const result = query.compile().compile(dummyDb);
        expect(result.sql).toBe(
          'INSERT INTO "users" ("email", "name") (VALUES (cast($1 as text), cast($2 as text))) ON CONFLICT DO NOTHING RETURNING "users"."id" AS "id"',
        );
        expect(result.parameters).toEqual(["john@example.com", "John"]);
      });
    });

    describe("Latest value wins", () => {
      it("should use the latest values", () => {
        const query = insert({ into: db.Users })
          .values(values({ name: Text.new("John"), email: Text.new("john@example.com") }))
          .values(values({ name: Text.new("Jane"), email: Text.new("jane@example.com") }));

        const result = query.compile().compile(dummyDb);
        expect(result.sql).toBe('INSERT INTO "users" ("email", "name") (VALUES (cast($1 as text), cast($2 as text)))');
        expect(result.parameters).toEqual(["jane@example.com", "Jane"]);
      });

      it("should use the latest returning", () => {
        const query = insert({ into: db.Users })
          .values(values({ name: Text.new("John"), email: Text.new("john@example.com") }))
          .returning((row) => ({ id: row.id }))
          .returning((row) => ({ name: row.name }));

        const result = query.compile().compile(dummyDb);
        expect(result.sql).toBe(
          'INSERT INTO "users" ("email", "name") (VALUES (cast($1 as text), cast($2 as text))) RETURNING "users"."name" AS "name"',
        );
        expect(result.parameters).toEqual(["john@example.com", "John"]);
      });

      it("should use the latest onConflict", () => {
        const query = insert({ into: db.Users })
          .values(values({ name: Text.new("John"), email: Text.new("john@example.com") }))
          .onConflict({ doNothing: true })
          .onConflict({
            target: (row) => row.email,
            doUpdateSet: (_, excluded) => ({ name: excluded.name }),
          });

        const result = query.compile().compile(dummyDb);
        expect(result.sql).toBe(
          'INSERT INTO "users" ("email", "name") (VALUES (cast($1 as text), cast($2 as text))) ON CONFLICT ("email") DO UPDATE SET "name" = "excluded"."name"',
        );
        expect(result.parameters).toEqual(["john@example.com", "John"]);
      });
    });

    describe("Complex scenarios", () => {
      it("should support VALUES with multiple rows and returning", () => {
        const query = insert({ into: db.Users })
          .values(
            values(
              { name: Text.new("John"), email: Text.new("john@example.com") },
              { name: Text.new("Jane"), email: Text.new("jane@example.com") },
            ),
          )
          .returning((row) => ({ id: row.id, name: row.name }));

        const result = query.compile().compile(dummyDb);
        expect(result.sql).toBe(
          'INSERT INTO "users" ("email", "name") (VALUES (cast($1 as text), cast($2 as text)), (cast($3 as text), cast($4 as text))) RETURNING "users"."id" AS "id", "users"."name" AS "name"',
        );
        expect(result.parameters).toEqual(["john@example.com", "John", "jane@example.com", "Jane"]);
      });

      it("should support SELECT with WHERE and returning", () => {
        const query = insert({ into: db.Users })
          .values(
            select((u) => ({ name: u.name, email: u.email }), {
              from: db.UpdateTestUsers,
              where: (u) => u.active["="](Int4.new(1)),
            }),
          )
          .returning((row) => row);

        const result = query.compile().compile(dummyDb);
        expect(result.sql).toBe(
          'INSERT INTO "users" ("email", "name") (SELECT "update_test_users"."email" AS "email", "update_test_users"."name" AS "name" FROM "update_test_users" as "update_test_users" WHERE ("update_test_users"."active" = cast($1 as int4))) RETURNING "users"."active" AS "active", "users"."email" AS "email", "users"."id" AS "id", "users"."name" AS "name", "users"."role" AS "role"',
        );
        expect(result.parameters).toEqual([1]);
      });

      it("should support onConflict with DO UPDATE and WHERE", () => {
        const query = insert({ into: db.Users })
          .values(values({ name: Text.new("John"), email: Text.new("john@example.com") }))
          .onConflict({
            target: (row) => row.email,
            doUpdateSet: [(_, excluded) => ({ name: excluded.name }), { where: (row) => row.active["="](Int4.new(1)) }],
          })
          .returning((row) => ({ id: row.id, name: row.name }));

        const result = query.compile().compile(dummyDb);
        expect(result.sql).toBe(
          'INSERT INTO "users" ("email", "name") (VALUES (cast($1 as text), cast($2 as text))) ON CONFLICT ("email") DO UPDATE SET "name" = "excluded"."name" WHERE ("users"."active" = cast($3 as int4)) RETURNING "users"."id" AS "id", "users"."name" AS "name"',
        );
        expect(result.parameters).toEqual(["john@example.com", "John", 1]);
      });

      it("should switch from default values to explicit values", () => {
        const query1 = insert({ into: db.Users });
        const query2 = query1.values(values({ name: Text.new("John"), email: Text.new("john@example.com") }));

        const result1 = query1.compile().compile(dummyDb);
        const result2 = query2.compile().compile(dummyDb);

        expect(result1.sql).toBe('INSERT INTO "users" DEFAULT VALUES');
        expect(result2.sql).toBe('INSERT INTO "users" ("email", "name") (VALUES (cast($1 as text), cast($2 as text)))');
        expect(result2.parameters).toEqual(["john@example.com", "John"]);
      });

      it("should switch from explicit values back to default values", () => {
        const query = insert({ into: db.Users })
          .values(values({ name: Text.new("John"), email: Text.new("john@example.com") }))
          .values("defaultValues");

        const result = query.compile().compile(dummyDb);
        expect(result.sql).toBe('INSERT INTO "users" DEFAULT VALUES');
        expect(result.parameters).toEqual([]);
      });
    });
  });
});
