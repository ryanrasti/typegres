import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { sql } from "../builder/sql";
import { Database, type Connection } from "../database";
import { Varchar2 } from "../types/oracle";
import { OracleDriver } from "./oracle";
import { requireOraclePoolAttributes } from "./oracle-url";

const enabled = process.env["ORACLE_URL"] !== undefined;
const db = new Database();

class TransactionRows extends db.Table("oracle_transaction_rows") {
  id = Varchar2.column({ nonNull: true });
  value = Varchar2.column({ nonNull: true });
}

describe.skipIf(!enabled)("Oracle transactions", () => {
  let conn: Connection;

  beforeAll(async () => {
    conn = db.connect(await OracleDriver.create(requireOraclePoolAttributes()));
    try {
      await conn.execute(sql`DROP TABLE ${db.scopedIdent("oracle_transaction_rows")} PURGE`);
    } catch {
      // The table does not exist on the first run.
    }
    await conn.execute(sql`
      CREATE TABLE ${db.scopedIdent("oracle_transaction_rows")} (
        ${db.scopedIdent("id")} VARCHAR2(36) PRIMARY KEY,
        ${db.scopedIdent("value")} VARCHAR2(100) NOT NULL
      )
    `);
  });

  afterAll(async () => {
    await conn.execute(sql`DROP TABLE ${db.scopedIdent("oracle_transaction_rows")} PURGE`);
    await conn.close();
  });

  test("commits successful transactions", async () => {
    const result = await conn.transaction(async (tx) => {
      await TransactionRows.insert({ id: "commit", value: "visible" }).execute(tx);
      return "committed";
    });

    expect(result).toBe("committed");
    expect(await TransactionRows.from()
      .where(({ oracle_transaction_rows: row }) => row.id.eq("commit"))
      .select(({ oracle_transaction_rows: row }) => ({ value: row.value }))
      .execute()).toEqual([{ value: "visible" }]);
  });

  test("rolls back failed transactions", async () => {
    await expect(conn.transaction(async (tx) => {
      await TransactionRows.insert({ id: "rollback", value: "hidden" }).execute(tx);
      throw new Error("rollback requested");
    })).rejects.toThrow("rollback requested");

    expect(await TransactionRows.from()
      .where(({ oracle_transaction_rows: row }) => row.id.eq("rollback"))
      .select(({ oracle_transaction_rows: row }) => ({ id: row.id }))
      .execute()).toEqual([]);
  });

  test("pins one Oracle session and flattens nested transactions", async () => {
    await conn.transaction(async (tx) => {
      const first = await tx.execute(sql`
        SELECT SYS_CONTEXT('USERENV', 'SID') AS ${db.scopedIdent("sid")} FROM DUAL
      `);
      await tx.transaction(async (nested) => {
        const second = await nested.execute(sql`
          SELECT SYS_CONTEXT('USERENV', 'SID') AS ${db.scopedIdent("sid")} FROM DUAL
        `);
        expect(second.rows[0]?.["sid"]).toBe(first.rows[0]?.["sid"]);
        await TransactionRows.insert({ id: "nested", value: "committed" }).execute(nested);
      });
    });

    expect(await TransactionRows.from()
      .where(({ oracle_transaction_rows: row }) => row.id.eq("nested"))
      .select(({ oracle_transaction_rows: row }) => ({ value: row.value }))
      .execute()).toEqual([{ value: "committed" }]);
  });
});
