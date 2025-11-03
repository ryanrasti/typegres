// Intentionally left blank. Seed data will be added here.

import { Typegres } from "../../db";
import { insert } from "../../grammar";
import { values } from "../../query/values";
import { User, Todos } from "./models";
import { Text, Int4 } from "../../types";

export const runSeeds = async (tg: Typegres) => {
    const [john] = await insert({ into: User }, values({
        username: Text.new("John Doe"),
    })).execute(tg);

    const todo1 = await insert({ into: Todos }, values({
        title: Text.new("Buy groceries"),
        user_id: Int4.new(john.id),
    })).execute(tg);

    const todo2 = await insert({ into: Todos }, values({
        title: Text.new("Buy a new car"),
        user_id: Int4.new(john.id),
    })).execute(tg);

    const [jane] = await insert({ into: User }, values({
        username: Text.new("Jane Doe"),
    })).execute(tg);

}