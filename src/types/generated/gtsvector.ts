// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Gtsvector<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Gtsvector;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Gtsvector<0 | 1>;
    __nonNullable: Gtsvector<1>;
    __aggregate: Gtsvector<number>;
    __any: Gtsvector<any>;
  };
  static __typname = runtime.sql`gtsvector`;
  static __typnameText = "gtsvector";
  declare deserialize: (raw: string) => string;
}
