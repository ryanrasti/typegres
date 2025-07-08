"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import inspect from "object-inspect";
import { format } from "sql-formatter";
import { Database, FileCode, Terminal, Play, Copy, Check } from "lucide-react";
import { SyntaxHighlight } from "@/components/SyntaxHighlight";
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

export interface CodeEditorProps {
  initialCode?: string;
  layout?: "full" | "compact";
  height?: string;
  showLineNumbers?: boolean;
  editable?: boolean;
  onCodeChange?: (code: string) => void;
  className?: string;
}

export function CodeEditor({
  initialCode = "",
  layout = "full",
  height = "400px",
  showLineNumbers = true,
  editable = true,
  onCodeChange,
  className = "",
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>("");
  const [sqlOutput, setSqlOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"output" | "sql">("output");
  const [isRunning, setIsRunning] = useState(false);
  const [typesLoaded, setTypesLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const monacoRef = useRef<any>(null);

  useEffect(() => {
    if (initialCode && initialCode !== code) {
      setCode(initialCode);
    }
  }, [initialCode]);

  const handleEditorMount = (editor: any, monaco: any) => {
    monacoRef.current = monaco;

    const loadTypes = async () => {
      try {
        await setupMonacoWithTypegres(monaco);
        setTypesLoaded(true);
      } catch (error) {
        console.error("Failed to load types:", error);
      }
    };

    loadTypes();
  };

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
      const transformedCode = jsCode.replace(
        /import\s*\{([^}]+)\}\s*from\s*['"]typegres['"]/g,
        "const {$1} = window.typegres"
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
    }
  }, [code]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || "";
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  if (layout === "compact") {
    return (
      <div className={`rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 ${className}`}>
        <div className="bg-gray-900">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
            <span className="text-xs text-gray-400">TypeScript</span>
            <div className="flex items-center gap-2">
              <button
                onClick={runCode}
                disabled={isRunning}
                className="p-1.5 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isRunning ? (
                  <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                ) : (
                  <Play className="w-3 h-3" />
                )}
                Run
              </button>
              <button
                onClick={copyToClipboard}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div style={{ height }}>
            <MonacoEditor
              defaultLanguage="typescript"
              theme="vs-dark"
              value={code}
              onChange={handleCodeChange}
              onMount={handleEditorMount}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                lineHeight: 1.5,
                tabSize: 2,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                fixedOverflowWidgets: true,
                readOnly: !editable,
                lineNumbers: showLineNumbers ? "on" : "off",
                folding: false,
                lineDecorationsWidth: 10,
                lineNumbersMinChars: 3,
                padding: { top: 8, bottom: 8 },
              }}
            />
          </div>
        </div>
        
        {(output || error || sqlOutput) && (
          <div className="bg-gray-800 border-t border-gray-700">
            <div className="flex">
              <button
                className={`px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 relative ${
                  activeTab === "output"
                    ? "text-blue-400 bg-gray-900"
                    : "text-gray-400 hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("output")}
              >
                <Terminal className="w-3 h-3" />
                Output
              </button>
              <button
                className={`px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 relative ${
                  activeTab === "sql"
                    ? "text-blue-400 bg-gray-900"
                    : "text-gray-400 hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("sql")}
              >
                <Database className="w-3 h-3" />
                SQL
              </button>
            </div>
            <div className="p-3 bg-gray-900 max-h-64 overflow-auto">
              {activeTab === "output" ? (
                <div className="text-gray-200">
                  {error ? (
                    <pre className="text-red-400 whitespace-pre-wrap text-xs font-mono">Error: {error}</pre>
                  ) : output ? (
                    <SyntaxHighlight code={output} language="typescript" className="text-xs" />
                  ) : (
                    <span className="text-gray-500 text-xs">No output</span>
                  )}
                </div>
              ) : (
                <div className="text-gray-200">
                  {sqlOutput ? (
                    <SyntaxHighlight code={sqlOutput} language="sql" className="text-xs" />
                  ) : (
                    <span className="text-gray-500 text-xs">No SQL queries</span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`} style={{ height }}>
      <div className="flex-1 min-h-0">
        <MonacoEditor
          defaultLanguage="typescript"
          theme="vs-dark"
          value={code}
          onChange={handleCodeChange}
          onMount={handleEditorMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineHeight: 1.6,
            tabSize: 2,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            fixedOverflowWidgets: true,
            readOnly: !editable,
            lineNumbers: showLineNumbers ? "on" : "off",
          }}
        />
      </div>
    </div>
  );
}

export interface CodeEditorWithOutputProps extends Omit<CodeEditorProps, 'layout'> {
  onRunCode?: (runFunction: () => Promise<void>) => void;
  showRunButton?: boolean;
  runButtonText?: string;
  customRunButton?: (runCode: () => Promise<void>, isRunning: boolean) => React.ReactNode;
}

export function CodeEditorWithOutput({
  initialCode = "",
  height = "100%",
  showLineNumbers = true,
  editable = true,
  onCodeChange,
  className = "",
  onRunCode,
  showRunButton = true,
  runButtonText = "Run Code",
  customRunButton,
}: CodeEditorWithOutputProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>("");
  const [sqlOutput, setSqlOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"output" | "sql">("output");
  const [isRunning, setIsRunning] = useState(false);
  const [typesLoaded, setTypesLoaded] = useState(false);
  const monacoRef = useRef<any>(null);

  useEffect(() => {
    if (initialCode && initialCode !== code) {
      setCode(initialCode);
    }
  }, [initialCode]);

  const handleEditorMount = (editor: any, monaco: any) => {
    monacoRef.current = monaco;

    const loadTypes = async () => {
      try {
        await setupMonacoWithTypegres(monaco);
        setTypesLoaded(true);
      } catch (error) {
        console.error("Failed to load types:", error);
      }
    };

    loadTypes();
  };

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
      const transformedCode = jsCode.replace(
        /import\s*\{([^}]+)\}\s*from\s*['"]typegres['"]/g,
        "const {$1} = window.typegres"
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
    }
  }, [code]);

  useEffect(() => {
    if (onRunCode) {
      onRunCode(runCode);
    }
  }, [onRunCode, runCode]);

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || "";
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  return (
    <div className={`flex h-full ${className}`} style={{ height }}>
      <div className="w-1/2 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="h-12 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center">
            <FileCode className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">TypeScript Code</span>
          </div>
          {customRunButton ? (
            customRunButton(runCode, isRunning)
          ) : showRunButton ? (
            <button
              onClick={runCode}
              disabled={isRunning}
              className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isRunning ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
              {isRunning ? 'Running...' : runButtonText}
            </button>
          ) : null}
        </div>
        <div className="flex-1 min-h-0">
          <MonacoEditor
            defaultLanguage="typescript"
            theme="vs-dark"
            value={code}
            onChange={handleCodeChange}
            onMount={handleEditorMount}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineHeight: 1.6,
              tabSize: 2,
              automaticLayout: true,
              scrollBeyondLastLine: false,
              fixedOverflowWidgets: true,
              readOnly: !editable,
              lineNumbers: showLineNumbers ? "on" : "off",
              lineDecorationsWidth: 10,
            }}
          />
        </div>
      </div>

      <div className="w-1/2 flex flex-col">
        <div className="h-12 border-b border-gray-200 dark:border-gray-800 flex items-center bg-gray-50 dark:bg-gray-900">
          <button
            className={`px-4 h-full text-sm font-medium flex items-center gap-2 relative ${
              activeTab === "output"
                ? "text-blue-500 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("output")}
          >
            <Terminal className="w-4 h-4" />
            Output
            {activeTab === "output" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </button>
          <button
            className={`px-4 h-full text-sm font-medium flex items-center gap-2 relative ${
              activeTab === "sql"
                ? "text-blue-500 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("sql")}
          >
            <Database className="w-4 h-4" />
            Generated SQL
            {activeTab === "sql" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </button>
        </div>
        <div className="flex-1 min-h-0 p-4 bg-gray-900 overflow-auto">
          {activeTab === "output" ? (
            <div className="text-gray-200">
              {error ? (
                <pre className="text-red-400 whitespace-pre-wrap text-sm font-mono">Error: {error}</pre>
              ) : output ? (
                <SyntaxHighlight code={output} language="typescript" className="text-sm" />
              ) : (
                <span className="text-gray-500">Run code to see output</span>
              )}
            </div>
          ) : (
            <div className="text-gray-200">
              {sqlOutput ? (
                <SyntaxHighlight code={sqlOutput} language="sql" className="text-sm" />
              ) : (
                <span className="text-gray-500">No SQL queries captured</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}