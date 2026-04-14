import { Executor } from "./executor";
import { aliasRowType, Fromable, QueryBuilder } from "./builder/query";
import { DeleteBuilder } from "./builder/delete";
import { UpdateBuilder } from "./builder/update";
import { InsertBuilder } from "./builder/insert";
import { sql } from "./builder/sql";
import { InsertRow } from "./types/runtime";

export class TableBase {
  static tableName: string;
  static alias: string;
  static executor: Executor;

  static from<T extends {new (): any; alias: string; executor: Executor}>(this: T) {
    const row = new this() as InstanceType<T>;
    const aliased = aliasRowType(row, this.alias);
    return new QueryBuilder<{ [K in T["alias"]]: InstanceType<T> }, InstanceType<T>, []>({
      namespace: { [this.alias]: aliased } as any,
      output: aliased,
      executor: this.executor,
      from: this as any,
      alias: this.alias,
    });
  }

  static insert<T extends typeof TableBase & (new () => any)>(
    this: T,
    ...rows: InsertRow<InstanceType<T>>[]
  ): InsertBuilder<InstanceType<T>> {
    const instance = new this();
    const builder = new InsertBuilder<InstanceType<T>>(this.tableName, this.executor, instance);
    if (rows.length > 0) {
      builder.values(...rows as Record<string, unknown>[]);
    }
    return builder;
  }

  static update<T extends typeof TableBase & (new () => any)>(this: T): UpdateBuilder<InstanceType<T>> {
    const instance = new this();
    const aliased = aliasRowType(instance, this.tableName) as InstanceType<T>;
    return new UpdateBuilder(this.tableName, this.executor, instance, aliased);
  }

  static delete<T extends typeof TableBase & (new () => any)>(this: T): DeleteBuilder<InstanceType<T>> {
    const instance = new this();
    const aliased = aliasRowType(instance, this.tableName) as InstanceType<T>;
    return new DeleteBuilder(this.tableName, this.executor, aliased);
  }

  static compile(isSubquery?: boolean) {
    if (!isSubquery) {
      throw new Error("Table cannot be compiled directly; it must be used in a query");
    }
    return sql`${sql.ident(this.tableName)} AS ${sql.ident(this.alias)}`;
  }
}

TableBase satisfies Fromable;
