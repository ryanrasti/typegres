import { describe, expect, it } from "vitest";
import { values } from "./values";
import { Int4, Int8, Float8, Text, Numeric } from "../types";
import { testDb } from "../db.test";
import { assert, Equals } from "tsafe";

describe("LIMIT and OFFSET", () => {
  it("can use LIMIT with literal number", async () => {
    const users = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
      { id: Int4.new(4), name: Text.new("David") },
      { id: Int4.new(5), name: Text.new("Eve") },
    );

    const result = await users
      .orderBy((u) => u.id)
      .select((u) => ({ id: u.id, name: u.name }))
      .limit(3)
      .execute(testDb);

    assert<Equals<typeof result, { id: number; name: string }[]>>();

    expect(result).toHaveLength(3);
    expect(result).toEqual([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ]);
  });

  it("can use LIMIT with typed expression", async () => {
    const users = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
    );

    const result = await users
      .orderBy((u) => u.id)
      .select((u) => ({ id: u.id, name: u.name }))
      .limit(Int4.new(2))
      .execute(testDb);

    assert<Equals<typeof result, { id: number; name: string }[]>>();

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ]);
  });

  it("can use OFFSET with literal number", async () => {
    const users = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
      { id: Int4.new(4), name: Text.new("David") },
      { id: Int4.new(5), name: Text.new("Eve") },
    );

    const result = await users
      .orderBy((u) => u.id)
      .select((u) => ({ id: u.id, name: u.name }))
      .offset(2)
      .execute(testDb);

    assert<Equals<typeof result, { id: number; name: string }[]>>();

    expect(result).toHaveLength(3);
    expect(result).toEqual([
      { id: 3, name: "Charlie" },
      { id: 4, name: "David" },
      { id: 5, name: "Eve" },
    ]);
  });

  it("can use OFFSET with typed expression", async () => {
    const users = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
    );

    const result = await users
      .orderBy((u) => u.id)
      .select((u) => ({ id: u.id, name: u.name }))
      .offset(Int4.new(1))
      .execute(testDb);

    assert<Equals<typeof result, { id: number; name: string }[]>>();

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ]);
  });

  it("can combine LIMIT and OFFSET", async () => {
    const users = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
      { id: Int4.new(4), name: Text.new("David") },
      { id: Int4.new(5), name: Text.new("Eve") },
      { id: Int4.new(6), name: Text.new("Frank") },
    );

    const result = await users
      .orderBy((u) => u.id)
      .select((u) => ({ id: u.id, name: u.name }))
      .limit(2)
      .offset(2)
      .execute(testDb);

    assert<Equals<typeof result, { id: number; name: string }[]>>();

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: 3, name: "Charlie" },
      { id: 4, name: "David" },
    ]);
  });

  it("can use LIMIT and OFFSET with WHERE clause", async () => {
    const products = values(
      {
        id: Int4.new(1),
        name: Text.new("Widget"),
        price: Numeric.new("10.00"),
      },
      {
        id: Int4.new(2),
        name: Text.new("Gadget"),
        price: Numeric.new("20.00"),
      },
      { id: Int4.new(3), name: Text.new("Tool"), price: Numeric.new("15.00") },
      {
        id: Int4.new(4),
        name: Text.new("Device"),
        price: Numeric.new("25.00"),
      },
      {
        id: Int4.new(5),
        name: Text.new("Machine"),
        price: Numeric.new("30.00"),
      },
    );

    const result = await products
      .where((p) => p.price[">"]("15.00"))
      .orderBy((p) => p.id)
      .select((p) => ({ id: p.id, name: p.name, price: p.price }))
      .limit(2)
      .offset(1)
      .execute(testDb);

    assert<
      Equals<typeof result, { id: number; name: string; price: string }[]>
    >();

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: 4, name: "Device", price: "25.00" },
      { id: 5, name: "Machine", price: "30.00" },
    ]);
  });

  it("can use LIMIT and OFFSET with ORDER BY", async () => {
    const users = values(
      { id: Int4.new(1), name: Text.new("Charlie"), age: Int4.new(30) },
      { id: Int4.new(2), name: Text.new("Alice"), age: Int4.new(25) },
      { id: Int4.new(3), name: Text.new("Bob"), age: Int4.new(35) },
      { id: Int4.new(4), name: Text.new("David"), age: Int4.new(20) },
      { id: Int4.new(5), name: Text.new("Eve"), age: Int4.new(28) },
    );

    const result = await users
      .orderBy((u) => u.age)
      .select((u) => ({ name: u.name, age: u.age }))
      .limit(3)
      .offset(1)
      .execute(testDb);

    assert<Equals<typeof result, { name: string; age: number }[]>>();

    expect(result).toHaveLength(3);
    expect(result).toEqual([
      { name: "Alice", age: 25 },
      { name: "Eve", age: 28 },
      { name: "Charlie", age: 30 },
    ]);
  });

  it("can use ORDER BY DESC", async () => {
    const users = values(
      { id: Int4.new(1), name: Text.new("Alice"), age: Int4.new(25) },
      { id: Int4.new(2), name: Text.new("Bob"), age: Int4.new(35) },
      { id: Int4.new(3), name: Text.new("Charlie"), age: Int4.new(30) },
    );

    const result = await users
      .orderBy((u) => [u.age, "desc"])
      .select((u) => ({ name: u.name, age: u.age }))
      .execute(testDb);

    assert<Equals<typeof result, { name: string; age: number }[]>>();

    expect(result).toEqual([
      { name: "Bob", age: 35 },
      { name: "Charlie", age: 30 },
      { name: "Alice", age: 25 },
    ]);
  });

  it("can use multiple ORDER BY columns with mixed syntax", async () => {
    const users = values(
      {
        id: Int4.new(1),
        name: Text.new("Alice"),
        age: Int4.new(25),
        city: Text.new("NYC"),
      },
      {
        id: Int4.new(2),
        name: Text.new("Bob"),
        age: Int4.new(25),
        city: Text.new("LA"),
      },
      {
        id: Int4.new(3),
        name: Text.new("Charlie"),
        age: Int4.new(30),
        city: Text.new("NYC"),
      },
      {
        id: Int4.new(4),
        name: Text.new("David"),
        age: Int4.new(30),
        city: Text.new("LA"),
      },
    );

    const result = await users
      .orderBy(
        (u) => [u.age, "desc"],
        (u) => u.city,
      ) // Mix tuple and raw (implicit ASC)
      .select((u) => ({ name: u.name, age: u.age, city: u.city }))
      .execute(testDb);

    assert<
      Equals<typeof result, { name: string; age: number; city: string }[]>
    >();

    expect(result).toEqual([
      { name: "David", age: 30, city: "LA" },
      { name: "Charlie", age: 30, city: "NYC" },
      { name: "Bob", age: 25, city: "LA" },
      { name: "Alice", age: 25, city: "NYC" },
    ]);
  });

  it("can use LIMIT and OFFSET with GROUP BY", async () => {
    const orders = values(
      { customer: Text.new("Alice"), amount: Numeric.new("100") },
      { customer: Text.new("Alice"), amount: Numeric.new("200") },
      { customer: Text.new("Bob"), amount: Numeric.new("150") },
      { customer: Text.new("Bob"), amount: Numeric.new("250") },
      { customer: Text.new("Charlie"), amount: Numeric.new("300") },
      { customer: Text.new("David"), amount: Numeric.new("50") },
    );

    const result = await orders
      .groupBy((o) => [o.customer])
      .orderBy((agg) => [agg.amount.sum(), "desc"])
      .select((agg, [customer]) => ({
        customer,
        totalAmount: agg.amount.sum(),
      }))
      .limit(2)
      .offset(1)
      .execute(testDb);

    assert<
      Equals<typeof result, { customer: string; totalAmount: string | null }[]>
    >();

    expect(result).toEqual([
      { customer: "Alice", totalAmount: "300" },
      { customer: "Charlie", totalAmount: "300" },
    ]);
  });

  it("can use LIMIT 0 to return no results", async () => {
    const users = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
    );

    const result = await users
      .orderBy((u) => u.id)
      .select((u) => ({ id: u.id, name: u.name }))
      .limit(0)
      .execute(testDb);

    assert<Equals<typeof result, { id: number; name: string }[]>>();

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it("can use OFFSET larger than result set", async () => {
    const users = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
    );

    const result = await users
      .orderBy((u) => u.id)
      .select((u) => ({ id: u.id, name: u.name }))
      .offset(10)
      .execute(testDb);

    assert<Equals<typeof result, { id: number; name: string }[]>>();

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it("can chain LIMIT and OFFSET calls (last one wins)", async () => {
    const users = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
      { id: Int4.new(4), name: Text.new("David") },
    );

    const result = await users
      .orderBy((u) => u.id)
      .select((u) => ({ id: u.id, name: u.name }))
      .limit(10)
      .limit(2) // This should override the previous limit
      .offset(5)
      .offset(1) // This should override the previous offset
      .execute(testDb);

    assert<Equals<typeof result, { id: number; name: string }[]>>();

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ]);
  });

  it("can use LIMIT and OFFSET with scalar queries", async () => {
    const numbers = values(
      { value: Int4.new(1) },
      { value: Int4.new(2) },
      { value: Int4.new(3) },
      { value: Int4.new(4) },
      { value: Int4.new(5) },
    );

    const result = await numbers
      .orderBy((n) => n.value)
      .select((n) => n.value)
      .limit(3)
      .offset(1)
      .execute(testDb);

    assert<Equals<typeof result, number[]>>();

    expect(result).toEqual([2, 3, 4]);
  });

  it("can use LIMIT and OFFSET with set operations", async () => {
    const query1 = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
    );

    const query2 = values(
      { id: Int4.new(3), name: Text.new("Charlie") },
      { id: Int4.new(4), name: Text.new("David") },
    );

    const result = await query1
      .union(query2)
      .orderBy((u) => u.id)
      .limit(2)
      .offset(1)
      .execute(testDb);

    assert<Equals<typeof result, { id: number; name: string }[]>>();

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ]);
  });

  it("can use expressions (not just literals) for LIMIT and OFFSET", async () => {
    const users = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
      { id: Int4.new(4), name: Text.new("David") },
      { id: Int4.new(5), name: Text.new("Eve") },
    );

    // Use actual expressions instead of just literals
    const limitExpr = Int4.new(2)["+"](Int4.new(1)); // 2 + 1 = 3
    const offsetExpr = Int4.new(3)["-"](Int4.new(2)); // 3 - 2 = 1

    const result = await users
      .orderBy((u) => u.id)
      .select((u) => ({ id: u.id, name: u.name }))
      .limit(limitExpr)
      .offset(offsetExpr)
      .execute(testDb);

    assert<Equals<typeof result, { id: number; name: string }[]>>();

    expect(result).toHaveLength(3);
    expect(result).toEqual([
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
      { id: 4, name: "David" },
    ]);
  });

  it("accepts different numeric types for LIMIT and OFFSET", async () => {
    const users = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
      { id: Int4.new(4), name: Text.new("David") },
    );

    // Test with Int8
    const result1 = await users
      .orderBy((u) => u.id)
      .select((u) => ({ id: u.id, name: u.name }))
      .limit(Int8.new(2n))
      .execute(testDb);

    expect(result1).toHaveLength(2);

    // Test with Float8
    const result2 = await users
      .orderBy((u) => u.id)
      .select((u) => ({ id: u.id, name: u.name }))
      .limit(Float8.new(3.0))
      .execute(testDb);

    expect(result2).toHaveLength(3);

    // Test with Numeric
    const result3 = await users
      .orderBy((u) => u.id)
      .select((u) => ({ id: u.id, name: u.name }))
      .offset(Numeric.new("1"))
      .limit(Numeric.new("2"))
      .execute(testDb);

    expect(result3).toHaveLength(2);
    expect(result3).toEqual([
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ]);
  });

  it("can use ORDER BY with varargs and lowercase", async () => {
    const users = values(
      {
        id: Int4.new(1),
        name: Text.new("Alice"),
        age: Int4.new(25),
        city: Text.new("NYC"),
      },
      {
        id: Int4.new(2),
        name: Text.new("Bob"),
        age: Int4.new(25),
        city: Text.new("LA"),
      },
      {
        id: Int4.new(3),
        name: Text.new("Charlie"),
        age: Int4.new(30),
        city: Text.new("NYC"),
      },
      {
        id: Int4.new(4),
        name: Text.new("David"),
        age: Int4.new(30),
        city: Text.new("LA"),
      },
    );

    const result = await users
      .orderBy(
        (u) => [u.age, "desc"], // Single tuple with lowercase
        (u) => u.city, // Raw value (implicit ASC)
      )
      .select((u) => ({ name: u.name, age: u.age, city: u.city }))
      .execute(testDb);

    assert<
      Equals<typeof result, { name: string; age: number; city: string }[]>
    >();

    expect(result).toEqual([
      { name: "David", age: 30, city: "LA" },
      { name: "Charlie", age: 30, city: "NYC" },
      { name: "Bob", age: 25, city: "LA" },
      { name: "Alice", age: 25, city: "NYC" },
    ]);
  });

  it("can chain ORDER BY calls (last one is primary sort)", async () => {
    const users = values(
      {
        id: Int4.new(1),
        name: Text.new("Alice"),
        age: Int4.new(25),
        city: Text.new("NYC"),
      },
      {
        id: Int4.new(2),
        name: Text.new("Bob"),
        age: Int4.new(25),
        city: Text.new("LA"),
      },
      {
        id: Int4.new(3),
        name: Text.new("Charlie"),
        age: Int4.new(30),
        city: Text.new("NYC"),
      },
      {
        id: Int4.new(4),
        name: Text.new("David"),
        age: Int4.new(25),
        city: Text.new("NYC"),
      },
    );

    // Chain orderBy calls - last one should be the primary sort
    const result = await users
      .orderBy((u) => u.city) // Secondary sort
      .orderBy((u) => u.age) // Primary sort
      .select((u) => ({ name: u.name, age: u.age, city: u.city }))
      .execute(testDb);

    assert<
      Equals<typeof result, { name: string; age: number; city: string }[]>
    >();

    // Should be sorted by age first, then by city
    expect(result).toEqual([
      { name: "Bob", age: 25, city: "LA" },
      { name: "Alice", age: 25, city: "NYC" },
      { name: "David", age: 25, city: "NYC" },
      { name: "Charlie", age: 30, city: "NYC" },
    ]);
  });

  it("can use ORDER BY with scalar queries", async () => {
    const numbers = values(
      { value: Int4.new(3) },
      { value: Int4.new(1) },
      { value: Int4.new(4) },
      { value: Int4.new(2) },
    );

    const result = await numbers
      .orderBy((n) => [n.value, "desc"])
      .select((n) => n.value)
      .execute(testDb);

    assert<Equals<typeof result, number[]>>();

    expect(result).toEqual([4, 3, 2, 1]);
  });

  it("can use subquery expressions for LIMIT", async () => {
    const config = values({ key: Text.new("page_size"), value: Int4.new(3) });

    const users = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
      { id: Int4.new(4), name: Text.new("David") },
      { id: Int4.new(5), name: Text.new("Eve") },
    );

    // Use a subquery to get the limit value
    const limitValue = config
      .where((c) => c.key["="]("page_size"))
      .select((c) => c.value)
      .scalar();

    const result = await users
      .orderBy((u) => u.id)
      .select((u) => ({ id: u.id, name: u.name }))
      .limit(limitValue)
      .execute(testDb);

    assert<Equals<typeof result, { id: number; name: string }[]>>();

    expect(result).toHaveLength(3);
    expect(result).toEqual([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ]);
  });
});
