import { doRpc, newHttpBatchRpcSession, type ShimStub } from "typegres/capnweb";
import type { Api, Users } from "../server/api";

export type Credentials = { username: string; password: string };
export type Note = {
  id: string;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
};

const connect = (): ShimStub<Api> => newHttpBatchRpcSession("/api") as unknown as ShimStub<Api>;
export const loginUser = (credentials: Credentials): ShimStub<Users> =>
  connect().login(credentials) as unknown as ShimStub<Users>;

export const login = async (username: string, password: string): Promise<Credentials> => {
  const credentials = { username, password };
  await doRpc(loginUser(credentials), (user: Users) => user.notes()
    .where(({ notes }) => notes.id.eq("__login_probe_never__"))
    .select(({ notes }) => ({ id: notes.id }))
    .execute());
  return credentials;
};

export const listNotes = async (credentials: Credentials): Promise<Note[]> => {
  const rows = await doRpc(loginUser(credentials), (user: Users) => user.notes()
    .orderBy(({ notes }) => [[notes.updated_at, "desc"], [notes.id, "desc"]])
    .select(({ notes }) => ({
      id: notes.id,
      title: notes.title,
      body: notes.body,
      created_at: notes.created_at,
      updated_at: notes.updated_at,
    }))
    .execute()) as unknown as Array<Omit<Note, "body"> & { body: string | null }>;

  return rows.map((note) => ({ ...note, body: note.body ?? "" }));
};
