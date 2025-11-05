import { sqlFunction } from '../../sql-function';
import * as Types from '../../types';
import { default as AnynonarrayBase } from '../../types/any';
import { Expression } from '../../expression';

type Parsed = string
type SerializeParam = string
export class Regclass<N extends number> extends AnynonarrayBase<Parsed, N> {
    static new(v: SerializeParam): Regclass<1>;
    static new(v: null): Regclass<0>;
    static new(v: Expression): Regclass<0 | 1>;
    static new(v: SerializeParam | null | Expression): Regclass<0 | 1> { return new this(v); }
    static parse(v: string) { return v; }
    static typeString(): string | undefined  { return "regclass" } 
    asAggregate(): Types.Regclass<number> | undefined {
          return undefined;
        }
       
    asNullable(): Types.Regclass<0 | 1> | undefined {
          return undefined;
        }
       
    asNonNullable(): Types.Regclass<1> | undefined {
          return undefined;
        }
       
    brinDesummarizeRange(this: Types.Regclass<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Void<1>
    brinDesummarizeRange(this: Types.Regclass<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Void<0 | 1>
    brinDesummarizeRange(this: Types.Regclass<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Void<0 | 1>
    brinDesummarizeRange(...args: unknown[]) {
        return sqlFunction("brin_desummarize_range", [{args: [Types.Regclass<0 | 1>, Types.Int8<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    brinSummarizeNewValues(this: Types.Regclass<1>): Types.Int4<1>
    brinSummarizeNewValues(this: Types.Regclass<0 | 1>): Types.Int4<0 | 1>
    brinSummarizeNewValues(this: Types.Regclass<number>): Types.Int4<0 | 1>
    brinSummarizeNewValues(...args: unknown[]) {
        return sqlFunction("brin_summarize_new_values", [{args: [Types.Regclass<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    brinSummarizeRange(this: Types.Regclass<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<1>
    brinSummarizeRange(this: Types.Regclass<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<0 | 1>
    brinSummarizeRange(this: Types.Regclass<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int4<0 | 1>
    brinSummarizeRange(...args: unknown[]) {
        return sqlFunction("brin_summarize_range", [{args: [Types.Regclass<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    currval(this: Types.Regclass<1>): Types.Int8<1>
    currval(this: Types.Regclass<0 | 1>): Types.Int8<0 | 1>
    currval(this: Types.Regclass<number>): Types.Int8<0 | 1>
    currval(...args: unknown[]) {
        return sqlFunction("currval", [{args: [Types.Regclass<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    ginCleanPendingList(this: Types.Regclass<1>): Types.Int8<1>
    ginCleanPendingList(this: Types.Regclass<0 | 1>): Types.Int8<0 | 1>
    ginCleanPendingList(this: Types.Regclass<number>): Types.Int8<0 | 1>
    ginCleanPendingList(...args: unknown[]) {
        return sqlFunction("gin_clean_pending_list", [{args: [Types.Regclass<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    nextval(this: Types.Regclass<1>): Types.Int8<1>
    nextval(this: Types.Regclass<0 | 1>): Types.Int8<0 | 1>
    nextval(this: Types.Regclass<number>): Types.Int8<0 | 1>
    nextval(...args: unknown[]) {
        return sqlFunction("nextval", [{args: [Types.Regclass<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgColumnIsUpdatable(this: Types.Regclass<1>, a1: Types.Int2<1> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<1>
    pgColumnIsUpdatable(this: Types.Regclass<0 | 1>, a1: Types.Int2<0 | 1> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    pgColumnIsUpdatable(this: Types.Regclass<number>, a1: Types.Int2<number> | Types.Input<Types.Int2<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Bool<0 | 1>
    pgColumnIsUpdatable(...args: unknown[]) {
        return sqlFunction("pg_column_is_updatable", [{args: [Types.Regclass<0 | 1>, Types.Int2<0 | 1>, Types.Bool<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgExtensionConfigDump(this: Types.Regclass<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Void<1>
    pgExtensionConfigDump(this: Types.Regclass<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Void<0 | 1>
    pgExtensionConfigDump(this: Types.Regclass<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Void<0 | 1>
    pgExtensionConfigDump(...args: unknown[]) {
        return sqlFunction("pg_extension_config_dump", [{args: [Types.Regclass<0 | 1>, Types.Text<0 | 1>], ret: Types.Void<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgGetReplicaIdentityIndex(this: Types.Regclass<1>): Types.Regclass<1>
    pgGetReplicaIdentityIndex(this: Types.Regclass<0 | 1>): Types.Regclass<0 | 1>
    pgGetReplicaIdentityIndex(this: Types.Regclass<number>): Types.Regclass<0 | 1>
    pgGetReplicaIdentityIndex(...args: unknown[]) {
        return sqlFunction("pg_get_replica_identity_index", [{args: [Types.Regclass<0 | 1>], ret: Types.Regclass<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgIndexColumnHasProperty(this: Types.Regclass<1>, a1: Types.Int4<1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    pgIndexColumnHasProperty(this: Types.Regclass<0 | 1>, a1: Types.Int4<0 | 1> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    pgIndexColumnHasProperty(this: Types.Regclass<number>, a1: Types.Int4<number> | Types.Input<Types.Int4<0 | 1>>, a2: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    pgIndexColumnHasProperty(...args: unknown[]) {
        return sqlFunction("pg_index_column_has_property", [{args: [Types.Regclass<0 | 1>, Types.Int4<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgIndexHasProperty(this: Types.Regclass<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<1>
    pgIndexHasProperty(this: Types.Regclass<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    pgIndexHasProperty(this: Types.Regclass<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Bool<0 | 1>
    pgIndexHasProperty(...args: unknown[]) {
        return sqlFunction("pg_index_has_property", [{args: [Types.Regclass<0 | 1>, Types.Text<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgIndexesSize(this: Types.Regclass<1>): Types.Int8<1>
    pgIndexesSize(this: Types.Regclass<0 | 1>): Types.Int8<0 | 1>
    pgIndexesSize(this: Types.Regclass<number>): Types.Int8<0 | 1>
    pgIndexesSize(...args: unknown[]) {
        return sqlFunction("pg_indexes_size", [{args: [Types.Regclass<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgNextoid(this: Types.Regclass<1>, a1: Types.Name<1>, a2: Types.Regclass<1>): Types.Oid<1>
    pgNextoid(this: Types.Regclass<0 | 1>, a1: Types.Name<0 | 1>, a2: Types.Regclass<0 | 1>): Types.Oid<0 | 1>
    pgNextoid(this: Types.Regclass<number>, a1: Types.Name<number>, a2: Types.Regclass<number>): Types.Oid<0 | 1>
    pgNextoid(...args: unknown[]) {
        return sqlFunction("pg_nextoid", [{args: [Types.Regclass<0 | 1>, Types.Name<0 | 1>, Types.Regclass<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgPartitionAncestors(this: Types.Regclass<1>): Types.FromItem<{relid: Types.Regclass<1>}>
    pgPartitionAncestors(this: Types.Regclass<0 | 1>): Types.FromItem<{relid: Types.Regclass<0 | 1>}>
    pgPartitionAncestors(this: Types.Regclass<number>): Types.FromItem<{relid: Types.Regclass<0 | 1>}>
    pgPartitionAncestors(...args: unknown[]) {
        return sqlFunction("pg_partition_ancestors", [{args: [Types.Regclass<0 | 1>], ret: Types.FromItem.ofSchema({relid: Types.Regclass<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgPartitionRoot(this: Types.Regclass<1>): Types.Regclass<1>
    pgPartitionRoot(this: Types.Regclass<0 | 1>): Types.Regclass<0 | 1>
    pgPartitionRoot(this: Types.Regclass<number>): Types.Regclass<0 | 1>
    pgPartitionRoot(...args: unknown[]) {
        return sqlFunction("pg_partition_root", [{args: [Types.Regclass<0 | 1>], ret: Types.Regclass<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgPartitionTree(this: Types.Regclass<1>): Types.FromItem<{relid: Types.Regclass<1>, parentrelid: Types.Regclass<1>, isleaf: Types.Bool<1>, level: Types.Int4<1>}>
    pgPartitionTree(this: Types.Regclass<0 | 1>): Types.FromItem<{relid: Types.Regclass<0 | 1>, parentrelid: Types.Regclass<0 | 1>, isleaf: Types.Bool<0 | 1>, level: Types.Int4<0 | 1>}>
    pgPartitionTree(this: Types.Regclass<number>): Types.FromItem<{relid: Types.Regclass<0 | 1>, parentrelid: Types.Regclass<0 | 1>, isleaf: Types.Bool<0 | 1>, level: Types.Int4<0 | 1>}>
    pgPartitionTree(...args: unknown[]) {
        return sqlFunction("pg_partition_tree", [{args: [Types.Regclass<0 | 1>], ret: Types.FromItem.ofSchema({relid: Types.Regclass<0 | 1>, parentrelid: Types.Regclass<0 | 1>, isleaf: Types.Bool<0 | 1>, level: Types.Int4<0 | 1>}), isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgRelationFilenode(this: Types.Regclass<1>): Types.Oid<1>
    pgRelationFilenode(this: Types.Regclass<0 | 1>): Types.Oid<0 | 1>
    pgRelationFilenode(this: Types.Regclass<number>): Types.Oid<0 | 1>
    pgRelationFilenode(...args: unknown[]) {
        return sqlFunction("pg_relation_filenode", [{args: [Types.Regclass<0 | 1>], ret: Types.Oid<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgRelationFilepath(this: Types.Regclass<1>): Types.Text<1>
    pgRelationFilepath(this: Types.Regclass<0 | 1>): Types.Text<0 | 1>
    pgRelationFilepath(this: Types.Regclass<number>): Types.Text<0 | 1>
    pgRelationFilepath(...args: unknown[]) {
        return sqlFunction("pg_relation_filepath", [{args: [Types.Regclass<0 | 1>], ret: Types.Text<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgRelationIsPublishable(this: Types.Regclass<1>): Types.Bool<1>
    pgRelationIsPublishable(this: Types.Regclass<0 | 1>): Types.Bool<0 | 1>
    pgRelationIsPublishable(this: Types.Regclass<number>): Types.Bool<0 | 1>
    pgRelationIsPublishable(...args: unknown[]) {
        return sqlFunction("pg_relation_is_publishable", [{args: [Types.Regclass<0 | 1>], ret: Types.Bool<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgRelationIsUpdatable(this: Types.Regclass<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Int4<1>
    pgRelationIsUpdatable(this: Types.Regclass<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Int4<0 | 1>
    pgRelationIsUpdatable(this: Types.Regclass<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Int4<0 | 1>
    pgRelationIsUpdatable(...args: unknown[]) {
        return sqlFunction("pg_relation_is_updatable", [{args: [Types.Regclass<0 | 1>, Types.Bool<0 | 1>], ret: Types.Int4<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgRelationSize(this: Types.Regclass<1>): Types.Int8<1>
    pgRelationSize(this: Types.Regclass<0 | 1>): Types.Int8<0 | 1>
    pgRelationSize(this: Types.Regclass<number>): Types.Int8<0 | 1>
    pgRelationSize(this: Types.Regclass<1>, a1: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Int8<1>
    pgRelationSize(this: Types.Regclass<0 | 1>, a1: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Int8<0 | 1>
    pgRelationSize(this: Types.Regclass<number>, a1: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Int8<0 | 1>
    pgRelationSize(...args: unknown[]) {
        return sqlFunction("pg_relation_size", [{args: [Types.Regclass<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regclass<0 | 1>, Types.Text<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgSequenceLastValue(this: Types.Regclass<1>): Types.Int8<1>
    pgSequenceLastValue(this: Types.Regclass<0 | 1>): Types.Int8<0 | 1>
    pgSequenceLastValue(this: Types.Regclass<number>): Types.Int8<0 | 1>
    pgSequenceLastValue(...args: unknown[]) {
        return sqlFunction("pg_sequence_last_value", [{args: [Types.Regclass<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTableSize(this: Types.Regclass<1>): Types.Int8<1>
    pgTableSize(this: Types.Regclass<0 | 1>): Types.Int8<0 | 1>
    pgTableSize(this: Types.Regclass<number>): Types.Int8<0 | 1>
    pgTableSize(...args: unknown[]) {
        return sqlFunction("pg_table_size", [{args: [Types.Regclass<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    pgTotalRelationSize(this: Types.Regclass<1>): Types.Int8<1>
    pgTotalRelationSize(this: Types.Regclass<0 | 1>): Types.Int8<0 | 1>
    pgTotalRelationSize(this: Types.Regclass<number>): Types.Int8<0 | 1>
    pgTotalRelationSize(...args: unknown[]) {
        return sqlFunction("pg_total_relation_size", [{args: [Types.Regclass<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    setval(this: Types.Regclass<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<1>
    setval(this: Types.Regclass<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    setval(this: Types.Regclass<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>): Types.Int8<0 | 1>
    setval(this: Types.Regclass<1>, a1: Types.Int8<1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>): Types.Int8<1>
    setval(this: Types.Regclass<0 | 1>, a1: Types.Int8<0 | 1> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>): Types.Int8<0 | 1>
    setval(this: Types.Regclass<number>, a1: Types.Int8<number> | Types.Input<Types.Int8<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>): Types.Int8<0 | 1>
    setval(...args: unknown[]) {
        return sqlFunction("setval", [{args: [Types.Regclass<0 | 1>, Types.Int8<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}, {args: [Types.Regclass<0 | 1>, Types.Int8<0 | 1>, Types.Bool<0 | 1>], ret: Types.Int8<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tableToXml(this: Types.Regclass<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<1>
    tableToXml(this: Types.Regclass<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    tableToXml(this: Types.Regclass<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    tableToXml(...args: unknown[]) {
        return sqlFunction("table_to_xml", [{args: [Types.Regclass<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tableToXmlAndXmlschema(this: Types.Regclass<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<1>
    tableToXmlAndXmlschema(this: Types.Regclass<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    tableToXmlAndXmlschema(this: Types.Regclass<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    tableToXmlAndXmlschema(...args: unknown[]) {
        return sqlFunction("table_to_xml_and_xmlschema", [{args: [Types.Regclass<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

    tableToXmlschema(this: Types.Regclass<1>, a1: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<1>
    tableToXmlschema(this: Types.Regclass<0 | 1>, a1: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<0 | 1> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<0 | 1> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    tableToXmlschema(this: Types.Regclass<number>, a1: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a2: Types.Bool<number> | Types.Input<Types.Bool<0 | 1>>, a3: Types.Text<number> | Types.Input<Types.Text<0 | 1>>): Types.Xml<0 | 1>
    tableToXmlschema(...args: unknown[]) {
        return sqlFunction("table_to_xmlschema", [{args: [Types.Regclass<0 | 1>, Types.Bool<0 | 1>, Types.Bool<0 | 1>, Types.Text<0 | 1>], ret: Types.Xml<0 | 1>, isOperator: false, isReserved: false, isVariadic: false}], [this, ...args]);
    }

}
