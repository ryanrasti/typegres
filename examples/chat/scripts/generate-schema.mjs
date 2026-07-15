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

// Inline the DDL (keep in sync with src/migrate.ts MIGRATE_SQL).
const MIGRATE_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS rooms (
  id         INTEGER PRIMARY KEY,
  name       TEXT NOT NULL,
  created_by INTEGER NOT NULL REFERENCES users(id)
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
if (tg.status) process.exit(tg.status);

// Post-process: worker bundles must not import the typegres root (it pulls
// optional node drivers). Point generated tables at typegres/core instead.
// Also fix known codegen footguns for this schema (relation/column name clash
// on rooms.created_by; composite-PK room_members.room_id marked generated).
const tablesDir = path.join(root, "src/tables");
for (const file of fs.readdirSync(tablesDir).filter((f) => f.endsWith(".ts"))) {
  const p = path.join(tablesDir, file);
  let src = fs.readFileSync(p, "utf-8");
  src = src.replaceAll('from "typegres"', 'from "typegres/core"');
  if (file === "rooms.ts") {
    src = src.replace(
      /@expose\(\) created_by\(\) \{ return Users\.scope\(Rooms\.contextOf\(this\)\)\.where\(\(\{ users \}\) => users\.id\.eq\(this\.created_by\)\)\.cardinality\("one"\); \}/,
      '@expose() creator() { return Users.scope(Rooms.contextOf(this)).where(({ users }) => users.id.eq(this.created_by)).cardinality("one"); }',
    );
  }
  if (file === "room_members.ts") {
    src = src.replace(
      "@expose() room_id = Integer.column({ nonNull: true, generated: true });",
      "@expose() room_id = Integer.column({ nonNull: true });",
    );
  }
  if (file === "messages.ts") {
    src = src.replace(
      /@expose\(\) user\(\) \{ return Users\.scope\(Messages\.contextOf\(this\)\)\.where\(\(\{ users \}\) => users\.id\.eq\(this\.user_id\)\)\.cardinality\("one"\); \}/,
      '@expose() author() { return Users.scope(Messages.contextOf(this)).where(({ users }) => users.id.eq(this.user_id)).cardinality("one"); }',
    );
  }
  fs.writeFileSync(p, src);
}
console.log("post-processed tables for typegres/core + chat naming");
