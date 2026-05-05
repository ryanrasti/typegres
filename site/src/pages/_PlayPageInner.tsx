// Eager shell: header + Monaco editor + file tree + output panel
// chrome. None of these depend on the PGlite-backed `client`, so
// they can render before runtime.ts finishes its top-level await.
//
// The output panel's actual content (user picker, run/stop, widgets,
// table) lives in `_PlayActiveArea.tsx`, lazy-loaded behind a
// Suspense boundary. While that's loading, the panel shows a
// "booting" placeholder.

import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { Group, Panel, Separator } from "react-resizable-panels";

// Vite worker setup — required for Monaco's TS language service
// (autocomplete, diagnostics, jump-to-def).
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import TsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

// The demo's source files, imported as raw text via Vite. Same files
// also imported normally inside _PlayActiveArea + _PlayWidgets for
// their actual implementation — one source of truth.
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
import ordersWidgetSrc from "@/demo/widgets/orders.ts?raw";
import inventoryWidgetSrc from "@/demo/widgets/inventory.ts?raw";

import { ORDERS_PATH, INVENTORY_PATH } from "./_PlayWidgets";

// Lazy: imports `client` (which transitively awaits PGlite). Until
// resolved, the parent Suspense shows a "booting" message.
const PlayActiveArea = lazy(() => import("./_PlayActiveArea"));

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

type FileNode = {
  path: string;
  uri: monaco.Uri;
  content: string;
  editable: boolean;
};

const FILES: FileNode[] = [
  { path: ORDERS_PATH,                    content: ordersWidgetSrc,       editable: true,  uri: monaco.Uri.parse("file:///widgets/orders.ts") },
  { path: INVENTORY_PATH,                 content: inventoryWidgetSrc,    editable: true,  uri: monaco.Uri.parse("file:///widgets/inventory.ts") },
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

export default function PlayPageInner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [activePath, setActivePath] = useState<string>(ORDERS_PATH);
  const [activeWidget, setActiveWidget] = useState<string>(ORDERS_PATH);
  // Default to expanded on desktop, collapsed on mobile (the file
  // tree eats valuable screen space on small viewports).
  const initialIsWide = typeof window === "undefined" || window.innerWidth >= 768;
  const [showFiles, setShowFiles] = useState(initialIsWide);
  const [modelsReady, setModelsReady] = useState(false);

  const activeFile = useMemo(() => FILES.find((f) => f.path === activePath)!, [activePath]);
  const isWide = useIsWide();

  // When a user clicks into an editable widget file, that becomes
  // the active widget. Browsing schemas / runtime / api leaves the
  // last-active widget alone.
  useEffect(() => {
    if (activeFile.editable) setActiveWidget(activeFile.path);
  }, [activeFile]);

  // Monaco setup. The TS-defaults + .d.ts wiring is one-time; the
  // editor instance has to be re-created when the container DOM
  // node changes (e.g. when the resizable Group remounts on a
  // viewport breakpoint flip). Re-running this effect on `isWide`
  // disposes the old editor and binds to the fresh container.
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

      // Load the bundled typegres .d.ts. The bundle already appends
      // `declare module "typegres/exoeval" { ... }` with real
      // RpcClient / inMemoryChannel / tool declarations; schemas
      // import from the root `typegres` directly.
      try {
        const res = await fetch("/typegres.d.ts");
        const raw = await res.text();
        const lib = `
declare module "typegres" {
${raw}
}
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

      // Create one model per file. Reset content if a model already
      // exists from a previous mount (HMR / strict-mode double-effect).
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
        // Tighter on mobile: smaller font, drop the gutter so code
        // gets more horizontal room.
        fontSize: isWide ? 15 : 12,
        lineHeight: isWide ? 22 : 18,
        lineNumbers: isWide ? "on" : "off",
        folding: isWide,
        glyphMargin: false,
        lineDecorationsWidth: isWide ? 10 : 0,
        lineNumbersMinChars: isWide ? 5 : 0,
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
  }, [isWide]);

  // Switch model when active tab changes.
  useEffect(() => {
    if (!editorRef.current || !activeFile) return;
    const model = monaco.editor.getModel(activeFile.uri);
    if (model) {
      editorRef.current.setModel(model);
      editorRef.current.updateOptions({ readOnly: !activeFile.editable });
    }
  }, [activeFile]);

  return (
    <main className="min-h-screen bg-gray-950 text-gray-200 flex flex-col">
      <header className="bg-white text-gray-900 border-b border-gray-200 px-6 py-2 flex items-center">
        <a href="/" className="flex items-center gap-2 group" aria-label="Typegres home">
          <img src="/typegres_icon.svg" alt="" className="h-7 w-auto" />
          <span className="text-xl font-semibold">
            <span className="text-gray-900">type</span>
            <span className="text-blue-600">gres</span>
          </span>
        </a>
        <a
          href="https://github.com/ryanrasti/typegres"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          <span>GitHub</span>
        </a>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {showFiles && (
          <aside className="w-60 border-r border-gray-800 bg-gray-900 overflow-y-auto p-2 text-sm">
            <div className="px-2 pt-1 pb-3 text-[11px] leading-snug text-gray-500 border-b border-gray-800 mb-2">
              <span className="text-gray-300">This is the entire backend.</span>{" "}
              Schemas, server, seed — all read-only. Edit a widget on
              the left to compose against it.
            </div>
            <FileTree files={FILES} active={activePath} onPick={setActivePath} />
          </aside>
        )}

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
              <Suspense fallback={<BootingOutput />}>
                <PlayActiveArea modelsReady={modelsReady} activeWidget={activeWidget} />
              </Suspense>
            </Panel>
          </Group>
        </div>
      </div>
    </main>
  );
}

const BootingOutput = () => (
  <div className="h-full w-full flex items-center justify-center bg-gray-900 text-sm text-gray-500">
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
      <span>Booting Postgres in your browser…</span>
    </div>
  </div>
);

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

const FileTree = ({
  files,
  active,
  onPick,
}: {
  files: FileNode[];
  active: string;
  onPick: (path: string) => void;
}) => {
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
