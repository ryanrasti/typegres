// Wire activity panel for the playground. Subscribes to the demo's
// `wireLog` and renders one row per closure-shipped / chunk-received,
// color-coded by kind so viewers can see RPC traffic happening — the
// thing that's invisible in a single-page demo otherwise.

import { useEffect, useState } from "react";
import type { WireEntry, WireEntryKind } from "@/demo/wire-log";
import { wireLog } from "@/demo/wire-log";

const LABELS: { [K in WireEntryKind]: { tag: string; tw: string } } = {
  "query-request":  { tag: "RPC query request",  tw: "text-sky-400" },
  "query-response": { tag: "RPC query response", tw: "text-emerald-400" },
  "live-request":   { tag: "RPC live request",   tw: "text-violet-400" },
  "live-update":    { tag: "RPC live update",    tw: "text-amber-400" },
  "error":          { tag: "RPC error",          tw: "text-red-400" },
};

const fmtTime = (t: number): string => {
  const d = new Date(t);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  return `${hh}:${mm}:${ss}.${ms}`;
};

// Trim the IIFE wrapper RpcClient.run adds around the closure source.
// `(${fnString})(api, ${captures})` → `${fnString}` so the log shows
// just the closure the caller wrote. Multiline closures defeated a
// `.*`-based regex; locate the `)(api, ` boundary by string search
// instead.
const stripIife = (code: string): string => {
  const trimmed = code.trim();
  if (!trimmed.startsWith("(") || !trimmed.endsWith(")")) {return trimmed;}
  const tailIdx = trimmed.lastIndexOf(")(api, ");
  if (tailIdx < 1) {return trimmed;}
  return trimmed.slice(1, tailIdx);
};

const summarize = (e: WireEntry): string => {
  switch (e.kind) {
    case "query-request":
    case "live-request":
      return stripIife(e.code).replace(/\s+/g, " ");
    case "query-response":
    case "live-update":
      if (e.rows !== null) {return `${e.rows.toLocaleString()} row${e.rows === 1 ? "" : "s"}`;}
      return `${e.bytes.toLocaleString()} bytes`;
    case "error":
      return e.message;
  }
};

export const WireLog = () => {
  const [entries, setEntries] = useState<WireEntry[]>([]);

  useEffect(() => wireLog.subscribe(setEntries), []);

  // Newest first: viewers always see the latest event without scrolling.
  // The bounded buffer in `wireLog.push` evicts oldest from the front, so
  // entries[N-1] is most-recent — reverse for display.
  const display = entries.slice().reverse();

  return (
    <div className="flex flex-col h-full min-h-0 bg-gray-950 border-t border-gray-800">
      <div className="px-4 py-1.5 text-xs font-medium text-gray-400 uppercase tracking-wide shrink-0 flex items-center justify-between border-b border-gray-800">
        <span>Wire</span>
        <button
          onClick={() => wireLog.clear()}
          className="text-[10px] normal-case font-normal text-gray-500 hover:text-gray-300 transition-colors"
        >
          clear
        </button>
      </div>
      <div className="flex-1 min-h-0 overflow-auto px-4 py-2 font-mono text-[11px] leading-relaxed">
        {display.length === 0 ? (
          <div className="text-gray-600">No traffic yet.</div>
        ) : (
          display.map((e, i) => {
            const { tag, tw } = LABELS[e.kind];
            const arrow = e.kind === "query-request" || e.kind === "live-request" ? "→" : "←";
            return (
              <div key={`${e.t}-${i}`} className="flex gap-2 whitespace-pre-wrap break-all">
                <span className="text-gray-600 shrink-0">{fmtTime(e.t)}</span>
                <span className={`${tw} shrink-0`}>{arrow} [{tag}]</span>
                <span className="text-gray-300">{summarize(e)}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
