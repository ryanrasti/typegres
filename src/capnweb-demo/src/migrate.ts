// Minimal migration using raw SQL via Typegres' `sql` helper on the client
// The calling site should pass a connected `tg` that exposes `sql`.

type SqlClient = { sql: (strings: TemplateStringsArray, ...values: unknown[]) => Promise<unknown> | unknown };

export const migrate = async (tg: SqlClient) => {
  // Create tables (one statement per call)
  await tg.sql`
    create table if not exists "user" (
      id serial primary key,
      username text not null unique,
      created_at timestamptz not null default now()
    )
  `;

  await tg.sql`
    create table if not exists todos (
      id serial primary key,
      user_id int not null references "user"(id) on delete cascade,
      title text not null,
      completed boolean not null default false,
      created_at timestamptz not null default now()
    )
  `;

  await tg.sql`
    create index if not exists idx_todos_title on todos using gin (to_tsvector('simple', title))
  `;

  await tg.sql`
    create index if not exists idx_todos_user_id on todos(user_id)
  `;
};


