import type { Config } from "typegres";

export default {
  db: process.env["DATABASE_URL"] ?? "postgres://localhost/ops_demo",
  tables: "src/schema",
  dbImport: "../db",
} satisfies Config;
