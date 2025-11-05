import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Polygon<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Polygon<1>;
    static new(v: null): Polygon<0>;
    static new(v: Expression): Polygon<0 | 1>;
    static new(v: SerializeParam | null | Expression): Polygon<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "polygon" } 
    asAggregate(): Types.Polygon<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Polygon<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Polygon<1> | undefined {
          return undefined;
        }
       
    box(this: Types.Polygon<1>): Types.Box<1>
    box(this: Types.Polygon<0 | 1>): Types.Box<0 | 1>
    box(this: Types.Polygon<number>): Types.Box<0 | 1>
    box(...args: unknown[]) {
        return sqlFunction("box", [{args: [Types.Polygon<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circle(this: Types.Polygon<1>): Types.Circle<1>
    circle(this: Types.Polygon<0 | 1>): Types.Circle<0 | 1>
    circle(this: Types.Polygon<number>): Types.Circle<0 | 1>
    circle(...args: unknown[]) {
        return sqlFunction("circle", [{args: [Types.Polygon<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    distPolyc(this: Types.Polygon<1>, a1: Types.Circle<1>): Types.Float8<1>
    distPolyc(this: Types.Polygon<0 | 1>, a1: Types.Circle<0 | 1>): Types.Float8<0 | 1>
    distPolyc(this: Types.Polygon<number>, a1: Types.Circle<number>): Types.Float8<0 | 1>
    distPolyc(...args: unknown[]) {
        return sqlFunction("dist_polyc", [{args: [Types.Polygon<0 | 1>, Types.Circle<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    distPolyp(this: Types.Polygon<1>, a1: Types.Point<1>): Types.Float8<1>
    distPolyp(this: Types.Polygon<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
    distPolyp(this: Types.Polygon<number>, a1: Types.Point<number>): Types.Float8<0 | 1>
    distPolyp(...args: unknown[]) {
        return sqlFunction("dist_polyp", [{args: [Types.Polygon<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    npoints(this: Types.Polygon<1>): Types.Int4<1>
    npoints(this: Types.Polygon<0 | 1>): Types.Int4<0 | 1>
    npoints(this: Types.Polygon<number>): Types.Int4<0 | 1>
    npoints(...args: unknown[]) {
        return sqlFunction("npoints", [{args: [Types.Polygon<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    path(this: Types.Polygon<1>): Types.Path<1>
    path(this: Types.Polygon<0 | 1>): Types.Path<0 | 1>
    path(this: Types.Polygon<number>): Types.Path<0 | 1>
    path(...args: unknown[]) {
        return sqlFunction("path", [{args: [Types.Polygon<0 | 1>], ret: Types.Path<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    point(this: Types.Polygon<1>): Types.Point<1>
    point(this: Types.Polygon<0 | 1>): Types.Point<0 | 1>
    point(this: Types.Polygon<number>): Types.Point<0 | 1>
    point(...args: unknown[]) {
        return sqlFunction("point", [{args: [Types.Polygon<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    polyAbove(this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Bool<1>
    polyAbove(this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    polyAbove(this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    polyAbove(...args: unknown[]) {
        return sqlFunction("poly_above", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    polyBelow(this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Bool<1>
    polyBelow(this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    polyBelow(this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    polyBelow(...args: unknown[]) {
        return sqlFunction("poly_below", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    polyCenter(this: Types.Polygon<1>): Types.Point<1>
    polyCenter(this: Types.Polygon<0 | 1>): Types.Point<0 | 1>
    polyCenter(this: Types.Polygon<number>): Types.Point<0 | 1>
    polyCenter(...args: unknown[]) {
        return sqlFunction("poly_center", [{args: [Types.Polygon<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    polyContainPt(this: Types.Polygon<1>, a1: Types.Point<1>): Types.Bool<1>
    polyContainPt(this: Types.Polygon<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    polyContainPt(this: Types.Polygon<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    polyContainPt(...args: unknown[]) {
        return sqlFunction("poly_contain_pt", [{args: [Types.Polygon<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    polyContained(this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Bool<1>
    polyContained(this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    polyContained(this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    polyContained(...args: unknown[]) {
        return sqlFunction("poly_contained", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    polyDistance(this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Float8<1>
    polyDistance(this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Float8<0 | 1>
    polyDistance(this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Float8<0 | 1>
    polyDistance(...args: unknown[]) {
        return sqlFunction("poly_distance", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    polyLeft(this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Bool<1>
    polyLeft(this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    polyLeft(this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    polyLeft(...args: unknown[]) {
        return sqlFunction("poly_left", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    polyNpoints(this: Types.Polygon<1>): Types.Int4<1>
    polyNpoints(this: Types.Polygon<0 | 1>): Types.Int4<0 | 1>
    polyNpoints(this: Types.Polygon<number>): Types.Int4<0 | 1>
    polyNpoints(...args: unknown[]) {
        return sqlFunction("poly_npoints", [{args: [Types.Polygon<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    polyOverabove(this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Bool<1>
    polyOverabove(this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    polyOverabove(this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    polyOverabove(...args: unknown[]) {
        return sqlFunction("poly_overabove", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    polyOverbelow(this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Bool<1>
    polyOverbelow(this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    polyOverbelow(this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    polyOverbelow(...args: unknown[]) {
        return sqlFunction("poly_overbelow", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    polyOverlap(this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Bool<1>
    polyOverlap(this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    polyOverlap(this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    polyOverlap(...args: unknown[]) {
        return sqlFunction("poly_overlap", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    polyOverleft(this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Bool<1>
    polyOverleft(this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    polyOverleft(this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    polyOverleft(...args: unknown[]) {
        return sqlFunction("poly_overleft", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    polyOverright(this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Bool<1>
    polyOverright(this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    polyOverright(this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    polyOverright(...args: unknown[]) {
        return sqlFunction("poly_overright", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    polyRight(this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Bool<1>
    polyRight(this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    polyRight(this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    polyRight(...args: unknown[]) {
        return sqlFunction("poly_right", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    polySame(this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Bool<1>
    polySame(this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    polySame(this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    polySame(...args: unknown[]) {
        return sqlFunction("poly_same", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    spgPolyQuadCompress(this: Types.Polygon<1>): Types.Box<1>
    spgPolyQuadCompress(this: Types.Polygon<0 | 1>): Types.Box<0 | 1>
    spgPolyQuadCompress(this: Types.Polygon<number>): Types.Box<0 | 1>
    spgPolyQuadCompress(...args: unknown[]) {
        return sqlFunction("spg_poly_quad_compress", [{args: [Types.Polygon<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<->"](this: Types.Polygon<1>, a1: Types.Circle<1>): Types.Float8<1>
    ["<->"](this: Types.Polygon<0 | 1>, a1: Types.Circle<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Polygon<number>, a1: Types.Circle<number>): Types.Float8<0 | 1>
    ["<->"](this: Types.Polygon<1>, a1: Types.Point<1>): Types.Float8<1>
    ["<->"](this: Types.Polygon<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Polygon<number>, a1: Types.Point<number>): Types.Float8<0 | 1>
    ["<->"](this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Float8<1>
    ["<->"](this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Float8<0 | 1>
    ["<->"](...args: unknown[]) {
        return sqlFunction("<->", [{args: [Types.Polygon<0 | 1>, Types.Circle<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Polygon<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["|>>"](this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Bool<1>
    ["|>>"](this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    ["|>>"](this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    ["|>>"](...args: unknown[]) {
        return sqlFunction("|>>", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<<|"](this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Bool<1>
    ["<<|"](this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    ["<<|"](this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    ["<<|"](...args: unknown[]) {
        return sqlFunction("<<|", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["@>"](this: Types.Polygon<1>, a1: Types.Point<1>): Types.Bool<1>
    ["@>"](this: Types.Polygon<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    ["@>"](this: Types.Polygon<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    ["@>"](...args: unknown[]) {
        return sqlFunction("@>", [{args: [Types.Polygon<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<<"](this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Bool<1>
    ["<<"](this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    ["<<"](this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    ["<<"](...args: unknown[]) {
        return sqlFunction("<<", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["|&>"](this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Bool<1>
    ["|&>"](this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    ["|&>"](this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    ["|&>"](...args: unknown[]) {
        return sqlFunction("|&>", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&<|"](this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Bool<1>
    ["&<|"](this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    ["&<|"](this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    ["&<|"](...args: unknown[]) {
        return sqlFunction("&<|", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&&"](this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Bool<1>
    ["&&"](this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    ["&&"](this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    ["&&"](...args: unknown[]) {
        return sqlFunction("&&", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&<"](this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Bool<1>
    ["&<"](this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    ["&<"](this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    ["&<"](...args: unknown[]) {
        return sqlFunction("&<", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&>"](this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Bool<1>
    ["&>"](this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    ["&>"](this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    ["&>"](...args: unknown[]) {
        return sqlFunction("&>", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">>"](this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Bool<1>
    [">>"](this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    [">>"](this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    [">>"](...args: unknown[]) {
        return sqlFunction(">>", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~="](this: Types.Polygon<1>, a1: Types.Polygon<1>): Types.Bool<1>
    ["~="](this: Types.Polygon<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    ["~="](this: Types.Polygon<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    ["~="](...args: unknown[]) {
        return sqlFunction("~=", [{args: [Types.Polygon<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
