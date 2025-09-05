import { RawBuilder, sql } from "kysely";
import * as Types from "../../types";
import { MakeNonNullable, MakeNullable } from "../../types/any";
import { Table, TableDefinition } from "../create-table";
import { sqlJoin } from "../utils";

export class Builder {
  static grammar: string;
  static references: string[];
  constructor() {}
}

const builder = (grammar: string, references?: string[]): typeof Builder => {
  return class extends Builder {
    static override grammar = grammar;
    static override references = references ?? [];
  };
};

export type AnnotatedGrammar = {
  fragments: TemplateStringsArray;
  annotations: any[];
};

export type Annotation = FnAnnotation | RefAnnotation | CtxAnnotation;

export type ParameterType<F extends FnAnnotation> = F["fn"] extends (...args: infer P) => any ? P : never;

type FnAnnotation<Fn extends (...args: any) => RawBuilder<any> = any> = {
  type: "fn";
  fn: Fn;
};

type RefAnnotation = {
  type: "ref";
  ref: (...args: any) => any;
};

type CtxAnnotation = {
  type: "ctx";
  ctx: object;
};

const gram = <T extends Annotation[]>(fragments: TemplateStringsArray, ...annotations: T) => {
  return { fragments, annotations } as const;
};

const ref = (...args: any) => null;
const fn = <F extends (...args: any[]) => any>(fn: F): FnAnnotation<F> => ({
  type: "fn",
  fn,
});

const fn2 = <N extends number>(n: N) => {};

type F = typeof fn2;
type P = Parameters<F>;

const test = gram`ALTER TABLE [ IF EXISTS ] [ ONLY ] name [ * ]${fn(<T extends TableDefinition<any>>(name: T, star?: "*") => sql`${sql.ref(name.tableName ?? name.name)}${star ? sql`*` : sql``}`)}`; // TODO:  action [, ... ]
const add = gram`ADD [ COLUMN ] [ IF NOT EXISTS ] column_name data_type [ COLLATE collation ] [ column_constraint [ ... ] ]`;

const colConstraint = gram`[ CONSTRAINT constraint_name ]
{ NOT NULL |
  NULL |
  CHECK ( expression ) [ NO INHERIT ] |
  DEFAULT default_expr |
  GENERATED ALWAYS AS ( generation_expr ) STORED |
  GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY [ ( sequence_options ) ] |
  UNIQUE [ NULLS [ NOT ] DISTINCT ] index_parameters |
  PRIMARY KEY index_parameters |
  REFERENCES reftable [ ( refcolumn ) ] [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ]
    [ ON DELETE referential_action ] [ ON UPDATE referential_action ] }
[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]`;

export const grammars = {
  test,
  add,
  colConstraint,
};
