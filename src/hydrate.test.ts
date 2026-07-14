import { describe, test, expect, expectTypeOf, beforeAll } from "vitest";
import { typegres, sql, expose } from "typegres";
import { Int8, Text, Bool } from "typegres/postgres";
import type { Connection, Database, QueryBuilder } from "typegres";

// End-to-end tests for conn.hydrate(): materialize query rows as class
// instances with methods, then use those methods in follow-up queries.

// Constructed at module load via typegres(); classes below reference
// db.Table so their Idents carry provenance.
const { db, conn } = await typegres({ type: "pglite" });
// Placeholder type usage to keep the imports referenced.
const _typed: [Database, Connection] = [db, conn];

class User extends db.Table("users") {
  id = Int8.column({ nonNull: true, generated: true });
  name = Text.column({ nonNull: true });

  todos(): QueryBuilder<{ todos: Todo }, Todo, []> {
    return Todo.from().where((ns) => ns.todos.user_id["="](this.id));
  }
}

class Todo extends db.Table("todos") {
  @expose()
  id = Int8.column({ nonNull: true, generated: true });

  @expose()
  user_id = Int8.column({ nonNull: true });

  @expose()
  title = Text.column({ nonNull: true });

  @expose()
  completed = Bool.column({ nonNull: true });

  update(fields: { completed?: boolean; title?: string }) {
    return Todo.update()
      .where((ns) => ns.todos.id["="](this.id))
      .set(() => fields);
  }
}

beforeAll(async () => {
  await conn.execute(sql`
    CREATE TABLE users (
      id   int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )
  `);
  await conn.execute(sql`
    CREATE TABLE todos (
      id        int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      user_id   int8 NOT NULL,
      title     text NOT NULL,
      completed bool NOT NULL DEFAULT false
    )
  `);
  await conn.execute(sql`INSERT INTO users (name) VALUES ('alice'), ('bob')`);
  await conn.execute(sql`INSERT INTO todos (user_id, title, completed) VALUES
    (1, 'a-one', false), (1, 'a-two', false), (2, 'b-one', false)`);
});

describe("db.hydrate", () => {
  test("returns class instances with the same prototype chain", async () => {
    const users = await conn.hydrate(User.from().orderBy((ns) => ns.users.id));
    expectTypeOf(users).toEqualTypeOf<User[]>();
    expect(users).toHaveLength(2);
    expect(users[0]).toBeInstanceOf(User);
    expect(typeof users[0]!.todos).toBe("function");
  });

  test("hydrated column is an Any wrapping the deserialized value", async () => {
    const [user] = await conn.hydrate(
      User.from().where((ns) => ns.users.id["="]("1")).limit(1),
    );
    // id stays a typed Any after hydrate — that's what lets relation methods
    // ("this.id.eq(...)") compose into follow-up queries.
    expectTypeOf(user!.id).toMatchTypeOf<Int8<1>>();
    // toSql() is on Any; if hydrate returned plain values it'd be undefined.
    expect(user!.id.toSql).toBeDefined();
  });

  test("relation method on a hydrated instance runs as a real query", async () => {
    const [alice] = await conn.hydrate(
      User.from().where((ns) => ns.users.id["="]("1")).limit(1),
    );
    // Call the relation method on the materialized instance. The method
    // composes `this.id` (an Any wrapping the param) into a fresh
    // QueryBuilder which we then run.
    expectTypeOf(alice!.todos()).toEqualTypeOf<QueryBuilder<{ todos: Todo }, Todo, []>>();
    const aliceTodos = await conn.execute(alice!.todos());
    // db.execute returns deserialized JS values, not Any wrappers — so
    // .title is `string`, not `Text<1>`. (RowTypeToTsType also threads
    // class methods through, so the row type is wider than just columns;
    // checking the column fields one by one keeps the assertion focused.)
    expectTypeOf(aliceTodos[0]!.id).toEqualTypeOf<string>();
    expectTypeOf(aliceTodos[0]!.title).toEqualTypeOf<string>();
    expectTypeOf(aliceTodos[0]!.completed).toEqualTypeOf<boolean>();
    expect(aliceTodos).toHaveLength(2);
    expect(aliceTodos.map((t) => t.title).sort()).toEqual(["a-one", "a-two"]);
  });

  test("instance mutation method runs as a real query", async () => {
    const [todo] = await conn.hydrate(
      Todo.from().where((ns) => ns.todos.title["="](Text.from("a-one"))).limit(1),
    );
    expectTypeOf(todo!.completed).toMatchTypeOf<Bool<1>>();
    expect(todo!.completed).toBeDefined();

    await conn.execute(todo!.update({ completed: true }));

    const [after] = await conn.execute(
      Todo.from().where((ns) => ns.todos.title["="](Text.from("a-one"))),
    );
    expectTypeOf(after!.completed).toEqualTypeOf<boolean>();
    expect(after!.completed).toBe(true);
  });

  test("chained hydrate -> method -> hydrate -> method", async () => {
    const [alice] = await conn.hydrate(
      User.from().where((ns) => ns.users.id["="]("1")).limit(1),
    );
    const [firstTodo] = await conn.hydrate(
      alice!.todos().orderBy((ns) => ns.todos.id).limit(1),
    );
    // Hydrate yields a Todo instance, not a plain row — methods on Todo
    // (update(), the column accessors) must be callable on `firstTodo`.
    expectTypeOf(firstTodo!).toMatchTypeOf<Todo>();
    expect(firstTodo).toBeInstanceOf(Todo);

    await conn.execute(firstTodo!.update({ title: "renamed" }));

    const [reloaded] = await conn.execute(
      Todo.from().where((ns) => ns.todos.id["="](firstTodo!.id)),
    );
    expectTypeOf(reloaded!.title).toEqualTypeOf<string>();
    expect(reloaded!.title).toBe("renamed");
  });
});
