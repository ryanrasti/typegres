import { RpcTarget } from "../../packages/capnweb/dist/index.js";

// --- Alias & scope ---

// An Alias is a Fromable's identity in the compile scope. Columns reference
// it; the scope maps alias-instance → resolved name (with suffixing on
// conflict). Every Fromable instance holds its own Alias — two Fromables
// with the same tsAlias get different identities, so they register as
// distinct aliases.
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

export abstract class Sql extends RpcTarget {
  constructor() {
    super();
  }

  // Internal: emit SQL string, mutating ctx for params and scope
  abstract emit(ctx: CompileContext): string;

  // Public entry point: compile to final SQL with param numbering
  compile(style: "pg" | "sqlite" = "pg"): CompiledSql {
    const ctx = new CompileContext(style);
    const text = this.emit(ctx);
    return { text, values: ctx.values };
  }
}

// --- Leaf nodes ---

export class Raw extends Sql {
  constructor(readonly value: string) { super(); }
  emit(): string { return this.value; }
}

export class Param extends Sql {
  constructor(readonly value: unknown) { super(); }
  emit(ctx: CompileContext): string { return ctx.param(this.value); }
}

export class Ident extends Sql {
  constructor(readonly name: string) { super(); }
  emit(): string { return `"${this.name.replace(/"/g, '""')}"`; }
}

export class Column extends Sql {
  constructor(readonly table: Alias, readonly name: string) { super(); }
  emit(ctx: CompileContext): string {
    return `${this.table.emit(ctx)}."${this.name}"`;
  }
}

export class TableRef extends Sql {
  constructor(readonly table: Alias) { super(); }
  emit(ctx: CompileContext): string {
    return this.table.emit(ctx);
  }
}

export class Seq extends Sql {
  constructor(readonly children: readonly Sql[]) { super(); }
  emit(ctx: CompileContext): string {
    return this.children.map((c) => c.emit(ctx)).join("");
  }
}

// --- Expression nodes ---

export class Func extends Sql {
  constructor(readonly name: string, readonly args: Sql[]) { super(); }
  emit(ctx: CompileContext): string {
    return `"${this.name}"(${this.args.map((a) => a.emit(ctx)).join(", ")})`;
  }
}

export class Op extends Sql {
  constructor(readonly op: string, readonly lhs: Sql, readonly rhs: Sql) { super(); }
  emit(ctx: CompileContext): string {
    return `(${this.lhs.emit(ctx)} ${this.op} ${this.rhs.emit(ctx)})`;
  }
}

export class UnaryOp extends Sql {
  constructor(readonly op: string, readonly expr: Sql) { super(); }
  emit(ctx: CompileContext): string {
    return `(${this.op} ${this.expr.emit(ctx)})`;
  }
}

// --- Tagged template + static helpers ---

const _sql = (strings: TemplateStringsArray, ...exprs: unknown[]): Sql => {
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
  return children.length === 1 ? children[0]! : new Seq(children);
};

_sql.param = (value: unknown): Sql => new Param(value);
_sql.raw = (s: string): Sql => new Raw(s);
_sql.ident = (name: string): Sql => new Ident(name);
_sql.column = (table: Alias, name: string): Sql => new Column(table, name);
_sql.tableRef = (table: Alias): Sql => new TableRef(table);

// Tiny Sql node that registers an alias and emits nothing. Lets callers
// manually bring an alias into scope (e.g., when hand-constructing SQL that
// references table columns but doesn't include the table in a normal FROM
// clause). Mostly used by live-query wrap helpers.
class RegisterAlias extends Sql {
  constructor(readonly alias: Alias) { super(); }
  emit(ctx: CompileContext): string {
    ctx.register(this.alias);
    return "";
  }
}
_sql.register = (alias: Alias): Sql => new RegisterAlias(alias);

_sql.join = (builders: (Sql | null | undefined | false)[], separator = sql`, `): Sql => {
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
