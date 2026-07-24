import { useEffect, useRef, useState } from "react";
import { byRef } from "typegres/capnweb";
import { wireInput, wireLog, type WireEntry } from "../wire-log";
import { loggedDoRpc, type RoomStub, type UserStub } from "../rpc";

const fmtTime = (t: number): string => {
  const d = new Date(t);
  const p = (n: number, w = 2) => String(n).padStart(w, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}.${p(d.getMilliseconds(), 3)}`;
};

// Compact a closure's source for one-line display.
const oneLine = (code: string): string => code.replace(/\s+/g, " ").trim();

const preview = (v: unknown): string => {
  if (v === undefined) {
    return "undefined";
  }
  if (typeof v === "function") {
    return "[capability stub]";
  }
  try {
    const s = JSON.stringify(v);
    return s.length > 400 ? `${s.slice(0, 400)}…` : s;
  } catch {
    return String(v);
  }
};

// Evaluate a console-style expression with `user`, `room`, `doRpc`, and
// `byRef` in scope (the current capabilities plus the logged doRpc). This is
// eval of the user's own code in their own browser — exactly what the devtools
// console does, one keystroke closer.
const evalInput = async (
  code: string,
  user: UserStub | undefined,
  room: RoomStub | undefined,
): Promise<void> => {
  wireLog.push({ kind: "input", t: Date.now(), code });
  const t0 = Date.now();
  try {
    const body = (expr: string) => `"use strict"; return (async () => ${expr})();`;
    let fn: (...args: unknown[]) => Promise<unknown>;
    try {
      // Expression form first (`await user.room(1)`, `doRpc(...)`, ...).
      fn = new Function("user", "room", "doRpc", "byRef", body(`(${code})`)) as typeof fn;
    } catch {
      // Fall back to statement form (`const x = ...; return x`).
      fn = new Function("user", "room", "doRpc", "byRef", body(`{ ${code} }`)) as typeof fn;
    }
    const result = await fn(user, room, loggedDoRpc, byRef);
    wireLog.push({ kind: "result", t: Date.now(), ms: Date.now() - t0, preview: preview(result) });
  } catch (e) {
    wireLog.push({ kind: "error", t: Date.now(), message: e instanceof Error ? e.message : String(e) });
  }
};

const row = (e: WireEntry) => {
  switch (e.kind) {
    case "query":
      return { arrow: "→", tag: "query", tw: "text-sky-400", text: oneLine(e.code) };
    case "call":
      return { arrow: "→", tag: "call", tw: "text-violet-400", text: e.label };
    case "response":
      return {
        arrow: "←",
        tag: "response",
        tw: "text-emerald-400",
        text: e.rows !== null ? `${e.rows} row${e.rows === 1 ? "" : "s"} (${e.ms}ms)` : `ok (${e.ms}ms)`,
      };
    case "input":
      return { arrow: "❯", tag: "you", tw: "text-gray-100", text: oneLine(e.code) };
    case "result":
      return { arrow: "←", tag: "result", tw: "text-teal-300", text: `${e.preview} (${e.ms}ms)` };
    case "live":
      return {
        arrow: "←",
        tag: "live",
        tw: "text-amber-400",
        text: `push: ${e.rows} row${e.rows === 1 ? "" : "s"}`,
      };
    case "error":
      return { arrow: "←", tag: "error", tw: "text-red-400", text: e.message };
  }
};

export const WireLog = ({ user, room }: { user?: UserStub; room?: RoomStub }) => {
  const [entries, setEntries] = useState<WireEntry[]>([]);
  const [draft, setDraft] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1); // -1 = editing a fresh line
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => wireLog.subscribe(setEntries), []);
  useEffect(
    () =>
      wireInput.subscribe((code) => {
        setDraft(oneLine(code));
        inputRef.current?.focus();
      }),
    [],
  );
  const display = entries.slice().reverse();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = draft.trim();
    if (!code) {
      return;
    }
    setHistory((h) => [...h, code]);
    setHistIdx(-1);
    setDraft("");
    void evalInput(code, user, room);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" && history.length > 0) {
      e.preventDefault();
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setDraft(history[idx]!);
    } else if (e.key === "ArrowDown" && histIdx !== -1) {
      e.preventDefault();
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setDraft("");
      } else {
        setHistIdx(idx);
        setDraft(history[idx]!);
      }
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col border-t border-gray-800 bg-gray-950">
      <div className="flex shrink-0 items-center justify-between border-b border-gray-800 px-4 py-1.5 text-xs font-medium tracking-wide text-gray-400 uppercase">
        <span>
          Wire <span className="normal-case text-gray-600">— every query below was authored in this browser</span>
        </span>
        <button
          onClick={() => wireLog.clear()}
          className="text-[10px] font-normal normal-case text-gray-500 transition-colors hover:text-gray-300"
        >
          clear
        </button>
      </div>
      <form onSubmit={submit} className="flex shrink-0 items-center gap-2 border-b border-gray-800 px-4 py-1.5">
        <span className="font-mono text-[11px] text-emerald-400">❯</span>
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          placeholder="await doRpc(user, u => u.directory().select(({ rooms }) => ({ name: rooms.name })).execute())"
          className="flex-1 bg-transparent font-mono text-[11px] text-gray-200 placeholder-gray-600 outline-none"
        />
      </form>
      <div className="min-h-0 flex-1 overflow-auto px-4 py-2 font-mono text-[11px] leading-relaxed">
        {display.length === 0 ? (
          <div className="text-gray-600">No traffic yet.</div>
        ) : (
          display.map((e, i) => {
            const r = row(e);
            return (
              <div key={`${e.t}-${i}`} className="flex gap-2 break-all whitespace-pre-wrap">
                <span className="shrink-0 text-gray-600">{fmtTime(e.t)}</span>
                <span className={`${r.tw} shrink-0`}>
                  {r.arrow} [{r.tag}]
                </span>
                <span className="text-gray-300">{r.text}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
