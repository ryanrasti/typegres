import { test, expect } from "vitest";
import { Int4, Int8, Text, Bool } from "./index";

// --- match via operators/functions ---

test("match: correct type passes", () => {
  const a = Int4.from(5) as Int4<1>;
  const result = a["+"](Int4.from(3));
  expect(result.toSql().bind().compile("pg").text).toContain("+");
});

test("match: primitive passes when allowed", () => {
  const a = Int4.from(5) as Int4<1>;
  const result = a["+"](3);
  expect(result.toSql().bind().compile("pg").text).toContain("+");
});

test("match: wrong primitive type throws", () => {
  const a = Int4.from(5) as Int4<1>;
  // @ts-expect-error — string is not a valid arg for Int4["+"]
  expect(() => a["+"](("hello" as unknown))).toThrow("No matching overload");
});

test("match: wrong class type throws", () => {
  const a = Int4.from(5) as Int4<1>;
  // Text is not a valid arg for Int4["+"]
  expect(() => a["+"](Text.from("hello") as any)).toThrow("No matching overload");
});

test("match: null throws", () => {
  const a = Int4.from(5) as Int4<1>;
  expect(() => a["+"](null as any)).toThrow("No matching overload");
});

test("match: undefined throws", () => {
  const a = Int4.from(5) as Int4<1>;
  expect(() => a["+"](undefined as any)).toThrow("No matching overload");
});

test("match: multi-overload resolves correct return type", () => {
  const a = Int4.from(5) as Int4<1>;

  // Int4 * Int4 → Int4
  const r1 = a["*"](Int4.from(3));
  expect(r1.toSql().bind().compile("pg").text).toContain("*");

  // Int4 * Int8 → Int8 (different return type per overload)
  const r2 = a["*"](Int8.from(3n));
  expect(r2.toSql().bind().compile("pg").text).toContain("*");
});

test("match: comparison operator returns Bool", () => {
  const a = Int4.from(5) as Int4<1>;
  const result = a[">"](3);
  // Should be a Bool, not an Int4
  expect(result).toBeInstanceOf(Bool);
});

test("match: serializes primitive arg into typed instance", () => {
  const a = Int4.from(5) as Int4<1>;
  const result = a["+"](3);
  // The compiled SQL should have CAST for both args (both are primitives wrapped)
  const compiled = result.toSql().bind().compile("pg");
  expect(compiled.text).toContain("CAST");
});

test("serialize: correct primitive passes", () => {
  const result = Int4.serialize(42);
  expect(result).toBeInstanceOf(Int4);
});

test("serialize: instance passes through", () => {
  const original = Int4.from(42);
  const result = Int4.serialize(original);
  expect(result).toBe(original);
});

test("serialize: wrong type throws", () => {
  expect(() => Int4.serialize("hello")).toThrow("int4.serialize: expected a int4 instance or number primitive");
});

test("serialize: null throws", () => {
  expect(() => Int4.serialize(null)).toThrow();
});

test("serialize: bigint for Int8 passes", () => {
  const result = Int8.serialize(42n);
  expect(result).toBeInstanceOf(Int8);
});

test("serialize: number for Int8 throws", () => {
  expect(() => Int8.serialize(42)).toThrow("int8.serialize: expected a int8 instance or bigint primitive");
});
