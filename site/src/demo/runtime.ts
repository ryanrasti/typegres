// Boots PGlite + typegres in the browser, runs migrations + seed.
// Uses top-level await so schema files can import a ready `db` and
// define tables at module-eval time.

import { typegres } from "typegres";
import { runMigrations, runSeed } from "./seed";
import type { UserRoot } from "./server/api";

export const { db, conn } = await typegres<UserRoot>({ type: "pglite" });

await runMigrations(conn);
await runSeed(conn);

// `installLiveEvents` is a one-time DDL — production callers run it as
// part of their migrations. The demo's storage doesn't survive page
// reloads, so we run it on every boot. `startLive` then assumes the
// events table exists and only spins up the polling bus.
await conn.installLiveEvents();
await conn.startLive();
