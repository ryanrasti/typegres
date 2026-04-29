// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class PgBrinBloomSummary<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof PgBrinBloomSummary;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: PgBrinBloomSummary<0 | 1>;
    __nonNullable: PgBrinBloomSummary<1>;
    __aggregate: PgBrinBloomSummary<number>;
    __any: PgBrinBloomSummary<any>;
  };
  static __typname = runtime.sql`pg_brin_bloom_summary`;
  static __typnameText = "pg_brin_bloom_summary";
  declare deserialize: (raw: string) => string;
}
