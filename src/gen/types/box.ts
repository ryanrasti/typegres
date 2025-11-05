import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Box<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Box<1>;
    static new(v: null): Box<0>;
    static new(v: Expression): Box<0 | 1>;
    static new(v: SerializeParam | null | Expression): Box<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "box" } 
    asAggregate(): Types.Box<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Box<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Box<1> | undefined {
          return undefined;
        }
       
    area(this: Types.Box<1>): Types.Float8<1>
    area(this: Types.Box<0 | 1>): Types.Float8<0 | 1>
    area(this: Types.Box<number>): Types.Float8<0 | 1>
    area(...args: unknown[]) {
        return sqlFunction("area", [{args: [Types.Box<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boundBox(this: Types.Box<1>, a1: Types.Box<1>): Types.Box<1>
    boundBox(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Box<0 | 1>
    boundBox(this: Types.Box<number>, a1: Types.Box<number>): Types.Box<0 | 1>
    boundBox(...args: unknown[]) {
        return sqlFunction("bound_box", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxAbove(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    boxAbove(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    boxAbove(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    boxAbove(...args: unknown[]) {
        return sqlFunction("box_above", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxAboveEq(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    boxAboveEq(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    boxAboveEq(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    boxAboveEq(...args: unknown[]) {
        return sqlFunction("box_above_eq", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxAdd(this: Types.Box<1>, a1: Types.Point<1>): Types.Box<1>
    boxAdd(this: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Box<0 | 1>
    boxAdd(this: Types.Box<number>, a1: Types.Point<number>): Types.Box<0 | 1>
    boxAdd(...args: unknown[]) {
        return sqlFunction("box_add", [{args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxBelow(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    boxBelow(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    boxBelow(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    boxBelow(...args: unknown[]) {
        return sqlFunction("box_below", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxBelowEq(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    boxBelowEq(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    boxBelowEq(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    boxBelowEq(...args: unknown[]) {
        return sqlFunction("box_below_eq", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxCenter(this: Types.Box<1>): Types.Point<1>
    boxCenter(this: Types.Box<0 | 1>): Types.Point<0 | 1>
    boxCenter(this: Types.Box<number>): Types.Point<0 | 1>
    boxCenter(...args: unknown[]) {
        return sqlFunction("box_center", [{args: [Types.Box<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxContainPt(this: Types.Box<1>, a1: Types.Point<1>): Types.Bool<1>
    boxContainPt(this: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    boxContainPt(this: Types.Box<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    boxContainPt(...args: unknown[]) {
        return sqlFunction("box_contain_pt", [{args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxContained(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    boxContained(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    boxContained(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    boxContained(...args: unknown[]) {
        return sqlFunction("box_contained", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxDistance(this: Types.Box<1>, a1: Types.Box<1>): Types.Float8<1>
    boxDistance(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Float8<0 | 1>
    boxDistance(this: Types.Box<number>, a1: Types.Box<number>): Types.Float8<0 | 1>
    boxDistance(...args: unknown[]) {
        return sqlFunction("box_distance", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxDiv(this: Types.Box<1>, a1: Types.Point<1>): Types.Box<1>
    boxDiv(this: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Box<0 | 1>
    boxDiv(this: Types.Box<number>, a1: Types.Point<number>): Types.Box<0 | 1>
    boxDiv(...args: unknown[]) {
        return sqlFunction("box_div", [{args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxEq(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    boxEq(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    boxEq(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    boxEq(...args: unknown[]) {
        return sqlFunction("box_eq", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxGe(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    boxGe(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    boxGe(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    boxGe(...args: unknown[]) {
        return sqlFunction("box_ge", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxGt(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    boxGt(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    boxGt(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    boxGt(...args: unknown[]) {
        return sqlFunction("box_gt", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxIntersect(this: Types.Box<1>, a1: Types.Box<1>): Types.Box<1>
    boxIntersect(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Box<0 | 1>
    boxIntersect(this: Types.Box<number>, a1: Types.Box<number>): Types.Box<0 | 1>
    boxIntersect(...args: unknown[]) {
        return sqlFunction("box_intersect", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxLe(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    boxLe(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    boxLe(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    boxLe(...args: unknown[]) {
        return sqlFunction("box_le", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxLeft(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    boxLeft(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    boxLeft(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    boxLeft(...args: unknown[]) {
        return sqlFunction("box_left", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxLt(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    boxLt(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    boxLt(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    boxLt(...args: unknown[]) {
        return sqlFunction("box_lt", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxMul(this: Types.Box<1>, a1: Types.Point<1>): Types.Box<1>
    boxMul(this: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Box<0 | 1>
    boxMul(this: Types.Box<number>, a1: Types.Point<number>): Types.Box<0 | 1>
    boxMul(...args: unknown[]) {
        return sqlFunction("box_mul", [{args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxOverabove(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    boxOverabove(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    boxOverabove(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    boxOverabove(...args: unknown[]) {
        return sqlFunction("box_overabove", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxOverbelow(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    boxOverbelow(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    boxOverbelow(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    boxOverbelow(...args: unknown[]) {
        return sqlFunction("box_overbelow", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxOverlap(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    boxOverlap(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    boxOverlap(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    boxOverlap(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    boxOverlap(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    boxOverlap(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    boxOverlap(...args: unknown[]) {
        return sqlFunction("box_overlap", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxOverleft(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    boxOverleft(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    boxOverleft(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    boxOverleft(...args: unknown[]) {
        return sqlFunction("box_overleft", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxOverright(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    boxOverright(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    boxOverright(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    boxOverright(...args: unknown[]) {
        return sqlFunction("box_overright", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxRight(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    boxRight(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    boxRight(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    boxRight(...args: unknown[]) {
        return sqlFunction("box_right", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxSame(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    boxSame(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    boxSame(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    boxSame(...args: unknown[]) {
        return sqlFunction("box_same", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boxSub(this: Types.Box<1>, a1: Types.Point<1>): Types.Box<1>
    boxSub(this: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Box<0 | 1>
    boxSub(this: Types.Box<number>, a1: Types.Point<number>): Types.Box<0 | 1>
    boxSub(...args: unknown[]) {
        return sqlFunction("box_sub", [{args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    center(this: Types.Box<1>): Types.Point<1>
    center(this: Types.Box<0 | 1>): Types.Point<0 | 1>
    center(this: Types.Box<number>): Types.Point<0 | 1>
    center(...args: unknown[]) {
        return sqlFunction("center", [{args: [Types.Box<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circle(this: Types.Box<1>): Types.Circle<1>
    circle(this: Types.Box<0 | 1>): Types.Circle<0 | 1>
    circle(this: Types.Box<number>): Types.Circle<0 | 1>
    circle(...args: unknown[]) {
        return sqlFunction("circle", [{args: [Types.Box<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    diagonal(this: Types.Box<1>): Types.Lseg<1>
    diagonal(this: Types.Box<0 | 1>): Types.Lseg<0 | 1>
    diagonal(this: Types.Box<number>): Types.Lseg<0 | 1>
    diagonal(...args: unknown[]) {
        return sqlFunction("diagonal", [{args: [Types.Box<0 | 1>], ret: Types.Lseg<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    distBp(this: Types.Box<1>, a1: Types.Point<1>): Types.Float8<1>
    distBp(this: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
    distBp(this: Types.Box<number>, a1: Types.Point<number>): Types.Float8<0 | 1>
    distBp(...args: unknown[]) {
        return sqlFunction("dist_bp", [{args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    distBs(this: Types.Box<1>, a1: Types.Lseg<1>): Types.Float8<1>
    distBs(this: Types.Box<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Float8<0 | 1>
    distBs(this: Types.Box<number>, a1: Types.Lseg<number>): Types.Float8<0 | 1>
    distBs(...args: unknown[]) {
        return sqlFunction("dist_bs", [{args: [Types.Box<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    height(this: Types.Box<1>): Types.Float8<1>
    height(this: Types.Box<0 | 1>): Types.Float8<0 | 1>
    height(this: Types.Box<number>): Types.Float8<0 | 1>
    height(...args: unknown[]) {
        return sqlFunction("height", [{args: [Types.Box<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lseg(this: Types.Box<1>): Types.Lseg<1>
    lseg(this: Types.Box<0 | 1>): Types.Lseg<0 | 1>
    lseg(this: Types.Box<number>): Types.Lseg<0 | 1>
    lseg(...args: unknown[]) {
        return sqlFunction("lseg", [{args: [Types.Box<0 | 1>], ret: Types.Lseg<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    point(this: Types.Box<1>): Types.Point<1>
    point(this: Types.Box<0 | 1>): Types.Point<0 | 1>
    point(this: Types.Box<number>): Types.Point<0 | 1>
    point(...args: unknown[]) {
        return sqlFunction("point", [{args: [Types.Box<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    polygon(this: Types.Box<1>): Types.Polygon<1>
    polygon(this: Types.Box<0 | 1>): Types.Polygon<0 | 1>
    polygon(this: Types.Box<number>): Types.Polygon<0 | 1>
    polygon(...args: unknown[]) {
        return sqlFunction("polygon", [{args: [Types.Box<0 | 1>], ret: Types.Polygon<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    width(this: Types.Box<1>): Types.Float8<1>
    width(this: Types.Box<0 | 1>): Types.Float8<0 | 1>
    width(this: Types.Box<number>): Types.Float8<0 | 1>
    width(...args: unknown[]) {
        return sqlFunction("width", [{args: [Types.Box<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["|>>"](this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    ["|>>"](this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    ["|>>"](this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    ["|>>"](...args: unknown[]) {
        return sqlFunction("|>>", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">^"](this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    [">^"](this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    [">^"](this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    [">^"](...args: unknown[]) {
        return sqlFunction(">^", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["+"](this: Types.Box<1>, a1: Types.Point<1>): Types.Box<1>
    ["+"](this: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Box<0 | 1>
    ["+"](this: Types.Box<number>, a1: Types.Point<number>): Types.Box<0 | 1>
    ["+"](...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Box<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plus(this: Types.Box<1>, a1: Types.Point<1>): Types.Box<1>
    plus(this: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Box<0 | 1>
    plus(this: Types.Box<number>, a1: Types.Point<number>): Types.Box<0 | 1>
    plus(...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Box<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<<|"](this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    ["<<|"](this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    ["<<|"](this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    ["<<|"](...args: unknown[]) {
        return sqlFunction("<<|", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<^"](this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    ["<^"](this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    ["<^"](this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    ["<^"](...args: unknown[]) {
        return sqlFunction("<^", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["@>"](this: Types.Box<1>, a1: Types.Point<1>): Types.Bool<1>
    ["@>"](this: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    ["@>"](this: Types.Box<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    ["@>"](...args: unknown[]) {
        return sqlFunction("@>", [{args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<->"](this: Types.Box<1>, a1: Types.Box<1>): Types.Float8<1>
    ["<->"](this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Box<number>, a1: Types.Box<number>): Types.Float8<0 | 1>
    ["<->"](this: Types.Box<1>, a1: Types.Point<1>): Types.Float8<1>
    ["<->"](this: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Box<number>, a1: Types.Point<number>): Types.Float8<0 | 1>
    ["<->"](this: Types.Box<1>, a1: Types.Lseg<1>): Types.Float8<1>
    ["<->"](this: Types.Box<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Box<number>, a1: Types.Lseg<number>): Types.Float8<0 | 1>
    ["<->"](...args: unknown[]) {
        return sqlFunction("<->", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Box<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["/"](this: Types.Box<1>, a1: Types.Point<1>): Types.Box<1>
    ["/"](this: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Box<0 | 1>
    ["/"](this: Types.Box<number>, a1: Types.Point<number>): Types.Box<0 | 1>
    ["/"](...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Box<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    divide(this: Types.Box<1>, a1: Types.Point<1>): Types.Box<1>
    divide(this: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Box<0 | 1>
    divide(this: Types.Box<number>, a1: Types.Point<number>): Types.Box<0 | 1>
    divide(...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Box<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    ["="](this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    eq(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    [">="](this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    gte(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    [">"](this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    gt(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["#"](this: Types.Box<1>, a1: Types.Box<1>): Types.Box<1>
    ["#"](this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Box<0 | 1>
    ["#"](this: Types.Box<number>, a1: Types.Box<number>): Types.Box<0 | 1>
    ["#"](...args: unknown[]) {
        return sqlFunction("#", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Box<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    ["<="](this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    lte(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<<"](this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    ["<<"](this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    ["<<"](this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    ["<<"](...args: unknown[]) {
        return sqlFunction("<<", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    ["<"](this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    lt(this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["*"](this: Types.Box<1>, a1: Types.Point<1>): Types.Box<1>
    ["*"](this: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Box<0 | 1>
    ["*"](this: Types.Box<number>, a1: Types.Point<number>): Types.Box<0 | 1>
    ["*"](...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Box<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multiply(this: Types.Box<1>, a1: Types.Point<1>): Types.Box<1>
    multiply(this: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Box<0 | 1>
    multiply(this: Types.Box<number>, a1: Types.Point<number>): Types.Box<0 | 1>
    multiply(...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Box<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["|&>"](this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    ["|&>"](this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    ["|&>"](this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    ["|&>"](...args: unknown[]) {
        return sqlFunction("|&>", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&<|"](this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    ["&<|"](this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    ["&<|"](this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    ["&<|"](...args: unknown[]) {
        return sqlFunction("&<|", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&&"](this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    ["&&"](this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    ["&&"](this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    ["&&"](...args: unknown[]) {
        return sqlFunction("&&", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["?#"](this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    ["?#"](this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    ["?#"](this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    ["?#"](...args: unknown[]) {
        return sqlFunction("?#", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&<"](this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    ["&<"](this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    ["&<"](this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    ["&<"](...args: unknown[]) {
        return sqlFunction("&<", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["&>"](this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    ["&>"](this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    ["&>"](this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    ["&>"](...args: unknown[]) {
        return sqlFunction("&>", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">>"](this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    [">>"](this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    [">>"](this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    [">>"](...args: unknown[]) {
        return sqlFunction(">>", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~="](this: Types.Box<1>, a1: Types.Box<1>): Types.Bool<1>
    ["~="](this: Types.Box<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    ["~="](this: Types.Box<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    ["~="](...args: unknown[]) {
        return sqlFunction("~=", [{args: [Types.Box<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"](this: Types.Box<1>, a1: Types.Point<1>): Types.Box<1>
    ["-"](this: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Box<0 | 1>
    ["-"](this: Types.Box<number>, a1: Types.Point<number>): Types.Box<0 | 1>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Box<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus(this: Types.Box<1>, a1: Types.Point<1>): Types.Box<1>
    minus(this: Types.Box<0 | 1>, a1: Types.Point<0 | 1>): Types.Box<0 | 1>
    minus(this: Types.Box<number>, a1: Types.Point<number>): Types.Box<0 | 1>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Box<0 | 1>, Types.Point<0 | 1>], ret: Types.Box<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
