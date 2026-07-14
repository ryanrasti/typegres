import { describe, expect, it } from "vitest";
import { RpcStub, RpcTarget } from "capnweb";
import z from "zod";
import { expose } from "../exoeval/tool";
import { doRpc, fromRpc, toRpc } from "./shim";
import { CapnwebHarness as Harness } from "./harness";

// --- test fixtures: a miniature @expose query-builder, no DB required ---

class Expr {
  // Not @expose'd: invisible over RPC, but the server-side builder reads it freely.
  constructor(readonly repr: string) {}

  @expose(z.union([z.number(), z.string()]))
  eq(other: number | string) {
    return new Expr(`(${this.repr} = ${JSON.stringify(other)})`);
  }

  @expose()
  upper() {
    return new Expr(`upper(${this.repr})`);
  }

  notExposed() {
    return "should not be callable over RPC";
  }
}

class Row {
  @expose()
  id = new Expr("id");

  @expose()
  name = new Expr("name");

  secret = "hidden";
}

class Query {
  constructor(readonly wheres: Expr[] = []) {}

  // eslint-disable-next-line no-restricted-syntax -- test fixture; callback arg has no zod shape
  @expose.unchecked()
  where(cb: (row: Row) => Expr): Query {
    const result = cb(new Row());
    if (result instanceof Promise) {
      // Happy-path replays are synchronous; only error paths come back as (rejecting)
      // promises. Pass those through so the real error propagates to the caller.
      return result as unknown as Query;
    }
    if (!(result instanceof Expr)) {
      throw new Error(`expected the callback to return a raw Expr, got: ${String(result)}`);
    }
    return new Query([...this.wheres, result]);
  }

  @expose()
  sql() {
    return this.wheres.map((w) => w.repr).join(" AND ");
  }
}

class Api {
  @expose()
  query() {
    return new Query();
  }

  @expose(z.unknown())
  isQuery(q: unknown) {
    return q instanceof Query;
  }

  @expose(z.object({ query: z.unknown(), exprs: z.array(z.instanceof(Expr)) }))
  describe(shape: { query: unknown; exprs: Expr[] }) {
    return {
      isQuery: shape.query instanceof Query,
      reprs: shape.exprs.map((e) => e.repr),
    };
  }

  notExposed() {
    return "nope";
  }
}

// --- local (no-wire) behavior of the shim itself ---

describe("toRpc/fromRpc wrapping", () => {
  it("exposes only @expose members", () => {
    const wrapped = toRpc(new Expr("id")) as any;
    expect(wrapped).toBeInstanceOf(RpcTarget);
    expect(typeof wrapped.eq).toBe("function");
    expect(typeof wrapped.upper).toBe("function");
    expect(wrapped.notExposed).toBeUndefined();
    expect(wrapped.repr).toBeUndefined();
  });

  it("presents @expose fields as attributes and hides the rest", () => {
    const wrapped = toRpc(new Row()) as any;
    expect(wrapped.id).toBeInstanceOf(RpcTarget);
    expect(wrapped.secret).toBeUndefined();
    // capnweb requires exposed members to look like prototype properties.
    expect(Object.hasOwn(wrapped, "id")).toBe(false);
  });

  it("wraps recursively through method returns, arrays, objects, and promises", async () => {
    const wrapped = toRpc(new Row()) as any;
    const eq = wrapped.id.eq(5);
    expect(eq).toBeInstanceOf(RpcTarget);
    expect(fromRpc(eq)).toBeInstanceOf(Expr);

    const list = toRpc([new Expr("a"), { b: new Expr("b") }]) as any[];
    expect(fromRpc(list[0])).toBeInstanceOf(Expr);
    expect(fromRpc((list[1] as any).b)).toBeInstanceOf(Expr);

    const viaPromise = await (toRpc(Promise.resolve(new Expr("p"))) as Promise<unknown>);
    expect(fromRpc(viaPromise)).toBeInstanceOf(Expr);
  });

  it("validates @expose schemas on wrapped calls", () => {
    const wrapped = toRpc(new Expr("id")) as any;
    expect(() => wrapped.eq({ not: "a number" })).toThrow(TypeError);
  });

  it("passes capnweb capabilities through untouched — not adapted as functions", () => {
    // capnweb stubs are callable (typeof === "function") AND instanceof
    // RpcTarget/RpcStub, so the capability check must beat the function
    // branch in both directions — else a stub gets wrapped as a closure.
    class Cap extends RpcTarget {}
    const cap = new Cap();
    using stub = new RpcStub(cap);
    // outgoing: a stub passes through by reference, NOT wrapped as a closure.
    expect(toRpc(stub)).toBe(stub);
    // incoming: a stub is treated as a capability (here local, so recovered
    // to its target) — never adapted as an incoming function.
    expect(fromRpc(stub)).toBe(cap);
  });

  it("is stable and invertible", () => {
    const expr = new Expr("id");
    const wrapped = toRpc(expr);
    expect(toRpc(expr)).toBe(wrapped);
    expect(fromRpc(wrapped)).toBe(expr);
    expect(toRpc(wrapped)).toBe(wrapped);
  });
});

// --- end-to-end over capnweb RPC ---

describe("@expose over capnweb RPC", () => {
  it("only @expose members are reachable", async () => {
    await using h = new Harness(new Api());

    expect(await h.stub.isQuery(null)).toBe(false);
    // `using`: a call returns a client import even when it rejects; dispose it
    // so the harness leak guard sees a clean session at teardown.
    using rejected = h.stub.notExposed() as unknown as Promise<unknown> & Disposable;
    await expect(rejected).rejects.toThrow(TypeError);
    expect(await doRpc(h.stub, (api) => (api as { notExposed?: unknown }).notExposed)).toBeUndefined();
  });

  it("builds a query through a replayed closure, synchronously server-side", async () => {
    await using h = new Harness(new Api());

    const sql = await doRpc(h.stub, (api) =>
      api
        .query()
        .where((row) => row.id.eq(5))
        .where((row) => row.name.upper().eq("ALICE"))
        .sql(),
    );

    expect(sql).toBe('(id = 5) AND (upper(name) = "ALICE")');
  });

  it("rejects closure calls that fail @expose validation", async () => {
    await using h = new Harness(new Api());

    await expect(
      doRpc(h.stub, (api) =>
        api
          .query()
          .where((row) => row.id.eq(null as unknown as number))
          .sql(),
      ),
    ).rejects.toThrow(/Invalid value/);
  });

  it("rejects an async closure — replay must be synchronous", async () => {
    await using h = new Harness(new Api());
    // typegres builder callbacks are validated with fn.returns(...), which
    // rejects Promises, so the whole replay must run synchronously. capnweb
    // enforces this at the closure boundary: an async map() callback can't be
    // record-replayed and is rejected outright.
    // map() detects the async callback and throws synchronously, so wrap in a
    // thunk to turn that into a rejection for `.rejects`.
    await expect(async () => doRpc(h.stub, async (api) => api.query().sql())).rejects.toThrow(
      /cannot be async/,
    );
  });

  it("unwraps round-tripped capabilities back to raw objects (identity preservation)", async () => {
    await using h = new Harness(new Api());

    using q = await h.stub.query();
    expect(await h.stub.isQuery(q)).toBe(true);
  });

  it("unwraps capabilities nested in containers", async () => {
    await using h = new Harness(new Api());

    using q = await h.stub.query();
    using a = await doRpc(h.stub, (api) => api.query().where((row) => row.id.eq(1)));
    // Grab raw exprs by building server-side, then hand back a mixed structure.
    const described = await h.stub.describe({ query: q, exprs: [] });
    expect(described).toStrictEqual({ isQuery: true, reprs: [] });
    void a;
  });
});
