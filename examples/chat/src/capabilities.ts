import { expose, type Connection } from "typegres";
import z from "zod";
import { Users, Rooms, RoomMembers, Messages } from "./schema";

// The @expose capability graph. @expose gating is the entire authorization
// story: only exposed members are reachable over Cap'n Web, and a capability
// is only handed out when the server decides you may have it. Reads return
// query builders the client refines and runs (the Cap'n Web showcase);
// mutations execute server-side.

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

  // Client-refinable: messages in this room (authorized by holding the cap).
  @expose() messages() {
    return Messages.from().where(({ messages }) => messages.room_id.eq(this.#id));
  }
  @expose() members() {
    return Users.from()
      .join(RoomMembers, ({ users, room_members }) => users.id.eq(room_members.user_id))
      .where(({ room_members }) => room_members.room_id.eq(this.#id));
  }

  // Convenience read for the UI: messages joined with their authors, newest
  // last. Executes server-side (the client can't reference the Users table to
  // author the join itself) -- authorized by holding the Room cap.
  @expose()
  async feed() {
    return Messages.from()
      .join(Users, ({ messages, users }) => messages.user_id.eq(users.id))
      .where(({ messages }) => messages.room_id.eq(this.#id))
      .select(({ messages, users }) => ({ id: messages.id, author: users.name, body: messages.body }))
      .orderBy(({ messages }) => messages.id)
      .execute(this.#conn);
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

// The authenticated principal — the Cap'n Web main capability.
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

  @expose(z.string().min(1))
  async createRoom(name: string): Promise<Room> {
    const [room] = await Rooms.insert({ name, created_by: this.#id })
      .returning(({ rooms }) => ({ id: rooms.id }))
      .execute(this.#conn);
    await RoomMembers.insert({ room_id: room!.id, user_id: this.#id }).execute(this.#conn);
    return new Room(this.#conn, this.#id, room!.id, name);
  }

  @expose(z.number().int())
  async joinRoom(id: number): Promise<Room> {
    const [room] = await Rooms.from().where(({ rooms }) => rooms.id.eq(id)).select(({ rooms }) => ({ name: rooms.name })).execute(this.#conn);
    if (!room) throw new Error(`no such room ${id}`);
    // INSERT OR IGNORE via the join-table PK; idempotent join.
    await RoomMembers.insert({ room_id: id, user_id: this.#id }).execute(this.#conn);
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

// Auth entry: resolve or create a user by name, return their capability.
// (A real app validates a token; PoC keys off the name.)
export const authenticate = async (conn: Connection, name: string): Promise<User> => {
  const [existing] = await Users.from().where(({ users }) => users.name.eq(name)).select(({ users }) => ({ id: users.id })).execute(conn);
  const id = existing?.id ?? (await Users.insert({ name }).returning(({ users }) => ({ id: users.id })).execute(conn))[0]!.id;
  return new User(conn, id, name);
};
