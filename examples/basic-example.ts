// Example from the README showcasing typegres features
import { typegres, values, Text, Int4, Bool } from "typegres";
import { db, createSchema } from "./schema";

const main = async () => {
  const tg = await typegres({
    type: "pglite", // Using PGlite for easy local execution
  });

  // Create schema and sample data
  await createSchema(tg);

  // The sample data is already in the database from createSchema
  // Let's just run the query from the README

  // Run the query from the README
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

  await tg.end();
};

main().catch(console.error);