import { describe, it, expect } from "vitest";
import { insert } from "./generated/insert";
import { select } from "./generated/select";
import { values } from "../query/values";
import { Int4, Text } from "../types";
import { dummyDb, withDb } from "../test/db";
import { makeDb } from "../gen/tables";
import { testDb } from "../db.test";

const db = makeDb();

describe("INSERT parser", () => {
  it("should parse and compile a basic INSERT statement with SELECT", () => {
    const selectQuery = select(() => ({
      name: Text.new("John"),
      email: Text.new("john@example.com"),
    }));

    const parsed = insert("into", db.users, [["name", "email"]], selectQuery);

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'INSERT INTO "users" as "users" ("name", "email") (SELECT cast($1 as text) AS "name", cast($2 as text) AS "email")',
    );
    expect(result.parameters).toEqual(["John", "john@example.com"]);
  });

  it("should parse INSERT with RETURNING clause", () => {
    const selectQuery = select(() => ({
      name: Text.new("Jane"),
      email: Text.new("jane@example.com"),
    }));

    const parsed = insert("into", db.users, [["name", "email"]], selectQuery, {
      returning: (insertRow) => ({ id: insertRow.id, name: insertRow.name }),
    });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'INSERT INTO "users" as "users" ("name", "email") (SELECT cast($1 as text) AS "name", cast($2 as text) AS "email") RETURNING "users"."id" AS "id", "users"."name" AS "name"',
    );
    expect(result.parameters).toEqual(["Jane", "jane@example.com"]);
  });

  it("should parse INSERT with SELECT FROM another table", () => {
    const selectQuery = select(
      (u) => ({
        name: u.name,
        email: u.email,
      }),
      { from: db.update_test_users },
    );

    const parsed = insert("into", db.users, [["name", "email"]], selectQuery);

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'INSERT INTO "users" as "users" ("name", "email") (SELECT "update_test_users"."name" AS "name", "update_test_users"."email" AS "email" FROM "update_test_users" as "update_test_users")',
    );
    expect(result.parameters).toEqual([]);
  });

  it("should parse INSERT with simple SELECT values", () => {
    const selectQuery = select(() => ({
      name: Text.new("Test"),
      email: Text.new("test@example.com"),
    }));

    const parsed = insert("into", db.users, [["name", "email"]], selectQuery);

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toContain('INSERT INTO "users"');
    expect(result.sql).toContain("SELECT");
    expect(result.parameters).toEqual(["Test", "test@example.com"]);
  });

  it("should parse INSERT with DEFAULT VALUES", () => {
    const parsed = insert("into", db.users, [], "defaultValues");

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe('INSERT INTO "users" as "users" DEFAULT VALUES');
    expect(result.parameters).toEqual([]);
  });

  it("should parse INSERT with OVERRIDING SYSTEM VALUE", () => {
    const selectQuery = select(() => ({
      id: Int4.new(999),
      name: Text.new("Override User"),
      email: Text.new("override@example.com"),
    }));

    const parsed = insert(
      "into",
      db.users,
      [["id", "name", "email"]],
      selectQuery,
      { overriding: ["system", "value"] },
    );

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'INSERT INTO "users" as "users" ("id", "name", "email") OVERRIDING SYSTEM VALUE (SELECT cast($1 as int4) AS "id", cast($2 as text) AS "name", cast($3 as text) AS "email")',
    );
    expect(result.parameters).toEqual([
      999,
      "Override User",
      "override@example.com",
    ]);
  });

  describe("e2e tests", () => {
    describe("with tables", () => {
      it("should execute INSERT on person table", async () => {
        await withDb(testDb, async (kdb) => {
          const selectQuery = select(() => ({
            firstName: Text.new("InsertTest"),
            lastName: Text.new("User"),
            gender: Text.new("female"),
          }));

          const parsed = insert(
            "into",
            db.person,
            [["firstName", "lastName", "gender"]],
            selectQuery,
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

          const parsed = insert(
            "into",
            db.person,
            [["firstName", "lastName", "gender"]],
            selectQuery,
            {
              returning: (insertRow) => ({
                id: insertRow.id,
                firstName: insertRow.firstName,
              }),
            },
          );

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

          const parsed = insert(
            "into",
            db.pet,
            [["name", "ownerId", "species", "age"]],
            selectQuery,
            {
              returning: (insertRow) => ({
                id: insertRow.id,
                name: insertRow.name,
                species: insertRow.species,
                ownerId: insertRow.ownerId,
              }),
            },
          );

          const result = await parsed.execute(kdb);

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
            "into",
            db.posts,
            [["title", "content", "user_id", "published"]],
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
              from: db.update_test_users,
              where: (u) => u.name["="](Text.new(`CopyUser1_${timestamp}`)),
            },
          );

          const parsed = insert(
            "into",
            db.users,
            [["name", "email"]],
            selectQuery,
            {
              returning: (insertRow) => ({
                id: insertRow.id,
                name: insertRow.name,
                email: insertRow.email,
              }),
            },
          );

          const result = await parsed.execute(kdb);

          expect(result).toHaveLength(1);
          expect(result[0].name).toBe(`CopyUser1_${timestamp}`);
          expect(result[0].email).toBe(`copy1_${timestamp}@example.com`);
          expect(result[0].id).toBeDefined();
        });
      });
    });
  });
});
