"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Play, Database, FileCode, Terminal } from "lucide-react";
import { PGlite } from "@electric-sql/pglite";
import type * as Monaco from "monaco-editor";
import { TypegresPlayground } from "@/components/TypegresPlayground";

// Dynamically import Monaco Editor to avoid SSR issues
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const defaultCode = `import { db, sql } from 'typegres'
import type { Database } from 'typegres'

// Welcome to the Typegres Playground!
// This editor has full TypeScript support with type checking and autocompletion

// Example 1: Simple select query
const activeUsers = await db
  .selectFrom('users')
  .select(['id', 'name', 'email'])
  .where('active', '=', true)
  .execute()

console.log('Active users:', activeUsers)

// Example 2: Join with aggregation
const userStats = await db
  .selectFrom('users')
  .leftJoin('posts', 'posts.user_id', 'users.id')
  .select([
    'users.id',
    'users.name',
    sql\`COUNT(posts.id)\`.as('post_count'),
    sql\`COUNT(CASE WHEN posts.published THEN 1 END)\`.as('published_count')
  ])
  .groupBy(['users.id', 'users.name'])
  .having(sql\`COUNT(posts.id)\`, '>', 0)
  .orderBy('post_count', 'desc')
  .execute()

console.log('User statistics:', userStats)`;

export default function PlaygroundPage() {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [sqlOutput, setSqlOutput] = useState("");
  const [activeTab, setActiveTab] = useState<"output" | "sql">("output");
  const [isLoading, setIsLoading] = useState(false);
  const [db, setDb] = useState<PGlite | null>(null);
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor>();

  // Initialize PGLite
  useEffect(() => {
    const initDb = async () => {
      try {
        const pglite = new PGlite();
        await pglite.exec(`
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            active BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
          
          CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            title TEXT NOT NULL,
            content TEXT,
            published BOOLEAN DEFAULT false,
            view_count INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );

          -- Insert sample data
          INSERT INTO users (name, email, active) VALUES
            ('Alice Johnson', 'alice@example.com', true),
            ('Bob Smith', 'bob@example.com', true),
            ('Charlie Brown', 'charlie@example.com', false),
            ('Diana Prince', 'diana@example.com', true)
          ON CONFLICT (email) DO NOTHING;

          INSERT INTO posts (user_id, title, content, published, view_count) VALUES
            (1, 'Getting Started with TypeScript', 'TypeScript is amazing...', true, 150),
            (1, 'Advanced SQL Patterns', 'Let''s explore some SQL...', true, 230),
            (2, 'Database Design Principles', 'Good database design...', true, 89),
            (2, 'Query Optimization Tips', 'Here are some tips...', false, 45),
            (4, 'Modern Web Development', 'The web has evolved...', true, 312)
          ON CONFLICT DO NOTHING;
        `);
        setDb(pglite);
      } catch (error) {
        console.error("Failed to initialize database:", error);
      }
    };

    initDb();
  }, []);

  const executeCode = async () => {
    if (!db) return;

    setIsLoading(true);
    setActiveTab("output");

    try {
      // Parse the TypeScript code to extract SQL-like operations
      // This is a simulation - in reality, Typegres would compile to SQL
      const sqlQueries: string[] = [];
      const outputs: string[] = [];

      // Extract query patterns from the code
      if (
        code.includes("selectFrom('users')") &&
        code.includes("where('active'")
      ) {
        const result = await db.exec(
          "SELECT id, name, email FROM users WHERE active = true"
        );
        sqlQueries.push(
          "SELECT id, name, email FROM users WHERE active = true"
        );
        outputs.push(
          `Active users: ${JSON.stringify(result[0]?.rows || [], null, 2)}`
        );
      }

      if (
        code.includes("leftJoin('posts'") &&
        code.includes("COUNT(posts.id)")
      ) {
        const result = await db.exec(`
          SELECT 
            users.id,
            users.name,
            COUNT(posts.id) as post_count,
            COUNT(CASE WHEN posts.published THEN 1 END) as published_count
          FROM users
          LEFT JOIN posts ON posts.user_id = users.id
          GROUP BY users.id, users.name
          HAVING COUNT(posts.id) > 0
          ORDER BY post_count DESC
        `);
        sqlQueries.push(`SELECT 
  users.id,
  users.name,
  COUNT(posts.id) as post_count,
  COUNT(CASE WHEN posts.published THEN 1 END) as published_count
FROM users
LEFT JOIN posts ON posts.user_id = users.id
GROUP BY users.id, users.name
HAVING COUNT(posts.id) > 0
ORDER BY post_count DESC`);
        outputs.push(
          `User statistics: ${JSON.stringify(result[0]?.rows || [], null, 2)}`
        );
      }

      // Show the TypeScript code output
      setOutput(outputs.join("\\n\\n") || "No queries detected in the code");

      // Show the generated SQL
      setSqlOutput(
        sqlQueries.length > 0
          ? `-- Generated SQL from Typegres code:\\n\\n${sqlQueries.join(";\\n\\n")};`
          : "-- No SQL queries generated"
      );
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

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
            <button
              onClick={executeCode}
              disabled={isLoading || !db}
              className="flex items-center gap-2 px-4 py-2 bg-typegres-blue text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-4 h-4" />
              {isLoading ? "Running..." : "Run Code"}
            </button>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Code Editor */}
        <div className="w-1/2 border-r border-gray-200 dark:border-gray-800">
          <div className="h-12 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 bg-gray-50 dark:bg-gray-900">
            <FileCode className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">TypeScript Code</span>
          </div>
          <div className="h-[calc(100%-48px)]">
            <TypegresPlayground />
          </div>
        </div>

        {/* Output Panel */}
        <div className="w-1/2 flex flex-col">
          <div className="h-12 border-b border-gray-200 dark:border-gray-800 flex items-center bg-gray-50 dark:bg-gray-900">
            <button
              className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
                activeTab === "output"
                  ? "text-typegres-blue border-b-2 border-typegres-blue"
                  : "text-gray-600 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("output")}
            >
              <Terminal className="w-4 h-4" />
              Output
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
                activeTab === "sql"
                  ? "text-typegres-blue border-b-2 border-typegres-blue"
                  : "text-gray-600 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("sql")}
            >
              <Database className="w-4 h-4" />
              Generated SQL
            </button>
          </div>
          <div className="flex-1 p-4 bg-gray-900 text-gray-200 overflow-auto">
            {!db ? (
              <div className="text-yellow-400">Initializing database...</div>
            ) : (
              <pre className="whitespace-pre-wrap text-sm">
                {activeTab === "output" ? output : sqlOutput}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
