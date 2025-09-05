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

export type AnnotatedGrammar = {
  fragments: TemplateStringsArray;
  annotations: any[];
}

const gram = <T extends any[]>(
  fragments: TemplateStringsArray, 
  ...annotations: T
) => {
  return {fragments, annotations} as const;
}

const addContext =  <N extends object>(newCtx: N) => <C extends object>(ctx: C) => ({...ctx, ...newCtx});

const ref = (...args: any) => null;
const fn = (...args: any) => null;


const test = gram`ALTER TABLE [ IF EXISTS ] [ ONLY ] name${addContext({foo: 1})} [ * ] action${ref(() => add, (_, aCtx) => ({table: aCtx.table}))} [, ... ]`;
const add = gram`ADD [ COLUMN ] [ IF NOT EXISTS ] column_name data_type [ COLLATE collation ] [ column_constraint [ ... ] ]`


type ConstraintContext = {dataType: Types.Any};
const colConstraint = gram`[ CONSTRAINT constraint_name ]
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


export const grammars = {
  test,
  add,
  colConstraint
}
