import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { typeMap } from '../../types/serialization';
import { Expression } from '../../expression';

type Parsed = ReturnType<typeof typeMap["int4"]['parse']>
type SerializeParam = Parameters<typeof typeMap["int4"]['serialize']>[0]
export class Int4<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Int4<1>;
    static new(v: null): Int4<0>;
    static new(v: Expression): Int4<0 | 1>;
    static new(v: SerializeParam | null | Expression): Int4<0 | 1> { return new this(v); }
    static serializeParamTypes: readonly SerializeParam[] | undefined = undefined;
    static parse(v: string) { return typeMap["int4"].parse(v); }
    static typeString(): string | undefined  { return "int4" } 
    asAggregate(): Types.Int4<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Int4<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Int4<1> | undefined {
          return undefined;
        }
       
    abs(this: Types.Int4<1>): Types.Int4<1>
    abs(this: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    abs(this: Types.Int4<number>): Types.Int4<0 | 1>
    abs(...args: unknown[]) {
        return sqlFunction("abs", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    avg(this: Types.Int4<number>): Types.Numeric<0 | 1>
    avg(...args: unknown[]) {
        return sqlFunction("avg", [{args: [Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bit(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<1>
    bit(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    bit(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    bit(...args: unknown[]) {
        return sqlFunction("bit", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    bitAnd(this: Types.Int4<number>): Types.Int4<0 | 1>
    bitAnd(...args: unknown[]) {
        return sqlFunction("bit_and", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitOr(this: Types.Int4<number>): Types.Int4<0 | 1>
    bitOr(...args: unknown[]) {
        return sqlFunction("bit_or", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitXor(this: Types.Int4<number>): Types.Int4<0 | 1>
    bitXor(...args: unknown[]) {
        return sqlFunction("bit_xor", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bool(this: Types.Int4<1>): Types.Bool<1>
    bool(this: Types.Int4<0 | 1>): Types.Bool<0 | 1>
    bool(this: Types.Int4<number>): Types.Bool<0 | 1>
    bool(...args: unknown[]) {
        return sqlFunction("bool", [{args: [Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btint42Cmp(this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<1>
    btint42Cmp(this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
    btint42Cmp(this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
    btint42Cmp(...args: unknown[]) {
        return sqlFunction("btint42cmp", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btint48Cmp(this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<1>
    btint48Cmp(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<0 | 1>
    btint48Cmp(this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<0 | 1>
    btint48Cmp(...args: unknown[]) {
        return sqlFunction("btint48cmp", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btint4Cmp(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    btint4Cmp(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    btint4Cmp(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    btint4Cmp(...args: unknown[]) {
        return sqlFunction("btint4cmp", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    char(this: Types.Int4<1>): Types.Char<1>
    char(this: Types.Int4<0 | 1>): Types.Char<0 | 1>
    char(this: Types.Int4<number>): Types.Char<0 | 1>
    char(...args: unknown[]) {
        return sqlFunction("char", [{args: [Types.Int4<0 | 1>], ret: Types.Char<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    chr(this: Types.Int4<1>): Types.Text<1>
    chr(this: Types.Int4<0 | 1>): Types.Text<0 | 1>
    chr(this: Types.Int4<number>): Types.Text<0 | 1>
    chr(...args: unknown[]) {
        return sqlFunction("chr", [{args: [Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float4(this: Types.Int4<1>): Types.Float4<1>
    float4(this: Types.Int4<0 | 1>): Types.Float4<0 | 1>
    float4(this: Types.Int4<number>): Types.Float4<0 | 1>
    float4(...args: unknown[]) {
        return sqlFunction("float4", [{args: [Types.Int4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float8(this: Types.Int4<1>): Types.Float8<1>
    float8(this: Types.Int4<0 | 1>): Types.Float8<0 | 1>
    float8(this: Types.Int4<number>): Types.Float8<0 | 1>
    float8(...args: unknown[]) {
        return sqlFunction("float8", [{args: [Types.Int4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gcd(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    gcd(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    gcd(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    gcd(...args: unknown[]) {
        return sqlFunction("gcd", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    generateSeries(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.FromItem<{}>
    generateSeries(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.FromItem<{}>
    generateSeries(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.FromItem<{}>
    generateSeries(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.FromItem<{}>
    generateSeries(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.FromItem<{}>
    generateSeries(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.FromItem<{}>
    generateSeries(...args: unknown[]) {
        return sqlFunction("generate_series", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashint4(this: Types.Int4<1>): Types.Int4<1>
    hashint4(this: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    hashint4(this: Types.Int4<number>): Types.Int4<0 | 1>
    hashint4(...args: unknown[]) {
        return sqlFunction("hashint4", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashint4Extended(this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashint4Extended(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashint4Extended(this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashint4Extended(...args: unknown[]) {
        return sqlFunction("hashint4extended", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    inRange(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    inRange(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    inRange(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    inRange(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(...args: unknown[]) {
        return sqlFunction("in_range", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int2<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int8<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2(this: Types.Int4<1>): Types.Int2<1>
    int2(this: Types.Int4<0 | 1>): Types.Int2<0 | 1>
    int2(this: Types.Int4<number>): Types.Int2<0 | 1>
    int2(...args: unknown[]) {
        return sqlFunction("int2", [{args: [Types.Int4<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int42Div(this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<1>
    int42Div(this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
    int42Div(this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
    int42Div(...args: unknown[]) {
        return sqlFunction("int42div", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int42Eq(this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    int42Eq(this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int42Eq(this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int42Eq(...args: unknown[]) {
        return sqlFunction("int42eq", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int42Ge(this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    int42Ge(this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int42Ge(this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int42Ge(...args: unknown[]) {
        return sqlFunction("int42ge", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int42Gt(this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    int42Gt(this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int42Gt(this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int42Gt(...args: unknown[]) {
        return sqlFunction("int42gt", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int42Le(this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    int42Le(this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int42Le(this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int42Le(...args: unknown[]) {
        return sqlFunction("int42le", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int42Lt(this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    int42Lt(this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int42Lt(this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int42Lt(...args: unknown[]) {
        return sqlFunction("int42lt", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int42Mi(this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<1>
    int42Mi(this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
    int42Mi(this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
    int42Mi(...args: unknown[]) {
        return sqlFunction("int42mi", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int42Mul(this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<1>
    int42Mul(this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
    int42Mul(this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
    int42Mul(...args: unknown[]) {
        return sqlFunction("int42mul", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int42Ne(this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    int42Ne(this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int42Ne(this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int42Ne(...args: unknown[]) {
        return sqlFunction("int42ne", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int42Pl(this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<1>
    int42Pl(this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
    int42Pl(this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
    int42Pl(...args: unknown[]) {
        return sqlFunction("int42pl", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int48Div(this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    int48Div(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int48Div(this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int48Div(...args: unknown[]) {
        return sqlFunction("int48div", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int48Eq(this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    int48Eq(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int48Eq(this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int48Eq(...args: unknown[]) {
        return sqlFunction("int48eq", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int48Ge(this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    int48Ge(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int48Ge(this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int48Ge(...args: unknown[]) {
        return sqlFunction("int48ge", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int48Gt(this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    int48Gt(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int48Gt(this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int48Gt(...args: unknown[]) {
        return sqlFunction("int48gt", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int48Le(this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    int48Le(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int48Le(this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int48Le(...args: unknown[]) {
        return sqlFunction("int48le", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int48Lt(this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    int48Lt(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int48Lt(this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int48Lt(...args: unknown[]) {
        return sqlFunction("int48lt", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int48Mi(this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    int48Mi(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int48Mi(this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int48Mi(...args: unknown[]) {
        return sqlFunction("int48mi", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int48Mul(this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    int48Mul(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int48Mul(this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int48Mul(...args: unknown[]) {
        return sqlFunction("int48mul", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int48Ne(this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    int48Ne(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int48Ne(this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int48Ne(...args: unknown[]) {
        return sqlFunction("int48ne", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int48Pl(this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    int48Pl(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int48Pl(this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int48Pl(...args: unknown[]) {
        return sqlFunction("int48pl", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4MulCash(this: Types.Int4<1>, a1: Types.Money<1>): Types.Money<1>
    int4MulCash(this: Types.Int4<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    int4MulCash(this: Types.Int4<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    int4MulCash(...args: unknown[]) {
        return sqlFunction("int4_mul_cash", [{args: [Types.Int4<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Abs(this: Types.Int4<1>): Types.Int4<1>
    int4Abs(this: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    int4Abs(this: Types.Int4<number>): Types.Int4<0 | 1>
    int4Abs(...args: unknown[]) {
        return sqlFunction("int4abs", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4And(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    int4And(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4And(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4And(...args: unknown[]) {
        return sqlFunction("int4and", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Div(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    int4Div(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Div(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Div(...args: unknown[]) {
        return sqlFunction("int4div", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Eq(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    int4Eq(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int4Eq(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int4Eq(...args: unknown[]) {
        return sqlFunction("int4eq", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Ge(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    int4Ge(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int4Ge(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int4Ge(...args: unknown[]) {
        return sqlFunction("int4ge", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Gt(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    int4Gt(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int4Gt(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int4Gt(...args: unknown[]) {
        return sqlFunction("int4gt", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Inc(this: Types.Int4<1>): Types.Int4<1>
    int4Inc(this: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    int4Inc(this: Types.Int4<number>): Types.Int4<0 | 1>
    int4Inc(...args: unknown[]) {
        return sqlFunction("int4inc", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Larger(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    int4Larger(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Larger(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Larger(...args: unknown[]) {
        return sqlFunction("int4larger", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Le(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    int4Le(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int4Le(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int4Le(...args: unknown[]) {
        return sqlFunction("int4le", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Lt(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    int4Lt(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int4Lt(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int4Lt(...args: unknown[]) {
        return sqlFunction("int4lt", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Mi(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    int4Mi(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Mi(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Mi(...args: unknown[]) {
        return sqlFunction("int4mi", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Mod(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    int4Mod(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Mod(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Mod(...args: unknown[]) {
        return sqlFunction("int4mod", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Mul(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    int4Mul(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Mul(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Mul(...args: unknown[]) {
        return sqlFunction("int4mul", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Ne(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    int4Ne(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int4Ne(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int4Ne(...args: unknown[]) {
        return sqlFunction("int4ne", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Not(this: Types.Int4<1>): Types.Int4<1>
    int4Not(this: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    int4Not(this: Types.Int4<number>): Types.Int4<0 | 1>
    int4Not(...args: unknown[]) {
        return sqlFunction("int4not", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Or(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    int4Or(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Or(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Or(...args: unknown[]) {
        return sqlFunction("int4or", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Pl(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    int4Pl(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Pl(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Pl(...args: unknown[]) {
        return sqlFunction("int4pl", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Range(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4Range<1>
    int4Range(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4Range<0 | 1>
    int4Range(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4Range<0 | 1>
    int4Range(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Int4Range<1>
    int4Range(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4Range<0 | 1>
    int4Range(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Int4Range<0 | 1>
    int4Range(...args: unknown[]) {
        return sqlFunction("int4range", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4Range<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4Range<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4RangeSubdiff(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Float8<1>
    int4RangeSubdiff(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Float8<0 | 1>
    int4RangeSubdiff(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Float8<0 | 1>
    int4RangeSubdiff(...args: unknown[]) {
        return sqlFunction("int4range_subdiff", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Shl(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    int4Shl(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Shl(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Shl(...args: unknown[]) {
        return sqlFunction("int4shl", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Shr(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    int4Shr(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Shr(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Shr(...args: unknown[]) {
        return sqlFunction("int4shr", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Smaller(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    int4Smaller(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Smaller(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Smaller(...args: unknown[]) {
        return sqlFunction("int4smaller", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Um(this: Types.Int4<1>): Types.Int4<1>
    int4Um(this: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    int4Um(this: Types.Int4<number>): Types.Int4<0 | 1>
    int4Um(...args: unknown[]) {
        return sqlFunction("int4um", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Up(this: Types.Int4<1>): Types.Int4<1>
    int4Up(this: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    int4Up(this: Types.Int4<number>): Types.Int4<0 | 1>
    int4Up(...args: unknown[]) {
        return sqlFunction("int4up", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4Xor(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    int4Xor(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Xor(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int4Xor(...args: unknown[]) {
        return sqlFunction("int4xor", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8(this: Types.Int4<1>): Types.Int8<1>
    int8(this: Types.Int4<0 | 1>): Types.Int8<0 | 1>
    int8(this: Types.Int4<number>): Types.Int8<0 | 1>
    int8(...args: unknown[]) {
        return sqlFunction("int8", [{args: [Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    integerPlDate(this: Types.Int4<1>, a1: Types.Date<1>): Types.Date<1>
    integerPlDate(this: Types.Int4<0 | 1>, a1: Types.Date<0 | 1>): Types.Date<0 | 1>
    integerPlDate(this: Types.Int4<number>, a1: Types.Date<number>): Types.Date<0 | 1>
    integerPlDate(...args: unknown[]) {
        return sqlFunction("integer_pl_date", [{args: [Types.Int4<0 | 1>, Types.Date<0 | 1>], ret: Types.Date<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lcm(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    lcm(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    lcm(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    lcm(...args: unknown[]) {
        return sqlFunction("lcm", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    loClose(this: Types.Int4<1>): Types.Int4<1>
    loClose(this: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    loClose(this: Types.Int4<number>): Types.Int4<0 | 1>
    loClose(...args: unknown[]) {
        return sqlFunction("lo_close", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    loCreat(this: Types.Int4<1>): Types.Oid<1>
    loCreat(this: Types.Int4<0 | 1>): Types.Oid<0 | 1>
    loCreat(this: Types.Int4<number>): Types.Oid<0 | 1>
    loCreat(...args: unknown[]) {
        return sqlFunction("lo_creat", [{args: [Types.Int4<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    loLseek(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    loLseek(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    loLseek(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    loLseek(...args: unknown[]) {
        return sqlFunction("lo_lseek", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    loLseek64(this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<1>
    loLseek64(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    loLseek64(this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
    loLseek64(...args: unknown[]) {
        return sqlFunction("lo_lseek64", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    loTell(this: Types.Int4<1>): Types.Int4<1>
    loTell(this: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    loTell(this: Types.Int4<number>): Types.Int4<0 | 1>
    loTell(...args: unknown[]) {
        return sqlFunction("lo_tell", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    loTell64(this: Types.Int4<1>): Types.Int8<1>
    loTell64(this: Types.Int4<0 | 1>): Types.Int8<0 | 1>
    loTell64(this: Types.Int4<number>): Types.Int8<0 | 1>
    loTell64(...args: unknown[]) {
        return sqlFunction("lo_tell64", [{args: [Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    loTruncate(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    loTruncate(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    loTruncate(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    loTruncate(...args: unknown[]) {
        return sqlFunction("lo_truncate", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    loTruncate64(this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<1>
    loTruncate64(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<0 | 1>
    loTruncate64(this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<0 | 1>
    loTruncate64(...args: unknown[]) {
        return sqlFunction("lo_truncate64", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    loread(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<1>
    loread(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
    loread(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
    loread(...args: unknown[]) {
        return sqlFunction("loread", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lowrite(this: Types.Int4<1>, a1: Types.Bytea<1>): Types.Int4<1>
    lowrite(this: Types.Int4<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Int4<0 | 1>
    lowrite(this: Types.Int4<number>, a1: Types.Bytea<number>): Types.Int4<0 | 1>
    lowrite(...args: unknown[]) {
        return sqlFunction("lowrite", [{args: [Types.Int4<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    makeDate(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Date<1>
    makeDate(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Date<0 | 1>
    makeDate(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Date<0 | 1>
    makeDate(...args: unknown[]) {
        return sqlFunction("make_date", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Date<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    makeInterval(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a6: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<1>
    makeInterval(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a6: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<0 | 1>
    makeInterval(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a6: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<0 | 1>
    makeInterval(...args: unknown[]) {
        return sqlFunction("make_interval", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    makeTime(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Time<1>
    makeTime(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Time<0 | 1>
    makeTime(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Time<0 | 1>
    makeTime(...args: unknown[]) {
        return sqlFunction("make_time", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    makeTimestamp(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Timestamp<1>
    makeTimestamp(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Timestamp<0 | 1>
    makeTimestamp(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Timestamp<0 | 1>
    makeTimestamp(...args: unknown[]) {
        return sqlFunction("make_timestamp", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    makeTimestamptz(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Timestamptz<1>
    makeTimestamptz(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Timestamptz<0 | 1>
    makeTimestamptz(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Timestamptz<0 | 1>
    makeTimestamptz(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>, a6: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Timestamptz<1>
    makeTimestamptz(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a6: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Timestamptz<0 | 1>
    makeTimestamptz(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>, a6: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Timestamptz<0 | 1>
    makeTimestamptz(...args: unknown[]) {
        return sqlFunction("make_timestamptz", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Float8<0 | 1>, Types.Text<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    max(this: Types.Int4<number>): Types.Int4<0 | 1>
    max(...args: unknown[]) {
        return sqlFunction("max", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    mod(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    mod(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    mod(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    mod(...args: unknown[]) {
        return sqlFunction("mod", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    money(this: Types.Int4<1>): Types.Money<1>
    money(this: Types.Int4<0 | 1>): Types.Money<0 | 1>
    money(this: Types.Int4<number>): Types.Money<0 | 1>
    money(...args: unknown[]) {
        return sqlFunction("money", [{args: [Types.Int4<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ntile(this: Types.Int4<1>): Types.Int4<1>
    ntile(this: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    ntile(this: Types.Int4<number>): Types.Int4<0 | 1>
    ntile(...args: unknown[]) {
        return sqlFunction("ntile", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numeric(this: Types.Int4<1>): Types.Numeric<1>
    numeric(this: Types.Int4<0 | 1>): Types.Numeric<0 | 1>
    numeric(this: Types.Int4<number>): Types.Numeric<0 | 1>
    numeric(...args: unknown[]) {
        return sqlFunction("numeric", [{args: [Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    pgAdvisoryLock(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Void<1>
    pgAdvisoryLock(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Void<0 | 1>
    pgAdvisoryLock(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Void<0 | 1>
    pgAdvisoryLock(...args: unknown[]) {
        return sqlFunction("pg_advisory_lock", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgAdvisoryLockShared(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Void<1>
    pgAdvisoryLockShared(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Void<0 | 1>
    pgAdvisoryLockShared(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Void<0 | 1>
    pgAdvisoryLockShared(...args: unknown[]) {
        return sqlFunction("pg_advisory_lock_shared", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgAdvisoryUnlock(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    pgAdvisoryUnlock(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    pgAdvisoryUnlock(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    pgAdvisoryUnlock(...args: unknown[]) {
        return sqlFunction("pg_advisory_unlock", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgAdvisoryUnlockShared(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    pgAdvisoryUnlockShared(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    pgAdvisoryUnlockShared(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    pgAdvisoryUnlockShared(...args: unknown[]) {
        return sqlFunction("pg_advisory_unlock_shared", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgAdvisoryXactLock(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Void<1>
    pgAdvisoryXactLock(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Void<0 | 1>
    pgAdvisoryXactLock(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Void<0 | 1>
    pgAdvisoryXactLock(...args: unknown[]) {
        return sqlFunction("pg_advisory_xact_lock", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgAdvisoryXactLockShared(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Void<1>
    pgAdvisoryXactLockShared(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Void<0 | 1>
    pgAdvisoryXactLockShared(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Void<0 | 1>
    pgAdvisoryXactLockShared(...args: unknown[]) {
        return sqlFunction("pg_advisory_xact_lock_shared", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgBlockingPids(this: Types.Int4<1>): Types.Array<1, Types.Int4<0 | 1>>
    pgBlockingPids(this: Types.Int4<0 | 1>): Types.Array<0 | 1, Types.Int4<0 | 1>>
    pgBlockingPids(this: Types.Int4<number>): Types.Array<0 | 1, Types.Int4<0 | 1>>
    pgBlockingPids(...args: unknown[]) {
        return sqlFunction("pg_blocking_pids", [{args: [Types.Int4<0 | 1>], ret: Types.Array.of(Types.Int4<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgCancelBackend(this: Types.Int4<1>): Types.Bool<1>
    pgCancelBackend(this: Types.Int4<0 | 1>): Types.Bool<0 | 1>
    pgCancelBackend(this: Types.Int4<number>): Types.Bool<0 | 1>
    pgCancelBackend(...args: unknown[]) {
        return sqlFunction("pg_cancel_backend", [{args: [Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgEncodingMaxLength(this: Types.Int4<1>): Types.Int4<1>
    pgEncodingMaxLength(this: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    pgEncodingMaxLength(this: Types.Int4<number>): Types.Int4<0 | 1>
    pgEncodingMaxLength(...args: unknown[]) {
        return sqlFunction("pg_encoding_max_length", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgEncodingToChar(this: Types.Int4<1>): Types.Name<1>
    pgEncodingToChar(this: Types.Int4<0 | 1>): Types.Name<0 | 1>
    pgEncodingToChar(this: Types.Int4<number>): Types.Name<0 | 1>
    pgEncodingToChar(...args: unknown[]) {
        return sqlFunction("pg_encoding_to_char", [{args: [Types.Int4<0 | 1>], ret: Types.Name<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgIsolationTestSessionIsBlocked(this: Types.Int4<1>, a1: Types.Array<1, Types.Int4<0 | 1>>): Types.Bool<1>
    pgIsolationTestSessionIsBlocked(this: Types.Int4<0 | 1>, a1: Types.Array<0 | 1, Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    pgIsolationTestSessionIsBlocked(this: Types.Int4<number>, a1: Types.Array<number, Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    pgIsolationTestSessionIsBlocked(...args: unknown[]) {
        return sqlFunction("pg_isolation_test_session_is_blocked", [{args: [Types.Int4<0 | 1>, Types.Array.of(Types.Int4<0 | 1>)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgLogBackendMemoryContexts(this: Types.Int4<1>): Types.Bool<1>
    pgLogBackendMemoryContexts(this: Types.Int4<0 | 1>): Types.Bool<0 | 1>
    pgLogBackendMemoryContexts(this: Types.Int4<number>): Types.Bool<0 | 1>
    pgLogBackendMemoryContexts(...args: unknown[]) {
        return sqlFunction("pg_log_backend_memory_contexts", [{args: [Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgSafeSnapshotBlockingPids(this: Types.Int4<1>): Types.Array<1, Types.Int4<0 | 1>>
    pgSafeSnapshotBlockingPids(this: Types.Int4<0 | 1>): Types.Array<0 | 1, Types.Int4<0 | 1>>
    pgSafeSnapshotBlockingPids(this: Types.Int4<number>): Types.Array<0 | 1, Types.Int4<0 | 1>>
    pgSafeSnapshotBlockingPids(...args: unknown[]) {
        return sqlFunction("pg_safe_snapshot_blocking_pids", [{args: [Types.Int4<0 | 1>], ret: Types.Array.of(Types.Int4<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetActivity(this: Types.Int4<1>): Types.FromItem<{datid: Types.Oid<1>, pid: Types.Int4<1>, usesysid: Types.Oid<1>, application_name: Types.Text<1>, state: Types.Text<1>, query: Types.Text<1>, wait_event_type: Types.Text<1>, wait_event: Types.Text<1>, xact_start: Types.Timestamptz<1>, query_start: Types.Timestamptz<1>, backend_start: Types.Timestamptz<1>, state_change: Types.Timestamptz<1>, client_addr: Types.Inet<1>, client_hostname: Types.Text<1>, client_port: Types.Int4<1>, backend_xid: Types.Xid<1>, backend_xmin: Types.Xid<1>, backend_type: Types.Text<1>, ssl: Types.Bool<1>, sslversion: Types.Text<1>, sslcipher: Types.Text<1>, sslbits: Types.Int4<1>, ssl_client_dn: Types.Text<1>, ssl_client_serial: Types.Numeric<1>, ssl_issuer_dn: Types.Text<1>, gss_auth: Types.Bool<1>, gss_princ: Types.Text<1>, gss_enc: Types.Bool<1>, gss_delegation: Types.Bool<1>, leader_pid: Types.Int4<1>, query_id: Types.Int8<1>}>
    pgStatGetActivity(this: Types.Int4<0 | 1>): Types.FromItem<{datid: Types.Oid<0 | 1>, pid: Types.Int4<0 | 1>, usesysid: Types.Oid<0 | 1>, application_name: Types.Text<0 | 1>, state: Types.Text<0 | 1>, query: Types.Text<0 | 1>, wait_event_type: Types.Text<0 | 1>, wait_event: Types.Text<0 | 1>, xact_start: Types.Timestamptz<0 | 1>, query_start: Types.Timestamptz<0 | 1>, backend_start: Types.Timestamptz<0 | 1>, state_change: Types.Timestamptz<0 | 1>, client_addr: Types.Inet<0 | 1>, client_hostname: Types.Text<0 | 1>, client_port: Types.Int4<0 | 1>, backend_xid: Types.Xid<0 | 1>, backend_xmin: Types.Xid<0 | 1>, backend_type: Types.Text<0 | 1>, ssl: Types.Bool<0 | 1>, sslversion: Types.Text<0 | 1>, sslcipher: Types.Text<0 | 1>, sslbits: Types.Int4<0 | 1>, ssl_client_dn: Types.Text<0 | 1>, ssl_client_serial: Types.Numeric<0 | 1>, ssl_issuer_dn: Types.Text<0 | 1>, gss_auth: Types.Bool<0 | 1>, gss_princ: Types.Text<0 | 1>, gss_enc: Types.Bool<0 | 1>, gss_delegation: Types.Bool<0 | 1>, leader_pid: Types.Int4<0 | 1>, query_id: Types.Int8<0 | 1>}>
    pgStatGetActivity(this: Types.Int4<number>): Types.FromItem<{datid: Types.Oid<0 | 1>, pid: Types.Int4<0 | 1>, usesysid: Types.Oid<0 | 1>, application_name: Types.Text<0 | 1>, state: Types.Text<0 | 1>, query: Types.Text<0 | 1>, wait_event_type: Types.Text<0 | 1>, wait_event: Types.Text<0 | 1>, xact_start: Types.Timestamptz<0 | 1>, query_start: Types.Timestamptz<0 | 1>, backend_start: Types.Timestamptz<0 | 1>, state_change: Types.Timestamptz<0 | 1>, client_addr: Types.Inet<0 | 1>, client_hostname: Types.Text<0 | 1>, client_port: Types.Int4<0 | 1>, backend_xid: Types.Xid<0 | 1>, backend_xmin: Types.Xid<0 | 1>, backend_type: Types.Text<0 | 1>, ssl: Types.Bool<0 | 1>, sslversion: Types.Text<0 | 1>, sslcipher: Types.Text<0 | 1>, sslbits: Types.Int4<0 | 1>, ssl_client_dn: Types.Text<0 | 1>, ssl_client_serial: Types.Numeric<0 | 1>, ssl_issuer_dn: Types.Text<0 | 1>, gss_auth: Types.Bool<0 | 1>, gss_princ: Types.Text<0 | 1>, gss_enc: Types.Bool<0 | 1>, gss_delegation: Types.Bool<0 | 1>, leader_pid: Types.Int4<0 | 1>, query_id: Types.Int8<0 | 1>}>
    pgStatGetActivity(...args: unknown[]) {
        return sqlFunction("pg_stat_get_activity", [{args: [Types.Int4<0 | 1>], ret: Types.FromItem.ofSchema({datid: Types.Oid<0 | 1>, pid: Types.Int4<0 | 1>, usesysid: Types.Oid<0 | 1>, application_name: Types.Text<0 | 1>, state: Types.Text<0 | 1>, query: Types.Text<0 | 1>, wait_event_type: Types.Text<0 | 1>, wait_event: Types.Text<0 | 1>, xact_start: Types.Timestamptz<0 | 1>, query_start: Types.Timestamptz<0 | 1>, backend_start: Types.Timestamptz<0 | 1>, state_change: Types.Timestamptz<0 | 1>, client_addr: Types.Inet<0 | 1>, client_hostname: Types.Text<0 | 1>, client_port: Types.Int4<0 | 1>, backend_xid: Types.Xid<0 | 1>, backend_xmin: Types.Xid<0 | 1>, backend_type: Types.Text<0 | 1>, ssl: Types.Bool<0 | 1>, sslversion: Types.Text<0 | 1>, sslcipher: Types.Text<0 | 1>, sslbits: Types.Int4<0 | 1>, ssl_client_dn: Types.Text<0 | 1>, ssl_client_serial: Types.Numeric<0 | 1>, ssl_issuer_dn: Types.Text<0 | 1>, gss_auth: Types.Bool<0 | 1>, gss_princ: Types.Text<0 | 1>, gss_enc: Types.Bool<0 | 1>, gss_delegation: Types.Bool<0 | 1>, leader_pid: Types.Int4<0 | 1>, query_id: Types.Int8<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetBackendActivity(this: Types.Int4<1>): Types.Text<1>
    pgStatGetBackendActivity(this: Types.Int4<0 | 1>): Types.Text<0 | 1>
    pgStatGetBackendActivity(this: Types.Int4<number>): Types.Text<0 | 1>
    pgStatGetBackendActivity(...args: unknown[]) {
        return sqlFunction("pg_stat_get_backend_activity", [{args: [Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetBackendActivityStart(this: Types.Int4<1>): Types.Timestamptz<1>
    pgStatGetBackendActivityStart(this: Types.Int4<0 | 1>): Types.Timestamptz<0 | 1>
    pgStatGetBackendActivityStart(this: Types.Int4<number>): Types.Timestamptz<0 | 1>
    pgStatGetBackendActivityStart(...args: unknown[]) {
        return sqlFunction("pg_stat_get_backend_activity_start", [{args: [Types.Int4<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetBackendClientAddr(this: Types.Int4<1>): Types.Inet<1>
    pgStatGetBackendClientAddr(this: Types.Int4<0 | 1>): Types.Inet<0 | 1>
    pgStatGetBackendClientAddr(this: Types.Int4<number>): Types.Inet<0 | 1>
    pgStatGetBackendClientAddr(...args: unknown[]) {
        return sqlFunction("pg_stat_get_backend_client_addr", [{args: [Types.Int4<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetBackendClientPort(this: Types.Int4<1>): Types.Int4<1>
    pgStatGetBackendClientPort(this: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    pgStatGetBackendClientPort(this: Types.Int4<number>): Types.Int4<0 | 1>
    pgStatGetBackendClientPort(...args: unknown[]) {
        return sqlFunction("pg_stat_get_backend_client_port", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetBackendDbid(this: Types.Int4<1>): Types.Oid<1>
    pgStatGetBackendDbid(this: Types.Int4<0 | 1>): Types.Oid<0 | 1>
    pgStatGetBackendDbid(this: Types.Int4<number>): Types.Oid<0 | 1>
    pgStatGetBackendDbid(...args: unknown[]) {
        return sqlFunction("pg_stat_get_backend_dbid", [{args: [Types.Int4<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetBackendPid(this: Types.Int4<1>): Types.Int4<1>
    pgStatGetBackendPid(this: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    pgStatGetBackendPid(this: Types.Int4<number>): Types.Int4<0 | 1>
    pgStatGetBackendPid(...args: unknown[]) {
        return sqlFunction("pg_stat_get_backend_pid", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetBackendStart(this: Types.Int4<1>): Types.Timestamptz<1>
    pgStatGetBackendStart(this: Types.Int4<0 | 1>): Types.Timestamptz<0 | 1>
    pgStatGetBackendStart(this: Types.Int4<number>): Types.Timestamptz<0 | 1>
    pgStatGetBackendStart(...args: unknown[]) {
        return sqlFunction("pg_stat_get_backend_start", [{args: [Types.Int4<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetBackendSubxact(this: Types.Int4<1>): Types.Record<1, {subxact_count: Types.Int4<1>, subxact_overflowed: Types.Bool<1>}>
    pgStatGetBackendSubxact(this: Types.Int4<0 | 1>): Types.Record<0 | 1, {subxact_count: Types.Int4<0 | 1>, subxact_overflowed: Types.Bool<0 | 1>}>
    pgStatGetBackendSubxact(this: Types.Int4<number>): Types.Record<0 | 1, {subxact_count: Types.Int4<0 | 1>, subxact_overflowed: Types.Bool<0 | 1>}>
    pgStatGetBackendSubxact(...args: unknown[]) {
        return sqlFunction("pg_stat_get_backend_subxact", [{args: [Types.Int4<0 | 1>], ret: Types.Record.of({subxact_count: Types.Int4<0 | 1>, subxact_overflowed: Types.Bool<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetBackendUserid(this: Types.Int4<1>): Types.Oid<1>
    pgStatGetBackendUserid(this: Types.Int4<0 | 1>): Types.Oid<0 | 1>
    pgStatGetBackendUserid(this: Types.Int4<number>): Types.Oid<0 | 1>
    pgStatGetBackendUserid(...args: unknown[]) {
        return sqlFunction("pg_stat_get_backend_userid", [{args: [Types.Int4<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetBackendWaitEvent(this: Types.Int4<1>): Types.Text<1>
    pgStatGetBackendWaitEvent(this: Types.Int4<0 | 1>): Types.Text<0 | 1>
    pgStatGetBackendWaitEvent(this: Types.Int4<number>): Types.Text<0 | 1>
    pgStatGetBackendWaitEvent(...args: unknown[]) {
        return sqlFunction("pg_stat_get_backend_wait_event", [{args: [Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetBackendWaitEventType(this: Types.Int4<1>): Types.Text<1>
    pgStatGetBackendWaitEventType(this: Types.Int4<0 | 1>): Types.Text<0 | 1>
    pgStatGetBackendWaitEventType(this: Types.Int4<number>): Types.Text<0 | 1>
    pgStatGetBackendWaitEventType(...args: unknown[]) {
        return sqlFunction("pg_stat_get_backend_wait_event_type", [{args: [Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetBackendXactStart(this: Types.Int4<1>): Types.Timestamptz<1>
    pgStatGetBackendXactStart(this: Types.Int4<0 | 1>): Types.Timestamptz<0 | 1>
    pgStatGetBackendXactStart(this: Types.Int4<number>): Types.Timestamptz<0 | 1>
    pgStatGetBackendXactStart(...args: unknown[]) {
        return sqlFunction("pg_stat_get_backend_xact_start", [{args: [Types.Int4<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTerminateBackend(this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    pgTerminateBackend(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    pgTerminateBackend(this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    pgTerminateBackend(...args: unknown[]) {
        return sqlFunction("pg_terminate_backend", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTryAdvisoryLock(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    pgTryAdvisoryLock(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    pgTryAdvisoryLock(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    pgTryAdvisoryLock(...args: unknown[]) {
        return sqlFunction("pg_try_advisory_lock", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTryAdvisoryLockShared(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    pgTryAdvisoryLockShared(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    pgTryAdvisoryLockShared(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    pgTryAdvisoryLockShared(...args: unknown[]) {
        return sqlFunction("pg_try_advisory_lock_shared", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTryAdvisoryXactLock(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    pgTryAdvisoryXactLock(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    pgTryAdvisoryXactLock(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    pgTryAdvisoryXactLock(...args: unknown[]) {
        return sqlFunction("pg_try_advisory_xact_lock", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTryAdvisoryXactLockShared(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    pgTryAdvisoryXactLockShared(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    pgTryAdvisoryXactLockShared(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    pgTryAdvisoryXactLockShared(...args: unknown[]) {
        return sqlFunction("pg_try_advisory_xact_lock_shared", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    polygon(this: Types.Int4<1>, a1: Types.Circle<1>): Types.Polygon<1>
    polygon(this: Types.Int4<0 | 1>, a1: Types.Circle<0 | 1>): Types.Polygon<0 | 1>
    polygon(this: Types.Int4<number>, a1: Types.Circle<number>): Types.Polygon<0 | 1>
    polygon(...args: unknown[]) {
        return sqlFunction("polygon", [{args: [Types.Int4<0 | 1>, Types.Circle<0 | 1>], ret: Types.Polygon<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    random(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    random(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    random(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    random(...args: unknown[]) {
        return sqlFunction("random", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    stddev(this: Types.Int4<number>): Types.Numeric<0 | 1>
    stddev(...args: unknown[]) {
        return sqlFunction("stddev", [{args: [Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    stddevPop(this: Types.Int4<number>): Types.Numeric<0 | 1>
    stddevPop(...args: unknown[]) {
        return sqlFunction("stddev_pop", [{args: [Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    stddevSamp(this: Types.Int4<number>): Types.Numeric<0 | 1>
    stddevSamp(...args: unknown[]) {
        return sqlFunction("stddev_samp", [{args: [Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    sum(this: Types.Int4<number>): Types.Int8<0 | 1>
    sum(...args: unknown[]) {
        return sqlFunction("sum", [{args: [Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toChar(this: Types.Int4<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    toChar(this: Types.Int4<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    toChar(this: Types.Int4<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    toChar(...args: unknown[]) {
        return sqlFunction("to_char", [{args: [Types.Int4<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toHex(this: Types.Int4<1>): Types.Text<1>
    toHex(this: Types.Int4<0 | 1>): Types.Text<0 | 1>
    toHex(this: Types.Int4<number>): Types.Text<0 | 1>
    toHex(...args: unknown[]) {
        return sqlFunction("to_hex", [{args: [Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toOct(this: Types.Int4<1>): Types.Text<1>
    toOct(this: Types.Int4<0 | 1>): Types.Text<0 | 1>
    toOct(this: Types.Int4<number>): Types.Text<0 | 1>
    toOct(...args: unknown[]) {
        return sqlFunction("to_oct", [{args: [Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    varPop(this: Types.Int4<number>): Types.Numeric<0 | 1>
    varPop(...args: unknown[]) {
        return sqlFunction("var_pop", [{args: [Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    varSamp(this: Types.Int4<number>): Types.Numeric<0 | 1>
    varSamp(...args: unknown[]) {
        return sqlFunction("var_samp", [{args: [Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    variance(this: Types.Int4<number>): Types.Numeric<0 | 1>
    variance(...args: unknown[]) {
        return sqlFunction("variance", [{args: [Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["/"](this: Types.Int4<1>, a1: Types.Int2<1>): Types.Int4<1>
    ["/"](this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1>): Types.Int4<0 | 1>
    ["/"](this: Types.Int4<number>, a1: Types.Int2<number>): Types.Int4<0 | 1>
    ["/"](this: Types.Int4<1>, a1: Types.Int8<1>): Types.Int8<1>
    ["/"](this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    ["/"](this: Types.Int4<number>, a1: Types.Int8<number>): Types.Int8<0 | 1>
    ["/"](this: Types.Int4<1>, a1: Types.Int4<1>): Types.Int4<1>
    ["/"](this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    ["/"](this: Types.Int4<number>, a1: Types.Int4<number>): Types.Int4<0 | 1>
    ["/"](...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    divide(this: Types.Int4<1>, a1: Types.Int2<1>): Types.Int4<1>
    divide(this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1>): Types.Int4<0 | 1>
    divide(this: Types.Int4<number>, a1: Types.Int2<number>): Types.Int4<0 | 1>
    divide(this: Types.Int4<1>, a1: Types.Int8<1>): Types.Int8<1>
    divide(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    divide(this: Types.Int4<number>, a1: Types.Int8<number>): Types.Int8<0 | 1>
    divide(this: Types.Int4<1>, a1: Types.Int4<1>): Types.Int4<1>
    divide(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    divide(this: Types.Int4<number>, a1: Types.Int4<number>): Types.Int4<0 | 1>
    divide(...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    ["="](this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    ["="](this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    ["="](this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    eq(this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    eq(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    eq(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    [">="](this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    [">="](this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    [">="](this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    gte(this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    gte(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    gte(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    [">"](this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    [">"](this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    [">"](this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    gt(this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    gt(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    gt(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    ["<="](this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    ["<="](this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    ["<="](this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    lte(this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    lte(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    lte(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    ["<"](this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    ["<"](this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    ["<"](this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    lt(this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    lt(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    lt(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"](this: Types.Int4<1>, a1: Types.Int2<1>): Types.Int4<1>
    ["-"](this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1>): Types.Int4<0 | 1>
    ["-"](this: Types.Int4<number>, a1: Types.Int2<number>): Types.Int4<0 | 1>
    ["-"](this: Types.Int4<1>, a1: Types.Int8<1>): Types.Int8<1>
    ["-"](this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    ["-"](this: Types.Int4<number>, a1: Types.Int8<number>): Types.Int8<0 | 1>
    ["-"](this: Types.Int4<1>, a1: Types.Int4<1>): Types.Int4<1>
    ["-"](this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    ["-"](this: Types.Int4<number>, a1: Types.Int4<number>): Types.Int4<0 | 1>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus(this: Types.Int4<1>, a1: Types.Int2<1>): Types.Int4<1>
    minus(this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1>): Types.Int4<0 | 1>
    minus(this: Types.Int4<number>, a1: Types.Int2<number>): Types.Int4<0 | 1>
    minus(this: Types.Int4<1>, a1: Types.Int8<1>): Types.Int8<1>
    minus(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    minus(this: Types.Int4<number>, a1: Types.Int8<number>): Types.Int8<0 | 1>
    minus(this: Types.Int4<1>, a1: Types.Int4<1>): Types.Int4<1>
    minus(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    minus(this: Types.Int4<number>, a1: Types.Int4<number>): Types.Int4<0 | 1>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["*"](this: Types.Int4<1>, a1: Types.Int2<1>): Types.Int4<1>
    ["*"](this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1>): Types.Int4<0 | 1>
    ["*"](this: Types.Int4<number>, a1: Types.Int2<number>): Types.Int4<0 | 1>
    ["*"](this: Types.Int4<1>, a1: Types.Int8<1>): Types.Int8<1>
    ["*"](this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    ["*"](this: Types.Int4<number>, a1: Types.Int8<number>): Types.Int8<0 | 1>
    ["*"](this: Types.Int4<1>, a1: Types.Money<1>): Types.Money<1>
    ["*"](this: Types.Int4<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    ["*"](this: Types.Int4<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    ["*"](this: Types.Int4<1>, a1: Types.Int4<1>): Types.Int4<1>
    ["*"](this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    ["*"](this: Types.Int4<number>, a1: Types.Int4<number>): Types.Int4<0 | 1>
    ["*"](...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multiply(this: Types.Int4<1>, a1: Types.Int2<1>): Types.Int4<1>
    multiply(this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1>): Types.Int4<0 | 1>
    multiply(this: Types.Int4<number>, a1: Types.Int2<number>): Types.Int4<0 | 1>
    multiply(this: Types.Int4<1>, a1: Types.Int8<1>): Types.Int8<1>
    multiply(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    multiply(this: Types.Int4<number>, a1: Types.Int8<number>): Types.Int8<0 | 1>
    multiply(this: Types.Int4<1>, a1: Types.Money<1>): Types.Money<1>
    multiply(this: Types.Int4<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    multiply(this: Types.Int4<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    multiply(this: Types.Int4<1>, a1: Types.Int4<1>): Types.Int4<1>
    multiply(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    multiply(this: Types.Int4<number>, a1: Types.Int4<number>): Types.Int4<0 | 1>
    multiply(...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    ["<>"](this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    ["<>"](this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    ["<>"](this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Int4<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    ne(this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Int4<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Int4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    ne(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Int4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    ne(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["+"](this: Types.Int4<1>, a1: Types.Int2<1>): Types.Int4<1>
    ["+"](this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1>): Types.Int4<0 | 1>
    ["+"](this: Types.Int4<number>, a1: Types.Int2<number>): Types.Int4<0 | 1>
    ["+"](this: Types.Int4<1>, a1: Types.Int8<1>): Types.Int8<1>
    ["+"](this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    ["+"](this: Types.Int4<number>, a1: Types.Int8<number>): Types.Int8<0 | 1>
    ["+"](this: Types.Int4<1>, a1: Types.Int4<1>): Types.Int4<1>
    ["+"](this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    ["+"](this: Types.Int4<number>, a1: Types.Int4<number>): Types.Int4<0 | 1>
    ["+"](this: Types.Int4<1>, a1: Types.Date<1>): Types.Date<1>
    ["+"](this: Types.Int4<0 | 1>, a1: Types.Date<0 | 1>): Types.Date<0 | 1>
    ["+"](this: Types.Int4<number>, a1: Types.Date<number>): Types.Date<0 | 1>
    ["+"](...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Date<0 | 1>], ret: Types.Date<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plus(this: Types.Int4<1>, a1: Types.Int2<1>): Types.Int4<1>
    plus(this: Types.Int4<0 | 1>, a1: Types.Int2<0 | 1>): Types.Int4<0 | 1>
    plus(this: Types.Int4<number>, a1: Types.Int2<number>): Types.Int4<0 | 1>
    plus(this: Types.Int4<1>, a1: Types.Int8<1>): Types.Int8<1>
    plus(this: Types.Int4<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    plus(this: Types.Int4<number>, a1: Types.Int8<number>): Types.Int8<0 | 1>
    plus(this: Types.Int4<1>, a1: Types.Int4<1>): Types.Int4<1>
    plus(this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    plus(this: Types.Int4<number>, a1: Types.Int4<number>): Types.Int4<0 | 1>
    plus(this: Types.Int4<1>, a1: Types.Date<1>): Types.Date<1>
    plus(this: Types.Int4<0 | 1>, a1: Types.Date<0 | 1>): Types.Date<0 | 1>
    plus(this: Types.Int4<number>, a1: Types.Date<number>): Types.Date<0 | 1>
    plus(...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Date<0 | 1>], ret: Types.Date<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&"](this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    ["&"](this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    ["&"](this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    ["&"](...args: unknown[]) {
        return sqlFunction("&", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["%"](this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    ["%"](this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    ["%"](this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    ["%"](...args: unknown[]) {
        return sqlFunction("%", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["|"](this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    ["|"](this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    ["|"](this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    ["|"](...args: unknown[]) {
        return sqlFunction("|", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<<"](this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    ["<<"](this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    ["<<"](this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    ["<<"](...args: unknown[]) {
        return sqlFunction("<<", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">>"](this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    [">>"](this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    [">>"](this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    [">>"](...args: unknown[]) {
        return sqlFunction(">>", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["#"](this: Types.Int4<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    ["#"](this: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    ["#"](this: Types.Int4<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    ["#"](...args: unknown[]) {
        return sqlFunction("#", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
