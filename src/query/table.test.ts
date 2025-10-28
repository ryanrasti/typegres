import { assert, Equals } from "tsafe";
import { describe, expect, it } from "vitest";
import { testDb } from "../db.test";
import * as db from "../gen/tables";
import { insert, select } from "../grammar";
import { withDb } from "../test/db";
import { Int4, Text } from "../types/index";
import { values } from "./values";

describe("Extending table classes", () => {
  class User extends db.Users.extend<User>() {
    static all() {
      return select((u) => u, {
        from: User,
        where: (u) => u.active["="](1),
      });
    }

    displayName() {
      return this.email.regexpReplace("@.*", "@***"); // Privacy mask
    }

    hasRole(role: string) {
      return this.role["="](role);
    }

    comments() {
      return select((c) => c, {
        from: db.Comments,
        where: (c) => c.user_id["="](this.id),
      });
    }

    numComments() {
      return this.comments().selectScalar((c) => c.id.count());
    }
  }

  it("can use instance methods on extended table class", async () => {
    await withDb(testDb, async (kdb) => {
      // Insert test users
      await insert(
        {
          into: User,
        },
        select(
          (v) => ({
            name: v.name,
            email: v.email,
            role: v.role,
            active: v.active,
          }),
          {
            from: values(
              {
                name: Text.new("Admin Alice"),
                email: Text.new("alice@company.com"),
                role: Text.new("admin"),
                active: Int4.new(1),
              },
              {
                name: Text.new("Admin Bob"),
                email: Text.new("bob@company.com"),
                role: Text.new("admin"),
                active: Int4.new(1),
              },
              {
                name: Text.new("User Charlie"),
                email: Text.new("charlie@company.com"),
                role: Text.new("user"),
                active: Int4.new(1),
              },
            ),
          },
        ),
      ).execute(kdb);

      // Test the nice syntax for filtering and selecting
      const res = await select(
        (u) => ({
          name: u.displayName(),
          isAdmin: u.hasRole("admin"),
        }),
        {
          from: User,
          where: (u) => u.hasRole("admin"),
          orderBy: [(u) => u.name, { asc: true }],
        },
      ).execute(kdb);

      assert<Equals<typeof res, { name: string; isAdmin: boolean | null }[]>>();

      expect(res).toEqual([
        { name: "alice@***", isAdmin: true },
        { name: "bob@***", isAdmin: true },
      ]);
    });
  });

  it("can use static methods on extended table class", async () => {
    await withDb(testDb, async (kdb) => {
      // Insert test users with different active statuses
      await insert(
        {
          into: db.Users,
        },
        select(
          (v) => ({
            name: v.name,
            email: v.email,
            role: v.role,
            active: v.active,
          }),
          {
            from: values(
              {
                name: Text.new("Active User 1"),
                email: Text.new("active1@test.com"),
                role: Text.new("user"),
                active: Int4.new(1),
              },
              {
                name: Text.new("Inactive User"),
                email: Text.new("inactive@test.com"),
                role: Text.new("user"),
                active: Int4.new(0),
              },
              {
                name: Text.new("Active User 2"),
                email: Text.new("active2@test.com"),
                role: Text.new("admin"),
                active: Int4.new(1),
              },
            ),
          },
        ),
      ).execute(kdb);

      // Use static method to get all active users
      const res = await select(
        (u) => ({
          email: u.email,
          display: u.displayName(),
        }),
        {
          from: User.all().asFromItem(),
          orderBy: [(u) => u.name, { asc: true }],
        },
      ).execute(kdb);

      assert<Equals<typeof res, { email: string; display: string }[]>>();

      expect(res).toEqual([
        { email: "active1@test.com", display: "active1@***" },
        { email: "active2@test.com", display: "active2@***" },
      ]);
    });
  });

  it("can use extended methods with subqueries for comment counts", async () => {
    await withDb(testDb, async (kdb) => {
      // Insert users
      const users = await insert(
        {
          into: User,
        },
        select(
          (v) => ({
            name: v.name,
            email: v.email,
            role: v.role,
            active: v.active,
          }),
          {
            from: values(
              {
                name: Text.new("Power User"),
                email: Text.new("power@test.com"),
                role: Text.new("admin"),
                active: Int4.new(1),
              },
              {
                name: Text.new("Regular User"),
                email: Text.new("regular@test.com"),
                role: Text.new("user"),
                active: Int4.new(1),
              },
            ),
          },
        ),
        {
          returning: (u) => ({ id: u.id }),
        },
      ).execute(kdb);

      // Insert posts first
      const posts = await insert(
        {
          into: db.Posts,
        },
        select(
          (v) => ({
            user_id: v.user_id,
            title: v.title,
            content: v.content,
            published: v.published,
          }),
          {
            from: values(
              {
                user_id: Int4.new(users[0].id),
                title: Text.new("Post 1"),
                content: Text.new("Content 1"),
                published: Int4.new(1),
              },
              {
                user_id: Int4.new(users[0].id),
                title: Text.new("Post 2"),
                content: Text.new("Content 2"),
                published: Int4.new(1),
              },
              {
                user_id: Int4.new(users[0].id),
                title: Text.new("Post 3"),
                content: Text.new("Content 3"),
                published: Int4.new(1),
              },
            ),
          },
        ),
        {
          returning: (p) => ({ id: p.id }),
        },
      ).execute(kdb);

      // Insert comments for power user
      await insert(
        {
          into: db.Comments,
        },
        select(
          (v) => ({
            user_id: v.user_id,
            post_id: v.post_id,
            content: v.content,
          }),
          {
            from: values(
              {
                user_id: Int4.new(users[0].id),
                post_id: Int4.new(posts[0].id),
                content: Text.new("First comment"),
              },
              {
                user_id: Int4.new(users[0].id),
                post_id: Int4.new(posts[1].id),
                content: Text.new("Second comment"),
              },
              {
                user_id: Int4.new(users[0].id),
                post_id: Int4.new(posts[2].id),
                content: Text.new("Third comment"),
              },
            ),
          },
        ),
      ).execute(kdb);

      // Test the nice syntax you suggested
      const res = await select(
        (u) => ({
          name: u.displayName(),
          commentCount: u.numComments(),
        }),
        {
          from: User,
          where: (u) => u.hasRole("admin"),
        },
      ).execute(kdb);

      assert<Equals<typeof res, { name: string; commentCount: bigint }[]>>();

      expect(res.find((r) => r.name === "power@***")).toEqual({
        name: "power@***",
        commentCount: 3n,
      });
    });
  });

  it("can instantiate class from POJO and call methods for fresh data", async () => {
    await withDb(testDb, async (kdb) => {
      // Insert a user
      const [userData] = await insert(
        {
          into: db.Users,
        },
        select(
          (v) => ({
            name: v.name,
            email: v.email,
            role: v.role,
            active: v.active,
          }),
          {
            from: values({
              name: Text.new("Data User"),
              email: Text.new("data@test.com"),
              role: Text.new("admin"),
              active: Int4.new(1),
            }),
          },
        ),
        {
          returning: (u) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            active: u.active,
          }),
        },
      ).execute(kdb);

      // Create posts
      const posts = await insert(
        {
          into: db.Posts,
        },
        select(
          (v) => ({
            user_id: v.user_id,
            title: v.title,
            content: v.content,
            published: v.published,
          }),
          {
            from: values(
              {
                user_id: Int4.new(userData.id),
                title: Text.new("Post A"),
                content: Text.new("Content A"),
                published: Int4.new(1),
              },
              {
                user_id: Int4.new(userData.id),
                title: Text.new("Post B"),
                content: Text.new("Content B"),
                published: Int4.new(1),
              },
            ),
          },
        ),
        {
          returning: (p) => ({ id: p.id }),
        },
      ).execute(kdb);

      // Initially no comments
      const user = new User(userData);
      const initialCount = await user.numComments().execute(kdb);
      expect(initialCount).toBe(0n);

      // Add some comments
      await insert(
        {
          into: db.Comments,
        },
        select(
          (v) => ({
            user_id: v.user_id,
            post_id: v.post_id,
            content: v.content,
          }),
          {
            from: values(
              {
                user_id: Int4.new(userData.id),
                post_id: Int4.new(posts[0].id),
                content: Text.new("Comment 1"),
              },
              {
                user_id: Int4.new(userData.id),
                post_id: Int4.new(posts[1].id),
                content: Text.new("Comment 2"),
              },
              {
                user_id: Int4.new(userData.id),
                post_id: Int4.new(posts[1].id),
                content: Text.new("Comment 3"),
              },
            ),
          },
        ),
      ).execute(kdb);

      // Get fresh count from the same User instance
      const updatedCount = await user.numComments().execute(kdb);
      expect(updatedCount).toBe(3n);

      // Can also get the actual comments
      const comments = await user.comments().execute(kdb);
      expect(comments).toHaveLength(3);
      expect(comments.every((c) => c.user_id === userData.id)).toBe(true);

      // The displayName() method still works as a SQL expression builder
      const displayResult = await select(() => ({
        display: user.displayName(),
      })).execute(kdb);
      expect(displayResult[0].display).toBe("data@***");
    });
  });

  it("extended class composes with joins and subselects", async () => {
    await withDb(testDb, async (kdb) => {
      // Insert test data
      const [author] = await insert(
        {
          into: db.Users,
        },
        select(
          (v) => ({
            name: v.name,
            email: v.email,
            role: v.role,
            active: v.active,
          }),
          {
            from: values({
              name: Text.new("Blog Author"),
              email: Text.new("author@blog.com"),
              role: Text.new("admin"),
              active: Int4.new(1),
            }),
          },
        ),
        {
          returning: (u) => ({ id: u.id }),
        },
      ).execute(kdb);

      // Insert posts and comments
      const [post] = await insert(
        {
          into: db.Posts,
        },
        select(
          (v) => ({
            user_id: v.user_id,
            title: v.title,
            content: v.content,
            published: v.published,
          }),
          {
            from: values({
              user_id: Int4.new(author.id),
              title: Text.new("TypeScript Tips"),
              content: Text.new("Content here"),
              published: Int4.new(1),
            }),
          },
        ),
        {
          returning: (p) => ({ id: p.id }),
        },
      ).execute(kdb);

      await insert(
        {
          into: db.Comments,
        },
        select(
          (v) => ({
            user_id: v.user_id,
            post_id: v.post_id,
            content: v.content,
          }),
          {
            from: values(
              {
                user_id: Int4.new(author.id),
                post_id: Int4.new(post.id),
                content: Text.new("Self comment 1"),
              },
              {
                user_id: Int4.new(author.id),
                post_id: Int4.new(post.id),
                content: Text.new("Self comment 2"),
              },
            ),
          },
        ),
      ).execute(kdb);

      // Complex query combining extended methods with joins
      const activeAdmins = select((u) => u, {
        from: User,
        where: (u) => u.hasRole("admin"),
      });

      const res = await select(
        (u, { p }) => ({
          author: u.displayName(),
          postTitle: p.title,
          totalComments: u.numComments(),
        }),
        {
          from: activeAdmins
            .asFromItem()
            .join(db.Posts, "p", (u, { p }) => u.id["="](p.user_id).and(p.published["="](1))),
        },
      ).execute(kdb);

      assert<Equals<typeof res, { author: string; postTitle: string; totalComments: bigint }[]>>();

      expect(res).toEqual([
        {
          author: "author@***",
          postTitle: "TypeScript Tips",
          totalComments: 2n,
        },
      ]);
    });
  });
});
