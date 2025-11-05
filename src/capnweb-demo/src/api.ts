import { Text, Bool } from "../../types";
import { insert, update, delete_ } from "../../grammar";
import { values } from "../../query/values";
import * as Models from "./models";
import { RpcTarget } from "capnweb";
import { getTg } from "./db";

// Typegres provides: a capability-first API to augment your models.
// Cap'n Web provides: a RPC system to execute the capabilities remotely.

// Together: a system where your models are your API. You specify the business **context**
//   in a **composable** interface -- with security enforced by capabilities.

export class Api extends RpcTarget {
    tg() {
        return getTg();
    }

    // Entry point to get a `User` instance. In real life, we'd need to pass a credential
    // (not just the username) to get the user.
    getUserByName(username: string) {
        return User.select(u => new User(u)).where((u) => u.username.eq(username));
    }

    // To populate the user dropdown in the UI. In real life, this wouldn't exist.
    usersNames() {
        return User.select((u) => ({username: u.username}))
    }
}

export class User extends Models.User {
    // The `Todos` capability is just a relation -- this returns a `Select` instance
    // (i.e., a query builder) that can be further modified. It doesn't return a flat result!
    // It is both secure (user can only see own Todos) and flexible (can modify the query).
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
    update({title, completed}: {title?: string, completed?: boolean}) {
		return update(Todo)
			.set((t) => ({ title: title ? Text.new(title) : t.title, completed: completed ? Bool.new(completed) : t.completed }))
			.where((t) => t.id.eq(this.id))
    }

    // Ditto for delete.
    delete() {
		return delete_({ from: Models.Todos }).where((t) => t.id.eq(this.id))
    }
}

