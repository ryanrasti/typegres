import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Timetz<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Timetz<1>;
    static new(v: null): Timetz<0>;
    static new(v: Expression): Timetz<0 | 1>;
    static new(v: SerializeParam | null | Expression): Timetz<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "timetz" } 
    asAggregate(): Types.Timetz<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Timetz<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Timetz<1> | undefined {
          return undefined;
        }
       
    inRange(this: Types.Timetz<1>, a1: Types.Timetz<1>, a2: Types.Interval<1>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    inRange(this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>, a2: Types.Interval<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(this: Types.Timetz<number>, a1: Types.Timetz<number>, a2: Types.Interval<number>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(...args: unknown[]) {
        return sqlFunction("in_range", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>, Types.Interval<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    max(this: Types.Timetz<number>): Types.Timetz<0 | 1>
    max(...args: unknown[]) {
        return sqlFunction("max", [{args: [Types.Timetz<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    overlaps(this: Types.Timetz<1>, a1: Types.Timetz<1>, a2: Types.Timetz<1>, a3: Types.Timetz<1>): Types.Bool<1>
    overlaps(this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>, a2: Types.Timetz<0 | 1>, a3: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
    overlaps(this: Types.Timetz<number>, a1: Types.Timetz<number>, a2: Types.Timetz<number>, a3: Types.Timetz<number>): Types.Bool<0 | 1>
    overlaps(...args: unknown[]) {
        return sqlFunction("overlaps", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>, Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    time(this: Types.Timetz<1>): Types.Time<1>
    time(this: Types.Timetz<0 | 1>): Types.Time<0 | 1>
    time(this: Types.Timetz<number>): Types.Time<0 | 1>
    time(...args: unknown[]) {
        return sqlFunction("time", [{args: [Types.Timetz<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    timetz(this: Types.Timetz<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Timetz<1>
    timetz(this: Types.Timetz<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Timetz<0 | 1>
    timetz(this: Types.Timetz<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Timetz<0 | 1>
    timetz(...args: unknown[]) {
        return sqlFunction("timetz", [{args: [Types.Timetz<0 | 1>, Types.Int4<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timetzCmp(this: Types.Timetz<1>, a1: Types.Timetz<1>): Types.Int4<1>
    timetzCmp(this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Int4<0 | 1>
    timetzCmp(this: Types.Timetz<number>, a1: Types.Timetz<number>): Types.Int4<0 | 1>
    timetzCmp(...args: unknown[]) {
        return sqlFunction("timetz_cmp", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timetzEq(this: Types.Timetz<1>, a1: Types.Timetz<1>): Types.Bool<1>
    timetzEq(this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
    timetzEq(this: Types.Timetz<number>, a1: Types.Timetz<number>): Types.Bool<0 | 1>
    timetzEq(...args: unknown[]) {
        return sqlFunction("timetz_eq", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timetzGe(this: Types.Timetz<1>, a1: Types.Timetz<1>): Types.Bool<1>
    timetzGe(this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
    timetzGe(this: Types.Timetz<number>, a1: Types.Timetz<number>): Types.Bool<0 | 1>
    timetzGe(...args: unknown[]) {
        return sqlFunction("timetz_ge", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timetzGt(this: Types.Timetz<1>, a1: Types.Timetz<1>): Types.Bool<1>
    timetzGt(this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
    timetzGt(this: Types.Timetz<number>, a1: Types.Timetz<number>): Types.Bool<0 | 1>
    timetzGt(...args: unknown[]) {
        return sqlFunction("timetz_gt", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timetzHash(this: Types.Timetz<1>): Types.Int4<1>
    timetzHash(this: Types.Timetz<0 | 1>): Types.Int4<0 | 1>
    timetzHash(this: Types.Timetz<number>): Types.Int4<0 | 1>
    timetzHash(...args: unknown[]) {
        return sqlFunction("timetz_hash", [{args: [Types.Timetz<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timetzHashExtended(this: Types.Timetz<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    timetzHashExtended(this: Types.Timetz<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    timetzHashExtended(this: Types.Timetz<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    timetzHashExtended(...args: unknown[]) {
        return sqlFunction("timetz_hash_extended", [{args: [Types.Timetz<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timetzLarger(this: Types.Timetz<1>, a1: Types.Timetz<1>): Types.Timetz<1>
    timetzLarger(this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Timetz<0 | 1>
    timetzLarger(this: Types.Timetz<number>, a1: Types.Timetz<number>): Types.Timetz<0 | 1>
    timetzLarger(...args: unknown[]) {
        return sqlFunction("timetz_larger", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timetzLe(this: Types.Timetz<1>, a1: Types.Timetz<1>): Types.Bool<1>
    timetzLe(this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
    timetzLe(this: Types.Timetz<number>, a1: Types.Timetz<number>): Types.Bool<0 | 1>
    timetzLe(...args: unknown[]) {
        return sqlFunction("timetz_le", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timetzLt(this: Types.Timetz<1>, a1: Types.Timetz<1>): Types.Bool<1>
    timetzLt(this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
    timetzLt(this: Types.Timetz<number>, a1: Types.Timetz<number>): Types.Bool<0 | 1>
    timetzLt(...args: unknown[]) {
        return sqlFunction("timetz_lt", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timetzMiInterval(this: Types.Timetz<1>, a1: Types.Interval<1>): Types.Timetz<1>
    timetzMiInterval(this: Types.Timetz<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timetz<0 | 1>
    timetzMiInterval(this: Types.Timetz<number>, a1: Types.Interval<number>): Types.Timetz<0 | 1>
    timetzMiInterval(...args: unknown[]) {
        return sqlFunction("timetz_mi_interval", [{args: [Types.Timetz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timetzNe(this: Types.Timetz<1>, a1: Types.Timetz<1>): Types.Bool<1>
    timetzNe(this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
    timetzNe(this: Types.Timetz<number>, a1: Types.Timetz<number>): Types.Bool<0 | 1>
    timetzNe(...args: unknown[]) {
        return sqlFunction("timetz_ne", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timetzPlInterval(this: Types.Timetz<1>, a1: Types.Interval<1>): Types.Timetz<1>
    timetzPlInterval(this: Types.Timetz<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timetz<0 | 1>
    timetzPlInterval(this: Types.Timetz<number>, a1: Types.Interval<number>): Types.Timetz<0 | 1>
    timetzPlInterval(...args: unknown[]) {
        return sqlFunction("timetz_pl_interval", [{args: [Types.Timetz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timetzSmaller(this: Types.Timetz<1>, a1: Types.Timetz<1>): Types.Timetz<1>
    timetzSmaller(this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Timetz<0 | 1>
    timetzSmaller(this: Types.Timetz<number>, a1: Types.Timetz<number>): Types.Timetz<0 | 1>
    timetzSmaller(...args: unknown[]) {
        return sqlFunction("timetz_smaller", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timetzdatePl(this: Types.Timetz<1>, a1: Types.Date<1>): Types.Timestamptz<1>
    timetzdatePl(this: Types.Timetz<0 | 1>, a1: Types.Date<0 | 1>): Types.Timestamptz<0 | 1>
    timetzdatePl(this: Types.Timetz<number>, a1: Types.Date<number>): Types.Timestamptz<0 | 1>
    timetzdatePl(...args: unknown[]) {
        return sqlFunction("timetzdate_pl", [{args: [Types.Timetz<0 | 1>, Types.Date<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    timezone(this: Types.Timetz<1>): Types.Timetz<1>
    timezone(this: Types.Timetz<0 | 1>): Types.Timetz<0 | 1>
    timezone(this: Types.Timetz<number>): Types.Timetz<0 | 1>
    timezone(...args: unknown[]) {
        return sqlFunction("timezone", [{args: [Types.Timetz<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Timetz<1>, a1: Types.Timetz<1>): Types.Bool<1>
    ["="](this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Timetz<number>, a1: Types.Timetz<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Timetz<1>, a1: Types.Timetz<1>): Types.Bool<1>
    eq(this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Timetz<number>, a1: Types.Timetz<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Timetz<1>, a1: Types.Timetz<1>): Types.Bool<1>
    [">="](this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Timetz<number>, a1: Types.Timetz<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Timetz<1>, a1: Types.Timetz<1>): Types.Bool<1>
    gte(this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Timetz<number>, a1: Types.Timetz<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Timetz<1>, a1: Types.Timetz<1>): Types.Bool<1>
    [">"](this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Timetz<number>, a1: Types.Timetz<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Timetz<1>, a1: Types.Timetz<1>): Types.Bool<1>
    gt(this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Timetz<number>, a1: Types.Timetz<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Timetz<1>, a1: Types.Timetz<1>): Types.Bool<1>
    ["<="](this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Timetz<number>, a1: Types.Timetz<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Timetz<1>, a1: Types.Timetz<1>): Types.Bool<1>
    lte(this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Timetz<number>, a1: Types.Timetz<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Timetz<1>, a1: Types.Timetz<1>): Types.Bool<1>
    ["<"](this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Timetz<number>, a1: Types.Timetz<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Timetz<1>, a1: Types.Timetz<1>): Types.Bool<1>
    lt(this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Timetz<number>, a1: Types.Timetz<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"](this: Types.Timetz<1>, a1: Types.Interval<1>): Types.Timetz<1>
    ["-"](this: Types.Timetz<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timetz<0 | 1>
    ["-"](this: Types.Timetz<number>, a1: Types.Interval<number>): Types.Timetz<0 | 1>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Timetz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus(this: Types.Timetz<1>, a1: Types.Interval<1>): Types.Timetz<1>
    minus(this: Types.Timetz<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timetz<0 | 1>
    minus(this: Types.Timetz<number>, a1: Types.Interval<number>): Types.Timetz<0 | 1>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Timetz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Timetz<1>, a1: Types.Timetz<1>): Types.Bool<1>
    ["<>"](this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Timetz<number>, a1: Types.Timetz<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Timetz<1>, a1: Types.Timetz<1>): Types.Bool<1>
    ne(this: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Timetz<number>, a1: Types.Timetz<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["+"](this: Types.Timetz<1>, a1: Types.Interval<1>): Types.Timetz<1>
    ["+"](this: Types.Timetz<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timetz<0 | 1>
    ["+"](this: Types.Timetz<number>, a1: Types.Interval<number>): Types.Timetz<0 | 1>
    ["+"](this: Types.Timetz<1>, a1: Types.Date<1>): Types.Timestamptz<1>
    ["+"](this: Types.Timetz<0 | 1>, a1: Types.Date<0 | 1>): Types.Timestamptz<0 | 1>
    ["+"](this: Types.Timetz<number>, a1: Types.Date<number>): Types.Timestamptz<0 | 1>
    ["+"](...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Timetz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timetz<0 | 1>, Types.Date<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plus(this: Types.Timetz<1>, a1: Types.Interval<1>): Types.Timetz<1>
    plus(this: Types.Timetz<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timetz<0 | 1>
    plus(this: Types.Timetz<number>, a1: Types.Interval<number>): Types.Timetz<0 | 1>
    plus(this: Types.Timetz<1>, a1: Types.Date<1>): Types.Timestamptz<1>
    plus(this: Types.Timetz<0 | 1>, a1: Types.Date<0 | 1>): Types.Timestamptz<0 | 1>
    plus(this: Types.Timetz<number>, a1: Types.Date<number>): Types.Timestamptz<0 | 1>
    plus(...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Timetz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Timetz<0 | 1>, Types.Date<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
