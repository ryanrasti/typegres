import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  // Create users table
  await db.schema
    .createTable("users")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("email", "text", (col) => col.notNull())
    .addColumn("active", "integer", (col) => col.defaultTo(1))
    .addColumn("role", "text")
    .execute();

  // Create update_test_users table with same structure
  await db.schema
    .createTable("update_test_users")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("email", "text", (col) => col.notNull())
    .addColumn("active", "integer", (col) => col.defaultTo(1))
    .addColumn("role", "text")
    .execute();

  // Create posts table (referenced in some tests)
  await db.schema
    .createTable("posts")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("content", "text")
    .addColumn("user_id", "integer", (col) => col.references("users.id").notNull())
    .addColumn("published", "integer", (col) => col.defaultTo(0))
    .execute();

  // Create update_test_posts table
  await db.schema
    .createTable("update_test_posts")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("content", "text")
    .addColumn("user_id", "integer", (col) => col.references("update_test_users.id").notNull())
    .addColumn("published", "integer", (col) => col.defaultTo(0))
    .execute();

  // Create comments table
  await db.schema
    .createTable("comments")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("post_id", "integer", (col) => col.references("posts.id").notNull())
    .addColumn("user_id", "integer", (col) => col.references("users.id").notNull())
    .addColumn("content", "text", (col) => col.notNull())
    .execute();

  // Create test_users table (for transaction tests)
  await db.schema
    .createTable("test_users")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("balance", "integer", (col) => col.defaultTo(0))
    .execute();

  // Create example_3d_array table
  await db.schema
    .createTable("example_3d_array")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("data", sql`integer[][][]`)
    .addColumn("data_1d", sql`integer[]`)
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("example_3d_array").execute();
  await db.schema.dropTable("test_users").execute();
  await db.schema.dropTable("comments").execute();
  await db.schema.dropTable("update_test_posts").execute();
  await db.schema.dropTable("posts").execute();
  await db.schema.dropTable("update_test_users").execute();
  await db.schema.dropTable("users").execute();
}
