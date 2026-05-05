import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as monaco from "monaco-editor";
import { Group, Panel, Separator } from "react-resizable-panels";

// Vite worker setup — required for Monaco's TS language service
// (autocomplete, diagnostics, jump-to-def). `@monaco-editor/react`
// would do this implicitly; we use raw `monaco-editor`.
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import TsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

// The demo's source files, imported as raw text via Vite. Same files
// also imported normally below for the runtime — one source of truth.
import runtimeSrc from "@/demo/runtime.ts?raw";
import seedSrc from "@/demo/seed.ts?raw";
import organizationsSrc from "@/demo/schema/organizations.ts?raw";
import usersSrc from "@/demo/schema/users.ts?raw";
import locationsSrc from "@/demo/schema/locations.ts?raw";
import customersSrc from "@/demo/schema/customers.ts?raw";
import inventoryPositionsSrc from "@/demo/schema/inventory_positions.ts?raw";
import ordersSrc from "@/demo/schema/orders.ts?raw";
import orderLinesSrc from "@/demo/schema/order_lines.ts?raw";
import shipmentsSrc from "@/demo/schema/shipments.ts?raw";
import apiSrc from "@/demo/server/api.ts?raw";
import widgetSrc from "@/demo/widgets/main.ts?raw";

// Runtime modules — give the eval'd widget code something real to run
// against. Importing rpc.ts pulls in db + Api transitively (and runs
// migrations + seed via runtime.ts's top-level await).
import { client, setCurrentUserToken } from "@/demo/server/api";

const rpc = client.run.bind(client);

import { transformCodeWithEsbuild } from "@/lib/monaco-typegres-integration";

declare global {
  interface Window {
    MonacoEnvironment?: monaco.Environment;
  }
}

self.MonacoEnvironment = {
  getWorker(_workerId: string, label: string) {
    if (label === "typescript" || label === "javascript") return new TsWorker();
    return new EditorWorker();
  },
};

// Files exposed in the file tree. Mirrors the on-disk layout of
// `src/demo/`. The widget is the only editable file; everything else
// is read-only "see how typegres works."
type FileNode = {
  path: string;        // for display + tab key
  uri: monaco.Uri;     // for Monaco's TS resolver
  content: string;
  editable: boolean;
};

const FILES: FileNode[] = [
  { path: "widgets/main.ts",              content: widgetSrc,             editable: true,  uri: monaco.Uri.parse("file:///widgets/main.ts") },
  { path: "runtime.ts",                   content: runtimeSrc,            editable: false, uri: monaco.Uri.parse("file:///runtime.ts") },
  { path: "seed.ts",                      content: seedSrc,               editable: false, uri: monaco.Uri.parse("file:///seed.ts") },
  { path: "schema/organizations.ts",      content: organizationsSrc,      editable: false, uri: monaco.Uri.parse("file:///schema/organizations.ts") },
  { path: "schema/users.ts",              content: usersSrc,              editable: false, uri: monaco.Uri.parse("file:///schema/users.ts") },
  { path: "schema/locations.ts",          content: locationsSrc,          editable: false, uri: monaco.Uri.parse("file:///schema/locations.ts") },
  { path: "schema/customers.ts",          content: customersSrc,          editable: false, uri: monaco.Uri.parse("file:///schema/customers.ts") },
  { path: "schema/inventory_positions.ts",content: inventoryPositionsSrc, editable: false, uri: monaco.Uri.parse("file:///schema/inventory_positions.ts") },
  { path: "schema/orders.ts",             content: ordersSrc,             editable: false, uri: monaco.Uri.parse("file:///schema/orders.ts") },
  { path: "schema/order_lines.ts",        content: orderLinesSrc,         editable: false, uri: monaco.Uri.parse("file:///schema/order_lines.ts") },
  { path: "schema/shipments.ts",          content: shipmentsSrc,          editable: false, uri: monaco.Uri.parse("file:///schema/shipments.ts") },
  { path: "server/api.ts",                content: apiSrc,                editable: false, uri: monaco.Uri.parse("file:///server/api.ts") },
];

// No ambient declarations needed — the widget is a real TS module
// with imports, so Monaco resolves types through cross-file URIs.

export default function PlayPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [activePath, setActivePath] = useState<string>("widgets/main.ts");
  const [output, setOutput] = useState<unknown>(undefined);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string>("");
  const [userToken, setUserToken] = useState<UserToken>("user_brightship_alice");
  const [statusFilter, setStatusFilter] = useState<readonly Status[]>([]);
  const [groupBy, setGroupBy] = useState<GroupByCol>("status");
  const [orderBy, setOrderBy] = useState<OrderByCol>("status");
  const [orderDir, setOrderDir] = useState<OrderDir>("asc");
  const [live, setLive] = useState(true);
  // Auto-cycle toggles. Default on so a visitor lands on a moving
  // table without having to touch anything; clicking either toggle
  // pauses that side of the cycle.
  const [autoInsert, setAutoInsert] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [showFiles, setShowFiles] = useState(false);
  const iterRef = useRef<AsyncIterator<unknown> | null>(null);
  const autoRanRef = useRef(false);
  const [modelsReady, setModelsReady] = useState(false);

  const activeFile = useMemo(() => FILES.find((f) => f.path === activePath)!, [activePath]);
  const isWide = useIsWide();

  // Whenever a control changes (and models exist), regenerate the
  // widget body. Per the design: the controls are a code generator;
  // the entire `rpc(...)` block is rewritten on each change. If a
  // query is currently running (live or otherwise), restart it so
  // the new code takes effect immediately — no Stop / Watch dance.
  useEffect(() => {
    if (!modelsReady) return;
    const widgetModel = monaco.editor.getModel(FILES[0]!.uri);
    if (!widgetModel) return;
    const next = stampWidget(widgetModel.getValue(), { userToken, statusFilter, groupBy, orderBy, orderDir, live });
    if (next === widgetModel.getValue()) return;
    widgetModel.setValue(next);
    if (running) {
      void (async () => {
        await stop();
        await run();
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken, statusFilter, groupBy, orderBy, orderDir, live, modelsReady]);

  // One-time Monaco setup: TS compiler options, typegres types, models.
  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;
    (async () => {
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2022,
        module: monaco.languages.typescript.ModuleKind.ESNext,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        allowNonTsExtensions: true,
        strict: true,
        esModuleInterop: true,
        jsx: monaco.languages.typescript.JsxEmit.None,
      });
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });
      monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

      // Load the bundled typegres .d.ts — single file with all
      // declarations. Wrap it as `typegres` module and re-export
      // through the submodule paths so `import { Int8 } from
      // "typegres/types"` etc. resolve. Pragmatic over precise.
      try {
        const res = await fetch("/typegres.d.ts");
        const raw = await res.text();
        const lib = `
declare module "typegres" {
${raw}
}
// The bundle already appends \`declare module "typegres/exoeval" {...}\`
// with the real RpcClient / inMemoryChannel / tool declarations.
// Schemas import from the root \`typegres\` directly — the subpath
// shims we used to keep here are no longer needed.
declare function output(value: unknown): void;
        `;
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          lib,
          "file:///node_modules/typegres/index.d.ts",
        );
      } catch (e) {
        console.error("Failed to load typegres types for Monaco:", e);
      }

      if (cancelled) return;

      // Create one model per file. If a model already exists from a
      // previous mount (HMR / strict-mode double-effect), reset its
      // content to the on-disk source — the widget is the only
      // editable file, but even there we'd rather lose in-memory
      // edits than carry stale shapes (e.g. a previous version's
      // `export default` keyword) into runtime.
      for (const f of FILES) {
        const existing = monaco.editor.getModel(f.uri);
        if (existing) {
          if (existing.getValue() !== f.content) existing.setValue(f.content);
        } else {
          monaco.editor.createModel(f.content, "typescript", f.uri);
        }
      }
      setModelsReady(true);

      const editor = monaco.editor.create(containerRef.current!, {
        model: monaco.editor.getModel(activeFile.uri),
        theme: "vs-dark",
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 15,
        lineHeight: 22,
        readOnly: !activeFile.editable,
        scrollBeyondLastLine: false,
      });
      editorRef.current = editor;
    })();

    return () => {
      cancelled = true;
      editorRef.current?.dispose();
      editorRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Switch model when active tab changes.
  useEffect(() => {
    if (!editorRef.current || !activeFile) return;
    const model = monaco.editor.getModel(activeFile.uri);
    if (model) {
      editorRef.current.setModel(model);
      editorRef.current.updateOptions({ readOnly: !activeFile.editable });
    }
  }, [activeFile]);

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

  // One-off mutations that fire through the same rpc wire. Side
  // effects propagate to any active live iterator (which then yields
  // a new snapshot and the table re-renders with row flashes).
  const insertOrder = async () => {
    try {
      await rpc(async (api) => (await api.currentUser()).insertDraftOrder(api.db));
    } catch (e) {
      setError(String(e instanceof Error ? e.message : e));
    }
  };
  const advanceRandom = async () => {
    try {
      await rpc(async (api) => (await api.currentUser()).advanceRandom(api.db));
    } catch (e) {
      setError(String(e instanceof Error ? e.message : e));
    }
  };

  // Mirror the dropdown into the api's ambient current-user token so
  // `api.currentUser()` calls inside widget closures resolve to it.
  useEffect(() => {
    setCurrentUserToken(userToken);
  }, [userToken]);

  // Two independent self-rescheduling timers. Each picks a random
  // delay in [7.5s, 22.5s] so the cycle feels organic instead of
  // metronomic, with staggered initial offsets so the two don't
  // bunch up on the first tick. Toggling the gate restarts the loop
  // with the new value visible.
  useEffect(() => {
    if (!autoInsert) return;
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const tick = async () => {
      if (stopped) return;
      await insertOrder();
      if (stopped) return;
      timer = setTimeout(tick, 7500 + Math.random() * 15000);
    };
    timer = setTimeout(tick, 3000 + Math.random() * 4000);
    return () => {
      stopped = true;
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoInsert, userToken]);

  useEffect(() => {
    if (!autoAdvance) return;
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const tick = async () => {
      if (stopped) return;
      await advanceRandom();
      if (stopped) return;
      timer = setTimeout(tick, 7500 + Math.random() * 15000);
    };
    timer = setTimeout(tick, 7000 + Math.random() * 4000);
    return () => {
      stopped = true;
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoAdvance, userToken]);

  // Auto-start on first load — `live` is on by default, so users land
  // on a streaming table without having to hit Watch.
  useEffect(() => {
    if (!modelsReady || autoRanRef.current) return;
    autoRanRef.current = true;
    void run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelsReady]);

  const run = async () => {
    setError("");
    setOutput(undefined);
    setRunning(true);
    try {
      const widgetModel = monaco.editor.getModel(FILES[0]!.uri)!;
      const userSrc = widgetModel.getValue();

      // The widget is a TS module with `import` lines (for Monaco's
      // type resolver) and a top-level `rpc(async (api) => {...})`
      // call. To execute it we:
      //   1. strip the imports (we provide `rpc` via closure)
      //   2. rewrite the leading `rpc(` to `return rpc(` so the
      //      function body's value is the rpc result
      //   3. esbuild-transform TS-isms to JS
      //   4. wrap in `new Function` and run — the returned hybrid is
      //      both Promise and AsyncIterable; we iterate either way
      // Strip imports — they're for Monaco's resolver, not runtime.
      const noImports = userSrc.replace(/^\s*import .*?;?\s*$/gm, "");
      const transformed = await transformCodeWithEsbuild(noImports);

      // Inject `rpc` and `output` into the widget's scope. The widget
      // is free-form code; it calls `output(value)` to send a result
      // (a Promise or AsyncIterable) to the play page. We capture the
      // last value handed to output — earlier ones are discarded so a
      // widget can iteratively refine without leaking state.
      let captured: AsyncIterable<unknown> | Promise<unknown> | null = null;
      const fn = new (Function as any)(
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
      // Always iterate. One-shot closures yield exactly once; live
      // closures (e.g. `db.live(qb)`) keep yielding until the source
      // ends. The output panel updates on each yield.
      // Iterate explicitly so we can hold the iterator handle for
      // a Stop button (live mode never terminates on its own).
      const it = (pending as AsyncIterable<unknown>)[Symbol.asyncIterator]();
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
      }
      if (!any) throw new Error("rpc(...) produced no values");
    } catch (e) {
      setError(String(e instanceof Error ? e.message + "\n" + e.stack : e));
    } finally {
      setRunning(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-200 flex flex-col">
      <header className="border-b border-gray-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">
            <span className="text-white">type</span>
            <span className="text-blue-400">gres</span>
          </span>
          <span className="text-xs text-gray-500">playground</span>
        </div>
        <div className="flex items-center gap-3">
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
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* File tree — collapsed by default. The visitor's first
            impression should be code + output; the rest of the
            backend is one click away. */}
        {showFiles && (
          <aside className="w-60 border-r border-gray-800 bg-gray-900 overflow-y-auto p-2 text-sm">
            <FileTree files={FILES} active={activePath} onPick={setActivePath} />
          </aside>
        )}

        {/* Editor + result. Horizontal split on md+, vertical on
            small screens. react-resizable-panels reads `direction`
            once at mount, so we key on the breakpoint to remount when
            it changes. */}
        <div className="flex-1 overflow-hidden">
          <Group
            key={isWide ? "h" : "v"}
            orientation={isWide ? "horizontal" : "vertical"}
            className="h-full w-full flex"
            style={{ flexDirection: isWide ? "row" : "column" }}
          >
            <Panel id="editor" defaultSize="50%" minSize="25%">
              <div className="h-full w-full flex flex-col">
                <div className="border-b border-gray-800 bg-gray-900 px-3 py-1.5 text-xs text-gray-400 flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setShowFiles((v) => !v)}
                    className="text-gray-500 hover:text-gray-200 px-1 -ml-1"
                    title={showFiles ? "Hide backend files" : "Show backend files (schemas, server, runtime)"}
                    aria-label={showFiles ? "Hide files" : "Show files"}
                  >
                    {showFiles ? "▾" : "▸"}
                  </button>
                  <span>{activeFile.path}</span>
                  {!activeFile.editable && (
                    <span className="px-1.5 py-0.5 rounded bg-gray-800 text-gray-500 text-[10px]">
                      read-only
                    </span>
                  )}
                </div>
                <div ref={containerRef} className="flex-1 min-h-0" />
              </div>
            </Panel>

            <Separator
              className={
                isWide
                  ? "w-1 bg-gray-800 hover:bg-blue-600 transition-colors cursor-col-resize"
                  : "h-1 bg-gray-800 hover:bg-blue-600 transition-colors cursor-row-resize"
              }
            />

            <Panel id="output" defaultSize="50%" minSize="15%">
              <div className="h-full w-full flex flex-col bg-gray-900">
                <WidgetControls
                  userToken={userToken}
                  statusFilter={statusFilter}
                  groupBy={groupBy}
                  orderBy={orderBy}
                  orderDir={orderDir}
                  live={live}
                  onUserToken={setUserToken}
                  onStatusFilter={setStatusFilter}
                  onGroupBy={setGroupBy}
                  onOrderBy={setOrderBy}
                  onOrderDir={setOrderDir}
                  onLive={setLive}
                />
                <div className="px-4 py-2 border-b border-gray-800 text-xs font-medium text-gray-400 uppercase tracking-wide shrink-0 flex items-center gap-3">
                  <span>Output</span>
                  {running && live && (
                    <span className="flex items-center gap-1 text-green-400 normal-case font-normal text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      live
                    </span>
                  )}
                  <div className="ml-auto flex items-center gap-2">
                    <ToggleButton
                      active={autoInsert}
                      onClick={() => setAutoInsert((v) => !v)}
                      title="Auto-insert a draft order every few seconds. Click to pause."
                    >
                      + auto-insert
                    </ToggleButton>
                    <ToggleButton
                      active={autoAdvance}
                      onClick={() => setAutoAdvance((v) => !v)}
                      title="Auto-advance a random non-delivered order every few seconds. Click to pause."
                    >
                      ↻ auto-advance
                    </ToggleButton>
                  </div>
                </div>
                <div className="flex-1 min-h-0 overflow-auto">
                  {error ? (
                    <pre className="px-4 py-3 text-xs font-mono whitespace-pre-wrap text-red-400">{error}</pre>
                  ) : output === undefined ? (
                    <div className="px-4 py-3 text-xs text-gray-500">Click Run to execute the widget.</div>
                  ) : (
                    <OutputView value={output} />
                  )}
                </div>
              </div>
            </Panel>
          </Group>
        </div>
      </div>
    </main>
  );
}

// Tracks viewport width for the resizable-panel direction switch.
function useIsWide(breakpointPx = 768): boolean {
  const [wide, setWide] = useState(
    typeof window === "undefined" ? true : window.innerWidth >= breakpointPx,
  );
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpointPx}px)`);
    const onChange = () => setWide(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [breakpointPx]);
  return wide;
}

// --- Output rendering ---
//
// Most rpc results are rows[] (array of plain objects). Render as a
// table; the keys of the first row become columns. Per-cell rule:
//   - primitive (string/number/bool/null) → render the value directly
//   - 1-key object              → unwrap to its single value
//                                 (e.g. `{ name: "Alice" }` → "Alice")
//   - multi-key object / array  → small inline JSON
// Anything else (a scalar result, a non-array, an empty list) falls
// back to a JSON `<pre>`.

const isPlainObject = (v: unknown): v is Record<string, unknown> => {
  if (v === null || typeof v !== "object" || Array.isArray(v)) return false;
  const proto = Object.getPrototypeOf(v);
  return proto === Object.prototype || proto === null;
};

const isRowsArray = (v: unknown): v is Record<string, unknown>[] =>
  Array.isArray(v) && v.length > 0 && v.every(isPlainObject);

const OutputView = ({ value }: { value: unknown }) => {
  // Diff against the previous yielded value to drive flash animations
  // on a live stream. Two cases:
  //   - row whose `id` is new since last yield → row-wide green flash
  //   - row whose `id` is the same but a cell value changed → that
  //     cell gets a yellow flash
  // Rows without an `id` never flash (we have no stable identity).
  const prevByIdRef = useRef<Map<string, Record<string, unknown>>>(new Map());
  const isFirstYieldRef = useRef(true);
  // Per-row / per-cell version counters. Bumped each time the cell
  // changes; the rendered <span> uses the version in its React key
  // so successive flashes within the animation window get a fresh
  // DOM element and the CSS animation restarts from frame 0.
  const [rowGen, setRowGen] = useState<Map<string, number>>(new Map());
  const [cellGen, setCellGen] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    if (!isRowsArray(value) || value.length === 0) {
      prevByIdRef.current = new Map();
      isFirstYieldRef.current = true;
      return;
    }
    // Choose a key column: prefer `id` when it's present (the
    // ungrouped row case), otherwise fall back to the first column
    // (the groupBy case — e.g. `status` is the natural key when
    // grouped by status). Composite group keys aren't handled.
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
      // Existing row — compare every other cell. JSON.stringify gives
      // a cheap structural compare for nested values like
      // `customer: { name: ... }`.
      for (const col of Object.keys(r)) {
        if (col === keyCol) continue;
        if (JSON.stringify(prev[col]) !== JSON.stringify(r[col])) {
          cells.add(`${key}.${col}`);
        }
      }
    }
    prevByIdRef.current = nextById;
    // First yield establishes the baseline — don't flash the entire
    // table just for showing up. Real changes start with the second
    // yield (a live mutation).
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
  }, [value]);

  if (!isRowsArray(value)) {
    return (
      <pre className="px-4 py-3 text-xs font-mono whitespace-pre-wrap text-gray-200">
        {JSON.stringify(value, null, 2)}
      </pre>
    );
  }
  // Column union across all rows — preserves first-row order, then
  // appends any new keys later rows introduce.
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
                // Highest-priority animation wins; cell change beats
                // row arrival when both happen (rare but possible).
                const animClass =
                  cGen > 0
                    ? "animate-cell-flash"
                    : rGen > 0
                      ? "animate-row-flash"
                      : "";
                // Bump the key on each flash so the <span> remounts —
                // browser then re-runs the CSS animation from frame 0
                // instead of being stuck mid-fade on the prior class.
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
  // 1-key object → unwrap (handles the `customer: { name: "Alice" }` case
  // produced by `relation().select(...).scalar()`)
  if (isPlainObject(value)) {
    const keys = Object.keys(value);
    if (keys.length === 1) return <Cell value={value[keys[0]!]} />;
  }
  return (
    <span className="text-gray-400 text-[11px]">{JSON.stringify(value)}</span>
  );
};

// --- Widget code generator ---
//
// The controls drive the contents of the `rpc(async (api) => { ... });`
// block in widgets/main.ts. Every control change regenerates that
// block wholesale — user edits inside it don't survive the next
// click. Anything outside the block (imports, comments) is left
// untouched.

const USER_TOKENS = [
  { value: "user_brightship_alice", label: "Alice — Brightship (ops_lead)" },
  { value: "user_brightship_bob",   label: "Bob — Brightship (inventory_control)" },
  { value: "user_atlas_dave",       label: "Dave — Atlas (ops_lead)" },
] as const;
type UserToken = (typeof USER_TOKENS)[number]["value"];

const STATUSES = ["draft", "confirmed", "picking", "packed", "shipped", "delivered"] as const;
type Status = (typeof STATUSES)[number];

const GROUP_BY_COLS = ["none", "status", "priority"] as const;
type GroupByCol = (typeof GROUP_BY_COLS)[number];

const ORDER_BY_COLS = ["none", "id", "status", "priority", "created_at"] as const;
type OrderByCol = (typeof ORDER_BY_COLS)[number];

const ORDER_DIRS = ["asc", "desc"] as const;
type OrderDir = (typeof ORDER_DIRS)[number];

function generateRpcBlock({
  userToken,
  statusFilter,
  groupBy,
  orderBy,
  orderDir,
  live,
}: {
  userToken: UserToken;
  statusFilter: readonly Status[];
  groupBy: GroupByCol;
  orderBy: OrderByCol;
  orderDir: OrderDir;
  live: boolean;
}): string {
  // Status filter compiles to `.in(...)` regardless of arity. Empty
  // list short-circuits the filter (we just omit it) — Any.in itself
  // would emit FALSE which would make the query return nothing.
  const statusLine =
    statusFilter.length === 0
      ? ""
      : `\n    .where(({ orders }) => orders.status.in(${statusFilter
          .map((s) => JSON.stringify(s))
          .join(", ")}))`;

  const selectBody =
    groupBy === "none"
      ? `{
      id: orders.id,
      status: orders.status,
      customer: orders.customer().select(({ customers }) => ({ name: customers.name })).scalar(),
    }`
      : `{
      ${groupBy}: orders.${groupBy},
      count: orders.id.count(),
    }`;

  const groupByLine =
    groupBy === "none" ? "" : `\n    .groupBy(({ orders }) => [orders.${groupBy}])`;

  // orderBy by either an ungrouped column (most cases) or — when group
  // by is set — by the grouped column to keep things sortable.
  const orderByEntry =
    orderBy === "none"
      ? null
      : groupBy !== "none" && orderBy !== groupBy
        ? null
        : orderDir === "asc"
          ? `orders.${orderBy}`
          : `[orders.${orderBy}, "desc"]`;
  const orderByLine = orderByEntry ? `\n    .orderBy(({ orders }) => ${orderByEntry})` : "";

  const terminator = live ? "live" : "execute";

  return `const result = client.run(async (api) => {
  // This code is serialized and then (safely) run over RPC.

  // \`user\` is whoever's selected in the dropdown on the right.
  //  it scopes all operations to the current user.
  const user = await api.currentUser();
  //  ... e.g. user.orders() automatically has a
  //          \`where organization_id = ?\` inserted into it
  //           so it is scoped to the current user.
  return user.orders()${statusLine}${groupByLine}${orderByLine}
    .select(({ orders }) => (${selectBody}))
    .${terminator}(api.db);
});

// Render the result in the table on the right:
output(result);`;
}

// Replace the existing `rpc(async (api) => { ... });` call with a
// freshly stamped one. If no match is found we just return src
// unchanged — controls go inert rather than corrupting the file.
function stampWidget(
  src: string,
  opts: { userToken: UserToken; statusFilter: readonly Status[]; groupBy: GroupByCol; orderBy: OrderByCol; orderDir: OrderDir; live: boolean },
): string {
  const next = generateRpcBlock(opts);
  // Match `const result = client.run(async (api) => …);\noutput(result);`
  // anchored at column 0.
  const re = /^const result = client\.run\(async \(api\)[\s\S]*?^output\(result\);?/m;
  if (!re.test(src)) return src;
  return src.replace(re, next);
}

// --- Widget controls ---

const WidgetControls = ({
  userToken,
  statusFilter,
  groupBy,
  orderBy,
  orderDir,
  live,
  onUserToken,
  onStatusFilter,
  onGroupBy,
  onOrderBy,
  onOrderDir,
  onLive,
}: {
  userToken: UserToken;
  statusFilter: readonly Status[];
  groupBy: GroupByCol;
  orderBy: OrderByCol;
  orderDir: OrderDir;
  live: boolean;
  onUserToken: (v: UserToken) => void;
  onStatusFilter: (v: readonly Status[]) => void;
  onGroupBy: (v: GroupByCol) => void;
  onOrderBy: (v: OrderByCol) => void;
  onOrderDir: (v: OrderDir) => void;
  onLive: (v: boolean) => void;
}) => {
  const toggleStatus = (s: Status) => {
    onStatusFilter(statusFilter.includes(s) ? statusFilter.filter((x) => x !== s) : [...statusFilter, s]);
  };
  return (
    <div className="border-b border-gray-800 bg-gray-900/60 px-3 py-2 flex flex-wrap items-center gap-x-4 gap-y-2 shrink-0">
      <Field label="user">
        <select
          value={userToken}
          onChange={(e) => onUserToken(e.target.value as UserToken)}
          className="bg-gray-800 text-gray-200 text-xs rounded px-2 py-1 border border-gray-700 focus:outline-none focus:border-blue-500"
        >
          {USER_TOKENS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </Field>
      <Field label="status in">
        <div className="flex flex-wrap gap-1">
          {STATUSES.map((s) => {
            const active = statusFilter.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleStatus(s)}
                className={`text-[11px] px-1.5 py-0.5 rounded border transition-colors ${
                  active
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </Field>
      <Field label="group by">
        <select
          value={groupBy}
          onChange={(e) => onGroupBy(e.target.value as GroupByCol)}
          className="bg-gray-800 text-gray-200 text-xs rounded px-2 py-1 border border-gray-700 focus:outline-none focus:border-blue-500"
        >
          {GROUP_BY_COLS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </Field>
      <Field label="order by">
        <select
          value={orderBy}
          onChange={(e) => onOrderBy(e.target.value as OrderByCol)}
          className="bg-gray-800 text-gray-200 text-xs rounded px-2 py-1 border border-gray-700 focus:outline-none focus:border-blue-500"
        >
          {ORDER_BY_COLS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={orderDir}
          onChange={(e) => onOrderDir(e.target.value as OrderDir)}
          disabled={orderBy === "none"}
          className="bg-gray-800 text-gray-200 text-xs rounded px-2 py-1 border border-gray-700 focus:outline-none focus:border-blue-500 disabled:opacity-40"
        >
          {ORDER_DIRS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </Field>
      <Field label="live">
        <button
          type="button"
          onClick={() => onLive(!live)}
          className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
            live
              ? "bg-green-600 border-green-500 text-white"
              : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600"
          }`}
        >
          {live ? "● on" : "○ off"}
        </button>
      </Field>
      <span className="text-[10px] text-gray-500 ml-auto">
        controls regenerate the rpc(...) block
      </span>
    </div>
  );
};

const ToggleButton = ({
  active,
  onClick,
  title,
  children,
}: {
  active: boolean;
  onClick: () => void;
  title?: string;
  children: ReactNode;
}) => (
  <button
    onClick={onClick}
    title={title}
    className={`text-[11px] normal-case px-2 py-0.5 rounded border transition-colors ${
      active
        ? "border-blue-500 bg-blue-600/30 text-white"
        : "border-gray-700 text-gray-500 hover:border-gray-600 hover:text-gray-300"
    }`}
  >
    {children}
  </button>
);

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-wide">
    <span>{label}</span>
    {children}
  </label>
);

// --- File tree ---

const FileTree = ({
  files,
  active,
  onPick,
}: {
  files: FileNode[];
  active: string;
  onPick: (path: string) => void;
}) => {
  // Group by top-level dir.
  const groups = useMemo(() => {
    const out: { dir: string; files: FileNode[] }[] = [];
    for (const f of files) {
      const parts = f.path.split("/");
      const dir = parts.length > 1 ? parts[0]! : "";
      let bucket = out.find((g) => g.dir === dir);
      if (!bucket) {
        bucket = { dir, files: [] };
        out.push(bucket);
      }
      bucket.files.push(f);
    }
    return out;
  }, [files]);

  return (
    <div className="space-y-3">
      {groups.map((g) => (
        <div key={g.dir}>
          {g.dir && (
            <div className="px-2 py-1 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
              {g.dir}/
            </div>
          )}
          {g.files.map((f) => {
            const name = f.path.split("/").slice(-1)[0]!;
            return (
              <button
                key={f.path}
                onClick={() => onPick(f.path)}
                className={`w-full text-left px-2 py-1 rounded text-xs flex items-center gap-1.5 ${
                  f.path === active
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800/60"
                }`}
              >
                <span className="text-[10px]">{f.editable ? "✏️" : "🔒"}</span>
                <span className="font-mono">{name}</span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
