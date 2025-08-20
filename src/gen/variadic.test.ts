import { describe, expect, it } from "vitest";
import { Int4, Text, Bool } from "../types/index";
import { testDb } from "../db.test";
import {
  concat,
  concatWs,
  format,
  jsonBuildArray,
  jsonBuildObject,
  jsonbBuildArray,
  jsonbBuildObject,
  numNulls,
  numNonnulls,
} from "../gen/functions";

describe("Testing variadic types", () => {
  describe("concat function", () => {
    it("should concatenate text values as method", async () => {
      const result = await Text.new("Hello").concat(Text.new(" "), Text.new("world"), Text.new("!")).execute(testDb);
      expect(result).toBe("Hello world!");
    });

    it("should concatenate with different types", async () => {
      const result = await Text.new("Value: ").concat(Int4.new(42).cast(Text)).execute(testDb);
      expect(result).toBe("Value: 42");
    });

    it("should work with single argument", async () => {
      const result = await Text.new("Hello").concat(Text.new(" world")).execute(testDb);
      expect(result).toBe("Hello world");
    });

    it("should work as standalone function", async () => {
      const result = await concat(Text.new("Hello"), Text.new(" "), Text.new("world"), Text.new("!")).execute(testDb);
      expect(result).toBe("Hello world!");
    });
  });

  describe("concat_ws function", () => {
    it("should concatenate with separator", async () => {
      const result = await concatWs(Text.new("-"), Text.new("one"), Text.new("two"), Text.new("three")).execute(testDb);
      expect(result).toBe("one-two-three");
    });

    it("should handle null values by skipping them", async () => {
      const result = await concatWs(Text.new(", "), Text.new("first"), Text.new(null), Text.new("third")).execute(
        testDb,
      );
      expect(result).toBe("first, third");
    });
  });

  describe("format function", () => {
    it("should format strings with placeholders", async () => {
      const result = await format(
        Text.new("Hello %s, you are %s years old"),
        Text.new("Alice"),
        Int4.new(25).cast(Text),
      ).execute(testDb);
      expect(result).toBe("Hello Alice, you are 25 years old");
    });

    it("should work with single replacement", async () => {
      const result = await format(Text.new("Hello %s!"), Text.new("World")).execute(testDb);
      expect(result).toBe("Hello World!");
    });
  });

  describe("JSON array building", () => {
    it("should build JSON array with jsonBuildArray", async () => {
      const result = await jsonBuildArray(Text.new("a"), Int4.new(1), Bool.new(true), Text.new("test")).execute(testDb);
      expect(JSON.parse(result as string)).toEqual(["a", 1, true, "test"]);
    });

    it("should build JSON array as method", async () => {
      const result = await Text.new("first").jsonBuildArray(Text.new("second"), Text.new("third")).execute(testDb);
      expect(JSON.parse(result as string)).toEqual(["first", "second", "third"]);
    });

    it("should build JSONB array", async () => {
      const result = await jsonbBuildArray(Text.new("x"), Int4.new(42)).execute(testDb);
      expect(JSON.parse(result as string)).toEqual(["x", 42]);
    });
  });

  describe("JSON object building", () => {
    it("should build JSON object with key-value pairs", async () => {
      const result = await jsonBuildObject(
        Text.new("name"),
        Text.new("Alice"),
        Text.new("age"),
        Int4.new(30),
        Text.new("active"),
        Bool.new(true),
      ).execute(testDb);
      expect(JSON.parse(result as string)).toEqual({
        name: "Alice",
        age: 30,
        active: true,
      });
    });

    it("should build JSONB object", async () => {
      const result = await jsonbBuildObject(
        Text.new("key1"),
        Text.new("value1"),
        Text.new("key2"),
        Int4.new(123),
      ).execute(testDb);
      expect(JSON.parse(result as string)).toEqual({
        key1: "value1",
        key2: 123,
      });
    });
  });

  describe("null counting functions", () => {
    it("should count null values with numNulls", async () => {
      const result = await numNulls(Text.new(null), Text.new("not null"), Text.new(null), Int4.new(null)).execute(
        testDb,
      );
      expect(result).toBe(3);
    });

    it("should count non-null values with numNonnulls", async () => {
      const result = await numNonnulls(
        Text.new("a"),
        Text.new(null),
        Text.new("b"),
        Int4.new(42),
        Text.new(null),
      ).execute(testDb);
      expect(result).toBe(3);
    });
  });

  describe("variadic with empty additional args", () => {
    it("concat should work with no variadic args", async () => {
      const result = await concat(Text.new("single")).execute(testDb);
      expect(result).toBe("single");
    });

    it("jsonBuildArray should work with single element", async () => {
      const result = await jsonBuildArray(Text.new("only")).execute(testDb);
      expect(JSON.parse(result as string)).toEqual(["only"]);
    });
  });

  describe("type safety", () => {
    it("should maintain type safety with variadic functions", async () => {
      // This should compile and work correctly
      const text1 = Text.new("a");
      const text2 = Text.new("b");
      const text3 = Text.new("c");

      const result = await text1.concat(text2, text3).execute(testDb);
      expect(result).toBe("abc");

      // Type checking should ensure all variadic args are compatible
      const intVal = Int4.new(42);
      const result2 = await text1.concat(intVal.cast(Text)).execute(testDb);
      expect(result2).toBe("a42");
    });
  });
});
