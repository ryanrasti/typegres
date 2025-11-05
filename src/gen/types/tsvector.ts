import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Tsvector<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Tsvector<1>;
    static new(v: null): Tsvector<0>;
    static new(v: Expression): Tsvector<0 | 1>;
    static new(v: SerializeParam | null | Expression): Tsvector<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "tsvector" } 
    asAggregate(): Types.Tsvector<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Tsvector<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Tsvector<1> | undefined {
          return undefined;
        }
       
    length(this: Types.Tsvector<1>): Types.Int4<1>
    length(this: Types.Tsvector<0 | 1>): Types.Int4<0 | 1>
    length(this: Types.Tsvector<number>): Types.Int4<0 | 1>
    length(...args: unknown[]) {
        return sqlFunction("length", [{args: [Types.Tsvector<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    setweight(this: Types.Tsvector<1>, a1: Types.Char<1>): Types.Tsvector<1>
    setweight(this: Types.Tsvector<0 | 1>, a1: Types.Char<0 | 1>): Types.Tsvector<0 | 1>
    setweight(this: Types.Tsvector<number>, a1: Types.Char<number>): Types.Tsvector<0 | 1>
    setweight(this: Types.Tsvector<1>, a1: Types.Char<1>, a2: Types.Array<1, Types.Text<0 | 1>>): Types.Tsvector<1>
    setweight(this: Types.Tsvector<0 | 1>, a1: Types.Char<0 | 1>, a2: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Tsvector<0 | 1>
    setweight(this: Types.Tsvector<number>, a1: Types.Char<number>, a2: Types.Array<number, Types.Text<0 | 1>>): Types.Tsvector<0 | 1>
    setweight(...args: unknown[]) {
        return sqlFunction("setweight", [{args: [Types.Tsvector<0 | 1>, Types.Char<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Tsvector<0 | 1>, Types.Char<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    strip(this: Types.Tsvector<1>): Types.Tsvector<1>
    strip(this: Types.Tsvector<0 | 1>): Types.Tsvector<0 | 1>
    strip(this: Types.Tsvector<number>): Types.Tsvector<0 | 1>
    strip(...args: unknown[]) {
        return sqlFunction("strip", [{args: [Types.Tsvector<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    tsDelete(this: Types.Tsvector<1>, a1: Types.Array<1, Types.Text<0 | 1>>): Types.Tsvector<1>
    tsDelete(this: Types.Tsvector<0 | 1>, a1: Types.Array<0 | 1, Types.Text<0 | 1>>): Types.Tsvector<0 | 1>
    tsDelete(this: Types.Tsvector<number>, a1: Types.Array<number, Types.Text<0 | 1>>): Types.Tsvector<0 | 1>
    tsDelete(this: Types.Tsvector<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Tsvector<1>
    tsDelete(this: Types.Tsvector<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tsvector<0 | 1>
    tsDelete(this: Types.Tsvector<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Tsvector<0 | 1>
    tsDelete(...args: unknown[]) {
        return sqlFunction("ts_delete", [{args: [Types.Tsvector<0 | 1>, Types.Array.of(Types.Text<0 | 1>)], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Tsvector<0 | 1>, Types.Text<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsFilter(this: Types.Tsvector<1>, a1: Types.Array<1, Types.Char<0 | 1>>): Types.Tsvector<1>
    tsFilter(this: Types.Tsvector<0 | 1>, a1: Types.Array<0 | 1, Types.Char<0 | 1>>): Types.Tsvector<0 | 1>
    tsFilter(this: Types.Tsvector<number>, a1: Types.Array<number, Types.Char<0 | 1>>): Types.Tsvector<0 | 1>
    tsFilter(...args: unknown[]) {
        return sqlFunction("ts_filter", [{args: [Types.Tsvector<0 | 1>, Types.Array.of(Types.Char<0 | 1>)], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsMatchVq(this: Types.Tsvector<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    tsMatchVq(this: Types.Tsvector<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    tsMatchVq(this: Types.Tsvector<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    tsMatchVq(this: Types.Tsvector<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    tsMatchVq(this: Types.Tsvector<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    tsMatchVq(this: Types.Tsvector<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    tsMatchVq(...args: unknown[]) {
        return sqlFunction("ts_match_vq", [{args: [Types.Tsvector<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Tsvector<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsRank(this: Types.Tsvector<1>, a1: Types.Tsquery<1>): Types.Float4<1>
    tsRank(this: Types.Tsvector<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Float4<0 | 1>
    tsRank(this: Types.Tsvector<number>, a1: Types.Tsquery<number>): Types.Float4<0 | 1>
    tsRank(this: Types.Tsvector<1>, a1: Types.Tsquery<1>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Float4<1>
    tsRank(this: Types.Tsvector<0 | 1>, a1: Types.Tsquery<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Float4<0 | 1>
    tsRank(this: Types.Tsvector<number>, a1: Types.Tsquery<number>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Float4<0 | 1>
    tsRank(...args: unknown[]) {
        return sqlFunction("ts_rank", [{args: [Types.Tsvector<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Tsvector<0 | 1>, Types.Tsquery<0 | 1>, Types.Int4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsRankCd(this: Types.Tsvector<1>, a1: Types.Tsquery<1>): Types.Float4<1>
    tsRankCd(this: Types.Tsvector<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Float4<0 | 1>
    tsRankCd(this: Types.Tsvector<number>, a1: Types.Tsquery<number>): Types.Float4<0 | 1>
    tsRankCd(this: Types.Tsvector<1>, a1: Types.Tsquery<1>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Float4<1>
    tsRankCd(this: Types.Tsvector<0 | 1>, a1: Types.Tsquery<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Float4<0 | 1>
    tsRankCd(this: Types.Tsvector<number>, a1: Types.Tsquery<number>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Float4<0 | 1>
    tsRankCd(...args: unknown[]) {
        return sqlFunction("ts_rank_cd", [{args: [Types.Tsvector<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Tsvector<0 | 1>, Types.Tsquery<0 | 1>, Types.Int4<0 | 1>], ret: Types.Float4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsvectorCmp(this: Types.Tsvector<1>, a1: Types.Tsvector<1>): Types.Int4<1>
    tsvectorCmp(this: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Int4<0 | 1>
    tsvectorCmp(this: Types.Tsvector<number>, a1: Types.Tsvector<number>): Types.Int4<0 | 1>
    tsvectorCmp(...args: unknown[]) {
        return sqlFunction("tsvector_cmp", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsvectorConcat(this: Types.Tsvector<1>, a1: Types.Tsvector<1>): Types.Tsvector<1>
    tsvectorConcat(this: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Tsvector<0 | 1>
    tsvectorConcat(this: Types.Tsvector<number>, a1: Types.Tsvector<number>): Types.Tsvector<0 | 1>
    tsvectorConcat(...args: unknown[]) {
        return sqlFunction("tsvector_concat", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Tsvector<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsvectorEq(this: Types.Tsvector<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    tsvectorEq(this: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    tsvectorEq(this: Types.Tsvector<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    tsvectorEq(...args: unknown[]) {
        return sqlFunction("tsvector_eq", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsvectorGe(this: Types.Tsvector<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    tsvectorGe(this: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    tsvectorGe(this: Types.Tsvector<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    tsvectorGe(...args: unknown[]) {
        return sqlFunction("tsvector_ge", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsvectorGt(this: Types.Tsvector<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    tsvectorGt(this: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    tsvectorGt(this: Types.Tsvector<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    tsvectorGt(...args: unknown[]) {
        return sqlFunction("tsvector_gt", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsvectorLe(this: Types.Tsvector<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    tsvectorLe(this: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    tsvectorLe(this: Types.Tsvector<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    tsvectorLe(...args: unknown[]) {
        return sqlFunction("tsvector_le", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsvectorLt(this: Types.Tsvector<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    tsvectorLt(this: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    tsvectorLt(this: Types.Tsvector<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    tsvectorLt(...args: unknown[]) {
        return sqlFunction("tsvector_lt", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsvectorNe(this: Types.Tsvector<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    tsvectorNe(this: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    tsvectorNe(this: Types.Tsvector<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    tsvectorNe(...args: unknown[]) {
        return sqlFunction("tsvector_ne", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsvectorToArray(this: Types.Tsvector<1>): Types.Array<1, Types.Text<0 | 1>>
    tsvectorToArray(this: Types.Tsvector<0 | 1>): Types.Array<0 | 1, Types.Text<0 | 1>>
    tsvectorToArray(this: Types.Tsvector<number>): Types.Array<0 | 1, Types.Text<0 | 1>>
    tsvectorToArray(...args: unknown[]) {
        return sqlFunction("tsvector_to_array", [{args: [Types.Tsvector<0 | 1>], ret: Types.Array.of(Types.Text<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    unnest(this: Types.Tsvector<1>): Types.FromItem<{lexeme: Types.Text<1>, positions: Types.Array<1, Types.Int2<0 | 1>>, weights: Types.Array<1, Types.Text<0 | 1>>}>
    unnest(this: Types.Tsvector<0 | 1>): Types.FromItem<{lexeme: Types.Text<0 | 1>, positions: Types.Array<0 | 1, Types.Int2<0 | 1>>, weights: Types.Array<0 | 1, Types.Text<0 | 1>>}>
    unnest(this: Types.Tsvector<number>): Types.FromItem<{lexeme: Types.Text<0 | 1>, positions: Types.Array<0 | 1, Types.Int2<0 | 1>>, weights: Types.Array<0 | 1, Types.Text<0 | 1>>}>
    unnest(...args: unknown[]) {
        return sqlFunction("unnest", [{args: [Types.Tsvector<0 | 1>], ret: Types.FromItem.ofSchema({lexeme: Types.Text<0 | 1>, positions: Types.Array.of(Types.Int2<0 | 1>), weights: Types.Array.of(Types.Text<0 | 1>)}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["@@"](this: Types.Tsvector<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    ["@@"](this: Types.Tsvector<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    ["@@"](this: Types.Tsvector<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    ["@@"](...args: unknown[]) {
        return sqlFunction("@@", [{args: [Types.Tsvector<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["@@@"](this: Types.Tsvector<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    ["@@@"](this: Types.Tsvector<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    ["@@@"](this: Types.Tsvector<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    ["@@@"](...args: unknown[]) {
        return sqlFunction("@@@", [{args: [Types.Tsvector<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Tsvector<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    ["="](this: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Tsvector<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Tsvector<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    eq(this: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Tsvector<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Tsvector<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    [">="](this: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Tsvector<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Tsvector<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    gte(this: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Tsvector<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Tsvector<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    [">"](this: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Tsvector<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Tsvector<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    gt(this: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Tsvector<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Tsvector<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    ["<="](this: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Tsvector<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Tsvector<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    lte(this: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Tsvector<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Tsvector<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    ["<"](this: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Tsvector<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Tsvector<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    lt(this: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Tsvector<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Tsvector<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    ["<>"](this: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Tsvector<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Tsvector<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    ne(this: Types.Tsvector<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Tsvector<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Tsvector<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
