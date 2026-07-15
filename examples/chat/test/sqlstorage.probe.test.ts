import { describe, it, expect } from "vitest";
import { env, runInDurableObject } from "cloudflare:test";
import type { ChatDo } from "../src/index";

// Phase 0 -- the SqlStorage contract, as a living artifact.
//
// The DoSqliteDriver maps typegres's compiled { text, ?-values } onto
// Cloudflare's SqlStorage. These tests pin the binding/result semantics that
// shape the driver, contrasted with the better-sqlite3 SqliteDriver.
//
// HEADLINE (proven below):
//   - Numbers bind as REAL (7/2 = 3.5), SAME as better-sqlite3 -- so the sqlite
//     dialect's CAST(? AS INTEGER/REAL) is what makes typed positions correct,
//     for both drivers.
//   - SqlStorage REJECTS BigInt, the OPPOSITE of better-sqlite3 (which requires
//     it for INTEGER). typegres's compile step turns booleans into 0n/1n
//     (BigInt), so the DO driver must map BigInt -> Number before exec().
//   - Blobs bind from Uint8Array and come back as ArrayBuffer.

let n = 0;
const withSql = async <T>(fn: (sql: SqlStorage) => T | Promise<T>): Promise<T> => {
  const stub = env.CHAT.get(env.CHAT.idFromName(`probe-${n++}`));
  return runInDurableObject(stub, (_instance: ChatDo, state) => fn(state.storage.sql));
};
const one = (sql: SqlStorage, query: string, ...binds: unknown[]): Record<string, unknown> =>
  sql.exec(query, ...binds).toArray()[0] as Record<string, unknown>;

describe("SqlStorage binding semantics", () => {
  it("binds every JS number as REAL (like better-sqlite3)", async () => {
    const k = await withSql((sql) => ({
      int: one(sql, "SELECT typeof(?) t", 7).t,
      frac: one(sql, "SELECT typeof(?) t", 2.5).t,
      str: one(sql, "SELECT typeof(?) t", "hi").t,
      nul: one(sql, "SELECT typeof(?) t", null).t,
      blob: one(sql, "SELECT typeof(?) t", new Uint8Array([1, 2, 3])).t,
    }));
    expect(k).toEqual({ int: "real", frac: "real", str: "text", nul: "null", blob: "blob" });
  });

  it("number division is REAL: 7/2 = 3.5 (so integer affinity must come from CAST)", async () => {
    const v = await withSql((sql) => one(sql, "SELECT ? / ? AS v", 7, 2).v);
    expect(v).toBe(3.5);
  });

  it("CAST(? AS INTEGER) forces integer affinity -- the dialect's mechanism works here too", async () => {
    const v = await withSql((sql) => one(sql, "SELECT CAST(? AS INTEGER) / CAST(? AS INTEGER) AS v", 7, 2).v);
    expect(v).toBe(3);
  });

  it("REJECTS BigInt bindings (the driver must down-convert typegres's 0n/1n booleans)", async () => {
    await expect(withSql((sql) => one(sql, "SELECT typeof(?) t", 7n))).rejects.toThrow(/BigInt/);
  });

  it("plain 0/1 numbers bind fine (what the driver sends instead of 0n/1n)", async () => {
    const v = await withSql((sql) => one(sql, "SELECT CAST(? AS INTEGER) AS v", 1).v);
    expect(v).toBe(1);
  });
});

describe("SqlStorage result value types", () => {
  it("returns native JS types per storage class (driver must stringify for deserialize)", async () => {
    const row = await withSql((sql) => {
      sql.exec("CREATE TABLE t (i INTEGER, r REAL, s TEXT, b BLOB, n INTEGER)");
      sql.exec("INSERT INTO t VALUES (CAST(? AS INTEGER), ?, ?, ?, ?)", 42, 2.5, "hey", new Uint8Array([9, 8]), null);
      return one(sql, "SELECT i, r, s, b, n FROM t");
    });
    expect(typeof row.i).toBe("number");
    expect(row.i).toBe(42);
    expect(row.r).toBe(2.5);
    expect(row.s).toBe("hey");
    expect(row.n).toBeNull();
    // blobs return as ArrayBuffer here (better-sqlite3 gives Buffer/Uint8Array)
    expect(row.b).toBeInstanceOf(ArrayBuffer);
    expect(new Uint8Array(row.b as ArrayBuffer)).toEqual(new Uint8Array([9, 8]));
  });

  it("INTEGER results are JS number, not bigint (fine for chat-scale ids)", async () => {
    const v = await withSql((sql) => {
      sql.exec("CREATE TABLE t (v INTEGER)");
      sql.exec("INSERT INTO t VALUES (CAST(? AS INTEGER))", 1000);
      return one(sql, "SELECT v FROM t").v;
    });
    expect(typeof v).toBe("number");
    expect(v).toBe(1000);
  });
});
