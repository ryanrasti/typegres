import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Tid<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Tid<1>;
    static new(v: null): Tid<0>;
    static new(v: Expression): Tid<0 | 1>;
    static new(v: SerializeParam | null | Expression): Tid<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "tid" } 
    asAggregate(): Types.Tid<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Tid<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Tid<1> | undefined {
          return undefined;
        }
       
    bttidcmp(this: Types.Tid<1>, a1: Types.Tid<1>): Types.Int4<1>
    bttidcmp(this: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Int4<0 | 1>
    bttidcmp(this: Types.Tid<number>, a1: Types.Tid<number>): Types.Int4<0 | 1>
    bttidcmp(...args: unknown[]) {
        return sqlFunction("bttidcmp", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashtid(this: Types.Tid<1>): Types.Int4<1>
    hashtid(this: Types.Tid<0 | 1>): Types.Int4<0 | 1>
    hashtid(this: Types.Tid<number>): Types.Int4<0 | 1>
    hashtid(...args: unknown[]) {
        return sqlFunction("hashtid", [{args: [Types.Tid<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashtidextended(this: Types.Tid<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashtidextended(this: Types.Tid<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashtidextended(this: Types.Tid<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashtidextended(...args: unknown[]) {
        return sqlFunction("hashtidextended", [{args: [Types.Tid<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    max(this: Types.Tid<number>): Types.Tid<0 | 1>
    max(...args: unknown[]) {
        return sqlFunction("max", [{args: [Types.Tid<0 | 1>], ret: Types.Tid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tideq(this: Types.Tid<1>, a1: Types.Tid<1>): Types.Bool<1>
    tideq(this: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
    tideq(this: Types.Tid<number>, a1: Types.Tid<number>): Types.Bool<0 | 1>
    tideq(...args: unknown[]) {
        return sqlFunction("tideq", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tidge(this: Types.Tid<1>, a1: Types.Tid<1>): Types.Bool<1>
    tidge(this: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
    tidge(this: Types.Tid<number>, a1: Types.Tid<number>): Types.Bool<0 | 1>
    tidge(...args: unknown[]) {
        return sqlFunction("tidge", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tidgt(this: Types.Tid<1>, a1: Types.Tid<1>): Types.Bool<1>
    tidgt(this: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
    tidgt(this: Types.Tid<number>, a1: Types.Tid<number>): Types.Bool<0 | 1>
    tidgt(...args: unknown[]) {
        return sqlFunction("tidgt", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tidlarger(this: Types.Tid<1>, a1: Types.Tid<1>): Types.Tid<1>
    tidlarger(this: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Tid<0 | 1>
    tidlarger(this: Types.Tid<number>, a1: Types.Tid<number>): Types.Tid<0 | 1>
    tidlarger(...args: unknown[]) {
        return sqlFunction("tidlarger", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Tid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tidle(this: Types.Tid<1>, a1: Types.Tid<1>): Types.Bool<1>
    tidle(this: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
    tidle(this: Types.Tid<number>, a1: Types.Tid<number>): Types.Bool<0 | 1>
    tidle(...args: unknown[]) {
        return sqlFunction("tidle", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tidlt(this: Types.Tid<1>, a1: Types.Tid<1>): Types.Bool<1>
    tidlt(this: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
    tidlt(this: Types.Tid<number>, a1: Types.Tid<number>): Types.Bool<0 | 1>
    tidlt(...args: unknown[]) {
        return sqlFunction("tidlt", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tidne(this: Types.Tid<1>, a1: Types.Tid<1>): Types.Bool<1>
    tidne(this: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
    tidne(this: Types.Tid<number>, a1: Types.Tid<number>): Types.Bool<0 | 1>
    tidne(...args: unknown[]) {
        return sqlFunction("tidne", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tidsmaller(this: Types.Tid<1>, a1: Types.Tid<1>): Types.Tid<1>
    tidsmaller(this: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Tid<0 | 1>
    tidsmaller(this: Types.Tid<number>, a1: Types.Tid<number>): Types.Tid<0 | 1>
    tidsmaller(...args: unknown[]) {
        return sqlFunction("tidsmaller", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Tid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Tid<1>, a1: Types.Tid<1>): Types.Bool<1>
    ["="](this: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Tid<number>, a1: Types.Tid<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Tid<1>, a1: Types.Tid<1>): Types.Bool<1>
    eq(this: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Tid<number>, a1: Types.Tid<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Tid<1>, a1: Types.Tid<1>): Types.Bool<1>
    [">="](this: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Tid<number>, a1: Types.Tid<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Tid<1>, a1: Types.Tid<1>): Types.Bool<1>
    gte(this: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Tid<number>, a1: Types.Tid<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Tid<1>, a1: Types.Tid<1>): Types.Bool<1>
    [">"](this: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Tid<number>, a1: Types.Tid<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Tid<1>, a1: Types.Tid<1>): Types.Bool<1>
    gt(this: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Tid<number>, a1: Types.Tid<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Tid<1>, a1: Types.Tid<1>): Types.Bool<1>
    ["<="](this: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Tid<number>, a1: Types.Tid<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Tid<1>, a1: Types.Tid<1>): Types.Bool<1>
    lte(this: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Tid<number>, a1: Types.Tid<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Tid<1>, a1: Types.Tid<1>): Types.Bool<1>
    ["<"](this: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Tid<number>, a1: Types.Tid<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Tid<1>, a1: Types.Tid<1>): Types.Bool<1>
    lt(this: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Tid<number>, a1: Types.Tid<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Tid<1>, a1: Types.Tid<1>): Types.Bool<1>
    ["<>"](this: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Tid<number>, a1: Types.Tid<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Tid<1>, a1: Types.Tid<1>): Types.Bool<1>
    ne(this: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Tid<number>, a1: Types.Tid<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
