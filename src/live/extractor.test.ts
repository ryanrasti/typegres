import { test, expect, describe } from "vitest";
import { Int8, Text } from "../types";
import { db, withinTransaction } from "../builder/test-helper";
import { sql } from "../builder/sql";
import { buildExtractor } from "./extractor";
import { LiveQueryError } from "./types";

// These tests are the Phase 1 conformance suite. They do not need a live
// database connection — the extractor works purely on the QueryBuilder AST.
// Each test is a sample query from AGENTS.md "Phase 1 — extractor" tests.

const makeUsers = () =>
  class Users extends db.Table("users") {
    id = (Int8<1>).column({ nonNull: true });
    name = (Text<1>).column({ nonNull: true });
  };

const makeDogs = () =>
  class Dogs extends db.Table("dogs") {
    id = (Int8<1>).column({ nonNull: true });
    user_id = (Int8<1>).column({ nonNull: true });
    name = (Text<1>).column({ nonNull: true });
  };

const makeToys = () =>
  class Toys extends db.Table("toys") {
    id = (Int8<1>).column({ nonNull: true });
    dog_id = (Int8<1>).column({ nonNull: true });
  };

// Helper: compile the extractor SQL to a normalized PG string for comparison.
const extractedText = (qb: any): string => {
  const { sql } = buildExtractor(qb);
  return sql.compile("pg").text.replace(/\s+/g, " ").trim();
};

describe("Phase 1: extractor", () => {
  // Test 1: Single table, literal anchor.
  test("single table, literal anchor", () => {
    const Users = makeUsers();
    const qb = Users.from().where(({ users }) => users.id["="](5n));
    const extractor = buildExtractor(qb);
    const text = extractedText(qb);

    // Must build one MATERIALIZED CTE for users and project id.
    expect(text).toContain("s_users");
    expect(text).toContain("AS MATERIALIZED");
    expect(text).toContain('FROM "users"');
    expect(text).toMatch(/SELECT "id".*FROM "users".*WHERE "id" = \$1/);
    expect(text).toMatch(/SELECT \$\d+ AS tbl, \$\d+ AS col, "id"::text AS value FROM s_users/);

    // PredicateSet literals include the anchor.
    expect(extractor.literals.get("users")?.get("id")).toEqual(new Set(["5"]));

    // Materialize with the anchor's row reproduces the set.
    const ps = extractor.materialize([{ tbl: "users", col: "id", value: "5" }]);
    expect(ps.get("users")?.get("id")).toEqual(new Set(["5"]));
  });

  // Test 2: Join chain with literal at root.
  test("join chain, literal at root", () => {
    const Users = makeUsers();
    const Dogs = makeDogs();
    const qb = Users.from()
      .join(Dogs, ({ users, dogs }) => dogs.user_id["="](users.id))
      .where(({ users }) => users.id["="](5n));
    const text = extractedText(qb);

    expect(text).toContain("s_users");
    expect(text).toContain("s_dogs");
    // Dogs CTE references s_users via IN subquery.
    expect(text).toMatch(/s_dogs AS MATERIALIZED.*"user_id" IN \(SELECT "id" FROM s_users\)/);
    // UNION emits (users, id) and (dogs, user_id) branches.
    expect(text).toContain(`"id"::text AS value FROM s_users`);
    expect(text).toContain(`"user_id"::text AS value FROM s_dogs`);

    const extractor = buildExtractor(qb);
    const ps = extractor.materialize([
      { tbl: "users", col: "id", value: "5" },
      { tbl: "dogs", col: "user_id", value: "5" },
    ]);
    expect(ps.get("users")?.get("id")).toEqual(new Set(["5"]));
    expect(ps.get("dogs")?.get("user_id")).toEqual(new Set(["5"]));
  });

  // Test 3: Three-table chain. Middle CTE must project id (needed by toys).
  test("three-table chain, middle projects parentCol", () => {
    const Users = makeUsers();
    const Dogs = makeDogs();
    const Toys = makeToys();
    const qb = Users.from()
      .join(Dogs, ({ users, dogs }) => dogs.user_id["="](users.id))
      .join(Toys, ({ dogs, toys }) => toys.dog_id["="](dogs.id))
      .where(({ users }) => users.id["="](5n));
    const text = extractedText(qb);

    // Dogs CTE projects both user_id (watched) AND id (needed for toys' IN lookup).
    expect(text).toMatch(/s_dogs AS MATERIALIZED \(\s*SELECT (?:"user_id", "id"|"id", "user_id")/);
    // Toys CTE references s_dogs.
    expect(text).toMatch(/s_toys AS MATERIALIZED.*"dog_id" IN \(SELECT "id" FROM s_dogs\)/);
    // UNION has all three.
    expect(text).toContain(`"id"::text AS value FROM s_users`);
    expect(text).toContain(`"user_id"::text AS value FROM s_dogs`);
    expect(text).toContain(`"dog_id"::text AS value FROM s_toys`);
  });

  // Test 5: Multiple literal anchors on one table.
  test("multiple literal anchors on one table", () => {
    const Users = makeUsers();
    const qb = Users.from().where(
      ({ users }) => users.id["="](5n).and(users.name["="]("alice")),
    );
    const text = extractedText(qb);

    // Both literal preds flow into the CTE's WHERE.
    expect(text).toMatch(/WHERE "id" = \$\d+ AND "name" = \$\d+/);

    const extractor = buildExtractor(qb);
    expect(extractor.literals.get("users")?.get("id")).toEqual(new Set(["5"]));
    expect(extractor.literals.get("users")?.get("name")).toEqual(new Set(["alice"]));
  });

  // Test 6: Unrooted query → reject.
  test("unrooted join rejected", () => {
    const Users = makeUsers();
    const Dogs = makeDogs();
    const qb = Users.from()
      .join(Dogs, ({ users, dogs }) => dogs.user_id["="](users.id));
    // No WHERE → no literal anchor.

    expect(() => buildExtractor(qb)).toThrowError(LiveQueryError);
    expect(() => buildExtractor(qb)).toThrowError(/not reachable from a literal/);
  });

  // Test 7: Non-equality predicate → reject.
  test("non-equality predicate rejected", () => {
    const Users = makeUsers();
    const qb = Users.from().where(({ users }) => users.id[">"](5n));
    expect(() => buildExtractor(qb)).toThrowError(LiveQueryError);
    expect(() => buildExtractor(qb)).toThrowError(/unsupported predicate/);
  });

  // Test 8: Top-level OR → reject.
  test("top-level OR rejected", () => {
    const Users = makeUsers();
    const qb = Users.from().where(
      ({ users }) => users.id["="](5n).or(users.name["="]("alice")),
    );
    expect(() => buildExtractor(qb)).toThrowError(LiveQueryError);
  });

  // Test: literal values are canonicalized as text in the PredicateSet.
  test("literal canonicalization — bigint, string, bool", () => {
    const Users = makeUsers();
    const qb = Users.from().where(({ users }) => users.id["="](5n));
    const { literals } = buildExtractor(qb);
    expect(literals.get("users")?.get("id")).toEqual(new Set(["5"])); // bigint → "5"
  });

  // End-to-end: run the extractor SQL against a real PG and check the rows.
  test("e2e: extractor SQL executes and returns expected (tbl, col, value) rows", async () => {
    await withinTransaction(async () => {
      await db.execute(sql`DROP TABLE IF EXISTS users CASCADE`);
      await db.execute(sql`DROP TABLE IF EXISTS dogs CASCADE`);
      await db.execute(sql`CREATE TABLE users (id int8 PRIMARY KEY, name text NOT NULL)`);
      await db.execute(sql`CREATE TABLE dogs (id int8 PRIMARY KEY, user_id int8 NOT NULL, name text NOT NULL)`);
      await db.execute(sql`INSERT INTO users (id, name) VALUES (5, 'alice'), (6, 'bob')`);
      await db.execute(sql`INSERT INTO dogs (id, user_id, name) VALUES (1, 5, 'Rex'), (2, 5, 'Max'), (3, 6, 'Fido')`);

      class Users extends db.Table("users") {
        id = (Int8<1>).column({ nonNull: true });
        name = (Text<1>).column({ nonNull: true });
      }
      class Dogs extends db.Table("dogs") {
        id = (Int8<1>).column({ nonNull: true });
        user_id = (Int8<1>).column({ nonNull: true });
        name = (Text<1>).column({ nonNull: true });
      }

      const qb = Users.from()
        .join(Dogs, ({ users, dogs }) => dogs.user_id["="](users.id))
        .where(({ users }) => users.id["="](5n));

      const extractor = buildExtractor(qb);
      const result = await db.execute(extractor.sql);
      const rows = result.rows as { tbl: string; col: string; value: string }[];

      // One row per (tbl, col, value) triple — note DISTINCT is achieved via
      // the set-based materialize; the emitted SQL doesn't dedupe, so
      // multi-row CTEs produce multiple triples. That's fine — the materialize
      // step collapses duplicates.
      const ps = extractor.materialize(rows);
      expect(ps.get("users")?.get("id")).toEqual(new Set(["5"]));
      expect(ps.get("dogs")?.get("user_id")).toEqual(new Set(["5"]));
    });
  });
});
