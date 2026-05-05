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
import operatorsSrc from "@/demo/schema/operators.ts?raw";
import locationsSrc from "@/demo/schema/locations.ts?raw";
import customersSrc from "@/demo/schema/customers.ts?raw";
import inventoryPositionsSrc from "@/demo/schema/inventory_positions.ts?raw";
import ordersSrc from "@/demo/schema/orders.ts?raw";
import orderLinesSrc from "@/demo/schema/order_lines.ts?raw";
import shipmentsSrc from "@/demo/schema/shipments.ts?raw";
import apiSrc from "@/demo/server/api.ts?raw";
import rpcSrc from "@/demo/rpc.ts?raw";
import widgetSrc from "@/demo/widgets/main.ts?raw";

// Runtime modules — give the eval'd widget code something real to run
// against. Importing rpc.ts pulls in db + Api transitively (and runs
// migrations + seed via runtime.ts's top-level await).
import { rpc, _consumePendingRpc } from "@/demo/rpc";

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
  { path: "schema/operators.ts",          content: operatorsSrc,          editable: false, uri: monaco.Uri.parse("file:///schema/operators.ts") },
  { path: "schema/locations.ts",          content: locationsSrc,          editable: false, uri: monaco.Uri.parse("file:///schema/locations.ts") },
  { path: "schema/customers.ts",          content: customersSrc,          editable: false, uri: monaco.Uri.parse("file:///schema/customers.ts") },
  { path: "schema/inventory_positions.ts",content: inventoryPositionsSrc, editable: false, uri: monaco.Uri.parse("file:///schema/inventory_positions.ts") },
  { path: "schema/orders.ts",             content: ordersSrc,             editable: false, uri: monaco.Uri.parse("file:///schema/orders.ts") },
  { path: "schema/order_lines.ts",        content: orderLinesSrc,         editable: false, uri: monaco.Uri.parse("file:///schema/order_lines.ts") },
  { path: "schema/shipments.ts",          content: shipmentsSrc,          editable: false, uri: monaco.Uri.parse("file:///schema/shipments.ts") },
  { path: "server/api.ts",                content: apiSrc,                editable: false, uri: monaco.Uri.parse("file:///server/api.ts") },
  { path: "rpc.ts",                       content: rpcSrc,                editable: false, uri: monaco.Uri.parse("file:///rpc.ts") },
];

// No ambient declarations needed — the widget is a real TS module
// with imports, so Monaco resolves types through cross-file URIs.

export default function PlayPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [activePath, setActivePath] = useState<string>("widgets/main.ts");
  const [output, setOutput] = useState<string>("");
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string>("");
  const [opToken, setOpToken] = useState<OpToken>("op_brightship_alice");
  const [statusFilter, setStatusFilter] = useState<readonly Status[]>(["packed"]);
  const [groupBy, setGroupBy] = useState<GroupByCol>("none");
  const [modelsReady, setModelsReady] = useState(false);

  const activeFile = useMemo(() => FILES.find((f) => f.path === activePath)!, [activePath]);
  const isWide = useIsWide();

  // Whenever a control changes (and models exist), regenerate the
  // widget body. Per the design: the controls are a code generator;
  // the entire `rpc(...)` block is rewritten on each change.
  useEffect(() => {
    if (!modelsReady) return;
    const widgetModel = monaco.editor.getModel(FILES[0]!.uri);
    if (!widgetModel) return;
    const next = stampWidget(widgetModel.getValue(), { opToken, statusFilter, groupBy });
    if (next !== widgetModel.getValue()) {
      widgetModel.setValue(next);
    }
  }, [opToken, statusFilter, groupBy, modelsReady]);

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
declare module "typegres/types"       { export * from "typegres"; }
declare module "typegres/sql-builder" { export * from "typegres"; }
declare module "typegres/config"      { export * from "typegres"; }
declare module "typegres/exoeval"     { export * from "typegres"; }
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
      // content to the on-disk source so a stale corrupted value
      // doesn't survive across reloads.
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
        fontSize: 13,
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

  const run = async () => {
    setError("");
    setOutput("");
    setRunning(true);
    try {
      const widgetModel = monaco.editor.getModel(FILES[0]!.uri)!;
      const userSrc = widgetModel.getValue();

      // The widget is a TS module with `import` lines (for Monaco's
      // type resolver) and a top-level `doRpc(async (api) => {...})`
      // call. To execute it we:
      //   1. strip the imports (we provide `doRpc` via closure)
      //   2. esbuild-transform TS-isms to JS
      //   3. wrap in `new Function` and run — the doRpc call enqueues
      //      its promise; we await whichever promise was registered
      const noImports = userSrc.replace(/^\s*import .*?;?\s*$/gm, "");
      const transformed = await transformCodeWithEsbuild(noImports);

      const fn = new (Function as any)(
        "ctx",
        `const { rpc } = ctx;
         ${transformed}`,
      );
      fn({ rpc });
      const pending = _consumePendingRpc();
      if (!pending) {
        throw new Error("Widget did not call rpc(...)");
      }
      // Always iterate. One-shot closures yield exactly once; live
      // closures (e.g. `db.live(qb)`) keep yielding until the source
      // ends. The output panel updates on each yield.
      let any = false;
      for await (const value of pending) {
        any = true;
        setOutput(JSON.stringify(value, null, 2));
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
          <button
            onClick={run}
            disabled={running}
            className="px-3 py-1 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded disabled:opacity-50"
          >
            {running ? "Running..." : "Run ▶"}
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* File tree */}
        <aside className="w-60 border-r border-gray-800 bg-gray-900 overflow-y-auto p-2 text-sm">
          <FileTree files={FILES} active={activePath} onPick={setActivePath} />
        </aside>

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
            <Panel id="editor" defaultSize="62%" minSize="25%">
              <div className="h-full w-full flex flex-col">
                <div className="border-b border-gray-800 bg-gray-900 px-3 py-1.5 text-xs text-gray-400 flex items-center gap-3 shrink-0">
                  <span>{activeFile.path}</span>
                  {!activeFile.editable && (
                    <span className="px-1.5 py-0.5 rounded bg-gray-800 text-gray-500 text-[10px]">
                      read-only
                    </span>
                  )}
                </div>
                {activeFile.editable && (
                  <WidgetControls
                    opToken={opToken}
                    statusFilter={statusFilter}
                    groupBy={groupBy}
                    onOpToken={setOpToken}
                    onStatusFilter={setStatusFilter}
                    onGroupBy={setGroupBy}
                  />
                )}
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

            <Panel id="output" defaultSize="38%" minSize="15%">
              <div className="h-full w-full flex flex-col bg-gray-900">
                <div className="px-4 py-2 border-b border-gray-800 text-xs font-medium text-gray-400 uppercase tracking-wide shrink-0">
                  Output
                </div>
                <pre className="flex-1 min-h-0 overflow-auto px-4 py-3 text-xs font-mono whitespace-pre-wrap">
                  {error ? (
                    <span className="text-red-400">{error}</span>
                  ) : output ? (
                    <span className="text-gray-200">{output}</span>
                  ) : (
                    <span className="text-gray-500">Click Run to execute the widget.</span>
                  )}
                </pre>
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

// --- Widget code generator ---
//
// The controls drive the contents of the `rpc(async (api) => { ... });`
// block in widgets/main.ts. Every control change regenerates that
// block wholesale — user edits inside it don't survive the next
// click. Anything outside the block (imports, comments) is left
// untouched.

const OP_TOKENS = [
  { value: "op_brightship_alice", label: "Alice — Brightship (ops_lead)" },
  { value: "op_brightship_bob",   label: "Bob — Brightship (inventory_control)" },
  { value: "op_atlas_dave",       label: "Dave — Atlas (ops_lead)" },
] as const;
type OpToken = (typeof OP_TOKENS)[number]["value"];

const STATUSES = ["draft", "confirmed", "picking", "packed", "shipped", "delivered"] as const;
type Status = (typeof STATUSES)[number];

const GROUP_BY_COLS = ["none", "status", "priority"] as const;
type GroupByCol = (typeof GROUP_BY_COLS)[number];

function generateRpcBlock({
  opToken,
  statusFilter,
  groupBy,
}: {
  opToken: OpToken;
  statusFilter: readonly Status[];
  groupBy: GroupByCol;
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

  return `rpc(async (api) => {
  const op = await api.operator(${JSON.stringify(opToken)});

  // \`op.orders()\` is pre-\`where\`'d to op's organization. Switch the
  // operator above — same query, different scope, different data.
  return op.orders()${statusLine}${groupByLine}
    .select(({ orders }) => (${selectBody}))
    .execute(api.db);
});`;
}

// Replace the existing `rpc(async (api) => { ... });` call with a
// freshly stamped one. If no match is found we just return src
// unchanged — controls go inert rather than corrupting the file.
function stampWidget(
  src: string,
  opts: { opToken: OpToken; statusFilter: readonly Status[]; groupBy: GroupByCol },
): string {
  const next = generateRpcBlock(opts);
  // Anchor at column 0 so the literal `rpc(async (api)` inside the
  // leading doc comment doesn't get matched.
  const re = /^rpc\(async \(api\)[\s\S]*?^\}\);?/m;
  if (!re.test(src)) return src;
  return src.replace(re, next);
}

// --- Widget controls ---

const WidgetControls = ({
  opToken,
  statusFilter,
  groupBy,
  onOpToken,
  onStatusFilter,
  onGroupBy,
}: {
  opToken: OpToken;
  statusFilter: readonly Status[];
  groupBy: GroupByCol;
  onOpToken: (v: OpToken) => void;
  onStatusFilter: (v: readonly Status[]) => void;
  onGroupBy: (v: GroupByCol) => void;
}) => {
  const toggleStatus = (s: Status) => {
    onStatusFilter(statusFilter.includes(s) ? statusFilter.filter((x) => x !== s) : [...statusFilter, s]);
  };
  return (
    <div className="border-b border-gray-800 bg-gray-900/60 px-3 py-2 flex flex-wrap items-center gap-x-4 gap-y-2 shrink-0">
      <Field label="operator">
        <select
          value={opToken}
          onChange={(e) => onOpToken(e.target.value as OpToken)}
          className="bg-gray-800 text-gray-200 text-xs rounded px-2 py-1 border border-gray-700 focus:outline-none focus:border-blue-500"
        >
          {OP_TOKENS.map((o) => (
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
      <span className="text-[10px] text-gray-500 ml-auto">
        controls regenerate the rpc(...) block
      </span>
    </div>
  );
};

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
