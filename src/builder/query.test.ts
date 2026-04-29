import { test, expect, expectTypeOf } from "vitest";
import { Int4, Int8, Text, Bool, Jsonb } from "../types";
import { sql, compile } from "./sql";
import { db } from "./test-helper";

// --- values() ---

test("values with single typed row", async () => {
  const q = db.values({ a: Int4.from(1), b: Text.from("hello") });
  const compiled = compile(q, "pg");
  expect(compiled.text).toContain("VALUES");
  expect(compiled.text).toContain("CAST");
});

test("values with multiple rows, second row uses primitives", async () => {
  const q = db.values({ x: Int4.from(1), y: Text.from("a") }, { x: 2, y: "b" });
  const compiled = compile(q, "pg");
  expect(compiled.text).toContain("VALUES");
});

// --- values().select() ---

test("values with select identity", async () => {
  const q = db.values({ num: Int4.from(42), name: Text.from("test") }).select((n) => n.values);
  const compiled = compile(q, "pg");
  expect(compiled.text).toContain("SELECT");
  expect(compiled.text).toContain("VALUES");
});

test("values with select computed column", async () => {
  const q = db.values({ a: Int4.from(5), b: Int4.from(3) }).select((n) => ({
    sum: n.values.a["+"](n.values.b),
  }));
  const compiled = compile(q, "pg");
  expect(compiled.text).toContain("SELECT");
  expect(compiled.text).toContain("+");
});

// --- e2e ---

test("e2e: values single row", async () => {
  const result = await db.execute(db.values({ a: Int4.from(1), b: Text.from("hello") }));
  expectTypeOf(result).toEqualTypeOf<{ a: number; b: string }[]>();
  expect(result).toEqual([{ a: 1, b: "hello" }]);
});

test("e2e: values multiple rows", async () => {
  const result = await db.execute(db.values({ x: Int4.from(1), y: Text.from("a") }, { x: 2, y: "b" }));
  expectTypeOf(result).toEqualTypeOf<{ x: number; y: string }[]>();
  expect(result).toEqual([
    { x: 1, y: "a" },
    { x: 2, y: "b" },
  ]);
});

test("e2e: values with select expression", async () => {
  const result = await db.execute(db
    .values({ a: Int4.from(10), b: Int4.from(20) })
    .select((n) => ({
      sum: n.values.a["+"](n.values.b),
    }))
    );
  expectTypeOf(result).toEqualTypeOf<{ sum: number }[]>();
  expect(result).toEqual([{ sum: 30 }]);
});

test("e2e: values with string upper", async () => {
  const result = await db.execute(db
    .values({ name: Text.from("hello") })
    .select((n) => ({
      upper: n.values.name.upper(),
    }))
    );
  expectTypeOf(result).toEqualTypeOf<{ upper: string }[]>();
  expect(result).toEqual([{ upper: "HELLO" }]);
});

test("e2e: values with mixed types", async () => {
  const result = await db.execute(db
    .values({ num: Int4.from(42), str: Text.from("test"), flag: Bool.from(true) })
    );
  expectTypeOf(result).toEqualTypeOf<{ num: number; str: string; flag: boolean }[]>();
  expect(result).toEqual([{ num: 42, str: "test", flag: true }]);
});

test("e2e: values with primitive second row", async () => {
  const result = await db.execute(db.values({ a: Int4.from(1) }, { a: 2 }, { a: 3 }));
  expectTypeOf(result).toEqualTypeOf<{ a: number }[]>();
  expect(result).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }]);
});

// --- where ---

test("e2e: where filters rows", async () => {
  const result = await db.execute(db
    .values({ a: Int4.from(1), b: Text.from("yes") }, { a: 2, b: "no" }, { a: 3, b: "yes" })
    .where((n) => n.values.a[">"](2))
    );
  expectTypeOf(result).toEqualTypeOf<{ a: number; b: string }[]>();
  expect(result).toEqual([{ a: 3, b: "yes" }]);
});

test("e2e: where with equality", async () => {
  const result = await db.execute(db
    .values({ x: Int4.from(10) }, { x: 20 }, { x: 10 })
    .where((n) => n.values.x["="](10))
    );
  expectTypeOf(result).toEqualTypeOf<{ x: number }[]>();
  expect(result).toEqual([{ x: 10 }, { x: 10 }]);
});

test("where compiles to SQL", () => {
  const q = db.values({ a: Int4.from(1) }).where((n) => n.values.a[">"](5));
  const compiled = compile(q, "pg");
  expect(compiled.text).toContain("WHERE");
});

// --- groupBy ---

test("groupBy compiles to SQL", () => {
  const q = db
    .values(
      { category: Text.from("a"), amount: Int4.from(10) },
      { category: "a", amount: 20 },
      { category: "b", amount: 30 },
    )
    .groupBy((n) => [n.values.category]);
  const compiled = compile(q, "pg");
  expect(compiled.text).toContain("GROUP BY");
});

test("e2e: groupBy select using numeric index", async () => {
  // n.values.category is the same expression used in groupBy — should work directly
  const result = await db.execute(db
    .values(
      { category: Text.from("x"), val: Int4.from(1) },
      { category: "x", val: 2 },
      { category: "y", val: 3 },
    )
    .groupBy((n) => [n.values.category])
    .select(({ 0: cat }) => ({
      cat: cat,
    }))
    );
  expectTypeOf(result).toEqualTypeOf<{ cat: string }[]>();
  expect(result.sort((a, b) => a.cat.localeCompare(b.cat))).toEqual([{ cat: "x" }, { cat: "y" }]);
});

test("e2e: groupBy with select", async () => {
  const result = await db.execute(db
    .values(
      { category: Text.from("a"), amount: Int4.from(10) },
      { category: "a", amount: 20 },
      { category: "b", amount: 30 },
    )
    .groupBy((n) => [n.values.category])
    .select((n) => ({
      category: n.values.category,
    }))
    );
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
      { category: Text.from("a"), amount: Int4.from(10) },
      { category: "a", amount: 20 },
      { category: "b", amount: 5 },
    )
    .groupBy((n) => [n.values.category])
    .having((n) => n.values.category[">"](Text.from("a")));
  const compiled = compile(q, "pg");
  expect(compiled.text).toContain("HAVING");
  expect(compiled.text).toContain("GROUP BY");
});

test("e2e: having filters groups", async () => {
  // Group by category, only keep groups where category > 'a'
  const result = await db.execute(db
    .values(
      { category: Text.from("a"), val: Int4.from(1) },
      { category: "b", val: 2 },
      { category: "c", val: 3 },
    )
    .groupBy((n) => [n.values.category])
    .having((n) => n.values.category[">"](Text.from("a")))
    .select(({ 0: cat }) => ({
      cat,
    }))
    );
  expectTypeOf(result).toEqualTypeOf<{ cat: string }[]>();
  expect(result.sort((a, b) => a.cat.localeCompare(b.cat))).toEqual([
    { cat: "b" },
    { cat: "c" },
  ]);
});

test("e2e: where + groupBy + having", async () => {
  const result = await db.execute(db
    .values(
      { category: Text.from("a"), amount: Int4.from(10) },
      { category: "a", amount: 20 },
      { category: "b", amount: 5 },
      { category: "b", amount: 100 },
      { category: "c", amount: 1 },
    )
    .where((n) => n.values.amount[">"](3))
    .groupBy((n) => [n.values.category])
    .having((n) => n.values.category["<>"](Text.from("c")))
    .select(({ 0: cat }) => ({
      cat,
    }))
    );
  expectTypeOf(result).toEqualTypeOf<{ cat: string }[]>();
  expect(result.sort((a, b) => a.cat.localeCompare(b.cat))).toEqual([
    { cat: "a" },
    { cat: "b" },
  ]);
});

// --- orderBy ---

test("orderBy compiles to SQL", () => {
  const q = db
    .values({ a: Int4.from(1) })
    .orderBy((n) => [n.values.a, "desc"]);
  const compiled = compile(q, "pg");
  expect(compiled.text).toContain("ORDER BY");
  expect(compiled.text).toContain("DESC");
});

test("e2e: orderBy single expr (default asc)", async () => {
  const result = await db.execute(db
    .values({ x: Int4.from(3) }, { x: 1 }, { x: 2 })
    .orderBy((n) => n.values.x)
    );
  expectTypeOf(result).toEqualTypeOf<{ x: number }[]>();
  expect(result).toEqual([{ x: 1 }, { x: 2 }, { x: 3 }]);
});

test("e2e: orderBy single tuple", async () => {
  const result = await db.execute(db
    .values({ x: Int4.from(3) }, { x: 1 }, { x: 2 })
    .orderBy((n) => [n.values.x, "desc"])
    );
  expectTypeOf(result).toEqualTypeOf<{ x: number }[]>();
  expect(result).toEqual([{ x: 3 }, { x: 2 }, { x: 1 }]);
});

test("e2e: orderBy stacking", async () => {
  const result = await db.execute(db
    .values(
      { a: Text.from("x"), b: Int4.from(2) },
      { a: "x", b: 1 },
      { a: "y", b: 3 },
    )
    .orderBy((n) => n.values.a)
    .orderBy((n) => [n.values.b, "desc"])
    );
  expectTypeOf(result).toEqualTypeOf<{ a: string; b: number }[]>();
  expect(result).toEqual([
    { a: "x", b: 2 },
    { a: "x", b: 1 },
    { a: "y", b: 3 },
  ]);
});

test("e2e: orderBy multiple columns", async () => {
  const result = await db.execute(db
    .values(
      { a: Text.from("x"), b: Int4.from(2) },
      { a: "x", b: 1 },
      { a: "y", b: 3 },
    )
    .orderBy((n) => [
      [n.values.a, "asc"],
      [n.values.b, "desc"],
    ])
    );
  expectTypeOf(result).toEqualTypeOf<{ a: string; b: number }[]>();
  expect(result).toEqual([
    { a: "x", b: 2 },
    { a: "x", b: 1 },
    { a: "y", b: 3 },
  ]);
});

// --- limit / offset ---

test("e2e: limit", async () => {
  const result = await db.execute(db
    .values({ x: Int4.from(1) }, { x: 2 }, { x: 3 })
    .orderBy((n) => [[n.values.x, "asc"]])
    .limit(2)
    );
  expectTypeOf(result).toEqualTypeOf<{ x: number }[]>();
  expect(result).toEqual([{ x: 1 }, { x: 2 }]);
});

test("e2e: offset", async () => {
  const result = await db.execute(db
    .values({ x: Int4.from(1) }, { x: 2 }, { x: 3 })
    .orderBy((n) => [[n.values.x, "asc"]])
    .offset(1)
    );
  expectTypeOf(result).toEqualTypeOf<{ x: number }[]>();
  expect(result).toEqual([{ x: 2 }, { x: 3 }]);
});

test("e2e: limit + offset (pagination)", async () => {
  const result = await db.execute(db
    .values({ x: Int4.from(1) }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 })
    .orderBy((n) => [[n.values.x, "asc"]])
    .limit(2)
    .offset(2)
    );
  expectTypeOf(result).toEqualTypeOf<{ x: number }[]>();
  expect(result).toEqual([{ x: 3 }, { x: 4 }]);
});

test("e2e: where + orderBy + limit", async () => {
  const result = await db.execute(db
    .values({ x: Int4.from(10) }, { x: 5 }, { x: 20 }, { x: 1 }, { x: 15 })
    .where((n) => n.values.x[">"](5))
    .orderBy((n) => [[n.values.x, "asc"]])
    .limit(2)
    );
  expectTypeOf(result).toEqualTypeOf<{ x: number }[]>();
  expect(result).toEqual([{ x: 10 }, { x: 15 }]);
});

// --- joins ---

const withinTransaction = async (fn: (tx: typeof db) => Promise<void>) => {
  await db.transaction(async (tx) => {
    await fn(tx);
    throw new Error("__test_rollback__");
  }).catch((e) => {
    if ((e as Error).message !== "__test_rollback__") {
      throw e;
    }
  });
};

test("inner join", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE owners (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )`);
    await tx.execute(sql`CREATE TABLE pets (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      owner_id int8 NOT NULL REFERENCES owners(id)
    )`);
    await tx.execute(sql`INSERT INTO owners (name) VALUES ('Alice'), ('Bob')`);
    await tx.execute(sql`INSERT INTO pets (name, owner_id) VALUES ('Rex', 1), ('Fido', 2), ('Buddy', 1)`);

    class Owners extends db.Table("owners") {
      id = (Int8<1>).column({ nonNull: true });      name = (Text<1>).column({ nonNull: true });    }
    class Pets extends db.Table("pets") {
      id = (Int8<1>).column({ nonNull: true });      name = (Text<1>).column({ nonNull: true });      owner_id = (Int8<1>).column({ nonNull: true });    }

    const rows = await tx.execute(Pets.from()
      .join(Owners, ({ pets, owners }) => pets.owner_id["="](owners.id))
      .select(({ pets, owners }) => ({
        pet: pets.name,
        owner: owners.name,
      }))
      );

    expectTypeOf(rows).toEqualTypeOf<{ pet: string; owner: string }[]>();
    expect(rows).toEqual([
      { pet: "Rex", owner: "Alice" },
      { pet: "Fido", owner: "Bob" },
      { pet: "Buddy", owner: "Alice" },
    ]);
  });
});

test("left join — unmatched rows return null", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE authors (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )`);
    await tx.execute(sql`CREATE TABLE books (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      title text NOT NULL,
      author_id int8 NOT NULL REFERENCES authors(id)
    )`);
    await tx.execute(sql`INSERT INTO authors (name) VALUES ('Alice'), ('Bob')`);
    await tx.execute(sql`INSERT INTO books (title, author_id) VALUES ('Book A', 1)`);

    class Authors extends db.Table("authors") {
      id = (Int8<1>).column({ nonNull: true });      name = (Text<1>).column({ nonNull: true });    }
    class Books extends db.Table("books") {
      id = (Int8<1>).column({ nonNull: true });      title = (Text<1>).column({ nonNull: true });      author_id = (Int8<1>).column({ nonNull: true });    }

    const rows = await tx.execute(Authors.from()
      .leftJoin(Books, ({ authors, books }) => authors.id["="](books.author_id))
      .select(({ authors, books }) => ({
        author: authors.name,
        title: books.title,
      }))
      );

    expectTypeOf(rows).toEqualTypeOf<{ author: string; title: string | null }[]>();
    expect(rows).toEqual([
      { author: "Alice", title: "Book A" },
      { author: "Bob", title: null },
    ]);
  });
});

test("join with where on joined table", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE departments (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )`);
    await tx.execute(sql`CREATE TABLE employees (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      dept_id int8 REFERENCES departments(id)
    )`);
    await tx.execute(sql`INSERT INTO departments (name) VALUES ('Engineering'), ('Sales')`);
    await tx.execute(sql`INSERT INTO employees (name, dept_id) VALUES ('Alice', 1), ('Bob', 1), ('Carol', 2)`);

    class Departments extends db.Table("departments") {
      id = (Int8<1>).column({ nonNull: true });      name = (Text<1>).column({ nonNull: true });    }
    class Employees extends db.Table("employees") {
      id = (Int8<1>).column({ nonNull: true });      name = (Text<1>).column({ nonNull: true });      dept_id = (Int8<0 | 1>).column();    }

    const rows = await tx.execute(Departments.from()
      .join(Employees, ({ departments, employees }) => departments.id["="](employees.dept_id))
      .select(({ departments, employees }) => ({
        dept: departments.name,
        emp: employees.name,
      }))
      .where(({ departments }) => departments.name["="]("Engineering"))
      );

    expectTypeOf(rows).toEqualTypeOf<{ dept: string; emp: string }[]>();
    expect(rows).toEqual([
      { dept: "Engineering", emp: "Alice" },
      { dept: "Engineering", emp: "Bob" },
    ]);
  });
});

// --- scalar / cardinality ---

test("scalar with cardinality 'one'", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE authors (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )`);
    await tx.execute(sql`CREATE TABLE books (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      title text NOT NULL,
      author_id int8 NOT NULL REFERENCES authors(id)
    )`);
    await tx.execute(sql`INSERT INTO authors (name) VALUES ('Alice')`);
    await tx.execute(sql`INSERT INTO books (title, author_id) VALUES ('Book A', 1), ('Book B', 1)`);

    class Authors extends db.Table("authors") {
      id = (Int8<1>).column({ nonNull: true, generated: true });      name = (Text<1>).column({ nonNull: true });    }
    class Books extends db.Table("books") {
      id = (Int8<1>).column({ nonNull: true, generated: true });      title = (Text<1>).column({ nonNull: true });      author_id = (Int8<1>).column({ nonNull: true });    }

    // Scalar subquery: get author for a book (cardinality 'one')
    const rows = await tx.execute(Books.from()
      .select(({ books }) => ({
        title: books.title,
        author: Authors.from()
          .where(({ authors }) => authors.id["="](books.author_id))
          .select(({ authors }) => ({ name: authors.name }))
          .cardinality("one")
          .scalar(),
      }))
      );

    // TODO: TsTypeOf doesn't recursively unwrap Record<O> — nested type is O not TsTypeOf<O>
    expectTypeOf(rows[0]!.title).toEqualTypeOf<string>();
    expect(rows).toHaveLength(2);
    expect(rows[0]).toEqual({ title: "Book A", author: { name: "Alice" } });
    expect(rows[1]).toEqual({ title: "Book B", author: { name: "Alice" } });
  });
});

test("scalar with cardinality 'maybe' — null when no match", async () => {
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE people (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )`);
    await tx.execute(sql`CREATE TABLE profiles (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      person_id int8 UNIQUE NOT NULL REFERENCES people(id),
      bio text NOT NULL
    )`);
    await tx.execute(sql`INSERT INTO people (name) VALUES ('Alice'), ('Bob')`);
    await tx.execute(sql`INSERT INTO profiles (person_id, bio) VALUES (1, 'Hello')`);

    class People extends db.Table("people") {
      id = (Int8<1>).column({ nonNull: true, generated: true });      name = (Text<1>).column({ nonNull: true });    }
    class Profiles extends db.Table("profiles") {
      id = (Int8<1>).column({ nonNull: true, generated: true });      person_id = (Int8<1>).column({ nonNull: true });      bio = (Text<1>).column({ nonNull: true });    }

    const rows = await tx.execute(People.from()
      .select(({ people }) => ({
        name: people.name,
        profile: Profiles.from()
          .where(({ profiles }) => profiles.person_id["="](people.id))
          .select(({ profiles }) => ({ bio: profiles.bio }))
          .cardinality("maybe")
          .scalar(),
      }))
      .orderBy(({ people }) => people.name)
      );

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
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE parents (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )`);
    await tx.execute(sql`CREATE TABLE children (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      parent_id int8 NOT NULL REFERENCES parents(id)
    )`);
    await tx.execute(sql`INSERT INTO parents (name) VALUES ('Alice'), ('Bob')`);
    await tx.execute(sql`INSERT INTO children (name, parent_id) VALUES ('Charlie', 1), ('Diana', 1)`);

    class Parents extends db.Table("parents") {
      id = (Int8<1>).column({ nonNull: true, generated: true });      name = (Text<1>).column({ nonNull: true });    }
    class Children extends db.Table("children") {
      id = (Int8<1>).column({ nonNull: true, generated: true });      name = (Text<1>).column({ nonNull: true });      parent_id = (Int8<1>).column({ nonNull: true });    }

    const rows = await tx.execute(Parents.from()
      .select(({ parents }) => ({
        name: parents.name,
        kids: Children.from()
          .where(({ children }) => children.parent_id["="](parents.id))
          .select(({ children }) => ({ name: children.name }))
          .cardinality("many")
          .scalar(),
      }))
      .orderBy(({ parents }) => parents.name)
      );

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
  const result = await db.execute(db
    .values({ x: Int4.from(1) }, { x: 2 }, { x: 3 })
    .groupBy()
    .select((n) => ({ total: n.values.x.count() }))
    );

  expectTypeOf(result).toEqualTypeOf<{ total: string }[]>();
  expect(result).toEqual([{ total: "3" }]);
});

test("sum and avg", async () => {
  const result = await db.execute(db
    .values({ x: Int4.from(10) }, { x: 20 }, { x: 30 })
    .groupBy()
    .select((n) => ({ total: n.values.x.sum(), average: n.values.x.avg() }))
    );

  expectTypeOf(result).toEqualTypeOf<{ total: string | null; average: string | null }[]>();
  expect(result).toEqual([{ total: "60", average: "20.0000000000000000" }]);
});

test("groupBy with count", async () => {
  const result = await db.execute(db
    .values(
      { cat: Text.from("a"), val: Int4.from(1) },
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
    );

  expectTypeOf(result).toEqualTypeOf<{ cat: string; count: string; total: string | null }[]>();
  expect(result).toEqual([
    { cat: "a", count: "2", total: "3" },
    { cat: "b", count: "1", total: "3" },
  ]);
});

test("max and min", async () => {
  const result = await db.execute(db
    .values({ x: Int4.from(5) }, { x: 1 }, { x: 9 })
    .groupBy()
    .select((n) => ({ hi: n.values.x.max(), lo: n.values.x.min() }))
    );

  expectTypeOf(result).toEqualTypeOf<{ hi: number | null; lo: number | null }[]>();
  expect(result).toEqual([{ hi: 9, lo: 1 }]);
});

// --- set-returning functions ---

test("generate_series as Fromable via db.from()", async () => {
  const series = Int4.from(1).generateSeries(3, 1);
  const result = await db.execute(db.from(series));

  expectTypeOf(result).toEqualTypeOf<{ generate_series: number }[]>();
  expect(result).toEqual([
    { generate_series: 1 },
    { generate_series: 2 },
    { generate_series: 3 },
  ]);
});

test("jsonb_each_text as multi-column SRF", async () => {
  const jsonVal = Jsonb.from('{"a": 1, "b": 2}');
  const each = jsonVal.jsonbEachText();
  const result = await db.execute(db.from(each)
    .orderBy(({ jsonb_each_text }) => jsonb_each_text.key)
    );

  expectTypeOf(result).toEqualTypeOf<{ key: string; value: string }[]>();
  expect(result).toEqual([
    { key: "a", value: "1" },
    { key: "b", value: "2" },
  ]);
});

// --- method idempotency ---

test("select: last call wins", async () => {
  const result = await db.execute(db
    .values({ a: Int4.from(1), b: Text.from("x") })
    .select((n) => ({ first: n.values.a }))
    .select((n) => ({ second: n.values.b }))
    );

  expectTypeOf(result).toEqualTypeOf<{ second: string }[]>();
  expect(result).toEqual([{ second: "x" }]);
});

test("where: multiple calls AND-combine", async () => {
  const result = await db.execute(db
    .values({ x: Int4.from(1) }, { x: 2 }, { x: 3 }, { x: 4 })
    .where((n) => n.values.x[">"](1))
    .where((n) => n.values.x["<"](4))
    );

  expect(result).toEqual([{ x: 2 }, { x: 3 }]);
});

test("orderBy: multiple calls stack", async () => {
  const result = await db.execute(db
    .values(
      { a: Text.from("b"), b: Int4.from(2) },
      { a: "a", b: 1 },
      { a: "b", b: 1 },
      { a: "a", b: 2 },
    )
    .orderBy((n) => [n.values.a, "asc"])
    .orderBy((n) => [n.values.b, "asc"])
    );

  expect(result).toEqual([
    { a: "a", b: 1 },
    { a: "a", b: 2 },
    { a: "b", b: 1 },
    { a: "b", b: 2 },
  ]);
});

test("limit: multiple calls take MIN", async () => {
  const result = await db.execute(db
    .values({ x: Int4.from(1) }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 })
    .orderBy((n) => n.values.x)
    .limit(3)
    .limit(2)
    );

  expect(result).toEqual([{ x: 1 }, { x: 2 }]);
});

test("offset: multiple calls sum", async () => {
  const result = await db.execute(db
    .values({ x: Int4.from(1) }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 })
    .orderBy((n) => n.values.x)
    .offset(1)
    .offset(2)
    );

  expect(result).toEqual([{ x: 4 }, { x: 5 }]);
});

test("groupBy: multiple calls stack", async () => {
  const result = await db.execute(db
    .values(
      { a: Text.from("x"), b: Text.from("1"), c: Int4.from(10) },
      { a: "x", b: "1", c: 20 },
      { a: "x", b: "2", c: 30 },
    )
    .groupBy((n) => [n.values.a])
    .groupBy((n) => [n.values.b])
    .select(({ 0: a, 1: b, values }) => ({ a, b, total: values.c.sum() }))
    .orderBy((n) => [n[0] as any, "asc"])
    );

  expect(result).toEqual([
    { a: "x", b: "1", total: "30" },
    { a: "x", b: "2", total: "30" },
  ]);
});

test("having: multiple calls AND-combine", async () => {
  const result = await db.execute(db
    .values(
      { cat: Text.from("a"), val: Int4.from(1) },
      { cat: "a", val: 2 },
      { cat: "b", val: 100 },
      { cat: "c", val: 1 },
    )
    .groupBy((n) => [n.values.cat])
    .having((n) => n.values.val.count()[">"](Int8.from("1")))
    .having((n) => n.values.val.sum()["<"](Int8.from("50")))
    .select(({ 0: cat, values }) => ({ cat, total: values.val.sum() }))
    );

  expect(result).toEqual([{ cat: "a", total: "3" }]);
});

// --- runtime arg validation (the @tool decorators on QueryBuilder) ---
//
// Two flavors here. Direct args (numbers, instances, strings) are validated
// synchronously when the builder method is called and throw a TypeError
// whose message starts with "Invalid value:" (from tool.ts's validateArgs).
//
// Callback returns (where/having/orderBy/select) are validated lazily — the
// @tool wrapper replaces the user's cb with a transformed wrapper that calls
// retSchema.parse() on the return; that throws a ZodError whose .message is
// a JSON-shaped issue list. The cb isn't invoked until bind() runs (i.e., at
// compile/execute time), so these errors only surface when the query is
// actually built.
//
// Both helpers below pin error shape (TypeError vs ZodError-by-name) plus
// case-specific content so an unrelated error wouldn't accidentally pass.

const expectArgValidationError = (fn: () => unknown, contentRe: RegExp) => {
  let err: unknown;
  try { fn(); } catch (e) { err = e; }
  expect(err).toBeInstanceOf(TypeError);
  expect((err as TypeError).message).toMatch(/^Invalid value: /);
  expect((err as TypeError).message).toMatch(contentRe);
};

const expectReturnValidationError = (fn: () => unknown, contentRe: RegExp) => {
  let err: unknown;
  try { fn(); } catch (e) { err = e; }
  expect((err as Error)?.constructor?.name).toBe("ZodError");
  expect((err as Error).message).toMatch(contentRe);
};

test("limit rejects negative numbers at call time", () => {
  const q = db.values({ a: Int4.from(1) });
  expectArgValidationError(() => q.limit(-1), /expected number to be >=0.*argument 0/);
});

test("cardinality rejects unknown literals at call time", () => {
  const q = db.values({ a: Int4.from(1) });
  expectArgValidationError(
    // @ts-expect-error — runtime validator should reject
    () => q.cardinality("sometimes"),
    /argument 0/,
  );
});

test("join rejects a non-Fromable first arg at call time", () => {
  const q = db.values({ a: Int4.from(1) });
  expectArgValidationError(
    // @ts-expect-error — string is not a Fromable
    () => q.join("not-a-table", () => Bool.from(true)),
    /argument 0/,
  );
});

test("where defers callback validation — bad return only throws at compile", () => {
  // .where() itself accepts anything-callable; the cb's return is checked
  // when bind() invokes it. So the constructor call below must NOT throw.
  const q = db
    .values({ a: Int4.from(1) })
    // @ts-expect-error — callback must return Bool
    .where(() => 42);
  expectReturnValidationError(() => compile(q, "pg"), /expected Bool, received number/);
});

test("orderBy defers — empty array fails .min(1) at compile", () => {
  const q = db.values({ a: Int4.from(1) }).orderBy(() => [] as never);
  expectReturnValidationError(() => compile(q, "pg"), /expected array to have >=1 items/);
});

test("groupBy() with no args is allowed (optional callback)", () => {
  const q = db.values({ a: Int4.from(1) }).groupBy();
  expect(() => compile(q, "pg")).not.toThrow();
});
