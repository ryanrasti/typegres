import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Uuid<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Uuid<1>;
    static new(v: null): Uuid<0>;
    static new(v: Expression): Uuid<0 | 1>;
    static new(v: SerializeParam | null | Expression): Uuid<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "uuid" } 
    asAggregate(): Types.Uuid<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Uuid<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Uuid<1> | undefined {
          return undefined;
        }
       
    uuidCmp(this: Types.Uuid<1>, a1: Types.Uuid<1>): Types.Int4<1>
    uuidCmp(this: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Int4<0 | 1>
    uuidCmp(this: Types.Uuid<number>, a1: Types.Uuid<number>): Types.Int4<0 | 1>
    uuidCmp(...args: unknown[]) {
        return sqlFunction("uuid_cmp", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    uuidEq(this: Types.Uuid<1>, a1: Types.Uuid<1>): Types.Bool<1>
    uuidEq(this: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
    uuidEq(this: Types.Uuid<number>, a1: Types.Uuid<number>): Types.Bool<0 | 1>
    uuidEq(...args: unknown[]) {
        return sqlFunction("uuid_eq", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    uuidExtractTimestamp(this: Types.Uuid<1>): Types.Timestamptz<1>
    uuidExtractTimestamp(this: Types.Uuid<0 | 1>): Types.Timestamptz<0 | 1>
    uuidExtractTimestamp(this: Types.Uuid<number>): Types.Timestamptz<0 | 1>
    uuidExtractTimestamp(...args: unknown[]) {
        return sqlFunction("uuid_extract_timestamp", [{args: [Types.Uuid<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    uuidExtractVersion(this: Types.Uuid<1>): Types.Int2<1>
    uuidExtractVersion(this: Types.Uuid<0 | 1>): Types.Int2<0 | 1>
    uuidExtractVersion(this: Types.Uuid<number>): Types.Int2<0 | 1>
    uuidExtractVersion(...args: unknown[]) {
        return sqlFunction("uuid_extract_version", [{args: [Types.Uuid<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    uuidGe(this: Types.Uuid<1>, a1: Types.Uuid<1>): Types.Bool<1>
    uuidGe(this: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
    uuidGe(this: Types.Uuid<number>, a1: Types.Uuid<number>): Types.Bool<0 | 1>
    uuidGe(...args: unknown[]) {
        return sqlFunction("uuid_ge", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    uuidGt(this: Types.Uuid<1>, a1: Types.Uuid<1>): Types.Bool<1>
    uuidGt(this: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
    uuidGt(this: Types.Uuid<number>, a1: Types.Uuid<number>): Types.Bool<0 | 1>
    uuidGt(...args: unknown[]) {
        return sqlFunction("uuid_gt", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    uuidHash(this: Types.Uuid<1>): Types.Int4<1>
    uuidHash(this: Types.Uuid<0 | 1>): Types.Int4<0 | 1>
    uuidHash(this: Types.Uuid<number>): Types.Int4<0 | 1>
    uuidHash(...args: unknown[]) {
        return sqlFunction("uuid_hash", [{args: [Types.Uuid<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    uuidHashExtended(this: Types.Uuid<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    uuidHashExtended(this: Types.Uuid<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    uuidHashExtended(this: Types.Uuid<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    uuidHashExtended(...args: unknown[]) {
        return sqlFunction("uuid_hash_extended", [{args: [Types.Uuid<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    uuidLe(this: Types.Uuid<1>, a1: Types.Uuid<1>): Types.Bool<1>
    uuidLe(this: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
    uuidLe(this: Types.Uuid<number>, a1: Types.Uuid<number>): Types.Bool<0 | 1>
    uuidLe(...args: unknown[]) {
        return sqlFunction("uuid_le", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    uuidLt(this: Types.Uuid<1>, a1: Types.Uuid<1>): Types.Bool<1>
    uuidLt(this: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
    uuidLt(this: Types.Uuid<number>, a1: Types.Uuid<number>): Types.Bool<0 | 1>
    uuidLt(...args: unknown[]) {
        return sqlFunction("uuid_lt", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    uuidNe(this: Types.Uuid<1>, a1: Types.Uuid<1>): Types.Bool<1>
    uuidNe(this: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
    uuidNe(this: Types.Uuid<number>, a1: Types.Uuid<number>): Types.Bool<0 | 1>
    uuidNe(...args: unknown[]) {
        return sqlFunction("uuid_ne", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Uuid<1>, a1: Types.Uuid<1>): Types.Bool<1>
    ["="](this: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Uuid<number>, a1: Types.Uuid<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Uuid<1>, a1: Types.Uuid<1>): Types.Bool<1>
    eq(this: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Uuid<number>, a1: Types.Uuid<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Uuid<1>, a1: Types.Uuid<1>): Types.Bool<1>
    [">="](this: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Uuid<number>, a1: Types.Uuid<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Uuid<1>, a1: Types.Uuid<1>): Types.Bool<1>
    gte(this: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Uuid<number>, a1: Types.Uuid<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Uuid<1>, a1: Types.Uuid<1>): Types.Bool<1>
    [">"](this: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Uuid<number>, a1: Types.Uuid<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Uuid<1>, a1: Types.Uuid<1>): Types.Bool<1>
    gt(this: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Uuid<number>, a1: Types.Uuid<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Uuid<1>, a1: Types.Uuid<1>): Types.Bool<1>
    ["<="](this: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Uuid<number>, a1: Types.Uuid<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Uuid<1>, a1: Types.Uuid<1>): Types.Bool<1>
    lte(this: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Uuid<number>, a1: Types.Uuid<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Uuid<1>, a1: Types.Uuid<1>): Types.Bool<1>
    ["<"](this: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Uuid<number>, a1: Types.Uuid<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Uuid<1>, a1: Types.Uuid<1>): Types.Bool<1>
    lt(this: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Uuid<number>, a1: Types.Uuid<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Uuid<1>, a1: Types.Uuid<1>): Types.Bool<1>
    ["<>"](this: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Uuid<number>, a1: Types.Uuid<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Uuid<1>, a1: Types.Uuid<1>): Types.Bool<1>
    ne(this: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Uuid<number>, a1: Types.Uuid<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
