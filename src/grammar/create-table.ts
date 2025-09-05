import { XOR } from "ts-xor";
import * as Types from "../types";
import { compileClauses, Identifier, sqlJoin } from "./utils";
import { Context } from "../expression";
import { RawBuilder, sql } from "kysely";
import invariant from "tiny-invariant";
import { MakeNonNullable, MakeNullable } from "../types/any";
import { BareColumnExpression } from "../query/values";

// CREATE [ [ GLOBAL | LOCAL ] { TEMPORARY | TEMP } | UNLOGGED ] TABLE [ IF NOT EXISTS ] table_name ( [
//   { column_name data_type [ STORAGE { PLAIN | EXTERNAL | EXTENDED | MAIN | DEFAULT } ] [ COMPRESSION compression_method ] [ COLLATE collation ] [ column_constraint [ ... ] ]
//     | table_constraint
//     | LIKE source_table [ like_option ... ] }
//     [, ... ]
// ] )
// [ INHERITS ( parent_table [, ... ] ) ]
// [ PARTITION BY { RANGE | LIST | HASH } ( { column_name | ( expression ) } [ COLLATE collation ] [ opclass ] [, ... ] ) ]
// [ USING method ]
// [ WITH ( storage_parameter [= value] [, ... ] ) | WITHOUT OIDS ]
// [ ON COMMIT { PRESERVE ROWS | DELETE ROWS | DROP } ]
// [ TABLESPACE tablespace_name ]

// CREATE [ [ GLOBAL | LOCAL ] { TEMPORARY | TEMP } | UNLOGGED ] TABLE [ IF NOT EXISTS ] table_name
//     OF type_name [ (
//   { column_name [ WITH OPTIONS ] [ column_constraint [ ... ] ]
//     | table_constraint }
//     [, ... ]
// ) ]
// [ PARTITION BY { RANGE | LIST | HASH } ( { column_name | ( expression ) } [ COLLATE collation ] [ opclass ] [, ... ] ) ]
// [ USING method ]
// [ WITH ( storage_parameter [= value] [, ... ] ) | WITHOUT OIDS ]
// [ ON COMMIT { PRESERVE ROWS | DELETE ROWS | DROP } ]
// [ TABLESPACE tablespace_name ]

// CREATE [ [ GLOBAL | LOCAL ] { TEMPORARY | TEMP } | UNLOGGED ] TABLE [ IF NOT EXISTS ] table_name
//     PARTITION OF parent_table [ (
//   { column_name [ WITH OPTIONS ] [ column_constraint [ ... ] ]
//     | table_constraint }
//     [, ... ]
// ) ] { FOR VALUES partition_bound_spec | DEFAULT }
// [ PARTITION BY { RANGE | LIST | HASH } ( { column_name | ( expression ) } [ COLLATE collation ] [ opclass ] [, ... ] ) ]
// [ USING method ]
// [ WITH ( storage_parameter [= value] [, ... ] ) | WITHOUT OIDS ]
// [ ON COMMIT { PRESERVE ROWS | DELETE ROWS | DROP } ]
// [ TABLESPACE tablespace_name ]

// and like_option is:

// { INCLUDING | EXCLUDING } { COMMENTS | COMPRESSION | CONSTRAINTS | DEFAULTS | GENERATED | IDENTITY | INDEXES | STATISTICS | STORAGE | ALL }

// and partition_bound_spec is:

// IN ( partition_bound_expr [, ...] ) |
// FROM ( { partition_bound_expr | MINVALUE | MAXVALUE } [, ...] )
//   TO ( { partition_bound_expr | MINVALUE | MAXVALUE } [, ...] ) |
// WITH ( MODULUS numeric_literal, REMAINDER numeric_literal )

// index_parameters in UNIQUE, PRIMARY KEY, and EXCLUDE constraints are:

// [ INCLUDE ( column_name [, ... ] ) ]
// [ WITH ( storage_parameter [= value] [, ... ] ) ]
// [ USING INDEX TABLESPACE tablespace_name ]

// exclude_element in an EXCLUDE constraint is:

// { column_name | ( expression ) } [ COLLATE collation ] [ opclass [ ( opclass_parameter = value [, ... ] ) ] ] [ ASC | DESC ] [ NULLS { FIRST | LAST } ]

// referential_action in a FOREIGN KEY/REFERENCES constraint is:

// { NO ACTION | RESTRICT | CASCADE | SET NULL [ ( column_name [, ... ] ) ] | SET DEFAULT [ ( column_name [, ... ] ) ] }

export class CreateTable<T extends Table> {
  public tableName: string;
  public tableInstance: T & { [key: string]: Types.Any & ColumnMeta };

  constructor(
    public tableDef: TableDefinition<T>,
    public createOpts: { ifNotExists?: true } | undefined,
  ) {
    this.tableName = tableDef.tableName ?? tableDef.name;
    invariant(this.tableName, "Table definition must have a tableName property or be a named class");
    this.tableInstance = this.createTableInstance();
  }

  createTableInstance() {
    const instance = new this.tableDef();
    for (const key of Object.keys(instance)) {
      // Skip inherited properties from Table base class
      if (key === '__brand') continue;
      
      const columnDef = instance[key as keyof T];
      invariant(isColumn(columnDef), `Property ${key} is not a valid column definition`);
      columnDef.v = new BareColumnExpression(key);
    }
    return instance as T & { [key: string]: Types.Any & ColumnMeta };
  }

  compile() {
    const ctx = Context.new({ inDdl: true });
    const { ifNotExists } = this.createOpts ?? {};
    const { temporary, unlogged, tableConstraints, like, ...rest } = this.tableDef.opts?.(this.tableInstance) ?? {};
    const parts = [
      sql`CREATE`,
      compileClauses(
        { temporary, unlogged },
        {
          temporary: () => sql`TEMPORARY`,
          unlogged: () => sql`UNLOGGED`,
        },
      ),
      sql`TABLE`,
      compileClauses(
        { ifNotExists },
        {
          ifNotExists: () => sql`IF NOT EXISTS`,
        },
      ),
      sql.ref(this.tableName),
    ];

    const columnDefs = [
      compileColumns(this.tableInstance, ctx),
      ...(tableConstraints ?? []).map((constraint) => compileTableConstraint(constraint, ctx)),
    ].filter(Boolean);

    const afterTable = compileClauses(rest, {
      inherits: () => this.todo(),
      partitionBy: () => this.todo(),
      using: () => this.todo(),
      with: () => this.todo(),
      onCommit: () => this.todo(),
      tablespace: () => this.todo(),
    });

    return sql`${sqlJoin(parts, sql` `)} (${sqlJoin(columnDefs)})${afterTable ? sql` ${afterTable}` : sql``}`;
  }

  todo(): RawBuilder<any> {
    throw new Error("Not implemented");
  }
}

const compileColumns = (tableInstance: { [key: string]: Types.Any & ColumnMeta }, ctx: Context) => {
  return sqlJoin(
    Object.entries(tableInstance)
      .filter(([_key, value]) => isColumn(value))
      .map(([columnName, columnDef]) => {
      const cls = columnDef.getClass();
      const typeString = cls.typeString();
      invariant(
        typeString,
        `Data type for column ${columnName} must have a type string. This indicates the type is not a concrete type (it needs a parameter using ".of": ${cls.name})`,
      );

      const [optsAndConstraints, ...constraints] = (columnDef as ColumnMeta).getClass().options;
      const { storage, compression, collate, ...combinedConstraints } = optsAndConstraints ?? {};

      return sqlJoin(
        [
          sql.ref(columnName),
          sql.raw(typeString),
          storage &&
            sql`STORAGE ${
              {
                plain: sql`PLAIN`,
                external: sql`EXTERNAL`,
                extended: sql`EXTENDED`,
                main: sql`MAIN`,
                default: sql`DEFAULT`,
              }[storage]
            }`,
          compression && sql`COMPRESSION ${compression === "default" ? sql`DEFAULT` : compression}`,
          collate && sql`COLLATE ${collate}`,
          compileColumnConstraint(combinedConstraints, ctx),
          ...constraints.map((constraint) => compileColumnConstraint(constraint, ctx)),
        ],
        sql` `,
      );
    }),
  );
};

export type ColumnMeta = {
  getClass(): {
    options: [
      (ColumnOptions & CombinedColumnConstraints<any>)?,
      ...(SingleColumnConstraint<any> | CombinedColumnConstraints<any>)[],
    ];
  };
};

type ColumnWithNullability<
  T extends typeof Types.Any<unknown, 0 | 1>,
  C extends CombinedColumnConstraints<T["prototype"]>,
> = C extends { notNull: true } | { primaryKey: true }
  ? MakeNonNullable<InstanceType<T>> & ColumnMeta
  : MakeNullable<InstanceType<T>> & ColumnMeta;

export const column = <T extends typeof Types.Any<unknown, 0 | 1>, C extends CombinedColumnConstraints<T["prototype"]>>(
  DataType: T,
  combined?: C & ColumnOptions,
  ...constraints: (SingleColumnConstraint<T["prototype"]> | CombinedColumnConstraints<T["prototype"]>)[]
): ColumnWithNullability<T, C> => {
  class ExtendedType extends (DataType as any) {
    static options = [...(combined ? [combined] : []), ...(constraints ?? [])];
  }
  return ExtendedType.new(new BareColumnExpression("TODO")) as ColumnWithNullability<T, C>;
};

const isColumn = (v: unknown): v is Types.Any & ColumnMeta => {
  return v instanceof Types.Any && "options" in (v.constructor as any);
};

export class Table {
  __brand: "Table" = "Table";
}

export type TableDefinition<T extends Table> = typeof Table &{
  new (): T;
  tableName?: string;
  opts?: (row: T) => TableOpts<T>;
};

export type TableOpts<T extends Table> = PreambleOpts & {
  tableConstraints?: TableConstraint<T>[];
  like?: never;
  inherits?: never;
  partitionBy?: never;
  using?: never;
  with?: never;
  onCommit?: never;
  tablespace?: never;
};

export const createTable = <T extends Table>(
  tableDef: TableDefinition<T>,
  createOpts?: { ifNotExists?: true },
): CreateTable<T> => {
  return new CreateTable(tableDef, createOpts);
};

type PreambleOpts = { temporary?: true; unlogged?: true };

type ColumnOptions = {
  storage?: "plain" | "external" | "extended" | "main" | "default";
  compression?: "default" | Identifier;
  collate?: Identifier;
};

// where column_constraint is:

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

export type CombinedColumnConstraints<T extends Types.Any<unknown, 0 | 1>> = NonNullConstraint &
  NullConstraint &
  CheckConstraint &
  DefaultConstraint<T> &
  GeneratedConstraint<T> &
  UniqueConstraint &
  PrimaryKeyConstraint &
  ReferencesConstraint<T>;

export type SingleColumnConstraint<T extends Types.Any<unknown, 0 | 1>> = XOR<
  CheckConstraint,
  DefaultConstraint<T>,
  GeneratedConstraint<T>,
  UniqueConstraint,
  ReferencesConstraint<T>
> & {
  constraint?: Identifier; // The name of the constraint
} & ConstraintOps;

type ConstraintOps = { initially?: "deferred" | "immediate" } & XOR<{ deferrable?: true }, { notDeferrable?: true }>;

type NonNullConstraint = { notNull?: true };
type NullConstraint = { null?: true };
export type CheckConstraint = { check?: [() => Types.Bool<0 | 1>, { noInherit?: boolean }?] };
const compileCheckConstraint = ({ check }: CheckConstraint, ctx: Context) => {
  invariant(check, "Check constraint must have an expression");
  const [expr, opts] = check;
  return (
    compileClauses(
      { expr, ...opts },
      {
        expr: (e) => sql`CHECK (${e().toExpression().compile(ctx)})`,
        noInherit: () => sql`NO INHERIT`,
      },
    ) ?? sql``
  );
};

type DefaultConstraint<T extends Types.Any<unknown, 0 | 1>> = { default?: T };
type GeneratedConstraint<T extends Types.Any<unknown, 0 | 1>> = XOR<
  { generatedAlwaysAs?: [() => T, { stored: true }] },
  { generatedAlwaysAsIdentity?: true },
  { generatedByDefaultAsIdentity?: true }
>;
type UniqueConstraint = {
  unique?: true | IndexParameters | [true | IndexParameters, { nulls?: "distinct" | "notDistinct" }];
};
type PrimaryKeyConstraint = { primaryKey?: true | IndexParameters };
type ReferencesConstraint<T extends Table> = {
  references?: [
    reftable: Identifier,
    refcolumn: Identifier,
    { match?: "full" | "partial" | "simple"; onDelete?: ReferentialAction<T>; onUpdate?: ReferentialAction<T> },
  ];
};

type IndexParameters = never;

const compileColumnConstraint = <T extends Types.Any<unknown, 0 | 1>>(
  constraint: SingleColumnConstraint<T> | CombinedColumnConstraints<T>,
  ctx: Context,
) => {
  return compileClauses(constraint, {
    constraint: (name) => sql`CONSTRAINT ${name}`,
    notNull: () => sql`NOT NULL`,
    null: () => sql`NULL`,
    check: (expr) => compileCheckConstraint({ check: expr }, ctx),
    default: (expr) => sql`DEFAULT ${expr.toExpression().compile(ctx)}`,
    generatedAlwaysAs: ([expr]) => sql`GENERATED ALWAYS AS (${expr().toExpression().compile(ctx)}) STORED`,
    generatedAlwaysAsIdentity: () => sql`GENERATED ALWAYS AS IDENTITY`,
    generatedByDefaultAsIdentity: () => sql`GENERATED BY DEFAULT AS IDENTITY`,
    unique: () => sql`UNIQUE`,
    primaryKey: () => sql`PRIMARY KEY`,
    references: ([reftable, refcolumn, clauses]) =>
      compileReferencesGenericClause<T>({
        references: [reftable, [refcolumn]],
        ...clauses,
      }),
    ...constraintOps(),
  });
};

const compileMatch = (match: "full" | "partial" | "simple") => {
  return { full: sql`MATCH FULL`, partial: sql`MATCH PARTIAL`, simple: sql`MATCH SIMPLE` }[match];
};

const constraintOps = () => ({
  deferrable: () => sql`DEFERRABLE`,
  notDeferrable: () => sql`NOT DEFERRABLE`,
  initially: (value: "deferred" | "immediate") =>
    sql`INITIALLY ${value === "deferred" ? sql`DEFERRED` : sql`IMMEDIATE`}`,
});

const compileReferentialAction = (action: ReferentialAction<any>) => {
  return compileClauses(action, {
    noAction: () => sql`NO ACTION`,
    restrict: () => sql`RESTRICT`,
    cascade: () => sql`CASCADE`,
    setNull: (cols) => (cols === true ? sql`SET NULL` : sql`SET NULL (${sqlJoin(cols.map(sql.ref))})`),
    setDefault: (cols) => (cols === true ? sql`SET DEFAULT` : sql`SET DEFAULT (${sqlJoin(cols.map(sql.ref))})`),
  });
};
// and table_constraint is:

// [ CONSTRAINT constraint_name ]
// { CHECK ( expression ) [ NO INHERIT ] |
//   UNIQUE [ NULLS [ NOT ] DISTINCT ] ( column_name [, ... ] ) index_parameters |
//   PRIMARY KEY ( column_name [, ... ] ) index_parameters |
//   EXCLUDE [ USING index_method ] ( exclude_element WITH operator [, ... ] ) index_parameters [ WHERE ( predicate ) ] |
//   FOREIGN KEY ( column_name [, ... ] ) REFERENCES reftable [ ( refcolumn [, ... ] ) ]
//     [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ] [ ON DELETE referential_action ] [ ON UPDATE referential_action ] }
// [ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]
type TableConstraint<T extends Table> = XOR<CombinedTableConstraints<T>, SingleTableConstraint<T>>;

type CombinedTableConstraints<T extends Table> = CheckConstraint &
  UniqueTableConstraint<T> &
  PrimaryKeyTableConstraint<T> &
  ExcludeTableConstraint &
  ForeignKeyTableConstraint<T>;

type SingleTableConstraint<T extends Table> = XOR<
  CheckConstraint,
  UniqueTableConstraint<T>,
  PrimaryKeyTableConstraint<T>,
  ExcludeTableConstraint,
  ForeignKeyTableConstraint<T>
> & {
  constraint?: Identifier; // The name of the constraint
  initially?: "deferred" | "immediate";
} & XOR<{ deferrable?: true }, { notDeferrable?: true }>;

type UniqueTableConstraint<R> = {
  unique?:
    | [keyof R & string, ...(keyof R & string)[]]
    | [
        unique: [keyof R & string, ...(keyof R & string)[]],
        { nulls?: "distinct" | "notDistinct"; indexParameters?: IndexParameters },
      ];
};

const compileUniqueTableConstraint = <T extends object>(unique: UniqueTableConstraint<T>) => {
  const [cols, opts] =
    Array.isArray(unique.unique) && unique.unique.length === 2 && typeof unique.unique[1] !== "string"
      ? unique.unique
      : [unique.unique, undefined];
  invariant(typeof opts !== "string", "Invalid unique constraint options");
  invariant(Array.isArray(cols) && typeof cols[0] === "string", "Invalid unique constraint columns");
  const rest = compileClauses(
    { cols, ...(opts ?? {}) },
    {
      cols: (cols) =>
        sql`(${sqlJoin(
          cols.map((col) => {
            invariant(typeof col === "string", "Invalid column name in unique constraint");
            return sql.ref(col);
          }),
        )})`,
      nulls: (nulls) => sqlJoin([sql`NULLS`, nulls === "distinct" ? sql`DISTINCT` : sql`NOT DISTINCT`], sql` `),
      indexParameters: () => {
        throw new Error("Index parameters not implemented");
      },
    },
  );
  return sql`UNIQUE ${rest}`;
};

type PrimaryKeyTableConstraint<R> = {
  primaryKey?: (keyof R & string)[] | [(keyof R & string)[], { indexParameters?: IndexParameters }];
};

const compilePrimaryKey = (primaryKey: PrimaryKeyTableConstraint<any>) => {
  invariant(primaryKey.primaryKey, "Primary key constraint must have columns");
  const [cols, opts] =
    Array.isArray(primaryKey.primaryKey) && typeof primaryKey.primaryKey[0] === "string"
      ? ([primaryKey.primaryKey, undefined] as const)
      : primaryKey.primaryKey;
  invariant(typeof opts !== "string", "Invalid primary key options");
  invariant(Array.isArray(cols) && typeof cols[0] === "string", "Invalid unique constraint options");
  const rest = compileClauses(
    { cols, ...(opts ?? {}) },
    {
      cols: (cols) =>
        sql`(${sqlJoin(
          cols.map((col) => {
            invariant(typeof col === "string", "Invalid primary key options");
            return sql.ref(col);
          }),
        )})`,
      indexParameters: () => {
        throw new Error("Index parameters not implemented");
      },
    },
  );
  return sql`PRIMARY KEY ${rest}`;
};

type ExcludeTableConstraint = {
  exclude?: never;
};

type ForeignKeyTableConstraint<T extends Table> = {
  foreignKey?: [
    Identifier[],
    {
      references: [Identifier, Identifier[]];
      match?: "full" | "partial" | "simple";
      onDelete?: ReferentialAction<T>;
      onUpdate?: ReferentialAction<T>;
    },
  ];
};

type ReferencesGenericClause<T extends Table> = {
  references: [Identifier, Identifier[]];
  match?: "full" | "partial" | "simple";
  onDelete?: ReferentialAction<T>;
  onUpdate?: ReferentialAction<T>;
};

const compileForeignKey = <T extends Table>(foreignKey: ForeignKeyTableConstraint<T>) => {
  invariant(foreignKey.foreignKey, "Foreign key constraint must have columns and references");
  const [cols, clauses] = foreignKey.foreignKey;
  const rest = compileClauses(
    { cols, clauses },
    {
      cols: (cols) => sql`(${sqlJoin(cols)})`,
      clauses: (clauses) => compileReferencesGenericClause<T>(clauses),
    },
  );
  return sql`FOREIGN KEY ${rest}`;
};

const compileReferencesGenericClause = <T extends Table>(clauses: ReferencesGenericClause<T>) => {
  return (
    compileClauses(clauses, {
      references: ([reftable, refcolumn]) => sql`REFERENCES ${reftable} (${sqlJoin(refcolumn)})`,
      match: (match) => compileMatch(match),
      onDelete: (action) => sql`ON DELETE ${compileReferentialAction(action)}`,
      onUpdate: (action) => sql`ON UPDATE ${compileReferentialAction(action)}`,
    }) ?? sql``
  );
};

type ReferentialAction<T extends Table> = XOR<
  { noAction: true },
  { restrict: true },
  { cascade: true },
  { setNull: true | (keyof T & string)[] },
  { setDefault: true | (keyof T & string)[] }
>;

const compileTableConstraint = <T extends Table>(constraint: TableConstraint<T>, ctx: Context) => {
  return compileClauses(constraint, {
    constraint: (name) => sql`CONSTRAINT ${name}`,
    check: (expr) => compileCheckConstraint({ check: expr }, ctx),
    unique: (expr) => compileUniqueTableConstraint({ unique: expr }),
    primaryKey: (expr) => compilePrimaryKey({ primaryKey: expr }),
    exclude: () => {
      throw new Error("Exclude constraints not implemented");
    },
    foreignKey: (expr) => compileForeignKey({ foreignKey: expr }),
    ...constraintOps(),
  });
};
