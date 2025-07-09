// Advanced example demonstrating joins and aggregations
import { typegres, values, Text, Int4 } from "typegres";
import { db, createSchema } from "./schema";

const main = async () => {
  const pg = await typegres({
    type: "pglite", // Using PGlite for easy local execution
  });

  // Create schema and sample data
  await createSchema(pg);

  // Insert sample posts using typegres with functional style
  console.log("Inserting sample posts...");
  const postsData = [
    // Alice's posts (15 posts)
    ...Array.from({ length: 15 }, (_, i) => ({
      author_id: Int4.new(1),
      title: Text.new(`Alice post ${i + 1}`),
    })),
    // Bob's posts (5 posts)
    ...Array.from({ length: 5 }, (_, i) => ({
      author_id: Int4.new(2),
      title: Text.new(`Bob post ${i + 1}`),
    })),
    // Charlie's posts (12 posts)
    ...Array.from({ length: 12 }, (_, i) => ({
      author_id: Int4.new(3),
      title: Text.new(`Charlie post ${i + 1}`),
    })),
  ];

  // Insert all posts
  await db.posts
    .insert(values(postsData[0], ...postsData.slice(1)))
    .execute(pg);

  console.log(`Inserted ${postsData.length} posts`);

  // Find all authors who have published more than 10 posts
  const prolificAuthors = await db.posts
    .groupBy((p) => [p.author_id] as const)
    .select((p, [author_id]) => ({
      author_id,
      postCount: p.id.count(),
    }))
    .subquery() // Create a subquery from the aggregation
    .where((ac) => ac.postCount[">"](10)) // Filter the results of the subquery
    .join(db.users, "u", (ac, { u }) => ac.author_id["="](u.id)) // Join back to the users table
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
    .groupBy((p) => [p.author_id] as const)
    .select((p, [author_id]) => ({
      author_id,
      count: p.id.count(),
    }))
    .execute(pg);

  console.log("\nAll author post counts:");
  console.log(allAuthorPostCounts);

  await pg.end();
};

main().catch(console.error);
