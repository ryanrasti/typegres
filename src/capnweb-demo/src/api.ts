// Intentionally left blank.
// This file will host Typegres models and capabilities for the demo.
import { Text, Bool } from "../../types";
import { insert, update, delete_, select } from "../../grammar";
import { values } from "../../query/values";
import * as Models from "./models";
import { RpcTarget } from "capnweb";
import { typegres, Typegres } from "../../db";
import { migrate } from "./migrate";
import { runSeeds } from "./seeds";

export class Api extends RpcTarget {
    users() {
        console.log(">>>>>> users called");
        return select((u) => /*foo */ u, { from: User })
    }

	// All todos (for demo convenience in FE)
	todos() {
		return Todo.select()
	}

    async getTg() {
        return await getTg();
    }
}

export class User extends Models.User {
    todos() {
        return Todo.select().where((t) => t.user_id.eq(this.id))
    }

    //
    createTodo(title: string) {
		const ret = insert({ into: Models.Todos }, values({
			title: Text.new(title),
			user_id: this.id,
		}))
        console.log(">>>>>> createTodo ret", ret);
        return ret;
    }
}

export class Todo extends Models.Todos {
    // Update
    update(title: string) {
		return update(Todo)
			.set(() => ({ title: Text.new(title) }))
			.where((t) => t.id.eq(this.id))
    }

	setCompleted(completed: boolean) {
		return update(Todo)
			.set(() => ({ completed: Bool.new(completed) }))
			.where((t) => t.id.eq(this.id))
	}

    // Delete
    delete() {
		return delete_({ from: Models.Todos }).where((t) => t.id.eq(this.id))
    }
}

let tgSingleton: Typegres | undefined;

const getTg = async (): Promise<Typegres> => {
    if (!tgSingleton) {
        const tg = await typegres({
            type: "pglite",
        })
        await migrate(tg);
        await runSeeds(tg);
        tgSingleton = tg;
    }
    return tgSingleton;
}
