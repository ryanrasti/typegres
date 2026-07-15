import { describe, it, expect } from "vitest";
import { env, runInDurableObject } from "cloudflare:test";
import type { ChatDo } from "../src/index";
import { Users } from "../src/tables/users";
import { Rooms } from "../src/tables/rooms";
import { RoomMembers } from "../src/tables/room_members";
import { Messages } from "../src/tables/messages";

// Phase 2 -- the 4-table chat schema, migrated by the DO on init, exercised
// through typegres inserts + a multi-table join, all inside the DO's SQLite.

describe("chat schema in the DO", () => {
  it("inserts users/rooms/members/messages and joins messages to their authors", async () => {
    const stub = env.CHAT.get(env.CHAT.idFromName("phase2"));
    const rows = await runInDurableObject(stub, async (instance: ChatDo) => {
      const conn = instance.conn; // migrated in the DO constructor

      const [alice] = await Users.insert({ name: "alice" }).returning(({ users }) => ({ id: users.id })).execute(conn);
      const [bob] = await Users.insert({ name: "bob" }).returning(({ users }) => ({ id: users.id })).execute(conn);
      const [room] = await Rooms.insert({ name: "general", created_by_user_id: alice!.id }).returning(({ rooms }) => ({ id: rooms.id })).execute(conn);

      await RoomMembers.insert({ room_id: room!.id, user_id: alice!.id }, { room_id: room!.id, user_id: bob!.id }).execute(conn);
      await Messages.insert(
        { room_id: room!.id, user_id: alice!.id, body: "hi" },
        { room_id: room!.id, user_id: bob!.id, body: "yo" },
      ).execute(conn);

      return Messages.from()
        .join(Users, ({ messages, users }) => messages.user_id.eq(users.id))
        .where(({ messages }) => messages.room_id.eq(room!.id))
        .select(({ messages, users }) => ({ author: users.name, body: messages.body }))
        .orderBy(({ messages }) => messages.id)
        .execute(conn);
    });

    expect(rows).toEqual([
      { author: "alice", body: "hi" },
      { author: "bob", body: "yo" },
    ]);
  });
});
