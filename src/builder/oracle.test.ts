import { describe, expect, test } from "vitest";
import { compileOnlyDb } from "../test-helpers";
import { Number as OraNumber, Varchar2 } from "../types/oracle";
import { compile, sql } from "./sql";

const db = compileOnlyDb("oracle");
const oracleCtx = { database: db };

class Users extends db.Table("users") {
  id = OraNumber.column({ nonNull: true, generated: true });
  name = Varchar2.column({ nonNull: true });
  nickname = Varchar2.column({ default: Varchar2.from("anonymous").toSql() });
}

class Defaults extends db.Table("defaults") {
  id = OraNumber.column({ nonNull: true, generated: true });
  nickname = Varchar2.column({ default: Varchar2.from("anonymous").toSql() });
}

describe("Oracle builder SQL", () => {
  test("table aliases omit AS", () => {
    const query = Users.from().select(({ users }) => ({ id: users.id }));
    expect(compile(query, oracleCtx)).toEqual({
      text: '(SELECT "users"."id" as "id"\nFROM "users" "users")',
      values: [],
    });
  });

  test("pagination uses OFFSET/FETCH in Oracle order", () => {
    const query = Users.from()
      .select(({ users }) => ({ id: users.id }))
      .orderBy(({ users }) => users.id)
      .limit(10)
      .offset(20);
    expect(compile(query, oracleCtx)).toEqual({
      text: '(SELECT "users"."id" as "id"\nFROM "users" "users"\nORDER BY "users"."id"\nOFFSET :1 ROWS\nFETCH NEXT :2 ROWS ONLY)',
      values: [20, 10],
    });
  });

  test("single-part pagination uses the appropriate Oracle clause", () => {
    const selected = Users.from().select(({ users }) => ({ id: users.id }));
    expect(compile(selected.limit(1), oracleCtx)).toEqual({
      text: '(SELECT "users"."id" as "id"\nFROM "users" "users"\nFETCH FIRST :1 ROWS ONLY)',
      values: [1],
    });
    expect(compile(selected.offset(2), oracleCtx)).toEqual({
      text: '(SELECT "users"."id" as "id"\nFROM "users" "users"\nOFFSET :1 ROWS)',
      values: [2],
    });
  });

  test("VALUES aliases omit AS", () => {
    const query = db.values({ n: OraNumber.from(1) }).select(({ values }) => values);
    expect(compile(query, oracleCtx)).toEqual({
      text: '(SELECT "values"."n" as "n"\nFROM (VALUES (CAST(:1 AS NUMBER))) "values"("n"))',
      values: [1],
    });
  });

  test("nested queries retain their parentheses", () => {
    const query = Users.from().select(({ users }) => ({ id: users.id }));
    expect(compile(sql`SELECT * FROM ${query} nested`, oracleCtx)).toEqual({
      text: 'SELECT * FROM (SELECT "users"."id" as "id"\nFROM "users" "users") nested',
      values: [],
    });
  });

  test("insert supports multi-row values and per-row DEFAULT", () => {
    const mutation = Users.insert(
      { name: "alice", nickname: "ally" },
      { name: "bob" },
    );
    expect(compile(mutation, oracleCtx)).toEqual({
      text: 'INSERT INTO "users" "users" ("name", "nickname") VALUES (CAST(:1 AS VARCHAR2(4000)), CAST(:2 AS VARCHAR2(4000))), (CAST(:3 AS VARCHAR2(4000)), DEFAULT)',
      values: ["alice", "ally", "bob"],
    });
  });

  test("all-default inserts name every declared column", () => {
    expect(compile(Defaults.insert({}), oracleCtx)).toEqual({
      text: 'INSERT INTO "defaults" "defaults" ("id", "nickname") VALUES (DEFAULT, DEFAULT)',
      values: [],
    });
  });

  test("update and delete aliases omit AS", () => {
    const update = Users.update()
      .where(({ users }) => users.id.eq(1))
      .set(() => ({ name: "alice" }));
    expect(compile(update, oracleCtx)).toEqual({
      text: 'UPDATE "users" "users" SET "name" = CAST(:1 AS VARCHAR2(4000)) WHERE ("users"."id" = :2)',
      values: ["alice", 1],
    });

    const deletion = Users.delete().where(({ users }) => users.id.eq(1));
    expect(compile(deletion, oracleCtx)).toEqual({
      text: 'DELETE FROM "users" "users" WHERE ("users"."id" = :1)',
      values: [1],
    });
  });

  test("RETURNING is rejected until Oracle OUT binds are supported", () => {
    expect(() => compile(
      Users.insert({ name: "alice" }).returning(({ users }) => ({ id: users.id })),
      oracleCtx,
    )).toThrow(".returning() is not yet supported on oracle mutations");
    expect(() => compile(
      Users.update().where(true).set(() => ({ name: "alice" })).returning(({ users }) => ({ id: users.id })),
      oracleCtx,
    )).toThrow(".returning() is not yet supported on oracle mutations");
    expect(() => compile(
      Users.delete().where(true).returning(({ users }) => ({ id: users.id })),
      oracleCtx,
    )).toThrow(".returning() is not yet supported on oracle mutations");
  });
});
