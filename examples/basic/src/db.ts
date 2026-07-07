import { typegres } from "typegres";

export const { db, conn } = await typegres({ type: "pglite" });
