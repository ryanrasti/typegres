import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Varchar<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Varchar<1>;
    static new(v: null): Varchar<0>;
    static new(v: Expression): Varchar<0 | 1>;
    static new(v: SerializeParam | null | Expression): Varchar<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "varchar" } 
    asAggregate(): Types.Varchar<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Varchar<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Varchar<1> | undefined {
          return undefined;
        }
       
    name(this: Types.Varchar<1>): Types.Name<1>
    name(this: Types.Varchar<0 | 1>): Types.Name<0 | 1>
    name(this: Types.Varchar<number>): Types.Name<0 | 1>
    name(...args: unknown[]) {
        return sqlFunction("name", [{args: [Types.Varchar<0 | 1>], ret: Types.Name<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    varchar(this: Types.Varchar<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Varchar<1>
    varchar(this: Types.Varchar<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Varchar<0 | 1>
    varchar(this: Types.Varchar<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Varchar<0 | 1>
    varchar(...args: unknown[]) {
        return sqlFunction("varchar", [{args: [Types.Varchar<0 | 1>, Types.Int4<0 | 1>, Types.Bool<0 | 1>], ret: Types.Varchar<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

}
