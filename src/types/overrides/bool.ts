import { Bool as Generated } from "../generated/bool";
import { Op, UnaryOp, sql } from "../../builder/sql";
import type { StrictNull, NullOf } from "../runtime";

export class Bool<N extends number> extends Generated<N> {
  // Codegen skips `declare deserialize` when an override exists (the override
  // is the source of truth). Declare it here so `TsTypeOf<Bool<1>>` narrows to
  // `boolean` instead of `unknown`.
  declare deserialize: (raw: string) => boolean;

  and<M extends Bool<any> | boolean>(other: M): Bool<StrictNull<N | NullOf<M>>> {
    const otherSql = other instanceof Bool ? other.toSql() : sql`CAST(${sql.param(other)} AS bool)`;
    return Bool.from(new Op(sql`AND`, this.toSql(), otherSql)) as any;
  }

  or<M extends Bool<any> | boolean>(other: M): Bool<StrictNull<N | NullOf<M>>> {
    const otherSql = other instanceof Bool ? other.toSql() : sql`CAST(${sql.param(other)} AS bool)`;
    return Bool.from(new Op(sql`OR`, this.toSql(), otherSql)) as any;
  }

  not(): Bool<N> {
    return Bool.from(new UnaryOp(sql`NOT`, this.toSql())) as any;
  }
}
