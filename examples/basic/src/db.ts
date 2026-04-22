import { typegres } from "typegres";

export const db = await typegres({ type: "pglite" });
