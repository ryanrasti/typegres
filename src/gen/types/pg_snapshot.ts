import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class PgSnapshot<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): PgSnapshot<1>;
    static new(v: null): PgSnapshot<0>;
    static new(v: Expression): PgSnapshot<0 | 1>;
    static new(v: SerializeParam | null | Expression): PgSnapshot<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "pg_snapshot" } 
    asAggregate(): Types.PgSnapshot<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.PgSnapshot<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.PgSnapshot<1> | undefined {
          return undefined;
        }
       
    pgSnapshotXip(this: Types.PgSnapshot<1>): Types.FromItem<{}>
    pgSnapshotXip(this: Types.PgSnapshot<0 | 1>): Types.FromItem<{}>
    pgSnapshotXip(this: Types.PgSnapshot<number>): Types.FromItem<{}>
    pgSnapshotXip(...args: unknown[]) {
        return sqlFunction("pg_snapshot_xip", [{args: [Types.PgSnapshot<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgSnapshotXmax(this: Types.PgSnapshot<1>): Types.Xid8<1>
    pgSnapshotXmax(this: Types.PgSnapshot<0 | 1>): Types.Xid8<0 | 1>
    pgSnapshotXmax(this: Types.PgSnapshot<number>): Types.Xid8<0 | 1>
    pgSnapshotXmax(...args: unknown[]) {
        return sqlFunction("pg_snapshot_xmax", [{args: [Types.PgSnapshot<0 | 1>], ret: Types.Xid8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
