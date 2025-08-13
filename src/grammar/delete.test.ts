import { describe, it, expect } from "vitest";
import { delete_ } from "./delete";
import { Int4, Text } from "../types";
import { dummyDb, withDb } from "../test/db";
import { makeDb } from "../gen/tables";
import { testDb } from "../db.test";
import { with_ } from "./with";
import { values } from "../query/values";

const db = makeDb();

describe("DELETE parser", () => {
  it("should parse and compile a basic DELETE statement", () => {
    const parsed = delete_({ from: db.users });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe('DELETE FROM "users" as "users"');
    expect(result.parameters).toEqual([]);
  });

  it("should parse DELETE with ONLY", () => {
    const parsed = delete_({ from: db.users, only: true });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe('DELETE FROM ONLY "users" as "users"');
    expect(result.parameters).toEqual([]);
  });

  it("should parse DELETE with WHERE clause", () => {
    const parsed = delete_({
      from: db.users,
      where: (deleteRow) => deleteRow.id["="](Int4.new(1)),
    });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'DELETE FROM "users" as "users" WHERE ("users"."id" = cast($1 as int4))',
    );
    expect(result.parameters).toEqual([1]);
  });

  it("should parse DELETE with RETURNING clause", () => {
    const parsed = delete_({
      from: db.users,
      returning: (deleteRow) => ({ id: deleteRow.id, name: deleteRow.name }),
    });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'DELETE FROM "users" as "users" RETURNING "users"."id" AS "id", "users"."name" AS "name"',
    );
    expect(result.parameters).toEqual([]);
  });

  it("should parse DELETE with WHERE and RETURNING", () => {
    const parsed = delete_({
      from: db.users,
      where: (deleteRow) => deleteRow.active["="](0),
      returning: (deleteRow) => ({ id: deleteRow.id, email: deleteRow.email }),
    });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'DELETE FROM "users" as "users" WHERE ("users"."active" = $1) RETURNING "users"."id" AS "id", "users"."email" AS "email"',
    );
    expect(result.parameters).toEqual([0]);
  });

  it("should parse DELETE with all features combined", () => {
    const parsed = delete_({
      from: db.users,
      where: (u) => u.active["="](0).and(u.role["="]("inactive")),
      returning: (u) => ({ id: u.id, name: u.name }),
      only: true,
    });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'DELETE FROM ONLY "users" as "users" WHERE (("users"."active" = $1) AND ("users"."role" = $2)) RETURNING "users"."id" AS "id", "users"."name" AS "name"',
    );
    expect(result.parameters).toEqual([0, "inactive"]);
  });

  describe("with USING clause", () => {
    it("should parse DELETE with USING another table", () => {
      const parsed = delete_({
        from: db.comments,
        using: db.users,
        where: (commentRow, userRow) =>
          commentRow.user_id["="](userRow.id).and(
            userRow.active["="](Int4.new(0)),
          ),
      });

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'DELETE FROM "comments" as "comments" USING "users" as "users" WHERE (("comments"."user_id" = "users"."id") AND ("users"."active" = cast($1 as int4)))',
      );
      expect(result.parameters).toEqual([0]);
    });

    it("should parse DELETE with USING table (two tables)", () => {
      const parsed = delete_({
        from: db.posts,
        using: db.users,
        where: (postRow, userRow) =>
          postRow.user_id["="](userRow.id).and(
            userRow.role["="](Text.new("deleted")),
          ),
        returning: (postRow, userRow) => ({
          postId: postRow.id,
          postTitle: postRow.title,
          userName: userRow.name,
        }),
      });

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'DELETE FROM "posts" as "posts" USING "users" as "users" WHERE (("posts"."user_id" = "users"."id") AND ("users"."role" = cast($1 as text))) RETURNING "posts"."id" AS "postId", "posts"."title" AS "postTitle", "users"."name" AS "userName"',
      );
      expect(result.parameters).toEqual(["deleted"]);
    });

    it("should parse DELETE with USING joined table (true 3 tables)", () => {
      const usersJoinPosts = db.users.join(db.posts, "p", (u, { p }) =>
        u.id["="](p.user_id),
      );

      const parsed = delete_({
        from: db.comments,
        using: usersJoinPosts,
        where: (commentRow, userRow, joins) =>
          commentRow.user_id["="](userRow.id)
            .and(userRow.active["="](Int4.new(0)))
            .and(joins.p.id["="](commentRow.post_id))
            .and(joins.p.published["="](Int4.new(0))),
        returning: (commentRow, userRow, joins) => ({
          commentId: commentRow.id,
          commentContent: commentRow.content,
          userName: userRow.name,
          postTitle: joins.p.title,
        }),
      });

      const compiled = parsed.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'DELETE FROM "comments" as "comments" USING "users" as "users" JOIN "posts" as "p" ON ("users"."id" = "p"."user_id") WHERE (((("comments"."user_id" = "users"."id") AND ("users"."active" = cast($1 as int4))) AND ("p"."id" = "comments"."post_id")) AND ("p"."published" = cast($2 as int4))) RETURNING "comments"."id" AS "commentId", "comments"."content" AS "commentContent", "users"."name" AS "userName", "p"."title" AS "postTitle"',
      );
      expect(result.parameters).toEqual([0, 0]);
    });
  });

  describe("e2e tests", () => {
    describe("with tables", () => {
      it("should execute DELETE on person table", async () => {
        await withDb(testDb, async (kdb) => {
          // Insert test data
          await kdb.sql`
            INSERT INTO person ("firstName", "lastName", gender)
            VALUES ('DeleteMe', 'TestDelete', 'male')
          `.execute();

          const parsed = delete_({
            from: db.person,
            where: (deleteRow) =>
              deleteRow.lastName["="](Text.new("TestDelete")),
            returning: (deleteRow) => ({
              firstName: deleteRow.firstName,
              lastName: deleteRow.lastName,
            }),
          });

          const result = await parsed.execute(kdb);

          expect(result).toEqual([
            {
              firstName: "DeleteMe",
              lastName: "TestDelete",
            },
          ]);

          // Verify deletion
          const checkResult = await kdb.sql`
            SELECT * FROM person WHERE "lastName" = 'TestDelete'
          `.execute();
          expect(checkResult).toHaveLength(0);
        });
      });

      it("should execute DELETE with multiple conditions", async () => {
        await withDb(testDb, async (kdb) => {
          // Insert test data
          const personResult = await kdb.sql`
            INSERT INTO person ("firstName", "lastName", gender)
            VALUES ('PetOwner', 'ToDelete', 'female')
            RETURNING id
          `.execute();

          const ownerId = Number((personResult[0] as any).id);

          await kdb.sql`
            INSERT INTO pet (name, "ownerId", species, age)
            VALUES 
              ('DeletePet1', ${ownerId}, 'dog', 3),
              ('KeepPet', ${ownerId}, 'cat', 3),
              ('DeletePet2', ${ownerId}, 'dog', 5)
          `.execute();

          const parsed = delete_({
            from: db.pet,
            where: (deleteRow) =>
              deleteRow.species["="](Text.new("dog")).and(
                deleteRow.ownerId["="](Int4.new(ownerId)),
              ),
            returning: (deleteRow) => ({
              name: deleteRow.name,
              species: deleteRow.species,
            }),
          });

          const result = await parsed.execute(kdb);

          expect(result).toHaveLength(2);
          expect(result).toContainEqual({ name: "DeletePet1", species: "dog" });
          expect(result).toContainEqual({ name: "DeletePet2", species: "dog" });

          // Verify only cats remain
          const checkResult = await kdb.sql`
            SELECT name, species FROM pet WHERE "ownerId" = ${ownerId}
          `.execute();
          expect(checkResult).toHaveLength(1);
          expect((checkResult[0] as any).species).toBe("cat");
        });
      });

      it("should execute DELETE with USING table (simple 2 table relationship)", async () => {
        await withDb(testDb, async (kdb) => {
          // Insert test data - persons
          const inactiveUserResult = await kdb.sql`
            INSERT INTO users (name, email, active)
            VALUES ('InactiveUser', 'inactive@example.com', 0)
            RETURNING id
          `.execute();
          const inactiveUserId = Number((inactiveUserResult[0] as any).id);

          const activeUserResult = await kdb.sql`
            INSERT INTO users (name, email, active)
            VALUES ('ActiveUser', 'active@example.com', 1)
            RETURNING id
          `.execute();
          const activeUserId = Number((activeUserResult[0] as any).id);

          // First create a post
          const postResult = await kdb.sql`
            INSERT INTO posts (title, content, user_id, published)
            VALUES ('Test Post', 'Test Content', ${activeUserId}, 1)
            RETURNING id
          `.execute();
          const postId = Number((postResult[0] as any).id);

          // Insert comments for both users
          await kdb.sql`
            INSERT INTO comments (post_id, user_id, content)
            VALUES 
              (${postId}, ${inactiveUserId}, 'Comment from inactive user 1'),
              (${postId}, ${inactiveUserId}, 'Comment from inactive user 2'),
              (${postId}, ${activeUserId}, 'Comment from active user')
          `.execute();

          // Delete comments from inactive users
          const parsed = delete_({
            from: db.comments,
            using: db.users,
            where: (commentRow, userRow) =>
              commentRow.user_id["="](userRow.id).and(userRow.active["="](0)),
            returning: (commentRow, userRow) => ({
              commentContent: commentRow.content,
              userName: userRow.name,
            }),
          });

          const result = await parsed.execute(kdb);

          expect(result).toHaveLength(2);
          expect(result).toContainEqual({
            commentContent: "Comment from inactive user 1",
            userName: "InactiveUser",
          });
          expect(result).toContainEqual({
            commentContent: "Comment from inactive user 2",
            userName: "InactiveUser",
          });

          // Verify only active user's comment remains
          const checkResult = await kdb.sql`
            SELECT content FROM comments WHERE user_id IN (${inactiveUserId}, ${activeUserId})
          `.execute();
          expect(checkResult).toHaveLength(1);
          expect((checkResult[0] as any).content).toBe(
            "Comment from active user",
          );
        });
      });

      it("should execute DELETE with USING and proper join (true 3 tables)", async () => {
        await withDb(testDb, async (kdb) => {
          // Insert test data - users
          const user1Result = await kdb.sql`
            INSERT INTO users (name, email, active)
            VALUES ('BannedUser', 'banned@example.com', 0)
            RETURNING id
          `.execute();
          const bannedUserId = Number((user1Result[0] as any).id);

          const user2Result = await kdb.sql`
            INSERT INTO users (name, email, active)
            VALUES ('GoodUser', 'good@example.com', 1)
            RETURNING id
          `.execute();
          const goodUserId = Number((user2Result[0] as any).id);

          // Insert posts
          const post1Result = await kdb.sql`
            INSERT INTO posts (title, content, user_id, published)
            VALUES ('Unpublished by banned', 'Content', ${bannedUserId}, 0)
            RETURNING id
          `.execute();
          const unpublishedPostId = Number((post1Result[0] as any).id);

          const post2Result = await kdb.sql`
            INSERT INTO posts (title, content, user_id, published)
            VALUES ('Published by good', 'Content', ${goodUserId}, 1)
            RETURNING id
          `.execute();
          const publishedPostId = Number((post2Result[0] as any).id);

          // Insert comments on both posts
          await kdb.sql`
            INSERT INTO comments (post_id, user_id, content)
            VALUES 
              (${unpublishedPostId}, ${bannedUserId}, 'Comment on unpublished by banned'),
              (${unpublishedPostId}, ${goodUserId}, 'Comment on unpublished by good'),
              (${publishedPostId}, ${goodUserId}, 'Comment on published by good')
          `.execute();

          const usersJoinPosts = db.users.join(
            db.posts,
            "post",
            (u, { post }) => u.id["="](post.user_id),
          );

          // Delete comments on unpublished posts by inactive users
          const parsed = delete_({
            from: db.comments,
            using: usersJoinPosts,
            where: (commentRow, userRow, joins) =>
              commentRow.user_id["="](userRow.id)
                .and(userRow.active["="](Int4.new(0)))
                .and(joins.post.id["="](commentRow.post_id))
                .and(joins.post.published["="](Int4.new(0))),
            returning: (commentRow, userRow, joins) => ({
              commentContent: commentRow.content,
              userName: userRow.name,
              postTitle: joins.post.title,
            }),
          });

          const result = await parsed.execute(kdb);

          // Only the comment by banned user on their own unpublished post should be deleted
          expect(result).toEqual([
            {
              commentContent: "Comment on unpublished by banned",
              userName: "BannedUser",
              postTitle: "Unpublished by banned",
            },
          ]);

          // Verify which comments remain
          const checkResult = await kdb.sql`
            SELECT content FROM comments ORDER BY id
          `.execute();
          expect(checkResult).toHaveLength(2);
          expect(checkResult.map((r: any) => r.content)).toEqual([
            "Comment on unpublished by good",
            "Comment on published by good",
          ]);
        });
      });
    });
  });

  describe("with WITH clause", () => {
    it("should parse DELETE with WITH clause", () => {
      const query = with_(
        (cte) => ({
          toDelete: cte(
            values(
              { id: Int4.new(1) },
              { id: Int4.new(2) },
              { id: Int4.new(3) },
            ),
          ),
        }),
        ({ toDelete }) =>
          delete_({
            from: db.users,
            using: toDelete,
            where: (userRow, deleteRow) => userRow.id["="](deleteRow.id),
            returning: (userRow) => ({
              deletedId: userRow.id,
              deletedName: userRow.name,
            }),
          }),
      );

      const compiled = query.compile();
      const result = compiled.compile(dummyDb);

      expect(result.sql).toBe(
        'WITH "toDelete"("id") AS (VALUES (cast($1 as int4)), (cast($2 as int4)), (cast($3 as int4))) DELETE FROM "users" as "users" USING "toDelete" as "toDelete" WHERE ("users"."id" = "toDelete"."id") RETURNING "users"."id" AS "deletedId", "users"."name" AS "deletedName"',
      );
      expect(result.parameters).toEqual([1, 2, 3]);
    });

    it("should execute DELETE with WITH clause", async () => {
      await withDb(testDb, async (kdb) => {
        // Insert test data
        await kdb.sql`
          INSERT INTO users (id, name, email, active)
          VALUES 
            (101, 'User1', 'user1@example.com', 1),
            (102, 'User2', 'user2@example.com', 0),
            (103, 'User3', 'user3@example.com', 0),
            (104, 'User4', 'user4@example.com', 1)
        `.execute();

        // Delete inactive users using WITH clause
        const query = with_(
          (cte) => ({
            inactiveIds: cte(
              values({ id: Int4.new(102) }, { id: Int4.new(103) }),
            ),
          }),
          ({ inactiveIds }) =>
            delete_({
              from: db.users,
              using: inactiveIds,
              where: (userRow, inactiveRow) => userRow.id["="](inactiveRow.id),
              returning: (userRow) => ({
                deletedId: userRow.id,
                deletedName: userRow.name,
              }),
            }),
        );

        const result = await query.execute(kdb);

        expect(result).toHaveLength(2);
        expect(result).toContainEqual({ deletedId: 102, deletedName: "User2" });
        expect(result).toContainEqual({ deletedId: 103, deletedName: "User3" });

        // Verify only active users remain
        const remaining = await kdb.sql`
          SELECT id, name FROM users WHERE id IN (101, 102, 103, 104) ORDER BY id
        `.execute();

        expect(remaining).toHaveLength(2);
        expect(remaining[0]).toMatchObject({ id: "101", name: "User1" });
        expect(remaining[1]).toMatchObject({ id: "104", name: "User4" });

        // Clean up
        await kdb.sql`DELETE FROM users WHERE id IN (101, 104)`.execute();
      });
    });
  });
});
