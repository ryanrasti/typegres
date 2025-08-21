import { ColumnType, Generated, Kysely } from "kysely";

type Person = {
  id: Generated<number>;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  createdAt: ColumnType<Date, string | undefined, never>;
};

type Pet = {
  id: Generated<number>;
  name: string;
  ownerId: number;
  species: string;
  age: number;
};

type User = {
  id: Generated<number>;
  name: string;
  email: string;
  active?: number;
  role?: string;
  mood?: "happy" | "sad" | "neutral";
};

export type SeedDatabase = {
  person: Person;
  pet: Pet;
  users: User;
};

export const testSeeds = async (db: Kysely<SeedDatabase>) => {
  const results = await db
    .insertInto("person")
    .values([
      {
        firstName: "John",
        lastName: "Doe",
        gender: "male",
      },
      {
        firstName: "Jane",
        lastName: "Doe",
        gender: "female",
      },
      {
        firstName: "Alice",
        lastName: "Smith",
        gender: "female",
      },
    ])
    .returningAll()
    .execute();

  for (const result of results) {
    await db
      .insertInto("pet")
      .values([
        {
          name: `${result.firstName}'s pet`,
          ownerId: result.id,
          species: "dog",
          age: result.firstName == "John" ? 1 : result.firstName === "Alice" ? 2 : 3,
        },
      ])
      .execute();
  }

  // Seed users with mood enum values
  await db
    .insertInto("users")
    .values([
      {
        name: "Happy User",
        email: "happy@example.com",
        active: 1,
        role: "user",
        mood: "happy",
      },
      {
        name: "Sad User",
        email: "sad@example.com",
        active: 1,
        role: "user",
        mood: "sad",
      },
      {
        name: "Neutral User",
        email: "neutral@example.com",
        active: 1,
        role: "admin",
        mood: "neutral",
      },
      {
        name: "No Mood User",
        email: "nomood@example.com",
        active: 1,
        role: "user",
        // mood is null
      },
    ])
    .execute();
};
