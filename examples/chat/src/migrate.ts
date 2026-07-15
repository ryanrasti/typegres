import { sql, type Connection } from "typegres/core";

// Idempotent schema creation. SqlStorage.exec runs one statement, so each
// CREATE TABLE is issued separately. Run once per DO in its init.
//
// Source of truth for the on-disk shape used by `tg generate` (see
// scripts/generate-schema.mjs): apply this same DDL to a temp better-sqlite3
// file, then introspect.
export const migrate = async (conn: Connection): Promise<void> => {
  await conn.execute(sql`CREATE TABLE IF NOT EXISTS users (
    id   INTEGER PRIMARY KEY,
    name TEXT NOT NULL
  )`);
  await conn.execute(sql`CREATE TABLE IF NOT EXISTS rooms (
    id         INTEGER PRIMARY KEY,
    name       TEXT NOT NULL,
    created_by INTEGER NOT NULL REFERENCES users(id)
  )`);
  await conn.execute(sql`CREATE TABLE IF NOT EXISTS room_members (
    room_id INTEGER NOT NULL REFERENCES rooms(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    PRIMARY KEY (room_id, user_id)
  )`);
  await conn.execute(sql`CREATE TABLE IF NOT EXISTS messages (
    id         INTEGER PRIMARY KEY,
    room_id    INTEGER NOT NULL REFERENCES rooms(id),
    user_id    INTEGER NOT NULL REFERENCES users(id),
    body       TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`);
};

// Raw SQL for the better-sqlite3 generate path (db.exec accepts multi-statement).
export const MIGRATE_SQL = `
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
