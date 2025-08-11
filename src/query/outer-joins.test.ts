import { describe, expect, it } from "vitest";
import { values } from "./values";
import { Int4, Text, Numeric } from "../types";
import { testDb } from "../db.test";
import { assert, Equals } from "tsafe";
import { select } from "../grammar";

describe("Outer Joins", () => {
  describe("LEFT JOIN", () => {
    it("returns all rows from left table with nulls for unmatched right", async () => {
      const users = values(
        { id: Int4.new(1), name: Text.new("Alice") },
        { id: Int4.new(2), name: Text.new("Bob") },
        { id: Int4.new(3), name: Text.new("Charlie") },
      );

      const orders = values(
        {
          id: Int4.new(101),
          userId: Int4.new(1),
          amount: Numeric.new("100.00"),
        },
        {
          id: Int4.new(102),
          userId: Int4.new(1),
          amount: Numeric.new("200.00"),
        },
        {
          id: Int4.new(103),
          userId: Int4.new(3),
          amount: Numeric.new("150.00"),
        },
      );

      const usersWithOrders = users.leftJoin(orders, "o", (u, { o }) =>
        u.id["="](o.userId),
      );

      const result = await select(
        (u, { o }) => ({
          userName: u.name,
          orderId: o.id,
          orderAmount: o.amount,
        }),
        {
          from: usersWithOrders,
          orderBy: (u) => u.id,
        },
      ).execute(testDb);

      assert<
        Equals<
          typeof result,
          {
            userName: string;
            orderId: number | null;
            orderAmount: string | null;
          }[]
        >
      >();

      expect(result).toHaveLength(4);
      expect(result).toEqual([
        { userName: "Alice", orderId: 101, orderAmount: "100.00" },
        { userName: "Alice", orderId: 102, orderAmount: "200.00" },
        { userName: "Bob", orderId: null, orderAmount: null },
        { userName: "Charlie", orderId: 103, orderAmount: "150.00" },
      ]);
    });

    it("can filter on nullable columns using isNull", async () => {
      const users = values(
        { id: Int4.new(1), name: Text.new("Alice") },
        { id: Int4.new(2), name: Text.new("Bob") },
        { id: Int4.new(3), name: Text.new("Charlie") },
      );

      const orders = values(
        {
          id: Int4.new(101),
          userId: Int4.new(1),
          amount: Numeric.new("100.00"),
        },
        {
          id: Int4.new(103),
          userId: Int4.new(3),
          amount: Numeric.new("150.00"),
        },
      );

      const usersWithOrders = users.leftJoin(orders, "o", (u, { o }) =>
        u.id["="](o.userId),
      );

      const result = await select(
        (u, { o }) => ({
          userName: u.name,
          hasOrder: o.id.isNotNull(),
        }),
        {
          from: usersWithOrders,
          where: (_, { o }) => o.id.isNull(),
        },
      ).execute(testDb);

      assert<
        Equals<
          typeof result,
          {
            userName: string;
            hasOrder: boolean;
          }[]
        >
      >();

      expect(result).toHaveLength(1);
      expect(result).toEqual([{ userName: "Bob", hasOrder: false }]);
    });

    it("can chain multiple left joins", async () => {
      const users = values(
        { id: Int4.new(1), name: Text.new("Alice") },
        { id: Int4.new(2), name: Text.new("Bob") },
      );

      const profiles = values({
        id: Int4.new(1),
        userId: Int4.new(1),
        bio: Text.new("Alice's bio"),
      });

      const settings = values(
        { id: Int4.new(1), userId: Int4.new(1), theme: Text.new("dark") },
        { id: Int4.new(2), userId: Int4.new(2), theme: Text.new("light") },
      );

      const usersWithProfiles = users.leftJoin(profiles, "p", (u, { p }) =>
        u.id["="](p.userId),
      );
      const usersWithProfilesAndSettings = usersWithProfiles.leftJoin(
        settings,
        "s",
        (u, { s }) => u.id["="](s.userId),
      );

      const result = await select(
        (u, { p, s }) => ({
          name: u.name,
          bio: p.bio,
          theme: s.theme,
        }),
        {
          from: usersWithProfilesAndSettings,
          orderBy: (u) => u.id,
        },
      ).execute(testDb);

      assert<
        Equals<
          typeof result,
          {
            name: string;
            bio: string | null;
            theme: string | null;
          }[]
        >
      >();

      expect(result).toEqual([
        { name: "Alice", bio: "Alice's bio", theme: "dark" },
        { name: "Bob", bio: null, theme: "light" },
      ]);
    });
  });

  describe("RIGHT JOIN", () => {
    it("returns all rows from right table with nulls for unmatched left", async () => {
      const orders = values(
        {
          id: Int4.new(101),
          userId: Int4.new(1),
          amount: Numeric.new("100.00"),
        },
        {
          id: Int4.new(102),
          userId: Int4.new(2),
          amount: Numeric.new("200.00"),
        },
        {
          id: Int4.new(103),
          userId: Int4.new(4),
          amount: Numeric.new("150.00"),
        },
      );

      const users = values(
        { id: Int4.new(1), name: Text.new("Alice") },
        { id: Int4.new(2), name: Text.new("Bob") },
        { id: Int4.new(3), name: Text.new("Charlie") }, // User with no orders
      );

      const ordersWithUsers = orders.rightJoin(users, "u", (o, { u }) =>
        o.userId["="](u.id),
      );

      const result = await select(
        (o, { u }) => ({
          userName: u.name,
          orderId: o.id,
          orderAmount: o.amount,
        }),
        {
          from: ordersWithUsers,
          orderBy: (_, { u }) => u.id,
        },
      ).execute(testDb);

      assert<
        Equals<
          typeof result,
          {
            userName: string;
            orderId: number | null;
            orderAmount: string | null;
          }[]
        >
      >();

      expect(result).toHaveLength(3);
      expect(result).toEqual([
        { userName: "Alice", orderId: 101, orderAmount: "100.00" },
        { userName: "Bob", orderId: 102, orderAmount: "200.00" },
        { userName: "Charlie", orderId: null, orderAmount: null },
      ]);
    });
  });

  describe("FULL OUTER JOIN", () => {
    it("returns all rows from both tables with nulls for unmatched", async () => {
      const table1 = values(
        { id: Int4.new(1), value: Text.new("A") },
        { id: Int4.new(2), value: Text.new("B") },
        { id: Int4.new(3), value: Text.new("C") },
      );

      const table2 = values(
        { id: Int4.new(2), data: Text.new("X") },
        { id: Int4.new(3), data: Text.new("Y") },
        { id: Int4.new(4), data: Text.new("Z") },
      );

      const joined = table1.fullOuterJoin(table2, "t2", (t1, { t2 }) =>
        t1.id["="](t2.id),
      );

      const result = await select(
        (t1, { t2 }) => ({
          id1: t1.id,
          value: t1.value,
          id2: t2.id,
          data: t2.data,
        }),
        {
          from: joined,
          orderBy: [(t1) => t1.id, { nulls: "last" }],
        },
      ).execute(testDb);

      assert<
        Equals<
          typeof result,
          {
            id1: number | null;
            value: string | null;
            id2: number | null;
            data: string | null;
          }[]
        >
      >();

      expect(result).toEqual([
        { id1: 1, value: "A", id2: null, data: null },
        { id1: 2, value: "B", id2: 2, data: "X" },
        { id1: 3, value: "C", id2: 3, data: "Y" },
        { id1: null, value: null, id2: 4, data: "Z" },
      ]);
    });
  });

  describe("Complex join scenarios", () => {
    it("can mix inner and outer joins", async () => {
      const users = values(
        { id: Int4.new(1), name: Text.new("Alice") },
        { id: Int4.new(2), name: Text.new("Bob") },
      );

      const orders = values(
        { id: Int4.new(101), userId: Int4.new(1), productId: Int4.new(1) },
        { id: Int4.new(102), userId: Int4.new(2), productId: Int4.new(2) },
      );

      const products = values(
        { id: Int4.new(1), name: Text.new("Widget") },
        { id: Int4.new(2), name: Text.new("Gadget") },
      );

      const joinedTables = users
        .join(orders, "o", (u, { o }) => u.id["="](o.userId))
        .leftJoin(products, "p", (_, { o, p }) => o.productId["="](p.id));

      const result = await select(
        (u, { o, p }) => ({
          userName: u.name,
          orderId: o.id,
          productName: p.name,
        }),
        {
          from: joinedTables,
          orderBy: (u) => u.id,
        },
      ).execute(testDb);

      assert<
        Equals<
          typeof result,
          {
            userName: string;
            orderId: number;
            productName: string | null;
          }[]
        >
      >();

      expect(result).toEqual([
        { userName: "Alice", orderId: 101, productName: "Widget" },
        { userName: "Bob", orderId: 102, productName: "Gadget" },
      ]);
    });

    it("can aggregate over left joined data", async () => {
      const categories = values(
        { id: Int4.new(1), name: Text.new("Electronics") },
        { id: Int4.new(2), name: Text.new("Books") },
        { id: Int4.new(3), name: Text.new("Clothing") },
      );

      const products = values(
        {
          id: Int4.new(1),
          categoryId: Int4.new(1),
          price: Numeric.new("100.00"),
        },
        {
          id: Int4.new(2),
          categoryId: Int4.new(1),
          price: Numeric.new("200.00"),
        },
        {
          id: Int4.new(3),
          categoryId: Int4.new(2),
          price: Numeric.new("15.00"),
        },
      );

      const categoriesWithProducts = categories.leftJoin(
        products,
        "p",
        (c, { p }) => c.id["="](p.categoryId),
      );

      const result = await select(
        (c, { p }) => ({
          categoryId: c.id,
          categoryName: c.name,
          productCount: p.id.count(),
        }),
        {
          from: categoriesWithProducts,
          groupBy: (c) => [c.id, c.name],
          orderBy: (c) => c.id,
        },
      ).execute(testDb);

      assert<
        Equals<
          typeof result,
          {
            categoryId: number;
            categoryName: string;
            productCount: bigint;
          }[]
        >
      >();

      expect(result).toEqual([
        { categoryId: 1, categoryName: "Electronics", productCount: 2n },
        { categoryId: 2, categoryName: "Books", productCount: 1n },
        { categoryId: 3, categoryName: "Clothing", productCount: 0n },
      ]);
    });

    it("can handle nullable columns in select", async () => {
      const users = values(
        { id: Int4.new(1), name: Text.new("Alice") },
        { id: Int4.new(2), name: Text.new("Bob") },
      );

      const preferences = values({
        userId: Int4.new(1),
        theme: Text.new("custom"),
      });

      const usersWithPrefs = users.leftJoin(preferences, "p", (u, { p }) =>
        u.id["="](p.userId),
      );

      const result = await select(
        (u, { p }) => ({
          name: u.name,
          theme: p.theme,
          hasPreference: p.userId.isNotNull(),
        }),
        {
          from: usersWithPrefs,
          orderBy: (u) => u.id,
        },
      ).execute(testDb);

      assert<
        Equals<
          typeof result,
          {
            name: string;
            theme: string | null;
            hasPreference: boolean;
          }[]
        >
      >();

      expect(result).toEqual([
        { name: "Alice", theme: "custom", hasPreference: true },
        { name: "Bob", theme: null, hasPreference: false },
      ]);
    });
  });
});
