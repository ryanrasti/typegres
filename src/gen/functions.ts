import { sqlFunction } from '../sql-function';
import * as Types from '../types';

export function riFKeyCascadeDel(): Types.Trigger<0 | 1>
export function riFKeyCascadeDel(...args: unknown[]) {
    return sqlFunction("RI_FKey_cascade_del", [{args: [], ret: Types.Trigger<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function riFKeyCascadeUpd(): Types.Trigger<0 | 1>
export function riFKeyCascadeUpd(...args: unknown[]) {
    return sqlFunction("RI_FKey_cascade_upd", [{args: [], ret: Types.Trigger<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function riFKeyCheckIns(): Types.Trigger<0 | 1>
export function riFKeyCheckIns(...args: unknown[]) {
    return sqlFunction("RI_FKey_check_ins", [{args: [], ret: Types.Trigger<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function riFKeyCheckUpd(): Types.Trigger<0 | 1>
export function riFKeyCheckUpd(...args: unknown[]) {
    return sqlFunction("RI_FKey_check_upd", [{args: [], ret: Types.Trigger<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function riFKeyNoactionDel(): Types.Trigger<0 | 1>
export function riFKeyNoactionDel(...args: unknown[]) {
    return sqlFunction("RI_FKey_noaction_del", [{args: [], ret: Types.Trigger<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function riFKeyNoactionUpd(): Types.Trigger<0 | 1>
export function riFKeyNoactionUpd(...args: unknown[]) {
    return sqlFunction("RI_FKey_noaction_upd", [{args: [], ret: Types.Trigger<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function riFKeyRestrictDel(): Types.Trigger<0 | 1>
export function riFKeyRestrictDel(...args: unknown[]) {
    return sqlFunction("RI_FKey_restrict_del", [{args: [], ret: Types.Trigger<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function riFKeyRestrictUpd(): Types.Trigger<0 | 1>
export function riFKeyRestrictUpd(...args: unknown[]) {
    return sqlFunction("RI_FKey_restrict_upd", [{args: [], ret: Types.Trigger<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function riFKeySetdefaultDel(): Types.Trigger<0 | 1>
export function riFKeySetdefaultDel(...args: unknown[]) {
    return sqlFunction("RI_FKey_setdefault_del", [{args: [], ret: Types.Trigger<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function riFKeySetdefaultUpd(): Types.Trigger<0 | 1>
export function riFKeySetdefaultUpd(...args: unknown[]) {
    return sqlFunction("RI_FKey_setdefault_upd", [{args: [], ret: Types.Trigger<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function riFKeySetnullDel(): Types.Trigger<0 | 1>
export function riFKeySetnullDel(...args: unknown[]) {
    return sqlFunction("RI_FKey_setnull_del", [{args: [], ret: Types.Trigger<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function riFKeySetnullUpd(): Types.Trigger<0 | 1>
export function riFKeySetnullUpd(...args: unknown[]) {
    return sqlFunction("RI_FKey_setnull_upd", [{args: [], ret: Types.Trigger<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function abbrev(a0: Types.Cidr<0 | 1>): Types.Text<0 | 1>
export function abbrev(a0: Types.Inet<0 | 1>): Types.Text<0 | 1>
export function abbrev(...args: unknown[]) {
    return sqlFunction("abbrev", [{args: [Types.Cidr<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Inet<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function abs(a0: Types.Float4<0 | 1>): Types.Float4<0 | 1>
export function abs(a0: Types.Float8<0 | 1>): Types.Float8<0 | 1>
export function abs(a0: Types.Int2<0 | 1>): Types.Int2<0 | 1>
export function abs(a0: Types.Int4<0 | 1>): Types.Int4<0 | 1>
export function abs(a0: Types.Int8<0 | 1>): Types.Int8<0 | 1>
export function abs(a0: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
export function abs(...args: unknown[]) {
    return sqlFunction("abs", [{args: [Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function aclcontains(a0: Types.Array<0 | 1, Types.Aclitem<0 | 1>>, a1: Types.Aclitem<0 | 1>): Types.Bool<0 | 1>
export function aclcontains(...args: unknown[]) {
    return sqlFunction("aclcontains", [{args: [Types.Array.of(Types.Aclitem<0 | 1>), Types.Aclitem<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function acldefault(a0: Types.Char<0 | 1>, a1: Types.Oid<0 | 1>): Types.Array<0 | 1, Types.Aclitem<0 | 1>>
export function acldefault(...args: unknown[]) {
    return sqlFunction("acldefault", [{args: [Types.Char<0 | 1>, Types.Oid<0 | 1>], ret: Types.Array.of(Types.Aclitem<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function aclexplode(a0: Types.Array<0 | 1, Types.Aclitem<0 | 1>>): Types.FromItem<{grantor: Types.Oid<0 | 1>, grantee: Types.Oid<0 | 1>, privilege_type: Types.Text<0 | 1>, is_grantable: Types.Bool<0 | 1>}>
export function aclexplode(...args: unknown[]) {
    return sqlFunction("aclexplode", [{args: [Types.Array.of(Types.Aclitem<0 | 1>)], ret: Types.FromItem.ofSchema({grantor: Types.Oid<0 | 1>, grantee: Types.Oid<0 | 1>, privilege_type: Types.Text<0 | 1>, is_grantable: Types.Bool<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function aclinsert(a0: Types.Array<0 | 1, Types.Aclitem<0 | 1>>, a1: Types.Aclitem<0 | 1>): Types.Array<0 | 1, Types.Aclitem<0 | 1>>
export function aclinsert(...args: unknown[]) {
    return sqlFunction("aclinsert", [{args: [Types.Array.of(Types.Aclitem<0 | 1>), Types.Aclitem<0 | 1>], ret: Types.Array.of(Types.Aclitem<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function aclitemeq(a0: Types.Aclitem<0 | 1>, a1: Types.Aclitem<0 | 1>): Types.Bool<0 | 1>
export function aclitemeq(...args: unknown[]) {
    return sqlFunction("aclitemeq", [{args: [Types.Aclitem<0 | 1>, Types.Aclitem<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function aclremove(a0: Types.Array<0 | 1, Types.Aclitem<0 | 1>>, a1: Types.Aclitem<0 | 1>): Types.Array<0 | 1, Types.Aclitem<0 | 1>>
export function aclremove(...args: unknown[]) {
    return sqlFunction("aclremove", [{args: [Types.Array.of(Types.Aclitem<0 | 1>), Types.Aclitem<0 | 1>], ret: Types.Array.of(Types.Aclitem<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function acos(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function acos(...args: unknown[]) {
    return sqlFunction("acos", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function acosd(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function acosd(...args: unknown[]) {
    return sqlFunction("acosd", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function acosh(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function acosh(...args: unknown[]) {
    return sqlFunction("acosh", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function age(a0: Types.Xid<0 | 1>): Types.Int4<0 | 1>
export function age(a0: Types.Timestamp<0 | 1>): Types.Interval<0 | 1>
export function age(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Interval<0 | 1>
export function age(a0: Types.Timestamptz<0 | 1>): Types.Interval<0 | 1>
export function age(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Interval<0 | 1>
export function age(...args: unknown[]) {
    return sqlFunction("age", [{args: [Types.Xid<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function amvalidate(a0: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function amvalidate(...args: unknown[]) {
    return sqlFunction("amvalidate", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function anyValue<T extends Types.Any>(a0: T): T
export function anyValue(...args: unknown[]) {
    return sqlFunction("any_value", [({T}) => ({args: [T], ret: T, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function anyValueTransfn<T extends Types.Any>(a0: T, a1: T): T
export function anyValueTransfn(...args: unknown[]) {
    return sqlFunction("any_value_transfn", [({T}) => ({args: [T, T], ret: T, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function anytextcat<T extends Types.Any>(a0: T, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function anytextcat(...args: unknown[]) {
    return sqlFunction("anytextcat", [({T}) => ({args: [T, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function area(a0: Types.Box<0 | 1>): Types.Float8<0 | 1>
export function area(a0: Types.Circle<0 | 1>): Types.Float8<0 | 1>
export function area(a0: Types.Path<0 | 1>): Types.Float8<0 | 1>
export function area(...args: unknown[]) {
    return sqlFunction("area", [{args: [Types.Box<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Circle<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Path<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function arrayAgg<T extends Types.Any>(a0: Types.Array<number, T>): Types.Array<0 | 1, T>
export function arrayAgg<T extends Types.Any>(a0: T): Types.Array<0 | 1, T>
export function arrayAgg(...args: unknown[]) {
    return sqlFunction("array_agg", [({T}) => ({args: [Types.Array.of(T)], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [T], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayAppend<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: T): Types.Array<0 | 1, T>
export function arrayAppend(...args: unknown[]) {
    return sqlFunction("array_append", [({T}) => ({args: [Types.Array.of(T), T], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayCat<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Array<0 | 1, T>
export function arrayCat(...args: unknown[]) {
    return sqlFunction("array_cat", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayDims<T extends Types.Any>(a0: Types.Array<0 | 1, T>): Types.Text<0 | 1>
export function arrayDims(...args: unknown[]) {
    return sqlFunction("array_dims", [({T}) => ({args: [Types.Array.of(T)], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayEq<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
export function arrayEq(...args: unknown[]) {
    return sqlFunction("array_eq", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayFill<T extends Types.Any>(a0: T, a1: Types.Array<0 | 1, Types.Int4<0 | 1>>): Types.Array<0 | 1, T>
export function arrayFill<T extends Types.Any>(a0: T, a1: Types.Array<0 | 1, Types.Int4<0 | 1>>, a2: Types.Array<0 | 1, Types.Int4<0 | 1>>): Types.Array<0 | 1, T>
export function arrayFill(...args: unknown[]) {
    return sqlFunction("array_fill", [({T}) => ({args: [T, Types.Array.of(Types.Int4<0 | 1>)], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [T, Types.Array.of(Types.Int4<0 | 1>), Types.Array.of(Types.Int4<0 | 1>)], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayGe<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
export function arrayGe(...args: unknown[]) {
    return sqlFunction("array_ge", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayGt<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
export function arrayGt(...args: unknown[]) {
    return sqlFunction("array_gt", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayLarger<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Array<0 | 1, T>
export function arrayLarger(...args: unknown[]) {
    return sqlFunction("array_larger", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayLe<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
export function arrayLe(...args: unknown[]) {
    return sqlFunction("array_le", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayLength<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function arrayLength(...args: unknown[]) {
    return sqlFunction("array_length", [({T}) => ({args: [Types.Array.of(T), Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayLower<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function arrayLower(...args: unknown[]) {
    return sqlFunction("array_lower", [({T}) => ({args: [Types.Array.of(T), Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayLt<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
export function arrayLt(...args: unknown[]) {
    return sqlFunction("array_lt", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayNdims<T extends Types.Any>(a0: Types.Array<0 | 1, T>): Types.Int4<0 | 1>
export function arrayNdims(...args: unknown[]) {
    return sqlFunction("array_ndims", [({T}) => ({args: [Types.Array.of(T)], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayNe<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
export function arrayNe(...args: unknown[]) {
    return sqlFunction("array_ne", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayPosition<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: T): Types.Int4<0 | 1>
export function arrayPosition<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: T, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function arrayPosition(...args: unknown[]) {
    return sqlFunction("array_position", [({T}) => ({args: [Types.Array.of(T), T], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [Types.Array.of(T), T, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayPositions<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: T): Types.Array<0 | 1, Types.Int4<0 | 1>>
export function arrayPositions(...args: unknown[]) {
    return sqlFunction("array_positions", [({T}) => ({args: [Types.Array.of(T), T], ret: Types.Array.of(Types.Int4<0 | 1>), isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayPrepend<T extends Types.Any>(a0: T, a1: Types.Array<0 | 1, T>): Types.Array<0 | 1, T>
export function arrayPrepend(...args: unknown[]) {
    return sqlFunction("array_prepend", [({T}) => ({args: [T, Types.Array.of(T)], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayRemove<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: T): Types.Array<0 | 1, T>
export function arrayRemove(...args: unknown[]) {
    return sqlFunction("array_remove", [({T}) => ({args: [Types.Array.of(T), T], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayReplace<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: T, a2: T): Types.Array<0 | 1, T>
export function arrayReplace(...args: unknown[]) {
    return sqlFunction("array_replace", [({T}) => ({args: [Types.Array.of(T), T, T], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arraySample<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Array<0 | 1, T>
export function arraySample(...args: unknown[]) {
    return sqlFunction("array_sample", [({T}) => ({args: [Types.Array.of(T), Types.Int4<0 | 1>], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayShuffle<T extends Types.Any>(a0: Types.Array<0 | 1, T>): Types.Array<0 | 1, T>
export function arrayShuffle(...args: unknown[]) {
    return sqlFunction("array_shuffle", [({T}) => ({args: [Types.Array.of(T)], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arraySmaller<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Array<0 | 1, T>
export function arraySmaller(...args: unknown[]) {
    return sqlFunction("array_smaller", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayToJson<T extends Types.Any>(a0: Types.Array<0 | 1, T>): Types.Json<0 | 1>
export function arrayToJson<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Json<0 | 1>
export function arrayToJson(...args: unknown[]) {
    return sqlFunction("array_to_json", [({T}) => ({args: [Types.Array.of(T)], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [Types.Array.of(T), Types.Bool<0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayToString<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function arrayToString<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function arrayToString(...args: unknown[]) {
    return sqlFunction("array_to_string", [({T}) => ({args: [Types.Array.of(T), Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [Types.Array.of(T), Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayToTsvector(a0: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Tsvector<0 | 1>
export function arrayToTsvector(...args: unknown[]) {
    return sqlFunction("array_to_tsvector", [{args: [Types.Array.of(Types.Text<0 | 1>)], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function arrayUpper<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function arrayUpper(...args: unknown[]) {
    return sqlFunction("array_upper", [({T}) => ({args: [Types.Array.of(T), Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arraycontained<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
export function arraycontained(...args: unknown[]) {
    return sqlFunction("arraycontained", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arraycontains<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
export function arraycontains(...args: unknown[]) {
    return sqlFunction("arraycontains", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function arrayoverlap<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
export function arrayoverlap(...args: unknown[]) {
    return sqlFunction("arrayoverlap", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function ascii(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
export function ascii(...args: unknown[]) {
    return sqlFunction("ascii", [{args: [Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function asind(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function asind(...args: unknown[]) {
    return sqlFunction("asind", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function asinh(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function asinh(...args: unknown[]) {
    return sqlFunction("asinh", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function atan(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function atan(...args: unknown[]) {
    return sqlFunction("atan", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function atan2(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function atan2(...args: unknown[]) {
    return sqlFunction("atan2", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function atan2D(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function atan2D(...args: unknown[]) {
    return sqlFunction("atan2d", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function atand(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function atand(...args: unknown[]) {
    return sqlFunction("atand", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function atanh(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function atanh(...args: unknown[]) {
    return sqlFunction("atanh", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function avg(a0: Types.Float4<number>): Types.Float8<0 | 1>
export function avg(a0: Types.Float8<number>): Types.Float8<0 | 1>
export function avg(a0: Types.Interval<number>): Types.Interval<0 | 1>
export function avg(a0: Types.Int2<number>): Types.Numeric<0 | 1>
export function avg(a0: Types.Int4<number>): Types.Numeric<0 | 1>
export function avg(a0: Types.Int8<number>): Types.Numeric<0 | 1>
export function avg(a0: Types.Numeric<number>): Types.Numeric<0 | 1>
export function avg(...args: unknown[]) {
    return sqlFunction("avg", [{args: [Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function binaryUpgradeAddSubRelState(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Oid<0 | 1>, a2: Types.Char<0 | 1>, a3: Types.PgLsn<0 | 1>): Types.Void<0 | 1>
export function binaryUpgradeAddSubRelState(...args: unknown[]) {
    return sqlFunction("binary_upgrade_add_sub_rel_state", [{args: [Types.Text<0 | 1>, Types.Oid<0 | 1>, Types.Char<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function binaryUpgradeCreateEmptyExtension(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a4: Types.Array<0 | 1, Types.Oid<0 | 1>>, a5: Types.Array<0 | 1, Types.Text<0 | 1>>, a6: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Void<0 | 1>
export function binaryUpgradeCreateEmptyExtension(...args: unknown[]) {
    return sqlFunction("binary_upgrade_create_empty_extension", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>, Types.Array.of(Types.Oid<0 | 1>), Types.Array.of(Types.Text<0 | 1>), Types.Array.of(Types.Text<0 | 1>)], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function binaryUpgradeLogicalSlotHasCaughtUp(a0: Types.Name<0 | 1>): Types.Bool<0 | 1>
export function binaryUpgradeLogicalSlotHasCaughtUp(...args: unknown[]) {
    return sqlFunction("binary_upgrade_logical_slot_has_caught_up", [{args: [Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function binaryUpgradeReploriginAdvance(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.PgLsn<0 | 1>): Types.Void<0 | 1>
export function binaryUpgradeReploriginAdvance(...args: unknown[]) {
    return sqlFunction("binary_upgrade_replorigin_advance", [{args: [Types.Text<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function binaryUpgradeSetMissingValue(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Void<0 | 1>
export function binaryUpgradeSetMissingValue(...args: unknown[]) {
    return sqlFunction("binary_upgrade_set_missing_value", [{args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function binaryUpgradeSetNextArrayPgTypeOid(a0: Types.Oid<0 | 1>): Types.Void<0 | 1>
export function binaryUpgradeSetNextArrayPgTypeOid(...args: unknown[]) {
    return sqlFunction("binary_upgrade_set_next_array_pg_type_oid", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function binaryUpgradeSetNextHeapPgClassOid(a0: Types.Oid<0 | 1>): Types.Void<0 | 1>
export function binaryUpgradeSetNextHeapPgClassOid(...args: unknown[]) {
    return sqlFunction("binary_upgrade_set_next_heap_pg_class_oid", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function binaryUpgradeSetNextHeapRelfilenode(a0: Types.Oid<0 | 1>): Types.Void<0 | 1>
export function binaryUpgradeSetNextHeapRelfilenode(...args: unknown[]) {
    return sqlFunction("binary_upgrade_set_next_heap_relfilenode", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function binaryUpgradeSetNextIndexPgClassOid(a0: Types.Oid<0 | 1>): Types.Void<0 | 1>
export function binaryUpgradeSetNextIndexPgClassOid(...args: unknown[]) {
    return sqlFunction("binary_upgrade_set_next_index_pg_class_oid", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function binaryUpgradeSetNextIndexRelfilenode(a0: Types.Oid<0 | 1>): Types.Void<0 | 1>
export function binaryUpgradeSetNextIndexRelfilenode(...args: unknown[]) {
    return sqlFunction("binary_upgrade_set_next_index_relfilenode", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function binaryUpgradeSetNextMultirangeArrayPgTypeOid(a0: Types.Oid<0 | 1>): Types.Void<0 | 1>
export function binaryUpgradeSetNextMultirangeArrayPgTypeOid(...args: unknown[]) {
    return sqlFunction("binary_upgrade_set_next_multirange_array_pg_type_oid", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function binaryUpgradeSetNextMultirangePgTypeOid(a0: Types.Oid<0 | 1>): Types.Void<0 | 1>
export function binaryUpgradeSetNextMultirangePgTypeOid(...args: unknown[]) {
    return sqlFunction("binary_upgrade_set_next_multirange_pg_type_oid", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function binaryUpgradeSetNextPgAuthidOid(a0: Types.Oid<0 | 1>): Types.Void<0 | 1>
export function binaryUpgradeSetNextPgAuthidOid(...args: unknown[]) {
    return sqlFunction("binary_upgrade_set_next_pg_authid_oid", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function binaryUpgradeSetNextPgEnumOid(a0: Types.Oid<0 | 1>): Types.Void<0 | 1>
export function binaryUpgradeSetNextPgEnumOid(...args: unknown[]) {
    return sqlFunction("binary_upgrade_set_next_pg_enum_oid", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function binaryUpgradeSetNextPgTablespaceOid(a0: Types.Oid<0 | 1>): Types.Void<0 | 1>
export function binaryUpgradeSetNextPgTablespaceOid(...args: unknown[]) {
    return sqlFunction("binary_upgrade_set_next_pg_tablespace_oid", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function binaryUpgradeSetNextPgTypeOid(a0: Types.Oid<0 | 1>): Types.Void<0 | 1>
export function binaryUpgradeSetNextPgTypeOid(...args: unknown[]) {
    return sqlFunction("binary_upgrade_set_next_pg_type_oid", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function binaryUpgradeSetNextToastPgClassOid(a0: Types.Oid<0 | 1>): Types.Void<0 | 1>
export function binaryUpgradeSetNextToastPgClassOid(...args: unknown[]) {
    return sqlFunction("binary_upgrade_set_next_toast_pg_class_oid", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function binaryUpgradeSetNextToastRelfilenode(a0: Types.Oid<0 | 1>): Types.Void<0 | 1>
export function binaryUpgradeSetNextToastRelfilenode(...args: unknown[]) {
    return sqlFunction("binary_upgrade_set_next_toast_relfilenode", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function binaryUpgradeSetRecordInitPrivs(a0: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Void<0 | 1>
export function binaryUpgradeSetRecordInitPrivs(...args: unknown[]) {
    return sqlFunction("binary_upgrade_set_record_init_privs", [{args: [Types.Bool<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bit(a0: Types.Bit<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bit<0 | 1>
export function bit(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
export function bit(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
export function bit(...args: unknown[]) {
    return sqlFunction("bit", [{args: [Types.Bit<0 | 1>, Types.Int4<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function bitAnd(a0: Types.Bit<number>): Types.Bit<0 | 1>
export function bitAnd(a0: Types.Int2<number>): Types.Int2<0 | 1>
export function bitAnd(a0: Types.Int4<number>): Types.Int4<0 | 1>
export function bitAnd(a0: Types.Int8<number>): Types.Int8<0 | 1>
export function bitAnd(...args: unknown[]) {
    return sqlFunction("bit_and", [{args: [Types.Bit<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bitCount(a0: Types.Bit<0 | 1>): Types.Int8<0 | 1>
export function bitCount(a0: Types.Bytea<0 | 1>): Types.Int8<0 | 1>
export function bitCount(...args: unknown[]) {
    return sqlFunction("bit_count", [{args: [Types.Bit<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Bytea<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bitLength(a0: Types.Bit<0 | 1>): Types.Int4<0 | 1>
export function bitLength(a0: Types.Bytea<0 | 1>): Types.Int4<0 | 1>
export function bitLength(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
export function bitLength(...args: unknown[]) {
    return sqlFunction("bit_length", [{args: [Types.Bit<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Bytea<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bitOr(a0: Types.Bit<number>): Types.Bit<0 | 1>
export function bitOr(a0: Types.Int2<number>): Types.Int2<0 | 1>
export function bitOr(a0: Types.Int4<number>): Types.Int4<0 | 1>
export function bitOr(a0: Types.Int8<number>): Types.Int8<0 | 1>
export function bitOr(...args: unknown[]) {
    return sqlFunction("bit_or", [{args: [Types.Bit<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bitXor(a0: Types.Bit<number>): Types.Bit<0 | 1>
export function bitXor(a0: Types.Int2<number>): Types.Int2<0 | 1>
export function bitXor(a0: Types.Int4<number>): Types.Int4<0 | 1>
export function bitXor(a0: Types.Int8<number>): Types.Int8<0 | 1>
export function bitXor(...args: unknown[]) {
    return sqlFunction("bit_xor", [{args: [Types.Bit<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bitand(a0: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bit<0 | 1>
export function bitand(...args: unknown[]) {
    return sqlFunction("bitand", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bitcat(a0: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Varbit<0 | 1>
export function bitcat(...args: unknown[]) {
    return sqlFunction("bitcat", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Varbit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bitcmp(a0: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Int4<0 | 1>
export function bitcmp(...args: unknown[]) {
    return sqlFunction("bitcmp", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function biteq(a0: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
export function biteq(...args: unknown[]) {
    return sqlFunction("biteq", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bitge(a0: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
export function bitge(...args: unknown[]) {
    return sqlFunction("bitge", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bitgt(a0: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
export function bitgt(...args: unknown[]) {
    return sqlFunction("bitgt", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bitle(a0: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
export function bitle(...args: unknown[]) {
    return sqlFunction("bitle", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bitlt(a0: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
export function bitlt(...args: unknown[]) {
    return sqlFunction("bitlt", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bitne(a0: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bool<0 | 1>
export function bitne(...args: unknown[]) {
    return sqlFunction("bitne", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bitnot(a0: Types.Bit<0 | 1>): Types.Bit<0 | 1>
export function bitnot(...args: unknown[]) {
    return sqlFunction("bitnot", [{args: [Types.Bit<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bitor(a0: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bit<0 | 1>
export function bitor(...args: unknown[]) {
    return sqlFunction("bitor", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bitshiftleft(a0: Types.Bit<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
export function bitshiftleft(...args: unknown[]) {
    return sqlFunction("bitshiftleft", [{args: [Types.Bit<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bitshiftright(a0: Types.Bit<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bit<0 | 1>
export function bitshiftright(...args: unknown[]) {
    return sqlFunction("bitshiftright", [{args: [Types.Bit<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bitxor(a0: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Bit<0 | 1>
export function bitxor(...args: unknown[]) {
    return sqlFunction("bitxor", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bool(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function bool(a0: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
export function bool(...args: unknown[]) {
    return sqlFunction("bool", [{args: [Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boolAnd(a0: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function boolAnd(...args: unknown[]) {
    return sqlFunction("bool_and", [{args: [Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boolOr(a0: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function boolOr(...args: unknown[]) {
    return sqlFunction("bool_or", [{args: [Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boolandStatefunc(a0: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function boolandStatefunc(...args: unknown[]) {
    return sqlFunction("booland_statefunc", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function booleq(a0: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function booleq(...args: unknown[]) {
    return sqlFunction("booleq", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boolge(a0: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function boolge(...args: unknown[]) {
    return sqlFunction("boolge", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boolgt(a0: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function boolgt(...args: unknown[]) {
    return sqlFunction("boolgt", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boolle(a0: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function boolle(...args: unknown[]) {
    return sqlFunction("boolle", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boollt(a0: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function boollt(...args: unknown[]) {
    return sqlFunction("boollt", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boolne(a0: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function boolne(...args: unknown[]) {
    return sqlFunction("boolne", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boolorStatefunc(a0: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function boolorStatefunc(...args: unknown[]) {
    return sqlFunction("boolor_statefunc", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boundBox(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Box<0 | 1>
export function boundBox(...args: unknown[]) {
    return sqlFunction("bound_box", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function box(a0: Types.Circle<0 | 1>): Types.Box<0 | 1>
export function box(a0: Types.Point<0 | 1>): Types.Box<0 | 1>
export function box(a0: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Box<0 | 1>
export function box(a0: Types.Polygon<0 | 1>): Types.Box<0 | 1>
export function box(...args: unknown[]) {
    return sqlFunction("box", [{args: [Types.Circle<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Point<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Polygon<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxAbove(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function boxAbove(...args: unknown[]) {
    return sqlFunction("box_above", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxAboveEq(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function boxAboveEq(...args: unknown[]) {
    return sqlFunction("box_above_eq", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxAdd(a0: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Box<0 | 1>
export function boxAdd(...args: unknown[]) {
    return sqlFunction("box_add", [{args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxBelow(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function boxBelow(...args: unknown[]) {
    return sqlFunction("box_below", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxBelowEq(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function boxBelowEq(...args: unknown[]) {
    return sqlFunction("box_below_eq", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxCenter(a0: Types.Box<0 | 1>): Types.Point<0 | 1>
export function boxCenter(...args: unknown[]) {
    return sqlFunction("box_center", [{args: [Types.Box<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxContainPt(a0: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
export function boxContainPt(...args: unknown[]) {
    return sqlFunction("box_contain_pt", [{args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxContained(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function boxContained(...args: unknown[]) {
    return sqlFunction("box_contained", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxDistance(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Float8<0 | 1>
export function boxDistance(...args: unknown[]) {
    return sqlFunction("box_distance", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxDiv(a0: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Box<0 | 1>
export function boxDiv(...args: unknown[]) {
    return sqlFunction("box_div", [{args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxEq(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function boxEq(...args: unknown[]) {
    return sqlFunction("box_eq", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxGe(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function boxGe(...args: unknown[]) {
    return sqlFunction("box_ge", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxGt(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function boxGt(...args: unknown[]) {
    return sqlFunction("box_gt", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxIntersect(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Box<0 | 1>
export function boxIntersect(...args: unknown[]) {
    return sqlFunction("box_intersect", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxLe(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function boxLe(...args: unknown[]) {
    return sqlFunction("box_le", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxLeft(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function boxLeft(...args: unknown[]) {
    return sqlFunction("box_left", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxLt(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function boxLt(...args: unknown[]) {
    return sqlFunction("box_lt", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxMul(a0: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Box<0 | 1>
export function boxMul(...args: unknown[]) {
    return sqlFunction("box_mul", [{args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxOverabove(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function boxOverabove(...args: unknown[]) {
    return sqlFunction("box_overabove", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxOverbelow(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function boxOverbelow(...args: unknown[]) {
    return sqlFunction("box_overbelow", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxOverlap(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function boxOverlap(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function boxOverlap(...args: unknown[]) {
    return sqlFunction("box_overlap", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxOverleft(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function boxOverleft(...args: unknown[]) {
    return sqlFunction("box_overleft", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxOverright(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function boxOverright(...args: unknown[]) {
    return sqlFunction("box_overright", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxRight(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function boxRight(...args: unknown[]) {
    return sqlFunction("box_right", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxSame(a0: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function boxSame(...args: unknown[]) {
    return sqlFunction("box_same", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function boxSub(a0: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Box<0 | 1>
export function boxSub(...args: unknown[]) {
    return sqlFunction("box_sub", [{args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpchar(a0: Types.Bpchar<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bpchar<0 | 1>
export function bpchar(a0: Types.Char<0 | 1>): Types.Bpchar<0 | 1>
export function bpchar(a0: Types.Name<0 | 1>): Types.Bpchar<0 | 1>
export function bpchar(...args: unknown[]) {
    return sqlFunction("bpchar", [{args: [Types.Bpchar<0 | 1>, Types.Int4<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bpchar<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Char<0 | 1>], ret: Types.Bpchar<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>], ret: Types.Bpchar<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpcharLarger(a0: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bpchar<0 | 1>
export function bpcharLarger(...args: unknown[]) {
    return sqlFunction("bpchar_larger", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bpchar<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpcharPatternGe(a0: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
export function bpcharPatternGe(...args: unknown[]) {
    return sqlFunction("bpchar_pattern_ge", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpcharPatternGt(a0: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
export function bpcharPatternGt(...args: unknown[]) {
    return sqlFunction("bpchar_pattern_gt", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpcharPatternLe(a0: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
export function bpcharPatternLe(...args: unknown[]) {
    return sqlFunction("bpchar_pattern_le", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpcharPatternLt(a0: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
export function bpcharPatternLt(...args: unknown[]) {
    return sqlFunction("bpchar_pattern_lt", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpcharSmaller(a0: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bpchar<0 | 1>
export function bpcharSmaller(...args: unknown[]) {
    return sqlFunction("bpchar_smaller", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bpchar<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpcharcmp(a0: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Int4<0 | 1>
export function bpcharcmp(...args: unknown[]) {
    return sqlFunction("bpcharcmp", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpchareq(a0: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
export function bpchareq(...args: unknown[]) {
    return sqlFunction("bpchareq", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpcharge(a0: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
export function bpcharge(...args: unknown[]) {
    return sqlFunction("bpcharge", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpchargt(a0: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
export function bpchargt(...args: unknown[]) {
    return sqlFunction("bpchargt", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpchariclike(a0: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function bpchariclike(...args: unknown[]) {
    return sqlFunction("bpchariclike", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpcharicnlike(a0: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function bpcharicnlike(...args: unknown[]) {
    return sqlFunction("bpcharicnlike", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpcharicregexeq(a0: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function bpcharicregexeq(...args: unknown[]) {
    return sqlFunction("bpcharicregexeq", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpcharicregexne(a0: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function bpcharicregexne(...args: unknown[]) {
    return sqlFunction("bpcharicregexne", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpcharle(a0: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
export function bpcharle(...args: unknown[]) {
    return sqlFunction("bpcharle", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpcharlike(a0: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function bpcharlike(...args: unknown[]) {
    return sqlFunction("bpcharlike", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpcharlt(a0: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
export function bpcharlt(...args: unknown[]) {
    return sqlFunction("bpcharlt", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpcharne(a0: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Bool<0 | 1>
export function bpcharne(...args: unknown[]) {
    return sqlFunction("bpcharne", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpcharnlike(a0: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function bpcharnlike(...args: unknown[]) {
    return sqlFunction("bpcharnlike", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpcharregexeq(a0: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function bpcharregexeq(...args: unknown[]) {
    return sqlFunction("bpcharregexeq", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bpcharregexne(a0: Types.Bpchar<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function bpcharregexne(...args: unknown[]) {
    return sqlFunction("bpcharregexne", [{args: [Types.Bpchar<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function brinDesummarizeRange(a0: Types.Regclass<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Void<0 | 1>
export function brinDesummarizeRange(...args: unknown[]) {
    return sqlFunction("brin_desummarize_range", [{args: [Types.Regclass<0 | 1>, Types.Int8<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function brinSummarizeNewValues(a0: Types.Regclass<0 | 1>): Types.Int4<0 | 1>
export function brinSummarizeNewValues(...args: unknown[]) {
    return sqlFunction("brin_summarize_new_values", [{args: [Types.Regclass<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function brinSummarizeRange(a0: Types.Regclass<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<0 | 1>
export function brinSummarizeRange(...args: unknown[]) {
    return sqlFunction("brin_summarize_range", [{args: [Types.Regclass<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function broadcast(a0: Types.Inet<0 | 1>): Types.Inet<0 | 1>
export function broadcast(...args: unknown[]) {
    return sqlFunction("broadcast", [{args: [Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btarraycmp<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Int4<0 | 1>
export function btarraycmp(...args: unknown[]) {
    return sqlFunction("btarraycmp", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function btboolcmp(a0: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Int4<0 | 1>
export function btboolcmp(...args: unknown[]) {
    return sqlFunction("btboolcmp", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btbpcharPatternCmp(a0: Types.Bpchar<0 | 1>, a1: Types.Bpchar<0 | 1>): Types.Int4<0 | 1>
export function btbpcharPatternCmp(...args: unknown[]) {
    return sqlFunction("btbpchar_pattern_cmp", [{args: [Types.Bpchar<0 | 1>, Types.Bpchar<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btcharcmp(a0: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Int4<0 | 1>
export function btcharcmp(...args: unknown[]) {
    return sqlFunction("btcharcmp", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btequalimage(a0: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function btequalimage(...args: unknown[]) {
    return sqlFunction("btequalimage", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btfloat48Cmp(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Int4<0 | 1>
export function btfloat48Cmp(...args: unknown[]) {
    return sqlFunction("btfloat48cmp", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btfloat4Cmp(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Int4<0 | 1>
export function btfloat4Cmp(...args: unknown[]) {
    return sqlFunction("btfloat4cmp", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btfloat84Cmp(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Int4<0 | 1>
export function btfloat84Cmp(...args: unknown[]) {
    return sqlFunction("btfloat84cmp", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btfloat8Cmp(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Int4<0 | 1>
export function btfloat8Cmp(...args: unknown[]) {
    return sqlFunction("btfloat8cmp", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btint24Cmp(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function btint24Cmp(...args: unknown[]) {
    return sqlFunction("btint24cmp", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btint28Cmp(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<0 | 1>
export function btint28Cmp(...args: unknown[]) {
    return sqlFunction("btint28cmp", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btint2Cmp(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
export function btint2Cmp(...args: unknown[]) {
    return sqlFunction("btint2cmp", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btint42Cmp(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
export function btint42Cmp(...args: unknown[]) {
    return sqlFunction("btint42cmp", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btint48Cmp(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<0 | 1>
export function btint48Cmp(...args: unknown[]) {
    return sqlFunction("btint48cmp", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btint4Cmp(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function btint4Cmp(...args: unknown[]) {
    return sqlFunction("btint4cmp", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btint82Cmp(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
export function btint82Cmp(...args: unknown[]) {
    return sqlFunction("btint82cmp", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btint84Cmp(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function btint84Cmp(...args: unknown[]) {
    return sqlFunction("btint84cmp", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btint8Cmp(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<0 | 1>
export function btint8Cmp(...args: unknown[]) {
    return sqlFunction("btint8cmp", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btnamecmp(a0: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Int4<0 | 1>
export function btnamecmp(...args: unknown[]) {
    return sqlFunction("btnamecmp", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btnametextcmp(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
export function btnametextcmp(...args: unknown[]) {
    return sqlFunction("btnametextcmp", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btoidcmp(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Int4<0 | 1>
export function btoidcmp(...args: unknown[]) {
    return sqlFunction("btoidcmp", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btoidvectorcmp(a0: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Int4<0 | 1>
export function btoidvectorcmp(...args: unknown[]) {
    return sqlFunction("btoidvectorcmp", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btrecordcmp<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(a0: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Int4<0 | 1>
export function btrecordcmp(...args: unknown[]) {
    return sqlFunction("btrecordcmp", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function btrecordimagecmp<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(a0: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Int4<0 | 1>
export function btrecordimagecmp(...args: unknown[]) {
    return sqlFunction("btrecordimagecmp", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function btrim(a0: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bytea<0 | 1>
export function btrim(a0: Types.Text<0 | 1>): Types.Text<0 | 1>
export function btrim(a0: Types.Text<0 | 1>, a1: Types.Text<0 | 1>): Types.Text<0 | 1>
export function btrim(...args: unknown[]) {
    return sqlFunction("btrim", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bttextPatternCmp(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
export function bttextPatternCmp(...args: unknown[]) {
    return sqlFunction("bttext_pattern_cmp", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bttextcmp(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
export function bttextcmp(...args: unknown[]) {
    return sqlFunction("bttextcmp", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bttextnamecmp(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Name<0 | 1>): Types.Int4<0 | 1>
export function bttextnamecmp(...args: unknown[]) {
    return sqlFunction("bttextnamecmp", [{args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bttidcmp(a0: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Int4<0 | 1>
export function bttidcmp(...args: unknown[]) {
    return sqlFunction("bttidcmp", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function btvarstrequalimage(a0: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function btvarstrequalimage(...args: unknown[]) {
    return sqlFunction("btvarstrequalimage", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function byteacat(a0: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bytea<0 | 1>
export function byteacat(...args: unknown[]) {
    return sqlFunction("byteacat", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function byteacmp(a0: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Int4<0 | 1>
export function byteacmp(...args: unknown[]) {
    return sqlFunction("byteacmp", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function byteaeq(a0: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
export function byteaeq(...args: unknown[]) {
    return sqlFunction("byteaeq", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function byteage(a0: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
export function byteage(...args: unknown[]) {
    return sqlFunction("byteage", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function byteagt(a0: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
export function byteagt(...args: unknown[]) {
    return sqlFunction("byteagt", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function byteale(a0: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
export function byteale(...args: unknown[]) {
    return sqlFunction("byteale", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bytealike(a0: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
export function bytealike(...args: unknown[]) {
    return sqlFunction("bytealike", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function bytealt(a0: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
export function bytealt(...args: unknown[]) {
    return sqlFunction("bytealt", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function byteane(a0: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
export function byteane(...args: unknown[]) {
    return sqlFunction("byteane", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function byteanlike(a0: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
export function byteanlike(...args: unknown[]) {
    return sqlFunction("byteanlike", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cardinality<T extends Types.Any>(a0: Types.Array<0 | 1, T>): Types.Int4<0 | 1>
export function cardinality(...args: unknown[]) {
    return sqlFunction("cardinality", [({T}) => ({args: [Types.Array.of(T)], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function cashCmp(a0: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Int4<0 | 1>
export function cashCmp(...args: unknown[]) {
    return sqlFunction("cash_cmp", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashDivCash(a0: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Float8<0 | 1>
export function cashDivCash(...args: unknown[]) {
    return sqlFunction("cash_div_cash", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashDivFlt4(a0: Types.Money<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Money<0 | 1>
export function cashDivFlt4(...args: unknown[]) {
    return sqlFunction("cash_div_flt4", [{args: [Types.Money<0 | 1>, Types.Float4<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashDivFlt8(a0: Types.Money<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Money<0 | 1>
export function cashDivFlt8(...args: unknown[]) {
    return sqlFunction("cash_div_flt8", [{args: [Types.Money<0 | 1>, Types.Float8<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashDivInt2(a0: Types.Money<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Money<0 | 1>
export function cashDivInt2(...args: unknown[]) {
    return sqlFunction("cash_div_int2", [{args: [Types.Money<0 | 1>, Types.Int2<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashDivInt4(a0: Types.Money<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Money<0 | 1>
export function cashDivInt4(...args: unknown[]) {
    return sqlFunction("cash_div_int4", [{args: [Types.Money<0 | 1>, Types.Int4<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashDivInt8(a0: Types.Money<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Money<0 | 1>
export function cashDivInt8(...args: unknown[]) {
    return sqlFunction("cash_div_int8", [{args: [Types.Money<0 | 1>, Types.Int8<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashEq(a0: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
export function cashEq(...args: unknown[]) {
    return sqlFunction("cash_eq", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashGe(a0: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
export function cashGe(...args: unknown[]) {
    return sqlFunction("cash_ge", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashGt(a0: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
export function cashGt(...args: unknown[]) {
    return sqlFunction("cash_gt", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashLe(a0: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
export function cashLe(...args: unknown[]) {
    return sqlFunction("cash_le", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashLt(a0: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
export function cashLt(...args: unknown[]) {
    return sqlFunction("cash_lt", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashMi(a0: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
export function cashMi(...args: unknown[]) {
    return sqlFunction("cash_mi", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashMulFlt4(a0: Types.Money<0 | 1>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Money<0 | 1>
export function cashMulFlt4(...args: unknown[]) {
    return sqlFunction("cash_mul_flt4", [{args: [Types.Money<0 | 1>, Types.Float4<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashMulFlt8(a0: Types.Money<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Money<0 | 1>
export function cashMulFlt8(...args: unknown[]) {
    return sqlFunction("cash_mul_flt8", [{args: [Types.Money<0 | 1>, Types.Float8<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashMulInt2(a0: Types.Money<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Money<0 | 1>
export function cashMulInt2(...args: unknown[]) {
    return sqlFunction("cash_mul_int2", [{args: [Types.Money<0 | 1>, Types.Int2<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashMulInt4(a0: Types.Money<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Money<0 | 1>
export function cashMulInt4(...args: unknown[]) {
    return sqlFunction("cash_mul_int4", [{args: [Types.Money<0 | 1>, Types.Int4<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashMulInt8(a0: Types.Money<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Money<0 | 1>
export function cashMulInt8(...args: unknown[]) {
    return sqlFunction("cash_mul_int8", [{args: [Types.Money<0 | 1>, Types.Int8<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashNe(a0: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Bool<0 | 1>
export function cashNe(...args: unknown[]) {
    return sqlFunction("cash_ne", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashPl(a0: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
export function cashPl(...args: unknown[]) {
    return sqlFunction("cash_pl", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashWords(a0: Types.Money<0 | 1>): Types.Text<0 | 1>
export function cashWords(...args: unknown[]) {
    return sqlFunction("cash_words", [{args: [Types.Money<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashlarger(a0: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
export function cashlarger(...args: unknown[]) {
    return sqlFunction("cashlarger", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cashsmaller(a0: Types.Money<0 | 1>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
export function cashsmaller(...args: unknown[]) {
    return sqlFunction("cashsmaller", [{args: [Types.Money<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cbrt(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function cbrt(...args: unknown[]) {
    return sqlFunction("cbrt", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function ceil(a0: Types.Float8<0 | 1>): Types.Float8<0 | 1>
export function ceil(a0: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
export function ceil(...args: unknown[]) {
    return sqlFunction("ceil", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function ceiling(a0: Types.Float8<0 | 1>): Types.Float8<0 | 1>
export function ceiling(a0: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
export function ceiling(...args: unknown[]) {
    return sqlFunction("ceiling", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function center(a0: Types.Box<0 | 1>): Types.Point<0 | 1>
export function center(a0: Types.Circle<0 | 1>): Types.Point<0 | 1>
export function center(...args: unknown[]) {
    return sqlFunction("center", [{args: [Types.Box<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Circle<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function char(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Char<0 | 1>
export function char(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Char<0 | 1>
export function char(...args: unknown[]) {
    return sqlFunction("char", [{args: [Types.Int4<0 | 1>], ret: Types.Char<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.Char<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function charLength(a0: Types.Bpchar<0 | 1>): Types.Int4<0 | 1>
export function charLength(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
export function charLength(...args: unknown[]) {
    return sqlFunction("char_length", [{args: [Types.Bpchar<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function characterLength(a0: Types.Bpchar<0 | 1>): Types.Int4<0 | 1>
export function characterLength(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
export function characterLength(...args: unknown[]) {
    return sqlFunction("character_length", [{args: [Types.Bpchar<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function chareq(a0: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
export function chareq(...args: unknown[]) {
    return sqlFunction("chareq", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function charge(a0: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
export function charge(...args: unknown[]) {
    return sqlFunction("charge", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function chargt(a0: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
export function chargt(...args: unknown[]) {
    return sqlFunction("chargt", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function charle(a0: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
export function charle(...args: unknown[]) {
    return sqlFunction("charle", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function charlt(a0: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
export function charlt(...args: unknown[]) {
    return sqlFunction("charlt", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function charne(a0: Types.Char<0 | 1>, a1: Types.Char<0 | 1>): Types.Bool<0 | 1>
export function charne(...args: unknown[]) {
    return sqlFunction("charne", [{args: [Types.Char<0 | 1>, Types.Char<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function chr(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function chr(...args: unknown[]) {
    return sqlFunction("chr", [{args: [Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cideq(a0: Types.Cid<0 | 1>, a1: Types.Cid<0 | 1>): Types.Bool<0 | 1>
export function cideq(...args: unknown[]) {
    return sqlFunction("cideq", [{args: [Types.Cid<0 | 1>, Types.Cid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cidr(a0: Types.Inet<0 | 1>): Types.Cidr<0 | 1>
export function cidr(...args: unknown[]) {
    return sqlFunction("cidr", [{args: [Types.Inet<0 | 1>], ret: Types.Cidr<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circle(a0: Types.Box<0 | 1>): Types.Circle<0 | 1>
export function circle(a0: Types.Point<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Circle<0 | 1>
export function circle(a0: Types.Polygon<0 | 1>): Types.Circle<0 | 1>
export function circle(...args: unknown[]) {
    return sqlFunction("circle", [{args: [Types.Box<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Point<0 | 1>, Types.Float8<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Polygon<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleAbove(a0: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
export function circleAbove(...args: unknown[]) {
    return sqlFunction("circle_above", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleAddPt(a0: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Circle<0 | 1>
export function circleAddPt(...args: unknown[]) {
    return sqlFunction("circle_add_pt", [{args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleBelow(a0: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
export function circleBelow(...args: unknown[]) {
    return sqlFunction("circle_below", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleCenter(a0: Types.Circle<0 | 1>): Types.Point<0 | 1>
export function circleCenter(...args: unknown[]) {
    return sqlFunction("circle_center", [{args: [Types.Circle<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleContainPt(a0: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
export function circleContainPt(...args: unknown[]) {
    return sqlFunction("circle_contain_pt", [{args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleContained(a0: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
export function circleContained(...args: unknown[]) {
    return sqlFunction("circle_contained", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleDistance(a0: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Float8<0 | 1>
export function circleDistance(...args: unknown[]) {
    return sqlFunction("circle_distance", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleDivPt(a0: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Circle<0 | 1>
export function circleDivPt(...args: unknown[]) {
    return sqlFunction("circle_div_pt", [{args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleEq(a0: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
export function circleEq(...args: unknown[]) {
    return sqlFunction("circle_eq", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleGe(a0: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
export function circleGe(...args: unknown[]) {
    return sqlFunction("circle_ge", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleGt(a0: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
export function circleGt(...args: unknown[]) {
    return sqlFunction("circle_gt", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleLe(a0: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
export function circleLe(...args: unknown[]) {
    return sqlFunction("circle_le", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleLeft(a0: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
export function circleLeft(...args: unknown[]) {
    return sqlFunction("circle_left", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleLt(a0: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
export function circleLt(...args: unknown[]) {
    return sqlFunction("circle_lt", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleMulPt(a0: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Circle<0 | 1>
export function circleMulPt(...args: unknown[]) {
    return sqlFunction("circle_mul_pt", [{args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleNe(a0: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
export function circleNe(...args: unknown[]) {
    return sqlFunction("circle_ne", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleOverabove(a0: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
export function circleOverabove(...args: unknown[]) {
    return sqlFunction("circle_overabove", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleOverbelow(a0: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
export function circleOverbelow(...args: unknown[]) {
    return sqlFunction("circle_overbelow", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleOverlap(a0: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
export function circleOverlap(...args: unknown[]) {
    return sqlFunction("circle_overlap", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleOverleft(a0: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
export function circleOverleft(...args: unknown[]) {
    return sqlFunction("circle_overleft", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleOverright(a0: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
export function circleOverright(...args: unknown[]) {
    return sqlFunction("circle_overright", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleRight(a0: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
export function circleRight(...args: unknown[]) {
    return sqlFunction("circle_right", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleSame(a0: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
export function circleSame(...args: unknown[]) {
    return sqlFunction("circle_same", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function circleSubPt(a0: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Circle<0 | 1>
export function circleSubPt(...args: unknown[]) {
    return sqlFunction("circle_sub_pt", [{args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function clockTimestamp(): Types.Timestamptz<0 | 1>
export function clockTimestamp(...args: unknown[]) {
    return sqlFunction("clock_timestamp", [{args: [], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function closeLs(a0: Types.Line<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Point<0 | 1>
export function closeLs(...args: unknown[]) {
    return sqlFunction("close_ls", [{args: [Types.Line<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function closeLseg(a0: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Point<0 | 1>
export function closeLseg(...args: unknown[]) {
    return sqlFunction("close_lseg", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function closePb(a0: Types.Point<0 | 1>, a1: Types.Box<0 | 1>): Types.Point<0 | 1>
export function closePb(...args: unknown[]) {
    return sqlFunction("close_pb", [{args: [Types.Point<0 | 1>, Types.Box<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function closePl(a0: Types.Point<0 | 1>, a1: Types.Line<0 | 1>): Types.Point<0 | 1>
export function closePl(...args: unknown[]) {
    return sqlFunction("close_pl", [{args: [Types.Point<0 | 1>, Types.Line<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function closePs(a0: Types.Point<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Point<0 | 1>
export function closePs(...args: unknown[]) {
    return sqlFunction("close_ps", [{args: [Types.Point<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function closeSb(a0: Types.Lseg<0 | 1>, a1: Types.Box<0 | 1>): Types.Point<0 | 1>
export function closeSb(...args: unknown[]) {
    return sqlFunction("close_sb", [{args: [Types.Lseg<0 | 1>, Types.Box<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function colDescription(a0: Types.Oid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function colDescription(...args: unknown[]) {
    return sqlFunction("col_description", [{args: [Types.Oid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function concat(a0: Types.Any<unknown, 0 | 1>, ...variadic: Types.Any<unknown, 0 | 1>[]): Types.Text<0 | 1>
export function concat(...args: unknown[]) {
    return sqlFunction("concat", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function concatWs(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Any<unknown, 0 | 1>, ...variadic: Types.Any<unknown, 0 | 1>[]): Types.Text<0 | 1>
export function concatWs(...args: unknown[]) {
    return sqlFunction("concat_ws", [{args: [Types.Text<0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function convert(a0: Types.Bytea<0 | 1>, a1: Types.Name<0 | 1>, a2: Types.Name<0 | 1>): Types.Bytea<0 | 1>
export function convert(...args: unknown[]) {
    return sqlFunction("convert", [{args: [Types.Bytea<0 | 1>, Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function convertFrom(a0: Types.Bytea<0 | 1>, a1: Types.Name<0 | 1>): Types.Text<0 | 1>
export function convertFrom(...args: unknown[]) {
    return sqlFunction("convert_from", [{args: [Types.Bytea<0 | 1>, Types.Name<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function convertTo(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Name<0 | 1>): Types.Bytea<0 | 1>
export function convertTo(...args: unknown[]) {
    return sqlFunction("convert_to", [{args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function corr(a0: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function corr(...args: unknown[]) {
    return sqlFunction("corr", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cos(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function cos(...args: unknown[]) {
    return sqlFunction("cos", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cosd(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function cosd(...args: unknown[]) {
    return sqlFunction("cosd", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cosh(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function cosh(...args: unknown[]) {
    return sqlFunction("cosh", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cot(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function cot(...args: unknown[]) {
    return sqlFunction("cot", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cotd(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function cotd(...args: unknown[]) {
    return sqlFunction("cotd", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function count(): Types.Int8<0 | 1>
export function count(a0: Types.Any<unknown, number>): Types.Int8<0 | 1>
export function count(...args: unknown[]) {
    return sqlFunction("count", [{args: [], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Any<unknown, 0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function covarPop(a0: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function covarPop(...args: unknown[]) {
    return sqlFunction("covar_pop", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function covarSamp(a0: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function covarSamp(...args: unknown[]) {
    return sqlFunction("covar_samp", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cumeDist(): Types.Float8<0 | 1>
export function cumeDist(a0: Types.Any<unknown, number>, ...variadic: Types.Any<unknown, number>[]): Types.Float8<0 | 1>
export function cumeDist(...args: unknown[]) {
    return sqlFunction("cume_dist", [{args: [], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Any<unknown, 0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function currentDatabase(): Types.Name<0 | 1>
export function currentDatabase(...args: unknown[]) {
    return sqlFunction("current_database", [{args: [], ret: Types.Name<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function currentQuery(): Types.Text<0 | 1>
export function currentQuery(...args: unknown[]) {
    return sqlFunction("current_query", [{args: [], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function currentSchema(): Types.Name<0 | 1>
export function currentSchema(...args: unknown[]) {
    return sqlFunction("current_schema", [{args: [], ret: Types.Name<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function currentSchemas(a0: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Array<0 | 1, Types.Name<0 | 1>>
export function currentSchemas(...args: unknown[]) {
    return sqlFunction("current_schemas", [{args: [Types.Bool<0 | 1>], ret: Types.Array.of(Types.Name<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function currentSetting(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function currentSetting(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
export function currentSetting(...args: unknown[]) {
    return sqlFunction("current_setting", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function currentUser(): Types.Name<0 | 1>
export function currentUser(...args: unknown[]) {
    return sqlFunction("current_user", [{args: [], ret: Types.Name<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function currtid2(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Tid<0 | 1>): Types.Tid<0 | 1>
export function currtid2(...args: unknown[]) {
    return sqlFunction("currtid2", [{args: [Types.Text<0 | 1>, Types.Tid<0 | 1>], ret: Types.Tid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function currval(a0: Types.Regclass<0 | 1>): Types.Int8<0 | 1>
export function currval(...args: unknown[]) {
    return sqlFunction("currval", [{args: [Types.Regclass<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cursorToXml(a0: Types.Refcursor<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
export function cursorToXml(...args: unknown[]) {
    return sqlFunction("cursor_to_xml", [{args: [Types.Refcursor<0 | 1>, Types.Int4<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function cursorToXmlschema(a0: Types.Refcursor<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
export function cursorToXmlschema(...args: unknown[]) {
    return sqlFunction("cursor_to_xmlschema", [{args: [Types.Refcursor<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function databaseToXml(a0: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
export function databaseToXml(...args: unknown[]) {
    return sqlFunction("database_to_xml", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function databaseToXmlAndXmlschema(a0: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
export function databaseToXmlAndXmlschema(...args: unknown[]) {
    return sqlFunction("database_to_xml_and_xmlschema", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function databaseToXmlschema(a0: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
export function databaseToXmlschema(...args: unknown[]) {
    return sqlFunction("database_to_xmlschema", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function date(a0: Types.Timestamp<0 | 1>): Types.Date<0 | 1>
export function date(a0: Types.Timestamptz<0 | 1>): Types.Date<0 | 1>
export function date(...args: unknown[]) {
    return sqlFunction("date", [{args: [Types.Timestamp<0 | 1>], ret: Types.Date<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>], ret: Types.Date<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateAdd(a0: Types.Timestamptz<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamptz<0 | 1>
export function dateAdd(a0: Types.Timestamptz<0 | 1>, a1: Types.Interval<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Timestamptz<0 | 1>
export function dateAdd(...args: unknown[]) {
    return sqlFunction("date_add", [{args: [Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>, Types.Text<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateCmp(a0: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Int4<0 | 1>
export function dateCmp(...args: unknown[]) {
    return sqlFunction("date_cmp", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateCmpTimestamp(a0: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Int4<0 | 1>
export function dateCmpTimestamp(...args: unknown[]) {
    return sqlFunction("date_cmp_timestamp", [{args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateCmpTimestamptz(a0: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Int4<0 | 1>
export function dateCmpTimestamptz(...args: unknown[]) {
    return sqlFunction("date_cmp_timestamptz", [{args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateEq(a0: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
export function dateEq(...args: unknown[]) {
    return sqlFunction("date_eq", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateEqTimestamp(a0: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
export function dateEqTimestamp(...args: unknown[]) {
    return sqlFunction("date_eq_timestamp", [{args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateEqTimestamptz(a0: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
export function dateEqTimestamptz(...args: unknown[]) {
    return sqlFunction("date_eq_timestamptz", [{args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateGe(a0: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
export function dateGe(...args: unknown[]) {
    return sqlFunction("date_ge", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateGeTimestamp(a0: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
export function dateGeTimestamp(...args: unknown[]) {
    return sqlFunction("date_ge_timestamp", [{args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateGeTimestamptz(a0: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
export function dateGeTimestamptz(...args: unknown[]) {
    return sqlFunction("date_ge_timestamptz", [{args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateGt(a0: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
export function dateGt(...args: unknown[]) {
    return sqlFunction("date_gt", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateGtTimestamp(a0: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
export function dateGtTimestamp(...args: unknown[]) {
    return sqlFunction("date_gt_timestamp", [{args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateGtTimestamptz(a0: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
export function dateGtTimestamptz(...args: unknown[]) {
    return sqlFunction("date_gt_timestamptz", [{args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateLarger(a0: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Date<0 | 1>
export function dateLarger(...args: unknown[]) {
    return sqlFunction("date_larger", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Date<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateLe(a0: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
export function dateLe(...args: unknown[]) {
    return sqlFunction("date_le", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateLeTimestamp(a0: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
export function dateLeTimestamp(...args: unknown[]) {
    return sqlFunction("date_le_timestamp", [{args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateLeTimestamptz(a0: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
export function dateLeTimestamptz(...args: unknown[]) {
    return sqlFunction("date_le_timestamptz", [{args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateLt(a0: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
export function dateLt(...args: unknown[]) {
    return sqlFunction("date_lt", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateLtTimestamp(a0: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
export function dateLtTimestamp(...args: unknown[]) {
    return sqlFunction("date_lt_timestamp", [{args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateLtTimestamptz(a0: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
export function dateLtTimestamptz(...args: unknown[]) {
    return sqlFunction("date_lt_timestamptz", [{args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateMi(a0: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Int4<0 | 1>
export function dateMi(...args: unknown[]) {
    return sqlFunction("date_mi", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateMiInterval(a0: Types.Date<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamp<0 | 1>
export function dateMiInterval(...args: unknown[]) {
    return sqlFunction("date_mi_interval", [{args: [Types.Date<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateMii(a0: Types.Date<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Date<0 | 1>
export function dateMii(...args: unknown[]) {
    return sqlFunction("date_mii", [{args: [Types.Date<0 | 1>, Types.Int4<0 | 1>], ret: Types.Date<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateNe(a0: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
export function dateNe(...args: unknown[]) {
    return sqlFunction("date_ne", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateNeTimestamp(a0: Types.Date<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
export function dateNeTimestamp(...args: unknown[]) {
    return sqlFunction("date_ne_timestamp", [{args: [Types.Date<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateNeTimestamptz(a0: Types.Date<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
export function dateNeTimestamptz(...args: unknown[]) {
    return sqlFunction("date_ne_timestamptz", [{args: [Types.Date<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function datePart(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Date<0 | 1>): Types.Float8<0 | 1>
export function datePart(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Interval<0 | 1>): Types.Float8<0 | 1>
export function datePart(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Time<0 | 1>): Types.Float8<0 | 1>
export function datePart(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Timestamp<0 | 1>): Types.Float8<0 | 1>
export function datePart(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Timestamptz<0 | 1>): Types.Float8<0 | 1>
export function datePart(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Timetz<0 | 1>): Types.Float8<0 | 1>
export function datePart(...args: unknown[]) {
    return sqlFunction("date_part", [{args: [Types.Text<0 | 1>, Types.Date<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Interval<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Time<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function datePlInterval(a0: Types.Date<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamp<0 | 1>
export function datePlInterval(...args: unknown[]) {
    return sqlFunction("date_pl_interval", [{args: [Types.Date<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function datePli(a0: Types.Date<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Date<0 | 1>
export function datePli(...args: unknown[]) {
    return sqlFunction("date_pli", [{args: [Types.Date<0 | 1>, Types.Int4<0 | 1>], ret: Types.Date<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateSmaller(a0: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Date<0 | 1>
export function dateSmaller(...args: unknown[]) {
    return sqlFunction("date_smaller", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Date<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateSubtract(a0: Types.Timestamptz<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamptz<0 | 1>
export function dateSubtract(a0: Types.Timestamptz<0 | 1>, a1: Types.Interval<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Timestamptz<0 | 1>
export function dateSubtract(...args: unknown[]) {
    return sqlFunction("date_subtract", [{args: [Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>, Types.Text<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dateTrunc(a0: Types.Text<0 | 1>, a1: Types.Interval<0 | 1>): Types.Interval<0 | 1>
export function dateTrunc(a0: Types.Text<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Timestamp<0 | 1>
export function dateTrunc(a0: Types.Text<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Timestamptz<0 | 1>
export function dateTrunc(a0: Types.Text<0 | 1>, a1: Types.Timestamptz<0 | 1>, a2: Types.Text<0 | 1>): Types.Timestamptz<0 | 1>
export function dateTrunc(...args: unknown[]) {
    return sqlFunction("date_trunc", [{args: [Types.Text<0 | 1>, Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timestamptz<0 | 1>, Types.Text<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function datemultirange(): Types.Datemultirange<0 | 1>
export function datemultirange(a0: Types.Array<0 | 1, Types.Daterange<0 | 1>>, ...variadic: Types.Array<0 | 1, Types.Daterange<0 | 1>>[]): Types.Datemultirange<0 | 1>
export function datemultirange(a0: Types.Daterange<0 | 1>): Types.Datemultirange<0 | 1>
export function datemultirange(...args: unknown[]) {
    return sqlFunction("datemultirange", [{args: [], ret: Types.Datemultirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Array.of(Types.Daterange<0 | 1>)], ret: Types.Datemultirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}, {args: [Types.Daterange<0 | 1>], ret: Types.Datemultirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function daterange(a0: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Daterange<0 | 1>
export function daterange(a0: Types.Date<0 | 1>, a1: Types.Date<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Daterange<0 | 1>
export function daterange(...args: unknown[]) {
    return sqlFunction("daterange", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Daterange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Date<0 | 1>, Types.Text<0 | 1>], ret: Types.Daterange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function daterangeCanonical(a0: Types.Daterange<0 | 1>): Types.Daterange<0 | 1>
export function daterangeCanonical(...args: unknown[]) {
    return sqlFunction("daterange_canonical", [{args: [Types.Daterange<0 | 1>], ret: Types.Daterange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function daterangeSubdiff(a0: Types.Date<0 | 1>, a1: Types.Date<0 | 1>): Types.Float8<0 | 1>
export function daterangeSubdiff(...args: unknown[]) {
    return sqlFunction("daterange_subdiff", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function datetimePl(a0: Types.Date<0 | 1>, a1: Types.Time<0 | 1>): Types.Timestamp<0 | 1>
export function datetimePl(...args: unknown[]) {
    return sqlFunction("datetime_pl", [{args: [Types.Date<0 | 1>, Types.Time<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function datetimetzPl(a0: Types.Date<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Timestamptz<0 | 1>
export function datetimetzPl(...args: unknown[]) {
    return sqlFunction("datetimetz_pl", [{args: [Types.Date<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dcbrt(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function dcbrt(...args: unknown[]) {
    return sqlFunction("dcbrt", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function decode(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bytea<0 | 1>
export function decode(...args: unknown[]) {
    return sqlFunction("decode", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function degrees(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function degrees(...args: unknown[]) {
    return sqlFunction("degrees", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function denseRank(): Types.Int8<0 | 1>
export function denseRank(a0: Types.Any<unknown, number>, ...variadic: Types.Any<unknown, number>[]): Types.Int8<0 | 1>
export function denseRank(...args: unknown[]) {
    return sqlFunction("dense_rank", [{args: [], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Any<unknown, 0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function dexp(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function dexp(...args: unknown[]) {
    return sqlFunction("dexp", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function diagonal(a0: Types.Box<0 | 1>): Types.Lseg<0 | 1>
export function diagonal(...args: unknown[]) {
    return sqlFunction("diagonal", [{args: [Types.Box<0 | 1>], ret: Types.Lseg<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function diameter(a0: Types.Circle<0 | 1>): Types.Float8<0 | 1>
export function diameter(...args: unknown[]) {
    return sqlFunction("diameter", [{args: [Types.Circle<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function distBp(a0: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
export function distBp(...args: unknown[]) {
    return sqlFunction("dist_bp", [{args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function distBs(a0: Types.Box<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Float8<0 | 1>
export function distBs(...args: unknown[]) {
    return sqlFunction("dist_bs", [{args: [Types.Box<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function distCpoint(a0: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
export function distCpoint(...args: unknown[]) {
    return sqlFunction("dist_cpoint", [{args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function distCpoly(a0: Types.Circle<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Float8<0 | 1>
export function distCpoly(...args: unknown[]) {
    return sqlFunction("dist_cpoly", [{args: [Types.Circle<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function distLp(a0: Types.Line<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
export function distLp(...args: unknown[]) {
    return sqlFunction("dist_lp", [{args: [Types.Line<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function distLs(a0: Types.Line<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Float8<0 | 1>
export function distLs(...args: unknown[]) {
    return sqlFunction("dist_ls", [{args: [Types.Line<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function distPathp(a0: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
export function distPathp(...args: unknown[]) {
    return sqlFunction("dist_pathp", [{args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function distPb(a0: Types.Point<0 | 1>, a1: Types.Box<0 | 1>): Types.Float8<0 | 1>
export function distPb(...args: unknown[]) {
    return sqlFunction("dist_pb", [{args: [Types.Point<0 | 1>, Types.Box<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function distPc(a0: Types.Point<0 | 1>, a1: Types.Circle<0 | 1>): Types.Float8<0 | 1>
export function distPc(...args: unknown[]) {
    return sqlFunction("dist_pc", [{args: [Types.Point<0 | 1>, Types.Circle<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function distPl(a0: Types.Point<0 | 1>, a1: Types.Line<0 | 1>): Types.Float8<0 | 1>
export function distPl(...args: unknown[]) {
    return sqlFunction("dist_pl", [{args: [Types.Point<0 | 1>, Types.Line<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function distPolyc(a0: Types.Polygon<0 | 1>, a1: Types.Circle<0 | 1>): Types.Float8<0 | 1>
export function distPolyc(...args: unknown[]) {
    return sqlFunction("dist_polyc", [{args: [Types.Polygon<0 | 1>, Types.Circle<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function distPolyp(a0: Types.Polygon<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
export function distPolyp(...args: unknown[]) {
    return sqlFunction("dist_polyp", [{args: [Types.Polygon<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function distPpath(a0: Types.Point<0 | 1>, a1: Types.Path<0 | 1>): Types.Float8<0 | 1>
export function distPpath(...args: unknown[]) {
    return sqlFunction("dist_ppath", [{args: [Types.Point<0 | 1>, Types.Path<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function distPpoly(a0: Types.Point<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Float8<0 | 1>
export function distPpoly(...args: unknown[]) {
    return sqlFunction("dist_ppoly", [{args: [Types.Point<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function distPs(a0: Types.Point<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Float8<0 | 1>
export function distPs(...args: unknown[]) {
    return sqlFunction("dist_ps", [{args: [Types.Point<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function distSb(a0: Types.Lseg<0 | 1>, a1: Types.Box<0 | 1>): Types.Float8<0 | 1>
export function distSb(...args: unknown[]) {
    return sqlFunction("dist_sb", [{args: [Types.Lseg<0 | 1>, Types.Box<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function distSl(a0: Types.Lseg<0 | 1>, a1: Types.Line<0 | 1>): Types.Float8<0 | 1>
export function distSl(...args: unknown[]) {
    return sqlFunction("dist_sl", [{args: [Types.Lseg<0 | 1>, Types.Line<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function distSp(a0: Types.Lseg<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
export function distSp(...args: unknown[]) {
    return sqlFunction("dist_sp", [{args: [Types.Lseg<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function div(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
export function div(...args: unknown[]) {
    return sqlFunction("div", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dlog1(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function dlog1(...args: unknown[]) {
    return sqlFunction("dlog1", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dlog10(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function dlog10(...args: unknown[]) {
    return sqlFunction("dlog10", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dpow(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function dpow(...args: unknown[]) {
    return sqlFunction("dpow", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dround(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function dround(...args: unknown[]) {
    return sqlFunction("dround", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dsqrt(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function dsqrt(...args: unknown[]) {
    return sqlFunction("dsqrt", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function dtrunc(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function dtrunc(...args: unknown[]) {
    return sqlFunction("dtrunc", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function elemContainedByMultirange<T extends Types.Any>(a0: T, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function elemContainedByMultirange(...args: unknown[]) {
    return sqlFunction("elem_contained_by_multirange", [({T}) => ({args: [T, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function elemContainedByRange<T extends Types.Any>(a0: T, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function elemContainedByRange(...args: unknown[]) {
    return sqlFunction("elem_contained_by_range", [({T}) => ({args: [T, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function encode(a0: Types.Bytea<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function encode(...args: unknown[]) {
    return sqlFunction("encode", [{args: [Types.Bytea<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function enumCmp<T extends Types.Any>(a0: T, a1: T): Types.Int4<0 | 1>
export function enumCmp(...args: unknown[]) {
    return sqlFunction("enum_cmp", [({T}) => ({args: [T, T], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function enumEq<T extends Types.Any>(a0: T, a1: T): Types.Bool<0 | 1>
export function enumEq(...args: unknown[]) {
    return sqlFunction("enum_eq", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function enumFirst<T extends Types.Any>(a0: T): T
export function enumFirst(...args: unknown[]) {
    return sqlFunction("enum_first", [({T}) => ({args: [T], ret: T, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function enumGe<T extends Types.Any>(a0: T, a1: T): Types.Bool<0 | 1>
export function enumGe(...args: unknown[]) {
    return sqlFunction("enum_ge", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function enumGt<T extends Types.Any>(a0: T, a1: T): Types.Bool<0 | 1>
export function enumGt(...args: unknown[]) {
    return sqlFunction("enum_gt", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function enumLarger<T extends Types.Any>(a0: T, a1: T): T
export function enumLarger(...args: unknown[]) {
    return sqlFunction("enum_larger", [({T}) => ({args: [T, T], ret: T, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function enumLast<T extends Types.Any>(a0: T): T
export function enumLast(...args: unknown[]) {
    return sqlFunction("enum_last", [({T}) => ({args: [T], ret: T, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function enumLe<T extends Types.Any>(a0: T, a1: T): Types.Bool<0 | 1>
export function enumLe(...args: unknown[]) {
    return sqlFunction("enum_le", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function enumLt<T extends Types.Any>(a0: T, a1: T): Types.Bool<0 | 1>
export function enumLt(...args: unknown[]) {
    return sqlFunction("enum_lt", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function enumNe<T extends Types.Any>(a0: T, a1: T): Types.Bool<0 | 1>
export function enumNe(...args: unknown[]) {
    return sqlFunction("enum_ne", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function enumRange<T extends Types.Any>(a0: T): Types.Array<0 | 1, T>
export function enumRange<T extends Types.Any>(a0: T, a1: T): Types.Array<0 | 1, T>
export function enumRange(...args: unknown[]) {
    return sqlFunction("enum_range", [({T}) => ({args: [T], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [T, T], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function enumSmaller<T extends Types.Any>(a0: T, a1: T): T
export function enumSmaller(...args: unknown[]) {
    return sqlFunction("enum_smaller", [({T}) => ({args: [T, T], ret: T, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function erf(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function erf(...args: unknown[]) {
    return sqlFunction("erf", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function erfc(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function erfc(...args: unknown[]) {
    return sqlFunction("erfc", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function every(a0: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function every(...args: unknown[]) {
    return sqlFunction("every", [{args: [Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function exp(a0: Types.Float8<0 | 1>): Types.Float8<0 | 1>
export function exp(a0: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
export function exp(...args: unknown[]) {
    return sqlFunction("exp", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function extract(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Date<0 | 1>): Types.Numeric<0 | 1>
export function extract(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Interval<0 | 1>): Types.Numeric<0 | 1>
export function extract(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Time<0 | 1>): Types.Numeric<0 | 1>
export function extract(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Timestamp<0 | 1>): Types.Numeric<0 | 1>
export function extract(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Timestamptz<0 | 1>): Types.Numeric<0 | 1>
export function extract(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Timetz<0 | 1>): Types.Numeric<0 | 1>
export function extract(...args: unknown[]) {
    return sqlFunction("extract", [{args: [Types.Text<0 | 1>, Types.Date<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Interval<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Time<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function factorial(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Numeric<0 | 1>
export function factorial(...args: unknown[]) {
    return sqlFunction("factorial", [{args: [Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function family(a0: Types.Inet<0 | 1>): Types.Int4<0 | 1>
export function family(...args: unknown[]) {
    return sqlFunction("family", [{args: [Types.Inet<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function firstValue<T extends Types.Any>(a0: T): T
export function firstValue(...args: unknown[]) {
    return sqlFunction("first_value", [({T}) => ({args: [T], ret: T, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function float4(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float4<0 | 1>
export function float4(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Float4<0 | 1>
export function float4(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Float4<0 | 1>
export function float4(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Float4<0 | 1>
export function float4(a0: Types.Jsonb<0 | 1>): Types.Float4<0 | 1>
export function float4(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Float4<0 | 1>
export function float4(...args: unknown[]) {
    return sqlFunction("float4", [{args: [Types.Float8<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Jsonb<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float48Div(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float48Div(...args: unknown[]) {
    return sqlFunction("float48div", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float48Eq(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
export function float48Eq(...args: unknown[]) {
    return sqlFunction("float48eq", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float48Ge(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
export function float48Ge(...args: unknown[]) {
    return sqlFunction("float48ge", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float48Gt(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
export function float48Gt(...args: unknown[]) {
    return sqlFunction("float48gt", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float48Le(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
export function float48Le(...args: unknown[]) {
    return sqlFunction("float48le", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float48Lt(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
export function float48Lt(...args: unknown[]) {
    return sqlFunction("float48lt", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float48Mi(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float48Mi(...args: unknown[]) {
    return sqlFunction("float48mi", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float48Mul(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float48Mul(...args: unknown[]) {
    return sqlFunction("float48mul", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float48Ne(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
export function float48Ne(...args: unknown[]) {
    return sqlFunction("float48ne", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float48Pl(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float48Pl(...args: unknown[]) {
    return sqlFunction("float48pl", [{args: [Types.Float4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float4Accum(a0: Types.Array<0 | 1, Types.Float8<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Array<0 | 1, Types.Float8<0 | 1>>
export function float4Accum(...args: unknown[]) {
    return sqlFunction("float4_accum", [{args: [Types.Array.of(Types.Float8<0 | 1>), Types.Float4<0 | 1>], ret: Types.Array.of(Types.Float8<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float4Abs(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<0 | 1>
export function float4Abs(...args: unknown[]) {
    return sqlFunction("float4abs", [{args: [Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float4Div(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<0 | 1>
export function float4Div(...args: unknown[]) {
    return sqlFunction("float4div", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float4Eq(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
export function float4Eq(...args: unknown[]) {
    return sqlFunction("float4eq", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float4Ge(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
export function float4Ge(...args: unknown[]) {
    return sqlFunction("float4ge", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float4Gt(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
export function float4Gt(...args: unknown[]) {
    return sqlFunction("float4gt", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float4Larger(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<0 | 1>
export function float4Larger(...args: unknown[]) {
    return sqlFunction("float4larger", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float4Le(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
export function float4Le(...args: unknown[]) {
    return sqlFunction("float4le", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float4Lt(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
export function float4Lt(...args: unknown[]) {
    return sqlFunction("float4lt", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float4Mi(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<0 | 1>
export function float4Mi(...args: unknown[]) {
    return sqlFunction("float4mi", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float4Mul(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<0 | 1>
export function float4Mul(...args: unknown[]) {
    return sqlFunction("float4mul", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float4Ne(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
export function float4Ne(...args: unknown[]) {
    return sqlFunction("float4ne", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float4Pl(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<0 | 1>
export function float4Pl(...args: unknown[]) {
    return sqlFunction("float4pl", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float4Smaller(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<0 | 1>
export function float4Smaller(...args: unknown[]) {
    return sqlFunction("float4smaller", [{args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float4Um(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<0 | 1>
export function float4Um(...args: unknown[]) {
    return sqlFunction("float4um", [{args: [Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float4Up(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float4<0 | 1>
export function float4Up(...args: unknown[]) {
    return sqlFunction("float4up", [{args: [Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
export function float8(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Float8<0 | 1>
export function float8(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Float8<0 | 1>
export function float8(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Float8<0 | 1>
export function float8(a0: Types.Jsonb<0 | 1>): Types.Float8<0 | 1>
export function float8(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Float8<0 | 1>
export function float8(...args: unknown[]) {
    return sqlFunction("float8", [{args: [Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Jsonb<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float84Div(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
export function float84Div(...args: unknown[]) {
    return sqlFunction("float84div", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float84Eq(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
export function float84Eq(...args: unknown[]) {
    return sqlFunction("float84eq", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float84Ge(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
export function float84Ge(...args: unknown[]) {
    return sqlFunction("float84ge", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float84Gt(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
export function float84Gt(...args: unknown[]) {
    return sqlFunction("float84gt", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float84Le(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
export function float84Le(...args: unknown[]) {
    return sqlFunction("float84le", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float84Lt(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
export function float84Lt(...args: unknown[]) {
    return sqlFunction("float84lt", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float84Mi(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
export function float84Mi(...args: unknown[]) {
    return sqlFunction("float84mi", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float84Mul(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
export function float84Mul(...args: unknown[]) {
    return sqlFunction("float84mul", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float84Ne(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Bool<0 | 1>
export function float84Ne(...args: unknown[]) {
    return sqlFunction("float84ne", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float84Pl(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Float8<0 | 1>
export function float84Pl(...args: unknown[]) {
    return sqlFunction("float84pl", [{args: [Types.Float8<0 | 1>, Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8Accum(a0: Types.Array<0 | 1, Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Array<0 | 1, Types.Float8<0 | 1>>
export function float8Accum(...args: unknown[]) {
    return sqlFunction("float8_accum", [{args: [Types.Array.of(Types.Float8<0 | 1>), Types.Float8<0 | 1>], ret: Types.Array.of(Types.Float8<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8Avg(a0: Types.Array<0 | 1, Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8Avg(...args: unknown[]) {
    return sqlFunction("float8_avg", [{args: [Types.Array.of(Types.Float8<0 | 1>)], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8Combine(a0: Types.Array<0 | 1, Types.Float8<0 | 1>>, a1: Types.Array<0 | 1, Types.Float8<0 | 1>>): Types.Array<0 | 1, Types.Float8<0 | 1>>
export function float8Combine(...args: unknown[]) {
    return sqlFunction("float8_combine", [{args: [Types.Array.of(Types.Float8<0 | 1>), Types.Array.of(Types.Float8<0 | 1>)], ret: Types.Array.of(Types.Float8<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8Corr(a0: Types.Array<0 | 1, Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8Corr(...args: unknown[]) {
    return sqlFunction("float8_corr", [{args: [Types.Array.of(Types.Float8<0 | 1>)], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8CovarPop(a0: Types.Array<0 | 1, Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8CovarPop(...args: unknown[]) {
    return sqlFunction("float8_covar_pop", [{args: [Types.Array.of(Types.Float8<0 | 1>)], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8CovarSamp(a0: Types.Array<0 | 1, Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8CovarSamp(...args: unknown[]) {
    return sqlFunction("float8_covar_samp", [{args: [Types.Array.of(Types.Float8<0 | 1>)], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8RegrAccum(a0: Types.Array<0 | 1, Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a2: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Array<0 | 1, Types.Float8<0 | 1>>
export function float8RegrAccum(...args: unknown[]) {
    return sqlFunction("float8_regr_accum", [{args: [Types.Array.of(Types.Float8<0 | 1>), Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Array.of(Types.Float8<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8RegrAvgx(a0: Types.Array<0 | 1, Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8RegrAvgx(...args: unknown[]) {
    return sqlFunction("float8_regr_avgx", [{args: [Types.Array.of(Types.Float8<0 | 1>)], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8RegrAvgy(a0: Types.Array<0 | 1, Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8RegrAvgy(...args: unknown[]) {
    return sqlFunction("float8_regr_avgy", [{args: [Types.Array.of(Types.Float8<0 | 1>)], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8RegrCombine(a0: Types.Array<0 | 1, Types.Float8<0 | 1>>, a1: Types.Array<0 | 1, Types.Float8<0 | 1>>): Types.Array<0 | 1, Types.Float8<0 | 1>>
export function float8RegrCombine(...args: unknown[]) {
    return sqlFunction("float8_regr_combine", [{args: [Types.Array.of(Types.Float8<0 | 1>), Types.Array.of(Types.Float8<0 | 1>)], ret: Types.Array.of(Types.Float8<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8RegrIntercept(a0: Types.Array<0 | 1, Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8RegrIntercept(...args: unknown[]) {
    return sqlFunction("float8_regr_intercept", [{args: [Types.Array.of(Types.Float8<0 | 1>)], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8RegrR2(a0: Types.Array<0 | 1, Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8RegrR2(...args: unknown[]) {
    return sqlFunction("float8_regr_r2", [{args: [Types.Array.of(Types.Float8<0 | 1>)], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8RegrSlope(a0: Types.Array<0 | 1, Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8RegrSlope(...args: unknown[]) {
    return sqlFunction("float8_regr_slope", [{args: [Types.Array.of(Types.Float8<0 | 1>)], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8RegrSxx(a0: Types.Array<0 | 1, Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8RegrSxx(...args: unknown[]) {
    return sqlFunction("float8_regr_sxx", [{args: [Types.Array.of(Types.Float8<0 | 1>)], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8RegrSxy(a0: Types.Array<0 | 1, Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8RegrSxy(...args: unknown[]) {
    return sqlFunction("float8_regr_sxy", [{args: [Types.Array.of(Types.Float8<0 | 1>)], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8RegrSyy(a0: Types.Array<0 | 1, Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8RegrSyy(...args: unknown[]) {
    return sqlFunction("float8_regr_syy", [{args: [Types.Array.of(Types.Float8<0 | 1>)], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8StddevPop(a0: Types.Array<0 | 1, Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8StddevPop(...args: unknown[]) {
    return sqlFunction("float8_stddev_pop", [{args: [Types.Array.of(Types.Float8<0 | 1>)], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8StddevSamp(a0: Types.Array<0 | 1, Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8StddevSamp(...args: unknown[]) {
    return sqlFunction("float8_stddev_samp", [{args: [Types.Array.of(Types.Float8<0 | 1>)], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8VarPop(a0: Types.Array<0 | 1, Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8VarPop(...args: unknown[]) {
    return sqlFunction("float8_var_pop", [{args: [Types.Array.of(Types.Float8<0 | 1>)], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8VarSamp(a0: Types.Array<0 | 1, Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8VarSamp(...args: unknown[]) {
    return sqlFunction("float8_var_samp", [{args: [Types.Array.of(Types.Float8<0 | 1>)], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8Abs(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8Abs(...args: unknown[]) {
    return sqlFunction("float8abs", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8Div(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8Div(...args: unknown[]) {
    return sqlFunction("float8div", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8Eq(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
export function float8Eq(...args: unknown[]) {
    return sqlFunction("float8eq", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8Ge(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
export function float8Ge(...args: unknown[]) {
    return sqlFunction("float8ge", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8Gt(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
export function float8Gt(...args: unknown[]) {
    return sqlFunction("float8gt", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8Larger(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8Larger(...args: unknown[]) {
    return sqlFunction("float8larger", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8Le(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
export function float8Le(...args: unknown[]) {
    return sqlFunction("float8le", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8Lt(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
export function float8Lt(...args: unknown[]) {
    return sqlFunction("float8lt", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8Mi(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8Mi(...args: unknown[]) {
    return sqlFunction("float8mi", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8Mul(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8Mul(...args: unknown[]) {
    return sqlFunction("float8mul", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8Ne(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Bool<0 | 1>
export function float8Ne(...args: unknown[]) {
    return sqlFunction("float8ne", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8Pl(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8Pl(...args: unknown[]) {
    return sqlFunction("float8pl", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8Smaller(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8Smaller(...args: unknown[]) {
    return sqlFunction("float8smaller", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8Um(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8Um(...args: unknown[]) {
    return sqlFunction("float8um", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function float8Up(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function float8Up(...args: unknown[]) {
    return sqlFunction("float8up", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function floor(a0: Types.Float8<0 | 1>): Types.Float8<0 | 1>
export function floor(a0: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
export function floor(...args: unknown[]) {
    return sqlFunction("floor", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function flt4MulCash(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
export function flt4MulCash(...args: unknown[]) {
    return sqlFunction("flt4_mul_cash", [{args: [Types.Float4<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function flt8MulCash(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
export function flt8MulCash(...args: unknown[]) {
    return sqlFunction("flt8_mul_cash", [{args: [Types.Float8<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function fmgrCValidator(a0: Types.Oid<0 | 1>): Types.Void<0 | 1>
export function fmgrCValidator(...args: unknown[]) {
    return sqlFunction("fmgr_c_validator", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function fmgrInternalValidator(a0: Types.Oid<0 | 1>): Types.Void<0 | 1>
export function fmgrInternalValidator(...args: unknown[]) {
    return sqlFunction("fmgr_internal_validator", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function fmgrSqlValidator(a0: Types.Oid<0 | 1>): Types.Void<0 | 1>
export function fmgrSqlValidator(...args: unknown[]) {
    return sqlFunction("fmgr_sql_validator", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function format(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function format(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Any<unknown, 0 | 1>, ...variadic: Types.Any<unknown, 0 | 1>[]): Types.Text<0 | 1>
export function format(...args: unknown[]) {
    return sqlFunction("format", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: true}], args);
}

export function formatType(a0: Types.Oid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function formatType(...args: unknown[]) {
    return sqlFunction("format_type", [{args: [Types.Oid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function gcd(a0: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int4<0 | 1>
export function gcd(a0: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
export function gcd(a0: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
export function gcd(...args: unknown[]) {
    return sqlFunction("gcd", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function genRandomUuid(): Types.Uuid<0 | 1>
export function genRandomUuid(...args: unknown[]) {
    return sqlFunction("gen_random_uuid", [{args: [], ret: Types.Uuid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function generateSeries(a0: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1>): Types.FromItem<{}>
export function generateSeries(a0: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1>, a2: Types.Int4<0 | 1>): Types.FromItem<{}>
export function generateSeries(a0: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1>): Types.FromItem<{}>
export function generateSeries(a0: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1>, a2: Types.Int8<0 | 1>): Types.FromItem<{}>
export function generateSeries(a0: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1>): Types.FromItem<{}>
export function generateSeries(a0: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1>, a2: Types.Numeric<0 | 1>): Types.FromItem<{}>
export function generateSeries(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>, a2: Types.Interval<0 | 1>): Types.FromItem<{}>
export function generateSeries(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>, a2: Types.Interval<0 | 1>): Types.FromItem<{}>
export function generateSeries(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>, a2: Types.Interval<0 | 1>, a3: Types.Text<0 | 1>): Types.FromItem<{}>
export function generateSeries(...args: unknown[]) {
    return sqlFunction("generate_series", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>, Types.Interval<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function generateSubscripts<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.FromItem<{}>
export function generateSubscripts<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.FromItem<{}>
export function generateSubscripts(...args: unknown[]) {
    return sqlFunction("generate_subscripts", [({T}) => ({args: [Types.Array.of(T), Types.Int4<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [Types.Array.of(T), Types.Int4<0 | 1>, Types.Bool<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function getBit(a0: Types.Bit<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function getBit(a0: Types.Bytea<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<0 | 1>
export function getBit(...args: unknown[]) {
    return sqlFunction("get_bit", [{args: [Types.Bit<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Bytea<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function getByte(a0: Types.Bytea<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function getByte(...args: unknown[]) {
    return sqlFunction("get_byte", [{args: [Types.Bytea<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function getCurrentTsConfig(): Types.Regconfig<0 | 1>
export function getCurrentTsConfig(...args: unknown[]) {
    return sqlFunction("get_current_ts_config", [{args: [], ret: Types.Regconfig<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function getdatabaseencoding(): Types.Name<0 | 1>
export function getdatabaseencoding(...args: unknown[]) {
    return sqlFunction("getdatabaseencoding", [{args: [], ret: Types.Name<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function getpgusername(): Types.Name<0 | 1>
export function getpgusername(...args: unknown[]) {
    return sqlFunction("getpgusername", [{args: [], ret: Types.Name<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function ginCleanPendingList(a0: Types.Regclass<0 | 1>): Types.Int8<0 | 1>
export function ginCleanPendingList(...args: unknown[]) {
    return sqlFunction("gin_clean_pending_list", [{args: [Types.Regclass<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function ginCmpTslexeme(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
export function ginCmpTslexeme(...args: unknown[]) {
    return sqlFunction("gin_cmp_tslexeme", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function ginCompareJsonb(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
export function ginCompareJsonb(...args: unknown[]) {
    return sqlFunction("gin_compare_jsonb", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hasAnyColumnPrivilege(a0: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasAnyColumnPrivilege(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasAnyColumnPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasAnyColumnPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasAnyColumnPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasAnyColumnPrivilege(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasAnyColumnPrivilege(...args: unknown[]) {
    return sqlFunction("has_any_column_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hasColumnPrivilege(a0: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasColumnPrivilege(a0: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasColumnPrivilege(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasColumnPrivilege(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasColumnPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasColumnPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasColumnPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasColumnPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasColumnPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasColumnPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasColumnPrivilege(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasColumnPrivilege(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasColumnPrivilege(...args: unknown[]) {
    return sqlFunction("has_column_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Int2<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Int2<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Int2<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Int2<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Int2<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Int2<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hasDatabasePrivilege(a0: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasDatabasePrivilege(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasDatabasePrivilege(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasDatabasePrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasDatabasePrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasDatabasePrivilege(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasDatabasePrivilege(...args: unknown[]) {
    return sqlFunction("has_database_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hasForeignDataWrapperPrivilege(a0: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasForeignDataWrapperPrivilege(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasForeignDataWrapperPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasForeignDataWrapperPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasForeignDataWrapperPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasForeignDataWrapperPrivilege(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasForeignDataWrapperPrivilege(...args: unknown[]) {
    return sqlFunction("has_foreign_data_wrapper_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hasFunctionPrivilege(a0: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasFunctionPrivilege(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasFunctionPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasFunctionPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasFunctionPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasFunctionPrivilege(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasFunctionPrivilege(...args: unknown[]) {
    return sqlFunction("has_function_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hasLanguagePrivilege(a0: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasLanguagePrivilege(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasLanguagePrivilege(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasLanguagePrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasLanguagePrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasLanguagePrivilege(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasLanguagePrivilege(...args: unknown[]) {
    return sqlFunction("has_language_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hasParameterPrivilege(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasParameterPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasParameterPrivilege(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasParameterPrivilege(...args: unknown[]) {
    return sqlFunction("has_parameter_privilege", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hasSchemaPrivilege(a0: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasSchemaPrivilege(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasSchemaPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasSchemaPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasSchemaPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasSchemaPrivilege(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasSchemaPrivilege(...args: unknown[]) {
    return sqlFunction("has_schema_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hasSequencePrivilege(a0: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasSequencePrivilege(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasSequencePrivilege(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasSequencePrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasSequencePrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasSequencePrivilege(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasSequencePrivilege(...args: unknown[]) {
    return sqlFunction("has_sequence_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hasServerPrivilege(a0: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasServerPrivilege(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasServerPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasServerPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasServerPrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasServerPrivilege(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasServerPrivilege(...args: unknown[]) {
    return sqlFunction("has_server_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hasTablePrivilege(a0: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasTablePrivilege(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasTablePrivilege(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasTablePrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasTablePrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasTablePrivilege(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasTablePrivilege(...args: unknown[]) {
    return sqlFunction("has_table_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hasTablespacePrivilege(a0: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasTablespacePrivilege(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasTablespacePrivilege(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasTablespacePrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasTablespacePrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasTablespacePrivilege(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasTablespacePrivilege(...args: unknown[]) {
    return sqlFunction("has_tablespace_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hasTypePrivilege(a0: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasTypePrivilege(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasTypePrivilege(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasTypePrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasTypePrivilege(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasTypePrivilege(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function hasTypePrivilege(...args: unknown[]) {
    return sqlFunction("has_type_privilege", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashAclitem(a0: Types.Aclitem<0 | 1>): Types.Int4<0 | 1>
export function hashAclitem(...args: unknown[]) {
    return sqlFunction("hash_aclitem", [{args: [Types.Aclitem<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashAclitemExtended(a0: Types.Aclitem<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashAclitemExtended(...args: unknown[]) {
    return sqlFunction("hash_aclitem_extended", [{args: [Types.Aclitem<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashArray<T extends Types.Any>(a0: Types.Array<0 | 1, T>): Types.Int4<0 | 1>
export function hashArray(...args: unknown[]) {
    return sqlFunction("hash_array", [({T}) => ({args: [Types.Array.of(T)], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function hashArrayExtended<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashArrayExtended(...args: unknown[]) {
    return sqlFunction("hash_array_extended", [({T}) => ({args: [Types.Array.of(T), Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function hashMultirange<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>): Types.Int4<0 | 1>
export function hashMultirange(...args: unknown[]) {
    return sqlFunction("hash_multirange", [{args: [Types.Anymultirange], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashMultirangeExtended<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashMultirangeExtended(...args: unknown[]) {
    return sqlFunction("hash_multirange_extended", [{args: [Types.Anymultirange, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashNumeric(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Int4<0 | 1>
export function hashNumeric(...args: unknown[]) {
    return sqlFunction("hash_numeric", [{args: [Types.Numeric<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashNumericExtended(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashNumericExtended(...args: unknown[]) {
    return sqlFunction("hash_numeric_extended", [{args: [Types.Numeric<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashRange<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>): Types.Int4<0 | 1>
export function hashRange(...args: unknown[]) {
    return sqlFunction("hash_range", [{args: [Types.Anyrange], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashRangeExtended<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashRangeExtended(...args: unknown[]) {
    return sqlFunction("hash_range_extended", [{args: [Types.Anyrange, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashRecord<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(a0: Types.Record<0 | 1, R>): Types.Int4<0 | 1>
export function hashRecord(...args: unknown[]) {
    return sqlFunction("hash_record", [({R}) => ({args: [Types.Record.of(R)], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function hashRecordExtended<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(a0: Types.Record<0 | 1, R>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashRecordExtended(...args: unknown[]) {
    return sqlFunction("hash_record_extended", [({R}) => ({args: [Types.Record.of(R), Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function hashbpchar(a0: Types.Bpchar<0 | 1>): Types.Int4<0 | 1>
export function hashbpchar(...args: unknown[]) {
    return sqlFunction("hashbpchar", [{args: [Types.Bpchar<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashbpcharextended(a0: Types.Bpchar<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashbpcharextended(...args: unknown[]) {
    return sqlFunction("hashbpcharextended", [{args: [Types.Bpchar<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashchar(a0: Types.Char<0 | 1>): Types.Int4<0 | 1>
export function hashchar(...args: unknown[]) {
    return sqlFunction("hashchar", [{args: [Types.Char<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashcharextended(a0: Types.Char<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashcharextended(...args: unknown[]) {
    return sqlFunction("hashcharextended", [{args: [Types.Char<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashenum<T extends Types.Any>(a0: T): Types.Int4<0 | 1>
export function hashenum(...args: unknown[]) {
    return sqlFunction("hashenum", [({T}) => ({args: [T], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function hashenumextended<T extends Types.Any>(a0: T, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashenumextended(...args: unknown[]) {
    return sqlFunction("hashenumextended", [({T}) => ({args: [T, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function hashfloat4(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Int4<0 | 1>
export function hashfloat4(...args: unknown[]) {
    return sqlFunction("hashfloat4", [{args: [Types.Float4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashfloat4Extended(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashfloat4Extended(...args: unknown[]) {
    return sqlFunction("hashfloat4extended", [{args: [Types.Float4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashfloat8(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Int4<0 | 1>
export function hashfloat8(...args: unknown[]) {
    return sqlFunction("hashfloat8", [{args: [Types.Float8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashfloat8Extended(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashfloat8Extended(...args: unknown[]) {
    return sqlFunction("hashfloat8extended", [{args: [Types.Float8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashinet(a0: Types.Inet<0 | 1>): Types.Int4<0 | 1>
export function hashinet(...args: unknown[]) {
    return sqlFunction("hashinet", [{args: [Types.Inet<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashinetextended(a0: Types.Inet<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashinetextended(...args: unknown[]) {
    return sqlFunction("hashinetextended", [{args: [Types.Inet<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashint2(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
export function hashint2(...args: unknown[]) {
    return sqlFunction("hashint2", [{args: [Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashint2Extended(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashint2Extended(...args: unknown[]) {
    return sqlFunction("hashint2extended", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashint4(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function hashint4(...args: unknown[]) {
    return sqlFunction("hashint4", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashint4Extended(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashint4Extended(...args: unknown[]) {
    return sqlFunction("hashint4extended", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashint8(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<0 | 1>
export function hashint8(...args: unknown[]) {
    return sqlFunction("hashint8", [{args: [Types.Int8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashint8Extended(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashint8Extended(...args: unknown[]) {
    return sqlFunction("hashint8extended", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashmacaddr(a0: Types.Macaddr<0 | 1>): Types.Int4<0 | 1>
export function hashmacaddr(...args: unknown[]) {
    return sqlFunction("hashmacaddr", [{args: [Types.Macaddr<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashmacaddr8(a0: Types.Macaddr8<0 | 1>): Types.Int4<0 | 1>
export function hashmacaddr8(...args: unknown[]) {
    return sqlFunction("hashmacaddr8", [{args: [Types.Macaddr8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashmacaddr8Extended(a0: Types.Macaddr8<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashmacaddr8Extended(...args: unknown[]) {
    return sqlFunction("hashmacaddr8extended", [{args: [Types.Macaddr8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashmacaddrextended(a0: Types.Macaddr<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashmacaddrextended(...args: unknown[]) {
    return sqlFunction("hashmacaddrextended", [{args: [Types.Macaddr<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashname(a0: Types.Name<0 | 1>): Types.Int4<0 | 1>
export function hashname(...args: unknown[]) {
    return sqlFunction("hashname", [{args: [Types.Name<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashnameextended(a0: Types.Name<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashnameextended(...args: unknown[]) {
    return sqlFunction("hashnameextended", [{args: [Types.Name<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashoid(a0: Types.Oid<0 | 1>): Types.Int4<0 | 1>
export function hashoid(...args: unknown[]) {
    return sqlFunction("hashoid", [{args: [Types.Oid<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashoidextended(a0: Types.Oid<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashoidextended(...args: unknown[]) {
    return sqlFunction("hashoidextended", [{args: [Types.Oid<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashoidvector(a0: Types.Oidvector<0 | 1>): Types.Int4<0 | 1>
export function hashoidvector(...args: unknown[]) {
    return sqlFunction("hashoidvector", [{args: [Types.Oidvector<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashoidvectorextended(a0: Types.Oidvector<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashoidvectorextended(...args: unknown[]) {
    return sqlFunction("hashoidvectorextended", [{args: [Types.Oidvector<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashtext(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
export function hashtext(...args: unknown[]) {
    return sqlFunction("hashtext", [{args: [Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashtextextended(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashtextextended(...args: unknown[]) {
    return sqlFunction("hashtextextended", [{args: [Types.Text<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashtid(a0: Types.Tid<0 | 1>): Types.Int4<0 | 1>
export function hashtid(...args: unknown[]) {
    return sqlFunction("hashtid", [{args: [Types.Tid<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hashtidextended(a0: Types.Tid<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function hashtidextended(...args: unknown[]) {
    return sqlFunction("hashtidextended", [{args: [Types.Tid<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function height(a0: Types.Box<0 | 1>): Types.Float8<0 | 1>
export function height(...args: unknown[]) {
    return sqlFunction("height", [{args: [Types.Box<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function host(a0: Types.Inet<0 | 1>): Types.Text<0 | 1>
export function host(...args: unknown[]) {
    return sqlFunction("host", [{args: [Types.Inet<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function hostmask(a0: Types.Inet<0 | 1>): Types.Inet<0 | 1>
export function hostmask(...args: unknown[]) {
    return sqlFunction("hostmask", [{args: [Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function icuUnicodeVersion(): Types.Text<0 | 1>
export function icuUnicodeVersion(...args: unknown[]) {
    return sqlFunction("icu_unicode_version", [{args: [], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function inRange(a0: Types.Date<0 | 1>, a1: Types.Date<0 | 1>, a2: Types.Interval<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function inRange(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a2: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function inRange(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a2: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function inRange(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function inRange(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function inRange(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function inRange(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function inRange(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function inRange(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function inRange(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function inRange(a0: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>, a2: Types.Interval<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function inRange(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a2: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function inRange(a0: Types.Time<0 | 1>, a1: Types.Time<0 | 1>, a2: Types.Interval<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function inRange(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>, a2: Types.Interval<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function inRange(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>, a2: Types.Interval<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function inRange(a0: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>, a2: Types.Interval<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function inRange(...args: unknown[]) {
    return sqlFunction("in_range", [{args: [Types.Date<0 | 1>, Types.Date<0 | 1>, Types.Interval<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>, Types.Float4<0 | 1>, Types.Float8<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>, Types.Float8<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>, Types.Int2<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>, Types.Int4<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>, Types.Int8<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int2<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int8<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>, Types.Int8<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>, Types.Interval<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>, Types.Numeric<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Time<0 | 1>, Types.Time<0 | 1>, Types.Interval<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>, Types.Interval<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>, Types.Interval<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function inetClientAddr(): Types.Inet<0 | 1>
export function inetClientAddr(...args: unknown[]) {
    return sqlFunction("inet_client_addr", [{args: [], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function inetClientPort(): Types.Int4<0 | 1>
export function inetClientPort(...args: unknown[]) {
    return sqlFunction("inet_client_port", [{args: [], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function inetMerge(a0: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Cidr<0 | 1>
export function inetMerge(...args: unknown[]) {
    return sqlFunction("inet_merge", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Cidr<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function inetSameFamily(a0: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
export function inetSameFamily(...args: unknown[]) {
    return sqlFunction("inet_same_family", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function inetServerAddr(): Types.Inet<0 | 1>
export function inetServerAddr(...args: unknown[]) {
    return sqlFunction("inet_server_addr", [{args: [], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function inetServerPort(): Types.Int4<0 | 1>
export function inetServerPort(...args: unknown[]) {
    return sqlFunction("inet_server_port", [{args: [], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function inetand(a0: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Inet<0 | 1>
export function inetand(...args: unknown[]) {
    return sqlFunction("inetand", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function inetmi(a0: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Int8<0 | 1>
export function inetmi(...args: unknown[]) {
    return sqlFunction("inetmi", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function inetmiInt8(a0: Types.Inet<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Inet<0 | 1>
export function inetmiInt8(...args: unknown[]) {
    return sqlFunction("inetmi_int8", [{args: [Types.Inet<0 | 1>, Types.Int8<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function inetnot(a0: Types.Inet<0 | 1>): Types.Inet<0 | 1>
export function inetnot(...args: unknown[]) {
    return sqlFunction("inetnot", [{args: [Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function inetor(a0: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Inet<0 | 1>
export function inetor(...args: unknown[]) {
    return sqlFunction("inetor", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function inetpl(a0: Types.Inet<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Inet<0 | 1>
export function inetpl(...args: unknown[]) {
    return sqlFunction("inetpl", [{args: [Types.Inet<0 | 1>, Types.Int8<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function initcap(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function initcap(...args: unknown[]) {
    return sqlFunction("initcap", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Int2<0 | 1>
export function int2(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Int2<0 | 1>
export function int2(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int2<0 | 1>
export function int2(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int2<0 | 1>
export function int2(a0: Types.Jsonb<0 | 1>): Types.Int2<0 | 1>
export function int2(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Int2<0 | 1>
export function int2(...args: unknown[]) {
    return sqlFunction("int2", [{args: [Types.Float4<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Jsonb<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int24Div(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function int24Div(...args: unknown[]) {
    return sqlFunction("int24div", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int24Eq(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function int24Eq(...args: unknown[]) {
    return sqlFunction("int24eq", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int24Ge(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function int24Ge(...args: unknown[]) {
    return sqlFunction("int24ge", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int24Gt(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function int24Gt(...args: unknown[]) {
    return sqlFunction("int24gt", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int24Le(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function int24Le(...args: unknown[]) {
    return sqlFunction("int24le", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int24Lt(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function int24Lt(...args: unknown[]) {
    return sqlFunction("int24lt", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int24Mi(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function int24Mi(...args: unknown[]) {
    return sqlFunction("int24mi", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int24Mul(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function int24Mul(...args: unknown[]) {
    return sqlFunction("int24mul", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int24Ne(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function int24Ne(...args: unknown[]) {
    return sqlFunction("int24ne", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int24Pl(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function int24Pl(...args: unknown[]) {
    return sqlFunction("int24pl", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int28Div(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int28Div(...args: unknown[]) {
    return sqlFunction("int28div", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int28Eq(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function int28Eq(...args: unknown[]) {
    return sqlFunction("int28eq", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int28Ge(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function int28Ge(...args: unknown[]) {
    return sqlFunction("int28ge", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int28Gt(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function int28Gt(...args: unknown[]) {
    return sqlFunction("int28gt", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int28Le(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function int28Le(...args: unknown[]) {
    return sqlFunction("int28le", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int28Lt(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function int28Lt(...args: unknown[]) {
    return sqlFunction("int28lt", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int28Mi(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int28Mi(...args: unknown[]) {
    return sqlFunction("int28mi", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int28Mul(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int28Mul(...args: unknown[]) {
    return sqlFunction("int28mul", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int28Ne(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function int28Ne(...args: unknown[]) {
    return sqlFunction("int28ne", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int28Pl(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int28Pl(...args: unknown[]) {
    return sqlFunction("int28pl", [{args: [Types.Int2<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2AvgAccum(a0: Types.Array<0 | 1, Types.Int8<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Array<0 | 1, Types.Int8<0 | 1>>
export function int2AvgAccum(...args: unknown[]) {
    return sqlFunction("int2_avg_accum", [{args: [Types.Array.of(Types.Int8<0 | 1>), Types.Int2<0 | 1>], ret: Types.Array.of(Types.Int8<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2AvgAccumInv(a0: Types.Array<0 | 1, Types.Int8<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Array<0 | 1, Types.Int8<0 | 1>>
export function int2AvgAccumInv(...args: unknown[]) {
    return sqlFunction("int2_avg_accum_inv", [{args: [Types.Array.of(Types.Int8<0 | 1>), Types.Int2<0 | 1>], ret: Types.Array.of(Types.Int8<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2MulCash(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
export function int2MulCash(...args: unknown[]) {
    return sqlFunction("int2_mul_cash", [{args: [Types.Int2<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Sum(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
export function int2Sum(...args: unknown[]) {
    return sqlFunction("int2_sum", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Abs(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
export function int2Abs(...args: unknown[]) {
    return sqlFunction("int2abs", [{args: [Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2And(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
export function int2And(...args: unknown[]) {
    return sqlFunction("int2and", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Div(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
export function int2Div(...args: unknown[]) {
    return sqlFunction("int2div", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Eq(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
export function int2Eq(...args: unknown[]) {
    return sqlFunction("int2eq", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Ge(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
export function int2Ge(...args: unknown[]) {
    return sqlFunction("int2ge", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Gt(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
export function int2Gt(...args: unknown[]) {
    return sqlFunction("int2gt", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Int4Sum(a0: Types.Array<0 | 1, Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int2Int4Sum(...args: unknown[]) {
    return sqlFunction("int2int4_sum", [{args: [Types.Array.of(Types.Int8<0 | 1>)], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Larger(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
export function int2Larger(...args: unknown[]) {
    return sqlFunction("int2larger", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Le(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
export function int2Le(...args: unknown[]) {
    return sqlFunction("int2le", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Lt(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
export function int2Lt(...args: unknown[]) {
    return sqlFunction("int2lt", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Mi(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
export function int2Mi(...args: unknown[]) {
    return sqlFunction("int2mi", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Mod(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
export function int2Mod(...args: unknown[]) {
    return sqlFunction("int2mod", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Mul(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
export function int2Mul(...args: unknown[]) {
    return sqlFunction("int2mul", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Ne(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
export function int2Ne(...args: unknown[]) {
    return sqlFunction("int2ne", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Not(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
export function int2Not(...args: unknown[]) {
    return sqlFunction("int2not", [{args: [Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Or(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
export function int2Or(...args: unknown[]) {
    return sqlFunction("int2or", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Pl(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
export function int2Pl(...args: unknown[]) {
    return sqlFunction("int2pl", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Shl(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int2<0 | 1>
export function int2Shl(...args: unknown[]) {
    return sqlFunction("int2shl", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Shr(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int2<0 | 1>
export function int2Shr(...args: unknown[]) {
    return sqlFunction("int2shr", [{args: [Types.Int2<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Smaller(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
export function int2Smaller(...args: unknown[]) {
    return sqlFunction("int2smaller", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Um(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
export function int2Um(...args: unknown[]) {
    return sqlFunction("int2um", [{args: [Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Up(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
export function int2Up(...args: unknown[]) {
    return sqlFunction("int2up", [{args: [Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int2Xor(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int2<0 | 1>
export function int2Xor(...args: unknown[]) {
    return sqlFunction("int2xor", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4(a0: Types.Bit<0 | 1>): Types.Int4<0 | 1>
export function int4(a0: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Int4<0 | 1>
export function int4(a0: Types.Char<0 | 1>): Types.Int4<0 | 1>
export function int4(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Int4<0 | 1>
export function int4(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Int4<0 | 1>
export function int4(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
export function int4(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<0 | 1>
export function int4(a0: Types.Jsonb<0 | 1>): Types.Int4<0 | 1>
export function int4(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Int4<0 | 1>
export function int4(...args: unknown[]) {
    return sqlFunction("int4", [{args: [Types.Bit<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Bool<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Char<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Jsonb<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int42Div(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
export function int42Div(...args: unknown[]) {
    return sqlFunction("int42div", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int42Eq(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
export function int42Eq(...args: unknown[]) {
    return sqlFunction("int42eq", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int42Ge(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
export function int42Ge(...args: unknown[]) {
    return sqlFunction("int42ge", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int42Gt(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
export function int42Gt(...args: unknown[]) {
    return sqlFunction("int42gt", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int42Le(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
export function int42Le(...args: unknown[]) {
    return sqlFunction("int42le", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int42Lt(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
export function int42Lt(...args: unknown[]) {
    return sqlFunction("int42lt", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int42Mi(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
export function int42Mi(...args: unknown[]) {
    return sqlFunction("int42mi", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int42Mul(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
export function int42Mul(...args: unknown[]) {
    return sqlFunction("int42mul", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int42Ne(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
export function int42Ne(...args: unknown[]) {
    return sqlFunction("int42ne", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int42Pl(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int4<0 | 1>
export function int42Pl(...args: unknown[]) {
    return sqlFunction("int42pl", [{args: [Types.Int4<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int48Div(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int48Div(...args: unknown[]) {
    return sqlFunction("int48div", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int48Eq(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function int48Eq(...args: unknown[]) {
    return sqlFunction("int48eq", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int48Ge(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function int48Ge(...args: unknown[]) {
    return sqlFunction("int48ge", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int48Gt(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function int48Gt(...args: unknown[]) {
    return sqlFunction("int48gt", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int48Le(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function int48Le(...args: unknown[]) {
    return sqlFunction("int48le", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int48Lt(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function int48Lt(...args: unknown[]) {
    return sqlFunction("int48lt", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int48Mi(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int48Mi(...args: unknown[]) {
    return sqlFunction("int48mi", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int48Mul(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int48Mul(...args: unknown[]) {
    return sqlFunction("int48mul", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int48Ne(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function int48Ne(...args: unknown[]) {
    return sqlFunction("int48ne", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int48Pl(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int48Pl(...args: unknown[]) {
    return sqlFunction("int48pl", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4AvgAccum(a0: Types.Array<0 | 1, Types.Int8<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Array<0 | 1, Types.Int8<0 | 1>>
export function int4AvgAccum(...args: unknown[]) {
    return sqlFunction("int4_avg_accum", [{args: [Types.Array.of(Types.Int8<0 | 1>), Types.Int4<0 | 1>], ret: Types.Array.of(Types.Int8<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4AvgAccumInv(a0: Types.Array<0 | 1, Types.Int8<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Array<0 | 1, Types.Int8<0 | 1>>
export function int4AvgAccumInv(...args: unknown[]) {
    return sqlFunction("int4_avg_accum_inv", [{args: [Types.Array.of(Types.Int8<0 | 1>), Types.Int4<0 | 1>], ret: Types.Array.of(Types.Int8<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4AvgCombine(a0: Types.Array<0 | 1, Types.Int8<0 | 1>>, a1: Types.Array<0 | 1, Types.Int8<0 | 1>>): Types.Array<0 | 1, Types.Int8<0 | 1>>
export function int4AvgCombine(...args: unknown[]) {
    return sqlFunction("int4_avg_combine", [{args: [Types.Array.of(Types.Int8<0 | 1>), Types.Array.of(Types.Int8<0 | 1>)], ret: Types.Array.of(Types.Int8<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4MulCash(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
export function int4MulCash(...args: unknown[]) {
    return sqlFunction("int4_mul_cash", [{args: [Types.Int4<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Sum(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
export function int4Sum(...args: unknown[]) {
    return sqlFunction("int4_sum", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Abs(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function int4Abs(...args: unknown[]) {
    return sqlFunction("int4abs", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4And(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function int4And(...args: unknown[]) {
    return sqlFunction("int4and", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Div(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function int4Div(...args: unknown[]) {
    return sqlFunction("int4div", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Eq(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function int4Eq(...args: unknown[]) {
    return sqlFunction("int4eq", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Ge(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function int4Ge(...args: unknown[]) {
    return sqlFunction("int4ge", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Gt(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function int4Gt(...args: unknown[]) {
    return sqlFunction("int4gt", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Inc(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function int4Inc(...args: unknown[]) {
    return sqlFunction("int4inc", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Larger(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function int4Larger(...args: unknown[]) {
    return sqlFunction("int4larger", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Le(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function int4Le(...args: unknown[]) {
    return sqlFunction("int4le", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Lt(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function int4Lt(...args: unknown[]) {
    return sqlFunction("int4lt", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Mi(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function int4Mi(...args: unknown[]) {
    return sqlFunction("int4mi", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Mod(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function int4Mod(...args: unknown[]) {
    return sqlFunction("int4mod", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Mul(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function int4Mul(...args: unknown[]) {
    return sqlFunction("int4mul", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Multirange(): Types.Int4Multirange<0 | 1>
export function int4Multirange(a0: Types.Array<0 | 1, Types.Int4Range<0 | 1>>, ...variadic: Types.Array<0 | 1, Types.Int4Range<0 | 1>>[]): Types.Int4Multirange<0 | 1>
export function int4Multirange(a0: Types.Int4Range<0 | 1>): Types.Int4Multirange<0 | 1>
export function int4Multirange(...args: unknown[]) {
    return sqlFunction("int4multirange", [{args: [], ret: Types.Int4Multirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Array.of(Types.Int4Range<0 | 1>)], ret: Types.Int4Multirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}, {args: [Types.Int4Range<0 | 1>], ret: Types.Int4Multirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Ne(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function int4Ne(...args: unknown[]) {
    return sqlFunction("int4ne", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Not(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function int4Not(...args: unknown[]) {
    return sqlFunction("int4not", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Or(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function int4Or(...args: unknown[]) {
    return sqlFunction("int4or", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Pl(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function int4Pl(...args: unknown[]) {
    return sqlFunction("int4pl", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Range(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4Range<0 | 1>
export function int4Range(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4Range<0 | 1>
export function int4Range(...args: unknown[]) {
    return sqlFunction("int4range", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4Range<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4Range<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4RangeCanonical(a0: Types.Int4Range<0 | 1>): Types.Int4Range<0 | 1>
export function int4RangeCanonical(...args: unknown[]) {
    return sqlFunction("int4range_canonical", [{args: [Types.Int4Range<0 | 1>], ret: Types.Int4Range<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4RangeSubdiff(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Float8<0 | 1>
export function int4RangeSubdiff(...args: unknown[]) {
    return sqlFunction("int4range_subdiff", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Shl(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function int4Shl(...args: unknown[]) {
    return sqlFunction("int4shl", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Shr(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function int4Shr(...args: unknown[]) {
    return sqlFunction("int4shr", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Smaller(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function int4Smaller(...args: unknown[]) {
    return sqlFunction("int4smaller", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Um(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function int4Um(...args: unknown[]) {
    return sqlFunction("int4um", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Up(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function int4Up(...args: unknown[]) {
    return sqlFunction("int4up", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int4Xor(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function int4Xor(...args: unknown[]) {
    return sqlFunction("int4xor", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8(a0: Types.Bit<0 | 1>): Types.Int8<0 | 1>
export function int8(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Int8<0 | 1>
export function int8(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Int8<0 | 1>
export function int8(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
export function int8(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
export function int8(a0: Types.Jsonb<0 | 1>): Types.Int8<0 | 1>
export function int8(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Int8<0 | 1>
export function int8(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function int8(...args: unknown[]) {
    return sqlFunction("int8", [{args: [Types.Bit<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Jsonb<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int82Div(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
export function int82Div(...args: unknown[]) {
    return sqlFunction("int82div", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int82Eq(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
export function int82Eq(...args: unknown[]) {
    return sqlFunction("int82eq", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int82Ge(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
export function int82Ge(...args: unknown[]) {
    return sqlFunction("int82ge", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int82Gt(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
export function int82Gt(...args: unknown[]) {
    return sqlFunction("int82gt", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int82Le(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
export function int82Le(...args: unknown[]) {
    return sqlFunction("int82le", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int82Lt(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
export function int82Lt(...args: unknown[]) {
    return sqlFunction("int82lt", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int82Mi(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
export function int82Mi(...args: unknown[]) {
    return sqlFunction("int82mi", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int82Mul(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
export function int82Mul(...args: unknown[]) {
    return sqlFunction("int82mul", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int82Ne(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Bool<0 | 1>
export function int82Ne(...args: unknown[]) {
    return sqlFunction("int82ne", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int82Pl(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Int8<0 | 1>
export function int82Pl(...args: unknown[]) {
    return sqlFunction("int82pl", [{args: [Types.Int8<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int84Div(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
export function int84Div(...args: unknown[]) {
    return sqlFunction("int84div", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int84Eq(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function int84Eq(...args: unknown[]) {
    return sqlFunction("int84eq", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int84Ge(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function int84Ge(...args: unknown[]) {
    return sqlFunction("int84ge", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int84Gt(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function int84Gt(...args: unknown[]) {
    return sqlFunction("int84gt", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int84Le(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function int84Le(...args: unknown[]) {
    return sqlFunction("int84le", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int84Lt(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function int84Lt(...args: unknown[]) {
    return sqlFunction("int84lt", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int84Mi(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
export function int84Mi(...args: unknown[]) {
    return sqlFunction("int84mi", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int84Mul(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
export function int84Mul(...args: unknown[]) {
    return sqlFunction("int84mul", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int84Ne(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function int84Ne(...args: unknown[]) {
    return sqlFunction("int84ne", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int84Pl(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
export function int84Pl(...args: unknown[]) {
    return sqlFunction("int84pl", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Avg(a0: Types.Array<0 | 1, Types.Int8<0 | 1>>): Types.Numeric<0 | 1>
export function int8Avg(...args: unknown[]) {
    return sqlFunction("int8_avg", [{args: [Types.Array.of(Types.Int8<0 | 1>)], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8MulCash(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Money<0 | 1>): Types.Money<0 | 1>
export function int8MulCash(...args: unknown[]) {
    return sqlFunction("int8_mul_cash", [{args: [Types.Int8<0 | 1>, Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Sum(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Numeric<0 | 1>
export function int8Sum(...args: unknown[]) {
    return sqlFunction("int8_sum", [{args: [Types.Numeric<0 | 1>, Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Abs(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int8Abs(...args: unknown[]) {
    return sqlFunction("int8abs", [{args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8And(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int8And(...args: unknown[]) {
    return sqlFunction("int8and", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Dec(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int8Dec(...args: unknown[]) {
    return sqlFunction("int8dec", [{args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8DecAny(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Any<unknown, 0 | 1>): Types.Int8<0 | 1>
export function int8DecAny(...args: unknown[]) {
    return sqlFunction("int8dec_any", [{args: [Types.Int8<0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Div(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int8Div(...args: unknown[]) {
    return sqlFunction("int8div", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Eq(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function int8Eq(...args: unknown[]) {
    return sqlFunction("int8eq", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Ge(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function int8Ge(...args: unknown[]) {
    return sqlFunction("int8ge", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Gt(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function int8Gt(...args: unknown[]) {
    return sqlFunction("int8gt", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Inc(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int8Inc(...args: unknown[]) {
    return sqlFunction("int8inc", [{args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8IncAny(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Any<unknown, 0 | 1>): Types.Int8<0 | 1>
export function int8IncAny(...args: unknown[]) {
    return sqlFunction("int8inc_any", [{args: [Types.Int8<0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8IncFloat8Float8(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a2: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Int8<0 | 1>
export function int8IncFloat8Float8(...args: unknown[]) {
    return sqlFunction("int8inc_float8_float8", [{args: [Types.Int8<0 | 1>, Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Larger(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int8Larger(...args: unknown[]) {
    return sqlFunction("int8larger", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Le(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function int8Le(...args: unknown[]) {
    return sqlFunction("int8le", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Lt(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function int8Lt(...args: unknown[]) {
    return sqlFunction("int8lt", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Mi(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int8Mi(...args: unknown[]) {
    return sqlFunction("int8mi", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Mod(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int8Mod(...args: unknown[]) {
    return sqlFunction("int8mod", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Mul(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int8Mul(...args: unknown[]) {
    return sqlFunction("int8mul", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Multirange(): Types.Int8Multirange<0 | 1>
export function int8Multirange(a0: Types.Array<0 | 1, Types.Int8Range<0 | 1>>, ...variadic: Types.Array<0 | 1, Types.Int8Range<0 | 1>>[]): Types.Int8Multirange<0 | 1>
export function int8Multirange(a0: Types.Int8Range<0 | 1>): Types.Int8Multirange<0 | 1>
export function int8Multirange(...args: unknown[]) {
    return sqlFunction("int8multirange", [{args: [], ret: Types.Int8Multirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Array.of(Types.Int8Range<0 | 1>)], ret: Types.Int8Multirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}, {args: [Types.Int8Range<0 | 1>], ret: Types.Int8Multirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Ne(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function int8Ne(...args: unknown[]) {
    return sqlFunction("int8ne", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Not(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int8Not(...args: unknown[]) {
    return sqlFunction("int8not", [{args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Or(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int8Or(...args: unknown[]) {
    return sqlFunction("int8or", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Pl(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int8Pl(...args: unknown[]) {
    return sqlFunction("int8pl", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8PlInet(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Inet<0 | 1>): Types.Inet<0 | 1>
export function int8PlInet(...args: unknown[]) {
    return sqlFunction("int8pl_inet", [{args: [Types.Int8<0 | 1>, Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Range(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8Range<0 | 1>
export function int8Range(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int8Range<0 | 1>
export function int8Range(...args: unknown[]) {
    return sqlFunction("int8range", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8Range<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>, Types.Text<0 | 1>], ret: Types.Int8Range<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8RangeCanonical(a0: Types.Int8Range<0 | 1>): Types.Int8Range<0 | 1>
export function int8RangeCanonical(...args: unknown[]) {
    return sqlFunction("int8range_canonical", [{args: [Types.Int8Range<0 | 1>], ret: Types.Int8Range<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8RangeSubdiff(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Float8<0 | 1>
export function int8RangeSubdiff(...args: unknown[]) {
    return sqlFunction("int8range_subdiff", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Shl(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
export function int8Shl(...args: unknown[]) {
    return sqlFunction("int8shl", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Shr(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
export function int8Shr(...args: unknown[]) {
    return sqlFunction("int8shr", [{args: [Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Smaller(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int8Smaller(...args: unknown[]) {
    return sqlFunction("int8smaller", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Um(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int8Um(...args: unknown[]) {
    return sqlFunction("int8um", [{args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Up(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int8Up(...args: unknown[]) {
    return sqlFunction("int8up", [{args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function int8Xor(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function int8Xor(...args: unknown[]) {
    return sqlFunction("int8xor", [{args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function integerPlDate(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Date<0 | 1>): Types.Date<0 | 1>
export function integerPlDate(...args: unknown[]) {
    return sqlFunction("integer_pl_date", [{args: [Types.Int4<0 | 1>, Types.Date<0 | 1>], ret: Types.Date<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function interLb(a0: Types.Line<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function interLb(...args: unknown[]) {
    return sqlFunction("inter_lb", [{args: [Types.Line<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function interSb(a0: Types.Lseg<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function interSb(...args: unknown[]) {
    return sqlFunction("inter_sb", [{args: [Types.Lseg<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function interSl(a0: Types.Lseg<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
export function interSl(...args: unknown[]) {
    return sqlFunction("inter_sl", [{args: [Types.Lseg<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function interval(a0: Types.Interval<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Interval<0 | 1>
export function interval(a0: Types.Time<0 | 1>): Types.Interval<0 | 1>
export function interval(...args: unknown[]) {
    return sqlFunction("interval", [{args: [Types.Interval<0 | 1>, Types.Int4<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Time<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function intervalCmp(a0: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Int4<0 | 1>
export function intervalCmp(...args: unknown[]) {
    return sqlFunction("interval_cmp", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function intervalDiv(a0: Types.Interval<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<0 | 1>
export function intervalDiv(...args: unknown[]) {
    return sqlFunction("interval_div", [{args: [Types.Interval<0 | 1>, Types.Float8<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function intervalEq(a0: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
export function intervalEq(...args: unknown[]) {
    return sqlFunction("interval_eq", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function intervalGe(a0: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
export function intervalGe(...args: unknown[]) {
    return sqlFunction("interval_ge", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function intervalGt(a0: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
export function intervalGt(...args: unknown[]) {
    return sqlFunction("interval_gt", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function intervalHash(a0: Types.Interval<0 | 1>): Types.Int4<0 | 1>
export function intervalHash(...args: unknown[]) {
    return sqlFunction("interval_hash", [{args: [Types.Interval<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function intervalHashExtended(a0: Types.Interval<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function intervalHashExtended(...args: unknown[]) {
    return sqlFunction("interval_hash_extended", [{args: [Types.Interval<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function intervalLarger(a0: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Interval<0 | 1>
export function intervalLarger(...args: unknown[]) {
    return sqlFunction("interval_larger", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function intervalLe(a0: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
export function intervalLe(...args: unknown[]) {
    return sqlFunction("interval_le", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function intervalLt(a0: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
export function intervalLt(...args: unknown[]) {
    return sqlFunction("interval_lt", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function intervalMi(a0: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Interval<0 | 1>
export function intervalMi(...args: unknown[]) {
    return sqlFunction("interval_mi", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function intervalMul(a0: Types.Interval<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<0 | 1>
export function intervalMul(...args: unknown[]) {
    return sqlFunction("interval_mul", [{args: [Types.Interval<0 | 1>, Types.Float8<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function intervalNe(a0: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Bool<0 | 1>
export function intervalNe(...args: unknown[]) {
    return sqlFunction("interval_ne", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function intervalPl(a0: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Interval<0 | 1>
export function intervalPl(...args: unknown[]) {
    return sqlFunction("interval_pl", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function intervalPlDate(a0: Types.Interval<0 | 1>, a1: Types.Date<0 | 1>): Types.Timestamp<0 | 1>
export function intervalPlDate(...args: unknown[]) {
    return sqlFunction("interval_pl_date", [{args: [Types.Interval<0 | 1>, Types.Date<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function intervalPlTime(a0: Types.Interval<0 | 1>, a1: Types.Time<0 | 1>): Types.Time<0 | 1>
export function intervalPlTime(...args: unknown[]) {
    return sqlFunction("interval_pl_time", [{args: [Types.Interval<0 | 1>, Types.Time<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function intervalPlTimestamp(a0: Types.Interval<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Timestamp<0 | 1>
export function intervalPlTimestamp(...args: unknown[]) {
    return sqlFunction("interval_pl_timestamp", [{args: [Types.Interval<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function intervalPlTimestamptz(a0: Types.Interval<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Timestamptz<0 | 1>
export function intervalPlTimestamptz(...args: unknown[]) {
    return sqlFunction("interval_pl_timestamptz", [{args: [Types.Interval<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function intervalPlTimetz(a0: Types.Interval<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Timetz<0 | 1>
export function intervalPlTimetz(...args: unknown[]) {
    return sqlFunction("interval_pl_timetz", [{args: [Types.Interval<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function intervalSmaller(a0: Types.Interval<0 | 1>, a1: Types.Interval<0 | 1>): Types.Interval<0 | 1>
export function intervalSmaller(...args: unknown[]) {
    return sqlFunction("interval_smaller", [{args: [Types.Interval<0 | 1>, Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function intervalUm(a0: Types.Interval<0 | 1>): Types.Interval<0 | 1>
export function intervalUm(...args: unknown[]) {
    return sqlFunction("interval_um", [{args: [Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function isNormalized(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function isNormalized(...args: unknown[]) {
    return sqlFunction("is_normalized", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function isclosed(a0: Types.Path<0 | 1>): Types.Bool<0 | 1>
export function isclosed(...args: unknown[]) {
    return sqlFunction("isclosed", [{args: [Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function isempty<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function isempty<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function isempty(...args: unknown[]) {
    return sqlFunction("isempty", [{args: [Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function isfinite(a0: Types.Date<0 | 1>): Types.Bool<0 | 1>
export function isfinite(a0: Types.Interval<0 | 1>): Types.Bool<0 | 1>
export function isfinite(a0: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
export function isfinite(a0: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
export function isfinite(...args: unknown[]) {
    return sqlFunction("isfinite", [{args: [Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function ishorizontal(a0: Types.Line<0 | 1>): Types.Bool<0 | 1>
export function ishorizontal(a0: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
export function ishorizontal(a0: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
export function ishorizontal(...args: unknown[]) {
    return sqlFunction("ishorizontal", [{args: [Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function isopen(a0: Types.Path<0 | 1>): Types.Bool<0 | 1>
export function isopen(...args: unknown[]) {
    return sqlFunction("isopen", [{args: [Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function isparallel(a0: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
export function isparallel(a0: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
export function isparallel(...args: unknown[]) {
    return sqlFunction("isparallel", [{args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function isperp(a0: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
export function isperp(a0: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
export function isperp(...args: unknown[]) {
    return sqlFunction("isperp", [{args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function isvertical(a0: Types.Line<0 | 1>): Types.Bool<0 | 1>
export function isvertical(a0: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
export function isvertical(a0: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
export function isvertical(...args: unknown[]) {
    return sqlFunction("isvertical", [{args: [Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonAgg<T extends Types.Any>(a0: T): Types.Json<0 | 1>
export function jsonAgg(...args: unknown[]) {
    return sqlFunction("json_agg", [({T}) => ({args: [T], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function jsonAggStrict<T extends Types.Any>(a0: T): Types.Json<0 | 1>
export function jsonAggStrict(...args: unknown[]) {
    return sqlFunction("json_agg_strict", [({T}) => ({args: [T], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function jsonArrayElement(a0: Types.Json<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Json<0 | 1>
export function jsonArrayElement(...args: unknown[]) {
    return sqlFunction("json_array_element", [{args: [Types.Json<0 | 1>, Types.Int4<0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonArrayElementText(a0: Types.Json<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function jsonArrayElementText(...args: unknown[]) {
    return sqlFunction("json_array_element_text", [{args: [Types.Json<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonArrayElements(a0: Types.Json<0 | 1>): Types.FromItem<{value: Types.Json<0 | 1>}>
export function jsonArrayElements(...args: unknown[]) {
    return sqlFunction("json_array_elements", [{args: [Types.Json<0 | 1>], ret: Types.FromItem.ofSchema({value: Types.Json<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonArrayElementsText(a0: Types.Json<0 | 1>): Types.FromItem<{value: Types.Text<0 | 1>}>
export function jsonArrayElementsText(...args: unknown[]) {
    return sqlFunction("json_array_elements_text", [{args: [Types.Json<0 | 1>], ret: Types.FromItem.ofSchema({value: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonArrayLength(a0: Types.Json<0 | 1>): Types.Int4<0 | 1>
export function jsonArrayLength(...args: unknown[]) {
    return sqlFunction("json_array_length", [{args: [Types.Json<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonBuildArray(): Types.Json<0 | 1>
export function jsonBuildArray(a0: Types.Any<unknown, 0 | 1>, ...variadic: Types.Any<unknown, 0 | 1>[]): Types.Json<0 | 1>
export function jsonBuildArray(...args: unknown[]) {
    return sqlFunction("json_build_array", [{args: [], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Any<unknown, 0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function jsonBuildObject(): Types.Json<0 | 1>
export function jsonBuildObject(a0: Types.Any<unknown, 0 | 1>, ...variadic: Types.Any<unknown, 0 | 1>[]): Types.Json<0 | 1>
export function jsonBuildObject(...args: unknown[]) {
    return sqlFunction("json_build_object", [{args: [], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Any<unknown, 0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function jsonEach(a0: Types.Json<0 | 1>): Types.FromItem<{key: Types.Text<0 | 1>, value: Types.Json<0 | 1>}>
export function jsonEach(...args: unknown[]) {
    return sqlFunction("json_each", [{args: [Types.Json<0 | 1>], ret: Types.FromItem.ofSchema({key: Types.Text<0 | 1>, value: Types.Json<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonEachText(a0: Types.Json<0 | 1>): Types.FromItem<{key: Types.Text<0 | 1>, value: Types.Text<0 | 1>}>
export function jsonEachText(...args: unknown[]) {
    return sqlFunction("json_each_text", [{args: [Types.Json<0 | 1>], ret: Types.FromItem.ofSchema({key: Types.Text<0 | 1>, value: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonExtractPath(a0: Types.Json<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: Types.Array<0 | 1, Types.Text<0 | 1>>[]): Types.Json<0 | 1>
export function jsonExtractPath(...args: unknown[]) {
    return sqlFunction("json_extract_path", [{args: [Types.Json<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function jsonExtractPathText(a0: Types.Json<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: Types.Array<0 | 1, Types.Text<0 | 1>>[]): Types.Text<0 | 1>
export function jsonExtractPathText(...args: unknown[]) {
    return sqlFunction("json_extract_path_text", [{args: [Types.Json<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function jsonObject(a0: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Json<0 | 1>
export function jsonObject(a0: Types.Array<0 | 1, Types.Text<0 | 1>>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Json<0 | 1>
export function jsonObject(...args: unknown[]) {
    return sqlFunction("json_object", [{args: [Types.Array.of(Types.Text<0 | 1>)], ret: Types.Json<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Array.of(Types.Text<0 | 1>), Types.Array.of(Types.Text<0 | 1>)], ret: Types.Json<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function jsonObjectAgg(a0: Types.Any<unknown, number>, a1: Types.Any<unknown, number>): Types.Json<0 | 1>
export function jsonObjectAgg(...args: unknown[]) {
    return sqlFunction("json_object_agg", [{args: [Types.Any<unknown, 0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonObjectAggStrict(a0: Types.Any<unknown, number>, a1: Types.Any<unknown, number>): Types.Json<0 | 1>
export function jsonObjectAggStrict(...args: unknown[]) {
    return sqlFunction("json_object_agg_strict", [{args: [Types.Any<unknown, 0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonObjectAggUnique(a0: Types.Any<unknown, number>, a1: Types.Any<unknown, number>): Types.Json<0 | 1>
export function jsonObjectAggUnique(...args: unknown[]) {
    return sqlFunction("json_object_agg_unique", [{args: [Types.Any<unknown, 0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonObjectAggUniqueStrict(a0: Types.Any<unknown, number>, a1: Types.Any<unknown, number>): Types.Json<0 | 1>
export function jsonObjectAggUniqueStrict(...args: unknown[]) {
    return sqlFunction("json_object_agg_unique_strict", [{args: [Types.Any<unknown, 0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonObjectField(a0: Types.Json<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Json<0 | 1>
export function jsonObjectField(...args: unknown[]) {
    return sqlFunction("json_object_field", [{args: [Types.Json<0 | 1>, Types.Text<0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonObjectFieldText(a0: Types.Json<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function jsonObjectFieldText(...args: unknown[]) {
    return sqlFunction("json_object_field_text", [{args: [Types.Json<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonObjectKeys(a0: Types.Json<0 | 1>): Types.FromItem<{}>
export function jsonObjectKeys(...args: unknown[]) {
    return sqlFunction("json_object_keys", [{args: [Types.Json<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonPopulateRecord<T extends Types.Any>(a0: T, a1: Types.Json<0 | 1>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): T
export function jsonPopulateRecord(...args: unknown[]) {
    return sqlFunction("json_populate_record", [({T}) => ({args: [T, Types.Json<0 | 1>, Types.Bool<0 | 1>], ret: T, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function jsonPopulateRecordset<T extends Types.Any>(a0: T, a1: Types.Json<0 | 1>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.FromItem<{}>
export function jsonPopulateRecordset(...args: unknown[]) {
    return sqlFunction("json_populate_recordset", [({T}) => ({args: [T, Types.Json<0 | 1>, Types.Bool<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function jsonStripNulls(a0: Types.Json<0 | 1>): Types.Json<0 | 1>
export function jsonStripNulls(...args: unknown[]) {
    return sqlFunction("json_strip_nulls", [{args: [Types.Json<0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonToRecord(a0: Types.Json<0 | 1>): Types.Record<0 | 1, {}>
export function jsonToRecord(...args: unknown[]) {
    return sqlFunction("json_to_record", [({R}) => ({args: [Types.Json<0 | 1>], ret: Types.Record.of(R), isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function jsonToRecordset(a0: Types.Json<0 | 1>): Types.FromItem<{}>
export function jsonToRecordset(...args: unknown[]) {
    return sqlFunction("json_to_recordset", [{args: [Types.Json<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonToTsvector(a0: Types.Json<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Tsvector<0 | 1>
export function jsonToTsvector(a0: Types.Regconfig<0 | 1>, a1: Types.Json<0 | 1>, a2: Types.Jsonb<0 | 1>): Types.Tsvector<0 | 1>
export function jsonToTsvector(...args: unknown[]) {
    return sqlFunction("json_to_tsvector", [{args: [Types.Json<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regconfig<0 | 1>, Types.Json<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonTypeof(a0: Types.Json<0 | 1>): Types.Text<0 | 1>
export function jsonTypeof(...args: unknown[]) {
    return sqlFunction("json_typeof", [{args: [Types.Json<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbAgg<T extends Types.Any>(a0: T): Types.Jsonb<0 | 1>
export function jsonbAgg(...args: unknown[]) {
    return sqlFunction("jsonb_agg", [({T}) => ({args: [T], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function jsonbAggStrict<T extends Types.Any>(a0: T): Types.Jsonb<0 | 1>
export function jsonbAggStrict(...args: unknown[]) {
    return sqlFunction("jsonb_agg_strict", [({T}) => ({args: [T], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function jsonbArrayElement(a0: Types.Jsonb<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Jsonb<0 | 1>
export function jsonbArrayElement(...args: unknown[]) {
    return sqlFunction("jsonb_array_element", [{args: [Types.Jsonb<0 | 1>, Types.Int4<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbArrayElementText(a0: Types.Jsonb<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function jsonbArrayElementText(...args: unknown[]) {
    return sqlFunction("jsonb_array_element_text", [{args: [Types.Jsonb<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbArrayElements(a0: Types.Jsonb<0 | 1>): Types.FromItem<{value: Types.Jsonb<0 | 1>}>
export function jsonbArrayElements(...args: unknown[]) {
    return sqlFunction("jsonb_array_elements", [{args: [Types.Jsonb<0 | 1>], ret: Types.FromItem.ofSchema({value: Types.Jsonb<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbArrayElementsText(a0: Types.Jsonb<0 | 1>): Types.FromItem<{value: Types.Text<0 | 1>}>
export function jsonbArrayElementsText(...args: unknown[]) {
    return sqlFunction("jsonb_array_elements_text", [{args: [Types.Jsonb<0 | 1>], ret: Types.FromItem.ofSchema({value: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbArrayLength(a0: Types.Jsonb<0 | 1>): Types.Int4<0 | 1>
export function jsonbArrayLength(...args: unknown[]) {
    return sqlFunction("jsonb_array_length", [{args: [Types.Jsonb<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbBuildArray(): Types.Jsonb<0 | 1>
export function jsonbBuildArray(a0: Types.Any<unknown, 0 | 1>, ...variadic: Types.Any<unknown, 0 | 1>[]): Types.Jsonb<0 | 1>
export function jsonbBuildArray(...args: unknown[]) {
    return sqlFunction("jsonb_build_array", [{args: [], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Any<unknown, 0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function jsonbBuildObject(): Types.Jsonb<0 | 1>
export function jsonbBuildObject(a0: Types.Any<unknown, 0 | 1>, ...variadic: Types.Any<unknown, 0 | 1>[]): Types.Jsonb<0 | 1>
export function jsonbBuildObject(...args: unknown[]) {
    return sqlFunction("jsonb_build_object", [{args: [], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Any<unknown, 0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function jsonbCmp(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Int4<0 | 1>
export function jsonbCmp(...args: unknown[]) {
    return sqlFunction("jsonb_cmp", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbConcat(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Jsonb<0 | 1>
export function jsonbConcat(...args: unknown[]) {
    return sqlFunction("jsonb_concat", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbContained(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
export function jsonbContained(...args: unknown[]) {
    return sqlFunction("jsonb_contained", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbContains(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
export function jsonbContains(...args: unknown[]) {
    return sqlFunction("jsonb_contains", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbDelete(a0: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: Types.Array<0 | 1, Types.Text<0 | 1>>[]): Types.Jsonb<0 | 1>
export function jsonbDelete(a0: Types.Jsonb<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Jsonb<0 | 1>
export function jsonbDelete(a0: Types.Jsonb<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
export function jsonbDelete(...args: unknown[]) {
    return sqlFunction("jsonb_delete", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}, {args: [Types.Jsonb<0 | 1>, Types.Int4<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Jsonb<0 | 1>, Types.Text<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbDeletePath(a0: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
export function jsonbDeletePath(...args: unknown[]) {
    return sqlFunction("jsonb_delete_path", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbEach(a0: Types.Jsonb<0 | 1>): Types.FromItem<{key: Types.Text<0 | 1>, value: Types.Jsonb<0 | 1>}>
export function jsonbEach(...args: unknown[]) {
    return sqlFunction("jsonb_each", [{args: [Types.Jsonb<0 | 1>], ret: Types.FromItem.ofSchema({key: Types.Text<0 | 1>, value: Types.Jsonb<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbEachText(a0: Types.Jsonb<0 | 1>): Types.FromItem<{key: Types.Text<0 | 1>, value: Types.Text<0 | 1>}>
export function jsonbEachText(...args: unknown[]) {
    return sqlFunction("jsonb_each_text", [{args: [Types.Jsonb<0 | 1>], ret: Types.FromItem.ofSchema({key: Types.Text<0 | 1>, value: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbEq(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
export function jsonbEq(...args: unknown[]) {
    return sqlFunction("jsonb_eq", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbExists(a0: Types.Jsonb<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function jsonbExists(...args: unknown[]) {
    return sqlFunction("jsonb_exists", [{args: [Types.Jsonb<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbExistsAll(a0: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function jsonbExistsAll(...args: unknown[]) {
    return sqlFunction("jsonb_exists_all", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbExistsAny(a0: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function jsonbExistsAny(...args: unknown[]) {
    return sqlFunction("jsonb_exists_any", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbExtractPath(a0: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: Types.Array<0 | 1, Types.Text<0 | 1>>[]): Types.Jsonb<0 | 1>
export function jsonbExtractPath(...args: unknown[]) {
    return sqlFunction("jsonb_extract_path", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function jsonbExtractPathText(a0: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: Types.Array<0 | 1, Types.Text<0 | 1>>[]): Types.Text<0 | 1>
export function jsonbExtractPathText(...args: unknown[]) {
    return sqlFunction("jsonb_extract_path_text", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function jsonbGe(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
export function jsonbGe(...args: unknown[]) {
    return sqlFunction("jsonb_ge", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbGt(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
export function jsonbGt(...args: unknown[]) {
    return sqlFunction("jsonb_gt", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbHash(a0: Types.Jsonb<0 | 1>): Types.Int4<0 | 1>
export function jsonbHash(...args: unknown[]) {
    return sqlFunction("jsonb_hash", [{args: [Types.Jsonb<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbHashExtended(a0: Types.Jsonb<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function jsonbHashExtended(...args: unknown[]) {
    return sqlFunction("jsonb_hash_extended", [{args: [Types.Jsonb<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbInsert(a0: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<0 | 1>
export function jsonbInsert(...args: unknown[]) {
    return sqlFunction("jsonb_insert", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>), Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbLe(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
export function jsonbLe(...args: unknown[]) {
    return sqlFunction("jsonb_le", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbLt(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
export function jsonbLt(...args: unknown[]) {
    return sqlFunction("jsonb_lt", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbNe(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
export function jsonbNe(...args: unknown[]) {
    return sqlFunction("jsonb_ne", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbObject(a0: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
export function jsonbObject(a0: Types.Array<0 | 1, Types.Text<0 | 1>>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
export function jsonbObject(...args: unknown[]) {
    return sqlFunction("jsonb_object", [{args: [Types.Array.of(Types.Text<0 | 1>)], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Array.of(Types.Text<0 | 1>), Types.Array.of(Types.Text<0 | 1>)], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbObjectAgg(a0: Types.Any<unknown, number>, a1: Types.Any<unknown, number>): Types.Jsonb<0 | 1>
export function jsonbObjectAgg(...args: unknown[]) {
    return sqlFunction("jsonb_object_agg", [{args: [Types.Any<unknown, 0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbObjectAggStrict(a0: Types.Any<unknown, number>, a1: Types.Any<unknown, number>): Types.Jsonb<0 | 1>
export function jsonbObjectAggStrict(...args: unknown[]) {
    return sqlFunction("jsonb_object_agg_strict", [{args: [Types.Any<unknown, 0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbObjectAggUnique(a0: Types.Any<unknown, number>, a1: Types.Any<unknown, number>): Types.Jsonb<0 | 1>
export function jsonbObjectAggUnique(...args: unknown[]) {
    return sqlFunction("jsonb_object_agg_unique", [{args: [Types.Any<unknown, 0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbObjectAggUniqueStrict(a0: Types.Any<unknown, number>, a1: Types.Any<unknown, number>): Types.Jsonb<0 | 1>
export function jsonbObjectAggUniqueStrict(...args: unknown[]) {
    return sqlFunction("jsonb_object_agg_unique_strict", [{args: [Types.Any<unknown, 0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbObjectField(a0: Types.Jsonb<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
export function jsonbObjectField(...args: unknown[]) {
    return sqlFunction("jsonb_object_field", [{args: [Types.Jsonb<0 | 1>, Types.Text<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbObjectFieldText(a0: Types.Jsonb<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function jsonbObjectFieldText(...args: unknown[]) {
    return sqlFunction("jsonb_object_field_text", [{args: [Types.Jsonb<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbObjectKeys(a0: Types.Jsonb<0 | 1>): Types.FromItem<{}>
export function jsonbObjectKeys(...args: unknown[]) {
    return sqlFunction("jsonb_object_keys", [{args: [Types.Jsonb<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbPathExists(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function jsonbPathExists(...args: unknown[]) {
    return sqlFunction("jsonb_path_exists", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>, Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbPathExistsOpr(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>): Types.Bool<0 | 1>
export function jsonbPathExistsOpr(...args: unknown[]) {
    return sqlFunction("jsonb_path_exists_opr", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbPathExistsTz(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function jsonbPathExistsTz(...args: unknown[]) {
    return sqlFunction("jsonb_path_exists_tz", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>, Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbPathMatch(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function jsonbPathMatch(...args: unknown[]) {
    return sqlFunction("jsonb_path_match", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>, Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbPathMatchOpr(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>): Types.Bool<0 | 1>
export function jsonbPathMatchOpr(...args: unknown[]) {
    return sqlFunction("jsonb_path_match_opr", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbPathMatchTz(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function jsonbPathMatchTz(...args: unknown[]) {
    return sqlFunction("jsonb_path_match_tz", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>, Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbPathQuery(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.FromItem<{}>
export function jsonbPathQuery(...args: unknown[]) {
    return sqlFunction("jsonb_path_query", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>, Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbPathQueryArray(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<0 | 1>
export function jsonbPathQueryArray(...args: unknown[]) {
    return sqlFunction("jsonb_path_query_array", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>, Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbPathQueryArrayTz(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<0 | 1>
export function jsonbPathQueryArrayTz(...args: unknown[]) {
    return sqlFunction("jsonb_path_query_array_tz", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>, Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbPathQueryFirst(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<0 | 1>
export function jsonbPathQueryFirst(...args: unknown[]) {
    return sqlFunction("jsonb_path_query_first", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>, Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbPathQueryFirstTz(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<0 | 1>
export function jsonbPathQueryFirstTz(...args: unknown[]) {
    return sqlFunction("jsonb_path_query_first_tz", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>, Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbPathQueryTz(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.FromItem<{}>
export function jsonbPathQueryTz(...args: unknown[]) {
    return sqlFunction("jsonb_path_query_tz", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>, Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbPopulateRecord<T extends Types.Any>(a0: T, a1: Types.Jsonb<0 | 1>): T
export function jsonbPopulateRecord(...args: unknown[]) {
    return sqlFunction("jsonb_populate_record", [({T}) => ({args: [T, Types.Jsonb<0 | 1>], ret: T, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function jsonbPopulateRecordValid<T extends Types.Any>(a0: T, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
export function jsonbPopulateRecordValid(...args: unknown[]) {
    return sqlFunction("jsonb_populate_record_valid", [({T}) => ({args: [T, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function jsonbPopulateRecordset<T extends Types.Any>(a0: T, a1: Types.Jsonb<0 | 1>): Types.FromItem<{}>
export function jsonbPopulateRecordset(...args: unknown[]) {
    return sqlFunction("jsonb_populate_recordset", [({T}) => ({args: [T, Types.Jsonb<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function jsonbPretty(a0: Types.Jsonb<0 | 1>): Types.Text<0 | 1>
export function jsonbPretty(...args: unknown[]) {
    return sqlFunction("jsonb_pretty", [{args: [Types.Jsonb<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbSet(a0: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<0 | 1>
export function jsonbSet(...args: unknown[]) {
    return sqlFunction("jsonb_set", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>), Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbSetLax(a0: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
export function jsonbSetLax(...args: unknown[]) {
    return sqlFunction("jsonb_set_lax", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>), Types.Jsonb<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbStripNulls(a0: Types.Jsonb<0 | 1>): Types.Jsonb<0 | 1>
export function jsonbStripNulls(...args: unknown[]) {
    return sqlFunction("jsonb_strip_nulls", [{args: [Types.Jsonb<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbToRecord(a0: Types.Jsonb<0 | 1>): Types.Record<0 | 1, {}>
export function jsonbToRecord(...args: unknown[]) {
    return sqlFunction("jsonb_to_record", [({R}) => ({args: [Types.Jsonb<0 | 1>], ret: Types.Record.of(R), isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function jsonbToRecordset(a0: Types.Jsonb<0 | 1>): Types.FromItem<{}>
export function jsonbToRecordset(...args: unknown[]) {
    return sqlFunction("jsonb_to_recordset", [{args: [Types.Jsonb<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbToTsvector(a0: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Tsvector<0 | 1>
export function jsonbToTsvector(a0: Types.Regconfig<0 | 1>, a1: Types.Jsonb<0 | 1>, a2: Types.Jsonb<0 | 1>): Types.Tsvector<0 | 1>
export function jsonbToTsvector(...args: unknown[]) {
    return sqlFunction("jsonb_to_tsvector", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regconfig<0 | 1>, Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function jsonbTypeof(a0: Types.Jsonb<0 | 1>): Types.Text<0 | 1>
export function jsonbTypeof(...args: unknown[]) {
    return sqlFunction("jsonb_typeof", [{args: [Types.Jsonb<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function justifyDays(a0: Types.Interval<0 | 1>): Types.Interval<0 | 1>
export function justifyDays(...args: unknown[]) {
    return sqlFunction("justify_days", [{args: [Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function justifyHours(a0: Types.Interval<0 | 1>): Types.Interval<0 | 1>
export function justifyHours(...args: unknown[]) {
    return sqlFunction("justify_hours", [{args: [Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function justifyInterval(a0: Types.Interval<0 | 1>): Types.Interval<0 | 1>
export function justifyInterval(...args: unknown[]) {
    return sqlFunction("justify_interval", [{args: [Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lag<T extends Types.Any>(a0: T, a1: Types.Int4<0 | 1>, a2: T): T
export function lag<T extends Types.Any>(a0: T): T
export function lag<T extends Types.Any>(a0: T, a1: Types.Int4<0 | 1>): T
export function lag(...args: unknown[]) {
    return sqlFunction("lag", [({T}) => ({args: [T, Types.Int4<0 | 1>, T], ret: T, isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [T], ret: T, isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [T, Types.Int4<0 | 1>], ret: T, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function lastValue<T extends Types.Any>(a0: T): T
export function lastValue(...args: unknown[]) {
    return sqlFunction("last_value", [({T}) => ({args: [T], ret: T, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function lastval(): Types.Int8<0 | 1>
export function lastval(...args: unknown[]) {
    return sqlFunction("lastval", [{args: [], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lcm(a0: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int4<0 | 1>
export function lcm(a0: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
export function lcm(a0: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
export function lcm(...args: unknown[]) {
    return sqlFunction("lcm", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lead<T extends Types.Any>(a0: T, a1: Types.Int4<0 | 1>, a2: T): T
export function lead<T extends Types.Any>(a0: T): T
export function lead<T extends Types.Any>(a0: T, a1: Types.Int4<0 | 1>): T
export function lead(...args: unknown[]) {
    return sqlFunction("lead", [({T}) => ({args: [T, Types.Int4<0 | 1>, T], ret: T, isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [T], ret: T, isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [T, Types.Int4<0 | 1>], ret: T, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function left(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function left(...args: unknown[]) {
    return sqlFunction("left", [{args: [Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function length(a0: Types.Lseg<0 | 1>): Types.Float8<0 | 1>
export function length(a0: Types.Path<0 | 1>): Types.Float8<0 | 1>
export function length(a0: Types.Bit<0 | 1>): Types.Int4<0 | 1>
export function length(a0: Types.Bpchar<0 | 1>): Types.Int4<0 | 1>
export function length(a0: Types.Bytea<0 | 1>): Types.Int4<0 | 1>
export function length(a0: Types.Bytea<0 | 1>, a1: Types.Name<0 | 1>): Types.Int4<0 | 1>
export function length(a0: Types.Text<0 | 1>): Types.Int4<0 | 1>
export function length(a0: Types.Tsvector<0 | 1>): Types.Int4<0 | 1>
export function length(...args: unknown[]) {
    return sqlFunction("length", [{args: [Types.Lseg<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Path<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Bit<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Bpchar<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Bytea<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Bytea<0 | 1>, Types.Name<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Tsvector<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function like(a0: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
export function like(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function like(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function like(...args: unknown[]) {
    return sqlFunction("like", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function likeEscape(a0: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bytea<0 | 1>
export function likeEscape(a0: Types.Text<0 | 1>, a1: Types.Text<0 | 1>): Types.Text<0 | 1>
export function likeEscape(...args: unknown[]) {
    return sqlFunction("like_escape", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function line(a0: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Line<0 | 1>
export function line(...args: unknown[]) {
    return sqlFunction("line", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Line<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lineDistance(a0: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Float8<0 | 1>
export function lineDistance(...args: unknown[]) {
    return sqlFunction("line_distance", [{args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lineEq(a0: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
export function lineEq(...args: unknown[]) {
    return sqlFunction("line_eq", [{args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lineHorizontal(a0: Types.Line<0 | 1>): Types.Bool<0 | 1>
export function lineHorizontal(...args: unknown[]) {
    return sqlFunction("line_horizontal", [{args: [Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lineInterpt(a0: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Point<0 | 1>
export function lineInterpt(...args: unknown[]) {
    return sqlFunction("line_interpt", [{args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lineIntersect(a0: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
export function lineIntersect(...args: unknown[]) {
    return sqlFunction("line_intersect", [{args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lineParallel(a0: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
export function lineParallel(...args: unknown[]) {
    return sqlFunction("line_parallel", [{args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function linePerp(a0: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
export function linePerp(...args: unknown[]) {
    return sqlFunction("line_perp", [{args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lineVertical(a0: Types.Line<0 | 1>): Types.Bool<0 | 1>
export function lineVertical(...args: unknown[]) {
    return sqlFunction("line_vertical", [{args: [Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function ln(a0: Types.Float8<0 | 1>): Types.Float8<0 | 1>
export function ln(a0: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
export function ln(...args: unknown[]) {
    return sqlFunction("ln", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function loClose(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function loClose(...args: unknown[]) {
    return sqlFunction("lo_close", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function loCreat(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Oid<0 | 1>
export function loCreat(...args: unknown[]) {
    return sqlFunction("lo_creat", [{args: [Types.Int4<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function loCreate(a0: Types.Oid<0 | 1>): Types.Oid<0 | 1>
export function loCreate(...args: unknown[]) {
    return sqlFunction("lo_create", [{args: [Types.Oid<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function loExport(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
export function loExport(...args: unknown[]) {
    return sqlFunction("lo_export", [{args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function loFromBytea(a0: Types.Oid<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Oid<0 | 1>
export function loFromBytea(...args: unknown[]) {
    return sqlFunction("lo_from_bytea", [{args: [Types.Oid<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function loGet(a0: Types.Oid<0 | 1>): Types.Bytea<0 | 1>
export function loGet(a0: Types.Oid<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
export function loGet(...args: unknown[]) {
    return sqlFunction("lo_get", [{args: [Types.Oid<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function loImport(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Oid<0 | 1>
export function loImport(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Oid<0 | 1>): Types.Oid<0 | 1>
export function loImport(...args: unknown[]) {
    return sqlFunction("lo_import", [{args: [Types.Text<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Oid<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function loLseek(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function loLseek(...args: unknown[]) {
    return sqlFunction("lo_lseek", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function loLseek64(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
export function loLseek64(...args: unknown[]) {
    return sqlFunction("lo_lseek64", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function loOpen(a0: Types.Oid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function loOpen(...args: unknown[]) {
    return sqlFunction("lo_open", [{args: [Types.Oid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function loPut(a0: Types.Oid<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Bytea<0 | 1>): Types.Void<0 | 1>
export function loPut(...args: unknown[]) {
    return sqlFunction("lo_put", [{args: [Types.Oid<0 | 1>, Types.Int8<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function loTell(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function loTell(...args: unknown[]) {
    return sqlFunction("lo_tell", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function loTell64(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int8<0 | 1>
export function loTell64(...args: unknown[]) {
    return sqlFunction("lo_tell64", [{args: [Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function loTruncate(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function loTruncate(...args: unknown[]) {
    return sqlFunction("lo_truncate", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function loTruncate64(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<0 | 1>
export function loTruncate64(...args: unknown[]) {
    return sqlFunction("lo_truncate64", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function loUnlink(a0: Types.Oid<0 | 1>): Types.Int4<0 | 1>
export function loUnlink(...args: unknown[]) {
    return sqlFunction("lo_unlink", [{args: [Types.Oid<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function log(a0: Types.Float8<0 | 1>): Types.Float8<0 | 1>
export function log(a0: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
export function log(a0: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
export function log(...args: unknown[]) {
    return sqlFunction("log", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function log10(a0: Types.Float8<0 | 1>): Types.Float8<0 | 1>
export function log10(a0: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
export function log10(...args: unknown[]) {
    return sqlFunction("log10", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function loread(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
export function loread(...args: unknown[]) {
    return sqlFunction("loread", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lower<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>): T
export function lower<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>): T
export function lower(a0: Types.Text<0 | 1>): Types.Text<0 | 1>
export function lower(...args: unknown[]) {
    return sqlFunction("lower", [({T}) => ({args: [Types.Anymultirange], ret: T, isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [Types.Anyrange], ret: T, isOperator: false, isReserved: false, isVariadic: false}), {args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lowerInc<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function lowerInc<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function lowerInc(...args: unknown[]) {
    return sqlFunction("lower_inc", [{args: [Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lowerInf<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function lowerInf<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function lowerInf(...args: unknown[]) {
    return sqlFunction("lower_inf", [{args: [Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lowrite(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Bytea<0 | 1>): Types.Int4<0 | 1>
export function lowrite(...args: unknown[]) {
    return sqlFunction("lowrite", [{args: [Types.Int4<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lpad(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function lpad(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function lpad(...args: unknown[]) {
    return sqlFunction("lpad", [{args: [Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lseg(a0: Types.Box<0 | 1>): Types.Lseg<0 | 1>
export function lseg(a0: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Lseg<0 | 1>
export function lseg(...args: unknown[]) {
    return sqlFunction("lseg", [{args: [Types.Box<0 | 1>], ret: Types.Lseg<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Lseg<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lsegCenter(a0: Types.Lseg<0 | 1>): Types.Point<0 | 1>
export function lsegCenter(...args: unknown[]) {
    return sqlFunction("lseg_center", [{args: [Types.Lseg<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lsegDistance(a0: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Float8<0 | 1>
export function lsegDistance(...args: unknown[]) {
    return sqlFunction("lseg_distance", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lsegEq(a0: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
export function lsegEq(...args: unknown[]) {
    return sqlFunction("lseg_eq", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lsegGe(a0: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
export function lsegGe(...args: unknown[]) {
    return sqlFunction("lseg_ge", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lsegGt(a0: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
export function lsegGt(...args: unknown[]) {
    return sqlFunction("lseg_gt", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lsegHorizontal(a0: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
export function lsegHorizontal(...args: unknown[]) {
    return sqlFunction("lseg_horizontal", [{args: [Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lsegInterpt(a0: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Point<0 | 1>
export function lsegInterpt(...args: unknown[]) {
    return sqlFunction("lseg_interpt", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lsegIntersect(a0: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
export function lsegIntersect(...args: unknown[]) {
    return sqlFunction("lseg_intersect", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lsegLe(a0: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
export function lsegLe(...args: unknown[]) {
    return sqlFunction("lseg_le", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lsegLength(a0: Types.Lseg<0 | 1>): Types.Float8<0 | 1>
export function lsegLength(...args: unknown[]) {
    return sqlFunction("lseg_length", [{args: [Types.Lseg<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lsegLt(a0: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
export function lsegLt(...args: unknown[]) {
    return sqlFunction("lseg_lt", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lsegNe(a0: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
export function lsegNe(...args: unknown[]) {
    return sqlFunction("lseg_ne", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lsegParallel(a0: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
export function lsegParallel(...args: unknown[]) {
    return sqlFunction("lseg_parallel", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lsegPerp(a0: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
export function lsegPerp(...args: unknown[]) {
    return sqlFunction("lseg_perp", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function lsegVertical(a0: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
export function lsegVertical(...args: unknown[]) {
    return sqlFunction("lseg_vertical", [{args: [Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function ltrim(a0: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bytea<0 | 1>
export function ltrim(a0: Types.Text<0 | 1>): Types.Text<0 | 1>
export function ltrim(a0: Types.Text<0 | 1>, a1: Types.Text<0 | 1>): Types.Text<0 | 1>
export function ltrim(...args: unknown[]) {
    return sqlFunction("ltrim", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddr(a0: Types.Macaddr8<0 | 1>): Types.Macaddr<0 | 1>
export function macaddr(...args: unknown[]) {
    return sqlFunction("macaddr", [{args: [Types.Macaddr8<0 | 1>], ret: Types.Macaddr<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddr8(a0: Types.Macaddr<0 | 1>): Types.Macaddr8<0 | 1>
export function macaddr8(...args: unknown[]) {
    return sqlFunction("macaddr8", [{args: [Types.Macaddr<0 | 1>], ret: Types.Macaddr8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddr8And(a0: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Macaddr8<0 | 1>
export function macaddr8And(...args: unknown[]) {
    return sqlFunction("macaddr8_and", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Macaddr8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddr8Cmp(a0: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Int4<0 | 1>
export function macaddr8Cmp(...args: unknown[]) {
    return sqlFunction("macaddr8_cmp", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddr8Eq(a0: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
export function macaddr8Eq(...args: unknown[]) {
    return sqlFunction("macaddr8_eq", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddr8Ge(a0: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
export function macaddr8Ge(...args: unknown[]) {
    return sqlFunction("macaddr8_ge", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddr8Gt(a0: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
export function macaddr8Gt(...args: unknown[]) {
    return sqlFunction("macaddr8_gt", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddr8Le(a0: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
export function macaddr8Le(...args: unknown[]) {
    return sqlFunction("macaddr8_le", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddr8Lt(a0: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
export function macaddr8Lt(...args: unknown[]) {
    return sqlFunction("macaddr8_lt", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddr8Ne(a0: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Bool<0 | 1>
export function macaddr8Ne(...args: unknown[]) {
    return sqlFunction("macaddr8_ne", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddr8Not(a0: Types.Macaddr8<0 | 1>): Types.Macaddr8<0 | 1>
export function macaddr8Not(...args: unknown[]) {
    return sqlFunction("macaddr8_not", [{args: [Types.Macaddr8<0 | 1>], ret: Types.Macaddr8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddr8Or(a0: Types.Macaddr8<0 | 1>, a1: Types.Macaddr8<0 | 1>): Types.Macaddr8<0 | 1>
export function macaddr8Or(...args: unknown[]) {
    return sqlFunction("macaddr8_or", [{args: [Types.Macaddr8<0 | 1>, Types.Macaddr8<0 | 1>], ret: Types.Macaddr8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddr8Set7Bit(a0: Types.Macaddr8<0 | 1>): Types.Macaddr8<0 | 1>
export function macaddr8Set7Bit(...args: unknown[]) {
    return sqlFunction("macaddr8_set7bit", [{args: [Types.Macaddr8<0 | 1>], ret: Types.Macaddr8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddrAnd(a0: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Macaddr<0 | 1>
export function macaddrAnd(...args: unknown[]) {
    return sqlFunction("macaddr_and", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Macaddr<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddrCmp(a0: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Int4<0 | 1>
export function macaddrCmp(...args: unknown[]) {
    return sqlFunction("macaddr_cmp", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddrEq(a0: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
export function macaddrEq(...args: unknown[]) {
    return sqlFunction("macaddr_eq", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddrGe(a0: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
export function macaddrGe(...args: unknown[]) {
    return sqlFunction("macaddr_ge", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddrGt(a0: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
export function macaddrGt(...args: unknown[]) {
    return sqlFunction("macaddr_gt", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddrLe(a0: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
export function macaddrLe(...args: unknown[]) {
    return sqlFunction("macaddr_le", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddrLt(a0: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
export function macaddrLt(...args: unknown[]) {
    return sqlFunction("macaddr_lt", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddrNe(a0: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Bool<0 | 1>
export function macaddrNe(...args: unknown[]) {
    return sqlFunction("macaddr_ne", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddrNot(a0: Types.Macaddr<0 | 1>): Types.Macaddr<0 | 1>
export function macaddrNot(...args: unknown[]) {
    return sqlFunction("macaddr_not", [{args: [Types.Macaddr<0 | 1>], ret: Types.Macaddr<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function macaddrOr(a0: Types.Macaddr<0 | 1>, a1: Types.Macaddr<0 | 1>): Types.Macaddr<0 | 1>
export function macaddrOr(...args: unknown[]) {
    return sqlFunction("macaddr_or", [{args: [Types.Macaddr<0 | 1>, Types.Macaddr<0 | 1>], ret: Types.Macaddr<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function makeDate(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Date<0 | 1>
export function makeDate(...args: unknown[]) {
    return sqlFunction("make_date", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Date<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function makeInterval(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a6: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Interval<0 | 1>
export function makeInterval(...args: unknown[]) {
    return sqlFunction("make_interval", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function makeTime(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Time<0 | 1>
export function makeTime(...args: unknown[]) {
    return sqlFunction("make_time", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function makeTimestamp(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Timestamp<0 | 1>
export function makeTimestamp(...args: unknown[]) {
    return sqlFunction("make_timestamp", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function makeTimestamptz(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Timestamptz<0 | 1>
export function makeTimestamptz(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a6: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Timestamptz<0 | 1>
export function makeTimestamptz(...args: unknown[]) {
    return sqlFunction("make_timestamptz", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Float8<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Float8<0 | 1>, Types.Text<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function makeaclitem(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Aclitem<0 | 1>
export function makeaclitem(...args: unknown[]) {
    return sqlFunction("makeaclitem", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.Aclitem<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function masklen(a0: Types.Inet<0 | 1>): Types.Int4<0 | 1>
export function masklen(...args: unknown[]) {
    return sqlFunction("masklen", [{args: [Types.Inet<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function max<T extends Types.Any>(a0: Types.Array<number, T>): Types.Array<0 | 1, T>
export function max<T extends Types.Any>(a0: T): T
export function max(a0: Types.Bpchar<number>): Types.Bpchar<0 | 1>
export function max(a0: Types.Date<number>): Types.Date<0 | 1>
export function max(a0: Types.Float4<number>): Types.Float4<0 | 1>
export function max(a0: Types.Float8<number>): Types.Float8<0 | 1>
export function max(a0: Types.Inet<number>): Types.Inet<0 | 1>
export function max(a0: Types.Int2<number>): Types.Int2<0 | 1>
export function max(a0: Types.Int4<number>): Types.Int4<0 | 1>
export function max(a0: Types.Int8<number>): Types.Int8<0 | 1>
export function max(a0: Types.Interval<number>): Types.Interval<0 | 1>
export function max(a0: Types.Money<number>): Types.Money<0 | 1>
export function max(a0: Types.Numeric<number>): Types.Numeric<0 | 1>
export function max(a0: Types.Oid<number>): Types.Oid<0 | 1>
export function max(a0: Types.PgLsn<number>): Types.PgLsn<0 | 1>
export function max(a0: Types.Text<number>): Types.Text<0 | 1>
export function max(a0: Types.Tid<number>): Types.Tid<0 | 1>
export function max(a0: Types.Time<number>): Types.Time<0 | 1>
export function max(a0: Types.Timestamp<number>): Types.Timestamp<0 | 1>
export function max(a0: Types.Timestamptz<number>): Types.Timestamptz<0 | 1>
export function max(a0: Types.Timetz<number>): Types.Timetz<0 | 1>
export function max(a0: Types.Xid8<number>): Types.Xid8<0 | 1>
export function max(...args: unknown[]) {
    return sqlFunction("max", [({T}) => ({args: [Types.Array.of(T)], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [T], ret: T, isOperator: false, isReserved: false, isVariadic: false}), {args: [Types.Bpchar<0 | 1>], ret: Types.Bpchar<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>], ret: Types.Date<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.PgLsn<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Tid<0 | 1>], ret: Types.Tid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Time<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timetz<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Xid8<0 | 1>], ret: Types.Xid8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function md5(a0: Types.Bytea<0 | 1>): Types.Text<0 | 1>
export function md5(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function md5(...args: unknown[]) {
    return sqlFunction("md5", [{args: [Types.Bytea<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function minScale(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Int4<0 | 1>
export function minScale(...args: unknown[]) {
    return sqlFunction("min_scale", [{args: [Types.Numeric<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function mod(a0: Types.Int2<0 | 1>, a1: Types.Int2<0 | 1>): Types.Int2<0 | 1>
export function mod(a0: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int4<0 | 1>
export function mod(a0: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
export function mod(a0: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
export function mod(...args: unknown[]) {
    return sqlFunction("mod", [{args: [Types.Int2<0 | 1>, Types.Int2<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function mode<T extends Types.Any>(a0: T): T
export function mode(...args: unknown[]) {
    return sqlFunction("mode", [({T}) => ({args: [T], ret: T, isOperator: false, isReserved: true, isVariadic: false})], args);
}

export function money(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Money<0 | 1>
export function money(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Money<0 | 1>
export function money(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Money<0 | 1>
export function money(...args: unknown[]) {
    return sqlFunction("money", [{args: [Types.Int4<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function mulDInterval(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Interval<0 | 1>): Types.Interval<0 | 1>
export function mulDInterval(...args: unknown[]) {
    return sqlFunction("mul_d_interval", [{args: [Types.Float8<0 | 1>, Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirange<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>): Types.Anymultirange<0 | 1, T>
export function multirange(...args: unknown[]) {
    return sqlFunction("multirange", [{args: [Types.Anyrange], ret: Types.Anymultirange, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeAdjacentMultirange<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeAdjacentMultirange(...args: unknown[]) {
    return sqlFunction("multirange_adjacent_multirange", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeAdjacentRange<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeAdjacentRange(...args: unknown[]) {
    return sqlFunction("multirange_adjacent_range", [{args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeAfterMultirange<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeAfterMultirange(...args: unknown[]) {
    return sqlFunction("multirange_after_multirange", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeAfterRange<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeAfterRange(...args: unknown[]) {
    return sqlFunction("multirange_after_range", [{args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeBeforeMultirange<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeBeforeMultirange(...args: unknown[]) {
    return sqlFunction("multirange_before_multirange", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeBeforeRange<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeBeforeRange(...args: unknown[]) {
    return sqlFunction("multirange_before_range", [{args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeCmp<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Int4<0 | 1>
export function multirangeCmp(...args: unknown[]) {
    return sqlFunction("multirange_cmp", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeContainedByMultirange<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeContainedByMultirange(...args: unknown[]) {
    return sqlFunction("multirange_contained_by_multirange", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeContainedByRange<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeContainedByRange(...args: unknown[]) {
    return sqlFunction("multirange_contained_by_range", [{args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeContainsElem<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: T): Types.Bool<0 | 1>
export function multirangeContainsElem(...args: unknown[]) {
    return sqlFunction("multirange_contains_elem", [({T}) => ({args: [Types.Anymultirange, T], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function multirangeContainsMultirange<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeContainsMultirange(...args: unknown[]) {
    return sqlFunction("multirange_contains_multirange", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeContainsRange<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeContainsRange(...args: unknown[]) {
    return sqlFunction("multirange_contains_range", [{args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeEq<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeEq(...args: unknown[]) {
    return sqlFunction("multirange_eq", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeGe<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeGe(...args: unknown[]) {
    return sqlFunction("multirange_ge", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeGt<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeGt(...args: unknown[]) {
    return sqlFunction("multirange_gt", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeIntersect<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Anymultirange<0 | 1, T>
export function multirangeIntersect(...args: unknown[]) {
    return sqlFunction("multirange_intersect", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Anymultirange, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeIntersectAggTransfn<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Anymultirange<0 | 1, T>
export function multirangeIntersectAggTransfn(...args: unknown[]) {
    return sqlFunction("multirange_intersect_agg_transfn", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Anymultirange, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeLe<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeLe(...args: unknown[]) {
    return sqlFunction("multirange_le", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeLt<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeLt(...args: unknown[]) {
    return sqlFunction("multirange_lt", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeMinus<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Anymultirange<0 | 1, T>
export function multirangeMinus(...args: unknown[]) {
    return sqlFunction("multirange_minus", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Anymultirange, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeNe<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeNe(...args: unknown[]) {
    return sqlFunction("multirange_ne", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeOverlapsMultirange<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeOverlapsMultirange(...args: unknown[]) {
    return sqlFunction("multirange_overlaps_multirange", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeOverlapsRange<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeOverlapsRange(...args: unknown[]) {
    return sqlFunction("multirange_overlaps_range", [{args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeOverleftMultirange<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeOverleftMultirange(...args: unknown[]) {
    return sqlFunction("multirange_overleft_multirange", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeOverleftRange<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeOverleftRange(...args: unknown[]) {
    return sqlFunction("multirange_overleft_range", [{args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeOverrightMultirange<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeOverrightMultirange(...args: unknown[]) {
    return sqlFunction("multirange_overright_multirange", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeOverrightRange<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function multirangeOverrightRange(...args: unknown[]) {
    return sqlFunction("multirange_overright_range", [{args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function multirangeUnion<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Anymultirange<0 | 1, T>
export function multirangeUnion(...args: unknown[]) {
    return sqlFunction("multirange_union", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Anymultirange, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function mxidAge(a0: Types.Xid<0 | 1>): Types.Int4<0 | 1>
export function mxidAge(...args: unknown[]) {
    return sqlFunction("mxid_age", [{args: [Types.Xid<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function name(a0: Types.Bpchar<0 | 1>): Types.Name<0 | 1>
export function name(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Name<0 | 1>
export function name(a0: Types.Varchar<0 | 1>): Types.Name<0 | 1>
export function name(...args: unknown[]) {
    return sqlFunction("name", [{args: [Types.Bpchar<0 | 1>], ret: Types.Name<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.Name<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Varchar<0 | 1>], ret: Types.Name<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function nameconcatoid(a0: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>): Types.Name<0 | 1>
export function nameconcatoid(...args: unknown[]) {
    return sqlFunction("nameconcatoid", [{args: [Types.Name<0 | 1>, Types.Oid<0 | 1>], ret: Types.Name<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function nameeq(a0: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
export function nameeq(...args: unknown[]) {
    return sqlFunction("nameeq", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function nameeqtext(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function nameeqtext(...args: unknown[]) {
    return sqlFunction("nameeqtext", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function namege(a0: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
export function namege(...args: unknown[]) {
    return sqlFunction("namege", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function namegetext(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function namegetext(...args: unknown[]) {
    return sqlFunction("namegetext", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function namegt(a0: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
export function namegt(...args: unknown[]) {
    return sqlFunction("namegt", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function namegttext(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function namegttext(...args: unknown[]) {
    return sqlFunction("namegttext", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function nameiclike(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function nameiclike(...args: unknown[]) {
    return sqlFunction("nameiclike", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function nameicnlike(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function nameicnlike(...args: unknown[]) {
    return sqlFunction("nameicnlike", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function nameicregexeq(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function nameicregexeq(...args: unknown[]) {
    return sqlFunction("nameicregexeq", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function nameicregexne(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function nameicregexne(...args: unknown[]) {
    return sqlFunction("nameicregexne", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function namele(a0: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
export function namele(...args: unknown[]) {
    return sqlFunction("namele", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function nameletext(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function nameletext(...args: unknown[]) {
    return sqlFunction("nameletext", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function namelike(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function namelike(...args: unknown[]) {
    return sqlFunction("namelike", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function namelt(a0: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
export function namelt(...args: unknown[]) {
    return sqlFunction("namelt", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function namelttext(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function namelttext(...args: unknown[]) {
    return sqlFunction("namelttext", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function namene(a0: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
export function namene(...args: unknown[]) {
    return sqlFunction("namene", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function namenetext(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function namenetext(...args: unknown[]) {
    return sqlFunction("namenetext", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function namenlike(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function namenlike(...args: unknown[]) {
    return sqlFunction("namenlike", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function nameregexeq(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function nameregexeq(...args: unknown[]) {
    return sqlFunction("nameregexeq", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function nameregexne(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function nameregexne(...args: unknown[]) {
    return sqlFunction("nameregexne", [{args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function netmask(a0: Types.Inet<0 | 1>): Types.Inet<0 | 1>
export function netmask(...args: unknown[]) {
    return sqlFunction("netmask", [{args: [Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function network(a0: Types.Inet<0 | 1>): Types.Cidr<0 | 1>
export function network(...args: unknown[]) {
    return sqlFunction("network", [{args: [Types.Inet<0 | 1>], ret: Types.Cidr<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function networkCmp(a0: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Int4<0 | 1>
export function networkCmp(...args: unknown[]) {
    return sqlFunction("network_cmp", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function networkEq(a0: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
export function networkEq(...args: unknown[]) {
    return sqlFunction("network_eq", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function networkGe(a0: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
export function networkGe(...args: unknown[]) {
    return sqlFunction("network_ge", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function networkGt(a0: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
export function networkGt(...args: unknown[]) {
    return sqlFunction("network_gt", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function networkLarger(a0: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Inet<0 | 1>
export function networkLarger(...args: unknown[]) {
    return sqlFunction("network_larger", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function networkLe(a0: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
export function networkLe(...args: unknown[]) {
    return sqlFunction("network_le", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function networkLt(a0: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
export function networkLt(...args: unknown[]) {
    return sqlFunction("network_lt", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function networkNe(a0: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
export function networkNe(...args: unknown[]) {
    return sqlFunction("network_ne", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function networkOverlap(a0: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
export function networkOverlap(...args: unknown[]) {
    return sqlFunction("network_overlap", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function networkSmaller(a0: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Inet<0 | 1>
export function networkSmaller(...args: unknown[]) {
    return sqlFunction("network_smaller", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function networkSub(a0: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
export function networkSub(...args: unknown[]) {
    return sqlFunction("network_sub", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function networkSubeq(a0: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
export function networkSubeq(...args: unknown[]) {
    return sqlFunction("network_subeq", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function networkSup(a0: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
export function networkSup(...args: unknown[]) {
    return sqlFunction("network_sup", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function networkSupeq(a0: Types.Inet<0 | 1>, a1: Types.Inet<0 | 1>): Types.Bool<0 | 1>
export function networkSupeq(...args: unknown[]) {
    return sqlFunction("network_supeq", [{args: [Types.Inet<0 | 1>, Types.Inet<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function nextval(a0: Types.Regclass<0 | 1>): Types.Int8<0 | 1>
export function nextval(...args: unknown[]) {
    return sqlFunction("nextval", [{args: [Types.Regclass<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function normalize(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function normalize(...args: unknown[]) {
    return sqlFunction("normalize", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function notlike(a0: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bool<0 | 1>
export function notlike(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function notlike(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function notlike(...args: unknown[]) {
    return sqlFunction("notlike", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function now(): Types.Timestamptz<0 | 1>
export function now(...args: unknown[]) {
    return sqlFunction("now", [{args: [], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function npoints(a0: Types.Path<0 | 1>): Types.Int4<0 | 1>
export function npoints(a0: Types.Polygon<0 | 1>): Types.Int4<0 | 1>
export function npoints(...args: unknown[]) {
    return sqlFunction("npoints", [{args: [Types.Path<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Polygon<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function nthValue<T extends Types.Any>(a0: T, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): T
export function nthValue(...args: unknown[]) {
    return sqlFunction("nth_value", [({T}) => ({args: [T, Types.Int4<0 | 1>], ret: T, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function ntile(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function ntile(...args: unknown[]) {
    return sqlFunction("ntile", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numNonnulls(a0: Types.Any<unknown, 0 | 1>, ...variadic: Types.Any<unknown, 0 | 1>[]): Types.Int4<0 | 1>
export function numNonnulls(...args: unknown[]) {
    return sqlFunction("num_nonnulls", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function numNulls(a0: Types.Any<unknown, 0 | 1>, ...variadic: Types.Any<unknown, 0 | 1>[]): Types.Int4<0 | 1>
export function numNulls(...args: unknown[]) {
    return sqlFunction("num_nulls", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function numeric(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>): Types.Numeric<0 | 1>
export function numeric(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Numeric<0 | 1>
export function numeric(a0: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>): Types.Numeric<0 | 1>
export function numeric(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Numeric<0 | 1>
export function numeric(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Numeric<0 | 1>
export function numeric(a0: Types.Jsonb<0 | 1>): Types.Numeric<0 | 1>
export function numeric(a0: Types.Money<0 | 1>): Types.Numeric<0 | 1>
export function numeric(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Numeric<0 | 1>
export function numeric(...args: unknown[]) {
    return sqlFunction("numeric", [{args: [Types.Float4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Float8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Int2<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Jsonb<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Money<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function numericAbs(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
export function numericAbs(...args: unknown[]) {
    return sqlFunction("numeric_abs", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericAdd(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
export function numericAdd(...args: unknown[]) {
    return sqlFunction("numeric_add", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericCmp(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Int4<0 | 1>
export function numericCmp(...args: unknown[]) {
    return sqlFunction("numeric_cmp", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericDiv(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
export function numericDiv(...args: unknown[]) {
    return sqlFunction("numeric_div", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericDivTrunc(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
export function numericDivTrunc(...args: unknown[]) {
    return sqlFunction("numeric_div_trunc", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericEq(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
export function numericEq(...args: unknown[]) {
    return sqlFunction("numeric_eq", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericExp(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
export function numericExp(...args: unknown[]) {
    return sqlFunction("numeric_exp", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericGe(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
export function numericGe(...args: unknown[]) {
    return sqlFunction("numeric_ge", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericGt(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
export function numericGt(...args: unknown[]) {
    return sqlFunction("numeric_gt", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericInc(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
export function numericInc(...args: unknown[]) {
    return sqlFunction("numeric_inc", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericLarger(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
export function numericLarger(...args: unknown[]) {
    return sqlFunction("numeric_larger", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericLe(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
export function numericLe(...args: unknown[]) {
    return sqlFunction("numeric_le", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericLn(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
export function numericLn(...args: unknown[]) {
    return sqlFunction("numeric_ln", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericLog(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
export function numericLog(...args: unknown[]) {
    return sqlFunction("numeric_log", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericLt(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
export function numericLt(...args: unknown[]) {
    return sqlFunction("numeric_lt", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericMod(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
export function numericMod(...args: unknown[]) {
    return sqlFunction("numeric_mod", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericMul(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
export function numericMul(...args: unknown[]) {
    return sqlFunction("numeric_mul", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericNe(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Bool<0 | 1>
export function numericNe(...args: unknown[]) {
    return sqlFunction("numeric_ne", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericPlPgLsn(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.PgLsn<0 | 1>): Types.PgLsn<0 | 1>
export function numericPlPgLsn(...args: unknown[]) {
    return sqlFunction("numeric_pl_pg_lsn", [{args: [Types.Numeric<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericPower(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
export function numericPower(...args: unknown[]) {
    return sqlFunction("numeric_power", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericSmaller(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
export function numericSmaller(...args: unknown[]) {
    return sqlFunction("numeric_smaller", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericSqrt(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
export function numericSqrt(...args: unknown[]) {
    return sqlFunction("numeric_sqrt", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericSub(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
export function numericSub(...args: unknown[]) {
    return sqlFunction("numeric_sub", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericUminus(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
export function numericUminus(...args: unknown[]) {
    return sqlFunction("numeric_uminus", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numericUplus(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
export function numericUplus(...args: unknown[]) {
    return sqlFunction("numeric_uplus", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function nummultirange(): Types.Nummultirange<0 | 1>
export function nummultirange(a0: Types.Array<0 | 1, Types.Numrange<0 | 1>>, ...variadic: Types.Array<0 | 1, Types.Numrange<0 | 1>>[]): Types.Nummultirange<0 | 1>
export function nummultirange(a0: Types.Numrange<0 | 1>): Types.Nummultirange<0 | 1>
export function nummultirange(...args: unknown[]) {
    return sqlFunction("nummultirange", [{args: [], ret: Types.Nummultirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Array.of(Types.Numrange<0 | 1>)], ret: Types.Nummultirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}, {args: [Types.Numrange<0 | 1>], ret: Types.Nummultirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numnode(a0: Types.Tsquery<0 | 1>): Types.Int4<0 | 1>
export function numnode(...args: unknown[]) {
    return sqlFunction("numnode", [{args: [Types.Tsquery<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numrange(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numrange<0 | 1>
export function numrange(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Numrange<0 | 1>
export function numrange(...args: unknown[]) {
    return sqlFunction("numrange", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numrange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>, Types.Text<0 | 1>], ret: Types.Numrange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function numrangeSubdiff(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Float8<0 | 1>
export function numrangeSubdiff(...args: unknown[]) {
    return sqlFunction("numrange_subdiff", [{args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function objDescription(a0: Types.Oid<0 | 1>): Types.Text<0 | 1>
export function objDescription(a0: Types.Oid<0 | 1>, a1: Types.Name<0 | 1>): Types.Text<0 | 1>
export function objDescription(...args: unknown[]) {
    return sqlFunction("obj_description", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Name<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function octetLength(a0: Types.Bit<0 | 1>): Types.Int4<0 | 1>
export function octetLength(a0: Types.Bpchar<0 | 1>): Types.Int4<0 | 1>
export function octetLength(a0: Types.Bytea<0 | 1>): Types.Int4<0 | 1>
export function octetLength(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
export function octetLength(...args: unknown[]) {
    return sqlFunction("octet_length", [{args: [Types.Bit<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Bpchar<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Bytea<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function oid(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Oid<0 | 1>
export function oid(...args: unknown[]) {
    return sqlFunction("oid", [{args: [Types.Int8<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function oideq(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function oideq(...args: unknown[]) {
    return sqlFunction("oideq", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function oidge(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function oidge(...args: unknown[]) {
    return sqlFunction("oidge", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function oidgt(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function oidgt(...args: unknown[]) {
    return sqlFunction("oidgt", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function oidlarger(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Oid<0 | 1>
export function oidlarger(...args: unknown[]) {
    return sqlFunction("oidlarger", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function oidle(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function oidle(...args: unknown[]) {
    return sqlFunction("oidle", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function oidlt(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function oidlt(...args: unknown[]) {
    return sqlFunction("oidlt", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function oidne(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function oidne(...args: unknown[]) {
    return sqlFunction("oidne", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function oidsmaller(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Oid<0 | 1>
export function oidsmaller(...args: unknown[]) {
    return sqlFunction("oidsmaller", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function oidvectoreq(a0: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
export function oidvectoreq(...args: unknown[]) {
    return sqlFunction("oidvectoreq", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function oidvectorge(a0: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
export function oidvectorge(...args: unknown[]) {
    return sqlFunction("oidvectorge", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function oidvectorgt(a0: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
export function oidvectorgt(...args: unknown[]) {
    return sqlFunction("oidvectorgt", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function oidvectorle(a0: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
export function oidvectorle(...args: unknown[]) {
    return sqlFunction("oidvectorle", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function oidvectorlt(a0: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
export function oidvectorlt(...args: unknown[]) {
    return sqlFunction("oidvectorlt", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function oidvectorne(a0: Types.Oidvector<0 | 1>, a1: Types.Oidvector<0 | 1>): Types.Bool<0 | 1>
export function oidvectorne(...args: unknown[]) {
    return sqlFunction("oidvectorne", [{args: [Types.Oidvector<0 | 1>, Types.Oidvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function oidvectortypes(a0: Types.Oidvector<0 | 1>): Types.Text<0 | 1>
export function oidvectortypes(...args: unknown[]) {
    return sqlFunction("oidvectortypes", [{args: [Types.Oidvector<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function onPb(a0: Types.Point<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function onPb(...args: unknown[]) {
    return sqlFunction("on_pb", [{args: [Types.Point<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function onPl(a0: Types.Point<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
export function onPl(...args: unknown[]) {
    return sqlFunction("on_pl", [{args: [Types.Point<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function onPpath(a0: Types.Point<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
export function onPpath(...args: unknown[]) {
    return sqlFunction("on_ppath", [{args: [Types.Point<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function onPs(a0: Types.Point<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
export function onPs(...args: unknown[]) {
    return sqlFunction("on_ps", [{args: [Types.Point<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function onSb(a0: Types.Lseg<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
export function onSb(...args: unknown[]) {
    return sqlFunction("on_sb", [{args: [Types.Lseg<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function onSl(a0: Types.Lseg<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
export function onSl(...args: unknown[]) {
    return sqlFunction("on_sl", [{args: [Types.Lseg<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function overlaps(a0: Types.Time<0 | 1>, a1: Types.Interval<0 | 1>, a2: Types.Time<0 | 1>, a3: Types.Interval<0 | 1>): Types.Bool<0 | 1>
export function overlaps(a0: Types.Time<0 | 1>, a1: Types.Interval<0 | 1>, a2: Types.Time<0 | 1>, a3: Types.Time<0 | 1>): Types.Bool<0 | 1>
export function overlaps(a0: Types.Time<0 | 1>, a1: Types.Time<0 | 1>, a2: Types.Time<0 | 1>, a3: Types.Interval<0 | 1>): Types.Bool<0 | 1>
export function overlaps(a0: Types.Time<0 | 1>, a1: Types.Time<0 | 1>, a2: Types.Time<0 | 1>, a3: Types.Time<0 | 1>): Types.Bool<0 | 1>
export function overlaps(a0: Types.Timestamp<0 | 1>, a1: Types.Interval<0 | 1>, a2: Types.Timestamp<0 | 1>, a3: Types.Interval<0 | 1>): Types.Bool<0 | 1>
export function overlaps(a0: Types.Timestamp<0 | 1>, a1: Types.Interval<0 | 1>, a2: Types.Timestamp<0 | 1>, a3: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
export function overlaps(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>, a2: Types.Timestamp<0 | 1>, a3: Types.Interval<0 | 1>): Types.Bool<0 | 1>
export function overlaps(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>, a2: Types.Timestamp<0 | 1>, a3: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
export function overlaps(a0: Types.Timestamptz<0 | 1>, a1: Types.Interval<0 | 1>, a2: Types.Timestamptz<0 | 1>, a3: Types.Interval<0 | 1>): Types.Bool<0 | 1>
export function overlaps(a0: Types.Timestamptz<0 | 1>, a1: Types.Interval<0 | 1>, a2: Types.Timestamptz<0 | 1>, a3: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
export function overlaps(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>, a2: Types.Timestamptz<0 | 1>, a3: Types.Interval<0 | 1>): Types.Bool<0 | 1>
export function overlaps(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>, a2: Types.Timestamptz<0 | 1>, a3: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
export function overlaps(a0: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>, a2: Types.Timetz<0 | 1>, a3: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
export function overlaps(...args: unknown[]) {
    return sqlFunction("overlaps", [{args: [Types.Time<0 | 1>, Types.Interval<0 | 1>, Types.Time<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Time<0 | 1>, Types.Interval<0 | 1>, Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Time<0 | 1>, Types.Time<0 | 1>, Types.Time<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Time<0 | 1>, Types.Time<0 | 1>, Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Interval<0 | 1>, Types.Timestamp<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Interval<0 | 1>, Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>, Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>, Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>, Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function overlay(a0: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>, a2: Types.Int4<0 | 1>): Types.Bit<0 | 1>
export function overlay(a0: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>, a2: Types.Int4<0 | 1>, a3: Types.Int4<0 | 1>): Types.Bit<0 | 1>
export function overlay(a0: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>, a2: Types.Int4<0 | 1>): Types.Bytea<0 | 1>
export function overlay(a0: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>, a2: Types.Int4<0 | 1>, a3: Types.Int4<0 | 1>): Types.Bytea<0 | 1>
export function overlay(a0: Types.Text<0 | 1>, a1: Types.Text<0 | 1>, a2: Types.Int4<0 | 1>): Types.Text<0 | 1>
export function overlay(a0: Types.Text<0 | 1>, a1: Types.Text<0 | 1>, a2: Types.Int4<0 | 1>, a3: Types.Int4<0 | 1>): Types.Text<0 | 1>
export function overlay(...args: unknown[]) {
    return sqlFunction("overlay", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function parseIdent(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
export function parseIdent(...args: unknown[]) {
    return sqlFunction("parse_ident", [{args: [Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function path(a0: Types.Polygon<0 | 1>): Types.Path<0 | 1>
export function path(...args: unknown[]) {
    return sqlFunction("path", [{args: [Types.Polygon<0 | 1>], ret: Types.Path<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function pathAdd(a0: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Path<0 | 1>
export function pathAdd(...args: unknown[]) {
    return sqlFunction("path_add", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Path<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pathAddPt(a0: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Path<0 | 1>
export function pathAddPt(...args: unknown[]) {
    return sqlFunction("path_add_pt", [{args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Path<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pathContainPt(a0: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
export function pathContainPt(...args: unknown[]) {
    return sqlFunction("path_contain_pt", [{args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pathDistance(a0: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Float8<0 | 1>
export function pathDistance(...args: unknown[]) {
    return sqlFunction("path_distance", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pathDivPt(a0: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Path<0 | 1>
export function pathDivPt(...args: unknown[]) {
    return sqlFunction("path_div_pt", [{args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Path<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pathInter(a0: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
export function pathInter(...args: unknown[]) {
    return sqlFunction("path_inter", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pathLength(a0: Types.Path<0 | 1>): Types.Float8<0 | 1>
export function pathLength(...args: unknown[]) {
    return sqlFunction("path_length", [{args: [Types.Path<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pathMulPt(a0: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Path<0 | 1>
export function pathMulPt(...args: unknown[]) {
    return sqlFunction("path_mul_pt", [{args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Path<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pathNEq(a0: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
export function pathNEq(...args: unknown[]) {
    return sqlFunction("path_n_eq", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pathNGe(a0: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
export function pathNGe(...args: unknown[]) {
    return sqlFunction("path_n_ge", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pathNGt(a0: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
export function pathNGt(...args: unknown[]) {
    return sqlFunction("path_n_gt", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pathNLe(a0: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
export function pathNLe(...args: unknown[]) {
    return sqlFunction("path_n_le", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pathNLt(a0: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
export function pathNLt(...args: unknown[]) {
    return sqlFunction("path_n_lt", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pathNpoints(a0: Types.Path<0 | 1>): Types.Int4<0 | 1>
export function pathNpoints(...args: unknown[]) {
    return sqlFunction("path_npoints", [{args: [Types.Path<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pathSubPt(a0: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Path<0 | 1>
export function pathSubPt(...args: unknown[]) {
    return sqlFunction("path_sub_pt", [{args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Path<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pclose(a0: Types.Path<0 | 1>): Types.Path<0 | 1>
export function pclose(...args: unknown[]) {
    return sqlFunction("pclose", [{args: [Types.Path<0 | 1>], ret: Types.Path<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function percentRank(): Types.Float8<0 | 1>
export function percentRank(a0: Types.Any<unknown, number>, ...variadic: Types.Any<unknown, number>[]): Types.Float8<0 | 1>
export function percentRank(...args: unknown[]) {
    return sqlFunction("percent_rank", [{args: [], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Any<unknown, 0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function percentileCont(a0: Types.Array<number, Types.Float8<0 | 1>>, a1: Types.Float8<number>): Types.Array<0 | 1, Types.Float8<0 | 1>>
export function percentileCont(a0: Types.Array<number, Types.Float8<0 | 1>>, a1: Types.Interval<number>): Types.Array<0 | 1, Types.Interval<0 | 1>>
export function percentileCont(a0: Types.Float8<number>, a1: Types.Float8<number>): Types.Float8<0 | 1>
export function percentileCont(a0: Types.Float8<number>, a1: Types.Interval<number>): Types.Interval<0 | 1>
export function percentileCont(...args: unknown[]) {
    return sqlFunction("percentile_cont", [{args: [Types.Array.of(Types.Float8<0 | 1>), Types.Float8<0 | 1>], ret: Types.Array.of(Types.Float8<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Array.of(Types.Float8<0 | 1>), Types.Interval<0 | 1>], ret: Types.Array.of(Types.Interval<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function percentileDisc<T extends Types.Any>(a0: Types.Array<number, Types.Float8<0 | 1>>, a1: T): Types.Array<0 | 1, T>
export function percentileDisc<T extends Types.Any>(a0: Types.Float8<number>, a1: T): T
export function percentileDisc(...args: unknown[]) {
    return sqlFunction("percentile_disc", [({T}) => ({args: [Types.Array.of(Types.Float8<0 | 1>), T], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [Types.Float8<0 | 1>, T], ret: T, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function pgAdvisoryLock(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Void<0 | 1>
export function pgAdvisoryLock(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Void<0 | 1>
export function pgAdvisoryLock(...args: unknown[]) {
    return sqlFunction("pg_advisory_lock", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgAdvisoryLockShared(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Void<0 | 1>
export function pgAdvisoryLockShared(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Void<0 | 1>
export function pgAdvisoryLockShared(...args: unknown[]) {
    return sqlFunction("pg_advisory_lock_shared", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgAdvisoryUnlock(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function pgAdvisoryUnlock(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function pgAdvisoryUnlock(...args: unknown[]) {
    return sqlFunction("pg_advisory_unlock", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgAdvisoryUnlockAll(): Types.Void<0 | 1>
export function pgAdvisoryUnlockAll(...args: unknown[]) {
    return sqlFunction("pg_advisory_unlock_all", [{args: [], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgAdvisoryUnlockShared(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function pgAdvisoryUnlockShared(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function pgAdvisoryUnlockShared(...args: unknown[]) {
    return sqlFunction("pg_advisory_unlock_shared", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgAdvisoryXactLock(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Void<0 | 1>
export function pgAdvisoryXactLock(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Void<0 | 1>
export function pgAdvisoryXactLock(...args: unknown[]) {
    return sqlFunction("pg_advisory_xact_lock", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgAdvisoryXactLockShared(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Void<0 | 1>
export function pgAdvisoryXactLockShared(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Void<0 | 1>
export function pgAdvisoryXactLockShared(...args: unknown[]) {
    return sqlFunction("pg_advisory_xact_lock_shared", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgAvailableExtensionVersions(): Types.FromItem<{name: Types.Name<0 | 1>, version: Types.Text<0 | 1>, superuser: Types.Bool<0 | 1>, trusted: Types.Bool<0 | 1>, relocatable: Types.Bool<0 | 1>, schema: Types.Name<0 | 1>, requires: Types.Array<0 | 1, Types.Name<0 | 1>>, comment: Types.Text<0 | 1>}>
export function pgAvailableExtensionVersions(...args: unknown[]) {
    return sqlFunction("pg_available_extension_versions", [{args: [], ret: Types.FromItem.ofSchema({name: Types.Name<0 | 1>, version: Types.Text<0 | 1>, superuser: Types.Bool<0 | 1>, trusted: Types.Bool<0 | 1>, relocatable: Types.Bool<0 | 1>, schema: Types.Name<0 | 1>, requires: Types.Array.of(Types.Name<0 | 1>), comment: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgAvailableExtensions(): Types.FromItem<{name: Types.Name<0 | 1>, default_version: Types.Text<0 | 1>, comment: Types.Text<0 | 1>}>
export function pgAvailableExtensions(...args: unknown[]) {
    return sqlFunction("pg_available_extensions", [{args: [], ret: Types.FromItem.ofSchema({name: Types.Name<0 | 1>, default_version: Types.Text<0 | 1>, comment: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgAvailableWalSummaries(): Types.FromItem<{tli: Types.Int8<0 | 1>, start_lsn: Types.PgLsn<0 | 1>, end_lsn: Types.PgLsn<0 | 1>}>
export function pgAvailableWalSummaries(...args: unknown[]) {
    return sqlFunction("pg_available_wal_summaries", [{args: [], ret: Types.FromItem.ofSchema({tli: Types.Int8<0 | 1>, start_lsn: Types.PgLsn<0 | 1>, end_lsn: Types.PgLsn<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgBackendPid(): Types.Int4<0 | 1>
export function pgBackendPid(...args: unknown[]) {
    return sqlFunction("pg_backend_pid", [{args: [], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgBackupStart(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.PgLsn<0 | 1>
export function pgBackupStart(...args: unknown[]) {
    return sqlFunction("pg_backup_start", [{args: [Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgBackupStop(a0: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Record<0 | 1, {lsn: Types.PgLsn<0 | 1>, labelfile: Types.Text<0 | 1>, spcmapfile: Types.Text<0 | 1>}>
export function pgBackupStop(...args: unknown[]) {
    return sqlFunction("pg_backup_stop", [{args: [Types.Bool<0 | 1>], ret: Types.Record.of({lsn: Types.PgLsn<0 | 1>, labelfile: Types.Text<0 | 1>, spcmapfile: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgBasetype(a0: Types.Regtype<0 | 1>): Types.Regtype<0 | 1>
export function pgBasetype(...args: unknown[]) {
    return sqlFunction("pg_basetype", [{args: [Types.Regtype<0 | 1>], ret: Types.Regtype<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgBlockingPids(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Array<0 | 1, Types.Int4<0 | 1>>
export function pgBlockingPids(...args: unknown[]) {
    return sqlFunction("pg_blocking_pids", [{args: [Types.Int4<0 | 1>], ret: Types.Array.of(Types.Int4<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgCancelBackend(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function pgCancelBackend(...args: unknown[]) {
    return sqlFunction("pg_cancel_backend", [{args: [Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgCharToEncoding(a0: Types.Name<0 | 1>): Types.Int4<0 | 1>
export function pgCharToEncoding(...args: unknown[]) {
    return sqlFunction("pg_char_to_encoding", [{args: [Types.Name<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgClientEncoding(): Types.Name<0 | 1>
export function pgClientEncoding(...args: unknown[]) {
    return sqlFunction("pg_client_encoding", [{args: [], ret: Types.Name<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgCollationActualVersion(a0: Types.Oid<0 | 1>): Types.Text<0 | 1>
export function pgCollationActualVersion(...args: unknown[]) {
    return sqlFunction("pg_collation_actual_version", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgCollationFor(a0: Types.Any<unknown, 0 | 1>): Types.Text<0 | 1>
export function pgCollationFor(...args: unknown[]) {
    return sqlFunction("pg_collation_for", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgCollationIsVisible(a0: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function pgCollationIsVisible(...args: unknown[]) {
    return sqlFunction("pg_collation_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgColumnCompression(a0: Types.Any<unknown, 0 | 1>): Types.Text<0 | 1>
export function pgColumnCompression(...args: unknown[]) {
    return sqlFunction("pg_column_compression", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgColumnIsUpdatable(a0: Types.Regclass<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
export function pgColumnIsUpdatable(...args: unknown[]) {
    return sqlFunction("pg_column_is_updatable", [{args: [Types.Regclass<0 | 1>, Types.Int2<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgColumnSize(a0: Types.Any<unknown, 0 | 1>): Types.Int4<0 | 1>
export function pgColumnSize(...args: unknown[]) {
    return sqlFunction("pg_column_size", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgColumnToastChunkId(a0: Types.Any<unknown, 0 | 1>): Types.Oid<0 | 1>
export function pgColumnToastChunkId(...args: unknown[]) {
    return sqlFunction("pg_column_toast_chunk_id", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgConfLoadTime(): Types.Timestamptz<0 | 1>
export function pgConfLoadTime(...args: unknown[]) {
    return sqlFunction("pg_conf_load_time", [{args: [], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgConfig(): Types.FromItem<{name: Types.Text<0 | 1>, setting: Types.Text<0 | 1>}>
export function pgConfig(...args: unknown[]) {
    return sqlFunction("pg_config", [{args: [], ret: Types.FromItem.ofSchema({name: Types.Text<0 | 1>, setting: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgControlCheckpoint(): Types.Record<0 | 1, {checkpoint_lsn: Types.PgLsn<0 | 1>, redo_lsn: Types.PgLsn<0 | 1>, redo_wal_file: Types.Text<0 | 1>, timeline_id: Types.Int4<0 | 1>, prev_timeline_id: Types.Int4<0 | 1>, full_page_writes: Types.Bool<0 | 1>, next_xid: Types.Text<0 | 1>, next_oid: Types.Oid<0 | 1>, next_multixact_id: Types.Xid<0 | 1>, next_multi_offset: Types.Xid<0 | 1>, oldest_xid: Types.Xid<0 | 1>, oldest_xid_dbid: Types.Oid<0 | 1>, oldest_active_xid: Types.Xid<0 | 1>, oldest_multi_xid: Types.Xid<0 | 1>, oldest_multi_dbid: Types.Oid<0 | 1>, oldest_commit_ts_xid: Types.Xid<0 | 1>, newest_commit_ts_xid: Types.Xid<0 | 1>, checkpoint_time: Types.Timestamptz<0 | 1>}>
export function pgControlCheckpoint(...args: unknown[]) {
    return sqlFunction("pg_control_checkpoint", [{args: [], ret: Types.Record.of({checkpoint_lsn: Types.PgLsn<0 | 1>, redo_lsn: Types.PgLsn<0 | 1>, redo_wal_file: Types.Text<0 | 1>, timeline_id: Types.Int4<0 | 1>, prev_timeline_id: Types.Int4<0 | 1>, full_page_writes: Types.Bool<0 | 1>, next_xid: Types.Text<0 | 1>, next_oid: Types.Oid<0 | 1>, next_multixact_id: Types.Xid<0 | 1>, next_multi_offset: Types.Xid<0 | 1>, oldest_xid: Types.Xid<0 | 1>, oldest_xid_dbid: Types.Oid<0 | 1>, oldest_active_xid: Types.Xid<0 | 1>, oldest_multi_xid: Types.Xid<0 | 1>, oldest_multi_dbid: Types.Oid<0 | 1>, oldest_commit_ts_xid: Types.Xid<0 | 1>, newest_commit_ts_xid: Types.Xid<0 | 1>, checkpoint_time: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgControlInit(): Types.Record<0 | 1, {max_data_alignment: Types.Int4<0 | 1>, database_block_size: Types.Int4<0 | 1>, blocks_per_segment: Types.Int4<0 | 1>, wal_block_size: Types.Int4<0 | 1>, bytes_per_wal_segment: Types.Int4<0 | 1>, max_identifier_length: Types.Int4<0 | 1>, max_index_columns: Types.Int4<0 | 1>, max_toast_chunk_size: Types.Int4<0 | 1>, large_object_chunk_size: Types.Int4<0 | 1>, float8_pass_by_value: Types.Bool<0 | 1>, data_page_checksum_version: Types.Int4<0 | 1>}>
export function pgControlInit(...args: unknown[]) {
    return sqlFunction("pg_control_init", [{args: [], ret: Types.Record.of({max_data_alignment: Types.Int4<0 | 1>, database_block_size: Types.Int4<0 | 1>, blocks_per_segment: Types.Int4<0 | 1>, wal_block_size: Types.Int4<0 | 1>, bytes_per_wal_segment: Types.Int4<0 | 1>, max_identifier_length: Types.Int4<0 | 1>, max_index_columns: Types.Int4<0 | 1>, max_toast_chunk_size: Types.Int4<0 | 1>, large_object_chunk_size: Types.Int4<0 | 1>, float8_pass_by_value: Types.Bool<0 | 1>, data_page_checksum_version: Types.Int4<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgControlRecovery(): Types.Record<0 | 1, {min_recovery_end_lsn: Types.PgLsn<0 | 1>, min_recovery_end_timeline: Types.Int4<0 | 1>, backup_start_lsn: Types.PgLsn<0 | 1>, backup_end_lsn: Types.PgLsn<0 | 1>, end_of_backup_record_required: Types.Bool<0 | 1>}>
export function pgControlRecovery(...args: unknown[]) {
    return sqlFunction("pg_control_recovery", [{args: [], ret: Types.Record.of({min_recovery_end_lsn: Types.PgLsn<0 | 1>, min_recovery_end_timeline: Types.Int4<0 | 1>, backup_start_lsn: Types.PgLsn<0 | 1>, backup_end_lsn: Types.PgLsn<0 | 1>, end_of_backup_record_required: Types.Bool<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgControlSystem(): Types.Record<0 | 1, {pg_control_version: Types.Int4<0 | 1>, catalog_version_no: Types.Int4<0 | 1>, system_identifier: Types.Int8<0 | 1>, pg_control_last_modified: Types.Timestamptz<0 | 1>}>
export function pgControlSystem(...args: unknown[]) {
    return sqlFunction("pg_control_system", [{args: [], ret: Types.Record.of({pg_control_version: Types.Int4<0 | 1>, catalog_version_no: Types.Int4<0 | 1>, system_identifier: Types.Int8<0 | 1>, pg_control_last_modified: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgConversionIsVisible(a0: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function pgConversionIsVisible(...args: unknown[]) {
    return sqlFunction("pg_conversion_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgCopyLogicalReplicationSlot(a0: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}>
export function pgCopyLogicalReplicationSlot(a0: Types.Name<0 | 1>, a1: Types.Name<0 | 1>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}>
export function pgCopyLogicalReplicationSlot(a0: Types.Name<0 | 1>, a1: Types.Name<0 | 1>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Name<0 | 1>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}>
export function pgCopyLogicalReplicationSlot(...args: unknown[]) {
    return sqlFunction("pg_copy_logical_replication_slot", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Record.of({slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Name<0 | 1>, Types.Bool<0 | 1>], ret: Types.Record.of({slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Name<0 | 1>, Types.Bool<0 | 1>, Types.Name<0 | 1>], ret: Types.Record.of({slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgCopyPhysicalReplicationSlot(a0: Types.Name<0 | 1>, a1: Types.Name<0 | 1>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}>
export function pgCopyPhysicalReplicationSlot(a0: Types.Name<0 | 1>, a1: Types.Name<0 | 1>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}>
export function pgCopyPhysicalReplicationSlot(...args: unknown[]) {
    return sqlFunction("pg_copy_physical_replication_slot", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>], ret: Types.Record.of({slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Name<0 | 1>, Types.Bool<0 | 1>], ret: Types.Record.of({slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgCreateLogicalReplicationSlot(a0: Types.Name<0 | 1>, a1: Types.Name<0 | 1>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}>
export function pgCreateLogicalReplicationSlot(...args: unknown[]) {
    return sqlFunction("pg_create_logical_replication_slot", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Record.of({slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgCreatePhysicalReplicationSlot(a0: Types.Name<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}>
export function pgCreatePhysicalReplicationSlot(...args: unknown[]) {
    return sqlFunction("pg_create_physical_replication_slot", [{args: [Types.Name<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Record.of({slot_name: Types.Name<0 | 1>, lsn: Types.PgLsn<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgCreateRestorePoint(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.PgLsn<0 | 1>
export function pgCreateRestorePoint(...args: unknown[]) {
    return sqlFunction("pg_create_restore_point", [{args: [Types.Text<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgCurrentLogfile(): Types.Text<0 | 1>
export function pgCurrentLogfile(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function pgCurrentLogfile(...args: unknown[]) {
    return sqlFunction("pg_current_logfile", [{args: [], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgCurrentSnapshot(): Types.PgSnapshot<0 | 1>
export function pgCurrentSnapshot(...args: unknown[]) {
    return sqlFunction("pg_current_snapshot", [{args: [], ret: Types.PgSnapshot<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgCurrentWalFlushLsn(): Types.PgLsn<0 | 1>
export function pgCurrentWalFlushLsn(...args: unknown[]) {
    return sqlFunction("pg_current_wal_flush_lsn", [{args: [], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgCurrentWalInsertLsn(): Types.PgLsn<0 | 1>
export function pgCurrentWalInsertLsn(...args: unknown[]) {
    return sqlFunction("pg_current_wal_insert_lsn", [{args: [], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgCurrentWalLsn(): Types.PgLsn<0 | 1>
export function pgCurrentWalLsn(...args: unknown[]) {
    return sqlFunction("pg_current_wal_lsn", [{args: [], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgCurrentXactId(): Types.Xid8<0 | 1>
export function pgCurrentXactId(...args: unknown[]) {
    return sqlFunction("pg_current_xact_id", [{args: [], ret: Types.Xid8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgCurrentXactIdIfAssigned(): Types.Xid8<0 | 1>
export function pgCurrentXactIdIfAssigned(...args: unknown[]) {
    return sqlFunction("pg_current_xact_id_if_assigned", [{args: [], ret: Types.Xid8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgCursor(): Types.FromItem<{name: Types.Text<0 | 1>, statement: Types.Text<0 | 1>, is_holdable: Types.Bool<0 | 1>, is_binary: Types.Bool<0 | 1>, is_scrollable: Types.Bool<0 | 1>, creation_time: Types.Timestamptz<0 | 1>}>
export function pgCursor(...args: unknown[]) {
    return sqlFunction("pg_cursor", [{args: [], ret: Types.FromItem.ofSchema({name: Types.Text<0 | 1>, statement: Types.Text<0 | 1>, is_holdable: Types.Bool<0 | 1>, is_binary: Types.Bool<0 | 1>, is_scrollable: Types.Bool<0 | 1>, creation_time: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgDatabaseCollationActualVersion(a0: Types.Oid<0 | 1>): Types.Text<0 | 1>
export function pgDatabaseCollationActualVersion(...args: unknown[]) {
    return sqlFunction("pg_database_collation_actual_version", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgDatabaseSize(a0: Types.Name<0 | 1>): Types.Int8<0 | 1>
export function pgDatabaseSize(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgDatabaseSize(...args: unknown[]) {
    return sqlFunction("pg_database_size", [{args: [Types.Name<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgDescribeObject(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function pgDescribeObject(...args: unknown[]) {
    return sqlFunction("pg_describe_object", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgDropReplicationSlot(a0: Types.Name<0 | 1>): Types.Void<0 | 1>
export function pgDropReplicationSlot(...args: unknown[]) {
    return sqlFunction("pg_drop_replication_slot", [{args: [Types.Name<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgEncodingMaxLength(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function pgEncodingMaxLength(...args: unknown[]) {
    return sqlFunction("pg_encoding_max_length", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgEncodingToChar(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Name<0 | 1>
export function pgEncodingToChar(...args: unknown[]) {
    return sqlFunction("pg_encoding_to_char", [{args: [Types.Int4<0 | 1>], ret: Types.Name<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgEventTriggerDdlCommands(): Types.FromItem<{classid: Types.Oid<0 | 1>, objid: Types.Oid<0 | 1>, objsubid: Types.Int4<0 | 1>, command_tag: Types.Text<0 | 1>, object_type: Types.Text<0 | 1>, schema_name: Types.Text<0 | 1>, object_identity: Types.Text<0 | 1>, in_extension: Types.Bool<0 | 1>, command: Types.PgDdlCommand<0 | 1>}>
export function pgEventTriggerDdlCommands(...args: unknown[]) {
    return sqlFunction("pg_event_trigger_ddl_commands", [{args: [], ret: Types.FromItem.ofSchema({classid: Types.Oid<0 | 1>, objid: Types.Oid<0 | 1>, objsubid: Types.Int4<0 | 1>, command_tag: Types.Text<0 | 1>, object_type: Types.Text<0 | 1>, schema_name: Types.Text<0 | 1>, object_identity: Types.Text<0 | 1>, in_extension: Types.Bool<0 | 1>, command: Types.PgDdlCommand<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgEventTriggerDroppedObjects(): Types.FromItem<{classid: Types.Oid<0 | 1>, objid: Types.Oid<0 | 1>, objsubid: Types.Int4<0 | 1>, original: Types.Bool<0 | 1>, normal: Types.Bool<0 | 1>, is_temporary: Types.Bool<0 | 1>, object_type: Types.Text<0 | 1>, schema_name: Types.Text<0 | 1>, object_name: Types.Text<0 | 1>, object_identity: Types.Text<0 | 1>, address_names: Types.Array<0 | 1, Types.Text<0 | 1>>, address_args: Types.Array<0 | 1, Types.Text<0 | 1>>}>
export function pgEventTriggerDroppedObjects(...args: unknown[]) {
    return sqlFunction("pg_event_trigger_dropped_objects", [{args: [], ret: Types.FromItem.ofSchema({classid: Types.Oid<0 | 1>, objid: Types.Oid<0 | 1>, objsubid: Types.Int4<0 | 1>, original: Types.Bool<0 | 1>, normal: Types.Bool<0 | 1>, is_temporary: Types.Bool<0 | 1>, object_type: Types.Text<0 | 1>, schema_name: Types.Text<0 | 1>, object_name: Types.Text<0 | 1>, object_identity: Types.Text<0 | 1>, address_names: Types.Array.of(Types.Text<0 | 1>), address_args: Types.Array.of(Types.Text<0 | 1>)}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgEventTriggerTableRewriteOid(): Types.Oid<0 | 1>
export function pgEventTriggerTableRewriteOid(...args: unknown[]) {
    return sqlFunction("pg_event_trigger_table_rewrite_oid", [{args: [], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgEventTriggerTableRewriteReason(): Types.Int4<0 | 1>
export function pgEventTriggerTableRewriteReason(...args: unknown[]) {
    return sqlFunction("pg_event_trigger_table_rewrite_reason", [{args: [], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgExportSnapshot(): Types.Text<0 | 1>
export function pgExportSnapshot(...args: unknown[]) {
    return sqlFunction("pg_export_snapshot", [{args: [], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgExtensionConfigDump(a0: Types.Regclass<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Void<0 | 1>
export function pgExtensionConfigDump(...args: unknown[]) {
    return sqlFunction("pg_extension_config_dump", [{args: [Types.Regclass<0 | 1>, Types.Text<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgExtensionUpdatePaths(a0: Types.Name<0 | 1>): Types.FromItem<{source: Types.Text<0 | 1>, target: Types.Text<0 | 1>, path: Types.Text<0 | 1>}>
export function pgExtensionUpdatePaths(...args: unknown[]) {
    return sqlFunction("pg_extension_update_paths", [{args: [Types.Name<0 | 1>], ret: Types.FromItem.ofSchema({source: Types.Text<0 | 1>, target: Types.Text<0 | 1>, path: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgFilenodeRelation(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>): Types.Regclass<0 | 1>
export function pgFilenodeRelation(...args: unknown[]) {
    return sqlFunction("pg_filenode_relation", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Regclass<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgFunctionIsVisible(a0: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function pgFunctionIsVisible(...args: unknown[]) {
    return sqlFunction("pg_function_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetBackendMemoryContexts(): Types.FromItem<{name: Types.Text<0 | 1>, ident: Types.Text<0 | 1>, parent: Types.Text<0 | 1>, level: Types.Int4<0 | 1>, total_bytes: Types.Int8<0 | 1>, total_nblocks: Types.Int8<0 | 1>, free_bytes: Types.Int8<0 | 1>, free_chunks: Types.Int8<0 | 1>, used_bytes: Types.Int8<0 | 1>}>
export function pgGetBackendMemoryContexts(...args: unknown[]) {
    return sqlFunction("pg_get_backend_memory_contexts", [{args: [], ret: Types.FromItem.ofSchema({name: Types.Text<0 | 1>, ident: Types.Text<0 | 1>, parent: Types.Text<0 | 1>, level: Types.Int4<0 | 1>, total_bytes: Types.Int8<0 | 1>, total_nblocks: Types.Int8<0 | 1>, free_bytes: Types.Int8<0 | 1>, free_chunks: Types.Int8<0 | 1>, used_bytes: Types.Int8<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetCatalogForeignKeys(): Types.FromItem<{fktable: Types.Regclass<0 | 1>, fkcols: Types.Array<0 | 1, Types.Text<0 | 1>>, pktable: Types.Regclass<0 | 1>, pkcols: Types.Array<0 | 1, Types.Text<0 | 1>>, is_array: Types.Bool<0 | 1>, is_opt: Types.Bool<0 | 1>}>
export function pgGetCatalogForeignKeys(...args: unknown[]) {
    return sqlFunction("pg_get_catalog_foreign_keys", [{args: [], ret: Types.FromItem.ofSchema({fktable: Types.Regclass<0 | 1>, fkcols: Types.Array.of(Types.Text<0 | 1>), pktable: Types.Regclass<0 | 1>, pkcols: Types.Array.of(Types.Text<0 | 1>), is_array: Types.Bool<0 | 1>, is_opt: Types.Bool<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetConstraintdef(a0: Types.Oid<0 | 1>): Types.Text<0 | 1>
export function pgGetConstraintdef(a0: Types.Oid<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
export function pgGetConstraintdef(...args: unknown[]) {
    return sqlFunction("pg_get_constraintdef", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetExpr(a0: Types.PgNodeTree<0 | 1>, a1: Types.Oid<0 | 1>): Types.Text<0 | 1>
export function pgGetExpr(a0: Types.PgNodeTree<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
export function pgGetExpr(...args: unknown[]) {
    return sqlFunction("pg_get_expr", [{args: [Types.PgNodeTree<0 | 1>, Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.PgNodeTree<0 | 1>, Types.Oid<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetFunctionArgDefault(a0: Types.Oid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function pgGetFunctionArgDefault(...args: unknown[]) {
    return sqlFunction("pg_get_function_arg_default", [{args: [Types.Oid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetFunctionArguments(a0: Types.Oid<0 | 1>): Types.Text<0 | 1>
export function pgGetFunctionArguments(...args: unknown[]) {
    return sqlFunction("pg_get_function_arguments", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetFunctionIdentityArguments(a0: Types.Oid<0 | 1>): Types.Text<0 | 1>
export function pgGetFunctionIdentityArguments(...args: unknown[]) {
    return sqlFunction("pg_get_function_identity_arguments", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetFunctionResult(a0: Types.Oid<0 | 1>): Types.Text<0 | 1>
export function pgGetFunctionResult(...args: unknown[]) {
    return sqlFunction("pg_get_function_result", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetFunctionSqlbody(a0: Types.Oid<0 | 1>): Types.Text<0 | 1>
export function pgGetFunctionSqlbody(...args: unknown[]) {
    return sqlFunction("pg_get_function_sqlbody", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetFunctiondef(a0: Types.Oid<0 | 1>): Types.Text<0 | 1>
export function pgGetFunctiondef(...args: unknown[]) {
    return sqlFunction("pg_get_functiondef", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetIndexdef(a0: Types.Oid<0 | 1>): Types.Text<0 | 1>
export function pgGetIndexdef(a0: Types.Oid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
export function pgGetIndexdef(...args: unknown[]) {
    return sqlFunction("pg_get_indexdef", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Int4<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetKeywords(): Types.FromItem<{word: Types.Text<0 | 1>, catcode: Types.Char<0 | 1>, barelabel: Types.Bool<0 | 1>, catdesc: Types.Text<0 | 1>, baredesc: Types.Text<0 | 1>}>
export function pgGetKeywords(...args: unknown[]) {
    return sqlFunction("pg_get_keywords", [{args: [], ret: Types.FromItem.ofSchema({word: Types.Text<0 | 1>, catcode: Types.Char<0 | 1>, barelabel: Types.Bool<0 | 1>, catdesc: Types.Text<0 | 1>, baredesc: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetMultixactMembers(a0: Types.Xid<0 | 1>): Types.FromItem<{xid: Types.Xid<0 | 1>, mode: Types.Text<0 | 1>}>
export function pgGetMultixactMembers(...args: unknown[]) {
    return sqlFunction("pg_get_multixact_members", [{args: [Types.Xid<0 | 1>], ret: Types.FromItem.ofSchema({xid: Types.Xid<0 | 1>, mode: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetObjectAddress(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, a2: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Record<0 | 1, {classid: Types.Oid<0 | 1>, objid: Types.Oid<0 | 1>, objsubid: Types.Int4<0 | 1>}>
export function pgGetObjectAddress(...args: unknown[]) {
    return sqlFunction("pg_get_object_address", [{args: [Types.Text<0 | 1>, Types.Array.of(Types.Text<0 | 1>), Types.Array.of(Types.Text<0 | 1>)], ret: Types.Record.of({classid: Types.Oid<0 | 1>, objid: Types.Oid<0 | 1>, objsubid: Types.Int4<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetPartitionConstraintdef(a0: Types.Oid<0 | 1>): Types.Text<0 | 1>
export function pgGetPartitionConstraintdef(...args: unknown[]) {
    return sqlFunction("pg_get_partition_constraintdef", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetPartkeydef(a0: Types.Oid<0 | 1>): Types.Text<0 | 1>
export function pgGetPartkeydef(...args: unknown[]) {
    return sqlFunction("pg_get_partkeydef", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetPublicationTables(a0: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: Types.Array<0 | 1, Types.Text<0 | 1>>[]): Types.FromItem<{pubid: Types.Oid<0 | 1>, relid: Types.Oid<0 | 1>, attrs: Types.Int2Vector<0 | 1>, qual: Types.PgNodeTree<0 | 1>}>
export function pgGetPublicationTables(...args: unknown[]) {
    return sqlFunction("pg_get_publication_tables", [{args: [Types.Array.of(Types.Text<0 | 1>)], ret: Types.FromItem.ofSchema({pubid: Types.Oid<0 | 1>, relid: Types.Oid<0 | 1>, attrs: Types.Int2Vector<0 | 1>, qual: Types.PgNodeTree<0 | 1>}), isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function pgGetReplicaIdentityIndex(a0: Types.Regclass<0 | 1>): Types.Regclass<0 | 1>
export function pgGetReplicaIdentityIndex(...args: unknown[]) {
    return sqlFunction("pg_get_replica_identity_index", [{args: [Types.Regclass<0 | 1>], ret: Types.Regclass<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetReplicationSlots(): Types.FromItem<{slot_name: Types.Name<0 | 1>, plugin: Types.Name<0 | 1>, slot_type: Types.Text<0 | 1>, datoid: Types.Oid<0 | 1>, temporary: Types.Bool<0 | 1>, active: Types.Bool<0 | 1>, active_pid: Types.Int4<0 | 1>, xmin: Types.Xid<0 | 1>, catalog_xmin: Types.Xid<0 | 1>, restart_lsn: Types.PgLsn<0 | 1>, confirmed_flush_lsn: Types.PgLsn<0 | 1>, wal_status: Types.Text<0 | 1>, safe_wal_size: Types.Int8<0 | 1>, two_phase: Types.Bool<0 | 1>, inactive_since: Types.Timestamptz<0 | 1>, conflicting: Types.Bool<0 | 1>, invalidation_reason: Types.Text<0 | 1>, failover: Types.Bool<0 | 1>, synced: Types.Bool<0 | 1>}>
export function pgGetReplicationSlots(...args: unknown[]) {
    return sqlFunction("pg_get_replication_slots", [{args: [], ret: Types.FromItem.ofSchema({slot_name: Types.Name<0 | 1>, plugin: Types.Name<0 | 1>, slot_type: Types.Text<0 | 1>, datoid: Types.Oid<0 | 1>, temporary: Types.Bool<0 | 1>, active: Types.Bool<0 | 1>, active_pid: Types.Int4<0 | 1>, xmin: Types.Xid<0 | 1>, catalog_xmin: Types.Xid<0 | 1>, restart_lsn: Types.PgLsn<0 | 1>, confirmed_flush_lsn: Types.PgLsn<0 | 1>, wal_status: Types.Text<0 | 1>, safe_wal_size: Types.Int8<0 | 1>, two_phase: Types.Bool<0 | 1>, inactive_since: Types.Timestamptz<0 | 1>, conflicting: Types.Bool<0 | 1>, invalidation_reason: Types.Text<0 | 1>, failover: Types.Bool<0 | 1>, synced: Types.Bool<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetRuledef(a0: Types.Oid<0 | 1>): Types.Text<0 | 1>
export function pgGetRuledef(a0: Types.Oid<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
export function pgGetRuledef(...args: unknown[]) {
    return sqlFunction("pg_get_ruledef", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetSerialSequence(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function pgGetSerialSequence(...args: unknown[]) {
    return sqlFunction("pg_get_serial_sequence", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetShmemAllocations(): Types.FromItem<{name: Types.Text<0 | 1>, off: Types.Int8<0 | 1>, size: Types.Int8<0 | 1>, allocated_size: Types.Int8<0 | 1>}>
export function pgGetShmemAllocations(...args: unknown[]) {
    return sqlFunction("pg_get_shmem_allocations", [{args: [], ret: Types.FromItem.ofSchema({name: Types.Text<0 | 1>, off: Types.Int8<0 | 1>, size: Types.Int8<0 | 1>, allocated_size: Types.Int8<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetStatisticsobjdef(a0: Types.Oid<0 | 1>): Types.Text<0 | 1>
export function pgGetStatisticsobjdef(...args: unknown[]) {
    return sqlFunction("pg_get_statisticsobjdef", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetStatisticsobjdefColumns(a0: Types.Oid<0 | 1>): Types.Text<0 | 1>
export function pgGetStatisticsobjdefColumns(...args: unknown[]) {
    return sqlFunction("pg_get_statisticsobjdef_columns", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetStatisticsobjdefExpressions(a0: Types.Oid<0 | 1>): Types.Array<0 | 1, Types.Text<0 | 1>>
export function pgGetStatisticsobjdefExpressions(...args: unknown[]) {
    return sqlFunction("pg_get_statisticsobjdef_expressions", [{args: [Types.Oid<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetTriggerdef(a0: Types.Oid<0 | 1>): Types.Text<0 | 1>
export function pgGetTriggerdef(a0: Types.Oid<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
export function pgGetTriggerdef(...args: unknown[]) {
    return sqlFunction("pg_get_triggerdef", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetUserbyid(a0: Types.Oid<0 | 1>): Types.Name<0 | 1>
export function pgGetUserbyid(...args: unknown[]) {
    return sqlFunction("pg_get_userbyid", [{args: [Types.Oid<0 | 1>], ret: Types.Name<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetViewdef(a0: Types.Oid<0 | 1>): Types.Text<0 | 1>
export function pgGetViewdef(a0: Types.Oid<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
export function pgGetViewdef(a0: Types.Oid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function pgGetViewdef(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function pgGetViewdef(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
export function pgGetViewdef(...args: unknown[]) {
    return sqlFunction("pg_get_viewdef", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetWaitEvents(): Types.FromItem<{type: Types.Text<0 | 1>, name: Types.Text<0 | 1>, description: Types.Text<0 | 1>}>
export function pgGetWaitEvents(...args: unknown[]) {
    return sqlFunction("pg_get_wait_events", [{args: [], ret: Types.FromItem.ofSchema({type: Types.Text<0 | 1>, name: Types.Text<0 | 1>, description: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetWalReplayPauseState(): Types.Text<0 | 1>
export function pgGetWalReplayPauseState(...args: unknown[]) {
    return sqlFunction("pg_get_wal_replay_pause_state", [{args: [], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetWalResourceManagers(): Types.FromItem<{rm_id: Types.Int4<0 | 1>, rm_name: Types.Text<0 | 1>, rm_builtin: Types.Bool<0 | 1>}>
export function pgGetWalResourceManagers(...args: unknown[]) {
    return sqlFunction("pg_get_wal_resource_managers", [{args: [], ret: Types.FromItem.ofSchema({rm_id: Types.Int4<0 | 1>, rm_name: Types.Text<0 | 1>, rm_builtin: Types.Bool<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgGetWalSummarizerState(): Types.Record<0 | 1, {summarized_tli: Types.Int8<0 | 1>, summarized_lsn: Types.PgLsn<0 | 1>, pending_lsn: Types.PgLsn<0 | 1>, summarizer_pid: Types.Int4<0 | 1>}>
export function pgGetWalSummarizerState(...args: unknown[]) {
    return sqlFunction("pg_get_wal_summarizer_state", [{args: [], ret: Types.Record.of({summarized_tli: Types.Int8<0 | 1>, summarized_lsn: Types.PgLsn<0 | 1>, pending_lsn: Types.PgLsn<0 | 1>, summarizer_pid: Types.Int4<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgHasRole(a0: Types.Name<0 | 1>, a1: Types.Name<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function pgHasRole(a0: Types.Name<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function pgHasRole(a0: Types.Name<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function pgHasRole(a0: Types.Oid<0 | 1>, a1: Types.Name<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function pgHasRole(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function pgHasRole(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function pgHasRole(...args: unknown[]) {
    return sqlFunction("pg_has_role", [{args: [Types.Name<0 | 1>, Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Name<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgHbaFileRules(): Types.FromItem<{rule_number: Types.Int4<0 | 1>, file_name: Types.Text<0 | 1>, line_number: Types.Int4<0 | 1>, type: Types.Text<0 | 1>, database: Types.Array<0 | 1, Types.Text<0 | 1>>, user_name: Types.Array<0 | 1, Types.Text<0 | 1>>, address: Types.Text<0 | 1>, netmask: Types.Text<0 | 1>, auth_method: Types.Text<0 | 1>, options: Types.Array<0 | 1, Types.Text<0 | 1>>, error: Types.Text<0 | 1>}>
export function pgHbaFileRules(...args: unknown[]) {
    return sqlFunction("pg_hba_file_rules", [{args: [], ret: Types.FromItem.ofSchema({rule_number: Types.Int4<0 | 1>, file_name: Types.Text<0 | 1>, line_number: Types.Int4<0 | 1>, type: Types.Text<0 | 1>, database: Types.Array.of(Types.Text<0 | 1>), user_name: Types.Array.of(Types.Text<0 | 1>), address: Types.Text<0 | 1>, netmask: Types.Text<0 | 1>, auth_method: Types.Text<0 | 1>, options: Types.Array.of(Types.Text<0 | 1>), error: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgIdentFileMappings(): Types.FromItem<{map_number: Types.Int4<0 | 1>, file_name: Types.Text<0 | 1>, line_number: Types.Int4<0 | 1>, map_name: Types.Text<0 | 1>, sys_name: Types.Text<0 | 1>, pg_username: Types.Text<0 | 1>, error: Types.Text<0 | 1>}>
export function pgIdentFileMappings(...args: unknown[]) {
    return sqlFunction("pg_ident_file_mappings", [{args: [], ret: Types.FromItem.ofSchema({map_number: Types.Int4<0 | 1>, file_name: Types.Text<0 | 1>, line_number: Types.Int4<0 | 1>, map_name: Types.Text<0 | 1>, sys_name: Types.Text<0 | 1>, pg_username: Types.Text<0 | 1>, error: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgIdentifyObject(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Record<0 | 1, {type: Types.Text<0 | 1>, schema: Types.Text<0 | 1>, name: Types.Text<0 | 1>, identity: Types.Text<0 | 1>}>
export function pgIdentifyObject(...args: unknown[]) {
    return sqlFunction("pg_identify_object", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Record.of({type: Types.Text<0 | 1>, schema: Types.Text<0 | 1>, name: Types.Text<0 | 1>, identity: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgIdentifyObjectAsAddress(a0: Types.Oid<0 | 1>, a1: Types.Oid<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Record<0 | 1, {type: Types.Text<0 | 1>, object_names: Types.Array<0 | 1, Types.Text<0 | 1>>, object_args: Types.Array<0 | 1, Types.Text<0 | 1>>}>
export function pgIdentifyObjectAsAddress(...args: unknown[]) {
    return sqlFunction("pg_identify_object_as_address", [{args: [Types.Oid<0 | 1>, Types.Oid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Record.of({type: Types.Text<0 | 1>, object_names: Types.Array.of(Types.Text<0 | 1>), object_args: Types.Array.of(Types.Text<0 | 1>)}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgImportSystemCollations(a0: Types.Regnamespace<0 | 1>): Types.Int4<0 | 1>
export function pgImportSystemCollations(...args: unknown[]) {
    return sqlFunction("pg_import_system_collations", [{args: [Types.Regnamespace<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgIndexColumnHasProperty(a0: Types.Regclass<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function pgIndexColumnHasProperty(...args: unknown[]) {
    return sqlFunction("pg_index_column_has_property", [{args: [Types.Regclass<0 | 1>, Types.Int4<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgIndexHasProperty(a0: Types.Regclass<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function pgIndexHasProperty(...args: unknown[]) {
    return sqlFunction("pg_index_has_property", [{args: [Types.Regclass<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgIndexamHasProperty(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function pgIndexamHasProperty(...args: unknown[]) {
    return sqlFunction("pg_indexam_has_property", [{args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgIndexamProgressPhasename(a0: Types.Oid<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Text<0 | 1>
export function pgIndexamProgressPhasename(...args: unknown[]) {
    return sqlFunction("pg_indexam_progress_phasename", [{args: [Types.Oid<0 | 1>, Types.Int8<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgIndexesSize(a0: Types.Regclass<0 | 1>): Types.Int8<0 | 1>
export function pgIndexesSize(...args: unknown[]) {
    return sqlFunction("pg_indexes_size", [{args: [Types.Regclass<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgInputErrorInfo(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Record<0 | 1, {message: Types.Text<0 | 1>, detail: Types.Text<0 | 1>, hint: Types.Text<0 | 1>, sql_error_code: Types.Text<0 | 1>}>
export function pgInputErrorInfo(...args: unknown[]) {
    return sqlFunction("pg_input_error_info", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Record.of({message: Types.Text<0 | 1>, detail: Types.Text<0 | 1>, hint: Types.Text<0 | 1>, sql_error_code: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgInputIsValid(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function pgInputIsValid(...args: unknown[]) {
    return sqlFunction("pg_input_is_valid", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgIsInRecovery(): Types.Bool<0 | 1>
export function pgIsInRecovery(...args: unknown[]) {
    return sqlFunction("pg_is_in_recovery", [{args: [], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgIsOtherTempSchema(a0: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function pgIsOtherTempSchema(...args: unknown[]) {
    return sqlFunction("pg_is_other_temp_schema", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgIsWalReplayPaused(): Types.Bool<0 | 1>
export function pgIsWalReplayPaused(...args: unknown[]) {
    return sqlFunction("pg_is_wal_replay_paused", [{args: [], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgIsolationTestSessionIsBlocked(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Array<0 | 1, Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function pgIsolationTestSessionIsBlocked(...args: unknown[]) {
    return sqlFunction("pg_isolation_test_session_is_blocked", [{args: [Types.Int4<0 | 1>, Types.Array.of(Types.Int4<0 | 1>)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgJitAvailable(): Types.Bool<0 | 1>
export function pgJitAvailable(...args: unknown[]) {
    return sqlFunction("pg_jit_available", [{args: [], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLastCommittedXact(): Types.Record<0 | 1, {xid: Types.Xid<0 | 1>, timestamp: Types.Timestamptz<0 | 1>, roident: Types.Oid<0 | 1>}>
export function pgLastCommittedXact(...args: unknown[]) {
    return sqlFunction("pg_last_committed_xact", [{args: [], ret: Types.Record.of({xid: Types.Xid<0 | 1>, timestamp: Types.Timestamptz<0 | 1>, roident: Types.Oid<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLastWalReceiveLsn(): Types.PgLsn<0 | 1>
export function pgLastWalReceiveLsn(...args: unknown[]) {
    return sqlFunction("pg_last_wal_receive_lsn", [{args: [], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLastWalReplayLsn(): Types.PgLsn<0 | 1>
export function pgLastWalReplayLsn(...args: unknown[]) {
    return sqlFunction("pg_last_wal_replay_lsn", [{args: [], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLastXactReplayTimestamp(): Types.Timestamptz<0 | 1>
export function pgLastXactReplayTimestamp(...args: unknown[]) {
    return sqlFunction("pg_last_xact_replay_timestamp", [{args: [], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgListeningChannels(): Types.FromItem<{}>
export function pgListeningChannels(...args: unknown[]) {
    return sqlFunction("pg_listening_channels", [{args: [], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLockStatus(): Types.FromItem<{locktype: Types.Text<0 | 1>, database: Types.Oid<0 | 1>, relation: Types.Oid<0 | 1>, page: Types.Int4<0 | 1>, tuple: Types.Int2<0 | 1>, virtualxid: Types.Text<0 | 1>, transactionid: Types.Xid<0 | 1>, classid: Types.Oid<0 | 1>, objid: Types.Oid<0 | 1>, objsubid: Types.Int2<0 | 1>, virtualtransaction: Types.Text<0 | 1>, pid: Types.Int4<0 | 1>, mode: Types.Text<0 | 1>, granted: Types.Bool<0 | 1>, fastpath: Types.Bool<0 | 1>, waitstart: Types.Timestamptz<0 | 1>}>
export function pgLockStatus(...args: unknown[]) {
    return sqlFunction("pg_lock_status", [{args: [], ret: Types.FromItem.ofSchema({locktype: Types.Text<0 | 1>, database: Types.Oid<0 | 1>, relation: Types.Oid<0 | 1>, page: Types.Int4<0 | 1>, tuple: Types.Int2<0 | 1>, virtualxid: Types.Text<0 | 1>, transactionid: Types.Xid<0 | 1>, classid: Types.Oid<0 | 1>, objid: Types.Oid<0 | 1>, objsubid: Types.Int2<0 | 1>, virtualtransaction: Types.Text<0 | 1>, pid: Types.Int4<0 | 1>, mode: Types.Text<0 | 1>, granted: Types.Bool<0 | 1>, fastpath: Types.Bool<0 | 1>, waitstart: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLogBackendMemoryContexts(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function pgLogBackendMemoryContexts(...args: unknown[]) {
    return sqlFunction("pg_log_backend_memory_contexts", [{args: [Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLogStandbySnapshot(): Types.PgLsn<0 | 1>
export function pgLogStandbySnapshot(...args: unknown[]) {
    return sqlFunction("pg_log_standby_snapshot", [{args: [], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLogicalEmitMessage(a0: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Bytea<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.PgLsn<0 | 1>
export function pgLogicalEmitMessage(a0: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.PgLsn<0 | 1>
export function pgLogicalEmitMessage(...args: unknown[]) {
    return sqlFunction("pg_logical_emit_message", [{args: [Types.Bool<0 | 1>, Types.Text<0 | 1>, Types.Bytea<0 | 1>, Types.Bool<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Bool<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLogicalSlotGetBinaryChanges(a0: Types.Name<0 | 1>, a1: Types.PgLsn<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: Types.Array<0 | 1, Types.Text<0 | 1>>[]): Types.FromItem<{lsn: Types.PgLsn<0 | 1>, xid: Types.Xid<0 | 1>, data: Types.Bytea<0 | 1>}>
export function pgLogicalSlotGetBinaryChanges(...args: unknown[]) {
    return sqlFunction("pg_logical_slot_get_binary_changes", [{args: [Types.Name<0 | 1>, Types.PgLsn<0 | 1>, Types.Int4<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.FromItem.ofSchema({lsn: Types.PgLsn<0 | 1>, xid: Types.Xid<0 | 1>, data: Types.Bytea<0 | 1>}), isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function pgLogicalSlotGetChanges(a0: Types.Name<0 | 1>, a1: Types.PgLsn<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: Types.Array<0 | 1, Types.Text<0 | 1>>[]): Types.FromItem<{lsn: Types.PgLsn<0 | 1>, xid: Types.Xid<0 | 1>, data: Types.Text<0 | 1>}>
export function pgLogicalSlotGetChanges(...args: unknown[]) {
    return sqlFunction("pg_logical_slot_get_changes", [{args: [Types.Name<0 | 1>, Types.PgLsn<0 | 1>, Types.Int4<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.FromItem.ofSchema({lsn: Types.PgLsn<0 | 1>, xid: Types.Xid<0 | 1>, data: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function pgLogicalSlotPeekBinaryChanges(a0: Types.Name<0 | 1>, a1: Types.PgLsn<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: Types.Array<0 | 1, Types.Text<0 | 1>>[]): Types.FromItem<{lsn: Types.PgLsn<0 | 1>, xid: Types.Xid<0 | 1>, data: Types.Bytea<0 | 1>}>
export function pgLogicalSlotPeekBinaryChanges(...args: unknown[]) {
    return sqlFunction("pg_logical_slot_peek_binary_changes", [{args: [Types.Name<0 | 1>, Types.PgLsn<0 | 1>, Types.Int4<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.FromItem.ofSchema({lsn: Types.PgLsn<0 | 1>, xid: Types.Xid<0 | 1>, data: Types.Bytea<0 | 1>}), isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function pgLogicalSlotPeekChanges(a0: Types.Name<0 | 1>, a1: Types.PgLsn<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: Types.Array<0 | 1, Types.Text<0 | 1>>[]): Types.FromItem<{lsn: Types.PgLsn<0 | 1>, xid: Types.Xid<0 | 1>, data: Types.Text<0 | 1>}>
export function pgLogicalSlotPeekChanges(...args: unknown[]) {
    return sqlFunction("pg_logical_slot_peek_changes", [{args: [Types.Name<0 | 1>, Types.PgLsn<0 | 1>, Types.Int4<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.FromItem.ofSchema({lsn: Types.PgLsn<0 | 1>, xid: Types.Xid<0 | 1>, data: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function pgLsArchiveStatusdir(): Types.FromItem<{name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}>
export function pgLsArchiveStatusdir(...args: unknown[]) {
    return sqlFunction("pg_ls_archive_statusdir", [{args: [], ret: Types.FromItem.ofSchema({name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsDir(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
export function pgLsDir(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.FromItem<{}>
export function pgLsDir(...args: unknown[]) {
    return sqlFunction("pg_ls_dir", [{args: [Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsLogdir(): Types.FromItem<{name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}>
export function pgLsLogdir(...args: unknown[]) {
    return sqlFunction("pg_ls_logdir", [{args: [], ret: Types.FromItem.ofSchema({name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsLogicalmapdir(): Types.FromItem<{name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}>
export function pgLsLogicalmapdir(...args: unknown[]) {
    return sqlFunction("pg_ls_logicalmapdir", [{args: [], ret: Types.FromItem.ofSchema({name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsLogicalsnapdir(): Types.FromItem<{name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}>
export function pgLsLogicalsnapdir(...args: unknown[]) {
    return sqlFunction("pg_ls_logicalsnapdir", [{args: [], ret: Types.FromItem.ofSchema({name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsReplslotdir(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}>
export function pgLsReplslotdir(...args: unknown[]) {
    return sqlFunction("pg_ls_replslotdir", [{args: [Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsTmpdir(): Types.FromItem<{name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}>
export function pgLsTmpdir(a0: Types.Oid<0 | 1>): Types.FromItem<{name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}>
export function pgLsTmpdir(...args: unknown[]) {
    return sqlFunction("pg_ls_tmpdir", [{args: [], ret: Types.FromItem.ofSchema({name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>], ret: Types.FromItem.ofSchema({name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsWaldir(): Types.FromItem<{name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}>
export function pgLsWaldir(...args: unknown[]) {
    return sqlFunction("pg_ls_waldir", [{args: [], ret: Types.FromItem.ofSchema({name: Types.Text<0 | 1>, size: Types.Int8<0 | 1>, modification: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsn(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.PgLsn<0 | 1>
export function pgLsn(...args: unknown[]) {
    return sqlFunction("pg_lsn", [{args: [Types.Numeric<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsnCmp(a0: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Int4<0 | 1>
export function pgLsnCmp(...args: unknown[]) {
    return sqlFunction("pg_lsn_cmp", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsnEq(a0: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
export function pgLsnEq(...args: unknown[]) {
    return sqlFunction("pg_lsn_eq", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsnGe(a0: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
export function pgLsnGe(...args: unknown[]) {
    return sqlFunction("pg_lsn_ge", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsnGt(a0: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
export function pgLsnGt(...args: unknown[]) {
    return sqlFunction("pg_lsn_gt", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsnHash(a0: Types.PgLsn<0 | 1>): Types.Int4<0 | 1>
export function pgLsnHash(...args: unknown[]) {
    return sqlFunction("pg_lsn_hash", [{args: [Types.PgLsn<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsnHashExtended(a0: Types.PgLsn<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function pgLsnHashExtended(...args: unknown[]) {
    return sqlFunction("pg_lsn_hash_extended", [{args: [Types.PgLsn<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsnLarger(a0: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.PgLsn<0 | 1>
export function pgLsnLarger(...args: unknown[]) {
    return sqlFunction("pg_lsn_larger", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsnLe(a0: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
export function pgLsnLe(...args: unknown[]) {
    return sqlFunction("pg_lsn_le", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsnLt(a0: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
export function pgLsnLt(...args: unknown[]) {
    return sqlFunction("pg_lsn_lt", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsnMi(a0: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Numeric<0 | 1>
export function pgLsnMi(...args: unknown[]) {
    return sqlFunction("pg_lsn_mi", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsnMii(a0: Types.PgLsn<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.PgLsn<0 | 1>
export function pgLsnMii(...args: unknown[]) {
    return sqlFunction("pg_lsn_mii", [{args: [Types.PgLsn<0 | 1>, Types.Numeric<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsnNe(a0: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Bool<0 | 1>
export function pgLsnNe(...args: unknown[]) {
    return sqlFunction("pg_lsn_ne", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsnPli(a0: Types.PgLsn<0 | 1>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.PgLsn<0 | 1>
export function pgLsnPli(...args: unknown[]) {
    return sqlFunction("pg_lsn_pli", [{args: [Types.PgLsn<0 | 1>, Types.Numeric<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgLsnSmaller(a0: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.PgLsn<0 | 1>
export function pgLsnSmaller(...args: unknown[]) {
    return sqlFunction("pg_lsn_smaller", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgMcvListItems(a0: Types.PgMcvList<0 | 1>): Types.FromItem<{index: Types.Int4<0 | 1>, values: Types.Array<0 | 1, Types.Text<0 | 1>>, nulls: Types.Array<0 | 1, Types.Bool<0 | 1>>, frequency: Types.Float8<0 | 1>, base_frequency: Types.Float8<0 | 1>}>
export function pgMcvListItems(...args: unknown[]) {
    return sqlFunction("pg_mcv_list_items", [{args: [Types.PgMcvList<0 | 1>], ret: Types.FromItem.ofSchema({index: Types.Int4<0 | 1>, values: Types.Array.of(Types.Text<0 | 1>), nulls: Types.Array.of(Types.Bool<0 | 1>), frequency: Types.Float8<0 | 1>, base_frequency: Types.Float8<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgMyTempSchema(): Types.Oid<0 | 1>
export function pgMyTempSchema(...args: unknown[]) {
    return sqlFunction("pg_my_temp_schema", [{args: [], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgNextoid(a0: Types.Regclass<0 | 1>, a1: Types.Name<0 | 1>, a2: Types.Regclass<0 | 1>): Types.Oid<0 | 1>
export function pgNextoid(...args: unknown[]) {
    return sqlFunction("pg_nextoid", [{args: [Types.Regclass<0 | 1>, Types.Name<0 | 1>, Types.Regclass<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgNotificationQueueUsage(): Types.Float8<0 | 1>
export function pgNotificationQueueUsage(...args: unknown[]) {
    return sqlFunction("pg_notification_queue_usage", [{args: [], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgNotify(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Void<0 | 1>
export function pgNotify(...args: unknown[]) {
    return sqlFunction("pg_notify", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgOpclassIsVisible(a0: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function pgOpclassIsVisible(...args: unknown[]) {
    return sqlFunction("pg_opclass_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgOperatorIsVisible(a0: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function pgOperatorIsVisible(...args: unknown[]) {
    return sqlFunction("pg_operator_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgOpfamilyIsVisible(a0: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function pgOpfamilyIsVisible(...args: unknown[]) {
    return sqlFunction("pg_opfamily_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgOptionsToTable(a0: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.FromItem<{option_name: Types.Text<0 | 1>, option_value: Types.Text<0 | 1>}>
export function pgOptionsToTable(...args: unknown[]) {
    return sqlFunction("pg_options_to_table", [{args: [Types.Array.of(Types.Text<0 | 1>)], ret: Types.FromItem.ofSchema({option_name: Types.Text<0 | 1>, option_value: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgPartitionAncestors(a0: Types.Regclass<0 | 1>): Types.FromItem<{relid: Types.Regclass<0 | 1>}>
export function pgPartitionAncestors(...args: unknown[]) {
    return sqlFunction("pg_partition_ancestors", [{args: [Types.Regclass<0 | 1>], ret: Types.FromItem.ofSchema({relid: Types.Regclass<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgPartitionRoot(a0: Types.Regclass<0 | 1>): Types.Regclass<0 | 1>
export function pgPartitionRoot(...args: unknown[]) {
    return sqlFunction("pg_partition_root", [{args: [Types.Regclass<0 | 1>], ret: Types.Regclass<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgPartitionTree(a0: Types.Regclass<0 | 1>): Types.FromItem<{relid: Types.Regclass<0 | 1>, parentrelid: Types.Regclass<0 | 1>, isleaf: Types.Bool<0 | 1>, level: Types.Int4<0 | 1>}>
export function pgPartitionTree(...args: unknown[]) {
    return sqlFunction("pg_partition_tree", [{args: [Types.Regclass<0 | 1>], ret: Types.FromItem.ofSchema({relid: Types.Regclass<0 | 1>, parentrelid: Types.Regclass<0 | 1>, isleaf: Types.Bool<0 | 1>, level: Types.Int4<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgPostmasterStartTime(): Types.Timestamptz<0 | 1>
export function pgPostmasterStartTime(...args: unknown[]) {
    return sqlFunction("pg_postmaster_start_time", [{args: [], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgPreparedStatement(): Types.FromItem<{name: Types.Text<0 | 1>, statement: Types.Text<0 | 1>, prepare_time: Types.Timestamptz<0 | 1>, parameter_types: Types.Array<0 | 1, Types.Regtype<0 | 1>>, result_types: Types.Array<0 | 1, Types.Regtype<0 | 1>>, from_sql: Types.Bool<0 | 1>, generic_plans: Types.Int8<0 | 1>, custom_plans: Types.Int8<0 | 1>}>
export function pgPreparedStatement(...args: unknown[]) {
    return sqlFunction("pg_prepared_statement", [{args: [], ret: Types.FromItem.ofSchema({name: Types.Text<0 | 1>, statement: Types.Text<0 | 1>, prepare_time: Types.Timestamptz<0 | 1>, parameter_types: Types.Array.of(Types.Regtype<0 | 1>), result_types: Types.Array.of(Types.Regtype<0 | 1>), from_sql: Types.Bool<0 | 1>, generic_plans: Types.Int8<0 | 1>, custom_plans: Types.Int8<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgPreparedXact(): Types.FromItem<{transaction: Types.Xid<0 | 1>, gid: Types.Text<0 | 1>, prepared: Types.Timestamptz<0 | 1>, ownerid: Types.Oid<0 | 1>, dbid: Types.Oid<0 | 1>}>
export function pgPreparedXact(...args: unknown[]) {
    return sqlFunction("pg_prepared_xact", [{args: [], ret: Types.FromItem.ofSchema({transaction: Types.Xid<0 | 1>, gid: Types.Text<0 | 1>, prepared: Types.Timestamptz<0 | 1>, ownerid: Types.Oid<0 | 1>, dbid: Types.Oid<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgPromote(a0: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function pgPromote(...args: unknown[]) {
    return sqlFunction("pg_promote", [{args: [Types.Bool<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgReadBinaryFile(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bytea<0 | 1>
export function pgReadBinaryFile(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bytea<0 | 1>
export function pgReadBinaryFile(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bytea<0 | 1>
export function pgReadBinaryFile(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bytea<0 | 1>
export function pgReadBinaryFile(...args: unknown[]) {
    return sqlFunction("pg_read_binary_file", [{args: [Types.Text<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Int8<0 | 1>, Types.Int8<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgReadFile(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function pgReadFile(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
export function pgReadFile(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Text<0 | 1>
export function pgReadFile(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
export function pgReadFile(...args: unknown[]) {
    return sqlFunction("pg_read_file", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Int8<0 | 1>, Types.Int8<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgRelationFilenode(a0: Types.Regclass<0 | 1>): Types.Oid<0 | 1>
export function pgRelationFilenode(...args: unknown[]) {
    return sqlFunction("pg_relation_filenode", [{args: [Types.Regclass<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgRelationFilepath(a0: Types.Regclass<0 | 1>): Types.Text<0 | 1>
export function pgRelationFilepath(...args: unknown[]) {
    return sqlFunction("pg_relation_filepath", [{args: [Types.Regclass<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgRelationIsPublishable(a0: Types.Regclass<0 | 1>): Types.Bool<0 | 1>
export function pgRelationIsPublishable(...args: unknown[]) {
    return sqlFunction("pg_relation_is_publishable", [{args: [Types.Regclass<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgRelationIsUpdatable(a0: Types.Regclass<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Int4<0 | 1>
export function pgRelationIsUpdatable(...args: unknown[]) {
    return sqlFunction("pg_relation_is_updatable", [{args: [Types.Regclass<0 | 1>, Types.Bool<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgRelationSize(a0: Types.Regclass<0 | 1>): Types.Int8<0 | 1>
export function pgRelationSize(a0: Types.Regclass<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int8<0 | 1>
export function pgRelationSize(...args: unknown[]) {
    return sqlFunction("pg_relation_size", [{args: [Types.Regclass<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regclass<0 | 1>, Types.Text<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgReloadConf(): Types.Bool<0 | 1>
export function pgReloadConf(...args: unknown[]) {
    return sqlFunction("pg_reload_conf", [{args: [], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgReplicationOriginAdvance(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.PgLsn<0 | 1>): Types.Void<0 | 1>
export function pgReplicationOriginAdvance(...args: unknown[]) {
    return sqlFunction("pg_replication_origin_advance", [{args: [Types.Text<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgReplicationOriginCreate(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Oid<0 | 1>
export function pgReplicationOriginCreate(...args: unknown[]) {
    return sqlFunction("pg_replication_origin_create", [{args: [Types.Text<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgReplicationOriginDrop(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Void<0 | 1>
export function pgReplicationOriginDrop(...args: unknown[]) {
    return sqlFunction("pg_replication_origin_drop", [{args: [Types.Text<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgReplicationOriginOid(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Oid<0 | 1>
export function pgReplicationOriginOid(...args: unknown[]) {
    return sqlFunction("pg_replication_origin_oid", [{args: [Types.Text<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgReplicationOriginProgress(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.PgLsn<0 | 1>
export function pgReplicationOriginProgress(...args: unknown[]) {
    return sqlFunction("pg_replication_origin_progress", [{args: [Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgReplicationOriginSessionIsSetup(): Types.Bool<0 | 1>
export function pgReplicationOriginSessionIsSetup(...args: unknown[]) {
    return sqlFunction("pg_replication_origin_session_is_setup", [{args: [], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgReplicationOriginSessionProgress(a0: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.PgLsn<0 | 1>
export function pgReplicationOriginSessionProgress(...args: unknown[]) {
    return sqlFunction("pg_replication_origin_session_progress", [{args: [Types.Bool<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgReplicationOriginSessionReset(): Types.Void<0 | 1>
export function pgReplicationOriginSessionReset(...args: unknown[]) {
    return sqlFunction("pg_replication_origin_session_reset", [{args: [], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgReplicationOriginSessionSetup(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Void<0 | 1>
export function pgReplicationOriginSessionSetup(...args: unknown[]) {
    return sqlFunction("pg_replication_origin_session_setup", [{args: [Types.Text<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgReplicationOriginXactReset(): Types.Void<0 | 1>
export function pgReplicationOriginXactReset(...args: unknown[]) {
    return sqlFunction("pg_replication_origin_xact_reset", [{args: [], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgReplicationOriginXactSetup(a0: Types.PgLsn<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Void<0 | 1>
export function pgReplicationOriginXactSetup(...args: unknown[]) {
    return sqlFunction("pg_replication_origin_xact_setup", [{args: [Types.PgLsn<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgReplicationSlotAdvance(a0: Types.Name<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Record<0 | 1, {slot_name: Types.Name<0 | 1>, end_lsn: Types.PgLsn<0 | 1>}>
export function pgReplicationSlotAdvance(...args: unknown[]) {
    return sqlFunction("pg_replication_slot_advance", [{args: [Types.Name<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Record.of({slot_name: Types.Name<0 | 1>, end_lsn: Types.PgLsn<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgRotateLogfile(): Types.Bool<0 | 1>
export function pgRotateLogfile(...args: unknown[]) {
    return sqlFunction("pg_rotate_logfile", [{args: [], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgSafeSnapshotBlockingPids(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Array<0 | 1, Types.Int4<0 | 1>>
export function pgSafeSnapshotBlockingPids(...args: unknown[]) {
    return sqlFunction("pg_safe_snapshot_blocking_pids", [{args: [Types.Int4<0 | 1>], ret: Types.Array.of(Types.Int4<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgSequenceLastValue(a0: Types.Regclass<0 | 1>): Types.Int8<0 | 1>
export function pgSequenceLastValue(...args: unknown[]) {
    return sqlFunction("pg_sequence_last_value", [{args: [Types.Regclass<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgSequenceParameters(a0: Types.Oid<0 | 1>): Types.Record<0 | 1, {start_value: Types.Int8<0 | 1>, minimum_value: Types.Int8<0 | 1>, maximum_value: Types.Int8<0 | 1>, increment: Types.Int8<0 | 1>, cycle_option: Types.Bool<0 | 1>, cache_size: Types.Int8<0 | 1>, data_type: Types.Oid<0 | 1>}>
export function pgSequenceParameters(...args: unknown[]) {
    return sqlFunction("pg_sequence_parameters", [{args: [Types.Oid<0 | 1>], ret: Types.Record.of({start_value: Types.Int8<0 | 1>, minimum_value: Types.Int8<0 | 1>, maximum_value: Types.Int8<0 | 1>, increment: Types.Int8<0 | 1>, cycle_option: Types.Bool<0 | 1>, cache_size: Types.Int8<0 | 1>, data_type: Types.Oid<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgSettingsGetFlags(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
export function pgSettingsGetFlags(...args: unknown[]) {
    return sqlFunction("pg_settings_get_flags", [{args: [Types.Text<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgShowAllFileSettings(): Types.FromItem<{sourcefile: Types.Text<0 | 1>, sourceline: Types.Int4<0 | 1>, seqno: Types.Int4<0 | 1>, name: Types.Text<0 | 1>, setting: Types.Text<0 | 1>, applied: Types.Bool<0 | 1>, error: Types.Text<0 | 1>}>
export function pgShowAllFileSettings(...args: unknown[]) {
    return sqlFunction("pg_show_all_file_settings", [{args: [], ret: Types.FromItem.ofSchema({sourcefile: Types.Text<0 | 1>, sourceline: Types.Int4<0 | 1>, seqno: Types.Int4<0 | 1>, name: Types.Text<0 | 1>, setting: Types.Text<0 | 1>, applied: Types.Bool<0 | 1>, error: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgShowAllSettings(): Types.FromItem<{name: Types.Text<0 | 1>, setting: Types.Text<0 | 1>, unit: Types.Text<0 | 1>, category: Types.Text<0 | 1>, short_desc: Types.Text<0 | 1>, extra_desc: Types.Text<0 | 1>, context: Types.Text<0 | 1>, vartype: Types.Text<0 | 1>, source: Types.Text<0 | 1>, min_val: Types.Text<0 | 1>, max_val: Types.Text<0 | 1>, enumvals: Types.Array<0 | 1, Types.Text<0 | 1>>, boot_val: Types.Text<0 | 1>, reset_val: Types.Text<0 | 1>, sourcefile: Types.Text<0 | 1>, sourceline: Types.Int4<0 | 1>, pending_restart: Types.Bool<0 | 1>}>
export function pgShowAllSettings(...args: unknown[]) {
    return sqlFunction("pg_show_all_settings", [{args: [], ret: Types.FromItem.ofSchema({name: Types.Text<0 | 1>, setting: Types.Text<0 | 1>, unit: Types.Text<0 | 1>, category: Types.Text<0 | 1>, short_desc: Types.Text<0 | 1>, extra_desc: Types.Text<0 | 1>, context: Types.Text<0 | 1>, vartype: Types.Text<0 | 1>, source: Types.Text<0 | 1>, min_val: Types.Text<0 | 1>, max_val: Types.Text<0 | 1>, enumvals: Types.Array.of(Types.Text<0 | 1>), boot_val: Types.Text<0 | 1>, reset_val: Types.Text<0 | 1>, sourcefile: Types.Text<0 | 1>, sourceline: Types.Int4<0 | 1>, pending_restart: Types.Bool<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgShowReplicationOriginStatus(): Types.FromItem<{local_id: Types.Oid<0 | 1>, external_id: Types.Text<0 | 1>, remote_lsn: Types.PgLsn<0 | 1>, local_lsn: Types.PgLsn<0 | 1>}>
export function pgShowReplicationOriginStatus(...args: unknown[]) {
    return sqlFunction("pg_show_replication_origin_status", [{args: [], ret: Types.FromItem.ofSchema({local_id: Types.Oid<0 | 1>, external_id: Types.Text<0 | 1>, remote_lsn: Types.PgLsn<0 | 1>, local_lsn: Types.PgLsn<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgSizeBytes(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int8<0 | 1>
export function pgSizeBytes(...args: unknown[]) {
    return sqlFunction("pg_size_bytes", [{args: [Types.Text<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgSizePretty(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Text<0 | 1>
export function pgSizePretty(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Text<0 | 1>
export function pgSizePretty(...args: unknown[]) {
    return sqlFunction("pg_size_pretty", [{args: [Types.Int8<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgSleep(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Void<0 | 1>
export function pgSleep(...args: unknown[]) {
    return sqlFunction("pg_sleep", [{args: [Types.Float8<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgSleepFor(a0: Types.Interval<0 | 1>): Types.Void<0 | 1>
export function pgSleepFor(...args: unknown[]) {
    return sqlFunction("pg_sleep_for", [{args: [Types.Interval<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgSleepUntil(a0: Types.Timestamptz<0 | 1>): Types.Void<0 | 1>
export function pgSleepUntil(...args: unknown[]) {
    return sqlFunction("pg_sleep_until", [{args: [Types.Timestamptz<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgSnapshotXip(a0: Types.PgSnapshot<0 | 1>): Types.FromItem<{}>
export function pgSnapshotXip(...args: unknown[]) {
    return sqlFunction("pg_snapshot_xip", [{args: [Types.PgSnapshot<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgSnapshotXmax(a0: Types.PgSnapshot<0 | 1>): Types.Xid8<0 | 1>
export function pgSnapshotXmax(...args: unknown[]) {
    return sqlFunction("pg_snapshot_xmax", [{args: [Types.PgSnapshot<0 | 1>], ret: Types.Xid8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgSplitWalfileName(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Record<0 | 1, {segment_number: Types.Numeric<0 | 1>, timeline_id: Types.Int8<0 | 1>}>
export function pgSplitWalfileName(...args: unknown[]) {
    return sqlFunction("pg_split_walfile_name", [{args: [Types.Text<0 | 1>], ret: Types.Record.of({segment_number: Types.Numeric<0 | 1>, timeline_id: Types.Int8<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatClearSnapshot(): Types.Void<0 | 1>
export function pgStatClearSnapshot(...args: unknown[]) {
    return sqlFunction("pg_stat_clear_snapshot", [{args: [], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatFile(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Record<0 | 1, {size: Types.Int8<0 | 1>, access: Types.Timestamptz<0 | 1>, modification: Types.Timestamptz<0 | 1>, change: Types.Timestamptz<0 | 1>, creation: Types.Timestamptz<0 | 1>, isdir: Types.Bool<0 | 1>}>
export function pgStatFile(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Record<0 | 1, {size: Types.Int8<0 | 1>, access: Types.Timestamptz<0 | 1>, modification: Types.Timestamptz<0 | 1>, change: Types.Timestamptz<0 | 1>, creation: Types.Timestamptz<0 | 1>, isdir: Types.Bool<0 | 1>}>
export function pgStatFile(...args: unknown[]) {
    return sqlFunction("pg_stat_file", [{args: [Types.Text<0 | 1>], ret: Types.Record.of({size: Types.Int8<0 | 1>, access: Types.Timestamptz<0 | 1>, modification: Types.Timestamptz<0 | 1>, change: Types.Timestamptz<0 | 1>, creation: Types.Timestamptz<0 | 1>, isdir: Types.Bool<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.Record.of({size: Types.Int8<0 | 1>, access: Types.Timestamptz<0 | 1>, modification: Types.Timestamptz<0 | 1>, change: Types.Timestamptz<0 | 1>, creation: Types.Timestamptz<0 | 1>, isdir: Types.Bool<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatForceNextFlush(): Types.Void<0 | 1>
export function pgStatForceNextFlush(...args: unknown[]) {
    return sqlFunction("pg_stat_force_next_flush", [{args: [], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetActivity(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.FromItem<{datid: Types.Oid<0 | 1>, pid: Types.Int4<0 | 1>, usesysid: Types.Oid<0 | 1>, application_name: Types.Text<0 | 1>, state: Types.Text<0 | 1>, query: Types.Text<0 | 1>, wait_event_type: Types.Text<0 | 1>, wait_event: Types.Text<0 | 1>, xact_start: Types.Timestamptz<0 | 1>, query_start: Types.Timestamptz<0 | 1>, backend_start: Types.Timestamptz<0 | 1>, state_change: Types.Timestamptz<0 | 1>, client_addr: Types.Inet<0 | 1>, client_hostname: Types.Text<0 | 1>, client_port: Types.Int4<0 | 1>, backend_xid: Types.Xid<0 | 1>, backend_xmin: Types.Xid<0 | 1>, backend_type: Types.Text<0 | 1>, ssl: Types.Bool<0 | 1>, sslversion: Types.Text<0 | 1>, sslcipher: Types.Text<0 | 1>, sslbits: Types.Int4<0 | 1>, ssl_client_dn: Types.Text<0 | 1>, ssl_client_serial: Types.Numeric<0 | 1>, ssl_issuer_dn: Types.Text<0 | 1>, gss_auth: Types.Bool<0 | 1>, gss_princ: Types.Text<0 | 1>, gss_enc: Types.Bool<0 | 1>, gss_delegation: Types.Bool<0 | 1>, leader_pid: Types.Int4<0 | 1>, query_id: Types.Int8<0 | 1>}>
export function pgStatGetActivity(...args: unknown[]) {
    return sqlFunction("pg_stat_get_activity", [{args: [Types.Int4<0 | 1>], ret: Types.FromItem.ofSchema({datid: Types.Oid<0 | 1>, pid: Types.Int4<0 | 1>, usesysid: Types.Oid<0 | 1>, application_name: Types.Text<0 | 1>, state: Types.Text<0 | 1>, query: Types.Text<0 | 1>, wait_event_type: Types.Text<0 | 1>, wait_event: Types.Text<0 | 1>, xact_start: Types.Timestamptz<0 | 1>, query_start: Types.Timestamptz<0 | 1>, backend_start: Types.Timestamptz<0 | 1>, state_change: Types.Timestamptz<0 | 1>, client_addr: Types.Inet<0 | 1>, client_hostname: Types.Text<0 | 1>, client_port: Types.Int4<0 | 1>, backend_xid: Types.Xid<0 | 1>, backend_xmin: Types.Xid<0 | 1>, backend_type: Types.Text<0 | 1>, ssl: Types.Bool<0 | 1>, sslversion: Types.Text<0 | 1>, sslcipher: Types.Text<0 | 1>, sslbits: Types.Int4<0 | 1>, ssl_client_dn: Types.Text<0 | 1>, ssl_client_serial: Types.Numeric<0 | 1>, ssl_issuer_dn: Types.Text<0 | 1>, gss_auth: Types.Bool<0 | 1>, gss_princ: Types.Text<0 | 1>, gss_enc: Types.Bool<0 | 1>, gss_delegation: Types.Bool<0 | 1>, leader_pid: Types.Int4<0 | 1>, query_id: Types.Int8<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetAnalyzeCount(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetAnalyzeCount(...args: unknown[]) {
    return sqlFunction("pg_stat_get_analyze_count", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetArchiver(): Types.Record<0 | 1, {archived_count: Types.Int8<0 | 1>, last_archived_wal: Types.Text<0 | 1>, last_archived_time: Types.Timestamptz<0 | 1>, failed_count: Types.Int8<0 | 1>, last_failed_wal: Types.Text<0 | 1>, last_failed_time: Types.Timestamptz<0 | 1>, stats_reset: Types.Timestamptz<0 | 1>}>
export function pgStatGetArchiver(...args: unknown[]) {
    return sqlFunction("pg_stat_get_archiver", [{args: [], ret: Types.Record.of({archived_count: Types.Int8<0 | 1>, last_archived_wal: Types.Text<0 | 1>, last_archived_time: Types.Timestamptz<0 | 1>, failed_count: Types.Int8<0 | 1>, last_failed_wal: Types.Text<0 | 1>, last_failed_time: Types.Timestamptz<0 | 1>, stats_reset: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetAutoanalyzeCount(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetAutoanalyzeCount(...args: unknown[]) {
    return sqlFunction("pg_stat_get_autoanalyze_count", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetAutovacuumCount(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetAutovacuumCount(...args: unknown[]) {
    return sqlFunction("pg_stat_get_autovacuum_count", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetBackendActivity(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function pgStatGetBackendActivity(...args: unknown[]) {
    return sqlFunction("pg_stat_get_backend_activity", [{args: [Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetBackendActivityStart(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Timestamptz<0 | 1>
export function pgStatGetBackendActivityStart(...args: unknown[]) {
    return sqlFunction("pg_stat_get_backend_activity_start", [{args: [Types.Int4<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetBackendClientAddr(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Inet<0 | 1>
export function pgStatGetBackendClientAddr(...args: unknown[]) {
    return sqlFunction("pg_stat_get_backend_client_addr", [{args: [Types.Int4<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetBackendClientPort(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function pgStatGetBackendClientPort(...args: unknown[]) {
    return sqlFunction("pg_stat_get_backend_client_port", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetBackendDbid(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Oid<0 | 1>
export function pgStatGetBackendDbid(...args: unknown[]) {
    return sqlFunction("pg_stat_get_backend_dbid", [{args: [Types.Int4<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetBackendIdset(): Types.FromItem<{}>
export function pgStatGetBackendIdset(...args: unknown[]) {
    return sqlFunction("pg_stat_get_backend_idset", [{args: [], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetBackendPid(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function pgStatGetBackendPid(...args: unknown[]) {
    return sqlFunction("pg_stat_get_backend_pid", [{args: [Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetBackendStart(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Timestamptz<0 | 1>
export function pgStatGetBackendStart(...args: unknown[]) {
    return sqlFunction("pg_stat_get_backend_start", [{args: [Types.Int4<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetBackendSubxact(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Record<0 | 1, {subxact_count: Types.Int4<0 | 1>, subxact_overflowed: Types.Bool<0 | 1>}>
export function pgStatGetBackendSubxact(...args: unknown[]) {
    return sqlFunction("pg_stat_get_backend_subxact", [{args: [Types.Int4<0 | 1>], ret: Types.Record.of({subxact_count: Types.Int4<0 | 1>, subxact_overflowed: Types.Bool<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetBackendUserid(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Oid<0 | 1>
export function pgStatGetBackendUserid(...args: unknown[]) {
    return sqlFunction("pg_stat_get_backend_userid", [{args: [Types.Int4<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetBackendWaitEvent(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function pgStatGetBackendWaitEvent(...args: unknown[]) {
    return sqlFunction("pg_stat_get_backend_wait_event", [{args: [Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetBackendWaitEventType(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function pgStatGetBackendWaitEventType(...args: unknown[]) {
    return sqlFunction("pg_stat_get_backend_wait_event_type", [{args: [Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetBackendXactStart(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Timestamptz<0 | 1>
export function pgStatGetBackendXactStart(...args: unknown[]) {
    return sqlFunction("pg_stat_get_backend_xact_start", [{args: [Types.Int4<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetBgwriterBufWrittenClean(): Types.Int8<0 | 1>
export function pgStatGetBgwriterBufWrittenClean(...args: unknown[]) {
    return sqlFunction("pg_stat_get_bgwriter_buf_written_clean", [{args: [], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetBgwriterMaxwrittenClean(): Types.Int8<0 | 1>
export function pgStatGetBgwriterMaxwrittenClean(...args: unknown[]) {
    return sqlFunction("pg_stat_get_bgwriter_maxwritten_clean", [{args: [], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetBgwriterStatResetTime(): Types.Timestamptz<0 | 1>
export function pgStatGetBgwriterStatResetTime(...args: unknown[]) {
    return sqlFunction("pg_stat_get_bgwriter_stat_reset_time", [{args: [], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetBlocksFetched(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetBlocksFetched(...args: unknown[]) {
    return sqlFunction("pg_stat_get_blocks_fetched", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetBlocksHit(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetBlocksHit(...args: unknown[]) {
    return sqlFunction("pg_stat_get_blocks_hit", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetBufAlloc(): Types.Int8<0 | 1>
export function pgStatGetBufAlloc(...args: unknown[]) {
    return sqlFunction("pg_stat_get_buf_alloc", [{args: [], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetCheckpointerBuffersWritten(): Types.Int8<0 | 1>
export function pgStatGetCheckpointerBuffersWritten(...args: unknown[]) {
    return sqlFunction("pg_stat_get_checkpointer_buffers_written", [{args: [], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetCheckpointerNumRequested(): Types.Int8<0 | 1>
export function pgStatGetCheckpointerNumRequested(...args: unknown[]) {
    return sqlFunction("pg_stat_get_checkpointer_num_requested", [{args: [], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetCheckpointerNumTimed(): Types.Int8<0 | 1>
export function pgStatGetCheckpointerNumTimed(...args: unknown[]) {
    return sqlFunction("pg_stat_get_checkpointer_num_timed", [{args: [], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetCheckpointerRestartpointsPerformed(): Types.Int8<0 | 1>
export function pgStatGetCheckpointerRestartpointsPerformed(...args: unknown[]) {
    return sqlFunction("pg_stat_get_checkpointer_restartpoints_performed", [{args: [], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetCheckpointerRestartpointsRequested(): Types.Int8<0 | 1>
export function pgStatGetCheckpointerRestartpointsRequested(...args: unknown[]) {
    return sqlFunction("pg_stat_get_checkpointer_restartpoints_requested", [{args: [], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetCheckpointerRestartpointsTimed(): Types.Int8<0 | 1>
export function pgStatGetCheckpointerRestartpointsTimed(...args: unknown[]) {
    return sqlFunction("pg_stat_get_checkpointer_restartpoints_timed", [{args: [], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetCheckpointerStatResetTime(): Types.Timestamptz<0 | 1>
export function pgStatGetCheckpointerStatResetTime(...args: unknown[]) {
    return sqlFunction("pg_stat_get_checkpointer_stat_reset_time", [{args: [], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetCheckpointerSyncTime(): Types.Float8<0 | 1>
export function pgStatGetCheckpointerSyncTime(...args: unknown[]) {
    return sqlFunction("pg_stat_get_checkpointer_sync_time", [{args: [], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetCheckpointerWriteTime(): Types.Float8<0 | 1>
export function pgStatGetCheckpointerWriteTime(...args: unknown[]) {
    return sqlFunction("pg_stat_get_checkpointer_write_time", [{args: [], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbActiveTime(a0: Types.Oid<0 | 1>): Types.Float8<0 | 1>
export function pgStatGetDbActiveTime(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_active_time", [{args: [Types.Oid<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbBlkReadTime(a0: Types.Oid<0 | 1>): Types.Float8<0 | 1>
export function pgStatGetDbBlkReadTime(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_blk_read_time", [{args: [Types.Oid<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbBlkWriteTime(a0: Types.Oid<0 | 1>): Types.Float8<0 | 1>
export function pgStatGetDbBlkWriteTime(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_blk_write_time", [{args: [Types.Oid<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbBlocksFetched(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbBlocksFetched(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_blocks_fetched", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbBlocksHit(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbBlocksHit(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_blocks_hit", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbChecksumFailures(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbChecksumFailures(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_checksum_failures", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbChecksumLastFailure(a0: Types.Oid<0 | 1>): Types.Timestamptz<0 | 1>
export function pgStatGetDbChecksumLastFailure(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_checksum_last_failure", [{args: [Types.Oid<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbConflictAll(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbConflictAll(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_conflict_all", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbConflictLock(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbConflictLock(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_conflict_lock", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbConflictLogicalslot(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbConflictLogicalslot(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_conflict_logicalslot", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbConflictSnapshot(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbConflictSnapshot(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_conflict_snapshot", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbConflictStartupDeadlock(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbConflictStartupDeadlock(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_conflict_startup_deadlock", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbConflictTablespace(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbConflictTablespace(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_conflict_tablespace", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbDeadlocks(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbDeadlocks(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_deadlocks", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbIdleInTransactionTime(a0: Types.Oid<0 | 1>): Types.Float8<0 | 1>
export function pgStatGetDbIdleInTransactionTime(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_idle_in_transaction_time", [{args: [Types.Oid<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbNumbackends(a0: Types.Oid<0 | 1>): Types.Int4<0 | 1>
export function pgStatGetDbNumbackends(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_numbackends", [{args: [Types.Oid<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbSessionTime(a0: Types.Oid<0 | 1>): Types.Float8<0 | 1>
export function pgStatGetDbSessionTime(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_session_time", [{args: [Types.Oid<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbSessions(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbSessions(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_sessions", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbSessionsAbandoned(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbSessionsAbandoned(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_sessions_abandoned", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbSessionsFatal(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbSessionsFatal(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_sessions_fatal", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbSessionsKilled(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbSessionsKilled(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_sessions_killed", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbStatResetTime(a0: Types.Oid<0 | 1>): Types.Timestamptz<0 | 1>
export function pgStatGetDbStatResetTime(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_stat_reset_time", [{args: [Types.Oid<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbTempBytes(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbTempBytes(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_temp_bytes", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbTempFiles(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbTempFiles(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_temp_files", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbTuplesDeleted(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbTuplesDeleted(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_tuples_deleted", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbTuplesFetched(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbTuplesFetched(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_tuples_fetched", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbTuplesInserted(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbTuplesInserted(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_tuples_inserted", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbTuplesReturned(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbTuplesReturned(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_tuples_returned", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbTuplesUpdated(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbTuplesUpdated(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_tuples_updated", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbXactCommit(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbXactCommit(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_xact_commit", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDbXactRollback(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDbXactRollback(...args: unknown[]) {
    return sqlFunction("pg_stat_get_db_xact_rollback", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetDeadTuples(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetDeadTuples(...args: unknown[]) {
    return sqlFunction("pg_stat_get_dead_tuples", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetFunctionCalls(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetFunctionCalls(...args: unknown[]) {
    return sqlFunction("pg_stat_get_function_calls", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetFunctionSelfTime(a0: Types.Oid<0 | 1>): Types.Float8<0 | 1>
export function pgStatGetFunctionSelfTime(...args: unknown[]) {
    return sqlFunction("pg_stat_get_function_self_time", [{args: [Types.Oid<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetFunctionTotalTime(a0: Types.Oid<0 | 1>): Types.Float8<0 | 1>
export function pgStatGetFunctionTotalTime(...args: unknown[]) {
    return sqlFunction("pg_stat_get_function_total_time", [{args: [Types.Oid<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetInsSinceVacuum(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetInsSinceVacuum(...args: unknown[]) {
    return sqlFunction("pg_stat_get_ins_since_vacuum", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetIo(): Types.FromItem<{backend_type: Types.Text<0 | 1>, object: Types.Text<0 | 1>, context: Types.Text<0 | 1>, reads: Types.Int8<0 | 1>, read_time: Types.Float8<0 | 1>, writes: Types.Int8<0 | 1>, write_time: Types.Float8<0 | 1>, writebacks: Types.Int8<0 | 1>, writeback_time: Types.Float8<0 | 1>, extends: Types.Int8<0 | 1>, extend_time: Types.Float8<0 | 1>, op_bytes: Types.Int8<0 | 1>, hits: Types.Int8<0 | 1>, evictions: Types.Int8<0 | 1>, reuses: Types.Int8<0 | 1>, fsyncs: Types.Int8<0 | 1>, fsync_time: Types.Float8<0 | 1>, stats_reset: Types.Timestamptz<0 | 1>}>
export function pgStatGetIo(...args: unknown[]) {
    return sqlFunction("pg_stat_get_io", [{args: [], ret: Types.FromItem.ofSchema({backend_type: Types.Text<0 | 1>, object: Types.Text<0 | 1>, context: Types.Text<0 | 1>, reads: Types.Int8<0 | 1>, read_time: Types.Float8<0 | 1>, writes: Types.Int8<0 | 1>, write_time: Types.Float8<0 | 1>, writebacks: Types.Int8<0 | 1>, writeback_time: Types.Float8<0 | 1>, extends: Types.Int8<0 | 1>, extend_time: Types.Float8<0 | 1>, op_bytes: Types.Int8<0 | 1>, hits: Types.Int8<0 | 1>, evictions: Types.Int8<0 | 1>, reuses: Types.Int8<0 | 1>, fsyncs: Types.Int8<0 | 1>, fsync_time: Types.Float8<0 | 1>, stats_reset: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetLastAnalyzeTime(a0: Types.Oid<0 | 1>): Types.Timestamptz<0 | 1>
export function pgStatGetLastAnalyzeTime(...args: unknown[]) {
    return sqlFunction("pg_stat_get_last_analyze_time", [{args: [Types.Oid<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetLastAutoanalyzeTime(a0: Types.Oid<0 | 1>): Types.Timestamptz<0 | 1>
export function pgStatGetLastAutoanalyzeTime(...args: unknown[]) {
    return sqlFunction("pg_stat_get_last_autoanalyze_time", [{args: [Types.Oid<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetLastAutovacuumTime(a0: Types.Oid<0 | 1>): Types.Timestamptz<0 | 1>
export function pgStatGetLastAutovacuumTime(...args: unknown[]) {
    return sqlFunction("pg_stat_get_last_autovacuum_time", [{args: [Types.Oid<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetLastVacuumTime(a0: Types.Oid<0 | 1>): Types.Timestamptz<0 | 1>
export function pgStatGetLastVacuumTime(...args: unknown[]) {
    return sqlFunction("pg_stat_get_last_vacuum_time", [{args: [Types.Oid<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetLastscan(a0: Types.Oid<0 | 1>): Types.Timestamptz<0 | 1>
export function pgStatGetLastscan(...args: unknown[]) {
    return sqlFunction("pg_stat_get_lastscan", [{args: [Types.Oid<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetLiveTuples(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetLiveTuples(...args: unknown[]) {
    return sqlFunction("pg_stat_get_live_tuples", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetModSinceAnalyze(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetModSinceAnalyze(...args: unknown[]) {
    return sqlFunction("pg_stat_get_mod_since_analyze", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetNumscans(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetNumscans(...args: unknown[]) {
    return sqlFunction("pg_stat_get_numscans", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetProgressInfo(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{pid: Types.Int4<0 | 1>, datid: Types.Oid<0 | 1>, relid: Types.Oid<0 | 1>, param1: Types.Int8<0 | 1>, param2: Types.Int8<0 | 1>, param3: Types.Int8<0 | 1>, param4: Types.Int8<0 | 1>, param5: Types.Int8<0 | 1>, param6: Types.Int8<0 | 1>, param7: Types.Int8<0 | 1>, param8: Types.Int8<0 | 1>, param9: Types.Int8<0 | 1>, param10: Types.Int8<0 | 1>, param11: Types.Int8<0 | 1>, param12: Types.Int8<0 | 1>, param13: Types.Int8<0 | 1>, param14: Types.Int8<0 | 1>, param15: Types.Int8<0 | 1>, param16: Types.Int8<0 | 1>, param17: Types.Int8<0 | 1>, param18: Types.Int8<0 | 1>, param19: Types.Int8<0 | 1>, param20: Types.Int8<0 | 1>}>
export function pgStatGetProgressInfo(...args: unknown[]) {
    return sqlFunction("pg_stat_get_progress_info", [{args: [Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({pid: Types.Int4<0 | 1>, datid: Types.Oid<0 | 1>, relid: Types.Oid<0 | 1>, param1: Types.Int8<0 | 1>, param2: Types.Int8<0 | 1>, param3: Types.Int8<0 | 1>, param4: Types.Int8<0 | 1>, param5: Types.Int8<0 | 1>, param6: Types.Int8<0 | 1>, param7: Types.Int8<0 | 1>, param8: Types.Int8<0 | 1>, param9: Types.Int8<0 | 1>, param10: Types.Int8<0 | 1>, param11: Types.Int8<0 | 1>, param12: Types.Int8<0 | 1>, param13: Types.Int8<0 | 1>, param14: Types.Int8<0 | 1>, param15: Types.Int8<0 | 1>, param16: Types.Int8<0 | 1>, param17: Types.Int8<0 | 1>, param18: Types.Int8<0 | 1>, param19: Types.Int8<0 | 1>, param20: Types.Int8<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetRecoveryPrefetch(): Types.FromItem<{stats_reset: Types.Timestamptz<0 | 1>, prefetch: Types.Int8<0 | 1>, hit: Types.Int8<0 | 1>, skip_init: Types.Int8<0 | 1>, skip_new: Types.Int8<0 | 1>, skip_fpw: Types.Int8<0 | 1>, skip_rep: Types.Int8<0 | 1>, wal_distance: Types.Int4<0 | 1>, block_distance: Types.Int4<0 | 1>, io_depth: Types.Int4<0 | 1>}>
export function pgStatGetRecoveryPrefetch(...args: unknown[]) {
    return sqlFunction("pg_stat_get_recovery_prefetch", [{args: [], ret: Types.FromItem.ofSchema({stats_reset: Types.Timestamptz<0 | 1>, prefetch: Types.Int8<0 | 1>, hit: Types.Int8<0 | 1>, skip_init: Types.Int8<0 | 1>, skip_new: Types.Int8<0 | 1>, skip_fpw: Types.Int8<0 | 1>, skip_rep: Types.Int8<0 | 1>, wal_distance: Types.Int4<0 | 1>, block_distance: Types.Int4<0 | 1>, io_depth: Types.Int4<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetReplicationSlot(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Record<0 | 1, {slot_name: Types.Text<0 | 1>, spill_txns: Types.Int8<0 | 1>, spill_count: Types.Int8<0 | 1>, spill_bytes: Types.Int8<0 | 1>, stream_txns: Types.Int8<0 | 1>, stream_count: Types.Int8<0 | 1>, stream_bytes: Types.Int8<0 | 1>, total_txns: Types.Int8<0 | 1>, total_bytes: Types.Int8<0 | 1>, stats_reset: Types.Timestamptz<0 | 1>}>
export function pgStatGetReplicationSlot(...args: unknown[]) {
    return sqlFunction("pg_stat_get_replication_slot", [{args: [Types.Text<0 | 1>], ret: Types.Record.of({slot_name: Types.Text<0 | 1>, spill_txns: Types.Int8<0 | 1>, spill_count: Types.Int8<0 | 1>, spill_bytes: Types.Int8<0 | 1>, stream_txns: Types.Int8<0 | 1>, stream_count: Types.Int8<0 | 1>, stream_bytes: Types.Int8<0 | 1>, total_txns: Types.Int8<0 | 1>, total_bytes: Types.Int8<0 | 1>, stats_reset: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetSlru(): Types.FromItem<{name: Types.Text<0 | 1>, blks_zeroed: Types.Int8<0 | 1>, blks_hit: Types.Int8<0 | 1>, blks_read: Types.Int8<0 | 1>, blks_written: Types.Int8<0 | 1>, blks_exists: Types.Int8<0 | 1>, flushes: Types.Int8<0 | 1>, truncates: Types.Int8<0 | 1>, stats_reset: Types.Timestamptz<0 | 1>}>
export function pgStatGetSlru(...args: unknown[]) {
    return sqlFunction("pg_stat_get_slru", [{args: [], ret: Types.FromItem.ofSchema({name: Types.Text<0 | 1>, blks_zeroed: Types.Int8<0 | 1>, blks_hit: Types.Int8<0 | 1>, blks_read: Types.Int8<0 | 1>, blks_written: Types.Int8<0 | 1>, blks_exists: Types.Int8<0 | 1>, flushes: Types.Int8<0 | 1>, truncates: Types.Int8<0 | 1>, stats_reset: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetSnapshotTimestamp(): Types.Timestamptz<0 | 1>
export function pgStatGetSnapshotTimestamp(...args: unknown[]) {
    return sqlFunction("pg_stat_get_snapshot_timestamp", [{args: [], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetSubscription(a0: Types.Oid<0 | 1>): Types.FromItem<{subid: Types.Oid<0 | 1>, relid: Types.Oid<0 | 1>, pid: Types.Int4<0 | 1>, leader_pid: Types.Int4<0 | 1>, received_lsn: Types.PgLsn<0 | 1>, last_msg_send_time: Types.Timestamptz<0 | 1>, last_msg_receipt_time: Types.Timestamptz<0 | 1>, latest_end_lsn: Types.PgLsn<0 | 1>, latest_end_time: Types.Timestamptz<0 | 1>, worker_type: Types.Text<0 | 1>}>
export function pgStatGetSubscription(...args: unknown[]) {
    return sqlFunction("pg_stat_get_subscription", [{args: [Types.Oid<0 | 1>], ret: Types.FromItem.ofSchema({subid: Types.Oid<0 | 1>, relid: Types.Oid<0 | 1>, pid: Types.Int4<0 | 1>, leader_pid: Types.Int4<0 | 1>, received_lsn: Types.PgLsn<0 | 1>, last_msg_send_time: Types.Timestamptz<0 | 1>, last_msg_receipt_time: Types.Timestamptz<0 | 1>, latest_end_lsn: Types.PgLsn<0 | 1>, latest_end_time: Types.Timestamptz<0 | 1>, worker_type: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetSubscriptionStats(a0: Types.Oid<0 | 1>): Types.Record<0 | 1, {subid: Types.Oid<0 | 1>, apply_error_count: Types.Int8<0 | 1>, sync_error_count: Types.Int8<0 | 1>, stats_reset: Types.Timestamptz<0 | 1>}>
export function pgStatGetSubscriptionStats(...args: unknown[]) {
    return sqlFunction("pg_stat_get_subscription_stats", [{args: [Types.Oid<0 | 1>], ret: Types.Record.of({subid: Types.Oid<0 | 1>, apply_error_count: Types.Int8<0 | 1>, sync_error_count: Types.Int8<0 | 1>, stats_reset: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetTuplesDeleted(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetTuplesDeleted(...args: unknown[]) {
    return sqlFunction("pg_stat_get_tuples_deleted", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetTuplesFetched(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetTuplesFetched(...args: unknown[]) {
    return sqlFunction("pg_stat_get_tuples_fetched", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetTuplesHotUpdated(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetTuplesHotUpdated(...args: unknown[]) {
    return sqlFunction("pg_stat_get_tuples_hot_updated", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetTuplesInserted(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetTuplesInserted(...args: unknown[]) {
    return sqlFunction("pg_stat_get_tuples_inserted", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetTuplesNewpageUpdated(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetTuplesNewpageUpdated(...args: unknown[]) {
    return sqlFunction("pg_stat_get_tuples_newpage_updated", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetTuplesReturned(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetTuplesReturned(...args: unknown[]) {
    return sqlFunction("pg_stat_get_tuples_returned", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetTuplesUpdated(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetTuplesUpdated(...args: unknown[]) {
    return sqlFunction("pg_stat_get_tuples_updated", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetVacuumCount(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetVacuumCount(...args: unknown[]) {
    return sqlFunction("pg_stat_get_vacuum_count", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetWal(): Types.Record<0 | 1, {wal_records: Types.Int8<0 | 1>, wal_fpi: Types.Int8<0 | 1>, wal_bytes: Types.Numeric<0 | 1>, wal_buffers_full: Types.Int8<0 | 1>, wal_write: Types.Int8<0 | 1>, wal_sync: Types.Int8<0 | 1>, wal_write_time: Types.Float8<0 | 1>, wal_sync_time: Types.Float8<0 | 1>, stats_reset: Types.Timestamptz<0 | 1>}>
export function pgStatGetWal(...args: unknown[]) {
    return sqlFunction("pg_stat_get_wal", [{args: [], ret: Types.Record.of({wal_records: Types.Int8<0 | 1>, wal_fpi: Types.Int8<0 | 1>, wal_bytes: Types.Numeric<0 | 1>, wal_buffers_full: Types.Int8<0 | 1>, wal_write: Types.Int8<0 | 1>, wal_sync: Types.Int8<0 | 1>, wal_write_time: Types.Float8<0 | 1>, wal_sync_time: Types.Float8<0 | 1>, stats_reset: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetWalReceiver(): Types.Record<0 | 1, {pid: Types.Int4<0 | 1>, status: Types.Text<0 | 1>, receive_start_lsn: Types.PgLsn<0 | 1>, receive_start_tli: Types.Int4<0 | 1>, written_lsn: Types.PgLsn<0 | 1>, flushed_lsn: Types.PgLsn<0 | 1>, received_tli: Types.Int4<0 | 1>, last_msg_send_time: Types.Timestamptz<0 | 1>, last_msg_receipt_time: Types.Timestamptz<0 | 1>, latest_end_lsn: Types.PgLsn<0 | 1>, latest_end_time: Types.Timestamptz<0 | 1>, slot_name: Types.Text<0 | 1>, sender_host: Types.Text<0 | 1>, sender_port: Types.Int4<0 | 1>, conninfo: Types.Text<0 | 1>}>
export function pgStatGetWalReceiver(...args: unknown[]) {
    return sqlFunction("pg_stat_get_wal_receiver", [{args: [], ret: Types.Record.of({pid: Types.Int4<0 | 1>, status: Types.Text<0 | 1>, receive_start_lsn: Types.PgLsn<0 | 1>, receive_start_tli: Types.Int4<0 | 1>, written_lsn: Types.PgLsn<0 | 1>, flushed_lsn: Types.PgLsn<0 | 1>, received_tli: Types.Int4<0 | 1>, last_msg_send_time: Types.Timestamptz<0 | 1>, last_msg_receipt_time: Types.Timestamptz<0 | 1>, latest_end_lsn: Types.PgLsn<0 | 1>, latest_end_time: Types.Timestamptz<0 | 1>, slot_name: Types.Text<0 | 1>, sender_host: Types.Text<0 | 1>, sender_port: Types.Int4<0 | 1>, conninfo: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetWalSenders(): Types.FromItem<{pid: Types.Int4<0 | 1>, state: Types.Text<0 | 1>, sent_lsn: Types.PgLsn<0 | 1>, write_lsn: Types.PgLsn<0 | 1>, flush_lsn: Types.PgLsn<0 | 1>, replay_lsn: Types.PgLsn<0 | 1>, write_lag: Types.Interval<0 | 1>, flush_lag: Types.Interval<0 | 1>, replay_lag: Types.Interval<0 | 1>, sync_priority: Types.Int4<0 | 1>, sync_state: Types.Text<0 | 1>, reply_time: Types.Timestamptz<0 | 1>}>
export function pgStatGetWalSenders(...args: unknown[]) {
    return sqlFunction("pg_stat_get_wal_senders", [{args: [], ret: Types.FromItem.ofSchema({pid: Types.Int4<0 | 1>, state: Types.Text<0 | 1>, sent_lsn: Types.PgLsn<0 | 1>, write_lsn: Types.PgLsn<0 | 1>, flush_lsn: Types.PgLsn<0 | 1>, replay_lsn: Types.PgLsn<0 | 1>, write_lag: Types.Interval<0 | 1>, flush_lag: Types.Interval<0 | 1>, replay_lag: Types.Interval<0 | 1>, sync_priority: Types.Int4<0 | 1>, sync_state: Types.Text<0 | 1>, reply_time: Types.Timestamptz<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetXactBlocksFetched(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetXactBlocksFetched(...args: unknown[]) {
    return sqlFunction("pg_stat_get_xact_blocks_fetched", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetXactBlocksHit(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetXactBlocksHit(...args: unknown[]) {
    return sqlFunction("pg_stat_get_xact_blocks_hit", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetXactFunctionCalls(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetXactFunctionCalls(...args: unknown[]) {
    return sqlFunction("pg_stat_get_xact_function_calls", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetXactFunctionSelfTime(a0: Types.Oid<0 | 1>): Types.Float8<0 | 1>
export function pgStatGetXactFunctionSelfTime(...args: unknown[]) {
    return sqlFunction("pg_stat_get_xact_function_self_time", [{args: [Types.Oid<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetXactFunctionTotalTime(a0: Types.Oid<0 | 1>): Types.Float8<0 | 1>
export function pgStatGetXactFunctionTotalTime(...args: unknown[]) {
    return sqlFunction("pg_stat_get_xact_function_total_time", [{args: [Types.Oid<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetXactNumscans(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetXactNumscans(...args: unknown[]) {
    return sqlFunction("pg_stat_get_xact_numscans", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetXactTuplesDeleted(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetXactTuplesDeleted(...args: unknown[]) {
    return sqlFunction("pg_stat_get_xact_tuples_deleted", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetXactTuplesFetched(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetXactTuplesFetched(...args: unknown[]) {
    return sqlFunction("pg_stat_get_xact_tuples_fetched", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetXactTuplesHotUpdated(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetXactTuplesHotUpdated(...args: unknown[]) {
    return sqlFunction("pg_stat_get_xact_tuples_hot_updated", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetXactTuplesInserted(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetXactTuplesInserted(...args: unknown[]) {
    return sqlFunction("pg_stat_get_xact_tuples_inserted", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetXactTuplesNewpageUpdated(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetXactTuplesNewpageUpdated(...args: unknown[]) {
    return sqlFunction("pg_stat_get_xact_tuples_newpage_updated", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetXactTuplesReturned(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetXactTuplesReturned(...args: unknown[]) {
    return sqlFunction("pg_stat_get_xact_tuples_returned", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatGetXactTuplesUpdated(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgStatGetXactTuplesUpdated(...args: unknown[]) {
    return sqlFunction("pg_stat_get_xact_tuples_updated", [{args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatHaveStats(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Oid<0 | 1>, a2: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function pgStatHaveStats(...args: unknown[]) {
    return sqlFunction("pg_stat_have_stats", [{args: [Types.Text<0 | 1>, Types.Oid<0 | 1>, Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatReset(): Types.Void<0 | 1>
export function pgStatReset(...args: unknown[]) {
    return sqlFunction("pg_stat_reset", [{args: [], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatResetReplicationSlot(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Void<0 | 1>
export function pgStatResetReplicationSlot(...args: unknown[]) {
    return sqlFunction("pg_stat_reset_replication_slot", [{args: [Types.Text<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatResetShared(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Void<0 | 1>
export function pgStatResetShared(...args: unknown[]) {
    return sqlFunction("pg_stat_reset_shared", [{args: [Types.Text<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatResetSingleFunctionCounters(a0: Types.Oid<0 | 1>): Types.Void<0 | 1>
export function pgStatResetSingleFunctionCounters(...args: unknown[]) {
    return sqlFunction("pg_stat_reset_single_function_counters", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatResetSingleTableCounters(a0: Types.Oid<0 | 1>): Types.Void<0 | 1>
export function pgStatResetSingleTableCounters(...args: unknown[]) {
    return sqlFunction("pg_stat_reset_single_table_counters", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatResetSlru(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Void<0 | 1>
export function pgStatResetSlru(...args: unknown[]) {
    return sqlFunction("pg_stat_reset_slru", [{args: [Types.Text<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatResetSubscriptionStats(a0: Types.Oid<0 | 1>): Types.Void<0 | 1>
export function pgStatResetSubscriptionStats(...args: unknown[]) {
    return sqlFunction("pg_stat_reset_subscription_stats", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStatisticsObjIsVisible(a0: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function pgStatisticsObjIsVisible(...args: unknown[]) {
    return sqlFunction("pg_statistics_obj_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgStopMakingPinnedObjects(): Types.Void<0 | 1>
export function pgStopMakingPinnedObjects(...args: unknown[]) {
    return sqlFunction("pg_stop_making_pinned_objects", [{args: [], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgSwitchWal(): Types.PgLsn<0 | 1>
export function pgSwitchWal(...args: unknown[]) {
    return sqlFunction("pg_switch_wal", [{args: [], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgSyncReplicationSlots(): Types.Void<0 | 1>
export function pgSyncReplicationSlots(...args: unknown[]) {
    return sqlFunction("pg_sync_replication_slots", [{args: [], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgTableIsVisible(a0: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function pgTableIsVisible(...args: unknown[]) {
    return sqlFunction("pg_table_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgTableSize(a0: Types.Regclass<0 | 1>): Types.Int8<0 | 1>
export function pgTableSize(...args: unknown[]) {
    return sqlFunction("pg_table_size", [{args: [Types.Regclass<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgTablespaceDatabases(a0: Types.Oid<0 | 1>): Types.FromItem<{}>
export function pgTablespaceDatabases(...args: unknown[]) {
    return sqlFunction("pg_tablespace_databases", [{args: [Types.Oid<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgTablespaceLocation(a0: Types.Oid<0 | 1>): Types.Text<0 | 1>
export function pgTablespaceLocation(...args: unknown[]) {
    return sqlFunction("pg_tablespace_location", [{args: [Types.Oid<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgTablespaceSize(a0: Types.Name<0 | 1>): Types.Int8<0 | 1>
export function pgTablespaceSize(a0: Types.Oid<0 | 1>): Types.Int8<0 | 1>
export function pgTablespaceSize(...args: unknown[]) {
    return sqlFunction("pg_tablespace_size", [{args: [Types.Name<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Oid<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgTerminateBackend(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function pgTerminateBackend(...args: unknown[]) {
    return sqlFunction("pg_terminate_backend", [{args: [Types.Int4<0 | 1>, Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgTimezoneAbbrevs(): Types.FromItem<{abbrev: Types.Text<0 | 1>, utc_offset: Types.Interval<0 | 1>, is_dst: Types.Bool<0 | 1>}>
export function pgTimezoneAbbrevs(...args: unknown[]) {
    return sqlFunction("pg_timezone_abbrevs", [{args: [], ret: Types.FromItem.ofSchema({abbrev: Types.Text<0 | 1>, utc_offset: Types.Interval<0 | 1>, is_dst: Types.Bool<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgTimezoneNames(): Types.FromItem<{name: Types.Text<0 | 1>, abbrev: Types.Text<0 | 1>, utc_offset: Types.Interval<0 | 1>, is_dst: Types.Bool<0 | 1>}>
export function pgTimezoneNames(...args: unknown[]) {
    return sqlFunction("pg_timezone_names", [{args: [], ret: Types.FromItem.ofSchema({name: Types.Text<0 | 1>, abbrev: Types.Text<0 | 1>, utc_offset: Types.Interval<0 | 1>, is_dst: Types.Bool<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgTotalRelationSize(a0: Types.Regclass<0 | 1>): Types.Int8<0 | 1>
export function pgTotalRelationSize(...args: unknown[]) {
    return sqlFunction("pg_total_relation_size", [{args: [Types.Regclass<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgTriggerDepth(): Types.Int4<0 | 1>
export function pgTriggerDepth(...args: unknown[]) {
    return sqlFunction("pg_trigger_depth", [{args: [], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgTryAdvisoryLock(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function pgTryAdvisoryLock(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function pgTryAdvisoryLock(...args: unknown[]) {
    return sqlFunction("pg_try_advisory_lock", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgTryAdvisoryLockShared(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function pgTryAdvisoryLockShared(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function pgTryAdvisoryLockShared(...args: unknown[]) {
    return sqlFunction("pg_try_advisory_lock_shared", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgTryAdvisoryXactLock(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function pgTryAdvisoryXactLock(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function pgTryAdvisoryXactLock(...args: unknown[]) {
    return sqlFunction("pg_try_advisory_xact_lock", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgTryAdvisoryXactLockShared(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function pgTryAdvisoryXactLockShared(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Bool<0 | 1>
export function pgTryAdvisoryXactLockShared(...args: unknown[]) {
    return sqlFunction("pg_try_advisory_xact_lock_shared", [{args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgTsConfigIsVisible(a0: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function pgTsConfigIsVisible(...args: unknown[]) {
    return sqlFunction("pg_ts_config_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgTsDictIsVisible(a0: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function pgTsDictIsVisible(...args: unknown[]) {
    return sqlFunction("pg_ts_dict_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgTsParserIsVisible(a0: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function pgTsParserIsVisible(...args: unknown[]) {
    return sqlFunction("pg_ts_parser_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgTsTemplateIsVisible(a0: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function pgTsTemplateIsVisible(...args: unknown[]) {
    return sqlFunction("pg_ts_template_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgTypeIsVisible(a0: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function pgTypeIsVisible(...args: unknown[]) {
    return sqlFunction("pg_type_is_visible", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgTypeof(a0: Types.Any<unknown, 0 | 1>): Types.Regtype<0 | 1>
export function pgTypeof(...args: unknown[]) {
    return sqlFunction("pg_typeof", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Regtype<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgVisibleInSnapshot(a0: Types.Xid8<0 | 1>, a1: Types.PgSnapshot<0 | 1>): Types.Bool<0 | 1>
export function pgVisibleInSnapshot(...args: unknown[]) {
    return sqlFunction("pg_visible_in_snapshot", [{args: [Types.Xid8<0 | 1>, Types.PgSnapshot<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgWalLsnDiff(a0: Types.PgLsn<0 | 1>, a1: Types.PgLsn<0 | 1>): Types.Numeric<0 | 1>
export function pgWalLsnDiff(...args: unknown[]) {
    return sqlFunction("pg_wal_lsn_diff", [{args: [Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgWalReplayPause(): Types.Void<0 | 1>
export function pgWalReplayPause(...args: unknown[]) {
    return sqlFunction("pg_wal_replay_pause", [{args: [], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgWalReplayResume(): Types.Void<0 | 1>
export function pgWalReplayResume(...args: unknown[]) {
    return sqlFunction("pg_wal_replay_resume", [{args: [], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgWalSummaryContents(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.PgLsn<0 | 1>, a2: Types.PgLsn<0 | 1>): Types.FromItem<{relfilenode: Types.Oid<0 | 1>, reltablespace: Types.Oid<0 | 1>, reldatabase: Types.Oid<0 | 1>, relforknumber: Types.Int2<0 | 1>, relblocknumber: Types.Int8<0 | 1>, is_limit_block: Types.Bool<0 | 1>}>
export function pgWalSummaryContents(...args: unknown[]) {
    return sqlFunction("pg_wal_summary_contents", [{args: [Types.Int8<0 | 1>, Types.PgLsn<0 | 1>, Types.PgLsn<0 | 1>], ret: Types.FromItem.ofSchema({relfilenode: Types.Oid<0 | 1>, reltablespace: Types.Oid<0 | 1>, reldatabase: Types.Oid<0 | 1>, relforknumber: Types.Int2<0 | 1>, relblocknumber: Types.Int8<0 | 1>, is_limit_block: Types.Bool<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgWalfileName(a0: Types.PgLsn<0 | 1>): Types.Text<0 | 1>
export function pgWalfileName(...args: unknown[]) {
    return sqlFunction("pg_walfile_name", [{args: [Types.PgLsn<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgWalfileNameOffset(a0: Types.PgLsn<0 | 1>): Types.Record<0 | 1, {file_name: Types.Text<0 | 1>, file_offset: Types.Int4<0 | 1>}>
export function pgWalfileNameOffset(...args: unknown[]) {
    return sqlFunction("pg_walfile_name_offset", [{args: [Types.PgLsn<0 | 1>], ret: Types.Record.of({file_name: Types.Text<0 | 1>, file_offset: Types.Int4<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgXactCommitTimestamp(a0: Types.Xid<0 | 1>): Types.Timestamptz<0 | 1>
export function pgXactCommitTimestamp(...args: unknown[]) {
    return sqlFunction("pg_xact_commit_timestamp", [{args: [Types.Xid<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pgXactStatus(a0: Types.Xid8<0 | 1>): Types.Text<0 | 1>
export function pgXactStatus(...args: unknown[]) {
    return sqlFunction("pg_xact_status", [{args: [Types.Xid8<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function phrasetoTsquery(a0: Types.Regconfig<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<0 | 1>
export function phrasetoTsquery(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<0 | 1>
export function phrasetoTsquery(...args: unknown[]) {
    return sqlFunction("phraseto_tsquery", [{args: [Types.Regconfig<0 | 1>, Types.Text<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pi(): Types.Float8<0 | 1>
export function pi(...args: unknown[]) {
    return sqlFunction("pi", [{args: [], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function plaintoTsquery(a0: Types.Regconfig<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<0 | 1>
export function plaintoTsquery(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<0 | 1>
export function plaintoTsquery(...args: unknown[]) {
    return sqlFunction("plainto_tsquery", [{args: [Types.Regconfig<0 | 1>, Types.Text<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function plpgsqlCallHandler(): Types.LanguageHandler<0 | 1>
export function plpgsqlCallHandler(...args: unknown[]) {
    return sqlFunction("plpgsql_call_handler", [{args: [], ret: Types.LanguageHandler<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function plpgsqlValidator(a0: Types.Oid<0 | 1>): Types.Void<0 | 1>
export function plpgsqlValidator(...args: unknown[]) {
    return sqlFunction("plpgsql_validator", [{args: [Types.Oid<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function point(a0: Types.Box<0 | 1>): Types.Point<0 | 1>
export function point(a0: Types.Circle<0 | 1>): Types.Point<0 | 1>
export function point(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Point<0 | 1>
export function point(a0: Types.Lseg<0 | 1>): Types.Point<0 | 1>
export function point(a0: Types.Polygon<0 | 1>): Types.Point<0 | 1>
export function point(...args: unknown[]) {
    return sqlFunction("point", [{args: [Types.Box<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Circle<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Lseg<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Polygon<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pointAbove(a0: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
export function pointAbove(a0: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
export function pointAbove(...args: unknown[]) {
    return sqlFunction("point_above", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pointAdd(a0: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Point<0 | 1>
export function pointAdd(...args: unknown[]) {
    return sqlFunction("point_add", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pointBelow(a0: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
export function pointBelow(a0: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
export function pointBelow(...args: unknown[]) {
    return sqlFunction("point_below", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pointDistance(a0: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
export function pointDistance(...args: unknown[]) {
    return sqlFunction("point_distance", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pointDiv(a0: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Point<0 | 1>
export function pointDiv(...args: unknown[]) {
    return sqlFunction("point_div", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pointEq(a0: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
export function pointEq(...args: unknown[]) {
    return sqlFunction("point_eq", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pointHoriz(a0: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
export function pointHoriz(...args: unknown[]) {
    return sqlFunction("point_horiz", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pointLeft(a0: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
export function pointLeft(...args: unknown[]) {
    return sqlFunction("point_left", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pointMul(a0: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Point<0 | 1>
export function pointMul(...args: unknown[]) {
    return sqlFunction("point_mul", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pointNe(a0: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
export function pointNe(...args: unknown[]) {
    return sqlFunction("point_ne", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pointRight(a0: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
export function pointRight(...args: unknown[]) {
    return sqlFunction("point_right", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pointSub(a0: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Point<0 | 1>
export function pointSub(...args: unknown[]) {
    return sqlFunction("point_sub", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pointVert(a0: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
export function pointVert(...args: unknown[]) {
    return sqlFunction("point_vert", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function polyAbove(a0: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
export function polyAbove(...args: unknown[]) {
    return sqlFunction("poly_above", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function polyBelow(a0: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
export function polyBelow(...args: unknown[]) {
    return sqlFunction("poly_below", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function polyCenter(a0: Types.Polygon<0 | 1>): Types.Point<0 | 1>
export function polyCenter(...args: unknown[]) {
    return sqlFunction("poly_center", [{args: [Types.Polygon<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function polyContainPt(a0: Types.Polygon<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
export function polyContainPt(...args: unknown[]) {
    return sqlFunction("poly_contain_pt", [{args: [Types.Polygon<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function polyContained(a0: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
export function polyContained(...args: unknown[]) {
    return sqlFunction("poly_contained", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function polyDistance(a0: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Float8<0 | 1>
export function polyDistance(...args: unknown[]) {
    return sqlFunction("poly_distance", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function polyLeft(a0: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
export function polyLeft(...args: unknown[]) {
    return sqlFunction("poly_left", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function polyNpoints(a0: Types.Polygon<0 | 1>): Types.Int4<0 | 1>
export function polyNpoints(...args: unknown[]) {
    return sqlFunction("poly_npoints", [{args: [Types.Polygon<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function polyOverabove(a0: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
export function polyOverabove(...args: unknown[]) {
    return sqlFunction("poly_overabove", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function polyOverbelow(a0: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
export function polyOverbelow(...args: unknown[]) {
    return sqlFunction("poly_overbelow", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function polyOverlap(a0: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
export function polyOverlap(...args: unknown[]) {
    return sqlFunction("poly_overlap", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function polyOverleft(a0: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
export function polyOverleft(...args: unknown[]) {
    return sqlFunction("poly_overleft", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function polyOverright(a0: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
export function polyOverright(...args: unknown[]) {
    return sqlFunction("poly_overright", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function polyRight(a0: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
export function polyRight(...args: unknown[]) {
    return sqlFunction("poly_right", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function polySame(a0: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
export function polySame(...args: unknown[]) {
    return sqlFunction("poly_same", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function polygon(a0: Types.Box<0 | 1>): Types.Polygon<0 | 1>
export function polygon(a0: Types.Circle<0 | 1>): Types.Polygon<0 | 1>
export function polygon(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Circle<0 | 1>): Types.Polygon<0 | 1>
export function polygon(a0: Types.Path<0 | 1>): Types.Polygon<0 | 1>
export function polygon(...args: unknown[]) {
    return sqlFunction("polygon", [{args: [Types.Box<0 | 1>], ret: Types.Polygon<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Circle<0 | 1>], ret: Types.Polygon<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Circle<0 | 1>], ret: Types.Polygon<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Path<0 | 1>], ret: Types.Polygon<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function popen(a0: Types.Path<0 | 1>): Types.Path<0 | 1>
export function popen(...args: unknown[]) {
    return sqlFunction("popen", [{args: [Types.Path<0 | 1>], ret: Types.Path<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function position(a0: Types.Bit<0 | 1>, a1: Types.Bit<0 | 1>): Types.Int4<0 | 1>
export function position(a0: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Int4<0 | 1>
export function position(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
export function position(...args: unknown[]) {
    return sqlFunction("position", [{args: [Types.Bit<0 | 1>, Types.Bit<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function postgresqlFdwValidator(a0: Types.Array<0 | 1, Types.Text<0 | 1>>, a1: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function postgresqlFdwValidator(...args: unknown[]) {
    return sqlFunction("postgresql_fdw_validator", [{args: [Types.Array.of(Types.Text<0 | 1>), Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function pow(a0: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1>): Types.Float8<0 | 1>
export function pow(a0: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
export function pow(...args: unknown[]) {
    return sqlFunction("pow", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function power(a0: Types.Float8<0 | 1>, a1: Types.Float8<0 | 1>): Types.Float8<0 | 1>
export function power(a0: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
export function power(...args: unknown[]) {
    return sqlFunction("power", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function ptContainedCircle(a0: Types.Point<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
export function ptContainedCircle(...args: unknown[]) {
    return sqlFunction("pt_contained_circle", [{args: [Types.Point<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function ptContainedPoly(a0: Types.Point<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
export function ptContainedPoly(...args: unknown[]) {
    return sqlFunction("pt_contained_poly", [{args: [Types.Point<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function queryToXml(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
export function queryToXml(...args: unknown[]) {
    return sqlFunction("query_to_xml", [{args: [Types.Text<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function queryToXmlAndXmlschema(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
export function queryToXmlAndXmlschema(...args: unknown[]) {
    return sqlFunction("query_to_xml_and_xmlschema", [{args: [Types.Text<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function queryToXmlschema(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
export function queryToXmlschema(...args: unknown[]) {
    return sqlFunction("query_to_xmlschema", [{args: [Types.Text<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function querytree(a0: Types.Tsquery<0 | 1>): Types.Text<0 | 1>
export function querytree(...args: unknown[]) {
    return sqlFunction("querytree", [{args: [Types.Tsquery<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function quoteIdent(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function quoteIdent(...args: unknown[]) {
    return sqlFunction("quote_ident", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function quoteLiteral<T extends Types.Any>(a0: T): Types.Text<0 | 1>
export function quoteLiteral(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function quoteLiteral(...args: unknown[]) {
    return sqlFunction("quote_literal", [({T}) => ({args: [T], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}), {args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function quoteNullable<T extends Types.Any>(a0: T): Types.Text<0 | 1>
export function quoteNullable(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function quoteNullable(...args: unknown[]) {
    return sqlFunction("quote_nullable", [({T}) => ({args: [T], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}), {args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function radians(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function radians(...args: unknown[]) {
    return sqlFunction("radians", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function radius(a0: Types.Circle<0 | 1>): Types.Float8<0 | 1>
export function radius(...args: unknown[]) {
    return sqlFunction("radius", [{args: [Types.Circle<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function random(): Types.Float8<0 | 1>
export function random(a0: Types.Int4<0 | 1>, a1: Types.Int4<0 | 1>): Types.Int4<0 | 1>
export function random(a0: Types.Int8<0 | 1>, a1: Types.Int8<0 | 1>): Types.Int8<0 | 1>
export function random(a0: Types.Numeric<0 | 1>, a1: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
export function random(...args: unknown[]) {
    return sqlFunction("random", [{args: [], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function randomNormal(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function randomNormal(...args: unknown[]) {
    return sqlFunction("random_normal", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeAdjacent<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeAdjacent(...args: unknown[]) {
    return sqlFunction("range_adjacent", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeAdjacentMultirange<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeAdjacentMultirange(...args: unknown[]) {
    return sqlFunction("range_adjacent_multirange", [{args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeAfter<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeAfter(...args: unknown[]) {
    return sqlFunction("range_after", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeAfterMultirange<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeAfterMultirange(...args: unknown[]) {
    return sqlFunction("range_after_multirange", [{args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeAgg<T extends Types.Any>(a0: Types.Anymultirange<number, T>): Types.Anymultirange<0 | 1, T>
export function rangeAgg<T extends Types.Any>(a0: Types.Anyrange<number, T>): Types.Anymultirange<0 | 1, T>
export function rangeAgg(...args: unknown[]) {
    return sqlFunction("range_agg", [{args: [Types.Anymultirange], ret: Types.Anymultirange, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Anyrange], ret: Types.Anymultirange, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeBefore<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeBefore(...args: unknown[]) {
    return sqlFunction("range_before", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeBeforeMultirange<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeBeforeMultirange(...args: unknown[]) {
    return sqlFunction("range_before_multirange", [{args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeCmp<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Int4<0 | 1>
export function rangeCmp(...args: unknown[]) {
    return sqlFunction("range_cmp", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeContainedBy<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeContainedBy(...args: unknown[]) {
    return sqlFunction("range_contained_by", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeContainedByMultirange<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeContainedByMultirange(...args: unknown[]) {
    return sqlFunction("range_contained_by_multirange", [{args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeContains<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeContains(...args: unknown[]) {
    return sqlFunction("range_contains", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeContainsElem<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: T): Types.Bool<0 | 1>
export function rangeContainsElem(...args: unknown[]) {
    return sqlFunction("range_contains_elem", [({T}) => ({args: [Types.Anyrange, T], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function rangeContainsMultirange<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeContainsMultirange(...args: unknown[]) {
    return sqlFunction("range_contains_multirange", [{args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeEq<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeEq(...args: unknown[]) {
    return sqlFunction("range_eq", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeGe<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeGe(...args: unknown[]) {
    return sqlFunction("range_ge", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeGt<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeGt(...args: unknown[]) {
    return sqlFunction("range_gt", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeIntersect<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Anyrange<0 | 1, T>
export function rangeIntersect(...args: unknown[]) {
    return sqlFunction("range_intersect", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Anyrange, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeIntersectAgg<T extends Types.Any>(a0: Types.Anymultirange<number, T>): Types.Anymultirange<0 | 1, T>
export function rangeIntersectAgg<T extends Types.Any>(a0: Types.Anyrange<number, T>): Types.Anyrange<0 | 1, T>
export function rangeIntersectAgg(...args: unknown[]) {
    return sqlFunction("range_intersect_agg", [{args: [Types.Anymultirange], ret: Types.Anymultirange, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Anyrange], ret: Types.Anyrange, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeIntersectAggTransfn<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Anyrange<0 | 1, T>
export function rangeIntersectAggTransfn(...args: unknown[]) {
    return sqlFunction("range_intersect_agg_transfn", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Anyrange, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeLe<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeLe(...args: unknown[]) {
    return sqlFunction("range_le", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeLt<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeLt(...args: unknown[]) {
    return sqlFunction("range_lt", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeMerge<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>): Types.Anyrange<0 | 1, T>
export function rangeMerge<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Anyrange<0 | 1, T>
export function rangeMerge(...args: unknown[]) {
    return sqlFunction("range_merge", [{args: [Types.Anymultirange], ret: Types.Anyrange, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Anyrange, Types.Anyrange], ret: Types.Anyrange, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeMinus<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Anyrange<0 | 1, T>
export function rangeMinus(...args: unknown[]) {
    return sqlFunction("range_minus", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Anyrange, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeNe<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeNe(...args: unknown[]) {
    return sqlFunction("range_ne", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeOverlaps<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeOverlaps(...args: unknown[]) {
    return sqlFunction("range_overlaps", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeOverlapsMultirange<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeOverlapsMultirange(...args: unknown[]) {
    return sqlFunction("range_overlaps_multirange", [{args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeOverleft<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeOverleft(...args: unknown[]) {
    return sqlFunction("range_overleft", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeOverleftMultirange<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeOverleftMultirange(...args: unknown[]) {
    return sqlFunction("range_overleft_multirange", [{args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeOverright<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeOverright(...args: unknown[]) {
    return sqlFunction("range_overright", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeOverrightMultirange<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function rangeOverrightMultirange(...args: unknown[]) {
    return sqlFunction("range_overright_multirange", [{args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rangeUnion<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Anyrange<0 | 1, T>
export function rangeUnion(...args: unknown[]) {
    return sqlFunction("range_union", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Anyrange, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rank(): Types.Int8<0 | 1>
export function rank(a0: Types.Any<unknown, number>, ...variadic: Types.Any<unknown, number>[]): Types.Int8<0 | 1>
export function rank(...args: unknown[]) {
    return sqlFunction("rank", [{args: [], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Any<unknown, 0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function recordEq<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(a0: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
export function recordEq(...args: unknown[]) {
    return sqlFunction("record_eq", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function recordGe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(a0: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
export function recordGe(...args: unknown[]) {
    return sqlFunction("record_ge", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function recordGt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(a0: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
export function recordGt(...args: unknown[]) {
    return sqlFunction("record_gt", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function recordImageEq<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(a0: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
export function recordImageEq(...args: unknown[]) {
    return sqlFunction("record_image_eq", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function recordImageGe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(a0: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
export function recordImageGe(...args: unknown[]) {
    return sqlFunction("record_image_ge", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function recordImageGt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(a0: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
export function recordImageGt(...args: unknown[]) {
    return sqlFunction("record_image_gt", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function recordImageLe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(a0: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
export function recordImageLe(...args: unknown[]) {
    return sqlFunction("record_image_le", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function recordImageLt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(a0: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
export function recordImageLt(...args: unknown[]) {
    return sqlFunction("record_image_lt", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function recordImageNe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(a0: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
export function recordImageNe(...args: unknown[]) {
    return sqlFunction("record_image_ne", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function recordLe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(a0: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
export function recordLe(...args: unknown[]) {
    return sqlFunction("record_le", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function recordLt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(a0: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
export function recordLt(...args: unknown[]) {
    return sqlFunction("record_lt", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function recordNe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(a0: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
export function recordNe(...args: unknown[]) {
    return sqlFunction("record_ne", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function regclass(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Regclass<0 | 1>
export function regclass(...args: unknown[]) {
    return sqlFunction("regclass", [{args: [Types.Text<0 | 1>], ret: Types.Regclass<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function regexpCount(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
export function regexpCount(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function regexpCount(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
export function regexpCount(...args: unknown[]) {
    return sqlFunction("regexp_count", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function regexpInstr(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
export function regexpInstr(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function regexpInstr(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function regexpInstr(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function regexpInstr(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
export function regexpInstr(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a6: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function regexpInstr(...args: unknown[]) {
    return sqlFunction("regexp_instr", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function regexpLike(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function regexpLike(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function regexpLike(...args: unknown[]) {
    return sqlFunction("regexp_like", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function regexpMatch(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
export function regexpMatch(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
export function regexpMatch(...args: unknown[]) {
    return sqlFunction("regexp_match", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function regexpMatches(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
export function regexpMatches(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
export function regexpMatches(...args: unknown[]) {
    return sqlFunction("regexp_matches", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function regexpReplace(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function regexpReplace(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function regexpReplace(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function regexpReplace(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a5: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function regexpReplace(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function regexpReplace(...args: unknown[]) {
    return sqlFunction("regexp_replace", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function regexpSplitToArray(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
export function regexpSplitToArray(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
export function regexpSplitToArray(...args: unknown[]) {
    return sqlFunction("regexp_split_to_array", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function regexpSplitToTable(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
export function regexpSplitToTable(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
export function regexpSplitToTable(...args: unknown[]) {
    return sqlFunction("regexp_split_to_table", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function regexpSubstr(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function regexpSubstr(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function regexpSubstr(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function regexpSubstr(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function regexpSubstr(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a4: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a5: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function regexpSubstr(...args: unknown[]) {
    return sqlFunction("regexp_substr", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function regrAvgx(a0: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function regrAvgx(...args: unknown[]) {
    return sqlFunction("regr_avgx", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function regrAvgy(a0: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function regrAvgy(...args: unknown[]) {
    return sqlFunction("regr_avgy", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function regrCount(a0: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Int8<0 | 1>
export function regrCount(...args: unknown[]) {
    return sqlFunction("regr_count", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function regrIntercept(a0: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function regrIntercept(...args: unknown[]) {
    return sqlFunction("regr_intercept", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function regrR2(a0: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function regrR2(...args: unknown[]) {
    return sqlFunction("regr_r2", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function regrSlope(a0: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function regrSlope(...args: unknown[]) {
    return sqlFunction("regr_slope", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function regrSxx(a0: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function regrSxx(...args: unknown[]) {
    return sqlFunction("regr_sxx", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function regrSxy(a0: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function regrSxy(...args: unknown[]) {
    return sqlFunction("regr_sxy", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function regrSyy(a0: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function regrSyy(...args: unknown[]) {
    return sqlFunction("regr_syy", [{args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function repeat(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function repeat(...args: unknown[]) {
    return sqlFunction("repeat", [{args: [Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function replace(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function replace(...args: unknown[]) {
    return sqlFunction("replace", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function reverse(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function reverse(...args: unknown[]) {
    return sqlFunction("reverse", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function right(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function right(...args: unknown[]) {
    return sqlFunction("right", [{args: [Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function round(a0: Types.Float8<0 | 1>): Types.Float8<0 | 1>
export function round(a0: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
export function round(a0: Types.Numeric<0 | 1>, a1: Types.Int4<0 | 1>): Types.Numeric<0 | 1>
export function round(...args: unknown[]) {
    return sqlFunction("round", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rowNumber(): Types.Int8<0 | 1>
export function rowNumber(...args: unknown[]) {
    return sqlFunction("row_number", [{args: [], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rowSecurityActive(a0: Types.Oid<0 | 1>): Types.Bool<0 | 1>
export function rowSecurityActive(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function rowSecurityActive(...args: unknown[]) {
    return sqlFunction("row_security_active", [{args: [Types.Oid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rowToJson<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(a0: Types.Record<0 | 1, R>): Types.Json<0 | 1>
export function rowToJson<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(a0: Types.Record<0 | 1, R>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Json<0 | 1>
export function rowToJson(...args: unknown[]) {
    return sqlFunction("row_to_json", [({R}) => ({args: [Types.Record.of(R)], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}), ({R}) => ({args: [Types.Record.of(R), Types.Bool<0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function rpad(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function rpad(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function rpad(...args: unknown[]) {
    return sqlFunction("rpad", [{args: [Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function rtrim(a0: Types.Bytea<0 | 1>, a1: Types.Bytea<0 | 1>): Types.Bytea<0 | 1>
export function rtrim(a0: Types.Text<0 | 1>): Types.Text<0 | 1>
export function rtrim(a0: Types.Text<0 | 1>, a1: Types.Text<0 | 1>): Types.Text<0 | 1>
export function rtrim(...args: unknown[]) {
    return sqlFunction("rtrim", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function satisfiesHashPartition(a0: Types.Oid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a3: Types.Any<unknown, 0 | 1>, ...variadic: Types.Any<unknown, 0 | 1>[]): Types.Bool<0 | 1>
export function satisfiesHashPartition(...args: unknown[]) {
    return sqlFunction("satisfies_hash_partition", [{args: [Types.Oid<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], args);
}

export function scale(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Int4<0 | 1>
export function scale(...args: unknown[]) {
    return sqlFunction("scale", [{args: [Types.Numeric<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function schemaToXml(a0: Types.Name<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
export function schemaToXml(...args: unknown[]) {
    return sqlFunction("schema_to_xml", [{args: [Types.Name<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function schemaToXmlAndXmlschema(a0: Types.Name<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
export function schemaToXmlAndXmlschema(...args: unknown[]) {
    return sqlFunction("schema_to_xml_and_xmlschema", [{args: [Types.Name<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function schemaToXmlschema(a0: Types.Name<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
export function schemaToXmlschema(...args: unknown[]) {
    return sqlFunction("schema_to_xmlschema", [{args: [Types.Name<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function sessionUser(): Types.Name<0 | 1>
export function sessionUser(...args: unknown[]) {
    return sqlFunction("session_user", [{args: [], ret: Types.Name<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function setBit(a0: Types.Bit<0 | 1>, a1: Types.Int4<0 | 1>, a2: Types.Int4<0 | 1>): Types.Bit<0 | 1>
export function setBit(a0: Types.Bytea<0 | 1>, a1: Types.Int8<0 | 1>, a2: Types.Int4<0 | 1>): Types.Bytea<0 | 1>
export function setBit(...args: unknown[]) {
    return sqlFunction("set_bit", [{args: [Types.Bit<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Bytea<0 | 1>, Types.Int8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function setByte(a0: Types.Bytea<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bytea<0 | 1>
export function setByte(...args: unknown[]) {
    return sqlFunction("set_byte", [{args: [Types.Bytea<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function setConfig(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
export function setConfig(...args: unknown[]) {
    return sqlFunction("set_config", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function setMasklen(a0: Types.Cidr<0 | 1>, a1: Types.Int4<0 | 1>): Types.Cidr<0 | 1>
export function setMasklen(a0: Types.Inet<0 | 1>, a1: Types.Int4<0 | 1>): Types.Inet<0 | 1>
export function setMasklen(...args: unknown[]) {
    return sqlFunction("set_masklen", [{args: [Types.Cidr<0 | 1>, Types.Int4<0 | 1>], ret: Types.Cidr<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Inet<0 | 1>, Types.Int4<0 | 1>], ret: Types.Inet<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function setseed(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Void<0 | 1>
export function setseed(...args: unknown[]) {
    return sqlFunction("setseed", [{args: [Types.Float8<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function setval(a0: Types.Regclass<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function setval(a0: Types.Regclass<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Int8<0 | 1>
export function setval(...args: unknown[]) {
    return sqlFunction("setval", [{args: [Types.Regclass<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regclass<0 | 1>, Types.Int8<0 | 1>, Types.Bool<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function setweight(a0: Types.Tsvector<0 | 1>, a1: Types.Char<0 | 1>): Types.Tsvector<0 | 1>
export function setweight(a0: Types.Tsvector<0 | 1>, a1: Types.Char<0 | 1>, a2: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Tsvector<0 | 1>
export function setweight(...args: unknown[]) {
    return sqlFunction("setweight", [{args: [Types.Tsvector<0 | 1>, Types.Char<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Tsvector<0 | 1>, Types.Char<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function sha224(a0: Types.Bytea<0 | 1>): Types.Bytea<0 | 1>
export function sha224(...args: unknown[]) {
    return sqlFunction("sha224", [{args: [Types.Bytea<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function sha256(a0: Types.Bytea<0 | 1>): Types.Bytea<0 | 1>
export function sha256(...args: unknown[]) {
    return sqlFunction("sha256", [{args: [Types.Bytea<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function sha384(a0: Types.Bytea<0 | 1>): Types.Bytea<0 | 1>
export function sha384(...args: unknown[]) {
    return sqlFunction("sha384", [{args: [Types.Bytea<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function sha512(a0: Types.Bytea<0 | 1>): Types.Bytea<0 | 1>
export function sha512(...args: unknown[]) {
    return sqlFunction("sha512", [{args: [Types.Bytea<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function shobjDescription(a0: Types.Oid<0 | 1>, a1: Types.Name<0 | 1>): Types.Text<0 | 1>
export function shobjDescription(...args: unknown[]) {
    return sqlFunction("shobj_description", [{args: [Types.Oid<0 | 1>, Types.Name<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function sign(a0: Types.Float8<0 | 1>): Types.Float8<0 | 1>
export function sign(a0: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
export function sign(...args: unknown[]) {
    return sqlFunction("sign", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function similarEscape(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function similarEscape(...args: unknown[]) {
    return sqlFunction("similar_escape", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function similarToEscape(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function similarToEscape(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function similarToEscape(...args: unknown[]) {
    return sqlFunction("similar_to_escape", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function sin(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function sin(...args: unknown[]) {
    return sqlFunction("sin", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function sind(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function sind(...args: unknown[]) {
    return sqlFunction("sind", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function sinh(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function sinh(...args: unknown[]) {
    return sqlFunction("sinh", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function slope(a0: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
export function slope(...args: unknown[]) {
    return sqlFunction("slope", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function spgPolyQuadCompress(a0: Types.Polygon<0 | 1>): Types.Box<0 | 1>
export function spgPolyQuadCompress(...args: unknown[]) {
    return sqlFunction("spg_poly_quad_compress", [{args: [Types.Polygon<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function splitPart(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function splitPart(...args: unknown[]) {
    return sqlFunction("split_part", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function sqrt(a0: Types.Float8<0 | 1>): Types.Float8<0 | 1>
export function sqrt(a0: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
export function sqrt(...args: unknown[]) {
    return sqlFunction("sqrt", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function startsWith(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function startsWith(...args: unknown[]) {
    return sqlFunction("starts_with", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function statementTimestamp(): Types.Timestamptz<0 | 1>
export function statementTimestamp(...args: unknown[]) {
    return sqlFunction("statement_timestamp", [{args: [], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function stddev(a0: Types.Float4<number>): Types.Float8<0 | 1>
export function stddev(a0: Types.Float8<number>): Types.Float8<0 | 1>
export function stddev(a0: Types.Int2<number>): Types.Numeric<0 | 1>
export function stddev(a0: Types.Int4<number>): Types.Numeric<0 | 1>
export function stddev(a0: Types.Int8<number>): Types.Numeric<0 | 1>
export function stddev(a0: Types.Numeric<number>): Types.Numeric<0 | 1>
export function stddev(...args: unknown[]) {
    return sqlFunction("stddev", [{args: [Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function stddevPop(a0: Types.Float4<number>): Types.Float8<0 | 1>
export function stddevPop(a0: Types.Float8<number>): Types.Float8<0 | 1>
export function stddevPop(a0: Types.Int2<number>): Types.Numeric<0 | 1>
export function stddevPop(a0: Types.Int4<number>): Types.Numeric<0 | 1>
export function stddevPop(a0: Types.Int8<number>): Types.Numeric<0 | 1>
export function stddevPop(a0: Types.Numeric<number>): Types.Numeric<0 | 1>
export function stddevPop(...args: unknown[]) {
    return sqlFunction("stddev_pop", [{args: [Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function stddevSamp(a0: Types.Float4<number>): Types.Float8<0 | 1>
export function stddevSamp(a0: Types.Float8<number>): Types.Float8<0 | 1>
export function stddevSamp(a0: Types.Int2<number>): Types.Numeric<0 | 1>
export function stddevSamp(a0: Types.Int4<number>): Types.Numeric<0 | 1>
export function stddevSamp(a0: Types.Int8<number>): Types.Numeric<0 | 1>
export function stddevSamp(a0: Types.Numeric<number>): Types.Numeric<0 | 1>
export function stddevSamp(...args: unknown[]) {
    return sqlFunction("stddev_samp", [{args: [Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function stringAgg(a0: Types.Bytea<number>, a1: Types.Bytea<number>): Types.Bytea<0 | 1>
export function stringAgg(a0: Types.Text<number>, a1: Types.Text<number>): Types.Text<0 | 1>
export function stringAgg(...args: unknown[]) {
    return sqlFunction("string_agg", [{args: [Types.Bytea<0 | 1>, Types.Bytea<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function stringToArray(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
export function stringToArray(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
export function stringToArray(...args: unknown[]) {
    return sqlFunction("string_to_array", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function stringToTable(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
export function stringToTable(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{}>
export function stringToTable(...args: unknown[]) {
    return sqlFunction("string_to_table", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function strip(a0: Types.Tsvector<0 | 1>): Types.Tsvector<0 | 1>
export function strip(...args: unknown[]) {
    return sqlFunction("strip", [{args: [Types.Tsvector<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function strpos(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
export function strpos(...args: unknown[]) {
    return sqlFunction("strpos", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function substr(a0: Types.Bytea<0 | 1>, a1: Types.Int4<0 | 1>): Types.Bytea<0 | 1>
export function substr(a0: Types.Bytea<0 | 1>, a1: Types.Int4<0 | 1>, a2: Types.Int4<0 | 1>): Types.Bytea<0 | 1>
export function substr(a0: Types.Text<0 | 1>, a1: Types.Int4<0 | 1>): Types.Text<0 | 1>
export function substr(a0: Types.Text<0 | 1>, a1: Types.Int4<0 | 1>, a2: Types.Int4<0 | 1>): Types.Text<0 | 1>
export function substr(...args: unknown[]) {
    return sqlFunction("substr", [{args: [Types.Bytea<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Bytea<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function substring(a0: Types.Bit<0 | 1>, a1: Types.Int4<0 | 1>): Types.Bit<0 | 1>
export function substring(a0: Types.Bit<0 | 1>, a1: Types.Int4<0 | 1>, a2: Types.Int4<0 | 1>): Types.Bit<0 | 1>
export function substring(a0: Types.Bytea<0 | 1>, a1: Types.Int4<0 | 1>): Types.Bytea<0 | 1>
export function substring(a0: Types.Bytea<0 | 1>, a1: Types.Int4<0 | 1>, a2: Types.Int4<0 | 1>): Types.Bytea<0 | 1>
export function substring(a0: Types.Text<0 | 1>, a1: Types.Int4<0 | 1>): Types.Text<0 | 1>
export function substring(a0: Types.Text<0 | 1>, a1: Types.Int4<0 | 1>, a2: Types.Int4<0 | 1>): Types.Text<0 | 1>
export function substring(a0: Types.Text<0 | 1>, a1: Types.Text<0 | 1>): Types.Text<0 | 1>
export function substring(a0: Types.Text<0 | 1>, a1: Types.Text<0 | 1>, a2: Types.Text<0 | 1>): Types.Text<0 | 1>
export function substring(...args: unknown[]) {
    return sqlFunction("substring", [{args: [Types.Bit<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Bit<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bit<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Bytea<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Bytea<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bytea<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Int4<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function sum(a0: Types.Float4<number>): Types.Float4<0 | 1>
export function sum(a0: Types.Float8<number>): Types.Float8<0 | 1>
export function sum(a0: Types.Int2<number>): Types.Int8<0 | 1>
export function sum(a0: Types.Int4<number>): Types.Int8<0 | 1>
export function sum(a0: Types.Interval<number>): Types.Interval<0 | 1>
export function sum(a0: Types.Money<number>): Types.Money<0 | 1>
export function sum(a0: Types.Int8<number>): Types.Numeric<0 | 1>
export function sum(a0: Types.Numeric<number>): Types.Numeric<0 | 1>
export function sum(...args: unknown[]) {
    return sqlFunction("sum", [{args: [Types.Float4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Interval<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Money<0 | 1>], ret: Types.Money<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function suppressRedundantUpdatesTrigger(): Types.Trigger<0 | 1>
export function suppressRedundantUpdatesTrigger(...args: unknown[]) {
    return sqlFunction("suppress_redundant_updates_trigger", [{args: [], ret: Types.Trigger<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function systemUser(): Types.Text<0 | 1>
export function systemUser(...args: unknown[]) {
    return sqlFunction("system_user", [{args: [], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function tableToXml(a0: Types.Regclass<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
export function tableToXml(...args: unknown[]) {
    return sqlFunction("table_to_xml", [{args: [Types.Regclass<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tableToXmlAndXmlschema(a0: Types.Regclass<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
export function tableToXmlAndXmlschema(...args: unknown[]) {
    return sqlFunction("table_to_xml_and_xmlschema", [{args: [Types.Regclass<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tableToXmlschema(a0: Types.Regclass<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
export function tableToXmlschema(...args: unknown[]) {
    return sqlFunction("table_to_xmlschema", [{args: [Types.Regclass<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tan(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function tan(...args: unknown[]) {
    return sqlFunction("tan", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tand(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function tand(...args: unknown[]) {
    return sqlFunction("tand", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tanh(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Float8<0 | 1>
export function tanh(...args: unknown[]) {
    return sqlFunction("tanh", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function text(a0: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Text<0 | 1>
export function text(a0: Types.Bpchar<0 | 1>): Types.Text<0 | 1>
export function text(a0: Types.Char<0 | 1>): Types.Text<0 | 1>
export function text(a0: Types.Inet<0 | 1>): Types.Text<0 | 1>
export function text(a0: Types.Name<0 | 1>): Types.Text<0 | 1>
export function text(a0: Types.Xml<0 | 1>): Types.Text<0 | 1>
export function text(...args: unknown[]) {
    return sqlFunction("text", [{args: [Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Bpchar<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Char<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Inet<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Name<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Xml<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function textGe(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function textGe(...args: unknown[]) {
    return sqlFunction("text_ge", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function textGt(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function textGt(...args: unknown[]) {
    return sqlFunction("text_gt", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function textLarger(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function textLarger(...args: unknown[]) {
    return sqlFunction("text_larger", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function textLe(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function textLe(...args: unknown[]) {
    return sqlFunction("text_le", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function textLt(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function textLt(...args: unknown[]) {
    return sqlFunction("text_lt", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function textPatternGe(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function textPatternGe(...args: unknown[]) {
    return sqlFunction("text_pattern_ge", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function textPatternGt(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function textPatternGt(...args: unknown[]) {
    return sqlFunction("text_pattern_gt", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function textPatternLe(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function textPatternLe(...args: unknown[]) {
    return sqlFunction("text_pattern_le", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function textPatternLt(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function textPatternLt(...args: unknown[]) {
    return sqlFunction("text_pattern_lt", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function textSmaller(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function textSmaller(...args: unknown[]) {
    return sqlFunction("text_smaller", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function textanycat<T extends Types.Any>(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: T): Types.Text<0 | 1>
export function textanycat(...args: unknown[]) {
    return sqlFunction("textanycat", [({T}) => ({args: [Types.Text<0 | 1>, T], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function textcat(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function textcat(...args: unknown[]) {
    return sqlFunction("textcat", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function texteq(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function texteq(...args: unknown[]) {
    return sqlFunction("texteq", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function texteqname(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
export function texteqname(...args: unknown[]) {
    return sqlFunction("texteqname", [{args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function textgename(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
export function textgename(...args: unknown[]) {
    return sqlFunction("textgename", [{args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function textgtname(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
export function textgtname(...args: unknown[]) {
    return sqlFunction("textgtname", [{args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function texticlike(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function texticlike(...args: unknown[]) {
    return sqlFunction("texticlike", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function texticnlike(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function texticnlike(...args: unknown[]) {
    return sqlFunction("texticnlike", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function texticregexeq(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function texticregexeq(...args: unknown[]) {
    return sqlFunction("texticregexeq", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function texticregexne(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function texticregexne(...args: unknown[]) {
    return sqlFunction("texticregexne", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function textlen(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
export function textlen(...args: unknown[]) {
    return sqlFunction("textlen", [{args: [Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function textlename(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
export function textlename(...args: unknown[]) {
    return sqlFunction("textlename", [{args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function textlike(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function textlike(...args: unknown[]) {
    return sqlFunction("textlike", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function textltname(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
export function textltname(...args: unknown[]) {
    return sqlFunction("textltname", [{args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function textne(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function textne(...args: unknown[]) {
    return sqlFunction("textne", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function textnename(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Name<0 | 1>): Types.Bool<0 | 1>
export function textnename(...args: unknown[]) {
    return sqlFunction("textnename", [{args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function textnlike(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function textnlike(...args: unknown[]) {
    return sqlFunction("textnlike", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function textregexeq(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function textregexeq(...args: unknown[]) {
    return sqlFunction("textregexeq", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function textregexne(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function textregexne(...args: unknown[]) {
    return sqlFunction("textregexne", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tideq(a0: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
export function tideq(...args: unknown[]) {
    return sqlFunction("tideq", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tidge(a0: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
export function tidge(...args: unknown[]) {
    return sqlFunction("tidge", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tidgt(a0: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
export function tidgt(...args: unknown[]) {
    return sqlFunction("tidgt", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tidlarger(a0: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Tid<0 | 1>
export function tidlarger(...args: unknown[]) {
    return sqlFunction("tidlarger", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Tid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tidle(a0: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
export function tidle(...args: unknown[]) {
    return sqlFunction("tidle", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tidlt(a0: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
export function tidlt(...args: unknown[]) {
    return sqlFunction("tidlt", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tidne(a0: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Bool<0 | 1>
export function tidne(...args: unknown[]) {
    return sqlFunction("tidne", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tidsmaller(a0: Types.Tid<0 | 1>, a1: Types.Tid<0 | 1>): Types.Tid<0 | 1>
export function tidsmaller(...args: unknown[]) {
    return sqlFunction("tidsmaller", [{args: [Types.Tid<0 | 1>, Types.Tid<0 | 1>], ret: Types.Tid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function time(a0: Types.Interval<0 | 1>): Types.Time<0 | 1>
export function time(a0: Types.Time<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Time<0 | 1>
export function time(a0: Types.Timestamp<0 | 1>): Types.Time<0 | 1>
export function time(a0: Types.Timestamptz<0 | 1>): Types.Time<0 | 1>
export function time(a0: Types.Timetz<0 | 1>): Types.Time<0 | 1>
export function time(...args: unknown[]) {
    return sqlFunction("time", [{args: [Types.Interval<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Time<0 | 1>, Types.Int4<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Timestamp<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Timetz<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function timeCmp(a0: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Int4<0 | 1>
export function timeCmp(...args: unknown[]) {
    return sqlFunction("time_cmp", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timeEq(a0: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
export function timeEq(...args: unknown[]) {
    return sqlFunction("time_eq", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timeGe(a0: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
export function timeGe(...args: unknown[]) {
    return sqlFunction("time_ge", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timeGt(a0: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
export function timeGt(...args: unknown[]) {
    return sqlFunction("time_gt", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timeHash(a0: Types.Time<0 | 1>): Types.Int4<0 | 1>
export function timeHash(...args: unknown[]) {
    return sqlFunction("time_hash", [{args: [Types.Time<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timeHashExtended(a0: Types.Time<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function timeHashExtended(...args: unknown[]) {
    return sqlFunction("time_hash_extended", [{args: [Types.Time<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timeLarger(a0: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Time<0 | 1>
export function timeLarger(...args: unknown[]) {
    return sqlFunction("time_larger", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timeLe(a0: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
export function timeLe(...args: unknown[]) {
    return sqlFunction("time_le", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timeLt(a0: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
export function timeLt(...args: unknown[]) {
    return sqlFunction("time_lt", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timeMiInterval(a0: Types.Time<0 | 1>, a1: Types.Interval<0 | 1>): Types.Time<0 | 1>
export function timeMiInterval(...args: unknown[]) {
    return sqlFunction("time_mi_interval", [{args: [Types.Time<0 | 1>, Types.Interval<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timeMiTime(a0: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Interval<0 | 1>
export function timeMiTime(...args: unknown[]) {
    return sqlFunction("time_mi_time", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timeNe(a0: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Bool<0 | 1>
export function timeNe(...args: unknown[]) {
    return sqlFunction("time_ne", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timePlInterval(a0: Types.Time<0 | 1>, a1: Types.Interval<0 | 1>): Types.Time<0 | 1>
export function timePlInterval(...args: unknown[]) {
    return sqlFunction("time_pl_interval", [{args: [Types.Time<0 | 1>, Types.Interval<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timeSmaller(a0: Types.Time<0 | 1>, a1: Types.Time<0 | 1>): Types.Time<0 | 1>
export function timeSmaller(...args: unknown[]) {
    return sqlFunction("time_smaller", [{args: [Types.Time<0 | 1>, Types.Time<0 | 1>], ret: Types.Time<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timedatePl(a0: Types.Time<0 | 1>, a1: Types.Date<0 | 1>): Types.Timestamp<0 | 1>
export function timedatePl(...args: unknown[]) {
    return sqlFunction("timedate_pl", [{args: [Types.Time<0 | 1>, Types.Date<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timeofday(): Types.Text<0 | 1>
export function timeofday(...args: unknown[]) {
    return sqlFunction("timeofday", [{args: [], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamp(a0: Types.Date<0 | 1>): Types.Timestamp<0 | 1>
export function timestamp(a0: Types.Date<0 | 1>, a1: Types.Time<0 | 1>): Types.Timestamp<0 | 1>
export function timestamp(a0: Types.Timestamp<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Timestamp<0 | 1>
export function timestamp(a0: Types.Timestamptz<0 | 1>): Types.Timestamp<0 | 1>
export function timestamp(...args: unknown[]) {
    return sqlFunction("timestamp", [{args: [Types.Date<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Time<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Int4<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function timestampCmp(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Int4<0 | 1>
export function timestampCmp(...args: unknown[]) {
    return sqlFunction("timestamp_cmp", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampCmpDate(a0: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Int4<0 | 1>
export function timestampCmpDate(...args: unknown[]) {
    return sqlFunction("timestamp_cmp_date", [{args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampCmpTimestamptz(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Int4<0 | 1>
export function timestampCmpTimestamptz(...args: unknown[]) {
    return sqlFunction("timestamp_cmp_timestamptz", [{args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampEq(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
export function timestampEq(...args: unknown[]) {
    return sqlFunction("timestamp_eq", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampEqDate(a0: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
export function timestampEqDate(...args: unknown[]) {
    return sqlFunction("timestamp_eq_date", [{args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampEqTimestamptz(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
export function timestampEqTimestamptz(...args: unknown[]) {
    return sqlFunction("timestamp_eq_timestamptz", [{args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampGe(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
export function timestampGe(...args: unknown[]) {
    return sqlFunction("timestamp_ge", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampGeDate(a0: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
export function timestampGeDate(...args: unknown[]) {
    return sqlFunction("timestamp_ge_date", [{args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampGeTimestamptz(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
export function timestampGeTimestamptz(...args: unknown[]) {
    return sqlFunction("timestamp_ge_timestamptz", [{args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampGt(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
export function timestampGt(...args: unknown[]) {
    return sqlFunction("timestamp_gt", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampGtDate(a0: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
export function timestampGtDate(...args: unknown[]) {
    return sqlFunction("timestamp_gt_date", [{args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampGtTimestamptz(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
export function timestampGtTimestamptz(...args: unknown[]) {
    return sqlFunction("timestamp_gt_timestamptz", [{args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampHash(a0: Types.Timestamp<0 | 1>): Types.Int4<0 | 1>
export function timestampHash(...args: unknown[]) {
    return sqlFunction("timestamp_hash", [{args: [Types.Timestamp<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampHashExtended(a0: Types.Timestamp<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function timestampHashExtended(...args: unknown[]) {
    return sqlFunction("timestamp_hash_extended", [{args: [Types.Timestamp<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampLarger(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Timestamp<0 | 1>
export function timestampLarger(...args: unknown[]) {
    return sqlFunction("timestamp_larger", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampLe(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
export function timestampLe(...args: unknown[]) {
    return sqlFunction("timestamp_le", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampLeDate(a0: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
export function timestampLeDate(...args: unknown[]) {
    return sqlFunction("timestamp_le_date", [{args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampLeTimestamptz(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
export function timestampLeTimestamptz(...args: unknown[]) {
    return sqlFunction("timestamp_le_timestamptz", [{args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampLt(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
export function timestampLt(...args: unknown[]) {
    return sqlFunction("timestamp_lt", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampLtDate(a0: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
export function timestampLtDate(...args: unknown[]) {
    return sqlFunction("timestamp_lt_date", [{args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampLtTimestamptz(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
export function timestampLtTimestamptz(...args: unknown[]) {
    return sqlFunction("timestamp_lt_timestamptz", [{args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampMi(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Interval<0 | 1>
export function timestampMi(...args: unknown[]) {
    return sqlFunction("timestamp_mi", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampMiInterval(a0: Types.Timestamp<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamp<0 | 1>
export function timestampMiInterval(...args: unknown[]) {
    return sqlFunction("timestamp_mi_interval", [{args: [Types.Timestamp<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampNe(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
export function timestampNe(...args: unknown[]) {
    return sqlFunction("timestamp_ne", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampNeDate(a0: Types.Timestamp<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
export function timestampNeDate(...args: unknown[]) {
    return sqlFunction("timestamp_ne_date", [{args: [Types.Timestamp<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampNeTimestamptz(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
export function timestampNeTimestamptz(...args: unknown[]) {
    return sqlFunction("timestamp_ne_timestamptz", [{args: [Types.Timestamp<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampPlInterval(a0: Types.Timestamp<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamp<0 | 1>
export function timestampPlInterval(...args: unknown[]) {
    return sqlFunction("timestamp_pl_interval", [{args: [Types.Timestamp<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestampSmaller(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Timestamp<0 | 1>
export function timestampSmaller(...args: unknown[]) {
    return sqlFunction("timestamp_smaller", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptz(a0: Types.Date<0 | 1>): Types.Timestamptz<0 | 1>
export function timestamptz(a0: Types.Date<0 | 1>, a1: Types.Time<0 | 1>): Types.Timestamptz<0 | 1>
export function timestamptz(a0: Types.Date<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Timestamptz<0 | 1>
export function timestamptz(a0: Types.Timestamp<0 | 1>): Types.Timestamptz<0 | 1>
export function timestamptz(a0: Types.Timestamptz<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Timestamptz<0 | 1>
export function timestamptz(...args: unknown[]) {
    return sqlFunction("timestamptz", [{args: [Types.Date<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Time<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Date<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Int4<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzCmp(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Int4<0 | 1>
export function timestamptzCmp(...args: unknown[]) {
    return sqlFunction("timestamptz_cmp", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzCmpDate(a0: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Int4<0 | 1>
export function timestamptzCmpDate(...args: unknown[]) {
    return sqlFunction("timestamptz_cmp_date", [{args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzCmpTimestamp(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Int4<0 | 1>
export function timestamptzCmpTimestamp(...args: unknown[]) {
    return sqlFunction("timestamptz_cmp_timestamp", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzEq(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
export function timestamptzEq(...args: unknown[]) {
    return sqlFunction("timestamptz_eq", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzEqDate(a0: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
export function timestamptzEqDate(...args: unknown[]) {
    return sqlFunction("timestamptz_eq_date", [{args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzEqTimestamp(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
export function timestamptzEqTimestamp(...args: unknown[]) {
    return sqlFunction("timestamptz_eq_timestamp", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzGe(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
export function timestamptzGe(...args: unknown[]) {
    return sqlFunction("timestamptz_ge", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzGeDate(a0: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
export function timestamptzGeDate(...args: unknown[]) {
    return sqlFunction("timestamptz_ge_date", [{args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzGeTimestamp(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
export function timestamptzGeTimestamp(...args: unknown[]) {
    return sqlFunction("timestamptz_ge_timestamp", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzGt(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
export function timestamptzGt(...args: unknown[]) {
    return sqlFunction("timestamptz_gt", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzGtDate(a0: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
export function timestamptzGtDate(...args: unknown[]) {
    return sqlFunction("timestamptz_gt_date", [{args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzGtTimestamp(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
export function timestamptzGtTimestamp(...args: unknown[]) {
    return sqlFunction("timestamptz_gt_timestamp", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzLarger(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Timestamptz<0 | 1>
export function timestamptzLarger(...args: unknown[]) {
    return sqlFunction("timestamptz_larger", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzLe(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
export function timestamptzLe(...args: unknown[]) {
    return sqlFunction("timestamptz_le", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzLeDate(a0: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
export function timestamptzLeDate(...args: unknown[]) {
    return sqlFunction("timestamptz_le_date", [{args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzLeTimestamp(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
export function timestamptzLeTimestamp(...args: unknown[]) {
    return sqlFunction("timestamptz_le_timestamp", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzLt(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
export function timestamptzLt(...args: unknown[]) {
    return sqlFunction("timestamptz_lt", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzLtDate(a0: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
export function timestamptzLtDate(...args: unknown[]) {
    return sqlFunction("timestamptz_lt_date", [{args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzLtTimestamp(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
export function timestamptzLtTimestamp(...args: unknown[]) {
    return sqlFunction("timestamptz_lt_timestamp", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzMi(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Interval<0 | 1>
export function timestamptzMi(...args: unknown[]) {
    return sqlFunction("timestamptz_mi", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Interval<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzMiInterval(a0: Types.Timestamptz<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamptz<0 | 1>
export function timestamptzMiInterval(...args: unknown[]) {
    return sqlFunction("timestamptz_mi_interval", [{args: [Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzNe(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Bool<0 | 1>
export function timestamptzNe(...args: unknown[]) {
    return sqlFunction("timestamptz_ne", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzNeDate(a0: Types.Timestamptz<0 | 1>, a1: Types.Date<0 | 1>): Types.Bool<0 | 1>
export function timestamptzNeDate(...args: unknown[]) {
    return sqlFunction("timestamptz_ne_date", [{args: [Types.Timestamptz<0 | 1>, Types.Date<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzNeTimestamp(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Bool<0 | 1>
export function timestamptzNeTimestamp(...args: unknown[]) {
    return sqlFunction("timestamptz_ne_timestamp", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzPlInterval(a0: Types.Timestamptz<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timestamptz<0 | 1>
export function timestamptzPlInterval(...args: unknown[]) {
    return sqlFunction("timestamptz_pl_interval", [{args: [Types.Timestamptz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timestamptzSmaller(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Timestamptz<0 | 1>
export function timestamptzSmaller(...args: unknown[]) {
    return sqlFunction("timestamptz_smaller", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timetz(a0: Types.Time<0 | 1>): Types.Timetz<0 | 1>
export function timetz(a0: Types.Timestamptz<0 | 1>): Types.Timetz<0 | 1>
export function timetz(a0: Types.Timetz<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Timetz<0 | 1>
export function timetz(...args: unknown[]) {
    return sqlFunction("timetz", [{args: [Types.Time<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timetz<0 | 1>, Types.Int4<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timetzCmp(a0: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Int4<0 | 1>
export function timetzCmp(...args: unknown[]) {
    return sqlFunction("timetz_cmp", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timetzEq(a0: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
export function timetzEq(...args: unknown[]) {
    return sqlFunction("timetz_eq", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timetzGe(a0: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
export function timetzGe(...args: unknown[]) {
    return sqlFunction("timetz_ge", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timetzGt(a0: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
export function timetzGt(...args: unknown[]) {
    return sqlFunction("timetz_gt", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timetzHash(a0: Types.Timetz<0 | 1>): Types.Int4<0 | 1>
export function timetzHash(...args: unknown[]) {
    return sqlFunction("timetz_hash", [{args: [Types.Timetz<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timetzHashExtended(a0: Types.Timetz<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function timetzHashExtended(...args: unknown[]) {
    return sqlFunction("timetz_hash_extended", [{args: [Types.Timetz<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timetzLarger(a0: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Timetz<0 | 1>
export function timetzLarger(...args: unknown[]) {
    return sqlFunction("timetz_larger", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timetzLe(a0: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
export function timetzLe(...args: unknown[]) {
    return sqlFunction("timetz_le", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timetzLt(a0: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
export function timetzLt(...args: unknown[]) {
    return sqlFunction("timetz_lt", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timetzMiInterval(a0: Types.Timetz<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timetz<0 | 1>
export function timetzMiInterval(...args: unknown[]) {
    return sqlFunction("timetz_mi_interval", [{args: [Types.Timetz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timetzNe(a0: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Bool<0 | 1>
export function timetzNe(...args: unknown[]) {
    return sqlFunction("timetz_ne", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timetzPlInterval(a0: Types.Timetz<0 | 1>, a1: Types.Interval<0 | 1>): Types.Timetz<0 | 1>
export function timetzPlInterval(...args: unknown[]) {
    return sqlFunction("timetz_pl_interval", [{args: [Types.Timetz<0 | 1>, Types.Interval<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timetzSmaller(a0: Types.Timetz<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Timetz<0 | 1>
export function timetzSmaller(...args: unknown[]) {
    return sqlFunction("timetz_smaller", [{args: [Types.Timetz<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timetzdatePl(a0: Types.Timetz<0 | 1>, a1: Types.Date<0 | 1>): Types.Timestamptz<0 | 1>
export function timetzdatePl(...args: unknown[]) {
    return sqlFunction("timetzdate_pl", [{args: [Types.Timetz<0 | 1>, Types.Date<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function timezone(a0: Types.Interval<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Timestamp<0 | 1>
export function timezone(a0: Types.Text<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Timestamp<0 | 1>
export function timezone(a0: Types.Timestamptz<0 | 1>): Types.Timestamp<0 | 1>
export function timezone(a0: Types.Interval<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Timestamptz<0 | 1>
export function timezone(a0: Types.Text<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Timestamptz<0 | 1>
export function timezone(a0: Types.Timestamp<0 | 1>): Types.Timestamptz<0 | 1>
export function timezone(a0: Types.Interval<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Timetz<0 | 1>
export function timezone(a0: Types.Text<0 | 1>, a1: Types.Timetz<0 | 1>): Types.Timetz<0 | 1>
export function timezone(a0: Types.Timetz<0 | 1>): Types.Timetz<0 | 1>
export function timezone(...args: unknown[]) {
    return sqlFunction("timezone", [{args: [Types.Interval<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>], ret: Types.Timestamp<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Interval<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Interval<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Timetz<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timetz<0 | 1>], ret: Types.Timetz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function toAscii(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function toAscii(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function toAscii(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Name<0 | 1>): Types.Text<0 | 1>
export function toAscii(...args: unknown[]) {
    return sqlFunction("to_ascii", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Name<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function toChar(a0: Types.Float4<0 | 1> | Types.Input<Types.Float4<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function toChar(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function toChar(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function toChar(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function toChar(a0: Types.Interval<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function toChar(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function toChar(a0: Types.Timestamp<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function toChar(a0: Types.Timestamptz<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function toChar(...args: unknown[]) {
    return sqlFunction("to_char", [{args: [Types.Float4<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Interval<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function toDate(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Date<0 | 1>
export function toDate(...args: unknown[]) {
    return sqlFunction("to_date", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Date<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function toHex(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function toHex(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Text<0 | 1>
export function toHex(...args: unknown[]) {
    return sqlFunction("to_hex", [{args: [Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function toJson<T extends Types.Any>(a0: T): Types.Json<0 | 1>
export function toJson(...args: unknown[]) {
    return sqlFunction("to_json", [({T}) => ({args: [T], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function toJsonb<T extends Types.Any>(a0: T): Types.Jsonb<0 | 1>
export function toJsonb(...args: unknown[]) {
    return sqlFunction("to_jsonb", [({T}) => ({args: [T], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function toNumber(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Numeric<0 | 1>
export function toNumber(...args: unknown[]) {
    return sqlFunction("to_number", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function toOct(a0: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
export function toOct(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Text<0 | 1>
export function toOct(...args: unknown[]) {
    return sqlFunction("to_oct", [{args: [Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function toRegclass(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Regclass<0 | 1>
export function toRegclass(...args: unknown[]) {
    return sqlFunction("to_regclass", [{args: [Types.Text<0 | 1>], ret: Types.Regclass<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function toRegcollation(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Regcollation<0 | 1>
export function toRegcollation(...args: unknown[]) {
    return sqlFunction("to_regcollation", [{args: [Types.Text<0 | 1>], ret: Types.Regcollation<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function toRegnamespace(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Regnamespace<0 | 1>
export function toRegnamespace(...args: unknown[]) {
    return sqlFunction("to_regnamespace", [{args: [Types.Text<0 | 1>], ret: Types.Regnamespace<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function toRegoper(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Regoper<0 | 1>
export function toRegoper(...args: unknown[]) {
    return sqlFunction("to_regoper", [{args: [Types.Text<0 | 1>], ret: Types.Regoper<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function toRegoperator(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Regoperator<0 | 1>
export function toRegoperator(...args: unknown[]) {
    return sqlFunction("to_regoperator", [{args: [Types.Text<0 | 1>], ret: Types.Regoperator<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function toRegproc(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Regproc<0 | 1>
export function toRegproc(...args: unknown[]) {
    return sqlFunction("to_regproc", [{args: [Types.Text<0 | 1>], ret: Types.Regproc<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function toRegprocedure(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Regprocedure<0 | 1>
export function toRegprocedure(...args: unknown[]) {
    return sqlFunction("to_regprocedure", [{args: [Types.Text<0 | 1>], ret: Types.Regprocedure<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function toRegrole(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Regrole<0 | 1>
export function toRegrole(...args: unknown[]) {
    return sqlFunction("to_regrole", [{args: [Types.Text<0 | 1>], ret: Types.Regrole<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function toRegtype(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Regtype<0 | 1>
export function toRegtype(...args: unknown[]) {
    return sqlFunction("to_regtype", [{args: [Types.Text<0 | 1>], ret: Types.Regtype<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function toRegtypemod(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int4<0 | 1>
export function toRegtypemod(...args: unknown[]) {
    return sqlFunction("to_regtypemod", [{args: [Types.Text<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function toTimestamp(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Timestamptz<0 | 1>
export function toTimestamp(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Timestamptz<0 | 1>
export function toTimestamp(...args: unknown[]) {
    return sqlFunction("to_timestamp", [{args: [Types.Float8<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function toTsquery(a0: Types.Regconfig<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<0 | 1>
export function toTsquery(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<0 | 1>
export function toTsquery(...args: unknown[]) {
    return sqlFunction("to_tsquery", [{args: [Types.Regconfig<0 | 1>, Types.Text<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function toTsvector(a0: Types.Json<0 | 1>): Types.Tsvector<0 | 1>
export function toTsvector(a0: Types.Jsonb<0 | 1>): Types.Tsvector<0 | 1>
export function toTsvector(a0: Types.Regconfig<0 | 1>, a1: Types.Json<0 | 1>): Types.Tsvector<0 | 1>
export function toTsvector(a0: Types.Regconfig<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Tsvector<0 | 1>
export function toTsvector(a0: Types.Regconfig<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tsvector<0 | 1>
export function toTsvector(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tsvector<0 | 1>
export function toTsvector(...args: unknown[]) {
    return sqlFunction("to_tsvector", [{args: [Types.Json<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Jsonb<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regconfig<0 | 1>, Types.Json<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regconfig<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regconfig<0 | 1>, Types.Text<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function transactionTimestamp(): Types.Timestamptz<0 | 1>
export function transactionTimestamp(...args: unknown[]) {
    return sqlFunction("transaction_timestamp", [{args: [], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function translate(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function translate(...args: unknown[]) {
    return sqlFunction("translate", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function trimArray<T extends Types.Any>(a0: Types.Array<0 | 1, T>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Array<0 | 1, T>
export function trimArray(...args: unknown[]) {
    return sqlFunction("trim_array", [({T}) => ({args: [Types.Array.of(T), Types.Int4<0 | 1>], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], args);
}

export function trimScale(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>): Types.Numeric<0 | 1>
export function trimScale(...args: unknown[]) {
    return sqlFunction("trim_scale", [{args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function trunc(a0: Types.Float8<0 | 1>): Types.Float8<0 | 1>
export function trunc(a0: Types.Macaddr<0 | 1>): Types.Macaddr<0 | 1>
export function trunc(a0: Types.Macaddr8<0 | 1>): Types.Macaddr8<0 | 1>
export function trunc(a0: Types.Numeric<0 | 1>): Types.Numeric<0 | 1>
export function trunc(a0: Types.Numeric<0 | 1>, a1: Types.Int4<0 | 1>): Types.Numeric<0 | 1>
export function trunc(...args: unknown[]) {
    return sqlFunction("trunc", [{args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Macaddr<0 | 1>], ret: Types.Macaddr<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Macaddr8<0 | 1>], ret: Types.Macaddr8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsDebug(a0: Types.Regconfig<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{alias: Types.Text<0 | 1>, description: Types.Text<0 | 1>, token: Types.Text<0 | 1>, dictionaries: Types.Array<0 | 1, Types.Regdictionary<0 | 1>>, dictionary: Types.Regdictionary<0 | 1>, lexemes: Types.Array<0 | 1, Types.Text<0 | 1>>}>
export function tsDebug(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{alias: Types.Text<0 | 1>, description: Types.Text<0 | 1>, token: Types.Text<0 | 1>, dictionaries: Types.Array<0 | 1, Types.Regdictionary<0 | 1>>, dictionary: Types.Regdictionary<0 | 1>, lexemes: Types.Array<0 | 1, Types.Text<0 | 1>>}>
export function tsDebug(...args: unknown[]) {
    return sqlFunction("ts_debug", [{args: [Types.Regconfig<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({alias: Types.Text<0 | 1>, description: Types.Text<0 | 1>, token: Types.Text<0 | 1>, dictionaries: Types.Array.of(Types.Regdictionary<0 | 1>), dictionary: Types.Regdictionary<0 | 1>, lexemes: Types.Array.of(Types.Text<0 | 1>)}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({alias: Types.Text<0 | 1>, description: Types.Text<0 | 1>, token: Types.Text<0 | 1>, dictionaries: Types.Array.of(Types.Regdictionary<0 | 1>), dictionary: Types.Regdictionary<0 | 1>, lexemes: Types.Array.of(Types.Text<0 | 1>)}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsDelete(a0: Types.Tsvector<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Tsvector<0 | 1>
export function tsDelete(a0: Types.Tsvector<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tsvector<0 | 1>
export function tsDelete(...args: unknown[]) {
    return sqlFunction("ts_delete", [{args: [Types.Tsvector<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Tsvector<0 | 1>, Types.Text<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsFilter(a0: Types.Tsvector<0 | 1>, a1: Types.Array<0 | 1, Types.Char<0 | 1>>): Types.Tsvector<0 | 1>
export function tsFilter(...args: unknown[]) {
    return sqlFunction("ts_filter", [{args: [Types.Tsvector<0 | 1>, Types.Array.of(Types.Char<0 | 1>)], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsHeadline(a0: Types.Json<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Json<0 | 1>
export function tsHeadline(a0: Types.Json<0 | 1>, a1: Types.Tsquery<0 | 1>, a2: Types.Text<0 | 1>): Types.Json<0 | 1>
export function tsHeadline(a0: Types.Regconfig<0 | 1>, a1: Types.Json<0 | 1>, a2: Types.Tsquery<0 | 1>): Types.Json<0 | 1>
export function tsHeadline(a0: Types.Regconfig<0 | 1>, a1: Types.Json<0 | 1>, a2: Types.Tsquery<0 | 1>, a3: Types.Text<0 | 1>): Types.Json<0 | 1>
export function tsHeadline(a0: Types.Jsonb<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Jsonb<0 | 1>
export function tsHeadline(a0: Types.Jsonb<0 | 1>, a1: Types.Tsquery<0 | 1>, a2: Types.Text<0 | 1>): Types.Jsonb<0 | 1>
export function tsHeadline(a0: Types.Regconfig<0 | 1>, a1: Types.Jsonb<0 | 1>, a2: Types.Tsquery<0 | 1>): Types.Jsonb<0 | 1>
export function tsHeadline(a0: Types.Regconfig<0 | 1>, a1: Types.Jsonb<0 | 1>, a2: Types.Tsquery<0 | 1>, a3: Types.Text<0 | 1>): Types.Jsonb<0 | 1>
export function tsHeadline(a0: Types.Regconfig<0 | 1>, a1: Types.Text<0 | 1>, a2: Types.Tsquery<0 | 1>): Types.Text<0 | 1>
export function tsHeadline(a0: Types.Regconfig<0 | 1>, a1: Types.Text<0 | 1>, a2: Types.Tsquery<0 | 1>, a3: Types.Text<0 | 1>): Types.Text<0 | 1>
export function tsHeadline(a0: Types.Text<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Text<0 | 1>
export function tsHeadline(a0: Types.Text<0 | 1>, a1: Types.Tsquery<0 | 1>, a2: Types.Text<0 | 1>): Types.Text<0 | 1>
export function tsHeadline(...args: unknown[]) {
    return sqlFunction("ts_headline", [{args: [Types.Json<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Json<0 | 1>, Types.Tsquery<0 | 1>, Types.Text<0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regconfig<0 | 1>, Types.Json<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regconfig<0 | 1>, Types.Json<0 | 1>, Types.Tsquery<0 | 1>, Types.Text<0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Jsonb<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Jsonb<0 | 1>, Types.Tsquery<0 | 1>, Types.Text<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regconfig<0 | 1>, Types.Jsonb<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regconfig<0 | 1>, Types.Jsonb<0 | 1>, Types.Tsquery<0 | 1>, Types.Text<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regconfig<0 | 1>, Types.Text<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regconfig<0 | 1>, Types.Text<0 | 1>, Types.Tsquery<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Tsquery<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsLexize(a0: Types.Regdictionary<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Text<0 | 1>>
export function tsLexize(...args: unknown[]) {
    return sqlFunction("ts_lexize", [{args: [Types.Regdictionary<0 | 1>, Types.Text<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsMatchQv(a0: Types.Tsquery<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
export function tsMatchQv(a0: Types.Tsquery<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
export function tsMatchQv(...args: unknown[]) {
    return sqlFunction("ts_match_qv", [{args: [Types.Tsquery<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Tsquery<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsMatchTq(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
export function tsMatchTq(...args: unknown[]) {
    return sqlFunction("ts_match_tq", [{args: [Types.Text<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsMatchTt(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function tsMatchTt(...args: unknown[]) {
    return sqlFunction("ts_match_tt", [{args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsMatchVq(a0: Types.Tsvector<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
export function tsMatchVq(a0: Types.Tsvector<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
export function tsMatchVq(...args: unknown[]) {
    return sqlFunction("ts_match_vq", [{args: [Types.Tsvector<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Tsvector<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsParse(a0: Types.Oid<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{tokid: Types.Int4<0 | 1>, token: Types.Text<0 | 1>}>
export function tsParse(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{tokid: Types.Int4<0 | 1>, token: Types.Text<0 | 1>}>
export function tsParse(...args: unknown[]) {
    return sqlFunction("ts_parse", [{args: [Types.Oid<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({tokid: Types.Int4<0 | 1>, token: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({tokid: Types.Int4<0 | 1>, token: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsRank(a0: Types.Array<0 | 1, Types.Float4<0 | 1>>, a1: Types.Tsvector<0 | 1>, a2: Types.Tsquery<0 | 1>): Types.Float4<0 | 1>
export function tsRank(a0: Types.Array<0 | 1, Types.Float4<0 | 1>>, a1: Types.Tsvector<0 | 1>, a2: Types.Tsquery<0 | 1>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Float4<0 | 1>
export function tsRank(a0: Types.Tsvector<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Float4<0 | 1>
export function tsRank(a0: Types.Tsvector<0 | 1>, a1: Types.Tsquery<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Float4<0 | 1>
export function tsRank(...args: unknown[]) {
    return sqlFunction("ts_rank", [{args: [Types.Array.of(Types.Float4<0 | 1>), Types.Tsvector<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Array.of(Types.Float4<0 | 1>), Types.Tsvector<0 | 1>, Types.Tsquery<0 | 1>, Types.Int4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Tsvector<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Tsvector<0 | 1>, Types.Tsquery<0 | 1>, Types.Int4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsRankCd(a0: Types.Array<0 | 1, Types.Float4<0 | 1>>, a1: Types.Tsvector<0 | 1>, a2: Types.Tsquery<0 | 1>): Types.Float4<0 | 1>
export function tsRankCd(a0: Types.Array<0 | 1, Types.Float4<0 | 1>>, a1: Types.Tsvector<0 | 1>, a2: Types.Tsquery<0 | 1>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Float4<0 | 1>
export function tsRankCd(a0: Types.Tsvector<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Float4<0 | 1>
export function tsRankCd(a0: Types.Tsvector<0 | 1>, a1: Types.Tsquery<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Float4<0 | 1>
export function tsRankCd(...args: unknown[]) {
    return sqlFunction("ts_rank_cd", [{args: [Types.Array.of(Types.Float4<0 | 1>), Types.Tsvector<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Array.of(Types.Float4<0 | 1>), Types.Tsvector<0 | 1>, Types.Tsquery<0 | 1>, Types.Int4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Tsvector<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Tsvector<0 | 1>, Types.Tsquery<0 | 1>, Types.Int4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsRewrite(a0: Types.Tsquery<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<0 | 1>
export function tsRewrite(a0: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>, a2: Types.Tsquery<0 | 1>): Types.Tsquery<0 | 1>
export function tsRewrite(...args: unknown[]) {
    return sqlFunction("ts_rewrite", [{args: [Types.Tsquery<0 | 1>, Types.Text<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsStat(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{word: Types.Text<0 | 1>, ndoc: Types.Int4<0 | 1>, nentry: Types.Int4<0 | 1>}>
export function tsStat(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{word: Types.Text<0 | 1>, ndoc: Types.Int4<0 | 1>, nentry: Types.Int4<0 | 1>}>
export function tsStat(...args: unknown[]) {
    return sqlFunction("ts_stat", [{args: [Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({word: Types.Text<0 | 1>, ndoc: Types.Int4<0 | 1>, nentry: Types.Int4<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({word: Types.Text<0 | 1>, ndoc: Types.Int4<0 | 1>, nentry: Types.Int4<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsTokenType(a0: Types.Oid<0 | 1>): Types.FromItem<{tokid: Types.Int4<0 | 1>, alias: Types.Text<0 | 1>, description: Types.Text<0 | 1>}>
export function tsTokenType(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{tokid: Types.Int4<0 | 1>, alias: Types.Text<0 | 1>, description: Types.Text<0 | 1>}>
export function tsTokenType(...args: unknown[]) {
    return sqlFunction("ts_token_type", [{args: [Types.Oid<0 | 1>], ret: Types.FromItem.ofSchema({tokid: Types.Int4<0 | 1>, alias: Types.Text<0 | 1>, description: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({tokid: Types.Int4<0 | 1>, alias: Types.Text<0 | 1>, description: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsmultirange(): Types.Tsmultirange<0 | 1>
export function tsmultirange(a0: Types.Array<0 | 1, Types.Tsrange<0 | 1>>, ...variadic: Types.Array<0 | 1, Types.Tsrange<0 | 1>>[]): Types.Tsmultirange<0 | 1>
export function tsmultirange(a0: Types.Tsrange<0 | 1>): Types.Tsmultirange<0 | 1>
export function tsmultirange(...args: unknown[]) {
    return sqlFunction("tsmultirange", [{args: [], ret: Types.Tsmultirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Array.of(Types.Tsrange<0 | 1>)], ret: Types.Tsmultirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}, {args: [Types.Tsrange<0 | 1>], ret: Types.Tsmultirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsqMcontained(a0: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
export function tsqMcontained(...args: unknown[]) {
    return sqlFunction("tsq_mcontained", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsqMcontains(a0: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
export function tsqMcontains(...args: unknown[]) {
    return sqlFunction("tsq_mcontains", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsqueryAnd(a0: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Tsquery<0 | 1>
export function tsqueryAnd(...args: unknown[]) {
    return sqlFunction("tsquery_and", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsqueryCmp(a0: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Int4<0 | 1>
export function tsqueryCmp(...args: unknown[]) {
    return sqlFunction("tsquery_cmp", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsqueryEq(a0: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
export function tsqueryEq(...args: unknown[]) {
    return sqlFunction("tsquery_eq", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsqueryGe(a0: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
export function tsqueryGe(...args: unknown[]) {
    return sqlFunction("tsquery_ge", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsqueryGt(a0: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
export function tsqueryGt(...args: unknown[]) {
    return sqlFunction("tsquery_gt", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsqueryLe(a0: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
export function tsqueryLe(...args: unknown[]) {
    return sqlFunction("tsquery_le", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsqueryLt(a0: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
export function tsqueryLt(...args: unknown[]) {
    return sqlFunction("tsquery_lt", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsqueryNe(a0: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
export function tsqueryNe(...args: unknown[]) {
    return sqlFunction("tsquery_ne", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsqueryNot(a0: Types.Tsquery<0 | 1>): Types.Tsquery<0 | 1>
export function tsqueryNot(...args: unknown[]) {
    return sqlFunction("tsquery_not", [{args: [Types.Tsquery<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsqueryOr(a0: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Tsquery<0 | 1>
export function tsqueryOr(...args: unknown[]) {
    return sqlFunction("tsquery_or", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsqueryPhrase(a0: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Tsquery<0 | 1>
export function tsqueryPhrase(a0: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Tsquery<0 | 1>
export function tsqueryPhrase(...args: unknown[]) {
    return sqlFunction("tsquery_phrase", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>, Types.Int4<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsrange(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Tsrange<0 | 1>
export function tsrange(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tsrange<0 | 1>
export function tsrange(...args: unknown[]) {
    return sqlFunction("tsrange", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Tsrange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>, Types.Text<0 | 1>], ret: Types.Tsrange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsrangeSubdiff(a0: Types.Timestamp<0 | 1>, a1: Types.Timestamp<0 | 1>): Types.Float8<0 | 1>
export function tsrangeSubdiff(...args: unknown[]) {
    return sqlFunction("tsrange_subdiff", [{args: [Types.Timestamp<0 | 1>, Types.Timestamp<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tstzmultirange(): Types.Tstzmultirange<0 | 1>
export function tstzmultirange(a0: Types.Array<0 | 1, Types.Tstzrange<0 | 1>>, ...variadic: Types.Array<0 | 1, Types.Tstzrange<0 | 1>>[]): Types.Tstzmultirange<0 | 1>
export function tstzmultirange(a0: Types.Tstzrange<0 | 1>): Types.Tstzmultirange<0 | 1>
export function tstzmultirange(...args: unknown[]) {
    return sqlFunction("tstzmultirange", [{args: [], ret: Types.Tstzmultirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Array.of(Types.Tstzrange<0 | 1>)], ret: Types.Tstzmultirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}, {args: [Types.Tstzrange<0 | 1>], ret: Types.Tstzmultirange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tstzrange(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Tstzrange<0 | 1>
export function tstzrange(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tstzrange<0 | 1>
export function tstzrange(...args: unknown[]) {
    return sqlFunction("tstzrange", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Tstzrange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>, Types.Text<0 | 1>], ret: Types.Tstzrange<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tstzrangeSubdiff(a0: Types.Timestamptz<0 | 1>, a1: Types.Timestamptz<0 | 1>): Types.Float8<0 | 1>
export function tstzrangeSubdiff(...args: unknown[]) {
    return sqlFunction("tstzrange_subdiff", [{args: [Types.Timestamptz<0 | 1>, Types.Timestamptz<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsvectorCmp(a0: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Int4<0 | 1>
export function tsvectorCmp(...args: unknown[]) {
    return sqlFunction("tsvector_cmp", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsvectorConcat(a0: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Tsvector<0 | 1>
export function tsvectorConcat(...args: unknown[]) {
    return sqlFunction("tsvector_concat", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsvectorEq(a0: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
export function tsvectorEq(...args: unknown[]) {
    return sqlFunction("tsvector_eq", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsvectorGe(a0: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
export function tsvectorGe(...args: unknown[]) {
    return sqlFunction("tsvector_ge", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsvectorGt(a0: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
export function tsvectorGt(...args: unknown[]) {
    return sqlFunction("tsvector_gt", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsvectorLe(a0: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
export function tsvectorLe(...args: unknown[]) {
    return sqlFunction("tsvector_le", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsvectorLt(a0: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
export function tsvectorLt(...args: unknown[]) {
    return sqlFunction("tsvector_lt", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsvectorNe(a0: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
export function tsvectorNe(...args: unknown[]) {
    return sqlFunction("tsvector_ne", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsvectorToArray(a0: Types.Tsvector<0 | 1>): Types.Array<0 | 1, Types.Text<0 | 1>>
export function tsvectorToArray(...args: unknown[]) {
    return sqlFunction("tsvector_to_array", [{args: [Types.Tsvector<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsvectorUpdateTrigger(): Types.Trigger<0 | 1>
export function tsvectorUpdateTrigger(...args: unknown[]) {
    return sqlFunction("tsvector_update_trigger", [{args: [], ret: Types.Trigger<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function tsvectorUpdateTriggerColumn(): Types.Trigger<0 | 1>
export function tsvectorUpdateTriggerColumn(...args: unknown[]) {
    return sqlFunction("tsvector_update_trigger_column", [{args: [], ret: Types.Trigger<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function txidCurrent(): Types.Int8<0 | 1>
export function txidCurrent(...args: unknown[]) {
    return sqlFunction("txid_current", [{args: [], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function txidCurrentIfAssigned(): Types.Int8<0 | 1>
export function txidCurrentIfAssigned(...args: unknown[]) {
    return sqlFunction("txid_current_if_assigned", [{args: [], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function txidCurrentSnapshot(): Types.TxidSnapshot<0 | 1>
export function txidCurrentSnapshot(...args: unknown[]) {
    return sqlFunction("txid_current_snapshot", [{args: [], ret: Types.TxidSnapshot<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function txidSnapshotXip(a0: Types.TxidSnapshot<0 | 1>): Types.FromItem<{}>
export function txidSnapshotXip(...args: unknown[]) {
    return sqlFunction("txid_snapshot_xip", [{args: [Types.TxidSnapshot<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function txidSnapshotXmax(a0: Types.TxidSnapshot<0 | 1>): Types.Int8<0 | 1>
export function txidSnapshotXmax(...args: unknown[]) {
    return sqlFunction("txid_snapshot_xmax", [{args: [Types.TxidSnapshot<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function txidStatus(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Text<0 | 1>
export function txidStatus(...args: unknown[]) {
    return sqlFunction("txid_status", [{args: [Types.Int8<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function txidVisibleInSnapshot(a0: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a1: Types.TxidSnapshot<0 | 1>): Types.Bool<0 | 1>
export function txidVisibleInSnapshot(...args: unknown[]) {
    return sqlFunction("txid_visible_in_snapshot", [{args: [Types.Int8<0 | 1>, Types.TxidSnapshot<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function unicodeAssigned(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function unicodeAssigned(...args: unknown[]) {
    return sqlFunction("unicode_assigned", [{args: [Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function unicodeVersion(): Types.Text<0 | 1>
export function unicodeVersion(...args: unknown[]) {
    return sqlFunction("unicode_version", [{args: [], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function uniqueKeyRecheck(): Types.Trigger<0 | 1>
export function uniqueKeyRecheck(...args: unknown[]) {
    return sqlFunction("unique_key_recheck", [{args: [], ret: Types.Trigger<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function unistr(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
export function unistr(...args: unknown[]) {
    return sqlFunction("unistr", [{args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function unnest<T extends Types.Any>(a0: Types.Array<0 | 1, T>): Types.FromItem<{}>
export function unnest<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>): Types.FromItem<{}>
export function unnest(a0: Types.Tsvector<0 | 1>): Types.FromItem<{lexeme: Types.Text<0 | 1>, positions: Types.Array<0 | 1, Types.Int2<0 | 1>>, weights: Types.Array<0 | 1, Types.Text<0 | 1>>}>
export function unnest(...args: unknown[]) {
    return sqlFunction("unnest", [({T}) => ({args: [Types.Array.of(T)], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}), {args: [Types.Anymultirange], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Tsvector<0 | 1>], ret: Types.FromItem.ofSchema({lexeme: Types.Text<0 | 1>, positions: Types.Array.of(Types.Int2<0 | 1>), weights: Types.Array.of(Types.Text<0 | 1>)}), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function upper<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>): T
export function upper<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>): T
export function upper(a0: Types.Text<0 | 1>): Types.Text<0 | 1>
export function upper(...args: unknown[]) {
    return sqlFunction("upper", [({T}) => ({args: [Types.Anymultirange], ret: T, isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [Types.Anyrange], ret: T, isOperator: false, isReserved: false, isVariadic: false}), {args: [Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function upperInc<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function upperInc<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function upperInc(...args: unknown[]) {
    return sqlFunction("upper_inc", [{args: [Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function upperInf<T extends Types.Any>(a0: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
export function upperInf<T extends Types.Any>(a0: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
export function upperInf(...args: unknown[]) {
    return sqlFunction("upper_inf", [{args: [Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function uuidCmp(a0: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Int4<0 | 1>
export function uuidCmp(...args: unknown[]) {
    return sqlFunction("uuid_cmp", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function uuidEq(a0: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
export function uuidEq(...args: unknown[]) {
    return sqlFunction("uuid_eq", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function uuidExtractTimestamp(a0: Types.Uuid<0 | 1>): Types.Timestamptz<0 | 1>
export function uuidExtractTimestamp(...args: unknown[]) {
    return sqlFunction("uuid_extract_timestamp", [{args: [Types.Uuid<0 | 1>], ret: Types.Timestamptz<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function uuidExtractVersion(a0: Types.Uuid<0 | 1>): Types.Int2<0 | 1>
export function uuidExtractVersion(...args: unknown[]) {
    return sqlFunction("uuid_extract_version", [{args: [Types.Uuid<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function uuidGe(a0: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
export function uuidGe(...args: unknown[]) {
    return sqlFunction("uuid_ge", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function uuidGt(a0: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
export function uuidGt(...args: unknown[]) {
    return sqlFunction("uuid_gt", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function uuidHash(a0: Types.Uuid<0 | 1>): Types.Int4<0 | 1>
export function uuidHash(...args: unknown[]) {
    return sqlFunction("uuid_hash", [{args: [Types.Uuid<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function uuidHashExtended(a0: Types.Uuid<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
export function uuidHashExtended(...args: unknown[]) {
    return sqlFunction("uuid_hash_extended", [{args: [Types.Uuid<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function uuidLe(a0: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
export function uuidLe(...args: unknown[]) {
    return sqlFunction("uuid_le", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function uuidLt(a0: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
export function uuidLt(...args: unknown[]) {
    return sqlFunction("uuid_lt", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function uuidNe(a0: Types.Uuid<0 | 1>, a1: Types.Uuid<0 | 1>): Types.Bool<0 | 1>
export function uuidNe(...args: unknown[]) {
    return sqlFunction("uuid_ne", [{args: [Types.Uuid<0 | 1>, Types.Uuid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function varPop(a0: Types.Float4<number>): Types.Float8<0 | 1>
export function varPop(a0: Types.Float8<number>): Types.Float8<0 | 1>
export function varPop(a0: Types.Int2<number>): Types.Numeric<0 | 1>
export function varPop(a0: Types.Int4<number>): Types.Numeric<0 | 1>
export function varPop(a0: Types.Int8<number>): Types.Numeric<0 | 1>
export function varPop(a0: Types.Numeric<number>): Types.Numeric<0 | 1>
export function varPop(...args: unknown[]) {
    return sqlFunction("var_pop", [{args: [Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function varSamp(a0: Types.Float4<number>): Types.Float8<0 | 1>
export function varSamp(a0: Types.Float8<number>): Types.Float8<0 | 1>
export function varSamp(a0: Types.Int2<number>): Types.Numeric<0 | 1>
export function varSamp(a0: Types.Int4<number>): Types.Numeric<0 | 1>
export function varSamp(a0: Types.Int8<number>): Types.Numeric<0 | 1>
export function varSamp(a0: Types.Numeric<number>): Types.Numeric<0 | 1>
export function varSamp(...args: unknown[]) {
    return sqlFunction("var_samp", [{args: [Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function varbit(a0: Types.Varbit<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Varbit<0 | 1>
export function varbit(...args: unknown[]) {
    return sqlFunction("varbit", [{args: [Types.Varbit<0 | 1>, Types.Int4<0 | 1>, Types.Bool<0 | 1>], ret: Types.Varbit<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function varbitcmp(a0: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Int4<0 | 1>
export function varbitcmp(...args: unknown[]) {
    return sqlFunction("varbitcmp", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function varbiteq(a0: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
export function varbiteq(...args: unknown[]) {
    return sqlFunction("varbiteq", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function varbitge(a0: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
export function varbitge(...args: unknown[]) {
    return sqlFunction("varbitge", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function varbitgt(a0: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
export function varbitgt(...args: unknown[]) {
    return sqlFunction("varbitgt", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function varbitle(a0: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
export function varbitle(...args: unknown[]) {
    return sqlFunction("varbitle", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function varbitlt(a0: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
export function varbitlt(...args: unknown[]) {
    return sqlFunction("varbitlt", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function varbitne(a0: Types.Varbit<0 | 1>, a1: Types.Varbit<0 | 1>): Types.Bool<0 | 1>
export function varbitne(...args: unknown[]) {
    return sqlFunction("varbitne", [{args: [Types.Varbit<0 | 1>, Types.Varbit<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function varchar(a0: Types.Name<0 | 1>): Types.Varchar<0 | 1>
export function varchar(a0: Types.Varchar<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Varchar<0 | 1>
export function varchar(...args: unknown[]) {
    return sqlFunction("varchar", [{args: [Types.Name<0 | 1>], ret: Types.Varchar<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}, {args: [Types.Varchar<0 | 1>, Types.Int4<0 | 1>, Types.Bool<0 | 1>], ret: Types.Varchar<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function variance(a0: Types.Float4<number>): Types.Float8<0 | 1>
export function variance(a0: Types.Float8<number>): Types.Float8<0 | 1>
export function variance(a0: Types.Int2<number>): Types.Numeric<0 | 1>
export function variance(a0: Types.Int4<number>): Types.Numeric<0 | 1>
export function variance(a0: Types.Int8<number>): Types.Numeric<0 | 1>
export function variance(a0: Types.Numeric<number>): Types.Numeric<0 | 1>
export function variance(...args: unknown[]) {
    return sqlFunction("variance", [{args: [Types.Float4<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Float8<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int2<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int4<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Int8<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function version(): Types.Text<0 | 1>
export function version(...args: unknown[]) {
    return sqlFunction("version", [{args: [], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function websearchToTsquery(a0: Types.Regconfig<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<0 | 1>
export function websearchToTsquery(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<0 | 1>
export function websearchToTsquery(...args: unknown[]) {
    return sqlFunction("websearch_to_tsquery", [{args: [Types.Regconfig<0 | 1>, Types.Text<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function width(a0: Types.Box<0 | 1>): Types.Float8<0 | 1>
export function width(...args: unknown[]) {
    return sqlFunction("width", [{args: [Types.Box<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function widthBucket<T extends Types.Any>(a0: T, a1: Types.Array<0 | 1, T>): Types.Int4<0 | 1>
export function widthBucket(a0: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a2: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function widthBucket(a0: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a1: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a2: Types.Numeric<0 | 1> | Types.Input<Types.Numeric<0 | 1>>, a3: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
export function widthBucket(...args: unknown[]) {
    return sqlFunction("width_bucket", [({T}) => ({args: [T, Types.Array.of(T)], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}), {args: [Types.Float8<0 | 1>, Types.Float8<0 | 1>, Types.Float8<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Numeric<0 | 1>, Types.Numeric<0 | 1>, Types.Numeric<0 | 1>, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xid(a0: Types.Xid8<0 | 1>): Types.Xid<0 | 1>
export function xid(...args: unknown[]) {
    return sqlFunction("xid", [{args: [Types.Xid8<0 | 1>], ret: Types.Xid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xid8Larger(a0: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Xid8<0 | 1>
export function xid8Larger(...args: unknown[]) {
    return sqlFunction("xid8_larger", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Xid8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xid8Smaller(a0: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Xid8<0 | 1>
export function xid8Smaller(...args: unknown[]) {
    return sqlFunction("xid8_smaller", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Xid8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xid8Cmp(a0: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Int4<0 | 1>
export function xid8Cmp(...args: unknown[]) {
    return sqlFunction("xid8cmp", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xid8Eq(a0: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
export function xid8Eq(...args: unknown[]) {
    return sqlFunction("xid8eq", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xid8Ge(a0: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
export function xid8Ge(...args: unknown[]) {
    return sqlFunction("xid8ge", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xid8Gt(a0: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
export function xid8Gt(...args: unknown[]) {
    return sqlFunction("xid8gt", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xid8Le(a0: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
export function xid8Le(...args: unknown[]) {
    return sqlFunction("xid8le", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xid8Lt(a0: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
export function xid8Lt(...args: unknown[]) {
    return sqlFunction("xid8lt", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xid8Ne(a0: Types.Xid8<0 | 1>, a1: Types.Xid8<0 | 1>): Types.Bool<0 | 1>
export function xid8Ne(...args: unknown[]) {
    return sqlFunction("xid8ne", [{args: [Types.Xid8<0 | 1>, Types.Xid8<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xideq(a0: Types.Xid<0 | 1>, a1: Types.Xid<0 | 1>): Types.Bool<0 | 1>
export function xideq(...args: unknown[]) {
    return sqlFunction("xideq", [{args: [Types.Xid<0 | 1>, Types.Xid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xideqint4(a0: Types.Xid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function xideqint4(...args: unknown[]) {
    return sqlFunction("xideqint4", [{args: [Types.Xid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xidneq(a0: Types.Xid<0 | 1>, a1: Types.Xid<0 | 1>): Types.Bool<0 | 1>
export function xidneq(...args: unknown[]) {
    return sqlFunction("xidneq", [{args: [Types.Xid<0 | 1>, Types.Xid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xidneqint4(a0: Types.Xid<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
export function xidneqint4(...args: unknown[]) {
    return sqlFunction("xidneqint4", [{args: [Types.Xid<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xml(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
export function xml(...args: unknown[]) {
    return sqlFunction("xml", [{args: [Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function xmlIsWellFormed(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function xmlIsWellFormed(...args: unknown[]) {
    return sqlFunction("xml_is_well_formed", [{args: [Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xmlIsWellFormedContent(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function xmlIsWellFormedContent(...args: unknown[]) {
    return sqlFunction("xml_is_well_formed_content", [{args: [Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xmlIsWellFormedDocument(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function xmlIsWellFormedDocument(...args: unknown[]) {
    return sqlFunction("xml_is_well_formed_document", [{args: [Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xmlagg(a0: Types.Xml<number>): Types.Xml<0 | 1>
export function xmlagg(...args: unknown[]) {
    return sqlFunction("xmlagg", [{args: [Types.Xml<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xmlcomment(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
export function xmlcomment(...args: unknown[]) {
    return sqlFunction("xmlcomment", [{args: [Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xmlconcat2(a0: Types.Xml<0 | 1>, a1: Types.Xml<0 | 1>): Types.Xml<0 | 1>
export function xmlconcat2(...args: unknown[]) {
    return sqlFunction("xmlconcat2", [{args: [Types.Xml<0 | 1>, Types.Xml<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xmlexists(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Xml<0 | 1>): Types.Bool<0 | 1>
export function xmlexists(...args: unknown[]) {
    return sqlFunction("xmlexists", [{args: [Types.Text<0 | 1>, Types.Xml<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], args);
}

export function xmltext(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
export function xmltext(...args: unknown[]) {
    return sqlFunction("xmltext", [{args: [Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xmlvalidate(a0: Types.Xml<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function xmlvalidate(...args: unknown[]) {
    return sqlFunction("xmlvalidate", [{args: [Types.Xml<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xpath(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Xml<0 | 1>): Types.Array<0 | 1, Types.Xml<0 | 1>>
export function xpath(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Xml<0 | 1>, a2: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Array<0 | 1, Types.Xml<0 | 1>>
export function xpath(...args: unknown[]) {
    return sqlFunction("xpath", [{args: [Types.Text<0 | 1>, Types.Xml<0 | 1>], ret: Types.Array.of(Types.Xml<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Xml<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Array.of(Types.Xml<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], args);
}

export function xpathExists(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Xml<0 | 1>): Types.Bool<0 | 1>
export function xpathExists(a0: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a1: Types.Xml<0 | 1>, a2: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Bool<0 | 1>
export function xpathExists(...args: unknown[]) {
    return sqlFunction("xpath_exists", [{args: [Types.Text<0 | 1>, Types.Xml<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Text<0 | 1>, Types.Xml<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], args);
}

