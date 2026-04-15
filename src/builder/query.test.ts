import { test, expect, expectTypeOf, beforeAll, afterAll } from "vitest";
import { pgliteExecutor } from "../executor";
import type { Executor } from "../executor";
import { Database } from "../database";
import { Int4, Int8, Text, Bool } from "../types";
import { sql } from "./sql";

let exec: Executor;
let db: Database;

beforeAll(async () => {
  exec = await pgliteExecutor();
  db = new Database(exec);
});

afterAll(async () => {
  await exec.close();
});

// --- values() ---

test("values with single typed row", async () => {
  const q = db.values({ a: new Int4(1), b: new Text("hello") });
  const compiled = q.compile().compile("pg");
  expect(compiled.text).toContain("VALUES");
  expect(compiled.text).toContain("CAST");
});

test("values with multiple rows, second row uses primitives", async () => {
  const q = db.values({ x: new Int4(1), y: new Text("a") }, { x: 2, y: "b" });
  const compiled = q.compile().compile("pg");
  expect(compiled.text).toContain("VALUES");
});

// --- values().select() ---

test("values with select identity", async () => {
  const q = db.values({ num: new Int4(42), name: new Text("test") }).select((n) => n.values);
  const compiled = q.compile().compile("pg");
  expect(compiled.text).toContain("SELECT");
  expect(compiled.text).toContain("VALUES");
});

test("values with select computed column", async () => {
  const q = db.values({ a: new Int4(5), b: new Int4(3) }).select((n) => ({
    sum: n.values.a["+"](n.values.b),
  }));
  const compiled = q.compile().compile("pg");
  expect(compiled.text).toContain("SELECT");
  expect(compiled.text).toContain("+");
});

// --- e2e ---

test("e2e: values single row", async () => {
  const result = await db.values({ a: new Int4(1), b: new Text("hello") }).execute();
  expectTypeOf(result).toEqualTypeOf<{ a: number; b: string }[]>();
  expect(result).toEqual([{ a: 1, b: "hello" }]);
});

test("e2e: values multiple rows", async () => {
  const result = await db.values({ x: new Int4(1), y: new Text("a") }, { x: 2, y: "b" }).execute();
  expectTypeOf(result).toEqualTypeOf<{ x: number; y: string }[]>();
  expect(result).toEqual([
    { x: 1, y: "a" },
    { x: 2, y: "b" },
  ]);
});

test("e2e: values with select expression", async () => {
  const result = await db
    .values({ a: new Int4(10), b: new Int4(20) })
    .select((n) => ({
      sum: n.values.a["+"](n.values.b),
    }))
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ sum: number }[]>();
  expect(result).toEqual([{ sum: 30 }]);
});

test("e2e: values with string upper", async () => {
  const result = await db
    .values({ name: new Text("hello") })
    .select((n) => ({
      upper: n.values.name.upper(),
    }))
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ upper: string }[]>();
  expect(result).toEqual([{ upper: "HELLO" }]);
});

test("e2e: values with mixed types", async () => {
  const result = await db
    .values({ num: new Int4(42), str: new Text("test"), flag: new Bool(true) })
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ num: number; str: string; flag: boolean }[]>();
  expect(result).toEqual([{ num: 42, str: "test", flag: true }]);
});

test("e2e: values with primitive second row", async () => {
  const result = await db.values({ a: new Int4(1) }, { a: 2 }, { a: 3 }).execute();
  expectTypeOf(result).toEqualTypeOf<{ a: number }[]>();
  expect(result).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }]);
});

// --- where ---

test("e2e: where filters rows", async () => {
  const result = await db
    .values({ a: new Int4(1), b: new Text("yes") }, { a: 2, b: "no" }, { a: 3, b: "yes" })
    .where((n) => n.values.a[">"](2))
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ a: number; b: string }[]>();
  expect(result).toEqual([{ a: 3, b: "yes" }]);
});

test("e2e: where with equality", async () => {
  const result = await db
    .values({ x: new Int4(10) }, { x: 20 }, { x: 10 })
    .where((n) => n.values.x["="](10))
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ x: number }[]>();
  expect(result).toEqual([{ x: 10 }, { x: 10 }]);
});

test("where compiles to SQL", () => {
  const q = db.values({ a: new Int4(1) }).where((n) => n.values.a[">"](5));
  const compiled = q.compile().compile("pg");
  expect(compiled.text).toContain("WHERE");
});

// --- groupBy ---

test("groupBy compiles to SQL", () => {
  const q = db
    .values(
      { category: new Text("a"), amount: new Int4(10) },
      { category: "a", amount: 20 },
      { category: "b", amount: 30 },
    )
    .groupBy((n) => [n.values.category]);
  const compiled = q.compile().compile("pg");
  expect(compiled.text).toContain("GROUP BY");
});

test("e2e: groupBy select using numeric index", async () => {
  // n.values.category is the same expression used in groupBy — should work directly
  const result = await db
    .values(
      { category: new Text("x"), val: new Int4(1) },
      { category: "x", val: 2 },
      { category: "y", val: 3 },
    )
    .groupBy((n) => [n.values.category])
    .select(({ 0: cat }) => ({
      cat: cat,
    }))
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ cat: string }[]>();
  expect(result.sort((a, b) => a.cat.localeCompare(b.cat))).toEqual([{ cat: "x" }, { cat: "y" }]);
});

test("e2e: groupBy with select", async () => {
  const result = await db
    .values(
      { category: new Text("a"), amount: new Int4(10) },
      { category: "a", amount: 20 },
      { category: "b", amount: 30 },
    )
    .groupBy((n) => [n.values.category])
    .select((n) => ({
      category: n.values.category,
    }))
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ category: string }[]>();
  expect(result.sort((a, b) => a.category.localeCompare(b.category))).toEqual([
    { category: "a" },
    { category: "b" },
  ]);
});

// --- having ---

test("having compiles to SQL", () => {
  const q = db
    .values(
      { category: new Text("a"), amount: new Int4(10) },
      { category: "a", amount: 20 },
      { category: "b", amount: 5 },
    )
    .groupBy((n) => [n.values.category])
    .having((n) => n.values.category[">"](new Text("a")));
  const compiled = q.compile().compile("pg");
  expect(compiled.text).toContain("HAVING");
  expect(compiled.text).toContain("GROUP BY");
});

test("e2e: having filters groups", async () => {
  // Group by category, only keep groups where category > 'a'
  const result = await db
    .values(
      { category: new Text("a"), val: new Int4(1) },
      { category: "b", val: 2 },
      { category: "c", val: 3 },
    )
    .groupBy((n) => [n.values.category])
    .having((n) => n.values.category[">"](new Text("a")))
    .select(({ 0: cat }) => ({
      cat,
    }))
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ cat: string }[]>();
  expect(result.sort((a, b) => a.cat.localeCompare(b.cat))).toEqual([
    { cat: "b" },
    { cat: "c" },
  ]);
});

test("e2e: where + groupBy + having", async () => {
  const result = await db
    .values(
      { category: new Text("a"), amount: new Int4(10) },
      { category: "a", amount: 20 },
      { category: "b", amount: 5 },
      { category: "b", amount: 100 },
      { category: "c", amount: 1 },
    )
    .where((n) => n.values.amount[">"](3))
    .groupBy((n) => [n.values.category])
    .having((n) => n.values.category["<>"](new Text("c")))
    .select(({ 0: cat }) => ({
      cat,
    }))
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ cat: string }[]>();
  expect(result.sort((a, b) => a.cat.localeCompare(b.cat))).toEqual([
    { cat: "a" },
    { cat: "b" },
  ]);
});

// --- orderBy ---

test("orderBy compiles to SQL", () => {
  const q = db
    .values({ a: new Int4(1) })
    .orderBy((n) => [n.values.a, "desc"]);
  const compiled = q.compile().compile("pg");
  expect(compiled.text).toContain("ORDER BY");
  expect(compiled.text).toContain("DESC");
});

test("e2e: orderBy single expr (default asc)", async () => {
  const result = await db
    .values({ x: new Int4(3) }, { x: 1 }, { x: 2 })
    .orderBy((n) => n.values.x)
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ x: number }[]>();
  expect(result).toEqual([{ x: 1 }, { x: 2 }, { x: 3 }]);
});

test("e2e: orderBy single tuple", async () => {
  const result = await db
    .values({ x: new Int4(3) }, { x: 1 }, { x: 2 })
    .orderBy((n) => [n.values.x, "desc"])
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ x: number }[]>();
  expect(result).toEqual([{ x: 3 }, { x: 2 }, { x: 1 }]);
});

test("e2e: orderBy stacking", async () => {
  const result = await db
    .values(
      { a: new Text("x"), b: new Int4(2) },
      { a: "x", b: 1 },
      { a: "y", b: 3 },
    )
    .orderBy((n) => n.values.a)
    .orderBy((n) => [n.values.b, "desc"])
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ a: string; b: number }[]>();
  expect(result).toEqual([
    { a: "x", b: 2 },
    { a: "x", b: 1 },
    { a: "y", b: 3 },
  ]);
});

test("e2e: orderBy multiple columns", async () => {
  const result = await db
    .values(
      { a: new Text("x"), b: new Int4(2) },
      { a: "x", b: 1 },
      { a: "y", b: 3 },
    )
    .orderBy((n) => [
      [n.values.a, "asc"],
      [n.values.b, "desc"],
    ])
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ a: string; b: number }[]>();
  expect(result).toEqual([
    { a: "x", b: 2 },
    { a: "x", b: 1 },
    { a: "y", b: 3 },
  ]);
});

// --- limit / offset ---

test("e2e: limit", async () => {
  const result = await db
    .values({ x: new Int4(1) }, { x: 2 }, { x: 3 })
    .orderBy((n) => [[n.values.x, "asc"]])
    .limit(2)
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ x: number }[]>();
  expect(result).toEqual([{ x: 1 }, { x: 2 }]);
});

test("e2e: offset", async () => {
  const result = await db
    .values({ x: new Int4(1) }, { x: 2 }, { x: 3 })
    .orderBy((n) => [[n.values.x, "asc"]])
    .offset(1)
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ x: number }[]>();
  expect(result).toEqual([{ x: 2 }, { x: 3 }]);
});

test("e2e: limit + offset (pagination)", async () => {
  const result = await db
    .values({ x: new Int4(1) }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 })
    .orderBy((n) => [[n.values.x, "asc"]])
    .limit(2)
    .offset(2)
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ x: number }[]>();
  expect(result).toEqual([{ x: 3 }, { x: 4 }]);
});

test("e2e: where + orderBy + limit", async () => {
  const result = await db
    .values({ x: new Int4(10) }, { x: 5 }, { x: 20 }, { x: 1 }, { x: 15 })
    .where((n) => n.values.x[">"](5))
    .orderBy((n) => [[n.values.x, "asc"]])
    .limit(2)
    .execute();
  expectTypeOf(result).toEqualTypeOf<{ x: number }[]>();
  expect(result).toEqual([{ x: 10 }, { x: 15 }]);
});

// --- joins ---

const withinTransaction = async (fn: () => Promise<void>) => {
  await exec.execute(sql`BEGIN`);
  try {
    await fn();
  } finally {
    await exec.execute(sql`ROLLBACK`);
  }
};

test("inner join", async () => {
  await withinTransaction(async () => {
    await exec.execute(sql`CREATE TABLE owners (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )`);
    await exec.execute(sql`CREATE TABLE pets (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      owner_id int8 NOT NULL REFERENCES owners(id)
    )`);
    await exec.execute(sql`INSERT INTO owners (name) VALUES ('Alice'), ('Bob')`);
    await exec.execute(sql`INSERT INTO pets (name, owner_id) VALUES ('Rex', 1), ('Fido', 2), ('Buddy', 1)`);

    class Owners extends db.Table("owners") {
      id = (Int8<1>).column({ nonNull: true });
      name = (Text<1>).column({ nonNull: true });
    }
    class Pets extends db.Table("pets") {
      id = (Int8<1>).column({ nonNull: true });
      name = (Text<1>).column({ nonNull: true });
      owner_id = (Int8<1>).column({ nonNull: true });
    }

    const rows = await Pets.from()
      .join(Owners, ({ pets, owners }) => pets.owner_id["="](owners.id))
      .select(({ pets, owners }) => ({
        pet: pets.name,
        owner: owners.name,
      }))
      .execute();

    expectTypeOf(rows).toEqualTypeOf<{ pet: string; owner: string }[]>();
    expect(rows).toEqual([
      { pet: "Rex", owner: "Alice" },
      { pet: "Fido", owner: "Bob" },
      { pet: "Buddy", owner: "Alice" },
    ]);
  });
});

test("left join — unmatched rows return null", async () => {
  await withinTransaction(async () => {
    await exec.execute(sql`CREATE TABLE authors (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )`);
    await exec.execute(sql`CREATE TABLE books (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      title text NOT NULL,
      author_id int8 NOT NULL REFERENCES authors(id)
    )`);
    await exec.execute(sql`INSERT INTO authors (name) VALUES ('Alice'), ('Bob')`);
    await exec.execute(sql`INSERT INTO books (title, author_id) VALUES ('Book A', 1)`);

    class Authors extends db.Table("authors") {
      id = (Int8<1>).column({ nonNull: true });
      name = (Text<1>).column({ nonNull: true });
    }
    class Books extends db.Table("books") {
      id = (Int8<1>).column({ nonNull: true });
      title = (Text<1>).column({ nonNull: true });
      author_id = (Int8<1>).column({ nonNull: true });
    }

    const rows = await Authors.from()
      .leftJoin(Books, ({ authors, books }) => authors.id["="](books.author_id))
      .select(({ authors, books }) => ({
        author: authors.name,
        title: books.title,
      }))
      .execute();

    expectTypeOf(rows).toEqualTypeOf<{ author: string; title: string | null }[]>();
    expect(rows).toEqual([
      { author: "Alice", title: "Book A" },
      { author: "Bob", title: null },
    ]);
  });
});

test("join with where on joined table", async () => {
  await withinTransaction(async () => {
    await exec.execute(sql`CREATE TABLE departments (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )`);
    await exec.execute(sql`CREATE TABLE employees (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      dept_id int8 REFERENCES departments(id)
    )`);
    await exec.execute(sql`INSERT INTO departments (name) VALUES ('Engineering'), ('Sales')`);
    await exec.execute(sql`INSERT INTO employees (name, dept_id) VALUES ('Alice', 1), ('Bob', 1), ('Carol', 2)`);

    class Departments extends db.Table("departments") {
      id = (Int8<1>).column({ nonNull: true });
      name = (Text<1>).column({ nonNull: true });
    }
    class Employees extends db.Table("employees") {
      id = (Int8<1>).column({ nonNull: true });
      name = (Text<1>).column({ nonNull: true });
      dept_id = (Int8<0 | 1>).column();
    }

    const rows = await Departments.from()
      .join(Employees, ({ departments, employees }) => departments.id["="](employees.dept_id))
      .select(({ departments, employees }) => ({
        dept: departments.name,
        emp: employees.name,
      }))
      .where(({ departments }) => departments.name["="]("Engineering"))
      .execute();

    expectTypeOf(rows).toEqualTypeOf<{ dept: string; emp: string }[]>();
    expect(rows).toEqual([
      { dept: "Engineering", emp: "Alice" },
      { dept: "Engineering", emp: "Bob" },
    ]);
  });
});

// --- scalar / cardinality ---

test("scalar with cardinality 'one'", async () => {
  await withinTransaction(async () => {
    await exec.execute(sql`CREATE TABLE authors (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )`);
    await exec.execute(sql`CREATE TABLE books (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      title text NOT NULL,
      author_id int8 NOT NULL REFERENCES authors(id)
    )`);
    await exec.execute(sql`INSERT INTO authors (name) VALUES ('Alice')`);
    await exec.execute(sql`INSERT INTO books (title, author_id) VALUES ('Book A', 1), ('Book B', 1)`);

    class Authors extends db.Table("authors") {
      id = (Int8<1>).column({ nonNull: true, generated: true });
      name = (Text<1>).column({ nonNull: true });
    }
    class Books extends db.Table("books") {
      id = (Int8<1>).column({ nonNull: true, generated: true });
      title = (Text<1>).column({ nonNull: true });
      author_id = (Int8<1>).column({ nonNull: true });
    }

    // Scalar subquery: get author for a book (cardinality 'one')
    const rows = await Books.from()
      .select(({ books }) => ({
        title: books.title,
        author: Authors.from()
          .where(({ authors }) => authors.id["="](books.author_id))
          .select(({ authors }) => ({ name: authors.name }))
          .cardinality("one")
          .scalar(),
      }))
      .execute();

    // TODO: TsTypeOf doesn't recursively unwrap Record<O> — nested type is O not TsTypeOf<O>
    expectTypeOf(rows[0]!.title).toEqualTypeOf<string>();
    expect(rows).toHaveLength(2);
    expect(rows[0]).toEqual({ title: "Book A", author: { name: "Alice" } });
    expect(rows[1]).toEqual({ title: "Book B", author: { name: "Alice" } });
  });
});

test("scalar with cardinality 'maybe' — null when no match", async () => {
  await withinTransaction(async () => {
    await exec.execute(sql`CREATE TABLE people (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )`);
    await exec.execute(sql`CREATE TABLE profiles (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      person_id int8 UNIQUE NOT NULL REFERENCES people(id),
      bio text NOT NULL
    )`);
    await exec.execute(sql`INSERT INTO people (name) VALUES ('Alice'), ('Bob')`);
    await exec.execute(sql`INSERT INTO profiles (person_id, bio) VALUES (1, 'Hello')`);

    class People extends db.Table("people") {
      id = (Int8<1>).column({ nonNull: true, generated: true });
      name = (Text<1>).column({ nonNull: true });
    }
    class Profiles extends db.Table("profiles") {
      id = (Int8<1>).column({ nonNull: true, generated: true });
      person_id = (Int8<1>).column({ nonNull: true });
      bio = (Text<1>).column({ nonNull: true });
    }

    const rows = await People.from()
      .select(({ people }) => ({
        name: people.name,
        profile: Profiles.from()
          .where(({ profiles }) => profiles.person_id["="](people.id))
          .select(({ profiles }) => ({ bio: profiles.bio }))
          .cardinality("maybe")
          .scalar(),
      }))
      .orderBy(({ people }) => people.name)
      .execute();

    expectTypeOf(rows).toEqualTypeOf<{
      name: string;
      profile: { bio: string } | null
    }[]>();
    expect(rows).toEqual([
      { name: "Alice", profile: { bio: "Hello" } },
      { name: "Bob", profile: null },
    ]);
  });
});

test("scalar with cardinality 'many' — array result", async () => {
  await withinTransaction(async () => {
    await exec.execute(sql`CREATE TABLE parents (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )`);
    await exec.execute(sql`CREATE TABLE children (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      parent_id int8 NOT NULL REFERENCES parents(id)
    )`);
    await exec.execute(sql`INSERT INTO parents (name) VALUES ('Alice'), ('Bob')`);
    await exec.execute(sql`INSERT INTO children (name, parent_id) VALUES ('Charlie', 1), ('Diana', 1)`);

    class Parents extends db.Table("parents") {
      id = (Int8<1>).column({ nonNull: true, generated: true });
      name = (Text<1>).column({ nonNull: true });
    }
    class Children extends db.Table("children") {
      id = (Int8<1>).column({ nonNull: true, generated: true });
      name = (Text<1>).column({ nonNull: true });
      parent_id = (Int8<1>).column({ nonNull: true });
    }

    const rows = await Parents.from()
      .select(({ parents }) => ({
        name: parents.name,
        kids: Children.from()
          .where(({ children }) => children.parent_id["="](parents.id))
          .select(({ children }) => ({ name: children.name }))
          .cardinality("many")
          .scalar(),
      }))
      .orderBy(({ parents }) => parents.name)
      .execute();

    expectTypeOf(rows).toEqualTypeOf<{
      name: string;
      kids: { name: string }[];
    }[]>();
    expect(rows).toEqual([
      { name: "Alice", kids: [{ name: "Charlie" }, { name: "Diana" }] },
      { name: "Bob", kids: [] },
    ]);
  });
});

// --- aggregates ---

test("count on values", async () => {
  const result = await db
    .values({ x: new Int4(1) }, { x: 2 }, { x: 3 })
    .groupBy()
    .select((n) => ({ total: n.values.x.count() }))
    .execute();

  expectTypeOf(result).toEqualTypeOf<{ total: bigint }[]>();
  expect(result).toEqual([{ total: 3n }]);
});

test("sum and avg", async () => {
  const result = await db
    .values({ x: new Int4(10) }, { x: 20 }, { x: 30 })
    .groupBy()
    .select((n) => ({ total: n.values.x.sum(), average: n.values.x.avg() }))
    .execute();

  expectTypeOf(result).toEqualTypeOf<{ total: bigint | null; average: string | null }[]>();
  expect(result).toEqual([{ total: 60n, average: "20.0000000000000000" }]);
});

test("groupBy with count", async () => {
  const result = await db
    .values(
      { cat: new Text("a"), val: new Int4(1) },
      { cat: "a", val: 2 },
      { cat: "b", val: 3 },
    )
    .groupBy((n) => [n.values.cat])
    .select(({ 0: cat, values }) => ({
      cat,
      count: values.val.count(),
      total: values.val.sum(),
    }))
    .orderBy(({ 0: cat }) => cat)
    .execute();

  expectTypeOf(result).toEqualTypeOf<{ cat: string; count: bigint; total: bigint | null }[]>();
  expect(result).toEqual([
    { cat: "a", count: 2n, total: 3n },
    { cat: "b", count: 1n, total: 3n },
  ]);
});

test("max and min", async () => {
  const result = await db
    .values({ x: new Int4(5) }, { x: 1 }, { x: 9 })
    .groupBy()
    .select((n) => ({ hi: n.values.x.max(), lo: n.values.x.min() }))
    .execute();

  expectTypeOf(result).toEqualTypeOf<{ hi: number | null; lo: number | null }[]>();
  expect(result).toEqual([{ hi: 9, lo: 1 }]);
});
