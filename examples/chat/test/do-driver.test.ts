import { describe, it, expect } from "vitest";
import { env, runInDurableObject } from "cloudflare:test";
import { Database, sql } from "typegres/core";
import { DoSqliteDriver } from "typegres/do-sqlite";
import { Integer, Text } from "typegres/sqlite";
import type { ChatDo } from "../src/index";

// Phase 1 -- typegres queries run against the Durable Object's SQLite through
// the DoSqliteDriver, inside real workerd.

describe("DoSqliteDriver", () => {
  it("runs a typegres-built query against the DO's SQLite", async () => {
    const stub = env.CHAT.get(env.CHAT.idFromName("phase1"));
    const rows = await runInDurableObject(stub, async (_instance: ChatDo, state) => {
      const db = new Database({ dialect: "sqlite" });
      const conn = db.attach(new DoSqliteDriver(state.storage.sql));

      await conn.execute(sql`CREATE TABLE dogs (id INTEGER PRIMARY KEY, name TEXT NOT NULL)`);
      await conn.execute(sql`INSERT INTO dogs (name) VALUES ('Rex'), ('Fido')`);

      class Dogs extends db.Table("dogs") {
        id = Integer.column({ nonNull: true, generated: true });
        name = Text.column({ nonNull: true });
      }

      return conn.execute(
        Dogs.from()
          .select(({ dogs }) => ({ id: dogs.id, name: dogs.name.upper() }))
          .orderBy(({ dogs }) => dogs.id),
      );
    });

    expect(rows).toEqual([
      { id: 1, name: "REX" },
      { id: 2, name: "FIDO" },
    ]);
  });
});
