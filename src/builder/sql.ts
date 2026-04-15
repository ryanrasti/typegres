// --- Table alias & scope ---

export class TableAlias {}

export class Scope {
  parent: Scope | undefined;
  aliases = new Map<TableAlias, string>();
  usedNames = new Set<string>();

  constructor(parent?: Scope) {
    this.parent = parent;
  }

  register(alias: TableAlias, preferredName: string): string {
    let name = preferredName;
    let i = 2;
    while (this.nameExists(name)) {
      name = `${preferredName}_${i}`;
      i++;
    }
    this.aliases.set(alias, name);
    this.usedNames.add(name);
    return name;
  }

  resolve(alias: TableAlias): string {
    const local = this.aliases.get(alias);
    if (local) { return local; }
    if (this.parent) { return this.parent.resolve(alias); }
    throw new Error("Unknown table alias");
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

  register(alias: TableAlias, name: string): string {
    return this.scope.register(alias, name);
  }

  resolve(alias: TableAlias): string {
    return this.scope.resolve(alias);
  }

  child<T>(fn: () => T): T {
    const prev = this.scope;
    this.scope = this.scope.child();
    const result = fn();
    this.scope = prev;
    return result;
  }
}

export type CompiledSql = { text: string; values: unknown[] };

// --- Sql base class ---

export abstract class Sql {
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
  constructor(readonly table: TableAlias, readonly name: string) { super(); }
  emit(ctx: CompileContext): string {
    return `"${ctx.resolve(this.table)}"."${this.name}"`;
  }
}

export class TableRef extends Sql {
  constructor(readonly table: TableAlias) { super(); }
  emit(ctx: CompileContext): string {
    return `"${ctx.resolve(this.table)}"`;
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
_sql.column = (table: TableAlias, name: string): Sql => new Column(table, name);
_sql.tableRef = (table: TableAlias): Sql => new TableRef(table);
_sql.tableAlias = (): TableAlias => new TableAlias();

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
