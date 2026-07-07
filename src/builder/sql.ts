// Type-only imports break at runtime — no value-cycle with database.ts
// since `Database` is only used in type positions here.
import type { Connection, Database } from "../database";
// SqlValue is defined in `../types/sql-value`, which value-imports Cast /
// Column / Param / etc. from *this* file. That two-way value cycle is
// safe because SqlValue is only referenced inside function/method
// bodies below (never at module-load top-level), so Node's cyclic
// resolution has time to fill in both sides.
import { SqlValue } from "../types/sql-value";

// The set of SQL dialects typegres knows about. Threaded through
// CompileContext / Driver / Dialect descriptor as the authoritative
// dialect tag. Extend this union to register a new dialect — every
// switch on `DialectName` becomes an exhaustiveness error until the
// new case is handled.
export type DialectName = "postgres" | "sqlite";

export type CompiledSql = { text: string; values: readonly unknown[] };

// Threaded through bind() and compile(). `database` supplies dialect
// (for syntax dispatch), provenance identity (checked against every
// tagged node at bind time), and the `scopedIdent` factory used by
// library-internal Ident construction. Untagged Ident/Func/Op nodes
// (raw templates, CTE aliases) pass through unchecked.
export type CompileContext = { database: Database };

// --- Root ---

// Every SQL node extends Sql. bind() produces a single BoundSql — one of
// the 6 atom classes below. Composite nodes (Column, Func, Op, UnaryOp,
// and query/mutation builders) rewrite themselves into a Join via
// sql`...` templates.
//
// children() exposes direct sub-expressions for generic tree walks
// (extractor, linting). Default is []; override on composites.
export abstract class Sql {
  abstract bind(ctx: CompileContext): BoundSql;
  children(): readonly Sql[] { return []; }
  // Fluent terminator: `someSql.execute(conn)` === `conn.execute(someSql)`.
  execute(conn: Connection): Promise<unknown> {
    return conn.execute(this);
  }
}

// --- Scope ---

class Scope {
  parent: Scope | undefined;
  aliases = new Map<Alias, string>();
  usedNames = new Set<string>();

  constructor(parent?: Scope) {
    this.parent = parent;
  }

  register(alias: Alias): string {
    // Aliases are minted fresh per bind(), so the same instance appearing
    // twice — anywhere in the scope chain — is a bug (someone held onto
    // an alias across compilations or reused one between sources).
    if (this.resolve(alias) !== undefined) {
      throw new Error(
        `Alias '${alias.tsAlias}' already registered — Alias instances must be ephemeral to a single bind(), not stored or reused.`,
      );
    }
    let name = alias.tsAlias;
    let i = 2;
    while (this.nameExists(name)) {
      name = `${alias.tsAlias}_${i}`;
      i++;
    }
    this.aliases.set(alias, name);
    this.usedNames.add(name);
    return name;
  }

  resolve(alias: Alias): string | undefined {
    return this.aliases.get(alias) ?? this.parent?.resolve(alias);
  }

  child(): Scope {
    return new Scope(this);
  }

  nameExists(name: string): boolean {
    return this.usedNames.has(name) || (this.parent ? this.parent.nameExists(name) : false);
  }
}

// --- Atoms (BoundSql) ---

// The six primitives. compile() dispatches on these via instanceof.

export class Raw extends Sql {
  constructor(readonly value: string) { super(); }
  bind(): BoundSql { return this; }
}

export class Ident extends Sql {
  // Public API: the only way to construct a schema-referencing Ident is
  // `db.scopedIdent(name)` — free-standing `sql.ident(...)` has been
  // removed from the public helpers.
  //
  // `database` is technically optional so library-internal code
  // (TypegresLiveEvents, CTE-alias names in live/events.ts, output
  // labels in query.ts) can construct untagged Idents that pass any
  // ctx. External users can't reach this constructor: `new Ident(...)`
  // requires importing the class directly and typegres barrels only
  // re-export from public paths. Attacker code over RPC has no access
  // to `sql` or `Ident` at all — the escape hatch is unreachable
  // outside the library.
  constructor(readonly name: string, readonly database?: Database) { super(); }
  bind(ctx: CompileContext): BoundSql {
    if (this.database && this.database !== ctx.database) {
      const label = (db: Database) => `${db.dialect}:${db.name ?? "<unnamed>"}`;
      throw new Error(
        `Ident '${this.name}' provenance mismatch: constructed in database ` +
        `${label(this.database)} but compiled against ${label(ctx.database)}.`,
      );
    }
    return this;
  }
}

export class Param extends Sql {
  constructor(readonly value: unknown) { super(); }
  bind(): BoundSql { return this; }
}

// An Alias is a Fromable's identity in the compile scope. Columns reference
// it; the scope maps alias-instance → resolved pg variable name during
// compile (with suffixing on conflict).
//
// Aliases are *ephemeral to a single compile* — they must not be stored on
// classes or long-lived objects. Doing so would let a single class reused
// across multiple compilations (or multiple slots in the same query) share
// one alias identity, which breaks the one-instance-per-FROM-occurrence
// invariant the scope relies on. Instead, every bind()/rowType() call
// mints fresh Aliases; QB's reAlias rebinds column refs to them.
export class Alias<A extends string = string> extends Sql {
  constructor(readonly tsAlias: A) { super(); }
  bind(): BoundSql { return this; }
}

// Concatenate parts with an optional separator. Templates use Join with no
// separator (children are interleaved Raw + interpolated Sql). sql.join()
// exposes the separator variant.
export class Join extends Sql {
  constructor(readonly parts: readonly Sql[], readonly separator?: Sql) { super(); }
  bind(): BoundSql { return this; }
  override children(): readonly Sql[] {
    return this.separator ? [...this.parts, this.separator] : this.parts;
  }
  *iter(): Generator<Sql> {
    for (const [i, p] of this.parts.entries()) {
      if (i > 0 && this.separator) { yield this.separator; }
      yield p;
    }
  }
}

// Scope primitive: pushes a child scope, registers the listed aliases, then
// emits child. Outer column refs to these aliases resolve via the child
// scope. When child emission completes, the scope is popped.
export class WithScope extends Sql {
  constructor(readonly aliases: readonly Alias[], readonly child: Sql) { super(); }
  bind(): BoundSql { return this; }
  override children(): readonly Sql[] { return [...this.aliases, this.child]; }
}

export type BoundSql = Raw | Ident | Param | Alias | Join | WithScope;

// --- Composite Sql nodes ---

export class Column extends Sql {
  constructor(readonly tableAlias: Alias, readonly name: Ident) { super(); }
  bind(): BoundSql { return sql`${this.tableAlias}.${this.name}`; }
  override children(): readonly Sql[] { return [this.tableAlias, this.name]; }
}

// Dialect-tagged AST nodes throw at bind() when the compile ctx's
// dialect doesn't match. Every Func/Op/UnaryOp/Cast/TypedParam
// declares its dialect at construction — AND/OR/NOT go through
// `bool-mixin.ts` which threads the concrete Bool class's dialect
// so even universal-syntax nodes stay strictly tagged.
const checkDialect = (
  node: string,
  dialect: DialectName,
  ctx: CompileContext,
): void => {
  if (dialect !== ctx.database.dialect) {
    throw new Error(
      `${node} constructed for dialect '${dialect}' but compiled against '${ctx.database.dialect}'.`,
    );
  }
};

export class Func extends Sql {
  constructor(
    readonly name: string,
    readonly args: readonly Sql[],
    readonly dialect: DialectName,
  ) { super(); }
  bind(ctx: CompileContext): BoundSql {
    checkDialect(`Func '${this.name}'`, this.dialect, ctx);
    return sql`${ctx.database.scopedIdent(this.name)}(${sql.join(this.args)})`;
  }
  override children(): readonly Sql[] { return this.args; }
}

export class Op extends Sql {
  constructor(
    readonly op: Raw,
    readonly lhs: Sql,
    readonly rhs: Sql,
    readonly dialect: DialectName,
  ) { super(); }
  bind(ctx: CompileContext): BoundSql {
    checkDialect(`Op '${this.op.value}'`, this.dialect, ctx);
    return sql`(${this.lhs} ${this.op} ${this.rhs})`;
  }
  override children(): readonly Sql[] { return [this.op, this.lhs, this.rhs]; }
}

export class UnaryOp extends Sql {
  constructor(
    readonly op: Sql,
    readonly expr: Sql,
    readonly dialect: DialectName,
  ) { super(); }
  bind(ctx: CompileContext): BoundSql {
    checkDialect(`UnaryOp`, this.dialect, ctx);
    return sql`(${this.op} ${this.expr})`;
  }
  override children(): readonly Sql[] { return [this.op, this.expr]; }
}

// `CAST(expr AS T)` — dialect-aware emission lives here so callers
// (TypedParam, Any.cast(), etc.) don't templating CAST inline.
export class Cast extends Sql {
  constructor(
    readonly expr: Sql,
    readonly typname: Sql,
    readonly dialect: DialectName,
  ) { super(); }
  bind(ctx: CompileContext): BoundSql {
    checkDialect(`Cast`, this.dialect, ctx);
    // Both PG and SQLite accept CAST(expr AS typename); typename keyspace
    // differs per-dialect but that's the caller's concern (the typname
    // Sql node already carries the right dialect-specific identifier).
    return sql`CAST(${this.expr} AS ${this.typname})`;
  }
  override children(): readonly Sql[] { return [this.expr, this.typname]; }
}

// `CAST($n AS T)` for a TS primitive flowing into a typed pg expression.
export class TypedParam extends Sql {
  constructor(
    readonly value: Param,
    readonly typname: Sql,
    readonly dialect: DialectName,
  ) { super(); }
  bind(ctx: CompileContext): BoundSql {
    return new Cast(this.value, this.typname, this.dialect).bind(ctx);
  }
  override children(): readonly Sql[] { return [this.value, this.typname]; }
}

// Extract the Sql node from an unknown arg. Typegres values (any subclass
// of `SqlValue`) expose `.toSql()`; anything else gets wrapped as a
// bound parameter.
export const argToSql = (arg: unknown): Sql =>
  arg instanceof SqlValue ? arg.toSql() : sql.param(arg);

// Set-returning function result — a Fromable for use in FROM/JOIN.
// columns is the row shape: [[name, constructor], ...]. Single-column SRFs
// pass a 1-element array; multi-column SRFs with OUT params pass N entries.
export class Srf<R extends { [key: string]: SqlValue<any> }, A extends string> extends Sql {
  readonly tsAlias: A;
  #name: string;
  #columns: [string, typeof SqlValue][];
  #argsSql: Sql;
  #dialect: DialectName;

  constructor(name: A, args: unknown[], columns: [string, typeof SqlValue<any>][]) {
    super();
    if (columns.length === 0) {
      throw new Error(`Srf '${name}' constructed with zero columns; every Srf must project at least one column.`);
    }
    this.tsAlias = name;
    this.#name = name;
    this.#columns = columns;
    this.#argsSql = sql.join(args.map(argToSql));
    // Every column shares the same dialect (they all come from a single
    // codegen'd call, tagged by the return-type constructor); the first
    // column's is authoritative.
    this.#dialect = columns[0]![1].dialect.name;
  }

  // Shape-only: columns hold sql.unbound(). QB's reAlias replaces with
  // real `Column(alias, key)` refs at bind time.
  rowType(): R {
    return Object.fromEntries(
      this.#columns.map(([colName, type]) => [colName, type.from(sql.unbound())]),
    ) as R;
  }

  // FROM-clause source fragment (pre-AS). QB appends `AS <alias>`.
  override bind(ctx: CompileContext): BoundSql {
    checkDialect(`Srf '${this.#name}'`, this.#dialect, ctx);
    return sql`${ctx.database.scopedIdent(this.#name)}(${this.#argsSql})`;
  }

  // Expose the args fragment so generic tree walkers (extractor, linting,
  // future live-query predicate extraction) can see the expressions passed
  // into the SRF rather than stopping at the opaque boundary.
  override children(): readonly Sql[] {
    return [this.#argsSql];
  }
}

// Sentinel for SQL that must be replaced before compile. Used by rowType()
// outputs: column refs on a row-shape instance reference sql.unbound()
// until the query builder reAlias'es them to a real, scoped alias. If one
// reaches compile, it means a rowType() output leaked in without being
// rebound — loud error is intentional.
export class Unbound extends Sql {
  bind(): BoundSql {
    throw new Error(
      "Unbound SQL reached compile — a rowType() column was not reAlias'd. " +
      "rowType() is for shape inspection only; its column refs must be rebound by the query builder before being compiled.",
    );
  }
}

// --- Compile ---

const quoteIdent = (name: string): string => `"${name.replace(/"/g, '""')}"`;

// Placeholder syntax per dialect. Exhaustive over `DialectName` — if a
// new dialect is added, TS's `never` check on the fallback throw
// forces a compile-time update here rather than a silent misfire.
const paramForDialect = (dialect: DialectName, position: number): string => {
  switch (dialect) {
    case "postgres": return `$${position}`;
    case "sqlite":   return "?";
    default: {
      const _exhaustive: never = dialect;
      throw new Error(`Unknown dialect: ${String(_exhaustive)}`);
    }
  }
};

// Walk the Sql tree with a stack of iterators. Each frame is either
// a single-node iterator or a Join's interleaved parts iterator. WithScope
// frames stash the previous scope to restore on pop.
type Frame = { iter: Iterator<Sql>; prevScope?: Scope };

export const compile = (root: Sql, ctx: CompileContext): CompiledSql => {
  const values: unknown[] = [];
  const out: string[] = [];
  let scope = new Scope();
  const stack: Frame[] = [{ iter: [root][Symbol.iterator]() }];

  while (stack.length > 0) {
    const top = stack[stack.length - 1]!;
    const next = top.iter.next();
    if (next.done) {
      if (top.prevScope) { scope = top.prevScope; }
      stack.pop();
      continue;
    }
    const atom = next.value.bind(ctx);
    if (atom instanceof Raw) {
      out.push(atom.value);
    } else if (atom instanceof Ident) {
      out.push(quoteIdent(atom.name));
    } else if (atom instanceof Param) {
      values.push(atom.value);
      out.push(paramForDialect(ctx.database.dialect, values.length));
    } else if (atom instanceof Alias) {
      const resolved = scope.resolve(atom);
      if (!resolved) {
        throw new Error(
          `Unknown alias '${atom.tsAlias}' — a column reference was emitted without its Fromable being registered in the current scope. ` +
          `This usually means a Sql fragment was compiled outside of the query-builder flow, or a hand-written Sql references a Table whose FROM clause isn't included.`,
        );
      }
      out.push(quoteIdent(resolved));
    } else if (atom instanceof Join) {
      stack.push({ iter: atom.iter() });
    } else if (atom instanceof WithScope) {
      const prev = scope;
      scope = scope.child();
      for (const a of atom.aliases) { scope.register(a); }
      stack.push({ iter: [atom.child][Symbol.iterator](), prevScope: prev });
    }
  }

  return { text: out.join(""), values };
};

// --- Tagged template + static helpers ---

function _sql(strings: TemplateStringsArray): Raw;
function _sql(strings: TemplateStringsArray, ...exprs: unknown[]): BoundSql;
function _sql(strings: TemplateStringsArray, ...exprs: unknown[]): BoundSql {
  if (exprs.length === 0) { return new Raw(strings[0]!); }
  const parts: Sql[] = [];
  for (const [i, s] of strings.entries()) {
    if (s) { parts.push(new Raw(s)); }
    if (i < exprs.length) {
      const expr = exprs[i];
      if (expr instanceof Sql) {
        parts.push(expr);
      } else if (
        // Duck-typed: any object exposing `toSql(): Sql` gets inlined
        // as its compiled form instead of being parameterized. This
        // is how typegres' `Any` (and anything else built on top of
        // Sql) splices into raw templates without an explicit
        // `.toSql()` call at the call site. Importing Any here would
        // cycle through types/runtime/sql.
        expr !== null && typeof expr === "object" && typeof (expr as { toSql?: unknown }).toSql === "function"
      ) {
        const out = (expr as { toSql: () => unknown }).toSql();
        if (!(out instanceof Sql)) {
          throw new Error(
            `toSql() must return an instance of Sql — got ${typeof out} from ${expr}.` 
          );
        }
        parts.push(out);
      } else {
        parts.push(new Param(expr));
      }
    }
  }
  return new Join(parts);
}

_sql.param = (value: unknown): BoundSql => new Param(value);
// Provided for clients, not to be used internally (internal code should use literal templates instead of `raw`.)
_sql.raw = (s: string): BoundSql => new Raw(s);
// No `sql.ident` helper: schema-referencing identifiers must carry a
// Database for the compile-time provenance check, so callers go
// through `db.scopedIdent(name)`. The `Ident` class is still exported
// for library-internal callers that need to construct untagged
// identifiers (CTE aliases, output column labels) inline.
_sql.column = (table: Alias, name: Ident): Sql => new Column(table, name);
_sql.unbound = (): Sql => new Unbound();
_sql.withScope = (aliases: readonly Alias[], child: Sql): BoundSql => new WithScope(aliases, child);

_sql.join = (builders: readonly (Sql | null | undefined | false)[], separator: Sql = new Raw(", ")): BoundSql => {
  return new Join(
    builders.filter((b): b is Sql => b !== null && b !== undefined && b !== false),
    separator,
  );
};

export const sql = _sql;
