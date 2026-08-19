import { describe, expect, test } from "vitest";
import { hashPassword, verifyPassword } from "../server/auth";

describe("notes authentication", () => {
  test("hashes and verifies passwords", async () => {
    const stored = await hashPassword("correct horse");
    expect(stored).not.toContain("correct horse");
    expect(await verifyPassword("correct horse", stored)).toBe(true);
    expect(await verifyPassword("wrong", stored)).toBe(false);
  });
});
