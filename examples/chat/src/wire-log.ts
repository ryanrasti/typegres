// Tiny pub/sub store for the wire panel: every RPC the client sends —
// including the ones you author in the console — lands here.

export type WireEntry =
  | { kind: "query"; t: number; code: string }
  | { kind: "call"; t: number; label: string }
  | { kind: "response"; t: number; ms: number; rows: number | null }
  | { kind: "input"; t: number; code: string }
  | { kind: "result"; t: number; ms: number; preview: string }
  | { kind: "live"; t: number; rows: number }
  | { kind: "error"; t: number; message: string };

const MAX_ENTRIES = 200;
let entries: WireEntry[] = [];
const subs = new Set<(e: WireEntry[]) => void>();

// Lets other components (e.g. the empty-state snippets) load code into the
// wire prompt.
const inputSubs = new Set<(code: string) => void>();
export const wireInput = {
  set: (code: string): void => {
    for (const s of inputSubs) {
      s(code);
    }
  },
  subscribe: (cb: (code: string) => void): (() => void) => {
    inputSubs.add(cb);
    return () => {
      inputSubs.delete(cb);
    };
  },
};

export const wireLog = {
  push: (e: WireEntry): void => {
    entries = [...entries.slice(-(MAX_ENTRIES - 1)), e];
    for (const s of subs) {
      s(entries);
    }
  },
  subscribe: (cb: (e: WireEntry[]) => void): (() => void) => {
    subs.add(cb);
    cb(entries);
    return () => {
      subs.delete(cb);
    };
  },
  clear: (): void => {
    entries = [];
    for (const s of subs) {
      s(entries);
    }
  },
};
