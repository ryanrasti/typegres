import { DurableObject } from "cloudflare:workers";

export interface Env {
  CHAT: DurableObjectNamespace<ChatDo>;
}

// The single chat Durable Object. Phase 0: just a SQLite-backed DO whose
// storage the probe tests exercise directly. Later phases add the typegres
// schema, the @expose capability graph, and the Cap'n Web WebSocket server.
export class ChatDo extends DurableObject<Env> {
  readonly sql: SqlStorage;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
  }
}

export default {
  async fetch(_req: Request, _env: Env): Promise<Response> {
    // Phase 4 replaces this with a WebSocket upgrade handed to Cap'n Web.
    return new Response("typegres chat", { status: 200 });
  },
};
