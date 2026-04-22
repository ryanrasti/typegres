// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class PgBrinMinmaxMultiSummary<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof PgBrinMinmaxMultiSummary;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: PgBrinMinmaxMultiSummary<0 | 1>;
    __nonNullable: PgBrinMinmaxMultiSummary<1>;
    __aggregate: PgBrinMinmaxMultiSummary<number>;
    __any: PgBrinMinmaxMultiSummary<any>;
  };
  static __typname = runtime.sql`pg_brin_minmax_multi_summary`;
  static __typnameText = "pg_brin_minmax_multi_summary";
  declare deserialize: (raw: string) => string;
}
