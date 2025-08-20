import { describe, expect, it } from "vitest";
import { values } from "./values";
import { Int4, Text, Numeric } from "../types";
import { testDb } from "../db.test";
import { assert, Equals } from "tsafe";
import { select } from "../grammar";

describe("Window Functions", () => {
  it("can use aggregate functions with OVER()", async () => {
    const sales = values(
      {
        department: Text.new("Sales"),
        employee: Text.new("Alice"),
        amount: Numeric.new("1000"),
      },
      {
        department: Text.new("Sales"),
        employee: Text.new("Bob"),
        amount: Numeric.new("1500"),
      },
      {
        department: Text.new("Marketing"),
        employee: Text.new("Charlie"),
        amount: Numeric.new("800"),
      },
      {
        department: Text.new("Marketing"),
        employee: Text.new("David"),
        amount: Numeric.new("1200"),
      },
    );

    const result = await select(
      (s) => ({
        department: s.department,
        employee: s.employee,
        amount: s.amount,
        totalSales: s.amount.sum().over(),
      }),
      {
        from: sales,
        orderBy: (s) => s.department,
      },
    ).execute(testDb);

    assert<
      Equals<
        typeof result,
        {
          department: string;
          employee: string;
          amount: string;
          totalSales: string | null;
        }[]
      >
    >();

    expect(result).toHaveLength(4);
    expect(result).toEqual([
      {
        department: "Marketing",
        employee: "Charlie",
        amount: "800",
        totalSales: "4500",
      },
      {
        department: "Marketing",
        employee: "David",
        amount: "1200",
        totalSales: "4500",
      },
      {
        department: "Sales",
        employee: "Alice",
        amount: "1000",
        totalSales: "4500",
      },
      {
        department: "Sales",
        employee: "Bob",
        amount: "1500",
        totalSales: "4500",
      },
    ]);
  });

  it("can use OVER with PARTITION BY", async () => {
    const sales = values(
      {
        department: Text.new("Sales"),
        employee: Text.new("Alice"),
        amount: Numeric.new("1000"),
      },
      {
        department: Text.new("Sales"),
        employee: Text.new("Bob"),
        amount: Numeric.new("1500"),
      },
      {
        department: Text.new("Marketing"),
        employee: Text.new("Charlie"),
        amount: Numeric.new("800"),
      },
      {
        department: Text.new("Marketing"),
        employee: Text.new("David"),
        amount: Numeric.new("1200"),
      },
    );

    const result = await select(
      (s) => ({
        department: s.department,
        employee: s.employee,
        amount: s.amount,
        deptTotal: s.amount.sum().over({ partitionBy: s.department }),
        deptAvg: s.amount.avg().over({ partitionBy: s.department }),
      }),
      {
        from: sales,
        orderBy: (s) => s.department,
      },
    ).execute(testDb);

    expect(result).toEqual([
      {
        department: "Marketing",
        employee: "Charlie",
        amount: "800",
        deptTotal: "2000",
        deptAvg: "1000.0000000000000000",
      },
      {
        department: "Marketing",
        employee: "David",
        amount: "1200",
        deptTotal: "2000",
        deptAvg: "1000.0000000000000000",
      },
      {
        department: "Sales",
        employee: "Alice",
        amount: "1000",
        deptTotal: "2500",
        deptAvg: "1250.0000000000000000",
      },
      {
        department: "Sales",
        employee: "Bob",
        amount: "1500",
        deptTotal: "2500",
        deptAvg: "1250.0000000000000000",
      },
    ]);
  });

  it("can use OVER with ORDER BY", async () => {
    const transactions = values(
      { date: Text.new("2024-01-01"), amount: Int4.new(100) },
      { date: Text.new("2024-01-02"), amount: Int4.new(200) },
      { date: Text.new("2024-01-03"), amount: Int4.new(150) },
      { date: Text.new("2024-01-04"), amount: Int4.new(300) },
    );

    const result = await select(
      (t) => ({
        date: t.date,
        amount: t.amount,
        runningTotal: t.amount.sum().over({ orderBy: t.date }) as any,
      }),
      {
        from: transactions,
        orderBy: (t) => t.date,
      },
    ).execute(testDb);

    expect(result).toEqual([
      { date: "2024-01-01", amount: 100, runningTotal: 100n },
      { date: "2024-01-02", amount: 200, runningTotal: 300n },
      { date: "2024-01-03", amount: 150, runningTotal: 450n },
      { date: "2024-01-04", amount: 300, runningTotal: 750n },
    ]);
  });

  it("can use OVER with both PARTITION BY and ORDER BY", async () => {
    const sales = values(
      {
        department: Text.new("Sales"),
        month: Int4.new(1),
        amount: Numeric.new("1000"),
      },
      {
        department: Text.new("Sales"),
        month: Int4.new(2),
        amount: Numeric.new("1500"),
      },
      {
        department: Text.new("Sales"),
        month: Int4.new(3),
        amount: Numeric.new("1200"),
      },
      {
        department: Text.new("Marketing"),
        month: Int4.new(1),
        amount: Numeric.new("800"),
      },
      {
        department: Text.new("Marketing"),
        month: Int4.new(2),
        amount: Numeric.new("900"),
      },
      {
        department: Text.new("Marketing"),
        month: Int4.new(3),
        amount: Numeric.new("1100"),
      },
    );

    const result = await select(
      (s) => ({
        department: s.department,
        month: s.month,
        amount: s.amount,
        runningDeptTotal: s.amount.sum().over({
          partitionBy: s.department,
          orderBy: s.month,
        }),
      }),
      {
        from: sales,
        orderBy: (s) => s.department,
      },
    ).execute(testDb);

    expect(result).toEqual([
      {
        department: "Marketing",
        month: 1,
        amount: "800",
        runningDeptTotal: "800",
      },
      {
        department: "Marketing",
        month: 2,
        amount: "900",
        runningDeptTotal: "1700",
      },
      {
        department: "Marketing",
        month: 3,
        amount: "1100",
        runningDeptTotal: "2800",
      },
      {
        department: "Sales",
        month: 1,
        amount: "1000",
        runningDeptTotal: "1000",
      },
      {
        department: "Sales",
        month: 2,
        amount: "1500",
        runningDeptTotal: "2500",
      },
      {
        department: "Sales",
        month: 3,
        amount: "1200",
        runningDeptTotal: "3700",
      },
    ]);
  });

  it("can use multiple window functions in same query", async () => {
    const scores = values(
      {
        student: Text.new("Alice"),
        subject: Text.new("Math"),
        score: Int4.new(85),
      },
      {
        student: Text.new("Alice"),
        subject: Text.new("Science"),
        score: Int4.new(92),
      },
      {
        student: Text.new("Bob"),
        subject: Text.new("Math"),
        score: Int4.new(78),
      },
      {
        student: Text.new("Bob"),
        subject: Text.new("Science"),
        score: Int4.new(88),
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
    );

    const result = await select(
      (s) => ({
        student: s.student,
        subject: s.subject,
        score: s.score,
        studentAvg: s.score.avg().over({ partitionBy: s.student }),
        subjectAvg: s.score.avg().over({ partitionBy: s.subject }),
        overallAvg: s.score.avg().over(),
      }),
      {
        from: scores,
        orderBy: (s) => s.student,
      },
    ).execute(testDb);

    expect(result[0].student).toBe("Alice");
    expect(result[0].subject).toBe("Math");
    expect(result[0].score).toBe(85);
    expect(parseFloat(result[0].studentAvg!)).toBeCloseTo(88.5, 1);
    expect(parseFloat(result[0].subjectAvg!)).toBeCloseTo(86, 1);
    expect(parseFloat(result[0].overallAvg!)).toBeCloseTo(88, 1);
  });

  it("can use ORDER BY with DESC", async () => {
    const sales = values(
      { month: Int4.new(1), amount: Numeric.new("1000") },
      { month: Int4.new(2), amount: Numeric.new("1500") },
      { month: Int4.new(3), amount: Numeric.new("800") },
      { month: Int4.new(4), amount: Numeric.new("2000") },
    );

    const result = await select(
      (s) => ({
        month: s.month,
        amount: s.amount,
        reverseRunningTotal: s.amount.sum().over({
          orderBy: [s.month, "desc"],
        }),
      }),
      {
        from: sales,
        orderBy: (s) => s.month,
      },
    ).execute(testDb);

    expect(result).toEqual([
      { month: 1, amount: "1000", reverseRunningTotal: "5300" },
      { month: 2, amount: "1500", reverseRunningTotal: "4300" },
      { month: 3, amount: "800", reverseRunningTotal: "2800" },
      { month: 4, amount: "2000", reverseRunningTotal: "2000" },
    ]);
  });

  it("can use count with window functions", async () => {
    const orders = values(
      { customer: Text.new("Alice"), product: Text.new("Widget") },
      { customer: Text.new("Alice"), product: Text.new("Gadget") },
      { customer: Text.new("Alice"), product: Text.new("Doohickey") },
      { customer: Text.new("Bob"), product: Text.new("Widget") },
      { customer: Text.new("Bob"), product: Text.new("Gadget") },
    );

    const result = await select(
      (o) => ({
        customer: o.customer,
        product: o.product,
        customerOrderCount: o.customer.count().over({ partitionBy: o.customer }),
        totalOrderCount: o.customer.count().over(),
      }),
      {
        from: orders,
        orderBy: [(o) => o.customer, (o) => o.product],
      },
    ).execute(testDb);

    expect(result).toEqual([
      {
        customer: "Alice",
        product: "Doohickey",
        customerOrderCount: 3n,
        totalOrderCount: 5n,
      },
      {
        customer: "Alice",
        product: "Gadget",
        customerOrderCount: 3n,
        totalOrderCount: 5n,
      },
      {
        customer: "Alice",
        product: "Widget",
        customerOrderCount: 3n,
        totalOrderCount: 5n,
      },
      {
        customer: "Bob",
        product: "Gadget",
        customerOrderCount: 2n,
        totalOrderCount: 5n,
      },
      {
        customer: "Bob",
        product: "Widget",
        customerOrderCount: 2n,
        totalOrderCount: 5n,
      },
    ]);
  });

  it("can use ORDER BY with nulls first/last", async () => {
    const scores = values(
      { student: Text.new("Alice"), score: Int4.new(85) },
      { student: Text.new("Bob"), score: Int4.new(null) },
      { student: Text.new("Charlie"), score: Int4.new(92) },
      { student: Text.new("David"), score: Int4.new(null) },
      { student: Text.new("Eve"), score: Int4.new(78) },
    );

    const result = await select(
      (s) => ({
        student: s.student,
        score: s.score,
        rankWithNullsLast: s.student.count().over({
          orderBy: [s.score, "desc nulls last"],
        }),
        rankWithNullsFirst: s.student.count().over({
          orderBy: [s.score, "desc nulls first"],
        }),
      }),
      {
        from: scores,
        orderBy: (s) => s.student,
      },
    ).execute(testDb);

    // With nulls last, NULL values should come after all non-NULL values
    const nullsLast = result.filter((r) => r.score === null);
    const nonNullsLast = result.filter((r) => r.score !== null);

    expect(nullsLast.every((r) => r.rankWithNullsLast === 5n)).toBe(true);
    expect(nonNullsLast.every((r) => r.rankWithNullsLast! < 5n)).toBe(true);

    // With nulls first, NULL values should come before all non-NULL values
    expect(nullsLast.every((r) => r.rankWithNullsFirst! <= 2n)).toBe(true);
    expect(nonNullsLast.every((r) => r.rankWithNullsFirst! > 2n)).toBe(true);
  });
});
