"use client";

import { useState, useEffect } from "react";
import { CodeEditorWithOutput } from "@/components/CodeEditor";

export default function PlaygroundPage() {
  const [runCode, setRunCode] = useState<(() => Promise<void>) | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRunOnce, setHasRunOnce] = useState(false);
  const [showAttention, setShowAttention] = useState(false);
  const [initialCode, setInitialCode] = useState("");

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
            className={`px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 relative overflow-hidden ${
              !hasRunOnce && runCode && !running ? 'animate-pulse shadow-lg shadow-blue-500/50' : ''
            } ${
              showAttention ? 'scale-105 shadow-xl shadow-blue-500/60' : ''
            }`}
          >
            {running ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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
    </div>
  );
}
