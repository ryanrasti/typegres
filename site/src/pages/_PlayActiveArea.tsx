// Lazy-loaded "active area" — the bottom half of the output panel
// that needs the live PGlite-backed `client`. Splitting it out of
// _PlayPageInner means the shell (header / Monaco editor / file
// tree) can render before runtime.ts finishes its top-level
// `await typegres({ type: "pglite" })`. Suspense in the parent
// shows a "booting" placeholder during that ~1-2s wait.

import { useEffect, useMemo, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { Group, Panel, Separator } from "react-resizable-panels";
import { client, setCurrentUserToken } from "@/demo/server/api";
import { transformCodeWithEsbuild } from "@/lib/monaco-typegres-integration";
import { SyntaxHighlight } from "@/components/SyntaxHighlight";
import { WireLog } from "@/components/WireLog";
import { ORDERS_PATH, INVENTORY_PATH } from "./_PlayPaths";
import {
  OrdersWidget,
  InventoryWidget,
  UserPicker,
  type UserToken,
} from "./_PlayWidgets";

const rpc = client.run.bind(client);

declare global {
  // The widget injects `output(value)` to send a result to this panel;
  // declared here so the type resolver in Monaco doesn't complain
  // (mirrors the runtime injection in run() below).
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function output(value: unknown): void;
}

export type PlayActiveAreaProps = {
  modelsReady: boolean;
  activeWidget: string;
};

export default function PlayActiveArea({ modelsReady, activeWidget }: PlayActiveAreaProps) {
  const [userToken, setUserToken] = useState<UserToken>("user_brightship_alice");
  const [live, setLive] = useState(true);
  const [output, setOutput] = useState<unknown>(undefined);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string>("");
  const [sqlEntries, setSqlEntries] = useState<Array<{ text: string; params: unknown[] }>>([]);
  const [outputTab, setOutputTab] = useState<"table" | "sql">("table");
  const iterRef = useRef<AsyncIterator<unknown> | null>(null);
  const autoRanRef = useRef(false);

  const activeWidgetUri = useMemo(
    () => monaco.Uri.parse(`file:///${activeWidget}`),
    [activeWidget],
  );

  // Mirror the dropdown into the api's ambient current-user token
  // so `api.currentUser()` calls inside widget closures resolve to
  // it.
  useEffect(() => {
    setCurrentUserToken(userToken);
  }, [userToken]);

  const stop = async () => {
    // Two-phase: ask the server to cancel the live subscription
    // (rejects the wait promise so the parked closure can exit
    // through finally), then call .return() on our local iterator
    // to drain the channel.
    try {
      await rpc(async (api) => api.resetLive());
    } catch {
      /* ignore — best-effort */
    }
    await iterRef.current?.return?.();
  };

  const run = async () => {
    setError("");
    setOutput(undefined);
    setRunning(true);
    try {
      const widgetModel = monaco.editor.getModel(activeWidgetUri)!;
      const userSrc = widgetModel.getValue();
      // Strip imports — they're for Monaco's resolver, not runtime.
      const noImports = userSrc.replace(/^\s*import .*?;?\s*$/gm, "");
      const transformed = await transformCodeWithEsbuild(noImports);

      // Inject `client` and `output` into the widget's scope. The
      // widget calls `output(value)` to send a result (Promise or
      // AsyncIterable) here. We capture the most recent value handed
      // to output — earlier ones are discarded so a widget can refine
      // iteratively without leaking state.
      let captured: AsyncIterable<unknown> | Promise<unknown> | null = null;
      // Shim console.log to capture qb.debug() output (typegres
      // emits `console.log("Debugging query:", { sql, parameters })`).
      // Restored in finally.
      setSqlEntries([]);
      const originalConsoleLog = console.log;
      console.log = (...args: unknown[]) => {
        if (
          args[0] === "Debugging query:" &&
          args[1] && typeof args[1] === "object" &&
          "sql" in (args[1] as object)
        ) {
          const e = args[1] as { sql: string; parameters?: unknown[] };
          setSqlEntries((prev) => [...prev, { text: e.sql, params: e.parameters ?? [] }]);
          return;
        }
        originalConsoleLog(...args);
      };
      const fn = new (Function as unknown as new (
        arg: string,
        body: string,
      ) => (ctx: unknown) => void)(
        "ctx",
        `const { client, output } = ctx;
         ${transformed}`,
      );
      fn({
        client,
        output: (value: unknown) => {
          captured = value as AsyncIterable<unknown> | Promise<unknown>;
        },
      });
      if (!captured) {
        throw new Error("Widget did not call output(...) — pass it an rpc(...) result.");
      }
      const pending = captured as AsyncIterable<unknown>;
      // Iterate explicitly so we can hold the iterator handle for
      // a Stop button (live mode never terminates on its own).
      const it = pending[Symbol.asyncIterator]();
      iterRef.current = it;
      let any = false;
      try {
        while (true) {
          const r = await it.next();
          if (r.done) break;
          any = true;
          setOutput(r.value);
        }
      } finally {
        iterRef.current = null;
        console.log = originalConsoleLog;
      }
      if (!any) throw new Error("rpc(...) produced no values");
    } catch (e) {
      setError(String(e instanceof Error ? e.message + "\n" + e.stack : e));
    } finally {
      setRunning(false);
    }
  };

  const restart = () => {
    void (async () => {
      await stop();
      await run();
    })();
  };

  // Switching widgets while a query is running needs a restart —
  // otherwise the old iter keeps consuming the old widget's model
  // and pushing stale rows.
  useEffect(() => {
    if (!running) return;
    void (async () => {
      await stop();
      setOutput(undefined);
      await run();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeWidget]);

  // Auto-start on first load — `live` is on by default, so users
  // land on a streaming table without having to hit Watch.
  useEffect(() => {
    if (!modelsReady || autoRanRef.current) return;
    autoRanRef.current = true;
    void run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelsReady]);

  return (
    <div className="h-full w-full flex flex-col bg-gray-900">
      {/* Page-level: who's logged in + Run/Stop. Identity + execution paired. */}
      <div className="border-b border-gray-800 bg-gray-900/60 px-3 py-2 flex items-center gap-3 shrink-0">
        <UserPicker userToken={userToken} onUserToken={setUserToken} />
        <div className="ml-auto">
          {running ? (
            <button
              onClick={stop}
              className="px-3 py-1 text-sm font-medium bg-red-600 hover:bg-red-500 text-white rounded"
            >
              Stop ■
            </button>
          ) : (
            <button
              onClick={run}
              className="px-3 py-1 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded"
            >
              {live ? "Watch ▶" : "Run ▶"}
            </button>
          )}
        </div>
      </div>
      {/* Per-widget controls. Both widgets always mount — they keep
          their state alive while the visitor navigates files — but
          only the active widget's strip renders. */}
      <OrdersWidget
        visible={activeWidget === ORDERS_PATH}
        modelsReady={modelsReady}
        running={running}
        restart={restart}
        live={live}
        onLive={setLive}
      />
      <InventoryWidget
        visible={activeWidget === INVENTORY_PATH}
        modelsReady={modelsReady}
        running={running}
        restart={restart}
        live={live}
        onLive={setLive}
      />
      <div className="px-4 py-2 border-b border-gray-800 text-xs font-medium text-gray-400 uppercase tracking-wide shrink-0 flex items-center gap-3">
        <button
          onClick={() => setOutputTab("table")}
          className={`px-2 py-0.5 rounded transition-colors ${
            outputTab === "table" ? "text-white bg-gray-800" : "hover:text-gray-200"
          }`}
        >
          Table
        </button>
        <button
          onClick={() => setOutputTab("sql")}
          className={`px-2 py-0.5 rounded transition-colors ${
            outputTab === "sql" ? "text-white bg-gray-800" : "hover:text-gray-200"
          }`}
        >
          SQL{sqlEntries.length > 1 ? ` (${sqlEntries.length})` : ""}
        </button>
        {running && live && (
          <span className="flex items-center gap-1 text-green-400 normal-case font-normal text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            live
          </span>
        )}
      </div>
      <div className="flex-1 min-h-0">
        <Group orientation="vertical" className="h-full">
          <Panel id="output-area" defaultSize="40%" minSize="20%">
            <div className="h-full overflow-auto">
              {error ? (
                <pre className="px-4 py-3 text-xs font-mono whitespace-pre-wrap text-red-400">
                  {error}
                </pre>
              ) : outputTab === "sql" ? (
                <SqlView entries={sqlEntries} />
              ) : (
                // Always render — the empty/Running placeholder lives
                // inside OutputView so its diff state (prevByIdRef,
                // isFirstYield) survives the brief `output === undefined`
                // window during a manual Run. Otherwise the component
                // unmounts/remounts and the diff resets every time.
                <OutputView value={output} running={running} />
              )}
            </div>
          </Panel>
          <Separator
            className="h-1 bg-gray-800 hover:bg-blue-500 cursor-row-resize transition-colors"
            aria-label="Resize wire log"
          />
          <Panel id="wire-log" defaultSize="60%" minSize="10%">
            <WireLog />
          </Panel>
        </Group>
      </div>
    </div>
  );
}

// --- Output rendering ---

const isPlainObject = (v: unknown): v is Record<string, unknown> => {
  if (v === null || typeof v !== "object" || Array.isArray(v)) return false;
  const proto = Object.getPrototypeOf(v);
  return proto === Object.prototype || proto === null;
};

const isRowsArray = (v: unknown): v is Record<string, unknown>[] =>
  Array.isArray(v) && v.length > 0 && v.every(isPlainObject);

// Cell-level equality for the diff. Plain `===` / JSON.stringify
// trips false positives on pg `numeric` columns (avg/max/sum etc.) —
// pg returns them as strings with variable trailing zeros: "0", "0.0",
// "0.00000000000000000000" all represent the same value but stringify
// differently. Coerce string→number for purely numeric strings; fall
// back to structural equality otherwise.
const cellEq = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  if (typeof a === "string" && typeof b === "string") {
    const na = Number(a);
    const nb = Number(b);
    if (!Number.isNaN(na) && !Number.isNaN(nb) && Number.isFinite(na) && Number.isFinite(nb) && na === nb) {
      return true;
    }
  }
  return JSON.stringify(a) === JSON.stringify(b);
};

// Animation duration (ms). Matches the `rowFlash` / `cellFlash`
// keyframes in globals.css — keep in sync.
const FLASH_MS = 1800;

const OutputView = ({ value, running }: { value: unknown; running: boolean }) => {
  // Diff key column adapts: prefer `id`, otherwise the first column
  // (the groupBy case — `status` is the natural key when grouped).
  const prevByIdRef = useRef<Map<string, Record<string, unknown>>>(new Map());
  const isFirstYieldRef = useRef(true);
  const [rowGen, setRowGen] = useState<Map<string, number>>(new Map());
  const [cellGen, setCellGen] = useState<Map<string, number>>(new Map());
  // Per-key clear timers so a re-bump within the flash window cancels
  // the previous clear and re-schedules from scratch.
  const rowTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const cellTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // Cleanup pending timers on unmount.
  useEffect(() => {
    const rt = rowTimersRef.current;
    const ct = cellTimersRef.current;
    return () => {
      for (const t of rt.values()) clearTimeout(t);
      for (const t of ct.values()) clearTimeout(t);
      rt.clear();
      ct.clear();
    };
  }, []);

  useEffect(() => {
    if (!isRowsArray(value) || value.length === 0) {
      // Manual `.execute()` runs flash through `setOutput(undefined)`
      // before the new result arrives. Don't wipe the prior dataset
      // here — the next valid value needs it to compute the diff.
      // (Live updates never transit through undefined, so they were
      // already fine.)
      return;
    }
    const firstRow = value[0]!;
    const keyCol = "id" in firstRow ? "id" : Object.keys(firstRow)[0]!;
    const fresh = new Set<string>();
    const cells = new Set<string>();
    const nextById = new Map<string, Record<string, unknown>>();
    for (const r of value) {
      const k = r[keyCol];
      if (typeof k !== "string" && typeof k !== "number") continue;
      const key = String(k);
      nextById.set(key, r);
      const prev = prevByIdRef.current.get(key);
      if (!prev) {
        fresh.add(key);
        continue;
      }
      for (const col of Object.keys(r)) {
        if (col === keyCol) continue;
        if (!cellEq(prev[col], r[col])) {
          cells.add(`${key}.${col}`);
        }
      }
    }
    prevByIdRef.current = nextById;
    if (isFirstYieldRef.current) {
      isFirstYieldRef.current = false;
      return;
    }
    if (fresh.size === 0 && cells.size === 0) return;
    setRowGen((prev) => {
      const next = new Map(prev);
      for (const k of fresh) next.set(k, (next.get(k) ?? 0) + 1);
      return next;
    });
    setCellGen((prev) => {
      const next = new Map(prev);
      for (const k of cells) next.set(k, (next.get(k) ?? 0) + 1);
      return next;
    });
    // After the animation duration, clear the entries so the
    // `animate-*-flash` class no longer hangs on the element. Lingering
    // classes can trigger spurious re-flashes during reconciliation when
    // unrelated rows update.
    for (const k of fresh) {
      const prevTimer = rowTimersRef.current.get(k);
      if (prevTimer) clearTimeout(prevTimer);
      rowTimersRef.current.set(k, setTimeout(() => {
        setRowGen((m) => { const next = new Map(m); next.delete(k); return next; });
        rowTimersRef.current.delete(k);
      }, FLASH_MS));
    }
    for (const k of cells) {
      const prevTimer = cellTimersRef.current.get(k);
      if (prevTimer) clearTimeout(prevTimer);
      cellTimersRef.current.set(k, setTimeout(() => {
        setCellGen((m) => { const next = new Map(m); next.delete(k); return next; });
        cellTimersRef.current.delete(k);
      }, FLASH_MS));
    }
  }, [value]);

  // Empty / undefined: placeholder. Stays mounted so diff state
  // survives the manual-Run undefined transition.
  if (value === undefined || value === null) {
    return (
      <div className="px-4 py-3 text-xs text-gray-500">
        {running ? "Running…" : "Click Run to execute the widget."}
      </div>
    );
  }
  if (!isRowsArray(value)) {
    return (
      <pre className="px-4 py-3 text-xs font-mono whitespace-pre-wrap text-gray-200">
        {JSON.stringify(value, null, 2)}
      </pre>
    );
  }
  const cols: string[] = [];
  for (const row of value) {
    for (const k of Object.keys(row)) {
      if (!cols.includes(k)) cols.push(k);
    }
  }
  return (
    <table className="w-full text-xs font-mono border-collapse">
      <thead className="bg-gray-900/80 sticky top-0">
        <tr>
          {cols.map((c) => (
            <th key={c} className="text-left font-medium text-gray-400 px-3 py-1.5 border-b border-gray-800">
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {value.map((row, i) => {
          const keyCol = "id" in row ? "id" : cols[0]!;
          const k = row[keyCol];
          const stableKey = typeof k === "string" || typeof k === "number" ? String(k) : null;
          const key = stableKey ?? i;
          const rGen = stableKey !== null ? rowGen.get(stableKey) ?? 0 : 0;
          return (
            <tr key={key} className="border-b border-gray-800/60 hover:bg-gray-900/40">
              {cols.map((c) => {
                const cKey = stableKey !== null ? `${stableKey}.${c}` : null;
                const cGen = cKey !== null ? cellGen.get(cKey) ?? 0 : 0;
                const animClass =
                  cGen > 0
                    ? "animate-cell-flash"
                    : rGen > 0
                      ? "animate-row-flash"
                      : "";
                const animKey = `${c}-${rGen}-${cGen}`;
                return (
                  <td key={c} className="px-3 py-1 align-top text-gray-200">
                    <span key={animKey} className={`block ${animClass}`}>
                      <Cell value={row[c]} />
                    </span>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const Cell = ({ value }: { value: unknown }) => {
  if (value === null) return <span className="text-gray-500 italic">null</span>;
  if (value === undefined) return <span className="text-gray-500 italic">—</span>;
  if (typeof value === "string") return <>{value}</>;
  if (typeof value === "number" || typeof value === "bigint") return <>{String(value)}</>;
  if (typeof value === "boolean") return <span className="text-blue-300">{String(value)}</span>;
  if (isPlainObject(value)) {
    const keys = Object.keys(value);
    if (keys.length === 1) return <Cell value={value[keys[0]!]} />;
  }
  return <span className="text-gray-400 text-[11px]">{JSON.stringify(value)}</span>;
};

// SQL tab — formats with sql-formatter (postgresql) and highlights
// via SyntaxHighlight (same prism-react-renderer path as the home
// page's CodeEditor).
const SqlView = ({ entries }: { entries: Array<{ text: string; params: unknown[] }> }) => {
  if (entries.length === 0) {
    return (
      <div className="px-4 py-3 text-xs text-gray-500">
        No SQL captured. Add <code className="font-mono text-gray-400">.debug()</code> to a query
        chain to log its compiled form here.
      </div>
    );
  }
  return (
    <div className="px-4 py-3 space-y-4">
      {entries.map((e, i) => (
        <div key={i}>
          <SqlBlock sql={e.text} />
          {e.params.length > 0 && (
            <div className="mt-2 text-[11px] text-gray-500">
              params:{" "}
              <span className="text-gray-300 font-mono">{JSON.stringify(e.params)}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const SqlBlock = ({ sql }: { sql: string }) => {
  const [formatted, setFormatted] = useState<string>(sql);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { format } = await import("sql-formatter");
        const text = format(sql, { language: "postgresql", tabWidth: 2, keywordCase: "upper" });
        if (!cancelled) setFormatted(text);
      } catch {
        if (!cancelled) setFormatted(sql);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sql]);
  return (
    <div className="bg-gray-950/60 rounded p-3 border border-gray-800">
      <SyntaxHighlight code={formatted} language="sql" className="text-xs" />
    </div>
  );
};
