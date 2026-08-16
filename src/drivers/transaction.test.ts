import { describe, expect, test, vi } from "vitest";
import type { ExecuteFn, TransactionOptions } from "./types";
import { postgresBeginSql, runSqlTransaction, runTransaction } from "./transaction";

describe("driver transaction helpers", () => {
  test("selects PostgreSQL BEGIN SQL from fixed values", () => {
    expect(postgresBeginSql({})).toBe("BEGIN");
    expect(postgresBeginSql({ isolation: "read committed" })).toBe(
      "BEGIN ISOLATION LEVEL READ COMMITTED",
    );
    expect(postgresBeginSql({ isolation: "repeatable read" })).toBe(
      "BEGIN ISOLATION LEVEL REPEATABLE READ",
    );
    expect(postgresBeginSql({ isolation: "serializable" })).toBe(
      "BEGIN ISOLATION LEVEL SERIALIZABLE",
    );
    expect(() => postgresBeginSql(
      { isolation: "serializable; SELECT 1" } as unknown as TransactionOptions,
    )).toThrow(
      "Unsupported PostgreSQL transaction isolation level",
    );
  });

  test("runs begin, callback, and commit in order", async () => {
    const events: string[] = [];
    const result = await runTransaction({
      begin: () => { events.push("begin"); },
      commit: async () => { events.push("commit"); },
      rollback: () => { events.push("rollback"); },
    }, async () => {
      events.push("callback");
      return 42;
    });

    expect(result).toBe(42);
    expect(events).toEqual(["begin", "callback", "commit"]);
  });

  test("rolls back callback and commit failures", async () => {
    const callbackEvents: string[] = [];
    await expect(runTransaction({
      commit: () => { callbackEvents.push("commit"); },
      rollback: () => { callbackEvents.push("rollback"); },
    }, async () => {
      callbackEvents.push("callback");
      throw new Error("callback failed");
    })).rejects.toThrow("callback failed");
    expect(callbackEvents).toEqual(["callback", "rollback"]);

    const commitEvents: string[] = [];
    await expect(runTransaction({
      commit: () => {
        commitEvents.push("commit");
        throw new Error("commit failed");
      },
      rollback: () => { commitEvents.push("rollback"); },
    }, async () => { commitEvents.push("callback"); })).rejects.toThrow("commit failed");
    expect(commitEvents).toEqual(["callback", "commit", "rollback"]);
  });

  test("SQL transactions emit protocol statements", async () => {
    const statements: string[] = [];
    const execute: ExecuteFn = vi.fn(async ({ text }) => {
      statements.push(text);
      return { rows: [] };
    });

    await runSqlTransaction(execute, "BEGIN ISOLATION LEVEL SERIALIZABLE", async () => {
      await execute({ text: "SELECT 1", values: [] });
    });
    expect(statements).toEqual([
      "BEGIN ISOLATION LEVEL SERIALIZABLE",
      "SELECT 1",
      "COMMIT",
    ]);
  });
});
