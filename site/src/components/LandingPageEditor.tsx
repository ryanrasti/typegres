"use client";

import { Suspense, lazy } from "react";

const CodeEditor = lazy(() => 
  import("./CodeEditor").then(module => ({ 
    default: module.CodeEditor 
  }))
);

const EXAMPLE_CODE = `import { typegres, Int8, Float8, Text, values } from "typegres";

const db = await typegres({ type: "pglite" });

const pets = values(
  { species: Text.new("cat"), age: Float8.new(2), id: Int8.new(1n) },
  { species: Text.new("dog"), age: Float8.new(3), id: Int8.new(2n) },
  { species: Text.new("dog"), age: Float8.new(10), id: Int8.new(3n) }
);

const activeSpecies = await pets
  .groupBy((p) => [p.species] as const)
  .select((p, [species]) => ({
    species,
    avgAge: p.age.avg(),
    total: p.id.count(),
    note: species.textcat("s are great!"),
  }))
  .debug()
  .execute(db);

console.log("Active species:", activeSpecies);

// TypeScript knows exactly what you'll get:
// activeSpecies: {
//     species: string;
//     avgAge: number | null;
//     total: bigint;
//     note: string;
// }[]`;

export function LandingPageEditor() {
  return (
    <Suspense 
      fallback={
        <div className="h-[400px] flex items-center justify-center bg-gray-900 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <CodeEditor
        initialCode={EXAMPLE_CODE}
        layout="compact"
        height="400px"
        showLineNumbers={true}
      />
    </Suspense>
  );
}