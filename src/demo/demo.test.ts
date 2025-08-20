import { describe, expect, it, vi } from "vitest";

type Examples = "Trending Posts:" | "Viral Posts with Stats:" | "Analytics:";

describe("demo.ts examples", async () => {
  const calls: {
    "Trending Posts:"?: unknown[];
    "Viral Posts with Stats:"?: unknown[];
    "Analytics:"?: unknown[];
  } = {};

  const spyConsole = vi
    .spyOn(console, "log")
    .mockImplementation((name: Examples, value: unknown[]) => {
      calls[name] = value as any;
    });
  await import("./demo.js");
  spyConsole.mockRestore();

  const {
    "Trending Posts:": example1,
    "Viral Posts with Stats:": example2,
    "Analytics:": example3,
  } = calls;

  it("example1: Trending posts with engagement metrics", async () => {
    expect(example1).toEqual([
      {
        content: "PostgreSQL can do THAT?!",
        engagement: 151,
        trending: 151 / 7.5,
        viral: true,
      },
      {
        content: "Working on something new...",
        engagement: 18,
        trending: 18 / 3,
        viral: false,
      },
      {
        content: "Just shipped Typegres!",
        engagement: 58,
        trending: 58 / 36,
        viral: false,
      },
    ]);
  });

  it("example2: Viral posts with author and top comment", async () => {
    expect(example2).toEqual([
      {
        content: "PostgreSQL can do THAT?!",
        author: "bob",
        topComment: "Game changer!",
        viral: true,
      },
    ]);
  });

  it("example3: Analytics with window functions", async () => {
    expect(example3).toEqual([
      {
        content: "Just shipped Typegres!",
        engagementRank: 2n,
        cumulativeLikes: 42n,
      },
      {
        content: "PostgreSQL can do THAT?!",
        engagementRank: 1n,
        cumulativeLikes: 105n,
      },
      {
        content: "Working on something new...",
        engagementRank: 3n,
        cumulativeLikes: 42n + 12n,
      },
    ]);
  });
});
