import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { typeMap } from '../../types/serialization';
import { Expression } from '../../expression';

type Parsed = ReturnType<typeof typeMap["numeric"]['parse']>
type SerializeParam = Parameters<typeof typeMap["numeric"]['serialize']>[0]
export class Numeric<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Numeric<1>;
    static new(v: null): Numeric<0>;
    static new(v: Expression): Numeric<0 | 1>;
    static new(v: SerializeParam | null | Expression): Numeric<0 | 1> { return new this(v); }
    static serializeParamTypes: readonly SerializeParam[] | undefined = undefined;
    static parse(v: string) { return typeMap["numeric"].parse(v); }
    static typeString(): string | undefined  { return "numeric" } 
    asAggregate(): Types.Numeric<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Numeric<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Numeric<1> | undefined {
          return undefined;
        }
       
    abs(this: Types.Numeric<1>): Types.Numeric<1>
    abs(this: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    abs(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    abs(...args: unknown[]) {
        return sqlFunction("abs", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    avg(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    avg(...args: unknown[]) {
        return sqlFunction("avg", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ceil(this: Types.Numeric<1>): Types.Numeric<1>
    ceil(this: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    ceil(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    ceil(...args: unknown[]) {
        return sqlFunction("ceil", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ceiling(this: Types.Numeric<1>): Types.Numeric<1>
    ceiling(this: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    ceiling(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    ceiling(...args: unknown[]) {
        return sqlFunction("ceiling", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    div(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    div(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    div(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    div(...args: unknown[]) {
        return sqlFunction("div", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    exp(this: Types.Numeric<1>): Types.Numeric<1>
    exp(this: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    exp(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    exp(...args: unknown[]) {
        return sqlFunction("exp", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float4(this: Types.Numeric<1>): Types.Float4<1>
    float4(this: Types.Numeric<0 | 1>): Types.Float4<0 | 1>
    float4(this: Types.Numeric<number>): Types.Float4<0 | 1>
    float4(...args: unknown[]) {
        return sqlFunction("float4", [{args: [Types.Numeric<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float8(this: Types.Numeric<1>): Types.Float8<1>
    float8(this: Types.Numeric<0 | 1>): Types.Float8<0 | 1>
    float8(this: Types.Numeric<number>): Types.Float8<0 | 1>
    float8(...args: unknown[]) {
        return sqlFunction("float8", [{args: [Types.Numeric<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    floor(this: Types.Numeric<1>): Types.Numeric<1>
    floor(this: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    floor(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    floor(...args: unknown[]) {
        return sqlFunction("floor", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gcd(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    gcd(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    gcd(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    gcd(...args: unknown[]) {
        return sqlFunction("gcd", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    generateSeries(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.FromItem<{}>
    generateSeries(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.FromItem<{}>
    generateSeries(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.FromItem<{}>
    generateSeries(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>, a2: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.FromItem<{}>
    generateSeries(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a2: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.FromItem<{}>
    generateSeries(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>, a2: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.FromItem<{}>
    generateSeries(...args: unknown[]) {
        return sqlFunction("generate_series", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashNumeric(this: Types.Numeric<1>): Types.Int4<1>
    hashNumeric(this: Types.Numeric<0 | 1>): Types.Int4<0 | 1>
    hashNumeric(this: Types.Numeric<number>): Types.Int4<0 | 1>
    hashNumeric(...args: unknown[]) {
        return sqlFunction("hash_numeric", [{args: [Types.Numeric<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashNumericExtended(this: Types.Numeric<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashNumericExtended(this: Types.Numeric<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashNumericExtended(this: Types.Numeric<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashNumericExtended(...args: unknown[]) {
        return sqlFunction("hash_numeric_extended", [{args: [Types.Numeric<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    inRange(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>, a2: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    inRange(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a2: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>, a2: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(...args: unknown[]) {
        return sqlFunction("in_range", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>, Types.Numeric<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2(this: Types.Numeric<1>): Types.Int2<1>
    int2(this: Types.Numeric<0 | 1>): Types.Int2<0 | 1>
    int2(this: Types.Numeric<number>): Types.Int2<0 | 1>
    int2(...args: unknown[]) {
        return sqlFunction("int2", [{args: [Types.Numeric<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4(this: Types.Numeric<1>): Types.Int4<1>
    int4(this: Types.Numeric<0 | 1>): Types.Int4<0 | 1>
    int4(this: Types.Numeric<number>): Types.Int4<0 | 1>
    int4(...args: unknown[]) {
        return sqlFunction("int4", [{args: [Types.Numeric<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8(this: Types.Numeric<1>): Types.Int8<1>
    int8(this: Types.Numeric<0 | 1>): Types.Int8<0 | 1>
    int8(this: Types.Numeric<number>): Types.Int8<0 | 1>
    int8(...args: unknown[]) {
        return sqlFunction("int8", [{args: [Types.Numeric<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8Sum(this: Types.Numeric<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Numeric<1>
    int8Sum(this: Types.Numeric<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Numeric<0 | 1>
    int8Sum(this: Types.Numeric<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Numeric<0 | 1>
    int8Sum(...args: unknown[]) {
        return sqlFunction("int8_sum", [{args: [Types.Numeric<0 | 1>, Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lcm(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    lcm(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    lcm(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    lcm(...args: unknown[]) {
        return sqlFunction("lcm", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ln(this: Types.Numeric<1>): Types.Numeric<1>
    ln(this: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    ln(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    ln(...args: unknown[]) {
        return sqlFunction("ln", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    log(this: Types.Numeric<1>): Types.Numeric<1>
    log(this: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    log(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    log(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    log(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    log(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    log(...args: unknown[]) {
        return sqlFunction("log", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    log10(this: Types.Numeric<1>): Types.Numeric<1>
    log10(this: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    log10(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    log10(...args: unknown[]) {
        return sqlFunction("log10", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    max(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    max(...args: unknown[]) {
        return sqlFunction("max", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minScale(this: Types.Numeric<1>): Types.Int4<1>
    minScale(this: Types.Numeric<0 | 1>): Types.Int4<0 | 1>
    minScale(this: Types.Numeric<number>): Types.Int4<0 | 1>
    minScale(...args: unknown[]) {
        return sqlFunction("min_scale", [{args: [Types.Numeric<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    mod(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    mod(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    mod(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    mod(...args: unknown[]) {
        return sqlFunction("mod", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    money(this: Types.Numeric<1>): Types.Money<1>
    money(this: Types.Numeric<0 | 1>): Types.Money<0 | 1>
    money(this: Types.Numeric<number>): Types.Money<0 | 1>
    money(...args: unknown[]) {
        return sqlFunction("money", [{args: [Types.Numeric<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numeric(this: Types.Numeric<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Numeric<1>
    numeric(this: Types.Numeric<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Numeric<0 | 1>
    numeric(this: Types.Numeric<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Numeric<0 | 1>
    numeric(...args: unknown[]) {
        return sqlFunction("numeric", [{args: [Types.Numeric<0 | 1>, Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    numericAbs(this: Types.Numeric<1>): Types.Numeric<1>
    numericAbs(this: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    numericAbs(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    numericAbs(...args: unknown[]) {
        return sqlFunction("numeric_abs", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericAdd(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    numericAdd(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    numericAdd(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    numericAdd(...args: unknown[]) {
        return sqlFunction("numeric_add", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericCmp(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Int4<1>
    numericCmp(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Int4<0 | 1>
    numericCmp(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Int4<0 | 1>
    numericCmp(...args: unknown[]) {
        return sqlFunction("numeric_cmp", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericDiv(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    numericDiv(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    numericDiv(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    numericDiv(...args: unknown[]) {
        return sqlFunction("numeric_div", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericDivTrunc(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    numericDivTrunc(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    numericDivTrunc(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    numericDivTrunc(...args: unknown[]) {
        return sqlFunction("numeric_div_trunc", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericEq(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<1>
    numericEq(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    numericEq(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    numericEq(...args: unknown[]) {
        return sqlFunction("numeric_eq", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericExp(this: Types.Numeric<1>): Types.Numeric<1>
    numericExp(this: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    numericExp(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    numericExp(...args: unknown[]) {
        return sqlFunction("numeric_exp", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericGe(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<1>
    numericGe(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    numericGe(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    numericGe(...args: unknown[]) {
        return sqlFunction("numeric_ge", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericGt(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<1>
    numericGt(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    numericGt(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    numericGt(...args: unknown[]) {
        return sqlFunction("numeric_gt", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericInc(this: Types.Numeric<1>): Types.Numeric<1>
    numericInc(this: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    numericInc(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    numericInc(...args: unknown[]) {
        return sqlFunction("numeric_inc", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericLarger(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    numericLarger(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    numericLarger(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    numericLarger(...args: unknown[]) {
        return sqlFunction("numeric_larger", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericLe(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<1>
    numericLe(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    numericLe(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    numericLe(...args: unknown[]) {
        return sqlFunction("numeric_le", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericLn(this: Types.Numeric<1>): Types.Numeric<1>
    numericLn(this: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    numericLn(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    numericLn(...args: unknown[]) {
        return sqlFunction("numeric_ln", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericLog(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    numericLog(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    numericLog(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    numericLog(...args: unknown[]) {
        return sqlFunction("numeric_log", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericLt(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<1>
    numericLt(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    numericLt(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    numericLt(...args: unknown[]) {
        return sqlFunction("numeric_lt", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericMod(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    numericMod(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    numericMod(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    numericMod(...args: unknown[]) {
        return sqlFunction("numeric_mod", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericMul(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    numericMul(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    numericMul(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    numericMul(...args: unknown[]) {
        return sqlFunction("numeric_mul", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericNe(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<1>
    numericNe(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    numericNe(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    numericNe(...args: unknown[]) {
        return sqlFunction("numeric_ne", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericPlPgLsn(this: Types.Numeric<1>, a1: Types.PgLsn<1>): Types.PgLsn<1>
    numericPlPgLsn(this: Types.Numeric<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.PgLsn<0 | 1>
    numericPlPgLsn(this: Types.Numeric<number>, a1: Types.PgLsn<number>): Types.PgLsn<0 | 1>
    numericPlPgLsn(...args: unknown[]) {
        return sqlFunction("numeric_pl_pg_lsn", [{args: [Types.Numeric<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericPower(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    numericPower(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    numericPower(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    numericPower(...args: unknown[]) {
        return sqlFunction("numeric_power", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericSmaller(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    numericSmaller(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    numericSmaller(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    numericSmaller(...args: unknown[]) {
        return sqlFunction("numeric_smaller", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericSqrt(this: Types.Numeric<1>): Types.Numeric<1>
    numericSqrt(this: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    numericSqrt(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    numericSqrt(...args: unknown[]) {
        return sqlFunction("numeric_sqrt", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericSub(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    numericSub(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    numericSub(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    numericSub(...args: unknown[]) {
        return sqlFunction("numeric_sub", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericUminus(this: Types.Numeric<1>): Types.Numeric<1>
    numericUminus(this: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    numericUminus(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    numericUminus(...args: unknown[]) {
        return sqlFunction("numeric_uminus", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numericUplus(this: Types.Numeric<1>): Types.Numeric<1>
    numericUplus(this: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    numericUplus(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    numericUplus(...args: unknown[]) {
        return sqlFunction("numeric_uplus", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numrange(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numrange<1>
    numrange(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numrange<0 | 1>
    numrange(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numrange<0 | 1>
    numrange(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Numrange<1>
    numrange(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Numrange<0 | 1>
    numrange(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Numrange<0 | 1>
    numrange(...args: unknown[]) {
        return sqlFunction("numrange", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numrange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>, Types.Text<0 | 1>], ret: Types.Numrange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numrangeSubdiff(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Float8<1>
    numrangeSubdiff(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Float8<0 | 1>
    numrangeSubdiff(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Float8<0 | 1>
    numrangeSubdiff(...args: unknown[]) {
        return sqlFunction("numrange_subdiff", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgLsn(this: Types.Numeric<1>): Types.PgLsn<1>
    pgLsn(this: Types.Numeric<0 | 1>): Types.PgLsn<0 | 1>
    pgLsn(this: Types.Numeric<number>): Types.PgLsn<0 | 1>
    pgLsn(...args: unknown[]) {
        return sqlFunction("pg_lsn", [{args: [Types.Numeric<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgSizePretty(this: Types.Numeric<1>): Types.Text<1>
    pgSizePretty(this: Types.Numeric<0 | 1>): Types.Text<0 | 1>
    pgSizePretty(this: Types.Numeric<number>): Types.Text<0 | 1>
    pgSizePretty(...args: unknown[]) {
        return sqlFunction("pg_size_pretty", [{args: [Types.Numeric<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pow(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    pow(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    pow(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    pow(...args: unknown[]) {
        return sqlFunction("pow", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    power(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    power(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    power(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    power(...args: unknown[]) {
        return sqlFunction("power", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    random(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    random(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    random(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    random(...args: unknown[]) {
        return sqlFunction("random", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    round(this: Types.Numeric<1>): Types.Numeric<1>
    round(this: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    round(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    round(this: Types.Numeric<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Numeric<1>
    round(this: Types.Numeric<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Numeric<0 | 1>
    round(this: Types.Numeric<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Numeric<0 | 1>
    round(...args: unknown[]) {
        return sqlFunction("round", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    scale(this: Types.Numeric<1>): Types.Int4<1>
    scale(this: Types.Numeric<0 | 1>): Types.Int4<0 | 1>
    scale(this: Types.Numeric<number>): Types.Int4<0 | 1>
    scale(...args: unknown[]) {
        return sqlFunction("scale", [{args: [Types.Numeric<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    sign(this: Types.Numeric<1>): Types.Numeric<1>
    sign(this: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    sign(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    sign(...args: unknown[]) {
        return sqlFunction("sign", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    sqrt(this: Types.Numeric<1>): Types.Numeric<1>
    sqrt(this: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    sqrt(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    sqrt(...args: unknown[]) {
        return sqlFunction("sqrt", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    stddev(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    stddev(...args: unknown[]) {
        return sqlFunction("stddev", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    stddevPop(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    stddevPop(...args: unknown[]) {
        return sqlFunction("stddev_pop", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    stddevSamp(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    stddevSamp(...args: unknown[]) {
        return sqlFunction("stddev_samp", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    sum(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    sum(...args: unknown[]) {
        return sqlFunction("sum", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toChar(this: Types.Numeric<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    toChar(this: Types.Numeric<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    toChar(this: Types.Numeric<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    toChar(...args: unknown[]) {
        return sqlFunction("to_char", [{args: [Types.Numeric<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    trimScale(this: Types.Numeric<1>): Types.Numeric<1>
    trimScale(this: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    trimScale(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    trimScale(...args: unknown[]) {
        return sqlFunction("trim_scale", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    trunc(this: Types.Numeric<1>): Types.Numeric<1>
    trunc(this: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    trunc(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    trunc(this: Types.Numeric<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Numeric<1>
    trunc(this: Types.Numeric<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Numeric<0 | 1>
    trunc(this: Types.Numeric<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Numeric<0 | 1>
    trunc(...args: unknown[]) {
        return sqlFunction("trunc", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    varPop(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    varPop(...args: unknown[]) {
        return sqlFunction("var_pop", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    varSamp(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    varSamp(...args: unknown[]) {
        return sqlFunction("var_samp", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    variance(this: Types.Numeric<number>): Types.Numeric<0 | 1>
    variance(...args: unknown[]) {
        return sqlFunction("variance", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["+"](this: Types.Numeric<1>, a1: Types.Numeric<1>): Types.Numeric<1>
    ["+"](this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    ["+"](this: Types.Numeric<number>, a1: Types.Numeric<number>): Types.Numeric<0 | 1>
    ["+"](this: Types.Numeric<1>, a1: Types.PgLsn<1>): Types.PgLsn<1>
    ["+"](this: Types.Numeric<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.PgLsn<0 | 1>
    ["+"](this: Types.Numeric<number>, a1: Types.PgLsn<number>): Types.PgLsn<0 | 1>
    ["+"](...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plus(this: Types.Numeric<1>, a1: Types.Numeric<1>): Types.Numeric<1>
    plus(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
    plus(this: Types.Numeric<number>, a1: Types.Numeric<number>): Types.Numeric<0 | 1>
    plus(this: Types.Numeric<1>, a1: Types.PgLsn<1>): Types.PgLsn<1>
    plus(this: Types.Numeric<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.PgLsn<0 | 1>
    plus(this: Types.Numeric<number>, a1: Types.PgLsn<number>): Types.PgLsn<0 | 1>
    plus(...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["/"](this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    ["/"](this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    ["/"](this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    ["/"](...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    divide(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    divide(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    divide(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    divide(...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<1>
    ["="](this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<1>
    eq(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<1>
    [">="](this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<1>
    gte(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<1>
    [">"](this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<1>
    gt(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<1>
    ["<="](this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<1>
    lte(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<1>
    ["<"](this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<1>
    lt(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["%"](this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    ["%"](this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    ["%"](this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    ["%"](...args: unknown[]) {
        return sqlFunction("%", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["*"](this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    ["*"](this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    ["*"](this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    ["*"](...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multiply(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    multiply(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    multiply(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    multiply(...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<1>
    ["<>"](this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<1>
    ne(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["^"](this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    ["^"](this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    ["^"](this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    ["^"](...args: unknown[]) {
        return sqlFunction("^", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"](this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    ["-"](this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    ["-"](this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus(this: Types.Numeric<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<1>
    minus(this: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    minus(this: Types.Numeric<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
