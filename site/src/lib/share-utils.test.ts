import { compressCode, decompressCode } from "./share-utils";

describe("Share Utils", () => {
  describe("compression and decompression", () => {
    it("should handle small code snippets", () => {
      const code = `console.log('Hello, world!');`;
      const compressed = compressCode(code);
      const decompressed = decompressCode(compressed);

      expect(decompressed).toBe(code);
      // Small snippets may be larger due to gzip headers + base64 overhead
      // This is expected and acceptable for share URLs
      expect(compressed.length).toBeLessThan(200); // Still reasonable for URLs
    });

    it("should handle medium code snippets", () => {
      const code = `
import { typegres } from 'typegres';

async function main() {
  const db = await typegres({ type: 'pglite' });
  
  const users = await db.sql\`
    SELECT id, name, email
    FROM users
    WHERE active = true
    ORDER BY created_at DESC
    LIMIT 10
  \`.execute();
  
  console.log('Active users:', users);
}

main().catch(console.error);
      `.trim();

      const compressed = compressCode(code);
      const decompressed = decompressCode(compressed);

      expect(decompressed).toBe(code);
    });

    it("should handle large code snippets", () => {
      // Generate a large code snippet
      const lines = [];
      for (let i = 0; i < 100; i++) {
        lines.push(
          `
async function processUser${i}(userId: number) {
  const user = await db.sql\`
    SELECT * FROM users WHERE id = \${userId}
  \`.executeTakeFirst();
  
  if (!user) {
    throw new Error(\`User \${userId} not found\`);
  }
  
  const posts = await db.sql\`
    SELECT * FROM posts 
    WHERE user_id = \${userId}
    ORDER BY created_at DESC
  \`.execute();
  
  return { user, posts };
}
        `.trim(),
        );
      }

      const code = lines.join("\n\n");
      const compressed = compressCode(code);
      const decompressed = decompressCode(compressed);

      expect(decompressed).toBe(code);

      // Compression should be effective for repetitive code
      expect(compressed.length).toBeLessThan(code.length * 0.3);
    });

    it("should handle special characters and Unicode", () => {
      const code = `
// Test with special characters 
const emoji = '🚀 TypeScript + PostgreSQL = ❤️';
const unicode = '你好世界 • مرحبا بالعالم';
const special = 'Line 1\\nLine 2\\tTabbed\\r\\nWindows line';
const nested = \`Template \${literal} with \\\`backticks\\\`\`;
      `.trim();

      const compressed = compressCode(code);
      const decompressed = decompressCode(compressed);

      expect(decompressed).toBe(code);
    });

    it("should handle empty code", () => {
      const code = "";
      const compressed = compressCode(code);
      const decompressed = decompressCode(compressed);

      expect(decompressed).toBe(code);
    });

    it("should produce URL-safe strings", () => {
      const code = `const test = "This is a test";`;
      const compressed = compressCode(code);

      // Should not contain URL-unsafe characters
      expect(compressed).not.toMatch(/[+/=]/);

      // Should only contain URL-safe characters
      expect(compressed).toMatch(/^[A-Za-z0-9_-]*$/);
    });

    it("should handle malformed compressed data gracefully", () => {
      const invalidData = "not-valid-compressed-data";

      expect(() => decompressCode(invalidData)).toThrow();
    });
  });

  describe("URL length considerations", () => {
    it("should keep URLs under 2000 characters for typical code", () => {
      const typicalCode = `
import { typegres } from 'typegres';
import { Users, Posts, Comments } from './schema';

async function main() {
  const db = await typegres({ type: 'pglite' });
  
  // Get users with their post count
  const usersWithPosts = await db
    .select('u.id', 'u.name', 'u.email')
    .select(db.count('p.id').as('post_count'))
    .from(Users.as('u'))
    .leftJoin(Posts.as('p'), 'p.user_id', 'u.id')
    .where('u.active', '=', true)
    .groupBy('u.id', 'u.name', 'u.email')
    .orderBy('post_count', 'desc')
    .limit(10)
    .execute();
  
  console.log('Top users:', usersWithPosts);
  
  // Get recent posts with comments
  const recentPosts = await db.sql\`
    SELECT 
      p.*,
      array_agg(
        json_build_object(
          'id', c.id,
          'content', c.content,
          'created_at', c.created_at
        )
      ) as comments
    FROM posts p
    LEFT JOIN comments c ON c.post_id = p.id
    WHERE p.published = true
      AND p.created_at > NOW() - INTERVAL '7 days'
    GROUP BY p.id
    ORDER BY p.created_at DESC
    LIMIT 20
  \`.execute();
  
  console.log('Recent posts:', recentPosts);
}

main().catch(console.error);
      `.trim();

      const compressed = compressCode(typicalCode);
      const fullURL = `https://typegres.dev/playground#${compressed}`;

      expect(fullURL.length).toBeLessThan(2000);
    });
  });
});
