import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Timestamptz<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Timestamptz<1>;
    static new(v: null): Timestamptz<0>;
    static new(v: Expression): Timestamptz<0 | 1>;
    static new(v: SerializeParam | null | Expression): Timestamptz<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "timestamptz" } 
    asAggregate(): Types.Timestamptz<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Timestamptz<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Timestamptz<1> | undefined {
          return undefined;
        }
       
    age(this: Types.Timestamptz<1>): Types.Interval<1>
    age(this: Types.Timestamptz<0 | 1>): Types.Interval<0 | 1>
    age(this: Types.Timestamptz<number>): Types.Interval<0 | 1>
    age(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Interval<1>
    age(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Interval<0 | 1>
    age(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Interval<0 | 1>
    age(...args: unknown[]) {
        return sqlFunction("age", [{args: [Types.Timestamptz<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    date(this: Types.Timestamptz<1>): Types.Date<1>
    date(this: Types.Timestamptz<0 | 1>): Types.Date<0 | 1>
    date(this: Types.Timestamptz<number>): Types.Date<0 | 1>
    date(...args: unknown[]) {
        return sqlFunction("date", [{args: [Types.Timestamptz<0 | 1>], ret: Types.Date<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateAdd(this: Types.Timestamptz<1>, a1: Types.Interval<1>): Types.Timestamptz<1>
    dateAdd(this: Types.Timestamptz<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamptz<0 | 1>
    dateAdd(this: Types.Timestamptz<number>, a1: Types.Interval<number>): Types.Timestamptz<0 | 1>
    dateAdd(this: Types.Timestamptz<1>, a1: Types.Interval<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Timestamptz<1>
    dateAdd(this: Types.Timestamptz<0 | 1>, a1: Types.Interval<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Timestamptz<0 | 1>
    dateAdd(this: Types.Timestamptz<number>, a1: Types.Interval<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Timestamptz<0 | 1>
    dateAdd(...args: unknown[]) {
        return sqlFunction("date_add", [{args: [Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>, Types.Text<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dateSubtract(this: Types.Timestamptz<1>, a1: Types.Interval<1>): Types.Timestamptz<1>
    dateSubtract(this: Types.Timestamptz<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamptz<0 | 1>
    dateSubtract(this: Types.Timestamptz<number>, a1: Types.Interval<number>): Types.Timestamptz<0 | 1>
    dateSubtract(this: Types.Timestamptz<1>, a1: Types.Interval<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Timestamptz<1>
    dateSubtract(this: Types.Timestamptz<0 | 1>, a1: Types.Interval<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Timestamptz<0 | 1>
    dateSubtract(this: Types.Timestamptz<number>, a1: Types.Interval<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Timestamptz<0 | 1>
    dateSubtract(...args: unknown[]) {
        return sqlFunction("date_subtract", [{args: [Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>, Types.Text<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    generateSeries(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>, a2: Types.Interval<1>): Types.FromItem<{}>
    generateSeries(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>, a2: Types.Interval<0 | 1>): Types.FromItem<{}>
    generateSeries(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>, a2: Types.Interval<number>): Types.FromItem<{}>
    generateSeries(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>, a2: Types.Interval<1>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
    generateSeries(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>, a2: Types.Interval<0 | 1>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
    generateSeries(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>, a2: Types.Interval<number>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
    generateSeries(...args: unknown[]) {
        return sqlFunction("generate_series", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    inRange(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>, a2: Types.Interval<1>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    inRange(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>, a2: Types.Interval<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>, a2: Types.Interval<number>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(...args: unknown[]) {
        return sqlFunction("in_range", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    isfinite(this: Types.Timestamptz<1>): Types.Bool<1>
    isfinite(this: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    isfinite(this: Types.Timestamptz<number>): Types.Bool<0 | 1>
    isfinite(...args: unknown[]) {
        return sqlFunction("isfinite", [{args: [Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    max(this: Types.Timestamptz<number>): Types.Timestamptz<0 | 1>
    max(...args: unknown[]) {
        return sqlFunction("max", [{args: [Types.Timestamptz<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    overlaps(this: Types.Timestamptz<1>, a1: Types.Interval<1>, a2: Types.Timestamptz<1>, a3: Types.Interval<1>): Types.Bool<1>
    overlaps(this: Types.Timestamptz<0 | 1>, a1: Types.Interval<0 | 1>, a2: Types.Timestamptz<0 | 1>, a3: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    overlaps(this: Types.Timestamptz<number>, a1: Types.Interval<number>, a2: Types.Timestamptz<number>, a3: Types.Interval<number>): Types.Bool<0 | 1>
    overlaps(this: Types.Timestamptz<1>, a1: Types.Interval<1>, a2: Types.Timestamptz<1>, a3: Types.Timestamptz<1>): Types.Bool<1>
    overlaps(this: Types.Timestamptz<0 | 1>, a1: Types.Interval<0 | 1>, a2: Types.Timestamptz<0 | 1>, a3: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    overlaps(this: Types.Timestamptz<number>, a1: Types.Interval<number>, a2: Types.Timestamptz<number>, a3: Types.Timestamptz<number>): Types.Bool<0 | 1>
    overlaps(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>, a2: Types.Timestamptz<1>, a3: Types.Interval<1>): Types.Bool<1>
    overlaps(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>, a2: Types.Timestamptz<0 | 1>, a3: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    overlaps(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>, a2: Types.Timestamptz<number>, a3: Types.Interval<number>): Types.Bool<0 | 1>
    overlaps(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>, a2: Types.Timestamptz<1>, a3: Types.Timestamptz<1>): Types.Bool<1>
    overlaps(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>, a2: Types.Timestamptz<0 | 1>, a3: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    overlaps(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>, a2: Types.Timestamptz<number>, a3: Types.Timestamptz<number>): Types.Bool<0 | 1>
    overlaps(...args: unknown[]) {
        return sqlFunction("overlaps", [{args: [Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>, Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>, Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    pgSleepUntil(this: Types.Timestamptz<1>): Types.Void<1>
    pgSleepUntil(this: Types.Timestamptz<0 | 1>): Types.Void<0 | 1>
    pgSleepUntil(this: Types.Timestamptz<number>): Types.Void<0 | 1>
    pgSleepUntil(...args: unknown[]) {
        return sqlFunction("pg_sleep_until", [{args: [Types.Timestamptz<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    time(this: Types.Timestamptz<1>): Types.Time<1>
    time(this: Types.Timestamptz<0 | 1>): Types.Time<0 | 1>
    time(this: Types.Timestamptz<number>): Types.Time<0 | 1>
    time(...args: unknown[]) {
        return sqlFunction("time", [{args: [Types.Timestamptz<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    timestamp(this: Types.Timestamptz<1>): Types.Timestamp<1>
    timestamp(this: Types.Timestamptz<0 | 1>): Types.Timestamp<0 | 1>
    timestamp(this: Types.Timestamptz<number>): Types.Timestamp<0 | 1>
    timestamp(...args: unknown[]) {
        return sqlFunction("timestamp", [{args: [Types.Timestamptz<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    timestamptz(this: Types.Timestamptz<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Timestamptz<1>
    timestamptz(this: Types.Timestamptz<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Timestamptz<0 | 1>
    timestamptz(this: Types.Timestamptz<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Timestamptz<0 | 1>
    timestamptz(...args: unknown[]) {
        return sqlFunction("timestamptz", [{args: [Types.Timestamptz<0 | 1>, Types.Int4<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzCmp(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Int4<1>
    timestamptzCmp(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Int4<0 | 1>
    timestamptzCmp(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Int4<0 | 1>
    timestamptzCmp(...args: unknown[]) {
        return sqlFunction("timestamptz_cmp", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzCmpDate(this: Types.Timestamptz<1>, a1: Types.Date<1>): Types.Int4<1>
    timestamptzCmpDate(this: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Int4<0 | 1>
    timestamptzCmpDate(this: Types.Timestamptz<number>, a1: Types.Date<number>): Types.Int4<0 | 1>
    timestamptzCmpDate(...args: unknown[]) {
        return sqlFunction("timestamptz_cmp_date", [{args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzCmpTimestamp(this: Types.Timestamptz<1>, a1: Types.Timestamp<1>): Types.Int4<1>
    timestamptzCmpTimestamp(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Int4<0 | 1>
    timestamptzCmpTimestamp(this: Types.Timestamptz<number>, a1: Types.Timestamp<number>): Types.Int4<0 | 1>
    timestamptzCmpTimestamp(...args: unknown[]) {
        return sqlFunction("timestamptz_cmp_timestamp", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzEq(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    timestamptzEq(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    timestamptzEq(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    timestamptzEq(...args: unknown[]) {
        return sqlFunction("timestamptz_eq", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzEqDate(this: Types.Timestamptz<1>, a1: Types.Date<1>): Types.Bool<1>
    timestamptzEqDate(this: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    timestamptzEqDate(this: Types.Timestamptz<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    timestamptzEqDate(...args: unknown[]) {
        return sqlFunction("timestamptz_eq_date", [{args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzEqTimestamp(this: Types.Timestamptz<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    timestamptzEqTimestamp(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    timestamptzEqTimestamp(this: Types.Timestamptz<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    timestamptzEqTimestamp(...args: unknown[]) {
        return sqlFunction("timestamptz_eq_timestamp", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzGe(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    timestamptzGe(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    timestamptzGe(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    timestamptzGe(...args: unknown[]) {
        return sqlFunction("timestamptz_ge", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzGeDate(this: Types.Timestamptz<1>, a1: Types.Date<1>): Types.Bool<1>
    timestamptzGeDate(this: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    timestamptzGeDate(this: Types.Timestamptz<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    timestamptzGeDate(...args: unknown[]) {
        return sqlFunction("timestamptz_ge_date", [{args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzGeTimestamp(this: Types.Timestamptz<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    timestamptzGeTimestamp(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    timestamptzGeTimestamp(this: Types.Timestamptz<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    timestamptzGeTimestamp(...args: unknown[]) {
        return sqlFunction("timestamptz_ge_timestamp", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzGt(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    timestamptzGt(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    timestamptzGt(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    timestamptzGt(...args: unknown[]) {
        return sqlFunction("timestamptz_gt", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzGtDate(this: Types.Timestamptz<1>, a1: Types.Date<1>): Types.Bool<1>
    timestamptzGtDate(this: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    timestamptzGtDate(this: Types.Timestamptz<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    timestamptzGtDate(...args: unknown[]) {
        return sqlFunction("timestamptz_gt_date", [{args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzGtTimestamp(this: Types.Timestamptz<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    timestamptzGtTimestamp(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    timestamptzGtTimestamp(this: Types.Timestamptz<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    timestamptzGtTimestamp(...args: unknown[]) {
        return sqlFunction("timestamptz_gt_timestamp", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzLarger(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Timestamptz<1>
    timestamptzLarger(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Timestamptz<0 | 1>
    timestamptzLarger(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Timestamptz<0 | 1>
    timestamptzLarger(...args: unknown[]) {
        return sqlFunction("timestamptz_larger", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzLe(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    timestamptzLe(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    timestamptzLe(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    timestamptzLe(...args: unknown[]) {
        return sqlFunction("timestamptz_le", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzLeDate(this: Types.Timestamptz<1>, a1: Types.Date<1>): Types.Bool<1>
    timestamptzLeDate(this: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    timestamptzLeDate(this: Types.Timestamptz<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    timestamptzLeDate(...args: unknown[]) {
        return sqlFunction("timestamptz_le_date", [{args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzLeTimestamp(this: Types.Timestamptz<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    timestamptzLeTimestamp(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    timestamptzLeTimestamp(this: Types.Timestamptz<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    timestamptzLeTimestamp(...args: unknown[]) {
        return sqlFunction("timestamptz_le_timestamp", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzLt(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    timestamptzLt(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    timestamptzLt(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    timestamptzLt(...args: unknown[]) {
        return sqlFunction("timestamptz_lt", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzLtDate(this: Types.Timestamptz<1>, a1: Types.Date<1>): Types.Bool<1>
    timestamptzLtDate(this: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    timestamptzLtDate(this: Types.Timestamptz<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    timestamptzLtDate(...args: unknown[]) {
        return sqlFunction("timestamptz_lt_date", [{args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzLtTimestamp(this: Types.Timestamptz<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    timestamptzLtTimestamp(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    timestamptzLtTimestamp(this: Types.Timestamptz<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    timestamptzLtTimestamp(...args: unknown[]) {
        return sqlFunction("timestamptz_lt_timestamp", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzMi(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Interval<1>
    timestamptzMi(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Interval<0 | 1>
    timestamptzMi(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Interval<0 | 1>
    timestamptzMi(...args: unknown[]) {
        return sqlFunction("timestamptz_mi", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzMiInterval(this: Types.Timestamptz<1>, a1: Types.Interval<1>): Types.Timestamptz<1>
    timestamptzMiInterval(this: Types.Timestamptz<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamptz<0 | 1>
    timestamptzMiInterval(this: Types.Timestamptz<number>, a1: Types.Interval<number>): Types.Timestamptz<0 | 1>
    timestamptzMiInterval(...args: unknown[]) {
        return sqlFunction("timestamptz_mi_interval", [{args: [Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzNe(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    timestamptzNe(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    timestamptzNe(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    timestamptzNe(...args: unknown[]) {
        return sqlFunction("timestamptz_ne", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzNeDate(this: Types.Timestamptz<1>, a1: Types.Date<1>): Types.Bool<1>
    timestamptzNeDate(this: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    timestamptzNeDate(this: Types.Timestamptz<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    timestamptzNeDate(...args: unknown[]) {
        return sqlFunction("timestamptz_ne_date", [{args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzNeTimestamp(this: Types.Timestamptz<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    timestamptzNeTimestamp(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    timestamptzNeTimestamp(this: Types.Timestamptz<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    timestamptzNeTimestamp(...args: unknown[]) {
        return sqlFunction("timestamptz_ne_timestamp", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzPlInterval(this: Types.Timestamptz<1>, a1: Types.Interval<1>): Types.Timestamptz<1>
    timestamptzPlInterval(this: Types.Timestamptz<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamptz<0 | 1>
    timestamptzPlInterval(this: Types.Timestamptz<number>, a1: Types.Interval<number>): Types.Timestamptz<0 | 1>
    timestamptzPlInterval(...args: unknown[]) {
        return sqlFunction("timestamptz_pl_interval", [{args: [Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timestamptzSmaller(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Timestamptz<1>
    timestamptzSmaller(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Timestamptz<0 | 1>
    timestamptzSmaller(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Timestamptz<0 | 1>
    timestamptzSmaller(...args: unknown[]) {
        return sqlFunction("timestamptz_smaller", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timetz(this: Types.Timestamptz<1>): Types.Timetz<1>
    timetz(this: Types.Timestamptz<0 | 1>): Types.Timetz<0 | 1>
    timetz(this: Types.Timestamptz<number>): Types.Timetz<0 | 1>
    timetz(...args: unknown[]) {
        return sqlFunction("timetz", [{args: [Types.Timestamptz<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timezone(this: Types.Timestamptz<1>): Types.Timestamp<1>
    timezone(this: Types.Timestamptz<0 | 1>): Types.Timestamp<0 | 1>
    timezone(this: Types.Timestamptz<number>): Types.Timestamp<0 | 1>
    timezone(...args: unknown[]) {
        return sqlFunction("timezone", [{args: [Types.Timestamptz<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toChar(this: Types.Timestamptz<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    toChar(this: Types.Timestamptz<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    toChar(this: Types.Timestamptz<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    toChar(...args: unknown[]) {
        return sqlFunction("to_char", [{args: [Types.Timestamptz<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tstzrange(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Tstzrange<1>
    tstzrange(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Tstzrange<0 | 1>
    tstzrange(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Tstzrange<0 | 1>
    tstzrange(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Tstzrange<1>
    tstzrange(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tstzrange<0 | 1>
    tstzrange(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Tstzrange<0 | 1>
    tstzrange(...args: unknown[]) {
        return sqlFunction("tstzrange", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Tstzrange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>, Types.Text<0 | 1>], ret: Types.Tstzrange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tstzrangeSubdiff(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Float8<1>
    tstzrangeSubdiff(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Float8<0 | 1>
    tstzrangeSubdiff(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Float8<0 | 1>
    tstzrangeSubdiff(...args: unknown[]) {
        return sqlFunction("tstzrange_subdiff", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    ["="](this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    ["="](this: Types.Timestamptz<1>, a1: Types.Date<1>): Types.Bool<1>
    ["="](this: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Timestamptz<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    ["="](this: Types.Timestamptz<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    ["="](this: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Timestamptz<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    eq(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    eq(this: Types.Timestamptz<1>, a1: Types.Date<1>): Types.Bool<1>
    eq(this: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Timestamptz<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    eq(this: Types.Timestamptz<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    eq(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Timestamptz<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    [">="](this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    [">="](this: Types.Timestamptz<1>, a1: Types.Date<1>): Types.Bool<1>
    [">="](this: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Timestamptz<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    [">="](this: Types.Timestamptz<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    [">="](this: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Timestamptz<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    gte(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    gte(this: Types.Timestamptz<1>, a1: Types.Date<1>): Types.Bool<1>
    gte(this: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Timestamptz<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    gte(this: Types.Timestamptz<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    gte(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Timestamptz<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    [">"](this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    [">"](this: Types.Timestamptz<1>, a1: Types.Date<1>): Types.Bool<1>
    [">"](this: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Timestamptz<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    [">"](this: Types.Timestamptz<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    [">"](this: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Timestamptz<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    gt(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    gt(this: Types.Timestamptz<1>, a1: Types.Date<1>): Types.Bool<1>
    gt(this: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Timestamptz<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    gt(this: Types.Timestamptz<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    gt(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Timestamptz<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    ["<="](this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    ["<="](this: Types.Timestamptz<1>, a1: Types.Date<1>): Types.Bool<1>
    ["<="](this: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Timestamptz<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    ["<="](this: Types.Timestamptz<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    ["<="](this: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Timestamptz<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    lte(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    lte(this: Types.Timestamptz<1>, a1: Types.Date<1>): Types.Bool<1>
    lte(this: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Timestamptz<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    lte(this: Types.Timestamptz<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    lte(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Timestamptz<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    ["<"](this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    ["<"](this: Types.Timestamptz<1>, a1: Types.Date<1>): Types.Bool<1>
    ["<"](this: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Timestamptz<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    ["<"](this: Types.Timestamptz<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    ["<"](this: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Timestamptz<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    lt(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    lt(this: Types.Timestamptz<1>, a1: Types.Date<1>): Types.Bool<1>
    lt(this: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Timestamptz<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    lt(this: Types.Timestamptz<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    lt(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Timestamptz<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"](this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Interval<1>
    ["-"](this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Interval<0 | 1>
    ["-"](this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Interval<0 | 1>
    ["-"](this: Types.Timestamptz<1>, a1: Types.Interval<1>): Types.Timestamptz<1>
    ["-"](this: Types.Timestamptz<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamptz<0 | 1>
    ["-"](this: Types.Timestamptz<number>, a1: Types.Interval<number>): Types.Timestamptz<0 | 1>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Interval<1>
    minus(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Interval<0 | 1>
    minus(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Interval<0 | 1>
    minus(this: Types.Timestamptz<1>, a1: Types.Interval<1>): Types.Timestamptz<1>
    minus(this: Types.Timestamptz<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamptz<0 | 1>
    minus(this: Types.Timestamptz<number>, a1: Types.Interval<number>): Types.Timestamptz<0 | 1>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    ["<>"](this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    ["<>"](this: Types.Timestamptz<1>, a1: Types.Date<1>): Types.Bool<1>
    ["<>"](this: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Timestamptz<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    ["<>"](this: Types.Timestamptz<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    ["<>"](this: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Timestamptz<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Timestamptz<1>, a1: Types.Timestamptz<1>): Types.Bool<1>
    ne(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Timestamptz<number>, a1: Types.Timestamptz<number>): Types.Bool<0 | 1>
    ne(this: Types.Timestamptz<1>, a1: Types.Date<1>): Types.Bool<1>
    ne(this: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Timestamptz<number>, a1: Types.Date<number>): Types.Bool<0 | 1>
    ne(this: Types.Timestamptz<1>, a1: Types.Timestamp<1>): Types.Bool<1>
    ne(this: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Timestamptz<number>, a1: Types.Timestamp<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["+"](this: Types.Timestamptz<1>, a1: Types.Interval<1>): Types.Timestamptz<1>
    ["+"](this: Types.Timestamptz<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamptz<0 | 1>
    ["+"](this: Types.Timestamptz<number>, a1: Types.Interval<number>): Types.Timestamptz<0 | 1>
    ["+"](...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plus(this: Types.Timestamptz<1>, a1: Types.Interval<1>): Types.Timestamptz<1>
    plus(this: Types.Timestamptz<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamptz<0 | 1>
    plus(this: Types.Timestamptz<number>, a1: Types.Interval<number>): Types.Timestamptz<0 | 1>
    plus(...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
