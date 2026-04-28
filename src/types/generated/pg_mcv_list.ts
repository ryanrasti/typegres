// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class PgMcvList<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof PgMcvList;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: PgMcvList<0 | 1>;
    __nonNullable: PgMcvList<1>;
    __aggregate: PgMcvList<number>;
    __any: PgMcvList<any>;
  };
  static __typname = runtime.sql`pg_mcv_list`;
  static __typnameText = "pg_mcv_list";
  declare deserialize: (raw: string) => string;
}
