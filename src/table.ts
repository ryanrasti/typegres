import type { Executor } from "./executor";
import type { Fromable} from "./builder/query";
import { aliasRowType, QueryBuilder } from "./builder/query";
import { DeleteBuilder } from "./builder/delete";
import { UpdateBuilder } from "./builder/update";
import { InsertBuilder } from "./builder/insert";
import { sql } from "./builder/sql";
import type { InsertRow } from "./types/runtime";

export class TableBase {
  static tableName: string;
  static alias: string;
  static executor: Executor;

  static from<T extends {new (): any; alias: string; executor: Executor}>(this: T) {
    const row = new this() as InstanceType<T>;
    const [aliased, tableAlias] = aliasRowType(row, this.alias);
    return new QueryBuilder<{ [K in T["alias"]]: InstanceType<T> }, InstanceType<T>, []>({
      namespace: { [this.alias]: aliased } as any,
      output: aliased,
      executor: this.executor,
      from: { source: this as any, tableAlias },
      alias: this.alias,
    });
  }

  static insert<T extends typeof TableBase & (new () => any)>(
    this: T,
    ...rows: [InsertRow<InstanceType<T>>, ...InsertRow<InstanceType<T>>[]]
  ): InsertBuilder<T["tableName"], InstanceType<T>> {
    const instance = new this();
    const [aliased] = aliasRowType(instance, this.tableName) as [InstanceType<T>, any];
    const ns = { [this.tableName]: aliased } as { [K in T["tableName"]]: InstanceType<T> };
    const columnNames = Object.keys(instance).filter((k) => instance[k]?.__column);
    return new InsertBuilder({ tableName: this.tableName, executor: this.executor, instance, namespace: ns, columnNames, rows: rows as { [key: string]: unknown }[] });
  }

  static update<T extends typeof TableBase & (new () => any)>(this: T): UpdateBuilder<T["tableName"], InstanceType<T>> {
    const instance = new this();
    const [aliased] = aliasRowType(instance, this.tableName) as [InstanceType<T>, any];
    const ns = { [this.tableName]: aliased } as { [K in T["tableName"]]: InstanceType<T> };
    return new UpdateBuilder({ tableName: this.tableName, executor: this.executor, instance, namespace: ns });
  }

  static delete<T extends typeof TableBase & (new () => any)>(this: T): DeleteBuilder<T["tableName"], InstanceType<T>> {
    const instance = new this();
    const [aliased] = aliasRowType(instance, this.tableName) as [InstanceType<T>, any];
    const ns = { [this.tableName]: aliased } as { [K in T["tableName"]]: InstanceType<T> };
    return new DeleteBuilder({ tableName: this.tableName, executor: this.executor, namespace: ns });
  }

  static compile(isSubquery?: boolean) {
    if (!isSubquery) {
      throw new Error("Table cannot be compiled directly; it must be used in a query");
    }
    return sql`${sql.ident(this.tableName)}`;
  }
}

TableBase satisfies Fromable;
