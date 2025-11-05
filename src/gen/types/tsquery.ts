import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Tsquery<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Tsquery<1>;
    static new(v: null): Tsquery<0>;
    static new(v: Expression): Tsquery<0 | 1>;
    static new(v: SerializeParam | null | Expression): Tsquery<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "tsquery" } 
    asAggregate(): Types.Tsquery<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Tsquery<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Tsquery<1> | undefined {
          return undefined;
        }
       
    numnode(this: Types.Tsquery<1>): Types.Int4<1>
    numnode(this: Types.Tsquery<0 | 1>): Types.Int4<0 | 1>
    numnode(this: Types.Tsquery<number>): Types.Int4<0 | 1>
    numnode(...args: unknown[]) {
        return sqlFunction("numnode", [{args: [Types.Tsquery<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    querytree(this: Types.Tsquery<1>): Types.Text<1>
    querytree(this: Types.Tsquery<0 | 1>): Types.Text<0 | 1>
    querytree(this: Types.Tsquery<number>): Types.Text<0 | 1>
    querytree(...args: unknown[]) {
        return sqlFunction("querytree", [{args: [Types.Tsquery<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsMatchQv(this: Types.Tsquery<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    tsMatchQv(this: Types.Tsquery<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    tsMatchQv(this: Types.Tsquery<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    tsMatchQv(this: Types.Tsquery<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    tsMatchQv(this: Types.Tsquery<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    tsMatchQv(this: Types.Tsquery<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    tsMatchQv(...args: unknown[]) {
        return sqlFunction("ts_match_qv", [{args: [Types.Tsquery<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Tsquery<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsRewrite(this: Types.Tsquery<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<1>
    tsRewrite(this: Types.Tsquery<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<0 | 1>
    tsRewrite(this: Types.Tsquery<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Tsquery<0 | 1>
    tsRewrite(this: Types.Tsquery<1>, a1: Types.Tsquery<1>, a2: Types.Tsquery<1>): Types.Tsquery<1>
    tsRewrite(this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>, a2: Types.Tsquery<0 | 1>): Types.Tsquery<0 | 1>
    tsRewrite(this: Types.Tsquery<number>, a1: Types.Tsquery<number>, a2: Types.Tsquery<number>): Types.Tsquery<0 | 1>
    tsRewrite(...args: unknown[]) {
        return sqlFunction("ts_rewrite", [{args: [Types.Tsquery<0 | 1>, Types.Text<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsqMcontained(this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    tsqMcontained(this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    tsqMcontained(this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    tsqMcontained(...args: unknown[]) {
        return sqlFunction("tsq_mcontained", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsqMcontains(this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    tsqMcontains(this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    tsqMcontains(this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    tsqMcontains(...args: unknown[]) {
        return sqlFunction("tsq_mcontains", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsqueryAnd(this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Tsquery<1>
    tsqueryAnd(this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Tsquery<0 | 1>
    tsqueryAnd(this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Tsquery<0 | 1>
    tsqueryAnd(...args: unknown[]) {
        return sqlFunction("tsquery_and", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsqueryCmp(this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Int4<1>
    tsqueryCmp(this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Int4<0 | 1>
    tsqueryCmp(this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Int4<0 | 1>
    tsqueryCmp(...args: unknown[]) {
        return sqlFunction("tsquery_cmp", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsqueryEq(this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    tsqueryEq(this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    tsqueryEq(this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    tsqueryEq(...args: unknown[]) {
        return sqlFunction("tsquery_eq", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsqueryGe(this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    tsqueryGe(this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    tsqueryGe(this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    tsqueryGe(...args: unknown[]) {
        return sqlFunction("tsquery_ge", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsqueryGt(this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    tsqueryGt(this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    tsqueryGt(this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    tsqueryGt(...args: unknown[]) {
        return sqlFunction("tsquery_gt", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsqueryLe(this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    tsqueryLe(this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    tsqueryLe(this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    tsqueryLe(...args: unknown[]) {
        return sqlFunction("tsquery_le", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsqueryLt(this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    tsqueryLt(this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    tsqueryLt(this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    tsqueryLt(...args: unknown[]) {
        return sqlFunction("tsquery_lt", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsqueryNe(this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    tsqueryNe(this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    tsqueryNe(this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    tsqueryNe(...args: unknown[]) {
        return sqlFunction("tsquery_ne", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsqueryNot(this: Types.Tsquery<1>): Types.Tsquery<1>
    tsqueryNot(this: Types.Tsquery<0 | 1>): Types.Tsquery<0 | 1>
    tsqueryNot(this: Types.Tsquery<number>): Types.Tsquery<0 | 1>
    tsqueryNot(...args: unknown[]) {
        return sqlFunction("tsquery_not", [{args: [Types.Tsquery<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsqueryOr(this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Tsquery<1>
    tsqueryOr(this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Tsquery<0 | 1>
    tsqueryOr(this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Tsquery<0 | 1>
    tsqueryOr(...args: unknown[]) {
        return sqlFunction("tsquery_or", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tsqueryPhrase(this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Tsquery<1>
    tsqueryPhrase(this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Tsquery<0 | 1>
    tsqueryPhrase(this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Tsquery<0 | 1>
    tsqueryPhrase(this: Types.Tsquery<1>, a1: Types.Tsquery<1>, a2: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Tsquery<1>
    tsqueryPhrase(this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>, a2: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Tsquery<0 | 1>
    tsqueryPhrase(this: Types.Tsquery<number>, a1: Types.Tsquery<number>, a2: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Tsquery<0 | 1>
    tsqueryPhrase(...args: unknown[]) {
        return sqlFunction("tsquery_phrase", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>, Types.Int4<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["@@@"](this: Types.Tsquery<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    ["@@@"](this: Types.Tsquery<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    ["@@@"](this: Types.Tsquery<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    ["@@@"](...args: unknown[]) {
        return sqlFunction("@@@", [{args: [Types.Tsquery<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["@@"](this: Types.Tsquery<1>, a1: Types.Tsvector<1>): Types.Bool<1>
    ["@@"](this: Types.Tsquery<0 | 1>, a1: Types.Tsvector<0 | 1>): Types.Bool<0 | 1>
    ["@@"](this: Types.Tsquery<number>, a1: Types.Tsvector<number>): Types.Bool<0 | 1>
    ["@@"](...args: unknown[]) {
        return sqlFunction("@@", [{args: [Types.Tsquery<0 | 1>, Types.Tsvector<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["@>"](this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    ["@>"](this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    ["@>"](this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    ["@>"](...args: unknown[]) {
        return sqlFunction("@>", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&&"](this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Tsquery<1>
    ["&&"](this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Tsquery<0 | 1>
    ["&&"](this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Tsquery<0 | 1>
    ["&&"](...args: unknown[]) {
        return sqlFunction("&&", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    ["="](this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    eq(this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    [">="](this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    gte(this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    [">"](this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    gt(this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    ["<="](this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    lte(this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    ["<"](this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    lt(this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    ["<>"](this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Bool<1>
    ne(this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<->"](this: Types.Tsquery<1>, a1: Types.Tsquery<1>): Types.Tsquery<1>
    ["<->"](this: Types.Tsquery<0 | 1>, a1: Types.Tsquery<0 | 1>): Types.Tsquery<0 | 1>
    ["<->"](this: Types.Tsquery<number>, a1: Types.Tsquery<number>): Types.Tsquery<0 | 1>
    ["<->"](...args: unknown[]) {
        return sqlFunction("<->", [{args: [Types.Tsquery<0 | 1>, Types.Tsquery<0 | 1>], ret: Types.Tsquery<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
