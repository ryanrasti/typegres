import { describe, it, expect } from "vitest";
import { typegres } from "typegres";

describe("Simple Test", () => {
  it("should create typegres instance", async () => {
    console.log("Creating typegres instance...");
    const tg = await typegres({
      type: "pglite",
    });
    console.log("Created successfully");

    expect(tg).toBeDefined();
    await tg.end();
  });
});
