import { useEffect, useMemo, useState } from "react";
import { useApi } from "../use-capnweb";
import { doRpc } from "../do-rpc";
import type { Todo as TodoInstance, User } from "../api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Todo = { id: number; title: string; completed: boolean };
type QueryHistoryEntry = { sql: string; params: unknown[]; timestamp: number };

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<Array<{ id: number; username: string }>>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [queryHistory, setQueryHistory] = useState<QueryHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const api = useApi();

  const filtered = useMemo(
    () => todos.filter((t) => t.title.toLowerCase().includes(query.toLowerCase())),
    [todos, query],
  );

  const loadUsers = async () => {
    try {
      const tg = api.getTg();
      const result = await doRpc(
        (api, tg) => {
          return api
            .users()
            .select((u) => ({
              id: u.id,
              username: u.username,
            }))
            .execute(tg);
        },
        [api, tg] as const,
      );
      const usersList = result as unknown as Array<{ id: number; username: string }>;
      setUsers(usersList);
      // Auto-select first user if none selected
      if (selectedUserId === null && usersList.length > 0) {
        setSelectedUserId(usersList[0].id);
      }
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  const loadTodos = async (userId?: number) => {
    try {
      const tg = api.getTg();
      const result = await doRpc(
        (api, tg) => {
          const query = api.todos().select((t) => ({
            id: t.id,
            title: t.title,
            completed: t.completed,
            user_id: t.user_id,
          }));
          // Filter by user if specified
          if (userId !== undefined && userId !== null) {
            return query.where((t) => t.user_id.eq(userId)).execute(tg);
          }
          return query.execute(tg);
        },
        [api, tg] as const,
      );
      setTodos(result as unknown as Todo[]);
      const history = await doRpc((api) => api.getQueryHistory(), [api] as const);
      setQueryHistory(history as QueryHistoryEntry[]);
    } catch (error) {
      console.error("Failed to load todos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [api]);

  useEffect(() => {
    if (users.length > 0) {
      loadTodos(selectedUserId ?? undefined);
    }
  }, [api, selectedUserId, users.length]);

  const create = async () => {
    if (!title.trim() || selectedUserId === null) return;
    try {
      const tg = api.getTg();
      const user = await doRpc(
        (api, userId) => {
          return api.getUser(userId);
        },
        [api, selectedUserId] as const,
      ) as User | null;
      if (!user) {
        console.error("User not found");
        return;
      }
      await doRpc(
        (user, tg) => {
          return user.createTodo(title.trim()).execute(tg);
        },
        [user, tg] as const,
      );
      setTitle("");
      const history = await doRpc((api) => api.getQueryHistory(), [api] as const);
      setQueryHistory(history as QueryHistoryEntry[]);
      await loadTodos(selectedUserId);
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  };

  const update = async (id: number, patch: Partial<Todo>) => {
    try {
      const tg = api.getTg();
      const todo = (await doRpc(
        (api, tg) => {
          return api
            .todos()
            .select((t) => t)
            .where((t) => t.id["="](id))
            .one(tg);
        },
        [api, tg] as const,
      )) as TodoInstance | null;
      if (!todo) {
        console.error("Todo not found");
        return;
      }
      if ("title" in patch && patch.title !== undefined) {
        await doRpc(
          (todo, tg) => {
            return todo.update(patch.title!).execute(tg);
          },
          [todo, tg] as const,
        );
      } else if ("completed" in patch && patch.completed !== undefined) {
        await doRpc(
          (todo, tg) => {
            return todo.setCompleted(patch.completed!).execute(tg);
          },
          [todo, tg] as const,
        );
      }
      const history = await doRpc((api) => api.getQueryHistory(), [api] as const);
      setQueryHistory(history as QueryHistoryEntry[]);
      await loadTodos(selectedUserId ?? undefined);
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const tg = api.getTg();
      const todo = (await doRpc(
        (api, tg) => {
          return api
            .todos()
            .select((t) => t)
            .where((t) => t.id["="](id))
            .one(tg);
        },
        [api, tg] as const,
      )) as TodoInstance | null;
      if (!todo) {
        console.error("Todo not found");
        return;
      }
      await doRpc(
        (todo, tg) => {
          return todo.delete().execute(tg);
        },
        [todo, tg] as const,
      );
      const history = await doRpc((api) => api.getQueryHistory(), [api] as const);
      setQueryHistory(history as QueryHistoryEntry[]);
      await loadTodos(selectedUserId ?? undefined);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Cap'n Web + Typegres</h1>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6 md:p-8 space-y-6">
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Cap'n Web + Typegres
        </h1>
        <p className="text-lg text-muted-foreground">Type-safe PostgreSQL queries over RPC</p>
      </div>

      <Card className="shadow-sm border-2">
        <CardHeader>
          <CardTitle className="text-xl">Select User</CardTitle>
          <CardDescription>Choose a user to view and manage their todos</CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            value={selectedUserId?.toString() ?? "all"}
            onValueChange={(value) => setSelectedUserId(value === "all" ? null : Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id.toString()}>
                  {user.username}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-2">
        <CardHeader>
          <CardTitle className="text-xl">Create Todo</CardTitle>
          <CardDescription>Add a new todo item for the selected user</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="New todo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && create()}
              disabled={selectedUserId === null}
              className="flex-1"
            />
            <Button onClick={create} disabled={selectedUserId === null || !title.trim()}>
              Create
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-2">
        <CardHeader>
          <CardTitle className="text-xl">Todos</CardTitle>
          <CardDescription>
            {selectedUserId === null
              ? "Select a user to view their todos"
              : `${filtered.length} todo${filtered.length !== 1 ? "s" : ""} found`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Search todos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              {query ? "No todos match your search" : "No todos found"}
            </p>
          ) : (
            <div className="space-y-2">
              {filtered.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-3 rounded-lg border-2 p-4 hover:bg-accent/50 hover:border-primary/20 transition-all shadow-sm"
                >
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={(e) => update(t.id, { completed: e.target.checked })}
                    disabled={selectedUserId === null}
                    className="h-4 w-4 rounded border-gray-300 disabled:cursor-not-allowed"
                  />
                  <Input
                    className="flex-1"
                    value={t.title}
                    onChange={(e) => update(t.id, { title: e.target.value })}
                    onBlur={(e) => update(t.id, { title: e.target.value })}
                    disabled={selectedUserId === null}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteTodo(t.id)}
                    disabled={selectedUserId === null}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-sm border-2">
        <CardHeader>
          <CardTitle className="text-xl">SQL Query History</CardTitle>
          <CardDescription>Last 5 executed queries</CardDescription>
        </CardHeader>
        <CardContent>
          {queryHistory.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No queries executed yet</p>
          ) : (
            <div className="space-y-3">
              {queryHistory
                .slice()
                .reverse()
                .map((entry, idx) => (
                  <Card key={idx} className="bg-gradient-to-br from-muted to-muted/50 border-2 shadow-sm">
                    <CardContent className="pt-6">
                      <div className="mb-3 text-xs font-medium text-muted-foreground flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                        {new Date(entry.timestamp).toLocaleTimeString()}
                      </div>
                      <pre className="mb-3 overflow-auto rounded-lg bg-background p-4 text-sm font-mono whitespace-pre-wrap break-words border-2 shadow-inner">
                        {entry.sql}
                      </pre>
                      {entry.params.length > 0 && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Parameters ({entry.params.length})
                          </summary>
                          <pre className="mt-2 overflow-auto rounded-lg bg-background p-3 text-xs font-mono border-2 shadow-inner">
                            {JSON.stringify(entry.params, null, 2)}
                          </pre>
                        </details>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
