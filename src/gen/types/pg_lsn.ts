import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class PgLsn<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): PgLsn<1>;
    static new(v: null): PgLsn<0>;
    static new(v: Expression): PgLsn<0 | 1>;
    static new(v: SerializeParam | null | Expression): PgLsn<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "pg_lsn" } 
    asAggregate(): Types.PgLsn<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.PgLsn<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.PgLsn<1> | undefined {
          return undefined;
        }
       
    max(this: Types.PgLsn<number>): Types.PgLsn<0 | 1>
    max(...args: unknown[]) {
        return sqlFunction("max", [{args: [Types.PgLsn<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgLsnCmp(this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Int4<1>
    pgLsnCmp(this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Int4<0 | 1>
    pgLsnCmp(this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Int4<0 | 1>
    pgLsnCmp(...args: unknown[]) {
        return sqlFunction("pg_lsn_cmp", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgLsnEq(this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Bool<1>
    pgLsnEq(this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
    pgLsnEq(this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Bool<0 | 1>
    pgLsnEq(...args: unknown[]) {
        return sqlFunction("pg_lsn_eq", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgLsnGe(this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Bool<1>
    pgLsnGe(this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
    pgLsnGe(this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Bool<0 | 1>
    pgLsnGe(...args: unknown[]) {
        return sqlFunction("pg_lsn_ge", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgLsnGt(this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Bool<1>
    pgLsnGt(this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
    pgLsnGt(this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Bool<0 | 1>
    pgLsnGt(...args: unknown[]) {
        return sqlFunction("pg_lsn_gt", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgLsnHash(this: Types.PgLsn<1>): Types.Int4<1>
    pgLsnHash(this: Types.PgLsn<0 | 1>): Types.Int4<0 | 1>
    pgLsnHash(this: Types.PgLsn<number>): Types.Int4<0 | 1>
    pgLsnHash(...args: unknown[]) {
        return sqlFunction("pg_lsn_hash", [{args: [Types.PgLsn<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgLsnHashExtended(this: Types.PgLsn<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    pgLsnHashExtended(this: Types.PgLsn<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    pgLsnHashExtended(this: Types.PgLsn<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    pgLsnHashExtended(...args: unknown[]) {
        return sqlFunction("pg_lsn_hash_extended", [{args: [Types.PgLsn<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgLsnLarger(this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.PgLsn<1>
    pgLsnLarger(this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.PgLsn<0 | 1>
    pgLsnLarger(this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.PgLsn<0 | 1>
    pgLsnLarger(...args: unknown[]) {
        return sqlFunction("pg_lsn_larger", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgLsnLe(this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Bool<1>
    pgLsnLe(this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
    pgLsnLe(this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Bool<0 | 1>
    pgLsnLe(...args: unknown[]) {
        return sqlFunction("pg_lsn_le", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgLsnLt(this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Bool<1>
    pgLsnLt(this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
    pgLsnLt(this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Bool<0 | 1>
    pgLsnLt(...args: unknown[]) {
        return sqlFunction("pg_lsn_lt", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgLsnMi(this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Numeric<1>
    pgLsnMi(this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Numeric<0 | 1>
    pgLsnMi(this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Numeric<0 | 1>
    pgLsnMi(...args: unknown[]) {
        return sqlFunction("pg_lsn_mi", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgLsnMii(this: Types.PgLsn<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.PgLsn<1>
    pgLsnMii(this: Types.PgLsn<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.PgLsn<0 | 1>
    pgLsnMii(this: Types.PgLsn<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.PgLsn<0 | 1>
    pgLsnMii(...args: unknown[]) {
        return sqlFunction("pg_lsn_mii", [{args: [Types.PgLsn<0 | 1>, Types.Numeric<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgLsnNe(this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Bool<1>
    pgLsnNe(this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
    pgLsnNe(this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Bool<0 | 1>
    pgLsnNe(...args: unknown[]) {
        return sqlFunction("pg_lsn_ne", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgLsnPli(this: Types.PgLsn<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.PgLsn<1>
    pgLsnPli(this: Types.PgLsn<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.PgLsn<0 | 1>
    pgLsnPli(this: Types.PgLsn<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.PgLsn<0 | 1>
    pgLsnPli(...args: unknown[]) {
        return sqlFunction("pg_lsn_pli", [{args: [Types.PgLsn<0 | 1>, Types.Numeric<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgLsnSmaller(this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.PgLsn<1>
    pgLsnSmaller(this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.PgLsn<0 | 1>
    pgLsnSmaller(this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.PgLsn<0 | 1>
    pgLsnSmaller(...args: unknown[]) {
        return sqlFunction("pg_lsn_smaller", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgReplicationOriginXactSetup(this: Types.PgLsn<1>, a1: Types.Timestamptz<1>): Types.Void<1>
    pgReplicationOriginXactSetup(this: Types.PgLsn<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Void<0 | 1>
    pgReplicationOriginXactSetup(this: Types.PgLsn<number>, a1: Types.Timestamptz<number>): Types.Void<0 | 1>
    pgReplicationOriginXactSetup(...args: unknown[]) {
        return sqlFunction("pg_replication_origin_xact_setup", [{args: [Types.PgLsn<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgWalLsnDiff(this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Numeric<1>
    pgWalLsnDiff(this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Numeric<0 | 1>
    pgWalLsnDiff(this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Numeric<0 | 1>
    pgWalLsnDiff(...args: unknown[]) {
        return sqlFunction("pg_wal_lsn_diff", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgWalfileName(this: Types.PgLsn<1>): Types.Text<1>
    pgWalfileName(this: Types.PgLsn<0 | 1>): Types.Text<0 | 1>
    pgWalfileName(this: Types.PgLsn<number>): Types.Text<0 | 1>
    pgWalfileName(...args: unknown[]) {
        return sqlFunction("pg_walfile_name", [{args: [Types.PgLsn<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgWalfileNameOffset(this: Types.PgLsn<1>): Types.Record<1, {file_name: Types.Text<1>, file_offset: Types.Int4<1>}>
    pgWalfileNameOffset(this: Types.PgLsn<0 | 1>): Types.Record<0 | 1, {file_name: Types.Text<0 | 1>, file_offset: Types.Int4<0 | 1>}>
    pgWalfileNameOffset(this: Types.PgLsn<number>): Types.Record<0 | 1, {file_name: Types.Text<0 | 1>, file_offset: Types.Int4<0 | 1>}>
    pgWalfileNameOffset(...args: unknown[]) {
        return sqlFunction("pg_walfile_name_offset", [{args: [Types.PgLsn<0 | 1>], ret: Types.Record.of({file_name: Types.Text<0 | 1>, file_offset: Types.Int4<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Bool<1>
    ["="](this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Bool<1>
    eq(this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Bool<1>
    [">="](this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Bool<1>
    gte(this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Bool<1>
    [">"](this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Bool<1>
    gt(this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Bool<1>
    ["<="](this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Bool<1>
    lte(this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Bool<1>
    ["<"](this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Bool<1>
    lt(this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"](this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Numeric<1>
    ["-"](this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Numeric<0 | 1>
    ["-"](this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Numeric<0 | 1>
    ["-"](this: Types.PgLsn<1>, a1: Types.Numeric<1>): Types.PgLsn<1>
    ["-"](this: Types.PgLsn<0 | 1>, a1: Types.Numeric<0 | 1>): Types.PgLsn<0 | 1>
    ["-"](this: Types.PgLsn<number>, a1: Types.Numeric<number>): Types.PgLsn<0 | 1>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.PgLsn<0 | 1>, Types.Numeric<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus(this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Numeric<1>
    minus(this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Numeric<0 | 1>
    minus(this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Numeric<0 | 1>
    minus(this: Types.PgLsn<1>, a1: Types.Numeric<1>): Types.PgLsn<1>
    minus(this: Types.PgLsn<0 | 1>, a1: Types.Numeric<0 | 1>): Types.PgLsn<0 | 1>
    minus(this: Types.PgLsn<number>, a1: Types.Numeric<number>): Types.PgLsn<0 | 1>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.PgLsn<0 | 1>, Types.Numeric<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Bool<1>
    ["<>"](this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.PgLsn<1>, a1: Types.PgLsn<1>): Types.Bool<1>
    ne(this: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.PgLsn<number>, a1: Types.PgLsn<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["+"](this: Types.PgLsn<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.PgLsn<1>
    ["+"](this: Types.PgLsn<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.PgLsn<0 | 1>
    ["+"](this: Types.PgLsn<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.PgLsn<0 | 1>
    ["+"](...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.PgLsn<0 | 1>, Types.Numeric<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plus(this: Types.PgLsn<1>, a1: Types.Numeric<1> | Types.Input<Types.Numeric<0 | 1>>): Types.PgLsn<1>
    plus(this: Types.PgLsn<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.PgLsn<0 | 1>
    plus(this: Types.PgLsn<number>, a1: Types.Numeric<number> | Types.Input<Types.Numeric<0 | 1>>): Types.PgLsn<0 | 1>
    plus(...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.PgLsn<0 | 1>, Types.Numeric<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
