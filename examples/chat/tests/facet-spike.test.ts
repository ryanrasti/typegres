// SPIKE test: the schema-is-the-API shape from worker/facets.ts, driven
// over a real Cap'n Web session (WebSocketPair) against the real DO.
//
// What this proves end to end:
//   - inline facet classes (X.forY() static methods) hydrate, cross the
//     wire, and work against real DO SQLite;
//   - the membership row is the grant — but only its forPrincipal facet
//     amplifies; base grant-table rows are inert data;
//   - no connection ceremony: .execute()/.hydrate()/.one() resolve the
//     DO's single attached connection;
//   - client-authored refinement still works against facet builders.

import { test, expect } from "vitest";
import { env, runInDurableObject } from "cloudflare:test";
import { newWebSocketRpcSession, type RpcTarget } from "capnweb";
import { doRpc, toRpc, type ShimStub } from "typegres/capnweb";
import { Chat, Users, Memberships } from "../worker/api";
import type { ChatDo } from "../worker/chat-do";

type Principal = InstanceType<ReturnType<typeof Users.forPrincipal>>;

const stub = () => env.CHAT.get(env.CHAT.idFromName("facet-spike"));

// In-DO Cap'n Web session over a WebSocketPair: same wire format and shim
// path as the browser, without routing through the Worker's ChatApi.
const connect = (): ShimStub<Chat> => {
  const pair = new WebSocketPair();
  pair[0].accept();
  pair[1].accept();
  newWebSocketRpcSession(pair[0], toRpc(new Chat()) as RpcTarget);
  return newWebSocketRpcSession(pair[1] as unknown as WebSocket) as unknown as ShimStub<Chat>;
};

test("facet chain: principal → membership grant → member-room, over the wire", async () => {
  await runInDurableObject(stub(), async (_instance: ChatDo) => {
    // login mints a principal-facet row (facet classes are per-mint, so
    // assert against the stable base class).
    const server = await Users.login({ username: "alice", password: "pw" });
    expect(server).toBeInstanceOf(Users);

    const api = connect();
    const alice = (await api.login({ username: "alice", password: "pw" })) as unknown as Principal;

    // createRoom returns the GRANT — a hydrated forPrincipal membership.
    const grant = await alice.createRoom("spike");
    // The grant amplifies: membership.room() → member facet, with post().
    // No conn threading anywhere — terminators resolve the DO's conn.
    const room = await doRpc(alice, () => grant.room().one());

    await doRpc(alice, () => room.post("hello from a facet").execute());

    // Client-authored refinement over a facet builder.
    const feed = await doRpc(alice, () =>
      room
        .messages()
        .select(({ messages, users }) => ({ body: messages.body, author: users.name }))
        .orderBy(({ messages }) => messages.id)
        .execute(),
    );
    expect(feed).toEqual([{ body: "hello from a facet", author: "alice" }]);

    // Identity was stamped from the proof row, not from client input.
    const authors = await doRpc(alice, () =>
      room
        .members()
        .select(({ users }) => ({ name: users.name }))
        .execute(),
    );
    expect(authors).toEqual([{ name: "alice" }]);
  });
});

test("attenuation floor: base rows are inert — directory rooms can't post, base memberships can't amplify", async () => {
  await runInDurableObject(stub(), async (_instance: ChatDo) => {
    const api = connect();
    const alice = (await api.login({ username: "alice", password: "pw" })) as unknown as Principal;
    const grant = await alice.createRoom("floor");
    const room = await doRpc(alice, () => grant.room().one());

    // Directory rows are base Rooms: same table, no post/messages members.
    const dir = await doRpc(alice, (u) => u.directory().hydrate());
    expect(dir.length).toBeGreaterThan(0);
    const dirRoom = dir[0]! as unknown as { post?: unknown };
    expect(await (dirRoom.post as Promise<unknown>)).toBeUndefined();
    await expect(
      doRpc(alice, () =>
        (dirRoom as { post: (b: string) => { execute: () => unknown } }).post("x").execute(),
      ),
    ).rejects.toThrow();

    // BASE grant-table rows are data only: even hydrated server-side with
    // full authority, there is no room() to call — amplification lives
    // exclusively on the forPrincipal facet.
    const [raw] = await Memberships.from()
      .where(({ room_members }) => room_members.user_id.eq(1))
      .hydrate();
    expect((raw as { room?: unknown }).room).toBeUndefined();

    // members() hydrates USERS rows (primary table) — also inert.
    const memberRows = await doRpc(alice, () => room.members().hydrate());
    const other = memberRows[0]! as unknown as { room?: Promise<unknown> };
    expect(await other.room).toBeUndefined();
  });
});

test("second user: join via directory, post, both visible", async () => {
  await runInDurableObject(stub(), async (_instance: ChatDo) => {
    const api = connect();
    const alice = (await api.login({ username: "alice", password: "pw" })) as unknown as Principal;
    const aliceGrant = await alice.createRoom("shared");
    const aliceRoom = await doRpc(alice, () => aliceGrant.room().one());
    await doRpc(alice, () => aliceRoom.post("hi from alice").execute());

    const bob = (await connect().login({ username: "bob", password: "pw" })) as unknown as Principal;
    const dir = await doRpc(bob, (u) =>
      u
        .directory()
        .where(({ rooms }) => rooms.name.eq("shared"))
        .select(({ rooms }) => ({ id: rooms.id }))
        .execute(),
    );
    const bobGrant = await bob.joinRoom(dir[0]!.id);
    const bobRoom = await doRpc(bob, () => bobGrant.room().one());
    await doRpc(bob, () => bobRoom.post("hi from bob").execute());

    const feed = await doRpc(bob, () =>
      bobRoom
        .messages()
        .select(({ messages, users }) => ({ body: messages.body, author: users.name }))
        .orderBy(({ messages }) => messages.id)
        .execute(),
    );
    expect(feed).toEqual([
      { body: "hi from alice", author: "alice" },
      { body: "hi from bob", author: "bob" },
    ]);

    // My grants, as a client-authored query over the grant facet.
    const myRooms = await doRpc(bob, (u) =>
      u
        .memberships()
        .select(({ room_members }) => ({ room_id: room_members.room_id }))
        .execute(),
    );
    expect(myRooms).toEqual([{ room_id: dir[0]!.id }]);
  });
});
