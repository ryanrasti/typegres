import { describe, test, expect, beforeAll, afterAll } from "vitest";
import oracledb from "oracledb";
import { requireOraclePoolAttributes } from "../../drivers/oracle-url";
import { introspect } from "./introspect";
import type { EmitFn } from "../emission/facts";

const enabled = process.env["ORACLE_URL"] !== undefined;

describe.skipIf(!enabled)("oracle catalog introspection", () => {
  let pool: oracledb.Pool;
  let conn: oracledb.Connection;
  let facts: EmitFn[];

  beforeAll(async () => {
    oracledb.fetchAsString = [oracledb.NUMBER];
    pool = await oracledb.createPool(requireOraclePoolAttributes());
    conn = await pool.getConnection();
    facts = await introspect(conn);
  }, 60_000);

  afterAll(async () => {
    await conn.close();
    await pool.close(0);
  });

  test("typed STANDARD scalar overloads are emitted", () => {
    const abs = facts.find((f) => f.sql === "ABS");
    expect(abs).toMatchObject({
      kind: "scalar",
      overloads: expect.arrayContaining([
        { args: [{ type: "number" }], returns: "number", nullability: "propagates" },
      ]),
    });
  });

  test("engine verification removes PL/SQL-only overloads", () => {
    const addMonths = facts.find((f) => f.sql === "ADD_MONTHS")!;
    expect(addMonths.overloads).toContainEqual({
      args: [{ type: "date" }, { type: "number" }],
      returns: "date",
      nullability: "propagates",
    });
    expect(addMonths.overloads).not.toContainEqual(expect.objectContaining({
      args: [{ type: "number" }, { type: "date" }],
    }));
  });

  test("V$SQLFN supplies aggregates and relational operators", () => {
    expect(facts.find((f) => f.sql === "AVG")).toMatchObject({
      kind: "aggregate",
      overloads: [{ args: [{ type: "number" }], returns: "number", nullability: "always" }],
    });
    expect(facts.find((f) => f.sql === "=")).toMatchObject({
      kind: "binop",
      overloads: [{ args: [{ type: "any" }, { type: "any" }], returns: "bool" }],
    });
  });

  test("only reviewed catalog functions cross the trust boundary", () => {
    const names = new Set(facts.map((f) => f.sql));
    expect(names).toContain("ABS");
    expect(names).not.toContain("SYS_CONTEXT");
    expect(names).not.toContain("SYS_PLSQL_CPU");
    expect(names).not.toContain("CALENDAR_ADD_DAYS");
    expect(names).not.toContain("STATS_T_TEST_INDEP");
  });
});
