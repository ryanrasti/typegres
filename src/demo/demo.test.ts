import { describe, expect, it, vi } from "vitest";

type Label = "Alice's posts:" | "Likes by author:" | "Promoted:";

// The demo.ts script IS the test: it runs end-to-end against pglite and
// console.logs each example's result with a label. This test imports
// demo.ts, captures the logs, and asserts the shape of each example.
// If the playground snippet changes, update demo.ts and the expected
// values here together.
describe("demo.ts examples", async () => {
  const calls = new Map<Label, unknown>();

  const spy = vi.spyOn(console, "log").mockImplementation((label: Label, value: unknown) => {
    calls.set(label, value);
  });
  // Dynamic import so the console.log spy above is installed before
  // demo.ts's top-level logs run.
  // eslint-disable-next-line no-restricted-syntax
  await import("./demo.ts");
  spy.mockRestore();

  it("Alice's posts — select with a derived column", () => {
    expect(calls.get("Alice's posts:")).toEqual([
      { id: 1n, preview: "first post…" },
      { id: 3n, preview: "another from alice…" },
    ]);
  });

  it("Likes by author — aggregate with group-by + order-by", () => {
    expect(calls.get("Likes by author:")).toEqual([
      { author: "bob", total: "12" },
      { author: "alice", total: "8" },
    ]);
  });

  it("Promoted — update with RETURNING", () => {
    expect(calls.get("Promoted:")).toEqual([
      { id: 1n, likes: 999n },
      { id: 3n, likes: 999n },
    ]);
  });
});
