import { describe, it, expect } from "vitest";
import * as Types from "./index";
import { values } from "../query/values";
import { testDb } from "../db.test";
import { assert, Equals } from "tsafe";

describe("Keyword operators", () => {
  describe("isNull and isNotNull", () => {
    it("should work with isNull", async () => {
      const data = values(
        { name: Types.Text.new("John"), age: Types.Int4.new(null) },
        { name: Types.Text.new(null), age: Types.Int4.new(25) }
      );
      
      const result = await data
        .select((row) => ({
          nameIsNull: row.name.isNull(),
          ageIsNull: row.age.isNull()
        }))
        .execute(testDb);
      
      assert<Equals<typeof result, { nameIsNull: boolean; ageIsNull: boolean }[]>>();
      
      expect(result).toEqual([
        { nameIsNull: false, ageIsNull: true },
        { nameIsNull: true, ageIsNull: false }
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
        { name: Types.Text.new(null), age: Types.Int4.new(25) }
      );
      
      const result = await data
        .select((row) => ({
          nameIsNotNull: row.name.isNotNull(),
          ageIsNotNull: row.age.isNotNull()
        }))
        .execute(testDb);
      
      expect(result).toEqual([
        { nameIsNotNull: true, ageIsNotNull: false },
        { nameIsNotNull: false, ageIsNotNull: true }
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
        { a: Types.Bool.new(null), b: Types.Bool.new(null) }
      );
      
      const result = await data
        .select((row) => ({
          a: row.a,
          b: row.b,
          result: row.a.and(row.b)
        }))
        .execute(testDb);
      
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
        { a: null, b: null, result: null }
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
        { a: Types.Bool.new(null), b: Types.Bool.new(null) }
      );
      
      const result = await data
        .select((row) => ({
          a: row.a,
          b: row.b,
          result: row.a.or(row.b)
        }))
        .execute(testDb);
      
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
        { a: null, b: null, result: null }
      ]);
    });

    it("should follow PostgreSQL three-valued logic for NOT", async () => {
      const data = values(
        { a: Types.Bool.new(true) },
        { a: Types.Bool.new(false) },
        { a: Types.Bool.new(null) }
      );
      
      const result = await data
        .select((row) => ({
          a: row.a,
          result: row.a.not()
        }))
        .execute(testDb);
      
      // NOT truth table:
      // NOT true = false
      // NOT false = true
      // NOT null = null
      expect(result).toEqual([
        { a: true, result: false },
        { a: false, result: true },
        { a: null, result: null }
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
      assert<Equals<typeof like1, Types.Bool<1>>>();  // both non-null
      assert<Equals<typeof like0, Types.Bool<0 | 1>>>();  // text is null
      assert<Equals<typeof likeMaybe, Types.Bool<0 | 1>>>();  // text might be null
      
      // ilike operator
      const ilike1 = text1.ilike(pattern);
      const ilike0 = text0.ilike(pattern);
      const ilikeMaybe = textMaybe.ilike(pattern);
      
      assert<Equals<typeof ilike1, Types.Bool<1>>>();  // both non-null
      assert<Equals<typeof ilike0, Types.Bool<0 | 1>>>();
      assert<Equals<typeof ilikeMaybe, Types.Bool<0 | 1>>>();
      
      // notLike operator
      const notLike1 = text1.notlike(pattern);
      const notLike0 = text0.notlike(pattern);
      const notLikeMaybe = textMaybe.notlike(pattern);
      
      assert<Equals<typeof notLike1, Types.Bool<1>>>();  // both non-null
      assert<Equals<typeof notLike0, Types.Bool<0 | 1>>>();
      assert<Equals<typeof notLikeMaybe, Types.Bool<0 | 1>>>();
      
      // notIlike operator
      const notIlike1 = text1.notilike(pattern);
      const notIlike0 = text0.notilike(pattern);
      const notIlikeMaybe = textMaybe.notilike(pattern);
      
      assert<Equals<typeof notIlike1, Types.Bool<1>>>();  // both non-null
      assert<Equals<typeof notIlike0, Types.Bool<0 | 1>>>();
      assert<Equals<typeof notIlikeMaybe, Types.Bool<0 | 1>>>();
    });

    it("should work with like", async () => {
      const data = values(
        { name: Types.Text.new("John Smith") },
        { name: Types.Text.new("Jane Doe") },
        { name: Types.Text.new("Bob Johnson") }
      );
      
      const result = await data
        .select((row) => ({
          name: row.name,
          hasJohn: row.name.like(Types.Text.new("%John%"))
        }))
        .execute(testDb);
      
      expect(result).toEqual([
        { name: "John Smith", hasJohn: true },
        { name: "Jane Doe", hasJohn: false },
        { name: "Bob Johnson", hasJohn: true }
      ]);
    });

    it("should work with ilike", async () => {
      const data = values(
        { name: Types.Text.new("John Smith") },
        { name: Types.Text.new("jane doe") },
        { name: Types.Text.new("BOB JOHNSON") }
      );
      
      const result = await data
        .select((row) => ({
          name: row.name,
          hasJohn: row.name.ilike(Types.Text.new("%john%"))
        }))
        .execute(testDb);
      
      expect(result).toEqual([
        { name: "John Smith", hasJohn: true },
        { name: "jane doe", hasJohn: false },
        { name: "BOB JOHNSON", hasJohn: true }
      ]);
    });

    it("should work with notLike", async () => {
      const data = values(
        { name: Types.Text.new("John Smith") },
        { name: Types.Text.new("Jane Doe") },
        { name: Types.Text.new("Bob Johnson") }
      );
      
      const result = await data
        .select((row) => ({
          name: row.name,
          notJohn: row.name.notlike(Types.Text.new("%John%"))
        }))
        .execute(testDb);
      
      expect(result).toEqual([
        { name: "John Smith", notJohn: false },
        { name: "Jane Doe", notJohn: true },
        { name: "Bob Johnson", notJohn: false }
      ]);
    });

    it("should work with notIlike", async () => {
      const data = values(
        { name: Types.Text.new("John Smith") },
        { name: Types.Text.new("jane doe") },
        { name: Types.Text.new("BOB JOHNSON") }
      );
      
      const result = await data
        .select((row) => ({
          name: row.name,
          notJohn: row.name.notilike(Types.Text.new("%john%"))
        }))
        .execute(testDb);
      
      expect(result).toEqual([
        { name: "John Smith", notJohn: false },
        { name: "jane doe", notJohn: true },
        { name: "BOB JOHNSON", notJohn: false }
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
        { a: Types.Int4.new(null), b: Types.Int4.new(null) }
      );
      
      const result = await data
        .select((row) => ({
          a: row.a,
          b: row.b,
          isDistinct: row.a.isDistinctFrom(row.b),
          isNotDistinct: row.a.isNotDistinctFrom(row.b),
          // For comparison, regular equality
          isEqual: row.a["="](row.b),
          isNotEqual: row.a["<>"](row.b)
        }))
        .execute(testDb);
      
      expect(result).toEqual([
        { a: 1, b: 1, isDistinct: false, isNotDistinct: true, isEqual: true, isNotEqual: false },
        { a: 1, b: 2, isDistinct: true, isNotDistinct: false, isEqual: false, isNotEqual: true },
        { a: 1, b: null, isDistinct: true, isNotDistinct: false, isEqual: null, isNotEqual: null },
        { a: null, b: 1, isDistinct: true, isNotDistinct: false, isEqual: null, isNotEqual: null },
        { a: null, b: null, isDistinct: false, isNotDistinct: true, isEqual: null, isNotEqual: null }
      ]);
    });
  });

  describe("BETWEEN operators", () => {
    it("should have correct types for BETWEEN operators", () => {
      const int1 = Types.Int4.new(5);
      const int0 = Types.Int4.new(null);
      const intMaybe: Types.Int4<0 | 1> = Types.Int4.new(5);
      
      // BETWEEN with all non-null values returns Bool<1>
      const between1 = int1.between(Types.Int4.new(1), Types.Int4.new(10));
      assert<Equals<typeof between1, Types.Bool<1>>>();
      
      // BETWEEN with any nullable value returns Bool<0 | 1>
      const between2 = int0.between(Types.Int4.new(1), Types.Int4.new(10));
      assert<Equals<typeof between2, Types.Bool<0 | 1>>>();
      
      const between3 = int1.between(int0, Types.Int4.new(10));
      assert<Equals<typeof between3, Types.Bool<0 | 1>>>();
      
      const between4 = intMaybe.between(Types.Int4.new(1), Types.Int4.new(10));
      assert<Equals<typeof between4, Types.Bool<0 | 1>>>();
      
      // NOT BETWEEN follows the same rules
      const notBetween1 = int1.notBetween(Types.Int4.new(1), Types.Int4.new(10));
      assert<Equals<typeof notBetween1, Types.Bool<1>>>();
      
      const notBetween2 = int0.notBetween(Types.Int4.new(1), Types.Int4.new(10));
      assert<Equals<typeof notBetween2, Types.Bool<0 | 1>>>();
    });

    it("should work with BETWEEN for integer ranges", async () => {
      const data = values(
        { id: Types.Int4.new(1), score: Types.Int4.new(50) },
        { id: Types.Int4.new(2), score: Types.Int4.new(75) },
        { id: Types.Int4.new(3), score: Types.Int4.new(90) },
        { id: Types.Int4.new(4), score: Types.Int4.new(null) },
        { id: Types.Int4.new(5), score: Types.Int4.new(25) }
      );
      
      const result = await data
        .select((row) => ({
          id: row.id,
          score: row.score,
          inRange: row.score.between(Types.Int4.new(50), Types.Int4.new(80))
        }))
        .execute(testDb);
      
      expect(result).toEqual([
        { id: 1, score: 50, inRange: true },   // 50 is in [50, 80]
        { id: 2, score: 75, inRange: true },   // 75 is in [50, 80]
        { id: 3, score: 90, inRange: false },  // 90 > 80
        { id: 4, score: null, inRange: null }, // null propagation
        { id: 5, score: 25, inRange: false }   // 25 < 50
      ]);
    });

    it("should work with NOT BETWEEN", async () => {
      const data = values(
        { id: Types.Int4.new(1), age: Types.Int4.new(18) },
        { id: Types.Int4.new(2), age: Types.Int4.new(25) },
        { id: Types.Int4.new(3), age: Types.Int4.new(65) },
        { id: Types.Int4.new(4), age: Types.Int4.new(null) }
      );
      
      const result = await data
        .select((row) => ({
          id: row.id,
          age: row.age,
          notWorkingAge: row.age.notBetween(Types.Int4.new(18), Types.Int4.new(64))
        }))
        .execute(testDb);
      
      expect(result).toEqual([
        { id: 1, age: 18, notWorkingAge: false },  // 18 is in [18, 64]
        { id: 2, age: 25, notWorkingAge: false },  // 25 is in [18, 64]
        { id: 3, age: 65, notWorkingAge: true },   // 65 > 64
        { id: 4, age: null, notWorkingAge: null }  // null propagation
      ]);
    });

    it("should work with BETWEEN on dates", async () => {
      const data = values(
        { id: Types.Int4.new(1), created: Types.Date.new("2024-01-15") },
        { id: Types.Int4.new(2), created: Types.Date.new("2024-06-15") },
        { id: Types.Int4.new(3), created: Types.Date.new("2024-12-15") },
        { id: Types.Int4.new(4), created: Types.Date.new(null) }
      );
      
      const result = await data
        .where((row) => 
          row.created.between(
            Types.Date.new("2024-01-01"), 
            Types.Date.new("2024-06-30")
          )
        )
        .select((row) => ({ id: row.id }))
        .execute(testDb);
      
      expect(result).toEqual([
        { id: 1 },  // 2024-01-15 is in range
        { id: 2 }   // 2024-06-15 is in range
        // 3 is excluded (2024-12-15 > 2024-06-30)
        // 4 is excluded (null)
      ]);
    });

    it("should handle null values in BETWEEN bounds", async () => {
      const data = values(
        { id: Types.Int4.new(1), value: Types.Int4.new(50) },
        { id: Types.Int4.new(2), value: Types.Int4.new(100) }
      );
      
      const result = await data
        .select((row) => ({
          id: row.id,
          // Testing with null in bounds
          betweenWithNullLower: row.value.between(Types.Int4.new(null), Types.Int4.new(75)),
          betweenWithNullUpper: row.value.between(Types.Int4.new(25), Types.Int4.new(null)),
          betweenWithBothNull: row.value.between(Types.Int4.new(null), Types.Int4.new(null))
        }))
        .execute(testDb);
      
      // PostgreSQL's BETWEEN behavior with nulls:
      // - If the value is null, result is null
      // - If both bounds are null, result is null
      // - If one bound is null, it depends on the comparison with the non-null bound
      expect(result).toEqual([
        { id: 1, betweenWithNullLower: null, betweenWithNullUpper: null, betweenWithBothNull: null },
        { id: 2, betweenWithNullLower: false, betweenWithNullUpper: null, betweenWithBothNull: null }
      ]);
    });

    // This should fail to compile for types without comparison operators
    // Uncomment to verify type safety:
    // it("should not compile for types without comparison operators", () => {
    //   const bool1 = Types.Bool.new(true);
    //   // @ts-expect-error Bool doesn't have >= and <= operators
    //   const betweenBool = bool1.between(Types.Bool.new(false), Types.Bool.new(true));
    // });
  });

  describe("Combined operators in WHERE clauses", () => {
    it("should work with complex boolean logic", async () => {
      const users = values(
        { name: Types.Text.new("John"), age: Types.Int4.new(25), active: Types.Bool.new(true) },
        { name: Types.Text.new("Jane"), age: Types.Int4.new(30), active: Types.Bool.new(false) },
        { name: Types.Text.new("Bob"), age: Types.Int4.new(null), active: Types.Bool.new(true) }
      );
      
      const result = await users
        .where((u) => 
          u.active.and(u.age.isNotNull()).and(u.age[">"](Types.Int4.new(20)))
        )
        .execute(testDb);
      
      expect(result.length).toBe(1);
      expect(result[0].name).toBe("John");
    });

    it("should use IS DISTINCT FROM for null-safe comparisons", async () => {
      const users = values(
        { id: Types.Int4.new(1), previousAge: Types.Int4.new(25), currentAge: Types.Int4.new(26) },
        { id: Types.Int4.new(2), previousAge: Types.Int4.new(30), currentAge: Types.Int4.new(30) },
        { id: Types.Int4.new(3), previousAge: Types.Int4.new(null), currentAge: Types.Int4.new(40) },
        { id: Types.Int4.new(4), previousAge: Types.Int4.new(35), currentAge: Types.Int4.new(null) },
        { id: Types.Int4.new(5), previousAge: Types.Int4.new(null), currentAge: Types.Int4.new(null) }
      );
      
      // Find users whose age has changed (including null transitions)
      const changedUsers = await users
        .where((u) => u.previousAge.isDistinctFrom(u.currentAge))
        .select((u) => ({ id: u.id }))
        .execute(testDb);
      
      expect(changedUsers).toEqual([
        { id: 1 },  // 25 -> 26
        { id: 3 },  // null -> 40
        { id: 4 }   // 35 -> null
      ]);
      
      // Find users whose age hasn't changed (including null -> null)
      const unchangedUsers = await users
        .where((u) => u.previousAge.isNotDistinctFrom(u.currentAge))
        .select((u) => ({ id: u.id }))
        .execute(testDb);
      
      expect(unchangedUsers).toEqual([
        { id: 2 },  // 30 -> 30
        { id: 5 }   // null -> null
      ]);
    });
  });
});