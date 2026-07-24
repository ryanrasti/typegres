import { newWebSocketRpcSession } from "capnweb";
import { doRpc, type ShimStub, type Stubbed } from "typegres/capnweb";
import type { Chat, Users, Rooms } from "../worker/api";
import { wireLog } from "./wire-log";

export type ApiStub = ShimStub<Chat>;
// Stubs are typed as the raw capability classes — the shim presents every
// member async at runtime, but for inference through doRpc closures the
// unmangled type is what works (same pattern as the test suite).
export type UserStub = InstanceType<ReturnType<typeof Users.forPrincipal>> & Disposable;
export type RoomStub = InstanceType<ReturnType<typeof Rooms.forMember>> & Disposable;

export const connect = (): ApiStub => {
  const proto = location.protocol === "https:" ? "wss" : "ws";
  return newWebSocketRpcSession(`${proto}://${location.host}/ws`) as unknown as ApiStub;
};

// doRpc, with the closure's source logged to the wire panel. This is not
// instrumentation-by-approximation: the fn's source text is (modulo
// captures) exactly what capnweb records and replays server-side.
export function loggedDoRpc<T, R>(stub: ShimStub<T>, fn: (api: T) => R): Promise<Stubbed<Awaited<R>>>;
export function loggedDoRpc<T extends object, R>(stub: T, fn: (api: T) => R): Promise<Stubbed<Awaited<R>>>;
export async function loggedDoRpc(stub: object, fn: (api: never) => unknown): Promise<unknown> {
  const t0 = Date.now();
  wireLog.push({ kind: "query", t: t0, code: fn.toString() });
  try {
    const result = await (doRpc as (s: object, f: unknown) => Promise<unknown>)(stub, fn);
    wireLog.push({
      kind: "response",
      t: Date.now(),
      ms: Date.now() - t0,
      rows: Array.isArray(result) ? result.length : null,
    });
    return result;
  } catch (e) {
    wireLog.push({ kind: "error", t: Date.now(), message: e instanceof Error ? e.message : String(e) });
    throw e;
  }
}

// For plain capability calls (login, joinRoom, ...) that don't go
// through doRpc — log a label so the panel shows all traffic.
export const loggedCall = async <T>(label: string, call: () => Promise<T>): Promise<T> => {
  const t0 = Date.now();
  wireLog.push({ kind: "call", t: t0, label });
  try {
    const result = await call();
    wireLog.push({ kind: "response", t: Date.now(), ms: Date.now() - t0, rows: null });
    return result;
  } catch (e) {
    wireLog.push({ kind: "error", t: Date.now(), message: e instanceof Error ? e.message : String(e) });
    throw e;
  }
};

