"use client";

import { Button } from "@/components/ui/button";
import { deleteTodo, deleteTodoByIds, useTodoListStore } from "@features/todo";

export const TodoClearCompleted = () => {
  // We can make this component more dumb
  const handleClick = async () => {
    const completedTodoIds = useTodoListStore
      .getState()
      .todoList.filter((todo) => todo.completed)
      .map((todo) => todo.id);

    const response = await deleteTodo(completedTodoIds);

    deleteTodoByIds(completedTodoIds);
  };

  return (
    <Button
      className="bg-transparent text-muted-foreground hover:bg-transparent dark:hover:text-white"
      onClick={handleClick}
    >
      Clear Completed
    </Button>
  );
};
