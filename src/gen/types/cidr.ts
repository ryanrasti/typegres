import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Cidr<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Cidr<1>;
    static new(v: null): Cidr<0>;
    static new(v: Expression): Cidr<0 | 1>;
    static new(v: SerializeParam | null | Expression): Cidr<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "cidr" } 
    asAggregate(): Types.Cidr<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Cidr<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Cidr<1> | undefined {
          return undefined;
        }
       
    abbrev(this: Types.Cidr<1>): Types.Text<1>
    abbrev(this: Types.Cidr<0 | 1>): Types.Text<0 | 1>
    abbrev(this: Types.Cidr<number>): Types.Text<0 | 1>
    abbrev(...args: unknown[]) {
        return sqlFunction("abbrev", [{args: [Types.Cidr<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    setMasklen(this: Types.Cidr<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Cidr<1>
    setMasklen(this: Types.Cidr<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Cidr<0 | 1>
    setMasklen(this: Types.Cidr<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Cidr<0 | 1>
    setMasklen(...args: unknown[]) {
        return sqlFunction("set_masklen", [{args: [Types.Cidr<0 | 1>, Types.Int4<0 | 1>], ret: Types.Cidr<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
