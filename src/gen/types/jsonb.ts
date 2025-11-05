import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Jsonb<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Jsonb<1>;
    static new(v: null): Jsonb<0>;
    static new(v: Expression): Jsonb<0 | 1>;
    static new(v: SerializeParam | null | Expression): Jsonb<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "jsonb" } 
    asAggregate(): Types.Jsonb<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Jsonb<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Jsonb<1> | undefined {
          return undefined;
        }
       
    bool(this: Types.Jsonb<1>): Types.Bool<1>
    bool(this: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    bool(this: Types.Jsonb<number>): Types.Bool<0 | 1>
    bool(...args: unknown[]) {
        return sqlFunction("bool", [{args: [Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float4(this: Types.Jsonb<1>): Types.Float4<1>
    float4(this: Types.Jsonb<0 | 1>): Types.Float4<0 | 1>
    float4(this: Types.Jsonb<number>): Types.Float4<0 | 1>
    float4(...args: unknown[]) {
        return sqlFunction("float4", [{args: [Types.Jsonb<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    float8(this: Types.Jsonb<1>): Types.Float8<1>
    float8(this: Types.Jsonb<0 | 1>): Types.Float8<0 | 1>
    float8(this: Types.Jsonb<number>): Types.Float8<0 | 1>
    float8(...args: unknown[]) {
        return sqlFunction("float8", [{args: [Types.Jsonb<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int2(this: Types.Jsonb<1>): Types.Int2<1>
    int2(this: Types.Jsonb<0 | 1>): Types.Int2<0 | 1>
    int2(this: Types.Jsonb<number>): Types.Int2<0 | 1>
    int2(...args: unknown[]) {
        return sqlFunction("int2", [{args: [Types.Jsonb<0 | 1>], ret: Types.Int2<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4(this: Types.Jsonb<1>): Types.Int4<1>
    int4(this: Types.Jsonb<0 | 1>): Types.Int4<0 | 1>
    int4(this: Types.Jsonb<number>): Types.Int4<0 | 1>
    int4(...args: unknown[]) {
        return sqlFunction("int4", [{args: [Types.Jsonb<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int8(this: Types.Jsonb<1>): Types.Int8<1>
    int8(this: Types.Jsonb<0 | 1>): Types.Int8<0 | 1>
    int8(this: Types.Jsonb<number>): Types.Int8<0 | 1>
    int8(...args: unknown[]) {
        return sqlFunction("int8", [{args: [Types.Jsonb<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbArrayElement(this: Types.Jsonb<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Jsonb<1>
    jsonbArrayElement(this: Types.Jsonb<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbArrayElement(this: Types.Jsonb<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbArrayElement(...args: unknown[]) {
        return sqlFunction("jsonb_array_element", [{args: [Types.Jsonb<0 | 1>, Types.Int4<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbArrayElementText(this: Types.Jsonb<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    jsonbArrayElementText(this: Types.Jsonb<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    jsonbArrayElementText(this: Types.Jsonb<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    jsonbArrayElementText(...args: unknown[]) {
        return sqlFunction("jsonb_array_element_text", [{args: [Types.Jsonb<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbArrayElements(this: Types.Jsonb<1>): Types.FromItem<{value: Types.Jsonb<1>}>
    jsonbArrayElements(this: Types.Jsonb<0 | 1>): Types.FromItem<{value: Types.Jsonb<0 | 1>}>
    jsonbArrayElements(this: Types.Jsonb<number>): Types.FromItem<{value: Types.Jsonb<0 | 1>}>
    jsonbArrayElements(...args: unknown[]) {
        return sqlFunction("jsonb_array_elements", [{args: [Types.Jsonb<0 | 1>], ret: Types.FromItem.ofSchema({value: Types.Jsonb<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbArrayElementsText(this: Types.Jsonb<1>): Types.FromItem<{value: Types.Text<1>}>
    jsonbArrayElementsText(this: Types.Jsonb<0 | 1>): Types.FromItem<{value: Types.Text<0 | 1>}>
    jsonbArrayElementsText(this: Types.Jsonb<number>): Types.FromItem<{value: Types.Text<0 | 1>}>
    jsonbArrayElementsText(...args: unknown[]) {
        return sqlFunction("jsonb_array_elements_text", [{args: [Types.Jsonb<0 | 1>], ret: Types.FromItem.ofSchema({value: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbArrayLength(this: Types.Jsonb<1>): Types.Int4<1>
    jsonbArrayLength(this: Types.Jsonb<0 | 1>): Types.Int4<0 | 1>
    jsonbArrayLength(this: Types.Jsonb<number>): Types.Int4<0 | 1>
    jsonbArrayLength(...args: unknown[]) {
        return sqlFunction("jsonb_array_length", [{args: [Types.Jsonb<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbCmp(this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Int4<1>
    jsonbCmp(this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Int4<0 | 1>
    jsonbCmp(this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Int4<0 | 1>
    jsonbCmp(...args: unknown[]) {
        return sqlFunction("jsonb_cmp", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbConcat(this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Jsonb<1>
    jsonbConcat(this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Jsonb<0 | 1>
    jsonbConcat(this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Jsonb<0 | 1>
    jsonbConcat(...args: unknown[]) {
        return sqlFunction("jsonb_concat", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbContained(this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Bool<1>
    jsonbContained(this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    jsonbContained(this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    jsonbContained(...args: unknown[]) {
        return sqlFunction("jsonb_contained", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbContains(this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Bool<1>
    jsonbContains(this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    jsonbContains(this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    jsonbContains(...args: unknown[]) {
        return sqlFunction("jsonb_contains", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbDelete(this: Types.Jsonb<1>, a1: Types.Array<1, Types.Text<0 | 1>>, ...variadic: (Types.Array<1, Types.Text<0 | 1>>)[]): Types.Jsonb<1>
    jsonbDelete(this: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: (Types.Array<0 | 1, Types.Text<0 | 1>>)[]): Types.Jsonb<0 | 1>
    jsonbDelete(this: Types.Jsonb<number>, a1: Types.Array<number, Types.Text<0 | 1>>, ...variadic: (Types.Array<number, Types.Text<0 | 1>>)[]): Types.Jsonb<0 | 1>
    jsonbDelete(this: Types.Jsonb<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Jsonb<1>
    jsonbDelete(this: Types.Jsonb<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbDelete(this: Types.Jsonb<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbDelete(this: Types.Jsonb<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<1>
    jsonbDelete(this: Types.Jsonb<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbDelete(this: Types.Jsonb<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbDelete(...args: unknown[]) {
        return sqlFunction("jsonb_delete", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}, {args: [Types.Jsonb<0 | 1>, Types.Int4<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Jsonb<0 | 1>, Types.Text<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbDeletePath(this: Types.Jsonb<1>, a1: Types.Array<1, Types.Text<0 | 1>>): Types.Jsonb<1>
    jsonbDeletePath(this: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbDeletePath(this: Types.Jsonb<number>, a1: Types.Array<number, Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbDeletePath(...args: unknown[]) {
        return sqlFunction("jsonb_delete_path", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbEach(this: Types.Jsonb<1>): Types.FromItem<{key: Types.Text<1>, value: Types.Jsonb<1>}>
    jsonbEach(this: Types.Jsonb<0 | 1>): Types.FromItem<{key: Types.Text<0 | 1>, value: Types.Jsonb<0 | 1>}>
    jsonbEach(this: Types.Jsonb<number>): Types.FromItem<{key: Types.Text<0 | 1>, value: Types.Jsonb<0 | 1>}>
    jsonbEach(...args: unknown[]) {
        return sqlFunction("jsonb_each", [{args: [Types.Jsonb<0 | 1>], ret: Types.FromItem.ofSchema({key: Types.Text<0 | 1>, value: Types.Jsonb<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbEachText(this: Types.Jsonb<1>): Types.FromItem<{key: Types.Text<1>, value: Types.Text<1>}>
    jsonbEachText(this: Types.Jsonb<0 | 1>): Types.FromItem<{key: Types.Text<0 | 1>, value: Types.Text<0 | 1>}>
    jsonbEachText(this: Types.Jsonb<number>): Types.FromItem<{key: Types.Text<0 | 1>, value: Types.Text<0 | 1>}>
    jsonbEachText(...args: unknown[]) {
        return sqlFunction("jsonb_each_text", [{args: [Types.Jsonb<0 | 1>], ret: Types.FromItem.ofSchema({key: Types.Text<0 | 1>, value: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbEq(this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Bool<1>
    jsonbEq(this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    jsonbEq(this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    jsonbEq(...args: unknown[]) {
        return sqlFunction("jsonb_eq", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbExists(this: Types.Jsonb<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    jsonbExists(this: Types.Jsonb<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    jsonbExists(this: Types.Jsonb<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    jsonbExists(...args: unknown[]) {
        return sqlFunction("jsonb_exists", [{args: [Types.Jsonb<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbExistsAll(this: Types.Jsonb<1>, a1: Types.Array<1, Types.Text<0 | 1>>): Types.Bool<1>
    jsonbExistsAll(this: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Bool<0 | 1>
    jsonbExistsAll(this: Types.Jsonb<number>, a1: Types.Array<number, Types.Text<0 | 1>>): Types.Bool<0 | 1>
    jsonbExistsAll(...args: unknown[]) {
        return sqlFunction("jsonb_exists_all", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbExistsAny(this: Types.Jsonb<1>, a1: Types.Array<1, Types.Text<0 | 1>>): Types.Bool<1>
    jsonbExistsAny(this: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Bool<0 | 1>
    jsonbExistsAny(this: Types.Jsonb<number>, a1: Types.Array<number, Types.Text<0 | 1>>): Types.Bool<0 | 1>
    jsonbExistsAny(...args: unknown[]) {
        return sqlFunction("jsonb_exists_any", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbExtractPath(this: Types.Jsonb<1>, a1: Types.Array<1, Types.Text<0 | 1>>, ...variadic: (Types.Array<1, Types.Text<0 | 1>>)[]): Types.Jsonb<1>
    jsonbExtractPath(this: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: (Types.Array<0 | 1, Types.Text<0 | 1>>)[]): Types.Jsonb<0 | 1>
    jsonbExtractPath(this: Types.Jsonb<number>, a1: Types.Array<number, Types.Text<0 | 1>>, ...variadic: (Types.Array<number, Types.Text<0 | 1>>)[]): Types.Jsonb<0 | 1>
    jsonbExtractPath(...args: unknown[]) {
        return sqlFunction("jsonb_extract_path", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    jsonbExtractPathText(this: Types.Jsonb<1>, a1: Types.Array<1, Types.Text<0 | 1>>, ...variadic: (Types.Array<1, Types.Text<0 | 1>>)[]): Types.Text<1>
    jsonbExtractPathText(this: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: (Types.Array<0 | 1, Types.Text<0 | 1>>)[]): Types.Text<0 | 1>
    jsonbExtractPathText(this: Types.Jsonb<number>, a1: Types.Array<number, Types.Text<0 | 1>>, ...variadic: (Types.Array<number, Types.Text<0 | 1>>)[]): Types.Text<0 | 1>
    jsonbExtractPathText(...args: unknown[]) {
        return sqlFunction("jsonb_extract_path_text", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    jsonbGe(this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Bool<1>
    jsonbGe(this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    jsonbGe(this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    jsonbGe(...args: unknown[]) {
        return sqlFunction("jsonb_ge", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbGt(this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Bool<1>
    jsonbGt(this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    jsonbGt(this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    jsonbGt(...args: unknown[]) {
        return sqlFunction("jsonb_gt", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbHash(this: Types.Jsonb<1>): Types.Int4<1>
    jsonbHash(this: Types.Jsonb<0 | 1>): Types.Int4<0 | 1>
    jsonbHash(this: Types.Jsonb<number>): Types.Int4<0 | 1>
    jsonbHash(...args: unknown[]) {
        return sqlFunction("jsonb_hash", [{args: [Types.Jsonb<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbHashExtended(this: Types.Jsonb<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    jsonbHashExtended(this: Types.Jsonb<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    jsonbHashExtended(this: Types.Jsonb<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    jsonbHashExtended(...args: unknown[]) {
        return sqlFunction("jsonb_hash_extended", [{args: [Types.Jsonb<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbInsert(this: Types.Jsonb<1>, a1: Types.Array<1, Types.Text<0 | 1>>, a2: Types.Jsonb<1>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<1>
    jsonbInsert(this: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbInsert(this: Types.Jsonb<number>, a1: Types.Array<number, Types.Text<0 | 1>>, a2: Types.Jsonb<number>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbInsert(...args: unknown[]) {
        return sqlFunction("jsonb_insert", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>), Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbLe(this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Bool<1>
    jsonbLe(this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    jsonbLe(this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    jsonbLe(...args: unknown[]) {
        return sqlFunction("jsonb_le", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbLt(this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Bool<1>
    jsonbLt(this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    jsonbLt(this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    jsonbLt(...args: unknown[]) {
        return sqlFunction("jsonb_lt", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbNe(this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Bool<1>
    jsonbNe(this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    jsonbNe(this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    jsonbNe(...args: unknown[]) {
        return sqlFunction("jsonb_ne", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbObjectField(this: Types.Jsonb<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<1>
    jsonbObjectField(this: Types.Jsonb<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbObjectField(this: Types.Jsonb<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbObjectField(...args: unknown[]) {
        return sqlFunction("jsonb_object_field", [{args: [Types.Jsonb<0 | 1>, Types.Text<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbObjectFieldText(this: Types.Jsonb<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    jsonbObjectFieldText(this: Types.Jsonb<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    jsonbObjectFieldText(this: Types.Jsonb<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    jsonbObjectFieldText(...args: unknown[]) {
        return sqlFunction("jsonb_object_field_text", [{args: [Types.Jsonb<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbObjectKeys(this: Types.Jsonb<1>): Types.FromItem<{}>
    jsonbObjectKeys(this: Types.Jsonb<0 | 1>): Types.FromItem<{}>
    jsonbObjectKeys(this: Types.Jsonb<number>): Types.FromItem<{}>
    jsonbObjectKeys(...args: unknown[]) {
        return sqlFunction("jsonb_object_keys", [{args: [Types.Jsonb<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbPathExists(this: Types.Jsonb<1>, a1: Types.Jsonpath<1>, a2: Types.Jsonb<1>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    jsonbPathExists(this: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    jsonbPathExists(this: Types.Jsonb<number>, a1: Types.Jsonpath<number>, a2: Types.Jsonb<number>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    jsonbPathExists(...args: unknown[]) {
        return sqlFunction("jsonb_path_exists", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>, Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbPathExistsOpr(this: Types.Jsonb<1>, a1: Types.Jsonpath<1>): Types.Bool<1>
    jsonbPathExistsOpr(this: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>): Types.Bool<0 | 1>
    jsonbPathExistsOpr(this: Types.Jsonb<number>, a1: Types.Jsonpath<number>): Types.Bool<0 | 1>
    jsonbPathExistsOpr(...args: unknown[]) {
        return sqlFunction("jsonb_path_exists_opr", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbPathExistsTz(this: Types.Jsonb<1>, a1: Types.Jsonpath<1>, a2: Types.Jsonb<1>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    jsonbPathExistsTz(this: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    jsonbPathExistsTz(this: Types.Jsonb<number>, a1: Types.Jsonpath<number>, a2: Types.Jsonb<number>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    jsonbPathExistsTz(...args: unknown[]) {
        return sqlFunction("jsonb_path_exists_tz", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>, Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbPathMatch(this: Types.Jsonb<1>, a1: Types.Jsonpath<1>, a2: Types.Jsonb<1>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    jsonbPathMatch(this: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    jsonbPathMatch(this: Types.Jsonb<number>, a1: Types.Jsonpath<number>, a2: Types.Jsonb<number>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    jsonbPathMatch(...args: unknown[]) {
        return sqlFunction("jsonb_path_match", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>, Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbPathMatchOpr(this: Types.Jsonb<1>, a1: Types.Jsonpath<1>): Types.Bool<1>
    jsonbPathMatchOpr(this: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>): Types.Bool<0 | 1>
    jsonbPathMatchOpr(this: Types.Jsonb<number>, a1: Types.Jsonpath<number>): Types.Bool<0 | 1>
    jsonbPathMatchOpr(...args: unknown[]) {
        return sqlFunction("jsonb_path_match_opr", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbPathMatchTz(this: Types.Jsonb<1>, a1: Types.Jsonpath<1>, a2: Types.Jsonb<1>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    jsonbPathMatchTz(this: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    jsonbPathMatchTz(this: Types.Jsonb<number>, a1: Types.Jsonpath<number>, a2: Types.Jsonb<number>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    jsonbPathMatchTz(...args: unknown[]) {
        return sqlFunction("jsonb_path_match_tz", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>, Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbPathQuery(this: Types.Jsonb<1>, a1: Types.Jsonpath<1>, a2: Types.Jsonb<1>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.FromItem<{}>
    jsonbPathQuery(this: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.FromItem<{}>
    jsonbPathQuery(this: Types.Jsonb<number>, a1: Types.Jsonpath<number>, a2: Types.Jsonb<number>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.FromItem<{}>
    jsonbPathQuery(...args: unknown[]) {
        return sqlFunction("jsonb_path_query", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>, Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbPathQueryArray(this: Types.Jsonb<1>, a1: Types.Jsonpath<1>, a2: Types.Jsonb<1>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<1>
    jsonbPathQueryArray(this: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbPathQueryArray(this: Types.Jsonb<number>, a1: Types.Jsonpath<number>, a2: Types.Jsonb<number>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbPathQueryArray(...args: unknown[]) {
        return sqlFunction("jsonb_path_query_array", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>, Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbPathQueryArrayTz(this: Types.Jsonb<1>, a1: Types.Jsonpath<1>, a2: Types.Jsonb<1>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<1>
    jsonbPathQueryArrayTz(this: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbPathQueryArrayTz(this: Types.Jsonb<number>, a1: Types.Jsonpath<number>, a2: Types.Jsonb<number>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbPathQueryArrayTz(...args: unknown[]) {
        return sqlFunction("jsonb_path_query_array_tz", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>, Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbPathQueryFirst(this: Types.Jsonb<1>, a1: Types.Jsonpath<1>, a2: Types.Jsonb<1>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<1>
    jsonbPathQueryFirst(this: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbPathQueryFirst(this: Types.Jsonb<number>, a1: Types.Jsonpath<number>, a2: Types.Jsonb<number>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbPathQueryFirst(...args: unknown[]) {
        return sqlFunction("jsonb_path_query_first", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>, Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbPathQueryFirstTz(this: Types.Jsonb<1>, a1: Types.Jsonpath<1>, a2: Types.Jsonb<1>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<1>
    jsonbPathQueryFirstTz(this: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbPathQueryFirstTz(this: Types.Jsonb<number>, a1: Types.Jsonpath<number>, a2: Types.Jsonb<number>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbPathQueryFirstTz(...args: unknown[]) {
        return sqlFunction("jsonb_path_query_first_tz", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>, Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbPathQueryTz(this: Types.Jsonb<1>, a1: Types.Jsonpath<1>, a2: Types.Jsonb<1>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.FromItem<{}>
    jsonbPathQueryTz(this: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.FromItem<{}>
    jsonbPathQueryTz(this: Types.Jsonb<number>, a1: Types.Jsonpath<number>, a2: Types.Jsonb<number>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.FromItem<{}>
    jsonbPathQueryTz(...args: unknown[]) {
        return sqlFunction("jsonb_path_query_tz", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>, Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbPretty(this: Types.Jsonb<1>): Types.Text<1>
    jsonbPretty(this: Types.Jsonb<0 | 1>): Types.Text<0 | 1>
    jsonbPretty(this: Types.Jsonb<number>): Types.Text<0 | 1>
    jsonbPretty(...args: unknown[]) {
        return sqlFunction("jsonb_pretty", [{args: [Types.Jsonb<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbSet(this: Types.Jsonb<1>, a1: Types.Array<1, Types.Text<0 | 1>>, a2: Types.Jsonb<1>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<1>
    jsonbSet(this: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbSet(this: Types.Jsonb<number>, a1: Types.Array<number, Types.Text<0 | 1>>, a2: Types.Jsonb<number>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbSet(...args: unknown[]) {
        return sqlFunction("jsonb_set", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>), Types.Jsonb<0 | 1>, Types.Bool<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbSetLax(this: Types.Jsonb<1>, a1: Types.Array<1, Types.Text<0 | 1>>, a2: Types.Jsonb<1>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<1>
    jsonbSetLax(this: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, a2: Types.Jsonb<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbSetLax(this: Types.Jsonb<number>, a1: Types.Array<number, Types.Text<0 | 1>>, a2: Types.Jsonb<number>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a4: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
    jsonbSetLax(...args: unknown[]) {
        return sqlFunction("jsonb_set_lax", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>), Types.Jsonb<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbStripNulls(this: Types.Jsonb<1>): Types.Jsonb<1>
    jsonbStripNulls(this: Types.Jsonb<0 | 1>): Types.Jsonb<0 | 1>
    jsonbStripNulls(this: Types.Jsonb<number>): Types.Jsonb<0 | 1>
    jsonbStripNulls(...args: unknown[]) {
        return sqlFunction("jsonb_strip_nulls", [{args: [Types.Jsonb<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbToRecord(this: Types.Jsonb<1>): Types.Record<1, {}>
    jsonbToRecord(this: Types.Jsonb<0 | 1>): Types.Record<0 | 1, {}>
    jsonbToRecord(this: Types.Jsonb<number>): Types.Record<0 | 1, {}>
    jsonbToRecord(...args: unknown[]) {
        return sqlFunction("jsonb_to_record", [({R}) => ({args: [Types.Jsonb<0 | 1>], ret: Types.Record.of(R), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    jsonbToRecordset(this: Types.Jsonb<1>): Types.FromItem<{}>
    jsonbToRecordset(this: Types.Jsonb<0 | 1>): Types.FromItem<{}>
    jsonbToRecordset(this: Types.Jsonb<number>): Types.FromItem<{}>
    jsonbToRecordset(...args: unknown[]) {
        return sqlFunction("jsonb_to_recordset", [{args: [Types.Jsonb<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbToTsvector(this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Tsvector<1>
    jsonbToTsvector(this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Tsvector<0 | 1>
    jsonbToTsvector(this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Tsvector<0 | 1>
    jsonbToTsvector(...args: unknown[]) {
        return sqlFunction("jsonb_to_tsvector", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbTypeof(this: Types.Jsonb<1>): Types.Text<1>
    jsonbTypeof(this: Types.Jsonb<0 | 1>): Types.Text<0 | 1>
    jsonbTypeof(this: Types.Jsonb<number>): Types.Text<0 | 1>
    jsonbTypeof(...args: unknown[]) {
        return sqlFunction("jsonb_typeof", [{args: [Types.Jsonb<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    numeric(this: Types.Jsonb<1>): Types.Numeric<1>
    numeric(this: Types.Jsonb<0 | 1>): Types.Numeric<0 | 1>
    numeric(this: Types.Jsonb<number>): Types.Numeric<0 | 1>
    numeric(...args: unknown[]) {
        return sqlFunction("numeric", [{args: [Types.Jsonb<0 | 1>], ret: Types.Numeric<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    toTsvector(this: Types.Jsonb<1>): Types.Tsvector<1>
    toTsvector(this: Types.Jsonb<0 | 1>): Types.Tsvector<0 | 1>
    toTsvector(this: Types.Jsonb<number>): Types.Tsvector<0 | 1>
    toTsvector(...args: unknown[]) {
        return sqlFunction("to_tsvector", [{args: [Types.Jsonb<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsHeadline(this: Types.Jsonb<1>, a1: Types.Tsquery<1>): Types.Jsonb<1>
    tsHeadline(this: Types.Jsonb<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Jsonb<0 | 1>
    tsHeadline(this: Types.Jsonb<number>, a1: Types.Tsquery<number>): Types.Jsonb<0 | 1>
    tsHeadline(this: Types.Jsonb<1>, a1: Types.Tsquery<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<1>
    tsHeadline(this: Types.Jsonb<0 | 1>, a1: Types.Tsquery<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
    tsHeadline(this: Types.Jsonb<number>, a1: Types.Tsquery<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
    tsHeadline(...args: unknown[]) {
        return sqlFunction("ts_headline", [{args: [Types.Jsonb<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Jsonb<0 | 1>, Types.Tsquery<0 | 1>, Types.Text<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["->"](this: Types.Jsonb<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Jsonb<1>
    ["->"](this: Types.Jsonb<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Jsonb<0 | 1>
    ["->"](this: Types.Jsonb<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Jsonb<0 | 1>
    ["->"](this: Types.Jsonb<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<1>
    ["->"](this: Types.Jsonb<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
    ["->"](this: Types.Jsonb<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
    ["->"](...args: unknown[]) {
        return sqlFunction("->", [{args: [Types.Jsonb<0 | 1>, Types.Int4<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Jsonb<0 | 1>, Types.Text<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["->>"](this: Types.Jsonb<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    ["->>"](this: Types.Jsonb<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    ["->>"](this: Types.Jsonb<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    ["->>"](this: Types.Jsonb<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    ["->>"](this: Types.Jsonb<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    ["->>"](this: Types.Jsonb<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    ["->>"](...args: unknown[]) {
        return sqlFunction("->>", [{args: [Types.Jsonb<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Jsonb<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["@>"](this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Bool<1>
    ["@>"](this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    ["@>"](this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    ["@>"](...args: unknown[]) {
        return sqlFunction("@>", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"](this: Types.Jsonb<1>, a1: Types.Array<1, Types.Text<0 | 1>>, ...variadic: (Types.Array<1, Types.Text<0 | 1>>)[]): Types.Jsonb<1>
    ["-"](this: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: (Types.Array<0 | 1, Types.Text<0 | 1>>)[]): Types.Jsonb<0 | 1>
    ["-"](this: Types.Jsonb<number>, a1: Types.Array<number, Types.Text<0 | 1>>, ...variadic: (Types.Array<number, Types.Text<0 | 1>>)[]): Types.Jsonb<0 | 1>
    ["-"](this: Types.Jsonb<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Jsonb<1>
    ["-"](this: Types.Jsonb<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Jsonb<0 | 1>
    ["-"](this: Types.Jsonb<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Jsonb<0 | 1>
    ["-"](this: Types.Jsonb<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<1>
    ["-"](this: Types.Jsonb<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
    ["-"](this: Types.Jsonb<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Jsonb<0 | 1>, isOperator: true, isReserved: false, isVariadic: true}, {args: [Types.Jsonb<0 | 1>, Types.Int4<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Jsonb<0 | 1>, Types.Text<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus(this: Types.Jsonb<1>, a1: Types.Array<1, Types.Text<0 | 1>>, ...variadic: (Types.Array<1, Types.Text<0 | 1>>)[]): Types.Jsonb<1>
    minus(this: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: (Types.Array<0 | 1, Types.Text<0 | 1>>)[]): Types.Jsonb<0 | 1>
    minus(this: Types.Jsonb<number>, a1: Types.Array<number, Types.Text<0 | 1>>, ...variadic: (Types.Array<number, Types.Text<0 | 1>>)[]): Types.Jsonb<0 | 1>
    minus(this: Types.Jsonb<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Jsonb<1>
    minus(this: Types.Jsonb<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Jsonb<0 | 1>
    minus(this: Types.Jsonb<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Jsonb<0 | 1>
    minus(this: Types.Jsonb<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<1>
    minus(this: Types.Jsonb<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
    minus(this: Types.Jsonb<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Jsonb<0 | 1>, isOperator: true, isReserved: false, isVariadic: true}, {args: [Types.Jsonb<0 | 1>, Types.Int4<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Jsonb<0 | 1>, Types.Text<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["#-"](this: Types.Jsonb<1>, a1: Types.Array<1, Types.Text<0 | 1>>): Types.Jsonb<1>
    ["#-"](this: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
    ["#-"](this: Types.Jsonb<number>, a1: Types.Array<number, Types.Text<0 | 1>>): Types.Jsonb<0 | 1>
    ["#-"](...args: unknown[]) {
        return sqlFunction("#-", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Jsonb<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Bool<1>
    ["="](this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Bool<1>
    eq(this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["?"](this: Types.Jsonb<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    ["?"](this: Types.Jsonb<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["?"](this: Types.Jsonb<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["?"](...args: unknown[]) {
        return sqlFunction("?", [{args: [Types.Jsonb<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["?&"](this: Types.Jsonb<1>, a1: Types.Array<1, Types.Text<0 | 1>>): Types.Bool<1>
    ["?&"](this: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["?&"](this: Types.Jsonb<number>, a1: Types.Array<number, Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["?&"](...args: unknown[]) {
        return sqlFunction("?&", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["?|"](this: Types.Jsonb<1>, a1: Types.Array<1, Types.Text<0 | 1>>): Types.Bool<1>
    ["?|"](this: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["?|"](this: Types.Jsonb<number>, a1: Types.Array<number, Types.Text<0 | 1>>): Types.Bool<0 | 1>
    ["?|"](...args: unknown[]) {
        return sqlFunction("?|", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["#>"](this: Types.Jsonb<1>, a1: Types.Array<1, Types.Text<0 | 1>>, ...variadic: (Types.Array<1, Types.Text<0 | 1>>)[]): Types.Jsonb<1>
    ["#>"](this: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: (Types.Array<0 | 1, Types.Text<0 | 1>>)[]): Types.Jsonb<0 | 1>
    ["#>"](this: Types.Jsonb<number>, a1: Types.Array<number, Types.Text<0 | 1>>, ...variadic: (Types.Array<number, Types.Text<0 | 1>>)[]): Types.Jsonb<0 | 1>
    ["#>"](...args: unknown[]) {
        return sqlFunction("#>", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Jsonb<0 | 1>, isOperator: true, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    ["#>>"](this: Types.Jsonb<1>, a1: Types.Array<1, Types.Text<0 | 1>>, ...variadic: (Types.Array<1, Types.Text<0 | 1>>)[]): Types.Text<1>
    ["#>>"](this: Types.Jsonb<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: (Types.Array<0 | 1, Types.Text<0 | 1>>)[]): Types.Text<0 | 1>
    ["#>>"](this: Types.Jsonb<number>, a1: Types.Array<number, Types.Text<0 | 1>>, ...variadic: (Types.Array<number, Types.Text<0 | 1>>)[]): Types.Text<0 | 1>
    ["#>>"](...args: unknown[]) {
        return sqlFunction("#>>", [{args: [Types.Jsonb<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Text<0 | 1>, isOperator: true, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    [">="](this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Bool<1>
    [">="](this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Bool<1>
    gte(this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Bool<1>
    [">"](this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Bool<1>
    gt(this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Bool<1>
    ["<="](this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Bool<1>
    lte(this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Bool<1>
    ["<"](this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Bool<1>
    lt(this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Bool<1>
    ["<>"](this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Jsonb<1>, a1: Types.Jsonb<1>): Types.Bool<1>
    ne(this: Types.Jsonb<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Jsonb<number>, a1: Types.Jsonb<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["@?"](this: Types.Jsonb<1>, a1: Types.Jsonpath<1>): Types.Bool<1>
    ["@?"](this: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>): Types.Bool<0 | 1>
    ["@?"](this: Types.Jsonb<number>, a1: Types.Jsonpath<number>): Types.Bool<0 | 1>
    ["@?"](...args: unknown[]) {
        return sqlFunction("@?", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["@@"](this: Types.Jsonb<1>, a1: Types.Jsonpath<1>): Types.Bool<1>
    ["@@"](this: Types.Jsonb<0 | 1>, a1: Types.Jsonpath<0 | 1>): Types.Bool<0 | 1>
    ["@@"](this: Types.Jsonb<number>, a1: Types.Jsonpath<number>): Types.Bool<0 | 1>
    ["@@"](...args: unknown[]) {
        return sqlFunction("@@", [{args: [Types.Jsonb<0 | 1>, Types.Jsonpath<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
