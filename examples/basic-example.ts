// Import the typegres library
import { typegres, Typegres } from "typegres";

// Define a simple schema for demonstration
const createSchema = async (tg: Typegres) => {
  await tg.sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      isActive BOOLEAN DEFAULT true
    )
  `.execute();
};

const main = async () => {
  const tg = await typegres({
    type: "pglite", // Using PGlite for easy local execution
  });

  // Create schema
  await createSchema(tg);

  // Insert sample data using raw SQL
  console.log("Inserting sample data...");
  await tg.sql`
    INSERT INTO users (name, age, isActive)
    VALUES 
      ('Alice', 25, true),
      ('Bob', 17, false),
      ('Charlie', 16, true)
  `.execute();

  // Query active users using raw SQL
  const activeUsers = await tg.sql<{ upper: string; isAdult: boolean }>`
    SELECT 
      UPPER(name) as upper,
      age > 18 as isAdult
    FROM users
    WHERE isActive = true
  `.execute();

  console.log("\nActive users:");
  console.log(activeUsers);
  // Output: [{ upper: 'ALICE', isAdult: true }, { upper: 'CHARLIE', isAdult: false }]

  // Update example: Give everyone younger than 20 a year older
  console.log("\nUpdating ages...");
  await tg.sql`
    UPDATE users
    SET age = age + 1
    WHERE age < 20
  `.execute();

  // Query all users to see the changes
  const allUsers = await tg.sql<{ name: string; age: number; isActive: boolean }>`
    SELECT name, age, isActive
    FROM users
    ORDER BY name
  `.execute();

  console.log("\nAll users after update:");
  console.log(allUsers);

  // Close the connection
  await tg.end();
};

main().catch(console.error);