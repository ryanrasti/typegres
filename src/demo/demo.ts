import { Text, Int4, Timestamptz, Float8, values, typegres, datePart, caseWhen, now } from "typegres";

const tg = await typegres({ type: "pglite" });

// ------------------------------------
// Example 1: Methods compile to SQL
// ------------------------------------
// "Business logic in TypeScript, execution in PostgreSQL"

const postData = values(
  {
    id: Int4.new(1),
    authorId: Int4.new(1),
    content: "Just shipped Typegres!",
    createdAt: Timestamptz.new("2025-08-14 10:00"),
    likes: Int4.new(42),
    comments: Int4.new(8),
  },
  { id: 2, authorId: 2, content: "PostgreSQL can do THAT?!", createdAt: "2025-08-15 14:30", likes: 105, comments: 23 },
  { id: 3, authorId: 1, content: "Working on something new...", createdAt: "2025-08-15 19:00", likes: 12, comments: 3 },
);

class Post extends postData.asClass<Post>() {
  // These compile to SQL expressions, not JavaScript!
  engagement() {
    // Comments worth 2x likes for engagement
    return this.likes.plus(this.comments.multiply(Int4.new(2)));
  }

  ageInHours() {
    // Using epoch difference for hours calculation
    const epoch = datePart(Text.new("epoch"), this.now(true).minus(this.createdAt));
    return epoch.divide(3600);
  }

  trendingScore() {
    // Higher engagement + recency = trending
    return this.engagement().cast(Float8).divide(this.ageInHours().plus(2));
  }

  isViral() {
    return this.engagement().gt(100);
  }

  now(stub: boolean = false) {
    // stub out now() for testing
    return stub ? Timestamptz.new("2025-08-15 20:00:00") : now();
  }
}

const example1 = await Post.select((p) => ({
  content: p.content,
  engagement: p.engagement(),
  trending: p.trendingScore(),
  viral: p.isViral(),
}))
  .orderBy((p) => p.trendingScore(), { desc: true })
  .debug() // See the generated SQL!
  .execute(tg);

console.log("Trending Posts:", example1);

// ------------------------------------
// Example 2: Complex Relations
// ------------------------------------
// "Relations that compile to efficient SQL"

const userData = values(
  { id: Int4.new(1), username: "alice", verified: true, followers: 1200 },
  { id: 2, username: "bob", verified: false, followers: 450 },
  { id: 3, username: "charlie", verified: true, followers: 89000 },
);

const commentData = values(
  { id: Int4.new(1), postId: Int4.new(2), authorId: Int4.new(1), content: "Yes!", likes: 5 },
  { id: 2, postId: 2, authorId: 3, content: "Game changer!", likes: 12 },
  { id: 3, postId: 1, authorId: 2, content: "Congrats!", likes: 2 },
);

class User extends userData.asClass<User>() {
  displayName() {
    // Using CASE for conditional logic
    return this.username.textcat(
      caseWhen(
        {
          when: this.verified,
          then: Text.new(" (verified)"),
        },
        Text.new(""),
      ),
    );
  }

  isInfluencer() {
    return this.followers.gt(10000).or(this.verified);
  }
}

class PostWithStats extends Post.extend<PostWithStats>() {
  topComment() {
    return commentData
      .select()
      .where((c) => c.postId.eq(this.id))
      .orderBy((c) => c.likes, { desc: true })
      .limit(1);
  }

  author() {
    return User.select().where((u) => u.id.eq(this.authorId));
  }
}

const example2 = await PostWithStats.select((p) => ({
  content: p.content,
  author: p
    .author()
    .select((a) => ({ name: a.displayName() }))
    .scalar(),
  topComment: p
    .topComment()
    .select((c) => ({ name: c.content }))
    .scalar(),
  viral: p.isViral(),
}))
  .where((p) => p.isViral())
  .debug() // All in a single query!
  .execute(tg);

console.log("Viral Posts with Stats:", example2);

// ------------------------------------
// Example 3: Analytics & Aggregations
// ------------------------------------
// "PostgreSQL's full power, fully typed"

import { rank } from "typegres";

const example3 = await Post.select((p) => ({
  // Window functions for rankings
  content: p.content,
  engagementRank: rank().over({ orderBy: [p.engagement(), "desc"] }),

  // Running totals
  cumulativeLikes: p.likes.sum().over({ partitionBy: p.authorId, orderBy: p.createdAt }),
}))
  .orderBy((p) => p.createdAt)
  .debug()
  .execute(tg);

console.log("Analytics:", example3);

// Everything above compiles to SQL and runs in PostgreSQL!
// Try modifying the methods and watch the SQL change.
