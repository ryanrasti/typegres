import { PocWarning } from '@/components/poc-warning'
import { CodeBlock } from '@/components/CodeBlock'

export default function QuickstartPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Quick Start Guide</h1>
      <PocWarning />
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Install Typegres and its peer dependencies:
        </p>
        <CodeBlock 
          language="bash"
          code={`npm install typegres kysely pg
# or
yarn add typegres kysely pg
# or
pnpm add typegres kysely pg`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. Generate Types from Your Database</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          First, generate TypeScript types from your existing PostgreSQL database:
        </p>
        <CodeBlock 
          language="bash"
          code={`# Set your database connection
export DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# Generate types
npx typegres generate`}
        />
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          This will introspect your database and generate type definitions for all tables, views, and functions.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. Set Up Your Database Connection</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Create a database instance with the generated types:
        </p>
        <CodeBlock 
          code={`import { createDb } from 'typegres'
import { Database } from './generated/database' // Generated types

export const db = createDb<Database>({
  connectionString: process.env.DATABASE_URL,
  // Optional: connection pool settings
  max: 10,
  idleTimeoutMillis: 30000,
})`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">3. Write Type-Safe Queries</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Now you can write fully type-safe queries with autocompletion:
        </p>
        <CodeBlock 
          code={`// Simple select
const users = await db
  .selectFrom('users')
  .select(['id', 'name', 'email'])
  .where('active', '=', true)
  .execute()

// Join with aggregation
const userStats = await db
  .selectFrom('users')
  .leftJoin('posts', 'posts.user_id', 'users.id')
  .select([
    'users.id',
    'users.name',
    db.fn.count('posts.id').as('post_count'),
    db.fn.max('posts.created_at').as('last_post_date')
  ])
  .groupBy(['users.id', 'users.name'])
  .having(db.fn.count('posts.id'), '>', 0)
  .execute()

// Using CTEs
const topAuthors = await db
  .with('author_stats', (qb) =>
    qb.selectFrom('users')
      .innerJoin('posts', 'posts.user_id', 'users.id')
      .select([
        'users.id',
        'users.name',
        db.fn.count('posts.id').as('total_posts')
      ])
      .groupBy(['users.id', 'users.name'])
  )
  .selectFrom('author_stats')
  .selectAll()
  .where('total_posts', '>', 10)
  .orderBy('total_posts', 'desc')
  .limit(10)
  .execute()`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">4. Transactions</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Handle transactions with full type safety:
        </p>
        <CodeBlock 
          code={`await db.transaction().execute(async (trx) => {
  // Insert a user
  const [user] = await trx
    .insertInto('users')
    .values({
      name: 'John Doe',
      email: 'john@example.com',
      active: true
    })
    .returning(['id', 'name'])
    .execute()

  // Insert related posts
  await trx
    .insertInto('posts')
    .values([
      {
        user_id: user.id,
        title: 'My First Post',
        content: 'Hello, world!'
      },
      {
        user_id: user.id,
        title: 'Another Post',
        content: 'More content here'
      }
    ])
    .execute()

  return user
})`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">5. Using PostgreSQL-Specific Features</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Typegres supports all PostgreSQL features with proper typing:
        </p>
        <CodeBlock 
          code={`// JSONB operations
const settings = await db
  .selectFrom('user_settings')
  .select([
    'user_id',
    db.fn.jsonb_extract_path_text('preferences', 'theme').as('theme'),
    db.fn.jsonb_array_length('notifications').as('notification_count')
  ])
  .where(db.fn.jsonb_exists('preferences', 'notifications'), '=', true)
  .execute()

// Window functions
const rankedPosts = await db
  .selectFrom('posts')
  .select([
    'id',
    'title',
    'view_count',
    db.fn
      .row_number()
      .over(ob => ob.partitionBy('user_id').orderBy('view_count', 'desc'))
      .as('rank')
  ])
  .execute()

// Full-text search
const searchResults = await db
  .selectFrom('posts')
  .select(['id', 'title', 'content'])
  .where(
    db.fn.to_tsvector('english', 'title || \' \' || content'),
    '@@',
    db.fn.plainto_tsquery('english', 'typescript postgresql')
  )
  .execute()`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          <li>Explore the <a href="/api/index.html" className="text-blue-400 hover:text-blue-300">API Reference</a> for detailed documentation</li>
          <li>Try the <a href="/playground" className="text-blue-400 hover:text-blue-300">Interactive Playground</a> to experiment with queries</li>
          <li>Check out advanced topics like migrations, custom types, and performance optimization</li>
        </ul>
      </section>
    </div>
  )
}