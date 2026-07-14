import { describe, test, expect } from "vitest";
import z from "zod";
import { sql } from "typegres";
import { Int8, Text } from "typegres/postgres";
import type { Connection } from "typegres";
import { RpcStub } from "capnweb";
import { expose } from "./exoeval/tool";
import { CapnwebHarness } from "./capnweb/harness";
import { doRpc } from "./capnweb/shim";
import { setupDb, withinTransaction, db } from "./test-helpers";
setupDb();

// End-to-end: typegres queries authored client-side, shipped over capnweb
// RPC, replayed server-side against the real query builder, results
// returned as plain data. The capnweb twin of src/rpc-exoeval.test.ts (which ships
// closures as JS source and re-interprets them under exoeval); here the
// closures inside .where / .select serialize via capnweb's record-replay
// ("closure") wire form and replay directly against @expose-shimmed builder
// objects — no interpreter involved.
//
//   await doRpc(stub, (api) =>
//     api.users()
//       .where(({ users }) => users.id["="]("1"))
//       .select(({ users }) => ({ id: users.id, name: users.name.upper() }))
//       .execute(api.conn),
//   );
//
// Two capnweb follow-ons are load-bearing here:
//  - synchronous closure replay: builder callbacks are validated with
//    fn.returns(...), which rejects Promise returns — so .select/.where
//    callbacks MUST replay synchronously;
//  - getLocalTarget(): replay results and round-tripped args (api.conn)
//    arrive as stubs of our own shim proxies; fromRpc recovers the proxies
//    explicitly and unwraps them to the raw builder objects typegres needs.

class Users extends db.Table("users") {
  @expose()
  id = (Int8<1>).column({ nonNull: true, generated: true });

  @expose()
  name = (Text<1>).column({ nonNull: true });
}

// A nested capability returned from the main Api, mixing an @expose'd and a
// non-@expose'd method — to verify the shim gates members recursively, not
// just at the top level.
class Profile {
  @expose()
  displayName() {
    return "public";
  }

  // NOT @expose'd: invisible over RPC even though it's reached through a
  // capability the server willingly returned.
  internalToken() {
    return "s3cr3t";
  }
}

class Api {
  @expose()
  conn: Connection;

  constructor(conn: Connection) {
    this.conn = conn;
  }

  @expose()
  profile() {
    return new Profile();
  }

  @expose()
  users() {
    return Users.from();
  }

  @expose(z.object({ name: z.string() }))
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

const setupUsers = async (tx: Connection) => {
  await tx.execute(sql`
    CREATE TABLE users (
      id   int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name text NOT NULL
    )
  `);
  await tx.execute(sql`INSERT INTO users (name) VALUES ('alice'), ('bob'), ('carol')`);
};

describe("typegres over capnweb rpc — in-memory", () => {
  test("filter + select + execute, client-authored, replayed server-side", async () => {
    await withinTransaction(async (tx) => {
      await setupUsers(tx);
      await using h = new CapnwebHarness(new Api(tx));

      const rows = await doRpc(h.stub, (api) =>
        api
          .users()
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

  test("client-side captures serialize by value into the closure", async () => {
    await withinTransaction(async (tx) => {
      await setupUsers(tx);
      await using h = new CapnwebHarness(new Api(tx));
      const minId = "2";

      const rows = await doRpc(h.stub, (api) =>
        api
          .users()
          .where(({ users }) => users.id[">="](minId))
          .select(({ users }) => ({ name: users.name }))
          .execute(api.conn),
      );

      expect(rows.map((r) => r.name).sort()).toEqual(["bob", "carol"]);
    });
  });

  test("wide-open predicate returns every row", async () => {
    await withinTransaction(async (tx) => {
      await setupUsers(tx);
      await using h = new CapnwebHarness(new Api(tx));

      const rows = await doRpc(h.stub, (api) =>
        api
          .users()
          .where(({ users }) => users.id[">"]("0"))
          .select(({ users }) => ({ name: users.name }))
          .execute(api.conn),
      );

      expect(rows.map((r) => r.name).sort()).toEqual(["alice", "bob", "carol"]);
    });
  });

  test("insert + returning over the wire", async () => {
    await withinTransaction(async (tx) => {
      await setupUsers(tx);
      await using h = new CapnwebHarness(new Api(tx));

      const inserted = await doRpc(h.stub, (api) =>
        api
          .insertUsers({ name: "dave" })
          .returning(({ users }) => ({ id: users.id, name: users.name }))
          .execute(api.conn),
      );

      expect(inserted).toEqual([{ id: "4", name: "dave" }]);
    });
  });

  test("update + where + returning over the wire", async () => {
    await withinTransaction(async (tx) => {
      await setupUsers(tx);
      await using h = new CapnwebHarness(new Api(tx));

      const updated = await doRpc(h.stub, (api) =>
        api
          .updateUsers()
          .set(() => ({ name: "ALICE!" }))
          .where(({ users }) => users.id["="]("1"))
          .returning(({ users }) => ({ id: users.id, name: users.name }))
          .execute(api.conn),
      );

      expect(updated).toEqual([{ id: "1", name: "ALICE!" }]);
    });
  });

  test("delete + where + returning over the wire", async () => {
    await withinTransaction(async (tx) => {
      await setupUsers(tx);
      await using h = new CapnwebHarness(new Api(tx));

      const deleted = await doRpc(h.stub, (api) =>
        api
          .deleteUsers()
          .where(({ users }) => users.id[">="]("2"))
          .returning(({ users }) => ({ name: users.name }))
          .execute(api.conn),
      );

      expect(deleted.map((r: { name: string }) => r.name).sort()).toEqual(["bob", "carol"]);
    });
  });

  test("@expose gating is recursive: a non-exposed member on a nested capability is unreachable", async () => {
    await withinTransaction(async (tx) => {
      await using h = new CapnwebHarness(new Api(tx));

      // The @expose'd method on the nested capability works over the wire.
      expect(await doRpc(h.stub, (api) => api.profile().displayName())).toBe("public");

      // NOTE: this call TYPECHECKS — doRpc types the closure against the full
      // API (`Profile`), so the compiler sees internalToken() and @expose
      // gating is invisible to it. The guard is purely runtime: internalToken
      // isn't @expose'd, so the shim proxy never surfaces it, the closure finds
      // no such member, and the call is rejected server-side — the real method
      // is never reached.
      await expect(
        doRpc(h.stub, (api) => api.profile().internalToken()),
      ).rejects.toThrow(/not a function/);
    });
  });

  describe("@expose gating across select shapes", () => {
    const setupSecrets = async (tx: Connection) => {
      await tx.execute(sql`
        CREATE TABLE secrets (
          id           int8 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          public_name  text NOT NULL,
          password     text NOT NULL
        )
      `);
      await tx.execute(
        sql`INSERT INTO secrets (public_name, password) VALUES ('alice', 'hunter2')`,
      );
    };

    class Secrets extends db.Table("secrets") {
      @expose() id = (Int8<1>).column({ nonNull: true, generated: true });
      @expose() public_name = (Text<1>).column({ nonNull: true });
      // Intentionally NOT @expose'd:
      password = (Text<1>).column({ nonNull: true });
    }
    class SecretsApi {
      @expose() conn: Connection;
      constructor(conn: Connection) {
        this.conn = conn;
      }
      @expose() all() {
        return Secrets.from();
      }
      // Deliberately returns class instances; used to verify they cross the
      // wire as opaque capabilities, not data.
      @expose() async hydrateAll() {
        return this.conn.hydrate(Secrets.from());
      }
    }

    test("bare .from().execute() — deserializeRows gate fires", async () => {
      await withinTransaction(async (tx) => {
        await setupSecrets(tx);
        await using h = new CapnwebHarness(new SecretsApi(tx));

        const rows = await doRpc(h.stub, (api) => api.all().execute(api.conn));

        expect(rows).toEqual([{ id: "1", public_name: "alice" }]);
        expect(rows[0]).not.toHaveProperty("password");
      });
    });

    test("explicit `({pass: s.password})` — non-@expose'd access yields undefined and fails RowType validation", async () => {
      await withinTransaction(async (tx) => {
        await setupSecrets(tx);
        await using h = new CapnwebHarness(new SecretsApi(tx));

        // `secrets.password` replays to undefined (the field isn't @expose'd
        // so the shim proxy hides it), so the select callback returns
        // `{pass: undefined}` — which fails `fn.returns(isRowType)`.
        await expect(
          doRpc(h.stub, (api) =>
            api
              .all()
              // password typechecks (it's a column field) but isn't @expose'd,
              // so the shim proxy hides it at replay time.
              .select(({ secrets }) => ({ pass: secrets.password }))
              .execute(api.conn),
          ),
        ).rejects.toThrow();
      });
    });

    test("hydrated rows cross the wire as opaque capabilities, not data", async () => {
      await withinTransaction(async (tx) => {
        await setupSecrets(tx);
        await using h = new CapnwebHarness(new SecretsApi(tx));

        // Unlike exoeval (which rejects class instances at serialization),
        // capnweb+shim passes them by reference: the client gets stubs whose
        // surface is still @expose-gated, so nothing non-exposed leaks.
        const rows = await h.stub.hydrateAll();
        expect(rows).toHaveLength(1);
        expect(rows[0]).toBeInstanceOf(RpcStub);
        expect(await rows[0]!.password).toBeUndefined();

        // And the stub is live, not inert: its @expose'd columns are hydrated
        // Any-wrappers, so the client can stub the row into a follow-up query.
        // Server-side, the captured stub round-trips through getLocalTarget()
        // back to the raw Any instances, which compose like any expression.
        const row0 = rows[0]!;
        const again = await doRpc(h.stub, (api) =>
          api
            .all()
            .select(() => ({ idAgain: row0.id, nameAgain: row0.public_name }))
            .limit(1)
            .execute(api.conn),
        );
        expect(again).toEqual([{ idAgain: "1", nameAgain: "alice" }]);

        for (const row of rows) {
          row[Symbol.dispose]();
        }
      });
    });
  });
});
