import { Database, PgliteExecutor, sql } from "typegres";
import { Int8, Text } from "typegres/types";

const exec = await PgliteExecutor.create();
const db = new Database(exec);

// ------------------------------------
// Set up a tiny schema.
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
// Define your public interface.
// ------------------------------------
//
// Tables are TS classes. Columns are field initializers declared with
// the field name doubling as the pg column name.

class Posts extends db.Table("posts") {
  id = (Int8<1>).column({ nonNull: true, generated: true });
  author = (Text<1>).column({ nonNull: true });
  body = (Text<1>).column({ nonNull: true });
  likes = (Int8<1>).column({ nonNull: true, default: sql`0` });

  // Derived column — part of the public API, not in the schema.
  preview() {
    return this.body["||"](Text.from("…"));
  }
}

// ------------------------------------
// Write some data.
// ------------------------------------

await db.execute(
  Posts.insert(
    { author: "alice", body: "first post!" },
    { author: "bob", body: "hello from pglite" },
    { author: "alice", body: "another from alice" },
  ),
);

// ------------------------------------
// Query it.
// ------------------------------------

const recent = await db.execute(
  Posts.from()
    .where((ns) => ns.posts.author["="](Text.from("alice")))
    .select((ns) => ({
      id: ns.posts.id,
      author: ns.posts.author,
      preview: ns.posts.preview(),
    }))
    .orderBy((ns) => [ns.posts.id, "desc"]),
);

const result = recent;
