import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Varbit<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Varbit<1>;
    static new(v: null): Varbit<0>;
    static new(v: Expression): Varbit<0 | 1>;
    static new(v: SerializeParam | null | Expression): Varbit<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "varbit" } 
    asAggregate(): Types.Varbit<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Varbit<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Varbit<1> | undefined {
          return undefined;
        }
       
    bitcat(this: Types.Varbit<1>, a1: Types.Varbit<1>): Types.Varbit<1>
    bitcat(this: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Varbit<0 | 1>
    bitcat(this: Types.Varbit<number>, a1: Types.Varbit<number>): Types.Varbit<0 | 1>
    bitcat(...args: unknown[]) {
        return sqlFunction("bitcat", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Varbit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    varbit(this: Types.Varbit<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Varbit<1>
    varbit(this: Types.Varbit<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Varbit<0 | 1>
    varbit(this: Types.Varbit<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Varbit<0 | 1>
    varbit(...args: unknown[]) {
        return sqlFunction("varbit", [{args: [Types.Varbit<0 | 1>, Types.Int4<0 | 1>, Types.Bool<0 | 1>], ret: Types.Varbit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    varbitcmp(this: Types.Varbit<1>, a1: Types.Varbit<1>): Types.Int4<1>
    varbitcmp(this: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Int4<0 | 1>
    varbitcmp(this: Types.Varbit<number>, a1: Types.Varbit<number>): Types.Int4<0 | 1>
    varbitcmp(...args: unknown[]) {
        return sqlFunction("varbitcmp", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    varbiteq(this: Types.Varbit<1>, a1: Types.Varbit<1>): Types.Bool<1>
    varbiteq(this: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
    varbiteq(this: Types.Varbit<number>, a1: Types.Varbit<number>): Types.Bool<0 | 1>
    varbiteq(...args: unknown[]) {
        return sqlFunction("varbiteq", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    varbitge(this: Types.Varbit<1>, a1: Types.Varbit<1>): Types.Bool<1>
    varbitge(this: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
    varbitge(this: Types.Varbit<number>, a1: Types.Varbit<number>): Types.Bool<0 | 1>
    varbitge(...args: unknown[]) {
        return sqlFunction("varbitge", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    varbitgt(this: Types.Varbit<1>, a1: Types.Varbit<1>): Types.Bool<1>
    varbitgt(this: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
    varbitgt(this: Types.Varbit<number>, a1: Types.Varbit<number>): Types.Bool<0 | 1>
    varbitgt(...args: unknown[]) {
        return sqlFunction("varbitgt", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    varbitle(this: Types.Varbit<1>, a1: Types.Varbit<1>): Types.Bool<1>
    varbitle(this: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
    varbitle(this: Types.Varbit<number>, a1: Types.Varbit<number>): Types.Bool<0 | 1>
    varbitle(...args: unknown[]) {
        return sqlFunction("varbitle", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    varbitlt(this: Types.Varbit<1>, a1: Types.Varbit<1>): Types.Bool<1>
    varbitlt(this: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
    varbitlt(this: Types.Varbit<number>, a1: Types.Varbit<number>): Types.Bool<0 | 1>
    varbitlt(...args: unknown[]) {
        return sqlFunction("varbitlt", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    varbitne(this: Types.Varbit<1>, a1: Types.Varbit<1>): Types.Bool<1>
    varbitne(this: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
    varbitne(this: Types.Varbit<number>, a1: Types.Varbit<number>): Types.Bool<0 | 1>
    varbitne(...args: unknown[]) {
        return sqlFunction("varbitne", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Varbit<1>, a1: Types.Varbit<1>): Types.Bool<1>
    ["="](this: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Varbit<number>, a1: Types.Varbit<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Varbit<1>, a1: Types.Varbit<1>): Types.Bool<1>
    eq(this: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Varbit<number>, a1: Types.Varbit<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Varbit<1>, a1: Types.Varbit<1>): Types.Bool<1>
    [">="](this: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Varbit<number>, a1: Types.Varbit<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Varbit<1>, a1: Types.Varbit<1>): Types.Bool<1>
    gte(this: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Varbit<number>, a1: Types.Varbit<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Varbit<1>, a1: Types.Varbit<1>): Types.Bool<1>
    [">"](this: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Varbit<number>, a1: Types.Varbit<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Varbit<1>, a1: Types.Varbit<1>): Types.Bool<1>
    gt(this: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Varbit<number>, a1: Types.Varbit<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Varbit<1>, a1: Types.Varbit<1>): Types.Bool<1>
    ["<="](this: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Varbit<number>, a1: Types.Varbit<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Varbit<1>, a1: Types.Varbit<1>): Types.Bool<1>
    lte(this: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Varbit<number>, a1: Types.Varbit<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Varbit<1>, a1: Types.Varbit<1>): Types.Bool<1>
    ["<"](this: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Varbit<number>, a1: Types.Varbit<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Varbit<1>, a1: Types.Varbit<1>): Types.Bool<1>
    lt(this: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Varbit<number>, a1: Types.Varbit<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Varbit<1>, a1: Types.Varbit<1>): Types.Bool<1>
    ["<>"](this: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Varbit<number>, a1: Types.Varbit<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Varbit<1>, a1: Types.Varbit<1>): Types.Bool<1>
    ne(this: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Varbit<number>, a1: Types.Varbit<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
