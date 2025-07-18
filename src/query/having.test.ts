import { describe, expect, it } from "vitest";
import { values } from "./values";
import { Int4, Text, Numeric } from "../types";
import { testDb } from "../db.test";
import { assert, Equals } from "tsafe";

describe("HAVING clause", () => {
  it("can filter grouped results with HAVING", async () => {
    const orders = values(
      { customer: Text.new("Alice"), amount: Numeric.new("100") },
      { customer: Text.new("Alice"), amount: Numeric.new("200") },
      { customer: Text.new("Bob"), amount: Numeric.new("50") },
      { customer: Text.new("Bob"), amount: Numeric.new("75") },
      { customer: Text.new("Charlie"), amount: Numeric.new("300") },
      { customer: Text.new("Charlie"), amount: Numeric.new("400") },
    );

    const result = await orders
      .groupBy((o) => [o.customer])
      .having((agg) => agg.amount.sum()[">="]("300"))
      .select((agg, [customer]) => ({
        customer,
        totalAmount: agg.amount.sum(),
      }))
      .execute(testDb);

    assert<
      Equals<typeof result, { customer: string; totalAmount: string | null }[]>
    >();

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        { customer: "Alice", totalAmount: "300" },
        { customer: "Charlie", totalAmount: "700" },
      ]),
    );
  });

  it("can use aggregate functions in HAVING", async () => {
    const sales = values(
      {
        product: Text.new("Widget"),
        quantity: Int4.new(10),
        price: Numeric.new("5.00"),
      },
      {
        product: Text.new("Widget"),
        quantity: Int4.new(20),
        price: Numeric.new("5.00"),
      },
      {
        product: Text.new("Gadget"),
        quantity: Int4.new(5),
        price: Numeric.new("10.00"),
      },
      {
        product: Text.new("Gadget"),
        quantity: Int4.new(8),
        price: Numeric.new("10.00"),
      },
      {
        product: Text.new("Tool"),
        quantity: Int4.new(15),
        price: Numeric.new("20.00"),
      },
    );

    const result = await sales
      .groupBy((s) => [s.product, s.price])
      .having((agg) => agg.quantity.count()[">="](2))
      .select((agg, [product, price]) => ({
        product,
        price,
        totalQuantity: agg.quantity.sum(),
        salesCount: agg.quantity.count(),
      }))
      .execute(testDb);

    assert<
      Equals<
        typeof result,
        {
          product: string;
          price: string;
          totalQuantity: bigint | null;
          salesCount: bigint;
        }[]
      >
    >();

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          product: "Widget",
          price: "5.00",
          totalQuantity: 30n,
          salesCount: 2n,
        },
        {
          product: "Gadget",
          price: "10.00",
          totalQuantity: 13n,
          salesCount: 2n,
        },
      ]),
    );
  });

  it("can chain multiple HAVING conditions", async () => {
    const transactions = values(
      { userId: Int4.new(1), amount: Numeric.new("100") },
      { userId: Int4.new(1), amount: Numeric.new("200") },
      { userId: Int4.new(1), amount: Numeric.new("300") },
      { userId: Int4.new(2), amount: Numeric.new("50") },
      { userId: Int4.new(2), amount: Numeric.new("150") },
      { userId: Int4.new(3), amount: Numeric.new("1000") },
    );

    const result = await transactions
      .groupBy((t) => [t.userId])
      .having((agg) => agg.amount.sum()[">="]("200"))
      .having((agg) => agg.amount.count()[">"](1))
      .select((agg, [userId]) => ({
        userId,
        totalAmount: agg.amount.sum(),
        transactionCount: agg.amount.count(),
      }))
      .execute(testDb);

    assert<
      Equals<
        typeof result,
        {
          userId: number;
          totalAmount: string | null;
          transactionCount: bigint;
        }[]
      >
    >();

    expect(result).toEqual([
      { userId: 1, totalAmount: "600", transactionCount: 3n },
      { userId: 2, totalAmount: "200", transactionCount: 2n },
    ]);
  });

  it("can use HAVING with WHERE clause", async () => {
    const products = values(
      {
        category: Text.new("Electronics"),
        product: Text.new("Phone"),
        sales: Int4.new(100),
      },
      {
        category: Text.new("Electronics"),
        product: Text.new("Laptop"),
        sales: Int4.new(50),
      },
      {
        category: Text.new("Electronics"),
        product: Text.new("Tablet"),
        sales: Int4.new(75),
      },
      {
        category: Text.new("Clothing"),
        product: Text.new("Shirt"),
        sales: Int4.new(200),
      },
      {
        category: Text.new("Clothing"),
        product: Text.new("Pants"),
        sales: Int4.new(150),
      },
      {
        category: Text.new("Food"),
        product: Text.new("Apple"),
        sales: Int4.new(500),
      },
      {
        category: Text.new("Food"),
        product: Text.new("Banana"),
        sales: Int4.new(300),
      },
    );

    const result = await products
      .where((p) => p.category["<>"]("Food"))
      .groupBy((p) => [p.category])
      .having((agg) => agg.sales.sum()[">"](200))
      .select((agg, [category]) => ({
        category,
        totalSales: agg.sales.sum(),
      }))
      .execute(testDb);

    assert<
      Equals<typeof result, { category: string; totalSales: bigint | null }[]>
    >();

    expect(result).toEqual([
      { category: "Electronics", totalSales: 225n },
      { category: "Clothing", totalSales: 350n },
    ]);
  });

  it("can use HAVING with complex aggregate expressions", async () => {
    const scores = values(
      {
        student: Text.new("Alice"),
        subject: Text.new("Math"),
        score: Int4.new(90),
      },
      {
        student: Text.new("Alice"),
        subject: Text.new("Science"),
        score: Int4.new(85),
      },
      {
        student: Text.new("Alice"),
        subject: Text.new("English"),
        score: Int4.new(95),
      },
      {
        student: Text.new("Bob"),
        subject: Text.new("Math"),
        score: Int4.new(75),
      },
      {
        student: Text.new("Bob"),
        subject: Text.new("Science"),
        score: Int4.new(80),
      },
      {
        student: Text.new("Bob"),
        subject: Text.new("English"),
        score: Int4.new(70),
      },
      {
        student: Text.new("Charlie"),
        subject: Text.new("Math"),
        score: Int4.new(95),
      },
      {
        student: Text.new("Charlie"),
        subject: Text.new("Science"),
        score: Int4.new(90),
      },
      {
        student: Text.new("Charlie"),
        subject: Text.new("English"),
        score: Int4.new(92),
      },
    );

    const result = await scores
      .groupBy((s) => [s.student])
      .having((agg) =>
        agg.score
          .avg()
          [">="]("85")
          .and(agg.score.count()[">="](3)),
      )
      .select((agg, [student]) => ({
        student,
        avgScore: agg.score.avg().float8(),
        subjectCount: agg.score.count(),
      }))
      .execute(testDb);

    assert<
      Equals<
        typeof result,
        {
          student: string;
          avgScore: number | null;
          subjectCount: bigint;
        }[]
      >
    >();

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        { student: "Alice", avgScore: 90, subjectCount: 3n },
        { student: "Charlie", avgScore: 92.33333333333333, subjectCount: 3n },
      ]),
    );
  });

  it("can use HAVING with boolean literal", async () => {
    const data = values(
      { group: Text.new("A"), value: Int4.new(10) },
      { group: Text.new("A"), value: Int4.new(20) },
      { group: Text.new("B"), value: Int4.new(30) },
    );

    const result = await data
      .groupBy((d) => [d.group])
      .having(() => true)
      .select((agg, [group]) => ({
        group,
        sum: agg.value.sum(),
      }))
      .execute(testDb);

    assert<Equals<typeof result, { group: string; sum: bigint | null }[]>>();

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        { group: "A", sum: 30n },
        { group: "B", sum: 30n },
      ]),
    );
  });

  it("requires groupBy before using having", async () => {
    const data = values(
      { group: Text.new("A"), value: Int4.new(10) },
      { group: Text.new("B"), value: Int4.new(20) },
    );

    // This should be a compile-time error
    // @ts-expect-error Cannot use having without groupBy
    data.having((agg) => agg.value.sum()[">"](10));
  });

  it("can reference grouped columns in HAVING", async () => {
    const sales = values(
      {
        region: Text.new("North"),
        salesperson: Text.new("Alice"),
        amount: Numeric.new("1000"),
      },
      {
        region: Text.new("North"),
        salesperson: Text.new("Bob"),
        amount: Numeric.new("1500"),
      },
      {
        region: Text.new("South"),
        salesperson: Text.new("Charlie"),
        amount: Numeric.new("800"),
      },
      {
        region: Text.new("South"),
        salesperson: Text.new("David"),
        amount: Numeric.new("1200"),
      },
    );

    const result = await sales
      .groupBy((s) => [s.region, s.salesperson])
      .having((agg, [_, salesperson]) =>
        salesperson["<>"]("Charlie").and(
          agg.amount.sum()[">="]("1000"),
        ),
      )
      .select((agg, [region, salesperson]) => ({
        region,
        salesperson,
        totalAmount: agg.amount.sum(),
      }))
      .execute(testDb);

    assert<
      Equals<
        typeof result,
        {
          region: string;
          salesperson: string;
          totalAmount: string | null;
        }[]
      >
    >();

    expect(result).toHaveLength(3);
    expect(result).toEqual(
      expect.arrayContaining([
        { region: "North", salesperson: "Alice", totalAmount: "1000" },
        { region: "North", salesperson: "Bob", totalAmount: "1500" },
        { region: "South", salesperson: "David", totalAmount: "1200" },
      ]),
    );
  });
});
