// --- Compile context ---

// Unique identity for a table reference. No name — scope assigns the resolved name.
export class TableAlias {}

export class Scope {
  #parent: Scope | undefined;
  #aliases = new Map<TableAlias, string>();
  #usedNames = new Set<string>();

  constructor(parent?: Scope) {
    this.#parent = parent;
  }

  // Register an alias with a preferred name. Returns the resolved (possibly renamed) name.
  register(alias: TableAlias, preferredName: string): string {
    let name = preferredName;
    // Check for name collision in all visible scopes
    let i = 2;
    while (this.#nameExists(name)) {
      name = `${preferredName}_${i}`;
      i++;
    }
    this.#aliases.set(alias, name);
    this.#usedNames.add(name);
    return name;
  }

  resolve(alias: TableAlias): string {
    const local = this.#aliases.get(alias);
    if (local) { return local; }
    if (this.#parent) { return this.#parent.resolve(alias); }
    throw new Error("Unknown table alias");
  }

  child(): Scope {
    return new Scope(this);
  }

  #nameExists(name: string): boolean {
    return this.#usedNames.has(name) || (this.#parent ? this.#parent.#nameExists(name) : false);
  }
}

export type CompileContext = {
  style: "pg" | "sqlite";
  scope: Scope;
  values: unknown[];
};

export type CompiledSql = { text: string; values: unknown[] };

// --- Sql base class ---

export abstract class Sql {
  abstract emit(ctx: CompileContext): string;

  compile(style: "pg" | "sqlite" = "pg"): CompiledSql {
    const ctx: CompileContext = { style, scope: new Scope(), values: [] };
    const text = this.emit(ctx);
    return { text, values: ctx.values };
  }
}

// --- Leaf nodes ---

export class Raw extends Sql {
  constructor(readonly sql: string) { super(); }
  emit(): string { return this.sql; }
}

export class Param extends Sql {
  constructor(readonly value: unknown) { super(); }
  emit(ctx: CompileContext): string {
    ctx.values.push(this.value);
    return ctx.style === "pg" ? `$${ctx.values.length}` : "?";
  }
}

export class Ident extends Sql {
  constructor(readonly name: string) { super(); }
  emit(): string { return `"${this.name.replace(/"/g, '""')}"`; }
}

export class Column extends Sql {
  constructor(readonly table: TableAlias, readonly column: string) { super(); }
  emit(ctx: CompileContext): string {
    const resolved = ctx.scope.resolve(this.table);
    return `"${resolved}"."${this.column}"`;
  }
}

export class TableRef extends Sql {
  constructor(readonly table: TableAlias) { super(); }
  emit(ctx: CompileContext): string {
    const resolved = ctx.scope.resolve(this.table);
    return `"${resolved}"`;
  }
}

// Sequence of Sql nodes — produced by tagged template
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
    const argsSql = this.args.map((a) => a.emit(ctx)).join(", ");
    return `"${this.name}"(${argsSql})`;
  }
}

export class Op extends Sql {
  constructor(readonly op: string, readonly lhs: Sql, readonly rhs: Sql) { super(); }
  emit(ctx: CompileContext): string {
    return `(${this.lhs.emit(ctx)} ${this.op} ${this.rhs.emit(ctx)})`;
  }
}

// --- Struct nodes ---

export class Select extends Sql {
  constructor(readonly opts: {
    output: Sql[];
    from?: Sql;
    joins?: { type?: "left"; from: Sql; on: Sql }[];
    where?: Sql;
    groupBy?: Sql[];
    having?: Sql;
    orderBy?: { expr: Sql; dir?: "asc" | "desc" }[];
    limit?: number;
    offset?: number;
  }) { super(); }

  emit(ctx: CompileContext): string {
    const childCtx = { ...ctx, scope: ctx.scope.child() };
    const parts: string[] = [];
    parts.push(`SELECT ${this.opts.output.map((o) => o.emit(childCtx)).join(", ")}`);
    if (this.opts.from) {
      parts.push(`FROM ${this.opts.from.emit(childCtx)}`);
    }
    if (this.opts.joins) {
      for (const j of this.opts.joins) {
        const kw = j.type === "left" ? "LEFT JOIN" : "JOIN";
        parts.push(`${kw} ${j.from.emit(childCtx)} ON ${j.on.emit(childCtx)}`);
      }
    }
    if (this.opts.where) {
      parts.push(`WHERE ${this.opts.where.emit(childCtx)}`);
    }
    if (this.opts.groupBy && this.opts.groupBy.length > 0) {
      parts.push(`GROUP BY ${this.opts.groupBy.map((g) => g.emit(childCtx)).join(", ")}`);
    }
    if (this.opts.having) {
      parts.push(`HAVING ${this.opts.having.emit(childCtx)}`);
    }
    if (this.opts.orderBy && this.opts.orderBy.length > 0) {
      const entries = this.opts.orderBy.map((o) => {
        const expr = o.expr.emit(childCtx);
        if (o.dir === "desc") { return `${expr} DESC`; }
        if (o.dir === "asc") { return `${expr} ASC`; }
        return expr;
      });
      parts.push(`ORDER BY ${entries.join(", ")}`);
    }
    if (this.opts.limit !== undefined) {
      parts.push(`LIMIT ${new Param(this.opts.limit).emit(ctx)}`);
    }
    if (this.opts.offset !== undefined) {
      parts.push(`OFFSET ${new Param(this.opts.offset).emit(ctx)}`);
    }
    return parts.join("\n");
  }
}

export class Insert extends Sql {
  constructor(readonly opts: {
    table: string;
    columns: string[];
    values: Sql[][];
    returning?: Sql[];
  }) { super(); }

  emit(ctx: CompileContext): string {
    const cols = this.opts.columns.map((c) => `"${c}"`).join(", ");
    const rows = this.opts.values.map((row) =>
      `(${row.map((v) => v.emit(ctx)).join(", ")})`
    ).join(", ");
    let text = `INSERT INTO "${this.opts.table}" (${cols}) VALUES ${rows}`;
    if (this.opts.returning && this.opts.returning.length > 0) {
      text += ` RETURNING ${this.opts.returning.map((r) => r.emit(ctx)).join(", ")}`;
    }
    return text;
  }
}

export class Update extends Sql {
  constructor(readonly opts: {
    table: string;
    set: Sql[];
    where?: Sql;
    returning?: Sql[];
  }) { super(); }

  emit(ctx: CompileContext): string {
    let text = `UPDATE "${this.opts.table}" SET ${this.opts.set.map((s) => s.emit(ctx)).join(", ")}`;
    if (this.opts.where) {
      text += ` WHERE ${this.opts.where.emit(ctx)}`;
    }
    if (this.opts.returning && this.opts.returning.length > 0) {
      text += ` RETURNING ${this.opts.returning.map((r) => r.emit(ctx)).join(", ")}`;
    }
    return text;
  }
}

export class Delete extends Sql {
  constructor(readonly opts: {
    table: string;
    where?: Sql;
    returning?: Sql[];
  }) { super(); }

  emit(ctx: CompileContext): string {
    let text = `DELETE FROM "${this.opts.table}"`;
    if (this.opts.where) {
      text += ` WHERE ${this.opts.where.emit(ctx)}`;
    }
    if (this.opts.returning && this.opts.returning.length > 0) {
      text += ` RETURNING ${this.opts.returning.map((r) => r.emit(ctx)).join(", ")}`;
    }
    return text;
  }
}

export class Srf extends Sql {
  constructor(readonly name: string, readonly args: Sql[], readonly alias: TableAlias) { super(); }
  emit(ctx: CompileContext): string {
    const resolved = ctx.scope.register(this.alias, this.name);
    const argsSql = this.args.map((a) => a.emit(ctx)).join(", ");
    return `"${this.name}"(${argsSql}) AS "${resolved}"`;
  }
}

export class TableSource extends Sql {
  constructor(readonly tableName: string, readonly alias: TableAlias) { super(); }
  emit(ctx: CompileContext): string {
    const resolved = ctx.scope.register(this.alias, this.tableName);
    if (resolved === this.tableName) {
      return `"${this.tableName}"`;
    }
    return `"${this.tableName}" AS "${resolved}"`;
  }
}

export class Subquery extends Sql {
  constructor(readonly query: Sql, readonly alias: TableAlias, readonly preferredName: string) { super(); }
  emit(ctx: CompileContext): string {
    const resolved = ctx.scope.register(this.alias, this.preferredName);
    return `(${this.query.emit(ctx)}) AS "${resolved}"`;
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
