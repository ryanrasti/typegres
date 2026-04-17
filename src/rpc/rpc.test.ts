import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { sql } from "../builder/sql";
import { Int8, Text } from "../types";
import { db } from "../builder/test-helper";
import { Table } from "../table";
import type { RpcTransport, RpcStub } from "../../packages/capnweb/dist/index.js";
import { RpcSession, RpcTarget } from "../../packages/capnweb/dist/index.js";

class TestTransport implements RpcTransport {
  #queue: string[] = [];
  #waiter?: { resolve: () => void; reject: (err: unknown) => void };
  #partner?: TestTransport;

  constructor(partner?: TestTransport) {
    if (partner) {
      this.#partner = partner;
      partner.#partner = this;
    }
  }

  async send(message: string): Promise<void> {
    this.#partner!.#queue.push(message);
    this.#partner!.#waiter?.resolve();
    this.#partner!.#waiter = undefined;
  }

  async receive(): Promise<string> {
    while (this.#queue.length === 0) {
      await new Promise<void>((resolve, reject) => {
        this.#waiter = { resolve, reject };
      });
    }
    return this.#queue.shift()!;
  }

  abort?(reason: unknown): void {
    this.#waiter?.reject(reason);
    this.#waiter = undefined;
  }
}

class UsersTable extends Table("users") {
  get id() {
    return (Int8<1>).from(sql.raw("users.id"));
  }
  get name() {
    return (Text<1>).from(sql.raw("users.name"));
  }

  static rowType = new UsersTable();
}

class PostsTable extends Table("posts") {
  get id() {
    return (Int8<1>).from(sql.raw("posts.id"));
  }
  get user_id() {
    return (Int8<1>).from(sql.raw("posts.user_id"));
  }
  get title() {
    return (Text<1>).from(sql.raw("posts.title"));
  }

  static rowType = new PostsTable();
}

class CommentsTable extends Table("comments") {
  get id() {
    return (Int8<1>).from(sql.raw("comments.id"));
  }
  get post_id() {
    return (Int8<1>).from(sql.raw("comments.post_id"));
  }
  get body() {
    return (Text<1>).from(sql.raw("comments.body"));
  }

  static rowType = new CommentsTable();
}

class RootApi extends RpcTarget {
  get users() {
    return UsersTable.from();
  }

  get posts() {
    return PostsTable.from();
  }

  get comments() {
    return CommentsTable.from();
  }

  addOne(n: number) {
    return n + 1;
  }

  execute(query: unknown) {
    return db.execute(query as any);
  }
}

class RpcHarness {
  readonly root: RpcStub<RootApi>;
  #client: RpcSession<RootApi>;
  #server: RpcSession;

  constructor(root: RootApi) {
    const clientTransport = new TestTransport();
    const serverTransport = new TestTransport(clientTransport);
    this.#client = new RpcSession<RootApi>(clientTransport);
    this.#server = new RpcSession(serverTransport, root);
    this.root = this.#client.getRemoteMain();
  }

  dispose() {
    (this.root as any)[Symbol.dispose]?.();
  }
}

let harness: RpcHarness | undefined;

const doRpc = async <T>(fn: (root: RootApi) => T): Promise<T> => {
  if (!harness) {
    throw new Error("RPC harness not initialized");
  }
  return harness.root.map(fn as any) as any;
};

test("doRpc smoke test", async () => {
  const smokeHarness = new RpcHarness(new RootApi());
  try {
    const result = await smokeHarness.root.map((root: any) => root.addOne(41));
    expect(result).toBe(42);
  } finally {
    smokeHarness.dispose();
  }
});

describe("query rpc", () => {
  beforeEach(async () => {
    await db.execute(sql`DROP TABLE IF EXISTS comments CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS posts CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS users CASCADE`);

    await db.execute(sql`CREATE TABLE users (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )`);
    await db.execute(sql`CREATE TABLE posts (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      user_id int8 NOT NULL REFERENCES users(id),
      title text NOT NULL
    )`);
    await db.execute(sql`CREATE TABLE comments (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      post_id int8 NOT NULL REFERENCES posts(id),
      body text NOT NULL
    )`);

    await db.execute(sql`INSERT INTO users (name) VALUES ('Alice'), ('Bob')`);
    await db.execute(
      sql`INSERT INTO posts (user_id, title) VALUES (1, 'A1'), (1, 'A2'), (2, 'B1')`,
    );
    await db.execute(
      sql`INSERT INTO comments (post_id, body) VALUES (1, 'c1'), (1, 'c2'), (2, 'c3'), (3, 'c4')`,
    );

    harness = new RpcHarness(new RootApi());
  });

  afterEach(async () => {
    harness?.dispose();
    harness = undefined;
    await db.execute(sql`DROP TABLE IF EXISTS comments CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS posts CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS users CASCADE`);
  });

  test("closure runs synchronously on the receiver (rr only)", async () => {
    class Receiver extends RpcTarget {
      checkSync(fn: (x: number) => number) {
        return typeof fn(0);
      }
    }
    const h = new RpcHarness(new Receiver() as any);
    try {
      const result = await h.root.map((root: any) => root.checkSync((_) => 42));
      expect(result).toBe("number");
    } finally {
      h.dispose();
    }
  });

  test("runs a simple query over capnweb", async () => {
    const rows = await doRpc((root) =>
      root.execute(
        root.users
          .where(({ users }) => users.id["="](1n))
          .select(({ users }) => ({ id: users.id, name: users.name.upper() })),
      ),
    );

    expect(rows).toEqual([{ id: 1n, name: "ALICE" }]);
  });

  test("runs correlated nested subqueries over capnweb", async () => {
    const rows = await doRpc((root) =>
      root.execute(
        root.users
          .where(({ users }) => users.id["="](1n))
          .select(({ users }) => ({
            name: users.name,
            posts: root.posts
              .where(({ posts }) => posts.user_id["="](users.id))
              .select(({ posts }) => ({ title: posts.title }))
              .cardinality("many")
              .scalar(),
          })),
      ),
    );

    expect(rows).toEqual([
      {
        name: "Alice",
        posts: [{ title: "A1" }, { title: "A2" }],
      },
    ]);
  });

  // test("runs joins and nested relation queries over capnweb", async () => {
  //   const rows = await doRpc((root) =>
  //     root.execute(
  //       root.posts
  //         .join(root.users, ({ posts, users }) => posts.user_id["="](users.id))
  //         .select(({ posts, users }) => ({
  //           title: posts.title,
  //           author: users.name,
  //           comments: root.comments
  //             .where(({ comments }) => comments.post_id["="](posts.id))
  //             .select(({ comments }) => ({ body: comments.body }))
  //             .cardinality("many")
  //             .scalar(),
  //         })),
  //     ),
  //   );

  //   expect(rows).toEqual([
  //     { title: "A1", author: "Alice", comments: [{ body: "c1" }, { body: "c2" }] },
  //     { title: "A2", author: "Alice", comments: [{ body: "c3" }] },
  //     { title: "B1", author: "Bob", comments: [{ body: "c4" }] },
  //   ]);
  // });
});
