import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { typeMap } from '../../types/serialization';
import { Expression } from '../../expression';

type Parsed = ReturnType<typeof typeMap["float8"]['parse']>
type SerializeParam = Parameters<typeof typeMap["float8"]['serialize']>[0]
export class Float8<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Float8<1>;
    static new(v: null): Float8<0>;
    static new(v: Expression): Float8<0 | 1>;
    static new(v: SerializeParam | null | Expression): Float8<0 | 1> { return new this(v); }
    static serializeParamTypes: readonly SerializeParam[] | undefined = undefined;
    static parse(v: string) { return typeMap["float8"].parse(v); }
    static typeString(): string | undefined  { return "float8" } 
    asAggregate(): Types.Float8<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Float8<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Float8<1> | undefined {
          return undefined;
        }
       
    abs(this: Types.Float8<1>): Types.Float8<1>
    abs(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    abs(this: Types.Float8<number>): Types.Float8<0 | 1>
    abs(...args: unknown[]) {
        return sqlFunction("abs", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    acos(this: Types.Float8<1>): Types.Float8<1>
    acos(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    acos(this: Types.Float8<number>): Types.Float8<0 | 1>
    acos(...args: unknown[]) {
        return sqlFunction("acos", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    acosd(this: Types.Float8<1>): Types.Float8<1>
    acosd(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    acosd(this: Types.Float8<number>): Types.Float8<0 | 1>
    acosd(...args: unknown[]) {
        return sqlFunction("acosd", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    acosh(this: Types.Float8<1>): Types.Float8<1>
    acosh(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    acosh(this: Types.Float8<number>): Types.Float8<0 | 1>
    acosh(...args: unknown[]) {
        return sqlFunction("acosh", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    asind(this: Types.Float8<1>): Types.Float8<1>
    asind(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    asind(this: Types.Float8<number>): Types.Float8<0 | 1>
    asind(...args: unknown[]) {
        return sqlFunction("asind", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    asinh(this: Types.Float8<1>): Types.Float8<1>
    asinh(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    asinh(this: Types.Float8<number>): Types.Float8<0 | 1>
    asinh(...args: unknown[]) {
        return sqlFunction("asinh", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    atan(this: Types.Float8<1>): Types.Float8<1>
    atan(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    atan(this: Types.Float8<number>): Types.Float8<0 | 1>
    atan(...args: unknown[]) {
        return sqlFunction("atan", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    atan2(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    atan2(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    atan2(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    atan2(...args: unknown[]) {
        return sqlFunction("atan2", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    atan2D(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    atan2D(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    atan2D(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    atan2D(...args: unknown[]) {
        return sqlFunction("atan2d", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    atand(this: Types.Float8<1>): Types.Float8<1>
    atand(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    atand(this: Types.Float8<number>): Types.Float8<0 | 1>
    atand(...args: unknown[]) {
        return sqlFunction("atand", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    atanh(this: Types.Float8<1>): Types.Float8<1>
    atanh(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    atanh(this: Types.Float8<number>): Types.Float8<0 | 1>
    atanh(...args: unknown[]) {
        return sqlFunction("atanh", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    avg(this: Types.Float8<number>): Types.Float8<0 | 1>
    avg(...args: unknown[]) {
        return sqlFunction("avg", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btfloat84Cmp(this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Int4<1>
    btfloat84Cmp(this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Int4<0 | 1>
    btfloat84Cmp(this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Int4<0 | 1>
    btfloat84Cmp(...args: unknown[]) {
        return sqlFunction("btfloat84cmp", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btfloat8Cmp(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Int4<1>
    btfloat8Cmp(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Int4<0 | 1>
    btfloat8Cmp(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Int4<0 | 1>
    btfloat8Cmp(...args: unknown[]) {
        return sqlFunction("btfloat8cmp", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cbrt(this: Types.Float8<1>): Types.Float8<1>
    cbrt(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    cbrt(this: Types.Float8<number>): Types.Float8<0 | 1>
    cbrt(...args: unknown[]) {
        return sqlFunction("cbrt", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ceil(this: Types.Float8<1>): Types.Float8<1>
    ceil(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    ceil(this: Types.Float8<number>): Types.Float8<0 | 1>
    ceil(...args: unknown[]) {
        return sqlFunction("ceil", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ceiling(this: Types.Float8<1>): Types.Float8<1>
    ceiling(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    ceiling(this: Types.Float8<number>): Types.Float8<0 | 1>
    ceiling(...args: unknown[]) {
        return sqlFunction("ceiling", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    corr(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    corr(...args: unknown[]) {
        return sqlFunction("corr", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cos(this: Types.Float8<1>): Types.Float8<1>
    cos(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    cos(this: Types.Float8<number>): Types.Float8<0 | 1>
    cos(...args: unknown[]) {
        return sqlFunction("cos", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cosd(this: Types.Float8<1>): Types.Float8<1>
    cosd(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    cosd(this: Types.Float8<number>): Types.Float8<0 | 1>
    cosd(...args: unknown[]) {
        return sqlFunction("cosd", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cosh(this: Types.Float8<1>): Types.Float8<1>
    cosh(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    cosh(this: Types.Float8<number>): Types.Float8<0 | 1>
    cosh(...args: unknown[]) {
        return sqlFunction("cosh", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cot(this: Types.Float8<1>): Types.Float8<1>
    cot(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    cot(this: Types.Float8<number>): Types.Float8<0 | 1>
    cot(...args: unknown[]) {
        return sqlFunction("cot", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cotd(this: Types.Float8<1>): Types.Float8<1>
    cotd(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    cotd(this: Types.Float8<number>): Types.Float8<0 | 1>
    cotd(...args: unknown[]) {
        return sqlFunction("cotd", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    covarPop(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    covarPop(...args: unknown[]) {
        return sqlFunction("covar_pop", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    covarSamp(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    covarSamp(...args: unknown[]) {
        return sqlFunction("covar_samp", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dcbrt(this: Types.Float8<1>): Types.Float8<1>
    dcbrt(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    dcbrt(this: Types.Float8<number>): Types.Float8<0 | 1>
    dcbrt(...args: unknown[]) {
        return sqlFunction("dcbrt", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    degrees(this: Types.Float8<1>): Types.Float8<1>
    degrees(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    degrees(this: Types.Float8<number>): Types.Float8<0 | 1>
    degrees(...args: unknown[]) {
        return sqlFunction("degrees", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dexp(this: Types.Float8<1>): Types.Float8<1>
    dexp(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    dexp(this: Types.Float8<number>): Types.Float8<0 | 1>
    dexp(...args: unknown[]) {
        return sqlFunction("dexp", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dlog1(this: Types.Float8<1>): Types.Float8<1>
    dlog1(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    dlog1(this: Types.Float8<number>): Types.Float8<0 | 1>
    dlog1(...args: unknown[]) {
        return sqlFunction("dlog1", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dlog10(this: Types.Float8<1>): Types.Float8<1>
    dlog10(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    dlog10(this: Types.Float8<number>): Types.Float8<0 | 1>
    dlog10(...args: unknown[]) {
        return sqlFunction("dlog10", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dpow(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    dpow(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    dpow(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    dpow(...args: unknown[]) {
        return sqlFunction("dpow", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dround(this: Types.Float8<1>): Types.Float8<1>
    dround(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    dround(this: Types.Float8<number>): Types.Float8<0 | 1>
    dround(...args: unknown[]) {
        return sqlFunction("dround", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dsqrt(this: Types.Float8<1>): Types.Float8<1>
    dsqrt(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    dsqrt(this: Types.Float8<number>): Types.Float8<0 | 1>
    dsqrt(...args: unknown[]) {
        return sqlFunction("dsqrt", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    dtrunc(this: Types.Float8<1>): Types.Float8<1>
    dtrunc(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    dtrunc(this: Types.Float8<number>): Types.Float8<0 | 1>
    dtrunc(...args: unknown[]) {
        return sqlFunction("dtrunc", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    erf(this: Types.Float8<1>): Types.Float8<1>
    erf(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    erf(this: Types.Float8<number>): Types.Float8<0 | 1>
    erf(...args: unknown[]) {
        return sqlFunction("erf", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    erfc(this: Types.Float8<1>): Types.Float8<1>
    erfc(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    erfc(this: Types.Float8<number>): Types.Float8<0 | 1>
    erfc(...args: unknown[]) {
        return sqlFunction("erfc", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    exp(this: Types.Float8<1>): Types.Float8<1>
    exp(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    exp(this: Types.Float8<number>): Types.Float8<0 | 1>
    exp(...args: unknown[]) {
        return sqlFunction("exp", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float4(this: Types.Float8<1>): Types.Float4<1>
    float4(this: Types.Float8<0 | 1>): Types.Float4<0 | 1>
    float4(this: Types.Float8<number>): Types.Float4<0 | 1>
    float4(...args: unknown[]) {
        return sqlFunction("float4", [{args: [Types.Float8<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float84Div(this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<1>
    float84Div(this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
    float84Div(this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
    float84Div(...args: unknown[]) {
        return sqlFunction("float84div", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float84Eq(this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    float84Eq(this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float84Eq(this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float84Eq(...args: unknown[]) {
        return sqlFunction("float84eq", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float84Ge(this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    float84Ge(this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float84Ge(this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float84Ge(...args: unknown[]) {
        return sqlFunction("float84ge", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float84Gt(this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    float84Gt(this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float84Gt(this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float84Gt(...args: unknown[]) {
        return sqlFunction("float84gt", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float84Le(this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    float84Le(this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float84Le(this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float84Le(...args: unknown[]) {
        return sqlFunction("float84le", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float84Lt(this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    float84Lt(this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float84Lt(this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float84Lt(...args: unknown[]) {
        return sqlFunction("float84lt", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float84Mi(this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<1>
    float84Mi(this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
    float84Mi(this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
    float84Mi(...args: unknown[]) {
        return sqlFunction("float84mi", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float84Mul(this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<1>
    float84Mul(this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
    float84Mul(this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
    float84Mul(...args: unknown[]) {
        return sqlFunction("float84mul", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float84Ne(this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    float84Ne(this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float84Ne(this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float84Ne(...args: unknown[]) {
        return sqlFunction("float84ne", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float84Pl(this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<1>
    float84Pl(this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
    float84Pl(this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
    float84Pl(...args: unknown[]) {
        return sqlFunction("float84pl", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float8Abs(this: Types.Float8<1>): Types.Float8<1>
    float8Abs(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    float8Abs(this: Types.Float8<number>): Types.Float8<0 | 1>
    float8Abs(...args: unknown[]) {
        return sqlFunction("float8abs", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float8Div(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    float8Div(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    float8Div(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    float8Div(...args: unknown[]) {
        return sqlFunction("float8div", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float8Eq(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    float8Eq(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float8Eq(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float8Eq(...args: unknown[]) {
        return sqlFunction("float8eq", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float8Ge(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    float8Ge(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float8Ge(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float8Ge(...args: unknown[]) {
        return sqlFunction("float8ge", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float8Gt(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    float8Gt(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float8Gt(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float8Gt(...args: unknown[]) {
        return sqlFunction("float8gt", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float8Larger(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    float8Larger(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    float8Larger(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    float8Larger(...args: unknown[]) {
        return sqlFunction("float8larger", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float8Le(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    float8Le(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float8Le(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float8Le(...args: unknown[]) {
        return sqlFunction("float8le", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float8Lt(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    float8Lt(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float8Lt(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float8Lt(...args: unknown[]) {
        return sqlFunction("float8lt", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float8Mi(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    float8Mi(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    float8Mi(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    float8Mi(...args: unknown[]) {
        return sqlFunction("float8mi", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float8Mul(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    float8Mul(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    float8Mul(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    float8Mul(...args: unknown[]) {
        return sqlFunction("float8mul", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float8Ne(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    float8Ne(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float8Ne(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float8Ne(...args: unknown[]) {
        return sqlFunction("float8ne", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float8Pl(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    float8Pl(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    float8Pl(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    float8Pl(...args: unknown[]) {
        return sqlFunction("float8pl", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float8Smaller(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    float8Smaller(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    float8Smaller(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    float8Smaller(...args: unknown[]) {
        return sqlFunction("float8smaller", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float8Um(this: Types.Float8<1>): Types.Float8<1>
    float8Um(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    float8Um(this: Types.Float8<number>): Types.Float8<0 | 1>
    float8Um(...args: unknown[]) {
        return sqlFunction("float8um", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float8Up(this: Types.Float8<1>): Types.Float8<1>
    float8Up(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    float8Up(this: Types.Float8<number>): Types.Float8<0 | 1>
    float8Up(...args: unknown[]) {
        return sqlFunction("float8up", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    floor(this: Types.Float8<1>): Types.Float8<1>
    floor(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    floor(this: Types.Float8<number>): Types.Float8<0 | 1>
    floor(...args: unknown[]) {
        return sqlFunction("floor", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    flt8MulCash(this: Types.Float8<1>, a1: Types.Money<1>): Types.Money<1>
    flt8MulCash(this: Types.Float8<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    flt8MulCash(this: Types.Float8<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    flt8MulCash(...args: unknown[]) {
        return sqlFunction("flt8_mul_cash", [{args: [Types.Float8<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashfloat8(this: Types.Float8<1>): Types.Int4<1>
    hashfloat8(this: Types.Float8<0 | 1>): Types.Int4<0 | 1>
    hashfloat8(this: Types.Float8<number>): Types.Int4<0 | 1>
    hashfloat8(...args: unknown[]) {
        return sqlFunction("hashfloat8", [{args: [Types.Float8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashfloat8Extended(this: Types.Float8<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashfloat8Extended(this: Types.Float8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashfloat8Extended(this: Types.Float8<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashfloat8Extended(...args: unknown[]) {
        return sqlFunction("hashfloat8extended", [{args: [Types.Float8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    inRange(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>, a2: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    inRange(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a2: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>, a2: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(...args: unknown[]) {
        return sqlFunction("in_range", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>, Types.Float8<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2(this: Types.Float8<1>): Types.Int2<1>
    int2(this: Types.Float8<0 | 1>): Types.Int2<0 | 1>
    int2(this: Types.Float8<number>): Types.Int2<0 | 1>
    int2(...args: unknown[]) {
        return sqlFunction("int2", [{args: [Types.Float8<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4(this: Types.Float8<1>): Types.Int4<1>
    int4(this: Types.Float8<0 | 1>): Types.Int4<0 | 1>
    int4(this: Types.Float8<number>): Types.Int4<0 | 1>
    int4(...args: unknown[]) {
        return sqlFunction("int4", [{args: [Types.Float8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8(this: Types.Float8<1>): Types.Int8<1>
    int8(this: Types.Float8<0 | 1>): Types.Int8<0 | 1>
    int8(this: Types.Float8<number>): Types.Int8<0 | 1>
    int8(...args: unknown[]) {
        return sqlFunction("int8", [{args: [Types.Float8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ln(this: Types.Float8<1>): Types.Float8<1>
    ln(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    ln(this: Types.Float8<number>): Types.Float8<0 | 1>
    ln(...args: unknown[]) {
        return sqlFunction("ln", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    log(this: Types.Float8<1>): Types.Float8<1>
    log(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    log(this: Types.Float8<number>): Types.Float8<0 | 1>
    log(...args: unknown[]) {
        return sqlFunction("log", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    log10(this: Types.Float8<1>): Types.Float8<1>
    log10(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    log10(this: Types.Float8<number>): Types.Float8<0 | 1>
    log10(...args: unknown[]) {
        return sqlFunction("log10", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    max(this: Types.Float8<number>): Types.Float8<0 | 1>
    max(...args: unknown[]) {
        return sqlFunction("max", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    mulDInterval(this: Types.Float8<1>, a1: Types.Interval<1>): Types.Interval<1>
    mulDInterval(this: Types.Float8<0 | 1>, a1: Types.Interval<0 | 1>): Types.Interval<0 | 1>
    mulDInterval(this: Types.Float8<number>, a1: Types.Interval<number>): Types.Interval<0 | 1>
    mulDInterval(...args: unknown[]) {
        return sqlFunction("mul_d_interval", [{args: [Types.Float8<0 | 1>, Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numeric(this: Types.Float8<1>): Types.Numeric<1>
    numeric(this: Types.Float8<0 | 1>): Types.Numeric<0 | 1>
    numeric(this: Types.Float8<number>): Types.Numeric<0 | 1>
    numeric(...args: unknown[]) {
        return sqlFunction("numeric", [{args: [Types.Float8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    percentileCont(this: Types.Float8<number>, a1: Types.Float8<number>): Types.Float8<0 | 1>
    percentileCont(this: Types.Float8<number>, a1: Types.Interval<number>): Types.Interval<0 | 1>
    percentileCont(...args: unknown[]) {
        return sqlFunction("percentile_cont", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    percentileDisc<T extends Types.Any>(this: Types.Float8<number>, a1: T | Types.Input<T>): T
    percentileDisc(...args: unknown[]) {
        return sqlFunction("percentile_disc", [({T}) => ({args: [Types.Float8<0 | 1>, T], ret: T, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    pgSleep(this: Types.Float8<1>): Types.Void<1>
    pgSleep(this: Types.Float8<0 | 1>): Types.Void<0 | 1>
    pgSleep(this: Types.Float8<number>): Types.Void<0 | 1>
    pgSleep(...args: unknown[]) {
        return sqlFunction("pg_sleep", [{args: [Types.Float8<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    point(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Point<1>
    point(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Point<0 | 1>
    point(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Point<0 | 1>
    point(...args: unknown[]) {
        return sqlFunction("point", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pow(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    pow(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    pow(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    pow(...args: unknown[]) {
        return sqlFunction("pow", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    power(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    power(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    power(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    power(...args: unknown[]) {
        return sqlFunction("power", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    radians(this: Types.Float8<1>): Types.Float8<1>
    radians(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    radians(this: Types.Float8<number>): Types.Float8<0 | 1>
    radians(...args: unknown[]) {
        return sqlFunction("radians", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    randomNormal(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    randomNormal(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    randomNormal(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    randomNormal(...args: unknown[]) {
        return sqlFunction("random_normal", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    regrAvgx(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    regrAvgx(...args: unknown[]) {
        return sqlFunction("regr_avgx", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    regrAvgy(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    regrAvgy(...args: unknown[]) {
        return sqlFunction("regr_avgy", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    regrCount(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Int8<0 | 1>
    regrCount(...args: unknown[]) {
        return sqlFunction("regr_count", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    regrIntercept(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    regrIntercept(...args: unknown[]) {
        return sqlFunction("regr_intercept", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    regrR2(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    regrR2(...args: unknown[]) {
        return sqlFunction("regr_r2", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    regrSlope(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    regrSlope(...args: unknown[]) {
        return sqlFunction("regr_slope", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    regrSxx(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    regrSxx(...args: unknown[]) {
        return sqlFunction("regr_sxx", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    regrSxy(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    regrSxy(...args: unknown[]) {
        return sqlFunction("regr_sxy", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    regrSyy(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    regrSyy(...args: unknown[]) {
        return sqlFunction("regr_syy", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    round(this: Types.Float8<1>): Types.Float8<1>
    round(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    round(this: Types.Float8<number>): Types.Float8<0 | 1>
    round(...args: unknown[]) {
        return sqlFunction("round", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    setseed(this: Types.Float8<1>): Types.Void<1>
    setseed(this: Types.Float8<0 | 1>): Types.Void<0 | 1>
    setseed(this: Types.Float8<number>): Types.Void<0 | 1>
    setseed(...args: unknown[]) {
        return sqlFunction("setseed", [{args: [Types.Float8<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    sign(this: Types.Float8<1>): Types.Float8<1>
    sign(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    sign(this: Types.Float8<number>): Types.Float8<0 | 1>
    sign(...args: unknown[]) {
        return sqlFunction("sign", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    sin(this: Types.Float8<1>): Types.Float8<1>
    sin(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    sin(this: Types.Float8<number>): Types.Float8<0 | 1>
    sin(...args: unknown[]) {
        return sqlFunction("sin", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    sind(this: Types.Float8<1>): Types.Float8<1>
    sind(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    sind(this: Types.Float8<number>): Types.Float8<0 | 1>
    sind(...args: unknown[]) {
        return sqlFunction("sind", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    sinh(this: Types.Float8<1>): Types.Float8<1>
    sinh(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    sinh(this: Types.Float8<number>): Types.Float8<0 | 1>
    sinh(...args: unknown[]) {
        return sqlFunction("sinh", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    sqrt(this: Types.Float8<1>): Types.Float8<1>
    sqrt(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    sqrt(this: Types.Float8<number>): Types.Float8<0 | 1>
    sqrt(...args: unknown[]) {
        return sqlFunction("sqrt", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    stddev(this: Types.Float8<number>): Types.Float8<0 | 1>
    stddev(...args: unknown[]) {
        return sqlFunction("stddev", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    stddevPop(this: Types.Float8<number>): Types.Float8<0 | 1>
    stddevPop(...args: unknown[]) {
        return sqlFunction("stddev_pop", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    stddevSamp(this: Types.Float8<number>): Types.Float8<0 | 1>
    stddevSamp(...args: unknown[]) {
        return sqlFunction("stddev_samp", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    sum(this: Types.Float8<number>): Types.Float8<0 | 1>
    sum(...args: unknown[]) {
        return sqlFunction("sum", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tan(this: Types.Float8<1>): Types.Float8<1>
    tan(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    tan(this: Types.Float8<number>): Types.Float8<0 | 1>
    tan(...args: unknown[]) {
        return sqlFunction("tan", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tand(this: Types.Float8<1>): Types.Float8<1>
    tand(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    tand(this: Types.Float8<number>): Types.Float8<0 | 1>
    tand(...args: unknown[]) {
        return sqlFunction("tand", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tanh(this: Types.Float8<1>): Types.Float8<1>
    tanh(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    tanh(this: Types.Float8<number>): Types.Float8<0 | 1>
    tanh(...args: unknown[]) {
        return sqlFunction("tanh", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toChar(this: Types.Float8<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    toChar(this: Types.Float8<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    toChar(this: Types.Float8<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    toChar(...args: unknown[]) {
        return sqlFunction("to_char", [{args: [Types.Float8<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toTimestamp(this: Types.Float8<1>): Types.Timestamptz<1>
    toTimestamp(this: Types.Float8<0 | 1>): Types.Timestamptz<0 | 1>
    toTimestamp(this: Types.Float8<number>): Types.Timestamptz<0 | 1>
    toTimestamp(...args: unknown[]) {
        return sqlFunction("to_timestamp", [{args: [Types.Float8<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    trunc(this: Types.Float8<1>): Types.Float8<1>
    trunc(this: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    trunc(this: Types.Float8<number>): Types.Float8<0 | 1>
    trunc(...args: unknown[]) {
        return sqlFunction("trunc", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    varPop(this: Types.Float8<number>): Types.Float8<0 | 1>
    varPop(...args: unknown[]) {
        return sqlFunction("var_pop", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    varSamp(this: Types.Float8<number>): Types.Float8<0 | 1>
    varSamp(...args: unknown[]) {
        return sqlFunction("var_samp", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    variance(this: Types.Float8<number>): Types.Float8<0 | 1>
    variance(...args: unknown[]) {
        return sqlFunction("variance", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["^"](this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    ["^"](this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    ["^"](this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    ["^"](...args: unknown[]) {
        return sqlFunction("^", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["/"](this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<1>
    ["/"](this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
    ["/"](this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
    ["/"](this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    ["/"](this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    ["/"](this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    ["/"](...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    divide(this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<1>
    divide(this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
    divide(this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
    divide(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    divide(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    divide(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    divide(...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    ["="](this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    ["="](this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    eq(this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    eq(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    [">="](this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    [">="](this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    gte(this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    gte(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    [">"](this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    [">"](this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    gt(this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    gt(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    ["<="](this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    ["<="](this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    lte(this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    lte(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    ["<"](this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    ["<"](this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    lt(this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    lt(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"](this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<1>
    ["-"](this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
    ["-"](this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
    ["-"](this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    ["-"](this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    ["-"](this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus(this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<1>
    minus(this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
    minus(this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
    minus(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    minus(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    minus(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["*"](this: Types.Float8<1>, a1: Types.Float4<1>): Types.Float8<1>
    ["*"](this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1>): Types.Float8<0 | 1>
    ["*"](this: Types.Float8<number>, a1: Types.Float4<number>): Types.Float8<0 | 1>
    ["*"](this: Types.Float8<1>, a1: Types.Float8<1>): Types.Float8<1>
    ["*"](this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    ["*"](this: Types.Float8<number>, a1: Types.Float8<number>): Types.Float8<0 | 1>
    ["*"](this: Types.Float8<1>, a1: Types.Money<1>): Types.Money<1>
    ["*"](this: Types.Float8<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    ["*"](this: Types.Float8<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    ["*"](this: Types.Float8<1>, a1: Types.Interval<1>): Types.Interval<1>
    ["*"](this: Types.Float8<0 | 1>, a1: Types.Interval<0 | 1>): Types.Interval<0 | 1>
    ["*"](this: Types.Float8<number>, a1: Types.Interval<number>): Types.Interval<0 | 1>
    ["*"](...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multiply(this: Types.Float8<1>, a1: Types.Float4<1>): Types.Float8<1>
    multiply(this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1>): Types.Float8<0 | 1>
    multiply(this: Types.Float8<number>, a1: Types.Float4<number>): Types.Float8<0 | 1>
    multiply(this: Types.Float8<1>, a1: Types.Float8<1>): Types.Float8<1>
    multiply(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    multiply(this: Types.Float8<number>, a1: Types.Float8<number>): Types.Float8<0 | 1>
    multiply(this: Types.Float8<1>, a1: Types.Money<1>): Types.Money<1>
    multiply(this: Types.Float8<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    multiply(this: Types.Float8<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    multiply(this: Types.Float8<1>, a1: Types.Interval<1>): Types.Interval<1>
    multiply(this: Types.Float8<0 | 1>, a1: Types.Interval<0 | 1>): Types.Interval<0 | 1>
    multiply(this: Types.Float8<number>, a1: Types.Interval<number>): Types.Interval<0 | 1>
    multiply(...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    ["<>"](this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    ["<>"](this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    ne(this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    ne(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["+"](this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<1>
    ["+"](this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
    ["+"](this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
    ["+"](this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    ["+"](this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    ["+"](this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    ["+"](...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plus(this: Types.Float8<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<1>
    plus(this: Types.Float8<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
    plus(this: Types.Float8<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
    plus(this: Types.Float8<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    plus(this: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    plus(this: Types.Float8<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    plus(...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
