type Fragment =
  | { kind: "param"; value: unknown }
  | { kind: "raw"; sql: string }
  | { kind: "ident"; name: string };

export type CompiledSql = { text: string; values: unknown[] };

export class Sql {
  readonly fragments: readonly Fragment[];

  constructor(fragments: readonly Fragment[] = []) {
    this.fragments = fragments;
  }

  compile(style: "pg" | "sqlite" = "pg"): CompiledSql {
    const values: unknown[] = [];
    let text = "";
    for (const f of this.fragments) {
      switch (f.kind) {
        case "raw":
          text += f.sql;
          break;
        case "param":
          values.push(f.value);
          text += style === "pg" ? `$${values.length}` : "?";
          break;
        case "ident":
          text += `"${f.name.replace(/"/g, '""')}"`;
          break;
      }
    }
    return { text, values };
  }
}

// Tagged template + static helpers, all under `sql`
const _sql = (strings: TemplateStringsArray, ...exprs: unknown[]): Sql => {
  const fragments: Fragment[] = [];
  for (const [i, s] of strings.entries()) {
    if (s) fragments.push({ kind: "raw", sql: s });
    if (i < exprs.length) {
      const expr = exprs[i];
      if (expr instanceof Sql) {
        fragments.push(...expr.fragments);
      } else {
        fragments.push({ kind: "param", value: expr });
      }
    }
  }
  return new Sql(fragments);
};

_sql.param = (value: unknown): Sql => new Sql([{ kind: "param", value }]);

_sql.raw = (s: string): Sql => new Sql([{ kind: "raw", sql: s }]);

_sql.ident = (name: string): Sql => new Sql([{ kind: "ident", name }]);

_sql.join = (builders: (Sql | null | undefined | false)[], separator = sql`, `): Sql => {
  const fragments: Fragment[] = [];
  for (const [i, b] of builders.entries()) {
    if (b === null || b === undefined || b === false) continue;
    if (i > 0) fragments.push(...separator.fragments);
    fragments.push(...b.fragments);
  }
  return new Sql(fragments);
};

export const sql = _sql;
