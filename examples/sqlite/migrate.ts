// Drops + recreates the SQLite schema at ./dev.db by running every
// migration file under ./migrations/*.sql. `tg generate` reads
// ./dev.db to introspect the resulting schema.

import Database from "better-sqlite3";
import * as fs from "node:fs";
import * as path from "node:path";

// Fresh file each run so DROP TABLE isn't needed inside the SQL.
const dbPath = "./dev.db";
if (fs.existsSync(dbPath)) { fs.unlinkSync(dbPath); }

const db = new Database(dbPath);
db.pragma("foreign_keys = ON");

const migrationsDir = path.resolve(import.meta.dirname, "migrations");
const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith(".sql")).sort();

for (const file of files) {
  const sqlText = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
  console.log(`Running ${file}...`);
  db.exec(sqlText);
}

db.close();
console.log(`Migrated ${dbPath}`);
