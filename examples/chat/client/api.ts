import { newWebSocketRpcSession } from "capnweb";
import type { ShimStub } from "typegres/capnweb";
import type { ChatApi } from "../src/capabilities";

// Transport only: open a Cap'n Web session whose main capability is ChatApi.
// Auth is ChatApi.userByName(); domain reads are authored inline with doRpc.
export type Root = ShimStub<ChatApi>;

export const connect = (): Root => {
  const proto = location.protocol === "https:" ? "wss:" : "ws:";
  const url = `${proto}//${location.host}/ws`;
  return newWebSocketRpcSession(url) as unknown as Root;
};
