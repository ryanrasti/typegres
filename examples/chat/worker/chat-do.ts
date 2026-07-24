import { DurableObject } from "cloudflare:workers";
import { newWorkersRpcResponse, type RpcTarget } from "capnweb";
import { toRpc } from "typegres/capnweb";
import { DoSqliteDriver } from "typegres/drivers/do";
import type { Connection } from "typegres";
import { db, Chat } from "./api";
import { migrate } from "./migrate";

// One Durable Object holds the whole demo (rooms are rows, not DOs) —
// see the README for how this shards to room-per-DO. typegres runs against
// ctx.storage.sql via DoSqliteDriver (same-thread SQLite).
export class ChatDo extends DurableObject<Env> {
  readonly conn: Connection;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.conn = db.attach(new DoSqliteDriver(ctx.storage));
    ctx.blockConcurrencyWhile(() => migrate(this.conn));
  }

  override async fetch(request: Request): Promise<Response> {
    // Each connection's root capability is a fresh, powerless root —
    // login() is the only thing on it.
    return newWorkersRpcResponse(request, toRpc(new Chat()) as RpcTarget);
  }
}
