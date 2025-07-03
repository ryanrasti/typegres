import { describe, it, expect } from "vitest";
import { example1, example2, example3 } from "./demo";

describe("demo.ts examples", () => {
  it("example1: grouping and aggregation on pets", async () => {
    // example1 is already awaited in the module
    expect(Array.isArray(example1)).toBe(true);
    // Should group by species and aggregate
    expect(
      example1.toSorted((a, b) => a.species.localeCompare(b.species))
    ).toEqual([
      {
        species: "cat",
        avgAge: 2,
        total: 1n,
        note: "cats are great!",
      },
      {
        species: "dog",
        avgAge: 6.5,
        total: 2n,
        note: "dogs are great!",
      },
    ]);
  });

  it("example2: Jsonb jsonbEach and select", async () => {
    expect(example2).toEqual([
      { key: "a!", isNum: true },
      { key: "b!", isNum: true },
      { key: "c!", isNum: false },
    ]);
  });

  it("example3: join people and pets", async () => {
    expect(Array.isArray(example3)).toBe(true);
    expect(example3).toEqual([
      { personName: "Alice", petSpecies: "cat", petAge: 2 },
      { personName: "Bob", petSpecies: "dog", petAge: 3 },
      { personName: "Charlie", petSpecies: "dog", petAge: 10 },
    ]);
  });
});
