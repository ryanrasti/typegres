import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Circle<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Circle<1>;
    static new(v: null): Circle<0>;
    static new(v: Expression): Circle<0 | 1>;
    static new(v: SerializeParam | null | Expression): Circle<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "circle" } 
    asAggregate(): Types.Circle<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Circle<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Circle<1> | undefined {
          return undefined;
        }
       
    area(this: Types.Circle<1>): Types.Float8<1>
    area(this: Types.Circle<0 | 1>): Types.Float8<0 | 1>
    area(this: Types.Circle<number>): Types.Float8<0 | 1>
    area(...args: unknown[]) {
        return sqlFunction("area", [{args: [Types.Circle<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    box(this: Types.Circle<1>): Types.Box<1>
    box(this: Types.Circle<0 | 1>): Types.Box<0 | 1>
    box(this: Types.Circle<number>): Types.Box<0 | 1>
    box(...args: unknown[]) {
        return sqlFunction("box", [{args: [Types.Circle<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    center(this: Types.Circle<1>): Types.Point<1>
    center(this: Types.Circle<0 | 1>): Types.Point<0 | 1>
    center(this: Types.Circle<number>): Types.Point<0 | 1>
    center(...args: unknown[]) {
        return sqlFunction("center", [{args: [Types.Circle<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleAbove(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    circleAbove(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    circleAbove(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    circleAbove(...args: unknown[]) {
        return sqlFunction("circle_above", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleAddPt(this: Types.Circle<1>, a1: Types.Point<1>): Types.Circle<1>
    circleAddPt(this: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Circle<0 | 1>
    circleAddPt(this: Types.Circle<number>, a1: Types.Point<number>): Types.Circle<0 | 1>
    circleAddPt(...args: unknown[]) {
        return sqlFunction("circle_add_pt", [{args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleBelow(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    circleBelow(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    circleBelow(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    circleBelow(...args: unknown[]) {
        return sqlFunction("circle_below", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleCenter(this: Types.Circle<1>): Types.Point<1>
    circleCenter(this: Types.Circle<0 | 1>): Types.Point<0 | 1>
    circleCenter(this: Types.Circle<number>): Types.Point<0 | 1>
    circleCenter(...args: unknown[]) {
        return sqlFunction("circle_center", [{args: [Types.Circle<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleContainPt(this: Types.Circle<1>, a1: Types.Point<1>): Types.Bool<1>
    circleContainPt(this: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    circleContainPt(this: Types.Circle<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    circleContainPt(...args: unknown[]) {
        return sqlFunction("circle_contain_pt", [{args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleContained(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    circleContained(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    circleContained(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    circleContained(...args: unknown[]) {
        return sqlFunction("circle_contained", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleDistance(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Float8<1>
    circleDistance(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Float8<0 | 1>
    circleDistance(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Float8<0 | 1>
    circleDistance(...args: unknown[]) {
        return sqlFunction("circle_distance", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleDivPt(this: Types.Circle<1>, a1: Types.Point<1>): Types.Circle<1>
    circleDivPt(this: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Circle<0 | 1>
    circleDivPt(this: Types.Circle<number>, a1: Types.Point<number>): Types.Circle<0 | 1>
    circleDivPt(...args: unknown[]) {
        return sqlFunction("circle_div_pt", [{args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleEq(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    circleEq(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    circleEq(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    circleEq(...args: unknown[]) {
        return sqlFunction("circle_eq", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleGe(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    circleGe(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    circleGe(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    circleGe(...args: unknown[]) {
        return sqlFunction("circle_ge", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleGt(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    circleGt(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    circleGt(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    circleGt(...args: unknown[]) {
        return sqlFunction("circle_gt", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleLe(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    circleLe(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    circleLe(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    circleLe(...args: unknown[]) {
        return sqlFunction("circle_le", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleLeft(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    circleLeft(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    circleLeft(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    circleLeft(...args: unknown[]) {
        return sqlFunction("circle_left", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleLt(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    circleLt(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    circleLt(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    circleLt(...args: unknown[]) {
        return sqlFunction("circle_lt", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleMulPt(this: Types.Circle<1>, a1: Types.Point<1>): Types.Circle<1>
    circleMulPt(this: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Circle<0 | 1>
    circleMulPt(this: Types.Circle<number>, a1: Types.Point<number>): Types.Circle<0 | 1>
    circleMulPt(...args: unknown[]) {
        return sqlFunction("circle_mul_pt", [{args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleNe(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    circleNe(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    circleNe(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    circleNe(...args: unknown[]) {
        return sqlFunction("circle_ne", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleOverabove(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    circleOverabove(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    circleOverabove(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    circleOverabove(...args: unknown[]) {
        return sqlFunction("circle_overabove", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleOverbelow(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    circleOverbelow(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    circleOverbelow(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    circleOverbelow(...args: unknown[]) {
        return sqlFunction("circle_overbelow", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleOverlap(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    circleOverlap(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    circleOverlap(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    circleOverlap(...args: unknown[]) {
        return sqlFunction("circle_overlap", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleOverleft(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    circleOverleft(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    circleOverleft(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    circleOverleft(...args: unknown[]) {
        return sqlFunction("circle_overleft", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleOverright(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    circleOverright(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    circleOverright(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    circleOverright(...args: unknown[]) {
        return sqlFunction("circle_overright", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleRight(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    circleRight(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    circleRight(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    circleRight(...args: unknown[]) {
        return sqlFunction("circle_right", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleSame(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    circleSame(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    circleSame(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    circleSame(...args: unknown[]) {
        return sqlFunction("circle_same", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circleSubPt(this: Types.Circle<1>, a1: Types.Point<1>): Types.Circle<1>
    circleSubPt(this: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Circle<0 | 1>
    circleSubPt(this: Types.Circle<number>, a1: Types.Point<number>): Types.Circle<0 | 1>
    circleSubPt(...args: unknown[]) {
        return sqlFunction("circle_sub_pt", [{args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    diameter(this: Types.Circle<1>): Types.Float8<1>
    diameter(this: Types.Circle<0 | 1>): Types.Float8<0 | 1>
    diameter(this: Types.Circle<number>): Types.Float8<0 | 1>
    diameter(...args: unknown[]) {
        return sqlFunction("diameter", [{args: [Types.Circle<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    distCpoint(this: Types.Circle<1>, a1: Types.Point<1>): Types.Float8<1>
    distCpoint(this: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
    distCpoint(this: Types.Circle<number>, a1: Types.Point<number>): Types.Float8<0 | 1>
    distCpoint(...args: unknown[]) {
        return sqlFunction("dist_cpoint", [{args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    distCpoly(this: Types.Circle<1>, a1: Types.Polygon<1>): Types.Float8<1>
    distCpoly(this: Types.Circle<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Float8<0 | 1>
    distCpoly(this: Types.Circle<number>, a1: Types.Polygon<number>): Types.Float8<0 | 1>
    distCpoly(...args: unknown[]) {
        return sqlFunction("dist_cpoly", [{args: [Types.Circle<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    point(this: Types.Circle<1>): Types.Point<1>
    point(this: Types.Circle<0 | 1>): Types.Point<0 | 1>
    point(this: Types.Circle<number>): Types.Point<0 | 1>
    point(...args: unknown[]) {
        return sqlFunction("point", [{args: [Types.Circle<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    polygon(this: Types.Circle<1>): Types.Polygon<1>
    polygon(this: Types.Circle<0 | 1>): Types.Polygon<0 | 1>
    polygon(this: Types.Circle<number>): Types.Polygon<0 | 1>
    polygon(...args: unknown[]) {
        return sqlFunction("polygon", [{args: [Types.Circle<0 | 1>], ret: Types.Polygon<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    radius(this: Types.Circle<1>): Types.Float8<1>
    radius(this: Types.Circle<0 | 1>): Types.Float8<0 | 1>
    radius(this: Types.Circle<number>): Types.Float8<0 | 1>
    radius(...args: unknown[]) {
        return sqlFunction("radius", [{args: [Types.Circle<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["|>>"](this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    ["|>>"](this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    ["|>>"](this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    ["|>>"](...args: unknown[]) {
        return sqlFunction("|>>", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["+"](this: Types.Circle<1>, a1: Types.Point<1>): Types.Circle<1>
    ["+"](this: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Circle<0 | 1>
    ["+"](this: Types.Circle<number>, a1: Types.Point<number>): Types.Circle<0 | 1>
    ["+"](...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plus(this: Types.Circle<1>, a1: Types.Point<1>): Types.Circle<1>
    plus(this: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Circle<0 | 1>
    plus(this: Types.Circle<number>, a1: Types.Point<number>): Types.Circle<0 | 1>
    plus(...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<<|"](this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    ["<<|"](this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    ["<<|"](this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    ["<<|"](...args: unknown[]) {
        return sqlFunction("<<|", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["@>"](this: Types.Circle<1>, a1: Types.Point<1>): Types.Bool<1>
    ["@>"](this: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    ["@>"](this: Types.Circle<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    ["@>"](...args: unknown[]) {
        return sqlFunction("@>", [{args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<->"](this: Types.Circle<1>, a1: Types.Circle<1>): Types.Float8<1>
    ["<->"](this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Circle<number>, a1: Types.Circle<number>): Types.Float8<0 | 1>
    ["<->"](this: Types.Circle<1>, a1: Types.Point<1>): Types.Float8<1>
    ["<->"](this: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Circle<number>, a1: Types.Point<number>): Types.Float8<0 | 1>
    ["<->"](this: Types.Circle<1>, a1: Types.Polygon<1>): Types.Float8<1>
    ["<->"](this: Types.Circle<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Circle<number>, a1: Types.Polygon<number>): Types.Float8<0 | 1>
    ["<->"](...args: unknown[]) {
        return sqlFunction("<->", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Circle<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["/"](this: Types.Circle<1>, a1: Types.Point<1>): Types.Circle<1>
    ["/"](this: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Circle<0 | 1>
    ["/"](this: Types.Circle<number>, a1: Types.Point<number>): Types.Circle<0 | 1>
    ["/"](...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    divide(this: Types.Circle<1>, a1: Types.Point<1>): Types.Circle<1>
    divide(this: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Circle<0 | 1>
    divide(this: Types.Circle<number>, a1: Types.Point<number>): Types.Circle<0 | 1>
    divide(...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    ["="](this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    eq(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    [">="](this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    gte(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    [">"](this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    gt(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    ["<="](this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    lte(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<<"](this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    ["<<"](this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    ["<<"](this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    ["<<"](...args: unknown[]) {
        return sqlFunction("<<", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    ["<"](this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    lt(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["*"](this: Types.Circle<1>, a1: Types.Point<1>): Types.Circle<1>
    ["*"](this: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Circle<0 | 1>
    ["*"](this: Types.Circle<number>, a1: Types.Point<number>): Types.Circle<0 | 1>
    ["*"](...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multiply(this: Types.Circle<1>, a1: Types.Point<1>): Types.Circle<1>
    multiply(this: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Circle<0 | 1>
    multiply(this: Types.Circle<number>, a1: Types.Point<number>): Types.Circle<0 | 1>
    multiply(...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    ["<>"](this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    ne(this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["|&>"](this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    ["|&>"](this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    ["|&>"](this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    ["|&>"](...args: unknown[]) {
        return sqlFunction("|&>", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&<|"](this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    ["&<|"](this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    ["&<|"](this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    ["&<|"](...args: unknown[]) {
        return sqlFunction("&<|", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&&"](this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    ["&&"](this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    ["&&"](this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    ["&&"](...args: unknown[]) {
        return sqlFunction("&&", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&<"](this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    ["&<"](this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    ["&<"](this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    ["&<"](...args: unknown[]) {
        return sqlFunction("&<", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&>"](this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    ["&>"](this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    ["&>"](this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    ["&>"](...args: unknown[]) {
        return sqlFunction("&>", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">>"](this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    [">>"](this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    [">>"](this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    [">>"](...args: unknown[]) {
        return sqlFunction(">>", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~="](this: Types.Circle<1>, a1: Types.Circle<1>): Types.Bool<1>
    ["~="](this: Types.Circle<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    ["~="](this: Types.Circle<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    ["~="](...args: unknown[]) {
        return sqlFunction("~=", [{args: [Types.Circle<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"](this: Types.Circle<1>, a1: Types.Point<1>): Types.Circle<1>
    ["-"](this: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Circle<0 | 1>
    ["-"](this: Types.Circle<number>, a1: Types.Point<number>): Types.Circle<0 | 1>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus(this: Types.Circle<1>, a1: Types.Point<1>): Types.Circle<1>
    minus(this: Types.Circle<0 | 1>, a1: Types.Point<0 | 1>): Types.Circle<0 | 1>
    minus(this: Types.Circle<number>, a1: Types.Point<number>): Types.Circle<0 | 1>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Circle<0 | 1>, Types.Point<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
