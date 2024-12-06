'use client'

import React from 'react'
import { Todo } from '../types/todo'
import { useTodoStore } from '../store/todo-store'
import { Check, Flag, Trash2 } from 'lucide-react'

interface TodoItemProps {
  todo: Todo
  onEdit: (todo: Todo) => void
  onDelete: (id: string) => void
}

export const TodoItem = React.memo(function TodoItem({ todo, onEdit, onDelete }: TodoItemProps) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo)

  const handleToggle = React.useCallback(() => {
    toggleTodo(todo.id)
  }, [toggleTodo, todo.id])

  const handleEdit = React.useCallback(() => {
    onEdit(todo)
  }, [onEdit, todo])

  const handleDelete = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(todo.id)
  }, [onDelete, todo.id])

  const priorityColor = {
    low: 'text-green-500',
    medium: 'text-yellow-500',
    high: 'text-red-500'
  }

  return (
    <div className="flex items-start space-x-4 p-4 rounded-lg bg-white shadow-sm">
      <button
        onClick={handleToggle}
        className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          todo.completed ? 'bg-black border-black' : 'border-gray-300'
        }`}
      >
        {todo.completed && <Check className="w-3 h-3 text-white" />}
      </button>
      <div className="flex-1 cursor-pointer" onClick={handleEdit}>
        <div className="flex items-center justify-between">
          <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-400' : ''}`}>
            {todo.title}
          </h3>
          <div className="flex items-center space-x-2">
            <Flag className={`w-4 h-4 ${priorityColor[todo.priority]}`} />
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 transition-colors"
              aria-label="Delete todo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500">{todo.description}</p>
        <p className="text-xs text-gray-400">{new Date(todo.date).toLocaleDateString()}</p>
      </div>
    </div>
  )
})

