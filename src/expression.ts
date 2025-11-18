import { RawBuilder, sql } from "kysely";
import type { RowLike } from "./query/values";
import type { Any } from "./types";
import type { OrderBySpec } from "./query/order-by";
import { compileOrderBy } from "./query/order-by";
import { escapeLiteral } from "./escape-literal";

export class QueryAlias {
  constructor(public name: string) {}
}

export class Context {
  // The list of tables in the current context (including aliases for subqueries)
  public namespace: Map<QueryAlias, string>;
  public usedAliases: Set<string>;
  // Whether we are in a DDL context (e.g., CREATE TABLE) where query parameters are not allowed:
  public inDdl: boolean;

  private constructor(namespace: Map<QueryAlias, string>, inDdl: boolean) {
    this.namespace = namespace;
    this.usedAliases = new Set(namespace.values());
    this.inDdl = inDdl;
  }

  static new(opts?: { inDdl?: boolean }) {
    return new Context(new Map(), opts?.inDdl ?? false);
  }

  withReference(ref: string) {
    if (this.usedAliases.has(ref)) {
      throw new Error(`Alias "${ref}" already exists in the current context.`);
    }
    const newNamespace = new Map(this.namespace);
    newNamespace.set(new QueryAlias(ref), ref);
    return new Context(newNamespace, this.inDdl);
  }

  withAliases(aliases: QueryAlias[]) {
    const newNamespace = new Map(this.namespace);
    for (const alias of aliases) {
      if (newNamespace.has(alias)) {
        // Alias might already exist (e.g., a `with` clause)
        continue;
      }
      let aliasName = alias.name;
      if (this.usedAliases.has(alias.name)) {
        for (const i of Array(100).keys()) {
          aliasName = `${alias.name}_${i}`;
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

    return new Context(newNamespace, this.inDdl);
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

export interface ExpressionLike {
  compile: (ctx: Context) => RawBuilder<unknown>;
}

export const isExpressionLike = (value: unknown): value is ExpressionLike => {
  return (
    typeof value === "object" &&
    value !== null &&
    "compile" in value &&
    typeof (value as ExpressionLike).compile === "function"
  );
};

export class LiteralExpression extends Expression {
  constructor(
    public value: unknown | null,
    public type: string,
  ) {
    super();
  }

  compile(ctx: Context) {
    const value = ctx.inDdl ? sql.raw(escapeLiteral(String(this.value))) : this.value;
    return sql`cast(${value} as ${sql.raw(this.type)})`;
  }
}

export class LiteralUnknownExpression extends Expression {
  constructor(public value: unknown | null) {
    super();
  }

  compile(ctx: Context) {
    const value = ctx.inDdl ? sql.raw(escapeLiteral(String(this.value))) : this.value;
    return sql`${value}`;
  }
}

export class FunctionExpression extends Expression {
  constructor(
    public name: string,
    public args: Expression[],
    public isReserved: boolean = false,
  ) {
    super();
  }

  compile(ctx: Context) {
    const funcName = this.isReserved ? sql.ref(this.name) : sql.raw(this.name);
    return sql`${funcName}(${this.args.length === 0 ? sql`` : sql.join(this.args.map((arg) => arg.compile(ctx)))})`;
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
    return sql`(${this.args[0].compile(ctx)} ${sql.raw(this.operator)} ${this.args[1].compile(ctx)})`;
  }
}

export class UnaryOperatorExpression extends Expression {
  constructor(
    public operator: string,
    public arg: Expression,
    public isPostfix: boolean = false,
  ) {
    super();
  }

  compile(ctx: Context) {
    if (this.isPostfix) {
      return sql`(${this.arg.compile(ctx)} ${sql.raw(this.operator)})`;
    }
    return sql`(${sql.raw(this.operator)} ${this.arg.compile(ctx)})`;
  }
}

export class CastExpression extends Expression {
  constructor(
    public value: Expression,
    public targetType: string,
  ) {
    super();
  }

  compile(ctx: Context) {
    return sql`CAST(${this.value.compile(ctx)} AS ${sql.raw(this.targetType)})`;
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

export class InExpression extends Expression {
  constructor(
    public value: Expression,
    public list: Expression[] | Expression,
  ) {
    super();
  }

  compile(ctx: Context) {
    if (Array.isArray(this.list)) {
      return sql`(${this.value.compile(ctx)} IN (${sql.join(this.list.map((item) => item.compile(ctx)))}))`;
    }
    return sql`(${this.value.compile(ctx)} IN ${this.list.compile(ctx)})`;
  }
}

export class NotInExpression extends Expression {
  constructor(
    public value: Expression,
    public list: Expression[] | Expression,
  ) {
    super();
  }

  compile(ctx: Context) {
    if (Array.isArray(this.list)) {
      return sql`(${this.value.compile(ctx)} NOT IN (${sql.join(this.list.map((item) => item.compile(ctx)))}))`;
    }
    return sql`(${this.value.compile(ctx)} NOT IN ${this.list.compile(ctx)})`;
  }
}

export class ExistsExpression extends Expression {
  constructor(public subquery: Expression) {
    super();
  }

  compile(ctx: Context) {
    return sql`(EXISTS ${this.subquery.compile(ctx)})`;
  }
}

export class NotExistsExpression extends Expression {
  constructor(public subquery: Expression) {
    super();
  }

  compile(ctx: Context) {
    return sql`(NOT EXISTS ${this.subquery.compile(ctx)})`;
  }
}

export interface WindowSpec {
  partitionBy?: Any | Any[];
  orderBy?: OrderBySpec;
}

export class WindowExpression extends Expression {
  constructor(
    public func: Expression,
    public spec?: WindowSpec,
  ) {
    super();
  }

  compile(ctx: Context) {
    const parts = [
      this.spec?.partitionBy &&
        sql`PARTITION BY ${sql.join([this.spec.partitionBy].flat().map((p) => p.toExpression().compile(ctx)))}`,
      this.spec?.orderBy && sql`ORDER BY ${sql.join(compileOrderBy(this.spec.orderBy, ctx))}`,
    ].filter((x) => x != null);

    return sql`${this.func.compile(ctx)} OVER (${parts.length > 0 ? sql.join(parts, sql` `) : sql``})`;
  }
}
