// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Refcursor<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Refcursor;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Refcursor<0 | 1>;
    __nonNullable: Refcursor<1>;
    __aggregate: Refcursor<number>;
    __any: Refcursor<any>;
  };
  static __typname = runtime.sql`refcursor`;
  static __typnameText = "refcursor";
  declare deserialize: (raw: string) => string;
}
