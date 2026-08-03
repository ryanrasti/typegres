import { typegres } from "typegres";
import { SqliteDriver } from "typegres/drivers/sqlite";

// Synchronous end to end — no top-level await: `typegres()` is a
// module-load-safe schema handle, and better-sqlite3 opens the database on
// construction. The tests use `:memory:` (`SqliteDriver.create()`'s default
// when no filename is given) so each
// vitest run is hermetic; the `tg generate` CLI reads schema from the
// `./dev.db` file produced by `npm run migrate`.
export const db = typegres();
export const conn = db.connect(SqliteDriver.create());
