import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Interval<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Interval<1>;
    static new(v: null): Interval<0>;
    static new(v: Expression): Interval<0 | 1>;
    static new(v: SerializeParam | null | Expression): Interval<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "interval" } 
    asAggregate(): Types.Interval<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Interval<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Interval<1> | undefined {
          return undefined;
        }
       
    avg(this: Types.Interval<number>): Types.Interval<0 | 1>
    avg(...args: unknown[]) {
        return sqlFunction("avg", [{args: [Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    inRange(this: Types.Interval<1>, a1: Types.Interval<1>, a2: Types.Interval<1>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    inRange(this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>, a2: Types.Interval<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(this: Types.Interval<number>, a1: Types.Interval<number>, a2: Types.Interval<number>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(...args: unknown[]) {
        return sqlFunction("in_range", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>, Types.Interval<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    interval(this: Types.Interval<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Interval<1>
    interval(this: Types.Interval<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Interval<0 | 1>
    interval(this: Types.Interval<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Interval<0 | 1>
    interval(...args: unknown[]) {
        return sqlFunction("interval", [{args: [Types.Interval<0 | 1>, Types.Int4<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    intervalCmp(this: Types.Interval<1>, a1: Types.Interval<1>): Types.Int4<1>
    intervalCmp(this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Int4<0 | 1>
    intervalCmp(this: Types.Interval<number>, a1: Types.Interval<number>): Types.Int4<0 | 1>
    intervalCmp(...args: unknown[]) {
        return sqlFunction("interval_cmp", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    intervalDiv(this: Types.Interval<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<1>
    intervalDiv(this: Types.Interval<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<0 | 1>
    intervalDiv(this: Types.Interval<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<0 | 1>
    intervalDiv(...args: unknown[]) {
        return sqlFunction("interval_div", [{args: [Types.Interval<0 | 1>, Types.Float8<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    intervalEq(this: Types.Interval<1>, a1: Types.Interval<1>): Types.Bool<1>
    intervalEq(this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    intervalEq(this: Types.Interval<number>, a1: Types.Interval<number>): Types.Bool<0 | 1>
    intervalEq(...args: unknown[]) {
        return sqlFunction("interval_eq", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    intervalGe(this: Types.Interval<1>, a1: Types.Interval<1>): Types.Bool<1>
    intervalGe(this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    intervalGe(this: Types.Interval<number>, a1: Types.Interval<number>): Types.Bool<0 | 1>
    intervalGe(...args: unknown[]) {
        return sqlFunction("interval_ge", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    intervalGt(this: Types.Interval<1>, a1: Types.Interval<1>): Types.Bool<1>
    intervalGt(this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    intervalGt(this: Types.Interval<number>, a1: Types.Interval<number>): Types.Bool<0 | 1>
    intervalGt(...args: unknown[]) {
        return sqlFunction("interval_gt", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    intervalHash(this: Types.Interval<1>): Types.Int4<1>
    intervalHash(this: Types.Interval<0 | 1>): Types.Int4<0 | 1>
    intervalHash(this: Types.Interval<number>): Types.Int4<0 | 1>
    intervalHash(...args: unknown[]) {
        return sqlFunction("interval_hash", [{args: [Types.Interval<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    intervalHashExtended(this: Types.Interval<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    intervalHashExtended(this: Types.Interval<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    intervalHashExtended(this: Types.Interval<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    intervalHashExtended(...args: unknown[]) {
        return sqlFunction("interval_hash_extended", [{args: [Types.Interval<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    intervalLarger(this: Types.Interval<1>, a1: Types.Interval<1>): Types.Interval<1>
    intervalLarger(this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Interval<0 | 1>
    intervalLarger(this: Types.Interval<number>, a1: Types.Interval<number>): Types.Interval<0 | 1>
    intervalLarger(...args: unknown[]) {
        return sqlFunction("interval_larger", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    intervalLe(this: Types.Interval<1>, a1: Types.Interval<1>): Types.Bool<1>
    intervalLe(this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    intervalLe(this: Types.Interval<number>, a1: Types.Interval<number>): Types.Bool<0 | 1>
    intervalLe(...args: unknown[]) {
        return sqlFunction("interval_le", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    intervalLt(this: Types.Interval<1>, a1: Types.Interval<1>): Types.Bool<1>
    intervalLt(this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    intervalLt(this: Types.Interval<number>, a1: Types.Interval<number>): Types.Bool<0 | 1>
    intervalLt(...args: unknown[]) {
        return sqlFunction("interval_lt", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    intervalMi(this: Types.Interval<1>, a1: Types.Interval<1>): Types.Interval<1>
    intervalMi(this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Interval<0 | 1>
    intervalMi(this: Types.Interval<number>, a1: Types.Interval<number>): Types.Interval<0 | 1>
    intervalMi(...args: unknown[]) {
        return sqlFunction("interval_mi", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    intervalMul(this: Types.Interval<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<1>
    intervalMul(this: Types.Interval<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<0 | 1>
    intervalMul(this: Types.Interval<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<0 | 1>
    intervalMul(...args: unknown[]) {
        return sqlFunction("interval_mul", [{args: [Types.Interval<0 | 1>, Types.Float8<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    intervalNe(this: Types.Interval<1>, a1: Types.Interval<1>): Types.Bool<1>
    intervalNe(this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    intervalNe(this: Types.Interval<number>, a1: Types.Interval<number>): Types.Bool<0 | 1>
    intervalNe(...args: unknown[]) {
        return sqlFunction("interval_ne", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    intervalPl(this: Types.Interval<1>, a1: Types.Interval<1>): Types.Interval<1>
    intervalPl(this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Interval<0 | 1>
    intervalPl(this: Types.Interval<number>, a1: Types.Interval<number>): Types.Interval<0 | 1>
    intervalPl(...args: unknown[]) {
        return sqlFunction("interval_pl", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    intervalPlDate(this: Types.Interval<1>, a1: Types.Date<1>): Types.Timestamp<1>
    intervalPlDate(this: Types.Interval<0 | 1>, a1: Types.Date<0 | 1>): Types.Timestamp<0 | 1>
    intervalPlDate(this: Types.Interval<number>, a1: Types.Date<number>): Types.Timestamp<0 | 1>
    intervalPlDate(...args: unknown[]) {
        return sqlFunction("interval_pl_date", [{args: [Types.Interval<0 | 1>, Types.Date<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    intervalPlTime(this: Types.Interval<1>, a1: Types.Time<1>): Types.Time<1>
    intervalPlTime(this: Types.Interval<0 | 1>, a1: Types.Time<0 | 1>): Types.Time<0 | 1>
    intervalPlTime(this: Types.Interval<number>, a1: Types.Time<number>): Types.Time<0 | 1>
    intervalPlTime(...args: unknown[]) {
        return sqlFunction("interval_pl_time", [{args: [Types.Interval<0 | 1>, Types.Time<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    intervalPlTimestamp(this: Types.Interval<1>, a1: Types.Timestamp<1>): Types.Timestamp<1>
    intervalPlTimestamp(this: Types.Interval<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Timestamp<0 | 1>
    intervalPlTimestamp(this: Types.Interval<number>, a1: Types.Timestamp<number>): Types.Timestamp<0 | 1>
    intervalPlTimestamp(...args: unknown[]) {
        return sqlFunction("interval_pl_timestamp", [{args: [Types.Interval<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    intervalPlTimestamptz(this: Types.Interval<1>, a1: Types.Timestamptz<1>): Types.Timestamptz<1>
    intervalPlTimestamptz(this: Types.Interval<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Timestamptz<0 | 1>
    intervalPlTimestamptz(this: Types.Interval<number>, a1: Types.Timestamptz<number>): Types.Timestamptz<0 | 1>
    intervalPlTimestamptz(...args: unknown[]) {
        return sqlFunction("interval_pl_timestamptz", [{args: [Types.Interval<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    intervalPlTimetz(this: Types.Interval<1>, a1: Types.Timetz<1>): Types.Timetz<1>
    intervalPlTimetz(this: Types.Interval<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Timetz<0 | 1>
    intervalPlTimetz(this: Types.Interval<number>, a1: Types.Timetz<number>): Types.Timetz<0 | 1>
    intervalPlTimetz(...args: unknown[]) {
        return sqlFunction("interval_pl_timetz", [{args: [Types.Interval<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    intervalSmaller(this: Types.Interval<1>, a1: Types.Interval<1>): Types.Interval<1>
    intervalSmaller(this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Interval<0 | 1>
    intervalSmaller(this: Types.Interval<number>, a1: Types.Interval<number>): Types.Interval<0 | 1>
    intervalSmaller(...args: unknown[]) {
        return sqlFunction("interval_smaller", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    intervalUm(this: Types.Interval<1>): Types.Interval<1>
    intervalUm(this: Types.Interval<0 | 1>): Types.Interval<0 | 1>
    intervalUm(this: Types.Interval<number>): Types.Interval<0 | 1>
    intervalUm(...args: unknown[]) {
        return sqlFunction("interval_um", [{args: [Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    isfinite(this: Types.Interval<1>): Types.Bool<1>
    isfinite(this: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    isfinite(this: Types.Interval<number>): Types.Bool<0 | 1>
    isfinite(...args: unknown[]) {
        return sqlFunction("isfinite", [{args: [Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    justifyDays(this: Types.Interval<1>): Types.Interval<1>
    justifyDays(this: Types.Interval<0 | 1>): Types.Interval<0 | 1>
    justifyDays(this: Types.Interval<number>): Types.Interval<0 | 1>
    justifyDays(...args: unknown[]) {
        return sqlFunction("justify_days", [{args: [Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    justifyHours(this: Types.Interval<1>): Types.Interval<1>
    justifyHours(this: Types.Interval<0 | 1>): Types.Interval<0 | 1>
    justifyHours(this: Types.Interval<number>): Types.Interval<0 | 1>
    justifyHours(...args: unknown[]) {
        return sqlFunction("justify_hours", [{args: [Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    justifyInterval(this: Types.Interval<1>): Types.Interval<1>
    justifyInterval(this: Types.Interval<0 | 1>): Types.Interval<0 | 1>
    justifyInterval(this: Types.Interval<number>): Types.Interval<0 | 1>
    justifyInterval(...args: unknown[]) {
        return sqlFunction("justify_interval", [{args: [Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    max(this: Types.Interval<number>): Types.Interval<0 | 1>
    max(...args: unknown[]) {
        return sqlFunction("max", [{args: [Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgSleepFor(this: Types.Interval<1>): Types.Void<1>
    pgSleepFor(this: Types.Interval<0 | 1>): Types.Void<0 | 1>
    pgSleepFor(this: Types.Interval<number>): Types.Void<0 | 1>
    pgSleepFor(...args: unknown[]) {
        return sqlFunction("pg_sleep_for", [{args: [Types.Interval<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    sum(this: Types.Interval<number>): Types.Interval<0 | 1>
    sum(...args: unknown[]) {
        return sqlFunction("sum", [{args: [Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    time(this: Types.Interval<1>): Types.Time<1>
    time(this: Types.Interval<0 | 1>): Types.Time<0 | 1>
    time(this: Types.Interval<number>): Types.Time<0 | 1>
    time(...args: unknown[]) {
        return sqlFunction("time", [{args: [Types.Interval<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    timezone(this: Types.Interval<1>, a1: Types.Timestamptz<1>): Types.Timestamp<1>
    timezone(this: Types.Interval<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Timestamp<0 | 1>
    timezone(this: Types.Interval<number>, a1: Types.Timestamptz<number>): Types.Timestamp<0 | 1>
    timezone(this: Types.Interval<1>, a1: Types.Timestamp<1>): Types.Timestamptz<1>
    timezone(this: Types.Interval<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Timestamptz<0 | 1>
    timezone(this: Types.Interval<number>, a1: Types.Timestamp<number>): Types.Timestamptz<0 | 1>
    timezone(this: Types.Interval<1>, a1: Types.Timetz<1>): Types.Timetz<1>
    timezone(this: Types.Interval<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Timetz<0 | 1>
    timezone(this: Types.Interval<number>, a1: Types.Timetz<number>): Types.Timetz<0 | 1>
    timezone(...args: unknown[]) {
        return sqlFunction("timezone", [{args: [Types.Interval<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Interval<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Interval<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toChar(this: Types.Interval<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    toChar(this: Types.Interval<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    toChar(this: Types.Interval<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    toChar(...args: unknown[]) {
        return sqlFunction("to_char", [{args: [Types.Interval<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["/"](this: Types.Interval<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<1>
    ["/"](this: Types.Interval<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<0 | 1>
    ["/"](this: Types.Interval<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<0 | 1>
    ["/"](...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Interval<0 | 1>, Types.Float8<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    divide(this: Types.Interval<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<1>
    divide(this: Types.Interval<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<0 | 1>
    divide(this: Types.Interval<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<0 | 1>
    divide(...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Interval<0 | 1>, Types.Float8<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Interval<1>, a1: Types.Interval<1>): Types.Bool<1>
    ["="](this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Interval<number>, a1: Types.Interval<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Interval<1>, a1: Types.Interval<1>): Types.Bool<1>
    eq(this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Interval<number>, a1: Types.Interval<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Interval<1>, a1: Types.Interval<1>): Types.Bool<1>
    [">="](this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Interval<number>, a1: Types.Interval<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Interval<1>, a1: Types.Interval<1>): Types.Bool<1>
    gte(this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Interval<number>, a1: Types.Interval<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Interval<1>, a1: Types.Interval<1>): Types.Bool<1>
    [">"](this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Interval<number>, a1: Types.Interval<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Interval<1>, a1: Types.Interval<1>): Types.Bool<1>
    gt(this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Interval<number>, a1: Types.Interval<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Interval<1>, a1: Types.Interval<1>): Types.Bool<1>
    ["<="](this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Interval<number>, a1: Types.Interval<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Interval<1>, a1: Types.Interval<1>): Types.Bool<1>
    lte(this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Interval<number>, a1: Types.Interval<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Interval<1>, a1: Types.Interval<1>): Types.Bool<1>
    ["<"](this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Interval<number>, a1: Types.Interval<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Interval<1>, a1: Types.Interval<1>): Types.Bool<1>
    lt(this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Interval<number>, a1: Types.Interval<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"](this: Types.Interval<1>, a1: Types.Interval<1>): Types.Interval<1>
    ["-"](this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Interval<0 | 1>
    ["-"](this: Types.Interval<number>, a1: Types.Interval<number>): Types.Interval<0 | 1>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus(this: Types.Interval<1>, a1: Types.Interval<1>): Types.Interval<1>
    minus(this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Interval<0 | 1>
    minus(this: Types.Interval<number>, a1: Types.Interval<number>): Types.Interval<0 | 1>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["*"](this: Types.Interval<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<1>
    ["*"](this: Types.Interval<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<0 | 1>
    ["*"](this: Types.Interval<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<0 | 1>
    ["*"](...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Interval<0 | 1>, Types.Float8<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multiply(this: Types.Interval<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<1>
    multiply(this: Types.Interval<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<0 | 1>
    multiply(this: Types.Interval<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<0 | 1>
    multiply(...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Interval<0 | 1>, Types.Float8<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Interval<1>, a1: Types.Interval<1>): Types.Bool<1>
    ["<>"](this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Interval<number>, a1: Types.Interval<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Interval<1>, a1: Types.Interval<1>): Types.Bool<1>
    ne(this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Interval<number>, a1: Types.Interval<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["+"](this: Types.Interval<1>, a1: Types.Interval<1>): Types.Interval<1>
    ["+"](this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Interval<0 | 1>
    ["+"](this: Types.Interval<number>, a1: Types.Interval<number>): Types.Interval<0 | 1>
    ["+"](this: Types.Interval<1>, a1: Types.Date<1>): Types.Timestamp<1>
    ["+"](this: Types.Interval<0 | 1>, a1: Types.Date<0 | 1>): Types.Timestamp<0 | 1>
    ["+"](this: Types.Interval<number>, a1: Types.Date<number>): Types.Timestamp<0 | 1>
    ["+"](this: Types.Interval<1>, a1: Types.Time<1>): Types.Time<1>
    ["+"](this: Types.Interval<0 | 1>, a1: Types.Time<0 | 1>): Types.Time<0 | 1>
    ["+"](this: Types.Interval<number>, a1: Types.Time<number>): Types.Time<0 | 1>
    ["+"](this: Types.Interval<1>, a1: Types.Timestamp<1>): Types.Timestamp<1>
    ["+"](this: Types.Interval<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Timestamp<0 | 1>
    ["+"](this: Types.Interval<number>, a1: Types.Timestamp<number>): Types.Timestamp<0 | 1>
    ["+"](this: Types.Interval<1>, a1: Types.Timestamptz<1>): Types.Timestamptz<1>
    ["+"](this: Types.Interval<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Timestamptz<0 | 1>
    ["+"](this: Types.Interval<number>, a1: Types.Timestamptz<number>): Types.Timestamptz<0 | 1>
    ["+"](this: Types.Interval<1>, a1: Types.Timetz<1>): Types.Timetz<1>
    ["+"](this: Types.Interval<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Timetz<0 | 1>
    ["+"](this: Types.Interval<number>, a1: Types.Timetz<number>): Types.Timetz<0 | 1>
    ["+"](...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Interval<0 | 1>, Types.Date<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Interval<0 | 1>, Types.Time<0 | 1>], ret: Types.Time<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Interval<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Interval<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Interval<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plus(this: Types.Interval<1>, a1: Types.Interval<1>): Types.Interval<1>
    plus(this: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Interval<0 | 1>
    plus(this: Types.Interval<number>, a1: Types.Interval<number>): Types.Interval<0 | 1>
    plus(this: Types.Interval<1>, a1: Types.Date<1>): Types.Timestamp<1>
    plus(this: Types.Interval<0 | 1>, a1: Types.Date<0 | 1>): Types.Timestamp<0 | 1>
    plus(this: Types.Interval<number>, a1: Types.Date<number>): Types.Timestamp<0 | 1>
    plus(this: Types.Interval<1>, a1: Types.Time<1>): Types.Time<1>
    plus(this: Types.Interval<0 | 1>, a1: Types.Time<0 | 1>): Types.Time<0 | 1>
    plus(this: Types.Interval<number>, a1: Types.Time<number>): Types.Time<0 | 1>
    plus(this: Types.Interval<1>, a1: Types.Timestamp<1>): Types.Timestamp<1>
    plus(this: Types.Interval<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Timestamp<0 | 1>
    plus(this: Types.Interval<number>, a1: Types.Timestamp<number>): Types.Timestamp<0 | 1>
    plus(this: Types.Interval<1>, a1: Types.Timestamptz<1>): Types.Timestamptz<1>
    plus(this: Types.Interval<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Timestamptz<0 | 1>
    plus(this: Types.Interval<number>, a1: Types.Timestamptz<number>): Types.Timestamptz<0 | 1>
    plus(this: Types.Interval<1>, a1: Types.Timetz<1>): Types.Timetz<1>
    plus(this: Types.Interval<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Timetz<0 | 1>
    plus(this: Types.Interval<number>, a1: Types.Timetz<number>): Types.Timetz<0 | 1>
    plus(...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Interval<0 | 1>, Types.Date<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Interval<0 | 1>, Types.Time<0 | 1>], ret: Types.Time<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Interval<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Interval<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Interval<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
