import { sql, type Connection } from "typegres";
import { Users, Rooms, Memberships, Messages } from "./api";

const DDL = [
  `CREATE TABLE IF NOT EXISTS users (
     id            INTEGER PRIMARY KEY AUTOINCREMENT,
     name          TEXT NOT NULL UNIQUE,
     password_hash TEXT NOT NULL
   )`,
  `CREATE TABLE IF NOT EXISTS rooms (
     id                 INTEGER PRIMARY KEY AUTOINCREMENT,
     name               TEXT NOT NULL UNIQUE,
     created_by_user_id INTEGER NOT NULL REFERENCES users(id)
   )`,
  `CREATE TABLE IF NOT EXISTS room_members (
     room_id INTEGER NOT NULL REFERENCES rooms(id),
     user_id INTEGER NOT NULL REFERENCES users(id),
     PRIMARY KEY (room_id, user_id)
   )`,
  `CREATE TABLE IF NOT EXISTS messages (
     id         INTEGER PRIMARY KEY AUTOINCREMENT,
     room_id    INTEGER NOT NULL REFERENCES rooms(id),
     user_id    INTEGER NOT NULL REFERENCES users(id),
     body       TEXT NOT NULL,
     created_at TEXT NOT NULL DEFAULT (datetime('now'))
   )`,
  `CREATE INDEX IF NOT EXISTS idx_messages_room ON messages(room_id, id)`,
];

export const migrate = async (conn: Connection): Promise<void> => {
  for (const stmt of DDL) {
    await conn.execute(sql.raw(stmt));
  }
  await seed(conn);
};

// Seed a lobby so the first visitor doesn't land in an empty app. The
// seed user's "hash" is not a valid PBKDF2 record, so nobody can log in
// as it.
const seed = async (conn: Connection): Promise<void> => {
  const rooms = await Rooms.from()
    .select(({ rooms }) => ({ id: rooms.id }))
    .limit(1)
    .execute(conn);
  if (rooms.length > 0) {
    return;
  }

  const [greeter] = await Users.insert({
    name: "typegres-bot",
    password_hash: `unloginable:${crypto.randomUUID()}`,
  })
    .returning(({ users }) => ({ id: users.id }))
    .execute(conn);
  const [lobby] = await Rooms.insert({
    name: "lobby",
    created_by_user_id: greeter!.id,
  })
    .returning(({ rooms }) => ({ id: rooms.id }))
    .execute(conn);
  await Memberships.insert({ room_id: lobby!.id, user_id: greeter!.id }).execute(conn);
  await Messages.insert(
    {
      room_id: lobby!.id,
      user_id: greeter!.id,
      body: "Welcome! Every query in this app is authored in your browser and replayed inside a Durable Object against the capability you were granted.",
    },
    {
      room_id: lobby!.id,
      user_id: greeter!.id,
      body: "Watch the wire panel below to see every query your browser authors — or author your own at its ❯ prompt (user and room are in scope).",
    },
  ).execute(conn);
};
