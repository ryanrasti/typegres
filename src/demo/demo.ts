import { typegres, sql, Int8, Text } from "typegres";

const db = await typegres({ type: "pglite" });

// ------------------------------------
// Set up a tiny schema + seed data.
// ------------------------------------

await db.execute(sql`
  CREATE TABLE posts (
    id     int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    author text NOT NULL,
    body   text NOT NULL,
    likes  int8 NOT NULL DEFAULT 0
  )
`);

// ------------------------------------
// Define the public interface.
// ------------------------------------
//
// Tables are TS classes. Columns are field initializers — field name
// doubles as the pg column name. Methods on the class compile to SQL.

class Posts extends db.Table("posts") {
  id = (Int8<1>).column({ nonNull: true, generated: true });
  author = (Text<1>).column({ nonNull: true });
  body = (Text<1>).column({ nonNull: true });
  likes = (Int8<1>).column({ nonNull: true, default: sql`0` });

  // Derived column — not in the schema, part of the API.
  preview() {
    return this.body["||"](Text.from("…"));
  }
}

await Posts.insert(
  { author: "alice", body: "first post", likes: 5n },
  { author: "bob", body: "hello from pglite", likes: 12n },
  { author: "alice", body: "another from alice", likes: 3n },
).execute(db);

// ------------------------------------
// Example 1: simple select with a derived column.
// ------------------------------------

const alicePosts = await Posts.from()
  .where(({ posts }) => posts.author.eq(Text.from("alice")))
  .select(({ posts }) => ({ id: posts.id, preview: posts.preview() }))
  .orderBy(({ posts }) => posts.id)
  .debug()
  .execute(db);
console.log("Alice's posts:", alicePosts);

// ------------------------------------
// Example 2: aggregate — total likes per author.
// ------------------------------------

const likesByAuthor = await Posts.from()
  .groupBy(({ posts }) => [posts.author])
  .select(({ posts, 0: author }) => ({
    author,
    total: posts.likes.sum(),
  }))
  .orderBy(({ posts }) => [posts.likes.sum(), "desc"])
  .debug()
  .execute(db);
console.log("Likes by author:", likesByAuthor);

// ------------------------------------
// Example 3: update with RETURNING.
// ------------------------------------

const promoted = await Posts.update()
  .where(({ posts }) => posts.author.eq(Text.from("alice")))
  .set(() => ({ likes: 999n }))
  .returning(({ posts }) => ({ id: posts.id, likes: posts.likes }))
  .debug()
  .execute(db);
console.log("Promoted:", promoted);
