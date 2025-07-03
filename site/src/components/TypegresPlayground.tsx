"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import {
  setupMonacoWithTypegres,
  transformCodeWithEsbuild,
} from "@/lib/monaco-typegres-integration";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

interface TypegresPlaygroundProps {
  initialCode?: string;
  height?: string;
}

export function TypegresPlayground({
  initialCode = `import { db } from 'typegres'

// Example query
const result = db
  .selectFrom('users')
  .select(['id', 'name', 'email'])
  .where('active', '=', true)
  .orderBy('created_at', 'desc')
  .limit(10)

console.log(result)`,
  height = "400px",
}: TypegresPlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<{ sql?: string; error?: string }>({});
  const [typesLoaded, setTypesLoaded] = useState(false);
  const monacoRef = useRef<any>(null);

  const handleEditorMount = (editor: any, monaco: any) => {
    monacoRef.current = monaco;

    // Load types when editor mounts
    const loadTypes = async () => {
      try {
        console.log("Loading Typegres types...");
        await setupMonacoWithTypegres(monaco);
        setTypesLoaded(true);
        console.log("Typegres types loaded successfully");
      } catch (error) {
        console.error("Failed to load types:", error);
      }
    };

    loadTypes();
  };

  const runCode = async () => {
    try {
      // Transform the TypeScript code
      const jsCode = await transformCodeWithEsbuild(code);

      // For now, just show the transformed code
      setOutput({
        sql: `// Transformed JavaScript:\n${jsCode}`,
      });

      // TODO: Actually execute the code with the pre-built typegres.js
    } catch (error) {
      setOutput({
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden">
        <MonacoEditor
          height={height}
          defaultLanguage="typescript"
          theme="vs-dark"
          value={code}
          onChange={(value) => {
            setCode(value || "");
          }}
          onMount={handleEditorMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineHeight: 1.6,
            tabSize: 2,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            fixedOverflowWidgets: true,
          }}
        />
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={runCode}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Run Code
        </button>
        {typesLoaded && (
          <span className="text-sm text-green-500">✓ Types loaded</span>
        )}
      </div>

      {(output.sql || output.error) && (
        <div className="border rounded-lg p-4 bg-gray-900">
          {output.error ? (
            <pre className="text-red-400">{output.error}</pre>
          ) : (
            <pre className="text-gray-300">{output.sql}</pre>
          )}
        </div>
      )}
    </div>
  );
}
