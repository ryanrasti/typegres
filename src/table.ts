import { Executor } from "./executor";
import { aliasRowType, Fromable, QueryBuilder, RowType, RowTypeToTsType } from "./query-builder";
import { Sql, sql } from "./sql-builder";
import { Any } from "./types";
import { InsertRow, meta, TsTypeOf } from "./types/runtime";

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

  static async insert<T extends typeof TableBase & (new () => any)>(
    this: T,
    ...rows: [InsertRow<InstanceType<T>>, ...InsertRow<InstanceType<T>>[]]
  ): Promise<void> {
    const instance = new this();
    const columnNames = Object.keys(instance).filter((k) => instance[k]?.__column);

    const rowSqls = rows.map((row) => {
      const vals = columnNames.map((k) => {
        const v = (row as Record<string, unknown>)[k];
        if (v === undefined) {
          return sql`DEFAULT`;
        }
        const col = instance[k];
        return new (col.__class as any)(v).compile() as Sql;
      });
      return sql`(${sql.join(vals)})`;
    });

    const columns = columnNames.map((k) => sql.ident(k));
    const query = sql`INSERT INTO ${sql.ident(this.tableName)} (${sql.join(columns)}) VALUES ${sql.join(rowSqls)}`;
    await this.executor.execute(query);
  }

  static async insertReturning<
    T extends typeof TableBase & (new () => any),
    R extends RowType,
  >(
    this: T,
    rows: InsertRow<InstanceType<T>>[] | InsertRow<InstanceType<T>>,
    returningFn: (t: InstanceType<T>) => R,
  ): Promise<RowTypeToTsType<R>[]> {
    const instance = new this();
    const aliased = aliasRowType(instance, this.tableName);
    const returning = returningFn(aliased as InstanceType<T>);
    const columnNames = Object.keys(instance).filter((k) => instance[k]?.__column);
    const rowsArr = Array.isArray(rows) ? rows : [rows];

    const rowSqls = rowsArr.map((row) => {
      const vals = columnNames.map((k) => {
        const v = (row as Record<string, unknown>)[k];
        if (v === undefined) {
          return sql`DEFAULT`;
        }
        const col = instance[k];
        return new (col.__class as any)(v).compile() as Sql;
      });
      return sql`(${sql.join(vals)})`;
    });

    const columns = columnNames.map((k) => sql.ident(k));
    const retCols = Object.entries(returning).flatMap(([k, v]) =>
      v instanceof Any ? [sql`${v.compile()} as ${sql.ident(k)}`] : [],
    );

    const query = sql`INSERT INTO ${sql.ident(this.tableName)} (${sql.join(columns)}) VALUES ${sql.join(rowSqls)} RETURNING ${sql.join(retCols)}`;
    const result = await this.executor.execute(query);
    return result.map((row: Record<string, string>) =>
      Object.fromEntries(
        Object.entries(row).map(([k, v]) => {
          const type = returning[k as keyof R];
          if (!(type instanceof Any)) {
            throw new Error(`Expected ${k} to be an Any type`);
          }
          if (v === null || v === undefined) {
            return [k, null];
          }
          return [k, type.deserialize(String(v))];
        }),
      ),
    ) as RowTypeToTsType<R>[];
  }

  static async update<T extends typeof TableBase & (new () => any)>(
    this: T,
    setFn: (t: InstanceType<T>) => Partial<{ [K in keyof InstanceType<T>]: TsTypeOf<InstanceType<T>[K]> }>,
    whereFn?: (t: InstanceType<T>) => Any<any>,
  ): Promise<void> {
    const instance = new this();
    const aliased = aliasRowType(instance, this.tableName);
    const setCols = setFn(aliased as InstanceType<T>);
    const setClauses = Object.entries(setCols).map(([k, v]) => {
      const col = (aliased as Record<string, Any<any>>)[k];
      if (!col) { throw new Error(`Unknown column: ${k}`); }
      return sql`${sql.ident(k)} = ${new ((instance[k] as any).__class as any)(v).compile()}`;
    });

    const parts = [
      sql`UPDATE ${sql.ident(this.tableName)} SET ${sql.join(setClauses)}`,
    ];
    if (whereFn) {
      const cond = whereFn(aliased as InstanceType<T>);
      parts.push(sql`WHERE ${cond.compile()}`);
    }
    await this.executor.execute(sql.join(parts, sql` `));
  }

  static async delete<T extends typeof TableBase & (new () => any)>(
    this: T,
    whereFn?: (t: InstanceType<T>) => Any<any>,
  ): Promise<void> {
    const instance = new this();
    const aliased = aliasRowType(instance, this.tableName);
    const parts = [sql`DELETE FROM ${sql.ident(this.tableName)}`];
    if (whereFn) {
      const cond = whereFn(aliased as InstanceType<T>);
      parts.push(sql`WHERE ${cond.compile()}`);
    }
    await this.executor.execute(sql.join(parts, sql` `));
  }

  static compile(isSubquery?: boolean) {
    if (!isSubquery) {
      throw new Error("Table cannot be compiled directly; it must be used in a query");
    }
    return sql`${sql.ident(this.tableName)} AS ${sql.ident(this.alias)}`;
  }
}

TableBase satisfies Fromable;
