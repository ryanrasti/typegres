import { test, expect } from "vitest";
import { Int8, Text } from "../types";
import { Table } from "../table";
import { sql } from "../builder/sql";
import { expectSqlEqual } from "../test-helpers";
import { buildExtractor, materializePredicateSet, sortAliases, traverse } from "./extractor";

class Users extends Table("users") {
  id = (Int8<1>).column({ nonNull: true, generated: true });
  manager_id = (Int8<0 | 1>).column();
  role = (Text<1>).column({ nonNull: true });
}

class Dogs extends Table("dogs") {
  id = (Int8<1>).column({ nonNull: true, generated: true });
  user_id = (Int8<1>).column({ nonNull: true });
  name = (Text<1>).column({ nonNull: true });
}

const orderOf = (q: ReturnType<typeof traverse>) =>
  sortAliases(q).map((s) => s.alias.tsAlias);

test("single-table literal anchor: order", () => {
  const q = Users.from().where(({ users }) => users.id.eq("5")).finalize();
  expect(orderOf(traverse(q))).toEqual(["users"]);
});

test("join chain: anchor propagates to dependent alias", () => {
  const q = Users.from()
    .join(Dogs, ({ users, dogs }) => dogs.user_id.eq(users.id))
    .where(({ users }) => users.id.eq("5"))
    .finalize();
  expect(orderOf(traverse(q))).toEqual(["users", "dogs"]);
});

test("three-table chain: order", () => {
  class Toys extends Table("toys") {
    id = (Int8<1>).column({ nonNull: true, generated: true });
    dog_id = (Int8<1>).column({ nonNull: true });
  }
  const q = Users.from()
    .join(Dogs, ({ users, dogs }) => dogs.user_id.eq(users.id))
    .join(Toys, ({ dogs, toys }) => toys.dog_id.eq(dogs.id))
    .where(({ users }) => users.id.eq("5"))
    .finalize();
  expect(orderOf(traverse(q))).toEqual(["users", "dogs", "toys"]);
});

test("multiple anchors on different tables: both seeded first", () => {
  const q = Users.from()
    .join(Dogs, ({ users, dogs }) => dogs.user_id.eq(users.id))
    .where(({ users, dogs }) => users.id.eq("5").and(dogs.name.eq("Rex")))
    .finalize();
  expect(orderOf(traverse(q)).sort()).toEqual(["dogs", "users"]);
});

test("rejects unrooted query (join chain, no literal)", () => {
  const q = Users.from()
    .join(Dogs, ({ users, dogs }) => dogs.user_id.eq(users.id))
    .finalize();
  expect(() => sortAliases(traverse(q))).toThrow(/unreachable/);
});

test("rejects bare table with no predicates", () => {
  const q = Users.from().finalize();
  expect(() => sortAliases(traverse(q))).toThrow(/unreachable/);
});

test("OR'd predicates are not extracted (only top-level AND'd equalities)", () => {
  const q = Users.from()
    .where(({ users }) => users.id.eq("5").or(users.role.eq("admin")))
    .finalize();
  expect(() => sortAliases(traverse(q))).toThrow(/unreachable/);
});

// --- buildExtractor: emitted SQL shape ---

test("buildExtractor: single-table literal anchor", () => {
  const q = Users.from().where(({ users }) => users.id.eq("5")).finalize();
  expectSqlEqual(
    buildExtractor(sortAliases(traverse(q))),
    sql`
      WITH "users" AS MATERIALIZED (
        SELECT "id" FROM "users" AS "users" WHERE ("users"."id" = CAST(${"5"} AS int8))
      )
      SELECT ${"users"} AS tbl, ${"id"} AS col, CAST(${"5"} AS int8)::text AS value
    `,
  );
});

test("buildExtractor: self-join produces two CTEs both backed by 'users'", () => {
  const q = Users.from()
    .join(Users.as("manager"), ({ users, manager }) => users.manager_id.eq(manager.id))
    .where(({ users }) => users.id.eq("5"))
    .finalize();
  // Both CTEs are MATERIALIZED selects against the same underlying `users`
  // table — but each gets its own CTE name (the alias) and its own FROM alias.
  expectSqlEqual(
    buildExtractor(sortAliases(traverse(q))),
    sql`
      WITH
        "users" AS MATERIALIZED (
          SELECT "manager_id", "id" FROM "users" AS "users"
          WHERE ("users"."id" = CAST(${"5"} AS int8))
        ),
        "manager" AS MATERIALIZED (
          SELECT "id" FROM "users" AS "manager"
          WHERE "manager"."id" IN (SELECT "manager_id" FROM "users")
        )
      SELECT ${"users"} AS tbl, ${"manager_id"} AS col, "users"."manager_id"::text AS value FROM "users"
      UNION ALL
      SELECT ${"users"} AS tbl, ${"id"}         AS col, CAST(${"5"} AS int8)::text AS value
      UNION ALL
      SELECT ${"users"} AS tbl, ${"id"}         AS col, "manager"."id"::text     AS value FROM "manager"
    `,
  );
});

test("buildExtractor: join chain rewrites edge to IN (SELECT … FROM upstream CTE)", () => {
  const q = Users.from()
    .join(Dogs, ({ users, dogs }) => dogs.user_id.eq(users.id))
    .where(({ users }) => users.id.eq("5"))
    .finalize();
  expectSqlEqual(
    buildExtractor(sortAliases(traverse(q))),
    sql`
      WITH
        "users" AS MATERIALIZED (
          SELECT "id" FROM "users" AS "users" WHERE ("users"."id" = CAST(${"5"} AS int8))
        ),
        "dogs" AS MATERIALIZED (
          SELECT "user_id" FROM "dogs" AS "dogs"
          WHERE "dogs"."user_id" IN (SELECT "id" FROM "users")
        )
      SELECT ${"users"} AS tbl, ${"id"}      AS col, "users"."id"::text      AS value FROM "users"
      UNION ALL
      SELECT ${"users"} AS tbl, ${"id"}      AS col, CAST(${"5"} AS int8)::text AS value
      UNION ALL
      SELECT ${"dogs"}  AS tbl, ${"user_id"} AS col, "dogs"."user_id"::text  AS value FROM "dogs"
    `,
  );
});

test("buildExtractor: multiple anchors keep their literal predicates plus join edge in dependent CTE", () => {
  const q = Users.from()
    .join(Dogs, ({ users, dogs }) => dogs.user_id.eq(users.id))
    .where(({ users, dogs }) => users.id.eq("5").and(dogs.name.eq("Rex")))
    .finalize();
  // Both seeded; users comes first by insertion order. dogs gets its own
  // anchor (name = 'Rex') AND the back-edge to users.
  expectSqlEqual(
    buildExtractor(sortAliases(traverse(q))),
    sql`
      WITH
        "users" AS MATERIALIZED (
          SELECT "id" FROM "users" AS "users" WHERE ("users"."id" = CAST(${"5"} AS int8))
        ),
        "dogs" AS MATERIALIZED (
          SELECT "user_id", "name" FROM "dogs" AS "dogs"
          WHERE "dogs"."user_id" IN (SELECT "id" FROM "users")
            AND ("dogs"."name" = CAST(${"Rex"} AS text))
        )
      SELECT ${"users"} AS tbl, ${"id"}      AS col, "users"."id"::text      AS value FROM "users"
      UNION ALL
      SELECT ${"users"} AS tbl, ${"id"}      AS col, CAST(${"5"} AS int8)::text AS value
      UNION ALL
      SELECT ${"dogs"}  AS tbl, ${"user_id"} AS col, "dogs"."user_id"::text  AS value FROM "dogs"
      UNION ALL
      SELECT ${"dogs"}  AS tbl, ${"name"}    AS col, CAST(${"Rex"} AS text)::text AS value
    `,
  );
});

// --- materializePredicateSet: propagation closure ---

test("materializePredicateSet: literal anchor flows through equality edge", () => {
  // Users WHERE id=1 JOIN Notes ON notes.user_id = users.id.
  // Even with no rows in `users` or `notes`, notes.user_id watched ⊇ {1}.
  class Users extends Table("users") {
    id = (Int8<1>).column({ nonNull: true, generated: true });
  }
  class Notes extends Table("notes") {
    id = (Int8<1>).column({ nonNull: true, generated: true });
    user_id = (Int8<1>).column({ nonNull: true });
  }
  const q = Users.from()
    .join(Notes, ({ users, notes }) => notes.user_id.eq(users.id))
    .where(({ users }) => users.id.eq("1"))
    .finalize();
  const traversal = traverse(q);

  // Simulate empty tables — only the literal-injection row exists.
  const ps = materializePredicateSet(
    [{ tbl: "users", col: "id", value: "1" }],
    traversal,
  );
  expect(ps.get("users")?.get("id")).toEqual(new Set(["1"]));
  expect(ps.get("notes")?.get("user_id")).toEqual(new Set(["1"]));
});

test("materializePredicateSet: data values propagate both directions across edge", () => {
  class Users extends Table("users") {
    id = (Int8<1>).column({ nonNull: true, generated: true });
  }
  class Notes extends Table("notes") {
    user_id = (Int8<1>).column({ nonNull: true });
  }
  const q = Users.from()
    .join(Notes, ({ users, notes }) => notes.user_id.eq(users.id))
    .where(({ users }) => users.id.eq("1"))
    .finalize();
  const traversal = traverse(q);

  // Three rows of "raw extractor output": literal 1 on users.id, plus a
  // sneaky 2 that came in through notes (e.g. transient row before
  // commit). Both should appear on both columns.
  const ps = materializePredicateSet(
    [
      { tbl: "users", col: "id", value: "1" },
      { tbl: "notes", col: "user_id", value: "2" },
    ],
    traversal,
  );
  expect(ps.get("users")?.get("id")).toEqual(new Set(["1", "2"]));
  expect(ps.get("notes")?.get("user_id")).toEqual(new Set(["1", "2"]));
});

test("materializePredicateSet: cross-edge merges two pre-existing groups", () => {
  // A.b_id = B.id and A.c_id = C.id give A two separate equality classes
  // initially ({A.b_id, B.id} and {A.c_id, C.id}). The cross-edge
  // B.c_id = C.id then forces those classes to merge — every column in
  // the chain ends up with the same value set. Without the merge walk,
  // C.id would orphan from the survivor.
  class A extends Table("a") {
    id = (Int8<1>).column({ nonNull: true, generated: true });
    b_id = (Int8<1>).column({ nonNull: true });
    c_id = (Int8<1>).column({ nonNull: true });
  }
  class B extends Table("b") {
    id = (Int8<1>).column({ nonNull: true, generated: true });
    c_id = (Int8<1>).column({ nonNull: true });
  }
  class C extends Table("c") {
    id = (Int8<1>).column({ nonNull: true, generated: true });
  }
  const q = A.from()
    .join(B, ({ a, b }) => a.b_id.eq(b.id))
    .join(C, ({ a, c }) => a.c_id.eq(c.id))
    .where(({ a, b, c }) => a.id.eq("7").and(b.c_id.eq(c.id)))
    .finalize();
  const traversal = traverse(q);

  const ps = materializePredicateSet(
    [
      { tbl: "a", col: "id", value: "7" },     // anchors the {A.id} class
      { tbl: "b", col: "id", value: "42" },    // class {A.b_id, B.id}
      { tbl: "c", col: "id", value: "100" },   // class {A.c_id, C.id, B.c_id} — merged via B.c_id=C.id
    ],
    traversal,
  );
  // Three distinct classes:
  expect(ps.get("a")?.get("id")).toEqual(new Set(["7"]));
  expect(ps.get("a")?.get("b_id")).toEqual(new Set(["42"]));
  expect(ps.get("b")?.get("id")).toEqual(new Set(["42"]));
  // The cross-edge merge propagates the C.id value to *every* member of
  // the merged class, including B.c_id which would have been orphaned
  // without the full-walk repointing.
  expect(ps.get("a")?.get("c_id")).toEqual(new Set(["100"]));
  expect(ps.get("c")?.get("id")).toEqual(new Set(["100"]));
  expect(ps.get("b")?.get("c_id")).toEqual(new Set(["100"]));
});

test("materializePredicateSet: drops null values", () => {
  class Users extends Table("users") {
    id = (Int8<1>).column({ nonNull: true, generated: true });
    role = (Text<1>).column({ nonNull: true });
  }
  const q = Users.from().where(({ users }) => users.id.eq("1")).finalize();
  const traversal = traverse(q);
  const ps = materializePredicateSet(
    [
      { tbl: "users", col: "id", value: "1" },
      { tbl: "users", col: "id", value: null },
    ],
    traversal,
  );
  expect(ps.get("users")?.get("id")).toEqual(new Set(["1"]));
});
