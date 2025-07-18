import { describe, expect, it } from "vitest";
import { values } from "../query/values";
import { Int4, Text } from "../types";
import { testDb } from "../db.test";
import { assert, Equals } from "tsafe";

describe("IN/NOT IN operations", () => {
  it("can use IN with value list", async () => {
    const result = await values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
    )
      .select((row) => ({
        id: row.id,
        isInList: row.id.in([1, 3, 5]),
      }))
      .execute(testDb);

    assert<Equals<typeof result, { id: number; isInList: boolean }[]>>();

    expect(result).toEqual([
      { id: 1, isInList: true },
      { id: 2, isInList: false },
      { id: 3, isInList: true },
    ]);
  });

  it("can use NOT IN with value list", async () => {
    const result = await values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
    )
      .select((row) => ({
        id: row.id,
        notInList: row.id.notIn([2, 4, 6]),
      }))
      .execute(testDb);

    assert<Equals<typeof result, { id: number; notInList: boolean }[]>>();

    expect(result).toEqual([
      { id: 1, notInList: true },
      { id: 2, notInList: false },
      { id: 3, notInList: true },
    ]);
  });

  it("can use IN with subquery", async () => {
    const activeUserIds = values(
      { userId: Int4.new(1) },
      { userId: Int4.new(3) },
    ).select((u) => u.userId);

    const result = await values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
    )
      .select((row) => ({
        id: row.id,
        name: row.name,
        isActive: row.id.in(activeUserIds),
      }))
      .execute(testDb);

    assert<
      Equals<typeof result, { id: number; name: string; isActive: boolean }[]>
    >();

    expect(result).toEqual([
      { id: 1, name: "Alice", isActive: true },
      { id: 2, name: "Bob", isActive: false },
      { id: 3, name: "Charlie", isActive: true },
    ]);
  });

  it("can use NOT IN with subquery", async () => {
    const bannedUserIds = values({ userId: Int4.new(2) }).select(
      (u) => u.userId,
    );

    const result = await values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
    )
      .select((row) => ({
        id: row.id,
        name: row.name,
        notBanned: row.id.notIn(bannedUserIds),
      }))
      .execute(testDb);

    assert<
      Equals<typeof result, { id: number; name: string; notBanned: boolean }[]>
    >();

    expect(result).toEqual([
      { id: 1, name: "Alice", notBanned: true },
      { id: 2, name: "Bob", notBanned: false },
      { id: 3, name: "Charlie", notBanned: true },
    ]);
  });
});

describe("EXISTS/NOT EXISTS operations", () => {
  it("can use EXISTS", async () => {
    const users = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
    );

    const orders = values(
      { orderId: Int4.new(1), userId: Int4.new(1), amount: Int4.new(100) },
      { orderId: Int4.new(2), userId: Int4.new(1), amount: Int4.new(200) },
      { orderId: Int4.new(3), userId: Int4.new(3), amount: Int4.new(300) },
    );

    const result = await users
      .select((u) => ({
        name: u.name,
        hasOrders: orders.where((o) => o.userId["="](u.id)).exists(),
      }))
      .execute(testDb);

    assert<Equals<typeof result, { name: string; hasOrders: boolean }[]>>();

    expect(result).toEqual([
      { name: "Alice", hasOrders: true },
      { name: "Bob", hasOrders: false },
    ]);
  });

  it("can use NOT EXISTS", async () => {
    const users = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
    );

    const orders = values(
      { orderId: Int4.new(1), userId: Int4.new(1), amount: Int4.new(100) },
      { orderId: Int4.new(2), userId: Int4.new(3), amount: Int4.new(200) },
    );

    const result = await users
      .select((u) => ({
        name: u.name,
        noOrders: orders.where((o) => o.userId["="](u.id)).notExists(),
      }))
      .execute(testDb);

    assert<Equals<typeof result, { name: string; noOrders: boolean }[]>>();

    expect(result).toEqual([
      { name: "Alice", noOrders: false },
      { name: "Bob", noOrders: true },
      { name: "Charlie", noOrders: false },
    ]);
  });
});

describe("Set operations (UNION, INTERSECT, EXCEPT)", () => {
  it("can use UNION", async () => {
    const query1 = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
    );

    const query2 = values(
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
    );

    const result = await query1.union(query2).execute(testDb);

    assert<Equals<typeof result, { id: number; name: string }[]>>();

    expect(result).toHaveLength(3);
    expect(result).toEqual(
      expect.arrayContaining([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
      ]),
    );
  });

  it("can use UNION ALL", async () => {
    const query1 = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
    );

    const query2 = values(
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
    );

    const result = await query1.unionAll(query2).execute(testDb);

    assert<Equals<typeof result, { id: number; name: string }[]>>();

    expect(result).toEqual([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ]);
  });

  it("can use INTERSECT", async () => {
    const query1 = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
    );

    const query2 = values(
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
      { id: Int4.new(4), name: Text.new("David") },
    );

    const result = await query1.intersect(query2).execute(testDb);

    assert<Equals<typeof result, { id: number; name: string }[]>>();

    expect(result).toEqual([
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ]);
  });

  it("can use EXCEPT", async () => {
    const query1 = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
    );

    const query2 = values({ id: Int4.new(2), name: Text.new("Bob") });

    const result = await query1.except(query2).execute(testDb);

    assert<Equals<typeof result, { id: number; name: string }[]>>();

    expect(result).toEqual([
      { id: 1, name: "Alice" },
      { id: 3, name: "Charlie" },
    ]);
  });

  it("can work with scalar queries", async () => {
    const query1 = values(
      { id: Int4.new(1) },
      { id: Int4.new(2) },
      { id: Int4.new(3) },
    ).select((v) => v.id);

    const query2 = values(
      { id: Int4.new(3) },
      { id: Int4.new(4) },
      { id: Int4.new(5) },
    ).select((v) => v.id);

    const result = await query1.union(query2).execute(testDb);

    assert<Equals<typeof result, number[]>>();

    expect(result).toHaveLength(5);
    expect(result.sort()).toEqual([1, 2, 3, 4, 5]);
  });

  it("can chain multiple set operations", async () => {
    const query1 = values({ id: Int4.new(1) }, { id: Int4.new(2) });
    const query2 = values({ id: Int4.new(2) }, { id: Int4.new(3) });
    const query3 = values({ id: Int4.new(3) }, { id: Int4.new(4) });

    const result = await query1.union(query2).union(query3).execute(testDb);

    assert<Equals<typeof result, { id: number }[]>>();

    expect(result).toHaveLength(4);
    expect(result).toEqual(
      expect.arrayContaining([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]),
    );
  });

  it("can use set operations with WHERE clauses", async () => {
    const users = values(
      { id: Int4.new(1), name: Text.new("Alice"), age: Int4.new(25) },
      { id: Int4.new(2), name: Text.new("Bob"), age: Int4.new(30) },
      { id: Int4.new(3), name: Text.new("Charlie"), age: Int4.new(35) },
      { id: Int4.new(4), name: Text.new("David"), age: Int4.new(40) },
    );

    const youngUsers = users.where((u) => u.age["<"](Int4.new(32)));
    const oldUsers = users.where((u) => u.age[">="](Int4.new(32)));

    const result = await youngUsers
      .select((u) => ({ name: u.name, category: Text.new("young") }))
      .union(
        oldUsers.select((u) => ({ name: u.name, category: Text.new("old") })),
      )
      .select((u) => ({
        name: u.name.lower(),
        category: u.category,
        foo: Text.new("bar"),
      }))
      .execute(testDb);

    assert<
      Equals<typeof result, { name: string; category: string; foo: string }[]>
    >();

    expect(result).toHaveLength(4);
    expect(result).toEqual(
      expect.arrayContaining([
        { name: "alice", category: "young", foo: "bar" },
        { name: "bob", category: "young", foo: "bar" },
        { name: "charlie", category: "old", foo: "bar" },
        { name: "david", category: "old", foo: "bar" },
      ]),
    );
  });

  it("cannot use set operations with incompatible types", async () => {
    const query1 = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
    );

    const query2 = values({ id: Int4.new(3), name2: Text.new("Charlie") });

    // @ts-expect-error
    query1.union(query2);
  });
});
