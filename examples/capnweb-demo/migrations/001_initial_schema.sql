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