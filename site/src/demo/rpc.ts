// Real exoeval RPC. The widget's `rpc(async (api) => ...)` closure is
// stringified, shipped through `inMemoryChannel` (in a real deployment
// this is the network), parsed by exoEval on the server end with `api`
// bound to the cap root, and the JSON-serialized result(s) come back
// as an AsyncIterable<string>. The in-browser demo runs both ends in
// the same process, but the wire shape — and the constraints it
// implies (no class instances across the boundary, captures passed
// explicitly) — are real.
//
// One-shot vs streaming is a *static* property of the closure: if it
// returns (or resolves to) an iterable / async-iterable (e.g. via
// `db.live(qb)`), `rpc(...)` returns AsyncIterable<U>; otherwise
// Promise<U>. Same wire, different surface.

import { RpcClient, inMemoryChannel } from "typegres/exoeval";
import { db } from "./runtime";
import { Api } from "./server/api";

const client = new RpcClient<Api>(inMemoryChannel(new Api(db)));

// Queue of results awaiting consumption by the playground UI. The UI
// always iterates — one-shot calls yield once, live calls keep yielding
// until the closure's source terminates.
const queue: AsyncIterable<unknown>[] = [];

export const rpc: RpcClient<Api>["run"] = ((fn: any, captures: any) => {
  const result = client.run(fn, captures);
  // The hybrid is both Promise and AsyncIterable at runtime; iterate
  // as the universal consumer.
  queue.push(result as AsyncIterable<unknown>);
  return result;
}) as any;

export function _consumePendingRpc(): AsyncIterable<unknown> | null {
  return queue.shift() ?? null;
}
