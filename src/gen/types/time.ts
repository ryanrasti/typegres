import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Time<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Time<1>;
    static new(v: null): Time<0>;
    static new(v: Expression): Time<0 | 1>;
    static new(v: SerializeParam | null | Expression): Time<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "time" } 
    asAggregate(): Types.Time<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Time<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Time<1> | undefined {
          return undefined;
        }
       
    inRange(this: Types.Time<1>, a1: Types.Time<1>, a2: Types.Interval<1>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    inRange(this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>, a2: Types.Interval<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(this: Types.Time<number>, a1: Types.Time<number>, a2: Types.Interval<number>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(...args: unknown[]) {
        return sqlFunction("in_range", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>, Types.Interval<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    interval(this: Types.Time<1>): Types.Interval<1>
    interval(this: Types.Time<0 | 1>): Types.Interval<0 | 1>
    interval(this: Types.Time<number>): Types.Interval<0 | 1>
    interval(...args: unknown[]) {
        return sqlFunction("interval", [{args: [Types.Time<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    max(this: Types.Time<number>): Types.Time<0 | 1>
    max(...args: unknown[]) {
        return sqlFunction("max", [{args: [Types.Time<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    overlaps(this: Types.Time<1>, a1: Types.Interval<1>, a2: Types.Time<1>, a3: Types.Interval<1>): Types.Bool<1>
    overlaps(this: Types.Time<0 | 1>, a1: Types.Interval<0 | 1>, a2: Types.Time<0 | 1>, a3: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    overlaps(this: Types.Time<number>, a1: Types.Interval<number>, a2: Types.Time<number>, a3: Types.Interval<number>): Types.Bool<0 | 1>
    overlaps(this: Types.Time<1>, a1: Types.Interval<1>, a2: Types.Time<1>, a3: Types.Time<1>): Types.Bool<1>
    overlaps(this: Types.Time<0 | 1>, a1: Types.Interval<0 | 1>, a2: Types.Time<0 | 1>, a3: Types.Time<0 | 1>): Types.Bool<0 | 1>
    overlaps(this: Types.Time<number>, a1: Types.Interval<number>, a2: Types.Time<number>, a3: Types.Time<number>): Types.Bool<0 | 1>
    overlaps(this: Types.Time<1>, a1: Types.Time<1>, a2: Types.Time<1>, a3: Types.Interval<1>): Types.Bool<1>
    overlaps(this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>, a2: Types.Time<0 | 1>, a3: Types.Interval<0 | 1>): Types.Bool<0 | 1>
    overlaps(this: Types.Time<number>, a1: Types.Time<number>, a2: Types.Time<number>, a3: Types.Interval<number>): Types.Bool<0 | 1>
    overlaps(this: Types.Time<1>, a1: Types.Time<1>, a2: Types.Time<1>, a3: Types.Time<1>): Types.Bool<1>
    overlaps(this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>, a2: Types.Time<0 | 1>, a3: Types.Time<0 | 1>): Types.Bool<0 | 1>
    overlaps(this: Types.Time<number>, a1: Types.Time<number>, a2: Types.Time<number>, a3: Types.Time<number>): Types.Bool<0 | 1>
    overlaps(...args: unknown[]) {
        return sqlFunction("overlaps", [{args: [Types.Time<0 | 1>, Types.Interval<0 | 1>, Types.Time<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Time<0 | 1>, Types.Interval<0 | 1>, Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Time<0 | 1>, Types.Time<0 | 1>, Types.Time<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Time<0 | 1>, Types.Time<0 | 1>, Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    time(this: Types.Time<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Time<1>
    time(this: Types.Time<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Time<0 | 1>
    time(this: Types.Time<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Time<0 | 1>
    time(...args: unknown[]) {
        return sqlFunction("time", [{args: [Types.Time<0 | 1>, Types.Int4<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    timeCmp(this: Types.Time<1>, a1: Types.Time<1>): Types.Int4<1>
    timeCmp(this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Int4<0 | 1>
    timeCmp(this: Types.Time<number>, a1: Types.Time<number>): Types.Int4<0 | 1>
    timeCmp(...args: unknown[]) {
        return sqlFunction("time_cmp", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timeEq(this: Types.Time<1>, a1: Types.Time<1>): Types.Bool<1>
    timeEq(this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
    timeEq(this: Types.Time<number>, a1: Types.Time<number>): Types.Bool<0 | 1>
    timeEq(...args: unknown[]) {
        return sqlFunction("time_eq", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timeGe(this: Types.Time<1>, a1: Types.Time<1>): Types.Bool<1>
    timeGe(this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
    timeGe(this: Types.Time<number>, a1: Types.Time<number>): Types.Bool<0 | 1>
    timeGe(...args: unknown[]) {
        return sqlFunction("time_ge", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timeGt(this: Types.Time<1>, a1: Types.Time<1>): Types.Bool<1>
    timeGt(this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
    timeGt(this: Types.Time<number>, a1: Types.Time<number>): Types.Bool<0 | 1>
    timeGt(...args: unknown[]) {
        return sqlFunction("time_gt", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timeHash(this: Types.Time<1>): Types.Int4<1>
    timeHash(this: Types.Time<0 | 1>): Types.Int4<0 | 1>
    timeHash(this: Types.Time<number>): Types.Int4<0 | 1>
    timeHash(...args: unknown[]) {
        return sqlFunction("time_hash", [{args: [Types.Time<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timeHashExtended(this: Types.Time<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    timeHashExtended(this: Types.Time<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    timeHashExtended(this: Types.Time<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    timeHashExtended(...args: unknown[]) {
        return sqlFunction("time_hash_extended", [{args: [Types.Time<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timeLarger(this: Types.Time<1>, a1: Types.Time<1>): Types.Time<1>
    timeLarger(this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Time<0 | 1>
    timeLarger(this: Types.Time<number>, a1: Types.Time<number>): Types.Time<0 | 1>
    timeLarger(...args: unknown[]) {
        return sqlFunction("time_larger", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timeLe(this: Types.Time<1>, a1: Types.Time<1>): Types.Bool<1>
    timeLe(this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
    timeLe(this: Types.Time<number>, a1: Types.Time<number>): Types.Bool<0 | 1>
    timeLe(...args: unknown[]) {
        return sqlFunction("time_le", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timeLt(this: Types.Time<1>, a1: Types.Time<1>): Types.Bool<1>
    timeLt(this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
    timeLt(this: Types.Time<number>, a1: Types.Time<number>): Types.Bool<0 | 1>
    timeLt(...args: unknown[]) {
        return sqlFunction("time_lt", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timeMiInterval(this: Types.Time<1>, a1: Types.Interval<1>): Types.Time<1>
    timeMiInterval(this: Types.Time<0 | 1>, a1: Types.Interval<0 | 1>): Types.Time<0 | 1>
    timeMiInterval(this: Types.Time<number>, a1: Types.Interval<number>): Types.Time<0 | 1>
    timeMiInterval(...args: unknown[]) {
        return sqlFunction("time_mi_interval", [{args: [Types.Time<0 | 1>, Types.Interval<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timeMiTime(this: Types.Time<1>, a1: Types.Time<1>): Types.Interval<1>
    timeMiTime(this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Interval<0 | 1>
    timeMiTime(this: Types.Time<number>, a1: Types.Time<number>): Types.Interval<0 | 1>
    timeMiTime(...args: unknown[]) {
        return sqlFunction("time_mi_time", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timeNe(this: Types.Time<1>, a1: Types.Time<1>): Types.Bool<1>
    timeNe(this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
    timeNe(this: Types.Time<number>, a1: Types.Time<number>): Types.Bool<0 | 1>
    timeNe(...args: unknown[]) {
        return sqlFunction("time_ne", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timePlInterval(this: Types.Time<1>, a1: Types.Interval<1>): Types.Time<1>
    timePlInterval(this: Types.Time<0 | 1>, a1: Types.Interval<0 | 1>): Types.Time<0 | 1>
    timePlInterval(this: Types.Time<number>, a1: Types.Interval<number>): Types.Time<0 | 1>
    timePlInterval(...args: unknown[]) {
        return sqlFunction("time_pl_interval", [{args: [Types.Time<0 | 1>, Types.Interval<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timeSmaller(this: Types.Time<1>, a1: Types.Time<1>): Types.Time<1>
    timeSmaller(this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Time<0 | 1>
    timeSmaller(this: Types.Time<number>, a1: Types.Time<number>): Types.Time<0 | 1>
    timeSmaller(...args: unknown[]) {
        return sqlFunction("time_smaller", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timedatePl(this: Types.Time<1>, a1: Types.Date<1>): Types.Timestamp<1>
    timedatePl(this: Types.Time<0 | 1>, a1: Types.Date<0 | 1>): Types.Timestamp<0 | 1>
    timedatePl(this: Types.Time<number>, a1: Types.Date<number>): Types.Timestamp<0 | 1>
    timedatePl(...args: unknown[]) {
        return sqlFunction("timedate_pl", [{args: [Types.Time<0 | 1>, Types.Date<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timetz(this: Types.Time<1>): Types.Timetz<1>
    timetz(this: Types.Time<0 | 1>): Types.Timetz<0 | 1>
    timetz(this: Types.Time<number>): Types.Timetz<0 | 1>
    timetz(...args: unknown[]) {
        return sqlFunction("timetz", [{args: [Types.Time<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Time<1>, a1: Types.Time<1>): Types.Bool<1>
    ["="](this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Time<number>, a1: Types.Time<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Time<1>, a1: Types.Time<1>): Types.Bool<1>
    eq(this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Time<number>, a1: Types.Time<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Time<1>, a1: Types.Time<1>): Types.Bool<1>
    [">="](this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Time<number>, a1: Types.Time<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Time<1>, a1: Types.Time<1>): Types.Bool<1>
    gte(this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Time<number>, a1: Types.Time<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Time<1>, a1: Types.Time<1>): Types.Bool<1>
    [">"](this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Time<number>, a1: Types.Time<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Time<1>, a1: Types.Time<1>): Types.Bool<1>
    gt(this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Time<number>, a1: Types.Time<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Time<1>, a1: Types.Time<1>): Types.Bool<1>
    ["<="](this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Time<number>, a1: Types.Time<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Time<1>, a1: Types.Time<1>): Types.Bool<1>
    lte(this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Time<number>, a1: Types.Time<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Time<1>, a1: Types.Time<1>): Types.Bool<1>
    ["<"](this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Time<number>, a1: Types.Time<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Time<1>, a1: Types.Time<1>): Types.Bool<1>
    lt(this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Time<number>, a1: Types.Time<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"](this: Types.Time<1>, a1: Types.Interval<1>): Types.Time<1>
    ["-"](this: Types.Time<0 | 1>, a1: Types.Interval<0 | 1>): Types.Time<0 | 1>
    ["-"](this: Types.Time<number>, a1: Types.Interval<number>): Types.Time<0 | 1>
    ["-"](this: Types.Time<1>, a1: Types.Time<1>): Types.Interval<1>
    ["-"](this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Interval<0 | 1>
    ["-"](this: Types.Time<number>, a1: Types.Time<number>): Types.Interval<0 | 1>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Time<0 | 1>, Types.Interval<0 | 1>], ret: Types.Time<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus(this: Types.Time<1>, a1: Types.Interval<1>): Types.Time<1>
    minus(this: Types.Time<0 | 1>, a1: Types.Interval<0 | 1>): Types.Time<0 | 1>
    minus(this: Types.Time<number>, a1: Types.Interval<number>): Types.Time<0 | 1>
    minus(this: Types.Time<1>, a1: Types.Time<1>): Types.Interval<1>
    minus(this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Interval<0 | 1>
    minus(this: Types.Time<number>, a1: Types.Time<number>): Types.Interval<0 | 1>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Time<0 | 1>, Types.Interval<0 | 1>], ret: Types.Time<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Time<1>, a1: Types.Time<1>): Types.Bool<1>
    ["<>"](this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Time<number>, a1: Types.Time<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Time<1>, a1: Types.Time<1>): Types.Bool<1>
    ne(this: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Time<number>, a1: Types.Time<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["+"](this: Types.Time<1>, a1: Types.Interval<1>): Types.Time<1>
    ["+"](this: Types.Time<0 | 1>, a1: Types.Interval<0 | 1>): Types.Time<0 | 1>
    ["+"](this: Types.Time<number>, a1: Types.Interval<number>): Types.Time<0 | 1>
    ["+"](this: Types.Time<1>, a1: Types.Date<1>): Types.Timestamp<1>
    ["+"](this: Types.Time<0 | 1>, a1: Types.Date<0 | 1>): Types.Timestamp<0 | 1>
    ["+"](this: Types.Time<number>, a1: Types.Date<number>): Types.Timestamp<0 | 1>
    ["+"](...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Time<0 | 1>, Types.Interval<0 | 1>], ret: Types.Time<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Time<0 | 1>, Types.Date<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plus(this: Types.Time<1>, a1: Types.Interval<1>): Types.Time<1>
    plus(this: Types.Time<0 | 1>, a1: Types.Interval<0 | 1>): Types.Time<0 | 1>
    plus(this: Types.Time<number>, a1: Types.Interval<number>): Types.Time<0 | 1>
    plus(this: Types.Time<1>, a1: Types.Date<1>): Types.Timestamp<1>
    plus(this: Types.Time<0 | 1>, a1: Types.Date<0 | 1>): Types.Timestamp<0 | 1>
    plus(this: Types.Time<number>, a1: Types.Date<number>): Types.Timestamp<0 | 1>
    plus(...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Time<0 | 1>, Types.Interval<0 | 1>], ret: Types.Time<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Time<0 | 1>, Types.Date<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
