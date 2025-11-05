import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Regconfig<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Regconfig<1>;
    static new(v: null): Regconfig<0>;
    static new(v: Expression): Regconfig<0 | 1>;
    static new(v: SerializeParam | null | Expression): Regconfig<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "regconfig" } 
    asAggregate(): Types.Regconfig<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Regconfig<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Regconfig<1> | undefined {
          return undefined;
        }
       
    jsonToTsvector(this: Types.Regconfig<1>, a1: Types.Json<1>, a2: Types.Jsonb<1>): Types.Tsvector<1>
    jsonToTsvector(this: Types.Regconfig<0 | 1>, a1: Types.Json<0 | 1>, a2: Types.Jsonb<0 | 1>): Types.Tsvector<0 | 1>
    jsonToTsvector(this: Types.Regconfig<number>, a1: Types.Json<number>, a2: Types.Jsonb<number>): Types.Tsvector<0 | 1>
    jsonToTsvector(...args: unknown[]) {
        return sqlFunction("json_to_tsvector", [{args: [Types.Regconfig<0 | 1>, Types.Json<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    jsonbToTsvector(this: Types.Regconfig<1>, a1: Types.Jsonb<1>, a2: Types.Jsonb<1>): Types.Tsvector<1>
    jsonbToTsvector(this: Types.Regconfig<0 | 1>, a1: Types.Jsonb<0 | 1>, a2: Types.Jsonb<0 | 1>): Types.Tsvector<0 | 1>
    jsonbToTsvector(this: Types.Regconfig<number>, a1: Types.Jsonb<number>, a2: Types.Jsonb<number>): Types.Tsvector<0 | 1>
    jsonbToTsvector(...args: unknown[]) {
        return sqlFunction("jsonb_to_tsvector", [{args: [Types.Regconfig<0 | 1>, Types.Jsonb<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    phrasetoTsquery(this: Types.Regconfig<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<1>
    phrasetoTsquery(this: Types.Regconfig<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<0 | 1>
    phrasetoTsquery(this: Types.Regconfig<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<0 | 1>
    phrasetoTsquery(...args: unknown[]) {
        return sqlFunction("phraseto_tsquery", [{args: [Types.Regconfig<0 | 1>, Types.Text<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plaintoTsquery(this: Types.Regconfig<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<1>
    plaintoTsquery(this: Types.Regconfig<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<0 | 1>
    plaintoTsquery(this: Types.Regconfig<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<0 | 1>
    plaintoTsquery(...args: unknown[]) {
        return sqlFunction("plainto_tsquery", [{args: [Types.Regconfig<0 | 1>, Types.Text<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toTsquery(this: Types.Regconfig<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<1>
    toTsquery(this: Types.Regconfig<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<0 | 1>
    toTsquery(this: Types.Regconfig<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<0 | 1>
    toTsquery(...args: unknown[]) {
        return sqlFunction("to_tsquery", [{args: [Types.Regconfig<0 | 1>, Types.Text<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    toTsvector(this: Types.Regconfig<1>, a1: Types.Json<1>): Types.Tsvector<1>
    toTsvector(this: Types.Regconfig<0 | 1>, a1: Types.Json<0 | 1>): Types.Tsvector<0 | 1>
    toTsvector(this: Types.Regconfig<number>, a1: Types.Json<number>): Types.Tsvector<0 | 1>
    toTsvector(this: Types.Regconfig<1>, a1: Types.Jsonb<1>): Types.Tsvector<1>
    toTsvector(this: Types.Regconfig<0 | 1>, a1: Types.Jsonb<0 | 1>): Types.Tsvector<0 | 1>
    toTsvector(this: Types.Regconfig<number>, a1: Types.Jsonb<number>): Types.Tsvector<0 | 1>
    toTsvector(this: Types.Regconfig<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Tsvector<1>
    toTsvector(this: Types.Regconfig<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tsvector<0 | 1>
    toTsvector(this: Types.Regconfig<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Tsvector<0 | 1>
    toTsvector(...args: unknown[]) {
        return sqlFunction("to_tsvector", [{args: [Types.Regconfig<0 | 1>, Types.Json<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regconfig<0 | 1>, Types.Jsonb<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regconfig<0 | 1>, Types.Text<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsDebug(this: Types.Regconfig<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{alias: Types.Text<1>, description: Types.Text<1>, token: Types.Text<1>, dictionaries: Types.Array<1, Types.Regdictionary<0 | 1>>, dictionary: Types.Regdictionary<1>, lexemes: Types.Array<1, Types.Text<0 | 1>>}>
    tsDebug(this: Types.Regconfig<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{alias: Types.Text<0 | 1>, description: Types.Text<0 | 1>, token: Types.Text<0 | 1>, dictionaries: Types.Array<0 | 1, Types.Regdictionary<0 | 1>>, dictionary: Types.Regdictionary<0 | 1>, lexemes: Types.Array<0 | 1, Types.Text<0 | 1>>}>
    tsDebug(this: Types.Regconfig<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.FromItem<{alias: Types.Text<0 | 1>, description: Types.Text<0 | 1>, token: Types.Text<0 | 1>, dictionaries: Types.Array<0 | 1, Types.Regdictionary<0 | 1>>, dictionary: Types.Regdictionary<0 | 1>, lexemes: Types.Array<0 | 1, Types.Text<0 | 1>>}>
    tsDebug(...args: unknown[]) {
        return sqlFunction("ts_debug", [{args: [Types.Regconfig<0 | 1>, Types.Text<0 | 1>], ret: Types.FromItem.ofSchema({alias: Types.Text<0 | 1>, description: Types.Text<0 | 1>, token: Types.Text<0 | 1>, dictionaries: Types.Array.of(Types.Regdictionary<0 | 1>), dictionary: Types.Regdictionary<0 | 1>, lexemes: Types.Array.of(Types.Text<0 | 1>)}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsHeadline(this: Types.Regconfig<1>, a1: Types.Json<1>, a2: Types.Tsquery<1>): Types.Json<1>
    tsHeadline(this: Types.Regconfig<0 | 1>, a1: Types.Json<0 | 1>, a2: Types.Tsquery<0 | 1>): Types.Json<0 | 1>
    tsHeadline(this: Types.Regconfig<number>, a1: Types.Json<number>, a2: Types.Tsquery<number>): Types.Json<0 | 1>
    tsHeadline(this: Types.Regconfig<1>, a1: Types.Json<1>, a2: Types.Tsquery<1>, a3: Types.Text<1>): Types.Json<1>
    tsHeadline(this: Types.Regconfig<0 | 1>, a1: Types.Json<0 | 1>, a2: Types.Tsquery<0 | 1>, a3: Types.Text<0 | 1>): Types.Json<0 | 1>
    tsHeadline(this: Types.Regconfig<number>, a1: Types.Json<number>, a2: Types.Tsquery<number>, a3: Types.Text<number>): Types.Json<0 | 1>
    tsHeadline(this: Types.Regconfig<1>, a1: Types.Jsonb<1>, a2: Types.Tsquery<1>): Types.Jsonb<1>
    tsHeadline(this: Types.Regconfig<0 | 1>, a1: Types.Jsonb<0 | 1>, a2: Types.Tsquery<0 | 1>): Types.Jsonb<0 | 1>
    tsHeadline(this: Types.Regconfig<number>, a1: Types.Jsonb<number>, a2: Types.Tsquery<number>): Types.Jsonb<0 | 1>
    tsHeadline(this: Types.Regconfig<1>, a1: Types.Jsonb<1>, a2: Types.Tsquery<1>, a3: Types.Text<1>): Types.Jsonb<1>
    tsHeadline(this: Types.Regconfig<0 | 1>, a1: Types.Jsonb<0 | 1>, a2: Types.Tsquery<0 | 1>, a3: Types.Text<0 | 1>): Types.Jsonb<0 | 1>
    tsHeadline(this: Types.Regconfig<number>, a1: Types.Jsonb<number>, a2: Types.Tsquery<number>, a3: Types.Text<number>): Types.Jsonb<0 | 1>
    tsHeadline(this: Types.Regconfig<1>, a1: Types.Text<1>, a2: Types.Tsquery<1>): Types.Text<1>
    tsHeadline(this: Types.Regconfig<0 | 1>, a1: Types.Text<0 | 1>, a2: Types.Tsquery<0 | 1>): Types.Text<0 | 1>
    tsHeadline(this: Types.Regconfig<number>, a1: Types.Text<number>, a2: Types.Tsquery<number>): Types.Text<0 | 1>
    tsHeadline(this: Types.Regconfig<1>, a1: Types.Text<1>, a2: Types.Tsquery<1>, a3: Types.Text<1>): Types.Text<1>
    tsHeadline(this: Types.Regconfig<0 | 1>, a1: Types.Text<0 | 1>, a2: Types.Tsquery<0 | 1>, a3: Types.Text<0 | 1>): Types.Text<0 | 1>
    tsHeadline(this: Types.Regconfig<number>, a1: Types.Text<number>, a2: Types.Tsquery<number>, a3: Types.Text<number>): Types.Text<0 | 1>
    tsHeadline(...args: unknown[]) {
        return sqlFunction("ts_headline", [{args: [Types.Regconfig<0 | 1>, Types.Json<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regconfig<0 | 1>, Types.Json<0 | 1>, Types.Tsquery<0 | 1>, Types.Text<0 | 1>], ret: Types.Json<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regconfig<0 | 1>, Types.Jsonb<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regconfig<0 | 1>, Types.Jsonb<0 | 1>, Types.Tsquery<0 | 1>, Types.Text<0 | 1>], ret: Types.Jsonb<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regconfig<0 | 1>, Types.Text<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regconfig<0 | 1>, Types.Text<0 | 1>, Types.Tsquery<0 | 1>, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    websearchToTsquery(this: Types.Regconfig<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<1>
    websearchToTsquery(this: Types.Regconfig<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<0 | 1>
    websearchToTsquery(this: Types.Regconfig<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<0 | 1>
    websearchToTsquery(...args: unknown[]) {
        return sqlFunction("websearch_to_tsquery", [{args: [Types.Regconfig<0 | 1>, Types.Text<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
