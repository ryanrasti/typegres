import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Regnamespace<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Regnamespace<1>;
    static new(v: null): Regnamespace<0>;
    static new(v: Expression): Regnamespace<0 | 1>;
    static new(v: SerializeParam | null | Expression): Regnamespace<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "regnamespace" } 
    asAggregate(): Types.Regnamespace<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Regnamespace<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Regnamespace<1> | undefined {
          return undefined;
        }
       
    pgImportSystemCollations(this: Types.Regnamespace<1>): Types.Int4<1>
    pgImportSystemCollations(this: Types.Regnamespace<0 | 1>): Types.Int4<0 | 1>
    pgImportSystemCollations(this: Types.Regnamespace<number>): Types.Int4<0 | 1>
    pgImportSystemCollations(...args: unknown[]) {
        return sqlFunction("pg_import_system_collations", [{args: [Types.Regnamespace<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
