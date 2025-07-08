"use client";

import { CodeBlock } from "@/components/CodeBlock";
import { CodeEditor } from "@/components/CodeEditor";
import { PocWarning } from "@/components/poc-warning";

export default function QuickstartPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Quick Start Guide</h1>
      <PocWarning />

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. Installation</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Install Typegres:
        </p>
        <CodeBlock
          language="bash"
          code={`
npm install typegres
# to connect to a standard PostgreSQL database, also:
# npm install pg
`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          2. Set Up Your Database Connection
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Create a database instance:
        </p>
        <CodeBlock
          code={`import { typegres } from "typegres";

const db = await typegres({ type: "pglite" });
// or for a standard PostgreSQL connection:
// import { Pool } from "pg";
// const db = await typegres({ type: "pg", PoolClass: Pool, config: {
//  host: "...",
//  user: "...",
//  ...
//})
`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">3. Write basic queries</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Now you can write fully type-safe queries with autocompletion:
        </p>
        <CodeEditor
          layout="compact"
          height="320px"
          showLineNumbers={true}
          initialCode={`import { typegres, Int8, Float8, Text, Jsonb, values } from "typegres";

const db = await typegres({ type: "pglite" });

const pets = values(
  { species: Text.new("cat"), age: Float8.new(2), id: Int8.new(1n) },
  { species: Text.new("dog"), age: Float8.new(3), id: Int8.new(2n) },
  { species: Text.new("dog"), age: Float8.new(10), id: Int8.new(3n) }
);

const example1 = await pets
  .groupBy((p) => [p.species] as const)
  .select((p, [species]) => ({
    species,
    avgAge: p.age.avg(),
    total: p.id.count(),
    note: species.textcat("s are great!"),
    // uncomment to see a type error:
    // error: p.age,
  }))
  .debug()
  .execute(db);

console.log("Example 1", example1);
`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          4. Go deeper in Postgres
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Typegres supports all Postgres types and functions, so you can
          leverage the full power of Postgres while maintaining type safety.
        </p>
        <CodeEditor
          layout="compact"
          height="340px"
          showLineNumbers={true}
          initialCode={`import { typegres, Int4, Bool, Text, values, Array } from "typegres";

const db = await typegres({ type: "pglite" });

const TextArray = Array.of(Text);
const users = values(
  { name: Text.new("Alice Aardvark"), age: Int4.new(25), active: Bool.new(true), pets: TextArray.new('{fido}') },
  { name: Text.new("Bob Bee"), age: Int4.new(30), active: Bool.new(true), pets: TextArray.new('{fluffy, foofoo}') },
  { name: Text.new("Charlie Child"), age: Int4.new(5), active: Bool.new(true), pets: TextArray.new('{guppy}') }
);

const result = await users
  .select(u => ({
    firstName: u.name.regexpSubstr("[A-Z][a-z]+").lower(),
    lastName: u.name.regexpSubstr("[A-Z][a-z]+$").lower(),
    numPets: u.pets.arrayLength(1),
    isAdult: u.age['>'](18)
  }))
  .where(u => u.active)
  .debug()
  .execute(db)

console.log("result", result);
`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          <li>
            Explore the{" "}
            <a
              href="/api/index.html"
              className="text-blue-400 hover:text-blue-300"
            >
              API Reference
            </a>{" "}
            for detailed documentation
          </li>
          <li>
            Try the{" "}
            <a href="/play" className="text-blue-400 hover:text-blue-300">
              Interactive Playground
            </a>{" "}
            to experiment with queries
          </li>
        </ul>
      </section>
    </div>
  );
}
