import { typegres } from "typegres";
import type { OperatorRoot } from "./server/api";

const url = process.env["DATABASE_URL"] ?? "postgres://localhost/ops_demo";

// `typegres<OperatorRoot>(...)` pins the app-wide context type. Every
// `db.Table(name)` returns a class whose `scope()` accepts only an
// OperatorRoot, and whose `contextOf(row)` returns OperatorRoot. The
// import is type-only — no runtime cycle even though api.ts imports db
// at runtime.
export const db = await typegres<OperatorRoot>({ type: "pg", connectionString: url });
