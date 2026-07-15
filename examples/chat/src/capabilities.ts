import { expose, type Connection } from "typegres/core";
import z from "zod";
import { Users } from "./tables/users";
import { Rooms } from "./tables/rooms";
import { RoomMembers } from "./tables/room_members";
import { Messages } from "./tables/messages";

// The @expose capability graph. @expose gating is the entire authorization
// story: only exposed members are reachable over Cap'n Web, and a capability
// is only handed out when the server decides you may have it.
//   - reads return query builders the client refines and .execute()s
//   - mutations (createRoom / joinRoom / post) run server-side

// A room the current user is authorized for — you only get one via User.
export class Room {
  readonly #conn: Connection;
  readonly #userId: number;
  readonly #id: number;
  readonly #name: string;

  constructor(conn: Connection, userId: number, id: number, name: string) {
    this.#conn = conn;
    this.#userId = userId;
    this.#id = id;
    this.#name = name;
  }

  @expose() get id() {
    return this.#id;
  }
  @expose() get name() {
    return this.#name;
  }

  // Client-refinable reads: the browser authors the select/order/limit and
// .execute()s them. Holding the Room cap is the authorization — no
// server-side canned read wrappers.
  @expose() messages() {
    return Messages.from().where(({ messages }) => messages.room_id.eq(this.#id));
  }
  @expose() members() {
    return Users.from()
      .join(RoomMembers, ({ users, room_members }) => users.id.eq(room_members.user_id))
      .where(({ room_members }) => room_members.room_id.eq(this.#id));
  }

  // Mutation: post a message as the current user.
  @expose(z.string().min(1))
  async post(body: string) {
    const [msg] = await Messages.insert({ room_id: this.#id, user_id: this.#userId, body })
      .returning(({ messages }) => ({ id: messages.id, body: messages.body }))
      .execute(this.#conn);
    return msg;
  }
}

// An authenticated principal. Obtained via ChatApi.userByName() — not the
// session root itself.
export class User {
  readonly #conn: Connection;
  readonly #id: number;
  readonly #name: string;

  constructor(conn: Connection, id: number, name: string) {
    this.#conn = conn;
    this.#id = id;
    this.#name = name;
  }

  @expose() get id() {
    return this.#id;
  }
  @expose() get name() {
    return this.#name;
  }
  // Exposed so client-authored read builders can .execute() against it.
  @expose() get conn() {
    return this.#conn;
  }

  // Client-refinable: the rooms I'm a member of.
  @expose() rooms() {
    return Rooms.from()
      .join(RoomMembers, ({ rooms, room_members }) => rooms.id.eq(room_members.room_id))
      .where(({ room_members }) => room_members.user_id.eq(this.#id));
  }

  // Client-refinable: the public room directory -- every room is joinable, so
  // any authenticated user may list them (membership is enforced later, when a
  // Room capability is actually handed out). The client diffs this against
  // rooms() to know which ones it still needs to join.
  @expose() allRooms() {
    return Rooms.from();
  }

  @expose(z.string().min(1))
  async createRoom(name: string): Promise<Room> {
    const [room] = await Rooms.insert({ name, created_by_user_id: this.#id })
      .returning(({ rooms }) => ({ id: rooms.id }))
      .execute(this.#conn);
    await RoomMembers.insert({ room_id: room!.id, user_id: this.#id }).execute(this.#conn);
    return new Room(this.#conn, this.#id, room!.id, name);
  }

  @expose(z.number().int())
  async joinRoom(id: number): Promise<Room> {
    const [room] = await Rooms.from().where(({ rooms }) => rooms.id.eq(id)).select(({ rooms }) => ({ name: rooms.name })).execute(this.#conn);
    if (!room) throw new Error(`no such room ${id}`);
    // Idempotent join: skip the insert if already a member (the DO is
    // single-threaded, so no membership race). typegres has no ON CONFLICT yet.
    const [existing] = await RoomMembers.from()
      .where(({ room_members }) => room_members.room_id.eq(id).and(room_members.user_id.eq(this.#id)))
      .select(({ room_members }) => ({ room_id: room_members.room_id }))
      .execute(this.#conn);
    if (!existing) {
      await RoomMembers.insert({ room_id: id, user_id: this.#id }).execute(this.#conn);
    }
    return new Room(this.#conn, this.#id, id, room.name);
  }

  // Authorization at grant time: only a member gets a Room cap.
  @expose(z.number().int())
  async room(id: number): Promise<Room> {
    const [membership] = await RoomMembers.from()
      .where(({ room_members }) => room_members.room_id.eq(id).and(room_members.user_id.eq(this.#id)))
      .select(({ room_members }) => ({ room_id: room_members.room_id }))
      .execute(this.#conn);
    if (!membership) throw new Error(`not a member of room ${id}`);
    const [room] = await Rooms.from().where(({ rooms }) => rooms.id.eq(id)).select(({ rooms }) => ({ name: rooms.name })).execute(this.#conn);
    return new Room(this.#conn, this.#id, id, room!.name);
  }
}

// Cap'n Web session root. Auth is on the graph (`userByName`), not outside
// it in the DO fetch handler. PoC: find-or-create by name. A real app would
// verify a token here and never create users on login.
export class ChatApi {
  readonly #conn: Connection;

  constructor(conn: Connection) {
    this.#conn = conn;
  }

  @expose(z.string().min(1))
  async userByName(name: string): Promise<User> {
    const [existing] = await Users.from()
      .where(({ users }) => users.name.eq(name))
      .select(({ users }) => ({ id: users.id }))
      .execute(this.#conn);
    const id =
      existing?.id ??
      (await Users.insert({ name }).returning(({ users }) => ({ id: users.id })).execute(this.#conn))[0]!.id;
    return new User(this.#conn, id, name);
  }
}
