import { describe, it, expect } from "vitest";
import { update } from "./update";
import { Int4, Text } from "../types";
import { dummyDb, withDb } from "../test/db";
import * as db from "../gen/tables";
import { testDb } from "../db.test";
import { assert, Equals } from "tsafe";

describe("UPDATE parser", () => {
  it("should parse and compile a basic UPDATE statement", () => {
    const parsed = update(db.Users, {
      set: () => ({ name: Text.new("John") }),
    });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'UPDATE "users" as "users" SET "name" = cast($1 as text)',
    );
    expect(result.parameters).toEqual(["John"]);
  });

  it("should parse UPDATE with ONLY", () => {
    const parsed = update(
      db.Users,
      {
        set: () => ({ role: Text.new("active") }),
      },
      { only: true },
    );

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'UPDATE ONLY "users" as "users" SET "role" = cast($1 as text)',
    );
    expect(result.parameters).toEqual(["active"]);
  });

  it("should parse UPDATE with WHERE clause", () => {
    const parsed = update(db.Users, {
      set: () => ({ name: Text.new("Jane") }),
      where: (updateRow) => updateRow.id["="](Int4.new(1)),
    });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'UPDATE "users" as "users" SET "name" = cast($1 as text) WHERE ("users"."id" = cast($2 as int4))',
    );
    expect(result.parameters).toEqual(["Jane", 1]);
  });

  it("should parse UPDATE with RETURNING clause", () => {
    const parsed = update(db.Users, {
      set: () => ({ email: Text.new("updated@example.com") }),
      returning: (updateRow) => ({ id: updateRow.id, name: updateRow.name }),
    });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'UPDATE "users" as "users" SET "email" = cast($1 as text) RETURNING "users"."id" AS "id", "users"."name" AS "name"',
    );
    expect(result.parameters).toEqual(["updated@example.com"]);
  });

  it("should parse UPDATE with multiple SET assignments", () => {
    const parsed = update(db.Users, {
      set: () => ({
        name: Text.new("John Doe"),
        email: Text.new("john@example.com"),
        age: Int4.new(30),
      }),
    });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'UPDATE "users" as "users" SET "name" = cast($1 as text), "email" = cast($2 as text), "age" = cast($3 as int4)',
    );
    expect(result.parameters).toEqual(["John Doe", "john@example.com", 30]);
  });

  it("should parse UPDATE with all features combined", () => {
    const parsed = update(
      db.Users,
      {
        set: () => ({
          email: Text.new("updated@example.com"),
          active: Int4.new(1),
        }),
        where: (u) => u.active["="](1).and(u.role["="]("admin")),
        returning: (u) => ({ id: u.id, email: u.email }),
      },
      { only: true },
    );

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'UPDATE ONLY "users" as "users" SET "email" = cast($1 as text), "active" = cast($2 as int4) WHERE (("users"."active" = $3) AND ("users"."role" = $4)) RETURNING "users"."id" AS "id", "users"."email" AS "email"',
    );
    expect(result.parameters).toEqual(["updated@example.com", 1, 1, "admin"]);
  });

  describe("with FROM clause", () => {
    it("should parse UPDATE with FROM joining another table", () => {
      const parsed = update(db.Users, {
        set: () => ({ role: Text.new("inactive") }),
        from: db.Person,
        where: (updateRow, fromRow) => updateRow.name["="](fromRow.firstName),
      });

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toContain("UPDATE");
      expect(result.sql).toContain("FROM");
      expect(result.sql).toContain("WHERE");
    });

    it("should parse UPDATE with FROM table (two tables)", () => {
      // Simple UPDATE with FROM - two tables
      const parsed = update(db.Pet, {
        set: () => ({ age: Int4.new(10) }),
        from: db.Person,
        where: (petRow, personRow) =>
          petRow.ownerId["="](personRow.id).and(
            personRow.firstName["="](Text.new("John")),
          ),
        returning: (petRow, personRow) => ({
          petId: petRow.id,
          petName: petRow.name,
          petAge: petRow.age,
          ownerName: personRow.firstName,
        }),
      });

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toContain("UPDATE");
      expect(result.sql).toContain("FROM");
      expect(result.sql).toContain("WHERE");
      expect(result.sql).toContain("RETURNING");

      // Check that both tables are referenced
      expect(result.sql).toContain('"pet"');
      expect(result.sql).toContain('"person"');
    });

    it("should parse UPDATE with FROM joined table (true 3 tables)", () => {
      // Create a FROM item with joined table
      const usersJoinComments = db.Users.join(db.Comments, "c", (u, { c }) =>
        u.id["="](c.user_id),
      );

      const parsed = update(db.Posts, {
        set: () => ({ published: Int4.new(1) }),
        from: usersJoinComments,
        where: (postRow, userRow, joins) =>
          postRow.user_id["="](userRow.id)
            .and(userRow.name["="](Text.new("Alice")))
            .and(joins.c.post_id["="](postRow.id))
            .and(joins.c.content.like(Text.new("%approve%"))),
        returning: (postRow, userRow, joins) => ({
          postId: postRow.id,
          postTitle: postRow.title,
          published: postRow.published,
          userName: userRow.name,
          commentContent: joins.c.content,
        }),
      });

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      // Verify the SQL contains all expected parts
      expect(result.sql).toContain("UPDATE");
      expect(result.sql).toContain("FROM");
      expect(result.sql).toContain("JOIN");
      expect(result.sql).toContain("WHERE");
      expect(result.sql).toContain("RETURNING");

      // Check that all three tables are referenced
      expect(result.sql).toContain('"posts"');
      expect(result.sql).toContain('"users"');
      expect(result.sql).toContain('"comments"');

      // Check for join condition
      expect(result.sql).toContain("ON");
    });
  });

  describe("e2e tests", () => {
    describe("with tables", () => {
      it("should execute UPDATE on person table", async () => {
        await withDb(testDb, async (kdb) => {
          // Insert test data
          await kdb.sql`
            INSERT INTO person ("firstName", "lastName", gender)
            VALUES ('TestFirst', 'TestLast', 'male')
          `.execute();

          const parsed = update(db.Person, {
            set: () => ({ firstName: Text.new("UpdatedFirst") }),
            where: (updateRow) => updateRow.lastName["="](Text.new("TestLast")),
            returning: (updateRow) => ({
              firstName: updateRow.firstName,
              lastName: updateRow.lastName,
            }),
          });

          const result = await parsed.execute(kdb);

          assert<
            Equals<
              typeof result,
              {
                firstName: string;
                lastName: string | null;
              }[]
            >
          >();

          expect(result).toEqual([
            {
              firstName: "UpdatedFirst",
              lastName: "TestLast",
            },
          ]);
        });
      });

      it("should execute UPDATE with multiple conditions", async () => {
        await withDb(testDb, async (kdb) => {
          // Insert test person and pet
          const personResult = await kdb.sql`
            INSERT INTO person ("firstName", "lastName", gender)
            VALUES ('PetOwner', 'TestOwner', 'female')
            RETURNING id
          `.execute();

          const ownerId = Number((personResult[0] as any).id);

          await kdb.sql`
            INSERT INTO pet (name, "ownerId", species, age)
            VALUES ('TestPet', ${ownerId}, 'dog', 3)
          `.execute();

          const parsed = update(db.Pet, {
            set: () => ({
              name: Text.new("UpdatedPet"),
              age: Int4.new(5),
            }),
            where: (updateRow) =>
              updateRow.species["="](Text.new("dog")).and(
                updateRow.ownerId["="](Int4.new(ownerId)),
              ),
            returning: (updateRow) => ({
              name: updateRow.name,
              species: updateRow.species,
              age: updateRow.age,
              ownerId: updateRow.ownerId,
            }),
          });

          const result = await parsed.execute(kdb);

          assert<
            Equals<
              typeof result,
              {
                name: string;
                species: string;
                age: number;
                ownerId: number;
              }[]
            >
          >();

          expect(result).toEqual([
            {
              name: "UpdatedPet",
              species: "dog",
              age: 5,
              ownerId: ownerId,
            },
          ]);
        });
      });

      it("should execute UPDATE with FROM table (simple 3 table relationship) - alias issue", async () => {
        await withDb(testDb, async (kdb) => {
          // Insert test data - person
          const personResult = await kdb.sql`
            INSERT INTO person ("firstName", "lastName", gender)
            VALUES ('Johnny', 'Doe', 'male')
            RETURNING id
          `.execute();

          const personId = Number((personResult[0] as any).id);

          // Insert test data - pet
          await kdb.sql`
            INSERT INTO pet (name, "ownerId", species, age)
            VALUES ('Fluffy', ${personId}, 'cat', 3)
          `.execute();

          // Update pets owned by Johnny
          const parsed = update(db.Pet, {
            set: () => ({ age: Int4.new(10) }),
            from: db.Person,
            where: (petRow, personRow) =>
              petRow.ownerId["="](personRow.id).and(
                personRow.firstName["="]("Johnny"),
              ),
            returning: (petRow, personRow) => ({
              petId: petRow.id,
              petName: petRow.name,
              petAge: petRow.age,
              ownerFirstName: personRow.firstName,
              ownerLastName: personRow.lastName,
            }),
          });

          const result = await parsed.execute(kdb);

          assert<
            Equals<
              typeof result,
              {
                petId: number;
                petName: string;
                petAge: number;
                ownerFirstName: string;
                ownerLastName: string | null;
              }[]
            >
          >();

          expect(result).toHaveLength(1);
          expect(result[0]).toMatchObject({
            petName: "Fluffy",
            petAge: 10,
            ownerFirstName: "Johnny",
            ownerLastName: "Doe",
          });

          // Verify the pet was actually updated
          const verifyResult = await kdb.sql`
            SELECT age FROM pet WHERE "ownerId" = ${personId}
          `.execute();

          expect((verifyResult[0] as any).age).toBe("10");
        });
      });

      it("should execute UPDATE with FROM and proper join (true 3 tables)", async () => {
        await withDb(testDb, async (kdb) => {
          // This test demonstrates the actual 3-table scenario:
          // UPDATE posts, with users in FROM, and accessing comments through joins

          // Insert test data - user
          const userResult = await kdb.sql`
            INSERT INTO users (name, email)
            VALUES ('Alice', 'alice@example.com')
            RETURNING id
          `.execute();

          const userId = Number((userResult[0] as any).id);

          // Insert test data - posts
          const post1Result = await kdb.sql`
            INSERT INTO posts (title, content, user_id, published)
            VALUES ('Post 1', 'Content 1', ${userId}, 0)
            RETURNING id
          `.execute();
          const post1Id = Number((post1Result[0] as any).id);

          const post2Result = await kdb.sql`
            INSERT INTO posts (title, content, user_id, published)
            VALUES ('Post 2', 'Content 2', ${userId}, 0)
            RETURNING id
          `.execute();
          const post2Id = Number((post2Result[0] as any).id);

          // Insert test data - comments
          await kdb.sql`
            INSERT INTO comments (post_id, user_id, content)
            VALUES 
              (${post1Id}, ${userId}, 'Great post!'),
              (${post2Id}, ${userId}, 'I approve this message')
          `.execute();

          // Create a FROM item with joined table
          const usersJoinComments = db.Users.join(
            db.Comments,
            "comment",
            (u, { comment }) => u.id["="](comment.user_id),
          );

          // Update posts where the user has made an approving comment
          const parsed = update(db.Posts, {
            set: () => ({ published: Int4.new(1) }),
            from: usersJoinComments,
            where: (postRow, userRow, joins) =>
              postRow.user_id["="](userRow.id)
                .and(userRow.name["="](Text.new("Alice")))
                .and(joins.comment.post_id["="](postRow.id))
                .and(joins.comment.content.like(Text.new("%approve%"))),
            returning: (postRow, userRow, joins) => ({
              postId: postRow.id,
              postTitle: postRow.title,
              published: postRow.published,
              userName: userRow.name,
              commentContent: joins.comment.content,
            }),
          });

          const result = await parsed.execute(kdb);

          assert<
            Equals<
              typeof result,
              {
                postId: number;
                postTitle: string;
                published: number | null;
                userName: string;
                commentContent: string;
              }[]
            >
          >();

          // Only post2 should be updated because only it has an "approve" comment
          expect(result).toEqual([
            {
              postId: post2Id,
              postTitle: "Post 2",
              published: 1,
              userName: "Alice",
              commentContent: "I approve this message",
            },
          ]);

          // Verify only post 2 was updated
          const verify1 = await kdb.sql`
            SELECT published FROM posts WHERE id = ${post1Id}
          `.execute();
          expect((verify1[0] as any).published).toBe("0");

          const verify2 = await kdb.sql`
            SELECT published FROM posts WHERE id = ${post2Id}
          `.execute();
          expect((verify2[0] as any).published).toBe("1");
        });
      });
    });
  });
});
