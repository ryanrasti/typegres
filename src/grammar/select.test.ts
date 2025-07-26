import { describe, it, expect } from "vitest";
import { select } from "./generated/select";
import { Expression } from "../expression";
import { Int4, Text, Bool } from "../types";
import { sql } from "kysely";
import { dummyDb } from "../test/db";

// Create a simple reference expression class
class RefExpression extends Expression {
  constructor(private ref: string) {
    super();
  }

  compile() {
    return sql.ref(this.ref);
  }
}

const ref = (ref: string): Expression => {
  return new RefExpression(ref);
};

describe("SELECT parser", () => {
  it("should parse and compile a basic SELECT statement", () => {
    const parsed = select(
      [], // no DISTINCT/ALL
      [() => ({ id: Int4.new(ref("id")), name: Text.new(ref("name")) })], // select list
      {},
    );

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe('SELECT "id" AS "id", "name" AS "name"');
    expect(result.parameters).toEqual([]);
  });

  it("should parse SELECT with DISTINCT", () => {
    const parsed = select(
      ["distinct"],
      [() => ({ name: Text.new(ref("name")) })],
      {},
    );

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe('SELECT DISTINCT "name" AS "name"');
    expect(result.parameters).toEqual([]);
  });

  it("should parse SELECT with LIMIT", () => {
    const parsed = select([], [() => ({ id: Int4.new(ref("id")) })], {
      limit: [[Int4.new(10)]],
    });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe('SELECT "id" AS "id" LIMIT cast($1 as int4)');
    expect(result.parameters).toEqual([10]);
  });

  it("should parse SELECT with ORDER BY", () => {
    const parsed = select([], [() => ({ name: Text.new(ref("name")) })], {
      orderBy: [[[() => Text.new(ref("name")), ["asc"], []]]],
    });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe('SELECT "name" AS "name" ORDER BY "name" ASC');
    expect(result.parameters).toEqual([]);
  });

  it("should parse SELECT with multiple columns and options", () => {
    const parsed = select(
      ["all"],
      [
        () => ({
          id: Int4.new(ref("id")),
          name: Text.new(ref("name")),
          active: Bool.new(ref("active")),
        }),
      ],
      {
        orderBy: [[[() => Int4.new(ref("id")), ["desc"], ["nullsLast"]]]],
        limit: [[Int4.new(50)]],
        offset: [Int4.new(10), ["rows"]],
      },
    );

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'SELECT ALL "id" AS "id", "name" AS "name", "active" AS "active" ORDER BY "id" DESC NULLS LAST LIMIT cast($1 as int4) OFFSET cast($2 as int4) ROWS',
    );
    expect(result.parameters).toEqual([50, 10]);
  });
});
