import * as path from "node:path";

export const defaultPgConnectionString = (): string => {
  if (process.env["DATABASE_URL"]) {
    return process.env["DATABASE_URL"];
  }
  const host = path.resolve(import.meta.dirname, "..", "pg_data");
  return `postgresql:///postgres?host=${encodeURIComponent(host)}`;
};
