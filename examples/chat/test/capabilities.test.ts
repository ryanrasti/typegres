import { describe, it, expect } from "vitest";
import { env, runInDurableObject } from "cloudflare:test";
import type { ChatDo } from "../src/index";
import { ChatApi } from "../src/capabilities";

// The capability graph, exercised in-process (no wire yet). Proves the
// authorization logic: you only reach a Room through User, and only as a
// member. Cap'n Web then gates the SAME graph over the wire.

describe("capability graph (in-process)", () => {
  it("createRoom + post + read; a non-member is denied a room cap until they join", async () => {
    const stub = env.CHAT.get(env.CHAT.idFromName("phase3"));
    const result = await runInDurableObject(stub, async (i: ChatDo) => {
      const conn = i.conn;
      const api = new ChatApi(conn);
      const alice = await api.userByName("alice");
      const bob = await api.userByName("bob");

      const room = await alice.createRoom("general");
      await room.post("hi from alice");
      await room.post("still alice");

      const aliceView = await room
        .messages()
        .select(({ messages }) => ({ body: messages.body }))
        .orderBy(({ messages }) => messages.id)
        .execute(conn);
      const aliceRooms = await alice.rooms().select(({ rooms }) => ({ name: rooms.name })).execute(conn);

      // bob is not a member -> room(id) rejects (authorization at grant time)
      let bobDenied = false;
      try {
        await bob.room(room.id);
      } catch {
        bobDenied = true;
      }

      // bob joins, then can post + read
      const bobRoom = await bob.joinRoom(room.id);
      await bobRoom.post("hi from bob");
      const bobView = await bobRoom
        .messages()
        .select(({ messages }) => ({ body: messages.body }))
        .orderBy(({ messages }) => messages.id)
        .execute(conn);

      return { aliceView, aliceRooms, bobDenied, bobView };
    });

    expect(result.aliceView).toEqual([{ body: "hi from alice" }, { body: "still alice" }]);
    expect(result.aliceRooms).toEqual([{ name: "general" }]);
    expect(result.bobDenied).toBe(true);
    expect(result.bobView).toEqual([
      { body: "hi from alice" },
      { body: "still alice" },
      { body: "hi from bob" },
    ]);
  });
});
