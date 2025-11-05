import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Macaddr8<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Macaddr8<1>;
    static new(v: null): Macaddr8<0>;
    static new(v: Expression): Macaddr8<0 | 1>;
    static new(v: SerializeParam | null | Expression): Macaddr8<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "macaddr8" } 
    asAggregate(): Types.Macaddr8<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Macaddr8<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Macaddr8<1> | undefined {
          return undefined;
        }
       
    hashmacaddr8(this: Types.Macaddr8<1>): Types.Int4<1>
    hashmacaddr8(this: Types.Macaddr8<0 | 1>): Types.Int4<0 | 1>
    hashmacaddr8(this: Types.Macaddr8<number>): Types.Int4<0 | 1>
    hashmacaddr8(...args: unknown[]) {
        return sqlFunction("hashmacaddr8", [{args: [Types.Macaddr8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashmacaddr8Extended(this: Types.Macaddr8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashmacaddr8Extended(this: Types.Macaddr8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashmacaddr8Extended(this: Types.Macaddr8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashmacaddr8Extended(...args: unknown[]) {
        return sqlFunction("hashmacaddr8extended", [{args: [Types.Macaddr8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddr(this: Types.Macaddr8<1>): Types.Macaddr<1>
    macaddr(this: Types.Macaddr8<0 | 1>): Types.Macaddr<0 | 1>
    macaddr(this: Types.Macaddr8<number>): Types.Macaddr<0 | 1>
    macaddr(...args: unknown[]) {
        return sqlFunction("macaddr", [{args: [Types.Macaddr8<0 | 1>], ret: Types.Macaddr<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddr8And(this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Macaddr8<1>
    macaddr8And(this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Macaddr8<0 | 1>
    macaddr8And(this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Macaddr8<0 | 1>
    macaddr8And(...args: unknown[]) {
        return sqlFunction("macaddr8_and", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Macaddr8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddr8Cmp(this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Int4<1>
    macaddr8Cmp(this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Int4<0 | 1>
    macaddr8Cmp(this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Int4<0 | 1>
    macaddr8Cmp(...args: unknown[]) {
        return sqlFunction("macaddr8_cmp", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddr8Eq(this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Bool<1>
    macaddr8Eq(this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
    macaddr8Eq(this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Bool<0 | 1>
    macaddr8Eq(...args: unknown[]) {
        return sqlFunction("macaddr8_eq", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddr8Ge(this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Bool<1>
    macaddr8Ge(this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
    macaddr8Ge(this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Bool<0 | 1>
    macaddr8Ge(...args: unknown[]) {
        return sqlFunction("macaddr8_ge", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddr8Gt(this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Bool<1>
    macaddr8Gt(this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
    macaddr8Gt(this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Bool<0 | 1>
    macaddr8Gt(...args: unknown[]) {
        return sqlFunction("macaddr8_gt", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddr8Le(this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Bool<1>
    macaddr8Le(this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
    macaddr8Le(this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Bool<0 | 1>
    macaddr8Le(...args: unknown[]) {
        return sqlFunction("macaddr8_le", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddr8Lt(this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Bool<1>
    macaddr8Lt(this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
    macaddr8Lt(this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Bool<0 | 1>
    macaddr8Lt(...args: unknown[]) {
        return sqlFunction("macaddr8_lt", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddr8Ne(this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Bool<1>
    macaddr8Ne(this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
    macaddr8Ne(this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Bool<0 | 1>
    macaddr8Ne(...args: unknown[]) {
        return sqlFunction("macaddr8_ne", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddr8Not(this: Types.Macaddr8<1>): Types.Macaddr8<1>
    macaddr8Not(this: Types.Macaddr8<0 | 1>): Types.Macaddr8<0 | 1>
    macaddr8Not(this: Types.Macaddr8<number>): Types.Macaddr8<0 | 1>
    macaddr8Not(...args: unknown[]) {
        return sqlFunction("macaddr8_not", [{args: [Types.Macaddr8<0 | 1>], ret: Types.Macaddr8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddr8Or(this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Macaddr8<1>
    macaddr8Or(this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Macaddr8<0 | 1>
    macaddr8Or(this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Macaddr8<0 | 1>
    macaddr8Or(...args: unknown[]) {
        return sqlFunction("macaddr8_or", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Macaddr8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddr8Set7Bit(this: Types.Macaddr8<1>): Types.Macaddr8<1>
    macaddr8Set7Bit(this: Types.Macaddr8<0 | 1>): Types.Macaddr8<0 | 1>
    macaddr8Set7Bit(this: Types.Macaddr8<number>): Types.Macaddr8<0 | 1>
    macaddr8Set7Bit(...args: unknown[]) {
        return sqlFunction("macaddr8_set7bit", [{args: [Types.Macaddr8<0 | 1>], ret: Types.Macaddr8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    trunc(this: Types.Macaddr8<1>): Types.Macaddr8<1>
    trunc(this: Types.Macaddr8<0 | 1>): Types.Macaddr8<0 | 1>
    trunc(this: Types.Macaddr8<number>): Types.Macaddr8<0 | 1>
    trunc(...args: unknown[]) {
        return sqlFunction("trunc", [{args: [Types.Macaddr8<0 | 1>], ret: Types.Macaddr8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&"](this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Macaddr8<1>
    ["&"](this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Macaddr8<0 | 1>
    ["&"](this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Macaddr8<0 | 1>
    ["&"](...args: unknown[]) {
        return sqlFunction("&", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Macaddr8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Bool<1>
    ["="](this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Bool<1>
    eq(this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Bool<1>
    [">="](this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Bool<1>
    gte(this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Bool<1>
    [">"](this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Bool<1>
    gt(this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Bool<1>
    ["<="](this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Bool<1>
    lte(this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Bool<1>
    ["<"](this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Bool<1>
    lt(this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Bool<1>
    ["<>"](this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Bool<1>
    ne(this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["|"](this: Types.Macaddr8<1>, a1: Types.Macaddr8<1>): Types.Macaddr8<1>
    ["|"](this: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Macaddr8<0 | 1>
    ["|"](this: Types.Macaddr8<number>, a1: Types.Macaddr8<number>): Types.Macaddr8<0 | 1>
    ["|"](...args: unknown[]) {
        return sqlFunction("|", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Macaddr8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
