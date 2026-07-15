// migrate → temp sqlite file → tg generate.
// Keeps table classes in sync with the DDL in src/migrate.ts without needing
// a live Durable Object / wrangler path to the DO's SQLite.

import Database from "better-sqlite3";
import { spawnSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dbPath = path.join(root, ".tg-schema.sqlite");

// Keep in sync with src/migrate.ts MIGRATE_SQL.
const MIGRATE_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS rooms (
  id                 INTEGER PRIMARY KEY,
  name               TEXT NOT NULL,
  created_by_user_id INTEGER NOT NULL REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS room_members (
  room_id INTEGER NOT NULL REFERENCES rooms(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  PRIMARY KEY (room_id, user_id)
);
CREATE TABLE IF NOT EXISTS messages (
  id         INTEGER PRIMARY KEY,
  room_id    INTEGER NOT NULL REFERENCES rooms(id),
  user_id    INTEGER NOT NULL REFERENCES users(id),
  body       TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`;

if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
const db = new Database(dbPath);
db.pragma("foreign_keys = ON");
db.exec(MIGRATE_SQL);
db.close();
console.log(`wrote ${dbPath}`);

const tg = spawnSync("npx", ["tg", "generate"], { cwd: root, stdio: "inherit", shell: true });
process.exit(tg.status ?? 1);
