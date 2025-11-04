// Minimal migration using raw SQL via Typegres' `sql` helper on the client
// The calling site should pass a connected `tg` that exposes `sql`.

import { Typegres } from "typegres";

export const migrate = async (tg: Typegres) => {
  // Create tables (one statement per call)
  await tg.sql`
    create table if not exists "user" (
      id serial primary key,
      username text not null unique,
      created_at timestamptz not null default now()
    )
  `.execute();

  await tg.sql`
    create table if not exists todos (
      id serial primary key,
      user_id int not null references "user"(id) on delete cascade,
      title text not null,
      completed boolean not null default false,
      created_at timestamptz not null default now()
    )
  `.execute();

  await tg.sql`
    create index if not exists idx_todos_title on todos using gin (to_tsvector('simple', title))
  `.execute();

  await tg.sql`
    create index if not exists idx_todos_user_id on todos(user_id)
  `.execute();
};
