export type CompiledSql = { text: string; values: unknown[] };

// --- Sql base class ---

// Sql is the abstract root. Builder-style nodes (QueryBuilder,
// Insert/Update/Delete, Values, PgSrf) extend Sql directly and implement
// bind() to materialize themselves into a BoundSql tree. Leaf nodes extend
// BoundSql, which adds emit() + compile().
export abstract class Sql {
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
export class Alias<A extends string = string> extends BoundSql {
  constructor(readonly tsAlias: A) { super(); }

  emit(ctx: CompileContext): string {
    const resolved = ctx.scope.resolve(this);
    if (!resolved) {
      throw new Error(
        `Unknown alias '${this.tsAlias}' — a column reference was emitted without its Fromable being registered in the current scope. ` +
        `This usually means a Sql fragment was compiled outside of the query-builder flow, or a hand-written Sql references a Table whose FROM clause isn't included.`,
      );
    }
    return `"${resolved.replace(/"/g, '""')}"`;
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

// --- Compile context ---

// Mutable state threaded through emit(): scope stack for alias resolution,
// param values accumulated in order, and the SQL dialect.
class CompileContext {
  scope = new Scope();
  values: unknown[] = [];
  constructor(readonly style: "pg" | "sqlite") {}
}

// --- Leaf nodes ---

export class Raw extends BoundSql {
  constructor(readonly value: string) { super(); }
  emit(): string { return this.value; }
}

export class Param extends BoundSql {
  constructor(readonly value: unknown) { super(); }
  emit(ctx: CompileContext): string {
    ctx.values.push(this.value);
    return ctx.style === "pg" ? `$${ctx.values.length}` : "?";
  }
}

export class Ident extends BoundSql {
  constructor(readonly name: string) { super(); }
  emit(): string { return `"${this.name.replace(/"/g, '""')}"`; }
}

export class Column extends BoundSql {
  constructor(readonly table: Alias, readonly name: BoundSql) { super(); }
  emit(ctx: CompileContext): string {
    return `${this.table.emit(ctx)}.${this.name.emit(ctx)}`;
  }
}

export class Join extends BoundSql {
  constructor(readonly children: readonly Sql[], readonly separator: Sql = new Raw("")) { super(); }
  emit(ctx: CompileContext): string {
    const sep = this.separator.bind().emit(ctx);
    return this.children.map((c) => c.bind().emit(ctx)).join(sep);
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
  return new Join(children);
};

_sql.param = (value: unknown): BoundSql => new Param(value);
_sql.raw = (s: string): BoundSql => new Raw(s);
_sql.ident = (name: string): BoundSql => new Ident(name);
_sql.column = (table: Alias, name: BoundSql): BoundSql => new Column(table, name);

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
    const prev = ctx.scope;
    ctx.scope = prev.child();
    try {
      for (const a of this.aliases) { ctx.scope.register(a); }
      return this.child.bind().emit(ctx);
    } finally {
      ctx.scope = prev;
    }
  }
}
_sql.withScope = (aliases: readonly Alias[], child: Sql): BoundSql => new WithScope(aliases, child);

_sql.join = (builders: (Sql | null | undefined | false)[], separator: Sql = sql`, `): BoundSql => {
  return new Join(builders.filter((b): b is Sql => b !== null && b !== undefined && b !== false), separator);
};

export const sql = _sql;
