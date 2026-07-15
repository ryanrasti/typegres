import { DurableObject } from "cloudflare:workers";
import type { Connection } from "typegres";
import { db, migrate } from "./schema";
import { DoSqliteDriver, type SqlStorageLike } from "./do-sqlite-driver";

export interface Env {
  CHAT: DurableObjectNamespace<ChatDo>;
}

// The single chat Durable Object. Holds one typegres Connection over its own
// SQLite storage and runs the schema migration on init. Later phases add the
// @expose capability graph and the Cap'n Web WebSocket server.
export class ChatDo extends DurableObject<Env> {
  readonly conn: Connection;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.conn = db.attach(new DoSqliteDriver(ctx.storage.sql as SqlStorageLike));
    // blockConcurrencyWhile: no request is served until the schema exists.
    ctx.blockConcurrencyWhile(() => migrate(this.conn));
  }
}

export default {
  async fetch(_req: Request, _env: Env): Promise<Response> {
    // Phase 4 replaces this with a WebSocket upgrade handed to Cap'n Web.
    return new Response("typegres chat", { status: 200 });
  },
};
