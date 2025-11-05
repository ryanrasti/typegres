import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Line<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Line<1>;
    static new(v: null): Line<0>;
    static new(v: Expression): Line<0 | 1>;
    static new(v: SerializeParam | null | Expression): Line<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "line" } 
    asAggregate(): Types.Line<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Line<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Line<1> | undefined {
          return undefined;
        }
       
    closeLs(this: Types.Line<1>, a1: Types.Lseg<1>): Types.Point<1>
    closeLs(this: Types.Line<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Point<0 | 1>
    closeLs(this: Types.Line<number>, a1: Types.Lseg<number>): Types.Point<0 | 1>
    closeLs(...args: unknown[]) {
        return sqlFunction("close_ls", [{args: [Types.Line<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    distLp(this: Types.Line<1>, a1: Types.Point<1>): Types.Float8<1>
    distLp(this: Types.Line<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
    distLp(this: Types.Line<number>, a1: Types.Point<number>): Types.Float8<0 | 1>
    distLp(...args: unknown[]) {
        return sqlFunction("dist_lp", [{args: [Types.Line<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    distLs(this: Types.Line<1>, a1: Types.Lseg<1>): Types.Float8<1>
    distLs(this: Types.Line<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Float8<0 | 1>
    distLs(this: Types.Line<number>, a1: Types.Lseg<number>): Types.Float8<0 | 1>
    distLs(...args: unknown[]) {
        return sqlFunction("dist_ls", [{args: [Types.Line<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    interLb(this: Types.Line<1>, a1: Types.Box<1>): Types.Bool<1>
    interLb(this: Types.Line<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    interLb(this: Types.Line<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    interLb(...args: unknown[]) {
        return sqlFunction("inter_lb", [{args: [Types.Line<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ishorizontal(this: Types.Line<1>): Types.Bool<1>
    ishorizontal(this: Types.Line<0 | 1>): Types.Bool<0 | 1>
    ishorizontal(this: Types.Line<number>): Types.Bool<0 | 1>
    ishorizontal(...args: unknown[]) {
        return sqlFunction("ishorizontal", [{args: [Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    isparallel(this: Types.Line<1>, a1: Types.Line<1>): Types.Bool<1>
    isparallel(this: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
    isparallel(this: Types.Line<number>, a1: Types.Line<number>): Types.Bool<0 | 1>
    isparallel(...args: unknown[]) {
        return sqlFunction("isparallel", [{args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    isperp(this: Types.Line<1>, a1: Types.Line<1>): Types.Bool<1>
    isperp(this: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
    isperp(this: Types.Line<number>, a1: Types.Line<number>): Types.Bool<0 | 1>
    isperp(...args: unknown[]) {
        return sqlFunction("isperp", [{args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    isvertical(this: Types.Line<1>): Types.Bool<1>
    isvertical(this: Types.Line<0 | 1>): Types.Bool<0 | 1>
    isvertical(this: Types.Line<number>): Types.Bool<0 | 1>
    isvertical(...args: unknown[]) {
        return sqlFunction("isvertical", [{args: [Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lineDistance(this: Types.Line<1>, a1: Types.Line<1>): Types.Float8<1>
    lineDistance(this: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Float8<0 | 1>
    lineDistance(this: Types.Line<number>, a1: Types.Line<number>): Types.Float8<0 | 1>
    lineDistance(...args: unknown[]) {
        return sqlFunction("line_distance", [{args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lineEq(this: Types.Line<1>, a1: Types.Line<1>): Types.Bool<1>
    lineEq(this: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
    lineEq(this: Types.Line<number>, a1: Types.Line<number>): Types.Bool<0 | 1>
    lineEq(...args: unknown[]) {
        return sqlFunction("line_eq", [{args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lineHorizontal(this: Types.Line<1>): Types.Bool<1>
    lineHorizontal(this: Types.Line<0 | 1>): Types.Bool<0 | 1>
    lineHorizontal(this: Types.Line<number>): Types.Bool<0 | 1>
    lineHorizontal(...args: unknown[]) {
        return sqlFunction("line_horizontal", [{args: [Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lineInterpt(this: Types.Line<1>, a1: Types.Line<1>): Types.Point<1>
    lineInterpt(this: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Point<0 | 1>
    lineInterpt(this: Types.Line<number>, a1: Types.Line<number>): Types.Point<0 | 1>
    lineInterpt(...args: unknown[]) {
        return sqlFunction("line_interpt", [{args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lineIntersect(this: Types.Line<1>, a1: Types.Line<1>): Types.Bool<1>
    lineIntersect(this: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
    lineIntersect(this: Types.Line<number>, a1: Types.Line<number>): Types.Bool<0 | 1>
    lineIntersect(...args: unknown[]) {
        return sqlFunction("line_intersect", [{args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lineParallel(this: Types.Line<1>, a1: Types.Line<1>): Types.Bool<1>
    lineParallel(this: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
    lineParallel(this: Types.Line<number>, a1: Types.Line<number>): Types.Bool<0 | 1>
    lineParallel(...args: unknown[]) {
        return sqlFunction("line_parallel", [{args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    linePerp(this: Types.Line<1>, a1: Types.Line<1>): Types.Bool<1>
    linePerp(this: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
    linePerp(this: Types.Line<number>, a1: Types.Line<number>): Types.Bool<0 | 1>
    linePerp(...args: unknown[]) {
        return sqlFunction("line_perp", [{args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lineVertical(this: Types.Line<1>): Types.Bool<1>
    lineVertical(this: Types.Line<0 | 1>): Types.Bool<0 | 1>
    lineVertical(this: Types.Line<number>): Types.Bool<0 | 1>
    lineVertical(...args: unknown[]) {
        return sqlFunction("line_vertical", [{args: [Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["##"](this: Types.Line<1>, a1: Types.Lseg<1>): Types.Point<1>
    ["##"](this: Types.Line<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Point<0 | 1>
    ["##"](this: Types.Line<number>, a1: Types.Lseg<number>): Types.Point<0 | 1>
    ["##"](...args: unknown[]) {
        return sqlFunction("##", [{args: [Types.Line<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Point<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<->"](this: Types.Line<1>, a1: Types.Point<1>): Types.Float8<1>
    ["<->"](this: Types.Line<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Line<number>, a1: Types.Point<number>): Types.Float8<0 | 1>
    ["<->"](this: Types.Line<1>, a1: Types.Lseg<1>): Types.Float8<1>
    ["<->"](this: Types.Line<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Line<number>, a1: Types.Lseg<number>): Types.Float8<0 | 1>
    ["<->"](this: Types.Line<1>, a1: Types.Line<1>): Types.Float8<1>
    ["<->"](this: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Line<number>, a1: Types.Line<number>): Types.Float8<0 | 1>
    ["<->"](...args: unknown[]) {
        return sqlFunction("<->", [{args: [Types.Line<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Line<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["?#"](this: Types.Line<1>, a1: Types.Box<1>): Types.Bool<1>
    ["?#"](this: Types.Line<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    ["?#"](this: Types.Line<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    ["?#"](this: Types.Line<1>, a1: Types.Line<1>): Types.Bool<1>
    ["?#"](this: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
    ["?#"](this: Types.Line<number>, a1: Types.Line<number>): Types.Bool<0 | 1>
    ["?#"](...args: unknown[]) {
        return sqlFunction("?#", [{args: [Types.Line<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Line<1>, a1: Types.Line<1>): Types.Bool<1>
    ["="](this: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Line<number>, a1: Types.Line<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Line<1>, a1: Types.Line<1>): Types.Bool<1>
    eq(this: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Line<number>, a1: Types.Line<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["#"](this: Types.Line<1>, a1: Types.Line<1>): Types.Point<1>
    ["#"](this: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Point<0 | 1>
    ["#"](this: Types.Line<number>, a1: Types.Line<number>): Types.Point<0 | 1>
    ["#"](...args: unknown[]) {
        return sqlFunction("#", [{args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Point<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["?||"](this: Types.Line<1>, a1: Types.Line<1>): Types.Bool<1>
    ["?||"](this: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
    ["?||"](this: Types.Line<number>, a1: Types.Line<number>): Types.Bool<0 | 1>
    ["?||"](...args: unknown[]) {
        return sqlFunction("?||", [{args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["?-|"](this: Types.Line<1>, a1: Types.Line<1>): Types.Bool<1>
    ["?-|"](this: Types.Line<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
    ["?-|"](this: Types.Line<number>, a1: Types.Line<number>): Types.Bool<0 | 1>
    ["?-|"](...args: unknown[]) {
        return sqlFunction("?-|", [{args: [Types.Line<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
