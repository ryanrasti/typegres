import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import type { default as AnyBase } from '../../types/any';

export class Anymultirange<N extends number, T extends AnyBase> extends AnynonarrayBase<unknown, N> {
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "anymultirange" } 
    asAggregate(): Types.Anymultirange<number, T> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Anymultirange<0 | 1, T> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Anymultirange<1, T> | undefined {
          return undefined;
        }
       
    hashMultirange(this: Types.Anymultirange<1, T>): Types.Int4<1>
    hashMultirange(this: Types.Anymultirange<0 | 1, T>): Types.Int4<0 | 1>
    hashMultirange(this: Types.Anymultirange<number, T>): Types.Int4<0 | 1>
    hashMultirange(...args: unknown[]) {
        return sqlFunction("hash_multirange", [{args: [Types.Anymultirange], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashMultirangeExtended(this: Types.Anymultirange<1, T>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashMultirangeExtended(this: Types.Anymultirange<0 | 1, T>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashMultirangeExtended(this: Types.Anymultirange<number, T>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashMultirangeExtended(...args: unknown[]) {
        return sqlFunction("hash_multirange_extended", [{args: [Types.Anymultirange, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    isempty(this: Types.Anymultirange<1, T>): Types.Bool<1>
    isempty(this: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    isempty(this: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    isempty(...args: unknown[]) {
        return sqlFunction("isempty", [{args: [Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lower(this: Types.Anymultirange<1, T>): T
    lower(this: Types.Anymultirange<0 | 1, T>): T
    lower(this: Types.Anymultirange<number, T>): T
    lower(...args: unknown[]) {
        return sqlFunction("lower", [({T}) => ({args: [Types.Anymultirange], ret: T, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    lowerInc(this: Types.Anymultirange<1, T>): Types.Bool<1>
    lowerInc(this: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    lowerInc(this: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    lowerInc(...args: unknown[]) {
        return sqlFunction("lower_inc", [{args: [Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lowerInf(this: Types.Anymultirange<1, T>): Types.Bool<1>
    lowerInf(this: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    lowerInf(this: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    lowerInf(...args: unknown[]) {
        return sqlFunction("lower_inf", [{args: [Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeAdjacentMultirange<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    multirangeAdjacentMultirange<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeAdjacentMultirange<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    multirangeAdjacentMultirange(...args: unknown[]) {
        return sqlFunction("multirange_adjacent_multirange", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeAdjacentRange<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    multirangeAdjacentRange<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeAdjacentRange<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    multirangeAdjacentRange(...args: unknown[]) {
        return sqlFunction("multirange_adjacent_range", [{args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeAfterMultirange<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    multirangeAfterMultirange<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeAfterMultirange<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    multirangeAfterMultirange(...args: unknown[]) {
        return sqlFunction("multirange_after_multirange", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeAfterRange<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    multirangeAfterRange<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeAfterRange<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    multirangeAfterRange(...args: unknown[]) {
        return sqlFunction("multirange_after_range", [{args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeBeforeMultirange<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    multirangeBeforeMultirange<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeBeforeMultirange<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    multirangeBeforeMultirange(...args: unknown[]) {
        return sqlFunction("multirange_before_multirange", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeBeforeRange<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    multirangeBeforeRange<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeBeforeRange<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    multirangeBeforeRange(...args: unknown[]) {
        return sqlFunction("multirange_before_range", [{args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeCmp<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Int4<1>
    multirangeCmp<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Int4<0 | 1>
    multirangeCmp<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Int4<0 | 1>
    multirangeCmp(...args: unknown[]) {
        return sqlFunction("multirange_cmp", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeContainedByMultirange<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    multirangeContainedByMultirange<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeContainedByMultirange<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    multirangeContainedByMultirange(...args: unknown[]) {
        return sqlFunction("multirange_contained_by_multirange", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeContainedByRange<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    multirangeContainedByRange<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeContainedByRange<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    multirangeContainedByRange(...args: unknown[]) {
        return sqlFunction("multirange_contained_by_range", [{args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeContainsElem<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: T | Types.Input<T>): Types.Bool<1>
    multirangeContainsElem<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    multirangeContainsElem<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    multirangeContainsElem(...args: unknown[]) {
        return sqlFunction("multirange_contains_elem", [({T}) => ({args: [Types.Anymultirange, T], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    multirangeContainsMultirange<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    multirangeContainsMultirange<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeContainsMultirange<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    multirangeContainsMultirange(...args: unknown[]) {
        return sqlFunction("multirange_contains_multirange", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeContainsRange<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    multirangeContainsRange<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeContainsRange<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    multirangeContainsRange(...args: unknown[]) {
        return sqlFunction("multirange_contains_range", [{args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeEq<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    multirangeEq<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeEq<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    multirangeEq(...args: unknown[]) {
        return sqlFunction("multirange_eq", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeGe<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    multirangeGe<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeGe<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    multirangeGe(...args: unknown[]) {
        return sqlFunction("multirange_ge", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeGt<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    multirangeGt<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeGt<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    multirangeGt(...args: unknown[]) {
        return sqlFunction("multirange_gt", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeIntersect<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Anymultirange<1, T>
    multirangeIntersect<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Anymultirange<0 | 1, T>
    multirangeIntersect<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Anymultirange<0 | 1, T>
    multirangeIntersect(...args: unknown[]) {
        return sqlFunction("multirange_intersect", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Anymultirange, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeIntersectAggTransfn<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Anymultirange<1, T>
    multirangeIntersectAggTransfn<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Anymultirange<0 | 1, T>
    multirangeIntersectAggTransfn<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Anymultirange<0 | 1, T>
    multirangeIntersectAggTransfn(...args: unknown[]) {
        return sqlFunction("multirange_intersect_agg_transfn", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Anymultirange, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeLe<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    multirangeLe<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeLe<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    multirangeLe(...args: unknown[]) {
        return sqlFunction("multirange_le", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeLt<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    multirangeLt<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeLt<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    multirangeLt(...args: unknown[]) {
        return sqlFunction("multirange_lt", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeMinus<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Anymultirange<1, T>
    multirangeMinus<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Anymultirange<0 | 1, T>
    multirangeMinus<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Anymultirange<0 | 1, T>
    multirangeMinus(...args: unknown[]) {
        return sqlFunction("multirange_minus", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Anymultirange, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeNe<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    multirangeNe<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeNe<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    multirangeNe(...args: unknown[]) {
        return sqlFunction("multirange_ne", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeOverlapsMultirange<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    multirangeOverlapsMultirange<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeOverlapsMultirange<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    multirangeOverlapsMultirange(...args: unknown[]) {
        return sqlFunction("multirange_overlaps_multirange", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeOverlapsRange<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    multirangeOverlapsRange<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeOverlapsRange<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    multirangeOverlapsRange(...args: unknown[]) {
        return sqlFunction("multirange_overlaps_range", [{args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeOverleftMultirange<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    multirangeOverleftMultirange<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeOverleftMultirange<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    multirangeOverleftMultirange(...args: unknown[]) {
        return sqlFunction("multirange_overleft_multirange", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeOverleftRange<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    multirangeOverleftRange<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeOverleftRange<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    multirangeOverleftRange(...args: unknown[]) {
        return sqlFunction("multirange_overleft_range", [{args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeOverrightMultirange<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    multirangeOverrightMultirange<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeOverrightMultirange<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    multirangeOverrightMultirange(...args: unknown[]) {
        return sqlFunction("multirange_overright_multirange", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeOverrightRange<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    multirangeOverrightRange<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    multirangeOverrightRange<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    multirangeOverrightRange(...args: unknown[]) {
        return sqlFunction("multirange_overright_range", [{args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multirangeUnion<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Anymultirange<1, T>
    multirangeUnion<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Anymultirange<0 | 1, T>
    multirangeUnion<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Anymultirange<0 | 1, T>
    multirangeUnion(...args: unknown[]) {
        return sqlFunction("multirange_union", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Anymultirange, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeAgg(this: Types.Anymultirange<number, T>): Types.Anymultirange<0 | 1, T>
    rangeAgg(...args: unknown[]) {
        return sqlFunction("range_agg", [{args: [Types.Anymultirange], ret: Types.Anymultirange, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeIntersectAgg(this: Types.Anymultirange<number, T>): Types.Anymultirange<0 | 1, T>
    rangeIntersectAgg(...args: unknown[]) {
        return sqlFunction("range_intersect_agg", [{args: [Types.Anymultirange], ret: Types.Anymultirange, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    rangeMerge(this: Types.Anymultirange<1, T>): Types.Anyrange<1, T>
    rangeMerge(this: Types.Anymultirange<0 | 1, T>): Types.Anyrange<0 | 1, T>
    rangeMerge(this: Types.Anymultirange<number, T>): Types.Anyrange<0 | 1, T>
    rangeMerge(...args: unknown[]) {
        return sqlFunction("range_merge", [{args: [Types.Anymultirange], ret: Types.Anyrange, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    unnest(this: Types.Anymultirange<1, T>): Types.FromItem<{}>
    unnest(this: Types.Anymultirange<0 | 1, T>): Types.FromItem<{}>
    unnest(this: Types.Anymultirange<number, T>): Types.FromItem<{}>
    unnest(...args: unknown[]) {
        return sqlFunction("unnest", [{args: [Types.Anymultirange], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    upper(this: Types.Anymultirange<1, T>): T
    upper(this: Types.Anymultirange<0 | 1, T>): T
    upper(this: Types.Anymultirange<number, T>): T
    upper(...args: unknown[]) {
        return sqlFunction("upper", [({T}) => ({args: [Types.Anymultirange], ret: T, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    upperInc(this: Types.Anymultirange<1, T>): Types.Bool<1>
    upperInc(this: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    upperInc(this: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    upperInc(...args: unknown[]) {
        return sqlFunction("upper_inc", [{args: [Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    upperInf(this: Types.Anymultirange<1, T>): Types.Bool<1>
    upperInf(this: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    upperInf(this: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    upperInf(...args: unknown[]) {
        return sqlFunction("upper_inf", [{args: [Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-|-"]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    ["-|-"]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    ["-|-"]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    ["-|-"]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    ["-|-"]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    ["-|-"]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    ["-|-"](...args: unknown[]) {
        return sqlFunction("-|-", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">>"]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    [">>"]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    [">>"]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    [">>"]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    [">>"]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    [">>"]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    [">>"](...args: unknown[]) {
        return sqlFunction(">>", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<<"]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    ["<<"]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    ["<<"]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    ["<<"]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    ["<<"]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    ["<<"]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    ["<<"](...args: unknown[]) {
        return sqlFunction("<<", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["@>"]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: T | Types.Input<T>): Types.Bool<1>
    ["@>"]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    ["@>"]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    ["@>"]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    ["@>"]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    ["@>"]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    ["@>"]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    ["@>"]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    ["@>"]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    ["@>"](...args: unknown[]) {
        return sqlFunction("@>", [({T}) => ({args: [Types.Anymultirange, T], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}), {args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    ["="]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    ["="]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    eq<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    eq<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    [">="]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    [">="]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    gte<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    gte<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    [">"]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    [">"]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    gt<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    gt<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["*"]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Anymultirange<1, T>
    ["*"]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Anymultirange<0 | 1, T>
    ["*"]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Anymultirange<0 | 1, T>
    ["*"](...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Anymultirange, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multiply<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Anymultirange<1, T>
    multiply<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Anymultirange<0 | 1, T>
    multiply<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Anymultirange<0 | 1, T>
    multiply(...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Anymultirange, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    ["<="]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    ["<="]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    lte<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    lte<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    ["<"]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    ["<"]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    lt<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    lt<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Anymultirange<1, T>
    ["-"]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Anymultirange<0 | 1, T>
    ["-"]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Anymultirange<0 | 1, T>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Anymultirange, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Anymultirange<1, T>
    minus<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Anymultirange<0 | 1, T>
    minus<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Anymultirange<0 | 1, T>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Anymultirange, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    ["<>"]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    ["<>"]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    ne<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    ne<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&&"]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    ["&&"]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    ["&&"]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    ["&&"]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    ["&&"]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    ["&&"]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    ["&&"](...args: unknown[]) {
        return sqlFunction("&&", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&<"]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    ["&<"]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    ["&<"]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    ["&<"]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    ["&<"]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    ["&<"]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    ["&<"](...args: unknown[]) {
        return sqlFunction("&<", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&>"]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Bool<1>
    ["&>"]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Bool<0 | 1>
    ["&>"]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Bool<0 | 1>
    ["&>"]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anyrange<1, T>): Types.Bool<1>
    ["&>"]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anyrange<0 | 1, T>): Types.Bool<0 | 1>
    ["&>"]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anyrange<number, T>): Types.Bool<0 | 1>
    ["&>"](...args: unknown[]) {
        return sqlFunction("&>", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Anymultirange, Types.Anyrange], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["+"]<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Anymultirange<1, T>
    ["+"]<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Anymultirange<0 | 1, T>
    ["+"]<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Anymultirange<0 | 1, T>
    ["+"](...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Anymultirange, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plus<T extends Types.Any>(this: Types.Anymultirange<1, T>, a1: Types.Anymultirange<1, T>): Types.Anymultirange<1, T>
    plus<T extends Types.Any>(this: Types.Anymultirange<0 | 1, T>, a1: Types.Anymultirange<0 | 1, T>): Types.Anymultirange<0 | 1, T>
    plus<T extends Types.Any>(this: Types.Anymultirange<number, T>, a1: Types.Anymultirange<number, T>): Types.Anymultirange<0 | 1, T>
    plus(...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Anymultirange, Types.Anymultirange], ret: Types.Anymultirange, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
