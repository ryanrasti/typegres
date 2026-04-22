import { describe, test, expect, beforeAll } from "vitest";
import { typegres, sql, Table, Int8, Text, Bool } from "typegres";
import type { Database } from "typegres";

// End-to-end tests for db.hydrate(): materialize query rows as class
// instances with methods, then use those methods in follow-up queries.

let db: Database;

class User extends Table("users") {
  id = (Int8<1>).column({ nonNull: true, generated: true });
  name = (Text<1>).column({ nonNull: true });

  todos() {
    return Todo.from().where((ns) => ns.todos.user_id["="](this.id));
  }
}

class Todo extends Table("todos") {
  id = (Int8<1>).column({ nonNull: true, generated: true });
  user_id = (Int8<1>).column({ nonNull: true });
  title = (Text<1>).column({ nonNull: true });
  completed = (Bool<1>).column({ nonNull: true });

  update(fields: { completed?: boolean; title?: string }) {
    return Todo.update()
      .where((ns) => ns.todos.id["="](this.id))
      .set(() => fields);
  }
}

beforeAll(async () => {
  db = await typegres({ type: "pglite" });
  await db.execute(sql`
    CREATE TABLE users (
      id   int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )
  `);
  await db.execute(sql`
    CREATE TABLE todos (
      id        int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      user_id   int8 NOT NULL,
      title     text NOT NULL,
      completed bool NOT NULL DEFAULT false
    )
  `);
  await db.execute(sql`INSERT INTO users (name) VALUES ('alice'), ('bob')`);
  await db.execute(sql`INSERT INTO todos (user_id, title, completed) VALUES
    (1, 'a-one', false), (1, 'a-two', false), (2, 'b-one', false)`);
});

describe("db.hydrate", () => {
  test("returns class instances with the same prototype chain", async () => {
    const users = await db.hydrate(User.from().orderBy((ns) => ns.users.id));
    expect(users).toHaveLength(2);
    expect(users[0]).toBeInstanceOf(User);
    expect(typeof users[0]!.todos).toBe("function");
  });

  test("hydrated column is an Any wrapping the deserialized value", async () => {
    const [user] = await db.hydrate(
      User.from().where((ns) => ns.users.id["="](1n)).limit(1),
    );
    // id is an Any (has toSql()); compiling it shows a CAST param, not a
    // column ref.
    expect(user!.id.toSql).toBeDefined();
  });

  test("relation method on a hydrated instance runs as a real query", async () => {
    const [alice] = await db.hydrate(
      User.from().where((ns) => ns.users.id["="](1n)).limit(1),
    );
    // Call the relation method on the materialized instance. The method
    // composes `this.id` (an Any wrapping the param) into a fresh
    // QueryBuilder which we then run.
    const aliceTodos = await db.execute(alice!.todos());
    expect(aliceTodos).toHaveLength(2);
    expect(aliceTodos.map((t) => t.title).sort()).toEqual(["a-one", "a-two"]);
  });

  test("instance mutation method runs as a real query", async () => {
    const [todo] = await db.hydrate(
      Todo.from().where((ns) => ns.todos.title["="](Text.from("a-one"))).limit(1),
    );
    expect(todo!.completed).toBeDefined();

    await db.execute(todo!.update({ completed: true }));

    const [after] = await db.execute(
      Todo.from().where((ns) => ns.todos.title["="](Text.from("a-one"))),
    );
    expect(after!.completed).toBe(true);
  });

  test("chained hydrate -> method -> hydrate -> method", async () => {
    const [alice] = await db.hydrate(
      User.from().where((ns) => ns.users.id["="](1n)).limit(1),
    );
    const [firstTodo] = await db.hydrate(
      alice!.todos().orderBy((ns) => ns.todos.id).limit(1),
    );
    expect(firstTodo).toBeInstanceOf(Todo);

    await db.execute(firstTodo!.update({ title: "renamed" }));

    const [reloaded] = await db.execute(
      Todo.from().where((ns) => ns.todos.id["="](firstTodo!.id)),
    );
    expect(reloaded!.title).toBe("renamed");
  });
});
