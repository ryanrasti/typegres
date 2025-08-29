type Component = string | readonly Component[] | Builder<any>;
type Components = readonly Component[];

type Overrides<C extends readonly Component[]> = {};

abstract class Builder<Ctx extends object> {
  constructor(protected $ctx: Ctx) {}

  $register(name: string, ctx: object) {
    return args;
  }
  $end() {
    return {};
  }
}

type ExtractKeyword<S> = S extends string ? (S extends Lowercase<S> ? never : S) : never;
type ExtractClause<C extends Component> = C extends readonly [infer S, ...any]
  ? ExtractKeyword<S>
  : C extends string
    ? ExtractKeyword<C>
    : never;
type CamelCase<S extends string> = S extends `${infer P1} ${infer P2}`
  ? `${Lowercase<P1>}${Capitalize<CamelCase<P2>>}`
  : Lowercase<S>;
type Repeated = readonly [string, "..."] | ["..."];
type Optional<T = any> = readonly T[];
type Param = Lowercase<string> | Optional<Lowercase<string>>;

// Transitions<L> <- object of { [k in string]: () => Transitions }
type Transitions<C extends Components, End extends object, Sub extends object> = C extends [...any[], infer B, Repeated]
  ? B extends Builder<any>
    ? Invoke<B, Transitions<C, End> & End>
    : [...TransitionsHelper<C, End, Sub>, End]
  : [...TransitionsHelper<C, End, Sub>, End];

type TransitionsHelper<
  C extends Components,
  NextTransition extends object,
  Sub extends object,
  Params extends unknown[] = [],
> = C extends readonly [...infer F, infer L]
  ? L extends Param
    ? WrapTransitionsHelper<
        F extends Components ? F : never,
        NextTransition,
        L extends Optional ? [unknown?, ...Params] : [unknown, ...Params]
      >
    : WrapTransitionsHelper<
        F extends Components ? F : never,
        ToCallback<L extends Component ? L : never, L extends Optional ? [] : Params, NextTransition, Sub>,
        L extends Optional ? Params : []
      >
  : [];

type WrapTransitionsHelper<C extends Components, NextTransition extends object, Params extends unknown[] = []> = [
  ...TransitionsHelper<C, NextTransition, Params>,
  NextTransition,
];

type ToCallback<C extends Component, Params extends unknown[], NextTransition extends object, Sub> = (C extends string
  ? { [k in CamelCase<C>]: k extends keyof Sub ? Sub[k] : (...args: Params) => NextTransition }
  : C extends readonly [string, ...infer T]
    ? { [k in CamelCase<C[0]>]: (...args: MapUnknown<T>) => NextTransition }
    : {}) &
  (C extends Optional ? NextTransition : {});

type MapUnknown<T extends any[]> = {
  [k in keyof T]: unknown;
};

type Invoke<B, R> = ["INVOKE", B, R];

type Substitute<Transitions extends object[], O extends object> = {
  [K in keyof Transitions]: {
    [M in keyof Transitions[K]]: O extends { [N in M]: infer T } ? T : Transitions[K][M];
  };
};

const b = ["ALTER TABLE", ["IF EXISTS"], ["ONLY"], "name", ["*"], "FOO", [",", "..."]] as const;
const s = {
  alterTable: <T>(name: T, star?: "*") => this.$register("alterTable", { name }),
  foo: 1,
};
type Expand<T> = T extends object ? { [K in keyof T]: T[K] } : T;
const t: Expand<Substitute<Transitions<typeof b, { end: () => {} }>, typeof s>>;

t[0].alterTable().ifExists().only();

type O = {
  foo: <T extends O>(this: T) => "foo";
  bar: <T extends O>(this: T) => T[""];
};

const builder = <C extends Component[], O extends Overrides<C>>(components: C, overrides: O) => {
  return new (class extends Builder<{}> {})({});
};

// ALTER TABLE [ IF EXISTS ] [ ONLY ] name [ * ]
//     action [, ... ]
builder(
  ["ALTER TABLE", ["IF EXISTS"], ["ONLY"], "name", ["*"], action, [",", "..."]] as const,
  (b: typeof Builder) =>
    class extends b<{}> {
      alterTable = <T>(name: T, star?: "*") => this.$register("alterTable", { name });
    },
);

const o = {
  alterTable: <T>(name: T, star?: "*") => {
    return name;
  },
};
type P = ReturnType<typeof alterTable>;

// ADD [ COLUMN ] [ IF NOT EXISTS ] column_name data_type [ COLLATE collation ] [ column_constraint [ ... ] ]
const action = builder([
  "ADD",
  ["COLUMN"],
  ["IF NOT EXISTS"],
  "column_name",
  "data_type",
  ["COLLATE", "collation"],
  ["column_constraint", ["..."]],
]);

type User = {
  id: number;
  name: string;
  email: string;
};

const USER_KEYS = ["id", "name", "email"] as const;
type ObjectToTuple<T, K extends readonly (keyof T)[]> = {
  [N in keyof K as N extends `${number}` ? N : never]: T[K[N & string]];
};
type UserTuple = ObjectToTuple<User, typeof USER_KEYS>;

class AlterTableBuilder {
  alterTable(name: unknown, star?: unknown): Pick<this, "ifExists"> {
    return { ifExists: this.ifExists };
  }
  ifExists = () => "foo";

  $transitions = {
    alterTable: { ifExists: this.ifExists, only: this.only },
  };
}

class Atb<T extends string> extends AlterTableBuilder {
  t: T;
  constructor(t: T) {
    super();
    this.t = t;
  }
  override alterTable = <T extends string>(name: T, star?: "*") => {
    return super.alterTable.call(new Atb(name), name, star);
  };
  ifExists = () => this.t
}

const atb = new Atb('1');
atb.alterTable("foo").ifExists();
