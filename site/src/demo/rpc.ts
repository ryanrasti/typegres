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

// Direct, non-queued. Used by page-internal helpers (mutation
// buttons, stop) that already hold the result and don't want the
// playground's "pick up the next call" mechanism to grab it.
export const rpc: RpcClient<Api>["run"] = client.run.bind(client);

// Queued variant for the playground UI. The widget's closure runs in
// `new Function(...)` scope; we inject `rpcQueued` as `rpc` so each
// call deposits its result in the queue, and the page consumes one
// per Run click. The queue is plural so back-to-back stamps don't
// race, but in practice there's only ever one pending entry.
const queue: AsyncIterable<unknown>[] = [];

export const rpcQueued: RpcClient<Api>["run"] = ((fn: any, captures: any) => {
  const result = client.run(fn, captures);
  queue.push(result as AsyncIterable<unknown>);
  return result;
}) as any;

export function _consumePendingRpc(): AsyncIterable<unknown> | null {
  return queue.shift() ?? null;
}
