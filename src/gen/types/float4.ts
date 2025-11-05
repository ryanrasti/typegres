import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { typeMap } from '../../types/serialization';
import { Expression } from '../../expression';

type Parsed = ReturnType<typeof typeMap["float4"]['parse']>
type SerializeParam = Parameters<typeof typeMap["float4"]['serialize']>[0]
export class Float4<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Float4<1>;
    static new(v: null): Float4<0>;
    static new(v: Expression): Float4<0 | 1>;
    static new(v: SerializeParam | null | Expression): Float4<0 | 1> { return new this(v); }
    static serializeParamTypes: readonly SerializeParam[] | undefined = undefined;
    static parse(v: string) { return typeMap["float4"].parse(v); }
    static typeString(): string | undefined  { return "float4" } 
    asAggregate(): Types.Float4<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Float4<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Float4<1> | undefined {
          return undefined;
        }
       
    abs(this: Types.Float4<1>): Types.Float4<1>
    abs(this: Types.Float4<0 | 1>): Types.Float4<0 | 1>
    abs(this: Types.Float4<number>): Types.Float4<0 | 1>
    abs(...args: unknown[]) {
        return sqlFunction("abs", [{args: [Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    avg(this: Types.Float4<number>): Types.Float8<0 | 1>
    avg(...args: unknown[]) {
        return sqlFunction("avg", [{args: [Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btfloat48Cmp(this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Int4<1>
    btfloat48Cmp(this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Int4<0 | 1>
    btfloat48Cmp(this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Int4<0 | 1>
    btfloat48Cmp(...args: unknown[]) {
        return sqlFunction("btfloat48cmp", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btfloat4Cmp(this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Int4<1>
    btfloat4Cmp(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Int4<0 | 1>
    btfloat4Cmp(this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Int4<0 | 1>
    btfloat4Cmp(...args: unknown[]) {
        return sqlFunction("btfloat4cmp", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float48Div(this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    float48Div(this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    float48Div(this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    float48Div(...args: unknown[]) {
        return sqlFunction("float48div", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float48Eq(this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    float48Eq(this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float48Eq(this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float48Eq(...args: unknown[]) {
        return sqlFunction("float48eq", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float48Ge(this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    float48Ge(this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float48Ge(this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float48Ge(...args: unknown[]) {
        return sqlFunction("float48ge", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float48Gt(this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    float48Gt(this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float48Gt(this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float48Gt(...args: unknown[]) {
        return sqlFunction("float48gt", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float48Le(this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    float48Le(this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float48Le(this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float48Le(...args: unknown[]) {
        return sqlFunction("float48le", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float48Lt(this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    float48Lt(this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float48Lt(this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float48Lt(...args: unknown[]) {
        return sqlFunction("float48lt", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float48Mi(this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    float48Mi(this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    float48Mi(this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    float48Mi(...args: unknown[]) {
        return sqlFunction("float48mi", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float48Mul(this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    float48Mul(this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    float48Mul(this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    float48Mul(...args: unknown[]) {
        return sqlFunction("float48mul", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float48Ne(this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    float48Ne(this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float48Ne(this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    float48Ne(...args: unknown[]) {
        return sqlFunction("float48ne", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float48Pl(this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<1>
    float48Pl(this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    float48Pl(this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
    float48Pl(...args: unknown[]) {
        return sqlFunction("float48pl", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float4Abs(this: Types.Float4<1>): Types.Float4<1>
    float4Abs(this: Types.Float4<0 | 1>): Types.Float4<0 | 1>
    float4Abs(this: Types.Float4<number>): Types.Float4<0 | 1>
    float4Abs(...args: unknown[]) {
        return sqlFunction("float4abs", [{args: [Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float4Div(this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<1>
    float4Div(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<0 | 1>
    float4Div(this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<0 | 1>
    float4Div(...args: unknown[]) {
        return sqlFunction("float4div", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float4Eq(this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    float4Eq(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float4Eq(this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float4Eq(...args: unknown[]) {
        return sqlFunction("float4eq", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float4Ge(this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    float4Ge(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float4Ge(this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float4Ge(...args: unknown[]) {
        return sqlFunction("float4ge", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float4Gt(this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    float4Gt(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float4Gt(this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float4Gt(...args: unknown[]) {
        return sqlFunction("float4gt", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float4Larger(this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<1>
    float4Larger(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<0 | 1>
    float4Larger(this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<0 | 1>
    float4Larger(...args: unknown[]) {
        return sqlFunction("float4larger", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float4Le(this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    float4Le(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float4Le(this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float4Le(...args: unknown[]) {
        return sqlFunction("float4le", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float4Lt(this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    float4Lt(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float4Lt(this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float4Lt(...args: unknown[]) {
        return sqlFunction("float4lt", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float4Mi(this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<1>
    float4Mi(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<0 | 1>
    float4Mi(this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<0 | 1>
    float4Mi(...args: unknown[]) {
        return sqlFunction("float4mi", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float4Mul(this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<1>
    float4Mul(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<0 | 1>
    float4Mul(this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<0 | 1>
    float4Mul(...args: unknown[]) {
        return sqlFunction("float4mul", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float4Ne(this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    float4Ne(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float4Ne(this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    float4Ne(...args: unknown[]) {
        return sqlFunction("float4ne", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float4Pl(this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<1>
    float4Pl(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<0 | 1>
    float4Pl(this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<0 | 1>
    float4Pl(...args: unknown[]) {
        return sqlFunction("float4pl", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float4Smaller(this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<1>
    float4Smaller(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<0 | 1>
    float4Smaller(this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<0 | 1>
    float4Smaller(...args: unknown[]) {
        return sqlFunction("float4smaller", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float4Um(this: Types.Float4<1>): Types.Float4<1>
    float4Um(this: Types.Float4<0 | 1>): Types.Float4<0 | 1>
    float4Um(this: Types.Float4<number>): Types.Float4<0 | 1>
    float4Um(...args: unknown[]) {
        return sqlFunction("float4um", [{args: [Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float4Up(this: Types.Float4<1>): Types.Float4<1>
    float4Up(this: Types.Float4<0 | 1>): Types.Float4<0 | 1>
    float4Up(this: Types.Float4<number>): Types.Float4<0 | 1>
    float4Up(...args: unknown[]) {
        return sqlFunction("float4up", [{args: [Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float8(this: Types.Float4<1>): Types.Float8<1>
    float8(this: Types.Float4<0 | 1>): Types.Float8<0 | 1>
    float8(this: Types.Float4<number>): Types.Float8<0 | 1>
    float8(...args: unknown[]) {
        return sqlFunction("float8", [{args: [Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    flt4MulCash(this: Types.Float4<1>, a1: Types.Money<1>): Types.Money<1>
    flt4MulCash(this: Types.Float4<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    flt4MulCash(this: Types.Float4<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    flt4MulCash(...args: unknown[]) {
        return sqlFunction("flt4_mul_cash", [{args: [Types.Float4<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashfloat4(this: Types.Float4<1>): Types.Int4<1>
    hashfloat4(this: Types.Float4<0 | 1>): Types.Int4<0 | 1>
    hashfloat4(this: Types.Float4<number>): Types.Int4<0 | 1>
    hashfloat4(...args: unknown[]) {
        return sqlFunction("hashfloat4", [{args: [Types.Float4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashfloat4Extended(this: Types.Float4<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashfloat4Extended(this: Types.Float4<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashfloat4Extended(this: Types.Float4<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashfloat4Extended(...args: unknown[]) {
        return sqlFunction("hashfloat4extended", [{args: [Types.Float4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    inRange(this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>, a2: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    inRange(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a2: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>, a2: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    inRange(...args: unknown[]) {
        return sqlFunction("in_range", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>, Types.Float8<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2(this: Types.Float4<1>): Types.Int2<1>
    int2(this: Types.Float4<0 | 1>): Types.Int2<0 | 1>
    int2(this: Types.Float4<number>): Types.Int2<0 | 1>
    int2(...args: unknown[]) {
        return sqlFunction("int2", [{args: [Types.Float4<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4(this: Types.Float4<1>): Types.Int4<1>
    int4(this: Types.Float4<0 | 1>): Types.Int4<0 | 1>
    int4(this: Types.Float4<number>): Types.Int4<0 | 1>
    int4(...args: unknown[]) {
        return sqlFunction("int4", [{args: [Types.Float4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8(this: Types.Float4<1>): Types.Int8<1>
    int8(this: Types.Float4<0 | 1>): Types.Int8<0 | 1>
    int8(this: Types.Float4<number>): Types.Int8<0 | 1>
    int8(...args: unknown[]) {
        return sqlFunction("int8", [{args: [Types.Float4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    max(this: Types.Float4<number>): Types.Float4<0 | 1>
    max(...args: unknown[]) {
        return sqlFunction("max", [{args: [Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numeric(this: Types.Float4<1>): Types.Numeric<1>
    numeric(this: Types.Float4<0 | 1>): Types.Numeric<0 | 1>
    numeric(this: Types.Float4<number>): Types.Numeric<0 | 1>
    numeric(...args: unknown[]) {
        return sqlFunction("numeric", [{args: [Types.Float4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    stddev(this: Types.Float4<number>): Types.Float8<0 | 1>
    stddev(...args: unknown[]) {
        return sqlFunction("stddev", [{args: [Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    stddevPop(this: Types.Float4<number>): Types.Float8<0 | 1>
    stddevPop(...args: unknown[]) {
        return sqlFunction("stddev_pop", [{args: [Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    stddevSamp(this: Types.Float4<number>): Types.Float8<0 | 1>
    stddevSamp(...args: unknown[]) {
        return sqlFunction("stddev_samp", [{args: [Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    sum(this: Types.Float4<number>): Types.Float4<0 | 1>
    sum(...args: unknown[]) {
        return sqlFunction("sum", [{args: [Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toChar(this: Types.Float4<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    toChar(this: Types.Float4<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    toChar(this: Types.Float4<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    toChar(...args: unknown[]) {
        return sqlFunction("to_char", [{args: [Types.Float4<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    varPop(this: Types.Float4<number>): Types.Float8<0 | 1>
    varPop(...args: unknown[]) {
        return sqlFunction("var_pop", [{args: [Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    varSamp(this: Types.Float4<number>): Types.Float8<0 | 1>
    varSamp(...args: unknown[]) {
        return sqlFunction("var_samp", [{args: [Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    variance(this: Types.Float4<number>): Types.Float8<0 | 1>
    variance(...args: unknown[]) {
        return sqlFunction("variance", [{args: [Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["/"](this: Types.Float4<1>, a1: Types.Float8<1>): Types.Float8<1>
    ["/"](this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    ["/"](this: Types.Float4<number>, a1: Types.Float8<number>): Types.Float8<0 | 1>
    ["/"](this: Types.Float4<1>, a1: Types.Float4<1>): Types.Float4<1>
    ["/"](this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1>): Types.Float4<0 | 1>
    ["/"](this: Types.Float4<number>, a1: Types.Float4<number>): Types.Float4<0 | 1>
    ["/"](...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    divide(this: Types.Float4<1>, a1: Types.Float8<1>): Types.Float8<1>
    divide(this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    divide(this: Types.Float4<number>, a1: Types.Float8<number>): Types.Float8<0 | 1>
    divide(this: Types.Float4<1>, a1: Types.Float4<1>): Types.Float4<1>
    divide(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1>): Types.Float4<0 | 1>
    divide(this: Types.Float4<number>, a1: Types.Float4<number>): Types.Float4<0 | 1>
    divide(...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    ["="](this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    ["="](this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    eq(this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    eq(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    [">="](this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    [">="](this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    gte(this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    gte(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    [">"](this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    [">"](this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    gt(this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    gt(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    ["<="](this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    ["<="](this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    lte(this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    lte(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    ["<"](this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    ["<"](this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    lt(this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    lt(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"](this: Types.Float4<1>, a1: Types.Float8<1>): Types.Float8<1>
    ["-"](this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    ["-"](this: Types.Float4<number>, a1: Types.Float8<number>): Types.Float8<0 | 1>
    ["-"](this: Types.Float4<1>, a1: Types.Float4<1>): Types.Float4<1>
    ["-"](this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1>): Types.Float4<0 | 1>
    ["-"](this: Types.Float4<number>, a1: Types.Float4<number>): Types.Float4<0 | 1>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus(this: Types.Float4<1>, a1: Types.Float8<1>): Types.Float8<1>
    minus(this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    minus(this: Types.Float4<number>, a1: Types.Float8<number>): Types.Float8<0 | 1>
    minus(this: Types.Float4<1>, a1: Types.Float4<1>): Types.Float4<1>
    minus(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1>): Types.Float4<0 | 1>
    minus(this: Types.Float4<number>, a1: Types.Float4<number>): Types.Float4<0 | 1>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["*"](this: Types.Float4<1>, a1: Types.Float8<1>): Types.Float8<1>
    ["*"](this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    ["*"](this: Types.Float4<number>, a1: Types.Float8<number>): Types.Float8<0 | 1>
    ["*"](this: Types.Float4<1>, a1: Types.Float4<1>): Types.Float4<1>
    ["*"](this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1>): Types.Float4<0 | 1>
    ["*"](this: Types.Float4<number>, a1: Types.Float4<number>): Types.Float4<0 | 1>
    ["*"](this: Types.Float4<1>, a1: Types.Money<1>): Types.Money<1>
    ["*"](this: Types.Float4<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    ["*"](this: Types.Float4<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    ["*"](...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multiply(this: Types.Float4<1>, a1: Types.Float8<1>): Types.Float8<1>
    multiply(this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    multiply(this: Types.Float4<number>, a1: Types.Float8<number>): Types.Float8<0 | 1>
    multiply(this: Types.Float4<1>, a1: Types.Float4<1>): Types.Float4<1>
    multiply(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1>): Types.Float4<0 | 1>
    multiply(this: Types.Float4<number>, a1: Types.Float4<number>): Types.Float4<0 | 1>
    multiply(this: Types.Float4<1>, a1: Types.Money<1>): Types.Money<1>
    multiply(this: Types.Float4<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
    multiply(this: Types.Float4<number>, a1: Types.Money<number>): Types.Money<0 | 1>
    multiply(...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    ["<>"](this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    ["<>"](this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Float4<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<1>
    ne(this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Float4<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Float4<1>, a1: Types.Float4<1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<1>
    ne(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Float4<number>, a1: Types.Float4<number> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["+"](this: Types.Float4<1>, a1: Types.Float8<1>): Types.Float8<1>
    ["+"](this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    ["+"](this: Types.Float4<number>, a1: Types.Float8<number>): Types.Float8<0 | 1>
    ["+"](this: Types.Float4<1>, a1: Types.Float4<1>): Types.Float4<1>
    ["+"](this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1>): Types.Float4<0 | 1>
    ["+"](this: Types.Float4<number>, a1: Types.Float4<number>): Types.Float4<0 | 1>
    ["+"](...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plus(this: Types.Float4<1>, a1: Types.Float8<1>): Types.Float8<1>
    plus(this: Types.Float4<0 | 1>, a1: Types.Float8<0 | 1>): Types.Float8<0 | 1>
    plus(this: Types.Float4<number>, a1: Types.Float8<number>): Types.Float8<0 | 1>
    plus(this: Types.Float4<1>, a1: Types.Float4<1>): Types.Float4<1>
    plus(this: Types.Float4<0 | 1>, a1: Types.Float4<0 | 1>): Types.Float4<0 | 1>
    plus(this: Types.Float4<number>, a1: Types.Float4<number>): Types.Float4<0 | 1>
    plus(...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
