import { Executor } from "./executor";
import { aliasRowType, Fromable, QueryBuilder } from "./query-builder";
import { sql } from "./sql-builder";

export class TableBase {
  static tableName: string;
  static alias: string;
  static executor: Executor;

  static as<T extends typeof TableBase>(
    this: T,
    alias: string,
  ): Omit<T, "alias"> & { alias: string } {
    return class extends this {
      static alias = alias;
    } as any;
  }

  static from<T extends typeof TableBase>(this: T) {
    const row = new this() as InstanceType<T>;
    const aliased = aliasRowType(row, this.alias);
    return new QueryBuilder<{ [K in T["alias"]]: InstanceType<T> }, InstanceType<T>, []>({
      namespace: { [this.alias]: aliased },
      output: aliased,
      executor: this.executor,
      from: this as any,
      alias: this.alias,
    });
  }

  static compile(isSubquery?: boolean) {
    if (!isSubquery) {
      throw new Error("Table cannot be compiled directly; it must be used in a query");
    }
    return sql`${sql.ident(this.tableName)} AS ${sql.ident(this.alias)}`;
  }
}

TableBase satisfies Fromable;
