import { Executor } from "./executor";
import { aliasRowType, Fromable, QueryBuilder, RowType, RowTypeToTsType } from "./query-builder";
import { Sql, sql } from "./sql-builder";
import { Any } from "./types";
import { InsertRow, meta, TsTypeOf } from "./types/runtime";

// --- Mutation builders ---

export class DeleteBuilder<T extends Record<string, any>> {
  #tableName: string;
  #executor: Executor;
  #aliased: T;
  #whereCond?: Sql;

  constructor(tableName: string, executor: Executor, aliased: T) {
    this.#tableName = tableName;
    this.#executor = executor;
    this.#aliased = aliased;
  }

  where(fn: ((t: T) => Any<any>) | true): DeleteBuilder<T> {
    if (fn === true) {
      this.#whereCond = sql`TRUE`;
    } else {
      this.#whereCond = fn(this.#aliased).compile();
    }
    return this;
  }

  async execute(): Promise<void> {
    if (!this.#whereCond) {
      throw new Error("delete() requires .where() — use .where(true) to delete all rows");
    }
    const query = sql.join([
      sql`DELETE FROM ${sql.ident(this.#tableName)}`,
      sql`WHERE ${this.#whereCond}`,
    ], sql` `);
    await this.#executor.execute(query);
  }
}

export class UpdateBuilder<T extends Record<string, any>> {
  #tableName: string;
  #executor: Executor;
  #instance: T;
  #aliased: T;
  #whereCond?: Sql;
  #setClauses?: Sql;

  constructor(tableName: string, executor: Executor, instance: T, aliased: T) {
    this.#tableName = tableName;
    this.#executor = executor;
    this.#instance = instance;
    this.#aliased = aliased;
  }

  where(fn: ((t: T) => Any<any>) | true): UpdateBuilder<T> {
    if (fn === true) {
      this.#whereCond = sql`TRUE`;
    } else {
      this.#whereCond = fn(this.#aliased).compile();
    }
    return this;
  }

  set(fn: (t: T) => Partial<{ [K in keyof T]: TsTypeOf<T[K]> }>): UpdateBuilder<T> {
    const setCols = fn(this.#aliased);
    const clauses = Object.entries(setCols).map(([k, v]) => {
      const col = this.#instance[k];
      if (!col?.__column) { throw new Error(`Unknown column: ${k}`); }
      return sql`${sql.ident(k)} = ${new (col.__class as any)(v).compile()}`;
    });
    this.#setClauses = sql.join(clauses);
    return this;
  }

  async execute(): Promise<void> {
    if (!this.#whereCond) {
      throw new Error("update() requires .where() — use .where(true) to update all rows");
    }
    if (!this.#setClauses) {
      throw new Error("update() requires .set()");
    }
    const query = sql.join([
      sql`UPDATE ${sql.ident(this.#tableName)} SET ${this.#setClauses}`,
      sql`WHERE ${this.#whereCond}`,
    ], sql` `);
    await this.#executor.execute(query);
  }
}

// --- Table base ---

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
