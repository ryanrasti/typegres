import { useEffect, useMemo, useState } from 'react'
import { useApi } from '../use-capnweb'
import { Int4 } from '../../../types'
import { doRpc } from '../do-rpc'
import type { User, Todo as TodoInstance } from '../api'

type Todo = { id: number; title: string; completed: boolean }

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [query, setQuery] = useState('')
  const [title, setTitle] = useState('')
  const [sql, setSql] = useState('')
  const [loading, setLoading] = useState(true)
  const api = useApi()

  const filtered = useMemo(() => todos.filter(t => t.title.toLowerCase().includes(query.toLowerCase())), [todos, query])

  const loadTodos = async () => {
    try {
      const tg = api.getTg()
      const result = await doRpc((api, tg) => {
        return api.todos().select((t) => ({
          id: t.id,
          title: t.title,
          completed: t.completed,
        })).execute(tg)
      }, [api, tg] as const)
      setTodos(result as unknown as Todo[])
      const lastQuery = await doRpc((tg) => tg.getLastQuery(), [tg] as const)
      if (lastQuery) setSql(`${lastQuery.sql}\n\nParams: ${JSON.stringify(lastQuery.params, null, 2)}`)
    } catch (error) {
      console.error('Failed to load todos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTodos()
  }, [api])

  const create = async () => {
    if (!title.trim()) return
    try {
      const tg = api.getTg()
      const result = await doRpc((api, tg) => {
        return api.users().select((u) => u).where((u) => u.id["="](Int4.new(1))).one(tg)
      }, [api, tg] as const)
      const user = result as User | null
      if (!user) {
        console.error('User not found')
        return
      }
      await doRpc((user, tg) => {
        return user.createTodo(title.trim()).execute(tg)
      }, [user, tg] as const)
      setTitle('')
      const lastQuery = await doRpc((tg) => tg.getLastQuery(), [tg] as const)
      if (lastQuery) setSql(`${lastQuery.sql}\n\nParams: ${JSON.stringify(lastQuery.params, null, 2)}`)
      await loadTodos()
    } catch (error) {
      console.error('Failed to create todo:', error)
    }
  }

  const update = async (id: number, patch: Partial<Todo>) => {
    try {
      const tg = api.getTg()
      const todo = await doRpc((api, tg) => {
        return api.todos().select((t) => t).where((t) => t.id["="](Int4.new(id))).one(tg)
      }, [api, tg] as const) as TodoInstance | null
      if (!todo) {
        console.error('Todo not found')
        return
      }
      if ('title' in patch && patch.title !== undefined) {
        await doRpc((todo, tg) => {
          return todo.update(patch.title!).execute(tg)
        }, [todo, tg] as const)
      } else if ('completed' in patch && patch.completed !== undefined) {
        await doRpc((todo, tg) => {
          return todo.setCompleted(patch.completed!).execute(tg)
        }, [todo, tg] as const)
      }
      const lastQuery = await doRpc((tg) => tg.getLastQuery(), [tg] as const)
      if (lastQuery) setSql(`${lastQuery.sql}\n\nParams: ${JSON.stringify(lastQuery.params, null, 2)}`)
      await loadTodos()
    } catch (error) {
      console.error('Failed to update todo:', error)
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      const tg = api.getTg()
      const todo = await doRpc((api, tg) => {
        return api.todos().select((t) => t).where((t) => t.id["="](Int4.new(id))).one(tg)
      }, [api, tg] as const) as TodoInstance | null
      if (!todo) {
        console.error('Todo not found')
        return
      }
      await doRpc((todo, tg) => {
        return todo.delete().execute(tg)
      }, [todo, tg] as const)
      const lastQuery = await doRpc((tg) => tg.getLastQuery(), [tg] as const)
      if (lastQuery) setSql(`${lastQuery.sql}\n\nParams: ${JSON.stringify(lastQuery.params, null, 2)}`)
      await loadTodos()
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl p-6 font-sans">
        <h1 className="text-2xl font-semibold">Cap'n Web + Typegres: Todo</h1>
        <p className="mt-4">Loading...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl p-6 font-sans">
      <h1 className="text-2xl font-semibold">Cap'n Web + Typegres: Todo</h1>

      <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
        <input className="rounded border px-3 py-2" placeholder="New todo" value={title} onChange={e => setTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && create()} />
        <button className="rounded bg-blue-600 px-4 py-2 text-white" onClick={create}>Create</button>
      </div>

      <div className="mt-4">
        <input className="w-full rounded border px-3 py-2" placeholder="Search" value={query} onChange={e => setQuery(e.target.value)} />
      </div>

      <ul className="mt-4 grid gap-2">
        {filtered.map(t => (
          <li key={t.id} className="flex items-center gap-2">
            <input type="checkbox" checked={t.completed} onChange={e => update(t.id, { completed: e.target.checked })} />
            <input 
              className="flex-1 rounded border px-3 py-2" 
              value={t.title} 
              onChange={e => update(t.id, { title: e.target.value })} 
              onBlur={e => update(t.id, { title: e.target.value })}
            />
            <button className="rounded bg-red-600 px-3 py-2 text-white" onClick={() => deleteTodo(t.id)}>Delete</button>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="text-center text-gray-500 py-4">No todos found</li>
        )}
      </ul>

      <div className="mt-6">
        <h3 className="text-lg font-medium">Last SQL Query</h3>
        <pre className="mt-2 max-h-64 overflow-auto rounded bg-zinc-900 p-3 text-zinc-100 text-sm">{sql || '/* SQL for last action will appear here */'}</pre>
      </div>
    </div>
  )
}



