// Example demonstrating typegres query builder with manually defined tables
import { typegres, Typegres, database, values, Text, Int4, Bool, Generated } from "typegres";

// Define a simple schema for demonstration
const createSchema = async (tg: Typegres) => {
  await tg.sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      "isActive" BOOLEAN DEFAULT true
    )
  `.execute();
};

const main = async () => {
  const tg = await typegres({
    type: "pglite", // Using PGlite for easy local execution
  });

  // Create schema
  await createSchema(tg);

  // Define the database schema manually
  const db = database({
    users: {
      id: Int4, // id is generated but we still need to specify the type
      name: Text,
      age: Int4,
      isActive: Bool,
    },
  });

  // Insert sample data using typegres query builder
  console.log("Inserting sample data...");
  const insertedUsers = await db.users
    .insert(
      values(
        {
          name: Text.new("Alice"),
          age: Int4.new(25),
          isActive: Bool.new(true),
        },
        {
          name: Text.new("Bob"),
          age: Int4.new(17),
          isActive: Bool.new(false),
        },
        {
          name: Text.new("Charlie"),
          age: Int4.new(16),
          isActive: Bool.new(true),
        }
      )
    )
    .execute(tg);

  console.log("Inserted users:", insertedUsers);

  // Query active users using typegres query builder
  const activeUsers = await db.users
    .select((u) => ({
      upper: u.name.upper(),
      isAdult: u.age[">"](18),
    }))
    .where((u) => u.isActive)
    .execute(tg);

  console.log("\nActive users:");
  console.log(activeUsers);
  // Output: [{ upper: 'ALICE', isAdult: true }, { upper: 'CHARLIE', isAdult: false }]

  // Update example: Give everyone younger than 20 a year older
  console.log("\nUpdating ages...");
  const updatedUsers = await db.users
    .update({
      where: (u) => u.age["<"](20),
    })
    .set((u) => ({
      age: u.age["+"](1),
    }))
    .execute(tg);

  console.log("Updated users:", updatedUsers);

  // Query all users to see the changes
  const allUsers = await db.users
    .select((u) => ({
      name: u.name,
      age: u.age,
      isActive: u.isActive,
    }))
    .execute(tg);

  console.log("\nAll users after update:");
  console.log(allUsers);

  // Close the connection
  await tg.end();
};

main().catch(console.error);