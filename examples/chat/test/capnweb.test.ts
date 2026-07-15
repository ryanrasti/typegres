import { describe, it, expect } from "vitest";
import { env } from "cloudflare:test";
import { newWebSocketRpcSession } from "capnweb";
import { doRpc, type ShimStub } from "typegres/capnweb";
import type { User } from "../src/capabilities";

// Phase 4 -- the end-to-end showcase. A client connects to the DO over a real
// WebSocket, and authors typegres queries as Cap'n Web closures that replay
// server-side against the DO's SQLite, gated by the @expose capability graph.

const connect = async (doId: string, name: string): Promise<ShimStub<User>> => {
  const resp = await env.CHAT.get(env.CHAT.idFromName(doId)).fetch(
    `http://chat/?user=${name}`,
    { headers: { Upgrade: "websocket" } },
  );
  const ws = resp.webSocket!;
  ws.accept();
  return newWebSocketRpcSession(ws) as unknown as ShimStub<User>;
};

describe("Cap'n Web over WebSocket", () => {
  it("client authors typegres queries that replay in the DO", async () => {
    using alice = await connect("room-demo", "alice");

    // Hand out a Room capability (createRoom runs server-side in the DO).
    using room = await doRpc(alice, (u) => u.createRoom("general"));

    // Post via the Room cap, then read back with a CLIENT-AUTHORED query:
    // .rooms().select(...).execute(conn) is one closure, replayed in the DO.
    const posted = await room.post("hello from alice");
    expect(posted?.body).toBe("hello from alice");

    const rooms = await doRpc(alice, (u) =>
      u.rooms().select(({ rooms }) => ({ name: rooms.name })).execute(u.conn),
    );
    expect(rooms).toEqual([{ name: "general" }]);

    const messages = await doRpc(alice, (u) =>
      u.rooms().select(({ rooms }) => ({ id: rooms.id })).execute(u.conn),
    ).then(([r]) =>
      doRpc(alice, (u) =>
        u
          .room(r!.id)
          .messages()
          .select(({ messages }) => ({ body: messages.body }))
          .execute(u.conn),
      ),
    );
    expect(messages).toEqual([{ body: "hello from alice" }]);
  });

  it("@expose gates the surface over the wire: a non-member can't reach a room", async () => {
    using alice = await connect("gating", "alice");
    using room = await doRpc(alice, (u) => u.createRoom("private"));
    await room.post("secret");
    const [{ id: roomId }] = await doRpc(alice, (u) =>
      u.rooms().select(({ rooms }) => ({ id: rooms.id })).where(({ rooms }) => rooms.name.eq("private")).execute(u.conn),
    );

    using bob = await connect("gating", "bob");
    // bob is not a member -> room(id) rejects at the server, over the wire.
    await expect(doRpc(bob, (u) => u.room(roomId))).rejects.toThrow(/not a member/);
  });
});
