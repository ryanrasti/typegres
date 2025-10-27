import { PGlite } from '@electric-sql/pglite'
import { QueryClient } from 'typegres'

// Initialize PGlite with in-memory database
let pgLiteInstance: PGlite | null = null
let queryClient: QueryClient | null = null

export async function initializeDatabase() {
  if (pgLiteInstance) return { pgLite: pgLiteInstance, queryClient }

  // Create PGlite instance
  pgLiteInstance = new PGlite()
  
  // Run initial migration
  await pgLiteInstance.exec(`
    -- Create users table
    CREATE TABLE IF NOT EXISTS "User" (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );

    -- Create todos table
    CREATE TABLE IF NOT EXISTS "Todo" (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      content TEXT NOT NULL,
      completed BOOLEAN DEFAULT false NOT NULL,
      "dueDate" TIMESTAMP,
      priority INTEGER DEFAULT 0 NOT NULL,
      tags TEXT[] DEFAULT '{}',
      "userId" TEXT NOT NULL,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      
      CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" (id) ON DELETE CASCADE
    );

    -- Create indexes
    CREATE INDEX IF NOT EXISTS "Todo_userId_idx" ON "Todo" ("userId");
    CREATE INDEX IF NOT EXISTS "Todo_dueDate_idx" ON "Todo" ("dueDate");
    CREATE INDEX IF NOT EXISTS "Todo_priority_idx" ON "Todo" (priority);

    -- Insert test data
    INSERT INTO "User" (id, email, name) 
    VALUES ('user-1', 'test@example.com', 'Test User')
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO "Todo" (id, content, "userId", priority) 
    VALUES 
      ('todo-1', 'Build the demo', 'user-1', 5),
      ('todo-2', 'Test capabilities', 'user-1', 3),
      ('todo-3', 'Write documentation', 'user-1', 2)
    ON CONFLICT (id) DO NOTHING;
  `)

  // Create Typegres query client
  // For PGlite, we need to create a custom query function
  queryClient = new QueryClient({
    query: async (sql: string, params?: any[]) => {
      const result = await pgLiteInstance!.query(sql, params)
      return {
        rows: result.rows,
        rowCount: result.rows.length
      }
    }
  })

  return { pgLite: pgLiteInstance, queryClient }
}

export function getQueryClient() {
  if (!queryClient) {
    throw new Error('Database not initialized. Call initializeDatabase() first.')
  }
  return queryClient
}