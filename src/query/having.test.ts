import { describe, expect, it } from "vitest";
import { values } from "./values";
import { Int4, Text, Numeric, Bool } from "../types";
import { testDb } from "../db.test";
import { assert, Equals } from "tsafe";
import { select } from "../grammar/generated/select";

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

    const result = await select(
      (o) => ({
        customer: o.customer,
        totalAmount: o.amount.sum(),
      }),
      {
        from: orders,
        groupBy: (o) => [o.customer],
        having: (o) => o.amount.sum()[">="](Numeric.new("300")),
      },
    ).execute(testDb);

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

    const result = await select(
      (s) => ({
        product: s.product,
        price: s.price,
        totalQuantity: s.quantity.sum(),
        salesCount: s.quantity.count(),
      }),
      {
        from: sales,
        groupBy: (s) => [s.product, s.price],
        having: (s) => s.quantity.count()[">="](Int4.new(2)),
      },
    ).execute(testDb);

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

    const result = await select(
      (t) => ({
        userId: t.userId,
        totalAmount: t.amount.sum(),
        transactionCount: t.amount.count(),
      }),
      {
        from: transactions,
        groupBy: (t) => [t.userId],
        having: (t) =>
          t.amount
            .sum()
            [">="](Numeric.new("200"))
            ["and"](t.amount.count()[">"](Int4.new(1))),
      },
    ).execute(testDb);

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

    const result = await select(
      (p) => ({
        category: p.category,
        totalSales: p.sales.sum(),
      }),
      {
        from: products,
        where: (p) => p.category["<>"](Text.new("Food")),
        groupBy: (p) => [p.category],
        having: (p) => p.sales.sum()[">"](Int4.new(200)),
      },
    ).execute(testDb);

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

    const result = await select(
      (s) => ({
        student: s.student,
        avgScore: s.score.avg().float8(),
        subjectCount: s.score.count(),
      }),
      {
        from: scores,
        groupBy: (s) => [s.student],
        having: (s) =>
          s.score
            .avg()
            [">="](Numeric.new("85"))
            ["and"](s.score.count()[">="](Int4.new(3))),
      },
    ).execute(testDb);

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

    const result = await select(
      (d) => ({
        group: d.group,
        sum: d.value.sum(),
      }),
      {
        from: data,
        groupBy: (d) => [d.group],
        having: () => Bool.new(true),
      },
    ).execute(testDb);

    assert<Equals<typeof result, { group: string; sum: bigint | null }[]>>();

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        { group: "A", sum: 30n },
        { group: "B", sum: 30n },
      ]),
    );
  });
});
