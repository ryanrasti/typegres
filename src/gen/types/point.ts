import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Point<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Point<1>;
    static new(v: null): Point<0>;
    static new(v: Expression): Point<0 | 1>;
    static new(v: SerializeParam | null | Expression): Point<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "point" } 
    asAggregate(): Types.Point<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Point<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Point<1> | undefined {
          return undefined;
        }
       
    box(this: Types.Point<1>): Types.Box<1>
    box(this: Types.Point<0 | 1>): Types.Box<0 | 1>
    box(this: Types.Point<number>): Types.Box<0 | 1>
    box(this: Types.Point<1>, a1: Types.Point<1>): Types.Box<1>
    box(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Box<0 | 1>
    box(this: Types.Point<number>, a1: Types.Point<number>): Types.Box<0 | 1>
    box(...args: unknown[]) {
        return sqlFunction("box", [{args: [Types.Point<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Box<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    circle(this: Types.Point<1>, a1: Types.Float8<1> | Types.Input<Types.Float8<0 | 1>>): Types.Circle<1>
    circle(this: Types.Point<0 | 1>, a1: Types.Float8<0 | 1> | Types.Input<Types.Float8<0 | 1>>): Types.Circle<0 | 1>
    circle(this: Types.Point<number>, a1: Types.Float8<number> | Types.Input<Types.Float8<0 | 1>>): Types.Circle<0 | 1>
    circle(...args: unknown[]) {
        return sqlFunction("circle", [{args: [Types.Point<0 | 1>, Types.Float8<0 | 1>], ret: Types.Circle<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    closePb(this: Types.Point<1>, a1: Types.Box<1>): Types.Point<1>
    closePb(this: Types.Point<0 | 1>, a1: Types.Box<0 | 1>): Types.Point<0 | 1>
    closePb(this: Types.Point<number>, a1: Types.Box<number>): Types.Point<0 | 1>
    closePb(...args: unknown[]) {
        return sqlFunction("close_pb", [{args: [Types.Point<0 | 1>, Types.Box<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    closePl(this: Types.Point<1>, a1: Types.Line<1>): Types.Point<1>
    closePl(this: Types.Point<0 | 1>, a1: Types.Line<0 | 1>): Types.Point<0 | 1>
    closePl(this: Types.Point<number>, a1: Types.Line<number>): Types.Point<0 | 1>
    closePl(...args: unknown[]) {
        return sqlFunction("close_pl", [{args: [Types.Point<0 | 1>, Types.Line<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    closePs(this: Types.Point<1>, a1: Types.Lseg<1>): Types.Point<1>
    closePs(this: Types.Point<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Point<0 | 1>
    closePs(this: Types.Point<number>, a1: Types.Lseg<number>): Types.Point<0 | 1>
    closePs(...args: unknown[]) {
        return sqlFunction("close_ps", [{args: [Types.Point<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    distPb(this: Types.Point<1>, a1: Types.Box<1>): Types.Float8<1>
    distPb(this: Types.Point<0 | 1>, a1: Types.Box<0 | 1>): Types.Float8<0 | 1>
    distPb(this: Types.Point<number>, a1: Types.Box<number>): Types.Float8<0 | 1>
    distPb(...args: unknown[]) {
        return sqlFunction("dist_pb", [{args: [Types.Point<0 | 1>, Types.Box<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    distPc(this: Types.Point<1>, a1: Types.Circle<1>): Types.Float8<1>
    distPc(this: Types.Point<0 | 1>, a1: Types.Circle<0 | 1>): Types.Float8<0 | 1>
    distPc(this: Types.Point<number>, a1: Types.Circle<number>): Types.Float8<0 | 1>
    distPc(...args: unknown[]) {
        return sqlFunction("dist_pc", [{args: [Types.Point<0 | 1>, Types.Circle<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    distPl(this: Types.Point<1>, a1: Types.Line<1>): Types.Float8<1>
    distPl(this: Types.Point<0 | 1>, a1: Types.Line<0 | 1>): Types.Float8<0 | 1>
    distPl(this: Types.Point<number>, a1: Types.Line<number>): Types.Float8<0 | 1>
    distPl(...args: unknown[]) {
        return sqlFunction("dist_pl", [{args: [Types.Point<0 | 1>, Types.Line<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    distPpath(this: Types.Point<1>, a1: Types.Path<1>): Types.Float8<1>
    distPpath(this: Types.Point<0 | 1>, a1: Types.Path<0 | 1>): Types.Float8<0 | 1>
    distPpath(this: Types.Point<number>, a1: Types.Path<number>): Types.Float8<0 | 1>
    distPpath(...args: unknown[]) {
        return sqlFunction("dist_ppath", [{args: [Types.Point<0 | 1>, Types.Path<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    distPpoly(this: Types.Point<1>, a1: Types.Polygon<1>): Types.Float8<1>
    distPpoly(this: Types.Point<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Float8<0 | 1>
    distPpoly(this: Types.Point<number>, a1: Types.Polygon<number>): Types.Float8<0 | 1>
    distPpoly(...args: unknown[]) {
        return sqlFunction("dist_ppoly", [{args: [Types.Point<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    distPs(this: Types.Point<1>, a1: Types.Lseg<1>): Types.Float8<1>
    distPs(this: Types.Point<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Float8<0 | 1>
    distPs(this: Types.Point<number>, a1: Types.Lseg<number>): Types.Float8<0 | 1>
    distPs(...args: unknown[]) {
        return sqlFunction("dist_ps", [{args: [Types.Point<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ishorizontal(this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    ishorizontal(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    ishorizontal(this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    ishorizontal(...args: unknown[]) {
        return sqlFunction("ishorizontal", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    isvertical(this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    isvertical(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    isvertical(this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    isvertical(...args: unknown[]) {
        return sqlFunction("isvertical", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    line(this: Types.Point<1>, a1: Types.Point<1>): Types.Line<1>
    line(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Line<0 | 1>
    line(this: Types.Point<number>, a1: Types.Point<number>): Types.Line<0 | 1>
    line(...args: unknown[]) {
        return sqlFunction("line", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Line<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lseg(this: Types.Point<1>, a1: Types.Point<1>): Types.Lseg<1>
    lseg(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Lseg<0 | 1>
    lseg(this: Types.Point<number>, a1: Types.Point<number>): Types.Lseg<0 | 1>
    lseg(...args: unknown[]) {
        return sqlFunction("lseg", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Lseg<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    onPb(this: Types.Point<1>, a1: Types.Box<1>): Types.Bool<1>
    onPb(this: Types.Point<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    onPb(this: Types.Point<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    onPb(...args: unknown[]) {
        return sqlFunction("on_pb", [{args: [Types.Point<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    onPl(this: Types.Point<1>, a1: Types.Line<1>): Types.Bool<1>
    onPl(this: Types.Point<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
    onPl(this: Types.Point<number>, a1: Types.Line<number>): Types.Bool<0 | 1>
    onPl(...args: unknown[]) {
        return sqlFunction("on_pl", [{args: [Types.Point<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    onPpath(this: Types.Point<1>, a1: Types.Path<1>): Types.Bool<1>
    onPpath(this: Types.Point<0 | 1>, a1: Types.Path<0 | 1>): Types.Bool<0 | 1>
    onPpath(this: Types.Point<number>, a1: Types.Path<number>): Types.Bool<0 | 1>
    onPpath(...args: unknown[]) {
        return sqlFunction("on_ppath", [{args: [Types.Point<0 | 1>, Types.Path<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    onPs(this: Types.Point<1>, a1: Types.Lseg<1>): Types.Bool<1>
    onPs(this: Types.Point<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    onPs(this: Types.Point<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    onPs(...args: unknown[]) {
        return sqlFunction("on_ps", [{args: [Types.Point<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pointAbove(this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    pointAbove(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    pointAbove(this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    pointAbove(this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    pointAbove(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    pointAbove(this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    pointAbove(...args: unknown[]) {
        return sqlFunction("point_above", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pointAdd(this: Types.Point<1>, a1: Types.Point<1>): Types.Point<1>
    pointAdd(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Point<0 | 1>
    pointAdd(this: Types.Point<number>, a1: Types.Point<number>): Types.Point<0 | 1>
    pointAdd(...args: unknown[]) {
        return sqlFunction("point_add", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pointBelow(this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    pointBelow(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    pointBelow(this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    pointBelow(this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    pointBelow(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    pointBelow(this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    pointBelow(...args: unknown[]) {
        return sqlFunction("point_below", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pointDistance(this: Types.Point<1>, a1: Types.Point<1>): Types.Float8<1>
    pointDistance(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
    pointDistance(this: Types.Point<number>, a1: Types.Point<number>): Types.Float8<0 | 1>
    pointDistance(...args: unknown[]) {
        return sqlFunction("point_distance", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pointDiv(this: Types.Point<1>, a1: Types.Point<1>): Types.Point<1>
    pointDiv(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Point<0 | 1>
    pointDiv(this: Types.Point<number>, a1: Types.Point<number>): Types.Point<0 | 1>
    pointDiv(...args: unknown[]) {
        return sqlFunction("point_div", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pointEq(this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    pointEq(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    pointEq(this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    pointEq(...args: unknown[]) {
        return sqlFunction("point_eq", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pointHoriz(this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    pointHoriz(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    pointHoriz(this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    pointHoriz(...args: unknown[]) {
        return sqlFunction("point_horiz", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pointLeft(this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    pointLeft(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    pointLeft(this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    pointLeft(...args: unknown[]) {
        return sqlFunction("point_left", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pointMul(this: Types.Point<1>, a1: Types.Point<1>): Types.Point<1>
    pointMul(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Point<0 | 1>
    pointMul(this: Types.Point<number>, a1: Types.Point<number>): Types.Point<0 | 1>
    pointMul(...args: unknown[]) {
        return sqlFunction("point_mul", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pointNe(this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    pointNe(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    pointNe(this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    pointNe(...args: unknown[]) {
        return sqlFunction("point_ne", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pointRight(this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    pointRight(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    pointRight(this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    pointRight(...args: unknown[]) {
        return sqlFunction("point_right", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pointSub(this: Types.Point<1>, a1: Types.Point<1>): Types.Point<1>
    pointSub(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Point<0 | 1>
    pointSub(this: Types.Point<number>, a1: Types.Point<number>): Types.Point<0 | 1>
    pointSub(...args: unknown[]) {
        return sqlFunction("point_sub", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pointVert(this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    pointVert(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    pointVert(this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    pointVert(...args: unknown[]) {
        return sqlFunction("point_vert", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ptContainedCircle(this: Types.Point<1>, a1: Types.Circle<1>): Types.Bool<1>
    ptContainedCircle(this: Types.Point<0 | 1>, a1: Types.Circle<0 | 1>): Types.Bool<0 | 1>
    ptContainedCircle(this: Types.Point<number>, a1: Types.Circle<number>): Types.Bool<0 | 1>
    ptContainedCircle(...args: unknown[]) {
        return sqlFunction("pt_contained_circle", [{args: [Types.Point<0 | 1>, Types.Circle<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ptContainedPoly(this: Types.Point<1>, a1: Types.Polygon<1>): Types.Bool<1>
    ptContainedPoly(this: Types.Point<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Bool<0 | 1>
    ptContainedPoly(this: Types.Point<number>, a1: Types.Polygon<number>): Types.Bool<0 | 1>
    ptContainedPoly(...args: unknown[]) {
        return sqlFunction("pt_contained_poly", [{args: [Types.Point<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    slope(this: Types.Point<1>, a1: Types.Point<1>): Types.Float8<1>
    slope(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
    slope(this: Types.Point<number>, a1: Types.Point<number>): Types.Float8<0 | 1>
    slope(...args: unknown[]) {
        return sqlFunction("slope", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["##"](this: Types.Point<1>, a1: Types.Box<1>): Types.Point<1>
    ["##"](this: Types.Point<0 | 1>, a1: Types.Box<0 | 1>): Types.Point<0 | 1>
    ["##"](this: Types.Point<number>, a1: Types.Box<number>): Types.Point<0 | 1>
    ["##"](this: Types.Point<1>, a1: Types.Line<1>): Types.Point<1>
    ["##"](this: Types.Point<0 | 1>, a1: Types.Line<0 | 1>): Types.Point<0 | 1>
    ["##"](this: Types.Point<number>, a1: Types.Line<number>): Types.Point<0 | 1>
    ["##"](this: Types.Point<1>, a1: Types.Lseg<1>): Types.Point<1>
    ["##"](this: Types.Point<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Point<0 | 1>
    ["##"](this: Types.Point<number>, a1: Types.Lseg<number>): Types.Point<0 | 1>
    ["##"](...args: unknown[]) {
        return sqlFunction("##", [{args: [Types.Point<0 | 1>, Types.Box<0 | 1>], ret: Types.Point<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Point<0 | 1>, Types.Line<0 | 1>], ret: Types.Point<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Point<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Point<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<->"](this: Types.Point<1>, a1: Types.Box<1>): Types.Float8<1>
    ["<->"](this: Types.Point<0 | 1>, a1: Types.Box<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Point<number>, a1: Types.Box<number>): Types.Float8<0 | 1>
    ["<->"](this: Types.Point<1>, a1: Types.Circle<1>): Types.Float8<1>
    ["<->"](this: Types.Point<0 | 1>, a1: Types.Circle<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Point<number>, a1: Types.Circle<number>): Types.Float8<0 | 1>
    ["<->"](this: Types.Point<1>, a1: Types.Line<1>): Types.Float8<1>
    ["<->"](this: Types.Point<0 | 1>, a1: Types.Line<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Point<number>, a1: Types.Line<number>): Types.Float8<0 | 1>
    ["<->"](this: Types.Point<1>, a1: Types.Path<1>): Types.Float8<1>
    ["<->"](this: Types.Point<0 | 1>, a1: Types.Path<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Point<number>, a1: Types.Path<number>): Types.Float8<0 | 1>
    ["<->"](this: Types.Point<1>, a1: Types.Polygon<1>): Types.Float8<1>
    ["<->"](this: Types.Point<0 | 1>, a1: Types.Polygon<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Point<number>, a1: Types.Polygon<number>): Types.Float8<0 | 1>
    ["<->"](this: Types.Point<1>, a1: Types.Lseg<1>): Types.Float8<1>
    ["<->"](this: Types.Point<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Point<number>, a1: Types.Lseg<number>): Types.Float8<0 | 1>
    ["<->"](this: Types.Point<1>, a1: Types.Point<1>): Types.Float8<1>
    ["<->"](this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Point<number>, a1: Types.Point<number>): Types.Float8<0 | 1>
    ["<->"](...args: unknown[]) {
        return sqlFunction("<->", [{args: [Types.Point<0 | 1>, Types.Box<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Point<0 | 1>, Types.Circle<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Point<0 | 1>, Types.Line<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Point<0 | 1>, Types.Path<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Point<0 | 1>, Types.Polygon<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Point<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">^"](this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    [">^"](this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    [">^"](this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    [">^"](...args: unknown[]) {
        return sqlFunction(">^", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["|>>"](this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    ["|>>"](this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    ["|>>"](this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    ["|>>"](...args: unknown[]) {
        return sqlFunction("|>>", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["+"](this: Types.Point<1>, a1: Types.Point<1>): Types.Point<1>
    ["+"](this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Point<0 | 1>
    ["+"](this: Types.Point<number>, a1: Types.Point<number>): Types.Point<0 | 1>
    ["+"](...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Point<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    plus(this: Types.Point<1>, a1: Types.Point<1>): Types.Point<1>
    plus(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Point<0 | 1>
    plus(this: Types.Point<number>, a1: Types.Point<number>): Types.Point<0 | 1>
    plus(...args: unknown[]) {
        return sqlFunction("+", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Point<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<<|"](this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    ["<<|"](this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    ["<<|"](this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    ["<<|"](...args: unknown[]) {
        return sqlFunction("<<|", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<^"](this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    ["<^"](this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    ["<^"](this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    ["<^"](...args: unknown[]) {
        return sqlFunction("<^", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["/"](this: Types.Point<1>, a1: Types.Point<1>): Types.Point<1>
    ["/"](this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Point<0 | 1>
    ["/"](this: Types.Point<number>, a1: Types.Point<number>): Types.Point<0 | 1>
    ["/"](...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Point<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    divide(this: Types.Point<1>, a1: Types.Point<1>): Types.Point<1>
    divide(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Point<0 | 1>
    divide(this: Types.Point<number>, a1: Types.Point<number>): Types.Point<0 | 1>
    divide(...args: unknown[]) {
        return sqlFunction("/", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Point<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["~="](this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    ["~="](this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    ["~="](this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    ["~="](...args: unknown[]) {
        return sqlFunction("~=", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["?-"](this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    ["?-"](this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    ["?-"](this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    ["?-"](...args: unknown[]) {
        return sqlFunction("?-", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<<"](this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    ["<<"](this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    ["<<"](this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    ["<<"](...args: unknown[]) {
        return sqlFunction("<<", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["*"](this: Types.Point<1>, a1: Types.Point<1>): Types.Point<1>
    ["*"](this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Point<0 | 1>
    ["*"](this: Types.Point<number>, a1: Types.Point<number>): Types.Point<0 | 1>
    ["*"](...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Point<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    multiply(this: Types.Point<1>, a1: Types.Point<1>): Types.Point<1>
    multiply(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Point<0 | 1>
    multiply(this: Types.Point<number>, a1: Types.Point<number>): Types.Point<0 | 1>
    multiply(...args: unknown[]) {
        return sqlFunction("*", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Point<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    ["<>"](this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    ne(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">>"](this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    [">>"](this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    [">>"](this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    [">>"](...args: unknown[]) {
        return sqlFunction(">>", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["-"](this: Types.Point<1>, a1: Types.Point<1>): Types.Point<1>
    ["-"](this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Point<0 | 1>
    ["-"](this: Types.Point<number>, a1: Types.Point<number>): Types.Point<0 | 1>
    ["-"](...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Point<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    minus(this: Types.Point<1>, a1: Types.Point<1>): Types.Point<1>
    minus(this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Point<0 | 1>
    minus(this: Types.Point<number>, a1: Types.Point<number>): Types.Point<0 | 1>
    minus(...args: unknown[]) {
        return sqlFunction("-", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Point<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["?|"](this: Types.Point<1>, a1: Types.Point<1>): Types.Bool<1>
    ["?|"](this: Types.Point<0 | 1>, a1: Types.Point<0 | 1>): Types.Bool<0 | 1>
    ["?|"](this: Types.Point<number>, a1: Types.Point<number>): Types.Bool<0 | 1>
    ["?|"](...args: unknown[]) {
        return sqlFunction("?|", [{args: [Types.Point<0 | 1>, Types.Point<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
