import { useEffect, useMemo, useState } from "react";
import { useApi } from "../use-capnweb";
import { doRpc } from "../do-rpc";
import type { User, Todo as TodoInstance } from "../api";
import { RpcStub } from "capnweb";

type Todo = { id: number; title: string; completed: boolean };
type QueryHistoryEntry = { sql: string; params: unknown[]; timestamp: number };

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [queryHistory, setQueryHistory] = useState<QueryHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const api = useApi();

  const filtered = useMemo(
    () => todos.filter((t) => t.title.toLowerCase().includes(query.toLowerCase())),
    [todos, query],
  );

  const loadTodos = async () => {
    try {
      const tg = api.getTg();
      const result = await doRpc(
        (api, tg) => {
          return api
            .todos()
            .select((t) => ({
              id: t.id,
              title: t.title,
              completed: t.completed,
            }))
            .execute(tg);
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
    loadTodos();
  }, [api]);

  const create = async () => {
    if (!title.trim()) return;
    try {
      const tg = api.getTg();
      const r1 = doRpc(
        (api, tg) => {
          const one = api
            .users()
            .select((u) => u)
            .limit(1)
            .one(tg);
          return one;
        },
        [api, tg] as const,
      );
      console.log(">>>>>> r1", r1);
      const result = await r1;
      console.log(">>>>>> user result", result);
      //console.log('>> result 2:', await api.users().select((u) => u).sql());
      const user = result as RpcStub<User>;
      console.log(">>>>>> user as stub", user.createTodo, user.createTodo("foo"));
      console.log(">>>>>> await user.createTodo('foo')", await user.createTodo("foo"));
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
      await loadTodos();
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
      await loadTodos();
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
      await loadTodos();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl p-6 font-sans">
        <h1 className="text-2xl font-semibold">Cap'n Web + Typegres: Todo</h1>
        <p className="mt-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6 font-sans">
      <h1 className="text-2xl font-semibold">Cap'n Web + Typegres: Todo</h1>

      <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
        <input
          className="rounded border px-3 py-2"
          placeholder="New todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && create()}
        />
        <button className="rounded bg-blue-600 px-4 py-2 text-white" onClick={create}>
          Create
        </button>
      </div>

      <div className="mt-4">
        <input
          className="w-full rounded border px-3 py-2"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <ul className="mt-4 grid gap-2">
        {filtered.map((t) => (
          <li key={t.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={t.completed}
              onChange={(e) => update(t.id, { completed: e.target.checked })}
            />
            <input
              className="flex-1 rounded border px-3 py-2"
              value={t.title}
              onChange={(e) => update(t.id, { title: e.target.value })}
              onBlur={(e) => update(t.id, { title: e.target.value })}
            />
            <button className="rounded bg-red-600 px-3 py-2 text-white" onClick={() => deleteTodo(t.id)}>
              Delete
            </button>
          </li>
        ))}
        {filtered.length === 0 && <li className="text-center text-gray-500 py-4">No todos found</li>}
      </ul>

      <div className="mt-6">
        <h3 className="text-lg font-medium">SQL Query History (Last 5)</h3>
        {queryHistory.length === 0 ? (
          <p className="mt-2 text-gray-500 text-sm">No queries executed yet</p>
        ) : (
          <div className="mt-2 space-y-3">
            {queryHistory.slice().reverse().map((entry, idx) => (
              <div key={idx} className="rounded bg-zinc-900 p-3">
                <div className="mb-2 text-xs text-zinc-400">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </div>
                <pre className="mb-2 overflow-auto text-zinc-100 text-sm whitespace-pre-wrap break-words">
                  {entry.sql}
                </pre>
                {entry.params.length > 0 && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-xs text-zinc-400 hover:text-zinc-300">
                      Parameters ({entry.params.length})
                    </summary>
                    <pre className="mt-1 overflow-auto text-zinc-300 text-xs">
                      {JSON.stringify(entry.params, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
