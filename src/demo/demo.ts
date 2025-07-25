import { Float8, Int8, Jsonb, Text, typegres, values } from "typegres";

const tg = await typegres({ type: "pglite" });

// Example 1: Grouping and Aggregation
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
    stddev: p.age.stddevPop(),
    total: p.id.count(),
    note: species.textcat("s are great!"),
    // uncomment to see a type error:
    // error: p.age,
  }))
  .debug()
  .execute(tg);

console.log("Example 1", example1);

// Example 2: Jsonb & Set Returning
const example2 = await Jsonb.new('{"a":1,"b":2, "c": [1, 2, 3]}')
  .jsonbEach()
  .select(({ key, value }) => ({
    key: key.textcat("!"),
    isNum: value.jsonbTypeof()["="]("number"),
  }))
  .debug()
  .execute(tg);

console.log("Example 2", example2);

// Example 3: inline values join:
const people = values(
  { id: Int8.new(1n), name: Text.new("Alice"), petId: Int8.new(1n) },
  { id: Int8.new(2n), name: Text.new("Bob"), petId: Int8.new(2n) },
  { id: Int8.new(3n), name: Text.new("Charlie"), petId: Int8.new(3n) }
);

const example3 = await people
  .join(pets, "pet", (p, { pet }) => p.petId["="](pet.id))
  .select((p, { pet }) => ({
    personName: p.name,
    petSpecies: pet.species,
    petAge: pet.age,
  }))
  .debug()
  .execute(tg);

console.log("Example 3", example3);

// Example 4: Math coverage (https://x.com/dshukertjr/status/1948730454535798799)
import { sin, cos, exp, ln, tan, abs, sqrt } from "typegres";
const homework = await values({
  x: Float8.new(1.5),
  y: Float8.new(0.7),
})
  .select(({ x, y }) => ({
    result: sin(x)
      ["+"](cos(y))
      ["/"](ln(x.power(2)["+"](1))["+"](1))
      .power(2)
      ["+"](
        exp(Float8.new(0)["-"](y.power(2)))["*"](
          sqrt(abs(tan(x["*"](y)))["+"](1))
        )
      ),
  }))
  .debug()
  .execute(tg);

console.log("Example 4", homework);
