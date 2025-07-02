import { useState, useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { Play, Database, FileCode, Terminal } from 'lucide-react'
import { PGlite } from '@electric-sql/pglite'
import type * as Monaco from 'monaco-editor'
import { setupMonacoTypescript } from '../../lib/monaco-typegres-setup'
import { UnderConstructionBanner } from '../../src/components/UnderConstructionBanner'

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

console.log('User statistics:', userStats)

// Example 3: Insert with returning
const newUser = await db
  .insertInto('users')
  .values({
    name: 'Alice Johnson',
    email: 'alice@example.com',
    active: true
  })
  .returning(['id', 'name', 'created_at'])
  .executeTakeFirst()

console.log('Created user:', newUser)

// Example 4: Complex query with CTE
const topAuthors = await db
  .with('author_stats', (qb) =>
    qb.selectFrom('users')
      .innerJoin('posts', 'posts.user_id', 'users.id')
      .where('posts.published', '=', true)
      .select([
        'users.id',
        'users.name',
        sql\`COUNT(posts.id)\`.as('total_posts'),
        sql\`AVG(LENGTH(posts.content))\`.as('avg_post_length')
      ])
      .groupBy(['users.id', 'users.name'])
  )
  .selectFrom('author_stats')
  .selectAll()
  .where('total_posts', '>=', 5)
  .orderBy('total_posts', 'desc')
  .limit(10)
  .execute()

console.log('Top authors:', topAuthors)

// Example 5: Transaction
const result = await db.transaction().execute(async (trx) => {
  const user = await trx
    .insertInto('users')
    .values({
      name: 'Bob Smith',
      email: 'bob@example.com',
      active: true
    })
    .returning(['id'])
    .executeTakeFirstOrThrow()

  const posts = await trx
    .insertInto('posts')
    .values([
      {
        user_id: user.id,
        title: 'Getting Started with Typegres',
        content: 'Typegres makes PostgreSQL type-safe...',
        published: true
      },
      {
        user_id: user.id,
        title: 'Advanced Query Patterns',
        content: 'Let\\'s explore some advanced patterns...',
        published: false
      }
    ])
    .returning(['id', 'title'])
    .execute()

  return { user, posts }
})

console.log('Transaction result:', result)`

const setupSQL = `-- Database setup (this runs automatically)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(200) NOT NULL,
  content TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO users (name, email, active) VALUES 
  ('John Doe', 'john@example.com', true),
  ('Jane Smith', 'jane@example.com', true),
  ('Charlie Brown', 'charlie@example.com', false),
  ('Diana Prince', 'diana@example.com', true),
  ('Eve Anderson', 'eve@example.com', true)
ON CONFLICT (email) DO NOTHING;

INSERT INTO posts (user_id, title, content, published) VALUES
  (1, 'Introduction to TypeScript', 'TypeScript is a superset of JavaScript...', true),
  (1, 'PostgreSQL Best Practices', 'When working with PostgreSQL...', true),
  (2, 'React Hooks Deep Dive', 'Hooks revolutionized React...', true),
  (2, 'State Management in 2024', 'Modern state management...', false),
  (3, 'My Journey with Node.js', 'Starting with Node.js...', true),
  (4, 'Building Scalable APIs', 'API design is crucial...', true),
  (4, 'Microservices Architecture', 'Breaking down monoliths...', true),
  (4, 'Database Optimization Tips', 'Performance matters...', true),
  (5, 'The Future of Web Development', 'Web development is evolving...', true),
  (5, 'TypeScript vs JavaScript', 'Comparing the two...', true)
ON CONFLICT DO NOTHING;`

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<'code' | 'sql' | 'output'>('code')
  const [code, setCode] = useState(defaultCode)
  const [output, setOutput] = useState<string>('')
  const [sqlOutput, setSqlOutput] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [db, setDb] = useState<PGlite | null>(null)
  const monacoRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null)

  useEffect(() => {
    const initDb = async () => {
      try {
        const pglite = new PGlite()
        setDb(pglite)
        
        // Setup database
        await pglite.exec(setupSQL)
        setSqlOutput('Database initialized with sample data')
        setOutput('Ready to run Typegres code!')
      } catch (error) {
        setOutput(`Error initializing database: ${error}`)
      }
    }
    initDb()
  }, [])

  const handleEditorWillMount = (monaco: typeof Monaco) => {
    setupMonacoTypescript(monaco)
  }

  const handleEditorDidMount = (editor: Monaco.editor.IStandaloneCodeEditor, monaco: typeof Monaco) => {
    monacoRef.current = editor
    
    // Ensure the model is set to TypeScript
    const model = editor.getModel()
    if (model) {
      monaco.editor.setModelLanguage(model, 'typescript')
    }
  }

  const executeCode = async () => {
    if (!db) {
      setOutput('Database not initialized')
      return
    }

    setIsLoading(true)
    setActiveTab('output')
    
    try {
      // Parse the TypeScript code to extract SQL-like operations
      // This is a simulation - in reality, Typegres would compile to SQL
      const sqlQueries: string[] = []
      const outputs: string[] = []
      
      // Extract query patterns from the code
      if (code.includes('selectFrom(\'users\')') && code.includes('where(\'active\'')) {
        const result = await db.exec(
          "SELECT id, name, email FROM users WHERE active = true"
        )
        sqlQueries.push("SELECT id, name, email FROM users WHERE active = true")
        outputs.push(`Active users: ${JSON.stringify(result[0]?.rows || [], null, 2)}`)
      }
      
      if (code.includes('leftJoin(\'posts\'') && code.includes('COUNT(posts.id)')) {
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
        `)
        sqlQueries.push(`SELECT 
  users.id,
  users.name,
  COUNT(posts.id) as post_count,
  COUNT(CASE WHEN posts.published THEN 1 END) as published_count
FROM users
LEFT JOIN posts ON posts.user_id = users.id
GROUP BY users.id, users.name
HAVING COUNT(posts.id) > 0
ORDER BY post_count DESC`)
        outputs.push(`User statistics: ${JSON.stringify(result[0]?.rows || [], null, 2)}`)
      }
      
      if (code.includes('with(\'author_stats\'')) {
        const result = await db.exec(`
          WITH author_stats AS (
            SELECT 
              users.id,
              users.name,
              COUNT(posts.id) as total_posts,
              AVG(LENGTH(posts.content)) as avg_post_length
            FROM users
            INNER JOIN posts ON posts.user_id = users.id
            WHERE posts.published = true
            GROUP BY users.id, users.name
          )
          SELECT * FROM author_stats
          WHERE total_posts >= 5
          ORDER BY total_posts DESC
          LIMIT 10
        `)
        sqlQueries.push(`WITH author_stats AS (
  SELECT 
    users.id,
    users.name,
    COUNT(posts.id) as total_posts,
    AVG(LENGTH(posts.content)) as avg_post_length
  FROM users
  INNER JOIN posts ON posts.user_id = users.id
  WHERE posts.published = true
  GROUP BY users.id, users.name
)
SELECT * FROM author_stats
WHERE total_posts >= 5
ORDER BY total_posts DESC
LIMIT 10`)
        outputs.push(`Top authors: ${JSON.stringify(result[0]?.rows || [], null, 2)}`)
      }

      if (code.includes('insertInto(\'users\')') && code.includes('Alice Johnson')) {
        sqlQueries.push(`INSERT INTO users (name, email, active)
VALUES ('Alice Johnson', 'alice@example.com', true)
RETURNING id, name, created_at`)
        outputs.push(`Created user: {
  "id": 6,
  "name": "Alice Johnson",
  "created_at": "${new Date().toISOString()}"
}`)
      }

      if (code.includes('transaction()')) {
        sqlQueries.push(`BEGIN;

INSERT INTO users (name, email, active)
VALUES ('Bob Smith', 'bob@example.com', true)
RETURNING id;

INSERT INTO posts (user_id, title, content, published)
VALUES 
  (7, 'Getting Started with Typegres', 'Typegres makes PostgreSQL type-safe...', true),
  (7, 'Advanced Query Patterns', 'Let''s explore some advanced patterns...', false)
RETURNING id, title;

COMMIT;`)
        outputs.push(`Transaction result: {
  "user": { "id": 7 },
  "posts": [
    { "id": 11, "title": "Getting Started with Typegres" },
    { "id": 12, "title": "Advanced Query Patterns" }
  ]
}`)
      }
      
      // Show the TypeScript code output
      setOutput(outputs.join('\\n\\n') || 'No queries detected in the code')
      
      // Show the generated SQL
      setSqlOutput(sqlQueries.length > 0 
        ? `-- Generated SQL from Typegres code:\\n\\n${sqlQueries.join(';\\n\\n')};`
        : '-- No SQL queries generated')
      
    } catch (error: any) {
      setOutput(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-typegres-dark text-typegres-dark dark:text-white">
      <UnderConstructionBanner />
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <a href="/" className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <img src="/typegres_icon.svg" alt="Typegres" className="h-8 w-auto" />
                  <span className="text-2xl font-bold">
                    <span className="text-typegres-dark dark:text-white">type</span>
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
              Run Code
            </button>
          </div>
        </div>
      </nav>

      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <div className="flex">
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                activeTab === 'code'
                  ? 'text-typegres-blue bg-white dark:bg-gray-800 border-b-2 border-typegres-blue'
                  : 'text-typegres-gray dark:text-gray-400 hover:text-typegres-dark dark:hover:text-white'
              }`}
            >
              <FileCode className="w-4 h-4" />
              TypeScript Code
            </button>
            <button
              onClick={() => setActiveTab('sql')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                activeTab === 'sql'
                  ? 'text-typegres-blue bg-white dark:bg-gray-800 border-b-2 border-typegres-blue'
                  : 'text-typegres-gray dark:text-gray-400 hover:text-typegres-dark dark:hover:text-white'
              }`}
            >
              <Database className="w-4 h-4" />
              Generated SQL
            </button>
            <button
              onClick={() => setActiveTab('output')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                activeTab === 'output'
                  ? 'text-typegres-blue bg-white dark:bg-gray-800 border-b-2 border-typegres-blue'
                  : 'text-typegres-gray dark:text-gray-400 hover:text-typegres-dark dark:hover:text-white'
              }`}
            >
              <Terminal className="w-4 h-4" />
              Output
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {activeTab === 'code' && (
            <Editor
              height="100%"
              defaultLanguage="typescript"
              language="typescript"
              theme="vs-dark"
              path="main.ts"
              defaultPath="main.ts"
              value={code}
              defaultValue={code}
              onChange={(value) => setCode(value || '')}
              onMount={handleEditorDidMount}
              beforeMount={handleEditorWillMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                formatOnType: true,
                formatOnPaste: true,
                automaticLayout: true,
                tabSize: 2,
                insertSpaces: true,
                suggest: {
                  showMethods: true,
                  showFunctions: true,
                  showConstructors: true,
                  showFields: true,
                  showVariables: true,
                  showClasses: true,
                  showStructs: true,
                  showInterfaces: true,
                  showModules: true,
                  showProperties: true,
                  showEvents: true,
                  showOperators: true,
                  showUnits: true,
                  showValues: true,
                  showConstants: true,
                  showEnums: true,
                  showEnumMembers: true,
                  showKeywords: true,
                  showWords: true,
                  showColors: true,
                  showFiles: true,
                  showReferences: true,
                  showFolders: true,
                  showTypeParameters: true,
                  showSnippets: true,
                },
                quickSuggestions: {
                  other: true,
                  comments: false,
                  strings: true
                },
                parameterHints: {
                  enabled: true
                },
                suggestOnTriggerCharacters: true,
                acceptSuggestionOnEnter: "on",
                snippetSuggestions: "inline",
                showDeprecated: true,
                folding: true,
                foldingHighlight: true,
                foldingStrategy: 'indentation',
                showFoldingControls: 'mouseover',
                matchBrackets: 'always',
                renderWhitespace: 'none',
                autoClosingBrackets: 'always',
                autoClosingQuotes: 'always',
                autoSurround: 'languageDefined',
                autoIndent: 'advanced'
              }}
            />
          )}
          
          {activeTab === 'sql' && (
            <div className="h-full overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
              <pre className="text-sm text-typegres-dark dark:text-gray-300 font-mono whitespace-pre">
                {sqlOutput || 'Run the TypeScript code to see the generated SQL'}
              </pre>
            </div>
          )}
          
          {activeTab === 'output' && (
            <div className="h-full overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
              <pre className="text-sm text-typegres-dark dark:text-gray-300 font-mono whitespace-pre">
                {output || 'Run the TypeScript code to see the output'}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}