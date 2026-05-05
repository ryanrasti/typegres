import { useEffect, useMemo, useRef, useState } from "react";
import * as monaco from "monaco-editor";

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
import widgetSrc from "@/demo/widgets/main.ts?raw";

// Runtime modules — give the eval'd widget code something real to run against.
import { sql } from "typegres";
import { db } from "@/demo/runtime";
import { Organizations } from "@/demo/schema/organizations";
import { Operators } from "@/demo/schema/operators";
import { Locations } from "@/demo/schema/locations";
import { Customers } from "@/demo/schema/customers";
import { InventoryPositions } from "@/demo/schema/inventory_positions";
import { Orders } from "@/demo/schema/orders";
import { OrderLines } from "@/demo/schema/order_lines";
import { Shipments } from "@/demo/schema/shipments";
import { operatorFromToken } from "@/demo/server/api";

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

  const activeFile = useMemo(() => FILES.find((f) => f.path === activePath)!, [activePath]);

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

      // Create one model per file (idempotent across HMR).
      for (const f of FILES) {
        if (!monaco.editor.getModel(f.uri)) {
          monaco.editor.createModel(f.content, "typescript", f.uri);
        }
      }

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

      // The widget is a TS module with `import` lines (for type
      // resolution in Monaco) and `export default async function
      // widget() { ... }`. To execute it we:
      //   1. strip the imports (the body references names we'll
      //      provide via closure, not via real module loading)
      //   2. drop the `export default` keyword so it becomes a plain
      //      function declaration
      //   3. esbuild-transform any TS-isms to JS
      //   4. wrap in `new Function` with the demo runtime as scope,
      //      and invoke `widget()` to get the result
      const noImports = userSrc.replace(/^\s*import .*?;?\s*$/gm, "");
      const noExport = noImports.replace(/^\s*export\s+default\s+/m, "");
      const transformed = await transformCodeWithEsbuild(noExport);

      const fn = new (Function as any)(
        "ctx",
        `const { db, sql, Organizations, Operators, Locations, Customers,
                InventoryPositions, Orders, OrderLines, Shipments,
                operatorFromToken } = ctx;
         ${transformed}
         return widget();`,
      );
      const result = await fn({
        db, sql,
        Organizations, Operators, Locations, Customers,
        InventoryPositions, Orders, OrderLines, Shipments,
        operatorFromToken,
      });
      setOutput(JSON.stringify(result, null, 2));
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

        {/* Editor + result */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="border-b border-gray-800 bg-gray-900 px-3 py-1.5 text-xs text-gray-400 flex items-center gap-3">
            <span>{activeFile.path}</span>
            {!activeFile.editable && (
              <span className="px-1.5 py-0.5 rounded bg-gray-800 text-gray-500 text-[10px]">
                read-only
              </span>
            )}
          </div>
          <div ref={containerRef} className="flex-1" />

          <div className="border-t border-gray-800 bg-gray-900 max-h-[40%] overflow-y-auto">
            <div className="px-4 py-2 border-b border-gray-800 text-xs font-medium text-gray-400 uppercase tracking-wide">
              Output
            </div>
            <pre className="px-4 py-3 text-xs font-mono whitespace-pre-wrap">
              {error ? (
                <span className="text-red-400">{error}</span>
              ) : output ? (
                <span className="text-gray-200">{output}</span>
              ) : (
                <span className="text-gray-500">Click Run to execute the widget.</span>
              )}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}

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
