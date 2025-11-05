import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Name<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Name<1>;
    static new(v: null): Name<0>;
    static new(v: Expression): Name<0 | 1>;
    static new(v: SerializeParam | null | Expression): Name<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "name" } 
    asAggregate(): Types.Name<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Name<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Name<1> | undefined {
          return undefined;
        }
       
    binaryUpgradeLogicalSlotHasCaughtUp(this: Types.Name<1>): Types.Bool<1>
    binaryUpgradeLogicalSlotHasCaughtUp(this: Types.Name<0 | 1>): Types.Bool<0 | 1>
    binaryUpgradeLogicalSlotHasCaughtUp(this: Types.Name<number>): Types.Bool<0 | 1>
    binaryUpgradeLogicalSlotHasCaughtUp(...args: unknown[]) {
        return sqlFunction("binary_upgrade_logical_slot_has_caught_up", [{args: [Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    bpchar(this: Types.Name<1>): Types.Bpchar<1>
    bpchar(this: Types.Name<0 | 1>): Types.Bpchar<0 | 1>
    bpchar(this: Types.Name<number>): Types.Bpchar<0 | 1>
    bpchar(...args: unknown[]) {
        return sqlFunction("bpchar", [{args: [Types.Name<0 | 1>], ret: Types.Bpchar<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btnamecmp(this: Types.Name<1>, a1: Types.Name<1>): Types.Int4<1>
    btnamecmp(this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Int4<0 | 1>
    btnamecmp(this: Types.Name<number>, a1: Types.Name<number>): Types.Int4<0 | 1>
    btnamecmp(...args: unknown[]) {
        return sqlFunction("btnamecmp", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btnametextcmp(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<1>
    btnametextcmp(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    btnametextcmp(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    btnametextcmp(...args: unknown[]) {
        return sqlFunction("btnametextcmp", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasAnyColumnPrivilege(this: Types.Name<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasAnyColumnPrivilege(this: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasAnyColumnPrivilege(this: Types.Name<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasAnyColumnPrivilege(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasAnyColumnPrivilege(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasAnyColumnPrivilege(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasAnyColumnPrivilege(...args: unknown[]) {
        return sqlFunction("has_any_column_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasColumnPrivilege(this: Types.Name<1>, a1: Types.Oid<1>, a2: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasColumnPrivilege(this: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(this: Types.Name<number>, a1: Types.Oid<number>, a2: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(this: Types.Name<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasColumnPrivilege(this: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(this: Types.Name<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasColumnPrivilege(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasColumnPrivilege(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(...args: unknown[]) {
        return sqlFunction("has_column_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Int2<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Int2<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasDatabasePrivilege(this: Types.Name<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasDatabasePrivilege(this: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasDatabasePrivilege(this: Types.Name<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasDatabasePrivilege(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasDatabasePrivilege(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasDatabasePrivilege(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasDatabasePrivilege(...args: unknown[]) {
        return sqlFunction("has_database_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasForeignDataWrapperPrivilege(this: Types.Name<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasForeignDataWrapperPrivilege(this: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasForeignDataWrapperPrivilege(this: Types.Name<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasForeignDataWrapperPrivilege(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasForeignDataWrapperPrivilege(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasForeignDataWrapperPrivilege(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasForeignDataWrapperPrivilege(...args: unknown[]) {
        return sqlFunction("has_foreign_data_wrapper_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasFunctionPrivilege(this: Types.Name<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasFunctionPrivilege(this: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasFunctionPrivilege(this: Types.Name<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasFunctionPrivilege(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasFunctionPrivilege(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasFunctionPrivilege(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasFunctionPrivilege(...args: unknown[]) {
        return sqlFunction("has_function_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasLanguagePrivilege(this: Types.Name<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasLanguagePrivilege(this: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasLanguagePrivilege(this: Types.Name<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasLanguagePrivilege(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasLanguagePrivilege(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasLanguagePrivilege(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasLanguagePrivilege(...args: unknown[]) {
        return sqlFunction("has_language_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasParameterPrivilege(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasParameterPrivilege(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasParameterPrivilege(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasParameterPrivilege(...args: unknown[]) {
        return sqlFunction("has_parameter_privilege", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasSchemaPrivilege(this: Types.Name<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasSchemaPrivilege(this: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSchemaPrivilege(this: Types.Name<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSchemaPrivilege(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasSchemaPrivilege(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSchemaPrivilege(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSchemaPrivilege(...args: unknown[]) {
        return sqlFunction("has_schema_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasSequencePrivilege(this: Types.Name<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasSequencePrivilege(this: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSequencePrivilege(this: Types.Name<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSequencePrivilege(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasSequencePrivilege(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSequencePrivilege(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSequencePrivilege(...args: unknown[]) {
        return sqlFunction("has_sequence_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasServerPrivilege(this: Types.Name<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasServerPrivilege(this: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasServerPrivilege(this: Types.Name<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasServerPrivilege(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasServerPrivilege(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasServerPrivilege(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasServerPrivilege(...args: unknown[]) {
        return sqlFunction("has_server_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasTablePrivilege(this: Types.Name<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasTablePrivilege(this: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablePrivilege(this: Types.Name<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablePrivilege(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasTablePrivilege(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablePrivilege(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablePrivilege(...args: unknown[]) {
        return sqlFunction("has_table_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasTablespacePrivilege(this: Types.Name<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasTablespacePrivilege(this: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablespacePrivilege(this: Types.Name<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablespacePrivilege(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasTablespacePrivilege(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablespacePrivilege(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablespacePrivilege(...args: unknown[]) {
        return sqlFunction("has_tablespace_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasTypePrivilege(this: Types.Name<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasTypePrivilege(this: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTypePrivilege(this: Types.Name<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTypePrivilege(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasTypePrivilege(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTypePrivilege(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTypePrivilege(...args: unknown[]) {
        return sqlFunction("has_type_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashname(this: Types.Name<1>): Types.Int4<1>
    hashname(this: Types.Name<0 | 1>): Types.Int4<0 | 1>
    hashname(this: Types.Name<number>): Types.Int4<0 | 1>
    hashname(...args: unknown[]) {
        return sqlFunction("hashname", [{args: [Types.Name<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashnameextended(this: Types.Name<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashnameextended(this: Types.Name<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashnameextended(this: Types.Name<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashnameextended(...args: unknown[]) {
        return sqlFunction("hashnameextended", [{args: [Types.Name<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    like(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    like(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    like(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    like(...args: unknown[]) {
        return sqlFunction("~~", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    nameconcatoid(this: Types.Name<1>, a1: Types.Oid<1>): Types.Name<1>
    nameconcatoid(this: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>): Types.Name<0 | 1>
    nameconcatoid(this: Types.Name<number>, a1: Types.Oid<number>): Types.Name<0 | 1>
    nameconcatoid(...args: unknown[]) {
        return sqlFunction("nameconcatoid", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>], ret: Types.Name<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    nameeq(this: Types.Name<1>, a1: Types.Name<1>): Types.Bool<1>
    nameeq(this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    nameeq(this: Types.Name<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    nameeq(...args: unknown[]) {
        return sqlFunction("nameeq", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    nameeqtext(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    nameeqtext(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    nameeqtext(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    nameeqtext(...args: unknown[]) {
        return sqlFunction("nameeqtext", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    namege(this: Types.Name<1>, a1: Types.Name<1>): Types.Bool<1>
    namege(this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    namege(this: Types.Name<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    namege(...args: unknown[]) {
        return sqlFunction("namege", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    namegetext(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    namegetext(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    namegetext(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    namegetext(...args: unknown[]) {
        return sqlFunction("namegetext", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    namegt(this: Types.Name<1>, a1: Types.Name<1>): Types.Bool<1>
    namegt(this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    namegt(this: Types.Name<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    namegt(...args: unknown[]) {
        return sqlFunction("namegt", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    namegttext(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    namegttext(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    namegttext(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    namegttext(...args: unknown[]) {
        return sqlFunction("namegttext", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    nameiclike(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    nameiclike(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    nameiclike(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    nameiclike(...args: unknown[]) {
        return sqlFunction("nameiclike", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    nameicnlike(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    nameicnlike(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    nameicnlike(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    nameicnlike(...args: unknown[]) {
        return sqlFunction("nameicnlike", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    nameicregexeq(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    nameicregexeq(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    nameicregexeq(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    nameicregexeq(...args: unknown[]) {
        return sqlFunction("nameicregexeq", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    nameicregexne(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    nameicregexne(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    nameicregexne(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    nameicregexne(...args: unknown[]) {
        return sqlFunction("nameicregexne", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    namele(this: Types.Name<1>, a1: Types.Name<1>): Types.Bool<1>
    namele(this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    namele(this: Types.Name<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    namele(...args: unknown[]) {
        return sqlFunction("namele", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    nameletext(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    nameletext(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    nameletext(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    nameletext(...args: unknown[]) {
        return sqlFunction("nameletext", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    namelike(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    namelike(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    namelike(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    namelike(...args: unknown[]) {
        return sqlFunction("namelike", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    namelt(this: Types.Name<1>, a1: Types.Name<1>): Types.Bool<1>
    namelt(this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    namelt(this: Types.Name<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    namelt(...args: unknown[]) {
        return sqlFunction("namelt", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    namelttext(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    namelttext(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    namelttext(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    namelttext(...args: unknown[]) {
        return sqlFunction("namelttext", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    namene(this: Types.Name<1>, a1: Types.Name<1>): Types.Bool<1>
    namene(this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    namene(this: Types.Name<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    namene(...args: unknown[]) {
        return sqlFunction("namene", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    namenetext(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    namenetext(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    namenetext(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    namenetext(...args: unknown[]) {
        return sqlFunction("namenetext", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    namenlike(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    namenlike(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    namenlike(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    namenlike(...args: unknown[]) {
        return sqlFunction("namenlike", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    nameregexeq(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    nameregexeq(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    nameregexeq(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    nameregexeq(...args: unknown[]) {
        return sqlFunction("nameregexeq", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    nameregexne(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    nameregexne(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    nameregexne(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    nameregexne(...args: unknown[]) {
        return sqlFunction("nameregexne", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    notlike(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    notlike(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    notlike(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    notlike(...args: unknown[]) {
        return sqlFunction("!~~", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgCharToEncoding(this: Types.Name<1>): Types.Int4<1>
    pgCharToEncoding(this: Types.Name<0 | 1>): Types.Int4<0 | 1>
    pgCharToEncoding(this: Types.Name<number>): Types.Int4<0 | 1>
    pgCharToEncoding(...args: unknown[]) {
        return sqlFunction("pg_char_to_encoding", [{args: [Types.Name<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgCopyLogicalReplicationSlot(this: Types.Name<1>, a1: Types.Name<1>): Types.Record<1, {slot_name: Types.Name<1>, lsn: Types.PgLsn<1>}>
    pgCopyLogicalReplicationSlot(this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}>
    pgCopyLogicalReplicationSlot(this: Types.Name<number>, a1: Types.Name<number>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}>
    pgCopyLogicalReplicationSlot(this: Types.Name<1>, a1: Types.Name<1>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Record<1, {slot_name: Types.Name<1>, lsn: Types.PgLsn<1>}>
    pgCopyLogicalReplicationSlot(this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}>
    pgCopyLogicalReplicationSlot(this: Types.Name<number>, a1: Types.Name<number>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}>
    pgCopyLogicalReplicationSlot(this: Types.Name<1>, a1: Types.Name<1>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Name<1>): Types.Record<1, {slot_name: Types.Name<1>, lsn: Types.PgLsn<1>}>
    pgCopyLogicalReplicationSlot(this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Name<0 | 1>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}>
    pgCopyLogicalReplicationSlot(this: Types.Name<number>, a1: Types.Name<number>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Name<number>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}>
    pgCopyLogicalReplicationSlot(...args: unknown[]) {
        return sqlFunction("pg_copy_logical_replication_slot", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Record.of({slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Name<0 | 1>, Types.Bool<0 | 1>], ret: Types.Record.of({slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Name<0 | 1>, Types.Bool<0 | 1>, Types.Name<0 | 1>], ret: Types.Record.of({slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgCopyPhysicalReplicationSlot(this: Types.Name<1>, a1: Types.Name<1>): Types.Record<1, {slot_name: Types.Name<1>, lsn: Types.PgLsn<1>}>
    pgCopyPhysicalReplicationSlot(this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}>
    pgCopyPhysicalReplicationSlot(this: Types.Name<number>, a1: Types.Name<number>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}>
    pgCopyPhysicalReplicationSlot(this: Types.Name<1>, a1: Types.Name<1>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Record<1, {slot_name: Types.Name<1>, lsn: Types.PgLsn<1>}>
    pgCopyPhysicalReplicationSlot(this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}>
    pgCopyPhysicalReplicationSlot(this: Types.Name<number>, a1: Types.Name<number>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}>
    pgCopyPhysicalReplicationSlot(...args: unknown[]) {
        return sqlFunction("pg_copy_physical_replication_slot", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Record.of({slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Name<0 | 1>, Types.Bool<0 | 1>], ret: Types.Record.of({slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgCreateLogicalReplicationSlot(this: Types.Name<1>, a1: Types.Name<1>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Record<1, {slot_name: Types.Name<1>, lsn: Types.PgLsn<1>}>
    pgCreateLogicalReplicationSlot(this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}>
    pgCreateLogicalReplicationSlot(this: Types.Name<number>, a1: Types.Name<number>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}>
    pgCreateLogicalReplicationSlot(...args: unknown[]) {
        return sqlFunction("pg_create_logical_replication_slot", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Record.of({slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgCreatePhysicalReplicationSlot(this: Types.Name<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Record<1, {slot_name: Types.Name<1>, lsn: Types.PgLsn<1>}>
    pgCreatePhysicalReplicationSlot(this: Types.Name<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}>
    pgCreatePhysicalReplicationSlot(this: Types.Name<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}>
    pgCreatePhysicalReplicationSlot(...args: unknown[]) {
        return sqlFunction("pg_create_physical_replication_slot", [{args: [Types.Name<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Record.of({slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgDatabaseSize(this: Types.Name<1>): Types.Int8<1>
    pgDatabaseSize(this: Types.Name<0 | 1>): Types.Int8<0 | 1>
    pgDatabaseSize(this: Types.Name<number>): Types.Int8<0 | 1>
    pgDatabaseSize(...args: unknown[]) {
        return sqlFunction("pg_database_size", [{args: [Types.Name<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgDropReplicationSlot(this: Types.Name<1>): Types.Void<1>
    pgDropReplicationSlot(this: Types.Name<0 | 1>): Types.Void<0 | 1>
    pgDropReplicationSlot(this: Types.Name<number>): Types.Void<0 | 1>
    pgDropReplicationSlot(...args: unknown[]) {
        return sqlFunction("pg_drop_replication_slot", [{args: [Types.Name<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgExtensionUpdatePaths(this: Types.Name<1>): Types.FromItem<{source: Types.Text<1>, target: Types.Text<1>, path: Types.Text<1>}>
    pgExtensionUpdatePaths(this: Types.Name<0 | 1>): Types.FromItem<{source: Types.Text<0 | 1>, target: Types.Text<0 | 1>, path: Types.Text<0 | 1>}>
    pgExtensionUpdatePaths(this: Types.Name<number>): Types.FromItem<{source: Types.Text<0 | 1>, target: Types.Text<0 | 1>, path: Types.Text<0 | 1>}>
    pgExtensionUpdatePaths(...args: unknown[]) {
        return sqlFunction("pg_extension_update_paths", [{args: [Types.Name<0 | 1>], ret: Types.FromItem.ofSchema({source: Types.Text<0 | 1>, target: Types.Text<0 | 1>, path: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgHasRole(this: Types.Name<1>, a1: Types.Name<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    pgHasRole(this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    pgHasRole(this: Types.Name<number>, a1: Types.Name<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    pgHasRole(this: Types.Name<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    pgHasRole(this: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    pgHasRole(this: Types.Name<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    pgHasRole(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    pgHasRole(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    pgHasRole(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    pgHasRole(...args: unknown[]) {
        return sqlFunction("pg_has_role", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgLogicalSlotGetBinaryChanges(this: Types.Name<1>, a1: Types.PgLsn<1>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Array<1, Types.Text<0 | 1>>, ...variadic: (Types.Array<1, Types.Text<0 | 1>>)[]): Types.FromItem<{lsn: Types.PgLsn<1>, xid: Types.Xid<1>, data: Types.Bytea<1>}>
    pgLogicalSlotGetBinaryChanges(this: Types.Name<0 | 1>, a1: Types.PgLsn<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: (Types.Array<0 | 1, Types.Text<0 | 1>>)[]): Types.FromItem<{lsn: Types.PgLsn<0 | 1>, xid: Types.Xid<0 | 1>, data: Types.Bytea<0 | 1>}>
    pgLogicalSlotGetBinaryChanges(this: Types.Name<number>, a1: Types.PgLsn<number>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Array<number, Types.Text<0 | 1>>, ...variadic: (Types.Array<number, Types.Text<0 | 1>>)[]): Types.FromItem<{lsn: Types.PgLsn<0 | 1>, xid: Types.Xid<0 | 1>, data: Types.Bytea<0 | 1>}>
    pgLogicalSlotGetBinaryChanges(...args: unknown[]) {
        return sqlFunction("pg_logical_slot_get_binary_changes", [{args: [Types.Name<0 | 1>, Types.PgLsn<0 | 1>, Types.Int4<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.FromItem.ofSchema({lsn: Types.PgLsn<0 | 1>, xid: Types.Xid<0 | 1>, data: Types.Bytea<0 | 1>}), isOperator: false, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    pgLogicalSlotGetChanges(this: Types.Name<1>, a1: Types.PgLsn<1>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Array<1, Types.Text<0 | 1>>, ...variadic: (Types.Array<1, Types.Text<0 | 1>>)[]): Types.FromItem<{lsn: Types.PgLsn<1>, xid: Types.Xid<1>, data: Types.Text<1>}>
    pgLogicalSlotGetChanges(this: Types.Name<0 | 1>, a1: Types.PgLsn<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: (Types.Array<0 | 1, Types.Text<0 | 1>>)[]): Types.FromItem<{lsn: Types.PgLsn<0 | 1>, xid: Types.Xid<0 | 1>, data: Types.Text<0 | 1>}>
    pgLogicalSlotGetChanges(this: Types.Name<number>, a1: Types.PgLsn<number>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Array<number, Types.Text<0 | 1>>, ...variadic: (Types.Array<number, Types.Text<0 | 1>>)[]): Types.FromItem<{lsn: Types.PgLsn<0 | 1>, xid: Types.Xid<0 | 1>, data: Types.Text<0 | 1>}>
    pgLogicalSlotGetChanges(...args: unknown[]) {
        return sqlFunction("pg_logical_slot_get_changes", [{args: [Types.Name<0 | 1>, Types.PgLsn<0 | 1>, Types.Int4<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.FromItem.ofSchema({lsn: Types.PgLsn<0 | 1>, xid: Types.Xid<0 | 1>, data: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    pgLogicalSlotPeekBinaryChanges(this: Types.Name<1>, a1: Types.PgLsn<1>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Array<1, Types.Text<0 | 1>>, ...variadic: (Types.Array<1, Types.Text<0 | 1>>)[]): Types.FromItem<{lsn: Types.PgLsn<1>, xid: Types.Xid<1>, data: Types.Bytea<1>}>
    pgLogicalSlotPeekBinaryChanges(this: Types.Name<0 | 1>, a1: Types.PgLsn<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: (Types.Array<0 | 1, Types.Text<0 | 1>>)[]): Types.FromItem<{lsn: Types.PgLsn<0 | 1>, xid: Types.Xid<0 | 1>, data: Types.Bytea<0 | 1>}>
    pgLogicalSlotPeekBinaryChanges(this: Types.Name<number>, a1: Types.PgLsn<number>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Array<number, Types.Text<0 | 1>>, ...variadic: (Types.Array<number, Types.Text<0 | 1>>)[]): Types.FromItem<{lsn: Types.PgLsn<0 | 1>, xid: Types.Xid<0 | 1>, data: Types.Bytea<0 | 1>}>
    pgLogicalSlotPeekBinaryChanges(...args: unknown[]) {
        return sqlFunction("pg_logical_slot_peek_binary_changes", [{args: [Types.Name<0 | 1>, Types.PgLsn<0 | 1>, Types.Int4<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.FromItem.ofSchema({lsn: Types.PgLsn<0 | 1>, xid: Types.Xid<0 | 1>, data: Types.Bytea<0 | 1>}), isOperator: false, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    pgLogicalSlotPeekChanges(this: Types.Name<1>, a1: Types.PgLsn<1>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Array<1, Types.Text<0 | 1>>, ...variadic: (Types.Array<1, Types.Text<0 | 1>>)[]): Types.FromItem<{lsn: Types.PgLsn<1>, xid: Types.Xid<1>, data: Types.Text<1>}>
    pgLogicalSlotPeekChanges(this: Types.Name<0 | 1>, a1: Types.PgLsn<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: (Types.Array<0 | 1, Types.Text<0 | 1>>)[]): Types.FromItem<{lsn: Types.PgLsn<0 | 1>, xid: Types.Xid<0 | 1>, data: Types.Text<0 | 1>}>
    pgLogicalSlotPeekChanges(this: Types.Name<number>, a1: Types.PgLsn<number>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Array<number, Types.Text<0 | 1>>, ...variadic: (Types.Array<number, Types.Text<0 | 1>>)[]): Types.FromItem<{lsn: Types.PgLsn<0 | 1>, xid: Types.Xid<0 | 1>, data: Types.Text<0 | 1>}>
    pgLogicalSlotPeekChanges(...args: unknown[]) {
        return sqlFunction("pg_logical_slot_peek_changes", [{args: [Types.Name<0 | 1>, Types.PgLsn<0 | 1>, Types.Int4<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.FromItem.ofSchema({lsn: Types.PgLsn<0 | 1>, xid: Types.Xid<0 | 1>, data: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    pgReplicationSlotAdvance(this: Types.Name<1>, a1: Types.PgLsn<1>): Types.Record<1, {slot_name: Types.Name<1>, end_lsn: Types.PgLsn<1>}>
    pgReplicationSlotAdvance(this: Types.Name<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, end_lsn: Types.PgLsn<0 | 1>}>
    pgReplicationSlotAdvance(this: Types.Name<number>, a1: Types.PgLsn<number>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, end_lsn: Types.PgLsn<0 | 1>}>
    pgReplicationSlotAdvance(...args: unknown[]) {
        return sqlFunction("pg_replication_slot_advance", [{args: [Types.Name<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Record.of({slot_name: Types.Name<0 | 1>, end_lsn: Types.PgLsn<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTablespaceSize(this: Types.Name<1>): Types.Int8<1>
    pgTablespaceSize(this: Types.Name<0 | 1>): Types.Int8<0 | 1>
    pgTablespaceSize(this: Types.Name<number>): Types.Int8<0 | 1>
    pgTablespaceSize(...args: unknown[]) {
        return sqlFunction("pg_tablespace_size", [{args: [Types.Name<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    schemaToXml(this: Types.Name<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<1>
    schemaToXml(this: Types.Name<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    schemaToXml(this: Types.Name<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    schemaToXml(...args: unknown[]) {
        return sqlFunction("schema_to_xml", [{args: [Types.Name<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    schemaToXmlAndXmlschema(this: Types.Name<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<1>
    schemaToXmlAndXmlschema(this: Types.Name<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    schemaToXmlAndXmlschema(this: Types.Name<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    schemaToXmlAndXmlschema(...args: unknown[]) {
        return sqlFunction("schema_to_xml_and_xmlschema", [{args: [Types.Name<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    schemaToXmlschema(this: Types.Name<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<1>
    schemaToXmlschema(this: Types.Name<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    schemaToXmlschema(this: Types.Name<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    schemaToXmlschema(...args: unknown[]) {
        return sqlFunction("schema_to_xmlschema", [{args: [Types.Name<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    text(this: Types.Name<1>): Types.Text<1>
    text(this: Types.Name<0 | 1>): Types.Text<0 | 1>
    text(this: Types.Name<number>): Types.Text<0 | 1>
    text(...args: unknown[]) {
        return sqlFunction("text", [{args: [Types.Name<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    varchar(this: Types.Name<1>): Types.Varchar<1>
    varchar(this: Types.Name<0 | 1>): Types.Varchar<0 | 1>
    varchar(this: Types.Name<number>): Types.Varchar<0 | 1>
    varchar(...args: unknown[]) {
        return sqlFunction("varchar", [{args: [Types.Name<0 | 1>], ret: Types.Varchar<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Name<1>, a1: Types.Name<1>): Types.Bool<1>
    ["="](this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Name<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    ["="](this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["="](this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Name<1>, a1: Types.Name<1>): Types.Bool<1>
    eq(this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Name<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    eq(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    eq(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Name<1>, a1: Types.Name<1>): Types.Bool<1>
    [">="](this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Name<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    [">="](this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    [">="](this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Name<1>, a1: Types.Name<1>): Types.Bool<1>
    gte(this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Name<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    gte(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    gte(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Name<1>, a1: Types.Name<1>): Types.Bool<1>
    [">"](this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Name<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    [">"](this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    [">"](this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Name<1>, a1: Types.Name<1>): Types.Bool<1>
    gt(this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Name<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    gt(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    gt(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~~*"](this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["~~*"](this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~~*"](this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~~*"](...args: unknown[]) {
        return sqlFunction("~~*", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ilike(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ilike(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ilike(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ilike(...args: unknown[]) {
        return sqlFunction("~~*", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["!~~*"](this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["!~~*"](this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~~*"](this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~~*"](...args: unknown[]) {
        return sqlFunction("!~~*", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    notilike(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    notilike(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    notilike(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    notilike(...args: unknown[]) {
        return sqlFunction("!~~*", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~*"](this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["~*"](this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~*"](this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~*"](...args: unknown[]) {
        return sqlFunction("~*", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["!~*"](this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["!~*"](this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~*"](this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~*"](...args: unknown[]) {
        return sqlFunction("!~*", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Name<1>, a1: Types.Name<1>): Types.Bool<1>
    ["<="](this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Name<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    ["<="](this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["<="](this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Name<1>, a1: Types.Name<1>): Types.Bool<1>
    lte(this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Name<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    lte(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    lte(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~~"](this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["~~"](this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~~"](this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~~"](...args: unknown[]) {
        return sqlFunction("~~", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Name<1>, a1: Types.Name<1>): Types.Bool<1>
    ["<"](this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Name<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    ["<"](this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["<"](this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Name<1>, a1: Types.Name<1>): Types.Bool<1>
    lt(this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Name<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    lt(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    lt(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Name<1>, a1: Types.Name<1>): Types.Bool<1>
    ["<>"](this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Name<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    ["<>"](this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["<>"](this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Name<1>, a1: Types.Name<1>): Types.Bool<1>
    ne(this: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Name<number>, a1: Types.Name<number>): Types.Bool<0 | 1>
    ne(this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ne(this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["!~~"](this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["!~~"](this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~~"](this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~~"](...args: unknown[]) {
        return sqlFunction("!~~", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~"](this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["~"](this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~"](this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["~"](...args: unknown[]) {
        return sqlFunction("~", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["!~"](this: Types.Name<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["!~"](this: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~"](this: Types.Name<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["!~"](...args: unknown[]) {
        return sqlFunction("!~", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
