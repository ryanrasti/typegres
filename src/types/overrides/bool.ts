import { Bool as Generated } from "../generated/bool";
import { sql } from "../../builder/sql";
import type { StrictNull, NullOf } from "../runtime";

export class Bool<N extends number> extends Generated<N> {
  and<M extends Bool<any> | boolean>(other: M): Bool<StrictNull<N | NullOf<M>>> {
    const otherSql = other instanceof Bool ? other.toSql() : sql`CAST(${sql.param(other)} AS bool)`;
    return Bool.from(sql`(${this.toSql()} AND ${otherSql})`) as any;
  }

  or<M extends Bool<any> | boolean>(other: M): Bool<StrictNull<N | NullOf<M>>> {
    const otherSql = other instanceof Bool ? other.toSql() : sql`CAST(${sql.param(other)} AS bool)`;
    return Bool.from(sql`(${this.toSql()} OR ${otherSql})`) as any;
  }

  not(): Bool<N> {
    return Bool.from(sql`(NOT ${this.toSql()})`) as any;
  }
}
