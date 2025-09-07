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

const gram = <T extends ((a: AnnotationBuilder<any>) => (...args: any) => object)[]>(fragments: TemplateStringsArray, ...annotations: T) => {
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

const test = gram`ALTER TABLE name${(a) => <N extends string>(name: N) => a.$ctx({name}).$end()} THEN upper${(a) => <U extends string>(upper: U) => a.$ctx({upper, })}`; // TODO:  action [, ... ]
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

// type Taking<F extends (...args: any) => any, T extends (f: F) => R> =  

class Params<P extends any[]> {
}

function foo<N extends string>(this: Params<[N]>, name: N) { return this }

const r = (new (class extends Params<[string]>{
  foo = foo;
}) ()).foo('hi')

const foo2 = (a: any) => <N extends string>(name: N) => name
const bar = foo2(null)

const z = grammars.test.annotations[0]
type T1 = typeof z;
type T2  = typeof z2;
const z2 = <A extends AnnotationBuilder<any>>(a: A) => <N extends string>(name: N) => ({})
assert<Equals<T1, T2>>()
const z1 = z(null as any)
const z3 = z2(null as any)
class Foo {
  bar = z2[0](null as any)
}