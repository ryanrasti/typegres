// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class PgNdistinct<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof PgNdistinct;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: PgNdistinct<0 | 1>;
    __nonNullable: PgNdistinct<1>;
    __aggregate: PgNdistinct<number>;
    __any: PgNdistinct<any>;
  };
  static __typname = runtime.sql`pg_ndistinct`;
  static __typnameText = "pg_ndistinct";
  declare deserialize: (raw: string) => string;
}
