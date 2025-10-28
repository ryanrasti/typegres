import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { typegres, type Typegres, insert, update, values } from "typegres";
import { Todo, User } from "../models/base";

describe("Typegres + PGlite Integration", () => {
  let tg: Typegres;

  beforeEach(async () => {
    // Create Typegres connection with PGlite
    tg = await typegres({
      type: "pglite",
      // PGlite will create a fresh in-memory database
    });

    // Create schema - separate commands for PGlite
    await tg.sql`
      CREATE TABLE IF NOT EXISTS "User" (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `.execute();

    await tg.sql`
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
      )
    `.execute();

    await tg.sql`
      INSERT INTO "User" (id, email, name) 
      VALUES ('test-user', 'test@example.com', 'Test User')
    `.execute();
  });

  afterEach(async () => {
    // Clean up connection
    await tg.end();
  });

  it("should query todos with Typegres", async () => {
    // Insert test data
    await tg.sql`
      INSERT INTO "Todo" (id, content, "userId", priority) 
      VALUES 
        ('todo-1', 'Test Todo 1', 'test-user', 5),
        ('todo-2', 'Test Todo 2', 'test-user', 3)
    `.execute();

    // Query with Typegres
    const todos = await Todo.select((t) => ({
      id: t.id,
      content: t.content,
      priority: t.priority,
    })).execute(tg);

    expect(todos).toHaveLength(2);
    expect(todos[0].content).toBe("Test Todo 1");
    expect(todos[1].content).toBe("Test Todo 2");
  }, 10000); // Add timeout

  it("should filter todos by userId", async () => {
    // Insert test data for multiple users
    await tg.sql`
      INSERT INTO "User" (id, email, name) 
      VALUES ('other-user', 'other@example.com', 'Other User')
    `.execute();

    await tg.sql`
      INSERT INTO "Todo" (content, "userId") 
      VALUES 
        ('My Todo', 'test-user'),
        ('Other Todo', 'other-user'),
        ('Another My Todo', 'test-user')
    `.execute();

    // Query filtered todos - start with select()
    const myTodos = await Todo.select((t) => ({
      content: t.content,
      userId: t.userId,
    }))
      .where((t) => t.userId.eq("test-user"))
      .execute(tg);

    expect(myTodos).toHaveLength(2);
    expect(myTodos.every((t) => t.userId === "test-user")).toBe(true);
  });

  it("should insert and return new todo", async () => {
    // For now, use raw SQL for insert since the functional API is complex
    const result = await tg.sql`
      INSERT INTO "Todo" (content, "userId", priority, completed, tags)
      VALUES ('New Todo', 'test-user', 10, false, ARRAY['urgent', 'work'])
      RETURNING id, content, priority, tags
    `.execute();

    const newTodo = result?.rows || [];

    expect(newTodo).toHaveLength(1);
    expect(newTodo[0].content).toBe("New Todo");
    expect(newTodo[0].priority).toBe(10);
    expect(newTodo[0].tags).toEqual(["urgent", "work"]);
    expect(newTodo[0].id).toBeTruthy();
  });

  it("should update todos", async () => {
    // Insert initial todo
    await tg.sql`
      INSERT INTO "Todo" (id, content, "userId", completed) 
      VALUES ('todo-to-update', 'Incomplete Todo', 'test-user', false)
    `.execute();

    // Update with raw SQL for now
    const result = await tg.sql`
      UPDATE "Todo" 
      SET completed = true, priority = 7
      WHERE id = 'todo-to-update'
      RETURNING id, completed, priority
    `.execute();

    const updated = result?.rows || [];

    expect(updated).toHaveLength(1);
    expect(updated[0].completed).toBe(true);
    expect(updated[0].priority).toBe(7);
  });

  it("should handle complex queries with ordering and limits", async () => {
    // Insert todos with different priorities
    await tg.sql`
      INSERT INTO "Todo" (content, "userId", priority) 
      VALUES 
        ('Low Priority', 'test-user', 1),
        ('High Priority', 'test-user', 10),
        ('Medium Priority', 'test-user', 5),
        ('Another High', 'test-user', 9)
    `.execute();

    // Complex query - start with select() and chain where/orderBy/limit
    const topTodos = await Todo.select((t) => ({
      content: t.content,
      priority: t.priority,
    }))
      .where((t) => t.userId.eq("test-user"))
      .where((t) => t.priority.gte(5))
      .orderBy((t) => t.priority, { desc: true })
      .limit(2)
      .execute(tg);

    expect(topTodos).toHaveLength(2);
    expect(topTodos[0].priority).toBe(10);
    expect(topTodos[1].priority).toBe(9);
  });
});
