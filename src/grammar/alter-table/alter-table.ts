import { RawBuilder, sql } from "kysely";
import { assert, Equals } from "tsafe";

export class Builder<Ctx extends object = {}> {
  static grammar: string;
  static references: string[];

  constructor(protected $ctx: Ctx) {}

  $withCtx<NewCtx extends object>(ctx: NewCtx): Builder<Ctx & NewCtx> {
    const copy = Object.create(this);
    copy.$ctx = { ...this.$ctx, ...ctx };
    return copy as this;
  }


  $end(): object {
    return {} as any;
  }
}


export type AnnotatedGrammar = {
  fragments: TemplateStringsArray;
  annotations: any[];
};

export type Annotation = FnAnnotation | RefAnnotation | CtxAnnotation;

export type ParameterType<F extends FnAnnotation | CtxAnnotation> = F["fn"] extends (...args: infer P) => any ? P : never;

type FnAnnotation<Fn extends (...args: any) => RawBuilder<any> = any> = {
  type: "fn";
  fn: Fn;
};

type RefAnnotation = {
  type: "ref";
  ref: (...args: any) => any;
};

type CtxFn<C extends object> = (...args: any) => (ctx: C) => unknown;
type CtxAnnotation<Fn extends (...args: any) => typeof defer> = {
  type: "ctx";
  fn: Fn;
};

const gram = <T extends ((a: AnnotationBuilder<any>) => unknown)[]>(fragments: TemplateStringsArray, ...annotations: T) => {
  return { fragments, annotations } as const;
};




const defer = <R, F extends (...args: any) => >(f: F) => (r: R): F => {
  return f;
}

const capitalize = <S extends string>(s: string) => s.charAt(0).toUpperCase() + s.slice(1) as Capitalize<S>;

export class AnnotationBuilder<B extends Builder> {
  constructor(public builder: B) {}

  $ctx<C extends object>(ctx: C) {
    return new AnnotationBuilder(this.builder.$withCtx(ctx));
  }
  $end() {
    return {};
  }
}

const A = AnnotationBuilder<any>;

class AlterTableBuilder2 extends AlterTableBuilder {
  $end = () => ({two: true})
}

const test = gram`ALTER TABLE name${(a) => <N extends string>(name: N) => a.$ctx({name}).$end()} THEN`; // TODO:  action [, ... ]
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




const indirect = grammars.test.annotations
const direct = (<T extends ((a: AnnotationBuilder<any>) => unknown)[]>(t: T) => t)([(a: AnnotationBuilder<any>) => <N extends string>(name: N) => ({})] as const)

type TIndirect = typeof indirect;
type TDirect = typeof direct;

assert<Equals<TIndirect, TDirect>>()

const fnDirect = direct[0](null as any)
const fnIndirect = indirect[0](null as any)

class Foo {
  fn1 = fnDirect
  fn2 = fnIndirect
}