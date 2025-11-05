import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Xid<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Xid<1>;
    static new(v: null): Xid<0>;
    static new(v: Expression): Xid<0 | 1>;
    static new(v: SerializeParam | null | Expression): Xid<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "xid" } 
    asAggregate(): Types.Xid<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Xid<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Xid<1> | undefined {
          return undefined;
        }
       
    age(this: Types.Xid<1>): Types.Int4<1>
    age(this: Types.Xid<0 | 1>): Types.Int4<0 | 1>
    age(this: Types.Xid<number>): Types.Int4<0 | 1>
    age(...args: unknown[]) {
        return sqlFunction("age", [{args: [Types.Xid<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    mxidAge(this: Types.Xid<1>): Types.Int4<1>
    mxidAge(this: Types.Xid<0 | 1>): Types.Int4<0 | 1>
    mxidAge(this: Types.Xid<number>): Types.Int4<0 | 1>
    mxidAge(...args: unknown[]) {
        return sqlFunction("mxid_age", [{args: [Types.Xid<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetMultixactMembers(this: Types.Xid<1>): Types.FromItem<{xid: Types.Xid<1>, mode: Types.Text<1>}>
    pgGetMultixactMembers(this: Types.Xid<0 | 1>): Types.FromItem<{xid: Types.Xid<0 | 1>, mode: Types.Text<0 | 1>}>
    pgGetMultixactMembers(this: Types.Xid<number>): Types.FromItem<{xid: Types.Xid<0 | 1>, mode: Types.Text<0 | 1>}>
    pgGetMultixactMembers(...args: unknown[]) {
        return sqlFunction("pg_get_multixact_members", [{args: [Types.Xid<0 | 1>], ret: Types.FromItem.ofSchema({xid: Types.Xid<0 | 1>, mode: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgXactCommitTimestamp(this: Types.Xid<1>): Types.Timestamptz<1>
    pgXactCommitTimestamp(this: Types.Xid<0 | 1>): Types.Timestamptz<0 | 1>
    pgXactCommitTimestamp(this: Types.Xid<number>): Types.Timestamptz<0 | 1>
    pgXactCommitTimestamp(...args: unknown[]) {
        return sqlFunction("pg_xact_commit_timestamp", [{args: [Types.Xid<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xideq(this: Types.Xid<1>, a1: Types.Xid<1>): Types.Bool<1>
    xideq(this: Types.Xid<0 | 1>, a1: Types.Xid<0 | 1>): Types.Bool<0 | 1>
    xideq(this: Types.Xid<number>, a1: Types.Xid<number>): Types.Bool<0 | 1>
    xideq(...args: unknown[]) {
        return sqlFunction("xideq", [{args: [Types.Xid<0 | 1>, Types.Xid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xideqint4(this: Types.Xid<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    xideqint4(this: Types.Xid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    xideqint4(this: Types.Xid<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    xideqint4(...args: unknown[]) {
        return sqlFunction("xideqint4", [{args: [Types.Xid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xidneq(this: Types.Xid<1>, a1: Types.Xid<1>): Types.Bool<1>
    xidneq(this: Types.Xid<0 | 1>, a1: Types.Xid<0 | 1>): Types.Bool<0 | 1>
    xidneq(this: Types.Xid<number>, a1: Types.Xid<number>): Types.Bool<0 | 1>
    xidneq(...args: unknown[]) {
        return sqlFunction("xidneq", [{args: [Types.Xid<0 | 1>, Types.Xid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    xidneqint4(this: Types.Xid<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    xidneqint4(this: Types.Xid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    xidneqint4(this: Types.Xid<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    xidneqint4(...args: unknown[]) {
        return sqlFunction("xidneqint4", [{args: [Types.Xid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Xid<1>, a1: Types.Xid<1>): Types.Bool<1>
    ["="](this: Types.Xid<0 | 1>, a1: Types.Xid<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Xid<number>, a1: Types.Xid<number>): Types.Bool<0 | 1>
    ["="](this: Types.Xid<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    ["="](this: Types.Xid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Xid<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Xid<0 | 1>, Types.Xid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Xid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Xid<1>, a1: Types.Xid<1>): Types.Bool<1>
    eq(this: Types.Xid<0 | 1>, a1: Types.Xid<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Xid<number>, a1: Types.Xid<number>): Types.Bool<0 | 1>
    eq(this: Types.Xid<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    eq(this: Types.Xid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Xid<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Xid<0 | 1>, Types.Xid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Xid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Xid<1>, a1: Types.Xid<1>): Types.Bool<1>
    ["<>"](this: Types.Xid<0 | 1>, a1: Types.Xid<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Xid<number>, a1: Types.Xid<number>): Types.Bool<0 | 1>
    ["<>"](this: Types.Xid<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    ["<>"](this: Types.Xid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Xid<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Xid<0 | 1>, Types.Xid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Xid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Xid<1>, a1: Types.Xid<1>): Types.Bool<1>
    ne(this: Types.Xid<0 | 1>, a1: Types.Xid<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Xid<number>, a1: Types.Xid<number>): Types.Bool<0 | 1>
    ne(this: Types.Xid<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    ne(this: Types.Xid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Xid<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Xid<0 | 1>, Types.Xid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Xid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
