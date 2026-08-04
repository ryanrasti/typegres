// Apply the demo's DDL to a real Postgres at $DATABASE_URL so
// `tg generate` has a live schema to introspect. Reuses the same
// `runMigrations` the in-browser PGlite calls at boot — single
// source of truth for the schema.

import { typegres } from "typegres";
import { PgDriver } from "typegres/drivers/pg";
import { runMigrations } from "./src/demo/seed.ts";

const db = typegres();
const conn = db.connect(
  PgDriver.create(process.env["DATABASE_URL"] ?? "postgres://localhost/postgres"),
);

console.log("Applying migrations...");
// `conn` here is `Connection<undefined>` (no principal type plumbed
// through a bare `typegres()`); runMigrations only uses .execute, so the
// cast through unknown is safe.
await runMigrations(conn as unknown as Parameters<typeof runMigrations>[0]);
console.log("Done.");
