// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Jsonpath<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Jsonpath;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Jsonpath<0 | 1>;
    __nonNullable: Jsonpath<1>;
    __aggregate: Jsonpath<number>;
    __any: Jsonpath<any>;
  };
  static __typname = runtime.sql`jsonpath`;
  static __typnameText = "jsonpath";
  declare deserialize: (raw: string) => string;
  jsonpathSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("jsonpath_send", [this, ...__rest], __rt) as any; }
}
