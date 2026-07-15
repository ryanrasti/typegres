import { DurableObject } from "cloudflare:workers";
import { newWorkersWebSocketRpcResponse } from "capnweb";
import { toRpc } from "typegres/capnweb";
// Core + do-sqlite entries: no optional node peers (pg / better-sqlite3 / pglite).
import type { Connection } from "typegres/core";
import { DoSqliteDriver, type SqlStorageLike } from "typegres/do-sqlite";
import { db } from "./db";
import { migrate } from "./migrate";
import { ChatApi } from "./capabilities";

export interface Env {
  CHAT: DurableObjectNamespace<ChatDo>;
  ASSETS: Fetcher;
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

  // WebSocket upgrade -> Cap'n Web session whose main capability is ChatApi.
  // Auth is on the graph (ChatApi.userByName), not a ?user= query param.
  async fetch(req: Request): Promise<Response> {
    return newWorkersWebSocketRpcResponse(req, toRpc(new ChatApi(this.conn)));
  }
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    // /ws -> the single chat DO (Cap'n Web WebSocket). Everything else is the
    // static React client.
    if (new URL(req.url).pathname === "/ws") {
      return env.CHAT.get(env.CHAT.idFromName("global")).fetch(req);
    }
    return env.ASSETS.fetch(req);
  },
};
