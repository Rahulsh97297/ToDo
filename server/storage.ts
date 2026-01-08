import { todos, type Todo, type InsertTodo, type UpdateTodo } from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  getTodosByUserId(userId: string): Promise<Todo[]>;
  getTodoById(id: string, userId: string): Promise<Todo | undefined>;
  createTodo(userId: string, todo: InsertTodo): Promise<Todo>;
  updateTodo(id: string, userId: string, updates: UpdateTodo): Promise<Todo | undefined>;
  deleteTodo(id: string, userId: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getTodosByUserId(userId: string): Promise<Todo[]> {
    return db
      .select()
      .from(todos)
      .where(eq(todos.userId, userId))
      .orderBy(desc(todos.createdAt));
  }

  async getTodoById(id: string, userId: string): Promise<Todo | undefined> {
    const [todo] = await db
      .select()
      .from(todos)
      .where(and(eq(todos.id, id), eq(todos.userId, userId)));
    return todo || undefined;
  }

  async createTodo(userId: string, insertTodo: InsertTodo): Promise<Todo> {
    const [todo] = await db
      .insert(todos)
      .values({ ...insertTodo, userId })
      .returning();
    return todo;
  }

  async updateTodo(id: string, userId: string, updates: UpdateTodo): Promise<Todo | undefined> {
    const [todo] = await db
      .update(todos)
      .set(updates)
      .where(and(eq(todos.id, id), eq(todos.userId, userId)))
      .returning();
    return todo || undefined;
  }

  async deleteTodo(id: string, userId: string): Promise<boolean> {
    const result = await db
      .delete(todos)
      .where(and(eq(todos.id, id), eq(todos.userId, userId)))
      .returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
