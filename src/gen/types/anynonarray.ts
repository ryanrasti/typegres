import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';

type Parsed = string
export class Anynonarray<N extends number> extends AnynonarrayBase<Parsed, N> {
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "anynonarray" } 
    asAggregate(): Types.Anynonarray<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Anynonarray<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Anynonarray<1> | undefined {
          return undefined;
        }
       
    anytextcat<T extends this>(this: T, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Text<1>
    anytextcat<T extends this>(this: T, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    anytextcat<T extends this>(this: T, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Text<0 | 1>
    anytextcat(...args: unknown[]) {
        return sqlFunction("anytextcat", [({T}) => ({args: [T, Types.Text<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

    arrayAgg<T extends this>(this: T): Types.Array<0 | 1, T>
    arrayAgg(...args: unknown[]) {
        return sqlFunction("array_agg", [({T}) => ({args: [T], ret: Types.Array.of(T), isOperator: false, isReserved: false, isVariadic: false})], [this, ...args]);
    }

}
