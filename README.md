# Typegres

[![CI](https://github.com/ryanrasti/typegres/actions/workflows/main.yml/badge.svg)](https://github.com/ryanrasti/typegres/actions/workflows/main.yml)
[![npm version](https://img.shields.io/npm/v/typegres.svg)](https://www.npmjs.com/package/typegres)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Type-safe Postgres in TypeScript (alpha)

Import the full power of PostgreSQL as a TypeScript library.

## Quick Start
```bash
# Install Typegres
npm install typegres
```

```typescript
import { typegres, Text, Int4, values } from 'typegres';

const db = typegres({ type: 'pglite' });

const users = values(
  { name: Text.new('Alice'), age: Int4.new(25), isActive: Bool.new(true) },
  { name: Text.new('Bob'), age: Int4.new(30), isActive: Bool.new(false) }
  { name: Text.new('Charlie'), age: Int4.new(17), isActive: Bool.new(true) }
);

const rows = await users
  .select(u => ({ upper: u.name.upper(), isAdult: u.age['>'](18) }))
  .where(u => u.isActive)
  .execute(db);

console.log(rows);
// Output: [{ upper: 'ALICE' isAdult: true }, { upper: 'CHARLIE', isAdult: false }]
```

## ⚠︎ ALPHA: breaking changes ahead

This project is in active development. Documentation and features are still being built.

## What is Typegres?

While traditional ORMs and query builders abstract over multiple SQL dialects, Typegres goes all-in on PostgreSQL to provide the most powerful and type-safe experience possible. In a single import, you can access the full power of Postgres with complete TypeScript type safety.

## Key Features

> *All Postgres power, no ORM bloat
- **Type-Safe by Design**: Every PostgreSQL type and function with TypeScript safety
- **Iterate Fast**: Minimize context switching and get immediate feedback for your queries
- **Write Real SQL**: Use PostgreSQL features without limitations
- **Full Type Safety**: Catch errors at compile time, not runtime
- **No Magic**: Your queries compile to exactly the SQL you'd expect
- **Great DX**: Autocompletion, inline documentation, and type checking

## How It Works

**Typegres** generates TypeScript wrappers for *every* built-in Postgres type, operator, and function—from `jsonb_each` to `ts_rank_cd`. Because it targets only Postgres, it can stay thin: your `.select()` chain compiles to plain SQL with no hidden query planner.

```typescript
import { Text, Int4, Bool, values } from 'typegres'

// Create typed data with full PostgreSQL type safety
const users = values(
  { name: Text.new("Alice"), age: Int4.new(25), active: Bool.new(true) },
  { name: Text.new("Bob"), age: Int4.new(30), active: Bool.new(false) }
)

// Build type-safe queries that compile to efficient SQL
const result = await users
  .select(u => ({
    firstName: u.name.regexpSubstr("[A-Za-z]+").upper(),
    lastName: u.name.regexpSubstr("[A-Za-z]+$").lower(),
    isAdult: u.age.int4Gt(18)
  }))
  .where(u => u.active)
  .execute(db)

// TypeScript knows the exact return type:
// result: Array<{ greeting: string; isAdult: boolean }>

// Output:
// result [
//  {
//    firstName: 'ALICE',
//    lastName: 'aardvark',
//    isAdult: true
//  }
// ]
```

## Roadmap
- [x] Full PostgreSQL type, function, and operatator generation
- [x] PoC Type-safe query builder
- [x] [Interactive playground](https://typegres.com/play/)
- [ ] Custom PostgreSQL keywords (e.g., `IS NULL`, `OR`, `AND`)
- [ ] Inline documentation
- [ ] Advanced typing (e.g. JSONB, arrays, custom types)
- [ ] Table representation
- [ ] Migrations
- [ ] Community contributions and feedback

## Project Structure

- `src/` - Main library source code
- `src/gen/` - Auto-generated PostgreSQL types and functions
- `site/` - Documentation website and interactive playground

## Documentation

- [Quick Start Guide](https://typegres.com/docs/quickstart/)
- [API Reference](https://typegres.com/api/index.html)
- [Interactive Playground](https://typegres.com/play/)

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