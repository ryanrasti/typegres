import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Oid<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Oid<1>;
    static new(v: null): Oid<0>;
    static new(v: Expression): Oid<0 | 1>;
    static new(v: SerializeParam | null | Expression): Oid<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "oid" } 
    asAggregate(): Types.Oid<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Oid<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Oid<1> | undefined {
          return undefined;
        }
       
    amvalidate(this: Types.Oid<1>): Types.Bool<1>
    amvalidate(this: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    amvalidate(this: Types.Oid<number>): Types.Bool<0 | 1>
    amvalidate(...args: unknown[]) {
        return sqlFunction("amvalidate", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    binaryUpgradeSetMissingValue(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Void<1>
    binaryUpgradeSetMissingValue(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Void<0 | 1>
    binaryUpgradeSetMissingValue(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Void<0 | 1>
    binaryUpgradeSetMissingValue(...args: unknown[]) {
        return sqlFunction("binary_upgrade_set_missing_value", [{args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    binaryUpgradeSetNextArrayPgTypeOid(this: Types.Oid<1>): Types.Void<1>
    binaryUpgradeSetNextArrayPgTypeOid(this: Types.Oid<0 | 1>): Types.Void<0 | 1>
    binaryUpgradeSetNextArrayPgTypeOid(this: Types.Oid<number>): Types.Void<0 | 1>
    binaryUpgradeSetNextArrayPgTypeOid(...args: unknown[]) {
        return sqlFunction("binary_upgrade_set_next_array_pg_type_oid", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    binaryUpgradeSetNextHeapPgClassOid(this: Types.Oid<1>): Types.Void<1>
    binaryUpgradeSetNextHeapPgClassOid(this: Types.Oid<0 | 1>): Types.Void<0 | 1>
    binaryUpgradeSetNextHeapPgClassOid(this: Types.Oid<number>): Types.Void<0 | 1>
    binaryUpgradeSetNextHeapPgClassOid(...args: unknown[]) {
        return sqlFunction("binary_upgrade_set_next_heap_pg_class_oid", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    binaryUpgradeSetNextHeapRelfilenode(this: Types.Oid<1>): Types.Void<1>
    binaryUpgradeSetNextHeapRelfilenode(this: Types.Oid<0 | 1>): Types.Void<0 | 1>
    binaryUpgradeSetNextHeapRelfilenode(this: Types.Oid<number>): Types.Void<0 | 1>
    binaryUpgradeSetNextHeapRelfilenode(...args: unknown[]) {
        return sqlFunction("binary_upgrade_set_next_heap_relfilenode", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    binaryUpgradeSetNextIndexPgClassOid(this: Types.Oid<1>): Types.Void<1>
    binaryUpgradeSetNextIndexPgClassOid(this: Types.Oid<0 | 1>): Types.Void<0 | 1>
    binaryUpgradeSetNextIndexPgClassOid(this: Types.Oid<number>): Types.Void<0 | 1>
    binaryUpgradeSetNextIndexPgClassOid(...args: unknown[]) {
        return sqlFunction("binary_upgrade_set_next_index_pg_class_oid", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    binaryUpgradeSetNextIndexRelfilenode(this: Types.Oid<1>): Types.Void<1>
    binaryUpgradeSetNextIndexRelfilenode(this: Types.Oid<0 | 1>): Types.Void<0 | 1>
    binaryUpgradeSetNextIndexRelfilenode(this: Types.Oid<number>): Types.Void<0 | 1>
    binaryUpgradeSetNextIndexRelfilenode(...args: unknown[]) {
        return sqlFunction("binary_upgrade_set_next_index_relfilenode", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    binaryUpgradeSetNextMultirangeArrayPgTypeOid(this: Types.Oid<1>): Types.Void<1>
    binaryUpgradeSetNextMultirangeArrayPgTypeOid(this: Types.Oid<0 | 1>): Types.Void<0 | 1>
    binaryUpgradeSetNextMultirangeArrayPgTypeOid(this: Types.Oid<number>): Types.Void<0 | 1>
    binaryUpgradeSetNextMultirangeArrayPgTypeOid(...args: unknown[]) {
        return sqlFunction("binary_upgrade_set_next_multirange_array_pg_type_oid", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    binaryUpgradeSetNextMultirangePgTypeOid(this: Types.Oid<1>): Types.Void<1>
    binaryUpgradeSetNextMultirangePgTypeOid(this: Types.Oid<0 | 1>): Types.Void<0 | 1>
    binaryUpgradeSetNextMultirangePgTypeOid(this: Types.Oid<number>): Types.Void<0 | 1>
    binaryUpgradeSetNextMultirangePgTypeOid(...args: unknown[]) {
        return sqlFunction("binary_upgrade_set_next_multirange_pg_type_oid", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    binaryUpgradeSetNextPgAuthidOid(this: Types.Oid<1>): Types.Void<1>
    binaryUpgradeSetNextPgAuthidOid(this: Types.Oid<0 | 1>): Types.Void<0 | 1>
    binaryUpgradeSetNextPgAuthidOid(this: Types.Oid<number>): Types.Void<0 | 1>
    binaryUpgradeSetNextPgAuthidOid(...args: unknown[]) {
        return sqlFunction("binary_upgrade_set_next_pg_authid_oid", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    binaryUpgradeSetNextPgEnumOid(this: Types.Oid<1>): Types.Void<1>
    binaryUpgradeSetNextPgEnumOid(this: Types.Oid<0 | 1>): Types.Void<0 | 1>
    binaryUpgradeSetNextPgEnumOid(this: Types.Oid<number>): Types.Void<0 | 1>
    binaryUpgradeSetNextPgEnumOid(...args: unknown[]) {
        return sqlFunction("binary_upgrade_set_next_pg_enum_oid", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    binaryUpgradeSetNextPgTablespaceOid(this: Types.Oid<1>): Types.Void<1>
    binaryUpgradeSetNextPgTablespaceOid(this: Types.Oid<0 | 1>): Types.Void<0 | 1>
    binaryUpgradeSetNextPgTablespaceOid(this: Types.Oid<number>): Types.Void<0 | 1>
    binaryUpgradeSetNextPgTablespaceOid(...args: unknown[]) {
        return sqlFunction("binary_upgrade_set_next_pg_tablespace_oid", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    binaryUpgradeSetNextPgTypeOid(this: Types.Oid<1>): Types.Void<1>
    binaryUpgradeSetNextPgTypeOid(this: Types.Oid<0 | 1>): Types.Void<0 | 1>
    binaryUpgradeSetNextPgTypeOid(this: Types.Oid<number>): Types.Void<0 | 1>
    binaryUpgradeSetNextPgTypeOid(...args: unknown[]) {
        return sqlFunction("binary_upgrade_set_next_pg_type_oid", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    binaryUpgradeSetNextToastPgClassOid(this: Types.Oid<1>): Types.Void<1>
    binaryUpgradeSetNextToastPgClassOid(this: Types.Oid<0 | 1>): Types.Void<0 | 1>
    binaryUpgradeSetNextToastPgClassOid(this: Types.Oid<number>): Types.Void<0 | 1>
    binaryUpgradeSetNextToastPgClassOid(...args: unknown[]) {
        return sqlFunction("binary_upgrade_set_next_toast_pg_class_oid", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    binaryUpgradeSetNextToastRelfilenode(this: Types.Oid<1>): Types.Void<1>
    binaryUpgradeSetNextToastRelfilenode(this: Types.Oid<0 | 1>): Types.Void<0 | 1>
    binaryUpgradeSetNextToastRelfilenode(this: Types.Oid<number>): Types.Void<0 | 1>
    binaryUpgradeSetNextToastRelfilenode(...args: unknown[]) {
        return sqlFunction("binary_upgrade_set_next_toast_relfilenode", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btequalimage(this: Types.Oid<1>): Types.Bool<1>
    btequalimage(this: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    btequalimage(this: Types.Oid<number>): Types.Bool<0 | 1>
    btequalimage(...args: unknown[]) {
        return sqlFunction("btequalimage", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btoidcmp(this: Types.Oid<1>, a1: Types.Oid<1>): Types.Int4<1>
    btoidcmp(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Int4<0 | 1>
    btoidcmp(this: Types.Oid<number>, a1: Types.Oid<number>): Types.Int4<0 | 1>
    btoidcmp(...args: unknown[]) {
        return sqlFunction("btoidcmp", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btvarstrequalimage(this: Types.Oid<1>): Types.Bool<1>
    btvarstrequalimage(this: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    btvarstrequalimage(this: Types.Oid<number>): Types.Bool<0 | 1>
    btvarstrequalimage(...args: unknown[]) {
        return sqlFunction("btvarstrequalimage", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    colDescription(this: Types.Oid<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    colDescription(this: Types.Oid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    colDescription(this: Types.Oid<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    colDescription(...args: unknown[]) {
        return sqlFunction("col_description", [{args: [Types.Oid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    fmgrCValidator(this: Types.Oid<1>): Types.Void<1>
    fmgrCValidator(this: Types.Oid<0 | 1>): Types.Void<0 | 1>
    fmgrCValidator(this: Types.Oid<number>): Types.Void<0 | 1>
    fmgrCValidator(...args: unknown[]) {
        return sqlFunction("fmgr_c_validator", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    fmgrInternalValidator(this: Types.Oid<1>): Types.Void<1>
    fmgrInternalValidator(this: Types.Oid<0 | 1>): Types.Void<0 | 1>
    fmgrInternalValidator(this: Types.Oid<number>): Types.Void<0 | 1>
    fmgrInternalValidator(...args: unknown[]) {
        return sqlFunction("fmgr_internal_validator", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    fmgrSqlValidator(this: Types.Oid<1>): Types.Void<1>
    fmgrSqlValidator(this: Types.Oid<0 | 1>): Types.Void<0 | 1>
    fmgrSqlValidator(this: Types.Oid<number>): Types.Void<0 | 1>
    fmgrSqlValidator(...args: unknown[]) {
        return sqlFunction("fmgr_sql_validator", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    formatType(this: Types.Oid<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    formatType(this: Types.Oid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    formatType(this: Types.Oid<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    formatType(...args: unknown[]) {
        return sqlFunction("format_type", [{args: [Types.Oid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasAnyColumnPrivilege(this: Types.Oid<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasAnyColumnPrivilege(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasAnyColumnPrivilege(this: Types.Oid<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasAnyColumnPrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasAnyColumnPrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasAnyColumnPrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasAnyColumnPrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasAnyColumnPrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasAnyColumnPrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasAnyColumnPrivilege(...args: unknown[]) {
        return sqlFunction("has_any_column_privilege", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasColumnPrivilege(this: Types.Oid<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasColumnPrivilege(this: Types.Oid<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(this: Types.Oid<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(this: Types.Oid<1>, a1: Types.Oid<1>, a2: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasColumnPrivilege(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(this: Types.Oid<number>, a1: Types.Oid<number>, a2: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(this: Types.Oid<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasColumnPrivilege(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(this: Types.Oid<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasColumnPrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasColumnPrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasColumnPrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasColumnPrivilege(...args: unknown[]) {
        return sqlFunction("has_column_privilege", [{args: [Types.Oid<0 | 1>, Types.Int2<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Int2<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Int2<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasDatabasePrivilege(this: Types.Oid<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasDatabasePrivilege(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasDatabasePrivilege(this: Types.Oid<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasDatabasePrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasDatabasePrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasDatabasePrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasDatabasePrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasDatabasePrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasDatabasePrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasDatabasePrivilege(...args: unknown[]) {
        return sqlFunction("has_database_privilege", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasForeignDataWrapperPrivilege(this: Types.Oid<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasForeignDataWrapperPrivilege(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasForeignDataWrapperPrivilege(this: Types.Oid<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasForeignDataWrapperPrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasForeignDataWrapperPrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasForeignDataWrapperPrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasForeignDataWrapperPrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasForeignDataWrapperPrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasForeignDataWrapperPrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasForeignDataWrapperPrivilege(...args: unknown[]) {
        return sqlFunction("has_foreign_data_wrapper_privilege", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasFunctionPrivilege(this: Types.Oid<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasFunctionPrivilege(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasFunctionPrivilege(this: Types.Oid<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasFunctionPrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasFunctionPrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasFunctionPrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasFunctionPrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasFunctionPrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasFunctionPrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasFunctionPrivilege(...args: unknown[]) {
        return sqlFunction("has_function_privilege", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasLanguagePrivilege(this: Types.Oid<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasLanguagePrivilege(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasLanguagePrivilege(this: Types.Oid<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasLanguagePrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasLanguagePrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasLanguagePrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasLanguagePrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasLanguagePrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasLanguagePrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasLanguagePrivilege(...args: unknown[]) {
        return sqlFunction("has_language_privilege", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasParameterPrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasParameterPrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasParameterPrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasParameterPrivilege(...args: unknown[]) {
        return sqlFunction("has_parameter_privilege", [{args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasSchemaPrivilege(this: Types.Oid<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasSchemaPrivilege(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSchemaPrivilege(this: Types.Oid<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSchemaPrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasSchemaPrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSchemaPrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSchemaPrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasSchemaPrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSchemaPrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSchemaPrivilege(...args: unknown[]) {
        return sqlFunction("has_schema_privilege", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasSequencePrivilege(this: Types.Oid<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasSequencePrivilege(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSequencePrivilege(this: Types.Oid<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSequencePrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasSequencePrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSequencePrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSequencePrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasSequencePrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSequencePrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasSequencePrivilege(...args: unknown[]) {
        return sqlFunction("has_sequence_privilege", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasServerPrivilege(this: Types.Oid<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasServerPrivilege(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasServerPrivilege(this: Types.Oid<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasServerPrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasServerPrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasServerPrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasServerPrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasServerPrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasServerPrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasServerPrivilege(...args: unknown[]) {
        return sqlFunction("has_server_privilege", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasTablePrivilege(this: Types.Oid<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasTablePrivilege(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablePrivilege(this: Types.Oid<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablePrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasTablePrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablePrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablePrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasTablePrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablePrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablePrivilege(...args: unknown[]) {
        return sqlFunction("has_table_privilege", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasTablespacePrivilege(this: Types.Oid<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasTablespacePrivilege(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablespacePrivilege(this: Types.Oid<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablespacePrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasTablespacePrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablespacePrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablespacePrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasTablespacePrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablespacePrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTablespacePrivilege(...args: unknown[]) {
        return sqlFunction("has_tablespace_privilege", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hasTypePrivilege(this: Types.Oid<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasTypePrivilege(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTypePrivilege(this: Types.Oid<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTypePrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasTypePrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTypePrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTypePrivilege(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    hasTypePrivilege(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTypePrivilege(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    hasTypePrivilege(...args: unknown[]) {
        return sqlFunction("has_type_privilege", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashoid(this: Types.Oid<1>): Types.Int4<1>
    hashoid(this: Types.Oid<0 | 1>): Types.Int4<0 | 1>
    hashoid(this: Types.Oid<number>): Types.Int4<0 | 1>
    hashoid(...args: unknown[]) {
        return sqlFunction("hashoid", [{args: [Types.Oid<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashoidextended(this: Types.Oid<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashoidextended(this: Types.Oid<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashoidextended(this: Types.Oid<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashoidextended(...args: unknown[]) {
        return sqlFunction("hashoidextended", [{args: [Types.Oid<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8(this: Types.Oid<1>): Types.Int8<1>
    int8(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    int8(this: Types.Oid<number>): Types.Int8<0 | 1>
    int8(...args: unknown[]) {
        return sqlFunction("int8", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    loCreate(this: Types.Oid<1>): Types.Oid<1>
    loCreate(this: Types.Oid<0 | 1>): Types.Oid<0 | 1>
    loCreate(this: Types.Oid<number>): Types.Oid<0 | 1>
    loCreate(...args: unknown[]) {
        return sqlFunction("lo_create", [{args: [Types.Oid<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    loExport(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<1>
    loExport(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    loExport(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
    loExport(...args: unknown[]) {
        return sqlFunction("lo_export", [{args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    loFromBytea(this: Types.Oid<1>, a1: Types.Bytea<1>): Types.Oid<1>
    loFromBytea(this: Types.Oid<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Oid<0 | 1>
    loFromBytea(this: Types.Oid<number>, a1: Types.Bytea<number>): Types.Oid<0 | 1>
    loFromBytea(...args: unknown[]) {
        return sqlFunction("lo_from_bytea", [{args: [Types.Oid<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    loGet(this: Types.Oid<1>): Types.Bytea<1>
    loGet(this: Types.Oid<0 | 1>): Types.Bytea<0 | 1>
    loGet(this: Types.Oid<number>): Types.Bytea<0 | 1>
    loGet(this: Types.Oid<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<1>
    loGet(this: Types.Oid<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
    loGet(this: Types.Oid<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
    loGet(...args: unknown[]) {
        return sqlFunction("lo_get", [{args: [Types.Oid<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    loOpen(this: Types.Oid<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    loOpen(this: Types.Oid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    loOpen(this: Types.Oid<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    loOpen(...args: unknown[]) {
        return sqlFunction("lo_open", [{args: [Types.Oid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    loPut(this: Types.Oid<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Bytea<1>): Types.Void<1>
    loPut(this: Types.Oid<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Bytea<0 | 1>): Types.Void<0 | 1>
    loPut(this: Types.Oid<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Bytea<number>): Types.Void<0 | 1>
    loPut(...args: unknown[]) {
        return sqlFunction("lo_put", [{args: [Types.Oid<0 | 1>, Types.Int8<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    loUnlink(this: Types.Oid<1>): Types.Int4<1>
    loUnlink(this: Types.Oid<0 | 1>): Types.Int4<0 | 1>
    loUnlink(this: Types.Oid<number>): Types.Int4<0 | 1>
    loUnlink(...args: unknown[]) {
        return sqlFunction("lo_unlink", [{args: [Types.Oid<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    makeaclitem(this: Types.Oid<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Aclitem<1>
    makeaclitem(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Aclitem<0 | 1>
    makeaclitem(this: Types.Oid<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Aclitem<0 | 1>
    makeaclitem(...args: unknown[]) {
        return sqlFunction("makeaclitem", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.Aclitem<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    max(this: Types.Oid<number>): Types.Oid<0 | 1>
    max(...args: unknown[]) {
        return sqlFunction("max", [{args: [Types.Oid<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    objDescription(this: Types.Oid<1>): Types.Text<1>
    objDescription(this: Types.Oid<0 | 1>): Types.Text<0 | 1>
    objDescription(this: Types.Oid<number>): Types.Text<0 | 1>
    objDescription(this: Types.Oid<1>, a1: Types.Name<1>): Types.Text<1>
    objDescription(this: Types.Oid<0 | 1>, a1: Types.Name<0 | 1>): Types.Text<0 | 1>
    objDescription(this: Types.Oid<number>, a1: Types.Name<number>): Types.Text<0 | 1>
    objDescription(...args: unknown[]) {
        return sqlFunction("obj_description", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Name<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    oideq(this: Types.Oid<1>, a1: Types.Oid<1>): Types.Bool<1>
    oideq(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    oideq(this: Types.Oid<number>, a1: Types.Oid<number>): Types.Bool<0 | 1>
    oideq(...args: unknown[]) {
        return sqlFunction("oideq", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    oidge(this: Types.Oid<1>, a1: Types.Oid<1>): Types.Bool<1>
    oidge(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    oidge(this: Types.Oid<number>, a1: Types.Oid<number>): Types.Bool<0 | 1>
    oidge(...args: unknown[]) {
        return sqlFunction("oidge", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    oidgt(this: Types.Oid<1>, a1: Types.Oid<1>): Types.Bool<1>
    oidgt(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    oidgt(this: Types.Oid<number>, a1: Types.Oid<number>): Types.Bool<0 | 1>
    oidgt(...args: unknown[]) {
        return sqlFunction("oidgt", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    oidlarger(this: Types.Oid<1>, a1: Types.Oid<1>): Types.Oid<1>
    oidlarger(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Oid<0 | 1>
    oidlarger(this: Types.Oid<number>, a1: Types.Oid<number>): Types.Oid<0 | 1>
    oidlarger(...args: unknown[]) {
        return sqlFunction("oidlarger", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    oidle(this: Types.Oid<1>, a1: Types.Oid<1>): Types.Bool<1>
    oidle(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    oidle(this: Types.Oid<number>, a1: Types.Oid<number>): Types.Bool<0 | 1>
    oidle(...args: unknown[]) {
        return sqlFunction("oidle", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    oidlt(this: Types.Oid<1>, a1: Types.Oid<1>): Types.Bool<1>
    oidlt(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    oidlt(this: Types.Oid<number>, a1: Types.Oid<number>): Types.Bool<0 | 1>
    oidlt(...args: unknown[]) {
        return sqlFunction("oidlt", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    oidne(this: Types.Oid<1>, a1: Types.Oid<1>): Types.Bool<1>
    oidne(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    oidne(this: Types.Oid<number>, a1: Types.Oid<number>): Types.Bool<0 | 1>
    oidne(...args: unknown[]) {
        return sqlFunction("oidne", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    oidsmaller(this: Types.Oid<1>, a1: Types.Oid<1>): Types.Oid<1>
    oidsmaller(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Oid<0 | 1>
    oidsmaller(this: Types.Oid<number>, a1: Types.Oid<number>): Types.Oid<0 | 1>
    oidsmaller(...args: unknown[]) {
        return sqlFunction("oidsmaller", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgCollationActualVersion(this: Types.Oid<1>): Types.Text<1>
    pgCollationActualVersion(this: Types.Oid<0 | 1>): Types.Text<0 | 1>
    pgCollationActualVersion(this: Types.Oid<number>): Types.Text<0 | 1>
    pgCollationActualVersion(...args: unknown[]) {
        return sqlFunction("pg_collation_actual_version", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgCollationIsVisible(this: Types.Oid<1>): Types.Bool<1>
    pgCollationIsVisible(this: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    pgCollationIsVisible(this: Types.Oid<number>): Types.Bool<0 | 1>
    pgCollationIsVisible(...args: unknown[]) {
        return sqlFunction("pg_collation_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgConversionIsVisible(this: Types.Oid<1>): Types.Bool<1>
    pgConversionIsVisible(this: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    pgConversionIsVisible(this: Types.Oid<number>): Types.Bool<0 | 1>
    pgConversionIsVisible(...args: unknown[]) {
        return sqlFunction("pg_conversion_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgDatabaseCollationActualVersion(this: Types.Oid<1>): Types.Text<1>
    pgDatabaseCollationActualVersion(this: Types.Oid<0 | 1>): Types.Text<0 | 1>
    pgDatabaseCollationActualVersion(this: Types.Oid<number>): Types.Text<0 | 1>
    pgDatabaseCollationActualVersion(...args: unknown[]) {
        return sqlFunction("pg_database_collation_actual_version", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgDatabaseSize(this: Types.Oid<1>): Types.Int8<1>
    pgDatabaseSize(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgDatabaseSize(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgDatabaseSize(...args: unknown[]) {
        return sqlFunction("pg_database_size", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgDescribeObject(this: Types.Oid<1>, a1: Types.Oid<1>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    pgDescribeObject(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    pgDescribeObject(this: Types.Oid<number>, a1: Types.Oid<number>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    pgDescribeObject(...args: unknown[]) {
        return sqlFunction("pg_describe_object", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgFilenodeRelation(this: Types.Oid<1>, a1: Types.Oid<1>): Types.Regclass<1>
    pgFilenodeRelation(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Regclass<0 | 1>
    pgFilenodeRelation(this: Types.Oid<number>, a1: Types.Oid<number>): Types.Regclass<0 | 1>
    pgFilenodeRelation(...args: unknown[]) {
        return sqlFunction("pg_filenode_relation", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Regclass<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgFunctionIsVisible(this: Types.Oid<1>): Types.Bool<1>
    pgFunctionIsVisible(this: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    pgFunctionIsVisible(this: Types.Oid<number>): Types.Bool<0 | 1>
    pgFunctionIsVisible(...args: unknown[]) {
        return sqlFunction("pg_function_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetConstraintdef(this: Types.Oid<1>): Types.Text<1>
    pgGetConstraintdef(this: Types.Oid<0 | 1>): Types.Text<0 | 1>
    pgGetConstraintdef(this: Types.Oid<number>): Types.Text<0 | 1>
    pgGetConstraintdef(this: Types.Oid<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<1>
    pgGetConstraintdef(this: Types.Oid<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    pgGetConstraintdef(this: Types.Oid<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    pgGetConstraintdef(...args: unknown[]) {
        return sqlFunction("pg_get_constraintdef", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetFunctionArgDefault(this: Types.Oid<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    pgGetFunctionArgDefault(this: Types.Oid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    pgGetFunctionArgDefault(this: Types.Oid<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    pgGetFunctionArgDefault(...args: unknown[]) {
        return sqlFunction("pg_get_function_arg_default", [{args: [Types.Oid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetFunctionArguments(this: Types.Oid<1>): Types.Text<1>
    pgGetFunctionArguments(this: Types.Oid<0 | 1>): Types.Text<0 | 1>
    pgGetFunctionArguments(this: Types.Oid<number>): Types.Text<0 | 1>
    pgGetFunctionArguments(...args: unknown[]) {
        return sqlFunction("pg_get_function_arguments", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetFunctionIdentityArguments(this: Types.Oid<1>): Types.Text<1>
    pgGetFunctionIdentityArguments(this: Types.Oid<0 | 1>): Types.Text<0 | 1>
    pgGetFunctionIdentityArguments(this: Types.Oid<number>): Types.Text<0 | 1>
    pgGetFunctionIdentityArguments(...args: unknown[]) {
        return sqlFunction("pg_get_function_identity_arguments", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetFunctionResult(this: Types.Oid<1>): Types.Text<1>
    pgGetFunctionResult(this: Types.Oid<0 | 1>): Types.Text<0 | 1>
    pgGetFunctionResult(this: Types.Oid<number>): Types.Text<0 | 1>
    pgGetFunctionResult(...args: unknown[]) {
        return sqlFunction("pg_get_function_result", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetFunctionSqlbody(this: Types.Oid<1>): Types.Text<1>
    pgGetFunctionSqlbody(this: Types.Oid<0 | 1>): Types.Text<0 | 1>
    pgGetFunctionSqlbody(this: Types.Oid<number>): Types.Text<0 | 1>
    pgGetFunctionSqlbody(...args: unknown[]) {
        return sqlFunction("pg_get_function_sqlbody", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetFunctiondef(this: Types.Oid<1>): Types.Text<1>
    pgGetFunctiondef(this: Types.Oid<0 | 1>): Types.Text<0 | 1>
    pgGetFunctiondef(this: Types.Oid<number>): Types.Text<0 | 1>
    pgGetFunctiondef(...args: unknown[]) {
        return sqlFunction("pg_get_functiondef", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetIndexdef(this: Types.Oid<1>): Types.Text<1>
    pgGetIndexdef(this: Types.Oid<0 | 1>): Types.Text<0 | 1>
    pgGetIndexdef(this: Types.Oid<number>): Types.Text<0 | 1>
    pgGetIndexdef(this: Types.Oid<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<1>
    pgGetIndexdef(this: Types.Oid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    pgGetIndexdef(this: Types.Oid<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    pgGetIndexdef(...args: unknown[]) {
        return sqlFunction("pg_get_indexdef", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Int4<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetPartitionConstraintdef(this: Types.Oid<1>): Types.Text<1>
    pgGetPartitionConstraintdef(this: Types.Oid<0 | 1>): Types.Text<0 | 1>
    pgGetPartitionConstraintdef(this: Types.Oid<number>): Types.Text<0 | 1>
    pgGetPartitionConstraintdef(...args: unknown[]) {
        return sqlFunction("pg_get_partition_constraintdef", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetPartkeydef(this: Types.Oid<1>): Types.Text<1>
    pgGetPartkeydef(this: Types.Oid<0 | 1>): Types.Text<0 | 1>
    pgGetPartkeydef(this: Types.Oid<number>): Types.Text<0 | 1>
    pgGetPartkeydef(...args: unknown[]) {
        return sqlFunction("pg_get_partkeydef", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetRuledef(this: Types.Oid<1>): Types.Text<1>
    pgGetRuledef(this: Types.Oid<0 | 1>): Types.Text<0 | 1>
    pgGetRuledef(this: Types.Oid<number>): Types.Text<0 | 1>
    pgGetRuledef(this: Types.Oid<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<1>
    pgGetRuledef(this: Types.Oid<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    pgGetRuledef(this: Types.Oid<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    pgGetRuledef(...args: unknown[]) {
        return sqlFunction("pg_get_ruledef", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetStatisticsobjdef(this: Types.Oid<1>): Types.Text<1>
    pgGetStatisticsobjdef(this: Types.Oid<0 | 1>): Types.Text<0 | 1>
    pgGetStatisticsobjdef(this: Types.Oid<number>): Types.Text<0 | 1>
    pgGetStatisticsobjdef(...args: unknown[]) {
        return sqlFunction("pg_get_statisticsobjdef", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetStatisticsobjdefColumns(this: Types.Oid<1>): Types.Text<1>
    pgGetStatisticsobjdefColumns(this: Types.Oid<0 | 1>): Types.Text<0 | 1>
    pgGetStatisticsobjdefColumns(this: Types.Oid<number>): Types.Text<0 | 1>
    pgGetStatisticsobjdefColumns(...args: unknown[]) {
        return sqlFunction("pg_get_statisticsobjdef_columns", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetStatisticsobjdefExpressions(this: Types.Oid<1>): Types.Array<1, Types.Text<0 | 1>>
    pgGetStatisticsobjdefExpressions(this: Types.Oid<0 | 1>): Types.Array<0 | 1, Types.Text<0 | 1>>
    pgGetStatisticsobjdefExpressions(this: Types.Oid<number>): Types.Array<0 | 1, Types.Text<0 | 1>>
    pgGetStatisticsobjdefExpressions(...args: unknown[]) {
        return sqlFunction("pg_get_statisticsobjdef_expressions", [{args: [Types.Oid<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetTriggerdef(this: Types.Oid<1>): Types.Text<1>
    pgGetTriggerdef(this: Types.Oid<0 | 1>): Types.Text<0 | 1>
    pgGetTriggerdef(this: Types.Oid<number>): Types.Text<0 | 1>
    pgGetTriggerdef(this: Types.Oid<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<1>
    pgGetTriggerdef(this: Types.Oid<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    pgGetTriggerdef(this: Types.Oid<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    pgGetTriggerdef(...args: unknown[]) {
        return sqlFunction("pg_get_triggerdef", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetUserbyid(this: Types.Oid<1>): Types.Name<1>
    pgGetUserbyid(this: Types.Oid<0 | 1>): Types.Name<0 | 1>
    pgGetUserbyid(this: Types.Oid<number>): Types.Name<0 | 1>
    pgGetUserbyid(...args: unknown[]) {
        return sqlFunction("pg_get_userbyid", [{args: [Types.Oid<0 | 1>], ret: Types.Name<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetViewdef(this: Types.Oid<1>): Types.Text<1>
    pgGetViewdef(this: Types.Oid<0 | 1>): Types.Text<0 | 1>
    pgGetViewdef(this: Types.Oid<number>): Types.Text<0 | 1>
    pgGetViewdef(this: Types.Oid<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<1>
    pgGetViewdef(this: Types.Oid<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    pgGetViewdef(this: Types.Oid<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
    pgGetViewdef(this: Types.Oid<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    pgGetViewdef(this: Types.Oid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    pgGetViewdef(this: Types.Oid<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    pgGetViewdef(...args: unknown[]) {
        return sqlFunction("pg_get_viewdef", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgHasRole(this: Types.Oid<1>, a1: Types.Name<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    pgHasRole(this: Types.Oid<0 | 1>, a1: Types.Name<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    pgHasRole(this: Types.Oid<number>, a1: Types.Name<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    pgHasRole(this: Types.Oid<1>, a1: Types.Oid<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    pgHasRole(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    pgHasRole(this: Types.Oid<number>, a1: Types.Oid<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    pgHasRole(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    pgHasRole(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    pgHasRole(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    pgHasRole(...args: unknown[]) {
        return sqlFunction("pg_has_role", [{args: [Types.Oid<0 | 1>, Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgIdentifyObject(this: Types.Oid<1>, a1: Types.Oid<1>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Record<1, {type: Types.Text<1>, schema: Types.Text<1>, name: Types.Text<1>, identity: Types.Text<1>}>
    pgIdentifyObject(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Record<0 | 1, {type: Types.Text<0 | 1>, schema: Types.Text<0 | 1>, name: Types.Text<0 | 1>, identity: Types.Text<0 | 1>}>
    pgIdentifyObject(this: Types.Oid<number>, a1: Types.Oid<number>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Record<0 | 1, {type: Types.Text<0 | 1>, schema: Types.Text<0 | 1>, name: Types.Text<0 | 1>, identity: Types.Text<0 | 1>}>
    pgIdentifyObject(...args: unknown[]) {
        return sqlFunction("pg_identify_object", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Record.of({type: Types.Text<0 | 1>, schema: Types.Text<0 | 1>, name: Types.Text<0 | 1>, identity: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgIdentifyObjectAsAddress(this: Types.Oid<1>, a1: Types.Oid<1>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Record<1, {type: Types.Text<1>, object_names: Types.Array<1, Types.Text<0 | 1>>, object_args: Types.Array<1, Types.Text<0 | 1>>}>
    pgIdentifyObjectAsAddress(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Record<0 | 1, {type: Types.Text<0 | 1>, object_names: Types.Array<0 | 1, Types.Text<0 | 1>>, object_args: Types.Array<0 | 1, Types.Text<0 | 1>>}>
    pgIdentifyObjectAsAddress(this: Types.Oid<number>, a1: Types.Oid<number>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Record<0 | 1, {type: Types.Text<0 | 1>, object_names: Types.Array<0 | 1, Types.Text<0 | 1>>, object_args: Types.Array<0 | 1, Types.Text<0 | 1>>}>
    pgIdentifyObjectAsAddress(...args: unknown[]) {
        return sqlFunction("pg_identify_object_as_address", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Record.of({type: Types.Text<0 | 1>, object_names: Types.Array.of(Types.Text<0 | 1>), object_args: Types.Array.of(Types.Text<0 | 1>)}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgIndexamHasProperty(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    pgIndexamHasProperty(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    pgIndexamHasProperty(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    pgIndexamHasProperty(...args: unknown[]) {
        return sqlFunction("pg_indexam_has_property", [{args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgIndexamProgressPhasename(this: Types.Oid<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Text<1>
    pgIndexamProgressPhasename(this: Types.Oid<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Text<0 | 1>
    pgIndexamProgressPhasename(this: Types.Oid<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Text<0 | 1>
    pgIndexamProgressPhasename(...args: unknown[]) {
        return sqlFunction("pg_indexam_progress_phasename", [{args: [Types.Oid<0 | 1>, Types.Int8<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgIsOtherTempSchema(this: Types.Oid<1>): Types.Bool<1>
    pgIsOtherTempSchema(this: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    pgIsOtherTempSchema(this: Types.Oid<number>): Types.Bool<0 | 1>
    pgIsOtherTempSchema(...args: unknown[]) {
        return sqlFunction("pg_is_other_temp_schema", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgLsTmpdir(this: Types.Oid<1>): Types.FromItem<{name: Types.Text<1>, size: Types.Int8<1>, modification: Types.Timestamptz<1>}>
    pgLsTmpdir(this: Types.Oid<0 | 1>): Types.FromItem<{name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}>
    pgLsTmpdir(this: Types.Oid<number>): Types.FromItem<{name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}>
    pgLsTmpdir(...args: unknown[]) {
        return sqlFunction("pg_ls_tmpdir", [{args: [Types.Oid<0 | 1>], ret: Types.FromItem.ofSchema({name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgOpclassIsVisible(this: Types.Oid<1>): Types.Bool<1>
    pgOpclassIsVisible(this: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    pgOpclassIsVisible(this: Types.Oid<number>): Types.Bool<0 | 1>
    pgOpclassIsVisible(...args: unknown[]) {
        return sqlFunction("pg_opclass_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgOperatorIsVisible(this: Types.Oid<1>): Types.Bool<1>
    pgOperatorIsVisible(this: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    pgOperatorIsVisible(this: Types.Oid<number>): Types.Bool<0 | 1>
    pgOperatorIsVisible(...args: unknown[]) {
        return sqlFunction("pg_operator_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgOpfamilyIsVisible(this: Types.Oid<1>): Types.Bool<1>
    pgOpfamilyIsVisible(this: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    pgOpfamilyIsVisible(this: Types.Oid<number>): Types.Bool<0 | 1>
    pgOpfamilyIsVisible(...args: unknown[]) {
        return sqlFunction("pg_opfamily_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgSequenceParameters(this: Types.Oid<1>): Types.Record<1, {start_value: Types.Int8<1>, minimum_value: Types.Int8<1>, maximum_value: Types.Int8<1>, increment: Types.Int8<1>, cycle_option: Types.Bool<1>, cache_size: Types.Int8<1>, data_type: Types.Oid<1>}>
    pgSequenceParameters(this: Types.Oid<0 | 1>): Types.Record<0 | 1, {start_value: Types.Int8<0 | 1>, minimum_value: Types.Int8<0 | 1>, maximum_value: Types.Int8<0 | 1>, increment: Types.Int8<0 | 1>, cycle_option: Types.Bool<0 | 1>, cache_size: Types.Int8<0 | 1>, data_type: Types.Oid<0 | 1>}>
    pgSequenceParameters(this: Types.Oid<number>): Types.Record<0 | 1, {start_value: Types.Int8<0 | 1>, minimum_value: Types.Int8<0 | 1>, maximum_value: Types.Int8<0 | 1>, increment: Types.Int8<0 | 1>, cycle_option: Types.Bool<0 | 1>, cache_size: Types.Int8<0 | 1>, data_type: Types.Oid<0 | 1>}>
    pgSequenceParameters(...args: unknown[]) {
        return sqlFunction("pg_sequence_parameters", [{args: [Types.Oid<0 | 1>], ret: Types.Record.of({start_value: Types.Int8<0 | 1>, minimum_value: Types.Int8<0 | 1>, maximum_value: Types.Int8<0 | 1>, increment: Types.Int8<0 | 1>, cycle_option: Types.Bool<0 | 1>, cache_size: Types.Int8<0 | 1>, data_type: Types.Oid<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetAnalyzeCount(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetAnalyzeCount(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetAnalyzeCount(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetAnalyzeCount(...args: unknown[]) {
        return sqlFunction("pg_stat_get_analyze_count", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetAutoanalyzeCount(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetAutoanalyzeCount(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetAutoanalyzeCount(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetAutoanalyzeCount(...args: unknown[]) {
        return sqlFunction("pg_stat_get_autoanalyze_count", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetAutovacuumCount(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetAutovacuumCount(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetAutovacuumCount(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetAutovacuumCount(...args: unknown[]) {
        return sqlFunction("pg_stat_get_autovacuum_count", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetBlocksFetched(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetBlocksFetched(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetBlocksFetched(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetBlocksFetched(...args: unknown[]) {
        return sqlFunction("pg_stat_get_blocks_fetched", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetBlocksHit(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetBlocksHit(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetBlocksHit(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetBlocksHit(...args: unknown[]) {
        return sqlFunction("pg_stat_get_blocks_hit", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbActiveTime(this: Types.Oid<1>): Types.Float8<1>
    pgStatGetDbActiveTime(this: Types.Oid<0 | 1>): Types.Float8<0 | 1>
    pgStatGetDbActiveTime(this: Types.Oid<number>): Types.Float8<0 | 1>
    pgStatGetDbActiveTime(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_active_time", [{args: [Types.Oid<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbBlkReadTime(this: Types.Oid<1>): Types.Float8<1>
    pgStatGetDbBlkReadTime(this: Types.Oid<0 | 1>): Types.Float8<0 | 1>
    pgStatGetDbBlkReadTime(this: Types.Oid<number>): Types.Float8<0 | 1>
    pgStatGetDbBlkReadTime(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_blk_read_time", [{args: [Types.Oid<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbBlkWriteTime(this: Types.Oid<1>): Types.Float8<1>
    pgStatGetDbBlkWriteTime(this: Types.Oid<0 | 1>): Types.Float8<0 | 1>
    pgStatGetDbBlkWriteTime(this: Types.Oid<number>): Types.Float8<0 | 1>
    pgStatGetDbBlkWriteTime(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_blk_write_time", [{args: [Types.Oid<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbBlocksFetched(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbBlocksFetched(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbBlocksFetched(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbBlocksFetched(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_blocks_fetched", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbBlocksHit(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbBlocksHit(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbBlocksHit(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbBlocksHit(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_blocks_hit", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbChecksumFailures(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbChecksumFailures(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbChecksumFailures(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbChecksumFailures(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_checksum_failures", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbChecksumLastFailure(this: Types.Oid<1>): Types.Timestamptz<1>
    pgStatGetDbChecksumLastFailure(this: Types.Oid<0 | 1>): Types.Timestamptz<0 | 1>
    pgStatGetDbChecksumLastFailure(this: Types.Oid<number>): Types.Timestamptz<0 | 1>
    pgStatGetDbChecksumLastFailure(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_checksum_last_failure", [{args: [Types.Oid<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbConflictAll(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbConflictAll(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbConflictAll(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbConflictAll(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_conflict_all", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbConflictLock(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbConflictLock(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbConflictLock(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbConflictLock(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_conflict_lock", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbConflictLogicalslot(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbConflictLogicalslot(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbConflictLogicalslot(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbConflictLogicalslot(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_conflict_logicalslot", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbConflictSnapshot(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbConflictSnapshot(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbConflictSnapshot(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbConflictSnapshot(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_conflict_snapshot", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbConflictStartupDeadlock(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbConflictStartupDeadlock(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbConflictStartupDeadlock(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbConflictStartupDeadlock(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_conflict_startup_deadlock", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbConflictTablespace(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbConflictTablespace(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbConflictTablespace(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbConflictTablespace(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_conflict_tablespace", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbDeadlocks(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbDeadlocks(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbDeadlocks(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbDeadlocks(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_deadlocks", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbIdleInTransactionTime(this: Types.Oid<1>): Types.Float8<1>
    pgStatGetDbIdleInTransactionTime(this: Types.Oid<0 | 1>): Types.Float8<0 | 1>
    pgStatGetDbIdleInTransactionTime(this: Types.Oid<number>): Types.Float8<0 | 1>
    pgStatGetDbIdleInTransactionTime(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_idle_in_transaction_time", [{args: [Types.Oid<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbNumbackends(this: Types.Oid<1>): Types.Int4<1>
    pgStatGetDbNumbackends(this: Types.Oid<0 | 1>): Types.Int4<0 | 1>
    pgStatGetDbNumbackends(this: Types.Oid<number>): Types.Int4<0 | 1>
    pgStatGetDbNumbackends(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_numbackends", [{args: [Types.Oid<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbSessionTime(this: Types.Oid<1>): Types.Float8<1>
    pgStatGetDbSessionTime(this: Types.Oid<0 | 1>): Types.Float8<0 | 1>
    pgStatGetDbSessionTime(this: Types.Oid<number>): Types.Float8<0 | 1>
    pgStatGetDbSessionTime(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_session_time", [{args: [Types.Oid<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbSessions(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbSessions(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbSessions(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbSessions(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_sessions", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbSessionsAbandoned(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbSessionsAbandoned(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbSessionsAbandoned(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbSessionsAbandoned(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_sessions_abandoned", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbSessionsFatal(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbSessionsFatal(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbSessionsFatal(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbSessionsFatal(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_sessions_fatal", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbSessionsKilled(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbSessionsKilled(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbSessionsKilled(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbSessionsKilled(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_sessions_killed", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbStatResetTime(this: Types.Oid<1>): Types.Timestamptz<1>
    pgStatGetDbStatResetTime(this: Types.Oid<0 | 1>): Types.Timestamptz<0 | 1>
    pgStatGetDbStatResetTime(this: Types.Oid<number>): Types.Timestamptz<0 | 1>
    pgStatGetDbStatResetTime(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_stat_reset_time", [{args: [Types.Oid<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbTempBytes(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbTempBytes(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbTempBytes(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbTempBytes(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_temp_bytes", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbTempFiles(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbTempFiles(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbTempFiles(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbTempFiles(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_temp_files", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbTuplesDeleted(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbTuplesDeleted(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbTuplesDeleted(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbTuplesDeleted(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_tuples_deleted", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbTuplesFetched(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbTuplesFetched(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbTuplesFetched(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbTuplesFetched(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_tuples_fetched", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbTuplesInserted(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbTuplesInserted(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbTuplesInserted(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbTuplesInserted(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_tuples_inserted", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbTuplesReturned(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbTuplesReturned(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbTuplesReturned(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbTuplesReturned(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_tuples_returned", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbTuplesUpdated(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbTuplesUpdated(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbTuplesUpdated(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbTuplesUpdated(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_tuples_updated", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbXactCommit(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbXactCommit(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbXactCommit(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbXactCommit(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_xact_commit", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDbXactRollback(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDbXactRollback(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDbXactRollback(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDbXactRollback(...args: unknown[]) {
        return sqlFunction("pg_stat_get_db_xact_rollback", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetDeadTuples(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetDeadTuples(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetDeadTuples(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetDeadTuples(...args: unknown[]) {
        return sqlFunction("pg_stat_get_dead_tuples", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetFunctionCalls(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetFunctionCalls(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetFunctionCalls(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetFunctionCalls(...args: unknown[]) {
        return sqlFunction("pg_stat_get_function_calls", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetFunctionSelfTime(this: Types.Oid<1>): Types.Float8<1>
    pgStatGetFunctionSelfTime(this: Types.Oid<0 | 1>): Types.Float8<0 | 1>
    pgStatGetFunctionSelfTime(this: Types.Oid<number>): Types.Float8<0 | 1>
    pgStatGetFunctionSelfTime(...args: unknown[]) {
        return sqlFunction("pg_stat_get_function_self_time", [{args: [Types.Oid<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetFunctionTotalTime(this: Types.Oid<1>): Types.Float8<1>
    pgStatGetFunctionTotalTime(this: Types.Oid<0 | 1>): Types.Float8<0 | 1>
    pgStatGetFunctionTotalTime(this: Types.Oid<number>): Types.Float8<0 | 1>
    pgStatGetFunctionTotalTime(...args: unknown[]) {
        return sqlFunction("pg_stat_get_function_total_time", [{args: [Types.Oid<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetInsSinceVacuum(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetInsSinceVacuum(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetInsSinceVacuum(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetInsSinceVacuum(...args: unknown[]) {
        return sqlFunction("pg_stat_get_ins_since_vacuum", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetLastAnalyzeTime(this: Types.Oid<1>): Types.Timestamptz<1>
    pgStatGetLastAnalyzeTime(this: Types.Oid<0 | 1>): Types.Timestamptz<0 | 1>
    pgStatGetLastAnalyzeTime(this: Types.Oid<number>): Types.Timestamptz<0 | 1>
    pgStatGetLastAnalyzeTime(...args: unknown[]) {
        return sqlFunction("pg_stat_get_last_analyze_time", [{args: [Types.Oid<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetLastAutoanalyzeTime(this: Types.Oid<1>): Types.Timestamptz<1>
    pgStatGetLastAutoanalyzeTime(this: Types.Oid<0 | 1>): Types.Timestamptz<0 | 1>
    pgStatGetLastAutoanalyzeTime(this: Types.Oid<number>): Types.Timestamptz<0 | 1>
    pgStatGetLastAutoanalyzeTime(...args: unknown[]) {
        return sqlFunction("pg_stat_get_last_autoanalyze_time", [{args: [Types.Oid<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetLastAutovacuumTime(this: Types.Oid<1>): Types.Timestamptz<1>
    pgStatGetLastAutovacuumTime(this: Types.Oid<0 | 1>): Types.Timestamptz<0 | 1>
    pgStatGetLastAutovacuumTime(this: Types.Oid<number>): Types.Timestamptz<0 | 1>
    pgStatGetLastAutovacuumTime(...args: unknown[]) {
        return sqlFunction("pg_stat_get_last_autovacuum_time", [{args: [Types.Oid<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetLastVacuumTime(this: Types.Oid<1>): Types.Timestamptz<1>
    pgStatGetLastVacuumTime(this: Types.Oid<0 | 1>): Types.Timestamptz<0 | 1>
    pgStatGetLastVacuumTime(this: Types.Oid<number>): Types.Timestamptz<0 | 1>
    pgStatGetLastVacuumTime(...args: unknown[]) {
        return sqlFunction("pg_stat_get_last_vacuum_time", [{args: [Types.Oid<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetLastscan(this: Types.Oid<1>): Types.Timestamptz<1>
    pgStatGetLastscan(this: Types.Oid<0 | 1>): Types.Timestamptz<0 | 1>
    pgStatGetLastscan(this: Types.Oid<number>): Types.Timestamptz<0 | 1>
    pgStatGetLastscan(...args: unknown[]) {
        return sqlFunction("pg_stat_get_lastscan", [{args: [Types.Oid<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetLiveTuples(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetLiveTuples(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetLiveTuples(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetLiveTuples(...args: unknown[]) {
        return sqlFunction("pg_stat_get_live_tuples", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetModSinceAnalyze(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetModSinceAnalyze(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetModSinceAnalyze(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetModSinceAnalyze(...args: unknown[]) {
        return sqlFunction("pg_stat_get_mod_since_analyze", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetNumscans(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetNumscans(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetNumscans(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetNumscans(...args: unknown[]) {
        return sqlFunction("pg_stat_get_numscans", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetSubscription(this: Types.Oid<1>): Types.FromItem<{subid: Types.Oid<1>, relid: Types.Oid<1>, pid: Types.Int4<1>, leader_pid: Types.Int4<1>, received_lsn: Types.PgLsn<1>, last_msg_send_time: Types.Timestamptz<1>, last_msg_receipt_time: Types.Timestamptz<1>, latest_end_lsn: Types.PgLsn<1>, latest_end_time: Types.Timestamptz<1>, worker_type: Types.Text<1>}>
    pgStatGetSubscription(this: Types.Oid<0 | 1>): Types.FromItem<{subid: Types.Oid<0 | 1>, relid: Types.Oid<0 | 1>, pid: Types.Int4<0 | 1>, leader_pid: Types.Int4<0 | 1>, received_lsn: Types.PgLsn<0 | 1>, last_msg_send_time: Types.Timestamptz<0 | 1>, last_msg_receipt_time: Types.Timestamptz<0 | 1>, latest_end_lsn: Types.PgLsn<0 | 1>, latest_end_time: Types.Timestamptz<0 | 1>, worker_type: Types.Text<0 | 1>}>
    pgStatGetSubscription(this: Types.Oid<number>): Types.FromItem<{subid: Types.Oid<0 | 1>, relid: Types.Oid<0 | 1>, pid: Types.Int4<0 | 1>, leader_pid: Types.Int4<0 | 1>, received_lsn: Types.PgLsn<0 | 1>, last_msg_send_time: Types.Timestamptz<0 | 1>, last_msg_receipt_time: Types.Timestamptz<0 | 1>, latest_end_lsn: Types.PgLsn<0 | 1>, latest_end_time: Types.Timestamptz<0 | 1>, worker_type: Types.Text<0 | 1>}>
    pgStatGetSubscription(...args: unknown[]) {
        return sqlFunction("pg_stat_get_subscription", [{args: [Types.Oid<0 | 1>], ret: Types.FromItem.ofSchema({subid: Types.Oid<0 | 1>, relid: Types.Oid<0 | 1>, pid: Types.Int4<0 | 1>, leader_pid: Types.Int4<0 | 1>, received_lsn: Types.PgLsn<0 | 1>, last_msg_send_time: Types.Timestamptz<0 | 1>, last_msg_receipt_time: Types.Timestamptz<0 | 1>, latest_end_lsn: Types.PgLsn<0 | 1>, latest_end_time: Types.Timestamptz<0 | 1>, worker_type: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetSubscriptionStats(this: Types.Oid<1>): Types.Record<1, {subid: Types.Oid<1>, apply_error_count: Types.Int8<1>, sync_error_count: Types.Int8<1>, stats_reset: Types.Timestamptz<1>}>
    pgStatGetSubscriptionStats(this: Types.Oid<0 | 1>): Types.Record<0 | 1, {subid: Types.Oid<0 | 1>, apply_error_count: Types.Int8<0 | 1>, sync_error_count: Types.Int8<0 | 1>, stats_reset: Types.Timestamptz<0 | 1>}>
    pgStatGetSubscriptionStats(this: Types.Oid<number>): Types.Record<0 | 1, {subid: Types.Oid<0 | 1>, apply_error_count: Types.Int8<0 | 1>, sync_error_count: Types.Int8<0 | 1>, stats_reset: Types.Timestamptz<0 | 1>}>
    pgStatGetSubscriptionStats(...args: unknown[]) {
        return sqlFunction("pg_stat_get_subscription_stats", [{args: [Types.Oid<0 | 1>], ret: Types.Record.of({subid: Types.Oid<0 | 1>, apply_error_count: Types.Int8<0 | 1>, sync_error_count: Types.Int8<0 | 1>, stats_reset: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetTuplesDeleted(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetTuplesDeleted(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetTuplesDeleted(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetTuplesDeleted(...args: unknown[]) {
        return sqlFunction("pg_stat_get_tuples_deleted", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetTuplesFetched(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetTuplesFetched(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetTuplesFetched(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetTuplesFetched(...args: unknown[]) {
        return sqlFunction("pg_stat_get_tuples_fetched", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetTuplesHotUpdated(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetTuplesHotUpdated(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetTuplesHotUpdated(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetTuplesHotUpdated(...args: unknown[]) {
        return sqlFunction("pg_stat_get_tuples_hot_updated", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetTuplesInserted(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetTuplesInserted(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetTuplesInserted(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetTuplesInserted(...args: unknown[]) {
        return sqlFunction("pg_stat_get_tuples_inserted", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetTuplesNewpageUpdated(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetTuplesNewpageUpdated(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetTuplesNewpageUpdated(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetTuplesNewpageUpdated(...args: unknown[]) {
        return sqlFunction("pg_stat_get_tuples_newpage_updated", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetTuplesReturned(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetTuplesReturned(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetTuplesReturned(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetTuplesReturned(...args: unknown[]) {
        return sqlFunction("pg_stat_get_tuples_returned", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetTuplesUpdated(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetTuplesUpdated(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetTuplesUpdated(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetTuplesUpdated(...args: unknown[]) {
        return sqlFunction("pg_stat_get_tuples_updated", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetVacuumCount(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetVacuumCount(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetVacuumCount(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetVacuumCount(...args: unknown[]) {
        return sqlFunction("pg_stat_get_vacuum_count", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetXactBlocksFetched(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetXactBlocksFetched(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetXactBlocksFetched(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetXactBlocksFetched(...args: unknown[]) {
        return sqlFunction("pg_stat_get_xact_blocks_fetched", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetXactBlocksHit(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetXactBlocksHit(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetXactBlocksHit(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetXactBlocksHit(...args: unknown[]) {
        return sqlFunction("pg_stat_get_xact_blocks_hit", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetXactFunctionCalls(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetXactFunctionCalls(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetXactFunctionCalls(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetXactFunctionCalls(...args: unknown[]) {
        return sqlFunction("pg_stat_get_xact_function_calls", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetXactFunctionSelfTime(this: Types.Oid<1>): Types.Float8<1>
    pgStatGetXactFunctionSelfTime(this: Types.Oid<0 | 1>): Types.Float8<0 | 1>
    pgStatGetXactFunctionSelfTime(this: Types.Oid<number>): Types.Float8<0 | 1>
    pgStatGetXactFunctionSelfTime(...args: unknown[]) {
        return sqlFunction("pg_stat_get_xact_function_self_time", [{args: [Types.Oid<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetXactFunctionTotalTime(this: Types.Oid<1>): Types.Float8<1>
    pgStatGetXactFunctionTotalTime(this: Types.Oid<0 | 1>): Types.Float8<0 | 1>
    pgStatGetXactFunctionTotalTime(this: Types.Oid<number>): Types.Float8<0 | 1>
    pgStatGetXactFunctionTotalTime(...args: unknown[]) {
        return sqlFunction("pg_stat_get_xact_function_total_time", [{args: [Types.Oid<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetXactNumscans(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetXactNumscans(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetXactNumscans(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetXactNumscans(...args: unknown[]) {
        return sqlFunction("pg_stat_get_xact_numscans", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetXactTuplesDeleted(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetXactTuplesDeleted(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetXactTuplesDeleted(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetXactTuplesDeleted(...args: unknown[]) {
        return sqlFunction("pg_stat_get_xact_tuples_deleted", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetXactTuplesFetched(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetXactTuplesFetched(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetXactTuplesFetched(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetXactTuplesFetched(...args: unknown[]) {
        return sqlFunction("pg_stat_get_xact_tuples_fetched", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetXactTuplesHotUpdated(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetXactTuplesHotUpdated(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetXactTuplesHotUpdated(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetXactTuplesHotUpdated(...args: unknown[]) {
        return sqlFunction("pg_stat_get_xact_tuples_hot_updated", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetXactTuplesInserted(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetXactTuplesInserted(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetXactTuplesInserted(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetXactTuplesInserted(...args: unknown[]) {
        return sqlFunction("pg_stat_get_xact_tuples_inserted", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetXactTuplesNewpageUpdated(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetXactTuplesNewpageUpdated(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetXactTuplesNewpageUpdated(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetXactTuplesNewpageUpdated(...args: unknown[]) {
        return sqlFunction("pg_stat_get_xact_tuples_newpage_updated", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetXactTuplesReturned(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetXactTuplesReturned(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetXactTuplesReturned(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetXactTuplesReturned(...args: unknown[]) {
        return sqlFunction("pg_stat_get_xact_tuples_returned", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatGetXactTuplesUpdated(this: Types.Oid<1>): Types.Int8<1>
    pgStatGetXactTuplesUpdated(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgStatGetXactTuplesUpdated(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgStatGetXactTuplesUpdated(...args: unknown[]) {
        return sqlFunction("pg_stat_get_xact_tuples_updated", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatResetSingleFunctionCounters(this: Types.Oid<1>): Types.Void<1>
    pgStatResetSingleFunctionCounters(this: Types.Oid<0 | 1>): Types.Void<0 | 1>
    pgStatResetSingleFunctionCounters(this: Types.Oid<number>): Types.Void<0 | 1>
    pgStatResetSingleFunctionCounters(...args: unknown[]) {
        return sqlFunction("pg_stat_reset_single_function_counters", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatResetSingleTableCounters(this: Types.Oid<1>): Types.Void<1>
    pgStatResetSingleTableCounters(this: Types.Oid<0 | 1>): Types.Void<0 | 1>
    pgStatResetSingleTableCounters(this: Types.Oid<number>): Types.Void<0 | 1>
    pgStatResetSingleTableCounters(...args: unknown[]) {
        return sqlFunction("pg_stat_reset_single_table_counters", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatResetSubscriptionStats(this: Types.Oid<1>): Types.Void<1>
    pgStatResetSubscriptionStats(this: Types.Oid<0 | 1>): Types.Void<0 | 1>
    pgStatResetSubscriptionStats(this: Types.Oid<number>): Types.Void<0 | 1>
    pgStatResetSubscriptionStats(...args: unknown[]) {
        return sqlFunction("pg_stat_reset_subscription_stats", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgStatisticsObjIsVisible(this: Types.Oid<1>): Types.Bool<1>
    pgStatisticsObjIsVisible(this: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    pgStatisticsObjIsVisible(this: Types.Oid<number>): Types.Bool<0 | 1>
    pgStatisticsObjIsVisible(...args: unknown[]) {
        return sqlFunction("pg_statistics_obj_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTableIsVisible(this: Types.Oid<1>): Types.Bool<1>
    pgTableIsVisible(this: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    pgTableIsVisible(this: Types.Oid<number>): Types.Bool<0 | 1>
    pgTableIsVisible(...args: unknown[]) {
        return sqlFunction("pg_table_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTablespaceDatabases(this: Types.Oid<1>): Types.FromItem<{}>
    pgTablespaceDatabases(this: Types.Oid<0 | 1>): Types.FromItem<{}>
    pgTablespaceDatabases(this: Types.Oid<number>): Types.FromItem<{}>
    pgTablespaceDatabases(...args: unknown[]) {
        return sqlFunction("pg_tablespace_databases", [{args: [Types.Oid<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTablespaceLocation(this: Types.Oid<1>): Types.Text<1>
    pgTablespaceLocation(this: Types.Oid<0 | 1>): Types.Text<0 | 1>
    pgTablespaceLocation(this: Types.Oid<number>): Types.Text<0 | 1>
    pgTablespaceLocation(...args: unknown[]) {
        return sqlFunction("pg_tablespace_location", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTablespaceSize(this: Types.Oid<1>): Types.Int8<1>
    pgTablespaceSize(this: Types.Oid<0 | 1>): Types.Int8<0 | 1>
    pgTablespaceSize(this: Types.Oid<number>): Types.Int8<0 | 1>
    pgTablespaceSize(...args: unknown[]) {
        return sqlFunction("pg_tablespace_size", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTsConfigIsVisible(this: Types.Oid<1>): Types.Bool<1>
    pgTsConfigIsVisible(this: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    pgTsConfigIsVisible(this: Types.Oid<number>): Types.Bool<0 | 1>
    pgTsConfigIsVisible(...args: unknown[]) {
        return sqlFunction("pg_ts_config_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTsDictIsVisible(this: Types.Oid<1>): Types.Bool<1>
    pgTsDictIsVisible(this: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    pgTsDictIsVisible(this: Types.Oid<number>): Types.Bool<0 | 1>
    pgTsDictIsVisible(...args: unknown[]) {
        return sqlFunction("pg_ts_dict_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTsParserIsVisible(this: Types.Oid<1>): Types.Bool<1>
    pgTsParserIsVisible(this: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    pgTsParserIsVisible(this: Types.Oid<number>): Types.Bool<0 | 1>
    pgTsParserIsVisible(...args: unknown[]) {
        return sqlFunction("pg_ts_parser_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTsTemplateIsVisible(this: Types.Oid<1>): Types.Bool<1>
    pgTsTemplateIsVisible(this: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    pgTsTemplateIsVisible(this: Types.Oid<number>): Types.Bool<0 | 1>
    pgTsTemplateIsVisible(...args: unknown[]) {
        return sqlFunction("pg_ts_template_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTypeIsVisible(this: Types.Oid<1>): Types.Bool<1>
    pgTypeIsVisible(this: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    pgTypeIsVisible(this: Types.Oid<number>): Types.Bool<0 | 1>
    pgTypeIsVisible(...args: unknown[]) {
        return sqlFunction("pg_type_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plpgsqlValidator(this: Types.Oid<1>): Types.Void<1>
    plpgsqlValidator(this: Types.Oid<0 | 1>): Types.Void<0 | 1>
    plpgsqlValidator(this: Types.Oid<number>): Types.Void<0 | 1>
    plpgsqlValidator(...args: unknown[]) {
        return sqlFunction("plpgsql_validator", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rowSecurityActive(this: Types.Oid<1>): Types.Bool<1>
    rowSecurityActive(this: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    rowSecurityActive(this: Types.Oid<number>): Types.Bool<0 | 1>
    rowSecurityActive(...args: unknown[]) {
        return sqlFunction("row_security_active", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    satisfiesHashPartition(this: Types.Oid<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Any<unknown, 1> | Types.Input<Types.Any<unknown, 0 | 1>>, ...variadic: (Types.Any<unknown, 1> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Bool<1>
    satisfiesHashPartition(this: Types.Oid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Any<unknown, 0 | 1> | Types.Input<Types.Any<unknown, 0 | 1>>, ...variadic: (Types.Any<unknown, 0 | 1> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Bool<0 | 1>
    satisfiesHashPartition(this: Types.Oid<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>, ...variadic: (Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Bool<0 | 1>
    satisfiesHashPartition(...args: unknown[]) {
        return sqlFunction("satisfies_hash_partition", [{args: [Types.Oid<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    shobjDescription(this: Types.Oid<1>, a1: Types.Name<1>): Types.Text<1>
    shobjDescription(this: Types.Oid<0 | 1>, a1: Types.Name<0 | 1>): Types.Text<0 | 1>
    shobjDescription(this: Types.Oid<number>, a1: Types.Name<number>): Types.Text<0 | 1>
    shobjDescription(...args: unknown[]) {
        return sqlFunction("shobj_description", [{args: [Types.Oid<0 | 1>, Types.Name<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsParse(this: Types.Oid<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{tokid: Types.Int4<1>, token: Types.Text<1>}>
    tsParse(this: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{tokid: Types.Int4<0 | 1>, token: Types.Text<0 | 1>}>
    tsParse(this: Types.Oid<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{tokid: Types.Int4<0 | 1>, token: Types.Text<0 | 1>}>
    tsParse(...args: unknown[]) {
        return sqlFunction("ts_parse", [{args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({tokid: Types.Int4<0 | 1>, token: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsTokenType(this: Types.Oid<1>): Types.FromItem<{tokid: Types.Int4<1>, alias: Types.Text<1>, description: Types.Text<1>}>
    tsTokenType(this: Types.Oid<0 | 1>): Types.FromItem<{tokid: Types.Int4<0 | 1>, alias: Types.Text<0 | 1>, description: Types.Text<0 | 1>}>
    tsTokenType(this: Types.Oid<number>): Types.FromItem<{tokid: Types.Int4<0 | 1>, alias: Types.Text<0 | 1>, description: Types.Text<0 | 1>}>
    tsTokenType(...args: unknown[]) {
        return sqlFunction("ts_token_type", [{args: [Types.Oid<0 | 1>], ret: Types.FromItem.ofSchema({tokid: Types.Int4<0 | 1>, alias: Types.Text<0 | 1>, description: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Oid<1>, a1: Types.Oid<1>): Types.Bool<1>
    ["="](this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Oid<number>, a1: Types.Oid<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Oid<1>, a1: Types.Oid<1>): Types.Bool<1>
    eq(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Oid<number>, a1: Types.Oid<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Oid<1>, a1: Types.Oid<1>): Types.Bool<1>
    [">="](this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Oid<number>, a1: Types.Oid<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Oid<1>, a1: Types.Oid<1>): Types.Bool<1>
    gte(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Oid<number>, a1: Types.Oid<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Oid<1>, a1: Types.Oid<1>): Types.Bool<1>
    [">"](this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Oid<number>, a1: Types.Oid<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Oid<1>, a1: Types.Oid<1>): Types.Bool<1>
    gt(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Oid<number>, a1: Types.Oid<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Oid<1>, a1: Types.Oid<1>): Types.Bool<1>
    ["<="](this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Oid<number>, a1: Types.Oid<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Oid<1>, a1: Types.Oid<1>): Types.Bool<1>
    lte(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Oid<number>, a1: Types.Oid<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Oid<1>, a1: Types.Oid<1>): Types.Bool<1>
    ["<"](this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Oid<number>, a1: Types.Oid<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Oid<1>, a1: Types.Oid<1>): Types.Bool<1>
    lt(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Oid<number>, a1: Types.Oid<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Oid<1>, a1: Types.Oid<1>): Types.Bool<1>
    ["<>"](this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Oid<number>, a1: Types.Oid<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Oid<1>, a1: Types.Oid<1>): Types.Bool<1>
    ne(this: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Oid<number>, a1: Types.Oid<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
