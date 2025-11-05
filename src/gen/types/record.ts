import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnyBase } from '../../types/any';
import { default as AnynonarrayBase } from '../../types/any';

export class Record<N extends number, R extends { [K in string]: AnyBase<unknown, 0 | 1> }> extends AnynonarrayBase<{ [K in keyof R]: R[K]["resultType"]}, N> {
    static parse(v: string): unknown { return v; }
    static typeString(): string | undefined  { return "record" } 
    asAggregate(): Types.Record<number, R> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Record<0 | 1, R> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Record<1, R> | undefined {
          return undefined;
        }
       
    btrecordcmp<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Int4<1>
    btrecordcmp<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Int4<0 | 1>
    btrecordcmp<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Int4<0 | 1>
    btrecordcmp(...args: unknown[]) {
        return sqlFunction("btrecordcmp", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    btrecordimagecmp<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Int4<1>
    btrecordimagecmp<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Int4<0 | 1>
    btrecordimagecmp<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Int4<0 | 1>
    btrecordimagecmp(...args: unknown[]) {
        return sqlFunction("btrecordimagecmp", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    hashRecord(this: Types.Record<1, R>): Types.Int4<1>
    hashRecord(this: Types.Record<0 | 1, R>): Types.Int4<0 | 1>
    hashRecord(this: Types.Record<number, R>): Types.Int4<0 | 1>
    hashRecord(...args: unknown[]) {
        return sqlFunction("hash_record", [({R}) => ({args: [Types.Record.of(R)], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    hashRecordExtended(this: Types.Record<1, R>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashRecordExtended(this: Types.Record<0 | 1, R>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashRecordExtended(this: Types.Record<number, R>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashRecordExtended(...args: unknown[]) {
        return sqlFunction("hash_record_extended", [({R}) => ({args: [Types.Record.of(R), Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    recordEq<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    recordEq<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    recordEq<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    recordEq(...args: unknown[]) {
        return sqlFunction("record_eq", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    recordGe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    recordGe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    recordGe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    recordGe(...args: unknown[]) {
        return sqlFunction("record_ge", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    recordGt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    recordGt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    recordGt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    recordGt(...args: unknown[]) {
        return sqlFunction("record_gt", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    recordImageEq<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    recordImageEq<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    recordImageEq<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    recordImageEq(...args: unknown[]) {
        return sqlFunction("record_image_eq", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    recordImageGe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    recordImageGe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    recordImageGe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    recordImageGe(...args: unknown[]) {
        return sqlFunction("record_image_ge", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    recordImageGt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    recordImageGt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    recordImageGt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    recordImageGt(...args: unknown[]) {
        return sqlFunction("record_image_gt", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    recordImageLe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    recordImageLe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    recordImageLe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    recordImageLe(...args: unknown[]) {
        return sqlFunction("record_image_le", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    recordImageLt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    recordImageLt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    recordImageLt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    recordImageLt(...args: unknown[]) {
        return sqlFunction("record_image_lt", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    recordImageNe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    recordImageNe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    recordImageNe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    recordImageNe(...args: unknown[]) {
        return sqlFunction("record_image_ne", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    recordLe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    recordLe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    recordLe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    recordLe(...args: unknown[]) {
        return sqlFunction("record_le", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    recordLt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    recordLt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    recordLt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    recordLt(...args: unknown[]) {
        return sqlFunction("record_lt", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    recordNe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    recordNe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    recordNe<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    recordNe(...args: unknown[]) {
        return sqlFunction("record_ne", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    rowToJson(this: Types.Record<1, R>): Types.Json<1>
    rowToJson(this: Types.Record<0 | 1, R>): Types.Json<0 | 1>
    rowToJson(this: Types.Record<number, R>): Types.Json<0 | 1>
    rowToJson(this: Types.Record<1, R>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Json<1>
    rowToJson(this: Types.Record<0 | 1, R>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Json<0 | 1>
    rowToJson(this: Types.Record<number, R>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Json<0 | 1>
    rowToJson(...args: unknown[]) {
        return sqlFunction("row_to_json", [({R}) => ({args: [Types.Record.of(R)], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}), ({R}) => ({args: [Types.Record.of(R), Types.Bool<0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["="]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    ["="]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    ["="]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    eq<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    eq<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    eq<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    [">="]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    [">="]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    [">="]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    gte<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    gte<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    gte<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    [">"]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    [">"]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    [">"]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    gt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    gt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    gt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["*="]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    ["*="]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    ["*="]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    ["*="](...args: unknown[]) {
        return sqlFunction("*=", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["*>="]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    ["*>="]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    ["*>="]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    ["*>="](...args: unknown[]) {
        return sqlFunction("*>=", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["*>"]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    ["*>"]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    ["*>"]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    ["*>"](...args: unknown[]) {
        return sqlFunction("*>", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["*<="]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    ["*<="]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    ["*<="]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    ["*<="](...args: unknown[]) {
        return sqlFunction("*<=", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["*<"]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    ["*<"]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    ["*<"]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    ["*<"](...args: unknown[]) {
        return sqlFunction("*<", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["*<>"]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    ["*<>"]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    ["*<>"]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    ["*<>"](...args: unknown[]) {
        return sqlFunction("*<>", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["<="]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    ["<="]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    ["<="]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    lte<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    lte<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    lte<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["<"]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    ["<"]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    ["<"]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    lt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    lt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    lt<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ["<>"]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    ["<>"]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    ["<>"]<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    ne<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<1, R>, a1: Types.Record<1, R>): Types.Bool<1>
    ne<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<0 | 1, R>, a1: Types.Record<0 | 1, R>): Types.Bool<0 | 1>
    ne<R extends { [k in string]: Types.Any<unknown, 0 | 1> }>(this: Types.Record<number, R>, a1: Types.Record<number, R>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [({R}) => ({args: [Types.Record.of(R), Types.Record.of(R)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false})], [this, ...args]);
    }

}
