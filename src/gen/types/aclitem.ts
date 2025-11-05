import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Aclitem<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Aclitem<1>;
    static new(v: null): Aclitem<0>;
    static new(v: Expression): Aclitem<0 | 1>;
    static new(v: SerializeParam | null | Expression): Aclitem<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "aclitem" } 
    asAggregate(): Types.Aclitem<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Aclitem<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Aclitem<1> | undefined {
          return undefined;
        }
       
    aclitemeq(this: Types.Aclitem<1>, a1: Types.Aclitem<1>): Types.Bool<1>
    aclitemeq(this: Types.Aclitem<0 | 1>, a1: Types.Aclitem<0 | 1>): Types.Bool<0 | 1>
    aclitemeq(this: Types.Aclitem<number>, a1: Types.Aclitem<number>): Types.Bool<0 | 1>
    aclitemeq(...args: unknown[]) {
        return sqlFunction("aclitemeq", [{args: [Types.Aclitem<0 | 1>, Types.Aclitem<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashAclitem(this: Types.Aclitem<1>): Types.Int4<1>
    hashAclitem(this: Types.Aclitem<0 | 1>): Types.Int4<0 | 1>
    hashAclitem(this: Types.Aclitem<number>): Types.Int4<0 | 1>
    hashAclitem(...args: unknown[]) {
        return sqlFunction("hash_aclitem", [{args: [Types.Aclitem<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    hashAclitemExtended(this: Types.Aclitem<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    hashAclitemExtended(this: Types.Aclitem<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashAclitemExtended(this: Types.Aclitem<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    hashAclitemExtended(...args: unknown[]) {
        return sqlFunction("hash_aclitem_extended", [{args: [Types.Aclitem<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Aclitem<1>, a1: Types.Aclitem<1>): Types.Bool<1>
    ["="](this: Types.Aclitem<0 | 1>, a1: Types.Aclitem<0 | 1>): Types.Bool<0 | 1>
    ["="](this: Types.Aclitem<number>, a1: Types.Aclitem<number>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Aclitem<0 | 1>, Types.Aclitem<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Aclitem<1>, a1: Types.Aclitem<1>): Types.Bool<1>
    eq(this: Types.Aclitem<0 | 1>, a1: Types.Aclitem<0 | 1>): Types.Bool<0 | 1>
    eq(this: Types.Aclitem<number>, a1: Types.Aclitem<number>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Aclitem<0 | 1>, Types.Aclitem<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
