// Boots PGlite + typegres in the browser, runs migrations + seed.
// Uses top-level await so schema files can import a ready `db` and
// define tables at module-eval time.

import { ensurePgLiveEventsTable, typegres } from "typegres";
import { runMigrations, runSeed } from "./seed";
import type { UserRoot } from "./server/api";

export const { db, conn } = await typegres<UserRoot>({ type: "pglite" });

await runMigrations(conn);
await runSeed(conn);

// `ensurePgLiveEventsTable` is a one-time DDL — production callers run it as
// part of their migrations. The demo's storage doesn't survive page
// reloads, so we run it on every boot. The live engine itself is wired
// at attach and its poller starts lazily on first .live() use.
await ensurePgLiveEventsTable(conn);
