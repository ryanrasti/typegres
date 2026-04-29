// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class PgDependencies<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof PgDependencies;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: PgDependencies<0 | 1>;
    __nonNullable: PgDependencies<1>;
    __aggregate: PgDependencies<number>;
    __any: PgDependencies<any>;
  };
  static __typname = runtime.sql`pg_dependencies`;
  static __typnameText = "pg_dependencies";
  declare deserialize: (raw: string) => string;
}
