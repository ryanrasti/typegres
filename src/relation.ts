// Relation helpers — collapse the common FK + context-thread pattern:
//
//   Target.scope(Current.contextOf(this))
//     .where(({ target }) => target.fk_col.eq(this.pk))
//     .cardinality("many")
//
// into:
//
//   Relation.has(this, Target, { fk_col: this.pk }, { card: "many" })
//   Relation.belongsTo(this, Target, { id: this.fk })  // card defaults "one"
//
// Lives as free functions under a `Relation` namespace (not on TableBase)
// so row instances / query scopes don't grow definition-time helpers in
// autocomplete. Call sites are relation method bodies and codegen only.

import type { TableBase, TableClass } from "./table";
import type { SqlValue } from "./types/sql-value";
import type { QueryBuilder } from "./builder/query";

// Column keys on a table instance — only fields that hold SqlValue
// (methods / constructor / non-column fields are excluded).
type ColumnKeys<R> = {
  [K in keyof R]-?: R[K] extends SqlValue<any> ? K : never;
}[keyof R & string];

// Single-column FK map: exactly one target-column → parent-side expression.
// Multi-column FKs are not supported yet (codegen is single-column only).
// Union of one-key objects so `{}` and multi-key maps fail at compile time
// (runtime singleEntry still guards dynamic maps).
type FkMapFor<T extends TableClass> = {
  [K in ColumnKeys<InstanceType<T>>]: { [P in K]: SqlValue<any> };
}[ColumnKeys<InstanceType<T>>];

// Outbound (this row holds the FK): never "many".
type BelongsToCard = "one" | "maybe";
// Inbound (target holds the FK): all three cardinalities.
type HasCard = "one" | "maybe" | "many";

type BelongsToOpts<Card extends BelongsToCard = "one"> = {
  card?: Card;
};
type HasOpts<Card extends HasCard = "many"> = {
  card?: Card;
};

const singleEntry = (fk: { [k: string]: SqlValue<any> }): [string, SqlValue<any>] => {
  const entries = Object.entries(fk);
  if (entries.length !== 1) {
    throw new Error(
      `Relation helpers require a single-column FK map, got ${entries.length} key(s)`,
    );
  }
  return entries[0] as [string, SqlValue<any>];
};

// Shared substrate: Target.scope(parentCtx).where(fk).cardinality(card).
// "one" and "maybe" emit identical SQL (only the type of .scalar() differs);
// "many" switches scalar() to array_agg.
const relate = <T extends TableClass, Card extends "one" | "maybe" | "many">(
  row: TableBase,
  Target: T,
  fk: { [k: string]: SqlValue<any> },
  card: Card,
): QueryBuilder<
  { [K in T["tsAlias"]]: InstanceType<T> },
  InstanceType<T>,
  [],
  Card
> => {
  const [targetCol, parentExpr] = singleEntry(fk);
  const Parent = row.constructor as typeof TableBase;
  const alias = Target.tsAlias;
  return Target.scope(Parent.contextOf(row as InstanceType<typeof Parent>))
    .where((ns) => {
      // Namespace is keyed by tsAlias (= tableName). Column .eq is on every
      // dialect root (PG + SQLite generated Any); keep the lookup structural
      // so this file stays dialect-agnostic.
      const targetRow = (ns as { [k: string]: { [c: string]: { eq: (v: SqlValue<any>) => any } } })[alias]!;
      return targetRow[targetCol]!.eq(parentExpr);
    })
    .cardinality(card);
};

export const Relation = {
  // Parent row holds the FK → target row.
  // Default card "one" (non-null FK); pass { card: "maybe" } for nullable.
  belongsTo<T extends TableClass, Card extends BelongsToCard = "one">(
    row: TableBase,
    Target: T,
    fk: FkMapFor<T>,
    opts?: BelongsToOpts<Card>,
  ): QueryBuilder<{ [K in T["tsAlias"]]: InstanceType<T> }, InstanceType<T>, [], Card> {
    const card = (opts?.card ?? "one") as Card;
    return relate(row, Target, fk as { [k: string]: SqlValue<any> }, card);
  },

  // Target holds the FK → this row (inbound / collection or unique inverse).
  // Default card "many"; pass { card: "one" } / { card: "maybe" } for unique.
  has<T extends TableClass, Card extends HasCard = "many">(
    row: TableBase,
    Target: T,
    fk: FkMapFor<T>,
    opts?: HasOpts<Card>,
  ): QueryBuilder<{ [K in T["tsAlias"]]: InstanceType<T> }, InstanceType<T>, [], Card> {
    const card = (opts?.card ?? "many") as Card;
    return relate(row, Target, fk as { [k: string]: SqlValue<any> }, card);
  },
};
