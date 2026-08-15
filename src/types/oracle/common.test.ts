import { describe, expect, expectTypeOf, test } from "vitest";
import { compile, sql, type Sql } from "../../builder/sql";
import { compileOnlyDb } from "../../test-helpers";
import { Bool, Date as OraDate, Number as OraNumber, Varchar2 } from "./index";

const db = compileOnlyDb("oracle");
const compileOracle = (value: { toSql(): Sql }) =>
  compile(value.toSql(), { database: db });

describe("common Oracle supplement", () => {
  test("numeric operators", () => {
    expect(compileOracle(OraNumber.from(5).plus(3).times(2).negate())).toEqual({
      text: "(- ((CAST(:1 AS NUMBER) + CAST(:2 AS NUMBER)) * CAST(:3 AS NUMBER)))",
      values: [5, 3, 2],
    });
  });

  test("date arithmetic", () => {
    expect(compileOracle(OraDate.from(sql`DATE '2025-01-15'`).plus(2))).toEqual({
      text: "(DATE '2025-01-15' + CAST(:1 AS NUMBER))",
      values: [2],
    });
    expect(compileOracle(
      OraDate.from(sql`DATE '2025-01-15'`).minus(OraDate.from(sql`DATE '2025-01-10'`)),
    )).toEqual({
      text: "(DATE '2025-01-15' - DATE '2025-01-10')",
      values: [],
    });
  });

  test("word operators derive camelCase aliases", () => {
    expect(compileOracle(Varchar2.from("hello").like("h%"))).toEqual({
      text: "(CAST(:1 AS VARCHAR2(4000)) LIKE CAST(:2 AS VARCHAR2(4000)))",
      values: ["hello", "h%"],
    });
    expect(compileOracle(Varchar2.from("hello").notLike("x%"))).toEqual({
      text: "(CAST(:1 AS VARCHAR2(4000)) NOT LIKE CAST(:2 AS VARCHAR2(4000)))",
      values: ["hello", "x%"],
    });
  });

  test("NVL2 dispatches its result arguments", () => {
    expect(compileOracle(OraNumber.from(1).nvl2("yes", "no"))).toEqual({
      text: '"NVL2"(CAST(:1 AS NUMBER), CAST(:2 AS VARCHAR2(4000)), CAST(:3 AS VARCHAR2(4000)))',
      values: [1, "yes", "no"],
    });
  });

  test("common scalar additions", () => {
    expect(compileOracle(OraNumber.from(5).widthBucket(0, 10, 5))).toEqual({
      text: '"WIDTH_BUCKET"(CAST(:1 AS NUMBER), CAST(:2 AS NUMBER), CAST(:3 AS NUMBER), CAST(:4 AS NUMBER))',
      values: [5, 0, 10, 5],
    });
    expect(compileOracle(Bool.from(false).lnnvl())).toEqual({
      text: '"LNNVL"(CAST(:1 AS BOOLEAN))',
      values: [false],
    });
  });

  test("GREATEST and LEAST accept variadic values", () => {
    expectTypeOf(OraNumber.from(5).greatest(7, 3)).toEqualTypeOf<OraNumber<1>>();
    expectTypeOf(OraNumber.from(5).greatest(OraNumber.from(sql`NULL`)))
      .toEqualTypeOf<OraNumber<0 | 1>>();
    expect(compileOracle(OraNumber.from(5).greatest(7, 3))).toEqual({
      text: '"GREATEST"(CAST(:1 AS NUMBER), CAST(:2 AS NUMBER), CAST(:3 AS NUMBER))',
      values: [5, 7, 3],
    });
    expect(compileOracle(Varchar2.from("b").least("a", "c"))).toEqual({
      text: '"LEAST"(CAST(:1 AS VARCHAR2(4000)), CAST(:2 AS VARCHAR2(4000)), CAST(:3 AS VARCHAR2(4000)))',
      values: ["b", "a", "c"],
    });
  });

  test("LISTAGG always returns nullable VARCHAR2", () => {
    const value = OraNumber.from(5).listagg(",");
    expectTypeOf(value).toEqualTypeOf<Varchar2<0 | 1>>();
    expect(compileOracle(value)).toEqual({
      text: '"LISTAGG"(CAST(:1 AS NUMBER), CAST(:2 AS VARCHAR2(4000)))',
      values: [5, ","],
    });
  });

  test("NULLIF is available on common types and always nullable", () => {
    const value = OraNumber.from(5).nullif(5);
    expectTypeOf(value).toEqualTypeOf<OraNumber<0 | 1>>();
    expect(compileOracle(value)).toEqual({
      text: '"NULLIF"(CAST(:1 AS NUMBER), CAST(:2 AS NUMBER))',
      values: [5, 5],
    });
  });

  test("format arguments are optional where Oracle permits omission", () => {
    expect(compileOracle(OraNumber.from(5).toChar())).toEqual({
      text: '"TO_CHAR"(CAST(:1 AS NUMBER))',
      values: [5],
    });
    expect(compileOracle(Varchar2.from("1.5").toBinaryDouble())).toEqual({
      text: '"TO_BINARY_DOUBLE"(CAST(:1 AS VARCHAR2(4000)))',
      values: ["1.5"],
    });
  });

  test("numeric statistical aggregates stay on NUMBER", () => {
    const value = OraNumber.from(1).corr(2);
    expectTypeOf(value).toEqualTypeOf<OraNumber<0 | 1>>();
    expect(compileOracle(value)).toEqual({
      text: '"CORR"(CAST(:1 AS NUMBER), CAST(:2 AS NUMBER))',
      values: [1, 2],
    });
    expectTypeOf<"corr" extends keyof Varchar2<1> ? true : false>().toEqualTypeOf<false>();
  });

  test("nullable functions and excluded partial forms have honest types", () => {
    expectTypeOf(Varchar2.from("abc").regexpSubstr("z")).toEqualTypeOf<Varchar2<0 | 1>>();
    expectTypeOf<"decode" extends keyof Varchar2<1> ? true : false>().toEqualTypeOf<false>();
  });
});
