import { typegres } from "../../index";
import { migrate } from "./migrate";
import { generateModelsTsForDb } from "../../cli/generateModels.ts";
import { writeFile } from "node:fs/promises";

/**
 * Runs end-to-end setup against an in-memory PGlite instance:
 * - starts Typegres with PGlite
 * - runs migrations
 * - introspects schema, writes generated models.ts to ./models.ts
 * - returns the models.ts content
 */
export const setup = async () => {
  const tg = await typegres({ type: "pglite" });
  await migrate(tg);
  const models = await generateModelsTsForDb(tg, "public");
  await writeFile(new URL("./models.ts", import.meta.url), models);
  return models;
};


