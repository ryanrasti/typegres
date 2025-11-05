import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Oidvector<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Oidvector<1>;
    static new(v: null): Oidvector<0>;
    static new(v: Expression): Oidvector<0 | 1>;
    static new(v: SerializeParam | null | Expression): Oidvector<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "oidvector" } 
    asAggregate(): Types.Oidvector<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Oidvector<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Oidvector<1> | undefined {
          return undefined;
        }
       
    btoidvectorcmp(this: Types.Oidvector<1>, a1: Types.Oidvector<1>): Types.Int4<1>
    btoidvectorcmp(this: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Int4<0 | 1>
    btoidvectorcmp(this: Types.Oidvector<number>, a1: Types.Oidvector<number>): Types.Int4<0 | 1>
    btoidvectorcmp(...args: unknown[]) {
        return sqlFunction("btoidvectorcmp", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashoidvector(this: Types.Oidvector<1>): Types.Int4<1>
    hashoidvector(this: Types.Oidvector<0 | 1>): Types.Int4<0 | 1>
    hashoidvector(this: Types.Oidvector<number>): Types.Int4<0 | 1>
    hashoidvector(...args: unknown[]) {
        return sqlFunction("hashoidvector", [{args: [Types.Oidvector<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashoidvectorextended(this: Types.Oidvector<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashoidvectorextended(this: Types.Oidvector<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashoidvectorextended(this: Types.Oidvector<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashoidvectorextended(...args: unknown[]) {
        return sqlFunction("hashoidvectorextended", [{args: [Types.Oidvector<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    oidvectoreq(this: Types.Oidvector<1>, a1: Types.Oidvector<1>): Types.Bool<1>
    oidvectoreq(this: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
    oidvectoreq(this: Types.Oidvector<number>, a1: Types.Oidvector<number>): Types.Bool<0 | 1>
    oidvectoreq(...args: unknown[]) {
        return sqlFunction("oidvectoreq", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    oidvectorge(this: Types.Oidvector<1>, a1: Types.Oidvector<1>): Types.Bool<1>
    oidvectorge(this: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
    oidvectorge(this: Types.Oidvector<number>, a1: Types.Oidvector<number>): Types.Bool<0 | 1>
    oidvectorge(...args: unknown[]) {
        return sqlFunction("oidvectorge", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    oidvectorgt(this: Types.Oidvector<1>, a1: Types.Oidvector<1>): Types.Bool<1>
    oidvectorgt(this: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
    oidvectorgt(this: Types.Oidvector<number>, a1: Types.Oidvector<number>): Types.Bool<0 | 1>
    oidvectorgt(...args: unknown[]) {
        return sqlFunction("oidvectorgt", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    oidvectorle(this: Types.Oidvector<1>, a1: Types.Oidvector<1>): Types.Bool<1>
    oidvectorle(this: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
    oidvectorle(this: Types.Oidvector<number>, a1: Types.Oidvector<number>): Types.Bool<0 | 1>
    oidvectorle(...args: unknown[]) {
        return sqlFunction("oidvectorle", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    oidvectorlt(this: Types.Oidvector<1>, a1: Types.Oidvector<1>): Types.Bool<1>
    oidvectorlt(this: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
    oidvectorlt(this: Types.Oidvector<number>, a1: Types.Oidvector<number>): Types.Bool<0 | 1>
    oidvectorlt(...args: unknown[]) {
        return sqlFunction("oidvectorlt", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    oidvectorne(this: Types.Oidvector<1>, a1: Types.Oidvector<1>): Types.Bool<1>
    oidvectorne(this: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
    oidvectorne(this: Types.Oidvector<number>, a1: Types.Oidvector<number>): Types.Bool<0 | 1>
    oidvectorne(...args: unknown[]) {
        return sqlFunction("oidvectorne", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    oidvectortypes(this: Types.Oidvector<1>): Types.Text<1>
    oidvectortypes(this: Types.Oidvector<0 | 1>): Types.Text<0 | 1>
    oidvectortypes(this: Types.Oidvector<number>): Types.Text<0 | 1>
    oidvectortypes(...args: unknown[]) {
        return sqlFunction("oidvectortypes", [{args: [Types.Oidvector<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Oidvector<1>, a1: Types.Oidvector<1>): Types.Bool<1>
    ["="](this: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Oidvector<number>, a1: Types.Oidvector<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Oidvector<1>, a1: Types.Oidvector<1>): Types.Bool<1>
    eq(this: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Oidvector<number>, a1: Types.Oidvector<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Oidvector<1>, a1: Types.Oidvector<1>): Types.Bool<1>
    [">="](this: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Oidvector<number>, a1: Types.Oidvector<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Oidvector<1>, a1: Types.Oidvector<1>): Types.Bool<1>
    gte(this: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Oidvector<number>, a1: Types.Oidvector<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Oidvector<1>, a1: Types.Oidvector<1>): Types.Bool<1>
    [">"](this: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Oidvector<number>, a1: Types.Oidvector<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Oidvector<1>, a1: Types.Oidvector<1>): Types.Bool<1>
    gt(this: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Oidvector<number>, a1: Types.Oidvector<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Oidvector<1>, a1: Types.Oidvector<1>): Types.Bool<1>
    ["<="](this: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Oidvector<number>, a1: Types.Oidvector<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Oidvector<1>, a1: Types.Oidvector<1>): Types.Bool<1>
    lte(this: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Oidvector<number>, a1: Types.Oidvector<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Oidvector<1>, a1: Types.Oidvector<1>): Types.Bool<1>
    ["<"](this: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Oidvector<number>, a1: Types.Oidvector<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Oidvector<1>, a1: Types.Oidvector<1>): Types.Bool<1>
    lt(this: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Oidvector<number>, a1: Types.Oidvector<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Oidvector<1>, a1: Types.Oidvector<1>): Types.Bool<1>
    ["<>"](this: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Oidvector<number>, a1: Types.Oidvector<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Oidvector<1>, a1: Types.Oidvector<1>): Types.Bool<1>
    ne(this: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Oidvector<number>, a1: Types.Oidvector<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
