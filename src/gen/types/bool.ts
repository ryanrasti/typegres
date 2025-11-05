import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { typeMap } from '../../types/serialization';
import { Expression } from '../../expression';

type Parsed = ReturnType<typeof typeMap["bool"]['parse']>
type SerializeParam = Parameters<typeof typeMap["bool"]['serialize']>[0]
export class Bool<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Bool<1>;
    static new(v: null): Bool<0>;
    static new(v: Expression): Bool<0 | 1>;
    static new(v: SerializeParam | null | Expression): Bool<0 | 1> { return new this(v); }
    static serializeParamTypes: readonly SerializeParam[] | undefined = undefined;
    static parse(v: string) { return typeMap["bool"].parse(v); }
    static typeString(): string | undefined  { return "bool" } 
    asAggregate(): Types.Bool<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Bool<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Bool<1> | undefined {
          return undefined;
        }
       
    binaryUpgradeSetRecordInitPrivs(this: Types.Bool<1>): Types.Void<1>
    binaryUpgradeSetRecordInitPrivs(this: Types.Bool<0 | 1>): Types.Void<0 | 1>
    binaryUpgradeSetRecordInitPrivs(this: Types.Bool<number>): Types.Void<0 | 1>
    binaryUpgradeSetRecordInitPrivs(...args: unknown[]) {
        return sqlFunction("binary_upgrade_set_record_init_privs", [{args: [Types.Bool<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boolAnd(this: Types.Bool<number>): Types.Bool<0 | 1>
    boolAnd(...args: unknown[]) {
        return sqlFunction("bool_and", [{args: [Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boolOr(this: Types.Bool<number>): Types.Bool<0 | 1>
    boolOr(...args: unknown[]) {
        return sqlFunction("bool_or", [{args: [Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boolandStatefunc(this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    boolandStatefunc(this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    boolandStatefunc(this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    boolandStatefunc(...args: unknown[]) {
        return sqlFunction("booland_statefunc", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    booleq(this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    booleq(this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    booleq(this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    booleq(...args: unknown[]) {
        return sqlFunction("booleq", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boolge(this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    boolge(this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    boolge(this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    boolge(...args: unknown[]) {
        return sqlFunction("boolge", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boolgt(this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    boolgt(this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    boolgt(this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    boolgt(...args: unknown[]) {
        return sqlFunction("boolgt", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boolle(this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    boolle(this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    boolle(this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    boolle(...args: unknown[]) {
        return sqlFunction("boolle", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boollt(this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    boollt(this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    boollt(this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    boollt(...args: unknown[]) {
        return sqlFunction("boollt", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boolne(this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    boolne(this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    boolne(this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    boolne(...args: unknown[]) {
        return sqlFunction("boolne", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    boolorStatefunc(this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    boolorStatefunc(this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    boolorStatefunc(this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    boolorStatefunc(...args: unknown[]) {
        return sqlFunction("boolor_statefunc", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    btboolcmp(this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Int4<1>
    btboolcmp(this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Int4<0 | 1>
    btboolcmp(this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Int4<0 | 1>
    btboolcmp(...args: unknown[]) {
        return sqlFunction("btboolcmp", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    currentSchemas(this: Types.Bool<1>): Types.Array<1, Types.Name<0 | 1>>
    currentSchemas(this: Types.Bool<0 | 1>): Types.Array<0 | 1, Types.Name<0 | 1>>
    currentSchemas(this: Types.Bool<number>): Types.Array<0 | 1, Types.Name<0 | 1>>
    currentSchemas(...args: unknown[]) {
        return sqlFunction("current_schemas", [{args: [Types.Bool<0 | 1>], ret: Types.Array.of(Types.Name<0 | 1>), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    databaseToXml(this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<1>
    databaseToXml(this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    databaseToXml(this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    databaseToXml(...args: unknown[]) {
        return sqlFunction("database_to_xml", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    databaseToXmlAndXmlschema(this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<1>
    databaseToXmlAndXmlschema(this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    databaseToXmlAndXmlschema(this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    databaseToXmlAndXmlschema(...args: unknown[]) {
        return sqlFunction("database_to_xml_and_xmlschema", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    databaseToXmlschema(this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<1>
    databaseToXmlschema(this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    databaseToXmlschema(this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    databaseToXmlschema(...args: unknown[]) {
        return sqlFunction("database_to_xmlschema", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    every(this: Types.Bool<number>): Types.Bool<0 | 1>
    every(...args: unknown[]) {
        return sqlFunction("every", [{args: [Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    int4(this: Types.Bool<1>): Types.Int4<1>
    int4(this: Types.Bool<0 | 1>): Types.Int4<0 | 1>
    int4(this: Types.Bool<number>): Types.Int4<0 | 1>
    int4(...args: unknown[]) {
        return sqlFunction("int4", [{args: [Types.Bool<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgBackupStop(this: Types.Bool<1>): Types.Record<1, {lsn: Types.PgLsn<1>, labelfile: Types.Text<1>, spcmapfile: Types.Text<1>}>
    pgBackupStop(this: Types.Bool<0 | 1>): Types.Record<0 | 1, {lsn: Types.PgLsn<0 | 1>, labelfile: Types.Text<0 | 1>, spcmapfile: Types.Text<0 | 1>}>
    pgBackupStop(this: Types.Bool<number>): Types.Record<0 | 1, {lsn: Types.PgLsn<0 | 1>, labelfile: Types.Text<0 | 1>, spcmapfile: Types.Text<0 | 1>}>
    pgBackupStop(...args: unknown[]) {
        return sqlFunction("pg_backup_stop", [{args: [Types.Bool<0 | 1>], ret: Types.Record.of({lsn: Types.PgLsn<0 | 1>, labelfile: Types.Text<0 | 1>, spcmapfile: Types.Text<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgLogicalEmitMessage(this: Types.Bool<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Bytea<1>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.PgLsn<1>
    pgLogicalEmitMessage(this: Types.Bool<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Bytea<0 | 1>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.PgLsn<0 | 1>
    pgLogicalEmitMessage(this: Types.Bool<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Bytea<number>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.PgLsn<0 | 1>
    pgLogicalEmitMessage(this: Types.Bool<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.PgLsn<1>
    pgLogicalEmitMessage(this: Types.Bool<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>, a3: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.PgLsn<0 | 1>
    pgLogicalEmitMessage(this: Types.Bool<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>, a3: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.PgLsn<0 | 1>
    pgLogicalEmitMessage(...args: unknown[]) {
        return sqlFunction("pg_logical_emit_message", [{args: [Types.Bool<0 | 1>, Types.Text<0 | 1>, Types.Bytea<0 | 1>, Types.Bool<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Bool<0 | 1>, Types.Text<0 | 1>, Types.Text<0 | 1>, Types.Bool<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgPromote(this: Types.Bool<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<1>
    pgPromote(this: Types.Bool<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    pgPromote(this: Types.Bool<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>): Types.Bool<0 | 1>
    pgPromote(...args: unknown[]) {
        return sqlFunction("pg_promote", [{args: [Types.Bool<0 | 1>, Types.Int4<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgReplicationOriginSessionProgress(this: Types.Bool<1>): Types.PgLsn<1>
    pgReplicationOriginSessionProgress(this: Types.Bool<0 | 1>): Types.PgLsn<0 | 1>
    pgReplicationOriginSessionProgress(this: Types.Bool<number>): Types.PgLsn<0 | 1>
    pgReplicationOriginSessionProgress(...args: unknown[]) {
        return sqlFunction("pg_replication_origin_session_progress", [{args: [Types.Bool<0 | 1>], ret: Types.PgLsn<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    text(this: Types.Bool<1>): Types.Text<1>
    text(this: Types.Bool<0 | 1>): Types.Text<0 | 1>
    text(this: Types.Bool<number>): Types.Text<0 | 1>
    text(...args: unknown[]) {
        return sqlFunction("text", [{args: [Types.Bool<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: true, isVariadic: false}], [this, ...args]);
    }

    ["="](this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    ["="](this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    ["="](this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    ["="](...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    eq(this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    eq(this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    eq(this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    eq(...args: unknown[]) {
        return sqlFunction("=", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">="](this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    [">="](this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    [">="](this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    [">="](...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gte(this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    gte(this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    gte(this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    gte(...args: unknown[]) {
        return sqlFunction(">=", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    [">"](this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    [">"](this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    [">"](this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    [">"](...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    gt(this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    gt(this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    gt(this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    gt(...args: unknown[]) {
        return sqlFunction(">", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<="](this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    ["<="](this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    ["<="](this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    ["<="](...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lte(this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    lte(this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    lte(this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    lte(...args: unknown[]) {
        return sqlFunction("<=", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<"](this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    ["<"](this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    ["<"](this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    ["<"](...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    lt(this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    lt(this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    lt(this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    lt(...args: unknown[]) {
        return sqlFunction("<", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ["<>"](this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    ["<>"](this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    ["<>"](...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ne(this: Types.Bool<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    ne(this: Types.Bool<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    ne(this: Types.Bool<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    ne(...args: unknown[]) {
        return sqlFunction("<>", [{args: [Types.Bool<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: true, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
