import { describe, expect, it } from "vitest";
import { main as basicMain } from "./basic-example";
import { main as advancedMain } from "./advanced-example";
import { assert, Equals } from "tsafe/assert";

describe("examples", () => {
  it("basic-example: should show active users with transformations", async () => {
    const activeUsers = await basicMain();
    
    assert<
      Equals<typeof activeUsers, { upper: string, isAdult: boolean }[]>
    >();

    expect(Array.isArray(activeUsers)).toBe(true);
    expect(activeUsers).toEqual([
      { upper: 'ALICE', isAdult: true },
      { upper: 'BOB', isAdult: false }
    ]);
  });

  it("advanced-example: should insert posts and show prolific authors", async () => {
    const { postsCount, prolificAuthors } = await advancedMain();
    
    assert<
      Equals<typeof prolificAuthors, { id: number; name: string; totalPosts: bigint }[]>
    >();

    // Check that posts were inserted
    expect(postsCount).toBe(32);

    // Check prolific authors
    expect(Array.isArray(prolificAuthors)).toBe(true);
    expect(prolificAuthors).toEqual([
      { id: 1, name: 'Alice', totalPosts: 15n },
      { id: 3, name: 'Charlie', totalPosts: 12n }
    ]);
  });
});