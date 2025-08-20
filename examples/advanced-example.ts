// Advanced example demonstrating joins and aggregations
import { typegres, values, Text, Int4, Typegres, select, insert } from "typegres";
import { Users, Posts, createSchema } from "./schema";

const samplePosts = async (tg: Typegres) => {
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
  await insert(
    { into: Posts, columns: ["author_id", "title"] },
    select((v) => ({ author_id: v.author_id, title: v.title }), {
      from: values(postsData[0], ...postsData.slice(1)),
    }),
  ).execute(tg);

  console.log(`Inserted ${postsData.length} posts`);
  return postsData.length;
};

export const main = async () => {
  const tg = await typegres({
    type: "pglite", // Using PGlite for easy local execution
  });

  // Create schema and sample data
  await createSchema(tg);
  const postsCount = await samplePosts(tg);

  // Find all authors who have published more than 10 posts
  const prolificAuthors = await Posts.select((p) => ({
    author_id: p.author_id,
    postCount: p.id.count(),
  }))
    .groupBy((p) => [p.author_id])
    .subquery() // Create a subquery from the aggregation
    .join(Users, "u", (ac, { u }) => ac.author_id["="](u.id)) // Join back to the users table
    .select((ac, { u }) => ({
      id: u.id,
      name: u.name,
      totalPosts: ac.postCount,
    }))
    .where((ac) => ac.postCount[">"](10)) // Filter the results of the subquery

    .execute(tg);

  console.log("Prolific authors (more than 10 posts):");
  console.log(prolificAuthors);
  // Type of prolificAuthors is { id: number; name: string; totalPosts: bigint }[]

  await tg.end();

  return { postsCount, prolificAuthors };
};

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
