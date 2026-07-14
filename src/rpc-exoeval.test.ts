import { describe, test, expect, expectTypeOf } from "vitest";
import { sql } from "typegres";
import { Int8, Text, Record, Anyarray } from "typegres/postgres";
import type { Connection } from "typegres";
import { expose } from "./exoeval/tool";
import { RpcClient, inMemoryChannel } from "./exoeval/rpc";
import { setupDb, withinTransaction, db } from "./test-helpers";
setupDb();

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
//       .execute(api.conn),
//   );
//
// The closures inside .where / .select aren't exported as stubs — they're
// shipped as JS source and re-interpreted server-side under exoeval, with
// the typegres namespace ({users: <Users instance>}) passed in. Every
// QueryBuilder method is @expose-decorated, so the builder composes over
// the wire directly — no host-side wrapper class needed.

class Users extends db.Table("users") {
  @expose()
  id = (Int8<1>).column({ nonNull: true, generated: true });

  @expose()
  name = (Text<1>).column({ nonNull: true });
}

class Api {
  @expose()
  conn: Connection;

  constructor(conn: Connection) {
    this.conn = conn;
  }

  @expose()
  users() {
    return Users.from();
  }

  // Insert/update/delete entry points. The static methods on TableBase
  // can't be called directly from the wire (the class itself isn't a tool),
  // so expose them through Api methods that return the builder. Each
  // returned builder is fully @expose-decorated, so the chain composes
  // server-side.
  // eslint-disable-next-line no-restricted-syntax -- test fixture
  @expose.unchecked()
  insertUsers(row: { name: string }) {
    return Users.insert(row);
  }

  @expose()
  updateUsers() {
    return Users.update();
  }

  @expose()
  deleteUsers() {
    return Users.delete();
  }
}

// Each test creates its own users table inside a withinTransaction block
// so the tests stay isolated and self-contained — same pattern as the
// rest of the suite (see src/builder/*.test.ts).
const setupUsers = async (tx: Connection) => {
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
          .execute(api.conn),
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
        (api, { minId }) =>
          api.users()
            .where(({ users }) => users.id[">="](minId))
            .select(({ users }) => ({ name: users.name }))
            .execute(api.conn),
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
          .execute(api.conn),
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
          .execute(api.conn),
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
          .execute(api.conn),
      );

      expect(updated).toEqual([{ id: "1", name: "ALICE!" }]);
    });
  });

  // Three variants of the same exposure question, each pinning down
  // a separate code path. Together they prove the @expose gate is
  // layered:
  //   1. bare `.from().execute()` — the rowType is the marker-bearing
  //      table instance; `deserializeRows` filters by membership.
  //   2. spread `.select(({s}) => ({...s}))` — exoeval's spread
  //      evaluation walks the marker; non-@expose fields aren't
  //      copied in.
  //   3. explicit `.select(({s}) => ({pass: s.password}))` — exoeval
  //      property access on non-@expose returns undefined; JSON
  //      serialization drops it.
  describe("@expose gating across select shapes", () => {
    const setupSecrets = async (tx: Connection) => {
      await tx.execute(sql`
        CREATE TABLE secrets (
          id           int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          public_name  text NOT NULL,
          password     text NOT NULL
        )
      `);
      await tx.execute(sql`INSERT INTO secrets (public_name, password) VALUES ('alice', 'hunter2')`);
    };

    class Secrets extends db.Table("secrets") {
      @expose() id          = (Int8<1>).column({ nonNull: true, generated: true });
      @expose() public_name = (Text<1>).column({ nonNull: true });
      // Intentionally NOT @expose'd:
                password    = (Text<1>).column({ nonNull: true });
    }
    class SecretsApi {
      @expose() conn: Connection;
      constructor(conn: Connection) { this.conn = conn; }
      @expose() all() { return Secrets.from(); }
      // eslint-disable-next-line no-restricted-syntax -- test fixture
      @expose.unchecked()
      insertSecrets(row: { public_name: string; password: string }) { return Secrets.insert(row); }
      @expose() updateSecrets() { return Secrets.update(); }
      @expose() deleteSecrets() { return Secrets.delete(); }
      // Deliberately returns class instances; used to verify the wire rejects them.
      @expose() async hydrateAll() { return this.conn.hydrate(Secrets.from()); }
    }

    // Closure helper: every test in this block does the same tx + rpc + setup
    // dance — collapse it so each test reads as just the closure under test.
    // `withinTransaction` discards its inner return, so capture via closure.
    const runRpc = async <T>(build: (api: SecretsApi) => Promise<T>): Promise<T> => {
      let result: T;
      await withinTransaction(async (tx) => {
        await setupSecrets(tx);
        const rpc = new RpcClient<SecretsApi>(inMemoryChannel(new SecretsApi(tx)));
        result = (await rpc.run(build)) as T;
      });
      return result!;
    };

    test("bare .from().execute() — gate fires", async () => {
      await withinTransaction(async (tx) => {
        await setupSecrets(tx);
        const rpc = new RpcClient<SecretsApi>(inMemoryChannel(new SecretsApi(tx)));
        const rows = await rpc.run((api) => api.all().execute(api.conn));
        expect(rows).toEqual([{ id: "1", public_name: "alice" }]);
        expect(rows[0]).not.toHaveProperty("password");
      });
    });

    test("spread `({...s})` — exoeval copies only @expose'd fields", async () => {
      await withinTransaction(async (tx) => {
        await setupSecrets(tx);
        const rpc = new RpcClient<SecretsApi>(inMemoryChannel(new SecretsApi(tx)));
        const rows = await rpc.run((api) =>
          api.all().select(({ secrets }) => ({ ...secrets })).execute(api.conn),
        );
        expect(rows).toEqual([{ id: "1", public_name: "alice" }]);
        expect(rows[0]).not.toHaveProperty("password");
      });
    });

    test("explicit `({pass: s.password})` — non-@expose'd access yields undefined and fails RowType validation", async () => {
      await withinTransaction(async (tx) => {
        await setupSecrets(tx);
        const rpc = new RpcClient<SecretsApi>(inMemoryChannel(new SecretsApi(tx)));
        // `secrets.password` evaluates to undefined inside exoeval (the
        // field isn't @expose'd), so the select callback returns
        // `{pass: undefined}` — which fails `fn.returns(isRowType)`
        // validation (RowType requires every value to be an Any).
        await expect(
          rpc.run((api) =>
            api.all()
              .select(({ secrets }) => ({ pass: secrets.password }))
              .execute(api.conn),
          ),
        ).rejects.toThrow();
      });
    });

    test("scalar subquery — single row Record", async () => {
      await withinTransaction(async (tx) => {
        await setupSecrets(tx);
        const rpc = new RpcClient<SecretsApi>(inMemoryChannel(new SecretsApi(tx)));
        const rows = await rpc.run((api) =>
          api.all()
            .select(({ secrets: _ }) => ({
              single: api.all().limit(1).cardinality("one").scalar(),
            }))
            .limit(1)
            .execute(api.conn),
        );
        expect(rows).toEqual([{ single: { id: "1", public_name: "alice" } }]);
        expect(rows[0]!.single).not.toHaveProperty("password");
      });
    });

    test("scalar subquery — array of Records (with pg subscript)", async () => {
      await withinTransaction(async (tx) => {
        await setupSecrets(tx);
        const rpc = new RpcClient<SecretsApi>(inMemoryChannel(new SecretsApi(tx)));
        const rows = await rpc.run((api) =>
          api.all()
            .select(({ secrets: _ }) => {
              const arr = api.all().cardinality("many").scalar();
              return {
                all: arr,
                first: arr["[]"](1),
              };
            })
            .limit(1)
            .execute(api.conn),
        );
        expect(rows[0]!.all).toEqual([{ id: "1", public_name: "alice" }]);
        expect(rows[0]!.all[0]).toEqual({ id: "1", public_name: "alice" });
        expect(rows[0]!.all[0]).not.toHaveProperty("password");
        expect(rows[0]!.first).toEqual({ id: "1", public_name: "alice" });
        expect(rows[0]!.first).not.toHaveProperty("password");
      });
    });

    // hydrate isn't @expose'd, so it can't be reached from the RPC wire —
    // these run directly on tx. They exist to confirm the @expose gate
    // also fires through the hydrate path (which goes through
    // Record.deserialize → deserializeRows just like execute).
    test("scalar subquery — single row Record (hydrate)", async () => {
      await withinTransaction(async (tx) => {
        await setupSecrets(tx);
        const rows = await tx.hydrate(
          Secrets.from()
            .select(() => ({
              single: Secrets.from().limit(1).cardinality("one").scalar(),
            }))
            .limit(1),
        );
        // hydrate returns Any-wrappers, not deserialized JS objects:
        // `row.single` is a Record-typed Any instance.
        expect(rows[0]!.single).toBeInstanceOf(Record);
        expectTypeOf(rows[0]!.single).toMatchTypeOf<Record<any, 1>>();
      });
    });

    test("scalar subquery — array of Records (hydrate, with pg subscript)", async () => {
      await withinTransaction(async (tx) => {
        await setupSecrets(tx);
        const rows = await tx.hydrate(
          Secrets.from()
            .select(() => {
              const arr = Secrets.from().cardinality("many").scalar();
              return {
                all: arr,
                first: arr["[]"](1),
              };
            })
            .limit(1),
        );
        // hydrate keeps Any-wrappers (composable into follow-up queries),
        // NOT plain JS values. Both fields are Any-instance subclasses.
        expect(rows[0]!.all).toBeInstanceOf(Anyarray);
        expect(rows[0]!.first).toBeInstanceOf(Record);
        expectTypeOf(rows[0]!.all).toMatchTypeOf<Anyarray<Record<any, 1>, 1>>();
        expectTypeOf(rows[0]!.first).toMatchTypeOf<Record<any, any>>();
      });
    });

    test("insert .returning bare — gate fires", async () => {
      const rows = await runRpc((api) =>
        api.insertSecrets({ public_name: "dave", password: "hunter3" })
          .returning(({ secrets }) => secrets)
          .execute(api.conn),
      );
      expect(rows).toEqual([{ id: "2", public_name: "dave" }]);
      expect(rows[0]).not.toHaveProperty("password");
    });

    test("update .returning bare — gate fires", async () => {
      const rows = await runRpc((api) =>
        api.updateSecrets()
          .set(() => ({ public_name: "ALICE!" }))
          .where(({ secrets }) => secrets.id["="]("1"))
          .returning(({ secrets }) => secrets)
          .execute(api.conn),
      );
      expect(rows).toEqual([{ id: "1", public_name: "ALICE!" }]);
      expect(rows[0]).not.toHaveProperty("password");
    });

    test("delete .returning bare — gate fires", async () => {
      const rows = await runRpc((api) =>
        api.deleteSecrets()
          .where(({ secrets }) => secrets.id["="]("1"))
          .returning(({ secrets }) => secrets)
          .execute(api.conn),
      );
      expect(rows).toEqual([{ id: "1", public_name: "alice" }]);
      expect(rows[0]).not.toHaveProperty("password");
    });

    test("hydrated rows can't pass over rpc — safeStringify rejects class instances", async () => {
      await expect(
        runRpc((api) => api.hydrateAll()),
      ).rejects.toThrow(/cannot serialize.*instance over RPC/);
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
          .execute(api.conn),
      );

      expect(deleted.map((r: { name: string }) => r.name).sort()).toEqual(["bob", "carol"]);
    });
  });
});
