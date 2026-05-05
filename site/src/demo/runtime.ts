// Boots PGlite + typegres in the browser, runs migrations + seed.
// Uses top-level await so schema files can import a ready `db` and
// define tables at module-eval time.

import { typegres } from "typegres";
import { runMigrations, runSeed } from "./seed";
import type { OperatorRoot } from "./server/api";

export const db = await typegres<OperatorRoot>({ type: "pglite" });

await runMigrations(db);
await runSeed(db);

// `.live(qb)` requires the bus — installs the live-events table and
// starts polling. Without it `db.live()` throws.
await db.startLive();
