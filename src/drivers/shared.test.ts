import { describe, expect, test } from "vitest";
import { stripMatchedOuterParens } from "./shared";

describe("stripMatchedOuterParens", () => {
  test("strips one pair enclosing the complete statement", () => {
    expect(stripMatchedOuterParens("(SELECT (1))")).toBe("SELECT (1)");
    expect(stripMatchedOuterParens("  (SELECT 1)  ")).toBe("SELECT 1");
  });

  test("preserves partial and unbalanced wrappers", () => {
    expect(stripMatchedOuterParens("(SELECT 1) UNION (SELECT 2)")).toBe(
      "(SELECT 1) UNION (SELECT 2)",
    );
    expect(stripMatchedOuterParens("(SELECT 1")).toBe("(SELECT 1");
    expect(stripMatchedOuterParens("SELECT 1")).toBe("SELECT 1");
  });
});
