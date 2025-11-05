import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import type { default as AnyBase } from '../../types/any';
export class Any {
    static parse(v: string): unknown { return v; }
    static typeString(): string | undefined  { return "any" } 
    anyValue<T extends AnyBase>(this: T): T
    anyValue(...args: unknown[]) {
        return sqlFunction("any_value", [({T}) => ({args: [T], ret: T, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    anyValueTransfn<T extends AnyBase>(this: T, a1: T | Types.Input<T>): T
    anyValueTransfn<T extends AnyBase>(this: T, a1: T | Types.Input<T>): T
    anyValueTransfn<T extends AnyBase>(this: T, a1: T | Types.Input<T>): T
    anyValueTransfn(...args: unknown[]) {
        return sqlFunction("any_value_transfn", [({T}) => ({args: [T, T], ret: T, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayFill<T extends AnyBase>(this: T, a1: Types.Array<1, Types.Int4<0 | 1>>): Types.Array<1, T>
    arrayFill<T extends AnyBase>(this: T, a1: Types.Array<0 | 1, Types.Int4<0 | 1>>): Types.Array<0 | 1, T>
    arrayFill<T extends AnyBase>(this: T, a1: Types.Array<number, Types.Int4<0 | 1>>): Types.Array<0 | 1, T>
    arrayFill<T extends AnyBase>(this: T, a1: Types.Array<1, Types.Int4<0 | 1>>, a2: Types.Array<1, Types.Int4<0 | 1>>): Types.Array<1, T>
    arrayFill<T extends AnyBase>(this: T, a1: Types.Array<0 | 1, Types.Int4<0 | 1>>, a2: Types.Array<0 | 1, Types.Int4<0 | 1>>): Types.Array<0 | 1, T>
    arrayFill<T extends AnyBase>(this: T, a1: Types.Array<number, Types.Int4<0 | 1>>, a2: Types.Array<number, Types.Int4<0 | 1>>): Types.Array<0 | 1, T>
    arrayFill(...args: unknown[]) {
        return sqlFunction("array_fill", [({T}) => ({args: [T, Types.Array.of(Types.Int4<0 | 1>)], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [T, Types.Array.of(Types.Int4<0 | 1>), Types.Array.of(Types.Int4<0 | 1>)], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayPrepend<T extends AnyBase>(this: T, a1: Types.Array<1, T>): Types.Array<1, T>
    arrayPrepend<T extends AnyBase>(this: T, a1: Types.Array<0 | 1, T>): Types.Array<0 | 1, T>
    arrayPrepend<T extends AnyBase>(this: T, a1: Types.Array<number, T>): Types.Array<0 | 1, T>
    arrayPrepend(...args: unknown[]) {
        return sqlFunction("array_prepend", [({T}) => ({args: [T, Types.Array.of(T)], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    concat<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, 1> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Text<1>
    concat<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, 0 | 1> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Text<0 | 1>
    concat<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Text<0 | 1>
    concat(...args: unknown[]) {
        return sqlFunction("concat", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    count<T extends AnyBase>(this: T): Types.Int8<1>
    count(...args: unknown[]) {
        return sqlFunction("count", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    cumeDist<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Float8<0 | 1>
    cumeDist(...args: unknown[]) {
        return sqlFunction("cume_dist", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    denseRank<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Int8<0 | 1>
    denseRank(...args: unknown[]) {
        return sqlFunction("dense_rank", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    elemContainedByMultirange<T extends AnyBase>(this: T, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    elemContainedByMultirange<T extends AnyBase>(this: T, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    elemContainedByMultirange<T extends AnyBase>(this: T, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    elemContainedByMultirange(...args: unknown[]) {
        return sqlFunction("elem_contained_by_multirange", [({T}) => ({args: [T, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    elemContainedByRange<T extends AnyBase>(this: T, a1: Types.Anyrange<1, T>): Types.Bool<1>
    elemContainedByRange<T extends AnyBase>(this: T, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    elemContainedByRange<T extends AnyBase>(this: T, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    elemContainedByRange(...args: unknown[]) {
        return sqlFunction("elem_contained_by_range", [({T}) => ({args: [T, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    firstValue<T extends AnyBase>(this: T): T
    firstValue<T extends AnyBase>(this: T): T
    firstValue<T extends AnyBase>(this: T): T
    firstValue(...args: unknown[]) {
        return sqlFunction("first_value", [({T}) => ({args: [T], ret: T, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    jsonAgg<T extends AnyBase>(this: T): Types.Json<0 | 1>
    jsonAgg(...args: unknown[]) {
        return sqlFunction("json_agg", [({T}) => ({args: [T], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    jsonAggStrict<T extends AnyBase>(this: T): Types.Json<0 | 1>
    jsonAggStrict(...args: unknown[]) {
        return sqlFunction("json_agg_strict", [({T}) => ({args: [T], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    jsonBuildArray<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, 1> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Json<1>
    jsonBuildArray<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, 0 | 1> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Json<0 | 1>
    jsonBuildArray<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Json<0 | 1>
    jsonBuildArray(...args: unknown[]) {
        return sqlFunction("json_build_array", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    jsonBuildObject<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, 1> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Json<1>
    jsonBuildObject<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, 0 | 1> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Json<0 | 1>
    jsonBuildObject<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Json<0 | 1>
    jsonBuildObject(...args: unknown[]) {
        return sqlFunction("json_build_object", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    jsonObjectAgg<T extends AnyBase>(this: T, a1: Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>): Types.Json<0 | 1>
    jsonObjectAgg(...args: unknown[]) {
        return sqlFunction("json_object_agg", [{args: [Types.Any<unknown, 0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonObjectAggStrict<T extends AnyBase>(this: T, a1: Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>): Types.Json<0 | 1>
    jsonObjectAggStrict(...args: unknown[]) {
        return sqlFunction("json_object_agg_strict", [{args: [Types.Any<unknown, 0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonObjectAggUnique<T extends AnyBase>(this: T, a1: Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>): Types.Json<0 | 1>
    jsonObjectAggUnique(...args: unknown[]) {
        return sqlFunction("json_object_agg_unique", [{args: [Types.Any<unknown, 0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonObjectAggUniqueStrict<T extends AnyBase>(this: T, a1: Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>): Types.Json<0 | 1>
    jsonObjectAggUniqueStrict(...args: unknown[]) {
        return sqlFunction("json_object_agg_unique_strict", [{args: [Types.Any<unknown, 0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonPopulateRecord<T extends AnyBase>(this: T, a1: Types.Json<1>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): T
    jsonPopulateRecord<T extends AnyBase>(this: T, a1: Types.Json<0 | 1>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): T
    jsonPopulateRecord<T extends AnyBase>(this: T, a1: Types.Json<number>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): T
    jsonPopulateRecord(...args: unknown[]) {
        return sqlFunction("json_populate_record", [({T}) => ({args: [T, Types.Json<0 | 1>, Types.Bool<0 | 1>], ret: T, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    jsonPopulateRecordset<T extends AnyBase>(this: T, a1: Types.Json<1>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.FromItem<{}>
    jsonPopulateRecordset<T extends AnyBase>(this: T, a1: Types.Json<0 | 1>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.FromItem<{}>
    jsonPopulateRecordset<T extends AnyBase>(this: T, a1: Types.Json<number>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.FromItem<{}>
    jsonPopulateRecordset(...args: unknown[]) {
        return sqlFunction("json_populate_recordset", [({T}) => ({args: [T, Types.Json<0 | 1>, Types.Bool<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    jsonbAgg<T extends AnyBase>(this: T): Types.Jsonb<0 | 1>
    jsonbAgg(...args: unknown[]) {
        return sqlFunction("jsonb_agg", [({T}) => ({args: [T], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    jsonbAggStrict<T extends AnyBase>(this: T): Types.Jsonb<0 | 1>
    jsonbAggStrict(...args: unknown[]) {
        return sqlFunction("jsonb_agg_strict", [({T}) => ({args: [T], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    jsonbBuildArray<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, 1> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Jsonb<1>
    jsonbBuildArray<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, 0 | 1> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Jsonb<0 | 1>
    jsonbBuildArray<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Jsonb<0 | 1>
    jsonbBuildArray(...args: unknown[]) {
        return sqlFunction("jsonb_build_array", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    jsonbBuildObject<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, 1> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Jsonb<1>
    jsonbBuildObject<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, 0 | 1> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Jsonb<0 | 1>
    jsonbBuildObject<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Jsonb<0 | 1>
    jsonbBuildObject(...args: unknown[]) {
        return sqlFunction("jsonb_build_object", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    jsonbObjectAgg<T extends AnyBase>(this: T, a1: Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>): Types.Jsonb<0 | 1>
    jsonbObjectAgg(...args: unknown[]) {
        return sqlFunction("jsonb_object_agg", [{args: [Types.Any<unknown, 0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbObjectAggStrict<T extends AnyBase>(this: T, a1: Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>): Types.Jsonb<0 | 1>
    jsonbObjectAggStrict(...args: unknown[]) {
        return sqlFunction("jsonb_object_agg_strict", [{args: [Types.Any<unknown, 0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbObjectAggUnique<T extends AnyBase>(this: T, a1: Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>): Types.Jsonb<0 | 1>
    jsonbObjectAggUnique(...args: unknown[]) {
        return sqlFunction("jsonb_object_agg_unique", [{args: [Types.Any<unknown, 0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbObjectAggUniqueStrict<T extends AnyBase>(this: T, a1: Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>): Types.Jsonb<0 | 1>
    jsonbObjectAggUniqueStrict(...args: unknown[]) {
        return sqlFunction("jsonb_object_agg_unique_strict", [{args: [Types.Any<unknown, 0 | 1>, Types.Any<unknown, 0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbPopulateRecord<T extends AnyBase>(this: T, a1: Types.Jsonb<1>): T
    jsonbPopulateRecord<T extends AnyBase>(this: T, a1: Types.Jsonb<0 | 1>): T
    jsonbPopulateRecord<T extends AnyBase>(this: T, a1: Types.Jsonb<number>): T
    jsonbPopulateRecord(...args: unknown[]) {
        return sqlFunction("jsonb_populate_record", [({T}) => ({args: [T, Types.Jsonb<0 | 1>], ret: T, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    jsonbPopulateRecordValid<T extends AnyBase>(this: T, a1: Types.Jsonb<1>): Types.Bool<1>
    jsonbPopulateRecordValid<T extends AnyBase>(this: T, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    jsonbPopulateRecordValid<T extends AnyBase>(this: T, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    jsonbPopulateRecordValid(...args: unknown[]) {
        return sqlFunction("jsonb_populate_record_valid", [({T}) => ({args: [T, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    jsonbPopulateRecordset<T extends AnyBase>(this: T, a1: Types.Jsonb<1>): Types.FromItem<{}>
    jsonbPopulateRecordset<T extends AnyBase>(this: T, a1: Types.Jsonb<0 | 1>): Types.FromItem<{}>
    jsonbPopulateRecordset<T extends AnyBase>(this: T, a1: Types.Jsonb<number>): Types.FromItem<{}>
    jsonbPopulateRecordset(...args: unknown[]) {
        return sqlFunction("jsonb_populate_recordset", [({T}) => ({args: [T, Types.Jsonb<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    lag<T extends AnyBase>(this: T, a1: Types.Int4<1>, a2: T): T
    lag<T extends AnyBase>(this: T, a1: Types.Int4<0 | 1>, a2: T): T
    lag<T extends AnyBase>(this: T, a1: Types.Int4<number>, a2: T): T
    lag<T extends AnyBase>(this: T): T
    lag<T extends AnyBase>(this: T): T
    lag<T extends AnyBase>(this: T): T
    lag<T extends AnyBase>(this: T, a1: Types.Int4<1>): T
    lag<T extends AnyBase>(this: T, a1: Types.Int4<0 | 1>): T
    lag<T extends AnyBase>(this: T, a1: Types.Int4<number>): T
    lag(...args: unknown[]) {
        return sqlFunction("lag", [({T}) => ({args: [T, Types.Int4<0 | 1>, T], ret: T, isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [T], ret: T, isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [T, Types.Int4<0 | 1>], ret: T, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    lastValue<T extends AnyBase>(this: T): T
    lastValue<T extends AnyBase>(this: T): T
    lastValue<T extends AnyBase>(this: T): T
    lastValue(...args: unknown[]) {
        return sqlFunction("last_value", [({T}) => ({args: [T], ret: T, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    lead<T extends AnyBase>(this: T, a1: Types.Int4<1>, a2: T): T
    lead<T extends AnyBase>(this: T, a1: Types.Int4<0 | 1>, a2: T): T
    lead<T extends AnyBase>(this: T, a1: Types.Int4<number>, a2: T): T
    lead<T extends AnyBase>(this: T): T
    lead<T extends AnyBase>(this: T): T
    lead<T extends AnyBase>(this: T): T
    lead<T extends AnyBase>(this: T, a1: Types.Int4<1>): T
    lead<T extends AnyBase>(this: T, a1: Types.Int4<0 | 1>): T
    lead<T extends AnyBase>(this: T, a1: Types.Int4<number>): T
    lead(...args: unknown[]) {
        return sqlFunction("lead", [({T}) => ({args: [T, Types.Int4<0 | 1>, T], ret: T, isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [T], ret: T, isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [T, Types.Int4<0 | 1>], ret: T, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    mode<T extends AnyBase>(this: T): T
    mode(...args: unknown[]) {
        return sqlFunction("mode", [({T}) => ({args: [T], ret: T, isOperator: false, isReserved: true, isVariadic: false})], [this, ...args]);
    }

    nthValue<T extends AnyBase>(this: T, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): T
    nthValue<T extends AnyBase>(this: T, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): T
    nthValue<T extends AnyBase>(this: T, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): T
    nthValue(...args: unknown[]) {
        return sqlFunction("nth_value", [({T}) => ({args: [T, Types.Int4<0 | 1>], ret: T, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    numNonnulls<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, 1> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Int4<1>
    numNonnulls<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, 0 | 1> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Int4<0 | 1>
    numNonnulls<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Int4<0 | 1>
    numNonnulls(...args: unknown[]) {
        return sqlFunction("num_nonnulls", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    numNulls<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, 1> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Int4<1>
    numNulls<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, 0 | 1> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Int4<0 | 1>
    numNulls<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Int4<0 | 1>
    numNulls(...args: unknown[]) {
        return sqlFunction("num_nulls", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    percentRank<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Float8<0 | 1>
    percentRank(...args: unknown[]) {
        return sqlFunction("percent_rank", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    pgCollationFor<T extends AnyBase>(this: T): Types.Text<1>
    pgCollationFor<T extends AnyBase>(this: T): Types.Text<0 | 1>
    pgCollationFor<T extends AnyBase>(this: T): Types.Text<0 | 1>
    pgCollationFor(...args: unknown[]) {
        return sqlFunction("pg_collation_for", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgColumnCompression<T extends AnyBase>(this: T): Types.Text<1>
    pgColumnCompression<T extends AnyBase>(this: T): Types.Text<0 | 1>
    pgColumnCompression<T extends AnyBase>(this: T): Types.Text<0 | 1>
    pgColumnCompression(...args: unknown[]) {
        return sqlFunction("pg_column_compression", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgColumnSize<T extends AnyBase>(this: T): Types.Int4<1>
    pgColumnSize<T extends AnyBase>(this: T): Types.Int4<0 | 1>
    pgColumnSize<T extends AnyBase>(this: T): Types.Int4<0 | 1>
    pgColumnSize(...args: unknown[]) {
        return sqlFunction("pg_column_size", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgColumnToastChunkId<T extends AnyBase>(this: T): Types.Oid<1>
    pgColumnToastChunkId<T extends AnyBase>(this: T): Types.Oid<0 | 1>
    pgColumnToastChunkId<T extends AnyBase>(this: T): Types.Oid<0 | 1>
    pgColumnToastChunkId(...args: unknown[]) {
        return sqlFunction("pg_column_toast_chunk_id", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTypeof<T extends AnyBase>(this: T): Types.Regtype<1>
    pgTypeof<T extends AnyBase>(this: T): Types.Regtype<0 | 1>
    pgTypeof<T extends AnyBase>(this: T): Types.Regtype<0 | 1>
    pgTypeof(...args: unknown[]) {
        return sqlFunction("pg_typeof", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Regtype<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    quoteLiteral<T extends AnyBase>(this: T): Types.Text<1>
    quoteLiteral<T extends AnyBase>(this: T): Types.Text<0 | 1>
    quoteLiteral<T extends AnyBase>(this: T): Types.Text<0 | 1>
    quoteLiteral(...args: unknown[]) {
        return sqlFunction("quote_literal", [({T}) => ({args: [T], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    quoteNullable<T extends AnyBase>(this: T): Types.Text<1>
    quoteNullable<T extends AnyBase>(this: T): Types.Text<0 | 1>
    quoteNullable<T extends AnyBase>(this: T): Types.Text<0 | 1>
    quoteNullable(...args: unknown[]) {
        return sqlFunction("quote_nullable", [({T}) => ({args: [T], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    rank<T extends AnyBase>(this: T, ...variadic: (Types.Any<unknown, number> | Types.Input<Types.Any<unknown, 0 | 1>>)[]): Types.Int8<0 | 1>
    rank(...args: unknown[]) {
        return sqlFunction("rank", [{args: [Types.Any<unknown, 0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    toJson<T extends AnyBase>(this: T): Types.Json<1>
    toJson<T extends AnyBase>(this: T): Types.Json<0 | 1>
    toJson<T extends AnyBase>(this: T): Types.Json<0 | 1>
    toJson(...args: unknown[]) {
        return sqlFunction("to_json", [({T}) => ({args: [T], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    toJsonb<T extends AnyBase>(this: T): Types.Jsonb<1>
    toJsonb<T extends AnyBase>(this: T): Types.Jsonb<0 | 1>
    toJsonb<T extends AnyBase>(this: T): Types.Jsonb<0 | 1>
    toJsonb(...args: unknown[]) {
        return sqlFunction("to_jsonb", [({T}) => ({args: [T], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    widthBucket<T extends AnyBase>(this: T, a1: Types.Array<1, T>): Types.Int4<1>
    widthBucket<T extends AnyBase>(this: T, a1: Types.Array<0 | 1, T>): Types.Int4<0 | 1>
    widthBucket<T extends AnyBase>(this: T, a1: Types.Array<number, T>): Types.Int4<0 | 1>
    widthBucket(...args: unknown[]) {
        return sqlFunction("width_bucket", [({T}) => ({args: [T, Types.Array.of(T)], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["||"]<T extends AnyBase>(this: T, a1: Types.Array<1, T>): Types.Array<1, T>
    ["||"]<T extends AnyBase>(this: T, a1: Types.Array<0 | 1, T>): Types.Array<0 | 1, T>
    ["||"]<T extends AnyBase>(this: T, a1: Types.Array<number, T>): Types.Array<0 | 1, T>
    ["||"](...args: unknown[]) {
        return sqlFunction("||", [({T}) => ({args: [T, Types.Array.of(T)], ret: Types.Array.of(T), isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["<@"]<T extends AnyBase>(this: T, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    ["<@"]<T extends AnyBase>(this: T, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    ["<@"]<T extends AnyBase>(this: T, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    ["<@"]<T extends AnyBase>(this: T, a1: Types.Anyrange<1, T>): Types.Bool<1>
    ["<@"]<T extends AnyBase>(this: T, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    ["<@"]<T extends AnyBase>(this: T, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    ["<@"](...args: unknown[]) {
        return sqlFunction("<@", [({T}) => ({args: [T, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}), ({T}) => ({args: [T, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

}
