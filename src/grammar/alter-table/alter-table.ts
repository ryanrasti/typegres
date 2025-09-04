import invariant from "tiny-invariant";
import * as Types from "../../types";
import { MakeNonNullable } from "../../types/any";

export type Builder = { grammar: string; override: any; references?: () => { [key in string]: Builder } };

const builder = (grammar: string, override: any, references?: () => { [key in string]: Builder }): Builder => {
    return {grammar, override, references}
}

// ALTER TABLE [ IF EXISTS ] [ ONLY ] name [ * ] action [, ... ]
export const root = builder(
  "ALTER TABLE [ IF EXISTS ] [ ONLY ] `name` [ * ] `action` [, ... ]",
  (C) =>
    class AlterTable<T extends Table> extends C {
      constructor(protected $table: T) {
        super();
      }
      override $fn0 = <T extends Table>(name: Table, star?: "*") =>
        new AlterTable(name).$from(this.super.$fn0(compile(name), compile(star)));
      action = () => action(this.$table);
    },
  () => ({ action }),
);

const action = 
  builder(
    "ADD [ COLUMN ] [ IF NOT EXISTS ] `column_name` `data_type` [ COLLATE `collation` ] [ `column_constraint` [ ... ] ]",
    (C) =>
      <T extends Table>(t: Table) =>
      class Add<T extends Table, C extends string, DT extends Types.Any> extends C {
        constructor(
          protected caller: T,
          protected $columnName: string,
          protected $dataType: Types.Any,
        ) {
          super();
        }
        override $fn0 = (columnName: string, dataType: Types.Any) =>
          new Action(columnName, dataType).$from(this.super.$fn0(compile(columnName), compile(dataType)));
        override collate = class Collate extends this.Collate {
          $fn0 = (collation: string) => this.super.$fn0(compile(collation));
        };
        columnConstraint = () => columnConstraint(this.$dataType);
      },
   () => ({ columnConstraint }),
  );

const columnConstraint = 
  builder(
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
    (C) => <DTO extends Types.Any>(dataType: DTO) =>
      class ColumnConstraint<DT extends Types.Any = DTO> extends C {
        constructor(protected $dataType: DT) {
          super();
        }
        override notNull = () =>
          new ColumnConstraint<MakeNonNullable<DT>>(this.$dataType as MakeNonNullable<DT>).$from(super.nonNull());
      },
  );

