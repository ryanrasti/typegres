# Typegres

> PostgreSQL, expressed in TypeScript

Typegres is a TypeScript library that brings the full power of PostgreSQL to TypeScript with complete type safety. Import the full power of Postgres as a TypeScript library.

## 🚧 Under Construction

This project is in active development. Documentation and features are still being built.

## What is Typegres?

While traditional ORMs and query builders abstract over multiple SQL dialects, Typegres goes all-in on PostgreSQL to provide the most powerful and type-safe experience possible. In a single import, you can access the full power of Postgres with complete TypeScript type safety.

## Key Features

- **All-in PostgreSQL**: Spend your time learning PostgreSQL, not a new abstraction
- **Type-Safe by Design**: Every PostgreSQL type and function with TypeScript safety
- **Iterate Fast**: Minimize context switching and get immediate feedback for your queries
- **Write Real SQL**: Use every PostgreSQL feature without limitations
- **Full Type Safety**: Catch errors at compile time, not runtime
- **No Magic**: Your queries compile to exactly the SQL you'd expect
- **Great DX**: Autocompletion, inline documentation, and type checking

## How It Works

Typegres automatically generates TypeScript types and function signatures from your PostgreSQL database schema. Every PostgreSQL type becomes a TypeScript class, and every PostgreSQL function gets proper type annotations.

```typescript
import { Text, Int4, Bool } from 'typegres'
import { values } from 'typegres/query'

// Create typed data with full PostgreSQL type safety
const users = values(
  { name: Text.new("Alice"), age: Int4.new(25), active: Bool.new(true) },
  { name: Text.new("Bob"), age: Int4.new(30), active: Bool.new(false) }
)

// Build type-safe queries that compile to efficient SQL
const result = await users
  .select(u => ({
    greeting: u.name.textcat(Text.new(" is ")).textcat(u.age.int4Out()),
    isAdult: u.age.int4Gt(Int4.new(18))
  }))
  .where(u => u.active.boolEq(Bool.new(true)))
  .execute()

// TypeScript knows the exact return type:
// result: Array<{ greeting: string; isAdult: boolean }>
```

## What Makes Typegres Different

### Complete PostgreSQL Fidelity
- Every PostgreSQL type, function, and operator is available
- Supports advanced features like window functions, CTEs, arrays, JSON operations
- No limitations - if PostgreSQL supports it, Typegres supports it

### Advanced Type System
- Sophisticated nullability tracking at the type level
- Support for PostgreSQL's complex type relationships (arrays, ranges, composite types)
- Automatic type inference for query results

### Code Generation Approach
- Automatically generates TypeScript definitions from your live PostgreSQL database
- Types always match your actual database capabilities
- Regenerate types when your schema changes

### Expression-Oriented Design
- Queries are built as composable expression trees
- Supports complex query logic through functional composition
- Built on top of Kysely for reliable SQL generation

## Development

### Prerequisites

- Node.js 20+
- PostgreSQL
- Nix (optional, for reproducible development environment)

### Getting Started

With Nix:
```bash
nix develop
```

Without Nix:
```bash
npm install
```

### Building

```bash
# Generate types from PostgreSQL
npm run codegen

# Build the library
npm run build

# Run tests
npm run test

# Type check
npm run typecheck

# Lint
npm run lint
```

### Nix Builds

```bash
# Build the main library
nix build .#typegres

# Build the documentation site
nix build .#site

# Run the test suite
nix build .#test
```

## Project Structure

- `src/` - Main library source code
- `src/gen/` - Auto-generated PostgreSQL types and functions
- `site/` - Documentation website and interactive playground
- `migrations/` - Database migrations for development

## Documentation

- [Quick Start Guide](./site/pages/docs/quickstart/+Page.tsx) (coming soon)
- [API Reference](./site) (coming soon)
- [Interactive Playground](./site/pages/playground/+Page.tsx)

## License

MIT © Ryan Rasti