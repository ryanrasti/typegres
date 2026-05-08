// Wire log: a small pub/sub for everything that crosses the
// `inMemoryChannel` boundary. The playground subscribes via the
// <WireLog/> component and renders entries below the result table —
// makes it visible to viewers that closures are shipping out and
// chunks are coming back, instead of running locally.
//
// In a real deployment this would be the network tab; here we
// surface it directly because the in-memory channel is lossless for
// the wire format.
//
// Four entry kinds, distinguished by whether the closure ends in
// `.live(...)` (streaming) vs `.execute()` / etc. (one-shot):
//   query-request   →  one-shot closure shipped
//   query-response  ←  one-shot result chunk(s)
//   live-request    →  streaming closure shipped
//   live-update     ←  streaming chunk (typically one per matched commit)

export type WireEntryKind =
  | "query-request"
  | "query-response"
  | "live-request"
  | "live-update"
  | "error";

export type WireEntry =
  | { kind: "query-request" | "live-request"; t: number; code: string }
  // `rows` is the parsed row count when the chunk is an array (the
  // typical shape — every typegres terminator returns rows[]). Falls
  // back to `null` for void / scalar / unparseable payloads, in which
  // case the renderer shows bytes instead.
  | { kind: "query-response" | "live-update"; t: number; bytes: number; rows: number | null }
  | { kind: "error"; t: number; message: string };

const MAX_ENTRIES = 200;

let entries: WireEntry[] = [];
const subs = new Set<(e: WireEntry[]) => void>();

export const wireLog = {
  push: (e: WireEntry): void => {
    entries = [...entries.slice(-(MAX_ENTRIES - 1)), e];
    for (const s of subs) {s(entries);}
  },
  subscribe: (cb: (e: WireEntry[]) => void): (() => void) => {
    subs.add(cb);
    cb(entries);
    return () => { subs.delete(cb); };
  },
  clear: (): void => {
    entries = [];
    for (const s of subs) {s(entries);}
  },
};
