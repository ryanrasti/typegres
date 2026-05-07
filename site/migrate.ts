// Apply the demo's DDL to a real Postgres at $DATABASE_URL so
// `tg generate` has a live schema to introspect. Reuses the same
// `runMigrations` the in-browser PGlite calls at boot — single
// source of truth for the schema.

import { typegres } from "typegres";
import { runMigrations } from "./src/demo/seed.ts";

const db = await typegres({
  type: "pg",
  connectionString: process.env["DATABASE_URL"] ?? "postgres://localhost/postgres",
});

console.log("Applying migrations...");
// `db` here is `Database<undefined>` (no principal type plumbed
// through `typegres({ type: "pg" })`); runMigrations only uses
// .execute, so the cast through unknown is safe.
await runMigrations(db as unknown as Parameters<typeof runMigrations>[0]);
console.log("Done.");
