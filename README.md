# Typegres

[![CI](https://github.com/ryanrasti/typegres/actions/workflows/main.yml/badge.svg)](https://github.com/ryanrasti/typegres/actions/workflows/main.yml) [![npm version](https://img.shields.io/npm/v/typegres.svg)](https://www.npmjs.com/package/typegres) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

> Type-safe Postgres in TypeScript (alpha)

Import the full power of PostgreSQL as a TypeScript library.

## Quick Start

```bash
# Install Typegres
npm install typegres
```

```typescript
import { typegres, Text, Int4, values, Bool } from "typegres";

const db = typegres({ type: "pglite" });

const users = values(
  { name: Text.new("Alice"), age: Int4.new(25), isActive: Bool.new(true) },
  { name: Text.new("Bob"), age: Int4.new(30), isActive: Bool.new(false) },
  { name: Text.new("Charlie"), age: Int4.new(17), isActive: Bool.new(true) }
);

const rows = await users
  .select((u) => ({ upper: u.name.upper(), isAdult: u.age[">"](18) }))
  .where((u) => u.isActive)
  .execute(db);

console.log(rows);
// Output: [{ upper: 'ALICE', isAdult: true }, { upper: 'CHARLIE', isAdult: false }]
```

<sub>✔︎ Autocomplete for every PG function · 100 % compile-time types</sub>

## Docs & Demo

- Docs: https://typegres.com/docs/quickstart/
- API Reference: https://typegres.com/api/
- Playground: https://typegres.com/play/

## ⚠︎ Alpha: API will break between minor versions.

This project is in active development. Documentation and features are still being built.

## What is Typegres?

While traditional ORMs and query builders abstract over multiple SQL dialects, Typegres goes all-in on PostgreSQL to provide the most powerful and type-safe experience possible. In a single import, you can access the full power of Postgres with complete TypeScript type safety.

## Key Features & Design Goals

- Postgres-only – every builtin function & operator, nothing poly-glot
- TypeScript-native – full generics, autocomplete, inference
- Zero ORM bloat – SQL you can read
- TypeScript safety – mistakes caught by the compiler, not production
- Browser & Node – works with Neon, Supabase, Render, etc.

## What makes Typegres different?

Typegres generates TypeScript wrappers for every Postgres primitive.
There’s no hidden DSL: the call-chain above becomes plain SQL:

```sql
SELECT "name"::text::upper            AS "upper",
       ("age" > 18)                   AS "adult"
FROM (VALUES ('Alice',25),('Bob',17)) AS "users"("name","age");
```

Focus on learning Postgres itself — Typegres just gives you autocomplete, type-checking, and all other benefits of TypeScript.

## Advanced example

```typescript
const result = await users
  .select((u) => ({
    firstName: u.name.regexpSubstr("[A-Z][a-z]+").upper(),
    lastName: u.name.regexpSubstr("[a-z]+$").lower(),
    isAdult: u.age[">"](18),
  }))
  .where((u) => u.isActive)
  .execute(db);

// result type: Array<{ firstName: string; lastName: string; isAdult: boolean }>
```

## Roadmap

- [x] Generated PG types, operators, functions
- [x] Query-builder PoC
- [x] Interactive playground
- [ ] INSERT / RETURNING helpers
- [ ] Custom keywords (`IS NULL`, `AND`, `OR`)
- [ ] Refined typing for advanced types (JSONB, arrays, custom enums)
- [ ] Table generator + migrations
- [ ] Inline docs & hover help

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
