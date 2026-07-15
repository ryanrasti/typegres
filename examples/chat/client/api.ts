import { newWebSocketRpcSession } from "capnweb";
import { doRpc, type ShimStub } from "typegres/capnweb";
import type { Room, User } from "../src/capabilities";

// The browser's view of the chat backend: a Cap'n Web session to the DO whose
// main capability is the authenticated User. Every call below authors a
// typegres query as a Cap'n Web closure that runs server-side in the DO.
export type Client = ShimStub<User>;

export const connect = (user: string): Client => {
  const proto = location.protocol === "https:" ? "wss:" : "ws:";
  const url = `${proto}//${location.host}/ws?user=${encodeURIComponent(user)}`;
  return newWebSocketRpcSession(url) as unknown as Client;
};

export type RoomInfo = { id: number; name: string };
export type Msg = { id: number; author: string; body: string };

// Client-AUTHORED query: the browser writes the select, it runs in the DO.
export const listRooms = (c: Client): Promise<RoomInfo[]> =>
  doRpc(c, (u: User) =>
    u.rooms().select(({ rooms }) => ({ id: rooms.id, name: rooms.name })).orderBy(({ rooms }) => rooms.id).execute(u.conn),
  );

// The public room directory (all rooms, joinable or already joined).
export const listAllRooms = (c: Client): Promise<RoomInfo[]> =>
  doRpc(c, (u: User) =>
    u.allRooms().select(({ rooms }) => ({ id: rooms.id, name: rooms.name })).orderBy(({ rooms }) => rooms.id).execute(u.conn),
  );

export const createRoom = (c: Client, name: string): Promise<unknown> => doRpc(c, (u: User) => u.createRoom(name));

export const joinRoom = (c: Client, id: number): Promise<unknown> => doRpc(c, (u: User) => u.joinRoom(id));

// room(id) enforces membership at the server before feed()/post() run.
export const feed = (c: Client, roomId: number): Promise<Msg[]> => doRpc(c, (u: User) => (u.room(roomId) as unknown as Room).feed());

export const post = (c: Client, roomId: number, body: string): Promise<unknown> =>
  doRpc(c, (u: User) => (u.room(roomId) as unknown as Room).post(body));
