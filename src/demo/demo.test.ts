import { describe, expect, it, vi } from "vitest";

type Examples = "Example 1" | "Example 2" | "Example 3";

describe("demo.ts examples", async () => {
  const calls: {
    "Example 1"?: { species: string }[];
    "Example 2"?: { key: string; isNum: boolean }[];
    "Example 3"?: { personName: string; petSpecies: string; petAge: number }[];
    "Example 4"?: { result: number }[];
  } = {};

  const spyConsole = vi
    .spyOn(console, "log")
    .mockImplementation((name: Examples, value: unknown[]) => {
      calls[name] = value as any;
    });
  await import("./demo.js");
  spyConsole.mockRestore();

  const {
    "Example 1": example1,
    "Example 2": example2,
    "Example 3": example3,
    "Example 4": example4,
  } = calls;

  it("example1: grouping and aggregation on pets", async () => {
    expect(Array.isArray(example1)).toBe(true);
    // Should group by species and aggregate
    expect(
      example1?.toSorted((a, b) => a.species.localeCompare(b.species)),
    ).toEqual([
      {
        species: "cat",
        avgAge: 2,
        stddev: 0,
        total: 1n,
        note: "cats are great!",
      },
      {
        species: "dog",
        avgAge: 6.5,
        stddev: 3.5,
        total: 2n,
        note: "dogs are great!",
      },
    ]);
  });

  it("example2: Jsonb jsonbEach and select", async () => {
    // TODO: Set-returning functions like jsonbEach() fail with "Cannot read properties of undefined (reading 'ofSchema')"
    expect(example2).toEqual([
      { key: "a!", isNum: true },
      { key: "b!", isNum: true },
      { key: "c!", isNum: false },
    ]);
  });

  it("example3: join people and pets", async () => {
    // TODO: JOIN is not supported in the new grammar yet
    expect(Array.isArray(example3)).toBe(true);
    expect(example3).toEqual([
      { personName: "Alice", petSpecies: "cat", petAge: 2 },
      { personName: "Bob", petSpecies: "dog", petAge: 3 },
      { personName: "Charlie", petSpecies: "dog", petAge: 10 },
    ]);
  });

  it("example4: math coverage", async () => {
    expect(Array.isArray(example4)).toBe(true);
    expect(example4).toEqual([{ result: 1.669026835867367 }]);
  });
});
