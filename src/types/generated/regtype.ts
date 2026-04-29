// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Regtype<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Regtype;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Regtype<0 | 1>;
    __nonNullable: Regtype<1>;
    __aggregate: Regtype<number>;
    __any: Regtype<any>;
  };
  static __typname = runtime.sql`regtype`;
  static __typnameText = "regtype";
  declare deserialize: (raw: string) => string;
  @tool.unchecked()
  regtypesend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("regtypesend", [this, ...__rest], __rt) as any; }
}
