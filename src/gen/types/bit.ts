import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Bit<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Bit<1>;
    static new(v: null): Bit<0>;
    static new(v: Expression): Bit<0 | 1>;
    static new(v: SerializeParam | null | Expression): Bit<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "bit" } 
    asAggregate(): Types.Bit<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Bit<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Bit<1> | undefined {
          return undefined;
        }
       
    bit(this: Types.Bit<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bit<1>
    bit(this: Types.Bit<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bit<0 | 1>
    bit(this: Types.Bit<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bit<0 | 1>
    bit(...args: unknown[]) {
        return sqlFunction("bit", [{args: [Types.Bit<0 | 1>, Types.Int4<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    bitAnd(this: Types.Bit<number>): Types.Bit<0 | 1>
    bitAnd(...args: unknown[]) {
        return sqlFunction("bit_and", [{args: [Types.Bit<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitCount(this: Types.Bit<1>): Types.Int8<1>
    bitCount(this: Types.Bit<0 | 1>): Types.Int8<0 | 1>
    bitCount(this: Types.Bit<number>): Types.Int8<0 | 1>
    bitCount(...args: unknown[]) {
        return sqlFunction("bit_count", [{args: [Types.Bit<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitLength(this: Types.Bit<1>): Types.Int4<1>
    bitLength(this: Types.Bit<0 | 1>): Types.Int4<0 | 1>
    bitLength(this: Types.Bit<number>): Types.Int4<0 | 1>
    bitLength(...args: unknown[]) {
        return sqlFunction("bit_length", [{args: [Types.Bit<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitOr(this: Types.Bit<number>): Types.Bit<0 | 1>
    bitOr(...args: unknown[]) {
        return sqlFunction("bit_or", [{args: [Types.Bit<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitXor(this: Types.Bit<number>): Types.Bit<0 | 1>
    bitXor(...args: unknown[]) {
        return sqlFunction("bit_xor", [{args: [Types.Bit<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitand(this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bit<1>
    bitand(this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bit<0 | 1>
    bitand(this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bit<0 | 1>
    bitand(...args: unknown[]) {
        return sqlFunction("bitand", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitcmp(this: Types.Bit<1>, a1: Types.Bit<1>): Types.Int4<1>
    bitcmp(this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Int4<0 | 1>
    bitcmp(this: Types.Bit<number>, a1: Types.Bit<number>): Types.Int4<0 | 1>
    bitcmp(...args: unknown[]) {
        return sqlFunction("bitcmp", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    biteq(this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bool<1>
    biteq(this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
    biteq(this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bool<0 | 1>
    biteq(...args: unknown[]) {
        return sqlFunction("biteq", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitge(this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bool<1>
    bitge(this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
    bitge(this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bool<0 | 1>
    bitge(...args: unknown[]) {
        return sqlFunction("bitge", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitgt(this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bool<1>
    bitgt(this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
    bitgt(this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bool<0 | 1>
    bitgt(...args: unknown[]) {
        return sqlFunction("bitgt", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitle(this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bool<1>
    bitle(this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
    bitle(this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bool<0 | 1>
    bitle(...args: unknown[]) {
        return sqlFunction("bitle", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitlt(this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bool<1>
    bitlt(this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
    bitlt(this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bool<0 | 1>
    bitlt(...args: unknown[]) {
        return sqlFunction("bitlt", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitne(this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bool<1>
    bitne(this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
    bitne(this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bool<0 | 1>
    bitne(...args: unknown[]) {
        return sqlFunction("bitne", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitnot(this: Types.Bit<1>): Types.Bit<1>
    bitnot(this: Types.Bit<0 | 1>): Types.Bit<0 | 1>
    bitnot(this: Types.Bit<number>): Types.Bit<0 | 1>
    bitnot(...args: unknown[]) {
        return sqlFunction("bitnot", [{args: [Types.Bit<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitor(this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bit<1>
    bitor(this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bit<0 | 1>
    bitor(this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bit<0 | 1>
    bitor(...args: unknown[]) {
        return sqlFunction("bitor", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitshiftleft(this: Types.Bit<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<1>
    bitshiftleft(this: Types.Bit<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    bitshiftleft(this: Types.Bit<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    bitshiftleft(...args: unknown[]) {
        return sqlFunction("bitshiftleft", [{args: [Types.Bit<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitshiftright(this: Types.Bit<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<1>
    bitshiftright(this: Types.Bit<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    bitshiftright(this: Types.Bit<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    bitshiftright(...args: unknown[]) {
        return sqlFunction("bitshiftright", [{args: [Types.Bit<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitxor(this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bit<1>
    bitxor(this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bit<0 | 1>
    bitxor(this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bit<0 | 1>
    bitxor(...args: unknown[]) {
        return sqlFunction("bitxor", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    getBit(this: Types.Bit<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    getBit(this: Types.Bit<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    getBit(this: Types.Bit<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    getBit(...args: unknown[]) {
        return sqlFunction("get_bit", [{args: [Types.Bit<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4(this: Types.Bit<1>): Types.Int4<1>
    int4(this: Types.Bit<0 | 1>): Types.Int4<0 | 1>
    int4(this: Types.Bit<number>): Types.Int4<0 | 1>
    int4(...args: unknown[]) {
        return sqlFunction("int4", [{args: [Types.Bit<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8(this: Types.Bit<1>): Types.Int8<1>
    int8(this: Types.Bit<0 | 1>): Types.Int8<0 | 1>
    int8(this: Types.Bit<number>): Types.Int8<0 | 1>
    int8(...args: unknown[]) {
        return sqlFunction("int8", [{args: [Types.Bit<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    length(this: Types.Bit<1>): Types.Int4<1>
    length(this: Types.Bit<0 | 1>): Types.Int4<0 | 1>
    length(this: Types.Bit<number>): Types.Int4<0 | 1>
    length(...args: unknown[]) {
        return sqlFunction("length", [{args: [Types.Bit<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    octetLength(this: Types.Bit<1>): Types.Int4<1>
    octetLength(this: Types.Bit<0 | 1>): Types.Int4<0 | 1>
    octetLength(this: Types.Bit<number>): Types.Int4<0 | 1>
    octetLength(...args: unknown[]) {
        return sqlFunction("octet_length", [{args: [Types.Bit<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    overlay(this: Types.Bit<1>, a1: Types.Bit<1>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<1>
    overlay(this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    overlay(this: Types.Bit<number>, a1: Types.Bit<number>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    overlay(this: Types.Bit<1>, a1: Types.Bit<1>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<1>
    overlay(this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    overlay(this: Types.Bit<number>, a1: Types.Bit<number>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    overlay(...args: unknown[]) {
        return sqlFunction("overlay", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    position(this: Types.Bit<1>, a1: Types.Bit<1>): Types.Int4<1>
    position(this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Int4<0 | 1>
    position(this: Types.Bit<number>, a1: Types.Bit<number>): Types.Int4<0 | 1>
    position(...args: unknown[]) {
        return sqlFunction("position", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    setBit(this: Types.Bit<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<1>
    setBit(this: Types.Bit<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    setBit(this: Types.Bit<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    setBit(...args: unknown[]) {
        return sqlFunction("set_bit", [{args: [Types.Bit<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    substring(this: Types.Bit<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<1>
    substring(this: Types.Bit<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    substring(this: Types.Bit<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    substring(this: Types.Bit<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<1>
    substring(this: Types.Bit<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    substring(this: Types.Bit<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    substring(...args: unknown[]) {
        return sqlFunction("substring", [{args: [Types.Bit<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Bit<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    ["&"](this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bit<1>
    ["&"](this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bit<0 | 1>
    ["&"](this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bit<0 | 1>
    ["&"](...args: unknown[]) {
        return sqlFunction("&", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bool<1>
    ["="](this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bool<1>
    eq(this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bool<1>
    [">="](this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bool<1>
    gte(this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bool<1>
    [">"](this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bool<1>
    gt(this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bool<1>
    ["<="](this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bool<1>
    lte(this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bool<1>
    ["<"](this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bool<1>
    lt(this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bool<1>
    ["<>"](this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bool<1>
    ne(this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["|"](this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bit<1>
    ["|"](this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bit<0 | 1>
    ["|"](this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bit<0 | 1>
    ["|"](...args: unknown[]) {
        return sqlFunction("|", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<<"](this: Types.Bit<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<1>
    ["<<"](this: Types.Bit<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    ["<<"](this: Types.Bit<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    ["<<"](...args: unknown[]) {
        return sqlFunction("<<", [{args: [Types.Bit<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">>"](this: Types.Bit<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<1>
    [">>"](this: Types.Bit<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    [">>"](this: Types.Bit<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
    [">>"](...args: unknown[]) {
        return sqlFunction(">>", [{args: [Types.Bit<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["#"](this: Types.Bit<1>, a1: Types.Bit<1>): Types.Bit<1>
    ["#"](this: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bit<0 | 1>
    ["#"](this: Types.Bit<number>, a1: Types.Bit<number>): Types.Bit<0 | 1>
    ["#"](...args: unknown[]) {
        return sqlFunction("#", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
