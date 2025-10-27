import { Todo } from "../models/base";
import { getQueryClient } from "./db";

export class TodoService {
  async getAllTodos() {
    const client = getQueryClient();

    // Simple Typegres query
    const todos = await Todo.select((t) => ({
      id: t.id,
      content: t.content,
      completed: t.completed,
      priority: t.priority,
      userId: t.userId,
    })).execute(client);

    return todos;
  }

  async getUserTodos(userId: string) {
    const client = getQueryClient();

    const todos = await Todo.select((t) => ({
      id: t.id,
      content: t.content,
      completed: t.completed,
      priority: t.priority,
      dueDate: t.dueDate,
      tags: t.tags,
    }))
      .where((t) => t.userId.eq(userId))
      .orderBy((t) => t.priority, { desc: true })
      .execute(client);

    return todos;
  }

  async createTodo(userId: string, content: string) {
    const client = getQueryClient();

    const newTodo = await Todo.insert({
      content,
      userId,
      completed: false,
      priority: 0,
      tags: [],
    })
      .returning((t) => ({
        id: t.id,
        content: t.content,
        completed: t.completed,
      }))
      .execute(client);

    return newTodo[0];
  }

  async updateTodo(todoId: string, updates: { completed?: boolean; priority?: number }) {
    const client = getQueryClient();

    const updated = await Todo.where((t) => t.id.eq(todoId))
      .update(updates)
      .returning((t) => ({
        id: t.id,
        completed: t.completed,
        priority: t.priority,
      }))
      .execute(client);

    return updated[0];
  }
}
