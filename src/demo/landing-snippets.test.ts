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
  await db.execute(sql`INSERT INTO users (created_at, metadata) VALUES
    (now(), '{"createdAt": "2026-04-20T10:00:00Z"}'),
    (now() - interval '1 day', '{"createdAt": "2026-04-19T10:00:00Z"}')`);
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
  created_at = (Timestamptz<1>).column({ nonNull: true });
  metadata = (Jsonb<0 | 1>).column();

  // Your public interface stays stable as your schema evolves
  createdAt(): Timestamptz<1> {
    return this.created_at;
  }

  // "old" version the diff is migrating *away* from. Kept as a real code
  // line so the `// -` branch on the landing page resolves to something
  // real, not a ghost.
  createdAtViaMetadata(): Timestamptz<1> {
    return this.metadata["->>"]("createdAt").cast(Timestamptz);
  }

  todos() {
    return Todo.from().where((ns) => ns.todos.user_id["="](this.id));
  }
}

test("example 1: decouple interface from schema", async () => {
  const latest = await db.execute(
    User.from()
      .orderBy((ns) => [ns.users.createdAt(), "desc"])
      .limit(1),
  );
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
      .where((ns) => ns.todos.id["="](this.id))
      .set(() => fields);
  }
}

test("example 2: relations and mutations via hydrated instances", async () => {
  const userId = 1n;
  const [user] = await db.hydrate(
    User.from().where((ns) => ns.users.id["="](userId)).limit(1),
  );

  // The only way to get a todo is through the user:
  const [todo] = await db.hydrate(user!.todos().limit(1));
  expect(todo).toBeInstanceOf(Todo);

  // The only way to update a todo is via the hydrated instance:
  await db.execute(todo!.update({ completed: true }));

  const [after] = await db.execute(
    Todo.from().where((ns) => ns.todos.id["="](todo!.id)),
  );
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
      .where((ns) => ns.users.token["="](token));
  }
}

export function TodoList({ searchQuery }: { searchQuery: string }) {
  const todos = useTypegresQuery((user) => user.todos()
    .select((ns) => ({ id: ns.todos.id, title: ns.todos.title }))
    .where((ns) => ns.todos.title.ilike(\`%\${searchQuery}%\`))
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

    // Editorial or scaffolding comments the landing page is free to show
    // without requiring a match in the test file.
    const isEditorial = (line: string): boolean =>
      line === "// ..." || (line.startsWith("//") && !line.startsWith("// -") && !line.startsWith("// +"));

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
