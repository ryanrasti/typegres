// Auto-generated — do not edit
import * as runtime from "../runtime";
import { tool } from "../../exoeval/tool";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Regprocedure<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Regprocedure;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Regprocedure<0 | 1>;
    __nonNullable: Regprocedure<1>;
    __aggregate: Regprocedure<number>;
    __any: Regprocedure<any>;
  };
  static __typname = runtime.sql`regprocedure`;
  static __typnameText = "regprocedure";
  declare deserialize: (raw: string) => string;
  @tool.unchecked()
  regproceduresend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("regproceduresend", [this, ...__rest], __rt) as any; }
}
