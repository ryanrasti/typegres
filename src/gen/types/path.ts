import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Path<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Path<1>;
    static new(v: null): Path<0>;
    static new(v: Expression): Path<0 | 1>;
    static new(v: SerializeParam | null | Expression): Path<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "path" } 
    asAggregate(): Types.Path<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Path<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Path<1> | undefined {
          return undefined;
        }
       
    area(this: Types.Path<1>): Types.Float8<1>
    area(this: Types.Path<0 | 1>): Types.Float8<0 | 1>
    area(this: Types.Path<number>): Types.Float8<0 | 1>
    area(...args: unknown[]) {
        return sqlFunction("area", [{args: [Types.Path<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    distPathp(this: Types.Path<1>, a1: Types.Point<1>): Types.Float8<1>
    distPathp(this: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
    distPathp(this: Types.Path<number>, a1: Types.Point<number>): Types.Float8<0 | 1>
    distPathp(...args: unknown[]) {
        return sqlFunction("dist_pathp", [{args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    isclosed(this: Types.Path<1>): Types.Bool<1>
    isclosed(this: Types.Path<0 | 1>): Types.Bool<0 | 1>
    isclosed(this: Types.Path<number>): Types.Bool<0 | 1>
    isclosed(...args: unknown[]) {
        return sqlFunction("isclosed", [{args: [Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    isopen(this: Types.Path<1>): Types.Bool<1>
    isopen(this: Types.Path<0 | 1>): Types.Bool<0 | 1>
    isopen(this: Types.Path<number>): Types.Bool<0 | 1>
    isopen(...args: unknown[]) {
        return sqlFunction("isopen", [{args: [Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    length(this: Types.Path<1>): Types.Float8<1>
    length(this: Types.Path<0 | 1>): Types.Float8<0 | 1>
    length(this: Types.Path<number>): Types.Float8<0 | 1>
    length(...args: unknown[]) {
        return sqlFunction("length", [{args: [Types.Path<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    npoints(this: Types.Path<1>): Types.Int4<1>
    npoints(this: Types.Path<0 | 1>): Types.Int4<0 | 1>
    npoints(this: Types.Path<number>): Types.Int4<0 | 1>
    npoints(...args: unknown[]) {
        return sqlFunction("npoints", [{args: [Types.Path<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pathAdd(this: Types.Path<1>, a1: Types.Path<1>): Types.Path<1>
    pathAdd(this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Path<0 | 1>
    pathAdd(this: Types.Path<number>, a1: Types.Path<number>): Types.Path<0 | 1>
    pathAdd(...args: unknown[]) {
        return sqlFunction("path_add", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Path<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pathAddPt(this: Types.Path<1>, a1: Types.Point<1>): Types.Path<1>
    pathAddPt(this: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Path<0 | 1>
    pathAddPt(this: Types.Path<number>, a1: Types.Point<number>): Types.Path<0 | 1>
    pathAddPt(...args: unknown[]) {
        return sqlFunction("path_add_pt", [{args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Path<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pathContainPt(this: Types.Path<1>, a1: Types.Point<1>): Types.Bool<1>
    pathContainPt(this: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    pathContainPt(this: Types.Path<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    pathContainPt(...args: unknown[]) {
        return sqlFunction("path_contain_pt", [{args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pathDistance(this: Types.Path<1>, a1: Types.Path<1>): Types.Float8<1>
    pathDistance(this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Float8<0 | 1>
    pathDistance(this: Types.Path<number>, a1: Types.Path<number>): Types.Float8<0 | 1>
    pathDistance(...args: unknown[]) {
        return sqlFunction("path_distance", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pathDivPt(this: Types.Path<1>, a1: Types.Point<1>): Types.Path<1>
    pathDivPt(this: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Path<0 | 1>
    pathDivPt(this: Types.Path<number>, a1: Types.Point<number>): Types.Path<0 | 1>
    pathDivPt(...args: unknown[]) {
        return sqlFunction("path_div_pt", [{args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Path<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pathInter(this: Types.Path<1>, a1: Types.Path<1>): Types.Bool<1>
    pathInter(this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
    pathInter(this: Types.Path<number>, a1: Types.Path<number>): Types.Bool<0 | 1>
    pathInter(...args: unknown[]) {
        return sqlFunction("path_inter", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pathLength(this: Types.Path<1>): Types.Float8<1>
    pathLength(this: Types.Path<0 | 1>): Types.Float8<0 | 1>
    pathLength(this: Types.Path<number>): Types.Float8<0 | 1>
    pathLength(...args: unknown[]) {
        return sqlFunction("path_length", [{args: [Types.Path<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pathMulPt(this: Types.Path<1>, a1: Types.Point<1>): Types.Path<1>
    pathMulPt(this: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Path<0 | 1>
    pathMulPt(this: Types.Path<number>, a1: Types.Point<number>): Types.Path<0 | 1>
    pathMulPt(...args: unknown[]) {
        return sqlFunction("path_mul_pt", [{args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Path<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pathNEq(this: Types.Path<1>, a1: Types.Path<1>): Types.Bool<1>
    pathNEq(this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
    pathNEq(this: Types.Path<number>, a1: Types.Path<number>): Types.Bool<0 | 1>
    pathNEq(...args: unknown[]) {
        return sqlFunction("path_n_eq", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pathNGe(this: Types.Path<1>, a1: Types.Path<1>): Types.Bool<1>
    pathNGe(this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
    pathNGe(this: Types.Path<number>, a1: Types.Path<number>): Types.Bool<0 | 1>
    pathNGe(...args: unknown[]) {
        return sqlFunction("path_n_ge", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pathNGt(this: Types.Path<1>, a1: Types.Path<1>): Types.Bool<1>
    pathNGt(this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
    pathNGt(this: Types.Path<number>, a1: Types.Path<number>): Types.Bool<0 | 1>
    pathNGt(...args: unknown[]) {
        return sqlFunction("path_n_gt", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pathNLe(this: Types.Path<1>, a1: Types.Path<1>): Types.Bool<1>
    pathNLe(this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
    pathNLe(this: Types.Path<number>, a1: Types.Path<number>): Types.Bool<0 | 1>
    pathNLe(...args: unknown[]) {
        return sqlFunction("path_n_le", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pathNLt(this: Types.Path<1>, a1: Types.Path<1>): Types.Bool<1>
    pathNLt(this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
    pathNLt(this: Types.Path<number>, a1: Types.Path<number>): Types.Bool<0 | 1>
    pathNLt(...args: unknown[]) {
        return sqlFunction("path_n_lt", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pathNpoints(this: Types.Path<1>): Types.Int4<1>
    pathNpoints(this: Types.Path<0 | 1>): Types.Int4<0 | 1>
    pathNpoints(this: Types.Path<number>): Types.Int4<0 | 1>
    pathNpoints(...args: unknown[]) {
        return sqlFunction("path_npoints", [{args: [Types.Path<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pathSubPt(this: Types.Path<1>, a1: Types.Point<1>): Types.Path<1>
    pathSubPt(this: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Path<0 | 1>
    pathSubPt(this: Types.Path<number>, a1: Types.Point<number>): Types.Path<0 | 1>
    pathSubPt(...args: unknown[]) {
        return sqlFunction("path_sub_pt", [{args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Path<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pclose(this: Types.Path<1>): Types.Path<1>
    pclose(this: Types.Path<0 | 1>): Types.Path<0 | 1>
    pclose(this: Types.Path<number>): Types.Path<0 | 1>
    pclose(...args: unknown[]) {
        return sqlFunction("pclose", [{args: [Types.Path<0 | 1>], ret: Types.Path<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    polygon(this: Types.Path<1>): Types.Polygon<1>
    polygon(this: Types.Path<0 | 1>): Types.Polygon<0 | 1>
    polygon(this: Types.Path<number>): Types.Polygon<0 | 1>
    polygon(...args: unknown[]) {
        return sqlFunction("polygon", [{args: [Types.Path<0 | 1>], ret: Types.Polygon<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    popen(this: Types.Path<1>): Types.Path<1>
    popen(this: Types.Path<0 | 1>): Types.Path<0 | 1>
    popen(this: Types.Path<number>): Types.Path<0 | 1>
    popen(...args: unknown[]) {
        return sqlFunction("popen", [{args: [Types.Path<0 | 1>], ret: Types.Path<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<->"](this: Types.Path<1>, a1: Types.Point<1>): Types.Float8<1>
    ["<->"](this: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Path<number>, a1: Types.Point<number>): Types.Float8<0 | 1>
    ["<->"](this: Types.Path<1>, a1: Types.Path<1>): Types.Float8<1>
    ["<->"](this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Path<number>, a1: Types.Path<number>): Types.Float8<0 | 1>
    ["<->"](...args: unknown[]) {
        return sqlFunction("<->", [{args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["+"](this: Types.Path<1>, a1: Types.Path<1>): Types.Path<1>
    ["+"](this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Path<0 | 1>
    ["+"](this: Types.Path<number>, a1: Types.Path<number>): Types.Path<0 | 1>
    ["+"](this: Types.Path<1>, a1: Types.Point<1>): Types.Path<1>
    ["+"](this: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Path<0 | 1>
    ["+"](this: Types.Path<number>, a1: Types.Point<number>): Types.Path<0 | 1>
    ["+"](...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Path<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Path<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plus(this: Types.Path<1>, a1: Types.Path<1>): Types.Path<1>
    plus(this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Path<0 | 1>
    plus(this: Types.Path<number>, a1: Types.Path<number>): Types.Path<0 | 1>
    plus(this: Types.Path<1>, a1: Types.Point<1>): Types.Path<1>
    plus(this: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Path<0 | 1>
    plus(this: Types.Path<number>, a1: Types.Point<number>): Types.Path<0 | 1>
    plus(...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Path<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Path<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["@>"](this: Types.Path<1>, a1: Types.Point<1>): Types.Bool<1>
    ["@>"](this: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    ["@>"](this: Types.Path<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    ["@>"](...args: unknown[]) {
        return sqlFunction("@>", [{args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["/"](this: Types.Path<1>, a1: Types.Point<1>): Types.Path<1>
    ["/"](this: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Path<0 | 1>
    ["/"](this: Types.Path<number>, a1: Types.Point<number>): Types.Path<0 | 1>
    ["/"](...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Path<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    divide(this: Types.Path<1>, a1: Types.Point<1>): Types.Path<1>
    divide(this: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Path<0 | 1>
    divide(this: Types.Path<number>, a1: Types.Point<number>): Types.Path<0 | 1>
    divide(...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Path<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["?#"](this: Types.Path<1>, a1: Types.Path<1>): Types.Bool<1>
    ["?#"](this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
    ["?#"](this: Types.Path<number>, a1: Types.Path<number>): Types.Bool<0 | 1>
    ["?#"](...args: unknown[]) {
        return sqlFunction("?#", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["*"](this: Types.Path<1>, a1: Types.Point<1>): Types.Path<1>
    ["*"](this: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Path<0 | 1>
    ["*"](this: Types.Path<number>, a1: Types.Point<number>): Types.Path<0 | 1>
    ["*"](...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Path<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multiply(this: Types.Path<1>, a1: Types.Point<1>): Types.Path<1>
    multiply(this: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Path<0 | 1>
    multiply(this: Types.Path<number>, a1: Types.Point<number>): Types.Path<0 | 1>
    multiply(...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Path<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Path<1>, a1: Types.Path<1>): Types.Bool<1>
    ["="](this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Path<number>, a1: Types.Path<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Path<1>, a1: Types.Path<1>): Types.Bool<1>
    eq(this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Path<number>, a1: Types.Path<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Path<1>, a1: Types.Path<1>): Types.Bool<1>
    [">="](this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Path<number>, a1: Types.Path<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Path<1>, a1: Types.Path<1>): Types.Bool<1>
    gte(this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Path<number>, a1: Types.Path<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Path<1>, a1: Types.Path<1>): Types.Bool<1>
    [">"](this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Path<number>, a1: Types.Path<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Path<1>, a1: Types.Path<1>): Types.Bool<1>
    gt(this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Path<number>, a1: Types.Path<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Path<1>, a1: Types.Path<1>): Types.Bool<1>
    ["<="](this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Path<number>, a1: Types.Path<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Path<1>, a1: Types.Path<1>): Types.Bool<1>
    lte(this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Path<number>, a1: Types.Path<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Path<1>, a1: Types.Path<1>): Types.Bool<1>
    ["<"](this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Path<number>, a1: Types.Path<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Path<1>, a1: Types.Path<1>): Types.Bool<1>
    lt(this: Types.Path<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Path<number>, a1: Types.Path<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Path<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"](this: Types.Path<1>, a1: Types.Point<1>): Types.Path<1>
    ["-"](this: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Path<0 | 1>
    ["-"](this: Types.Path<number>, a1: Types.Point<number>): Types.Path<0 | 1>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Path<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus(this: Types.Path<1>, a1: Types.Point<1>): Types.Path<1>
    minus(this: Types.Path<0 | 1>, a1: Types.Point<0 | 1>): Types.Path<0 | 1>
    minus(this: Types.Path<number>, a1: Types.Point<number>): Types.Path<0 | 1>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Path<0 | 1>, Types.Point<0 | 1>], ret: Types.Path<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
