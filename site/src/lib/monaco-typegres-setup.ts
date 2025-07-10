import * as monaco from "monaco-editor";
import { initialize, transform } from "esbuild-wasm";

// Create a virtual file system with key typegres types
export function setupMonacoTypescript(monaco: typeof import("monaco-editor")) {
  // Configure TypeScript compiler options
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    allowNonTsExtensions: true,
    allowJs: false,
    typeRoots: ["node_modules/@types"],
    lib: ["es2020", "dom", "esnext.asynciterable"],
    strict: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    noEmit: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
    jsx: monaco.languages.typescript.JsxEmit.None,
    paths: {
      typegres: ["node_modules/typegres/index.d.ts"],
      kysely: ["node_modules/kysely/index.d.ts"],
    },
  });

  // Set diagnostic options
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
    noSuggestionDiagnostics: false,
  });

  // Add typegres main export that combines everything
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `
declare module 'typegres' {
  // Re-export from kysely
  export { Kysely, sql } from 'kysely';
  
  // Database types for the playground
  export interface Database {
    users: {
      id: number;
      name: string;
      email: string;
      active: boolean;
      created_at: Date;
    };
    posts: {
      id: number;
      user_id: number;
      title: string;
      content: string | null;
      published: boolean;
      created_at: Date;
    };
  }
  
  // Main database instance
  export const db: Kysely<Database>;
}
`,
    "file:///node_modules/typegres/index.d.ts"
  );

  // Add Kysely types (simplified but functional)
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `
declare module 'kysely' {
  export interface Kysely<DB> {
    selectFrom<T extends keyof DB & string>(table: T): SelectQueryBuilder<DB, T>;
    insertInto<T extends keyof DB & string>(table: T): InsertQueryBuilder<DB, T>;
    updateTable<T extends keyof DB & string>(table: T): UpdateQueryBuilder<DB, T>;
    deleteFrom<T extends keyof DB & string>(table: T): DeleteQueryBuilder<DB, T>;
    with<N extends string, E>(name: N, expr: (qb: any) => E): WithQueryBuilder<DB, N>;
    transaction(): TransactionBuilder<DB>;
  }

  export interface SelectQueryBuilder<DB, TB extends keyof DB> {
    select<S extends SelectExpression<DB, TB>>(selection: S[]): SelectQueryBuilder<DB, TB>;
    selectAll(): SelectQueryBuilder<DB, TB>;
    where<F extends keyof DB[TB]>(field: F, op: ComparisonOperator, value: DB[TB][F]): SelectQueryBuilder<DB, TB>;
    leftJoin<T extends keyof DB & string>(table: T, leftRef: string, rightRef: string): SelectQueryBuilder<DB, TB | T>;
    innerJoin<T extends keyof DB & string>(table: T, leftRef: string, rightRef: string): SelectQueryBuilder<DB, TB | T>;
    groupBy(fields: string[]): SelectQueryBuilder<DB, TB>;
    having(expr: Expression<any>, op: ComparisonOperator, value: any): SelectQueryBuilder<DB, TB>;
    orderBy(field: string, direction?: 'asc' | 'desc'): SelectQueryBuilder<DB, TB>;
    limit(limit: number): SelectQueryBuilder<DB, TB>;
    execute(): Promise<any[]>;
    executeTakeFirst(): Promise<any | undefined>;
    executeTakeFirstOrThrow(): Promise<any>;
  }

  export interface InsertQueryBuilder<DB, TB extends keyof DB> {
    values(values: Partial<DB[TB]> | Partial<DB[TB]>[]): InsertQueryBuilder<DB, TB>;
    returning<S extends keyof DB[TB]>(fields: S[]): InsertQueryBuilder<DB, TB>;
    execute(): Promise<any[]>;
    executeTakeFirst(): Promise<any | undefined>;
    executeTakeFirstOrThrow(): Promise<any>;
  }

  export interface UpdateQueryBuilder<DB, TB extends keyof DB> {
    set(values: Partial<DB[TB]>): UpdateQueryBuilder<DB, TB>;
    where<F extends keyof DB[TB]>(field: F, op: ComparisonOperator, value: DB[TB][F]): UpdateQueryBuilder<DB, TB>;
    returning<S extends keyof DB[TB]>(fields: S[]): UpdateQueryBuilder<DB, TB>;
    execute(): Promise<any[]>;
  }

  export interface DeleteQueryBuilder<DB, TB extends keyof DB> {
    where<F extends keyof DB[TB]>(field: F, op: ComparisonOperator, value: DB[TB][F]): DeleteQueryBuilder<DB, TB>;
    execute(): Promise<any[]>;
  }

  export interface WithQueryBuilder<DB, N extends string> {
    selectFrom<T extends keyof DB & string | N>(table: T): SelectQueryBuilder<DB, T>;
  }

  export interface TransactionBuilder<DB> {
    execute<T>(fn: (trx: Kysely<DB>) => Promise<T>): Promise<T>;
  }

  export interface Expression<T> {
    as(alias: string): AliasedExpression<T>;
  }

  export interface AliasedExpression<T> {}

  export type SelectExpression<DB, TB extends keyof DB> = keyof DB[TB] | string | Expression<any> | AliasedExpression<any>;
  export type ComparisonOperator = '=' | '!=' | '<' | '>' | '<=' | '>=' | 'in' | 'not in' | 'like' | 'not like';

  export interface Sql {
    <T = unknown>(strings: TemplateStringsArray, ...values: any[]): Expression<T>;
    raw<T = unknown>(sql: string): Expression<T>;
    ref<T = unknown>(ref: string): Expression<T>;
    val<T>(value: T): Expression<T>;
    join<T>(values: Expression<T>[], separator?: string): Expression<T>;
  }

  export const sql: Sql;
}
`,
    "file:///node_modules/kysely/index.d.ts"
  );

  // Enable type acquisition
  monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
}
