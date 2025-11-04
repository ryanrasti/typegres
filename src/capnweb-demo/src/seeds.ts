// Intentionally left blank. Seed data will be added here.

import { Typegres } from "../../db";
import { insert } from "../../grammar";
import { values } from "../../query/values";
import { User, Todos } from "./models";
import { Text, Int4 } from "../../types";

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
