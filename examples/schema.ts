// Shared schema definition and setup for examples
import { Typegres, Text, Int4, Bool, Table } from "typegres";

// Define the database schema using the new Table pattern
export class Users extends Table("users", {
  id: { type: Int4<1>, required: false }, // has default (SERIAL)
  name: { type: Text<1>, required: true },
  age: { type: Int4<1>, required: true },
  isActive: { type: Bool<1>, required: false }, // has default
}) {}

export class Posts extends Table("posts", {
  id: { type: Int4<1>, required: false }, // has default (SERIAL)
  author_id: { type: Int4<1>, required: true },
  title: { type: Text<1>, required: true },
  created_at: { type: Text<1>, required: false }, // has default (CURRENT_TIMESTAMP)
}) {}

// Create tables using raw SQL
export const createSchema = async (tg: Typegres) => {
  // Create users table
  await tg.sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      "isActive" BOOLEAN DEFAULT true
    )
  `.execute();

  // Create posts table
  await tg.sql`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      author_id INTEGER REFERENCES users(id),
      title TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `.execute();

  // Insert sample users
  await tg.sql`
    INSERT INTO users (name, age, "isActive")
    VALUES 
      ('Alice', 25, true),
      ('Bob', 17, true),
      ('Charlie', 30, false)
  `.execute();
};
