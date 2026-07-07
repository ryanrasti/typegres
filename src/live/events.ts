import { Any, Jsonb } from "../types/postgres";
import type { QueryTransformer } from "../table";
import { sql, Ident, type Sql } from "../builder/sql";
import type { Database } from "../database";
import type { InsertBuilder } from "../builder/insert";
import type { DeleteBuilder } from "../builder/delete";
import type { UpdateBuilder} from "../builder/update";
import { compileSetClauses } from "../builder/update";
import { compileSelectList, type RowType } from "../builder/query";
import { EVENTS_TABLE_NAME, eventsTableSqlStatements } from "./events-ddl";

// Shadow table that captures every mutation against a "live"-enabled table.
// `makeTransformer` returns the per-op hook other tables opt in to:
//   class Foos extends db.Table("foos", { transformer: TypegresLiveEvents.makeTransformer() })
export class TypegresLiveEvents {
  static readonly tableName = EVENTS_TABLE_NAME;

  static createTableSql(database: Database): Sql {
    return sql.join(eventsTableSqlStatements(database), sql`; `);
  }
  static createTableSqlStatements(database: Database): Sql[] {
    return eventsTableSqlStatements(database);
  }

  static makeTransformer(): QueryTransformer {
    return {
      insert: (s: InsertBuilder<any, any>) => wrapInsertOrDelete(s, "after"),
      delete: (s: DeleteBuilder<any, any>) => wrapInsertOrDelete(s, "before"),
      update: (s: UpdateBuilder<any, any>) => wrapUpdate(s),
    };
  }
}

// `jsonb_build_object('col', <valueExpr>, ...)` over every Any-typed field
// of the row instance, wrapped in a Jsonb so it slots into a RETURNING
// list. `valueExpr` is `${col}::text` for the post-image (default), or a
// caller-supplied expression for the pre-image (e.g. `"before".col::text`).
const buildLiveJsonb = (
  tableInstance: { [c: string]: Any<any> },
  valueExprFor: (col: string, ref: Any<any>) => Sql = (_c, ref) => sql`${ref.toSql()}::text`,
): Sql => {
  const args = Object.entries(tableInstance)
    .filter(([, v]) => v instanceof Any)
    .flatMap(([c, v]) => [sql`${sql.param(c)}::text`, valueExprFor(c, v)]);
  return sql`jsonb_build_object(${sql.join(args)})`;
};

// returningMerge callback that adds `__typegres_live_<side>` projecting
// every column at its post-image (default for INSERT/DELETE, and UPDATE's
// after). The matching pre-image variant for UPDATE is built inline below.
const liveAfterReturning =
  (tableName: string, side: "before" | "after") =>
  (ns: object): RowType => {
    const tableInstance = (ns as { [k: string]: object })[tableName] as { [c: string]: Any<any> };
    const key = side === "before" ? T_LIVE_BEFORE : T_LIVE_AFTER;
    return { [key]: Jsonb.from(buildLiveJsonb(tableInstance)) };
  };

// Outer SELECT projection: user-RETURNING aliases by name from
// __typegres_cte, omitting our internal __typegres_live_* columns. When
// the user didn't ask for RETURNING, `SELECT 1 FROM __typegres_cte` is
// enough — Database.execute discards rows since rowType() is undefined.
const userReturningProjection = (returning: RowType, ...internalKeys: readonly string[]): Sql => {
  const userKeys = Object.keys(returning).filter((k) => !internalKeys.includes(k));
  return userKeys.length > 0 ? sql.join(userKeys.map((k) => new Ident(k))) : sql`1`;
};

// All internal CTE names + RETURNING aliases use the __typegres_ prefix so
// nothing collides with a user table/column. `__typegres_cte` carries the
// per-row image (and any user RETURNING idents) into the events INSERT.
const T_CTE = "__typegres_cte";
const T_EVENTS = "__typegres_events";
const T_BEFORE = "__typegres_before";
const T_LIVE_BEFORE = "__typegres_live_before";
const T_LIVE_AFTER = "__typegres_live_after";

// `INSERT INTO _typegres_live_events (xid, "table", before, after) SELECT ... FROM __typegres_cte`.
// Used by both the insert/delete and update wraps.
const eventsInsertCte = (tableName: string, before: Sql, after: Sql, database: Database): Sql =>
  sql`INSERT INTO ${database.scopedIdent(TypegresLiveEvents.tableName)} (${database.scopedIdent("xid")}, ${database.scopedIdent("table")}, ${database.scopedIdent("before")}, ${database.scopedIdent("after")}) SELECT pg_current_xact_id(), ${sql.param(tableName)}::text, ${before}, ${after} FROM ${new Ident(T_CTE)}`;

// Wrap an INSERT or DELETE in the events-emitting CTE chain. The two ops
// are mirror images — INSERT captures the post-image as `after`, DELETE
// captures the pre-image as `before`; the unused side is NULL.
//
//   WITH __typegres_cte AS (<INSERT|DELETE> ... RETURNING <user>, jsonb_build_object(...) AS __typegres_live_<side>),
//        __typegres_events AS (INSERT INTO _typegres_live_events (xid, "table", before, after)
//                              SELECT pg_current_xact_id(), '<table>'::text, <before>, <after> FROM __typegres_cte)
//   SELECT <user-returning idents | 1> FROM __typegres_cte
const wrapInsertOrDelete = (
  builder: InsertBuilder<any, any, any> | DeleteBuilder<any, any, any>,
  side: "before" | "after",
): Sql => {
  const tableName = builder.tableName;
  const database = builder.database;
  const liveKey = side === "before" ? T_LIVE_BEFORE : T_LIVE_AFTER;

  // returningMerge() has the same shape on both InsertBuilder and
  // DeleteBuilder; we cast to one of them to pick a single overload
  // rather than writing a generic structural type.
  const innerFinalized = (builder as InsertBuilder<any, any, any>)
    .returningMerge(liveAfterReturning(tableName, side))
    .finalize();

  const beforeRef = side === "before" ? new Ident(liveKey) : sql`NULL::jsonb`;
  const afterRef = side === "after" ? new Ident(liveKey) : sql`NULL::jsonb`;
  const events = eventsInsertCte(tableName, beforeRef, afterRef, database);
  const projection = userReturningProjection(innerFinalized.opts.returning ?? {}, liveKey);
  return sql`WITH ${new Ident(T_CTE)} AS (${innerFinalized}), ${new Ident(T_EVENTS)} AS (${events}) SELECT ${projection} FROM ${new Ident(T_CTE)}`;
};

// Wrap an UPDATE with ctid-paired before/after capture:
//
//   WITH
//     __typegres_before AS (SELECT *, ctid FROM <foos> AS <foos> WHERE <user-where> FOR UPDATE),
//     __typegres_cte AS (
//       UPDATE <foos> AS <foos> SET <user-set>
//       FROM __typegres_before
//       WHERE <foos>.ctid = __typegres_before.ctid
//       RETURNING <user>,
//         jsonb_build_object('col', __typegres_before.col::text, ...) AS __typegres_live_before,
//         jsonb_build_object('col',  <foos>.col::text, ...) AS __typegres_live_after
//     ),
//     __typegres_events AS (INSERT INTO _typegres_live_events ... SELECT ... FROM __typegres_cte)
//   SELECT <user-returning idents | 1> FROM __typegres_cte
//
// __typegres_before locks the matching rows by ctid; the UPDATE then runs
// against just those rows. RETURNING in an UPDATE…FROM can reference both
// the post-update target (`<foos>`) and the FROM-clause CTE — that's how
// we capture both images in one statement.
const wrapUpdate = (builder: UpdateBuilder<any, any, any>): Sql => {
  const tableName = builder.tableName;
  const database = builder.database;

  // Add both __typegres_live_before and __typegres_live_after to RETURNING.
  // After uses the post-update namespace refs (same as INSERT/DELETE); the
  // before side references __typegres_before.col, which only becomes valid
  // once we wrap with the WITH chain below.
  const withLive = builder.returningMerge((ns): RowType => {
    const tableInstance = (ns as { [k: string]: object })[tableName] as { [c: string]: Any<any> };
    return {
      [T_LIVE_BEFORE]: Jsonb.from(
        buildLiveJsonb(tableInstance, (c) => sql`${new Ident(T_BEFORE)}.${database.scopedIdent(c)}::text`),
      ),
      [T_LIVE_AFTER]: Jsonb.from(buildLiveJsonb(tableInstance)),
    };
  });

  const innerFinalized = withLive.finalize();
  const { alias, where, setRow, returning, instance } = innerFinalized.opts;

  // FinalizedUpdate.bind() can't be reused: the live wrap needs
  // `FROM __typegres_before WHERE <foos>.ctid = __typegres_before.ctid`
  // instead of the user's WHERE inline.
  // `.where(true)` on a live-tracked update leaves `where` undefined
  // (matchAll semantics). Live-events still needs a WHERE for the
  // before-CTE `FOR UPDATE` snapshot, so emit `WHERE TRUE` explicitly
  // — always PG here since live is PG-only.
  const whereClause = where ? where.toSql() : sql`TRUE`;
  const beforeCte = sql`SELECT *, ctid FROM ${database.scopedIdent(tableName)} AS ${alias} WHERE ${whereClause} FOR UPDATE`;
  const ctidJoin = sql`${sql.column(alias, database.scopedIdent("ctid"))} = ${new Ident(T_BEFORE)}.${database.scopedIdent("ctid")}`;
  const updateCte = sql`UPDATE ${database.scopedIdent(tableName)} AS ${alias} SET ${sql.join(compileSetClauses(instance, setRow))} FROM ${new Ident(T_BEFORE)} WHERE ${ctidJoin} RETURNING ${compileSelectList(returning)}`;

  const events = eventsInsertCte(tableName, new Ident(T_LIVE_BEFORE), new Ident(T_LIVE_AFTER), database);
  const projection = userReturningProjection(returning ?? {}, T_LIVE_BEFORE, T_LIVE_AFTER);

  return sql.withScope(
    [alias],
    sql`WITH ${new Ident(T_BEFORE)} AS (${beforeCte}), ${new Ident(T_CTE)} AS (${updateCte}), ${new Ident(T_EVENTS)} AS (${events}) SELECT ${projection} FROM ${new Ident(T_CTE)}`,
  );
};
