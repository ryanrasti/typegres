import { test, expect } from "vitest";
import { sql } from "./builder/sql";

test("param compiles with pg style", () => {
  const q = sql`SELECT ${1}, ${2}`;
  expect(q.compile("pg")).toEqual({ text: "SELECT $1, $2", values: [1, 2] });
});

test("param compiles with sqlite style", () => {
  const q = sql`SELECT ${1}, ${2}`;
  expect(q.compile("sqlite")).toEqual({ text: "SELECT ?, ?", values: [1, 2] });
});

test("ident in tagged template", () => {
  const col = sql.ident("user_name");
  const q = sql`SELECT ${col} FROM ${sql.ident("users")}`;
  expect(q.compile("pg")).toEqual({ text: 'SELECT "user_name" FROM "users"', values: [] });
});

test("ident escapes double quotes", () => {
  const q = sql.ident('foo"bar');
  expect(q.compile("pg")).toEqual({ text: '"foo""bar"', values: [] });
});

test("join", () => {
  const cols = [sql.ident("a"), sql.ident("b"), sql.ident("c")];
  const q = sql`SELECT ${sql.join(cols)}`;
  expect(q.compile("pg")).toEqual({ text: 'SELECT "a", "b", "c"', values: [] });
});

test("mixed params and idents", () => {
  const q = sql`SELECT ${sql.ident("name")} FROM ${sql.ident("users")} WHERE ${sql.ident("id")} = ${42}`;
  expect(q.compile("pg")).toEqual({
    text: 'SELECT "name" FROM "users" WHERE "id" = $1',
    values: [42],
  });
});

test("raw sql", () => {
  const q = sql`SELECT ${sql.raw("COUNT(*)")} FROM ${sql.ident("users")}`;
  expect(q.compile("pg")).toEqual({ text: 'SELECT COUNT(*) FROM "users"', values: [] });
});
