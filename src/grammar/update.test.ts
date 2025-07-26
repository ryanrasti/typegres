import { describe, it, expect } from "vitest";
import { update } from "./generated/update";
import { Expression } from "../expression";
import { Int4, Text, Bool, Numeric } from "../types";
import { sql } from "kysely";
import { dummyDb } from "../test/db";
import { now } from "../gen/functions";

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

describe("UPDATE parser", () => {
  it("should parse and compile a basic UPDATE statement", () => {
    // For now, use a simple string for table name
    const parsed = update(
      [], // no ONLY
      "users", // table name as string
      { set: [() => ({ name: Text.new("John") })] }, // SET clause
    );

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe('UPDATE "users" SET "name" = cast($1 as text)');
    expect(result.parameters).toEqual(["John"]);
  });

  it("should parse UPDATE with ONLY", () => {
    const parsed = update(["only"], "users", {
      set: [() => ({ status: Text.new("active") })],
    });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'UPDATE ONLY "users" SET "status" = cast($1 as text)',
    );
    expect(result.parameters).toEqual(["active"]);
  });

  it("should parse UPDATE with WHERE clause", () => {
    const parsed = update([], "users", {
      set: [() => ({ name: Text.new("Jane") })],
      where: [() => Int4.new(ref("id"))["="](1)],
    });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'UPDATE "users" SET "name" = cast($1 as text) WHERE ("id" = $2)',
    );
    expect(result.parameters).toEqual(["Jane", 1]);
  });

  it("should parse UPDATE with RETURNING clause", () => {
    const parsed = update([], "users", {
      set: [() => ({ updated_at: now() })],
      returning: [
        () => ({ id: Int4.new(ref("id")), name: Text.new(ref("name")) }),
      ],
    });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'UPDATE "users" SET "updated_at" = now() RETURNING "id" AS "id", "name" AS "name"',
    );
    expect(result.parameters).toEqual([]);
  });

  it("should parse UPDATE with multiple SET assignments", () => {
    const parsed = update([], "users", {
      set: [
        () => ({
          name: Text.new("John Doe"),
          email: Text.new("john@example.com"),
          age: Int4.new(30),
        }),
      ],
    });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'UPDATE "users" SET "name" = cast($1 as text), "email" = cast($2 as text), "age" = cast($3 as int4)',
    );
    expect(result.parameters).toEqual(["John Doe", "john@example.com", 30]);
  });

  it("should parse UPDATE with all features combined", () => {
    const parsed = update(["only"], "products", {
      set: [
        () => ({
          price: Numeric.new("99.99"),
          updated_at: Text.new(`CURRENT_TIMESTAMP`),
        }),
      ],
      where: [
        () =>
          Bool.new(ref("active"))
            ["="](true)
            .and(Int4.new(ref("stock"))[">"](0)),
      ],
      returning: [
        () => ({
          id: Int4.new(ref("id")),
          price: Numeric.new(ref("price")),
        }),
      ],
    });

    const compiled = parsed.compile();
    const result = compiled.compile(dummyDb);

    expect(result.sql).toBe(
      'UPDATE ONLY "products" SET "price" = cast($1 as numeric), "updated_at" = cast($2 as text) WHERE (("active" = $3) AND ("stock" > $4)) RETURNING "id" AS "id", "price" AS "price"',
    );
    expect(result.parameters).toEqual(["99.99", "CURRENT_TIMESTAMP", true, 0]);
  });
});
