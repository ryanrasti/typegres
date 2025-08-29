type Component = string | readonly Component[] | Builder<any>;

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

type ExtractParameters<C extends readonly Component[], K extends `${number}` & keyof C> = C[K] extends readonly any[]
  ? ExtractParametersHelper<C[K], '0'>
  : ExtractParametersHelper<C, K>;

type ExtractParametersHelper<C extends readonly any[], K extends `${number}`, F = false> = C extends readonly [
  any,
  ...infer R,]
  ? K extends keyof C & `${number}`
    ? ExtractClause<C[K]> extends never
      ? [any, ...ExtractParametersHelper<R, K, true>]
      : F extends true
        ? []
        : ExtractParametersHelper<R, K>
    : []
  : [];

type T = Exclude<Uppercase<string>, "FOO">;
const t: T = "FOO";

type Callbacks<C extends readonly Component[]> = {
  [K in keyof C &  `${number}`  as CamelCase<ExtractClause<C[K]>>]:  (...args: ExtractParameters<C, K>) => K;
};

const b = ["ALTER TABLE", ["IF EXISTS"], ["ONLY"], "name", ["*"], "FOO", [",", "..."]] as const;
type R = ExtractParameters<typeof b, 2>;
type R2 = Callbacks<typeof b>;

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
