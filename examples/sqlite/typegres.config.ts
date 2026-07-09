import type { Config } from "typegres";

export default {
  dialect: "sqlite",
  db: "./dev.db",
  tables: "src/tables",
  dbImport: "../db",
} satisfies Config;
