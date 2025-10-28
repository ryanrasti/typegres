import { assert, Equals } from "tsafe";
import { describe, expect, it } from "vitest";
import { testDb } from "../db.test";
import * as db from "../gen/tables";
import { dummyDb, withDb } from "../test/db";
import { Int4, Text } from "../types";
import { update } from "./update";

describe("UPDATE parser", () => {
  it("should parse and compile a basic UPDATE statement", () => {
    const parsed = update(db.Users, {
      set: () => ({ name: Text.new("John") }),
    });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe('UPDATE "users" as "users" SET "name" = cast($1 as text)');
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

    expect(result.sql).toBe('UPDATE ONLY "users" as "users" SET "role" = cast($1 as text)');
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
        where: (petRow, personRow) => petRow.ownerId["="](personRow.id).and(personRow.firstName["="](Text.new("John"))),
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
      const usersJoinComments = db.Users.join(db.Comments, "c", (u, { c }) => u.id["="](c.user_id));

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
              updateRow.species["="](Text.new("dog")).and(updateRow.ownerId["="](Int4.new(ownerId))),
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
            where: (petRow, personRow) => petRow.ownerId["="](personRow.id).and(personRow.firstName["="]("Johnny")),
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
          const usersJoinComments = db.Users.join(db.Comments, "comment", (u, { comment }) =>
            u.id["="](comment.user_id),
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

  describe("chaining methods", () => {
    it("should support chaining set method", () => {
      const parsed = update(db.Users)
        .set(() => ({ name: Text.new("Updated Name") }))
        .set(() => ({ email: Text.new("new@email.com") }));

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      // The last set should override the previous one
      expect(result.sql).toBe('UPDATE "users" as "users" SET "email" = cast($1 as text)');
      expect(result.parameters).toEqual(["new@email.com"]);
    });

    it("should support chaining multiple where clauses with AND", () => {
      const parsed = update(db.Users, {})
        .set(() => ({ active: Int4.new(0) }))
        .where((u) => u.role["="]("admin"))
        .where((u) => u.id[">="](Int4.new(100)));

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'UPDATE "users" as "users" SET "active" = cast($1 as int4) WHERE (("users"."id" >= cast($2 as int4)) AND ("users"."role" = $3))',
      );
      expect(result.parameters).toEqual([0, 100, "admin"]);
    });

    it("should support chaining set, where and returning", () => {
      const parsed = update(db.Users)
        .set(() => ({ email: Text.new("updated@test.com") }))
        .where((u) => u.active["="](1))
        .returning((u) => ({ id: u.id, email: u.email }));

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'UPDATE "users" as "users" SET "email" = cast($1 as text) WHERE ("users"."active" = $2) RETURNING "users"."id" AS "id", "users"."email" AS "email"',
      );
      expect(result.parameters).toEqual(["updated@test.com", 1]);
    });

    it("should support complex chaining with multiple where and returning", () => {
      const parsed = update(db.Users)
        .set(() => ({
          active: Int4.new(0),
          role: Text.new("inactive"),
        }))
        .where((u) => u.email.like(Text.new("%old.com")))
        .where((u) => u.active["="](1))
        .returning((u) => ({
          id: u.id,
          name: u.name,
          previousRole: u.role,
        }));

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'UPDATE "users" as "users" SET "active" = cast($1 as int4), "role" = cast($2 as text) WHERE (("users"."active" = $3) AND ("users"."email" ~~ cast($4 as text))) RETURNING "users"."id" AS "id", "users"."name" AS "name", "users"."role" AS "previousRole"',
      );
      expect(result.parameters).toEqual([0, "inactive", 1, "%old.com"]);
    });

    it("should support chaining with FROM clause", () => {
      const parsed = update(db.Posts, {
        from: db.Users,
      })
        .set(() => ({ published: Int4.new(1) }))
        .where((p, u) => p.user_id["="](u.id))
        .where((_p, u) => u.role["="]("editor"))
        .returning((p, u) => ({
          postId: p.id,
          postTitle: p.title,
          editorName: u.name,
        }));

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'UPDATE "posts" as "posts" SET "published" = cast($1 as int4) FROM "users" as "users" WHERE (("users"."role" = $2) AND ("posts"."user_id" = "users"."id")) RETURNING "posts"."id" AS "postId", "posts"."title" AS "postTitle", "users"."name" AS "editorName"',
      );
      expect(result.parameters).toEqual([1, "editor"]);
    });

    it("should allow overriding returning clause", () => {
      const parsed = update(db.Users, {
        returning: (u) => ({ id: u.id }),
      })
        .set(() => ({ active: Int4.new(0) }))
        .where((u) => u.role["="]("temp"))
        .returning((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
        }));

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      // The last returning should override the initial one
      expect(result.sql).toBe(
        'UPDATE "users" as "users" SET "active" = cast($1 as int4) WHERE ("users"."role" = $2) RETURNING "users"."id" AS "id", "users"."name" AS "name", "users"."email" AS "email"',
      );
      expect(result.parameters).toEqual([0, "temp"]);
    });

    it("should execute chained update operations", async () => {
      await withDb(testDb, async (kdb) => {
        // Insert test data
        await kdb.sql`
          INSERT INTO users (name, email, active, role)
          VALUES 
            ('ChainUpdate1', 'chain1@old.com', 1, 'admin'),
            ('ChainUpdate2', 'chain2@new.com', 1, 'admin'),
            ('ChainUpdate3', 'chain3@old.com', 1, 'user'),
            ('ChainUpdate4', 'chain4@old.com', 0, 'admin')
        `.execute();

        // Update active admins with old.com emails using chained where
        const parsed = update(db.Users, {})
          .set(() => ({
            active: Int4.new(0),
            role: Text.new("archived"),
          }))
          .where((u) => u.active["="](1))
          .where((u) => u.role["="]("admin"))
          .where((u) => u.email.like(Text.new("%old.com")))
          .returning((u) => ({
            name: u.name,
            email: u.email,
          }));

        const result = await parsed.execute(kdb);

        // Only ChainUpdate1 should be updated (active admin with old.com email)
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({
          name: "ChainUpdate1",
          email: "chain1@old.com",
        });

        // Verify the update
        const verify = await kdb.sql`
          SELECT name, active, role 
          FROM users 
          WHERE name LIKE 'ChainUpdate%'
          ORDER BY name
        `.execute();

        expect(verify).toHaveLength(4);
        expect(verify[0]).toMatchObject({ name: "ChainUpdate1", active: "0", role: "archived" });
        expect(verify[1]).toMatchObject({ name: "ChainUpdate2", active: "1", role: "admin" });
        expect(verify[2]).toMatchObject({ name: "ChainUpdate3", active: "1", role: "user" });
        expect(verify[3]).toMatchObject({ name: "ChainUpdate4", active: "0", role: "admin" });

        // Clean up
        await kdb.sql`DELETE FROM users WHERE name ~~ 'ChainUpdate%'`.execute();
      });
    });

    it("should execute chained update with FROM clause", async () => {
      await withDb(testDb, async (kdb) => {
        // Insert test data
        const userResult = await kdb.sql`
          INSERT INTO users (name, email, active, role)
          VALUES ('Editor1', 'editor@test.com', 1, 'editor')
          RETURNING id
        `.execute();
        const editorId = Number((userResult[0] as any).id);

        // Insert another user for Draft3
        const otherUserResult = await kdb.sql`
          INSERT INTO users (name, email, active, role)
          VALUES ('NotEditor', 'noteditor@test.com', 1, 'user')
          RETURNING id
        `.execute();
        const otherUserId = Number((otherUserResult[0] as any).id);

        await kdb.sql`
          INSERT INTO posts (title, content, user_id, published)
          VALUES 
            ('Draft1', 'Content1', ${editorId}, 0),
            ('Draft2', 'Content2', ${editorId}, 0),
            ('Draft3', 'Content3', ${otherUserId}, 0)
        `.execute();

        // Update posts using chained where with FROM clause
        const parsed = update(db.Posts, { from: db.Users })
          .set(() => ({ published: Int4.new(1) }))
          .where((p, u) => p.user_id["="](u.id))
          .where((_p, u) => u.role["="]("editor"))
          .where((p) => p.title.like(Text.new("Draft%")))
          .returning((p) => ({
            title: p.title,
            published: p.published,
          }));

        const result = await parsed.execute(kdb);

        // Only Draft1 and Draft2 should be updated (belong to editor)
        expect(result).toHaveLength(2);
        expect(result).toContainEqual({ title: "Draft1", published: 1 });
        expect(result).toContainEqual({ title: "Draft2", published: 1 });

        // Verify updates
        const verify = await kdb.sql`
          SELECT title, published 
          FROM posts 
          WHERE title LIKE 'Draft%'
          ORDER BY title
        `.execute();

        expect(verify[0]).toMatchObject({ title: "Draft1", published: "1" });
        expect(verify[1]).toMatchObject({ title: "Draft2", published: "1" });
        expect(verify[2]).toMatchObject({ title: "Draft3", published: "0" });

        // Clean up
        await kdb.sql`DELETE FROM posts WHERE title LIKE 'Draft%'`.execute();
        await kdb.sql`DELETE FROM users WHERE id IN (${editorId}, ${otherUserId})`.execute();
      });
    });
  });
});
