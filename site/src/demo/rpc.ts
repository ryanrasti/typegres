// Real exoeval RPC. The widget's `rpc(async (api) => ...)` closure is
// stringified, shipped through `inMemoryChannel` (in a real deployment
// this is the network), parsed by exoEval on the server end with `api`
// bound to the cap root, and the JSON-serialized result comes back.
// The in-browser demo runs both ends in the same process, but the
// wire shape — and the constraints it implies (no class instances
// across the boundary, captures passed explicitly) — are real.

import { RpcClient, inMemoryChannel } from "typegres/exoeval";
import { db } from "./runtime";
import { Api } from "./server/api";

const client = new RpcClient<Api>(inMemoryChannel(new Api(db)));

const queue: Promise<unknown>[] = [];

export function rpc<R, C extends object = {}>(
  fn: (api: Api, captures: C) => R,
  captures: C = {} as C,
): Promise<R> {
  const p = client.run(fn, captures) as Promise<R>;
  queue.push(p);
  return p;
}

export function _consumePendingRpc(): Promise<unknown> | null {
  return queue.shift() ?? null;
}
