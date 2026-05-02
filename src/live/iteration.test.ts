import { test, expect } from "vitest";
import { Int8, Text } from "../types";
import { sql } from "../builder/sql";
import { setupDb, withinTransaction } from "../test-helpers";
import { runLiveIteration } from "./extractor";

setupDb();

test("runLiveIteration: returns rows + cursor + extracted rows from one txn", async () => {
  // Outer txn must be at least as strong as runLiveIteration's request, or
  // the nested call rejects to avoid silently downgrading isolation.
  await withinTransaction(async (tx) => {
    await tx.execute(sql`CREATE TABLE users (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      role text NOT NULL
    )`);
    await tx.execute(sql`CREATE TABLE dogs (
      id int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      user_id int8 NOT NULL,
      name text NOT NULL
    )`);
    await tx.execute(
      sql`INSERT INTO users (id, role) OVERRIDING SYSTEM VALUE VALUES (1, 'admin'), (2, 'user')`,
    );
    await tx.execute(
      sql`INSERT INTO dogs (user_id, name) VALUES (1, 'Rex'), (1, 'Fido'), (2, 'Spot')`,
    );

    class Users extends tx.Table("users") {
      id = (Int8<1>).column({ nonNull: true, generated: true });
      role = (Text<1>).column({ nonNull: true });
    }
    class Dogs extends tx.Table("dogs") {
      id = (Int8<1>).column({ nonNull: true, generated: true });
      user_id = (Int8<1>).column({ nonNull: true });
      name = (Text<1>).column({ nonNull: true });
    }

    const query = Users.from()
      .join(Dogs, ({ users, dogs }) => dogs.user_id.eq(users.id))
      .where(({ users }) => users.id.eq("1"))
      .select(({ users, dogs }) => ({ uid: users.id, dog: dogs.name }));

    const { rows, cursor, predicateSet } = await runLiveIteration(tx, query);

    // Original query: only Rex/Fido (user_id = 1)
    expect(rows.map((r) => r.dog).sort()).toEqual(["Fido", "Rex"]);
    expect(rows.every((r) => r.uid === "1")).toBe(true);

    // Cursor is a non-empty pg_current_snapshot()::text
    expect(typeof cursor).toBe("string");
    expect(cursor.length).toBeGreaterThan(0);

    // PredicateSet: users.id=1 from anchor, dogs.user_id=1 propagated.
    expect(predicateSet.get("users")?.get("id")).toEqual(new Set(["1"]));
    expect(predicateSet.get("dogs")?.get("user_id")).toEqual(new Set(["1"]));
  }, { isolation: "repeatable read" });
});

