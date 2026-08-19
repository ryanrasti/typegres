import { describe, expect, test } from "vitest";
import { oraclePoolAttributes } from "../server/config";

describe("Oracle Notes configuration", () => {
  test("parses a standard Oracle URL", () => {
    expect(oraclePoolAttributes("oracle://notes:p%40ss@oracle.internal:1521/FREEPDB1")).toMatchObject({
      user: "notes",
      password: "p@ss",
      connectString: "oracle.internal:1521/FREEPDB1",
    });
  });

  test("rejects malformed URLs", () => {
    expect(() => oraclePoolAttributes("notes/password@oracle")).toThrow(
      "ORACLE_URL must use oracle://user:password@host:port/service",
    );
  });
});
