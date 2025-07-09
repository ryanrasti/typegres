// Advanced example from the README
import { typegres, Typegres } from "typegres";

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

  // Insert some sample posts - we'll use typegres insert instead
  // This will be done in the main function after generating the schema
};

const main = async () => {
  // For this example, we'll use PGlite to make it easier to run
  const pg = await typegres({
    type: "pglite", // Using PGlite for easy local execution
  });

  // Create schema and sample data
  await createSchema(pg);

  // Import the generated tables and types
  const { database, values, Text, Int4 } = await import("typegres");

  // Define the database schema manually
  const db = database({
    users: {
      id: Int4,
      name: Text,
    },
    posts: {
      id: Int4,
      author_id: Int4,
      title: Text,
      created_at: Text, // We'll treat timestamp as text for simplicity
    },
  });

  // Insert sample posts using typegres
  console.log("Inserting sample posts...");
  const postsData = [];
  
  // Alice's posts (15 posts)
  for (let i = 1; i <= 15; i++) {
    postsData.push({
      author_id: Int4.new(1),
      title: Text.new(`Alice post ${i}`),
    });
  }
  
  // Bob's posts (5 posts)
  for (let i = 1; i <= 5; i++) {
    postsData.push({
      author_id: Int4.new(2),
      title: Text.new(`Bob post ${i}`),
    });
  }
  
  // Charlie's posts (12 posts)
  for (let i = 1; i <= 12; i++) {
    postsData.push({
      author_id: Int4.new(3),
      title: Text.new(`Charlie post ${i}`),
    });
  }

  // Insert all posts
  await db.posts
    .insert(values(...postsData))
    .execute(pg);

  console.log(`Inserted ${postsData.length} posts`);

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