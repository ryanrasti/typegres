# Typegres: SQL-over-RPC, Safely

[![CI](https://github.com/ryanrasti/typegres/actions/workflows/main.yml/badge.svg)](https://github.com/ryanrasti/typegres/actions/workflows/main.yml) [![npm version](https://img.shields.io/npm/v/typegres.svg)](https://www.npmjs.com/package/typegres) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

A TypeScript API framework that lets clients compose any queries they need within boundaries you control.

## Core Principles

### 1. Decouple Your Interface from Your Schema - With All of Postgres, Fully Typed

Wrap your tables in a stable, public interface. You can refactor your "private" tables and columns without ever breaking clients.

```typescript
// api.ts
export class User extends Models.User {
  // Your public interface stays stable as your schema evolves
  createdAt() {
    // Before: accessing from JSONB metadata
    // return this.metadata['->>']('createdAt').cast(Timestamptz);

    // After: direct column access (schema refactored)
    return this.created_at;
  }
}
```

```typescript
// route.ts
// Compiles to the single SQL query you'd write manually.
const user = await User.select()
  .orderBy((u) => u.createdAt(), { desc: true })
  .limit(1)
  .one(tg);
```

### 2. Your Interface Defines Your Data Boundaries

Allowed operations are just methods on your interface, including relations and mutations. Everything fully composable and typed.

```typescript
// api.ts
export class User extends Models.User {
  todos() {
    return Todo.select().where((t) => t.user_id.eq(this.id));
  }
}

export class Todo extends Models.Todos {
  update({ completed }: { completed: boolean }) {
    return update(Todo)
      .set((t) => ({ completed }))
      .where((t) => t.id.eq(this.id));
  }
}
```

```typescript
// route.ts
const user = ...

// The only way to get a todo is through a user:
const todo = await user.todos()
  .where((t) => t.id.eq(todoId))
  .one(tg);

// The only way to update a todo is by getting it from a user:
await todo.update({ completed: true }).execute(tg);
```

### 3. Expose your API over RPC, Safely (coming soon)

Give clients a composable query builder with your unescapable data boundaries. Compose queries in the client with every Postgres feature (joins, window functions, CTEs, etc.) and function as primitives.

```typescript
// api.ts
export class User extends Models.User {
  // ...
}

export class Todo extends Models.Todos {
  // ...
}

export class Api extends RpcTarget {
  getUserFromToken(token: string) {
    return User.select((u) => new User(u)).where((u) => u.token.eq(token));
  }
}

// Clients receive composable query builders
// not flat results
```

```typescript
// frontend.tsx
export function TodoList({ searchQuery }: { searchQuery: string }) {
  const todos = useTypegresQuery((user) => user.todos()
    // Arbitrarily compose your base query...
    .select((t) => ({ id: t.id, title: t.title }))
    // ...using any Postgres function such as `ilike`:
    .where((t) => t.title.ilike(`%${searchQuery}%`))
    .execute(tg)
  );

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

> [!WARNING]
> **Developer Preview**: Typegres is experimental and not production-ready. The API is evolving rapidly. Try the [playground](https://typegres.com/play/) and star the repo to follow along!

> [!NOTE]
> This project is evolving quickly! The code examples in this README are correct, but the [playground](https://typegres.com/play/) contains the very latest, most ergonomic API I'm working on.

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
  },
).execute(tg);

console.log(activeUsers);
// Output: [{ upper: 'ALICE', isAdult: true }, { upper: 'CHARLIE', isAdult: false }]
```

See the [examples](https://github.com/ryanrasti/typegres/tree/main/examples) directory for complete working examples.

## Docs & Demo

- **Try it live**: https://typegres.com/play/
- **API Reference**: https://typegres.com/api/

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
