import { typegres, select } from "typegres";
import { Users, createSchema } from "./schema";

export const main = async () => {
  const tg = await typegres({
    type: "pglite", // Using PGlite for easy local execution
  });

  // Create schema and sample data
  await createSchema(tg);

  // Run the query from the README
  const activeUsers = await select(
    (u) => ({
      upper: u.name.upper(),
      isAdult: u.age[">"](18),
    }),
    {
      from: Users,
      where: (u) => u.isActive,
    },
  ).execute(tg);

  console.log("\nActive users:");
  console.log(activeUsers);
  // Output: [ { upper: 'ALICE', isAdult: true }, { upper: 'BOB', isAdult: false } ]

  await tg.end();

  return activeUsers;
};

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
