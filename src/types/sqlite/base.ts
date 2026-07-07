// SQLite-side root class. Sits directly below `SqlValue` (SQLite has
// no polymorphic pseudotype hierarchy the way PG does — Integer, Text,
// Real, Blob, Json, Bool all extend SqliteValue directly).
//
// Mirrors PG `Any`: carries dialect metadata + the three Bool-returning
// methods (isNull/isNotNull/in) that couldn't live on the shared
// SqlValue for variance reasons (see src/types/sql-value.ts docstring).
//
// `dialect.root` / `dialect.bool` use barrel-import getters so the
// class-level dialect object can be initialized at class-def time
// without resolving the cyclic references at import time. Property
// access happens at method-call time.
//
import { SqlValue, type Dialect } from "../sql-value";
import { meta } from "../sql-value";
import * as types from "./index";
import { sql, type Sql } from "../../builder/sql";
import { expose } from "../../exoeval/tool";
import { isPlainData } from "../../util";

export class SqliteValue<in out N extends number> extends SqlValue<N> {
  declare [meta]: {
    __class: typeof SqliteValue;
    __raw: Sql;
    __nullability: N;
    __aggregate: SqliteValue<number>;
  };
  static override dialect: Dialect = {
    name: "sqlite",
    get root() { return types.SqliteValue; },
    get bool() { return types.Bool; },
  };
  static override __typname = sql`any`;
  static override __typnameText = "any";

  isNull(): types.Bool<1> {
    return types.Bool.from(sql`(${this.toSql()} IS NULL)`) as types.Bool<1>;
  }

  isNotNull(): types.Bool<1> {
    return types.Bool.from(sql`(${this.toSql()} IS NOT NULL)`) as types.Bool<1>;
  }

  // Non-generic `.in()` — SQLite's shallow class hierarchy (SqlValue →
  // SqliteValue → concrete) triggers TS2589 with the PG-style
  // `<T extends SqliteValue<any>, Vs>(this: T, ...)` signature, because
  // each concrete class's `[meta].__any: Concrete<any>` self-reference
  // never bottoms out at that depth. PG dodges the recursion via a
  // deeper 7-level chain.
  //
  // Trade-off: users don't get "same-typed args required" narrowing at
  // compile time. Runtime enforcement via serialize() still applies.
  // eslint-disable-next-line no-restricted-syntax
  @expose.unchecked()
  in(...vals: [SqliteValue<any> | boolean | number | string, ...(SqliteValue<any> | boolean | number | string)[]]): types.Bool<any> {
    const wrapped = vals.map((v) => {
      if (v instanceof SqliteValue) {return v;}
      if (!isPlainData(v)) {
        const name = (Object.getPrototypeOf(v) as { constructor?: { name?: string } } | null)?.constructor?.name ?? "anonymous";
        throw new TypeError(
          `SqliteValue.in: cannot accept ${name} instance as a list value. ` +
          `Pass a typegres expression or a primitive matching ${(this[meta].__class as typeof SqliteValue).__typnameText}.`,
        );
      }
      return this[meta].__class.serialize(v);
    });
    const list = sql.join(wrapped.map((v) => v.toSql()));
    return types.Bool.from(sql`(${this.toSql()} IN (${list}))`) as types.Bool<any>;
  }
}
