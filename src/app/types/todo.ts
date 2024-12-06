export interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
  date: string // ISO string
  priority: 'low' | 'medium' | 'high'
}

export interface TodoStore {
  todos: Todo[]
  addTodo: (todo: Omit<Todo, 'id'>) => void
  toggleTodo: (id: string) => void
  updateTodo: (id: string, todo: Partial<Todo>) => void
  deleteTodo: (id: string) => void
}

