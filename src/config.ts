// Discriminated union — `dialect` picks the connection + introspection
// strategy at codegen time. `db` is a PG connection string for
// `postgres` and a file path (or `":memory:"`) for `sqlite`. Everything
// else (tables output dir, dbImport) is shared.
export type Config =
  | { dialect: "postgres"; db: string; tables: string; dbImport: string }
  | { dialect: "sqlite"; db: string; tables: string; dbImport: string };
