"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import {
  setupMonacoWithTypegres,
  transformCodeWithEsbuild,
} from "@/lib/monaco-typegres-integration";

declare global {
  interface Window {
    typegres: any;
    pglite: any;
  }
}

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

interface TypegresPlaygroundProps {
  initialCode?: string;
  height?: string;
}

export function TypegresPlayground({
  initialCode = `import { db, Int4 } from 'typegres'

const dbR = await db({ type: 'pglite' });

const result = await Int4.new(2).int4Pl(2).execute(dbR)

console.log(result)
`,
  height = "800px",
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
      // Load the typegres bundle if not already loaded
      if (!window.typegres) {
        await import('@electric-sql/pglite');
        try {
          const typegresModule = await import('../../public/typegres');
          window.typegres = typegresModule;
          
          console.log('Typegres bundle loaded:', window.typegres);
        } catch (error) {
          console.error('Failed to load typegres bundle:', error);
          throw new Error('Failed to load typegres bundle');
        }
      }

      // Transform the TypeScript code and replace imports
      const jsCode = await transformCodeWithEsbuild(code);
      
      // Replace import statements with destructuring from the typegres parameter
      const transformedCode = jsCode.replace(
        /import\s*\{([^}]+)\}\s*from\s*['"]typegres['"]/g,
        'const {$1} = typegres'
      );

      console.log("Transformed code:", transformedCode);

      // Create an async function that executes the transformed code
      const executeCode = new Function('typegres', `
        return (async () => {
          ${transformedCode}
          
          // Capture any result variable if it exists
          if (typeof result !== 'undefined' && result) {
            if (typeof result.compile === 'function') {
              return result.compile();
            }
            return { result };
          }
          return null;
        })();
      `);

      // Execute the code with typegres
      const compiledResult = await executeCode(window.typegres);
      
      if (compiledResult && compiledResult.sql) {
        setOutput({
          sql: `-- Generated SQL:\n${compiledResult.sql}\n\n-- Parameters:\n${JSON.stringify(compiledResult.parameters, null, 2)}`,
        });
      } else if (compiledResult && compiledResult.result) {
        setOutput({
          sql: `// Result:\n${JSON.stringify(compiledResult.result, null, 2)}`,
        });
      } else {
        setOutput({
          sql: "// No result was generated. Make sure to assign your query/expression to a variable named 'result'.",
        });
      }
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
