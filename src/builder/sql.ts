export type CompiledSql = { text: string; values: unknown[] };

// --- Root ---

// Every SQL node extends Sql. bind() produces a single BoundSql — one of
// the 6 atom classes below. Composite nodes (Column, Func, Op, UnaryOp,
// and query/mutation builders) rewrite themselves into a Join via
// sql`...` templates.
//
// children() exposes direct sub-expressions for generic tree walks
// (extractor, linting). Default is []; override on composites.
export abstract class Sql {
  abstract bind(): BoundSql;
  children(): readonly Sql[] { return []; }
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
  constructor(readonly name: string) { super(); }
  bind(): BoundSql { return this; }
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
  constructor(readonly table: Alias, readonly name: Sql) { super(); }
  bind(): BoundSql { return sql`${this.table}.${this.name}`; }
  override children(): readonly Sql[] { return [this.table, this.name]; }
}

export class Func extends Sql {
  constructor(readonly name: string, readonly args: readonly Sql[]) { super(); }
  bind(): BoundSql { return sql`${sql.ident(this.name)}(${sql.join(this.args)})`; }
  override children(): readonly Sql[] { return this.args; }
}

export class Op extends Sql {
  constructor(readonly op: Sql, readonly lhs: Sql, readonly rhs: Sql) { super(); }
  bind(): BoundSql { return sql`(${this.lhs} ${this.op} ${this.rhs})`; }
  override children(): readonly Sql[] { return [this.op, this.lhs, this.rhs]; }
}

export class UnaryOp extends Sql {
  constructor(readonly op: Sql, readonly expr: Sql) { super(); }
  bind(): BoundSql { return sql`(${this.op} ${this.expr})`; }
  override children(): readonly Sql[] { return [this.op, this.expr]; }
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

// Walk the Sql tree with a stack of iterators. Each frame is either
// a single-node iterator or a Join's interleaved parts iterator. WithScope
// frames stash the previous scope to restore on pop.
type Frame = { iter: Iterator<Sql>; prevScope?: Scope };

export const compile = (root: Sql, style: "pg" | "sqlite" = "pg"): CompiledSql => {
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
    const atom = next.value.bind();
    if (atom instanceof Raw) {
      out.push(atom.value);
    } else if (atom instanceof Ident) {
      out.push(quoteIdent(atom.name));
    } else if (atom instanceof Param) {
      values.push(atom.value);
      out.push(style === "pg" ? `$${values.length}` : "?");
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

const _sql = (strings: TemplateStringsArray, ...exprs: unknown[]): BoundSql => {
  const parts: Sql[] = [];
  for (const [i, s] of strings.entries()) {
    if (s) { parts.push(new Raw(s)); }
    if (i < exprs.length) {
      const expr = exprs[i];
      parts.push(expr instanceof Sql ? expr : new Param(expr));
    }
  }
  return new Join(parts);
};

_sql.param = (value: unknown): BoundSql => new Param(value);
// Provided for clients, not to be used internally (internal code should use literal templates instead of `raw`.)
_sql.raw = (s: string): BoundSql => new Raw(s);
_sql.ident = (name: string): BoundSql => new Ident(name);
_sql.column = (table: Alias, name: Sql): Sql => new Column(table, name);
_sql.unbound = (): Sql => new Unbound();
_sql.withScope = (aliases: readonly Alias[], child: Sql): BoundSql => new WithScope(aliases, child);

_sql.join = (builders: readonly (Sql | null | undefined | false)[], separator: Sql = new Raw(", ")): BoundSql => {
  return new Join(
    builders.filter((b): b is Sql => b !== null && b !== undefined && b !== false),
    separator,
  );
};

export const sql = _sql;
