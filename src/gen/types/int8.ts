import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { typeMap } from '../../types/serialization';
import { Expression } from '../../expression';

type Parsed = ReturnType<typeof typeMap["int8"]['parse']>
type SerializeParam = Parameters<typeof typeMap["int8"]['serialize']>[0]
export class Int8<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Int8<1>;
    static new(v: null): Int8<0>;
    static new(v: Expression): Int8<0 | 1>;
    static new(v: SerializeParam | null | Expression): Int8<0 | 1> { return new this(v); }
    static serializeParamTypes: readonly SerializeParam[] | undefined = undefined;
    static parse(v: string) { return typeMap["int8"].parse(v); }
    static typeString(): string | undefined  { return "int8" } 
    asAggregate(): Types.Int8<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Int8<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Int8<1> | undefined {
          return undefined;
        }
       
    abs(this: Types.Int8<1>): Types.Int8<1>
    abs(this: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    abs(this: Types.Int8<number>): Types.Int8<0 | 1>
    abs(...args: unknown[]) {
        return sqlFunction("abs", [{args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    avg(this: Types.Int8<number>): Types.Numeric<0 | 1>
    avg(...args: unknown[]) {
        return sqlFunction("avg", [{args: [Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bit(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<1>
    bit(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    bit(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    bit(...args: unknown[]) {
        return sqlFunction("bit", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    bitAnd(this: Types.Int8<number>): Types.Int8<0 | 1>
    bitAnd(...args: unknown[]) {
        return sqlFunction("bit_and", [{args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitOr(this: Types.Int8<number>): Types.Int8<0 | 1>
    bitOr(...args: unknown[]) {
        return sqlFunction("bit_or", [{args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitXor(this: Types.Int8<number>): Types.Int8<0 | 1>
    bitXor(...args: unknown[]) {
        return sqlFunction("bit_xor", [{args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btint82Cmp(this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<1>
    btint82Cmp(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
    btint82Cmp(this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
    btint82Cmp(...args: unknown[]) {
        return sqlFunction("btint82cmp", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btint84Cmp(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    btint84Cmp(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    btint84Cmp(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    btint84Cmp(...args: unknown[]) {
        return sqlFunction("btint84cmp", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btint8Cmp(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<1>
    btint8Cmp(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<0 | 1>
    btint8Cmp(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<0 | 1>
    btint8Cmp(...args: unknown[]) {
        return sqlFunction("btint8cmp", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    factorial(this: Types.Int8<1>): Types.Numeric<1>
    factorial(this: Types.Int8<0 | 1>): Types.Numeric<0 | 1>
    factorial(this: Types.Int8<number>): Types.Numeric<0 | 1>
    factorial(...args: unknown[]) {
        return sqlFunction("factorial", [{args: [Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float4(this: Types.Int8<1>): Types.Float4<1>
    float4(this: Types.Int8<0 | 1>): Types.Float4<0 | 1>
    float4(this: Types.Int8<number>): Types.Float4<0 | 1>
    float4(...args: unknown[]) {
        return sqlFunction("float4", [{args: [Types.Int8<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float8(this: Types.Int8<1>): Types.Float8<1>
    float8(this: Types.Int8<0 | 1>): Types.Float8<0 | 1>
    float8(this: Types.Int8<number>): Types.Float8<0 | 1>
    float8(...args: unknown[]) {
        return sqlFunction("float8", [{args: [Types.Int8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gcd(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    gcd(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    gcd(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    gcd(...args: unknown[]) {
        return sqlFunction("gcd", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    generateSeries(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.FromItem<{}>
    generateSeries(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.FromItem<{}>
    generateSeries(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.FromItem<{}>
    generateSeries(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.FromItem<{}>
    generateSeries(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.FromItem<{}>
    generateSeries(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.FromItem<{}>
    generateSeries(...args: unknown[]) {
        return sqlFunction("generate_series", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashint8(this: Types.Int8<1>): Types.Int4<1>
    hashint8(this: Types.Int8<0 | 1>): Types.Int4<0 | 1>
    hashint8(this: Types.Int8<number>): Types.Int4<0 | 1>
    hashint8(...args: unknown[]) {
        return sqlFunction("hashint8", [{args: [Types.Int8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashint8Extended(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashint8Extended(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashint8Extended(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashint8Extended(...args: unknown[]) {
        return sqlFunction("hashint8extended", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    inRange(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    inRange(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(...args: unknown[]) {
        return sqlFunction("in_range", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>, Types.Int8<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2(this: Types.Int8<1>): Types.Int2<1>
    int2(this: Types.Int8<0 | 1>): Types.Int2<0 | 1>
    int2(this: Types.Int8<number>): Types.Int2<0 | 1>
    int2(...args: unknown[]) {
        return sqlFunction("int2", [{args: [Types.Int8<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Sum(this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<1>
    int2Sum(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
    int2Sum(this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
    int2Sum(...args: unknown[]) {
        return sqlFunction("int2_sum", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4(this: Types.Int8<1>): Types.Int4<1>
    int4(this: Types.Int8<0 | 1>): Types.Int4<0 | 1>
    int4(this: Types.Int8<number>): Types.Int4<0 | 1>
    int4(...args: unknown[]) {
        return sqlFunction("int4", [{args: [Types.Int8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Sum(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<1>
    int4Sum(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    int4Sum(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    int4Sum(...args: unknown[]) {
        return sqlFunction("int4_sum", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int82Div(this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<1>
    int82Div(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
    int82Div(this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
    int82Div(...args: unknown[]) {
        return sqlFunction("int82div", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int82Eq(this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    int82Eq(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int82Eq(this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int82Eq(...args: unknown[]) {
        return sqlFunction("int82eq", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int82Ge(this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    int82Ge(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int82Ge(this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int82Ge(...args: unknown[]) {
        return sqlFunction("int82ge", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int82Gt(this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    int82Gt(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int82Gt(this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int82Gt(...args: unknown[]) {
        return sqlFunction("int82gt", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int82Le(this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    int82Le(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int82Le(this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int82Le(...args: unknown[]) {
        return sqlFunction("int82le", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int82Lt(this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    int82Lt(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int82Lt(this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int82Lt(...args: unknown[]) {
        return sqlFunction("int82lt", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int82Mi(this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<1>
    int82Mi(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
    int82Mi(this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
    int82Mi(...args: unknown[]) {
        return sqlFunction("int82mi", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int82Mul(this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<1>
    int82Mul(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
    int82Mul(this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
    int82Mul(...args: unknown[]) {
        return sqlFunction("int82mul", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int82Ne(this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    int82Ne(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int82Ne(this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int82Ne(...args: unknown[]) {
        return sqlFunction("int82ne", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int82Pl(this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<1>
    int82Pl(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
    int82Pl(this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
    int82Pl(...args: unknown[]) {
        return sqlFunction("int82pl", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int84Div(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<1>
    int84Div(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    int84Div(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    int84Div(...args: unknown[]) {
        return sqlFunction("int84div", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int84Eq(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    int84Eq(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int84Eq(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int84Eq(...args: unknown[]) {
        return sqlFunction("int84eq", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int84Ge(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    int84Ge(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int84Ge(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int84Ge(...args: unknown[]) {
        return sqlFunction("int84ge", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int84Gt(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    int84Gt(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int84Gt(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int84Gt(...args: unknown[]) {
        return sqlFunction("int84gt", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int84Le(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    int84Le(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int84Le(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int84Le(...args: unknown[]) {
        return sqlFunction("int84le", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int84Lt(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    int84Lt(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int84Lt(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int84Lt(...args: unknown[]) {
        return sqlFunction("int84lt", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int84Mi(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<1>
    int84Mi(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    int84Mi(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    int84Mi(...args: unknown[]) {
        return sqlFunction("int84mi", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int84Mul(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<1>
    int84Mul(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    int84Mul(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    int84Mul(...args: unknown[]) {
        return sqlFunction("int84mul", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int84Ne(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    int84Ne(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int84Ne(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int84Ne(...args: unknown[]) {
        return sqlFunction("int84ne", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int84Pl(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<1>
    int84Pl(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    int84Pl(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    int84Pl(...args: unknown[]) {
        return sqlFunction("int84pl", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8MulCash(this: Types.Int8<1>, a1: Types.Money<1>): Types.Money<1>
    int8MulCash(this: Types.Int8<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    int8MulCash(this: Types.Int8<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    int8MulCash(...args: unknown[]) {
        return sqlFunction("int8_mul_cash", [{args: [Types.Int8<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Abs(this: Types.Int8<1>): Types.Int8<1>
    int8Abs(this: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    int8Abs(this: Types.Int8<number>): Types.Int8<0 | 1>
    int8Abs(...args: unknown[]) {
        return sqlFunction("int8abs", [{args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8And(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    int8And(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int8And(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int8And(...args: unknown[]) {
        return sqlFunction("int8and", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Dec(this: Types.Int8<1>): Types.Int8<1>
    int8Dec(this: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    int8Dec(this: Types.Int8<number>): Types.Int8<0 | 1>
    int8Dec(...args: unknown[]) {
        return sqlFunction("int8dec", [{args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8DecAny(this: Types.Int8<1>, a1: Types.Any<unknown, 1> | Types.Input<Types.Any<unknown, 0 | 1>>): Types.Int8<1>
    int8DecAny(this: Types.Int8<0 | 1>, a1: Types.Any<unknown, 0 | 1> | Types.Input<Types.Any<unknown, 0 | 1>>): Types.Int8<0 | 1>
    int8DecAny(this: Types.Int8<number>, a1: Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>): Types.Int8<0 | 1>
    int8DecAny(...args: unknown[]) {
        return sqlFunction("int8dec_any", [{args: [Types.Int8<0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Div(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    int8Div(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int8Div(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int8Div(...args: unknown[]) {
        return sqlFunction("int8div", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Eq(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    int8Eq(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int8Eq(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int8Eq(...args: unknown[]) {
        return sqlFunction("int8eq", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Ge(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    int8Ge(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int8Ge(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int8Ge(...args: unknown[]) {
        return sqlFunction("int8ge", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Gt(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    int8Gt(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int8Gt(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int8Gt(...args: unknown[]) {
        return sqlFunction("int8gt", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Inc(this: Types.Int8<1>): Types.Int8<1>
    int8Inc(this: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    int8Inc(this: Types.Int8<number>): Types.Int8<0 | 1>
    int8Inc(...args: unknown[]) {
        return sqlFunction("int8inc", [{args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8IncAny(this: Types.Int8<1>, a1: Types.Any<unknown, 1> | Types.Input<Types.Any<unknown, 0 | 1>>): Types.Int8<1>
    int8IncAny(this: Types.Int8<0 | 1>, a1: Types.Any<unknown, 0 | 1> | Types.Input<Types.Any<unknown, 0 | 1>>): Types.Int8<0 | 1>
    int8IncAny(this: Types.Int8<number>, a1: Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>): Types.Int8<0 | 1>
    int8IncAny(...args: unknown[]) {
        return sqlFunction("int8inc_any", [{args: [Types.Int8<0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8IncFloat8Float8(this: Types.Int8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>, a2: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Int8<1>
    int8IncFloat8Float8(this: Types.Int8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a2: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Int8<0 | 1>
    int8IncFloat8Float8(this: Types.Int8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>, a2: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Int8<0 | 1>
    int8IncFloat8Float8(...args: unknown[]) {
        return sqlFunction("int8inc_float8_float8", [{args: [Types.Int8<0 | 1>, Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Larger(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    int8Larger(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int8Larger(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int8Larger(...args: unknown[]) {
        return sqlFunction("int8larger", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Le(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    int8Le(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int8Le(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int8Le(...args: unknown[]) {
        return sqlFunction("int8le", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Lt(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    int8Lt(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int8Lt(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int8Lt(...args: unknown[]) {
        return sqlFunction("int8lt", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Mi(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    int8Mi(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int8Mi(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int8Mi(...args: unknown[]) {
        return sqlFunction("int8mi", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Mod(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    int8Mod(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int8Mod(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int8Mod(...args: unknown[]) {
        return sqlFunction("int8mod", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Mul(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    int8Mul(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int8Mul(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int8Mul(...args: unknown[]) {
        return sqlFunction("int8mul", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Ne(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    int8Ne(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int8Ne(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int8Ne(...args: unknown[]) {
        return sqlFunction("int8ne", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Not(this: Types.Int8<1>): Types.Int8<1>
    int8Not(this: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    int8Not(this: Types.Int8<number>): Types.Int8<0 | 1>
    int8Not(...args: unknown[]) {
        return sqlFunction("int8not", [{args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Or(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    int8Or(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int8Or(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int8Or(...args: unknown[]) {
        return sqlFunction("int8or", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Pl(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    int8Pl(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int8Pl(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int8Pl(...args: unknown[]) {
        return sqlFunction("int8pl", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8PlInet(this: Types.Int8<1>, a1: Types.Inet<1>): Types.Inet<1>
    int8PlInet(this: Types.Int8<0 | 1>, a1: Types.Inet<0 | 1>): Types.Inet<0 | 1>
    int8PlInet(this: Types.Int8<number>, a1: Types.Inet<number>): Types.Inet<0 | 1>
    int8PlInet(...args: unknown[]) {
        return sqlFunction("int8pl_inet", [{args: [Types.Int8<0 | 1>, Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Range(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8Range<1>
    int8Range(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8Range<0 | 1>
    int8Range(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8Range<0 | 1>
    int8Range(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Int8Range<1>
    int8Range(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int8Range<0 | 1>
    int8Range(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Int8Range<0 | 1>
    int8Range(...args: unknown[]) {
        return sqlFunction("int8range", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8Range<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>, Types.Text<0 | 1>], ret: Types.Int8Range<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8RangeSubdiff(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Float8<1>
    int8RangeSubdiff(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Float8<0 | 1>
    int8RangeSubdiff(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Float8<0 | 1>
    int8RangeSubdiff(...args: unknown[]) {
        return sqlFunction("int8range_subdiff", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Shl(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<1>
    int8Shl(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    int8Shl(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    int8Shl(...args: unknown[]) {
        return sqlFunction("int8shl", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Shr(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<1>
    int8Shr(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    int8Shr(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    int8Shr(...args: unknown[]) {
        return sqlFunction("int8shr", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Smaller(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    int8Smaller(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int8Smaller(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int8Smaller(...args: unknown[]) {
        return sqlFunction("int8smaller", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Um(this: Types.Int8<1>): Types.Int8<1>
    int8Um(this: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    int8Um(this: Types.Int8<number>): Types.Int8<0 | 1>
    int8Um(...args: unknown[]) {
        return sqlFunction("int8um", [{args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Up(this: Types.Int8<1>): Types.Int8<1>
    int8Up(this: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    int8Up(this: Types.Int8<number>): Types.Int8<0 | 1>
    int8Up(...args: unknown[]) {
        return sqlFunction("int8up", [{args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Xor(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    int8Xor(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int8Xor(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int8Xor(...args: unknown[]) {
        return sqlFunction("int8xor", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lcm(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    lcm(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    lcm(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    lcm(...args: unknown[]) {
        return sqlFunction("lcm", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    max(this: Types.Int8<number>): Types.Int8<0 | 1>
    max(...args: unknown[]) {
        return sqlFunction("max", [{args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    mod(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    mod(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    mod(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    mod(...args: unknown[]) {
        return sqlFunction("mod", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    money(this: Types.Int8<1>): Types.Money<1>
    money(this: Types.Int8<0 | 1>): Types.Money<0 | 1>
    money(this: Types.Int8<number>): Types.Money<0 | 1>
    money(...args: unknown[]) {
        return sqlFunction("money", [{args: [Types.Int8<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numeric(this: Types.Int8<1>): Types.Numeric<1>
    numeric(this: Types.Int8<0 | 1>): Types.Numeric<0 | 1>
    numeric(this: Types.Int8<number>): Types.Numeric<0 | 1>
    numeric(...args: unknown[]) {
        return sqlFunction("numeric", [{args: [Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    oid(this: Types.Int8<1>): Types.Oid<1>
    oid(this: Types.Int8<0 | 1>): Types.Oid<0 | 1>
    oid(this: Types.Int8<number>): Types.Oid<0 | 1>
    oid(...args: unknown[]) {
        return sqlFunction("oid", [{args: [Types.Int8<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgAdvisoryLock(this: Types.Int8<1>): Types.Void<1>
    pgAdvisoryLock(this: Types.Int8<0 | 1>): Types.Void<0 | 1>
    pgAdvisoryLock(this: Types.Int8<number>): Types.Void<0 | 1>
    pgAdvisoryLock(...args: unknown[]) {
        return sqlFunction("pg_advisory_lock", [{args: [Types.Int8<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgAdvisoryLockShared(this: Types.Int8<1>): Types.Void<1>
    pgAdvisoryLockShared(this: Types.Int8<0 | 1>): Types.Void<0 | 1>
    pgAdvisoryLockShared(this: Types.Int8<number>): Types.Void<0 | 1>
    pgAdvisoryLockShared(...args: unknown[]) {
        return sqlFunction("pg_advisory_lock_shared", [{args: [Types.Int8<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgAdvisoryUnlock(this: Types.Int8<1>): Types.Bool<1>
    pgAdvisoryUnlock(this: Types.Int8<0 | 1>): Types.Bool<0 | 1>
    pgAdvisoryUnlock(this: Types.Int8<number>): Types.Bool<0 | 1>
    pgAdvisoryUnlock(...args: unknown[]) {
        return sqlFunction("pg_advisory_unlock", [{args: [Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgAdvisoryUnlockShared(this: Types.Int8<1>): Types.Bool<1>
    pgAdvisoryUnlockShared(this: Types.Int8<0 | 1>): Types.Bool<0 | 1>
    pgAdvisoryUnlockShared(this: Types.Int8<number>): Types.Bool<0 | 1>
    pgAdvisoryUnlockShared(...args: unknown[]) {
        return sqlFunction("pg_advisory_unlock_shared", [{args: [Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgAdvisoryXactLock(this: Types.Int8<1>): Types.Void<1>
    pgAdvisoryXactLock(this: Types.Int8<0 | 1>): Types.Void<0 | 1>
    pgAdvisoryXactLock(this: Types.Int8<number>): Types.Void<0 | 1>
    pgAdvisoryXactLock(...args: unknown[]) {
        return sqlFunction("pg_advisory_xact_lock", [{args: [Types.Int8<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgAdvisoryXactLockShared(this: Types.Int8<1>): Types.Void<1>
    pgAdvisoryXactLockShared(this: Types.Int8<0 | 1>): Types.Void<0 | 1>
    pgAdvisoryXactLockShared(this: Types.Int8<number>): Types.Void<0 | 1>
    pgAdvisoryXactLockShared(...args: unknown[]) {
        return sqlFunction("pg_advisory_xact_lock_shared", [{args: [Types.Int8<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgSizePretty(this: Types.Int8<1>): Types.Text<1>
    pgSizePretty(this: Types.Int8<0 | 1>): Types.Text<0 | 1>
    pgSizePretty(this: Types.Int8<number>): Types.Text<0 | 1>
    pgSizePretty(...args: unknown[]) {
        return sqlFunction("pg_size_pretty", [{args: [Types.Int8<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTryAdvisoryLock(this: Types.Int8<1>): Types.Bool<1>
    pgTryAdvisoryLock(this: Types.Int8<0 | 1>): Types.Bool<0 | 1>
    pgTryAdvisoryLock(this: Types.Int8<number>): Types.Bool<0 | 1>
    pgTryAdvisoryLock(...args: unknown[]) {
        return sqlFunction("pg_try_advisory_lock", [{args: [Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTryAdvisoryLockShared(this: Types.Int8<1>): Types.Bool<1>
    pgTryAdvisoryLockShared(this: Types.Int8<0 | 1>): Types.Bool<0 | 1>
    pgTryAdvisoryLockShared(this: Types.Int8<number>): Types.Bool<0 | 1>
    pgTryAdvisoryLockShared(...args: unknown[]) {
        return sqlFunction("pg_try_advisory_lock_shared", [{args: [Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTryAdvisoryXactLock(this: Types.Int8<1>): Types.Bool<1>
    pgTryAdvisoryXactLock(this: Types.Int8<0 | 1>): Types.Bool<0 | 1>
    pgTryAdvisoryXactLock(this: Types.Int8<number>): Types.Bool<0 | 1>
    pgTryAdvisoryXactLock(...args: unknown[]) {
        return sqlFunction("pg_try_advisory_xact_lock", [{args: [Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTryAdvisoryXactLockShared(this: Types.Int8<1>): Types.Bool<1>
    pgTryAdvisoryXactLockShared(this: Types.Int8<0 | 1>): Types.Bool<0 | 1>
    pgTryAdvisoryXactLockShared(this: Types.Int8<number>): Types.Bool<0 | 1>
    pgTryAdvisoryXactLockShared(...args: unknown[]) {
        return sqlFunction("pg_try_advisory_xact_lock_shared", [{args: [Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgWalSummaryContents(this: Types.Int8<1>, a1: Types.PgLsn<1>, a2: Types.PgLsn<1>): Types.FromItem<{relfilenode: Types.Oid<1>, reltablespace: Types.Oid<1>, reldatabase: Types.Oid<1>, relforknumber: Types.Int2<1>, relblocknumber: Types.Int8<1>, is_limit_block: Types.Bool<1>}>
    pgWalSummaryContents(this: Types.Int8<0 | 1>, a1: Types.PgLsn<0 | 1>, a2: Types.PgLsn<0 | 1>): Types.FromItem<{relfilenode: Types.Oid<0 | 1>, reltablespace: Types.Oid<0 | 1>, reldatabase: Types.Oid<0 | 1>, relforknumber: Types.Int2<0 | 1>, relblocknumber: Types.Int8<0 | 1>, is_limit_block: Types.Bool<0 | 1>}>
    pgWalSummaryContents(this: Types.Int8<number>, a1: Types.PgLsn<number>, a2: Types.PgLsn<number>): Types.FromItem<{relfilenode: Types.Oid<0 | 1>, reltablespace: Types.Oid<0 | 1>, reldatabase: Types.Oid<0 | 1>, relforknumber: Types.Int2<0 | 1>, relblocknumber: Types.Int8<0 | 1>, is_limit_block: Types.Bool<0 | 1>}>
    pgWalSummaryContents(...args: unknown[]) {
        return sqlFunction("pg_wal_summary_contents", [{args: [Types.Int8<0 | 1>, Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.FromItem.ofSchema({relfilenode: Types.Oid<0 | 1>, reltablespace: Types.Oid<0 | 1>, reldatabase: Types.Oid<0 | 1>, relforknumber: Types.Int2<0 | 1>, relblocknumber: Types.Int8<0 | 1>, is_limit_block: Types.Bool<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    random(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    random(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    random(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    random(...args: unknown[]) {
        return sqlFunction("random", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    stddev(this: Types.Int8<number>): Types.Numeric<0 | 1>
    stddev(...args: unknown[]) {
        return sqlFunction("stddev", [{args: [Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    stddevPop(this: Types.Int8<number>): Types.Numeric<0 | 1>
    stddevPop(...args: unknown[]) {
        return sqlFunction("stddev_pop", [{args: [Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    stddevSamp(this: Types.Int8<number>): Types.Numeric<0 | 1>
    stddevSamp(...args: unknown[]) {
        return sqlFunction("stddev_samp", [{args: [Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    sum(this: Types.Int8<number>): Types.Numeric<0 | 1>
    sum(...args: unknown[]) {
        return sqlFunction("sum", [{args: [Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toChar(this: Types.Int8<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    toChar(this: Types.Int8<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    toChar(this: Types.Int8<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    toChar(...args: unknown[]) {
        return sqlFunction("to_char", [{args: [Types.Int8<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toHex(this: Types.Int8<1>): Types.Text<1>
    toHex(this: Types.Int8<0 | 1>): Types.Text<0 | 1>
    toHex(this: Types.Int8<number>): Types.Text<0 | 1>
    toHex(...args: unknown[]) {
        return sqlFunction("to_hex", [{args: [Types.Int8<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toOct(this: Types.Int8<1>): Types.Text<1>
    toOct(this: Types.Int8<0 | 1>): Types.Text<0 | 1>
    toOct(this: Types.Int8<number>): Types.Text<0 | 1>
    toOct(...args: unknown[]) {
        return sqlFunction("to_oct", [{args: [Types.Int8<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    txidStatus(this: Types.Int8<1>): Types.Text<1>
    txidStatus(this: Types.Int8<0 | 1>): Types.Text<0 | 1>
    txidStatus(this: Types.Int8<number>): Types.Text<0 | 1>
    txidStatus(...args: unknown[]) {
        return sqlFunction("txid_status", [{args: [Types.Int8<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    txidVisibleInSnapshot(this: Types.Int8<1>, a1: Types.TxidSnapshot<1>): Types.Bool<1>
    txidVisibleInSnapshot(this: Types.Int8<0 | 1>, a1: Types.TxidSnapshot<0 | 1>): Types.Bool<0 | 1>
    txidVisibleInSnapshot(this: Types.Int8<number>, a1: Types.TxidSnapshot<number>): Types.Bool<0 | 1>
    txidVisibleInSnapshot(...args: unknown[]) {
        return sqlFunction("txid_visible_in_snapshot", [{args: [Types.Int8<0 | 1>, Types.TxidSnapshot<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    varPop(this: Types.Int8<number>): Types.Numeric<0 | 1>
    varPop(...args: unknown[]) {
        return sqlFunction("var_pop", [{args: [Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    varSamp(this: Types.Int8<number>): Types.Numeric<0 | 1>
    varSamp(...args: unknown[]) {
        return sqlFunction("var_samp", [{args: [Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    variance(this: Types.Int8<number>): Types.Numeric<0 | 1>
    variance(...args: unknown[]) {
        return sqlFunction("variance", [{args: [Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["/"](this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<1>
    ["/"](this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
    ["/"](this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
    ["/"](this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<1>
    ["/"](this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    ["/"](this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    ["/"](this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    ["/"](this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    ["/"](this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    ["/"](...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    divide(this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<1>
    divide(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
    divide(this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
    divide(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<1>
    divide(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    divide(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    divide(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    divide(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    divide(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    divide(...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    ["="](this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    ["="](this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    ["="](this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    eq(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    eq(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    eq(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    [">="](this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    [">="](this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    [">="](this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    gte(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    gte(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    gte(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    [">"](this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    [">"](this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    [">"](this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    gt(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    gt(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    gt(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    ["<="](this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    ["<="](this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    ["<="](this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    lte(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    lte(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    lte(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    ["<"](this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    ["<"](this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    ["<"](this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    lt(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    lt(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    lt(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"](this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<1>
    ["-"](this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
    ["-"](this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
    ["-"](this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<1>
    ["-"](this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    ["-"](this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    ["-"](this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    ["-"](this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    ["-"](this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus(this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<1>
    minus(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
    minus(this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
    minus(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<1>
    minus(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    minus(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    minus(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    minus(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    minus(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["*"](this: Types.Int8<1>, a1: Types.Int2<1>): Types.Int8<1>
    ["*"](this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1>): Types.Int8<0 | 1>
    ["*"](this: Types.Int8<number>, a1: Types.Int2<number>): Types.Int8<0 | 1>
    ["*"](this: Types.Int8<1>, a1: Types.Int4<1>): Types.Int8<1>
    ["*"](this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int8<0 | 1>
    ["*"](this: Types.Int8<number>, a1: Types.Int4<number>): Types.Int8<0 | 1>
    ["*"](this: Types.Int8<1>, a1: Types.Money<1>): Types.Money<1>
    ["*"](this: Types.Int8<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    ["*"](this: Types.Int8<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    ["*"](this: Types.Int8<1>, a1: Types.Int8<1>): Types.Int8<1>
    ["*"](this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    ["*"](this: Types.Int8<number>, a1: Types.Int8<number>): Types.Int8<0 | 1>
    ["*"](...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multiply(this: Types.Int8<1>, a1: Types.Int2<1>): Types.Int8<1>
    multiply(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1>): Types.Int8<0 | 1>
    multiply(this: Types.Int8<number>, a1: Types.Int2<number>): Types.Int8<0 | 1>
    multiply(this: Types.Int8<1>, a1: Types.Int4<1>): Types.Int8<1>
    multiply(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int8<0 | 1>
    multiply(this: Types.Int8<number>, a1: Types.Int4<number>): Types.Int8<0 | 1>
    multiply(this: Types.Int8<1>, a1: Types.Money<1>): Types.Money<1>
    multiply(this: Types.Int8<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    multiply(this: Types.Int8<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    multiply(this: Types.Int8<1>, a1: Types.Int8<1>): Types.Int8<1>
    multiply(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    multiply(this: Types.Int8<number>, a1: Types.Int8<number>): Types.Int8<0 | 1>
    multiply(...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    ["<>"](this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    ["<>"](this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    ["<>"](this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Int8<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    ne(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Int8<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    ne(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    ne(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["+"](this: Types.Int8<1>, a1: Types.Int2<1>): Types.Int8<1>
    ["+"](this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1>): Types.Int8<0 | 1>
    ["+"](this: Types.Int8<number>, a1: Types.Int2<number>): Types.Int8<0 | 1>
    ["+"](this: Types.Int8<1>, a1: Types.Int4<1>): Types.Int8<1>
    ["+"](this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int8<0 | 1>
    ["+"](this: Types.Int8<number>, a1: Types.Int4<number>): Types.Int8<0 | 1>
    ["+"](this: Types.Int8<1>, a1: Types.Int8<1>): Types.Int8<1>
    ["+"](this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    ["+"](this: Types.Int8<number>, a1: Types.Int8<number>): Types.Int8<0 | 1>
    ["+"](this: Types.Int8<1>, a1: Types.Inet<1>): Types.Inet<1>
    ["+"](this: Types.Int8<0 | 1>, a1: Types.Inet<0 | 1>): Types.Inet<0 | 1>
    ["+"](this: Types.Int8<number>, a1: Types.Inet<number>): Types.Inet<0 | 1>
    ["+"](...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plus(this: Types.Int8<1>, a1: Types.Int2<1>): Types.Int8<1>
    plus(this: Types.Int8<0 | 1>, a1: Types.Int2<0 | 1>): Types.Int8<0 | 1>
    plus(this: Types.Int8<number>, a1: Types.Int2<number>): Types.Int8<0 | 1>
    plus(this: Types.Int8<1>, a1: Types.Int4<1>): Types.Int8<1>
    plus(this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int8<0 | 1>
    plus(this: Types.Int8<number>, a1: Types.Int4<number>): Types.Int8<0 | 1>
    plus(this: Types.Int8<1>, a1: Types.Int8<1>): Types.Int8<1>
    plus(this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    plus(this: Types.Int8<number>, a1: Types.Int8<number>): Types.Int8<0 | 1>
    plus(this: Types.Int8<1>, a1: Types.Inet<1>): Types.Inet<1>
    plus(this: Types.Int8<0 | 1>, a1: Types.Inet<0 | 1>): Types.Inet<0 | 1>
    plus(this: Types.Int8<number>, a1: Types.Inet<number>): Types.Inet<0 | 1>
    plus(...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&"](this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    ["&"](this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    ["&"](this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    ["&"](...args: unknown[]) {
        return sqlFunction("&", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["%"](this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    ["%"](this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    ["%"](this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    ["%"](...args: unknown[]) {
        return sqlFunction("%", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["|"](this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    ["|"](this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    ["|"](this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    ["|"](...args: unknown[]) {
        return sqlFunction("|", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<<"](this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<1>
    ["<<"](this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    ["<<"](this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    ["<<"](...args: unknown[]) {
        return sqlFunction("<<", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">>"](this: Types.Int8<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<1>
    [">>"](this: Types.Int8<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    [">>"](this: Types.Int8<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    [">>"](...args: unknown[]) {
        return sqlFunction(">>", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["#"](this: Types.Int8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    ["#"](this: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    ["#"](this: Types.Int8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    ["#"](...args: unknown[]) {
        return sqlFunction("#", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
