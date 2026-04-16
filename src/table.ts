import type { CompileContext, TableAlias } from "./builder/sql";
import type { Fromable } from "./builder/query";
import { aliasRowType, QueryBuilder } from "./builder/query";
import { DeleteBuilder } from "./builder/delete";
import { UpdateBuilder } from "./builder/update";
import { InsertBuilder } from "./builder/insert";
import type { InsertRow } from "./types/runtime";

export class TableBase {
  static tableName: string;
  static tsAlias: string;

  static registerAndCompile(ctx: CompileContext, alias: TableAlias): string {
    const resolved = ctx.register(alias, alias.name);
    return resolved === this.tableName
      ? `"${this.tableName}"`
      : `"${this.tableName}" AS "${resolved}"`;
  }

  static from<T extends {new (): any; tsAlias: string}>(this: T) {
    const row = new this() as InstanceType<T>;
    const [aliased, tableAlias] = aliasRowType(row, this.tsAlias);
    return new QueryBuilder<{ [K in T["tsAlias"]]: InstanceType<T> }, InstanceType<T>, []>({
      namespace: { [this.tsAlias]: aliased } as any,
      output: aliased,
      from: { source: this as any, tableAlias },
      tsAlias: this.tsAlias,
    });
  }

  static insert<T extends typeof TableBase & (new () => any)>(
    this: T,
    ...rows: [InsertRow<InstanceType<T>>, ...InsertRow<InstanceType<T>>[]]
  ): InsertBuilder<T["tableName"], InstanceType<T>> {
    const instance = new this();
    const [aliased, tableAlias] = aliasRowType(instance, this.tableName) as [InstanceType<T>, any];
    const ns = { [this.tableName]: aliased } as { [K in T["tableName"]]: InstanceType<T> };
    const columnNames = Object.keys(instance).filter((k) => instance[k]?.__column);
    return new InsertBuilder({ tableName: this.tableName, instance, namespace: ns, columnNames, rows: rows as { [key: string]: unknown }[], tableAlias });
  }

  static update<T extends typeof TableBase & (new () => any)>(this: T): UpdateBuilder<T["tableName"], InstanceType<T>> {
    const instance = new this();
    const [aliased, tableAlias] = aliasRowType(instance, this.tableName) as [InstanceType<T>, any];
    const ns = { [this.tableName]: aliased } as { [K in T["tableName"]]: InstanceType<T> };
    return new UpdateBuilder({ tableName: this.tableName, instance, namespace: ns, tableAlias });
  }

  static delete<T extends typeof TableBase & (new () => any)>(this: T): DeleteBuilder<T["tableName"], InstanceType<T>> {
    const instance = new this();
    const [aliased, tableAlias] = aliasRowType(instance, this.tableName) as [InstanceType<T>, any];
    const ns = { [this.tableName]: aliased } as { [K in T["tableName"]]: InstanceType<T> };
    return new DeleteBuilder({ tableName: this.tableName, namespace: ns, tableAlias });
  }
}

TableBase satisfies Fromable;
