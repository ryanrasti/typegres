"use client";

import { useState, useEffect } from "react";
import { Database, FileCode, Terminal } from "lucide-react";
import { TypegresPlayground } from "@/components/TypegresPlayground";
import { SyntaxHighlight } from "@/components/SyntaxHighlight";

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<"output" | "sql">("output");
  const [output, setOutput] = useState("");
  const [sqlOutput, setSqlOutput] = useState("");
  const [runCode, setRunCode] = useState<(() => Promise<void>) | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRunOnce, setHasRunOnce] = useState(false);
  const [showAttention, setShowAttention] = useState(false);

  // Periodic attention animation
  useEffect(() => {
    if (!hasRunOnce && runCode && !isRunning) {
      const interval = setInterval(() => {
        setShowAttention(true);
        setTimeout(() => setShowAttention(false), 1000);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [hasRunOnce, runCode, isRunning]);

  return (
    <div className="min-h-screen bg-white dark:bg-typegres-dark text-typegres-dark dark:text-white">
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <a href="/" className="flex items-center gap-3">
                <div className="flex items-center gap-2">
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
                </div>
              </a>
              <h1 className="text-lg font-medium">TypeScript Playground</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Code Editor */}
        <div className="w-1/2 border-r border-gray-200 dark:border-gray-800">
          <div className="h-12 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center">
              <FileCode className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">TypeScript Code</span>
            </div>
            <button
              onClick={async () => {
                if (runCode && !isRunning) {
                  setIsRunning(true);
                  setHasRunOnce(true);
                  try {
                    await runCode();
                  } finally {
                    setIsRunning(false);
                  }
                }
              }}
              disabled={!runCode || isRunning}
              className={`px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 relative overflow-hidden ${
                !hasRunOnce && runCode && !isRunning ? 'animate-pulse shadow-lg shadow-blue-500/50' : ''
              } ${
                showAttention ? 'scale-105 shadow-xl shadow-blue-500/60' : ''
              }`}
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
              {isRunning ? 'Running...' : 'Run Code'}
              {/* Shimmer effect */}
              {!hasRunOnce && runCode && !isRunning && (
                <div className="absolute inset-0 -top-1/2 -bottom-1/2 opacity-30">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 animate-shimmer" />
                </div>
              )}
            </button>
          </div>
          <div className="h-[calc(100%-48px)]">
            <TypegresPlayground 
              activeTab={activeTab}
              onOutputChange={setOutput}
              onSqlChange={setSqlOutput}
              onRunCode={(val) => setRunCode(() => val)}
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="w-1/2 flex flex-col">
          <div className="h-12 border-b border-gray-200 dark:border-gray-800 flex items-center bg-gray-50 dark:bg-gray-900">
            <button
              className={`px-4 h-full text-sm font-medium flex items-center gap-2 relative ${
                activeTab === "output"
                  ? "text-typegres-blue"
                  : "text-gray-600 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("output")}
            >
              <Terminal className="w-4 h-4" />
              Output
              {activeTab === "output" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-typegres-blue" />
              )}
            </button>
            <button
              className={`px-4 h-full text-sm font-medium flex items-center gap-2 relative ${
                activeTab === "sql"
                  ? "text-typegres-blue"
                  : "text-gray-600 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("sql")}
            >
              <Database className="w-4 h-4" />
              Generated SQL
              {activeTab === "sql" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-typegres-blue" />
              )}
            </button>
          </div>
          <div className="h-[calc(100%-48px)] p-4 bg-gray-900 overflow-auto">
            {activeTab === "output" ? (
              <div className="text-gray-200">
                {output ? (
                  output.startsWith('Error:') ? (
                    <pre className="text-red-400 whitespace-pre-wrap text-sm font-mono">{output}</pre>
                  ) : (
                    <SyntaxHighlight code={output} language="typescript" className="text-sm" />
                  )
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
    </div>
  );
}
