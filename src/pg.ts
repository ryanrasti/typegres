// Read DATABASE_URL or throw. Used by test helpers, codegen, and anywhere
// internal code needs to hit a real Postgres. For local dev the nix shell
// sets DATABASE_URL to the socket provisioned by `bin/startpg`.
export const requireDatabaseUrl = (): string => {
  const url = process.env["DATABASE_URL"];
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Enter the nix dev shell (`nix develop`) and run `bin/startpg`.",
    );
  }
  return url;
};
