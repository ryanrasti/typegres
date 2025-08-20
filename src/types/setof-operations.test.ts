import { describe, expect, it } from "vitest";
import { values } from "../query/values";
import { Int4, Text } from "../types";
import { testDb } from "../db.test";
import { assert, Equals } from "tsafe";
import { select } from "../grammar";

describe("IN/NOT IN operations", () => {
  it("can use IN with value list", async () => {
    const data = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
    );

    const result = await select(
      (row) => ({
        id: row.id,
        isInList: row.id.in([1, 3, 5]),
      }),
      {
        from: data,
      },
    ).execute(testDb);

    assert<Equals<typeof result, { id: number; isInList: boolean }[]>>();

    expect(result).toEqual([
      { id: 1, isInList: true },
      { id: 2, isInList: false },
      { id: 3, isInList: true },
    ]);
  });

  it("can use NOT IN with value list", async () => {
    const data = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
    );

    const result = await select(
      (row) => ({
        id: row.id,
        notInList: row.id.notIn([2, 4, 6]),
      }),
      {
        from: data,
      },
    ).execute(testDb);

    assert<Equals<typeof result, { id: number; notInList: boolean }[]>>();

    expect(result).toEqual([
      { id: 1, notInList: true },
      { id: 2, notInList: false },
      { id: 3, notInList: true },
    ]);
  });

  it("can use IN with subquery", async () => {
    const activeUserIds = select((u) => ({ userId: u.userId }), {
      from: values({ userId: Int4.new(1) }, { userId: Int4.new(3) }),
    });

    const data = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
    );

    const result = await select(
      (row) => ({
        id: row.id,
        name: row.name,
        isActive: row.id.in(activeUserIds),
      }),
      {
        from: data,
      },
    ).execute(testDb);

    assert<Equals<typeof result, { id: number; name: string; isActive: boolean }[]>>();

    expect(result).toEqual([
      { id: 1, name: "Alice", isActive: true },
      { id: 2, name: "Bob", isActive: false },
      { id: 3, name: "Charlie", isActive: true },
    ]);
  });

  it("can use NOT IN with subquery", async () => {
    const bannedUserIds = select((u) => ({ userId: u.userId }), {
      from: values({ userId: Int4.new(2) }),
    });

    const data = values(
      { id: Int4.new(1), name: Text.new("Alice") },
      { id: Int4.new(2), name: Text.new("Bob") },
      { id: Int4.new(3), name: Text.new("Charlie") },
    );

    const result = await select(
      (row) => ({
        id: row.id,
        name: row.name,
        notBanned: row.id.notIn(bannedUserIds),
      }),
      {
        from: data,
      },
    ).execute(testDb);

    assert<Equals<typeof result, { id: number; name: string; notBanned: boolean }[]>>();

    expect(result).toEqual([
      { id: 1, name: "Alice", notBanned: true },
      { id: 2, name: "Bob", notBanned: false },
      { id: 3, name: "Charlie", notBanned: true },
    ]);
  });
});

describe("EXISTS/NOT EXISTS operations", () => {
  it("can use EXISTS", async () => {
    const users = values({ id: Int4.new(1), name: Text.new("Alice") }, { id: Int4.new(2), name: Text.new("Bob") });

    const orders = values(
      { orderId: Int4.new(1), userId: Int4.new(1), amount: Int4.new(100) },
      { orderId: Int4.new(2), userId: Int4.new(1), amount: Int4.new(200) },
      { orderId: Int4.new(3), userId: Int4.new(3), amount: Int4.new(300) },
    );

    const result = await select(
      (u) => ({
        name: u.name,
        hasOrders: select(() => ({ dummy: Int4.new(1) }), {
          from: orders,
          where: (o) => o.userId["="](u.id),
        }).exists(),
      }),
      {
        from: users,
      },
    ).execute(testDb);

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

    const result = await select(
      (u) => ({
        name: u.name,
        noOrders: select(() => ({ dummy: Int4.new(1) }), {
          from: orders,
          where: (o) => o.userId["="](u.id),
        }).notExists(),
      }),
      {
        from: users,
      },
    ).execute(testDb);

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
    const query1 = values({ id: Int4.new(1), name: Text.new("Alice") }, { id: Int4.new(2), name: Text.new("Bob") });

    const query2 = values({ id: Int4.new(2), name: Text.new("Bob") }, { id: Int4.new(3), name: Text.new("Charlie") });

    const result = await select((row) => ({ id: row.id, name: row.name }), {
      from: query1,
      union: select((row) => ({ id: row.id, name: row.name }), {
        from: query2,
      }),
    }).execute(testDb);

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
    const query1 = values({ id: Int4.new(1), name: Text.new("Alice") }, { id: Int4.new(2), name: Text.new("Bob") });

    const query2 = values({ id: Int4.new(2), name: Text.new("Bob") }, { id: Int4.new(3), name: Text.new("Charlie") });

    const result = await select((row) => ({ id: row.id, name: row.name }), {
      from: query1,
      unionAll: select((row) => ({ id: row.id, name: row.name }), {
        from: query2,
      }),
    }).execute(testDb);

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

    const result = await select((row) => ({ id: row.id, name: row.name }), {
      from: query1,
      intersect: select((row) => ({ id: row.id, name: row.name }), {
        from: query2,
      }),
    }).execute(testDb);

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

    const result = await select((row) => ({ id: row.id, name: row.name }), {
      from: query1,
      except: select((row) => ({ id: row.id, name: row.name }), {
        from: query2,
      }),
    }).execute(testDb);

    assert<Equals<typeof result, { id: number; name: string }[]>>();

    expect(result).toEqual([
      { id: 1, name: "Alice" },
      { id: 3, name: "Charlie" },
    ]);
  });

  it("can work with scalar queries", async () => {
    const query1 = values({ id: Int4.new(1) }, { id: Int4.new(2) }, { id: Int4.new(3) });

    const query2 = values({ id: Int4.new(3) }, { id: Int4.new(4) }, { id: Int4.new(5) });

    const result = await select((v) => ({ value: v.id }), {
      from: query1,
      union: select((v) => ({ value: v.id }), { from: query2 }),
    }).execute(testDb);

    assert<Equals<typeof result, { value: number }[]>>();

    expect(result).toHaveLength(5);
    const sortedValues = result.map((r) => r.value).sort();
    expect(sortedValues).toEqual([1, 2, 3, 4, 5]);
  });

  it("can chain multiple set operations", async () => {
    const query1 = values({ id: Int4.new(1) }, { id: Int4.new(2) });
    const query2 = values({ id: Int4.new(2) }, { id: Int4.new(3) });
    const query3 = values({ id: Int4.new(3) }, { id: Int4.new(4) });

    // First combine query1 and query2
    const combinedQuery = select((row) => ({ id: row.id }), {
      from: query1,
      union: select((row) => ({ id: row.id }), { from: query2 }),
    });

    // Then union with query3
    const result = await select((row) => ({ id: row.id }), {
      from: combinedQuery,
      union: select((row) => ({ id: row.id }), { from: query3 }),
    }).execute(testDb);

    assert<Equals<typeof result, { id: number }[]>>();

    expect(result).toHaveLength(4);
    expect(result).toEqual(expect.arrayContaining([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]));
  });

  it("can use set operations with WHERE clauses", async () => {
    const users = values(
      { id: Int4.new(1), name: Text.new("Alice"), age: Int4.new(25) },
      { id: Int4.new(2), name: Text.new("Bob"), age: Int4.new(30) },
      { id: Int4.new(3), name: Text.new("Charlie"), age: Int4.new(35) },
      { id: Int4.new(4), name: Text.new("David"), age: Int4.new(40) },
    );

    // Create the young users query
    const youngUsersQuery = select((u) => ({ name: u.name, category: Text.new("young") }), {
      from: users,
      where: (u) => u.age["<"](Int4.new(32)),
    });

    // Create the old users query
    const oldUsersQuery = select((u) => ({ name: u.name, category: Text.new("old") }), {
      from: users,
      where: (u) => u.age[">="](Int4.new(32)),
    });

    // Union them and add final transformation
    const unionedQuery = select((u) => ({ name: u.name, category: u.category }), {
      from: youngUsersQuery,
      union: oldUsersQuery,
    });

    const result = await select(
      (u) => ({
        name: u.name.lower(),
        category: u.category,
        foo: Text.new("bar"),
      }),
      {
        from: unionedQuery,
      },
    ).execute(testDb);

    assert<Equals<typeof result, { name: string; category: string; foo: string }[]>>();

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

  it.skip("cannot use set operations with incompatible types", async () => {
    const query1 = values({ id: Int4.new(1), name: Text.new("Alice") }, { id: Int4.new(2), name: Text.new("Bob") });

    select(
      // @ts-expect-error
      ({ id, name }) => ({ id, name }),
      {
        from: query1,
        union: select((r) => r, {
          from: values({ id: Int4.new(3), name2: Text.new("Charlie") }),
        }),
      },
    );
  });
});
