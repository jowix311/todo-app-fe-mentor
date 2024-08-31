"use client";

import { useTodoListStore } from "@features/todo";
import { useEffect, useState } from "react";

export const TodoCounter = () => {
  const [remainingCount, setRemainingCount] = useState(
    useTodoListStore.getState().todoList.length,
  );

  useEffect(() => {
    const unSub = useTodoListStore.subscribe((state, prevState) => {
      setRemainingCount(state.todoList.filter((todo) => todo.completed).length);
    });

    return unSub;
  }, [useTodoListStore]);

  return (
    <div className="flex items-center justify-between px-4 py-2 text-muted-foreground">
      {remainingCount} item{remainingCount === 1 ? "" : "s"} left
    </div>
  );
};
