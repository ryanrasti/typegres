import { typegres } from "typegres";

const url = process.env["DATABASE_URL"] ?? "postgres://localhost/ops_demo";

export const db = await typegres({ type: "pg", connectionString: url });
