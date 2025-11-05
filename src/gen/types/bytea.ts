import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Bytea<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Bytea<1>;
    static new(v: null): Bytea<0>;
    static new(v: Expression): Bytea<0 | 1>;
    static new(v: SerializeParam | null | Expression): Bytea<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "bytea" } 
    asAggregate(): Types.Bytea<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Bytea<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Bytea<1> | undefined {
          return undefined;
        }
       
    bitCount(this: Types.Bytea<1>): Types.Int8<1>
    bitCount(this: Types.Bytea<0 | 1>): Types.Int8<0 | 1>
    bitCount(this: Types.Bytea<number>): Types.Int8<0 | 1>
    bitCount(...args: unknown[]) {
        return sqlFunction("bit_count", [{args: [Types.Bytea<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bitLength(this: Types.Bytea<1>): Types.Int4<1>
    bitLength(this: Types.Bytea<0 | 1>): Types.Int4<0 | 1>
    bitLength(this: Types.Bytea<number>): Types.Int4<0 | 1>
    bitLength(...args: unknown[]) {
        return sqlFunction("bit_length", [{args: [Types.Bytea<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btrim(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bytea<1>
    btrim(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bytea<0 | 1>
    btrim(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bytea<0 | 1>
    btrim(...args: unknown[]) {
        return sqlFunction("btrim", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    byteacat(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bytea<1>
    byteacat(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bytea<0 | 1>
    byteacat(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bytea<0 | 1>
    byteacat(...args: unknown[]) {
        return sqlFunction("byteacat", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    byteacmp(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Int4<1>
    byteacmp(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Int4<0 | 1>
    byteacmp(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Int4<0 | 1>
    byteacmp(...args: unknown[]) {
        return sqlFunction("byteacmp", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    byteaeq(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    byteaeq(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    byteaeq(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    byteaeq(...args: unknown[]) {
        return sqlFunction("byteaeq", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    byteage(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    byteage(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    byteage(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    byteage(...args: unknown[]) {
        return sqlFunction("byteage", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    byteagt(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    byteagt(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    byteagt(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    byteagt(...args: unknown[]) {
        return sqlFunction("byteagt", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    byteale(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    byteale(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    byteale(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    byteale(...args: unknown[]) {
        return sqlFunction("byteale", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bytealike(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    bytealike(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    bytealike(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    bytealike(...args: unknown[]) {
        return sqlFunction("bytealike", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bytealt(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    bytealt(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    bytealt(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    bytealt(...args: unknown[]) {
        return sqlFunction("bytealt", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    byteane(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    byteane(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    byteane(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    byteane(...args: unknown[]) {
        return sqlFunction("byteane", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    byteanlike(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    byteanlike(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    byteanlike(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    byteanlike(...args: unknown[]) {
        return sqlFunction("byteanlike", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    convert(this: Types.Bytea<1>, a1: Types.Name<1>, a2: Types.Name<1>): Types.Bytea<1>
    convert(this: Types.Bytea<0 | 1>, a1: Types.Name<0 | 1>, a2: Types.Name<0 | 1>): Types.Bytea<0 | 1>
    convert(this: Types.Bytea<number>, a1: Types.Name<number>, a2: Types.Name<number>): Types.Bytea<0 | 1>
    convert(...args: unknown[]) {
        return sqlFunction("convert", [{args: [Types.Bytea<0 | 1>, Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    convertFrom(this: Types.Bytea<1>, a1: Types.Name<1>): Types.Text<1>
    convertFrom(this: Types.Bytea<0 | 1>, a1: Types.Name<0 | 1>): Types.Text<0 | 1>
    convertFrom(this: Types.Bytea<number>, a1: Types.Name<number>): Types.Text<0 | 1>
    convertFrom(...args: unknown[]) {
        return sqlFunction("convert_from", [{args: [Types.Bytea<0 | 1>, Types.Name<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    encode(this: Types.Bytea<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    encode(this: Types.Bytea<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    encode(this: Types.Bytea<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    encode(...args: unknown[]) {
        return sqlFunction("encode", [{args: [Types.Bytea<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    getBit(this: Types.Bytea<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<1>
    getBit(this: Types.Bytea<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<0 | 1>
    getBit(this: Types.Bytea<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<0 | 1>
    getBit(...args: unknown[]) {
        return sqlFunction("get_bit", [{args: [Types.Bytea<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    getByte(this: Types.Bytea<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    getByte(this: Types.Bytea<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    getByte(this: Types.Bytea<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    getByte(...args: unknown[]) {
        return sqlFunction("get_byte", [{args: [Types.Bytea<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    length(this: Types.Bytea<1>): Types.Int4<1>
    length(this: Types.Bytea<0 | 1>): Types.Int4<0 | 1>
    length(this: Types.Bytea<number>): Types.Int4<0 | 1>
    length(this: Types.Bytea<1>, a1: Types.Name<1>): Types.Int4<1>
    length(this: Types.Bytea<0 | 1>, a1: Types.Name<0 | 1>): Types.Int4<0 | 1>
    length(this: Types.Bytea<number>, a1: Types.Name<number>): Types.Int4<0 | 1>
    length(...args: unknown[]) {
        return sqlFunction("length", [{args: [Types.Bytea<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Bytea<0 | 1>, Types.Name<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    like(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    like(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    like(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    like(...args: unknown[]) {
        return sqlFunction("~~", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    likeEscape(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bytea<1>
    likeEscape(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bytea<0 | 1>
    likeEscape(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bytea<0 | 1>
    likeEscape(...args: unknown[]) {
        return sqlFunction("like_escape", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ltrim(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bytea<1>
    ltrim(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bytea<0 | 1>
    ltrim(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bytea<0 | 1>
    ltrim(...args: unknown[]) {
        return sqlFunction("ltrim", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    md5(this: Types.Bytea<1>): Types.Text<1>
    md5(this: Types.Bytea<0 | 1>): Types.Text<0 | 1>
    md5(this: Types.Bytea<number>): Types.Text<0 | 1>
    md5(...args: unknown[]) {
        return sqlFunction("md5", [{args: [Types.Bytea<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    notlike(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    notlike(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    notlike(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    notlike(...args: unknown[]) {
        return sqlFunction("!~~", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    octetLength(this: Types.Bytea<1>): Types.Int4<1>
    octetLength(this: Types.Bytea<0 | 1>): Types.Int4<0 | 1>
    octetLength(this: Types.Bytea<number>): Types.Int4<0 | 1>
    octetLength(...args: unknown[]) {
        return sqlFunction("octet_length", [{args: [Types.Bytea<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    overlay(this: Types.Bytea<1>, a1: Types.Bytea<1>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<1>
    overlay(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
    overlay(this: Types.Bytea<number>, a1: Types.Bytea<number>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
    overlay(this: Types.Bytea<1>, a1: Types.Bytea<1>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<1>
    overlay(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
    overlay(this: Types.Bytea<number>, a1: Types.Bytea<number>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
    overlay(...args: unknown[]) {
        return sqlFunction("overlay", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    position(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Int4<1>
    position(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Int4<0 | 1>
    position(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Int4<0 | 1>
    position(...args: unknown[]) {
        return sqlFunction("position", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    rtrim(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bytea<1>
    rtrim(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bytea<0 | 1>
    rtrim(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bytea<0 | 1>
    rtrim(...args: unknown[]) {
        return sqlFunction("rtrim", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    setBit(this: Types.Bytea<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<1>
    setBit(this: Types.Bytea<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
    setBit(this: Types.Bytea<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
    setBit(...args: unknown[]) {
        return sqlFunction("set_bit", [{args: [Types.Bytea<0 | 1>, Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    setByte(this: Types.Bytea<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<1>
    setByte(this: Types.Bytea<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
    setByte(this: Types.Bytea<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
    setByte(...args: unknown[]) {
        return sqlFunction("set_byte", [{args: [Types.Bytea<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    sha224(this: Types.Bytea<1>): Types.Bytea<1>
    sha224(this: Types.Bytea<0 | 1>): Types.Bytea<0 | 1>
    sha224(this: Types.Bytea<number>): Types.Bytea<0 | 1>
    sha224(...args: unknown[]) {
        return sqlFunction("sha224", [{args: [Types.Bytea<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    sha256(this: Types.Bytea<1>): Types.Bytea<1>
    sha256(this: Types.Bytea<0 | 1>): Types.Bytea<0 | 1>
    sha256(this: Types.Bytea<number>): Types.Bytea<0 | 1>
    sha256(...args: unknown[]) {
        return sqlFunction("sha256", [{args: [Types.Bytea<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    sha384(this: Types.Bytea<1>): Types.Bytea<1>
    sha384(this: Types.Bytea<0 | 1>): Types.Bytea<0 | 1>
    sha384(this: Types.Bytea<number>): Types.Bytea<0 | 1>
    sha384(...args: unknown[]) {
        return sqlFunction("sha384", [{args: [Types.Bytea<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    sha512(this: Types.Bytea<1>): Types.Bytea<1>
    sha512(this: Types.Bytea<0 | 1>): Types.Bytea<0 | 1>
    sha512(this: Types.Bytea<number>): Types.Bytea<0 | 1>
    sha512(...args: unknown[]) {
        return sqlFunction("sha512", [{args: [Types.Bytea<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    stringAgg(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bytea<0 | 1>
    stringAgg(...args: unknown[]) {
        return sqlFunction("string_agg", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    substr(this: Types.Bytea<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<1>
    substr(this: Types.Bytea<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
    substr(this: Types.Bytea<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
    substr(this: Types.Bytea<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<1>
    substr(this: Types.Bytea<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
    substr(this: Types.Bytea<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
    substr(...args: unknown[]) {
        return sqlFunction("substr", [{args: [Types.Bytea<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Bytea<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    substring(this: Types.Bytea<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<1>
    substring(this: Types.Bytea<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
    substring(this: Types.Bytea<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
    substring(this: Types.Bytea<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<1>
    substring(this: Types.Bytea<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
    substring(this: Types.Bytea<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
    substring(...args: unknown[]) {
        return sqlFunction("substring", [{args: [Types.Bytea<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Bytea<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    ["="](this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    eq(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    [">="](this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    gte(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    [">"](this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    gt(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    ["<="](this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    lte(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~~"](this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    ["~~"](this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    ["~~"](this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    ["~~"](...args: unknown[]) {
        return sqlFunction("~~", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    ["<"](this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    lt(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    ["<>"](this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    ne(this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["!~~"](this: Types.Bytea<1>, a1: Types.Bytea<1>): Types.Bool<1>
    ["!~~"](this: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
    ["!~~"](this: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bool<0 | 1>
    ["!~~"](...args: unknown[]) {
        return sqlFunction("!~~", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
