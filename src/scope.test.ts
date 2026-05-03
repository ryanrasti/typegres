import { describe, test, expect, expectTypeOf } from "vitest";
import { sql, Int8, Text, Table } from ".";
import { compile } from "./builder/sql";
import { setupDb, withinTransaction } from "./test-helpers";
setupDb();

// Spike: `Table.scope(ctx)` carries an arbitrary tag through the chain
// and onto hydrated row instances. Validates the cap-rooted-API design
// before promoting to first-class typegres support + codegen.

describe("Table.scope(ctx)", () => {
  test("hydrated rows from scope() expose the context via Foo.contextOf(row)", async () => {
    await withinTransaction(async (tx) => {
      await tx.execute(sql`CREATE TABLE foos (id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name text NOT NULL)`);
      await tx.execute(sql`INSERT INTO foos (name) VALUES ('a'), ('b')`);

      type Principal = { user: string; role: string };
      class Foos extends Table<"foos", Principal>("foos") {
        id   = (Int8<1>).column({ nonNull: true, generated: true });
        name = (Text<1>).column({ nonNull: true });
      }

      const principal: Principal = { user: "alice", role: "admin" };
      const rows = await tx.hydrate(Foos.scope(principal).orderBy(({ foos }) => foos.id));

      expect(rows).toHaveLength(2);
      for (const row of rows) {
        expect(Foos.contextOf(row)).toEqual(principal);
        expect(Foos.contextOf(row)).toBe(principal); // same reference
      }
    });
  });

  test("rows from plain Table.from() have undefined context", async () => {
    await withinTransaction(async (tx) => {
      await tx.execute(sql`CREATE TABLE bars (id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name text NOT NULL)`);
      await tx.execute(sql`INSERT INTO bars (name) VALUES ('x')`);

      class Bars extends Table("bars") {
        id   = (Int8<1>).column({ nonNull: true, generated: true });
        name = (Text<1>).column({ nonNull: true });
      }

      const [row] = await tx.hydrate(Bars.from());
      expect(Bars.contextOf(row!)).toBeUndefined();
    });
  });

  test("instanceof Foos still passes for scoped rows (subclass extends)", async () => {
    await withinTransaction(async (tx) => {
      await tx.execute(sql`CREATE TABLE bazs (id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY)`);
      await tx.execute(sql`INSERT INTO bazs DEFAULT VALUES`);

      class Bazs extends Table<"bazs", string>("bazs") {
        id = (Int8<1>).column({ nonNull: true, generated: true });
      }

      const [row] = await tx.hydrate(Bazs.scope("ctx"));
      expect(row).toBeInstanceOf(Bazs);
    });
  });

  test("emitted SQL is identical for Foos.from() and Foos.scope(...)", () => {
    class Things extends Table<"things", { p: number }>("things") {
      id = (Int8<1>).column({ nonNull: true, generated: true });
    }
    expect(compile(Things.scope({ p: 1 }) as any).text).toBe(compile(Things.from() as any).text);
  });

  test("a column literally named 'context' does not collide with the scope tag", async () => {
    await withinTransaction(async (tx) => {
      await tx.execute(sql`CREATE TABLE notes (
        id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        context text NOT NULL
      )`);
      await tx.execute(sql`INSERT INTO notes (context) VALUES ('hello world')`);

      type P = { user: string };
      class Notes extends Table<"notes", P>("notes") {
        id      = (Int8<1>).column({ nonNull: true, generated: true });
        // Column literally named "context" — would collide with an
        // *instance* getter, but `static context` lives in a separate
        // namespace, so this is fine.
        context = (Text<1>).column({ nonNull: true });
      }

      const principal: P = { user: "carol" };
      const [row] = await tx.hydrate(Notes.scope(principal));
      expect(Notes.contextOf(row!)).toEqual(principal);
      // The column value still hydrates as expected: `row.context` is
      // the column's Any expression (not the principal).
      expect((row as any).context).not.toBe(principal);
    });
  });

  test("Table<Name, C> pins context type — scope() narrows, contextOf() returns C", () => {
    type Principal = { user: string; role: "admin" | "viewer" };

    class Resources extends Table<"resources", Principal>("resources") {
      id = (Int8<1>).column({ nonNull: true, generated: true });
    }

    // scope() requires a Principal — `Resources.scope("string")` would be a TS error.
    const q = Resources.scope({ user: "alice", role: "admin" });
    void q;

    // Type-level: Resources.contextOf returns Principal (verified via a
    // dummy call so `this` binds to typeof Resources — `ReturnType<typeof
    // Resources.contextOf>` alone collapses to the constraint).
    const dummy = Resources.rowType();
    expectTypeOf(Resources.contextOf(dummy)).toEqualTypeOf<Principal>();
  });

  // The codegen pattern: relation methods return
  // `Target.scope(<Current>.contextOf(this)).where(...)`. Hand-write
  // that pattern here to verify scope flows through joined classes.
  test("scope flows through one relation hop (1-way join)", async () => {
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
      class Authors extends Table<"authors", P>("authors") {
        id   = (Int8<1>).column({ nonNull: true, generated: true });
        name = (Text<1>).column({ nonNull: true });
      }
      class Books extends Table<"books", P>("books") {
        id        = (Int8<1>).column({ nonNull: true, generated: true });
        title     = (Text<1>).column({ nonNull: true });
        author_id = (Int8<1>).column({ nonNull: true });

        // Codegen-shape relation: scope+contextOf instead of from().
        author() {
          return Authors.scope(Books.contextOf(this))
            .where(({ authors }) => authors.id["="](this.author_id))
            .cardinality("one");
        }
      }

      const principal: P = { user: "alice" };
      const [book] = await tx.hydrate(Books.scope(principal).orderBy(({ books }) => books.id));
      expect(Books.contextOf(book!)).toEqual(principal);

      // Traverse the relation. The hydrated author should carry the
      // *same* principal — not undefined.
      const [author] = await tx.hydrate(book!.author());
      expect(Authors.contextOf(author!)).toEqual(principal);
      expect(Authors.contextOf(author!)).toBe(principal); // same reference
    });
  });

  test("scope flows through n relation hops (chained joins, n=2)", async () => {
    await withinTransaction(async (tx) => {
      // a → b → c chain. Verify scope set on `a` reaches `c` after two
      // relation traversals.
      await tx.execute(sql`CREATE TABLE pubs   (id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name text NOT NULL)`);
      await tx.execute(sql`CREATE TABLE auths  (id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY, name text NOT NULL, pub_id int8 NOT NULL REFERENCES pubs(id))`);
      await tx.execute(sql`CREATE TABLE bks    (id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY, title text NOT NULL, auth_id int8 NOT NULL REFERENCES auths(id))`);
      await tx.execute(sql`INSERT INTO pubs  (name) VALUES ('Penguin')`);
      await tx.execute(sql`INSERT INTO auths (name, pub_id) VALUES ('Asimov', 1)`);
      await tx.execute(sql`INSERT INTO bks   (title, auth_id) VALUES ('Foundation', 1)`);

      type P = { user: string };
      class Pubs extends Table<"pubs", P>("pubs") {
        id   = (Int8<1>).column({ nonNull: true, generated: true });
        name = (Text<1>).column({ nonNull: true });
      }
      class Auths extends Table<"auths", P>("auths") {
        id     = (Int8<1>).column({ nonNull: true, generated: true });
        name   = (Text<1>).column({ nonNull: true });
        pub_id = (Int8<1>).column({ nonNull: true });
        pub() {
          return Pubs.scope(Auths.contextOf(this))
            .where(({ pubs }) => pubs.id["="](this.pub_id))
            .cardinality("one");
        }
      }
      class Bks extends Table<"bks", P>("bks") {
        id      = (Int8<1>).column({ nonNull: true, generated: true });
        title   = (Text<1>).column({ nonNull: true });
        auth_id = (Int8<1>).column({ nonNull: true });
        auth() {
          return Auths.scope(Bks.contextOf(this))
            .where(({ auths }) => auths.id["="](this.auth_id))
            .cardinality("one");
        }
      }

      const principal: P = { user: "carol" };
      // Hop 0: scope(principal) on Bks
      const [book] = await tx.hydrate(Bks.scope(principal).orderBy(({ bks }) => bks.id));
      expect(Bks.contextOf(book!)).toEqual(principal);

      // Hop 1: book.auth() — Auths should carry principal
      const [auth] = await tx.hydrate(book!.auth());
      expect(Auths.contextOf(auth!)).toEqual(principal);

      // Hop 2: auth.pub() — Pubs should still carry principal
      const [pub] = await tx.hydrate(auth!.pub());
      expect(Pubs.contextOf(pub!)).toEqual(principal);
      expect(Pubs.contextOf(pub!)).toBe(principal); // same reference, n=2 hops deep
    });
  });

  test("methods on the row class can read the context via Foo.contextOf(this)", async () => {
    await withinTransaction(async (tx) => {
      await tx.execute(sql`CREATE TABLE widgets (id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY)`);
      await tx.execute(sql`INSERT INTO widgets DEFAULT VALUES`);

      type P = { user: string };
      class Widgets extends Table<"widgets", P>("widgets") {
        id = (Int8<1>).column({ nonNull: true, generated: true });

        whoCalledMe(): string {
          // `Widgets.contextOf(this)` — typed as P | undefined.
          const ctx = Widgets.contextOf(this);
          return ctx?.user ?? "anonymous";
        }
      }

      const [scopedRow] = await tx.hydrate(Widgets.scope({ user: "dave" }));
      expect(scopedRow!.whoCalledMe()).toBe("dave");

      const [unscopedRow] = await tx.hydrate(Widgets.from());
      expect(unscopedRow!.whoCalledMe()).toBe("anonymous");
    });
  });
});
