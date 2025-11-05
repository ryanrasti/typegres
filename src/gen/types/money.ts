import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Money<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Money<1>;
    static new(v: null): Money<0>;
    static new(v: Expression): Money<0 | 1>;
    static new(v: SerializeParam | null | Expression): Money<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "money" } 
    asAggregate(): Types.Money<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Money<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Money<1> | undefined {
          return undefined;
        }
       
    cashCmp(this: Types.Money<1>, a1: Types.Money<1>): Types.Int4<1>
    cashCmp(this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Int4<0 | 1>
    cashCmp(this: Types.Money<number>, a1: Types.Money<number>): Types.Int4<0 | 1>
    cashCmp(...args: unknown[]) {
        return sqlFunction("cash_cmp", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashDivCash(this: Types.Money<1>, a1: Types.Money<1>): Types.Float8<1>
    cashDivCash(this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Float8<0 | 1>
    cashDivCash(this: Types.Money<number>, a1: Types.Money<number>): Types.Float8<0 | 1>
    cashDivCash(...args: unknown[]) {
        return sqlFunction("cash_div_cash", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashDivFlt4(this: Types.Money<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Money<1>
    cashDivFlt4(this: Types.Money<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Money<0 | 1>
    cashDivFlt4(this: Types.Money<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Money<0 | 1>
    cashDivFlt4(...args: unknown[]) {
        return sqlFunction("cash_div_flt4", [{args: [Types.Money<0 | 1>, Types.Float4<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashDivFlt8(this: Types.Money<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Money<1>
    cashDivFlt8(this: Types.Money<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Money<0 | 1>
    cashDivFlt8(this: Types.Money<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Money<0 | 1>
    cashDivFlt8(...args: unknown[]) {
        return sqlFunction("cash_div_flt8", [{args: [Types.Money<0 | 1>, Types.Float8<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashDivInt2(this: Types.Money<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Money<1>
    cashDivInt2(this: Types.Money<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Money<0 | 1>
    cashDivInt2(this: Types.Money<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Money<0 | 1>
    cashDivInt2(...args: unknown[]) {
        return sqlFunction("cash_div_int2", [{args: [Types.Money<0 | 1>, Types.Int2<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashDivInt4(this: Types.Money<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Money<1>
    cashDivInt4(this: Types.Money<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Money<0 | 1>
    cashDivInt4(this: Types.Money<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Money<0 | 1>
    cashDivInt4(...args: unknown[]) {
        return sqlFunction("cash_div_int4", [{args: [Types.Money<0 | 1>, Types.Int4<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashDivInt8(this: Types.Money<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Money<1>
    cashDivInt8(this: Types.Money<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Money<0 | 1>
    cashDivInt8(this: Types.Money<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Money<0 | 1>
    cashDivInt8(...args: unknown[]) {
        return sqlFunction("cash_div_int8", [{args: [Types.Money<0 | 1>, Types.Int8<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashEq(this: Types.Money<1>, a1: Types.Money<1>): Types.Bool<1>
    cashEq(this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
    cashEq(this: Types.Money<number>, a1: Types.Money<number>): Types.Bool<0 | 1>
    cashEq(...args: unknown[]) {
        return sqlFunction("cash_eq", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashGe(this: Types.Money<1>, a1: Types.Money<1>): Types.Bool<1>
    cashGe(this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
    cashGe(this: Types.Money<number>, a1: Types.Money<number>): Types.Bool<0 | 1>
    cashGe(...args: unknown[]) {
        return sqlFunction("cash_ge", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashGt(this: Types.Money<1>, a1: Types.Money<1>): Types.Bool<1>
    cashGt(this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
    cashGt(this: Types.Money<number>, a1: Types.Money<number>): Types.Bool<0 | 1>
    cashGt(...args: unknown[]) {
        return sqlFunction("cash_gt", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashLe(this: Types.Money<1>, a1: Types.Money<1>): Types.Bool<1>
    cashLe(this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
    cashLe(this: Types.Money<number>, a1: Types.Money<number>): Types.Bool<0 | 1>
    cashLe(...args: unknown[]) {
        return sqlFunction("cash_le", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashLt(this: Types.Money<1>, a1: Types.Money<1>): Types.Bool<1>
    cashLt(this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
    cashLt(this: Types.Money<number>, a1: Types.Money<number>): Types.Bool<0 | 1>
    cashLt(...args: unknown[]) {
        return sqlFunction("cash_lt", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashMi(this: Types.Money<1>, a1: Types.Money<1>): Types.Money<1>
    cashMi(this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    cashMi(this: Types.Money<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    cashMi(...args: unknown[]) {
        return sqlFunction("cash_mi", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashMulFlt4(this: Types.Money<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Money<1>
    cashMulFlt4(this: Types.Money<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Money<0 | 1>
    cashMulFlt4(this: Types.Money<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Money<0 | 1>
    cashMulFlt4(...args: unknown[]) {
        return sqlFunction("cash_mul_flt4", [{args: [Types.Money<0 | 1>, Types.Float4<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashMulFlt8(this: Types.Money<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Money<1>
    cashMulFlt8(this: Types.Money<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Money<0 | 1>
    cashMulFlt8(this: Types.Money<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Money<0 | 1>
    cashMulFlt8(...args: unknown[]) {
        return sqlFunction("cash_mul_flt8", [{args: [Types.Money<0 | 1>, Types.Float8<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashMulInt2(this: Types.Money<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Money<1>
    cashMulInt2(this: Types.Money<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Money<0 | 1>
    cashMulInt2(this: Types.Money<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Money<0 | 1>
    cashMulInt2(...args: unknown[]) {
        return sqlFunction("cash_mul_int2", [{args: [Types.Money<0 | 1>, Types.Int2<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashMulInt4(this: Types.Money<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Money<1>
    cashMulInt4(this: Types.Money<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Money<0 | 1>
    cashMulInt4(this: Types.Money<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Money<0 | 1>
    cashMulInt4(...args: unknown[]) {
        return sqlFunction("cash_mul_int4", [{args: [Types.Money<0 | 1>, Types.Int4<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashMulInt8(this: Types.Money<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Money<1>
    cashMulInt8(this: Types.Money<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Money<0 | 1>
    cashMulInt8(this: Types.Money<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Money<0 | 1>
    cashMulInt8(...args: unknown[]) {
        return sqlFunction("cash_mul_int8", [{args: [Types.Money<0 | 1>, Types.Int8<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashNe(this: Types.Money<1>, a1: Types.Money<1>): Types.Bool<1>
    cashNe(this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
    cashNe(this: Types.Money<number>, a1: Types.Money<number>): Types.Bool<0 | 1>
    cashNe(...args: unknown[]) {
        return sqlFunction("cash_ne", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashPl(this: Types.Money<1>, a1: Types.Money<1>): Types.Money<1>
    cashPl(this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    cashPl(this: Types.Money<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    cashPl(...args: unknown[]) {
        return sqlFunction("cash_pl", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashWords(this: Types.Money<1>): Types.Text<1>
    cashWords(this: Types.Money<0 | 1>): Types.Text<0 | 1>
    cashWords(this: Types.Money<number>): Types.Text<0 | 1>
    cashWords(...args: unknown[]) {
        return sqlFunction("cash_words", [{args: [Types.Money<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashlarger(this: Types.Money<1>, a1: Types.Money<1>): Types.Money<1>
    cashlarger(this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    cashlarger(this: Types.Money<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    cashlarger(...args: unknown[]) {
        return sqlFunction("cashlarger", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cashsmaller(this: Types.Money<1>, a1: Types.Money<1>): Types.Money<1>
    cashsmaller(this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    cashsmaller(this: Types.Money<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    cashsmaller(...args: unknown[]) {
        return sqlFunction("cashsmaller", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    max(this: Types.Money<number>): Types.Money<0 | 1>
    max(...args: unknown[]) {
        return sqlFunction("max", [{args: [Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numeric(this: Types.Money<1>): Types.Numeric<1>
    numeric(this: Types.Money<0 | 1>): Types.Numeric<0 | 1>
    numeric(this: Types.Money<number>): Types.Numeric<0 | 1>
    numeric(...args: unknown[]) {
        return sqlFunction("numeric", [{args: [Types.Money<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    sum(this: Types.Money<number>): Types.Money<0 | 1>
    sum(...args: unknown[]) {
        return sqlFunction("sum", [{args: [Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["/"](this: Types.Money<1>, a1: Types.Money<1>): Types.Float8<1>
    ["/"](this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Float8<0 | 1>
    ["/"](this: Types.Money<number>, a1: Types.Money<number>): Types.Float8<0 | 1>
    ["/"](this: Types.Money<1>, a1: Types.Float4<1>): Types.Money<1>
    ["/"](this: Types.Money<0 | 1>, a1: Types.Float4<0 | 1>): Types.Money<0 | 1>
    ["/"](this: Types.Money<number>, a1: Types.Float4<number>): Types.Money<0 | 1>
    ["/"](this: Types.Money<1>, a1: Types.Float8<1>): Types.Money<1>
    ["/"](this: Types.Money<0 | 1>, a1: Types.Float8<0 | 1>): Types.Money<0 | 1>
    ["/"](this: Types.Money<number>, a1: Types.Float8<number>): Types.Money<0 | 1>
    ["/"](this: Types.Money<1>, a1: Types.Int2<1>): Types.Money<1>
    ["/"](this: Types.Money<0 | 1>, a1: Types.Int2<0 | 1>): Types.Money<0 | 1>
    ["/"](this: Types.Money<number>, a1: Types.Int2<number>): Types.Money<0 | 1>
    ["/"](this: Types.Money<1>, a1: Types.Int4<1>): Types.Money<1>
    ["/"](this: Types.Money<0 | 1>, a1: Types.Int4<0 | 1>): Types.Money<0 | 1>
    ["/"](this: Types.Money<number>, a1: Types.Int4<number>): Types.Money<0 | 1>
    ["/"](this: Types.Money<1>, a1: Types.Int8<1>): Types.Money<1>
    ["/"](this: Types.Money<0 | 1>, a1: Types.Int8<0 | 1>): Types.Money<0 | 1>
    ["/"](this: Types.Money<number>, a1: Types.Int8<number>): Types.Money<0 | 1>
    ["/"](...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Money<0 | 1>, Types.Float4<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Money<0 | 1>, Types.Float8<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Money<0 | 1>, Types.Int2<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Money<0 | 1>, Types.Int4<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Money<0 | 1>, Types.Int8<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    divide(this: Types.Money<1>, a1: Types.Money<1>): Types.Float8<1>
    divide(this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Float8<0 | 1>
    divide(this: Types.Money<number>, a1: Types.Money<number>): Types.Float8<0 | 1>
    divide(this: Types.Money<1>, a1: Types.Float4<1>): Types.Money<1>
    divide(this: Types.Money<0 | 1>, a1: Types.Float4<0 | 1>): Types.Money<0 | 1>
    divide(this: Types.Money<number>, a1: Types.Float4<number>): Types.Money<0 | 1>
    divide(this: Types.Money<1>, a1: Types.Float8<1>): Types.Money<1>
    divide(this: Types.Money<0 | 1>, a1: Types.Float8<0 | 1>): Types.Money<0 | 1>
    divide(this: Types.Money<number>, a1: Types.Float8<number>): Types.Money<0 | 1>
    divide(this: Types.Money<1>, a1: Types.Int2<1>): Types.Money<1>
    divide(this: Types.Money<0 | 1>, a1: Types.Int2<0 | 1>): Types.Money<0 | 1>
    divide(this: Types.Money<number>, a1: Types.Int2<number>): Types.Money<0 | 1>
    divide(this: Types.Money<1>, a1: Types.Int4<1>): Types.Money<1>
    divide(this: Types.Money<0 | 1>, a1: Types.Int4<0 | 1>): Types.Money<0 | 1>
    divide(this: Types.Money<number>, a1: Types.Int4<number>): Types.Money<0 | 1>
    divide(this: Types.Money<1>, a1: Types.Int8<1>): Types.Money<1>
    divide(this: Types.Money<0 | 1>, a1: Types.Int8<0 | 1>): Types.Money<0 | 1>
    divide(this: Types.Money<number>, a1: Types.Int8<number>): Types.Money<0 | 1>
    divide(...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Money<0 | 1>, Types.Float4<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Money<0 | 1>, Types.Float8<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Money<0 | 1>, Types.Int2<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Money<0 | 1>, Types.Int4<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Money<0 | 1>, Types.Int8<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Money<1>, a1: Types.Money<1>): Types.Bool<1>
    ["="](this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Money<number>, a1: Types.Money<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Money<1>, a1: Types.Money<1>): Types.Bool<1>
    eq(this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Money<number>, a1: Types.Money<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Money<1>, a1: Types.Money<1>): Types.Bool<1>
    [">="](this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Money<number>, a1: Types.Money<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Money<1>, a1: Types.Money<1>): Types.Bool<1>
    gte(this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Money<number>, a1: Types.Money<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Money<1>, a1: Types.Money<1>): Types.Bool<1>
    [">"](this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Money<number>, a1: Types.Money<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Money<1>, a1: Types.Money<1>): Types.Bool<1>
    gt(this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Money<number>, a1: Types.Money<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Money<1>, a1: Types.Money<1>): Types.Bool<1>
    ["<="](this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Money<number>, a1: Types.Money<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Money<1>, a1: Types.Money<1>): Types.Bool<1>
    lte(this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Money<number>, a1: Types.Money<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Money<1>, a1: Types.Money<1>): Types.Bool<1>
    ["<"](this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Money<number>, a1: Types.Money<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Money<1>, a1: Types.Money<1>): Types.Bool<1>
    lt(this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Money<number>, a1: Types.Money<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"](this: Types.Money<1>, a1: Types.Money<1>): Types.Money<1>
    ["-"](this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    ["-"](this: Types.Money<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus(this: Types.Money<1>, a1: Types.Money<1>): Types.Money<1>
    minus(this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    minus(this: Types.Money<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["*"](this: Types.Money<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Money<1>
    ["*"](this: Types.Money<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Money<0 | 1>
    ["*"](this: Types.Money<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Money<0 | 1>
    ["*"](this: Types.Money<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Money<1>
    ["*"](this: Types.Money<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Money<0 | 1>
    ["*"](this: Types.Money<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Money<0 | 1>
    ["*"](this: Types.Money<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Money<1>
    ["*"](this: Types.Money<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Money<0 | 1>
    ["*"](this: Types.Money<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Money<0 | 1>
    ["*"](this: Types.Money<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Money<1>
    ["*"](this: Types.Money<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Money<0 | 1>
    ["*"](this: Types.Money<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Money<0 | 1>
    ["*"](this: Types.Money<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Money<1>
    ["*"](this: Types.Money<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Money<0 | 1>
    ["*"](this: Types.Money<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Money<0 | 1>
    ["*"](...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Money<0 | 1>, Types.Float4<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Money<0 | 1>, Types.Float8<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Money<0 | 1>, Types.Int2<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Money<0 | 1>, Types.Int4<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Money<0 | 1>, Types.Int8<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multiply(this: Types.Money<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Money<1>
    multiply(this: Types.Money<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Money<0 | 1>
    multiply(this: Types.Money<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Money<0 | 1>
    multiply(this: Types.Money<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Money<1>
    multiply(this: Types.Money<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Money<0 | 1>
    multiply(this: Types.Money<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Money<0 | 1>
    multiply(this: Types.Money<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Money<1>
    multiply(this: Types.Money<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Money<0 | 1>
    multiply(this: Types.Money<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Money<0 | 1>
    multiply(this: Types.Money<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Money<1>
    multiply(this: Types.Money<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Money<0 | 1>
    multiply(this: Types.Money<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Money<0 | 1>
    multiply(this: Types.Money<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Money<1>
    multiply(this: Types.Money<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Money<0 | 1>
    multiply(this: Types.Money<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Money<0 | 1>
    multiply(...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Money<0 | 1>, Types.Float4<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Money<0 | 1>, Types.Float8<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Money<0 | 1>, Types.Int2<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Money<0 | 1>, Types.Int4<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Money<0 | 1>, Types.Int8<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Money<1>, a1: Types.Money<1>): Types.Bool<1>
    ["<>"](this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Money<number>, a1: Types.Money<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Money<1>, a1: Types.Money<1>): Types.Bool<1>
    ne(this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Money<number>, a1: Types.Money<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["+"](this: Types.Money<1>, a1: Types.Money<1>): Types.Money<1>
    ["+"](this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    ["+"](this: Types.Money<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    ["+"](...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plus(this: Types.Money<1>, a1: Types.Money<1>): Types.Money<1>
    plus(this: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    plus(this: Types.Money<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    plus(...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
