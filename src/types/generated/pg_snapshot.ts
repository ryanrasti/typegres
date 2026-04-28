// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class PgSnapshot<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof PgSnapshot;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: PgSnapshot<0 | 1>;
    __nonNullable: PgSnapshot<1>;
    __aggregate: PgSnapshot<number>;
    __any: PgSnapshot<any>;
  };
  static __typname = runtime.sql`pg_snapshot`;
  static __typnameText = "pg_snapshot";
  declare deserialize: (raw: string) => string;
  pgSnapshotSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("pg_snapshot_send", [this, ...__rest], __rt) as any; }
  pgSnapshotXmax(): types.Xid8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Xid8]]); return runtime.PgFunc("pg_snapshot_xmax", [this, ...__rest], __rt) as any; }
  pgSnapshotXmin(): types.Xid8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Xid8]]); return runtime.PgFunc("pg_snapshot_xmin", [this, ...__rest], __rt) as any; }
  pgSnapshotXip(): runtime.PgSrf<{ pg_snapshot_xip: types.Xid8<N> }, "pg_snapshot_xip"> { const [__rt, ...__rest] = runtime.match([], [[[], types.Xid8]]); return new runtime.PgSrf("pg_snapshot_xip", [this, ...__rest], [["pg_snapshot_xip", __rt]]) as any; }
}
