// The demo's confinement claims, as executable tests, over the real wire:
// a Cap'n Web WebSocket through the Worker's /ws route into the Durable
// Object — exactly like the browser.
//
// The attenuation tests use the same connection and the same granted stubs,
// but closures the UI would never author — confirming that what a client can
// reach is exactly what its grants scoped, not a matter of the UI's
// good behavior.

import { describe, test, expect, expectTypeOf, vi } from "vitest";
import { SELF } from "cloudflare:test";
import { newWebSocketRpcSession } from "capnweb";
import { byRef, doRpc, type ShimStub } from "typegres/capnweb";
import type { Chat, Users, Rooms, Memberships } from "../worker/api";

type Principal = InstanceType<ReturnType<typeof Users.forPrincipal>>;
type Grant = InstanceType<ReturnType<typeof Memberships.forPrincipal>>;
type MemberRoom = InstanceType<ReturnType<typeof Rooms.forMember>>;

const connect = async (): Promise<ShimStub<Chat>> => {
  const resp = await SELF.fetch("https://chat.local/ws", {
    headers: { Upgrade: "websocket" },
  });
  expect(resp.status).toBe(101);
  const ws = resp.webSocket!;
  ws.accept();
  return newWebSocketRpcSession(ws as unknown as WebSocket) as unknown as ShimStub<Chat>;
};

const login = async (username: string, password = "hunter2"): Promise<Principal> => {
  const api = await connect();
  return await api.login({ username, password });
};

const openRoom = async (user: Principal, grant: Grant): Promise<MemberRoom> =>
  doRpc(user, () => grant.room().one());

describe("grants (the happy path)", () => {
  test("login → createRoom → post → client-authored feed query", async () => {
    const alice = await login("alice");
    const grant = await alice.createRoom("plans");
    const room = await openRoom(alice, grant);

    await doRpc(alice, () => room.post("first!").execute());

    const feed = await doRpc(alice, () =>
      room
        .messages()
        .select(({ messages, users }) => ({ body: messages.body, author: users.name }))
        .orderBy(({ messages }) => messages.id)
        .execute(),
    );
    // DX: the FE gets exactly-typed rows from a client-authored select.
    // (toExtend, not toEqualTypeOf, because doRpc's Stubbed<> wrapper adds a
    // cosmetic `& Disposable` to results — assignable to the clean shape, so
    // field access and assignment work, but not exact-equal.)
    expectTypeOf(feed).toExtend<{ body: string; author: string }[]>();
    expect(feed).toEqual([{ body: "first!", author: "alice" }]);
  });

  test("directory → join → post from a second user; join is idempotent", async () => {
    const alice = await login("alice");
    const aliceGrant = await alice.createRoom("public-square");
    const aliceRoom = await openRoom(alice, aliceGrant);
    await doRpc(alice, () => aliceRoom.post("hi from alice").execute());

    const bob = await login("bob");
    const dir = await doRpc(bob, (u) =>
      u
        .directory()
        .select(({ rooms }) => ({ id: rooms.id, name: rooms.name }))
        .execute(),
    );
    const target = dir.find((r) => r.name === "public-square")!;
    await bob.joinRoom(target.id);
    const bobGrant = await bob.joinRoom(target.id); // idempotent
    const bobRoom = await openRoom(bob, bobGrant);
    await doRpc(bob, () => bobRoom.post("hi from bob").execute());

    const authors = await doRpc(bob, () =>
      bobRoom
        .members()
        .select(({ users }) => ({ name: users.name }))
        .orderBy(({ users }) => users.name)
        .execute(),
    );
    expect(authors.map((m) => m.name)).toEqual(["alice", "bob"]);
  });

  test("client-authored aggregation over a granted builder", async () => {
    const alice = await login("alice");
    const aliceRoom = await openRoom(alice, await alice.createRoom("stats"));
    await doRpc(alice, () => aliceRoom.post("one").execute());
    await doRpc(alice, () => aliceRoom.post("two").execute());

    const bob = await login("bob");
    const dir = await doRpc(bob, (u) =>
      u.directory().where(({ rooms }) => rooms.name.eq("stats")).select(({ rooms }) => ({ id: rooms.id })).execute(),
    );
    const bobGrant = await bob.joinRoom(dir[0]!.id);
    const bobRoom = await openRoom(bob, bobGrant);
    await doRpc(bob, () => bobRoom.post("hi").execute());

    // The server has no "top posters" endpoint; the client composes it —
    // group-by-count ordered by count desc, exactly like the demo's UI.
    const topPosters = await doRpc(alice, () =>
      aliceRoom
        .messages()
        .groupBy(({ users }) => [users.name])
        .select(({ users, messages }) => ({ author: users.name, posts: messages.id.count() }))
        .orderBy(({ messages }) => [messages.id.count(), "desc"])
        .execute(),
    );
    // The aggregation's shape flows through to the FE: string author, number count.
    expectTypeOf(topPosters).toExtend<{ author: string; posts: number }[]>();
    expect(topPosters).toEqual([
      { author: "alice", posts: 2 },
      { author: "bob", posts: 1 },
    ]);
  });

  test("client-authored group_concat splices the room into one string", async () => {
    const alice = await login("alice");
    const room = await openRoom(alice, await alice.createRoom("transcript"));
    await doRpc(alice, () => room.post("one").execute());
    await doRpc(alice, () => room.post("two").execute());

    // A distinctive SQLite aggregate, authored client-side against the
    // room's granted builder — reduces the whole feed to a single string.
    const rows = await doRpc(alice, () =>
      room
        .messages()
        .select(({ messages }) => ({ transcript: messages.body.groupConcat("\n") }))
        .execute(),
    );
    expectTypeOf(rows).toExtend<{ transcript: string | null }[]>();
    expect(rows).toEqual([{ transcript: "one\ntwo" }]);
  });

  test("live: client-authored subscription pushes on post, stops on unsubscribe", async () => {
    const alice = await login("alice");
    const room = await openRoom(alice, await alice.createRoom("live-room"));

    // byRef: the callback crosses BY REFERENCE; observer-first live()
    // resolves the DO's default connection.
    const got: { body: string }[][] = [];
    const onNext = byRef((rows: { body: string }[]) => {
      got.push(rows);
    });
    const sub = await doRpc(alice, () =>
      room
        .messages()
        .select(({ messages }) => ({ body: messages.body }))
        .live()
        .observe({ onNext }),
    );

    await vi.waitFor(() => expect(got.length).toBeGreaterThanOrEqual(1));
    expect(got[0]).toEqual([]);
    await doRpc(alice, () => room.post("ping").execute());
    await vi.waitFor(() => expect(got.at(-1)).toEqual([{ body: "ping" }]));

    await sub.unsubscribe();
    onNext[Symbol.dispose](); // release the by-reference callback stub
    const pushesAfterStop = got.length;
    await doRpc(alice, () => room.post("after-stop").execute());
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(got.length).toBe(pushesAfterStop);
  });

  test("wrong password on a claimed username is rejected", async () => {
    await login("claimed", "correct-horse");
    const api = await connect();
    await expect(api.login({ username: "claimed", password: "wrong" })).rejects.toThrow(
      /claimed/,
    );
  });
});

describe("attenuation (confinement)", () => {
  test("the pre-login root is powerless: login() and nothing else", async () => {
    const api = await connect();
    const anyApi = api as any;
    expect(await anyApi.directory).toBeUndefined();
    await expect(doRpc(anyApi, (a: any) => a.directory())).rejects.toThrow();
  });

  test("directory rooms are the attenuation floor: no post, no messages", async () => {
    const alice = await login("alice");
    const room = await openRoom(alice, await alice.createRoom("private"));
    await doRpc(alice, () => room.post("secret plans").execute());

    const mallory = await login("mallory");
    // Mallory sees the room exists (directory data)...
    const dir = await doRpc(mallory, (u) =>
      u.directory().select(({ rooms }) => ({ id: rooms.id, name: rooms.name })).execute(),
    );
    expect(dir.map((r) => r.name)).toContain("private");
    // ...and can hold directory ROWS — but they're base Rooms: nothing
    // amplifying on them. (Hydration mints exactly the grant-site class.)
    const rows = await doRpc(mallory, (u) => u.directory().hydrate());
    const held = rows.find(Boolean)! as unknown as { post?: unknown; messages?: unknown };
    expect(await (held.post as Promise<unknown>)).toBeUndefined();
    await expect(
      doRpc(mallory, () =>
        (held as { messages: () => { execute: () => unknown } }).messages().execute(),
      ),
    ).rejects.toThrow();
  });

  test("password_hash is unreachable through any client-authored select", async () => {
    const alice = await login("alice");
    const room = await openRoom(alice, await alice.createRoom("leaky"));

    // Explicitly selecting the column: it TYPECHECKS (the column exists on
    // the class; @expose gating is invisible to the compiler), but it isn't
    // @expose'd, so it replays to undefined and the select is rejected
    // server-side. The guard is runtime, at the capability boundary.
    await expect(
      doRpc(alice, () =>
        room
          .members()
          .select(({ users }) => ({ h: users.password_hash }))
          .execute(),
      ),
    ).rejects.toThrow();

    // And the bare row shape simply omits it.
    const rows = await doRpc(alice, () => room.members().execute());
    for (const row of rows) {
      expect(row).not.toHaveProperty("password_hash");
    }
  });

  test("a member room's builders cannot see other rooms", async () => {
    const alice = await login("alice");
    const mine = await openRoom(alice, await alice.createRoom("mine"));
    const other = await openRoom(alice, await alice.createRoom("other"));
    await doRpc(alice, () => other.post("elsewhere").execute());

    // messages() is pre-scoped by room id; a deliberately "wide" query over
    // it still only sees this room.
    const rows = await doRpc(alice, () =>
      mine
        .messages()
        .select(({ messages }) => ({ room_id: messages.room_id, body: messages.body }))
        .execute(),
    );
    expect(rows).toEqual([]);
  });

  test("membership rows from members() cannot amplify — grant facets are self-scoped", async () => {
    const alice = await login("alice");
    const room = await openRoom(alice, await alice.createRoom("grants"));

    // members() hydrates base Users rows; nothing on them reaches rooms.
    const memberRows = await doRpc(alice, () => room.members().hydrate());
    const other = memberRows[0]! as unknown as { room?: Promise<unknown>; memberships?: Promise<unknown> };
    expect(await other.room).toBeUndefined();
    expect(await other.memberships).toBeUndefined();
  });
});
