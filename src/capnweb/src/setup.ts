import { migrate } from "./migrate";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Runs end-to-end setup against an in-memory PGlite instance:
 * - starts Typegres with PGlite
 * - runs migrations
 * - introspects schema, writes generated models.ts to ./models.ts
 * - returns the models.ts content
 */
export const setup = async () => {
  const { typegres } = await import("../../db.ts");
  const Gen = await import("../../cli/generateModels.ts");
  const { Pool } = await import("pg");
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  process.chdir(scriptDir);
  const tg = await typegres({
    type: "pg",
    PoolClass: Pool,
    config: {
      host: "localhost",
      port: 1234,
      user: "postgres",
      password: "postgres",
      database: "capnweb-demo",
    },
  });
  await migrate(tg);
  const models = await Gen.generateModelsTsForDb(tg, "public");
  const outPath = path.resolve("./models.ts");
  await writeFile(outPath, models);
  console.log(`Wrote models to: ${outPath}`);
  return models;
};

await setup();


