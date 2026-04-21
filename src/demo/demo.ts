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

await db.execute(
  Posts.insert(
    { author: "alice", body: "first post", likes: 5n },
    { author: "bob", body: "hello from pglite", likes: 12n },
    { author: "alice", body: "another from alice", likes: 3n },
  ),
);

// ------------------------------------
// Example 1: simple select with a derived column.
// ------------------------------------

const alicePosts = await db.execute(
  Posts.from()
    .where((ns) => ns.posts.author["="](Text.from("alice")))
    .select((ns) => ({
      id: ns.posts.id,
      preview: ns.posts.preview(),
    }))
    .orderBy((ns) => ns.posts.id)
    .debug(),
);
console.log("Alice's posts:", alicePosts);

// ------------------------------------
// Example 2: aggregate — total likes per author.
// ------------------------------------

const likesByAuthor = await db.execute(
  Posts.from()
    .groupBy((ns) => [ns.posts.author])
    .select((ns) => ({
      author: ns[0],
      total: ns.posts.likes.sum(),
    }))
    .orderBy((ns) => [ns.posts.likes.sum(), "desc"])
    .debug(),
);
console.log("Likes by author:", likesByAuthor);

// ------------------------------------
// Example 3: update with RETURNING.
// ------------------------------------

const promoted = await db.execute(
  Posts.update()
    .where((ns) => ns.posts.author["="](Text.from("alice")))
    .set(() => ({ likes: 999n }))
    .returning((ns) => ({ id: ns.posts.id, likes: ns.posts.likes }))
    .debug(),
);
console.log("Promoted:", promoted);

