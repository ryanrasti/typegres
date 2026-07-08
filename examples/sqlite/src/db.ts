import { typegres } from "typegres";

// `typegres({ type: "sqlite" })` opens a SqliteDriver against the given
// file (or `:memory:` if omitted). The tests use `:memory:` so each
// vitest run is hermetic; the `tg generate` CLI reads schema from the
// `./dev.db` file produced by `npm run migrate`.
export const { db, conn } = await typegres({ type: "sqlite" });
