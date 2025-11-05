import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class PgDdlCommand<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): PgDdlCommand<1>;
    static new(v: null): PgDdlCommand<0>;
    static new(v: Expression): PgDdlCommand<0 | 1>;
    static new(v: SerializeParam | null | Expression): PgDdlCommand<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "pg_ddl_command" } 
    asAggregate(): Types.PgDdlCommand<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.PgDdlCommand<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.PgDdlCommand<1> | undefined {
          return undefined;
        }
       
}
