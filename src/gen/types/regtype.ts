import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Regtype<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Regtype<1>;
    static new(v: null): Regtype<0>;
    static new(v: Expression): Regtype<0 | 1>;
    static new(v: SerializeParam | null | Expression): Regtype<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "regtype" } 
    asAggregate(): Types.Regtype<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Regtype<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Regtype<1> | undefined {
          return undefined;
        }
       
    pgBasetype(this: Types.Regtype<1>): Types.Regtype<1>
    pgBasetype(this: Types.Regtype<0 | 1>): Types.Regtype<0 | 1>
    pgBasetype(this: Types.Regtype<number>): Types.Regtype<0 | 1>
    pgBasetype(...args: unknown[]) {
        return sqlFunction("pg_basetype", [{args: [Types.Regtype<0 | 1>], ret: Types.Regtype<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
