import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Xid8<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Xid8<1>;
    static new(v: null): Xid8<0>;
    static new(v: Expression): Xid8<0 | 1>;
    static new(v: SerializeParam | null | Expression): Xid8<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "xid8" } 
    asAggregate(): Types.Xid8<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Xid8<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Xid8<1> | undefined {
          return undefined;
        }
       
    max(this: Types.Xid8<number>): Types.Xid8<0 | 1>
    max(...args: unknown[]) {
        return sqlFunction("max", [{args: [Types.Xid8<0 | 1>], ret: Types.Xid8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgVisibleInSnapshot(this: Types.Xid8<1>, a1: Types.PgSnapshot<1>): Types.Bool<1>
    pgVisibleInSnapshot(this: Types.Xid8<0 | 1>, a1: Types.PgSnapshot<0 | 1>): Types.Bool<0 | 1>
    pgVisibleInSnapshot(this: Types.Xid8<number>, a1: Types.PgSnapshot<number>): Types.Bool<0 | 1>
    pgVisibleInSnapshot(...args: unknown[]) {
        return sqlFunction("pg_visible_in_snapshot", [{args: [Types.Xid8<0 | 1>, Types.PgSnapshot<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgXactStatus(this: Types.Xid8<1>): Types.Text<1>
    pgXactStatus(this: Types.Xid8<0 | 1>): Types.Text<0 | 1>
    pgXactStatus(this: Types.Xid8<number>): Types.Text<0 | 1>
    pgXactStatus(...args: unknown[]) {
        return sqlFunction("pg_xact_status", [{args: [Types.Xid8<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xid(this: Types.Xid8<1>): Types.Xid<1>
    xid(this: Types.Xid8<0 | 1>): Types.Xid<0 | 1>
    xid(this: Types.Xid8<number>): Types.Xid<0 | 1>
    xid(...args: unknown[]) {
        return sqlFunction("xid", [{args: [Types.Xid8<0 | 1>], ret: Types.Xid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xid8Larger(this: Types.Xid8<1>, a1: Types.Xid8<1>): Types.Xid8<1>
    xid8Larger(this: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Xid8<0 | 1>
    xid8Larger(this: Types.Xid8<number>, a1: Types.Xid8<number>): Types.Xid8<0 | 1>
    xid8Larger(...args: unknown[]) {
        return sqlFunction("xid8_larger", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Xid8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xid8Smaller(this: Types.Xid8<1>, a1: Types.Xid8<1>): Types.Xid8<1>
    xid8Smaller(this: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Xid8<0 | 1>
    xid8Smaller(this: Types.Xid8<number>, a1: Types.Xid8<number>): Types.Xid8<0 | 1>
    xid8Smaller(...args: unknown[]) {
        return sqlFunction("xid8_smaller", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Xid8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xid8Cmp(this: Types.Xid8<1>, a1: Types.Xid8<1>): Types.Int4<1>
    xid8Cmp(this: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Int4<0 | 1>
    xid8Cmp(this: Types.Xid8<number>, a1: Types.Xid8<number>): Types.Int4<0 | 1>
    xid8Cmp(...args: unknown[]) {
        return sqlFunction("xid8cmp", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xid8Eq(this: Types.Xid8<1>, a1: Types.Xid8<1>): Types.Bool<1>
    xid8Eq(this: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
    xid8Eq(this: Types.Xid8<number>, a1: Types.Xid8<number>): Types.Bool<0 | 1>
    xid8Eq(...args: unknown[]) {
        return sqlFunction("xid8eq", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xid8Ge(this: Types.Xid8<1>, a1: Types.Xid8<1>): Types.Bool<1>
    xid8Ge(this: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
    xid8Ge(this: Types.Xid8<number>, a1: Types.Xid8<number>): Types.Bool<0 | 1>
    xid8Ge(...args: unknown[]) {
        return sqlFunction("xid8ge", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xid8Gt(this: Types.Xid8<1>, a1: Types.Xid8<1>): Types.Bool<1>
    xid8Gt(this: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
    xid8Gt(this: Types.Xid8<number>, a1: Types.Xid8<number>): Types.Bool<0 | 1>
    xid8Gt(...args: unknown[]) {
        return sqlFunction("xid8gt", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xid8Le(this: Types.Xid8<1>, a1: Types.Xid8<1>): Types.Bool<1>
    xid8Le(this: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
    xid8Le(this: Types.Xid8<number>, a1: Types.Xid8<number>): Types.Bool<0 | 1>
    xid8Le(...args: unknown[]) {
        return sqlFunction("xid8le", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xid8Lt(this: Types.Xid8<1>, a1: Types.Xid8<1>): Types.Bool<1>
    xid8Lt(this: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
    xid8Lt(this: Types.Xid8<number>, a1: Types.Xid8<number>): Types.Bool<0 | 1>
    xid8Lt(...args: unknown[]) {
        return sqlFunction("xid8lt", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xid8Ne(this: Types.Xid8<1>, a1: Types.Xid8<1>): Types.Bool<1>
    xid8Ne(this: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
    xid8Ne(this: Types.Xid8<number>, a1: Types.Xid8<number>): Types.Bool<0 | 1>
    xid8Ne(...args: unknown[]) {
        return sqlFunction("xid8ne", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Xid8<1>, a1: Types.Xid8<1>): Types.Bool<1>
    ["="](this: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Xid8<number>, a1: Types.Xid8<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Xid8<1>, a1: Types.Xid8<1>): Types.Bool<1>
    eq(this: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Xid8<number>, a1: Types.Xid8<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Xid8<1>, a1: Types.Xid8<1>): Types.Bool<1>
    [">="](this: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Xid8<number>, a1: Types.Xid8<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Xid8<1>, a1: Types.Xid8<1>): Types.Bool<1>
    gte(this: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Xid8<number>, a1: Types.Xid8<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Xid8<1>, a1: Types.Xid8<1>): Types.Bool<1>
    [">"](this: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Xid8<number>, a1: Types.Xid8<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Xid8<1>, a1: Types.Xid8<1>): Types.Bool<1>
    gt(this: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Xid8<number>, a1: Types.Xid8<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Xid8<1>, a1: Types.Xid8<1>): Types.Bool<1>
    ["<="](this: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Xid8<number>, a1: Types.Xid8<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Xid8<1>, a1: Types.Xid8<1>): Types.Bool<1>
    lte(this: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Xid8<number>, a1: Types.Xid8<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Xid8<1>, a1: Types.Xid8<1>): Types.Bool<1>
    ["<"](this: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Xid8<number>, a1: Types.Xid8<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Xid8<1>, a1: Types.Xid8<1>): Types.Bool<1>
    lt(this: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Xid8<number>, a1: Types.Xid8<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Xid8<1>, a1: Types.Xid8<1>): Types.Bool<1>
    ["<>"](this: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Xid8<number>, a1: Types.Xid8<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Xid8<1>, a1: Types.Xid8<1>): Types.Bool<1>
    ne(this: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Xid8<number>, a1: Types.Xid8<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
