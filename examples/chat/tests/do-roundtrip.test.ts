// typegres inside the Durable Object, tested from inside the DO: attach,
// migrate (runs in the constructor), and typed round-trips against the
// real ctx.storage.sql.

import { test, expect } from "vitest";
import { env, runInDurableObject } from "cloudflare:test";
import { Users, Messages } from "../worker/api";
import type { ChatDo } from "../worker/chat-do";

const stub = () => env.CHAT.get(env.CHAT.idFromName("test"));

test("migration + seed ran; typegres reads them back", async () => {
  await runInDurableObject(stub(), async (instance: ChatDo) => {
    const users = await Users.from()
      .select(({ users }) => ({ id: users.id, name: users.name }))
      .execute(instance.conn);
    expect(users.map((u) => u.name)).toContain("typegres-bot");

    const messages = await Messages.from()
      .select(({ messages }) => ({ body: messages.body }))
      .execute(instance.conn);
    expect(messages.length).toBeGreaterThan(0);
  });
});

test("insert → select round-trip with typed results", async () => {
  await runInDurableObject(stub(), async (instance: ChatDo) => {
    const [inserted] = await Users.insert({ name: "roundtrip", password_hash: "x" })
      .returning(({ users }) => ({ id: users.id, name: users.name }))
      .execute(instance.conn);
    expect(inserted?.name).toBe("roundtrip");
    expect(typeof inserted?.id).toBe("number");

    const [row] = await Users.from()
      .where(({ users }) => users.id.eq(inserted!.id))
      .select(({ users }) => ({ name: users.name }))
      .execute(instance.conn);
    expect(row).toEqual({ name: "roundtrip" });
  });
});
