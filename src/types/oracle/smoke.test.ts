import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { OracleDriver } from "../../drivers/oracle";
import { requireOraclePoolAttributes } from "../../drivers/oracle-url";
import { Database } from "../../database";
import { sql } from "../../builder/sql";
import type { Connection } from "../../database";
import { Number as OraNumber, Varchar2, Date as OraDate, Raw } from "./index";

const enabled = process.env["ORACLE_URL"] !== undefined;

describe.skipIf(!enabled)("oracle generated types", () => {
  let db: Database;
  let conn: Connection;

  beforeAll(async () => {
    db = new Database();
    conn = db.connect(await OracleDriver.create(requireOraclePoolAttributes()));
  });

  afterAll(async () => {
    await conn.close();
  });

  test("catalog scalar methods compose and execute", async () => {
    const n = OraNumber.from(-5).abs();
    const s = Varchar2.from("hello").upper();
    const result = await conn.execute(sql`
      SELECT ${n.toSql()} AS ${db.scopedIdent("n")},
             ${s.toSql()} AS ${db.scopedIdent("s")}
      FROM DUAL
    `);
    expect(result.rows).toEqual([{ n: "5", s: "HELLO" }]);
  });

  test("date methods use the catalog argument order", async () => {
    const d = OraDate.from(sql`DATE '2025-01-15'`).addMonths(1);
    const result = await conn.execute(sql`
      SELECT TO_CHAR(${d.toSql()}, 'YYYY-MM-DD') AS ${db.scopedIdent("d")} FROM DUAL
    `);
    expect(result.rows).toEqual([{ d: "2025-02-15" }]);
  });

  test("catalog relational operators produce Oracle predicates", async () => {
    const predicate = OraNumber.from(3).eq(3);
    const result = await conn.execute(sql`
      SELECT CASE WHEN ${predicate.toSql()} THEN 'yes' ELSE 'no' END AS ${db.scopedIdent("v")}
      FROM DUAL
    `);
    expect(result.rows).toEqual([{ v: "yes" }]);
  });

  test("common supplemented operators and functions execute", async () => {
    const arithmetic = OraNumber.from(5).plus(3).times(2).negate();
    const date = OraDate.from(sql`DATE '2025-01-15'`).plus(2);
    const like = Varchar2.from("hello").like("h%");
    const fallback = OraNumber.from(1).nvl2("yes", "no");
    const bucket = OraNumber.from(5).widthBucket(0, 10, 5);
    const query = sql`
      SELECT ${arithmetic.toSql()} AS ${db.scopedIdent("arithmetic")},
             TO_CHAR(${date.toSql()}, 'YYYY-MM-DD') AS ${db.scopedIdent("date")},
             CASE WHEN ${like.toSql()} THEN 'yes' ELSE 'no' END AS ${db.scopedIdent("like")},
             ${fallback.toSql()} AS ${db.scopedIdent("fallback")},
             ${bucket.toSql()} AS ${db.scopedIdent("bucket")}
      FROM DUAL
    `;
    const result = await conn.execute(query);
    expect(result.rows).toEqual([{
      arithmetic: "-16", date: "2025-01-17", like: "yes", fallback: "yes", bucket: "3",
    }]);
  });

  test("reviewed catalog corrections execute", async () => {
    const greatest = OraNumber.from(5).greatest(7, 3);
    const nullif = OraNumber.from(5).nullif(5);
    const formatted = OraNumber.from(5).toChar();
    const missingMatch = Varchar2.from("abc").regexpSubstr("z");
    const result = await conn.execute(sql`
      SELECT ${greatest.toSql()} AS ${db.scopedIdent("greatest")},
             ${nullif.toSql()} AS ${db.scopedIdent("nullif")},
             ${formatted.toSql()} AS ${db.scopedIdent("formatted")},
             ${missingMatch.toSql()} AS ${db.scopedIdent("missingMatch")}
      FROM DUAL
    `);
    expect(result.rows).toEqual([{
      greatest: "7", nullif: null, formatted: "5", missingMatch: null,
    }]);
  });

  test("RAW and BLOB use their driver-defined binary formats", async () => {
    const raw = Raw.from(new Uint8Array([0xde, 0xad]));
    const blob = raw.toBlob();
    const result = await conn.execute(sql`
      SELECT ${raw.toSql()} AS ${db.scopedIdent("raw")},
             ${blob.toSql()} AS ${db.scopedIdent("blob")}
      FROM DUAL
    `);
    expect(result.rows).toEqual([{ raw: "DEAD", blob: "DEAD" }]);
    expect(raw.deserialize(result.rows[0]!["raw"]!)).toEqual(new Uint8Array([0xde, 0xad]));
    expect(blob.deserialize(result.rows[0]!["blob"]!)).toEqual(new Uint8Array([0xde, 0xad]));
  });

  test("catalog aggregate metadata emits aggregate methods", async () => {
    const avg = OraNumber.from(5).avg();
    const list = OraNumber.from(5).listagg(",");
    const result = await conn.execute(sql`
      SELECT ${avg.toSql()} AS ${db.scopedIdent("avg")},
             ${list.toSql()} AS ${db.scopedIdent("list")}
      FROM DUAL
    `);
    expect(result.rows).toEqual([{ avg: "5", list: "5" }]);
  });
});
