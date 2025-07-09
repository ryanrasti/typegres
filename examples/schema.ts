// Shared schema definition and setup for examples
import { Typegres, Text, Int4, Bool, database } from "typegres";

// Define the database schema
export const db = database({
  users: {
    id: Int4,
    name: Text,
    age: Int4,
    isActive: Bool,
  },
  posts: {
    id: Int4,
    author_id: Int4,
    title: Text,
    created_at: Text, // Treating timestamp as text for simplicity
  },
});

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
      ('Bob', 20, true),
      ('Charlie', 30, false)
  `.execute();
};