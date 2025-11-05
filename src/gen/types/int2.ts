import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { typeMap } from '../../types/serialization';
import { Expression } from '../../expression';

type Parsed = ReturnType<typeof typeMap["int2"]['parse']>
type SerializeParam = Parameters<typeof typeMap["int2"]['serialize']>[0]
export class Int2<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Int2<1>;
    static new(v: null): Int2<0>;
    static new(v: Expression): Int2<0 | 1>;
    static new(v: SerializeParam | null | Expression): Int2<0 | 1> { return new this(v); }
    static serializeParamTypes: readonly SerializeParam[] | undefined = undefined;
    static parse(v: string) { return typeMap["int2"].parse(v); }
    static typeString(): string | undefined  { return "int2" } 
    asAggregate(): Types.Int2<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Int2<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Int2<1> | undefined {
          return undefined;
        }
       
    abs(this: Types.Int2<1>): Types.Int2<1>
    abs(this: Types.Int2<0 | 1>): Types.Int2<0 | 1>
    abs(this: Types.Int2<number>): Types.Int2<0 | 1>
    abs(...args: unknown[]) {
        return sqlFunction("abs", [{args: [Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    avg(this: Types.Int2<number>): Types.Numeric<0 | 1>
    avg(...args: unknown[]) {
        return sqlFunction("avg", [{args: [Types.Int2<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitAnd(this: Types.Int2<number>): Types.Int2<0 | 1>
    bitAnd(...args: unknown[]) {
        return sqlFunction("bit_and", [{args: [Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitOr(this: Types.Int2<number>): Types.Int2<0 | 1>
    bitOr(...args: unknown[]) {
        return sqlFunction("bit_or", [{args: [Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitXor(this: Types.Int2<number>): Types.Int2<0 | 1>
    bitXor(...args: unknown[]) {
        return sqlFunction("bit_xor", [{args: [Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btint24Cmp(this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    btint24Cmp(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    btint24Cmp(this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    btint24Cmp(...args: unknown[]) {
        return sqlFunction("btint24cmp", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btint28Cmp(this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<1>
    btint28Cmp(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<0 | 1>
    btint28Cmp(this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<0 | 1>
    btint28Cmp(...args: unknown[]) {
        return sqlFunction("btint28cmp", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btint2Cmp(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<1>
    btint2Cmp(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
    btint2Cmp(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
    btint2Cmp(...args: unknown[]) {
        return sqlFunction("btint2cmp", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float4(this: Types.Int2<1>): Types.Float4<1>
    float4(this: Types.Int2<0 | 1>): Types.Float4<0 | 1>
    float4(this: Types.Int2<number>): Types.Float4<0 | 1>
    float4(...args: unknown[]) {
        return sqlFunction("float4", [{args: [Types.Int2<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float8(this: Types.Int2<1>): Types.Float8<1>
    float8(this: Types.Int2<0 | 1>): Types.Float8<0 | 1>
    float8(this: Types.Int2<number>): Types.Float8<0 | 1>
    float8(...args: unknown[]) {
        return sqlFunction("float8", [{args: [Types.Int2<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashint2(this: Types.Int2<1>): Types.Int4<1>
    hashint2(this: Types.Int2<0 | 1>): Types.Int4<0 | 1>
    hashint2(this: Types.Int2<number>): Types.Int4<0 | 1>
    hashint2(...args: unknown[]) {
        return sqlFunction("hashint2", [{args: [Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashint2Extended(this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashint2Extended(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashint2Extended(this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashint2Extended(...args: unknown[]) {
        return sqlFunction("hashint2extended", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    inRange(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    inRange(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    inRange(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    inRange(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(...args: unknown[]) {
        return sqlFunction("in_range", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>, Types.Int2<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>, Types.Int4<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>, Types.Int8<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int24Div(this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    int24Div(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int24Div(this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int24Div(...args: unknown[]) {
        return sqlFunction("int24div", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int24Eq(this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    int24Eq(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int24Eq(this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int24Eq(...args: unknown[]) {
        return sqlFunction("int24eq", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int24Ge(this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    int24Ge(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int24Ge(this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int24Ge(...args: unknown[]) {
        return sqlFunction("int24ge", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int24Gt(this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    int24Gt(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int24Gt(this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int24Gt(...args: unknown[]) {
        return sqlFunction("int24gt", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int24Le(this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    int24Le(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int24Le(this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int24Le(...args: unknown[]) {
        return sqlFunction("int24le", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int24Lt(this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    int24Lt(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int24Lt(this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int24Lt(...args: unknown[]) {
        return sqlFunction("int24lt", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int24Mi(this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    int24Mi(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int24Mi(this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int24Mi(...args: unknown[]) {
        return sqlFunction("int24mi", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int24Mul(this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    int24Mul(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int24Mul(this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int24Mul(...args: unknown[]) {
        return sqlFunction("int24mul", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int24Ne(this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    int24Ne(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int24Ne(this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    int24Ne(...args: unknown[]) {
        return sqlFunction("int24ne", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int24Pl(this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    int24Pl(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int24Pl(this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    int24Pl(...args: unknown[]) {
        return sqlFunction("int24pl", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int28Div(this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    int28Div(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int28Div(this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int28Div(...args: unknown[]) {
        return sqlFunction("int28div", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int28Eq(this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    int28Eq(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int28Eq(this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int28Eq(...args: unknown[]) {
        return sqlFunction("int28eq", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int28Ge(this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    int28Ge(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int28Ge(this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int28Ge(...args: unknown[]) {
        return sqlFunction("int28ge", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int28Gt(this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    int28Gt(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int28Gt(this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int28Gt(...args: unknown[]) {
        return sqlFunction("int28gt", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int28Le(this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    int28Le(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int28Le(this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int28Le(...args: unknown[]) {
        return sqlFunction("int28le", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int28Lt(this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    int28Lt(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int28Lt(this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int28Lt(...args: unknown[]) {
        return sqlFunction("int28lt", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int28Mi(this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    int28Mi(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int28Mi(this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int28Mi(...args: unknown[]) {
        return sqlFunction("int28mi", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int28Mul(this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    int28Mul(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int28Mul(this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int28Mul(...args: unknown[]) {
        return sqlFunction("int28mul", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int28Ne(this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    int28Ne(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int28Ne(this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    int28Ne(...args: unknown[]) {
        return sqlFunction("int28ne", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int28Pl(this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    int28Pl(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int28Pl(this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    int28Pl(...args: unknown[]) {
        return sqlFunction("int28pl", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2MulCash(this: Types.Int2<1>, a1: Types.Money<1>): Types.Money<1>
    int2MulCash(this: Types.Int2<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    int2MulCash(this: Types.Int2<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    int2MulCash(...args: unknown[]) {
        return sqlFunction("int2_mul_cash", [{args: [Types.Int2<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Abs(this: Types.Int2<1>): Types.Int2<1>
    int2Abs(this: Types.Int2<0 | 1>): Types.Int2<0 | 1>
    int2Abs(this: Types.Int2<number>): Types.Int2<0 | 1>
    int2Abs(...args: unknown[]) {
        return sqlFunction("int2abs", [{args: [Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2And(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<1>
    int2And(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    int2And(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    int2And(...args: unknown[]) {
        return sqlFunction("int2and", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Div(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<1>
    int2Div(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    int2Div(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    int2Div(...args: unknown[]) {
        return sqlFunction("int2div", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Eq(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    int2Eq(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int2Eq(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int2Eq(...args: unknown[]) {
        return sqlFunction("int2eq", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Ge(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    int2Ge(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int2Ge(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int2Ge(...args: unknown[]) {
        return sqlFunction("int2ge", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Gt(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    int2Gt(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int2Gt(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int2Gt(...args: unknown[]) {
        return sqlFunction("int2gt", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Larger(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<1>
    int2Larger(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    int2Larger(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    int2Larger(...args: unknown[]) {
        return sqlFunction("int2larger", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Le(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    int2Le(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int2Le(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int2Le(...args: unknown[]) {
        return sqlFunction("int2le", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Lt(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    int2Lt(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int2Lt(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int2Lt(...args: unknown[]) {
        return sqlFunction("int2lt", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Mi(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<1>
    int2Mi(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    int2Mi(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    int2Mi(...args: unknown[]) {
        return sqlFunction("int2mi", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Mod(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<1>
    int2Mod(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    int2Mod(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    int2Mod(...args: unknown[]) {
        return sqlFunction("int2mod", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Mul(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<1>
    int2Mul(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    int2Mul(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    int2Mul(...args: unknown[]) {
        return sqlFunction("int2mul", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Ne(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    int2Ne(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int2Ne(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    int2Ne(...args: unknown[]) {
        return sqlFunction("int2ne", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Not(this: Types.Int2<1>): Types.Int2<1>
    int2Not(this: Types.Int2<0 | 1>): Types.Int2<0 | 1>
    int2Not(this: Types.Int2<number>): Types.Int2<0 | 1>
    int2Not(...args: unknown[]) {
        return sqlFunction("int2not", [{args: [Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Or(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<1>
    int2Or(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    int2Or(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    int2Or(...args: unknown[]) {
        return sqlFunction("int2or", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Pl(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<1>
    int2Pl(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    int2Pl(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    int2Pl(...args: unknown[]) {
        return sqlFunction("int2pl", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Shl(this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int2<1>
    int2Shl(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int2<0 | 1>
    int2Shl(this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int2<0 | 1>
    int2Shl(...args: unknown[]) {
        return sqlFunction("int2shl", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Shr(this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int2<1>
    int2Shr(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int2<0 | 1>
    int2Shr(this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int2<0 | 1>
    int2Shr(...args: unknown[]) {
        return sqlFunction("int2shr", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Smaller(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<1>
    int2Smaller(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    int2Smaller(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    int2Smaller(...args: unknown[]) {
        return sqlFunction("int2smaller", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Um(this: Types.Int2<1>): Types.Int2<1>
    int2Um(this: Types.Int2<0 | 1>): Types.Int2<0 | 1>
    int2Um(this: Types.Int2<number>): Types.Int2<0 | 1>
    int2Um(...args: unknown[]) {
        return sqlFunction("int2um", [{args: [Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Up(this: Types.Int2<1>): Types.Int2<1>
    int2Up(this: Types.Int2<0 | 1>): Types.Int2<0 | 1>
    int2Up(this: Types.Int2<number>): Types.Int2<0 | 1>
    int2Up(...args: unknown[]) {
        return sqlFunction("int2up", [{args: [Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2Xor(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<1>
    int2Xor(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    int2Xor(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    int2Xor(...args: unknown[]) {
        return sqlFunction("int2xor", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4(this: Types.Int2<1>): Types.Int4<1>
    int4(this: Types.Int2<0 | 1>): Types.Int4<0 | 1>
    int4(this: Types.Int2<number>): Types.Int4<0 | 1>
    int4(...args: unknown[]) {
        return sqlFunction("int4", [{args: [Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8(this: Types.Int2<1>): Types.Int8<1>
    int8(this: Types.Int2<0 | 1>): Types.Int8<0 | 1>
    int8(this: Types.Int2<number>): Types.Int8<0 | 1>
    int8(...args: unknown[]) {
        return sqlFunction("int8", [{args: [Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    max(this: Types.Int2<number>): Types.Int2<0 | 1>
    max(...args: unknown[]) {
        return sqlFunction("max", [{args: [Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    mod(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<1>
    mod(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    mod(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    mod(...args: unknown[]) {
        return sqlFunction("mod", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numeric(this: Types.Int2<1>): Types.Numeric<1>
    numeric(this: Types.Int2<0 | 1>): Types.Numeric<0 | 1>
    numeric(this: Types.Int2<number>): Types.Numeric<0 | 1>
    numeric(...args: unknown[]) {
        return sqlFunction("numeric", [{args: [Types.Int2<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    stddev(this: Types.Int2<number>): Types.Numeric<0 | 1>
    stddev(...args: unknown[]) {
        return sqlFunction("stddev", [{args: [Types.Int2<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    stddevPop(this: Types.Int2<number>): Types.Numeric<0 | 1>
    stddevPop(...args: unknown[]) {
        return sqlFunction("stddev_pop", [{args: [Types.Int2<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    stddevSamp(this: Types.Int2<number>): Types.Numeric<0 | 1>
    stddevSamp(...args: unknown[]) {
        return sqlFunction("stddev_samp", [{args: [Types.Int2<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    sum(this: Types.Int2<number>): Types.Int8<0 | 1>
    sum(...args: unknown[]) {
        return sqlFunction("sum", [{args: [Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    varPop(this: Types.Int2<number>): Types.Numeric<0 | 1>
    varPop(...args: unknown[]) {
        return sqlFunction("var_pop", [{args: [Types.Int2<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    varSamp(this: Types.Int2<number>): Types.Numeric<0 | 1>
    varSamp(...args: unknown[]) {
        return sqlFunction("var_samp", [{args: [Types.Int2<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    variance(this: Types.Int2<number>): Types.Numeric<0 | 1>
    variance(...args: unknown[]) {
        return sqlFunction("variance", [{args: [Types.Int2<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["/"](this: Types.Int2<1>, a1: Types.Int4<1>): Types.Int4<1>
    ["/"](this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    ["/"](this: Types.Int2<number>, a1: Types.Int4<number>): Types.Int4<0 | 1>
    ["/"](this: Types.Int2<1>, a1: Types.Int8<1>): Types.Int8<1>
    ["/"](this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    ["/"](this: Types.Int2<number>, a1: Types.Int8<number>): Types.Int8<0 | 1>
    ["/"](this: Types.Int2<1>, a1: Types.Int2<1>): Types.Int2<1>
    ["/"](this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1>): Types.Int2<0 | 1>
    ["/"](this: Types.Int2<number>, a1: Types.Int2<number>): Types.Int2<0 | 1>
    ["/"](...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    divide(this: Types.Int2<1>, a1: Types.Int4<1>): Types.Int4<1>
    divide(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    divide(this: Types.Int2<number>, a1: Types.Int4<number>): Types.Int4<0 | 1>
    divide(this: Types.Int2<1>, a1: Types.Int8<1>): Types.Int8<1>
    divide(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    divide(this: Types.Int2<number>, a1: Types.Int8<number>): Types.Int8<0 | 1>
    divide(this: Types.Int2<1>, a1: Types.Int2<1>): Types.Int2<1>
    divide(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1>): Types.Int2<0 | 1>
    divide(this: Types.Int2<number>, a1: Types.Int2<number>): Types.Int2<0 | 1>
    divide(...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    ["="](this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    ["="](this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    ["="](this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    eq(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    eq(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    eq(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    [">="](this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    [">="](this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    [">="](this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    gte(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    gte(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    gte(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    [">"](this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    [">"](this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    [">"](this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    gt(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    gt(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    gt(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    ["<="](this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    ["<="](this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    ["<="](this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    lte(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    lte(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    lte(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    ["<"](this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    ["<"](this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    ["<"](this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    lt(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    lt(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    lt(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"](this: Types.Int2<1>, a1: Types.Int4<1>): Types.Int4<1>
    ["-"](this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    ["-"](this: Types.Int2<number>, a1: Types.Int4<number>): Types.Int4<0 | 1>
    ["-"](this: Types.Int2<1>, a1: Types.Int8<1>): Types.Int8<1>
    ["-"](this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    ["-"](this: Types.Int2<number>, a1: Types.Int8<number>): Types.Int8<0 | 1>
    ["-"](this: Types.Int2<1>, a1: Types.Int2<1>): Types.Int2<1>
    ["-"](this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1>): Types.Int2<0 | 1>
    ["-"](this: Types.Int2<number>, a1: Types.Int2<number>): Types.Int2<0 | 1>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus(this: Types.Int2<1>, a1: Types.Int4<1>): Types.Int4<1>
    minus(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    minus(this: Types.Int2<number>, a1: Types.Int4<number>): Types.Int4<0 | 1>
    minus(this: Types.Int2<1>, a1: Types.Int8<1>): Types.Int8<1>
    minus(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    minus(this: Types.Int2<number>, a1: Types.Int8<number>): Types.Int8<0 | 1>
    minus(this: Types.Int2<1>, a1: Types.Int2<1>): Types.Int2<1>
    minus(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1>): Types.Int2<0 | 1>
    minus(this: Types.Int2<number>, a1: Types.Int2<number>): Types.Int2<0 | 1>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["*"](this: Types.Int2<1>, a1: Types.Int4<1>): Types.Int4<1>
    ["*"](this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    ["*"](this: Types.Int2<number>, a1: Types.Int4<number>): Types.Int4<0 | 1>
    ["*"](this: Types.Int2<1>, a1: Types.Int8<1>): Types.Int8<1>
    ["*"](this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    ["*"](this: Types.Int2<number>, a1: Types.Int8<number>): Types.Int8<0 | 1>
    ["*"](this: Types.Int2<1>, a1: Types.Money<1>): Types.Money<1>
    ["*"](this: Types.Int2<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    ["*"](this: Types.Int2<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    ["*"](this: Types.Int2<1>, a1: Types.Int2<1>): Types.Int2<1>
    ["*"](this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1>): Types.Int2<0 | 1>
    ["*"](this: Types.Int2<number>, a1: Types.Int2<number>): Types.Int2<0 | 1>
    ["*"](...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multiply(this: Types.Int2<1>, a1: Types.Int4<1>): Types.Int4<1>
    multiply(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    multiply(this: Types.Int2<number>, a1: Types.Int4<number>): Types.Int4<0 | 1>
    multiply(this: Types.Int2<1>, a1: Types.Int8<1>): Types.Int8<1>
    multiply(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    multiply(this: Types.Int2<number>, a1: Types.Int8<number>): Types.Int8<0 | 1>
    multiply(this: Types.Int2<1>, a1: Types.Money<1>): Types.Money<1>
    multiply(this: Types.Int2<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    multiply(this: Types.Int2<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    multiply(this: Types.Int2<1>, a1: Types.Int2<1>): Types.Int2<1>
    multiply(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1>): Types.Int2<0 | 1>
    multiply(this: Types.Int2<number>, a1: Types.Int2<number>): Types.Int2<0 | 1>
    multiply(...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    ["<>"](this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    ["<>"](this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    ["<>"](this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    ne(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Int2<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<1>
    ne(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Int2<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<1>
    ne(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["+"](this: Types.Int2<1>, a1: Types.Int4<1>): Types.Int4<1>
    ["+"](this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    ["+"](this: Types.Int2<number>, a1: Types.Int4<number>): Types.Int4<0 | 1>
    ["+"](this: Types.Int2<1>, a1: Types.Int8<1>): Types.Int8<1>
    ["+"](this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    ["+"](this: Types.Int2<number>, a1: Types.Int8<number>): Types.Int8<0 | 1>
    ["+"](this: Types.Int2<1>, a1: Types.Int2<1>): Types.Int2<1>
    ["+"](this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1>): Types.Int2<0 | 1>
    ["+"](this: Types.Int2<number>, a1: Types.Int2<number>): Types.Int2<0 | 1>
    ["+"](...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plus(this: Types.Int2<1>, a1: Types.Int4<1>): Types.Int4<1>
    plus(this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int4<0 | 1>
    plus(this: Types.Int2<number>, a1: Types.Int4<number>): Types.Int4<0 | 1>
    plus(this: Types.Int2<1>, a1: Types.Int8<1>): Types.Int8<1>
    plus(this: Types.Int2<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
    plus(this: Types.Int2<number>, a1: Types.Int8<number>): Types.Int8<0 | 1>
    plus(this: Types.Int2<1>, a1: Types.Int2<1>): Types.Int2<1>
    plus(this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1>): Types.Int2<0 | 1>
    plus(this: Types.Int2<number>, a1: Types.Int2<number>): Types.Int2<0 | 1>
    plus(...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&"](this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<1>
    ["&"](this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    ["&"](this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    ["&"](...args: unknown[]) {
        return sqlFunction("&", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["%"](this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<1>
    ["%"](this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    ["%"](this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    ["%"](...args: unknown[]) {
        return sqlFunction("%", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["|"](this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<1>
    ["|"](this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    ["|"](this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    ["|"](...args: unknown[]) {
        return sqlFunction("|", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<<"](this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int2<1>
    ["<<"](this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int2<0 | 1>
    ["<<"](this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int2<0 | 1>
    ["<<"](...args: unknown[]) {
        return sqlFunction("<<", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">>"](this: Types.Int2<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int2<1>
    [">>"](this: Types.Int2<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int2<0 | 1>
    [">>"](this: Types.Int2<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int2<0 | 1>
    [">>"](...args: unknown[]) {
        return sqlFunction(">>", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["#"](this: Types.Int2<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<1>
    ["#"](this: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    ["#"](this: Types.Int2<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
    ["#"](...args: unknown[]) {
        return sqlFunction("#", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
