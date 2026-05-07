// `tg generate` introspects the database at $DATABASE_URL and writes
// table classes into `src/demo/schema/`. Existing files with
// `// @generated-start` / `// @generated-end` markers have their
// generated block refreshed; everything outside the markers (custom
// methods, the `transformer:` arg on `db.Table`, hand-added imports)
// is preserved.
//
// Workflow: edit the DDL in `src/demo/seed.ts`, then `npm run
// regen-schema` (drops + recreates a temp DB, applies migrations,
// runs codegen).

import type { Config } from "typegres";

export default {
  db: process.env["DATABASE_URL"] ?? "postgres://localhost/postgres",
  tables: "src/demo/schema",
  dbImport: "../runtime",
} satisfies Config;
