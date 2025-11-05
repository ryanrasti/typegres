import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Macaddr<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Macaddr<1>;
    static new(v: null): Macaddr<0>;
    static new(v: Expression): Macaddr<0 | 1>;
    static new(v: SerializeParam | null | Expression): Macaddr<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "macaddr" } 
    asAggregate(): Types.Macaddr<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Macaddr<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Macaddr<1> | undefined {
          return undefined;
        }
       
    hashmacaddr(this: Types.Macaddr<1>): Types.Int4<1>
    hashmacaddr(this: Types.Macaddr<0 | 1>): Types.Int4<0 | 1>
    hashmacaddr(this: Types.Macaddr<number>): Types.Int4<0 | 1>
    hashmacaddr(...args: unknown[]) {
        return sqlFunction("hashmacaddr", [{args: [Types.Macaddr<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashmacaddrextended(this: Types.Macaddr<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashmacaddrextended(this: Types.Macaddr<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashmacaddrextended(this: Types.Macaddr<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashmacaddrextended(...args: unknown[]) {
        return sqlFunction("hashmacaddrextended", [{args: [Types.Macaddr<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddr8(this: Types.Macaddr<1>): Types.Macaddr8<1>
    macaddr8(this: Types.Macaddr<0 | 1>): Types.Macaddr8<0 | 1>
    macaddr8(this: Types.Macaddr<number>): Types.Macaddr8<0 | 1>
    macaddr8(...args: unknown[]) {
        return sqlFunction("macaddr8", [{args: [Types.Macaddr<0 | 1>], ret: Types.Macaddr8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddrAnd(this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Macaddr<1>
    macaddrAnd(this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Macaddr<0 | 1>
    macaddrAnd(this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Macaddr<0 | 1>
    macaddrAnd(...args: unknown[]) {
        return sqlFunction("macaddr_and", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Macaddr<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddrCmp(this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Int4<1>
    macaddrCmp(this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Int4<0 | 1>
    macaddrCmp(this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Int4<0 | 1>
    macaddrCmp(...args: unknown[]) {
        return sqlFunction("macaddr_cmp", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddrEq(this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Bool<1>
    macaddrEq(this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
    macaddrEq(this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Bool<0 | 1>
    macaddrEq(...args: unknown[]) {
        return sqlFunction("macaddr_eq", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddrGe(this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Bool<1>
    macaddrGe(this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
    macaddrGe(this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Bool<0 | 1>
    macaddrGe(...args: unknown[]) {
        return sqlFunction("macaddr_ge", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddrGt(this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Bool<1>
    macaddrGt(this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
    macaddrGt(this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Bool<0 | 1>
    macaddrGt(...args: unknown[]) {
        return sqlFunction("macaddr_gt", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddrLe(this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Bool<1>
    macaddrLe(this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
    macaddrLe(this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Bool<0 | 1>
    macaddrLe(...args: unknown[]) {
        return sqlFunction("macaddr_le", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddrLt(this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Bool<1>
    macaddrLt(this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
    macaddrLt(this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Bool<0 | 1>
    macaddrLt(...args: unknown[]) {
        return sqlFunction("macaddr_lt", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddrNe(this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Bool<1>
    macaddrNe(this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
    macaddrNe(this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Bool<0 | 1>
    macaddrNe(...args: unknown[]) {
        return sqlFunction("macaddr_ne", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddrNot(this: Types.Macaddr<1>): Types.Macaddr<1>
    macaddrNot(this: Types.Macaddr<0 | 1>): Types.Macaddr<0 | 1>
    macaddrNot(this: Types.Macaddr<number>): Types.Macaddr<0 | 1>
    macaddrNot(...args: unknown[]) {
        return sqlFunction("macaddr_not", [{args: [Types.Macaddr<0 | 1>], ret: Types.Macaddr<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    macaddrOr(this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Macaddr<1>
    macaddrOr(this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Macaddr<0 | 1>
    macaddrOr(this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Macaddr<0 | 1>
    macaddrOr(...args: unknown[]) {
        return sqlFunction("macaddr_or", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Macaddr<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    trunc(this: Types.Macaddr<1>): Types.Macaddr<1>
    trunc(this: Types.Macaddr<0 | 1>): Types.Macaddr<0 | 1>
    trunc(this: Types.Macaddr<number>): Types.Macaddr<0 | 1>
    trunc(...args: unknown[]) {
        return sqlFunction("trunc", [{args: [Types.Macaddr<0 | 1>], ret: Types.Macaddr<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&"](this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Macaddr<1>
    ["&"](this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Macaddr<0 | 1>
    ["&"](this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Macaddr<0 | 1>
    ["&"](...args: unknown[]) {
        return sqlFunction("&", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Macaddr<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Bool<1>
    ["="](this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Bool<1>
    eq(this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Bool<1>
    [">="](this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Bool<1>
    gte(this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Bool<1>
    [">"](this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Bool<1>
    gt(this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Bool<1>
    ["<="](this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Bool<1>
    lte(this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Bool<1>
    ["<"](this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Bool<1>
    lt(this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Bool<1>
    ["<>"](this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Bool<1>
    ne(this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["|"](this: Types.Macaddr<1>, a1: Types.Macaddr<1>): Types.Macaddr<1>
    ["|"](this: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Macaddr<0 | 1>
    ["|"](this: Types.Macaddr<number>, a1: Types.Macaddr<number>): Types.Macaddr<0 | 1>
    ["|"](...args: unknown[]) {
        return sqlFunction("|", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Macaddr<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
