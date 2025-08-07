# Typegres: PostgreSQL, expressed in TypeScript

[![CI](https://github.com/ryanrasti/typegres/actions/workflows/main.yml/badge.svg)](https://github.com/ryanrasti/typegres/actions/workflows/main.yml) [![npm version](https://img.shields.io/npm/v/typegres.svg)](https://www.npmjs.com/package/typegres) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

Import the full power of PostgreSQL as a TypeScript library.

![Typegres Demo GIF](https://raw.githubusercontent.com/ryanrasti/typegres/main/site/public/typegres_landing_page_demo.gif)

> [!WARNING]
> **Developer Preview**: Typegres is experimental and not production-ready. The API is evolving rapidly. Try the [playground](https://typegres.com/play/) and star the repo to follow along!

## Quick Start

```bash
# Install Typegres
npm install typegres
```

```typescript
// Import the typegres library
import { typegres, select } from "typegres";
// Import your schema definition
import db from "./schema";

const tg = typegres({
  /* Your db connection options */
});

const activeUsers = await select(
  (u) => ({
    upper: u.name.upper(),
    isAdult: u.age[">"](18),
  }),
  {
    from: db.users,
    where: (u) => u.isActive,
  }
).execute(tg);

console.log(activeUsers);
// Output: [{ upper: 'ALICE', isAdult: true }, { upper: 'CHARLIE', isAdult: false }]
```

See the [examples](https://github.com/ryanrasti/typegres/tree/main/examples) directory for complete working examples.

## Docs & Demo

- **Try it live**: https://typegres.com/play/
- **API Reference**: https://typegres.com/api/

## Key Features & Design Goals

While traditional ORMs and query builders abstract over multiple SQL dialects, Typegres goes all-in on PostgreSQL to provide the most powerful and type-safe experience possible. In a single import, you can access the full power of Postgres with complete TypeScript type safety.

- **Not an ORM** – Direct access to every PostgreSQL function as TypeScript methods
- **Zero SQL strings** – Write complex queries in pure TypeScript with full type inference  
- **One language** – No context switching between SQL and application code

Focus on learning Postgres itself — Typegres just gives you autocomplete, type-checking, and all other benefits of TypeScript.

## Advanced example

```typescript
// Find all authors who have published more than 10 posts
const authorCounts = select(
  (p) => ({
    author_id: p.author_id,
    postCount: p.id.count(),
  }),
  {
    from: db.posts,
    groupBy: (p) => [p.author_id],
  }
);

const prolificAuthors = await select(
  (ac, { u }) => ({
    id: u.id,
    name: u.name,
    totalPosts: ac.postCount,
  }),
  {
    from: authorCounts.asFromItemjoin(db.users, "u", (ac, { u }) => ac.author_id["="](u.id)),
    where: (ac) => ac.postCount[">"](10),
  }
).execute(tg);

// Type of prolificAuthors is { id: number; name: string; totalPosts: bigint }[]
```

## Roadmap

🧪 Current Features (Developer Preview)

The project is currently in an early but powerful state. The core foundation is in place:

- [x] Complete Postgres API: Generated types, operators, and functions for the entire Postgres surface.
- [x] Query Builder Core: A proof-of-concept query builder with SELECT, JOIN, and GROUP BY.
- [x] Interactive Playground: A live, in-browser demo powered by PGlite.

🚀 Road to v1.0: Production Readiness

The immediate priority is building a rock-solid foundation to make Typegres stable and ready for production use. This includes:
- [ ] Full query builder: Full support for aggregation, window functions, CTEs.
- [ ] Full Mutation Support: Robust implementations for INSERT, UPDATE, and DELETE.
- [ ] Essential Keywords: First-class support for IS NULL, AND, OR, IN, BETWEEN, etc.
- [ ] Comprehensive Test Suite: Dramatically expand test coverage across all features.
- [ ] Advanced Type Support: Refined typing for JSONB, arrays, and custom enums.
- [ ] Inline Documentation: Add TSDoc comments for better in-editor help and discoverability.

🔭 Long-Term Vision: A New Data Layer

Once that stable v1.0 foundation is in place, the roadmap will focus on solving deeper, more fundamental problems that can make significant headway into resolving the object-relational impedance mismatch.
- [ ] Truly Type-Safe Migrations: Typesafe migrations without codegen.
- [ ] First-Class Relations: A simple and composable API for relations that feels natural in TypeScript.
- [ ] An Even More Idiomatic API: Write code that feels even more like TypeScript but produces clean, predictable SQL.

## Project Structure

- `src/` - Main library source code
- `src/gen/` - Auto-generated PostgreSQL types and functions
- `site/` - Documentation website and interactive playground

## Development

Requirements:

- `nix` package manager
- (optional) `direnv` for automatic environment setup

To contribute, clone the repository (run `nix develop` if you don't have `direnv` set up) and run:

```bash
# Install dependencies
npm install
# Start custom PostgreSQL instance:
./start_postgres.sh
# Run the codegen script to generate types and functions
npm run codegen
# Run tests
npm test
# Type check the code
npm run typecheck
# Build the library
npm run build
```

## License

MIT © Ryan Rasti
