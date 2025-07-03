import { typegres, Int8, Float8, Text, Jsonb, values } from "typegres";

const db = await typegres({ type: "pglite" });

// Example 1: Grouping and Aggregation
export const pets = values(
  { species: Text.new("cat"), age: Float8.new(2), id: Int8.new(1n) },
  { species: Text.new("dog"), age: Float8.new(3), id: Int8.new(2n) },
  { species: Text.new("dog"), age: Float8.new(10), id: Int8.new(3n) }
);

export const example1 = await pets
  .groupBy((p) => [p.species] as const)
  .select((p, [species]) => ({
    species,
    avgAge: p.age.avg(),
    total: p.id.count(),
    note: species.textcat("s are great!"),
    // uncomment to see a type error:
    // error: p.age,
  }))
  .execute(db);

console.log("Example 1", example1);

// Example 2: Jsonb & Set Returning
export const example2 = await Jsonb.new('{"a":1,"b":2, "c": [1, 2, 3]}')
  .jsonbEach()
  .select(({ key, value }) => ({
    key: key.textcat("!"),
    isNum: value.jsonbTypeof()["="]("number"),
  }))
  .execute(db);

console.log("Example 2", example2);

// Example 3: inline values join:
export const people = values(
  { id: Int8.new(1n), name: Text.new("Alice"), petId: Int8.new(1n) },
  { id: Int8.new(2n), name: Text.new("Bob"), petId: Int8.new(2n) },
  { id: Int8.new(3n), name: Text.new("Charlie"), petId: Int8.new(3n) }
);

export const example3 = await people
  .join(pets, "pet", (p, { pet }) => p.petId["="](pet.id))
  .select((p, { pet }) => ({
    personName: p.name,
    petSpecies: pet.species,
    petAge: pet.age,
  }))
  .execute(db);

console.log("Example 3", example3);
