import { describe, it, expect } from "vitest";
import * as Types from "./index";
import { values } from "../query/values";
import { testDb } from "../db.test";
import { assert, Equals } from "tsafe";
import { caseWhen } from "../sql-case";
import { select } from "../grammar";

describe("Keyword operators", () => {
  describe("isNull and isNotNull", () => {
    it("should work with isNull", async () => {
      const data = values(
        { name: Types.Text.new("John"), age: Types.Int4.new(null) },
        { name: Types.Text.new(null), age: Types.Int4.new(25) },
      );

      const result = await select(
        (row) => ({
          nameIsNull: row.name.isNull(),
          ageIsNull: row.age.isNull(),
        }),
        {
          from: data,
        },
      ).execute(testDb);

      assert<Equals<typeof result, { nameIsNull: boolean; ageIsNull: boolean }[]>>();

      expect(result).toEqual([
        { nameIsNull: false, ageIsNull: true },
        { nameIsNull: true, ageIsNull: false },
      ]);
    });

    it("should have correct types for isNull/isNotNull", () => {
      const text1 = Types.Text.new("hello");
      const text0 = Types.Text.new(null);
      const textMaybe: Types.Text<0 | 1> = Types.Text.new("hello");

      const isNull1 = text1.isNull();
      const isNull0 = text0.isNull();
      const isNullMaybe = textMaybe.isNull();

      // isNull always returns Bool<1> (non-null boolean)
      assert<Equals<typeof isNull1, Types.Bool<1>>>();
      assert<Equals<typeof isNull0, Types.Bool<1>>>();
      assert<Equals<typeof isNullMaybe, Types.Bool<1>>>();

      const isNotNull1 = text1.isNotNull();
      const isNotNull0 = text0.isNotNull();
      const isNotNullMaybe = textMaybe.isNotNull();

      // isNotNull always returns Bool<1> (non-null boolean)
      assert<Equals<typeof isNotNull1, Types.Bool<1>>>();
      assert<Equals<typeof isNotNull0, Types.Bool<1>>>();
      assert<Equals<typeof isNotNullMaybe, Types.Bool<1>>>();
    });

    it("should work with isNotNull", async () => {
      const data = values(
        { name: Types.Text.new("John"), age: Types.Int4.new(null) },
        { name: Types.Text.new(null), age: Types.Int4.new(25) },
      );

      const result = await select(
        (row) => ({
          nameIsNotNull: row.name.isNotNull(),
          ageIsNotNull: row.age.isNotNull(),
        }),
        { from: data },
      ).execute(testDb);

      expect(result).toEqual([
        { nameIsNotNull: true, ageIsNotNull: false },
        { nameIsNotNull: false, ageIsNotNull: true },
      ]);
    });
  });

  describe("Bool operators", () => {
    it("should have correct types for boolean operators", () => {
      const bool1 = Types.Bool.new(true);
      const bool0 = Types.Bool.new(null);
      const boolMaybe: Types.Bool<0 | 1> = Types.Bool.new(true);

      // AND operator
      const and11 = bool1.and(bool1);
      const and10 = bool1.and(bool0);
      const and01 = bool0.and(bool1);
      const and00 = bool0.and(bool0);
      const andMaybe = boolMaybe.and(boolMaybe);

      assert<Equals<typeof and11, Types.Bool<1>>>();
      assert<Equals<typeof and10, Types.Bool<0 | 1>>>();
      assert<Equals<typeof and01, Types.Bool<0 | 1>>>();
      assert<Equals<typeof and00, Types.Bool<0>>>();
      assert<Equals<typeof andMaybe, Types.Bool<0 | 1>>>();

      // OR operator
      const or11 = bool1.or(bool1);
      const or10 = bool1.or(bool0);
      const or01 = bool0.or(bool1);
      const or00 = bool0.or(bool0);
      const orMaybe = boolMaybe.or(boolMaybe);

      assert<Equals<typeof or11, Types.Bool<1>>>();
      assert<Equals<typeof or10, Types.Bool<0 | 1>>>();
      assert<Equals<typeof or01, Types.Bool<0 | 1>>>();
      assert<Equals<typeof or00, Types.Bool<0>>>();
      assert<Equals<typeof orMaybe, Types.Bool<0 | 1>>>();

      // NOT operator
      const not1 = bool1.not();
      const not0 = bool0.not();
      const notMaybe = boolMaybe.not();

      assert<Equals<typeof not1, Types.Bool<1>>>();
      assert<Equals<typeof not0, Types.Bool<0>>>();
      assert<Equals<typeof notMaybe, Types.Bool<0 | 1>>>();
    });

    // PostgreSQL three-valued logic reference:
    // https://www.postgresql.org/docs/current/functions-logical.html
    it("should follow PostgreSQL three-valued logic for AND", async () => {
      const data = values(
        // All 9 combinations of true/false/null
        { a: Types.Bool.new(true), b: Types.Bool.new(true) },
        { a: Types.Bool.new(true), b: Types.Bool.new(false) },
        { a: Types.Bool.new(true), b: Types.Bool.new(null) },
        { a: Types.Bool.new(false), b: Types.Bool.new(true) },
        { a: Types.Bool.new(false), b: Types.Bool.new(false) },
        { a: Types.Bool.new(false), b: Types.Bool.new(null) },
        { a: Types.Bool.new(null), b: Types.Bool.new(true) },
        { a: Types.Bool.new(null), b: Types.Bool.new(false) },
        { a: Types.Bool.new(null), b: Types.Bool.new(null) },
      );

      const result = await select(
        (row) => ({
          a: row.a,
          b: row.b,
          result: row.a.and(row.b),
        }),
        { from: data },
      ).execute(testDb);

      // AND truth table:
      // true AND true = true
      // true AND false = false
      // true AND null = null
      // false AND true = false
      // false AND false = false
      // false AND null = false
      // null AND true = null
      // null AND false = false
      // null AND null = null
      expect(result).toEqual([
        { a: true, b: true, result: true },
        { a: true, b: false, result: false },
        { a: true, b: null, result: null },
        { a: false, b: true, result: false },
        { a: false, b: false, result: false },
        { a: false, b: null, result: false },
        { a: null, b: true, result: null },
        { a: null, b: false, result: false },
        { a: null, b: null, result: null },
      ]);
    });

    it("should follow PostgreSQL three-valued logic for OR", async () => {
      const data = values(
        // All 9 combinations of true/false/null
        { a: Types.Bool.new(true), b: Types.Bool.new(true) },
        { a: Types.Bool.new(true), b: Types.Bool.new(false) },
        { a: Types.Bool.new(true), b: Types.Bool.new(null) },
        { a: Types.Bool.new(false), b: Types.Bool.new(true) },
        { a: Types.Bool.new(false), b: Types.Bool.new(false) },
        { a: Types.Bool.new(false), b: Types.Bool.new(null) },
        { a: Types.Bool.new(null), b: Types.Bool.new(true) },
        { a: Types.Bool.new(null), b: Types.Bool.new(false) },
        { a: Types.Bool.new(null), b: Types.Bool.new(null) },
      );

      const result = await select(
        (row) => ({
          a: row.a,
          b: row.b,
          result: row.a.or(row.b),
        }),
        { from: data },
      ).execute(testDb);

      // OR truth table:
      // true OR true = true
      // true OR false = true
      // true OR null = true
      // false OR true = true
      // false OR false = false
      // false OR null = null
      // null OR true = true
      // null OR false = null
      // null OR null = null
      expect(result).toEqual([
        { a: true, b: true, result: true },
        { a: true, b: false, result: true },
        { a: true, b: null, result: true },
        { a: false, b: true, result: true },
        { a: false, b: false, result: false },
        { a: false, b: null, result: null },
        { a: null, b: true, result: true },
        { a: null, b: false, result: null },
        { a: null, b: null, result: null },
      ]);
    });

    it("should follow PostgreSQL three-valued logic for NOT", async () => {
      const data = values({ a: Types.Bool.new(true) }, { a: Types.Bool.new(false) }, { a: Types.Bool.new(null) });

      const result = await select(
        (row) => ({
          a: row.a,
          result: row.a.not(),
        }),
        { from: data },
      ).execute(testDb);

      // NOT truth table:
      // NOT true = false
      // NOT false = true
      // NOT null = null
      expect(result).toEqual([
        { a: true, result: false },
        { a: false, result: true },
        { a: null, result: null },
      ]);
    });
  });

  describe("Text pattern matching", () => {
    it("should have correct types for pattern matching operators", () => {
      const text1 = Types.Text.new("hello");
      const text0 = Types.Text.new(null);
      const textMaybe: Types.Text<0 | 1> = Types.Text.new("hello");
      const pattern = Types.Text.new("%ell%");

      // like operator
      const like1 = text1.like(pattern);
      const like0 = text0.like(pattern);
      const likeMaybe = textMaybe.like(pattern);

      // Type depends on nullability of operands
      assert<Equals<typeof like1, Types.Bool<1>>>(); // both non-null
      assert<Equals<typeof like0, Types.Bool<0 | 1>>>(); // text is null
      assert<Equals<typeof likeMaybe, Types.Bool<0 | 1>>>(); // text might be null

      // ilike operator
      const ilike1 = text1.ilike(pattern);
      const ilike0 = text0.ilike(pattern);
      const ilikeMaybe = textMaybe.ilike(pattern);

      assert<Equals<typeof ilike1, Types.Bool<1>>>(); // both non-null
      assert<Equals<typeof ilike0, Types.Bool<0 | 1>>>();
      assert<Equals<typeof ilikeMaybe, Types.Bool<0 | 1>>>();

      // notLike operator
      const notLike1 = text1.notlike(pattern);
      const notLike0 = text0.notlike(pattern);
      const notLikeMaybe = textMaybe.notlike(pattern);

      assert<Equals<typeof notLike1, Types.Bool<1>>>(); // both non-null
      assert<Equals<typeof notLike0, Types.Bool<0 | 1>>>();
      assert<Equals<typeof notLikeMaybe, Types.Bool<0 | 1>>>();

      // notIlike operator
      const notIlike1 = text1.notilike(pattern);
      const notIlike0 = text0.notilike(pattern);
      const notIlikeMaybe = textMaybe.notilike(pattern);

      assert<Equals<typeof notIlike1, Types.Bool<1>>>(); // both non-null
      assert<Equals<typeof notIlike0, Types.Bool<0 | 1>>>();
      assert<Equals<typeof notIlikeMaybe, Types.Bool<0 | 1>>>();
    });

    it("should work with like", async () => {
      const data = values(
        { name: Types.Text.new("John Smith") },
        { name: Types.Text.new("Jane Doe") },
        { name: Types.Text.new("Bob Johnson") },
      );

      const result = await select(
        (row) => ({
          name: row.name,
          hasJohn: row.name.like("%John%"),
        }),
        { from: data },
      ).execute(testDb);

      expect(result).toEqual([
        { name: "John Smith", hasJohn: true },
        { name: "Jane Doe", hasJohn: false },
        { name: "Bob Johnson", hasJohn: true },
      ]);
    });

    it("should work with ilike", async () => {
      const data = values(
        { name: Types.Text.new("John Smith") },
        { name: Types.Text.new("jane doe") },
        { name: Types.Text.new("BOB JOHNSON") },
      );

      const result = await select(
        (row) => ({
          name: row.name,
          hasJohn: row.name.ilike("%john%"),
        }),
        { from: data },
      ).execute(testDb);

      expect(result).toEqual([
        { name: "John Smith", hasJohn: true },
        { name: "jane doe", hasJohn: false },
        { name: "BOB JOHNSON", hasJohn: true },
      ]);
    });

    it("should work with notLike", async () => {
      const data = values(
        { name: Types.Text.new("John Smith") },
        { name: Types.Text.new("Jane Doe") },
        { name: Types.Text.new("Bob Johnson") },
      );

      const result = await select(
        (row) => ({
          name: row.name,
          notJohn: row.name.notlike("%John%"),
        }),
        { from: data },
      ).execute(testDb);

      expect(result).toEqual([
        { name: "John Smith", notJohn: false },
        { name: "Jane Doe", notJohn: true },
        { name: "Bob Johnson", notJohn: false },
      ]);
    });

    it("should work with notIlike", async () => {
      const data = values(
        { name: Types.Text.new("John Smith") },
        { name: Types.Text.new("jane doe") },
        { name: Types.Text.new("BOB JOHNSON") },
      );

      const result = await select(
        (row) => ({
          name: row.name,
          notJohn: row.name.notilike("%john%"),
        }),
        { from: data },
      ).execute(testDb);

      expect(result).toEqual([
        { name: "John Smith", notJohn: false },
        { name: "jane doe", notJohn: true },
        { name: "BOB JOHNSON", notJohn: false },
      ]);
    });
  });

  describe("IS DISTINCT FROM operators", () => {
    it("should have correct types for IS DISTINCT FROM operators", () => {
      const text1 = Types.Text.new("hello");
      const text0 = Types.Text.new(null);
      const textMaybe: Types.Text<0 | 1> = Types.Text.new("hello");

      const int1 = Types.Int4.new(42);
      const int0 = Types.Int4.new(null);

      // IS DISTINCT FROM always returns Bool<1> (non-null)
      const distinct1 = text1.isDistinctFrom(text0);
      const distinct2 = text0.isDistinctFrom(text0);
      const distinct3 = textMaybe.isDistinctFrom(text1);
      const distinct4 = int1.isDistinctFrom(int0);

      assert<Equals<typeof distinct1, Types.Bool<1>>>();
      assert<Equals<typeof distinct2, Types.Bool<1>>>();
      assert<Equals<typeof distinct3, Types.Bool<1>>>();
      assert<Equals<typeof distinct4, Types.Bool<1>>>();

      // IS NOT DISTINCT FROM always returns Bool<1> (non-null)
      const notDistinct1 = text1.isNotDistinctFrom(text0);
      const notDistinct2 = text0.isNotDistinctFrom(text0);
      const notDistinct3 = textMaybe.isNotDistinctFrom(text1);
      const notDistinct4 = int1.isNotDistinctFrom(int0);

      assert<Equals<typeof notDistinct1, Types.Bool<1>>>();
      assert<Equals<typeof notDistinct2, Types.Bool<1>>>();
      assert<Equals<typeof notDistinct3, Types.Bool<1>>>();
      assert<Equals<typeof notDistinct4, Types.Bool<1>>>();
    });

    it("should follow PostgreSQL null-safe comparison semantics", async () => {
      const data = values(
        { a: Types.Int4.new(1), b: Types.Int4.new(1) },
        { a: Types.Int4.new(1), b: Types.Int4.new(2) },
        { a: Types.Int4.new(1), b: Types.Int4.new(null) },
        { a: Types.Int4.new(null), b: Types.Int4.new(1) },
        { a: Types.Int4.new(null), b: Types.Int4.new(null) },
      );

      const result = await select(
        (row) => ({
          a: row.a,
          b: row.b,
          isDistinct: row.a.isDistinctFrom(row.b),
          isNotDistinct: row.a.isNotDistinctFrom(row.b),
          // For comparison, regular equality
          isEqual: row.a["="](row.b),
          isNotEqual: row.a["<>"](row.b),
        }),
        { from: data },
      ).execute(testDb);

      expect(result).toEqual([
        {
          a: 1,
          b: 1,
          isDistinct: false,
          isNotDistinct: true,
          isEqual: true,
          isNotEqual: false,
        },
        {
          a: 1,
          b: 2,
          isDistinct: true,
          isNotDistinct: false,
          isEqual: false,
          isNotEqual: true,
        },
        {
          a: 1,
          b: null,
          isDistinct: true,
          isNotDistinct: false,
          isEqual: null,
          isNotEqual: null,
        },
        {
          a: null,
          b: 1,
          isDistinct: true,
          isNotDistinct: false,
          isEqual: null,
          isNotEqual: null,
        },
        {
          a: null,
          b: null,
          isDistinct: false,
          isNotDistinct: true,
          isEqual: null,
          isNotEqual: null,
        },
      ]);
    });
  });

  describe("Combined operators in WHERE clauses", () => {
    it("should work with complex boolean logic", async () => {
      const users = values(
        {
          name: Types.Text.new("John"),
          age: Types.Int4.new(25),
          active: Types.Bool.new(true),
        },
        {
          name: Types.Text.new("Jane"),
          age: Types.Int4.new(30),
          active: Types.Bool.new(false),
        },
        {
          name: Types.Text.new("Bob"),
          age: Types.Int4.new(null),
          active: Types.Bool.new(true),
        },
      );

      const result = await select((u) => ({ name: u.name, age: u.age, active: u.active }), {
        from: users,
        where: (u) => u.active.and(u.age.isNotNull()).and(u.age[">"](Types.Int4.new(20))),
      }).execute(testDb);

      expect(result.length).toBe(1);
      expect(result[0].name).toBe("John");
    });

    it("should use IS DISTINCT FROM for null-safe comparisons", async () => {
      const users = values(
        {
          id: Types.Int4.new(1),
          previousAge: Types.Int4.new(25),
          currentAge: Types.Int4.new(26),
        },
        {
          id: Types.Int4.new(2),
          previousAge: Types.Int4.new(30),
          currentAge: Types.Int4.new(30),
        },
        {
          id: Types.Int4.new(3),
          previousAge: Types.Int4.new(null),
          currentAge: Types.Int4.new(40),
        },
        {
          id: Types.Int4.new(4),
          previousAge: Types.Int4.new(35),
          currentAge: Types.Int4.new(null),
        },
        {
          id: Types.Int4.new(5),
          previousAge: Types.Int4.new(null),
          currentAge: Types.Int4.new(null),
        },
      );

      // Find users whose age has changed (including null transitions)
      const changedUsers = await select((u) => ({ id: u.id }), {
        from: users,
        where: (u) => u.previousAge.isDistinctFrom(u.currentAge),
      }).execute(testDb);

      expect(changedUsers).toEqual([
        { id: 1 }, // 25 -> 26
        { id: 3 }, // null -> 40
        { id: 4 }, // 35 -> null
      ]);

      // Find users whose age hasn't changed (including null -> null)
      const unchangedUsers = await select((u) => ({ id: u.id }), {
        from: users,
        where: (u) => u.previousAge.isNotDistinctFrom(u.currentAge),
      }).execute(testDb);

      expect(unchangedUsers).toEqual([
        { id: 2 }, // 30 -> 30
        { id: 5 }, // null -> null
      ]);
    });
  });

  describe("CAST", () => {
    it("should cast between types", async () => {
      const data = values({
        text: Types.Text.new("123"),
        num: Types.Int4.new(456),
      });

      const result = await select(
        (row) => ({
          textToInt: row.text.cast(Types.Int4),
          numToText: row.num.cast(Types.Text),
          numToFloat: row.num.cast(Types.Float8),
          nullableText: (Types.Text.new("456") as Types.Text<0 | 1>).cast(Types.Numeric), // nullable cast
        }),
        { from: data },
      ).execute(testDb);

      assert<
        Equals<
          typeof result,
          {
            textToInt: number;
            numToText: string;
            numToFloat: number;
            nullableText: string | null;
          }[]
        >
      >();
      expect(result[0].textToInt).toBe(123);
      expect(result[0].numToText).toBe("456");
      expect(result[0].numToFloat).toBe(456);
    });

    it("should handle null values in cast", async () => {
      const data = values({
        text: Types.Text.new(null),
        num: Types.Int4.new(null),
      });

      const result = await select(
        (row) => ({
          textToInt: row.text.cast(Types.Int4),
          numToText: row.num.cast(Types.Text),
        }),
        { from: data },
      ).execute(testDb);

      expect(result[0].textToInt).toBe(null);
      expect(result[0].numToText).toBe(null);
    });
  });

  describe("CASE WHEN", () => {
    it("should have correct types for CASE expressions", () => {
      const int1 = Types.Int4.new(100);
      const text1 = Types.Text.new("hello");

      // Without ELSE - always nullable
      const case1 = caseWhen(
        { when: int1[">="](Types.Int4.new(90)), then: Types.Text.new("A") },
        { when: int1[">="](Types.Int4.new(80)), then: Types.Text.new("B") },
      );
      assert<Equals<typeof case1, Types.Text<0 | 1>>>();

      // With ELSE, all non-nullable - returns non-nullable
      const case2 = caseWhen(
        { when: int1[">="](Types.Int4.new(90)), then: Types.Text.new("A") },
        { when: int1[">="](Types.Int4.new(80)), then: Types.Text.new("B") },
        Types.Text.new("C"),
      );
      assert<Equals<typeof case2, Types.Text<1>>>();

      // With ELSE, but one branch is nullable - return type follows ELSE type
      const case3 = caseWhen(
        { when: int1[">="](Types.Int4.new(90)), then: Types.Text.new("A") },
        { when: int1[">="](Types.Int4.new(80)), then: Types.Text.new(null) },
        Types.Text.new("C"),
      );
      assert<Equals<typeof case3, Types.Text<0 | 1>>>(); // ELSE is non-nullable

      // With nullable ELSE - returns nullable
      const case4 = caseWhen(
        { when: int1[">="](Types.Int4.new(90)), then: Types.Text.new("A") },
        { when: int1[">="](Types.Int4.new(80)), then: Types.Text.new("B") },
        Types.Text.new(null),
      );
      assert<Equals<typeof case4, Types.Text<0 | 1>>>(); // ELSE is nullable

      // Different types (Int4 result)
      const case5 = caseWhen(
        { when: text1["="]("A"), then: Types.Int4.new(1) },
        { when: text1["="]("B"), then: Types.Int4.new(2) },
        Types.Int4.new(3),
      );
      assert<Equals<typeof case5, Types.Int4<1>>>();
    });

    it("should work with ELSE clause", async () => {
      const users = values(
        { name: Types.Text.new("John"), age: Types.Int4.new(15) },
        { name: Types.Text.new("Jane"), age: Types.Int4.new(25) },
        { name: Types.Text.new("Bob"), age: Types.Int4.new(70) },
      );

      const result = await select(
        (u) => ({
          name: u.name,
          ageGroup: caseWhen(
            { when: u.age["<"](18), then: Types.Text.new("minor") },
            { when: u.age["<"](65), then: Types.Text.new("adult") },
            Types.Text.new("senior"), // ELSE
          ),
        }),
        { from: users },
      ).execute(testDb);

      assert<Equals<typeof result, { name: string; ageGroup: string }[]>>();
      expect(result).toEqual([
        { name: "John", ageGroup: "minor" },
        { name: "Jane", ageGroup: "adult" },
        { name: "Bob", ageGroup: "senior" },
      ]);
    });

    it("should work without ELSE clause (nullable result)", async () => {
      const scores = values(
        { student: Types.Text.new("Alice"), score: Types.Int4.new(95) },
        { student: Types.Text.new("Bob"), score: Types.Int4.new(85) },
        { student: Types.Text.new("Charlie"), score: Types.Int4.new(75) },
        { student: Types.Text.new("David"), score: Types.Int4.new(65) },
      );

      const result = await select(
        (s) => ({
          student: s.student,
          grade: caseWhen(
            {
              when: s.score[">="](Types.Int4.new(90)),
              then: Types.Text.new("A"),
            },
            {
              when: s.score[">="](Types.Int4.new(80)),
              then: Types.Text.new("B"),
            },
            {
              when: s.score[">="](Types.Int4.new(70)),
              then: Types.Text.new("C"),
            },
            // No ELSE - scores below 70 will get NULL
          ),
        }),
        { from: scores },
      ).execute(testDb);

      // Check that grade can be null
      // The type is Any<string, 0 | 1> which may include undefined in the result due to TypeScript inference

      expect(result).toEqual([
        { student: "Alice", grade: "A" },
        { student: "Bob", grade: "B" },
        { student: "Charlie", grade: "C" },
        { student: "David", grade: null },
      ]);
    });

    it("should work with complex conditions", async () => {
      const products = values(
        {
          name: Types.Text.new("Widget"),
          price: Types.Numeric.new("10.50"),
          inStock: Types.Bool.new(true),
        },
        {
          name: Types.Text.new("Gadget"),
          price: Types.Numeric.new("25.00"),
          inStock: Types.Bool.new(false),
        },
        {
          name: Types.Text.new("Tool"),
          price: Types.Numeric.new("100.00"),
          inStock: Types.Bool.new(true),
        },
      );

      const result = await select(
        (p) => ({
          name: p.name,
          status: caseWhen(
            {
              when: p.inStock.not(),
              then: Types.Text.new("Out of Stock"),
            },
            {
              when: p.price["<"](Types.Numeric.new("20")),
              then: Types.Text.new("Budget"),
            },
            {
              when: p.price["<"](Types.Numeric.new("50")),
              then: Types.Text.new("Standard"),
            },
            Types.Text.new("Premium"),
          ),
        }),
        { from: products },
      ).execute(testDb);

      expect(result).toEqual([
        { name: "Widget", status: "Budget" },
        { name: "Gadget", status: "Out of Stock" },
        { name: "Tool", status: "Premium" },
      ]);
    });

    it("should handle NULL values in conditions", async () => {
      const data = values(
        { id: Types.Int4.new(1), value: Types.Int4.new(10) },
        { id: Types.Int4.new(2), value: Types.Int4.new(null) },
        { id: Types.Int4.new(3), value: Types.Int4.new(30) },
      );

      const result = await select(
        (d) => ({
          id: d.id,
          category: caseWhen(
            { when: d.value.isNull(), then: Types.Text.new("No Value") },
            {
              when: d.value["<"](Types.Int4.new(20)),
              then: Types.Text.new("Low"),
            },
            Types.Text.new("High"),
          ),
        }),
        { from: data },
      ).execute(testDb);

      expect(result).toEqual([
        { id: 1, category: "Low" },
        { id: 2, category: "No Value" },
        { id: 3, category: "High" },
      ]);
    });

    it("should allow mixing nullable and non-nullable values", async () => {
      const data = values(
        { id: Types.Int4.new(1), status: Types.Text.new("active") },
        { id: Types.Int4.new(2), status: Types.Text.new("pending") },
        { id: Types.Int4.new(3), status: Types.Text.new("inactive") },
      );

      const result = await select(
        (d) => ({
          id: d.id,
          label: caseWhen(
            {
              when: d.status["="]("active"),
              then: Types.Text.new("Active User"),
            },
            { when: d.status["="]("pending"), then: Types.Text.new(null) }, // nullable
            {
              when: d.status["="]("inactive"),
              then: Types.Text.new("Inactive"),
            },
            Types.Text.new("Unknown"),
          ),
        }),
        { from: data },
      ).execute(testDb);

      assert<Equals<typeof result, { id: number; label: string | null }[]>>();

      expect(result).toEqual([
        { id: 1, label: "Active User" },
        { id: 2, label: null },
        { id: 3, label: "Inactive" },
      ]);
    });

    it("can't create an empty CASE WHEN", () => {
      expect(() => {
        // @ts-expect-error
        caseWhen();
      });
    });
  });

  describe("coalesce", () => {
    it("should have correct types for coalesce with nullable + nonnullable", async () => {
      const nullable: Types.Int4<0 | 1> = Types.Int4.new(null);
      const nonnullable: Types.Int4<1> = Types.Int4.new(42);

      // When a nullable coalesces with nonnullable, result should be nonnullable
      const result = nullable.coalesce(nonnullable);
      assert<Equals<typeof result, Types.Int4<1>>>();

      expect(await result.execute(testDb)).toBe(42);
    });

    it("should have correct types for coalesce with nullable + nullable", async () => {
      const nullable1: Types.Int4<0 | 1> = Types.Int4.new(null);
      const nullable2: Types.Int4<0 | 1> = Types.Int4.new(10);

      // When both are nullable, result stays nullable
      const result = nullable1.coalesce(nullable2);
      assert<Equals<typeof result, Types.Int4<0 | 1>>>();

      expect(await result.execute(testDb)).toBe(10);
    });

    it("should have correct types for coalesce with nonnullable + nullable", async () => {
      const nonnullable: Types.Int4<1> = Types.Int4.new(42);
      const nullable: Types.Int4<0 | 1> = Types.Int4.new(null);

      // Nonnullable always stays nonnullable
      const result = nonnullable.coalesce(nullable);
      assert<Equals<typeof result, Types.Int4<1>>>();

      expect(await result.execute(testDb)).toBe(42);
    });

    it("should have correct types for coalesce with nonnullable + nonnullable", async () => {
      const nonnullable1: Types.Int4<1> = Types.Int4.new(42);
      const nonnullable2: Types.Int4<1> = Types.Int4.new(100);

      const result = nonnullable1.coalesce(nonnullable2);
      assert<Equals<typeof result, Types.Int4<1>>>();

      expect(await result.execute(testDb)).toBe(42); // First non-nullable takes precedence
    });

    it("should work with coalesce at runtime", async () => {
      const data = values(
        { num: Types.Int4.new(null), fallback: Types.Int4.new(10) },
        { num: Types.Int4.new(20), fallback: Types.Int4.new(30) },
      );

      const result = await select(
        (row) => ({
          coalesced: row.num.coalesce(row.fallback),
          withLiteral: row.num.coalesce(99),
        }),
        {
          from: data,
        },
      ).execute(testDb);

      assert<Equals<typeof result, { coalesced: number; withLiteral: number }[]>>();

      expect(result).toEqual([
        { coalesced: 10, withLiteral: 99 },
        { coalesced: 20, withLiteral: 20 },
      ]);
    });

    it("should work with coalesce on different types", () => {
      const textNullable: Types.Text<0 | 1> = Types.Text.new(null);
      const textNonnullable: Types.Text<1> = Types.Text.new("default");

      const result1 = textNullable.coalesce(textNonnullable);
      assert<Equals<typeof result1, Types.Text<1>>>();

      const result2 = textNullable.coalesce("literal");
      assert<Equals<typeof result2, Types.Text<1>>>();

      const boolNullable: Types.Bool<0 | 1> = Types.Bool.new(null);
      const boolNonnullable: Types.Bool<1> = Types.Bool.new(true);

      const result3 = boolNullable.coalesce(boolNonnullable);
      assert<Equals<typeof result3, Types.Bool<1>>>();
    });
  });
});
