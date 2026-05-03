import type { Database } from "../database";
import { FinalizedQuery, type QueryBuilder, type RowType, type RowTypeToTsType } from "../builder/query";
import { type Alias, Column, Op, type Raw, type Sql, sql, TypedParam } from "../builder/sql";
import { type TableBase, isTableClass } from "../table";

type Table = typeof TableBase;

type EqualityPredicate = Op & {
  op: Raw & { value: "=" };
  lhs: Column | TypedParam;
  rhs: Column | TypedParam;
};

const extractPredicates = (root: Sql): EqualityPredicate[] => {
  // Extract top-level AND'ed equality predicates where at least one side
  // is a Column. The other side is either another Column (→ edge) or any
  // other Sql shape — typically `CAST($n AS T)` for typegres-wrapped
  // primitives — which we treat as a literal anchor.
  const predicates: EqualityPredicate[] = [];

  const stack = [root];
  while (true) {
    const node = stack.pop();
    if (!node) {
      break;
    }
    if (node instanceof Op && node.op.value === "AND") {
      stack.push(node.lhs);
      stack.push(node.rhs);
    }
    if (node instanceof Op && node.op.value === "=") {
      const validSide = (s: Sql) => s instanceof Column || s instanceof TypedParam;
      const isCol = (s: Sql) => s instanceof Column;
      if (validSide(node.lhs) && validSide(node.rhs) && (isCol(node.lhs) || isCol(node.rhs))) {
        predicates.push(node as EqualityPredicate);
      }
    }
  }
  return predicates;
};

type RelativePredicate = {
  col: Column; // my column
  to: Column | TypedParam; // other column or literal I'm equal to
  // The original Op — handy when emitting WHERE clauses (already
  // parenthesizes itself on bind), so we don't have to reconstruct
  // `col = to` from the destructured sides.
  original: EqualityPredicate;
};

// Per-alias view: the table it refers to, every equality predicate
// touching it (re-keyed so `col` is always this alias's column), and
// the set of other aliases it's column-equal to.
export type TraverseEntry = {
  table: Table;
  predicates: RelativePredicate[];
  edges: Set<Alias>;
};

export type TraverseResult = Map<Alias, TraverseEntry>;

const addRelative = (
  result: TraverseResult,
  alias: Alias,
  rel: RelativePredicate,
): void => {
  const entry = result.get(alias);
  if (!entry) { return; } // alias didn't have a registered table — skip
  entry.predicates.push(rel);
  if (rel.to instanceof Column && rel.to.tableAlias !== alias) {
    entry.edges.add(rel.to.tableAlias);
  }
};

export const traverse = (root: Sql): TraverseResult => {
  // Each finalize() mints fresh aliases, so the caller must run this at
  // most once per FinalizedQuery — re-traversing would produce a graph
  // keyed by different alias instances than the rest of the pipeline.
  const result: TraverseResult = new Map();
  const predicates: EqualityPredicate[] = [];

  const stack = [root];
  while (true) {
    const node = stack.pop();
    if (!node) {
      break;
    }
    if (node instanceof FinalizedQuery) {
      for (const table of node.opts.tables) {
        if (isTableClass(table.source)) {
          if (result.has(table.alias)) {
            throw new Error(`unexpected: alias exists more than once: ${table.alias.tsAlias}`);
          }
          result.set(table.alias, {
            table: table.source,
            predicates: [],
            edges: new Set(),
          });
        }
        if ((table.type === "join" || table.type === "leftJoin") && table.on) {
          predicates.push(...extractPredicates(table.on.toSql()));
        }
      }
      if (node.opts.where) {
        predicates.push(...extractPredicates(node.opts.where.toSql()));
      }
    }
    stack.push(...node.children());
  }

  // Re-key each predicate to whichever alias(es) own its sides. A
  // column=column predicate produces two entries (one per side); a
  // column=literal anchor produces one.
  for (const p of predicates) {
    if (p.lhs instanceof Column) {
      addRelative(result, p.lhs.tableAlias, { col: p.lhs, to: p.rhs, original: p });
    }
    if (p.rhs instanceof Column) {
      addRelative(result, p.rhs.tableAlias, { col: p.rhs, to: p.lhs, original: p });
    }
  }

  return result;
};

// One emitted CTE per alias, in topo order. `predicates` is *every* extracted
// equality predicate that touches this alias — buildExtractor decides which
// belong in this CTE's WHERE (anchors + edges to earlier aliases) vs. a
// downstream CTE's WHERE.
export type CteSpec = {
  alias: Alias;
  tableName: string;
  predicates: RelativePredicate[];
};

export const sortAliases = (traversal: TraverseResult): CteSpec[] => {
  // Topo: seed with literal-anchored aliases, then walk edges until stable.
  const order: Alias[] = [...traversal.entries()]
    .filter(([, entry]) => entry.predicates.some((p) => p.to instanceof TypedParam))
    .map(([alias]) => alias);
  const orderSet = new Set<Alias>(order);

  for (let i = 0; i < order.length; i++) {
    for (const edge of traversal.get(order[i]!)!.edges) {
      if (!orderSet.has(edge)) {
        order.push(edge);
        orderSet.add(edge);
      }
    }
  }

  if (orderSet.size !== traversal.size) {
    const missing = [...traversal.keys()]
      .filter((a) => !orderSet.has(a))
      .map((a) => a.tsAlias);
    throw new Error(`Aliases unreachable from any literal anchor: ${missing.join(", ")}`);
  }

  return order.map((alias) => {
    const entry = traversal.get(alias)!;
    return { alias, tableName: entry.table.tableName, predicates: entry.predicates };
  });
};

// Build the extraction query: one MATERIALIZED CTE per alias projecting its
// watched columns, then a UNION ALL emitting (tbl, col, value::text) rows.
// Rows feed materializePredicateSet to produce the watched-value map.
//
// Why this shape:
//   - planner-stable (no rewriting of the user query)
//   - index-friendly (each CTE is a simple equality lookup)
//   - easy to reason about (one CTE per alias, deps top-down)
//
// CTE names *are* the aliases — registered in one outer scope so refs across
// CTEs and into the final SELECT resolve naturally, and so two FROM
// occurrences of the same table (e.g. self-join) get auto-suffixed into
// distinct CTE names by Scope.register.
export const buildExtractor = (specs: CteSpec[]): Sql => {
  const idxOf = new Map(specs.map((s, i) => [s.alias, i]));

  const ctes = specs.map((spec) => {
    const idx = idxOf.get(spec.alias)!;

    const whereClauses: Sql[] = [];
    for (const p of spec.predicates) {
      if (p.to instanceof TypedParam) {
        // Anchor: reuse the original Op
        whereClauses.push(p.original);
      } else if (p.to instanceof Column) {
        // Self-edges (`p.to.tableAlias === spec.alias`) fall through the
        // `otherIdx >= idx` check below — same alias means same idx.
        const otherIdx = idxOf.get(p.to.tableAlias);
        if (otherIdx === undefined || otherIdx >= idx) {
          continue; // belongs to other CTE (or is a self-edge)
        }
        // The upstream alias is also the upstream CTE's name — refer to it directly.
        whereClauses.push(sql`${p.col} IN (SELECT ${p.to.name} FROM ${p.to.tableAlias})`);
      } else {
        throw new Error(`Unexpected non-Column, non-TypedParam predicate side: ${p.to}`);
      }
    }

    const uniqueColumnNames = [...new Set(spec.predicates.map((p) => p.col.name.name))];
    const body = sql.join(
      [
        sql`SELECT ${sql.join(uniqueColumnNames.map((c) => sql.ident(c)))}`,
        sql`FROM ${sql.ident(spec.tableName)} AS ${spec.alias}`,
        whereClauses.length > 0 && sql`WHERE ${sql.join(whereClauses, sql` AND `)}`,
      ].filter((x) => x !== false),
      sql` `,
    );

    return sql`${spec.alias} AS MATERIALIZED (${body})`;
  });

  const unionParts: Sql[] = specs.flatMap((spec) => {
    return spec.predicates.map((pred) =>
      pred.to instanceof TypedParam
        ? sql`SELECT ${sql.param(spec.tableName)} AS tbl, ${sql.param(pred.col.name.name)} AS col, ${pred.to}::text AS value`
        : sql`SELECT ${sql.param(spec.tableName)} AS tbl, ${sql.param(pred.col.name.name)} AS col, ${pred.col}::text AS value FROM ${spec.alias}`,
    );
  });

  return sql.withScope(
    specs.map((s) => s.alias),
    sql`WITH ${sql.join(ctes)} ${sql.join(unionParts, sql` UNION ALL `)}`,
  );
};

// Per-subscription predicate set: nested table → col → values. Stringified
// values match the canonicalization in both the extractor's UNION ALL and
// the events table's jsonb_build_object. Nested rather than a flat
// `"<table>.<col>"` key so identifiers containing dots don't collide.
export type PredicateSet = Map<string, Map<string, Set<string>>>;

export type ExtractedRow = { tbl: string; col: string; value: string | null };

// Turn the raw rows from buildExtractor's SELECT into a closed PredicateSet.
// Closure happens via union-find over column-equality predicates: every
// (alias, col) reachable from another via column-equality edges shares one
// merged value set. Without this, a `users.id = 1` literal anchor would
// never reach `notes.user_id` if no notes currently exist for user 1, and
// the bus would miss the event when the first such note is inserted.
//
// Null values are dropped — pg's `=` never matches NULL, so a NULL column
// in an event row can't satisfy any predicate anyway.
export const materializePredicateSet = (
  rows: readonly ExtractedRow[],
  traversal: TraverseResult,
): PredicateSet => {
  // 1. Group (table, col) by equivalence class. Set identity is the class:
  //    members in the same class share one Set<string> object. When a
  //    column-equality predicate joins two columns whose groups already
  //    differ, walk the whole `groups` structure to re-point every column
  //    that pointed at the loser. Walks are O(N*M) but typical predicate
  //    graphs are tiny and merges rare.
  const groups = new Map<string, Map<string, Set<string>>>();

  for (const [, entry] of traversal) {
    for (const rel of entry.predicates) {
      let byTable = groups.get(entry.table.tableName);
      if (!byTable) {
        byTable = new Map<string, Set<string>>();
        groups.set(entry.table.tableName, byTable);
      }
      let group = byTable.get(rel.col.name.name);
      if (!group) {
        group = new Set<string>();
        byTable.set(rel.col.name.name, group);
      }
      if (rel.to instanceof Column) {
        const otherTable = traversal.get(rel.to.tableAlias)?.table;
        if (!otherTable) {
          throw new Error(`Alias ${rel.to.tableAlias.tsAlias} has no associated table`);
        }
        let otherByTable = groups.get(otherTable.tableName);
        if (!otherByTable) {
          otherByTable = new Map<string, Set<string>>();
          groups.set(otherTable.tableName, otherByTable);
        }
        const otherGroup = otherByTable.get(rel.to.name.name);
        if (otherGroup && otherGroup !== group) {
          // Re-point every (t, c) currently bound to otherGroup so they
          // share `group`. Values stay where the row-population loop will
          // find them, since group is the survivor.
          for (const byCol of groups.values()) {
            for (const [c, g] of byCol) {
              if (g === otherGroup) { byCol.set(c, group); }
            }
          }
        }
        otherByTable.set(rel.to.name.name, group);
      }
    }
  }

  // 2. Populate value sets from literal-anchored predicates.
  for (const row of rows) {
    const group = groups.get(row.tbl)?.get(row.col);
    if (!group) {
      throw new Error(`Extracted column ${row.tbl}.${row.col} has no associated group`);
    }
    if (row.value !== null) {
      group.add(row.value);
    }
  }

  return groups;
};

export type LiveIterationResult<O extends RowType> = {
  rows: RowTypeToTsType<O>[];
  // pg_current_snapshot() captured inside the txn — raw text. db.live()
  // parses to Cursor; tests can inspect either form.
  cursor: string;
  // Closed set of watched values per (table, col) — propagated across
  // equality classes. Ready to feed bus.subscribe() directly.
  predicateSet: PredicateSet;
};

// One iteration of the live loop: open a REPEATABLE READ txn, snapshot the
// cursor, run the extractor, run the user query, commit. Caller handles the
// outer "yield + wait for matching event + repeat" loop.
export const runLiveIteration = async <Q extends QueryBuilder<any, any, any, any>>(
  db: Database<any>,
  query: Q,
): Promise<
  Q extends QueryBuilder<any, infer O extends RowType, any, any>
    ? LiveIterationResult<O>
    : never
> => {
  return db.transaction({ isolation: "repeatable read" }, async (tx) => {
    const cursorResult = await tx.execute(
      sql`SELECT pg_current_snapshot()::text AS cursor`,
    );
    const cursor = (cursorResult.rows as { cursor: string }[])[0]!.cursor;

    // Important: traverse against a *single* finalize. Each finalize() mints
    // fresh aliases, so the extractor SQL and the user query intentionally
    // don't share alias identity — they're independently compiled. The
    // extractor's aliases are sealed inside buildExtractor's withScope.
    const finalized = query.finalize();
    const traversal = traverse(finalized);
    const extractorSql = buildExtractor(sortAliases(traversal));
    const extractedResult = await tx.execute(extractorSql);
    const extracted = extractedResult.rows as ExtractedRow[];
    const predicateSet = materializePredicateSet(extracted, traversal);

    const rows = await tx.execute(query);

    return { rows, cursor, predicateSet };
  }) as any;
};
