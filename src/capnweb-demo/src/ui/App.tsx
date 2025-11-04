import { useEffect, useState } from "react";
import { useApi } from "../use-capnweb";
import { doRpc } from "../do-rpc";
import type { Todo as TodoInstance } from "../api";
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
import { SyntaxHighlight } from "@/components/SyntaxHighlight";

type Todo = { id: number; title: string; completed: boolean };
type QueryHistoryEntry = { sql: string; params: unknown[]; timestamp: number };

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<Array<{ username: string }>>([]);
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [queryHistory, setQueryHistory] = useState<QueryHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const api = useApi();

  const loadQueryHistory = async () => {
    const history = await doRpc(async (api) => (await api.tg()).getQueryHistory(), [api] as const);
    setQueryHistory(history);
  };

  const getCurrentUser = async (username: string) => {
    return await doRpc(
      async (api, username) => {
        const tg = await api.tg();
        return api.getUserByName(username).one(tg);
      },
      [api, username] as const,
    );
  };

  const loadUsers = async () => {
    const result = await doRpc(
      async (api) => {
        const tg = await api.tg();
        return api.usersNames().execute(tg);
      },
      [api] as const,
    );
    setUsers(result);
    if (selectedUsername === null && result.length > 0) {
      setSelectedUsername(result[0].username);
    }
  };

  const loadTodos = async (username?: string, searchQuery?: string) => {
    if (username === null || username === undefined) {
      setTodos([]);
      await loadQueryHistory();
      setLoading(false);
      return;
    }

    const user = await getCurrentUser(username);
    if (!user) {
      setTodos([]);
      setLoading(false);
      return;
    }

    const result = await doRpc(
      async (user, searchQuery, api) => {
        const tg = await api.tg();
        let query = user.todos().select((t: any) => ({
          id: t.id,
          title: t.title,
          completed: t.completed,
          user_id: t.user_id,
        }));
        if (searchQuery && searchQuery.trim()) {
          query = query.where((t: any) => t.title.ilike(`%${searchQuery.trim()}%`));
        }
        return query.execute(tg);
      },
      [user, searchQuery, api] as const,
    );
    
    setTodos(result as Todo[]);
    await loadQueryHistory();
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, [api]);

  useEffect(() => {
    if (users.length > 0) {
      loadTodos(selectedUsername ?? undefined, query);
    }
  }, [api, selectedUsername, users.length, query]);

  const create = async () => {
    if (!title.trim() || selectedUsername === null) return;
    const user = await getCurrentUser(selectedUsername);
    if (!user) return;
    
    const todoTitle = title.trim();
    await doRpc(
      async (user, api, todoTitle) => {
        const tg = await api.tg();
        return user.createTodo(todoTitle).execute(tg);
      },
      [user, api, todoTitle] as const,
    );
    setTitle("");
    await loadQueryHistory();
    await loadTodos(selectedUsername, query);
  };

  const update = async (id: number, patch: Partial<Todo>) => {
    if (!selectedUsername) return;
    const user = await getCurrentUser(selectedUsername);
    if (!user) return;

    const todo = await doRpc(
      async (user, id, api) => {
        const tg = await api.tg();
        return user.todos().where((t: any) => t.id.eq(id)).one(tg);
      },
      [user, id, api] as const,
    ) as TodoInstance | null;
    
    if (!todo) return;
    
    if ("title" in patch && patch.title !== undefined) {
      await doRpc(
        async (todo, api) => {
          const tg = await api.tg();
          return todo.update(patch.title!).execute(tg);
        },
        [todo, api] as const,
      );
    } else if ("completed" in patch && patch.completed !== undefined) {
      await doRpc(
        async (todo, api) => {
          const tg = await api.tg();
          return todo.setCompleted(patch.completed!).execute(tg);
        },
        [todo, api] as const,
      );
    }
    await loadQueryHistory();
    await loadTodos(selectedUsername ?? undefined, query);
  };

  const deleteTodo = async (id: number) => {
    if (!selectedUsername) return;
    const user = await getCurrentUser(selectedUsername);
    if (!user) return;

    const todo = await doRpc(
      async (user, id, api) => {
        const tg = await api.tg();
        return user.todos().where((t: any) => t.id.eq(id)).one(tg);
      },
      [user, id, api] as const,
    ) as TodoInstance | null;
    
    if (!todo) return;
    
    await doRpc(
      async (todo, api) => {
        const tg = await api.tg();
        return todo.delete().execute(tg);
      },
      [todo, api] as const,
    );
    await loadQueryHistory();
    await loadTodos(selectedUsername ?? undefined, query);
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
    <div className="mx-auto max-w-7xl p-6 md:p-8 space-y-6">
      <div className="mb-8 flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Cap'n Web + Typegres
          </h1>
          <p className="text-lg text-muted-foreground">Type-safe PostgreSQL queries over RPC</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">User:</span>
          <Select
            value={selectedUsername ?? "all"}
            onValueChange={(value) => setSelectedUsername(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              {users.map((user) => (
                <SelectItem key={user.username} value={user.username}>
                  {user.username}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="shadow-md border-2 border-primary/20 flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl">Todos</CardTitle>
                <CardDescription>
                  {selectedUsername === null
                    ? "Select a user to view their todos"
                    : `${todos.length} todo${todos.length !== 1 ? "s" : ""} found`}
                </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <Input
              placeholder="Search todos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full"
            />
            {todos.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                {query ? "No todos match your search" : "No todos found"}
              </p>
            ) : (
              <div className="space-y-2 flex-1 overflow-y-auto max-h-[600px]">
                {todos.map((t: Todo) => (
                  <div
                    key={t.id}
                    className="flex items-center gap-3 rounded-lg border-2 border-primary/10 p-4 hover:bg-accent/50 hover:border-primary/30 transition-all shadow-sm bg-card"
                  >
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={(e) => update(t.id, { completed: e.target.checked })}
                          disabled={selectedUsername === null}
                      className="h-4 w-4 rounded border-primary/30 disabled:cursor-not-allowed"
                    />
                    <Input
                      className="flex-1"
                      value={t.title}
                      onChange={(e) => update(t.id, { title: e.target.value })}
                      onBlur={(e) => update(t.id, { title: e.target.value })}
                          disabled={selectedUsername === null}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteTodo(t.id)}
                          disabled={selectedUsername === null}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2 pt-4 border-t border-primary/20">
              <Input
                placeholder={selectedUsername === null ? "Select a user to create todos" : "New todo..."}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && selectedUsername !== null && title.trim()) {
                    create();
                  }
                }}
                          disabled={selectedUsername === null}
                className="flex-1"
              />
              <Button 
                onClick={create} 
                    disabled={selectedUsername === null || !title.trim()}
              >
                Create
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl">SQL Query History</CardTitle>
            <CardDescription>Last 5 executed queries</CardDescription>
          </CardHeader>
          <CardContent>
            {queryHistory.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No queries executed yet</p>
            ) : (
              <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto">
                {/* Select Queries Column */}
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-primary mb-2 sticky top-0 bg-background pb-2 z-10">
                    Select
                  </div>
                  {queryHistory
                    .slice()
                    .reverse()
                    .filter((entry) => entry.sql.trim().toUpperCase().startsWith("SELECT"))
                    .map((entry, idx) => (
                      <Card key={idx} className="bg-gradient-to-br from-muted to-muted/50 border-2 border-primary/20 shadow-sm">
                        <CardContent className="pt-6">
                          <div className="mb-3 text-xs font-medium text-muted-foreground flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                            {new Date(entry.timestamp).toLocaleTimeString()}
                          </div>
                          <div className="mb-3 rounded-lg bg-[#1e1e1e] p-4 border border-primary/20 shadow-inner">
                            <SyntaxHighlight code={entry.sql} language="sql" className="text-xs" />
                          </div>
                          {entry.params.length > 0 && (
                            <details className="mt-2">
                              <summary className="cursor-pointer text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
                                Parameters ({entry.params.length})
                              </summary>
                              <pre className="mt-2 overflow-auto rounded-lg bg-background p-2 text-xs font-mono border border-primary/20 shadow-inner">
                                {JSON.stringify(entry.params, null, 2)}
                              </pre>
                            </details>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  {queryHistory
                    .slice()
                    .reverse()
                    .filter((entry) => entry.sql.trim().toUpperCase().startsWith("SELECT"))
                    .length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-4">No SELECT queries</p>
                  )}
                </div>

                {/* Mutations Column */}
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-primary mb-2 sticky top-0 bg-background pb-2 z-10">
                    Mutations
                  </div>
                  {queryHistory
                    .slice()
                    .reverse()
                    .filter(
                      (entry) =>
                        !entry.sql.trim().toUpperCase().startsWith("SELECT")
                    )
                    .map((entry, idx) => (
                      <Card key={idx} className="bg-gradient-to-br from-muted to-muted/50 border-2 border-primary/20 shadow-sm">
                        <CardContent className="pt-6">
                          <div className="mb-3 text-xs font-medium text-muted-foreground flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                            {new Date(entry.timestamp).toLocaleTimeString()}
                          </div>
                          <div className="mb-3 rounded-lg bg-[#1e1e1e] p-4 border border-primary/20 shadow-inner">
                            <SyntaxHighlight code={entry.sql} language="sql" className="text-xs" />
                          </div>
                          {entry.params.length > 0 && (
                            <details className="mt-2">
                              <summary className="cursor-pointer text-xs font-medium text-muted-foreground hover:text-primary transition-colors">
                                Parameters ({entry.params.length})
                              </summary>
                              <pre className="mt-2 overflow-auto rounded-lg bg-background p-2 text-xs font-mono border border-primary/20 shadow-inner">
                                {JSON.stringify(entry.params, null, 2)}
                              </pre>
                            </details>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  {queryHistory
                    .slice()
                    .reverse()
                    .filter(
                      (entry) =>
                        !entry.sql.trim().toUpperCase().startsWith("SELECT")
                    )
                    .length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-4">No mutations</p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
