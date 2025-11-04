// Intentionally left blank.
// This file will host Typegres models and capabilities for the demo.
import { Text, Bool } from "../../types";
import { insert, update, delete_ } from "../../grammar";
import { values } from "../../query/values";
import * as Models from "./models";
import { RpcTarget } from "capnweb";
import { typegres, Typegres } from "../../db";
import { migrate } from "./migrate";
import { runSeeds } from "./seeds";

export class Api extends RpcTarget {
    usersNames() {
        return User.select((u) => ({username: u.username}))
    }

    tg() {
        return getTg();
    }

    getUserByName(username: string) {
        return  User.select(u => new User(u)).where((u) => u.username.eq(username));
    }
}

export class User extends Models.User {
    todos() {
        return Todo.select((t) => new Todo(t)).where((t) => t.user_id.eq(this.id))
    }

    // The only way to create a new Todo is to call createTodo on a User instance.
    // i.e., a User is a capability that can create Todos.
    createTodo(title: string) {
		return insert({ into: Models.Todos }, values({
			title: Text.new(title),
            // Created Todos are automatically scoped to the User that created them:
			user_id: this.id,
		}))
    }
}

export class Todo extends Models.Todos {
    // The only way to update a Todo is to call update on a Todo instance.
    // i.e., a Todo is the capability to update itself.
    update(title: string) {
		return update(Todo)
			.set(() => ({ title: Text.new(title) }))
			.where((t) => t.id.eq(this.id))
    }

    // Ditto for setCompleted.
	setCompleted(completed: boolean) {
		return update(Todo)
			.set(() => ({ completed: Bool.new(completed) }))
			.where((t) => t.id.eq(this.id))
	}

    // Ditto for delete.
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
