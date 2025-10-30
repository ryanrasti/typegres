import { useEffect, useMemo, useState } from 'react'
import { useApi } from '../use-capnweb'

type Todo = { id: number; title: string; completed: boolean }

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [query, setQuery] = useState('')
  const [title, setTitle] = useState('')
  const [sql, setSql] = useState('')
  const api = useApi()

  // TODO: Wire to worker/capnweb; placeholder local state for now
  const filtered = useMemo(() => todos.filter(t => t.title.toLowerCase().includes(query.toLowerCase())), [todos, query])

  useEffect(() => {
    // placeholder initial data (local UI), but source SQL from RPC
    setTodos([
      { id: 1, title: 'Try Cap\'n Web', completed: false },
      { id: 2, title: 'Build Typegres query', completed: true },
    ])
    ;(async () => {
      const s = await api.todos().sql()
      setSql(s as unknown as string)
    })()
  }, [api])

  const create = async () => {
    if (!title.trim()) return
    const next: Todo = { id: Math.max(0, ...todos.map(t => t.id)) + 1, title: title.trim(), completed: false }
    setTodos([next, ...todos])
    setTitle('')
    const s = await api
      .users()
      .where(u => u.id.eq(1))
      .select()
      .map(u => u.createTodo(next.title))
      .sql()
    setSql(s as unknown as string)
  }

  const update = async (id: number, patch: Partial<Todo>) => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, ...patch } : t)))
    const s = await api
      .todos()
      .where(t => t.id.eq(id))
      .select()
      .map(t => ('title' in patch ? t.update(patch.title ?? '') : t.setCompleted(!!patch.completed)))
      .sql()
    setSql(s as unknown as string)
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
            <input className="flex-1 rounded border px-3 py-2" value={t.title} onChange={e => update(t.id, { title: e.target.value })} />
            <button className="rounded bg-red-600 px-3 py-2 text-white" onClick={async () => {
              setTodos(prev => prev.filter(item => item.id !== t.id))
              const s = await api.todos().where(todo => todo.id.eq(t.id)).select().map(todo => todo.delete()).sql()
              setSql(s as unknown as string)
            }}>Delete</button>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <h3 className="text-lg font-medium">SQL</h3>
        <pre className="mt-2 max-h-64 overflow-auto rounded bg-zinc-900 p-3 text-zinc-100">{sql || '/* SQL for last action will appear here */'}</pre>
      </div>
    </div>
  )
}



