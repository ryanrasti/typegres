import { describe, test, expect } from "vitest";
import { sql, Table, Int8, Text } from "typegres";
import type { Database } from "typegres";
import { tool } from "./exoeval/tool";
import { RpcClient, inMemoryChannel } from "./exoeval/rpc";
import { withinTransaction } from "./builder/test-helper";

// End-to-end: typegres queries authored client-side, shipped over the
// exoeval RPC wire as plain JS source, evaluated server-side under a
// capability-bounded interpreter, results returned as JSON.
//
// The motivating shape (the typegres landing-page example, finally working
// over a real wire):
//
//   await rpc.run((api) =>
//     api.users()
//       .where(({ users }) => users.id["="]("1"))
//       .select(({ users }) => ({ id: users.id, name: users.name.upper() }))
//       .execute(api.db),
//   );
//
// The closures inside .where / .select aren't exported as stubs — they're
// shipped as JS source and re-interpreted server-side under exoeval, with
// the typegres namespace ({users: <Users instance>}) passed in. Every
// QueryBuilder method is @tool-decorated, so the builder composes over
// the wire directly — no host-side wrapper class needed.

class Users extends Table("users") {
  @tool()
  id = (Int8<1>).column({ nonNull: true, generated: true });

  @tool()
  name = (Text<1>).column({ nonNull: true });
}

class Api {
  @tool()
  db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  @tool()
  users() {
    return Users.from();
  }

  // Insert/update/delete entry points. The static methods on TableBase
  // can't be called directly from the wire (the class itself isn't a tool),
  // so expose them through Api methods that return the builder. Each
  // returned builder is fully @tool-decorated, so the chain composes
  // server-side.
  @tool.unchecked()
  insertUsers(row: { name: string }) {
    return Users.insert(row);
  }

  @tool()
  updateUsers() {
    return Users.update();
  }

  @tool()
  deleteUsers() {
    return Users.delete();
  }
}

// Each test creates its own users table inside a withinTransaction block
// so the tests stay isolated and self-contained — same pattern as the
// rest of the suite (see src/builder/*.test.ts).
const setupUsers = async (tx: Database) => {
  await tx.execute(sql`
    CREATE TABLE users (
      id   int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )
  `);
  await tx.execute(sql`INSERT INTO users (name) VALUES ('alice'), ('bob'), ('carol')`);
};

describe("typegres over exoeval rpc — in-memory", () => {
  test("filter + select + execute, all client-authored, server-interpreted", async () => {
    await withinTransaction(async (tx) => {
      await setupUsers(tx);
      const rpc = new RpcClient<Api>(inMemoryChannel(new Api(tx)));

      const rows = await rpc.run((api) =>
        api.users()
          .where(({ users }) => users.id["="]("1"))
          .select(({ users }) => ({
            id: users.id,
            name: users.name.upper(),
          }))
          .execute(api.db),
      );

      expect(rows).toEqual([{ id: "1", name: "ALICE" }]);
    });
  });

  test("captures inline through to typegres expressions", async () => {
    await withinTransaction(async (tx) => {
      await setupUsers(tx);
      const rpc = new RpcClient<Api>(inMemoryChannel(new Api(tx)));
      const minId = "2";

      const rows = await rpc.run(
        (api) =>
          api.users()
            .where(({ users }) => users.id[">="](minId))
            .select(({ users }) => ({ name: users.name }))
            .execute(api.db),
        { minId },
      );

      expect(rows.map((r: { name: string }) => r.name).sort()).toEqual(["bob", "carol"]);
    });
  });

  test("wide-open predicate returns every row", async () => {
    await withinTransaction(async (tx) => {
      await setupUsers(tx);
      const rpc = new RpcClient<Api>(inMemoryChannel(new Api(tx)));

      const rows = await rpc.run((api) =>
        api.users()
          .where(({ users }) => users.id[">"]("0"))
          .select(({ users }) => ({ name: users.name }))
          .execute(api.db),
      );

      expect(rows.map((r: { name: string }) => r.name).sort()).toEqual([
        "alice",
        "bob",
        "carol",
      ]);
    });
  });

  test("insert + returning over the wire", async () => {
    await withinTransaction(async (tx) => {
      await setupUsers(tx);
      const rpc = new RpcClient<Api>(inMemoryChannel(new Api(tx)));

      const inserted = await rpc.run((api) =>
        api.insertUsers({ name: "dave" })
          .returning(({ users }) => ({ id: users.id, name: users.name }))
          .execute(api.db),
      );

      expect(inserted).toEqual([{ id: "4", name: "dave" }]);
    });
  });

  test("update + where + returning over the wire", async () => {
    await withinTransaction(async (tx) => {
      await setupUsers(tx);
      const rpc = new RpcClient<Api>(inMemoryChannel(new Api(tx)));

      const updated = await rpc.run((api) =>
        api.updateUsers()
          .set(({ users: _ }) => ({ name: "ALICE!" }))
          .where(({ users }) => users.id["="]("1"))
          .returning(({ users }) => ({ id: users.id, name: users.name }))
          .execute(api.db),
      );

      expect(updated).toEqual([{ id: "1", name: "ALICE!" }]);
    });
  });

  test("delete + where + returning over the wire", async () => {
    await withinTransaction(async (tx) => {
      await setupUsers(tx);
      const rpc = new RpcClient<Api>(inMemoryChannel(new Api(tx)));

      const deleted = await rpc.run((api) =>
        api.deleteUsers()
          .where(({ users }) => users.id[">="]("2"))
          .returning(({ users }) => ({ name: users.name }))
          .execute(api.db),
      );

      expect(deleted.map((r: { name: string }) => r.name).sort()).toEqual(["bob", "carol"]);
    });
  });
});
