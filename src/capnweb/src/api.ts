// Intentionally left blank.
// This file will host Typegres models and capabilities for the demo.
import { Text, Int4, Bool } from "../../types";
import { insert, update, delete_ } from "../../grammar";
import { values } from "../../query/values";
import * as Models from "./models";
import { RpcTarget } from "capnweb";


export class Api extends RpcTarget {
    users() {
        return Models.User.select()
    }

	// All todos (for demo convenience in FE)
	todos() {
		return Models.Todos.select()
	}
}

export class User extends Models.User {
    todos() {
        return Models.Todos.select().where((t) => t.user_id.eq(this.id))
    }

    //
    createTodo(title: string) {
		return insert({ into: Models.Todos }, values({
			title: Text.new(title),
			user_id: this.id,
		}))
    }
}

export class Todo extends Models.Todos {
    // Update
    update(title: string) {
		return update(Models.Todos)
			.set(() => ({ title: Text.new(title) }))
			.where((t) => t.id.eq(this.id))
    }

	setCompleted(completed: boolean) {
		return update(Models.Todos)
			.set(() => ({ completed: Bool.new(completed) }))
			.where((t) => t.id.eq(this.id))
	}

    // Delete
    delete() {
		return delete_({ from: Models.Todos }).where((t) => t.id.eq(this.id))
    }
}