// Import the typegres library
import { typegres } from "typegres";

// Define a simple schema for demonstration
const createSchema = async (tg: any) => {
  await tg.execute`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      isActive BOOLEAN DEFAULT true
    )
  `;
  
  // Insert some sample data
  await tg.execute`
    INSERT INTO users (name, age, isActive)
    VALUES 
      ('Alice', 25, true),
      ('Bob', 17, false),
      ('Charlie', 16, true)
    ON CONFLICT DO NOTHING
  `;
};

const main = async () => {
  const tg = await typegres({
    type: "pglite", // Using PGlite for easy local execution
  });

  // Create schema and sample data
  await createSchema(tg);

  // Import the generated table
  const { db } = await import("typegres");
  const { users } = db;

  // Run the example from the README
  const activeUsers = await users
    .select((u) => ({
      upper: u.name.upper(),
      isAdult: u.age[">"](18),
    }))
    .where((u) => u.isActive)
    .execute(tg);

  console.log("Active users:");
  console.log(activeUsers);
  // Output: [{ upper: 'ALICE', isAdult: true }, { upper: 'CHARLIE', isAdult: false }]

  // Close the connection
  await tg.end();
};

main().catch(console.error);