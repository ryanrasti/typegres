import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnyBase } from '../../types/any';

export class Array<N extends number, T extends AnyBase> extends AnyBase<NonNullable<T["resultType"]>[], N> {
    static parse(v: string): unknown { return v; }
    static typeString(): string | undefined  { return "array" } 
    asAggregate(): Types.Array<number, T> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Array<0 | 1, T> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Array<1, T> | undefined {
          return undefined;
        }
       
    arrayAgg(this: Types.Array<number, T>): Types.Array<0 | 1, T>
    arrayAgg(...args: unknown[]) {
        return sqlFunction("array_agg", [({T}) => ({args: [Types.Array.of(T)], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayAppend<T extends Types.Any>(this: Types.Array<1, T>, a1: T | Types.Input<T>): Types.Array<1, T>
    arrayAppend<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: T | Types.Input<T>): Types.Array<0 | 1, T>
    arrayAppend<T extends Types.Any>(this: Types.Array<number, T>, a1: T | Types.Input<T>): Types.Array<0 | 1, T>
    arrayAppend(...args: unknown[]) {
        return sqlFunction("array_append", [({T}) => ({args: [Types.Array.of(T), T], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayCat<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Array<1, T>
    arrayCat<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Array<0 | 1, T>
    arrayCat<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Array<0 | 1, T>
    arrayCat(...args: unknown[]) {
        return sqlFunction("array_cat", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayDims(this: Types.Array<1, T>): Types.Text<1>
    arrayDims(this: Types.Array<0 | 1, T>): Types.Text<0 | 1>
    arrayDims(this: Types.Array<number, T>): Types.Text<0 | 1>
    arrayDims(...args: unknown[]) {
        return sqlFunction("array_dims", [({T}) => ({args: [Types.Array.of(T)], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayEq<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    arrayEq<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    arrayEq<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    arrayEq(...args: unknown[]) {
        return sqlFunction("array_eq", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayGe<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    arrayGe<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    arrayGe<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    arrayGe(...args: unknown[]) {
        return sqlFunction("array_ge", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayGt<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    arrayGt<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    arrayGt<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    arrayGt(...args: unknown[]) {
        return sqlFunction("array_gt", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayLarger<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Array<1, T>
    arrayLarger<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Array<0 | 1, T>
    arrayLarger<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Array<0 | 1, T>
    arrayLarger(...args: unknown[]) {
        return sqlFunction("array_larger", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayLe<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    arrayLe<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    arrayLe<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    arrayLe(...args: unknown[]) {
        return sqlFunction("array_le", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayLength(this: Types.Array<1, T>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    arrayLength(this: Types.Array<0 | 1, T>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    arrayLength(this: Types.Array<number, T>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    arrayLength(...args: unknown[]) {
        return sqlFunction("array_length", [({T}) => ({args: [Types.Array.of(T), Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayLower(this: Types.Array<1, T>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    arrayLower(this: Types.Array<0 | 1, T>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    arrayLower(this: Types.Array<number, T>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    arrayLower(...args: unknown[]) {
        return sqlFunction("array_lower", [({T}) => ({args: [Types.Array.of(T), Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayLt<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    arrayLt<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    arrayLt<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    arrayLt(...args: unknown[]) {
        return sqlFunction("array_lt", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayNdims(this: Types.Array<1, T>): Types.Int4<1>
    arrayNdims(this: Types.Array<0 | 1, T>): Types.Int4<0 | 1>
    arrayNdims(this: Types.Array<number, T>): Types.Int4<0 | 1>
    arrayNdims(...args: unknown[]) {
        return sqlFunction("array_ndims", [({T}) => ({args: [Types.Array.of(T)], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayNe<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    arrayNe<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    arrayNe<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    arrayNe(...args: unknown[]) {
        return sqlFunction("array_ne", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayPosition<T extends Types.Any>(this: Types.Array<1, T>, a1: T | Types.Input<T>): Types.Int4<1>
    arrayPosition<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: T | Types.Input<T>): Types.Int4<0 | 1>
    arrayPosition<T extends Types.Any>(this: Types.Array<number, T>, a1: T | Types.Input<T>): Types.Int4<0 | 1>
    arrayPosition<T extends Types.Any>(this: Types.Array<1, T>, a1: T | Types.Input<T>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    arrayPosition<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: T | Types.Input<T>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    arrayPosition<T extends Types.Any>(this: Types.Array<number, T>, a1: T | Types.Input<T>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    arrayPosition(...args: unknown[]) {
        return sqlFunction("array_position", [({T}) => ({args: [Types.Array.of(T), T], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [Types.Array.of(T), T, Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayPositions<T extends Types.Any>(this: Types.Array<1, T>, a1: T | Types.Input<T>): Types.Array<1, Types.Int4<0 | 1>>
    arrayPositions<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: T | Types.Input<T>): Types.Array<0 | 1, Types.Int4<0 | 1>>
    arrayPositions<T extends Types.Any>(this: Types.Array<number, T>, a1: T | Types.Input<T>): Types.Array<0 | 1, Types.Int4<0 | 1>>
    arrayPositions(...args: unknown[]) {
        return sqlFunction("array_positions", [({T}) => ({args: [Types.Array.of(T), T], ret: Types.Array.of(Types.Int4<0 | 1>), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayRemove<T extends Types.Any>(this: Types.Array<1, T>, a1: T | Types.Input<T>): Types.Array<1, T>
    arrayRemove<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: T | Types.Input<T>): Types.Array<0 | 1, T>
    arrayRemove<T extends Types.Any>(this: Types.Array<number, T>, a1: T | Types.Input<T>): Types.Array<0 | 1, T>
    arrayRemove(...args: unknown[]) {
        return sqlFunction("array_remove", [({T}) => ({args: [Types.Array.of(T), T], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayReplace<T extends Types.Any>(this: Types.Array<1, T>, a1: T | Types.Input<T>, a2: T | Types.Input<T>): Types.Array<1, T>
    arrayReplace<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: T | Types.Input<T>, a2: T | Types.Input<T>): Types.Array<0 | 1, T>
    arrayReplace<T extends Types.Any>(this: Types.Array<number, T>, a1: T | Types.Input<T>, a2: T | Types.Input<T>): Types.Array<0 | 1, T>
    arrayReplace(...args: unknown[]) {
        return sqlFunction("array_replace", [({T}) => ({args: [Types.Array.of(T), T, T], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arraySample(this: Types.Array<1, T>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Array<1, T>
    arraySample(this: Types.Array<0 | 1, T>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Array<0 | 1, T>
    arraySample(this: Types.Array<number, T>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Array<0 | 1, T>
    arraySample(...args: unknown[]) {
        return sqlFunction("array_sample", [({T}) => ({args: [Types.Array.of(T), Types.Int4<0 | 1>], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayShuffle(this: Types.Array<1, T>): Types.Array<1, T>
    arrayShuffle(this: Types.Array<0 | 1, T>): Types.Array<0 | 1, T>
    arrayShuffle(this: Types.Array<number, T>): Types.Array<0 | 1, T>
    arrayShuffle(...args: unknown[]) {
        return sqlFunction("array_shuffle", [({T}) => ({args: [Types.Array.of(T)], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arraySmaller<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Array<1, T>
    arraySmaller<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Array<0 | 1, T>
    arraySmaller<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Array<0 | 1, T>
    arraySmaller(...args: unknown[]) {
        return sqlFunction("array_smaller", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayToJson(this: Types.Array<1, T>): Types.Json<1>
    arrayToJson(this: Types.Array<0 | 1, T>): Types.Json<0 | 1>
    arrayToJson(this: Types.Array<number, T>): Types.Json<0 | 1>
    arrayToJson(this: Types.Array<1, T>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Json<1>
    arrayToJson(this: Types.Array<0 | 1, T>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Json<0 | 1>
    arrayToJson(this: Types.Array<number, T>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Json<0 | 1>
    arrayToJson(...args: unknown[]) {
        return sqlFunction("array_to_json", [({T}) => ({args: [Types.Array.of(T)], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [Types.Array.of(T), Types.Bool<0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayToString(this: Types.Array<1, T>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    arrayToString(this: Types.Array<0 | 1, T>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    arrayToString(this: Types.Array<number, T>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    arrayToString(this: Types.Array<1, T>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    arrayToString(this: Types.Array<0 | 1, T>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    arrayToString(this: Types.Array<number, T>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    arrayToString(...args: unknown[]) {
        return sqlFunction("array_to_string", [({T}) => ({args: [Types.Array.of(T), Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [Types.Array.of(T), Types.Text<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayUpper(this: Types.Array<1, T>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<1>
    arrayUpper(this: Types.Array<0 | 1, T>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    arrayUpper(this: Types.Array<number, T>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Int4<0 | 1>
    arrayUpper(...args: unknown[]) {
        return sqlFunction("array_upper", [({T}) => ({args: [Types.Array.of(T), Types.Int4<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arraycontained<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    arraycontained<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    arraycontained<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    arraycontained(...args: unknown[]) {
        return sqlFunction("arraycontained", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arraycontains<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    arraycontains<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    arraycontains<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    arraycontains(...args: unknown[]) {
        return sqlFunction("arraycontains", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayoverlap<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    arrayoverlap<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    arrayoverlap<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    arrayoverlap(...args: unknown[]) {
        return sqlFunction("arrayoverlap", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    btarraycmp<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Int4<1>
    btarraycmp<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Int4<0 | 1>
    btarraycmp<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Int4<0 | 1>
    btarraycmp(...args: unknown[]) {
        return sqlFunction("btarraycmp", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    cardinality(this: Types.Array<1, T>): Types.Int4<1>
    cardinality(this: Types.Array<0 | 1, T>): Types.Int4<0 | 1>
    cardinality(this: Types.Array<number, T>): Types.Int4<0 | 1>
    cardinality(...args: unknown[]) {
        return sqlFunction("cardinality", [({T}) => ({args: [Types.Array.of(T)], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    generateSubscripts(this: Types.Array<1, T>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.FromItem<{}>
    generateSubscripts(this: Types.Array<0 | 1, T>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.FromItem<{}>
    generateSubscripts(this: Types.Array<number, T>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.FromItem<{}>
    generateSubscripts(this: Types.Array<1, T>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.FromItem<{}>
    generateSubscripts(this: Types.Array<0 | 1, T>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.FromItem<{}>
    generateSubscripts(this: Types.Array<number, T>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.FromItem<{}>
    generateSubscripts(...args: unknown[]) {
        return sqlFunction("generate_subscripts", [({T}) => ({args: [Types.Array.of(T), Types.Int4<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [Types.Array.of(T), Types.Int4<0 | 1>, Types.Bool<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    hashArray(this: Types.Array<1, T>): Types.Int4<1>
    hashArray(this: Types.Array<0 | 1, T>): Types.Int4<0 | 1>
    hashArray(this: Types.Array<number, T>): Types.Int4<0 | 1>
    hashArray(...args: unknown[]) {
        return sqlFunction("hash_array", [({T}) => ({args: [Types.Array.of(T)], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    hashArrayExtended(this: Types.Array<1, T>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashArrayExtended(this: Types.Array<0 | 1, T>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashArrayExtended(this: Types.Array<number, T>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashArrayExtended(...args: unknown[]) {
        return sqlFunction("hash_array_extended", [({T}) => ({args: [Types.Array.of(T), Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    max(this: Types.Array<number, T>): Types.Array<0 | 1, T>
    max(...args: unknown[]) {
        return sqlFunction("max", [({T}) => ({args: [Types.Array.of(T)], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    trimArray(this: Types.Array<1, T>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Array<1, T>
    trimArray(this: Types.Array<0 | 1, T>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Array<0 | 1, T>
    trimArray(this: Types.Array<number, T>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Array<0 | 1, T>
    trimArray(...args: unknown[]) {
        return sqlFunction("trim_array", [({T}) => ({args: [Types.Array.of(T), Types.Int4<0 | 1>], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    unnest(this: Types.Array<1, T>): Types.FromItem<{}>
    unnest(this: Types.Array<0 | 1, T>): Types.FromItem<{}>
    unnest(this: Types.Array<number, T>): Types.FromItem<{}>
    unnest(...args: unknown[]) {
        return sqlFunction("unnest", [({T}) => ({args: [Types.Array.of(T)], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["="]<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    ["="]<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    ["="]<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    eq<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    eq<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    eq<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    [">="]<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    [">="]<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    [">="]<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    gte<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    gte<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    gte<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    [">"]<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    [">"]<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    [">"]<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    gt<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    gt<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    gt<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["<="]<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    ["<="]<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    ["<="]<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    lte<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    lte<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    lte<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["<"]<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    ["<"]<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    ["<"]<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    lt<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    lt<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    lt<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["<>"]<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    ["<>"]<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    ["<>"]<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ne<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    ne<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    ne<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["@>"]<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    ["@>"]<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    ["@>"]<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    ["@>"](...args: unknown[]) {
        return sqlFunction("@>", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["&&"]<T extends Types.Any>(this: Types.Array<1, T>, a1: Types.Array<1, T>): Types.Bool<1>
    ["&&"]<T extends Types.Any>(this: Types.Array<0 | 1, T>, a1: Types.Array<0 | 1, T>): Types.Bool<0 | 1>
    ["&&"]<T extends Types.Any>(this: Types.Array<number, T>, a1: Types.Array<number, T>): Types.Bool<0 | 1>
    ["&&"](...args: unknown[]) {
        return sqlFunction("&&", [({T}) => ({args: [Types.Array.of(T), Types.Array.of(T)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

}
