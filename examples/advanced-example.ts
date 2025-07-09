// Advanced example from the README
import { typegres, Typegres } from "typegres";
import { Pool } from "pg";

const createSchema = async (tg: Typegres) => {
  // Create users table
  await tg.sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL
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

  // Insert sample data
  await tg.sql`
    INSERT INTO users (id, name)
    VALUES 
      (1, 'Alice'),
      (2, 'Bob'),
      (3, 'Charlie')
    ON CONFLICT DO NOTHING
  `.execute();

  // Generate posts (more than 10 for Alice and Charlie)
  const posts = [];
  for (let i = 1; i <= 15; i++) {
    posts.push(`(${i}, 1, 'Alice post ${i}')`);
  }
  for (let i = 16; i <= 20; i++) {
    posts.push(`(${i}, 2, 'Bob post ${i - 15}')`);
  }
  for (let i = 21; i <= 32; i++) {
    posts.push(`(${i}, 3, 'Charlie post ${i - 20}')`);
  }

  await tg.sql`
    INSERT INTO posts (id, author_id, title)
    VALUES ${tg.raw(posts.join(', '))}
    ON CONFLICT DO NOTHING
  `.execute();
};

const main = async () => {
  const pg = await typegres({
    type: "pg",
    PoolClass: Pool,
    config: {
      user: "postgres", // Adjust as needed
      host: "localhost",
      database: "test", // Adjust as needed
    }
  });

  // Create schema and sample data
  await createSchema(pg);

  // Import the generated tables
  const db = await import("typegres/db");

  // Find all authors who have published more than 10 posts
  const prolificAuthors = await db.posts
    .select((p) => ({
      author_id: p.author_id,
      postCount: p.id.count()
    }))
    .groupBy(p => [p.author_id] as const)
    .subquery() // Create a subquery from the aggregation
    .where(ac => ac.postCount['>'](10)) // Filter the results of the subquery
    .join(db.users, 'u', (ac, { u }) => ac.author_id['='](u.id)) // Join back to the users table
    .select((ac, { u }) => ({
      id: u.id,
      name: u.name,
      totalPosts: ac.postCount,
    }))
    .execute(pg);

  console.log("Prolific authors (more than 10 posts):");
  console.log(prolificAuthors);
  // Type of prolificAuthors is { id: number; name: string; totalPosts: bigint }[]

  // Show the actual post counts for verification
  const allAuthorPostCounts = await db.posts
    .select((p) => ({
      author_id: p.author_id,
      count: p.id.count()
    }))
    .groupBy(p => [p.author_id] as const)
    .execute(pg);

  console.log("\nAll author post counts:");
  console.log(allAuthorPostCounts);

  await pg.end();
};

main().catch(console.error);