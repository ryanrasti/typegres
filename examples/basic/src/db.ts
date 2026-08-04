import { typegres } from "typegres";
import { PgliteDriver } from "typegres/drivers/pglite";

// `typegres()` itself is synchronous; only the driver is awaited, because
// booting WASM Postgres is real I/O. Table classes in ./tables reference
// `db` at module load.
export const db = typegres();
export const conn = db.connect(await PgliteDriver.create());
