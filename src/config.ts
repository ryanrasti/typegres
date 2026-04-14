export interface Config {
  db: string;
  tables: string;
  /** Import path for the Database instance, e.g. "../db" */
  dbImport: string;
}
