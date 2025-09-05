import * as Types from "../../types";
import { MakeNonNullable, MakeNullable } from "../../types/any";
import { Table } from "../create-table";

export class Builder {
  static grammar: string;
  static references: string[]
  constructor() {}
}

const builder = (grammar: string, references?: string[]): typeof Builder => {
  return class extends Builder {
    static override grammar = grammar;
    static override references = references ?? []
  };
};

// ALTER TABLE [ IF EXISTS ] [ ONLY ] name [ * ] action [, ... ]
class RootBuilder<T extends Table> extends builder("ALTER TABLE [ IF EXISTS ] [ ONLY ] `name` [ * ] `action` [, ... ]", ['action']) {
  constructor(public $table?: T) {
    super();
  }

  override $fn0 = <T extends Table>(name: T, star?: "*") =>
    new RootBuilder(name).$from(this.super.$fn0(compile(name), compile(star)));
  action = () => action(this.$table);
}

class AddBuilder<T extends Table, C extends string, DT extends Types.Any> extends builder(
  "ADD [ COLUMN ] [ IF NOT EXISTS ] `column_name` `data_type` [ COLLATE `collation` ] [ `column_constraint` [ ... ] ]",
  ['column_constraint']) {
  constructor(
    public caller?: T,
    public $columnName?: string,
    public $dataType?: Types.Any,
  ) {
    super();
  }
  override $fn0 = (columnName: string, dataType: Types.Any) =>
    new Action(columnName, dataType).$from(this.super.$fn0(compile(columnName), compile(dataType)));
  override collate = class Collate extends this.Collate {
    $fn0 = (collation: string) => super.$fn0(compile(collation));
  };
  columnConstraint = () => columnConstraint(this.$dataType);
}

const ActionBuilder = AddBuilder;

class ColumnConstraintBuilder<DT extends Types.Any> extends builder(
  `[ CONSTRAINT \`constraint_name\` ]
{ NOT NULL |
  NULL |
  CHECK ( \`expression\` ) [ NO INHERIT ] |
  DEFAULT \`default_expr\` |
  GENERATED ALWAYS AS ( \`generation_expr\` ) STORED |
  GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY [ ( \`sequence_options\` ) ] |
  UNIQUE [ NULLS [ NOT ] DISTINCT ] \`index_parameters\` |
  PRIMARY KEY \`index_parameters\` |
  REFERENCES \`reftable\` [ ( \`refcolumn\` ) ] [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ]
    [ ON DELETE \`referential_action\` ] [ ON UPDATE \`referential_action\` ] }
[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]`,
) {
  constructor(public $dataType?: DT) {
    super();
  }
  override notNull = () =>
    new ColumnConstraint<MakeNonNullable<DT>>(this.$dataType as MakeNonNullable<DT>).$from(super.nonNull());
}

export const builders = {
  RootBuilder,
  ActionBuilder,
  ColumnConstraintBuilder,
};

const gram = <C>() => <T extends ((c: C) => any)[]>(
  strings: TemplateStringsArray, 
  ...args: T
) => {
  // strings[0] is the text before the first arg ('color: ')
  // strings[1] is the text between the args ('; font-size: ')
  // strings[2] is the text after the last arg ('px;')
  
  return {strings, args}
}

const addContext =  <N extends object>(newCtx: N) => <C extends object>(ctx: C) => ({...ctx, ...newCtx});

const test = gram()`ALTER TABLE [ IF EXISTS ] [ ONLY ] name${addContext({foo: 1})} [ * ] action${ref(() => add, (_, aCtx) => ({table: aCtx.table}))} [, ... ]`;
const add = gram()`ADD [ COLUMN ] [ IF NOT EXISTS ] column_name data_type [ COLLATE collation ] [ column_constraint [ ... ] ]`

type ConstraintContext = {dataType: Types.Any};
const colConstraint = gram<ConstraintContext>()`[ CONSTRAINT constraint_name ]
{ NOT NULL${<C extends ConstraintContext>({dataType}: C) => dataType as MakeNonNullable<C['dataType']>} |
  NULL${<C extends ConstraintContext>({dataType}: C) => dataType as MakeNullable<C['dataType']>} |
  CHECK ( expression )${fn(({table}) => (cb: (row: Row<Table>) => Types.Bool<0 | 1>) => {cb(new table())})} [ NO INHERIT ] |
  DEFAULT default_expr${fn(({table}) => (cb: (row: Row<Table>) => Types.Any<0 | 1>) => {cb(new table())})} |
  GENERATED ALWAYS AS ( generation_expr )${fn(({table}) => (cb: (row: Row<Table>) => Types.Any<0 | 1>) => {cb(new table())})} STORED |
  GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY [ ( sequence_options ) ] |
  UNIQUE [ NULLS [ NOT ] DISTINCT ] index_parameters |
  PRIMARY KEY index_parameters |
  REFERENCES reftable [ ( refcolumn ) ]${fn(() => (refTable, refColumn) => {})} [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ]
    [ ON DELETE referential_action ] [ ON UPDATE referential_action ] }
[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]`


type Foo<T extends number>  = {
  foo: (t: T) => T
}

const f: Foo<1>;
f.foo


//alter = <K>(t: K) => <C extends (ctx: )



function foo<T extends {a: number | string}>(this: T) {
  return this.a as T['a'];
}

class A {
  a: 1 = 1;
  foo = (foo as typeof foo<this>).bind(this);
  bar = () => this.a;
}

const a = new A() as Pick<A,  'foo' | 'bar'>;
a.foo();
a.bar()

