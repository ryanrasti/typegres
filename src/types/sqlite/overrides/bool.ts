// SQLite has no native bool type — the storage class is INTEGER 0/1.
// `__typname = INTEGER` for CAST(...); `__typnameText = "bool"` is the
// key used for error messages. Codegen doesn't emit a bool.ts under
// `generated/` (bool isn't a SQLite storage class), so this override
// stands on its own — extends SqliteValue directly rather than a
// generated base.
import { SqliteValue } from "../base";
import { boolAnd, boolOr, boolNot } from "../../bool";
import { sql, type Sql } from "../../../builder/sql";
import { meta } from "../../sql-value";
import type { StrictNull, NullOf } from "../../runtime";

export class Bool<in out N extends number> extends SqliteValue<N> {
  declare [meta]: {
    __class: typeof Bool;
    __raw: Sql;
    __nullability: N;
    __nullable: Bool<0 | 1>;
    __nonNullable: Bool<1>;
    __aggregate: Bool<number>;
    __any: Bool<any>;
  };
  static override __typname = sql`INTEGER`;
  static override __typnameText = "bool";
  static override primitiveTs = "boolean";
  override deserialize(raw: string): boolean { return raw === "1"; }

  and<M extends Bool<any>>(other: M): Bool<StrictNull<N | NullOf<M>>> {
    return Bool.from(boolAnd(this.toSql(), other, Bool.dialect.name)) as any;
  }

  or<M extends Bool<any>>(other: M): Bool<StrictNull<N | NullOf<M>>> {
    return Bool.from(boolOr(this.toSql(), other, Bool.dialect.name)) as any;
  }

  not(): Bool<N> {
    return Bool.from(boolNot(this.toSql(), Bool.dialect.name)) as any;
  }
}