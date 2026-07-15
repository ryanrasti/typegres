import type { Config } from "typegres";

// Points `tg generate` at a local sqlite file produced by
// `npm run generate` (migrate → temp db → tg generate). Not used at runtime
// by the Durable Object — the DO runs migrate() against its own SqlStorage.
export default {
  dialect: "sqlite",
  db: "./.tg-schema.sqlite",
  tables: "src/tables",
  dbImport: "../db",
} satisfies Config;
