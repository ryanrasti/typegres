import * as crypto from "node:crypto";
import * as path from "node:path";

// Dev-only Postgres connection string. Derives a per-repo Unix socket path
// by hashing the repo root, matching the socket provisioned by `bin/startpg`
// — so tests and codegen run against a local isolated Postgres instance
// without any configuration. `DATABASE_URL` overrides when set.
//
// Not suitable as a default for user-facing APIs: a real application would
// silently pick up the dev socket if it forgot to supply its own connection
// string. Internal callers (codegen, tests) should invoke this explicitly.
export const defaultPgConnectionString = (): string => {
  if (process.env["DATABASE_URL"]) {
    return process.env["DATABASE_URL"];
  }

  const root = path.resolve(import.meta.dirname, "..");
  const hash = crypto.createHash("sha256").update(root).digest("hex").slice(0, 12);
  const host = `/tmp/typegres-pg-${hash}/socket`;
  return `postgresql:///postgres?host=${encodeURIComponent(host)}`;
};
