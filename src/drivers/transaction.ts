import type { AnyExecuteFn, TransactionOptions } from "./types";

export type TransactionLifecycle = {
  begin?: () => void | Promise<void>;
  commit: () => void | Promise<void>;
  rollback: () => void | Promise<void>;
};

// Shared state machine for drivers whose transaction protocol exposes
// explicit begin/commit/rollback operations. Connection acquisition and
// the transaction-bound executor remain driver-specific.
export const runTransaction = async <T>(
  lifecycle: TransactionLifecycle,
  cb: () => Promise<T>,
): Promise<T> => {
  await lifecycle.begin?.();
  try {
    const result = await cb();
    await lifecycle.commit();
    return result;
  } catch (error) {
    try {
      await lifecycle.rollback();
    } catch (rollbackError) {
      console.error("Rollback failed after transaction error:", rollbackError);
    }
    throw error;
  }
};

export const postgresBeginSql = (opts: TransactionOptions): string => {
  switch (opts.isolation) {
    case undefined: return "BEGIN";
    case "read committed": return "BEGIN ISOLATION LEVEL READ COMMITTED";
    case "repeatable read": return "BEGIN ISOLATION LEVEL REPEATABLE READ";
    case "serializable": return "BEGIN ISOLATION LEVEL SERIALIZABLE";
    default: throw new TypeError("Unsupported PostgreSQL transaction isolation level");
  }
};

export const runSqlTransaction = <T>(
  execute: AnyExecuteFn,
  begin: string,
  cb: () => Promise<T>,
): Promise<T> => {
  const run = async (text: string): Promise<void> => {
    await execute({ text, values: [] });
  };
  return runTransaction({
    begin: () => run(begin),
    commit: () => run("COMMIT"),
    rollback: () => run("ROLLBACK"),
  }, cb);
};
