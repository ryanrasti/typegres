import { useState, useEffect } from 'react'
import { initializeDatabase } from './lib/db'
import { TodoService } from './lib/todoService'

function App() {
  const [todos, setTodos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newTodo, setNewTodo] = useState('')
  const [sqlLog, setSqlLog] = useState<string[]>([])
  
  useEffect(() => {
    initDb()
  }, [])

  const initDb = async () => {
    try {
      await initializeDatabase()
      await loadTodos()
    } catch (error) {
      console.error('Failed to initialize database:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadTodos = async () => {
    try {
      const service = new TodoService()
      const userTodos = await service.getUserTodos('user-1')
      setTodos(userTodos)
      
      // Log the SQL that would be generated
      setSqlLog(prev => [...prev, `SELECT * FROM "Todo" WHERE "userId" = 'user-1' ORDER BY priority DESC`])
    } catch (error) {
      console.error('Failed to load todos:', error)
    }
  }

  const handleCreateTodo = async () => {
    if (!newTodo.trim()) return
    
    try {
      const service = new TodoService()
      await service.createTodo('user-1', newTodo)
      setNewTodo('')
      await loadTodos()
      
      setSqlLog(prev => [...prev, `INSERT INTO "Todo" (content, userId) VALUES ('${newTodo}', 'user-1')`])
    } catch (error) {
      console.error('Failed to create todo:', error)
    }
  }

  const handleToggleTodo = async (id: string, completed: boolean) => {
    try {
      const service = new TodoService()
      await service.updateTodo(id, { completed: !completed })
      await loadTodos()
      
      setSqlLog(prev => [...prev, `UPDATE "Todo" SET completed = ${!completed} WHERE id = '${id}'`])
    } catch (error) {
      console.error('Failed to update todo:', error)
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-lg">Initializing PGlite database...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Typegres + PGlite Demo
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Todo App */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Todo App</h2>
            
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreateTodo()}
                placeholder="Add a new todo..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleCreateTodo}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>

            <div className="space-y-2">
              {todos.map((todo) => (
                <div key={todo.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id, todo.completed)}
                    className="w-5 h-5"
                  />
                  <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                    {todo.content}
                  </span>
                  <span className="ml-auto text-sm text-gray-500">
                    Priority: {todo.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Assistant Panel (placeholder for now) */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">AI Assistant</h2>
            <p className="text-gray-600 mb-4">
              This panel will allow AI agents to interact with the database through capabilities.
            </p>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                🚧 Cap'n Web integration coming next...
              </p>
            </div>
          </div>
        </div>

        {/* SQL Activity Log */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">SQL Activity Log</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm max-h-60 overflow-y-auto">
            {sqlLog.length === 0 ? (
              <div className="text-gray-500">No SQL queries executed yet...</div>
            ) : (
              sqlLog.map((sql, i) => (
                <div key={i} className="mb-2">
                  <span className="text-gray-500">[{i + 1}]</span> {sql}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App