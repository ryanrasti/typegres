import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Char<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Char<1>;
    static new(v: null): Char<0>;
    static new(v: Expression): Char<0 | 1>;
    static new(v: SerializeParam | null | Expression): Char<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "char" } 
    asAggregate(): Types.Char<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Char<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Char<1> | undefined {
          return undefined;
        }
       
    acldefault(this: Types.Char<1>, a1: Types.Oid<1>): Types.Array<1, Types.Aclitem<0 | 1>>
    acldefault(this: Types.Char<0 | 1>, a1: Types.Oid<0 | 1>): Types.Array<0 | 1, Types.Aclitem<0 | 1>>
    acldefault(this: Types.Char<number>, a1: Types.Oid<number>): Types.Array<0 | 1, Types.Aclitem<0 | 1>>
    acldefault(...args: unknown[]) {
        return sqlFunction("acldefault", [{args: [Types.Char<0 | 1>, Types.Oid<0 | 1>], ret: Types.Array.of(Types.Aclitem<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpchar(this: Types.Char<1>): Types.Bpchar<1>
    bpchar(this: Types.Char<0 | 1>): Types.Bpchar<0 | 1>
    bpchar(this: Types.Char<number>): Types.Bpchar<0 | 1>
    bpchar(...args: unknown[]) {
        return sqlFunction("bpchar", [{args: [Types.Char<0 | 1>], ret: Types.Bpchar<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btcharcmp(this: Types.Char<1>, a1: Types.Char<1>): Types.Int4<1>
    btcharcmp(this: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Int4<0 | 1>
    btcharcmp(this: Types.Char<number>, a1: Types.Char<number>): Types.Int4<0 | 1>
    btcharcmp(...args: unknown[]) {
        return sqlFunction("btcharcmp", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    chareq(this: Types.Char<1>, a1: Types.Char<1>): Types.Bool<1>
    chareq(this: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
    chareq(this: Types.Char<number>, a1: Types.Char<number>): Types.Bool<0 | 1>
    chareq(...args: unknown[]) {
        return sqlFunction("chareq", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    charge(this: Types.Char<1>, a1: Types.Char<1>): Types.Bool<1>
    charge(this: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
    charge(this: Types.Char<number>, a1: Types.Char<number>): Types.Bool<0 | 1>
    charge(...args: unknown[]) {
        return sqlFunction("charge", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    chargt(this: Types.Char<1>, a1: Types.Char<1>): Types.Bool<1>
    chargt(this: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
    chargt(this: Types.Char<number>, a1: Types.Char<number>): Types.Bool<0 | 1>
    chargt(...args: unknown[]) {
        return sqlFunction("chargt", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    charle(this: Types.Char<1>, a1: Types.Char<1>): Types.Bool<1>
    charle(this: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
    charle(this: Types.Char<number>, a1: Types.Char<number>): Types.Bool<0 | 1>
    charle(...args: unknown[]) {
        return sqlFunction("charle", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    charlt(this: Types.Char<1>, a1: Types.Char<1>): Types.Bool<1>
    charlt(this: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
    charlt(this: Types.Char<number>, a1: Types.Char<number>): Types.Bool<0 | 1>
    charlt(...args: unknown[]) {
        return sqlFunction("charlt", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    charne(this: Types.Char<1>, a1: Types.Char<1>): Types.Bool<1>
    charne(this: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
    charne(this: Types.Char<number>, a1: Types.Char<number>): Types.Bool<0 | 1>
    charne(...args: unknown[]) {
        return sqlFunction("charne", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashchar(this: Types.Char<1>): Types.Int4<1>
    hashchar(this: Types.Char<0 | 1>): Types.Int4<0 | 1>
    hashchar(this: Types.Char<number>): Types.Int4<0 | 1>
    hashchar(...args: unknown[]) {
        return sqlFunction("hashchar", [{args: [Types.Char<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashcharextended(this: Types.Char<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashcharextended(this: Types.Char<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashcharextended(this: Types.Char<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashcharextended(...args: unknown[]) {
        return sqlFunction("hashcharextended", [{args: [Types.Char<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4(this: Types.Char<1>): Types.Int4<1>
    int4(this: Types.Char<0 | 1>): Types.Int4<0 | 1>
    int4(this: Types.Char<number>): Types.Int4<0 | 1>
    int4(...args: unknown[]) {
        return sqlFunction("int4", [{args: [Types.Char<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    text(this: Types.Char<1>): Types.Text<1>
    text(this: Types.Char<0 | 1>): Types.Text<0 | 1>
    text(this: Types.Char<number>): Types.Text<0 | 1>
    text(...args: unknown[]) {
        return sqlFunction("text", [{args: [Types.Char<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Char<1>, a1: Types.Char<1>): Types.Bool<1>
    ["="](this: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Char<number>, a1: Types.Char<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Char<1>, a1: Types.Char<1>): Types.Bool<1>
    eq(this: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Char<number>, a1: Types.Char<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Char<1>, a1: Types.Char<1>): Types.Bool<1>
    [">="](this: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Char<number>, a1: Types.Char<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Char<1>, a1: Types.Char<1>): Types.Bool<1>
    gte(this: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Char<number>, a1: Types.Char<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Char<1>, a1: Types.Char<1>): Types.Bool<1>
    [">"](this: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Char<number>, a1: Types.Char<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Char<1>, a1: Types.Char<1>): Types.Bool<1>
    gt(this: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Char<number>, a1: Types.Char<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Char<1>, a1: Types.Char<1>): Types.Bool<1>
    ["<="](this: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Char<number>, a1: Types.Char<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Char<1>, a1: Types.Char<1>): Types.Bool<1>
    lte(this: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Char<number>, a1: Types.Char<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Char<1>, a1: Types.Char<1>): Types.Bool<1>
    ["<"](this: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Char<number>, a1: Types.Char<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Char<1>, a1: Types.Char<1>): Types.Bool<1>
    lt(this: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Char<number>, a1: Types.Char<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Char<1>, a1: Types.Char<1>): Types.Bool<1>
    ["<>"](this: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Char<number>, a1: Types.Char<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Char<1>, a1: Types.Char<1>): Types.Bool<1>
    ne(this: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Char<number>, a1: Types.Char<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
