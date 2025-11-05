import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Cid<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Cid<1>;
    static new(v: null): Cid<0>;
    static new(v: Expression): Cid<0 | 1>;
    static new(v: SerializeParam | null | Expression): Cid<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "cid" } 
    asAggregate(): Types.Cid<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Cid<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Cid<1> | undefined {
          return undefined;
        }
       
    cideq(this: Types.Cid<1>, a1: Types.Cid<1>): Types.Bool<1>
    cideq(this: Types.Cid<0 | 1>, a1: Types.Cid<0 | 1>): Types.Bool<0 | 1>
    cideq(this: Types.Cid<number>, a1: Types.Cid<number>): Types.Bool<0 | 1>
    cideq(...args: unknown[]) {
        return sqlFunction("cideq", [{args: [Types.Cid<0 | 1>, Types.Cid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Cid<1>, a1: Types.Cid<1>): Types.Bool<1>
    ["="](this: Types.Cid<0 | 1>, a1: Types.Cid<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Cid<number>, a1: Types.Cid<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Cid<0 | 1>, Types.Cid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Cid<1>, a1: Types.Cid<1>): Types.Bool<1>
    eq(this: Types.Cid<0 | 1>, a1: Types.Cid<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Cid<number>, a1: Types.Cid<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Cid<0 | 1>, Types.Cid<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
