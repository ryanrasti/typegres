import fs from "node:fs";
import path from "node:path";
import { describe, test, expect, beforeAll } from "vitest";
import { typegres, sql, Table, Int8, Text, Bool, Jsonb, Timestamptz } from "typegres";
import type { Database } from "typegres";

// Source of truth for the landing page's code samples. Each snippet lives
// here as real, compiling TypeScript — some inside asserted tests, some
// as illustrative-only lines. The landing page (site/app/page.tsx) is
// free to hide scaffolding and show any subset of these lines; the
// containment test at the bottom enforces that every visible line on the
// landing page appears somewhere in this file.

let db: Database;

beforeAll(async () => {
  db = await typegres({ type: "pglite" });
  await db.execute(sql`
    CREATE TABLE users (
      id         int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      token      text NOT NULL,
      created_at timestamptz NOT NULL,
      metadata   jsonb
    )
  `);
  await db.execute(sql`
    CREATE TABLE todos (
      id        int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      user_id   int8 NOT NULL,
      title     text NOT NULL,
      completed bool NOT NULL DEFAULT false
    )
  `);
  await db.execute(sql`INSERT INTO users (token, created_at, metadata) VALUES
    ('t1', now(), '{"createdAt": "2026-04-20T10:00:00Z"}'),
    ('t2', now() - interval '1 day', '{"createdAt": "2026-04-19T10:00:00Z"}')`);
  await db.execute(sql`INSERT INTO todos (user_id, title, completed) VALUES
    (1, 'first', false), (1, 'second', true), (2, 'other user', false)`);
});

// ---------------------------------------------------------------------------
// Example 1: decouple interface from schema. Both the "old" (jsonb-backed)
// and "new" (direct column) readings of createdAt live here as real code —
// the landing page shows both under `// -` / `// +` diff markers, and the
// containment check requires both underlying lines to exist in this file.
// ---------------------------------------------------------------------------

class User extends Table("users") {
  id = (Int8<1>).column({ nonNull: true, generated: true });
  token = (Text<1>).column({ nonNull: true });
  created_at = (Timestamptz<1>).column({ nonNull: true });
  metadata = (Jsonb<0 | 1>).column();

  // Your public interface stays stable as your schema evolves
  createdAt(): Timestamptz<1> {
    return this.created_at;
  }

  // "old" version the diff is migrating away from. Kept as a real,
  // compiling method so the `// -` branch on the landing page points at
  // real code — the containment check strips the diff marker and looks
  // the line up here.
  createdAtViaMetadata(): Timestamptz<0 | 1> {
    return this.metadata["->>"]("createdAt").cast(Timestamptz);
  }

  todos() {
    return Todo.from().where(({ todos }) => todos.user_id.eq(this.id));
  }
}

test("example 1: decouple interface from schema", async () => {
  const latest = await User.from()
    .orderBy(({ users }) => [users.createdAt(), "desc"])
    .limit(1)
    .execute(db);
  expect(latest).toHaveLength(1);
});

// ---------------------------------------------------------------------------
// Example 2: interface defines data boundaries.
// ---------------------------------------------------------------------------

class Todo extends Table("todos") {
  id = (Int8<1>).column({ nonNull: true, generated: true });
  user_id = (Int8<1>).column({ nonNull: true });
  title = (Text<1>).column({ nonNull: true });
  completed = (Bool<1>).column({ nonNull: true });

  update(fields: { completed?: boolean; title?: string }) {
    return Todo.update()
      .where(({ todos }) => todos.id.eq(this.id))
      .set(() => fields);
  }
}

test("example 2: relations and mutations via hydrated instances", async () => {
  // In the test we need a real user + todoId; the landing snippet elides
  // these with `const user = ...`.
  const user = (await db.hydrate(
    User.from().where(({ users }) => users.token.eq("t1")).limit(1),
  ))[0]!;
  const todoId = "1";

  // The only way to get a todo is through a user:
  const todo = await user.todos()
    .where(({ todos }) => todos.id.eq(todoId))
    .one(db);

  // The only way to update a todo is via the hydrated instance:
  await todo.update({ completed: true }).execute(db);

  const [after] = await Todo.from()
    .where(({ todos }) => todos.id.eq(todo.id))
    .execute(db);
  expect(after!.completed).toBe(true);
});

// ---------------------------------------------------------------------------
// Example 3: RPC (Coming Soon). The runtime doesn't exist yet; these lines
// live inside a template literal so the containment check finds them. Drop
// the wrapper once the RPC layer lands.
// ---------------------------------------------------------------------------

const _aspirational = `
export class Api extends RpcTarget {
  getUserFromToken(token: string) {
    return User.from()
      .where(({ users }) => users.token.eq(token));
  }
}

export function TodoList({ searchQuery }: { searchQuery: string }) {
  const todos = useTypegresQuery((user) => user.todos()
    .select(({ todos }) => ({ id: todos.id, title: todos.title }))
    .where(({ todos }) => todos.title.ilike(\`%\${searchQuery}%\`))
  );

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
`;
void _aspirational;

// ---------------------------------------------------------------------------
// Containment check: every line shown on the landing page must appear
// (trimmed) somewhere in this file.
// ---------------------------------------------------------------------------

describe("landing page snippets", () => {
  test("every visible line appears in this test file", () => {
    const pagePath = path.join(import.meta.dirname, "..", "..", "site", "app", "page.tsx");
    const pageSrc = fs.readFileSync(pagePath, "utf-8");
    const thisFile = fs.readFileSync(import.meta.filename, "utf-8");

    const testLines = new Set(thisFile.split("\n").map((l) => l.trim()));

    const snippets = [...pageSrc.matchAll(/(?:leftCode|rightCode):\s*`([^`]*)`/gs)]
      .map((m) => m[1]!);
    expect(snippets.length).toBeGreaterThan(0);

    // Editorial or scaffolding lines the landing page is free to show
    // without requiring a match in the test file:
    //  - `// ...` or `// <editorial>` comments (not diff markers)
    //  - `const x = ...` elision placeholders
    const isEditorial = (line: string): boolean =>
      line === "// ..."
      || (line.startsWith("//") && !line.startsWith("// -") && !line.startsWith("// +"))
      || /= \.\.\.\s*;?$/.test(line);

    // Diff markers point at real code — strip the prefix before matching.
    const stripDiffMarker = (line: string): string =>
      line.replace(/^\/\/\s+[-+]\s+/, "");

    const missing: string[] = [];
    for (const snip of snippets) {
      for (const raw of snip.split("\n")) {
        const line = raw.trim();
        if (!line) { continue; }
        if (isEditorial(line)) { continue; }
        const needle = stripDiffMarker(line);
        if (!testLines.has(needle)) { missing.push(needle); }
      }
    }

    expect(missing, `missing lines:\n  ${missing.join("\n  ")}`).toEqual([]);
  });
});
