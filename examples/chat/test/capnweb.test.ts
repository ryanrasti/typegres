import { describe, it, expect } from "vitest";
import { env } from "cloudflare:test";
import { newWebSocketRpcSession } from "capnweb";
import { doRpc, type ShimStub } from "typegres/capnweb";
import type { ChatApi, Room, User } from "../src/capabilities";

// Cap'n Web over a real WebSocket. Client authors typegres queries as
// closures that replay server-side against the DO's SQLite, gated by the
// @expose capability graph. Session root is ChatApi; auth is userByName().

const connect = async (doId: string): Promise<ShimStub<ChatApi>> => {
  const resp = await env.CHAT.get(env.CHAT.idFromName(doId)).fetch("http://chat/", {
    headers: { Upgrade: "websocket" },
  });
  const ws = resp.webSocket!;
  ws.accept();
  return newWebSocketRpcSession(ws) as unknown as ShimStub<ChatApi>;
};

const asUser = async (root: ShimStub<ChatApi>, name: string): Promise<ShimStub<User>> =>
  (await doRpc(root, (api) => api.userByName(name))) as unknown as ShimStub<User>;

describe("Cap'n Web over WebSocket", () => {
  it("client authors typegres queries that replay in the DO", async () => {
    using root = await connect("room-demo");
    using alice = await asUser(root, "alice");

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
        // room(id) returns Promise<Room> in the type; capnweb pipelines the
        // call on the eventual Room, so bridge the type with a cast.
        (u.room(r!.id) as unknown as Room)
          .messages()
          .select(({ messages }) => ({ body: messages.body }))
          .execute(u.conn),
      ),
    );
    expect(messages).toEqual([{ body: "hello from alice" }]);
  });

  it("joinRoom is idempotent: re-joining a room you already belong to doesn't throw", async () => {
    using root = await connect("rejoin");
    using alice = await asUser(root, "alice");
    using room = await doRpc(alice, (u) => u.createRoom("general"));
    const [{ id }] = await doRpc(alice, (u) =>
      u.rooms().select(({ rooms }) => ({ id: rooms.id })).execute(u.conn),
    );
    // createRoom already made alice a member; joining again must be a no-op,
    // not a UNIQUE-constraint failure on room_members.
    await expect(doRpc(alice, (u) => u.joinRoom(id))).resolves.toBeDefined();
    void room;
  });

  it("allRooms lists the public directory so another user can discover and join", async () => {
    using root = await connect("directory");
    using alice = await asUser(root, "alice");
    using room = await doRpc(alice, (u) => u.createRoom("general"));
    await room.post("hi, anyone here?");

    using bob = await asUser(root, "bob");
    // bob isn't a member, so rooms() is empty but allRooms() shows the room.
    const mine = await doRpc(bob, (u) => u.rooms().select(({ rooms }) => ({ id: rooms.id })).execute(u.conn));
    expect(mine).toEqual([]);
    const dir = await doRpc(bob, (u) =>
      u.allRooms().select(({ rooms }) => ({ id: rooms.id, name: rooms.name })).execute(u.conn),
    );
    expect(dir).toEqual([{ id: expect.any(Number), name: "general" }]);

    // bob joins the discovered room, then can read its messages with a
    // client-authored query (no server-side feed() wrapper).
    await doRpc(bob, (u) => u.joinRoom(dir[0]!.id));
    const feed = await doRpc(bob, (u) =>
      (u.room(dir[0]!.id) as unknown as Room)
        .messages()
        .select(({ messages }) => ({ body: messages.body }))
        .execute(u.conn),
    );
    expect(feed).toEqual([{ body: "hi, anyone here?" }]);
  });

  it("@expose gates the surface over the wire: a non-member can't reach a room", async () => {
    using root = await connect("gating");
    using alice = await asUser(root, "alice");
    using room = await doRpc(alice, (u) => u.createRoom("private"));
    await room.post("secret");
    const [{ id: roomId }] = await doRpc(alice, (u) =>
      u.rooms().select(({ rooms }) => ({ id: rooms.id })).where(({ rooms }) => rooms.name.eq("private")).execute(u.conn),
    );

    using bob = await asUser(root, "bob");
    // bob is not a member -> room(id) rejects at the server, over the wire.
    await expect(doRpc(bob, (u) => u.room(roomId))).rejects.toThrow(/not a member/);
    void room;
  });
});
