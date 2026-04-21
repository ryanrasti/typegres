import { sql } from "../builder/sql";
import type { Sql } from "../builder/sql";
import type { InsertBuilder } from "../builder/insert";
import type { UpdateBuilder } from "../builder/update";
import type { DeleteBuilder } from "../builder/delete";
import { compileSelectList } from "../builder/query";
import { Any } from "../types";
import { meta } from "../types/runtime";
import { LiveQueryError } from "./types";

// A wrapped mutation compiles to a CTE chain:
//   1. the user's core mutation with RETURNING * (so we have before/after);
//   2. an INSERT into _live_events capturing xid + to_jsonb of the row(s);
//   3. a terminal SELECT projecting the user's RETURNING (or nothing).
//
// For UPDATE, an additional `old` CTE captures pre-mutation values via
// SELECT ... FOR UPDATE over the same WHERE. Old and new rows are paired
// by primary key inside the event-emit CTE.
//
// For v1:
//   - Capture all columns (to_jsonb(m.*)) — watched-column trimming is a
//     future enhancement.
//   - Require primaryKey on every live-enabled UPDATE / DELETE. INSERT is
//     fine without one (no pairing needed).

export type LiveWrapOptions = {
  // Primary key column(s) of the mutated table. Required for UPDATE/DELETE
  // pairing logic even though DELETE doesn't strictly need it (for event-row
  // correlation we still use it on UPDATE to join old/new).
  primaryKey?: readonly string[];
};

// --- INSERT ---

export const wrapInsertWithEvents = <Name extends string, T extends { [key: string]: any }, R extends { [key: string]: unknown }>(
  builder: InsertBuilder<Name, T, R>,
  _opts: LiveWrapOptions = {},
): Sql => {
  const parts = builder.liveIntrospect();
  if (parts.rows.length === 0) {
    throw new LiveQueryError("insert() requires at least one row");
  }

  const columns = parts.columnNames.map((k) => sql.ident(k));
  const rowSqls = parts.rows.map((row) => {
    const vals = parts.columnNames.map((k) => {
      const v = row[k];
      if (v === undefined) { return sql`DEFAULT`; }
      const col = parts.instance[k];
      if (!(col instanceof Any)) {
        throw new LiveQueryError(
          `live wrap: INSERT INTO "${parts.tableName}" — column '${k}' is not declared as an Any-typed column on the table class. ` +
          `Check that ${k}() is a column getter.`,
        );
      }
      return (col as Any<any>)[meta].__class.from(v).toSql();
    });
    return sql`(${sql.join(vals)})`;
  });

  const coreInsert = sql.withScope(
    [parts.alias],
    sql`INSERT INTO ${sql.ident(parts.tableName)} (${sql.join(columns)}) VALUES ${sql.join(rowSqls)} RETURNING *`,
  );

  const eventInsert = sql`
    INSERT INTO _live_events (xid, ${sql.ident("table")}, before, after)
    SELECT pg_current_xact_id(), ${sql.param(parts.tableName)}, NULL, to_jsonb(m.*)
    FROM m`;

  const terminal = parts.returning
    ? sql`SELECT ${compileSelectList(parts.returning as { [key: string]: unknown })} FROM m`
    : sql`SELECT 1 FROM m WHERE FALSE`;

  return sql`WITH m AS (${coreInsert}), _evt AS (${eventInsert} RETURNING 1) ${terminal}`;
};

// --- UPDATE ---

export const wrapUpdateWithEvents = <Name extends string, T extends { [key: string]: any }, R extends { [key: string]: unknown }>(
  builder: UpdateBuilder<Name, T, R>,
  opts: LiveWrapOptions = {},
): Sql => {
  const parts = builder.liveIntrospect();
  if (!parts.where) {
    throw new LiveQueryError("update() requires .where() for live wrapping");
  }
  if (!parts.set) {
    throw new LiveQueryError("update() requires .set()");
  }
  if (!opts.primaryKey || opts.primaryKey.length === 0) {
    throw new LiveQueryError(
      `live wrap: UPDATE on "${parts.tableName}" requires a primary key. Pass primaryKey: [...] in wrap options.`,
    );
  }

  const setClauses = Object.entries(parts.set).map(([k, v]) => {
    const col = parts.instance[k];
    if (!(col instanceof Any)) {
      throw new LiveQueryError(
        `live wrap: UPDATE on "${parts.tableName}" set {${k}: ...} — no column '${k}' on table class. ` +
        `Did you forget to declare it as a column getter?`,
      );
    }
    return sql`${sql.ident(k)} = ${(col as Any<any>)[meta].__class.from(v).toSql()}`;
  });

  // old: capture pre-mutation rows using the same WHERE. All CTEs in a single
  // WITH share one snapshot, so `old` reads pre-update values without needing
  // FOR UPDATE (and FOR UPDATE would in fact deadlock against the sibling
  // UPDATE that's updating the same rows in the same statement).
  const oldCte = sql.withScope(
    [parts.alias],
    sql`SELECT * FROM ${sql.ident(parts.tableName)} WHERE ${parts.where.toSql()}`,
  );

  // The UPDATE uses the same WHERE. Pairing old ↔ new happens inside _evt's SELECT.
  const coreUpdate = sql.withScope(
    [parts.alias],
    sql`UPDATE ${sql.ident(parts.tableName)} SET ${sql.join(setClauses)} WHERE ${parts.where.toSql()} RETURNING *`,
  );

  const pkJoinCondition = sql.join(
    opts.primaryKey.map((k) => sql`old.${sql.ident(k)} = m.${sql.ident(k)}`),
    sql` AND `,
  );

  const eventInsert = sql`
    INSERT INTO _live_events (xid, ${sql.ident("table")}, before, after)
    SELECT pg_current_xact_id(), ${sql.param(parts.tableName)}, to_jsonb(old.*), to_jsonb(m.*)
    FROM old JOIN m ON ${pkJoinCondition}`;

  const terminal = parts.returning
    ? sql`SELECT ${compileSelectList(parts.returning as { [key: string]: unknown })} FROM m`
    : sql`SELECT 1 FROM m WHERE FALSE`;

  return sql`WITH old AS (${oldCte}), m AS (${coreUpdate}), _evt AS (${eventInsert} RETURNING 1) ${terminal}`;
};

// --- DELETE ---

export const wrapDeleteWithEvents = <Name extends string, T extends { [key: string]: any }, R extends { [key: string]: unknown }>(
  builder: DeleteBuilder<Name, T, R>,
  opts: LiveWrapOptions = {},
): Sql => {
  const parts = builder.liveIntrospect();
  if (!parts.where) {
    throw new LiveQueryError("delete() requires .where() for live wrapping");
  }
  if (!opts.primaryKey || opts.primaryKey.length === 0) {
    throw new LiveQueryError(
      `live wrap: DELETE on "${parts.tableName}" requires a primary key. Pass primaryKey: [...] in wrap options.`,
    );
  }

  const coreDelete = sql.withScope(
    [parts.alias],
    sql`DELETE FROM ${sql.ident(parts.tableName)} WHERE ${parts.where.toSql()} RETURNING *`,
  );

  const eventInsert = sql`
    INSERT INTO _live_events (xid, ${sql.ident("table")}, before, after)
    SELECT pg_current_xact_id(), ${sql.param(parts.tableName)}, to_jsonb(m.*), NULL
    FROM m`;

  const terminal = parts.returning
    ? sql`SELECT ${compileSelectList(parts.returning as { [key: string]: unknown })} FROM m`
    : sql`SELECT 1 FROM m WHERE FALSE`;

  return sql`WITH m AS (${coreDelete}), _evt AS (${eventInsert} RETURNING 1) ${terminal}`;
};
