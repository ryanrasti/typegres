import { test, expect } from "vitest";
import { sql, compile, Ident } from "./sql";
import { Database } from "../database";
// Test-only shim: these unit tests exercise SQL emission without a real
// Database. Untagged Idents (constructed via the library-internal `new
// Ident(name)` path) still pass through — a wrapper for readability.
const $ident = (name: string) => new Ident(name);
const pgDb = new Database({ dialect: "postgres" });
const sqliteDb = new Database({ dialect: "sqlite" });
const pgCtx = { database: pgDb };
const sqliteCtx = { database: sqliteDb };

test("param compiles with pg style", () => {
  const q = sql`SELECT ${1}, ${2}`;
  expect(compile(q, pgCtx)).toEqual({ text: "SELECT $1, $2", values: [1, 2] });
});

test("param compiles with sqlite style", () => {
  const q = sql`SELECT ${1}, ${2}`;
  expect(compile(q, sqliteCtx)).toEqual({ text: "SELECT ?, ?", values: [1, 2] });
});

test("ident in tagged template", () => {
  const col = $ident("user_name");
  const q = sql`SELECT ${col} FROM ${$ident("users")}`;
  expect(compile(q, pgCtx)).toEqual({ text: 'SELECT "user_name" FROM "users"', values: [] });
});

test("ident escapes double quotes", () => {
  const q = $ident('foo"bar');
  expect(compile(q, pgCtx)).toEqual({ text: '"foo""bar"', values: [] });
});

test("join", () => {
  const cols = [$ident("a"), $ident("b"), $ident("c")];
  const q = sql`SELECT ${sql.join(cols)}`;
  expect(compile(q, pgCtx)).toEqual({ text: 'SELECT "a", "b", "c"', values: [] });
});

test("mixed params and idents", () => {
  const q = sql`SELECT ${$ident("name")} FROM ${$ident("users")} WHERE ${$ident("id")} = ${42}`;
  expect(compile(q, pgCtx)).toEqual({
    text: 'SELECT "name" FROM "users" WHERE "id" = $1',
    values: [42],
  });
});

test("raw sql", () => {
  const q = sql`SELECT ${sql.raw("COUNT(*)")} FROM ${$ident("users")}`;
  expect(compile(q, pgCtx)).toEqual({ text: 'SELECT COUNT(*) FROM "users"', values: [] });
});
