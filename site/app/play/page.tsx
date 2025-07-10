"use client";

import { useState, useEffect, useCallback } from "react";
import { CodeEditor, CodeEditorWithOutput } from "@/components/CodeEditor";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Github, Code, Terminal, Database } from "lucide-react";
import dynamic from "next/dynamic";
import inspect from "object-inspect";
import { format } from "sql-formatter";
import { SyntaxHighlight } from "@/components/SyntaxHighlight";
import {
  setupMonacoWithTypegres,
  transformCodeWithEsbuild,
} from "@/lib/monaco-typegres-integration";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

declare global {
  interface Window {
    typegres: any;
    pglite: any;
    cachedTg?: any; // Cache the typegres connection
  }
}

// Mobile playground component with tabs
function MobilePlayground({ initialCode }: { initialCode: string }) {
  const [activeTab, setActiveTab] = useState<'code' | 'output' | 'sql'>('code');
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>("");
  const [sqlOutput, setSqlOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (initialCode && initialCode !== code) {
      setCode(initialCode);
    }
  }, [initialCode]);

  const runCode = useCallback(async () => {
    setOutput("");
    setSqlOutput("");
    setError("");
    setIsRunning(true);

    const originalConsoleLog = console.log;
    const logs: any[] = [];
    const sqlQueries: Array<{ sql: string; parameters?: any[] }> = [];

    try {
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

      const jsCode = await transformCodeWithEsbuild(code);
      let transformedCode = jsCode.replace(
        /import\s*\{([^}]+)\}\s*from\s*['"]typegres['"]/g,
        "const {$1} = window.typegres"
      );
      
      // Replace typegres({ type: "pglite" }) with cached instance
      if (!window.cachedTg) {
        window.cachedTg = await window.typegres.typegres({ type: "pglite" });
      }
      
      // Replace the typegres initialization with our cached instance
      transformedCode = transformedCode.replace(
        /const\s+(\w+)\s*=\s*await\s+typegres\s*\(\s*\{\s*type\s*:\s*["']pglite["']\s*\}\s*\)/g,
        'const $1 = window.cachedTg'
      );

      console.log = (...args: any[]) => {
        originalConsoleLog(...args);
        
        if (args[0] === "Debugging query:" && args[1] && typeof args[1] === 'object' && 'sql' in args[1]) {
          sqlQueries.push({
            sql: args[1].sql,
            parameters: args[1].parameters
          });
        } else {
          logs.push(args);
        }
      };

      const executeCode = new Function(
        `
        return (async () => {
          ${transformedCode}          
        })();
      `
      );

      await executeCode();
      
      const formattedLogs = logs.map((logArgs) => {
        const formattedArgs = logArgs.map((arg: any) => {
          if (typeof arg === 'object' && arg !== null) {
            return inspect(arg, {
              depth: 4,
              indent: 2,
            });
          }
          return String(arg);
        });
        
        return formattedArgs.join(' ');
      }).join('\n\n');
      
      setOutput(formattedLogs);
      
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
            });
          }
          
          return { sql, params };
        });
        
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
      console.log = originalConsoleLog;
      setIsRunning(false);
      setActiveTab('output'); // Switch to output after completion
    }
  }, [code]);

  const handleEditorMount = (editor: any, monaco: any) => {
    const loadTypes = async () => {
      try {
        await setupMonacoWithTypegres(monaco);
      } catch (error) {
        console.error("Failed to load types:", error);
      }
    };

    loadTypes();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <button
          onClick={() => setActiveTab('code')}
          className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 relative ${
            activeTab === 'code'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          <Code className="w-4 h-4" />
          Code
          {activeTab === 'code' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('output')}
          className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 relative ${
            activeTab === 'output'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          <Terminal className="w-4 h-4" />
          Output
          {activeTab === 'output' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('sql')}
          className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 relative ${
            activeTab === 'sql'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          <Database className="w-4 h-4" />
          SQL
          {activeTab === 'sql' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Code tab */}
        <div className={`absolute inset-0 h-full flex flex-col ${activeTab === 'code' ? 'visible' : 'invisible'}`}>
          <div className="flex-1">
            <MonacoEditor
              defaultLanguage="typescript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              onMount={handleEditorMount}
              options={{
                minimap: { enabled: false },
                fontSize: 12,
                lineHeight: 1.5,
                tabSize: 2,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                fixedOverflowWidgets: true,
                lineNumbers: "off",
                folding: false,
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 0,
                glyphMargin: false,
                renderLineHighlight: 'none',
                overviewRulerLanes: 0,
              }}
            />
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isRunning ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Running...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Run Code
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Output tab */}
        <div className={`absolute inset-0 h-full p-4 bg-gray-900 overflow-auto ${activeTab === 'output' ? 'visible' : 'invisible'}`}>
          <div className="text-gray-200">
            {error ? (
              <pre className="text-red-400 whitespace-pre-wrap text-sm font-mono">Error: {error}</pre>
            ) : output ? (
              <SyntaxHighlight code={output} language="typescript" className="text-sm" />
            ) : (
              <span className="text-gray-500">Run code to see output</span>
            )}
          </div>
        </div>
        
        {/* SQL tab */}
        <div className={`absolute inset-0 h-full p-4 bg-gray-900 overflow-auto ${activeTab === 'sql' ? 'visible' : 'invisible'}`}>
          <div className="text-gray-200">
            {sqlOutput ? (
              <SyntaxHighlight code={sqlOutput} language="sql" className="text-sm" />
            ) : (
              <span className="text-gray-500">No SQL queries captured</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  const [runCode, setRunCode] = useState<(() => Promise<void>) | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRunOnce, setHasRunOnce] = useState(false);
  const [initialCode, setInitialCode] = useState("");
  const isMobile = useIsMobile();

  // Load initial code
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
      .then((text) => setInitialCode(text))
      .catch((error) => {
        console.error("Error fetching initial code:", error);
      });
  }, []);


  return (
    <div className="min-h-screen bg-white dark:bg-typegres-dark text-typegres-dark dark:text-white">
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 backdrop-blur">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2">
              <img
                src="/typegres_icon.svg"
                alt="Typegres"
                className="h-8 w-auto"
              />
              <span className="text-2xl font-bold">
                <span className="text-typegres-dark dark:text-white">
                  type
                </span>
                <span className="text-typegres-blue">gres</span>
              </span>
              <span className="text-gray-400 dark:text-gray-600 mx-2 hidden sm:inline">•</span>
              <span className="text-gray-600 dark:text-gray-400 hidden sm:inline">Playground</span>
            </a>
            <a
              href="https://github.com/ryanrasti/typegres"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </nav>

      {isMobile ? (
        <MobilePlayground
          initialCode={initialCode}
        />
      ) : (
        <CodeEditorWithOutput
          initialCode={initialCode}
          height="calc(100vh - 64px)"
          onRunCode={(fn) => {
            setRunCode(() => fn);
          }}
          customRunButton={(runFn, running) => (
          <button
            onClick={async () => {
              if (!running) {
                setIsRunning(true);
                setHasRunOnce(true);
                try {
                  await runFn();
                } finally {
                  setIsRunning(false);
                }
              }
            }}
            disabled={running}
            className={`${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'} bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 relative overflow-hidden`}
          >
            {running ? (
              <svg className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} animate-spin`} fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
            ) : (
              <svg className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
            {running ? 'Running...' : 'Run Code'}
            {/* Shimmer effect */}
            {!hasRunOnce && runCode && !running && (
              <div className="absolute inset-0 -top-1/2 -bottom-1/2 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 animate-shimmer" />
              </div>
            )}
          </button>
          )}
        />
      )}
    </div>
  );
}
