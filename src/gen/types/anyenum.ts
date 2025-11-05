import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';

type Parsed = string
export class Anyenum<N extends number> extends AnynonarrayBase<Parsed, N> {
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "anyenum" } 
    asAggregate(): Types.Anyenum<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Anyenum<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Anyenum<1> | undefined {
          return undefined;
        }
       
    enumCmp<T extends this>(this: T, a1: T | Types.Input<T>): Types.Int4<1>
    enumCmp<T extends this>(this: T, a1: T | Types.Input<T>): Types.Int4<0 | 1>
    enumCmp<T extends this>(this: T, a1: T | Types.Input<T>): Types.Int4<0 | 1>
    enumCmp(...args: unknown[]) {
        return sqlFunction("enum_cmp", [({T}) => ({args: [T, T], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    enumEq<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<1>
    enumEq<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    enumEq<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    enumEq(...args: unknown[]) {
        return sqlFunction("enum_eq", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    enumFirst<T extends this>(this: T): T
    enumFirst<T extends this>(this: T): T
    enumFirst<T extends this>(this: T): T
    enumFirst(...args: unknown[]) {
        return sqlFunction("enum_first", [({T}) => ({args: [T], ret: T, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    enumGe<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<1>
    enumGe<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    enumGe<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    enumGe(...args: unknown[]) {
        return sqlFunction("enum_ge", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    enumGt<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<1>
    enumGt<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    enumGt<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    enumGt(...args: unknown[]) {
        return sqlFunction("enum_gt", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    enumLarger<T extends this>(this: T, a1: T | Types.Input<T>): T
    enumLarger<T extends this>(this: T, a1: T | Types.Input<T>): T
    enumLarger<T extends this>(this: T, a1: T | Types.Input<T>): T
    enumLarger(...args: unknown[]) {
        return sqlFunction("enum_larger", [({T}) => ({args: [T, T], ret: T, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    enumLast<T extends this>(this: T): T
    enumLast<T extends this>(this: T): T
    enumLast<T extends this>(this: T): T
    enumLast(...args: unknown[]) {
        return sqlFunction("enum_last", [({T}) => ({args: [T], ret: T, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    enumLe<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<1>
    enumLe<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    enumLe<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    enumLe(...args: unknown[]) {
        return sqlFunction("enum_le", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    enumLt<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<1>
    enumLt<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    enumLt<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    enumLt(...args: unknown[]) {
        return sqlFunction("enum_lt", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    enumNe<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<1>
    enumNe<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    enumNe<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    enumNe(...args: unknown[]) {
        return sqlFunction("enum_ne", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    enumRange<T extends this>(this: T): Types.Array<1, T>
    enumRange<T extends this>(this: T): Types.Array<0 | 1, T>
    enumRange<T extends this>(this: T): Types.Array<0 | 1, T>
    enumRange<T extends this>(this: T, a1: T | Types.Input<T>): Types.Array<1, T>
    enumRange<T extends this>(this: T, a1: T | Types.Input<T>): Types.Array<0 | 1, T>
    enumRange<T extends this>(this: T, a1: T | Types.Input<T>): Types.Array<0 | 1, T>
    enumRange(...args: unknown[]) {
        return sqlFunction("enum_range", [({T}) => ({args: [T], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false}), ({T}) => ({args: [T, T], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    enumSmaller<T extends this>(this: T, a1: T | Types.Input<T>): T
    enumSmaller<T extends this>(this: T, a1: T | Types.Input<T>): T
    enumSmaller<T extends this>(this: T, a1: T | Types.Input<T>): T
    enumSmaller(...args: unknown[]) {
        return sqlFunction("enum_smaller", [({T}) => ({args: [T, T], ret: T, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    hashenum<T extends this>(this: T): Types.Int4<1>
    hashenum<T extends this>(this: T): Types.Int4<0 | 1>
    hashenum<T extends this>(this: T): Types.Int4<0 | 1>
    hashenum(...args: unknown[]) {
        return sqlFunction("hashenum", [({T}) => ({args: [T], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    hashenumextended<T extends this>(this: T, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashenumextended<T extends this>(this: T, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashenumextended<T extends this>(this: T, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashenumextended(...args: unknown[]) {
        return sqlFunction("hashenumextended", [({T}) => ({args: [T, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    max<T extends this>(this: T): T
    max(...args: unknown[]) {
        return sqlFunction("max", [({T}) => ({args: [T], ret: T, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["="]<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<1>
    ["="]<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    ["="]<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    eq<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<1>
    eq<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    eq<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    [">="]<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<1>
    [">="]<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    [">="]<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    gte<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<1>
    gte<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    gte<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    [">"]<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<1>
    [">"]<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    [">"]<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    gt<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<1>
    gt<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    gt<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["<="]<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<1>
    ["<="]<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    ["<="]<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    lte<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<1>
    lte<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    lte<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["<"]<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<1>
    ["<"]<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    ["<"]<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    lt<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<1>
    lt<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    lt<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["<>"]<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<1>
    ["<>"]<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    ["<>"]<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ne<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<1>
    ne<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    ne<T extends this>(this: T, a1: T | Types.Input<T>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [({T}) => ({args: [T, T], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

}
