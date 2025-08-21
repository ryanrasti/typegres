import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  // Create mood enum type
  await sql`CREATE TYPE mood AS ENUM ('happy', 'sad', 'neutral')`.execute(db);
  
  // Add mood column to users table
  await sql`ALTER TABLE users ADD COLUMN mood mood`.execute(db);
  
  // Add mood column to update_test_users table  
  await sql`ALTER TABLE update_test_users ADD COLUMN mood mood`.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  // Remove mood columns
  await sql`ALTER TABLE update_test_users DROP COLUMN mood`.execute(db);
  await sql`ALTER TABLE users DROP COLUMN mood`.execute(db);
  
  // Drop the enum type
  await sql`DROP TYPE mood`.execute(db);
}