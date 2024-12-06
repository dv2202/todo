'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { CalendarStrip } from './components/calender-strip';
import { TodoItem } from './components/todo-item';
import { AddTodoDialog } from './components/add-todo-dialog';
import { useTodoStore } from './store/todo-store';
import { Todo } from './types/todo';
import { isSameDay } from './utils/date';
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Home() {
  const [selectedDate, setSelectedDate] = React.useState(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [todoToEdit, setTodoToEdit] = React.useState<Todo | undefined>();

  const todos = useTodoStore((state) => state.todos);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const filteredTodos = React.useMemo(() => {
    return todos.filter((todo) => {
      const todoDate = new Date(todo.date);
      return isSameDay(todoDate, selectedDate);
    });
  }, [todos, selectedDate]);

  const handleEditTodo = React.useCallback((todo: Todo) => {
    setTodoToEdit(todo);
    setIsDialogOpen(true);
  }, []);

  const handleDeleteTodo = React.useCallback((id: string) => {
    deleteTodo(id);
  }, [deleteTodo]);

  const handleOpenChange = React.useCallback((open: boolean) => {
    setIsDialogOpen(open);
    if (!open) setTodoToEdit(undefined);
  }, []);

  const handleAddTodo = React.useCallback(() => {
    setTodoToEdit(undefined);
    setIsDialogOpen(true);
  }, []);

  const isPastDate = React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate < today;
  }, [selectedDate]);

  const getDayLabel = React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (isSameDay(selectedDate, today)) {
      return 'Today';
    } else if (isSameDay(selectedDate, tomorrow)) {
      return 'Tomorrow';
    } else {
      return selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    }
  }, [selectedDate]);

  return (
    <div className="flex items-center justify-center h-[100vh] bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="relative w-[350px] h-[80%] bg-black rounded-[55px] border-[14px] border-gray-900 shadow-2xl overflow-hidden">
        <div className='bg-black h-[24px] w-[96px] rounded-full z-30 absolute left-[37%] top-2'></div>
        <main className="absolute top-0 w-full h-full bg-white rounded-[41px] shadow-inner overflow-hidden flex flex-col">
          {/* Header Section */}
          <div className="rounded-b-[35px] border-b bg-[#F3F3F6] pt-[32px] px-2">
            <div className=" text-black ">
              <div className="text-2xl font-bold">{getDayLabel}</div>
              <p className="text-sm opacity-80">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div className="p-2 bg-transparent">
              <CalendarStrip selectedDate={selectedDate} onSelectDate={setSelectedDate} />
            </div>
          </div>
          <ScrollArea className="flex-grow">
            <div className="p-4 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
              {filteredTodos.length > 0 ? (
                filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onEdit={handleEditTodo}
                    onDelete={handleDeleteTodo}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-sm">No tasks for this day.</p>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 items-center text-center justify-center flex">
            <Button
              onClick={handleAddTodo}
              className="w-[60px] h-[60px] rounded-full items-center flex justify-center text-center"
              disabled={isPastDate}
              variant={isPastDate ? "secondary" : "default"}
            >
              <Plus className="w-6 h-6 text-[20px]" />
            </Button>
          </div>
        </main>
      </div>

      <AddTodoDialog
        open={isDialogOpen}
        onOpenChange={handleOpenChange}
        selectedDate={selectedDate}
        todoToEdit={todoToEdit}
      />
    </div>
  );
}

