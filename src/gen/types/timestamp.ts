import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Timestamp<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Timestamp<1>;
    static new(v: null): Timestamp<0>;
    static new(v: Expression): Timestamp<0 | 1>;
    static new(v: SerializeParam | null | Expression): Timestamp<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "timestamp" } 
    asAggregate(): Types.Timestamp<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Timestamp<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Timestamp<1> | undefined {
          return undefined;
        }
       
    age(this: Types.Timestamp<1>): Types.Interval<1>
    age(this: Types.Timestamp<0 | 1>): Types.Interval<0 | 1>
    age(this: Types.Timestamp<number>): Types.Interval<0 | 1>
    age(this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Interval<1>
    age(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Interval<0 | 1>
    age(this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Interval<0 | 1>
    age(...args: unknown[]) {
        return sqlFunction("age", [{args: [Types.Timestamp<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    date(this: Types.Timestamp<1>): Types.Date<1>
    date(this: Types.Timestamp<0 | 1>): Types.Date<0 | 1>
    date(this: Types.Timestamp<number>): Types.Date<0 | 1>
    date(...args: unknown[]) {
        return sqlFunction("date", [{args: [Types.Timestamp<0 | 1>], ret: Types.Date<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    generateSeries(this: Types.Timestamp<1>, a1: Types.Timestamp<1>, a2: Types.Interval<1>): Types.FromItem<{}>
    generateSeries(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>, a2: Types.Interval<0 | 1>): Types.FromItem<{}>
    generateSeries(this: Types.Timestamp<number>, a1: Types.Timestamp<number>, a2: Types.Interval<number>): Types.FromItem<{}>
    generateSeries(...args: unknown[]) {
        return sqlFunction("generate_series", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>, Types.Interval<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    inRange(this: Types.Timestamp<1>, a1: Types.Timestamp<1>, a2: Types.Interval<1>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    inRange(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>, a2: Types.Interval<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(this: Types.Timestamp<number>, a1: Types.Timestamp<number>, a2: Types.Interval<number>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(...args: unknown[]) {
        return sqlFunction("in_range", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>, Types.Interval<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    isfinite(this: Types.Timestamp<1>): Types.Bool<1>
    isfinite(this: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    isfinite(this: Types.Timestamp<number>): Types.Bool<0 | 1>
    isfinite(...args: unknown[]) {
        return sqlFunction("isfinite", [{args: [Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    max(this: Types.Timestamp<number>): Types.Timestamp<0 | 1>
    max(...args: unknown[]) {
        return sqlFunction("max", [{args: [Types.Timestamp<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    overlaps(this: Types.Timestamp<1>, a1: Types.Interval<1>, a2: Types.Timestamp<1>, a3: Types.Interval<1>): Types.Bool<1>
    overlaps(this: Types.Timestamp<0 | 1>, a1: Types.Interval<0 | 1>, a2: Types.Timestamp<0 | 1>, a3: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    overlaps(this: Types.Timestamp<number>, a1: Types.Interval<number>, a2: Types.Timestamp<number>, a3: Types.Interval<number>): Types.Bool<0 | 1>
    overlaps(this: Types.Timestamp<1>, a1: Types.Interval<1>, a2: Types.Timestamp<1>, a3: Types.Timestamp<1>): Types.Bool<1>
    overlaps(this: Types.Timestamp<0 | 1>, a1: Types.Interval<0 | 1>, a2: Types.Timestamp<0 | 1>, a3: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    overlaps(this: Types.Timestamp<number>, a1: Types.Interval<number>, a2: Types.Timestamp<number>, a3: Types.Timestamp<number>): Types.Bool<0 | 1>
    overlaps(this: Types.Timestamp<1>, a1: Types.Timestamp<1>, a2: Types.Timestamp<1>, a3: Types.Interval<1>): Types.Bool<1>
    overlaps(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>, a2: Types.Timestamp<0 | 1>, a3: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    overlaps(this: Types.Timestamp<number>, a1: Types.Timestamp<number>, a2: Types.Timestamp<number>, a3: Types.Interval<number>): Types.Bool<0 | 1>
    overlaps(this: Types.Timestamp<1>, a1: Types.Timestamp<1>, a2: Types.Timestamp<1>, a3: Types.Timestamp<1>): Types.Bool<1>
    overlaps(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>, a2: Types.Timestamp<0 | 1>, a3: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    overlaps(this: Types.Timestamp<number>, a1: Types.Timestamp<number>, a2: Types.Timestamp<number>, a3: Types.Timestamp<number>): Types.Bool<0 | 1>
    overlaps(...args: unknown[]) {
        return sqlFunction("overlaps", [{args: [Types.Timestamp<0 | 1>, Types.Interval<0 | 1>, Types.Timestamp<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Interval<0 | 1>, Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    time(this: Types.Timestamp<1>): Types.Time<1>
    time(this: Types.Timestamp<0 | 1>): Types.Time<0 | 1>
    time(this: Types.Timestamp<number>): Types.Time<0 | 1>
    time(...args: unknown[]) {
        return sqlFunction("time", [{args: [Types.Timestamp<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    timestamp(this: Types.Timestamp<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Timestamp<1>
    timestamp(this: Types.Timestamp<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Timestamp<0 | 1>
    timestamp(this: Types.Timestamp<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Timestamp<0 | 1>
    timestamp(...args: unknown[]) {
        return sqlFunction("timestamp", [{args: [Types.Timestamp<0 | 1>, Types.Int4<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    timestampCmp(this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Int4<1>
    timestampCmp(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Int4<0 | 1>
    timestampCmp(this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Int4<0 | 1>
    timestampCmp(...args: unknown[]) {
        return sqlFunction("timestamp_cmp", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampCmpDate(this: Types.Timestamp<1>, a1: Types.Date<1>): Types.Int4<1>
    timestampCmpDate(this: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Int4<0 | 1>
    timestampCmpDate(this: Types.Timestamp<number>, a1: Types.Date<number>): Types.Int4<0 | 1>
    timestampCmpDate(...args: unknown[]) {
        return sqlFunction("timestamp_cmp_date", [{args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampCmpTimestamptz(this: Types.Timestamp<1>, a1: Types.Timestamptz<1>): Types.Int4<1>
    timestampCmpTimestamptz(this: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Int4<0 | 1>
    timestampCmpTimestamptz(this: Types.Timestamp<number>, a1: Types.Timestamptz<number>): Types.Int4<0 | 1>
    timestampCmpTimestamptz(...args: unknown[]) {
        return sqlFunction("timestamp_cmp_timestamptz", [{args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampEq(this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    timestampEq(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    timestampEq(this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    timestampEq(...args: unknown[]) {
        return sqlFunction("timestamp_eq", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampEqDate(this: Types.Timestamp<1>, a1: Types.Date<1>): Types.Bool<1>
    timestampEqDate(this: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    timestampEqDate(this: Types.Timestamp<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    timestampEqDate(...args: unknown[]) {
        return sqlFunction("timestamp_eq_date", [{args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampEqTimestamptz(this: Types.Timestamp<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    timestampEqTimestamptz(this: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    timestampEqTimestamptz(this: Types.Timestamp<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    timestampEqTimestamptz(...args: unknown[]) {
        return sqlFunction("timestamp_eq_timestamptz", [{args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampGe(this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    timestampGe(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    timestampGe(this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    timestampGe(...args: unknown[]) {
        return sqlFunction("timestamp_ge", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampGeDate(this: Types.Timestamp<1>, a1: Types.Date<1>): Types.Bool<1>
    timestampGeDate(this: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    timestampGeDate(this: Types.Timestamp<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    timestampGeDate(...args: unknown[]) {
        return sqlFunction("timestamp_ge_date", [{args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampGeTimestamptz(this: Types.Timestamp<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    timestampGeTimestamptz(this: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    timestampGeTimestamptz(this: Types.Timestamp<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    timestampGeTimestamptz(...args: unknown[]) {
        return sqlFunction("timestamp_ge_timestamptz", [{args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampGt(this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    timestampGt(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    timestampGt(this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    timestampGt(...args: unknown[]) {
        return sqlFunction("timestamp_gt", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampGtDate(this: Types.Timestamp<1>, a1: Types.Date<1>): Types.Bool<1>
    timestampGtDate(this: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    timestampGtDate(this: Types.Timestamp<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    timestampGtDate(...args: unknown[]) {
        return sqlFunction("timestamp_gt_date", [{args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampGtTimestamptz(this: Types.Timestamp<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    timestampGtTimestamptz(this: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    timestampGtTimestamptz(this: Types.Timestamp<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    timestampGtTimestamptz(...args: unknown[]) {
        return sqlFunction("timestamp_gt_timestamptz", [{args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampHash(this: Types.Timestamp<1>): Types.Int4<1>
    timestampHash(this: Types.Timestamp<0 | 1>): Types.Int4<0 | 1>
    timestampHash(this: Types.Timestamp<number>): Types.Int4<0 | 1>
    timestampHash(...args: unknown[]) {
        return sqlFunction("timestamp_hash", [{args: [Types.Timestamp<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampHashExtended(this: Types.Timestamp<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    timestampHashExtended(this: Types.Timestamp<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    timestampHashExtended(this: Types.Timestamp<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    timestampHashExtended(...args: unknown[]) {
        return sqlFunction("timestamp_hash_extended", [{args: [Types.Timestamp<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampLarger(this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Timestamp<1>
    timestampLarger(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Timestamp<0 | 1>
    timestampLarger(this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Timestamp<0 | 1>
    timestampLarger(...args: unknown[]) {
        return sqlFunction("timestamp_larger", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampLe(this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    timestampLe(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    timestampLe(this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    timestampLe(...args: unknown[]) {
        return sqlFunction("timestamp_le", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampLeDate(this: Types.Timestamp<1>, a1: Types.Date<1>): Types.Bool<1>
    timestampLeDate(this: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    timestampLeDate(this: Types.Timestamp<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    timestampLeDate(...args: unknown[]) {
        return sqlFunction("timestamp_le_date", [{args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampLeTimestamptz(this: Types.Timestamp<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    timestampLeTimestamptz(this: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    timestampLeTimestamptz(this: Types.Timestamp<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    timestampLeTimestamptz(...args: unknown[]) {
        return sqlFunction("timestamp_le_timestamptz", [{args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampLt(this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    timestampLt(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    timestampLt(this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    timestampLt(...args: unknown[]) {
        return sqlFunction("timestamp_lt", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampLtDate(this: Types.Timestamp<1>, a1: Types.Date<1>): Types.Bool<1>
    timestampLtDate(this: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    timestampLtDate(this: Types.Timestamp<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    timestampLtDate(...args: unknown[]) {
        return sqlFunction("timestamp_lt_date", [{args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampLtTimestamptz(this: Types.Timestamp<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    timestampLtTimestamptz(this: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    timestampLtTimestamptz(this: Types.Timestamp<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    timestampLtTimestamptz(...args: unknown[]) {
        return sqlFunction("timestamp_lt_timestamptz", [{args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampMi(this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Interval<1>
    timestampMi(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Interval<0 | 1>
    timestampMi(this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Interval<0 | 1>
    timestampMi(...args: unknown[]) {
        return sqlFunction("timestamp_mi", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampMiInterval(this: Types.Timestamp<1>, a1: Types.Interval<1>): Types.Timestamp<1>
    timestampMiInterval(this: Types.Timestamp<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamp<0 | 1>
    timestampMiInterval(this: Types.Timestamp<number>, a1: Types.Interval<number>): Types.Timestamp<0 | 1>
    timestampMiInterval(...args: unknown[]) {
        return sqlFunction("timestamp_mi_interval", [{args: [Types.Timestamp<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampNe(this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    timestampNe(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    timestampNe(this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    timestampNe(...args: unknown[]) {
        return sqlFunction("timestamp_ne", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampNeDate(this: Types.Timestamp<1>, a1: Types.Date<1>): Types.Bool<1>
    timestampNeDate(this: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    timestampNeDate(this: Types.Timestamp<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    timestampNeDate(...args: unknown[]) {
        return sqlFunction("timestamp_ne_date", [{args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampNeTimestamptz(this: Types.Timestamp<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    timestampNeTimestamptz(this: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    timestampNeTimestamptz(this: Types.Timestamp<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    timestampNeTimestamptz(...args: unknown[]) {
        return sqlFunction("timestamp_ne_timestamptz", [{args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampPlInterval(this: Types.Timestamp<1>, a1: Types.Interval<1>): Types.Timestamp<1>
    timestampPlInterval(this: Types.Timestamp<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamp<0 | 1>
    timestampPlInterval(this: Types.Timestamp<number>, a1: Types.Interval<number>): Types.Timestamp<0 | 1>
    timestampPlInterval(...args: unknown[]) {
        return sqlFunction("timestamp_pl_interval", [{args: [Types.Timestamp<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestampSmaller(this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Timestamp<1>
    timestampSmaller(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Timestamp<0 | 1>
    timestampSmaller(this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Timestamp<0 | 1>
    timestampSmaller(...args: unknown[]) {
        return sqlFunction("timestamp_smaller", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptz(this: Types.Timestamp<1>): Types.Timestamptz<1>
    timestamptz(this: Types.Timestamp<0 | 1>): Types.Timestamptz<0 | 1>
    timestamptz(this: Types.Timestamp<number>): Types.Timestamptz<0 | 1>
    timestamptz(...args: unknown[]) {
        return sqlFunction("timestamptz", [{args: [Types.Timestamp<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timezone(this: Types.Timestamp<1>): Types.Timestamptz<1>
    timezone(this: Types.Timestamp<0 | 1>): Types.Timestamptz<0 | 1>
    timezone(this: Types.Timestamp<number>): Types.Timestamptz<0 | 1>
    timezone(...args: unknown[]) {
        return sqlFunction("timezone", [{args: [Types.Timestamp<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toChar(this: Types.Timestamp<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    toChar(this: Types.Timestamp<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    toChar(this: Types.Timestamp<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    toChar(...args: unknown[]) {
        return sqlFunction("to_char", [{args: [Types.Timestamp<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsrange(this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Tsrange<1>
    tsrange(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Tsrange<0 | 1>
    tsrange(this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Tsrange<0 | 1>
    tsrange(this: Types.Timestamp<1>, a1: Types.Timestamp<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Tsrange<1>
    tsrange(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tsrange<0 | 1>
    tsrange(this: Types.Timestamp<number>, a1: Types.Timestamp<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Tsrange<0 | 1>
    tsrange(...args: unknown[]) {
        return sqlFunction("tsrange", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Tsrange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>, Types.Text<0 | 1>], ret: Types.Tsrange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsrangeSubdiff(this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Float8<1>
    tsrangeSubdiff(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Float8<0 | 1>
    tsrangeSubdiff(this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Float8<0 | 1>
    tsrangeSubdiff(...args: unknown[]) {
        return sqlFunction("tsrange_subdiff", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    ["="](this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    ["="](this: Types.Timestamp<1>, a1: Types.Date<1>): Types.Bool<1>
    ["="](this: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Timestamp<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    ["="](this: Types.Timestamp<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    ["="](this: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Timestamp<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    eq(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    eq(this: Types.Timestamp<1>, a1: Types.Date<1>): Types.Bool<1>
    eq(this: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Timestamp<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    eq(this: Types.Timestamp<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    eq(this: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Timestamp<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    [">="](this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    [">="](this: Types.Timestamp<1>, a1: Types.Date<1>): Types.Bool<1>
    [">="](this: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Timestamp<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    [">="](this: Types.Timestamp<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    [">="](this: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Timestamp<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    gte(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    gte(this: Types.Timestamp<1>, a1: Types.Date<1>): Types.Bool<1>
    gte(this: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Timestamp<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    gte(this: Types.Timestamp<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    gte(this: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Timestamp<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    [">"](this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    [">"](this: Types.Timestamp<1>, a1: Types.Date<1>): Types.Bool<1>
    [">"](this: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Timestamp<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    [">"](this: Types.Timestamp<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    [">"](this: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Timestamp<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    gt(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    gt(this: Types.Timestamp<1>, a1: Types.Date<1>): Types.Bool<1>
    gt(this: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Timestamp<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    gt(this: Types.Timestamp<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    gt(this: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Timestamp<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    ["<="](this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    ["<="](this: Types.Timestamp<1>, a1: Types.Date<1>): Types.Bool<1>
    ["<="](this: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Timestamp<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    ["<="](this: Types.Timestamp<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    ["<="](this: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Timestamp<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    lte(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    lte(this: Types.Timestamp<1>, a1: Types.Date<1>): Types.Bool<1>
    lte(this: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Timestamp<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    lte(this: Types.Timestamp<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    lte(this: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Timestamp<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    ["<"](this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    ["<"](this: Types.Timestamp<1>, a1: Types.Date<1>): Types.Bool<1>
    ["<"](this: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Timestamp<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    ["<"](this: Types.Timestamp<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    ["<"](this: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Timestamp<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    lt(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    lt(this: Types.Timestamp<1>, a1: Types.Date<1>): Types.Bool<1>
    lt(this: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Timestamp<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    lt(this: Types.Timestamp<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    lt(this: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Timestamp<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"](this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Interval<1>
    ["-"](this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Interval<0 | 1>
    ["-"](this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Interval<0 | 1>
    ["-"](this: Types.Timestamp<1>, a1: Types.Interval<1>): Types.Timestamp<1>
    ["-"](this: Types.Timestamp<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamp<0 | 1>
    ["-"](this: Types.Timestamp<number>, a1: Types.Interval<number>): Types.Timestamp<0 | 1>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus(this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Interval<1>
    minus(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Interval<0 | 1>
    minus(this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Interval<0 | 1>
    minus(this: Types.Timestamp<1>, a1: Types.Interval<1>): Types.Timestamp<1>
    minus(this: Types.Timestamp<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamp<0 | 1>
    minus(this: Types.Timestamp<number>, a1: Types.Interval<number>): Types.Timestamp<0 | 1>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    ["<>"](this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    ["<>"](this: Types.Timestamp<1>, a1: Types.Date<1>): Types.Bool<1>
    ["<>"](this: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Timestamp<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    ["<>"](this: Types.Timestamp<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    ["<>"](this: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Timestamp<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Timestamp<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    ne(this: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Timestamp<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    ne(this: Types.Timestamp<1>, a1: Types.Date<1>): Types.Bool<1>
    ne(this: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Timestamp<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    ne(this: Types.Timestamp<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    ne(this: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Timestamp<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["+"](this: Types.Timestamp<1>, a1: Types.Interval<1>): Types.Timestamp<1>
    ["+"](this: Types.Timestamp<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamp<0 | 1>
    ["+"](this: Types.Timestamp<number>, a1: Types.Interval<number>): Types.Timestamp<0 | 1>
    ["+"](...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Timestamp<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plus(this: Types.Timestamp<1>, a1: Types.Interval<1>): Types.Timestamp<1>
    plus(this: Types.Timestamp<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamp<0 | 1>
    plus(this: Types.Timestamp<number>, a1: Types.Interval<number>): Types.Timestamp<0 | 1>
    plus(...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Timestamp<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
