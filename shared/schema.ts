import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./models/auth";

export * from "./models/auth";

export const todos = pgTable("todos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  isCompleted: boolean("is_completed").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("todos_user_id_idx").on(table.userId),
]);

export const todosRelations = relations(todos, ({ one }) => ({
  user: one(users, {
    fields: [todos.userId],
    references: [users.id],
  }),
}));

export const insertTodoSchema = createInsertSchema(todos, {
  title: z.string().trim().min(1, "Title is required").max(500, "Title is too long"),
}).omit({
  id: true,
  userId: true,
  createdAt: true,
});

export const updateTodoSchema = z.object({
  title: z.string().trim().min(1, "Title cannot be empty").max(500, "Title is too long").optional(),
  isCompleted: z.boolean().optional(),
}).refine(
  (data) => data.title !== undefined || data.isCompleted !== undefined,
  { message: "At least one field (title or isCompleted) must be provided" }
);

export type InsertTodo = z.infer<typeof insertTodoSchema>;
export type UpdateTodo = z.infer<typeof updateTodoSchema>;
export type Todo = typeof todos.$inferSelect;
