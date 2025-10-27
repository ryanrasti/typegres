import { describe, it, expect } from 'vitest'
import { typegres } from 'typegres'
import { Todo } from '../models/base'

describe('Working Typegres Test', () => {
  it('should work with Typegres select queries', async () => {
    const tg = await typegres({ type: 'pglite' })
    
    // Create simple schema
    await tg.sql`
      CREATE TABLE IF NOT EXISTS "Todo" (
        id TEXT PRIMARY KEY,
        content TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        completed BOOLEAN DEFAULT false,
        priority INTEGER DEFAULT 0
      )
    `.execute()
    
    // Insert test data
    await tg.sql`
      INSERT INTO "Todo" (id, content, "userId", priority) 
      VALUES 
        ('1', 'Test 1', 'user-1', 5),
        ('2', 'Test 2', 'user-1', 3)
    `.execute()
    
    // Query with Typegres
    const todos = await Todo
      .select(t => ({
        id: t.id,
        content: t.content,
        priority: t.priority
      }))
      .where(t => t.userId.eq('user-1'))
      .execute(tg)
    
    console.log('Results:', todos)
    
    expect(todos).toHaveLength(2)
    expect(todos[0].content).toBe('Test 1')
    
    await tg.end()
  }, 10000)
})