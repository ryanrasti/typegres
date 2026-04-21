import { RpcTarget } from "../../packages/capnweb/dist/index.js";

// --- Alias & scope ---

// An Alias is a Fromable's identity in the compile scope. Columns reference
// it; the scope maps alias-instance → resolved pg variable name at emit
// time (with suffixing on conflict).
//
// Aliases are *ephemeral to a single compile* — they must not be stored on
// classes or long-lived objects. Doing so would let a single class reused
// across multiple compilations (or multiple slots in the same query) share
// one alias identity, which breaks the one-instance-per-FROM-occurrence
// invariant the scope relies on. Instead, every bind()/rowType() call
// mints fresh Aliases; QB's reAlias rebinds column refs to them. The
// alias identity exists only for the duration of compilation.
export class Alias<A extends string = string> extends RpcTarget {
  constructor(readonly tsAlias: A) { super(); }

  emit(ctx: CompileContext): string {
    const resolved = ctx.resolve(this);
    return sql.ident(resolved).emit(ctx);
  }
}

export class Scope {
  parent: Scope | undefined;
  aliases = new Map<Alias, string>();
  usedNames = new Set<string>();

  constructor(parent?: Scope) {
    this.parent = parent;
  }

  register(alias: Alias): string {
    // Only the *parent* chain is a bug: an alias registered in an outer
    // scope can't be re-registered in an inner one (that would mean the
    // same Fromable appeared in both an outer FROM and a subquery's FROM).
    // Duplicates within the same scope are allowed — sibling subqueries
    // can reuse the same alias identity independently.
    if (this.parent?.resolve(alias) !== undefined) {
      throw new Error(
        `Alias '${alias.tsAlias}' already registered in an enclosing scope. ` +
        `A Fromable instance can't appear in both an outer query and a subquery — use a fresh instance.`,
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
    const local = this.aliases.get(alias);
    if (local) { return local; }
    if (this.parent) { return this.parent.resolve(alias); }
    return undefined;
  }

  child(): Scope {
    return new Scope(this);
  }

  nameExists(name: string): boolean {
    return this.usedNames.has(name) || (this.parent ? this.parent.nameExists(name) : false);
  }
}

// --- Compile context ---

export class CompileContext {
  style: "pg" | "sqlite";
  scope: Scope;
  values: unknown[] = [];

  constructor(style: "pg" | "sqlite", scope?: Scope) {
    this.style = style;
    this.scope = scope ?? new Scope();
  }

  param(v: unknown): string {
    this.values.push(v);
    return this.style === "pg" ? `$${this.values.length}` : "?";
  }

  register(alias: Alias): string {
    return this.scope.register(alias);
  }

  resolve(alias: Alias): string {
    const resolved = this.scope.resolve(alias);
    if (!resolved) {
      throw new Error(
        `Unknown alias '${alias.tsAlias}' — a column reference was emitted without its Fromable being registered in the current scope. ` +
        `This usually means a Sql fragment was compiled outside of the query-builder flow, or a hand-written Sql references a Table whose FROM clause isn't included.`,
      );
    }
    return resolved;
  }

  get isTopLevel(): boolean {
    return this.scope.parent === undefined;
  }

  child(): Disposable {
    const prev = this.scope;
    this.scope = this.scope.child();
    return { [Symbol.dispose]: () => { this.scope = prev; } };
  }
}

export type CompiledSql = { text: string; values: unknown[] };

// --- Sql base class ---

// Sql is the abstract root. Builder-style nodes (QueryBuilder,
// Insert/Update/Delete, Values, PgSrf) extend Sql directly and implement
// bind() to materialize themselves into a BoundSql tree. Leaf nodes extend
// BoundSql, which adds emit() + compile().
export abstract class Sql extends RpcTarget {
  abstract bind(): BoundSql;
}

export abstract class BoundSql extends Sql {
  abstract emit(ctx: CompileContext): string;
  bind(): BoundSql { return this; }
  compile(style: "pg" | "sqlite" = "pg"): CompiledSql {
    const ctx = new CompileContext(style);
    const text = this.emit(ctx);
    return { text, values: ctx.values };
  }
}

// --- Leaf nodes ---

export class Raw extends BoundSql {
  constructor(readonly value: string) { super(); }
  emit(): string { return this.value; }
}

export class Param extends BoundSql {
  constructor(readonly value: unknown) { super(); }
  emit(ctx: CompileContext): string { return ctx.param(this.value); }
}

export class Ident extends BoundSql {
  constructor(readonly name: string) { super(); }
  emit(): string { return `"${this.name.replace(/"/g, '""')}"`; }
}

export class Column extends BoundSql {
  constructor(readonly table: Alias, readonly name: string) { super(); }
  emit(ctx: CompileContext): string {
    return `${this.table.emit(ctx)}."${this.name}"`;
  }
}

export class TableRef extends BoundSql {
  constructor(readonly table: Alias) { super(); }
  emit(ctx: CompileContext): string {
    return this.table.emit(ctx);
  }
}

export class Seq extends BoundSql {
  constructor(readonly children: readonly Sql[]) { super(); }
  emit(ctx: CompileContext): string {
    return this.children.map((c) => c.bind().emit(ctx)).join("");
  }
}

// --- Expression nodes ---

export class Func extends BoundSql {
  constructor(readonly name: string, readonly args: Sql[]) { super(); }
  emit(ctx: CompileContext): string {
    return `"${this.name}"(${this.args.map((a) => a.bind().emit(ctx)).join(", ")})`;
  }
}

export class Op extends BoundSql {
  constructor(readonly op: string, readonly lhs: Sql, readonly rhs: Sql) { super(); }
  emit(ctx: CompileContext): string {
    return `(${this.lhs.bind().emit(ctx)} ${this.op} ${this.rhs.bind().emit(ctx)})`;
  }
}

export class UnaryOp extends BoundSql {
  constructor(readonly op: string, readonly expr: Sql) { super(); }
  emit(ctx: CompileContext): string {
    return `(${this.op} ${this.expr.bind().emit(ctx)})`;
  }
}

// --- Tagged template + static helpers ---

const _sql = (strings: TemplateStringsArray, ...exprs: unknown[]): BoundSql => {
  const children: Sql[] = [];
  for (const [i, s] of strings.entries()) {
    if (s) { children.push(new Raw(s)); }
    if (i < exprs.length) {
      const expr = exprs[i];
      if (expr instanceof Sql) {
        children.push(expr);
      } else {
        children.push(new Param(expr));
      }
    }
  }
  return new Seq(children);
};

_sql.param = (value: unknown): BoundSql => new Param(value);
_sql.raw = (s: string): BoundSql => new Raw(s);
_sql.ident = (name: string): BoundSql => new Ident(name);
_sql.column = (table: Alias, name: string): BoundSql => new Column(table, name);
_sql.tableRef = (table: Alias): BoundSql => new TableRef(table);

// Sentinel for SQL that must be replaced before emit. Used by rowType()
// outputs: column refs on a row-shape instance reference sql.unbound()
// until the query builder reAlias'es them to a real, scoped alias at
// bind() time. If one reaches emit, it means a rowType() output leaked
// into compilation without being rebound — loud error is intentional.
export class Unbound extends BoundSql {
  emit(): string {
    throw new Error(
      "Unbound SQL reached emit — a rowType() column was compiled without being reAlias'd first. " +
      "rowType() is for shape inspection only; its column refs must be rebound by the query builder before being emitted.",
    );
  }
}
_sql.unbound = (): BoundSql => new Unbound();

// Scope primitive: pushes a child scope, registers the listed aliases in it,
// then emits child. Outer column refs to these aliases resolve via the child
// scope. When child emission completes, the scope is popped — sibling Sql
// trees don't see these aliases.
class WithScope extends BoundSql {
  constructor(readonly aliases: readonly Alias[], readonly child: Sql) { super(); }
  emit(ctx: CompileContext): string {
    using _ = ctx.child();
    for (const a of this.aliases) { ctx.register(a); }
    return this.child.bind().emit(ctx);
  }
}
_sql.withScope = (aliases: readonly Alias[], child: Sql): BoundSql => new WithScope(aliases, child);

_sql.join = (builders: (Sql | null | undefined | false)[], separator = sql`, `): BoundSql => {
  const children: Sql[] = [];
  let first = true;
  for (const b of builders) {
    if (b === null || b === undefined || b === false) { continue; }
    if (!first) { children.push(separator); }
    children.push(b);
    first = false;
  }
  return new Seq(children);
};

export const sql = _sql;
