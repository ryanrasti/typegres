import * as crypto from "node:crypto";
import * as path from "node:path";

export const defaultPgConnectionString = (): string => {
  if (process.env["DATABASE_URL"]) {
    return process.env["DATABASE_URL"];
  }

  const root = path.resolve(import.meta.dirname, "..");
  const hash = crypto.createHash("sha256").update(root).digest("hex").slice(0, 12);
  const host = `/tmp/typegres-pg-${hash}/socket`;
  return `postgresql:///postgres?host=${encodeURIComponent(host)}`;
};
