import invariant from "tiny-invariant";
import * as Types from "../types";
import { MakeNonNullable } from "../types/any";

type TupleToIntersection<T extends any[]> = {
  [K in keyof T]: (x: T[K]) => void;
} extends {
  [K: number]: (x: infer I) => void;
}
  ? I
  : never;

const oneOf = <T extends any[]>(...builders: T): TupleToIntersection<T> => {
  const [first, ...rest] = builders;
  invariant(first, "oneOf requires at least one builder");
  if (!rest.length) {
    return first as TupleToIntersection<T>;
  }
  if (builders.every((b) => typeof b === "function")) {
    return ((...args: any[]) => oneOf(...builders.map((b) => b(...args)))) as TupleToIntersection<T>;
  }
  let possibilities: { [key in string]: any[] } = {};
  for (const b of builders) {
    for (const [k, v] of Object.entries(b)) {
      possibilities[k] = [...(possibilities[k] ?? []), v];
    }
  }
  return Object.fromEntries(
    Object.entries(possibilities).map(([k, v]) => [k, () => oneOf(...v.map((f) => f()))]),
  ) as TupleToIntersection<T>;
};

type Methods<T> = {
  [K in keyof T]: T[K] extends (...f: any) => any ? T[K] : never;
};

type PickNext<T, K extends keyof T> = {
  [k in K]: T[K] extends (...args: any) => infer R ? R : never;
}[K];

const foo = {
  a: 1,
  b: () => "foo",
};

type T = PickNext<typeof foo, "b">;

type Calls<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => any ? ["A"] : never;
};

class Builder<Ctx extends object = {}> {
  ctx!: Ctx = {};
  $calls: Partial<Calls<this>> = {};

  $then<K extends keyof this>(...next: K[]): Pick<this, K> {
    return this;
  }

  $thenOptional<K extends keyof Methods<this>>(...next: K[]): Pick<this, K> & PickNext<this, K> {
    if (next.every((k) => k in this)) {
      return this as Pick<this, K> & PickNext<this, K>;
    }

    let ret = {} as Pick<this, K> & PickNext<this, K>;
    for (const k of next) {
      ret = { ...ret, ...this[k]() };
    }
    return ret;
  }

  $merge<T>(obj: T): this & T {
    return this as this & T;
  }

  $withCtx<NewCtx extends object>(ctx: NewCtx): Builder<Ctx & NewCtx> {
    return this as unknown as Builder<Ctx & NewCtx>;
  }

  static $withEnd<O extends object, T extends { new (...args: any[]): any }>(
    this: T,
    end: (self: InstanceType<T>) => O,
  ) {
    return class extends this {
      $end() {
        return end(this as InstanceType<T>);
      }
    };
  }

  static $new<A extends any[], R>(this: { new (...args: A): R }, ...args: A): R {
    return new this(...args);
  }

  $end() {
    return {};
  }
}

abstract class AlterTableBuilder extends Builder {
  alterTable = oneOf((name: string, star?: "*") =>
    class A extends Builder {
      constructor(
        protected name: string,
        protected star?: "*",
      ) {
        super();
      }
      ifExists = () => this.$thenOptional("only");
      only = () => this.$action();
      $args = () => this.$thenOptional("ifExists");
      $action = () => {
        const self = this;
        return new (class extends ActionBuilder {
          $end = () => this.$merge(self.$end());
        })().$then("add");
      };
    }
      .$new(name, star)
      .$thenOptional("ifExists"),
  );
}

alterTable().ifExists().only();

abstract class ActionBuilder extends Builder {
  $parent = this;
  add = oneOf(
    // ADD [ COLUMN ] [ IF NOT EXISTS ] column_name data_type [ COLLATE collation ] [ column_constraint [ ... ] ]

    class AddBuilder<CN extends string = string, DT extends Types.Any = Types.Any> extends Builder.$withEnd(() =>
      this.$end(),
    ) {
      constructor(
        protected columnName: CN,
        protected dataType: DT,
      ) {
        super();
      }
      add = <CN extends string = string, DT extends Types.Any = Types.Any>(columnName: CN, dataType: DT) =>
        new AddBuilder(columnName, dataType).$thenOptional("column");
      column = () => this.$thenOptional("ifNotExists");
      ifNotExists = () => this.$thenOptional("collate");
      $args = () => this.$thenOptional("column");
      collate = () =>
        class extends Builder.$withEnd(() => this.$thenOptional("$columnConstraint")) {
          $args = (collation: string) => this.$end();
        };
      $columnConstraint = () => {
        const self = this;
        return class extends ColumnConstraintBuilder<DT> {
          $end<DT extends Types.Any>(this: ColumnConstraintBuilder<DT>) {
            return { ...(self as unknown as AddBuilder<CN, DT>).columnConstraints(this.$calls), ...this };
          }
        };
      };
      columnConstraints = (b: ColumnConstraintBuilder["$calls"]) => this.$end();
    },
  );
}

abstract class ColumnConstraintBuilder<DT extends Types.Any = Types.Any> extends Builder {
  // [ CONSTRAINT constraint_name ]
  constraint = (constraintName: string) =>
    oneOf(
      class extends Builder.$withEnd(() => this.$thenOptional("notNull", "null", "default")) {
        $ = () => this.$end();
      },
    );
  $almostEnd = () => this.$thenOptional("initiallyDeferred", "initiallyImmediate");
  notNull = () => (this as ColumnConstraintBuilder<MakeNonNullable<DT>>).$almostEnd();
  null = () => this.$almostEnd();
  default = (value: string) =>
    oneOf(
      class extends Builder.$withEnd(() => this.$almostEnd()) {
        $ = () => this.$end();
      },
    );
  deferable = () => this.$thenOptional("initiallyDeferred", "initiallyImmediate");
  notDeferrable = () => this.$thenOptional("initiallyDeferred", "initiallyImmediate");
  initiallyDeferred = () => this.$end();
  initiallyImmediate = () => this.$end();
}

// pass context

const builder = (grammar: string, override: any, opts: { references?: string } = {}) => {
    return {grammar, override, opts}
}

// ALTER TABLE [ IF EXISTS ] [ ONLY ] name [ * ] action [, ... ]
const root = builder(
  "ALTER TABLE [ IF EXISTS ] [ ONLY ] name [ * ] action [, ... ]",
  (C) =>
    class AlterTable<T extends Table> extends C {
      constructor(protected $table: T) {
        super();
      }
      override $fn0 = <T extends Table>(name: Table, star?: "*") =>
        new AlterTable(name).$from(this.super.$fn0(compile(name), compile(star)));
      action = () => action(this.$table);
    },
  { references: "action" },
);

const action = <T extends Table>(t: Table) =>
  builder(
    "ADD [ COLUMN ] [ IF NOT EXISTS ] column_name data_type [ COLLATE collation ] [ column_constraint [ ... ] ]",
    (C) =>
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
    { references: "columnConstraint" },
  );

const columnConstraint = <DTO extends Types.Any>(dataType: DTO) =>
  builder(
    `[ CONSTRAINT constraint_name ]
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
[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]`,
    (C) =>
      class ColumnConstraint<DT extends Types.Any = DTO> extends C {
        constructor(protected $dataType: DT) {
          super();
        }
        override notNull = () =>
          new ColumnConstraint<MakeNonNullable<DT>>(this.$dataType as MakeNonNullable<DT>).$from(super.nonNull());
      },
  );
