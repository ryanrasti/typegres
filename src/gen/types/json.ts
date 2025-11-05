import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Json<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Json<1>;
    static new(v: null): Json<0>;
    static new(v: Expression): Json<0 | 1>;
    static new(v: SerializeParam | null | Expression): Json<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "json" } 
    asAggregate(): Types.Json<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Json<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Json<1> | undefined {
          return undefined;
        }
       
    jsonArrayElement(this: Types.Json<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Json<1>
    jsonArrayElement(this: Types.Json<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Json<0 | 1>
    jsonArrayElement(this: Types.Json<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Json<0 | 1>
    jsonArrayElement(...args: unknown[]) {
        return sqlFunction("json_array_element", [{args: [Types.Json<0 | 1>, Types.Int4<0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonArrayElementText(this: Types.Json<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    jsonArrayElementText(this: Types.Json<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    jsonArrayElementText(this: Types.Json<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    jsonArrayElementText(...args: unknown[]) {
        return sqlFunction("json_array_element_text", [{args: [Types.Json<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonArrayElements(this: Types.Json<1>): Types.FromItem<{value: Types.Json<1>}>
    jsonArrayElements(this: Types.Json<0 | 1>): Types.FromItem<{value: Types.Json<0 | 1>}>
    jsonArrayElements(this: Types.Json<number>): Types.FromItem<{value: Types.Json<0 | 1>}>
    jsonArrayElements(...args: unknown[]) {
        return sqlFunction("json_array_elements", [{args: [Types.Json<0 | 1>], ret: Types.FromItem.ofSchema({value: Types.Json<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonArrayElementsText(this: Types.Json<1>): Types.FromItem<{value: Types.Text<1>}>
    jsonArrayElementsText(this: Types.Json<0 | 1>): Types.FromItem<{value: Types.Text<0 | 1>}>
    jsonArrayElementsText(this: Types.Json<number>): Types.FromItem<{value: Types.Text<0 | 1>}>
    jsonArrayElementsText(...args: unknown[]) {
        return sqlFunction("json_array_elements_text", [{args: [Types.Json<0 | 1>], ret: Types.FromItem.ofSchema({value: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonArrayLength(this: Types.Json<1>): Types.Int4<1>
    jsonArrayLength(this: Types.Json<0 | 1>): Types.Int4<0 | 1>
    jsonArrayLength(this: Types.Json<number>): Types.Int4<0 | 1>
    jsonArrayLength(...args: unknown[]) {
        return sqlFunction("json_array_length", [{args: [Types.Json<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonEach(this: Types.Json<1>): Types.FromItem<{key: Types.Text<1>, value: Types.Json<1>}>
    jsonEach(this: Types.Json<0 | 1>): Types.FromItem<{key: Types.Text<0 | 1>, value: Types.Json<0 | 1>}>
    jsonEach(this: Types.Json<number>): Types.FromItem<{key: Types.Text<0 | 1>, value: Types.Json<0 | 1>}>
    jsonEach(...args: unknown[]) {
        return sqlFunction("json_each", [{args: [Types.Json<0 | 1>], ret: Types.FromItem.ofSchema({key: Types.Text<0 | 1>, value: Types.Json<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonEachText(this: Types.Json<1>): Types.FromItem<{key: Types.Text<1>, value: Types.Text<1>}>
    jsonEachText(this: Types.Json<0 | 1>): Types.FromItem<{key: Types.Text<0 | 1>, value: Types.Text<0 | 1>}>
    jsonEachText(this: Types.Json<number>): Types.FromItem<{key: Types.Text<0 | 1>, value: Types.Text<0 | 1>}>
    jsonEachText(...args: unknown[]) {
        return sqlFunction("json_each_text", [{args: [Types.Json<0 | 1>], ret: Types.FromItem.ofSchema({key: Types.Text<0 | 1>, value: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonExtractPath(this: Types.Json<1>, a1: Types.Array<1, Types.Text<0 | 1>>, ...variadic: (Types.Array<1, Types.Text<0 | 1>>)[]): Types.Json<1>
    jsonExtractPath(this: Types.Json<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: (Types.Array<0 | 1, Types.Text<0 | 1>>)[]): Types.Json<0 | 1>
    jsonExtractPath(this: Types.Json<number>, a1: Types.Array<number, Types.Text<0 | 1>>, ...variadic: (Types.Array<number, Types.Text<0 | 1>>)[]): Types.Json<0 | 1>
    jsonExtractPath(...args: unknown[]) {
        return sqlFunction("json_extract_path", [{args: [Types.Json<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    jsonExtractPathText(this: Types.Json<1>, a1: Types.Array<1, Types.Text<0 | 1>>, ...variadic: (Types.Array<1, Types.Text<0 | 1>>)[]): Types.Text<1>
    jsonExtractPathText(this: Types.Json<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: (Types.Array<0 | 1, Types.Text<0 | 1>>)[]): Types.Text<0 | 1>
    jsonExtractPathText(this: Types.Json<number>, a1: Types.Array<number, Types.Text<0 | 1>>, ...variadic: (Types.Array<number, Types.Text<0 | 1>>)[]): Types.Text<0 | 1>
    jsonExtractPathText(...args: unknown[]) {
        return sqlFunction("json_extract_path_text", [{args: [Types.Json<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    jsonObjectField(this: Types.Json<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Json<1>
    jsonObjectField(this: Types.Json<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Json<0 | 1>
    jsonObjectField(this: Types.Json<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Json<0 | 1>
    jsonObjectField(...args: unknown[]) {
        return sqlFunction("json_object_field", [{args: [Types.Json<0 | 1>, Types.Text<0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonObjectFieldText(this: Types.Json<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    jsonObjectFieldText(this: Types.Json<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    jsonObjectFieldText(this: Types.Json<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    jsonObjectFieldText(...args: unknown[]) {
        return sqlFunction("json_object_field_text", [{args: [Types.Json<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonObjectKeys(this: Types.Json<1>): Types.FromItem<{}>
    jsonObjectKeys(this: Types.Json<0 | 1>): Types.FromItem<{}>
    jsonObjectKeys(this: Types.Json<number>): Types.FromItem<{}>
    jsonObjectKeys(...args: unknown[]) {
        return sqlFunction("json_object_keys", [{args: [Types.Json<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonStripNulls(this: Types.Json<1>): Types.Json<1>
    jsonStripNulls(this: Types.Json<0 | 1>): Types.Json<0 | 1>
    jsonStripNulls(this: Types.Json<number>): Types.Json<0 | 1>
    jsonStripNulls(...args: unknown[]) {
        return sqlFunction("json_strip_nulls", [{args: [Types.Json<0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonToRecord(this: Types.Json<1>): Types.Record<1, {}>
    jsonToRecord(this: Types.Json<0 | 1>): Types.Record<0 | 1, {}>
    jsonToRecord(this: Types.Json<number>): Types.Record<0 | 1, {}>
    jsonToRecord(...args: unknown[]) {
        return sqlFunction("json_to_record", [({R}) => ({args: [Types.Json<0 | 1>], ret: Types.Record.of(R), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    jsonToRecordset(this: Types.Json<1>): Types.FromItem<{}>
    jsonToRecordset(this: Types.Json<0 | 1>): Types.FromItem<{}>
    jsonToRecordset(this: Types.Json<number>): Types.FromItem<{}>
    jsonToRecordset(...args: unknown[]) {
        return sqlFunction("json_to_recordset", [{args: [Types.Json<0 | 1>], ret: Types.FromItem.ofSchema({}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonToTsvector(this: Types.Json<1>, a1: Types.Jsonb<1>): Types.Tsvector<1>
    jsonToTsvector(this: Types.Json<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Tsvector<0 | 1>
    jsonToTsvector(this: Types.Json<number>, a1: Types.Jsonb<number>): Types.Tsvector<0 | 1>
    jsonToTsvector(...args: unknown[]) {
        return sqlFunction("json_to_tsvector", [{args: [Types.Json<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonTypeof(this: Types.Json<1>): Types.Text<1>
    jsonTypeof(this: Types.Json<0 | 1>): Types.Text<0 | 1>
    jsonTypeof(this: Types.Json<number>): Types.Text<0 | 1>
    jsonTypeof(...args: unknown[]) {
        return sqlFunction("json_typeof", [{args: [Types.Json<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toTsvector(this: Types.Json<1>): Types.Tsvector<1>
    toTsvector(this: Types.Json<0 | 1>): Types.Tsvector<0 | 1>
    toTsvector(this: Types.Json<number>): Types.Tsvector<0 | 1>
    toTsvector(...args: unknown[]) {
        return sqlFunction("to_tsvector", [{args: [Types.Json<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsHeadline(this: Types.Json<1>, a1: Types.Tsquery<1>): Types.Json<1>
    tsHeadline(this: Types.Json<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Json<0 | 1>
    tsHeadline(this: Types.Json<number>, a1: Types.Tsquery<number>): Types.Json<0 | 1>
    tsHeadline(this: Types.Json<1>, a1: Types.Tsquery<1>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Json<1>
    tsHeadline(this: Types.Json<0 | 1>, a1: Types.Tsquery<0 | 1>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Json<0 | 1>
    tsHeadline(this: Types.Json<number>, a1: Types.Tsquery<number>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Json<0 | 1>
    tsHeadline(...args: unknown[]) {
        return sqlFunction("ts_headline", [{args: [Types.Json<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Json<0 | 1>, Types.Tsquery<0 | 1>, Types.Text<0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["->"](this: Types.Json<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Json<1>
    ["->"](this: Types.Json<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Json<0 | 1>
    ["->"](this: Types.Json<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Json<0 | 1>
    ["->"](this: Types.Json<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Json<1>
    ["->"](this: Types.Json<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Json<0 | 1>
    ["->"](this: Types.Json<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Json<0 | 1>
    ["->"](...args: unknown[]) {
        return sqlFunction("->", [{args: [Types.Json<0 | 1>, Types.Int4<0 | 1>], ret: Types.Json<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Json<0 | 1>, Types.Text<0 | 1>], ret: Types.Json<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["->>"](this: Types.Json<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<1>
    ["->>"](this: Types.Json<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    ["->>"](this: Types.Json<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Text<0 | 1>
    ["->>"](this: Types.Json<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    ["->>"](this: Types.Json<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    ["->>"](this: Types.Json<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    ["->>"](...args: unknown[]) {
        return sqlFunction("->>", [{args: [Types.Json<0 | 1>, Types.Int4<0 | 1>], ret: Types.Text<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Json<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["#>"](this: Types.Json<1>, a1: Types.Array<1, Types.Text<0 | 1>>, ...variadic: (Types.Array<1, Types.Text<0 | 1>>)[]): Types.Json<1>
    ["#>"](this: Types.Json<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: (Types.Array<0 | 1, Types.Text<0 | 1>>)[]): Types.Json<0 | 1>
    ["#>"](this: Types.Json<number>, a1: Types.Array<number, Types.Text<0 | 1>>, ...variadic: (Types.Array<number, Types.Text<0 | 1>>)[]): Types.Json<0 | 1>
    ["#>"](...args: unknown[]) {
        return sqlFunction("#>", [{args: [Types.Json<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Json<0 | 1>, isOperator: true, isReserved: false, isVariadic: true}], [this, ...args]);
    }

    ["#>>"](this: Types.Json<1>, a1: Types.Array<1, Types.Text<0 | 1>>, ...variadic: (Types.Array<1, Types.Text<0 | 1>>)[]): Types.Text<1>
    ["#>>"](this: Types.Json<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>, ...variadic: (Types.Array<0 | 1, Types.Text<0 | 1>>)[]): Types.Text<0 | 1>
    ["#>>"](this: Types.Json<number>, a1: Types.Array<number, Types.Text<0 | 1>>, ...variadic: (Types.Array<number, Types.Text<0 | 1>>)[]): Types.Text<0 | 1>
    ["#>>"](...args: unknown[]) {
        return sqlFunction("#>>", [{args: [Types.Json<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Text<0 | 1>, isOperator: true, isReserved: false, isVariadic: true}], [this, ...args]);
    }

}
