'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTodoStore } from '../store/todo-store'
import { Todo } from '../types/todo'


interface AddTodoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedDate: Date
  todoToEdit?: Todo
}

export function AddTodoDialog({ open, onOpenChange, selectedDate, todoToEdit }: AddTodoDialogProps) {
  const { addTodo, updateTodo } = useTodoStore()
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [priority, setPriority] = React.useState<'low' | 'medium' | 'high'>('medium')

  React.useEffect(() => {
    if (todoToEdit) {
      setTitle(todoToEdit.title)
      setDescription(todoToEdit.description)
      setPriority(todoToEdit.priority)
    } else {
      setTitle('')
      setDescription('')
      setPriority('medium')
    }
  }, [todoToEdit])

  const handleSubmit = React.useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const todoData = {
      title,
      description,
      completed: todoToEdit ? todoToEdit.completed : false,
      date: selectedDate.toISOString(),
      priority,
    }
    console.log(todoData)
    if (todoToEdit) {
      updateTodo(todoToEdit.id, todoData)
    } else {
      addTodo(todoData)
    }
    onOpenChange(false)
  }, [addTodo, updateTodo, onOpenChange, title, description, selectedDate, priority, todoToEdit])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{todoToEdit ? 'Edit Todo' : 'Add New Todo'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Todo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full">
            {todoToEdit ? 'Update' : 'Add'} Todo
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
