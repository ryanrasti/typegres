import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Lseg<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Lseg<1>;
    static new(v: null): Lseg<0>;
    static new(v: Expression): Lseg<0 | 1>;
    static new(v: SerializeParam | null | Expression): Lseg<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "lseg" } 
    asAggregate(): Types.Lseg<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Lseg<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Lseg<1> | undefined {
          return undefined;
        }
       
    closeLseg(this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Point<1>
    closeLseg(this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Point<0 | 1>
    closeLseg(this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Point<0 | 1>
    closeLseg(...args: unknown[]) {
        return sqlFunction("close_lseg", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    closeSb(this: Types.Lseg<1>, a1: Types.Box<1>): Types.Point<1>
    closeSb(this: Types.Lseg<0 | 1>, a1: Types.Box<0 | 1>): Types.Point<0 | 1>
    closeSb(this: Types.Lseg<number>, a1: Types.Box<number>): Types.Point<0 | 1>
    closeSb(...args: unknown[]) {
        return sqlFunction("close_sb", [{args: [Types.Lseg<0 | 1>, Types.Box<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    distSb(this: Types.Lseg<1>, a1: Types.Box<1>): Types.Float8<1>
    distSb(this: Types.Lseg<0 | 1>, a1: Types.Box<0 | 1>): Types.Float8<0 | 1>
    distSb(this: Types.Lseg<number>, a1: Types.Box<number>): Types.Float8<0 | 1>
    distSb(...args: unknown[]) {
        return sqlFunction("dist_sb", [{args: [Types.Lseg<0 | 1>, Types.Box<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    distSl(this: Types.Lseg<1>, a1: Types.Line<1>): Types.Float8<1>
    distSl(this: Types.Lseg<0 | 1>, a1: Types.Line<0 | 1>): Types.Float8<0 | 1>
    distSl(this: Types.Lseg<number>, a1: Types.Line<number>): Types.Float8<0 | 1>
    distSl(...args: unknown[]) {
        return sqlFunction("dist_sl", [{args: [Types.Lseg<0 | 1>, Types.Line<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    distSp(this: Types.Lseg<1>, a1: Types.Point<1>): Types.Float8<1>
    distSp(this: Types.Lseg<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
    distSp(this: Types.Lseg<number>, a1: Types.Point<number>): Types.Float8<0 | 1>
    distSp(...args: unknown[]) {
        return sqlFunction("dist_sp", [{args: [Types.Lseg<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    interSb(this: Types.Lseg<1>, a1: Types.Box<1>): Types.Bool<1>
    interSb(this: Types.Lseg<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    interSb(this: Types.Lseg<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    interSb(...args: unknown[]) {
        return sqlFunction("inter_sb", [{args: [Types.Lseg<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    interSl(this: Types.Lseg<1>, a1: Types.Line<1>): Types.Bool<1>
    interSl(this: Types.Lseg<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
    interSl(this: Types.Lseg<number>, a1: Types.Line<number>): Types.Bool<0 | 1>
    interSl(...args: unknown[]) {
        return sqlFunction("inter_sl", [{args: [Types.Lseg<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ishorizontal(this: Types.Lseg<1>): Types.Bool<1>
    ishorizontal(this: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    ishorizontal(this: Types.Lseg<number>): Types.Bool<0 | 1>
    ishorizontal(...args: unknown[]) {
        return sqlFunction("ishorizontal", [{args: [Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    isparallel(this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    isparallel(this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    isparallel(this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    isparallel(...args: unknown[]) {
        return sqlFunction("isparallel", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    isperp(this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    isperp(this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    isperp(this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    isperp(...args: unknown[]) {
        return sqlFunction("isperp", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    isvertical(this: Types.Lseg<1>): Types.Bool<1>
    isvertical(this: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    isvertical(this: Types.Lseg<number>): Types.Bool<0 | 1>
    isvertical(...args: unknown[]) {
        return sqlFunction("isvertical", [{args: [Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    length(this: Types.Lseg<1>): Types.Float8<1>
    length(this: Types.Lseg<0 | 1>): Types.Float8<0 | 1>
    length(this: Types.Lseg<number>): Types.Float8<0 | 1>
    length(...args: unknown[]) {
        return sqlFunction("length", [{args: [Types.Lseg<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lsegCenter(this: Types.Lseg<1>): Types.Point<1>
    lsegCenter(this: Types.Lseg<0 | 1>): Types.Point<0 | 1>
    lsegCenter(this: Types.Lseg<number>): Types.Point<0 | 1>
    lsegCenter(...args: unknown[]) {
        return sqlFunction("lseg_center", [{args: [Types.Lseg<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lsegDistance(this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Float8<1>
    lsegDistance(this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Float8<0 | 1>
    lsegDistance(this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Float8<0 | 1>
    lsegDistance(...args: unknown[]) {
        return sqlFunction("lseg_distance", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lsegEq(this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    lsegEq(this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    lsegEq(this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    lsegEq(...args: unknown[]) {
        return sqlFunction("lseg_eq", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lsegGe(this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    lsegGe(this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    lsegGe(this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    lsegGe(...args: unknown[]) {
        return sqlFunction("lseg_ge", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lsegGt(this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    lsegGt(this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    lsegGt(this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    lsegGt(...args: unknown[]) {
        return sqlFunction("lseg_gt", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lsegHorizontal(this: Types.Lseg<1>): Types.Bool<1>
    lsegHorizontal(this: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    lsegHorizontal(this: Types.Lseg<number>): Types.Bool<0 | 1>
    lsegHorizontal(...args: unknown[]) {
        return sqlFunction("lseg_horizontal", [{args: [Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lsegInterpt(this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Point<1>
    lsegInterpt(this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Point<0 | 1>
    lsegInterpt(this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Point<0 | 1>
    lsegInterpt(...args: unknown[]) {
        return sqlFunction("lseg_interpt", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lsegIntersect(this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    lsegIntersect(this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    lsegIntersect(this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    lsegIntersect(...args: unknown[]) {
        return sqlFunction("lseg_intersect", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lsegLe(this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    lsegLe(this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    lsegLe(this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    lsegLe(...args: unknown[]) {
        return sqlFunction("lseg_le", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lsegLength(this: Types.Lseg<1>): Types.Float8<1>
    lsegLength(this: Types.Lseg<0 | 1>): Types.Float8<0 | 1>
    lsegLength(this: Types.Lseg<number>): Types.Float8<0 | 1>
    lsegLength(...args: unknown[]) {
        return sqlFunction("lseg_length", [{args: [Types.Lseg<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lsegLt(this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    lsegLt(this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    lsegLt(this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    lsegLt(...args: unknown[]) {
        return sqlFunction("lseg_lt", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lsegNe(this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    lsegNe(this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    lsegNe(this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    lsegNe(...args: unknown[]) {
        return sqlFunction("lseg_ne", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lsegParallel(this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    lsegParallel(this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    lsegParallel(this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    lsegParallel(...args: unknown[]) {
        return sqlFunction("lseg_parallel", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lsegPerp(this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    lsegPerp(this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    lsegPerp(this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    lsegPerp(...args: unknown[]) {
        return sqlFunction("lseg_perp", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lsegVertical(this: Types.Lseg<1>): Types.Bool<1>
    lsegVertical(this: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    lsegVertical(this: Types.Lseg<number>): Types.Bool<0 | 1>
    lsegVertical(...args: unknown[]) {
        return sqlFunction("lseg_vertical", [{args: [Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    onSb(this: Types.Lseg<1>, a1: Types.Box<1>): Types.Bool<1>
    onSb(this: Types.Lseg<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    onSb(this: Types.Lseg<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    onSb(...args: unknown[]) {
        return sqlFunction("on_sb", [{args: [Types.Lseg<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    onSl(this: Types.Lseg<1>, a1: Types.Line<1>): Types.Bool<1>
    onSl(this: Types.Lseg<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
    onSl(this: Types.Lseg<number>, a1: Types.Line<number>): Types.Bool<0 | 1>
    onSl(...args: unknown[]) {
        return sqlFunction("on_sl", [{args: [Types.Lseg<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    point(this: Types.Lseg<1>): Types.Point<1>
    point(this: Types.Lseg<0 | 1>): Types.Point<0 | 1>
    point(this: Types.Lseg<number>): Types.Point<0 | 1>
    point(...args: unknown[]) {
        return sqlFunction("point", [{args: [Types.Lseg<0 | 1>], ret: Types.Point<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["##"](this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Point<1>
    ["##"](this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Point<0 | 1>
    ["##"](this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Point<0 | 1>
    ["##"](this: Types.Lseg<1>, a1: Types.Box<1>): Types.Point<1>
    ["##"](this: Types.Lseg<0 | 1>, a1: Types.Box<0 | 1>): Types.Point<0 | 1>
    ["##"](this: Types.Lseg<number>, a1: Types.Box<number>): Types.Point<0 | 1>
    ["##"](...args: unknown[]) {
        return sqlFunction("##", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Point<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Lseg<0 | 1>, Types.Box<0 | 1>], ret: Types.Point<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<->"](this: Types.Lseg<1>, a1: Types.Box<1>): Types.Float8<1>
    ["<->"](this: Types.Lseg<0 | 1>, a1: Types.Box<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Lseg<number>, a1: Types.Box<number>): Types.Float8<0 | 1>
    ["<->"](this: Types.Lseg<1>, a1: Types.Line<1>): Types.Float8<1>
    ["<->"](this: Types.Lseg<0 | 1>, a1: Types.Line<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Lseg<number>, a1: Types.Line<number>): Types.Float8<0 | 1>
    ["<->"](this: Types.Lseg<1>, a1: Types.Point<1>): Types.Float8<1>
    ["<->"](this: Types.Lseg<0 | 1>, a1: Types.Point<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Lseg<number>, a1: Types.Point<number>): Types.Float8<0 | 1>
    ["<->"](this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Float8<1>
    ["<->"](this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Float8<0 | 1>
    ["<->"](this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Float8<0 | 1>
    ["<->"](...args: unknown[]) {
        return sqlFunction("<->", [{args: [Types.Lseg<0 | 1>, Types.Box<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Lseg<0 | 1>, Types.Line<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Lseg<0 | 1>, Types.Point<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Float8<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["?#"](this: Types.Lseg<1>, a1: Types.Box<1>): Types.Bool<1>
    ["?#"](this: Types.Lseg<0 | 1>, a1: Types.Box<0 | 1>): Types.Bool<0 | 1>
    ["?#"](this: Types.Lseg<number>, a1: Types.Box<number>): Types.Bool<0 | 1>
    ["?#"](this: Types.Lseg<1>, a1: Types.Line<1>): Types.Bool<1>
    ["?#"](this: Types.Lseg<0 | 1>, a1: Types.Line<0 | 1>): Types.Bool<0 | 1>
    ["?#"](this: Types.Lseg<number>, a1: Types.Line<number>): Types.Bool<0 | 1>
    ["?#"](this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    ["?#"](this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    ["?#"](this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    ["?#"](...args: unknown[]) {
        return sqlFunction("?#", [{args: [Types.Lseg<0 | 1>, Types.Box<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Lseg<0 | 1>, Types.Line<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}, {args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    ["="](this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    eq(this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    [">="](this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    [">="](this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    gte(this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    gte(this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    [">"](this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    [">"](this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    gt(this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    gt(this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["#"](this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Point<1>
    ["#"](this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Point<0 | 1>
    ["#"](this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Point<0 | 1>
    ["#"](...args: unknown[]) {
        return sqlFunction("#", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Point<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    ["<="](this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    ["<="](this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    lte(this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    lte(this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    ["<"](this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    ["<"](this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    lt(this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    lt(this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    ["<>"](this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    ["<>"](this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    ne(this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    ne(this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["?||"](this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    ["?||"](this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    ["?||"](this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    ["?||"](...args: unknown[]) {
        return sqlFunction("?||", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["?-|"](this: Types.Lseg<1>, a1: Types.Lseg<1>): Types.Bool<1>
    ["?-|"](this: Types.Lseg<0 | 1>, a1: Types.Lseg<0 | 1>): Types.Bool<0 | 1>
    ["?-|"](this: Types.Lseg<number>, a1: Types.Lseg<number>): Types.Bool<0 | 1>
    ["?-|"](...args: unknown[]) {
        return sqlFunction("?-|", [{args: [Types.Lseg<0 | 1>, Types.Lseg<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
