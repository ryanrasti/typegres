import { test, expect, describe, beforeEach, afterEach } from "vitest";
import { Int8, Text } from "../types";
import { db } from "../builder/test-helper";
import { sql } from "../builder/sql";
import { wrapInsertWithEvents, wrapUpdateWithEvents, wrapDeleteWithEvents } from "./wrap";
import { createShadowTableSql } from "./shadow";
import { LiveBus, CursorTooOldError } from "./bus";

// End-to-end Phase 4 tests: db.live(query) exercising the full chain —
// extractor + bus + subscription + mutation wrapping.

const setup = async () => {
  await db.execute(sql`DROP TABLE IF EXISTS dogs CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS _live_events CASCADE`);
  await db.execute(sql`CREATE TABLE dogs (id int8 PRIMARY KEY, user_id int8 NOT NULL, name text NOT NULL)`);
  await db.execute(createShadowTableSql);
};

const cleanup = async () => {
  await db.execute(sql`DROP TABLE IF EXISTS dogs CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS _live_events CASCADE`);
};

const makeDogs = () =>
  class Dogs extends db.Table("dogs") {
    id = (Int8<1>).column({ nonNull: true });    user_id = (Int8<1>).column({ nonNull: true });    name = (Text<1>).column({ nonNull: true });  };

describe("Phase 4: db.live()", () => {
  let bus: LiveBus;

  beforeEach(async () => {
    await setup();
    bus = new LiveBus(db, { pollIntervalMs: 5 });
    await bus.syncNow();
    db.enableLive(bus);
  });

  afterEach(async () => {
    bus.stop();
    await cleanup();
  });

  // Test 1: Single-table live. Initial yield + re-yield on matching insert.
  test("single-table live yields initial state and re-yields on matching mutation", async () => {
    const Dogs = makeDogs();
    await db.execute(wrapInsertWithEvents(
      Dogs.insert({ id: 1n, user_id: 5n, name: "Rex" }),
    ));
    await bus.syncNow();

    const iter = db.live(
      Dogs.from()
        .where(({ dogs }) => dogs.user_id["="](5n))
        .select(({ dogs }) => ({ id: dogs.id, name: dogs.name })),
    );

    const first = (await iter.next()).value!;
    expect(first).toHaveLength(1);
    expect(first[0]!.name).toBe("Rex");

    // Commit a matching insert — should trigger a re-yield.
    const updatePromise = iter.next();
    await db.execute(wrapInsertWithEvents(
      Dogs.insert({ id: 2n, user_id: 5n, name: "Max" }),
    ));
    await bus.syncNow();

    const second = (await updatePromise).value!;
    expect(second).toHaveLength(2);
    const names = second.map((r) => r.name).sort();
    expect(names).toEqual(["Max", "Rex"]);

    await iter.return(undefined);
  });

  // Test 1 continued: non-matching mutation does NOT re-yield.
  test("non-matching mutation does not re-yield", async () => {
    const Dogs = makeDogs();
    const iter = db.live(
      Dogs.from()
        .where(({ dogs }) => dogs.user_id["="](5n))
        .select(({ dogs }) => ({ id: dogs.id })),
    );

    const first = (await iter.next()).value!;
    expect(first).toHaveLength(0);

    const nextPromise = iter.next();

    // Insert with user_id=9 (not watched).
    await db.execute(wrapInsertWithEvents(
      Dogs.insert({ id: 3n, user_id: 9n, name: "Fido" }),
    ));
    await bus.syncNow();

    const result = await Promise.race([
      nextPromise.then(() => "resolved" as const),
      new Promise((r) => setTimeout(() => r("timeout" as const), 200)),
    ]);
    expect(result).toBe("timeout");
    // Let the hanging nextPromise reject when the bus stops in afterEach;
    // don't await iter.return() since it blocks on the unresolved waitNext.
    nextPromise.catch(() => {});
  });

  // Test 1 continued: UPDATE re-yields with updated data.
  test("UPDATE re-yields with updated row", async () => {
    const Dogs = makeDogs();
    await db.execute(wrapInsertWithEvents(
      Dogs.insert({ id: 1n, user_id: 5n, name: "Rex" }),
    ));
    await bus.syncNow();

    const iter = db.live(
      Dogs.from()
        .where(({ dogs }) => dogs.user_id["="](5n))
        .select(({ dogs }) => ({ id: dogs.id, name: dogs.name })),
    );

    const first = (await iter.next()).value!;
    expect(first[0]!.name).toBe("Rex");

    const nextPromise = iter.next();
    await db.execute(wrapUpdateWithEvents(
      Dogs.update()
        .where(({ dogs }) => dogs.id["="](1n))
        .set(() => ({ name: "Buddy" })),
      { primaryKey: ["id"] },
    ));
    await bus.syncNow();

    const second = (await nextPromise).value!;
    expect(second[0]!.name).toBe("Buddy");

    await iter.return(undefined);
  });

  // Test 1 continued: DELETE re-yields without the deleted row.
  test("DELETE re-yields with row removed", async () => {
    const Dogs = makeDogs();
    await db.execute(wrapInsertWithEvents(
      Dogs.insert(
        { id: 1n, user_id: 5n, name: "Rex" },
        { id: 2n, user_id: 5n, name: "Max" },
      ),
    ));
    await bus.syncNow();

    const iter = db.live(
      Dogs.from()
        .where(({ dogs }) => dogs.user_id["="](5n))
        .select(({ dogs }) => ({ id: dogs.id })),
    );

    const first = (await iter.next()).value!;
    expect(first).toHaveLength(2);

    const nextPromise = iter.next();
    await db.execute(wrapDeleteWithEvents(
      Dogs.delete().where(({ dogs }) => dogs.id["="](1n)),
      { primaryKey: ["id"] },
    ));
    await bus.syncNow();

    const second = (await nextPromise).value!;
    expect(second).toHaveLength(1);

    await iter.return(undefined);
  });

  // Test 2: Join live. Mutation on either side triggers re-yield.
  test("join live re-yields when either joined table changes", async () => {
    await db.execute(sql`DROP TABLE IF EXISTS users CASCADE`);
    await db.execute(sql`CREATE TABLE users (id int8 PRIMARY KEY, name text NOT NULL)`);
    await db.execute(sql`INSERT INTO users (id, name) VALUES (5, 'alice')`);

    try {
      class Users extends db.Table("users") {
        id = (Int8<1>).column({ nonNull: true });        name = (Text<1>).column({ nonNull: true });      }
      const Dogs = makeDogs();

      const iter = db.live(
        Users.from()
          .join(Dogs, ({ users, dogs }) => dogs.user_id["="](users.id))
          .where(({ users }) => users.id["="](5n))
          .select(({ users, dogs }) => ({ user_name: users.name, dog_name: dogs.name })),
      );

      const first = (await iter.next()).value!;
      expect(first).toHaveLength(0);

      // Insert a dog on the other side of the join.
      const nextPromise = iter.next();
      await db.execute(wrapInsertWithEvents(
        Dogs.insert({ id: 1n, user_id: 5n, name: "Rex" }),
      ));
      await bus.syncNow();

      const second = (await nextPromise).value!;
      expect(second).toHaveLength(1);
      expect(second[0]!.user_name).toBe("alice");
      expect(second[0]!.dog_name).toBe("Rex");

      await iter.return(undefined);
    } finally {
      await db.execute(sql`DROP TABLE IF EXISTS users CASCADE`);
    }
  });

  // Test 4: CursorTooOldError → caller restarts.
  test("stale cursor rejection surfaces CursorTooOldError to caller", async () => {
    const Dogs = makeDogs();

    // Tiny ring so we evict quickly.
    bus.stop();
    bus = new LiveBus(db, { pollIntervalMs: 5, ringMax: 1 });
    await bus.syncNow();
    db.enableLive(bus);

    const iter = db.live(
      Dogs.from()
        .where(({ dogs }) => dogs.user_id["="](5n))
        .select(({ dogs }) => ({ id: dogs.id })),
    );

    // First yield captures a cursor.
    await iter.next();

    // Advance the bus past that cursor's xmin by committing events that evict.
    for (let i = 1n; i <= 3n; i++) {
      await db.execute(wrapInsertWithEvents(
        Dogs.insert({ id: i, user_id: 99n, name: `ghost${i}` }),
      ));
      await bus.syncNow();
    }
    expect(bus.retentionFloor).toBeGreaterThan(0n);

    // Next await should throw CursorTooOldError (stale cursor vs advanced F).
    await expect(iter.next()).rejects.toBeInstanceOf(CursorTooOldError);
  });
});
