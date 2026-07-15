import { DurableObject } from "cloudflare:workers";
import { newWorkersWebSocketRpcResponse } from "capnweb";
import { toRpc } from "typegres/capnweb";
import type { Connection } from "typegres";
import { db, migrate } from "./schema";
import { authenticate } from "./capabilities";
import { DoSqliteDriver, type SqlStorageLike } from "./do-sqlite-driver";

export interface Env {
  CHAT: DurableObjectNamespace<ChatDo>;
}

// The single chat Durable Object. Holds one typegres Connection over its own
// SQLite storage, and serves the @expose capability graph to clients over
// Cap'n Web on a WebSocket -- clients author typegres queries that replay here.
export class ChatDo extends DurableObject<Env> {
  readonly conn: Connection;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.conn = db.attach(new DoSqliteDriver(ctx.storage.sql as SqlStorageLike));
    ctx.blockConcurrencyWhile(() => migrate(this.conn));
  }

  // WebSocket upgrade -> Cap'n Web session whose main capability is the
  // authenticated User (the @expose shim gates the reachable surface). Auth is
  // a ?user= token for the PoC; a real app validates a signed credential.
  async fetch(req: Request): Promise<Response> {
    const name = new URL(req.url).searchParams.get("user");
    if (!name) return new Response("missing ?user", { status: 400 });
    const user = await authenticate(this.conn, name);
    return newWorkersWebSocketRpcResponse(req, toRpc(user));
  }
}

export default {
  // One DO for all rooms; every client routes to it.
  async fetch(req: Request, env: Env): Promise<Response> {
    return env.CHAT.get(env.CHAT.idFromName("global")).fetch(req);
  },
};
