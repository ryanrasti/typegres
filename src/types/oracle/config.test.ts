import { describe, expect, test } from "vitest";
import { parseOraclePoolAttributes } from "../../drivers/oracle-url";

describe("Oracle connection configuration", () => {
  test("parses standard URLs and percent-encoded credentials", () => {
    expect(parseOraclePoolAttributes(
      "oracle://type%2Fgres:p%40ss%2Fword@localhost:1521/FREEPDB1",
    )).toEqual({
      user: "type/gres",
      password: "p@ss/word",
      connectString: "localhost:1521/FREEPDB1",
    });
  });

  test("rejects incomplete URLs without connecting", () => {
    expect(() => parseOraclePoolAttributes("oracle://user:pass@localhost:1521"))
      .toThrow("ORACLE_URL must be");
    expect(() => parseOraclePoolAttributes("typegres/typegres@localhost:1521/FREEPDB1"))
      .toThrow("ORACLE_URL must be");
  });
});
