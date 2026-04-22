// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class Regclass<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof Regclass;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: Regclass<0 | 1>;
    __nonNullable: Regclass<1>;
    __aggregate: Regclass<number>;
    __any: Regclass<any>;
  };
  static __typname = runtime.sql`regclass`;
  static __typnameText = "regclass";
  declare deserialize: (raw: string) => string;
  pgPartitionRoot(): types.Regclass<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Regclass]]); return runtime.PgFunc("pg_partition_root", [this, ...__rest], __rt) as any; }
  regclasssend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("regclasssend", [this, ...__rest], __rt) as any; }
}
