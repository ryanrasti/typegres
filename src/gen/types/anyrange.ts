import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import type { default as AnyBase } from '../../types/any';

export class Anyrange<N extends number, T extends AnyBase> extends AnynonarrayBase<unknown, N> {
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "anyrange" } 
    asAggregate(): Types.Anyrange<number, T> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Anyrange<0 | 1, T> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Anyrange<1, T> | undefined {
          return undefined;
        }
       
    hashRange(this: Types.Anyrange<1, T>): Types.Int4<1>
    hashRange(this: Types.Anyrange<0 | 1, T>): Types.Int4<0 | 1>
    hashRange(this: Types.Anyrange<number, T>): Types.Int4<0 | 1>
    hashRange(...args: unknown[]) {
        return sqlFunction("hash_range", [{args: [Types.Anyrange], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashRangeExtended(this: Types.Anyrange<1, T>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashRangeExtended(this: Types.Anyrange<0 | 1, T>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashRangeExtended(this: Types.Anyrange<number, T>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashRangeExtended(...args: unknown[]) {
        return sqlFunction("hash_range_extended", [{args: [Types.Anyrange, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    isempty(this: Types.Anyrange<1, T>): Types.Bool<1>
    isempty(this: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    isempty(this: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    isempty(...args: unknown[]) {
        return sqlFunction("isempty", [{args: [Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lower(this: Types.Anyrange<1, T>): T
    lower(this: Types.Anyrange<0 | 1, T>): T
    lower(this: Types.Anyrange<number, T>): T
    lower(...args: unknown[]) {
        return sqlFunction("lower", [({T}) => ({args: [Types.Anyrange], ret: T, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    lowerInc(this: Types.Anyrange<1, T>): Types.Bool<1>
    lowerInc(this: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    lowerInc(this: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    lowerInc(...args: unknown[]) {
        return sqlFunction("lower_inc", [{args: [Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lowerInf(this: Types.Anyrange<1, T>): Types.Bool<1>
    lowerInf(this: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    lowerInf(this: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    lowerInf(...args: unknown[]) {
        return sqlFunction("lower_inf", [{args: [Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirange(this: Types.Anyrange<1, T>): Types.Anymultirange<1, T>
    multirange(this: Types.Anyrange<0 | 1, T>): Types.Anymultirange<0 | 1, T>
    multirange(this: Types.Anyrange<number, T>): Types.Anymultirange<0 | 1, T>
    multirange(...args: unknown[]) {
        return sqlFunction("multirange", [{args: [Types.Anyrange], ret: Types.Anymultirange, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeAdjacent<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    rangeAdjacent<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    rangeAdjacent<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    rangeAdjacent(...args: unknown[]) {
        return sqlFunction("range_adjacent", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeAdjacentMultirange<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    rangeAdjacentMultirange<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    rangeAdjacentMultirange<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    rangeAdjacentMultirange(...args: unknown[]) {
        return sqlFunction("range_adjacent_multirange", [{args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeAfter<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    rangeAfter<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    rangeAfter<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    rangeAfter(...args: unknown[]) {
        return sqlFunction("range_after", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeAfterMultirange<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    rangeAfterMultirange<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    rangeAfterMultirange<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    rangeAfterMultirange(...args: unknown[]) {
        return sqlFunction("range_after_multirange", [{args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeAgg(this: Types.Anyrange<number, T>): Types.Anymultirange<0 | 1, T>
    rangeAgg(...args: unknown[]) {
        return sqlFunction("range_agg", [{args: [Types.Anyrange], ret: Types.Anymultirange, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeBefore<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    rangeBefore<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    rangeBefore<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    rangeBefore(...args: unknown[]) {
        return sqlFunction("range_before", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeBeforeMultirange<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    rangeBeforeMultirange<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    rangeBeforeMultirange<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    rangeBeforeMultirange(...args: unknown[]) {
        return sqlFunction("range_before_multirange", [{args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeCmp<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Int4<1>
    rangeCmp<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Int4<0 | 1>
    rangeCmp<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Int4<0 | 1>
    rangeCmp(...args: unknown[]) {
        return sqlFunction("range_cmp", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeContainedBy<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    rangeContainedBy<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    rangeContainedBy<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    rangeContainedBy(...args: unknown[]) {
        return sqlFunction("range_contained_by", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeContainedByMultirange<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    rangeContainedByMultirange<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    rangeContainedByMultirange<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    rangeContainedByMultirange(...args: unknown[]) {
        return sqlFunction("range_contained_by_multirange", [{args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeContains<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    rangeContains<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    rangeContains<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    rangeContains(...args: unknown[]) {
        return sqlFunction("range_contains", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeContainsElem<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: T | Types.Input<T>): Types.Bool<1>
    rangeContainsElem<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    rangeContainsElem<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    rangeContainsElem(...args: unknown[]) {
        return sqlFunction("range_contains_elem", [({T}) => ({args: [Types.Anyrange, T], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    rangeContainsMultirange<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    rangeContainsMultirange<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    rangeContainsMultirange<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    rangeContainsMultirange(...args: unknown[]) {
        return sqlFunction("range_contains_multirange", [{args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeEq<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    rangeEq<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    rangeEq<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    rangeEq(...args: unknown[]) {
        return sqlFunction("range_eq", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeGe<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    rangeGe<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    rangeGe<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    rangeGe(...args: unknown[]) {
        return sqlFunction("range_ge", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeGt<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    rangeGt<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    rangeGt<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    rangeGt(...args: unknown[]) {
        return sqlFunction("range_gt", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeIntersect<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Anyrange<1, T>
    rangeIntersect<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Anyrange<0 | 1, T>
    rangeIntersect<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Anyrange<0 | 1, T>
    rangeIntersect(...args: unknown[]) {
        return sqlFunction("range_intersect", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Anyrange, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeIntersectAgg(this: Types.Anyrange<number, T>): Types.Anyrange<0 | 1, T>
    rangeIntersectAgg(...args: unknown[]) {
        return sqlFunction("range_intersect_agg", [{args: [Types.Anyrange], ret: Types.Anyrange, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeIntersectAggTransfn<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Anyrange<1, T>
    rangeIntersectAggTransfn<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Anyrange<0 | 1, T>
    rangeIntersectAggTransfn<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Anyrange<0 | 1, T>
    rangeIntersectAggTransfn(...args: unknown[]) {
        return sqlFunction("range_intersect_agg_transfn", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Anyrange, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeLe<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    rangeLe<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    rangeLe<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    rangeLe(...args: unknown[]) {
        return sqlFunction("range_le", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeLt<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    rangeLt<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    rangeLt<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    rangeLt(...args: unknown[]) {
        return sqlFunction("range_lt", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeMerge<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Anyrange<1, T>
    rangeMerge<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Anyrange<0 | 1, T>
    rangeMerge<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Anyrange<0 | 1, T>
    rangeMerge(...args: unknown[]) {
        return sqlFunction("range_merge", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Anyrange, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeMinus<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Anyrange<1, T>
    rangeMinus<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Anyrange<0 | 1, T>
    rangeMinus<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Anyrange<0 | 1, T>
    rangeMinus(...args: unknown[]) {
        return sqlFunction("range_minus", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Anyrange, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeNe<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    rangeNe<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    rangeNe<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    rangeNe(...args: unknown[]) {
        return sqlFunction("range_ne", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeOverlaps<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    rangeOverlaps<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    rangeOverlaps<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    rangeOverlaps(...args: unknown[]) {
        return sqlFunction("range_overlaps", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeOverlapsMultirange<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    rangeOverlapsMultirange<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    rangeOverlapsMultirange<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    rangeOverlapsMultirange(...args: unknown[]) {
        return sqlFunction("range_overlaps_multirange", [{args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeOverleft<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    rangeOverleft<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    rangeOverleft<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    rangeOverleft(...args: unknown[]) {
        return sqlFunction("range_overleft", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeOverleftMultirange<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    rangeOverleftMultirange<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    rangeOverleftMultirange<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    rangeOverleftMultirange(...args: unknown[]) {
        return sqlFunction("range_overleft_multirange", [{args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeOverright<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    rangeOverright<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    rangeOverright<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    rangeOverright(...args: unknown[]) {
        return sqlFunction("range_overright", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeOverrightMultirange<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    rangeOverrightMultirange<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    rangeOverrightMultirange<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    rangeOverrightMultirange(...args: unknown[]) {
        return sqlFunction("range_overright_multirange", [{args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeUnion<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Anyrange<1, T>
    rangeUnion<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Anyrange<0 | 1, T>
    rangeUnion<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Anyrange<0 | 1, T>
    rangeUnion(...args: unknown[]) {
        return sqlFunction("range_union", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Anyrange, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    upper(this: Types.Anyrange<1, T>): T
    upper(this: Types.Anyrange<0 | 1, T>): T
    upper(this: Types.Anyrange<number, T>): T
    upper(...args: unknown[]) {
        return sqlFunction("upper", [({T}) => ({args: [Types.Anyrange], ret: T, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    upperInc(this: Types.Anyrange<1, T>): Types.Bool<1>
    upperInc(this: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    upperInc(this: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    upperInc(...args: unknown[]) {
        return sqlFunction("upper_inc", [{args: [Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    upperInf(this: Types.Anyrange<1, T>): Types.Bool<1>
    upperInf(this: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    upperInf(this: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    upperInf(...args: unknown[]) {
        return sqlFunction("upper_inf", [{args: [Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-|-"]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    ["-|-"]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    ["-|-"]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    ["-|-"]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    ["-|-"]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    ["-|-"]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    ["-|-"](...args: unknown[]) {
        return sqlFunction("-|-", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">>"]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    [">>"]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    [">>"]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    [">>"]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    [">>"]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    [">>"]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    [">>"](...args: unknown[]) {
        return sqlFunction(">>", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<<"]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    ["<<"]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    ["<<"]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    ["<<"]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    ["<<"]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    ["<<"]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    ["<<"](...args: unknown[]) {
        return sqlFunction("<<", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["@>"]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    ["@>"]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    ["@>"]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    ["@>"]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: T | Types.Input<T>): Types.Bool<1>
    ["@>"]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    ["@>"]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    ["@>"]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    ["@>"]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    ["@>"]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    ["@>"](...args: unknown[]) {
        return sqlFunction("@>", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, ({T}) => ({args: [Types.Anyrange, T], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}), {args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    ["="]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    ["="]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    eq<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    eq<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    [">="]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    [">="]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    gte<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    gte<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    [">"]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    [">"]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    gt<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    gt<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["*"]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Anyrange<1, T>
    ["*"]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Anyrange<0 | 1, T>
    ["*"]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Anyrange<0 | 1, T>
    ["*"](...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Anyrange, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multiply<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Anyrange<1, T>
    multiply<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Anyrange<0 | 1, T>
    multiply<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Anyrange<0 | 1, T>
    multiply(...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Anyrange, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    ["<="]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    ["<="]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    lte<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    lte<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    ["<"]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    ["<"]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    lt<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    lt<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Anyrange<1, T>
    ["-"]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Anyrange<0 | 1, T>
    ["-"]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Anyrange<0 | 1, T>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Anyrange, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Anyrange<1, T>
    minus<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Anyrange<0 | 1, T>
    minus<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Anyrange<0 | 1, T>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Anyrange, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    ["<>"]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    ["<>"]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    ne<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    ne<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&&"]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    ["&&"]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    ["&&"]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    ["&&"]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    ["&&"]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    ["&&"]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    ["&&"](...args: unknown[]) {
        return sqlFunction("&&", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&<"]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    ["&<"]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    ["&<"]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    ["&<"]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    ["&<"]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    ["&<"]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    ["&<"](...args: unknown[]) {
        return sqlFunction("&<", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&>"]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    ["&>"]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    ["&>"]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    ["&>"]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    ["&>"]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    ["&>"]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    ["&>"](...args: unknown[]) {
        return sqlFunction("&>", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Anyrange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["+"]<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Anyrange<1, T>
    ["+"]<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Anyrange<0 | 1, T>
    ["+"]<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Anyrange<0 | 1, T>
    ["+"](...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Anyrange, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plus<T extends Types.Any>(this: Types.Anyrange<1, T>, a1: Types.Anyrange<1, T>): Types.Anyrange<1, T>
    plus<T extends Types.Any>(this: Types.Anyrange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Anyrange<0 | 1, T>
    plus<T extends Types.Any>(this: Types.Anyrange<number, T>, a1: Types.Anyrange<number, T>): Types.Anyrange<0 | 1, T>
    plus(...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Anyrange, Types.Anyrange], ret: Types.Anyrange, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
