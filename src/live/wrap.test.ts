import { test, expect, describe, beforeEach } from "vitest";
import { Int8, Text } from "../types";
import { db, withinTransaction } from "../builder/test-helper";
import { sql } from "../builder/sql";
import { wrapInsertWithEvents, wrapUpdateWithEvents, wrapDeleteWithEvents } from "./wrap";
import { createShadowTableSql } from "./shadow";
import { LiveQueryError } from "./types";

// Executor runs every column through a raw parser so jsonb columns land as
// strings. Parse before/after explicitly in the tests.
const parseJson = <T>(v: unknown): T => (v === null || v === undefined ? null : JSON.parse(v as string)) as T;

// Phase 2 conformance tests. Run inside a transaction per case; each case
// creates its own fixture tables plus the shadow event table, runs a wrapped
// mutation, and asserts on _live_events rows.

const setupTables = async () => {
  await db.execute(sql`DROP TABLE IF EXISTS dogs CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS _live_events CASCADE`);
  await db.execute(sql`CREATE TABLE dogs (
    id int8 PRIMARY KEY,
    user_id int8 NOT NULL,
    name text NOT NULL
  )`);
  await db.execute(createShadowTableSql);
};

const makeDogs = () =>
  class Dogs extends db.Table("dogs") {
    id = (Int8<1>).column({ nonNull: true });    user_id = (Int8<1>).column({ nonNull: true });    name = (Text<1>).column({ nonNull: true });  };

describe("Phase 2: mutation wrapping", () => {
  beforeEach(async () => {
    // Clean slate between tests — these tests don't rely on withinTransaction
    // rollback for isolation since we need committed state to inspect.
    await db.execute(sql`DROP TABLE IF EXISTS dogs CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS _live_events CASCADE`);
  });

  // Test 1: Insert emits one event per row.
  test("INSERT emits one event per row with before=null, after=row jsonb", async () => {
    await withinTransaction(async () => {
      await setupTables();
      const Dogs = makeDogs();

      const insertSql = wrapInsertWithEvents(
        Dogs.insert(
          { id: 1n, user_id: 5n, name: "Rex" },
          { id: 2n, user_id: 5n, name: "Max" },
        ),
      );
      await db.execute(insertSql);

      const result = await db.execute(sql`SELECT ${sql.ident("table")}, before, after FROM _live_events ORDER BY id`);
      const rows = result.rows as { table: string; before: unknown; after: unknown }[];
      expect(rows).toHaveLength(2);
      expect(rows[0]!.table).toBe("dogs");
      expect(parseJson(rows[0]!.before)).toBeNull();
      expect(parseJson(rows[0]!.after)).toEqual({ id: 1, user_id: 5, name: "Rex" });
      expect(parseJson(rows[1]!.after)).toEqual({ id: 2, user_id: 5, name: "Max" });
    });
  });

  // Test 2: Update emits before AND after.
  test("UPDATE emits event with before + after", async () => {
    await withinTransaction(async () => {
      await setupTables();
      const Dogs = makeDogs();

      await db.execute(wrapInsertWithEvents(
        Dogs.insert({ id: 1n, user_id: 5n, name: "Rex" }),
      ));
      await db.execute(sql`TRUNCATE _live_events`);

      const updateSql = wrapUpdateWithEvents(
        Dogs.update()
          .where(({ dogs }) => dogs.id["="](1n))
          .set(() => ({ name: "Buddy" })),
        { primaryKey: ["id"] },
      );
      await db.execute(updateSql);

      const result = await db.execute(sql`SELECT before, after FROM _live_events`);
      const rows = result.rows as { before: unknown; after: unknown }[];
      expect(rows).toHaveLength(1);
      const before = parseJson<{ name: string; user_id: number }>(rows[0]!.before);
      const after = parseJson<{ name: string; user_id: number }>(rows[0]!.after);
      expect(before.name).toBe("Rex");
      expect(after.name).toBe("Buddy");
      expect(before.user_id).toBe(5);
      expect(after.user_id).toBe(5);
    });
  });

  // Test 3: Delete emits event with before only.
  test("DELETE emits event with before + after=null", async () => {
    await withinTransaction(async () => {
      await setupTables();
      const Dogs = makeDogs();

      await db.execute(wrapInsertWithEvents(
        Dogs.insert({ id: 1n, user_id: 5n, name: "Rex" }),
      ));
      await db.execute(sql`TRUNCATE _live_events`);

      const deleteSql = wrapDeleteWithEvents(
        Dogs.delete().where(({ dogs }) => dogs.id["="](1n)),
        { primaryKey: ["id"] },
      );
      await db.execute(deleteSql);

      const result = await db.execute(sql`SELECT before, after FROM _live_events`);
      const rows = result.rows as { before: unknown; after: unknown }[];
      expect(rows).toHaveLength(1);
      expect(parseJson(rows[0]!.before)).toEqual({ id: 1, user_id: 5, name: "Rex" });
      expect(parseJson(rows[0]!.after)).toBeNull();
    });
  });

  // Test 5: Multi-row update pairs each row's own before/after.
  test("multi-row UPDATE produces one event per row with correct pairing", async () => {
    await withinTransaction(async () => {
      await setupTables();
      const Dogs = makeDogs();

      await db.execute(wrapInsertWithEvents(
        Dogs.insert(
          { id: 1n, user_id: 5n, name: "Rex" },
          { id: 2n, user_id: 5n, name: "Max" },
          { id: 3n, user_id: 5n, name: "Fido" },
        ),
      ));
      await db.execute(sql`TRUNCATE _live_events`);

      const updateSql = wrapUpdateWithEvents(
        Dogs.update()
          .where(({ dogs }) => dogs.user_id["="](5n))
          .set(() => ({ user_id: 9n })),
        { primaryKey: ["id"] },
      );
      await db.execute(updateSql);

      const result = await db.execute(sql`SELECT before, after FROM _live_events ORDER BY (before->>'id')::int`);
      const rawRows = result.rows as { before: unknown; after: unknown }[];
      expect(rawRows).toHaveLength(3);
      const rows = rawRows.map((r) => ({
        before: parseJson<{ id: number; user_id: number }>(r.before),
        after: parseJson<{ id: number; user_id: number }>(r.after),
      }));
      // Each row's before.id matches its after.id — no crossed pairing.
      for (const r of rows) {
        expect(r.before.id).toBe(r.after.id);
        expect(r.before.user_id).toBe(5);
        expect(r.after.user_id).toBe(9);
      }
    });
  });

  // Test 6: xid is shared within a tx.
  test("two mutations in the same tx share an xid", async () => {
    await withinTransaction(async () => {
      await setupTables();
      const Dogs = makeDogs();

      await db.transaction(async () => {
        await db.execute(wrapInsertWithEvents(
          Dogs.insert({ id: 1n, user_id: 5n, name: "Rex" }),
        ));
        await db.execute(wrapInsertWithEvents(
          Dogs.insert({ id: 2n, user_id: 5n, name: "Max" }),
        ));
      });

      const result = await db.execute(sql`SELECT DISTINCT xid::text FROM _live_events`);
      const rows = result.rows as { xid: string }[];
      expect(rows).toHaveLength(1);
    });
  });

  // Test 4: Rollback emits nothing.
  test("ROLLBACK discards events alongside the mutation", async () => {
    await withinTransaction(async () => {
      await setupTables();
      const Dogs = makeDogs();

      // Savepoint-based partial rollback inside the enclosing tx.
      await db.execute(sql`SAVEPOINT sp_rollback_test`);
      await db.execute(wrapInsertWithEvents(
        Dogs.insert({ id: 99n, user_id: 5n, name: "Ghost" }),
      ));
      await db.execute(sql`ROLLBACK TO SAVEPOINT sp_rollback_test`);

      const result = await db.execute(sql`SELECT COUNT(*)::int AS n FROM _live_events WHERE (after->>'id')::int = 99`);
      const rows = result.rows as { n: string }[];
      expect(parseInt(rows[0]!.n, 10)).toBe(0);
    });
  });

  // Test 7: Missing PK → reject (UPDATE & DELETE).
  test("UPDATE without primaryKey rejected", () => {
    const Dogs = makeDogs();
    const update = Dogs.update().where(({ dogs }) => dogs.id["="](1n)).set(() => ({ name: "X" }));
    expect(() => wrapUpdateWithEvents(update)).toThrowError(LiveQueryError);
    expect(() => wrapUpdateWithEvents(update)).toThrowError(/primary key/);
  });

  test("DELETE without primaryKey rejected", () => {
    const Dogs = makeDogs();
    const del = Dogs.delete().where(({ dogs }) => dogs.id["="](1n));
    expect(() => wrapDeleteWithEvents(del)).toThrowError(LiveQueryError);
    expect(() => wrapDeleteWithEvents(del)).toThrowError(/primary key/);
  });
});
