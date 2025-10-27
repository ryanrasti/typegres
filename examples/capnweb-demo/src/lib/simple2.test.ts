import { describe, it, expect } from 'vitest'
import { typegres } from 'typegres'
import { Todo } from '../models/base'

describe('Simple Typegres Query', () => {
  it('should run a basic query', async () => {
    const tg = await typegres({ type: 'pglite' })
    
    // Create schema
    await tg.sql`
      CREATE TABLE IF NOT EXISTS "Todo" (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        content TEXT NOT NULL,
        completed BOOLEAN DEFAULT false NOT NULL,
        "userId" TEXT NOT NULL,
        priority INTEGER DEFAULT 0
      )
    `.execute()
    
    // Insert test data
    await tg.sql`
      INSERT INTO "Todo" (id, content, "userId", priority) 
      VALUES ('todo-1', 'Test Todo', 'user-1', 5)
    `.execute()
    
    // Query with Typegres
    console.log('About to query...')
    const todos = await Todo
      .select(t => ({
        id: t.id,
        content: t.content,
        priority: t.priority
      }))
      .execute(tg)
    
    console.log('Query result:', todos)
    
    expect(todos).toHaveLength(1)
    expect(todos[0].content).toBe('Test Todo')
    
    await tg.end()
  })
})