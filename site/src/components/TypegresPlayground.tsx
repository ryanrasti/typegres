"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import inspect from "object-inspect";
import { format } from "sql-formatter";
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
  db?: any;
  activeTab?: string;
  onOutputChange?: (output: string) => void;
  onSqlChange?: (sql: string) => void;
}

export function TypegresPlayground({
  initialCode = `import { db, Int4 } from 'typegres'

const dbR = await db({ type: 'pglite' });

const result = await Int4.new(2).int4Pl(2).execute(dbR)

console.log(result)
`,
  height = "800px",
  db,
  activeTab,
  onOutputChange,
  onSqlChange,
}: TypegresPlaygroundProps) {
  const [code, setCode] = useState("");
  useEffect(() => {
    fetch("/demo.ts.static")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch initial code: ${response.statusText}`
          );
        }
        return response.text();
      })
      .then((text) => setCode(text))
      .catch((error) => {
        console.error("Error fetching initial code:", error);
      });
    setCode(initialCode);
  }, [initialCode]);

  const [output, setOutput] = useState<string>("");
  const [sqlOutput, setSqlOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
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
  
  // Call callbacks when output changes
  useEffect(() => {
    if (onOutputChange) {
      onOutputChange(error ? `Error: ${error}` : output);
    }
  }, [output, error, onOutputChange]);
  
  useEffect(() => {
    if (onSqlChange) {
      onSqlChange(sqlOutput);
    }
  }, [sqlOutput, onSqlChange]);

  const runCode = async () => {
    // Clear previous outputs
    setOutput("");
    setSqlOutput("");
    setError("");
    
    // Save the original console.log
    const originalConsoleLog = console.log;
    
    // Create arrays to capture logs and SQL queries
    const logs: any[] = [];
    const sqlQueries: Array<{ sql: string; parameters?: any[] }> = [];
    
    try {
      // Load the typegres bundle if not already loaded
      if (!window.typegres) {
        await import("@electric-sql/pglite");
        try {
          // @ts-ignore
          const typegresModule = await import("../../public/typegres");
          window.typegres = typegresModule;
        } catch (error) {
          console.error("Failed to load typegres bundle:", error);
          throw new Error("Failed to load typegres bundle");
        }
      }

      // Transform the TypeScript code and replace imports
      const jsCode = await transformCodeWithEsbuild(code);

      // Replace import statements with destructuring from the typegres parameter
      const transformedCode = jsCode.replace(
        /import\s*\{([^}]+)\}\s*from\s*['"]typegres['"]/g,
        "const {$1} = window.typegres"
      );

      // Stub console.log
      console.log = (...args: any[]) => {
        // Call original console.log for debugging
        originalConsoleLog(...args);
        
        // Check if this is a "Debugging query:" log
        if (args[0] === "Debugging query:" && args[1] && typeof args[1] === 'object' && 'sql' in args[1]) {
          sqlQueries.push({
            sql: args[1].sql,
            parameters: args[1].parameters
          });
        } else {
          // Regular log
          logs.push(args);
        }
      };

      // Create an async function that executes the transformed code
      const executeCode = new Function(
        `
        return (async () => {
          ${transformedCode}          
        })();
      `
      );

      // Execute the code
      await executeCode();
      
      // Format the output with better object display using inspect
      const formattedLogs = logs.map((logArgs, index) => {
        const formattedArgs = logArgs.map((arg: any) => {
          if (typeof arg === 'object' && arg !== null) {
            // Use inspect for better object display
            return inspect(arg, {
              depth: 4,
              indent: 2,
            });
          }
          return String(arg);
        });
        
        // Join arguments with space
        return formattedArgs.join(' ');
      }).join('\n\n');
      
      setOutput(formattedLogs);
      
      // Format SQL output
      if (sqlQueries.length > 0) {
        const formattedParts: { sql: string; params?: string }[] = sqlQueries.map((query, index) => {
          let sql = format(query.sql, {
            language: 'postgresql',
            tabWidth: 2,
            keywordCase: 'upper',
            linesBetweenQueries: 2,
          });
          
          if (sqlQueries.length > 1) {
            sql = `-- Query ${index + 1}\n${sql}`;
          }
          
          let params = undefined;
          if (query.parameters && query.parameters.length > 0) {
            params = inspect(query.parameters, {
              depth: 3,
              colors: false,
              compact: false,
              sorted: true
            });
          }
          
          return { sql, params };
        });
        
        // Combine SQL and parameters
        const combinedOutput = formattedParts.map(part => {
          let result = part.sql;
          if (part.params) {
            result += `\n\n-- Parameters:\n/*\n${part.params}\n*/`;
          }
          return result;
        }).join('\n\n' + '-'.repeat(60) + '\n\n');
        
        setSqlOutput(combinedOutput);
      }
      
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      // Restore original console.log
      console.log = originalConsoleLog;
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
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
          Run Code
        </button>
        {typesLoaded && (
          <span className="text-sm text-green-500">✓ Types loaded</span>
        )}
      </div>
    </div>
  );
}
