import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class TxidSnapshot<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): TxidSnapshot<1>;
    static new(v: null): TxidSnapshot<0>;
    static new(v: Expression): TxidSnapshot<0 | 1>;
    static new(v: SerializeParam | null | Expression): TxidSnapshot<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "txid_snapshot" } 
    asAggregate(): Types.TxidSnapshot<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.TxidSnapshot<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.TxidSnapshot<1> | undefined {
          return undefined;
        }
       
    txidSnapshotXip(this: Types.TxidSnapshot<1>): Types.FromItem<{}>
    txidSnapshotXip(this: Types.TxidSnapshot<0 | 1>): Types.FromItem<{}>
    txidSnapshotXip(this: Types.TxidSnapshot<number>): Types.FromItem<{}>
    txidSnapshotXip(...args: unknown[]) {
        return sqlFunction("txid_snapshot_xip", [{args: [Types.TxidSnapshot<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    txidSnapshotXmax(this: Types.TxidSnapshot<1>): Types.Int8<1>
    txidSnapshotXmax(this: Types.TxidSnapshot<0 | 1>): Types.Int8<0 | 1>
    txidSnapshotXmax(this: Types.TxidSnapshot<number>): Types.Int8<0 | 1>
    txidSnapshotXmax(...args: unknown[]) {
        return sqlFunction("txid_snapshot_xmax", [{args: [Types.TxidSnapshot<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
