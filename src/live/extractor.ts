import { sql, Op, Column, Ident, Param, Join, Func, UnaryOp, Alias } from "../builder/sql";
import type { Sql } from "../builder/sql";
import type { QueryBuilder } from "../builder/query";
import { reAlias } from "../builder/query";
import type { PredicateSet } from "./types";
import { LiveQueryError } from "./types";

// Walk an expression and collect every Column reference it contains.
const collectColumns = (node: Sql): Column[] => {
  const out: Column[] = [];
  const walk = (n: Sql) => {
    if (n instanceof Column) { out.push(n); return; }
    if (n instanceof Op) { walk(n.lhs); walk(n.rhs); return; }
    if (n instanceof UnaryOp) { walk(n.expr); return; }
    if (n instanceof Func) { for (const a of n.args) { walk(a); } return; }
    if (n instanceof Join) { for (const c of n.children) { walk(c); } return; }
  };
  walk(node);
  return out;
};

// Walk an expression and collect every Param value it contains.
const collectParams = (node: Sql): unknown[] => {
  const out: unknown[] = [];
  const walk = (n: Sql) => {
    if (n instanceof Param) { out.push(n.value); return; }
    if (n instanceof Op) { walk(n.lhs); walk(n.rhs); return; }
    if (n instanceof UnaryOp) { walk(n.expr); return; }
    if (n instanceof Func) { for (const a of n.args) { walk(a); } return; }
    if (n instanceof Join) { for (const c of n.children) { walk(c); } return; }
  };
  walk(node);
  return out;
};

// Classify a side of an equality:
//   "column" — single column reference, possibly inside a cast wrapper
//   "literal" — single param value with no columns (e.g. `CAST($1 AS int8)`)
//   null — anything else (computed expressions, multi-column, etc.) → reject
type Side =
  | { kind: "column"; column: Column }
  | { kind: "literal"; value: unknown }
  | null;

const classifySide = (node: Sql): Side => {
  // Unwrap: peek through Seq wrappers like `CAST($1 AS int8)`.
  const columns = collectColumns(node);
  const params = collectParams(node);
  if (columns.length === 1 && params.length === 0) {
    return { kind: "column", column: columns[0]! };
  }
  if (columns.length === 0 && params.length === 1) {
    return { kind: "literal", value: params[0]! };
  }
  return null;
};

// --- AST walk helpers ---

// Split an AND-tree into its conjuncts: (a AND b) AND c -> [a, b, c].
const splitAnd = (node: Sql): Sql[] => {
  if (node instanceof Op && node.op === "AND") {
    return [...splitAnd(node.lhs), ...splitAnd(node.rhs)];
  }
  return [node];
};

type ParsedPred =
  | { kind: "literal"; alias: Alias; col: string; value: unknown }
  | {
      kind: "edge";
      left: { alias: Alias; col: string };
      right: { alias: Alias; col: string };
    };

// Recognize col = literal, literal = col, or col = col. Anything else → null.
// Each side is classified through classifySide, which tolerates cast-wrappers
// like `CAST($1 AS int8)` (produced by `.from(5n)`) without giving up.
// Column.name is a BoundSql (typically an Ident). For the extractor we
// need the raw column-name string.
const colName = (c: Column): string => {
  if (!(c.name instanceof Ident)) {
    throw new LiveQueryError(`live(): column name must be a plain Ident, got ${c.name.constructor.name}`);
  }
  return c.name.name;
};

const parseEquality = (node: Sql): ParsedPred | null => {
  if (!(node instanceof Op) || node.op !== "=") { return null; }
  const left = classifySide(node.lhs);
  const right = classifySide(node.rhs);
  if (!left || !right) { return null; }
  if (left.kind === "column" && right.kind === "column") {
    return {
      kind: "edge",
      left: { alias: left.column.table, col: colName(left.column) },
      right: { alias: right.column.table, col: colName(right.column) },
    };
  }
  if (left.kind === "column" && right.kind === "literal") {
    return { kind: "literal", alias: left.column.table, col: colName(left.column), value: right.value };
  }
  if (left.kind === "literal" && right.kind === "column") {
    return { kind: "literal", alias: right.column.table, col: colName(right.column), value: left.value };
  }
  return null;
};

// --- Table / DAG model ---

type TableNode = {
  alias: Alias;
  aliasName: string;     // the TS-level alias (also the key in the namespace)
  tableName: string;     // the actual pg table name
  literalPreds: Map<string, Set<unknown>>; // col -> values (from literal equalities)
  // Each parent edge: "my col X equals parent P's col Y". Lookup is IN (SELECT Y FROM s_P).
  parentEdges: { parentAlias: string; myCol: string; parentCol: string }[];
};

type Dag = {
  nodes: Map<string, TableNode>; // keyed by aliasName
  order: string[];               // declaration order (FROM first, then joins)
};

// --- QB → DAG ---

const analyze = (qb: QueryBuilder<any, any, any>): Dag => {
  const opts = qb.liveIntrospect();

  // Rejected constructs.
  if (opts.groupBy) {
    throw new LiveQueryError("live(): GROUP BY is not supported");
  }
  if (opts.having) {
    throw new LiveQueryError("live(): HAVING is not supported");
  }
  if (!opts.tables || opts.tables.length === 0) {
    throw new LiveQueryError("live(): query has no FROM clause");
  }

  const nodes = new Map<string, TableNode>();
  const order: string[] = [];
  // Build fresh aliases per source — matches what QB.bind() does — and assemble
  // the namespace that user callbacks will evaluate against.
  const ns: { [key: string]: unknown } = {};
  const aliasByName = new Map<string, Alias>();

  const addTable = (source: unknown, aliasName: string) => {
    const s = source as { tableName?: unknown; tsAlias?: unknown; rowType?: () => object };
    if (typeof s.tableName !== "string") {
      throw new LiveQueryError(
        `live(): only real tables supported in FROM/JOIN (got "${aliasName}")`,
      );
    }
    if (nodes.has(aliasName)) {
      throw new LiveQueryError(`live(): duplicate table alias "${aliasName}"`);
    }
    const alias = new Alias(aliasName);
    aliasByName.set(aliasName, alias);
    Object.defineProperty(ns, aliasName, {
      value: reAlias(s.rowType!(), alias),
      enumerable: true,
    });
    nodes.set(aliasName, {
      alias,
      aliasName,
      tableName: s.tableName,
      literalPreds: new Map(),
      parentEdges: [],
    });
    order.push(aliasName);
  };

  for (const t of opts.tables) {
    addTable(t.source, t.source.tsAlias);
  }

  const aliasToName = (alias: Alias): string => {
    for (const node of nodes.values()) {
      if (node.alias === alias) { return node.aliasName; }
    }
    throw new LiveQueryError("live(): predicate references unknown table alias");
  };

  const absorbPredicates = (root: Sql, ctx: "where" | "join") => {
    for (const conjunct of splitAnd(root)) {
      const parsed = parseEquality(conjunct);
      if (!parsed) {
        throw new LiveQueryError(
          `live(): unsupported predicate in ${ctx} clause — only col = literal or col = other_table.col are allowed`,
        );
      }
      if (parsed.kind === "literal") {
        const node = nodes.get(aliasToName(parsed.alias))!;
        const set = node.literalPreds.get(parsed.col) ?? new Set<unknown>();
        set.add(parsed.value);
        node.literalPreds.set(parsed.col, set);
      } else {
        const leftName = aliasToName(parsed.left.alias);
        const rightName = aliasToName(parsed.right.alias);
        if (leftName === rightName) {
          throw new LiveQueryError(
            `live(): same-table equality (${leftName}.${parsed.left.col} = ${leftName}.${parsed.right.col}) is not supported`,
          );
        }
        // Direction by declaration order: the LATER-declared table is the child.
        const leftIdx = order.indexOf(leftName);
        const rightIdx = order.indexOf(rightName);
        if (leftIdx > rightIdx) {
          nodes.get(leftName)!.parentEdges.push({
            parentAlias: rightName,
            myCol: parsed.left.col,
            parentCol: parsed.right.col,
          });
        } else {
          nodes.get(rightName)!.parentEdges.push({
            parentAlias: leftName,
            myCol: parsed.right.col,
            parentCol: parsed.left.col,
          });
        }
      }
    }
  };

  for (const t of opts.tables) {
    if (t.type === "from") { continue; }
    absorbPredicates(t.on(ns as any).toSql(), "join");
  }
  if (opts.where) {
    absorbPredicates(opts.where(ns as any).toSql(), "where");
  }

  // Anchor reachability: every node must be reachable from a literal anchor.
  const anchored = new Set<string>();
  for (const node of nodes.values()) {
    if (node.literalPreds.size > 0) { anchored.add(node.aliasName); }
  }
  let changed = true;
  while (changed) {
    changed = false;
    for (const node of nodes.values()) {
      if (anchored.has(node.aliasName)) { continue; }
      for (const edge of node.parentEdges) {
        if (anchored.has(edge.parentAlias)) {
          anchored.add(node.aliasName);
          changed = true;
          break;
        }
      }
    }
  }
  const unreachable = order.filter((n) => !anchored.has(n));
  if (unreachable.length > 0) {
    throw new LiveQueryError(
      `live(): table(s) [${unreachable.join(", ")}] not reachable from a literal equality anchor`,
    );
  }

  return { nodes, order };
};

// --- DAG → extractor SQL ---

// Columns a node's CTE must project:
//   1. literal-pred cols (watched, land in UNION)
//   2. parent-edge "my" cols (watched — that's the point of the edge)
//   3. cols referenced by downstream children's parent edges (needed for IN lookup)
const nodeProjection = (node: TableNode, allNodes: Map<string, TableNode>): Set<string> => {
  const cols = new Set<string>();
  for (const col of node.literalPreds.keys()) { cols.add(col); }
  for (const edge of node.parentEdges) { cols.add(edge.myCol); }
  for (const child of allNodes.values()) {
    for (const edge of child.parentEdges) {
      if (edge.parentAlias === node.aliasName) { cols.add(edge.parentCol); }
    }
  }
  return cols;
};

// Columns that appear in the UNION output (actually-watched cols).
const nodeUnionCols = (node: TableNode): Set<string> => {
  const cols = new Set<string>();
  for (const col of node.literalPreds.keys()) { cols.add(col); }
  for (const edge of node.parentEdges) { cols.add(edge.myCol); }
  return cols;
};

const cteName = (aliasName: string): string => `s_${aliasName}`;

// Topological order is already the declaration order (FROM first, then joins),
// because parent edges always point to an earlier-declared table. This is
// guaranteed by our direction rule above.
const emitExtractorSql = (dag: Dag): Sql => {
  const ctes: Sql[] = [];
  const unionBranches: Sql[] = [];

  for (const aliasName of dag.order) {
    const node = dag.nodes.get(aliasName)!;
    const projected = nodeProjection(node, dag.nodes);

    const selectList = sql.join(
      [...projected].map((c) => sql.ident(c)),
    );

    const whereParts: Sql[] = [];
    for (const [col, values] of node.literalPreds) {
      for (const v of values) {
        whereParts.push(sql`${sql.ident(col)} = ${sql.param(v)}`);
      }
    }
    for (const edge of node.parentEdges) {
      whereParts.push(
        sql`${sql.ident(edge.myCol)} IN (SELECT ${sql.ident(edge.parentCol)} FROM ${sql.raw(cteName(edge.parentAlias))})`,
      );
    }
    const whereSql = whereParts.length > 0
      ? sql`\n   WHERE ${sql.join(whereParts, sql` AND `)}`
      : sql``;

    ctes.push(sql`${sql.raw(cteName(aliasName))} AS MATERIALIZED (\n  SELECT ${selectList}\n    FROM ${sql.ident(node.tableName)}${whereSql}\n)`);

    for (const col of nodeUnionCols(node)) {
      unionBranches.push(
        sql`SELECT ${sql.param(node.tableName)} AS tbl, ${sql.param(col)} AS col, ${sql.ident(col)}::text AS value FROM ${sql.raw(cteName(aliasName))}`,
      );
    }
  }

  if (unionBranches.length === 0) {
    // Degenerate: no watched cols. Shouldn't happen since anchor requires literals.
    return sql`SELECT 'empty' AS tbl, 'empty' AS col, 'empty' AS value WHERE FALSE`;
  }

  return sql`WITH\n  ${sql.join(ctes, sql`,\n  `)}\n${sql.join(unionBranches, sql`\n  UNION ALL\n  `)}`;
};

// --- Public API ---

export type Extractor = {
  // SQL that, when executed in the same tx as the main query, returns (tbl, col, value) rows.
  sql: Sql;
  // Literal-sourced predicate values (known statically from the AST); merge these
  // into the PredicateSet alongside the rows the SQL returns.
  literals: PredicateSet;
  // Build a PredicateSet by merging SQL-returned rows with the static literals.
  materialize: (
    rows: { tbl: string; col: string; value: string }[],
  ) => PredicateSet;
};

export const buildExtractor = (qb: QueryBuilder<any, any, any>): Extractor => {
  const dag = analyze(qb);

  // Per-alias, per-col effective literal set. Propagates along parent edges:
  // if node A has a literal on colA and there's an edge B.colB = A.colA, then
  // B.colB inherits A's literal set. Covers the "join one side empty" case
  // that the CTE chain handles server-side but that wouldn't fire client-side
  // matching otherwise.
  const perAlias = new Map<string, Map<string, Set<string>>>();
  const getOrInit = (alias: string): Map<string, Set<string>> => {
    let m = perAlias.get(alias);
    if (!m) { m = new Map(); perAlias.set(alias, m); }
    return m;
  };
  // Seed with declared literals.
  for (const node of dag.nodes.values()) {
    const m = getOrInit(node.aliasName);
    for (const [col, values] of node.literalPreds) {
      const set = m.get(col) ?? new Set<string>();
      for (const v of values) { set.add(canonicalize(v)); }
      m.set(col, set);
    }
  }
  // Propagate along edges in topo order: each edge `child.toCol = parent.parentCol`
  // contributes parent's literal set on parentCol into child's toCol.
  for (const aliasName of dag.order) {
    const node = dag.nodes.get(aliasName)!;
    for (const edge of node.parentEdges) {
      const parentLits = perAlias.get(edge.parentAlias)?.get(edge.parentCol);
      if (!parentLits || parentLits.size === 0) { continue; }
      const childMap = getOrInit(node.aliasName);
      const set = childMap.get(edge.myCol) ?? new Set<string>();
      for (const v of parentLits) { set.add(v); }
      childMap.set(edge.myCol, set);
    }
  }

  // Flatten per-alias into per-real-table (multiple aliases of the same
  // table merge their literal sets — consistent with the skinny extractor
  // output and the flat PredicateSet matching model).
  const literals: PredicateSet = new Map();
  for (const [aliasName, cols] of perAlias) {
    const tableName = dag.nodes.get(aliasName)!.tableName;
    const perTable = literals.get(tableName) ?? new Map<string, Set<string>>();
    for (const [col, values] of cols) {
      const set = perTable.get(col) ?? new Set<string>();
      for (const v of values) { set.add(v); }
      perTable.set(col, set);
    }
    if (perTable.size > 0) { literals.set(tableName, perTable); }
  }

  return {
    sql: emitExtractorSql(dag),
    literals,
    materialize: (rows) => {
      const out: PredicateSet = new Map();
      const addTo = (tbl: string, col: string, value: string) => {
        const perTable = out.get(tbl) ?? new Map<string, Set<string>>();
        const set = perTable.get(col) ?? new Set<string>();
        set.add(value);
        perTable.set(col, set);
        out.set(tbl, perTable);
      };
      for (const [tbl, perTable] of literals) {
        for (const [col, values] of perTable) {
          for (const v of values) { addTo(tbl, col, v); }
        }
      }
      for (const r of rows) { addTo(r.tbl, r.col, r.value); }
      return out;
    },
  };
};

// Canonical text form for literal values. For v1, covers the common cases via
// String() coercion; type-specific normalization (timestamptz/citext/numeric)
// lands with the column-type-aware pass in a later patch.
const canonicalize = (v: unknown): string => {
  if (v === null || v === undefined) { return "null"; }
  if (typeof v === "string") { return v; }
  if (typeof v === "number" || typeof v === "bigint" || typeof v === "boolean") { return String(v); }
  if (v instanceof Date) { return v.toISOString(); }
  return JSON.stringify(v);
};
