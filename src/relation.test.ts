import { describe, test, expect, expectTypeOf } from "vitest";
import { sql } from ".";
import { Int8, Text } from "./types/postgres";
import type { Record, Anyarray } from "./types/postgres";
import { compile } from "./builder/sql";
import { Relation } from "./relation";
import { setupDb, withinTransaction, db } from "./test-helpers";
setupDb();

// Relation.* collapses the scope+contextOf+where+cardinality boilerplate
// used by codegen'd FK edges. Behavior must match the hand-written form.

describe("Relation helpers", () => {
  test("belongsTo / has emit the same SQL as scope+where+cardinality", async () => {
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
      await tx.execute(sql`INSERT INTO authors (name) VALUES ('Asimov')`);
      await tx.execute(sql`INSERT INTO books (title, author_id) VALUES ('Foundation', 1)`);

      class Authors extends db.Table("authors") {
        id = Int8.column({ nonNull: true, generated: true });
        name = Text.column({ nonNull: true });
      }
      class Books extends db.Table("books") {
        id = Int8.column({ nonNull: true, generated: true });
        title = Text.column({ nonNull: true });
        author_id = Int8.column({ nonNull: true });

        authorHelper() {
          return Relation.belongsTo(this, Authors, { id: this.author_id });
        }
        authorHand() {
          return Authors.scope(Books.contextOf(this))
            .where(({ authors }) => authors.id.eq(this.author_id))
            .cardinality("one");
        }
      }

      const [book] = await tx.hydrate(Books.from());
      const ctx = { database: db };

      const viaHelper = book!.authorHelper();
      const viaHand = book!.authorHand();
      expect(compile(viaHelper as any, ctx).text).toBe(compile(viaHand as any, ctx).text);
      expect(compile(viaHelper as any, ctx).values).toEqual(compile(viaHand as any, ctx).values);

      const [author] = await tx.hydrate(Authors.from());
      const manyHelper = Relation.has(author!, Books, { author_id: author!.id });
      const manyHand = Books.scope(Authors.contextOf(author!))
        .where(({ books }) => books.author_id.eq(author!.id))
        .cardinality("many");
      expect(compile(manyHelper as any, ctx).text).toBe(compile(manyHand as any, ctx).text);
    });
  });

  test("has with card one / maybe emit the same SQL as hand-written", async () => {
    await withinTransaction(async (tx) => {
      await tx.execute(sql`CREATE TABLE dogs (
        id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY
      )`);
      await tx.execute(sql`CREATE TABLE collars (
        id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        dog_id int8 NOT NULL REFERENCES dogs(id) UNIQUE
      )`);
      await tx.execute(sql`CREATE TABLE microchips (
        id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        dog_id int8 UNIQUE REFERENCES dogs(id)
      )`);
      await tx.execute(sql`INSERT INTO dogs DEFAULT VALUES`);
      await tx.execute(sql`INSERT INTO collars (dog_id) VALUES (1)`);

      class Dogs extends db.Table("dogs") {
        id = Int8.column({ nonNull: true, generated: true });
      }
      class Collars extends db.Table("collars") {
        id = Int8.column({ nonNull: true, generated: true });
        dog_id = Int8.column({ nonNull: true });
      }
      class Microchips extends db.Table("microchips") {
        id = Int8.column({ nonNull: true, generated: true });
        dog_id = Int8.column();
      }

      const [dog] = await tx.hydrate(Dogs.from());
      const ctx = { database: db };

      const oneHelper = Relation.has(dog!, Collars, { dog_id: dog!.id }, { card: "one" });
      const oneHand = Collars.scope(Dogs.contextOf(dog!))
        .where(({ collars }) => collars.dog_id.eq(dog!.id))
        .cardinality("one");
      expect(compile(oneHelper as any, ctx).text).toBe(compile(oneHand as any, ctx).text);

      const maybeHelper = Relation.has(dog!, Microchips, { dog_id: dog!.id }, { card: "maybe" });
      const maybeHand = Microchips.scope(Dogs.contextOf(dog!))
        .where(({ microchips }) => microchips.dog_id.eq(dog!.id))
        .cardinality("maybe");
      expect(compile(maybeHelper as any, ctx).text).toBe(compile(maybeHand as any, ctx).text);
      // one vs maybe share SQL shape (card only affects .scalar typing);
      // different target tables → different table names, but same structure.
      expect(compile(oneHelper as any, ctx).text.replaceAll("collars", "T"))
        .toBe(compile(maybeHelper as any, ctx).text.replaceAll("microchips", "T"));
    });
  });

  test("threads parent context through hydrate (belongsTo hop)", async () => {
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
      await tx.execute(sql`INSERT INTO authors (name) VALUES ('Asimov')`);
      await tx.execute(sql`INSERT INTO books (title, author_id) VALUES ('Foundation', 1)`);

      type P = { user: string };
      class Authors extends db.Table<"authors", P>("authors") {
        id = Int8.column({ nonNull: true, generated: true });
        name = Text.column({ nonNull: true });
      }
      class Books extends db.Table<"books", P>("books") {
        id = Int8.column({ nonNull: true, generated: true });
        title = Text.column({ nonNull: true });
        author_id = Int8.column({ nonNull: true });

        author() {
          return Relation.belongsTo(this, Authors, { id: this.author_id });
        }
      }

      const principal: P = { user: "alice" };
      const [book] = await tx.hydrate(Books.scope(principal).orderBy(({ books }) => books.id));
      expect(Books.contextOf(book!)).toBe(principal);

      const [author] = await tx.hydrate(book!.author());
      expect(Authors.contextOf(author!)).toBe(principal);
    });
  });

  test("undefined parent context passes through (same as scope(undefined))", async () => {
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
      await tx.execute(sql`INSERT INTO authors (name) VALUES ('Asimov')`);
      await tx.execute(sql`INSERT INTO books (title, author_id) VALUES ('Foundation', 1)`);

      class Authors extends db.Table("authors") {
        id = Int8.column({ nonNull: true, generated: true });
        name = Text.column({ nonNull: true });
      }
      class Books extends db.Table("books") {
        id = Int8.column({ nonNull: true, generated: true });
        title = Text.column({ nonNull: true });
        author_id = Int8.column({ nonNull: true });

        author() {
          return Relation.belongsTo(this, Authors, { id: this.author_id });
        }
      }

      // Plain from() — no scope tag on the parent row.
      const [book] = await tx.hydrate(Books.from());
      expect(Books.contextOf(book!)).toBeUndefined();

      const [author] = await tx.hydrate(book!.author());
      expect(Authors.contextOf(author!)).toBeUndefined();
    });
  });

  test("belongsTo / has card opts are typed into QueryBuilder", () => {
    class Authors extends db.Table("authors") {
      id = Int8.column({ nonNull: true, generated: true });
    }
    class Books extends db.Table("books") {
      author_id = Int8.column({ nonNull: true });
      rival_id = Int8.column();
    }
    const book = Books.rowType();
    const author = Authors.rowType();

    // Card is the 4th type param on QueryBuilder; .scalar() return type
    // is the public probe (same pattern as rpc-exoeval tests).
    const one = Relation.belongsTo(book, Authors, { id: book.author_id });
    const maybe = Relation.belongsTo(book, Authors, { id: book.rival_id }, { card: "maybe" });
    const many = Relation.has(author, Books, { author_id: author.id });
    const hasOne = Relation.has(author, Books, { author_id: author.id }, { card: "one" });

    expectTypeOf(one.scalar()).toMatchTypeOf<Record<1, any>>();
    expectTypeOf(maybe.scalar()).toMatchTypeOf<Record<0 | 1, any>>();
    expectTypeOf(hasOne.scalar()).toMatchTypeOf<Record<1, any>>();
    expectTypeOf(many.scalar()).toMatchTypeOf<Anyarray<any, 1>>();
  });

  test("rejects multi-column FK maps at runtime", () => {
    class A extends db.Table("a") {
      id = Int8.column({ nonNull: true });
      x = Int8.column({ nonNull: true });
    }
    class B extends db.Table("b") {
      a_id = Int8.column({ nonNull: true });
      a_x = Int8.column({ nonNull: true });
    }
    const b = B.rowType();
    expect(() =>
      Relation.belongsTo(b, A, { id: b.a_id, x: b.a_x } as any),
    ).toThrow(/single-column FK map/);
  });
});
