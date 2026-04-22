// Auto-generated — do not edit
import * as runtime from "../runtime";
import { Anynonarray } from "../generated/anynonarray";
import * as types from "../index";

export class TxidSnapshot<in out N extends number> extends Anynonarray<N> {
  declare [runtime.meta]: {
    __class: typeof TxidSnapshot;
    __raw: runtime.Sql;
    __nullability: N;
    __nullable: TxidSnapshot<0 | 1>;
    __nonNullable: TxidSnapshot<1>;
    __aggregate: TxidSnapshot<number>;
    __any: TxidSnapshot<any>;
  };
  static __typname = runtime.sql`txid_snapshot`;
  static __typnameText = "txid_snapshot";
  declare deserialize: (raw: string) => string;
  txidSnapshotSend(): types.Bytea<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Bytea]]); return runtime.PgFunc("txid_snapshot_send", [this, ...__rest], __rt) as any; }
  txidSnapshotXmax(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("txid_snapshot_xmax", [this, ...__rest], __rt) as any; }
  txidSnapshotXmin(): types.Int8<N> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return runtime.PgFunc("txid_snapshot_xmin", [this, ...__rest], __rt) as any; }
  txidSnapshotXip(): runtime.PgSrf<{ txid_snapshot_xip: types.Int8<N> }, "txid_snapshot_xip"> { const [__rt, ...__rest] = runtime.match([], [[[], types.Int8]]); return new runtime.PgSrf("txid_snapshot_xip", [this, ...__rest], [["txid_snapshot_xip", __rt]]) as any; }
}
