import { RawBuilder, sql } from "kysely";
import type { RowLike } from "./query/values";

export class QueryAlias {
  constructor(public name: string) {}
}

export class Context {
  // The list of tables in the current context (including aliases for subqueries)
  public namespace: Map<QueryAlias, string>;
  public usedAliases: Set<string>;

  private constructor(namespace: Map<QueryAlias, string>) {
    this.namespace = namespace;
    this.usedAliases = new Set(namespace.values());
  }

  static new() {
    return new Context(new Map());
  }

  withReference(ref: string) {
    if (this.usedAliases.has(ref)) {
      throw new Error(`Alias "${ref}" already exists in the current context.`);
    }
    const newNamespace = new Map(this.namespace);
    newNamespace.set(new QueryAlias(ref), ref);
    return new Context(newNamespace);
  }

  withAliases(aliases: QueryAlias[]) {
    const newNamespace = new Map(this.namespace);
    for (const alias of aliases) {
      let aliasName = alias.name;
      if (this.usedAliases.has(alias.name)) {
        for (const i of Array(100).keys()) {
          aliasName = `${alias}_${i}`;
          if (!this.usedAliases.has(aliasName)) {
            break;
          }
          if (i === 99) {
            throw new Error(
              `Alias ${aliasName} already exists in the current context: ${JSON.stringify(Array.from(this.usedAliases))}`,
            );
          }
        }
      }

      newNamespace.set(alias, aliasName);
    }

    return new Context(newNamespace);
  }

  getAlias(alias: QueryAlias): string {
    const name = this.namespace.get(alias);
    if (!name) {
      throw new Error(
        `Alias "${alias.name}" not found in the current context: ${JSON.stringify(Array.from(this.usedAliases))} / ${JSON.stringify(Array.from(this.namespace))}`,
      );
    }
    return name;
  }
}

export abstract class Expression {
  abstract compile(ctx: Context): RawBuilder<unknown>;
}

export class LiteralExpression extends Expression {
  constructor(
    public value: unknown | null,
    public type: string,
  ) {
    super();
  }

  compile() {
    return sql`cast(${this.value} as ${sql.raw(this.type)})`;
  }
}

export class LiteralUnknownExpression extends Expression {
  constructor(public value: unknown | null) {
    super();
  }

  compile() {
    return sql`${this.value}`;
  }
}

export class FunctionExpression extends Expression {
  constructor(
    public name: string,
    public args: Expression[],
  ) {
    super();
  }

  compile(ctx: Context) {
    return sql`${sql.ref(this.name)}(${sql.join(
      this.args.map((arg) => arg.compile(ctx)),
    )})`;
  }
}

export class BinaryOperatorExpression extends Expression {
  constructor(
    public operator: string,
    public args: [Expression, Expression],
  ) {
    super();
  }

  compile(ctx: Context) {
    return sql`${this.args[0].compile(ctx)} ${sql.raw(
      this.operator,
    )} ${this.args[1].compile(ctx)}`;
  }
}

export abstract class SelectableExpression extends Expression {
  constructor(public schema: RowLike) {
    super();
  }

  tableColumnAlias() {
    const keys = Object.keys(this.schema)
      .toSorted((k1, k2) => k1.localeCompare(k2))
      .map((key) => sql.ref(key));
    return sql.join(keys);
  }
}