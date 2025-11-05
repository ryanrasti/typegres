import { Typegres, typegres } from "../../db";
import { insert } from "../../grammar";
import { values } from "../../query/values";
import { User, Todos } from "./models";
import { Text, Int4 } from "../../types";

// Minimal migration using raw SQL via Typegres' `sql` helper on the client
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

// Seed data
export const runSeeds = async (tg: Typegres) => {
  // Create "Mr. Typegres" user
  const [mrTypegres] = await insert(
    { into: User },
    values({
      username: Text.new("Mr. Typegres"),
    }),
  )
    .returning((u) => u)
    .execute(tg);

  // Create "Mrs. Cap'n Web" user
  const [mrsCapnWeb] = await insert(
    { into: User },
    values({
      username: Text.new("Mrs. Cap'n Web"),
    }),
  )
    .returning((u) => u)
    .execute(tg);

  // Add some initial todos for Mr. Typegres
  await insert(
    { into: Todos },
    values({
      title: Text.new("Build amazing type-safe queries"),
      user_id: Int4.new(mrTypegres.id),
    }),
  ).execute(tg);

  await insert(
    { into: Todos },
    values({
      title: Text.new("Demonstrate RPC capabilities"),
      user_id: Int4.new(mrTypegres.id),
    }),
  ).execute(tg);

  // Add some initial todos for Mrs. Cap'n Web
  await insert(
    { into: Todos },
    values({
      title: Text.new("Enable seamless browser-server communication"),
      user_id: Int4.new(mrsCapnWeb.id),
    }),
  ).execute(tg);
};

let tgSingleton: Typegres | undefined;

export const getTg = async (): Promise<Typegres> => {
  if (!tgSingleton) {
    const tg = await typegres({
      type: "pglite",
    });
    await migrate(tg);
    await runSeeds(tg);
    tgSingleton = tg;
  }
  return tgSingleton;
};

