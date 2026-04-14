import { Database, pgliteExecutor } from "typegres";

const executor = await pgliteExecutor();
export const db = new Database(executor);
export { executor };
