import type { CompiledSql } from "../builder/sql";
import type { DialectName } from "../builder/sql";
import oracledb from "oracledb";
import type { Driver, ExecuteFn, QueryResult } from "./types";

// node-oracledb adapter (thin mode — no Instant Client). Optional peer,
// imported statically because this module only loads when the caller
// imports `typegres/drivers/oracle`.
//
// fetchAsString is the full set node-oracledb accepts (NUMBER/DATE/
// BUFFER/CLOB/NCLOB). VARCHAR2 is already a string; BLOB is fetched as
// Buffer. Typed coercion remains downstream.

const oracleBinds = (values: readonly unknown[]): oracledb.BindParameters =>
  values.map((v) => v instanceof Uint8Array ? Buffer.from(v) : v) as oracledb.BindParameters;

const normalizeRows = (rows: unknown[] | undefined): QueryResult["rows"] =>
  (rows ?? []).map((row) => Object.fromEntries(
    Object.entries(row as { [key: string]: unknown }).map(([key, value]) => [
      key,
      Buffer.isBuffer(value) ? value.toString("hex").toUpperCase() : value,
    ]),
  )) as QueryResult["rows"];

let fetchConfigured = false;
const configureFetch = (): void => {
  if (fetchConfigured) { return; }
  // Process-wide: node-oracledb has no per-pool fetch override. Fine
  // inside typegres (this is the only oracledb consumer); rude if a
  // host app also uses oracledb in the same process and wants Dates.
  oracledb.fetchAsString = [
    oracledb.NUMBER,
    oracledb.DATE,
    oracledb.BUFFER,
    oracledb.CLOB,
    oracledb.NCLOB,
  ];
  oracledb.fetchAsBuffer = [oracledb.BLOB];
  fetchConfigured = true;
};

export class OracleDriver implements Driver {
  readonly dialect: DialectName = "oracle";

  static async create(attrs: oracledb.PoolAttributes): Promise<OracleDriver> {
    configureFetch();
    return new OracleDriver(await oracledb.createPool(attrs));
  }

  private constructor(private pool: oracledb.Pool) {}

  async execute({ text, values }: CompiledSql): Promise<QueryResult> {
    const conn = await this.pool.getConnection();
    try {
      const result = await conn.execute(text, oracleBinds(values), {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
        autoCommit: true,
      });
      return { rows: normalizeRows(result.rows) };
    } finally {
      await conn.close();
    }
  }

  async runInSingleConnection<T>(cb: (execute: ExecuteFn) => Promise<T>): Promise<T> {
    const conn = await this.pool.getConnection();
    try {
      return await cb(async ({ text, values }) => {
        const result = await conn.execute(text, oracleBinds(values), {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
          autoCommit: false,
        });
        return { rows: normalizeRows(result.rows) };
      });
    } finally {
      await conn.close();
    }
  }

  async close(): Promise<void> {
    await this.pool.close(0);
  }
}
