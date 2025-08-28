// ALTER TABLE [ IF EXISTS ] [ ONLY ] name [ * ]
//     action [, ... ]
// ALTER TABLE [ IF EXISTS ] [ ONLY ] name [ * ]
//     RENAME [ COLUMN ] column_name TO new_column_name
// ALTER TABLE [ IF EXISTS ] [ ONLY ] name [ * ]
//     RENAME CONSTRAINT constraint_name TO new_constraint_name
// ALTER TABLE [ IF EXISTS ] name
//     RENAME TO new_name
// ALTER TABLE [ IF EXISTS ] name
//     SET SCHEMA new_schema
// ALTER TABLE ALL IN TABLESPACE name [ OWNED BY role_name [, ... ] ]
//     SET TABLESPACE new_tablespace [ NOWAIT ]
// ALTER TABLE [ IF EXISTS ] name
//     ATTACH PARTITION partition_name { FOR VALUES partition_bound_spec | DEFAULT }
// ALTER TABLE [ IF EXISTS ] name
//     DETACH PARTITION partition_name [ CONCURRENTLY | FINALIZE ]

// where action is one of:

//     ADD [ COLUMN ] [ IF NOT EXISTS ] column_name data_type [ COLLATE collation ] [ column_constraint [ ... ] ]
//     DROP [ COLUMN ] [ IF EXISTS ] column_name [ RESTRICT | CASCADE ]
//     ALTER [ COLUMN ] column_name [ SET DATA ] TYPE data_type [ COLLATE collation ] [ USING expression ]
//     ALTER [ COLUMN ] column_name SET DEFAULT expression
//     ALTER [ COLUMN ] column_name DROP DEFAULT
//     ALTER [ COLUMN ] column_name { SET | DROP } NOT NULL
//     ALTER [ COLUMN ] column_name SET EXPRESSION AS ( expression )
//     ALTER [ COLUMN ] column_name DROP EXPRESSION [ IF EXISTS ]
//     ALTER [ COLUMN ] column_name ADD GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY [ ( sequence_options ) ]
//     ALTER [ COLUMN ] column_name { SET GENERATED { ALWAYS | BY DEFAULT } | SET sequence_option | RESTART [ [ WITH ] restart ] } [...]
//     ALTER [ COLUMN ] column_name DROP IDENTITY [ IF EXISTS ]
//     ALTER [ COLUMN ] column_name SET STATISTICS { integer | DEFAULT }
//     ALTER [ COLUMN ] column_name SET ( attribute_option = value [, ... ] )
//     ALTER [ COLUMN ] column_name RESET ( attribute_option [, ... ] )
//     ALTER [ COLUMN ] column_name SET STORAGE { PLAIN | EXTERNAL | EXTENDED | MAIN | DEFAULT }
//     ALTER [ COLUMN ] column_name SET COMPRESSION compression_method
//     ADD table_constraint [ NOT VALID ]
//     ADD table_constraint_using_index
//     ALTER CONSTRAINT constraint_name [ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]
//     VALIDATE CONSTRAINT constraint_name
//     DROP CONSTRAINT [ IF EXISTS ]  constraint_name [ RESTRICT | CASCADE ]
//     DISABLE TRIGGER [ trigger_name | ALL | USER ]
//     ENABLE TRIGGER [ trigger_name | ALL | USER ]
//     ENABLE REPLICA TRIGGER trigger_name
//     ENABLE ALWAYS TRIGGER trigger_name
//     DISABLE RULE rewrite_rule_name
//     ENABLE RULE rewrite_rule_name
//     ENABLE REPLICA RULE rewrite_rule_name
//     ENABLE ALWAYS RULE rewrite_rule_name
//     DISABLE ROW LEVEL SECURITY
//     ENABLE ROW LEVEL SECURITY
//     FORCE ROW LEVEL SECURITY
//     NO FORCE ROW LEVEL SECURITY
//     CLUSTER ON index_name
//     SET WITHOUT CLUSTER
//     SET WITHOUT OIDS
//     SET ACCESS METHOD { new_access_method | DEFAULT }
//     SET TABLESPACE new_tablespace
//     SET { LOGGED | UNLOGGED }
//     SET ( storage_parameter [= value] [, ... ] )
//     RESET ( storage_parameter [, ... ] )
//     INHERIT parent_table
//     NO INHERIT parent_table
//     OF type_name
//     NOT OF
//     OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
//     REPLICA IDENTITY { DEFAULT | USING INDEX index_name | FULL | NOTHING }

// and partition_bound_spec is:

// IN ( partition_bound_expr [, ...] ) |
// FROM ( { partition_bound_expr | MINVALUE | MAXVALUE } [, ...] )
//   TO ( { partition_bound_expr | MINVALUE | MAXVALUE } [, ...] ) |
// WITH ( MODULUS numeric_literal, REMAINDER numeric_literal )

// and column_constraint is:

// [ CONSTRAINT constraint_name ]
// { NOT NULL |
//   NULL |
//   CHECK ( expression ) [ NO INHERIT ] |
//   DEFAULT default_expr |
//   GENERATED ALWAYS AS ( generation_expr ) STORED |
//   GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY [ ( sequence_options ) ] |
//   UNIQUE [ NULLS [ NOT ] DISTINCT ] index_parameters |
//   PRIMARY KEY index_parameters |
//   REFERENCES reftable [ ( refcolumn ) ] [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ]
//     [ ON DELETE referential_action ] [ ON UPDATE referential_action ] }
// [ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]

// and table_constraint is:

// [ CONSTRAINT constraint_name ]
// { CHECK ( expression ) [ NO INHERIT ] |
//   UNIQUE [ NULLS [ NOT ] DISTINCT ] ( column_name [, ... ] ) index_parameters |
//   PRIMARY KEY ( column_name [, ... ] ) index_parameters |
//   EXCLUDE [ USING index_method ] ( exclude_element WITH operator [, ... ] ) index_parameters [ WHERE ( predicate ) ] |
//   FOREIGN KEY ( column_name [, ... ] ) REFERENCES reftable [ ( refcolumn [, ... ] ) ]
//     [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ] [ ON DELETE referential_action ] [ ON UPDATE referential_action ] }
// [ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]

// and table_constraint_using_index is:

//     [ CONSTRAINT constraint_name ]
//     { UNIQUE | PRIMARY KEY } USING INDEX index_name
//     [ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]

// index_parameters in UNIQUE, PRIMARY KEY, and EXCLUDE constraints are:

// [ INCLUDE ( column_name [, ... ] ) ]
// [ WITH ( storage_parameter [= value] [, ... ] ) ]
// [ USING INDEX TABLESPACE tablespace_name ]

// exclude_element in an EXCLUDE constraint is:

// { column_name | ( expression ) } [ COLLATE collation ] [ opclass [ ( opclass_parameter = value [, ... ] ) ] ] [ ASC | DESC ] [ NULLS { FIRST | LAST } ]

// referential_action in a FOREIGN KEY/REFERENCES constraint is:

// { NO ACTION | RESTRICT | CASCADE | SET NULL [ ( column_name [, ... ] ) ] | SET DEFAULT [ ( column_name [, ... ] ) ] }

type Expand<T> = T extends object ? { [K in keyof T]: T[K] } : T;

type Chain<B extends Builder, K extends keyof B> = Pick<B, K> &
  (K extends B["$optionals"][number] ? (B[K] extends (...args: any) => any ? ReturnType<B[K]> : {}) : {});

type Ast<B extends object> = {
  [k in keyof B]: B[k] extends (...args: any) => any ? Parameters<B[k]> : never;
};

const clone = <T>(obj: T, attrs: Partial<T>): T => Object.assign(Object.create(obj), attrs);

const Repeated = Symbol("Repeated");

abstract class Builder<Context extends object = any> {
  //public $ast: Partial<Ast<this>> = {};
  constructor(protected $ctx: Context) {}

  public $clone<T extends this>(this: T, $ast: this["$ast"]): this {
    return Object.assign(Object.create(this), attrs);
  }

  protected $chain<K extends keyof this>(...keys: K[]): Chain<this, K> {
    return this as Chain<this, K>;
  }

  $start(): object {
    return {};
  }
  $end(): object {
    return {};
  }

  $optionals: readonly (keyof this)[] = [];

  static repeated<Then extends object>(end: () => Then) {
    return class RepeatedBuilder extends this {
      [Repeated] = true;
      $end = () => ({ ...end(), ...this.$start() });
    };
  }
}

const alterTable = class extends Builder {
  alterTable = (tableName: string, star?: "*") =>
    class extends Builder {
      $optionals = ["ifExists", "only"] as const;
      ifExists = () => this.$chain("only");
      only = () => this.actions();
      $compileArgs = this.$args;
    };
  actions = () => action.repeated(() => ({ end: true }));
}.new;

const a: AlterTableBuilder<{}> = AlterTableBuilder.new({});
a.alterTable("table_name").ifExists().only().add("column_name", "data_type");

const action = class extends Builder<{}> {
  $optionals = [] as const;
  $start = () => this.$chain("add");
  add = (columnName: string, dataType: string) => this.$end() as ReturnType<(typeof this)["$end"]>;
};

type Repeated<T, F extends (then: () => T) => Builder, End extends object> = ReturnType<F> & Repeated<T, F, End>;

const repeated = <T, F extends (then: () => T) => Builder, End extends object>(clause: F, end: () => End) => {
  return clause(() => ({ ...repeated(clause, end), ...end() }));
};
