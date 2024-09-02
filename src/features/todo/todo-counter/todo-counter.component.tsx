"use client";

import { useTodoListStore } from "@features/todo";
import { useEffect, useState } from "react";

export const TodoCounter = () => {
  const [remainingCount, setRemainingCount] = useState(0);

  useEffect(() => {
    const unSub = useTodoListStore.subscribe(
      (state) => state.todoList,
      (state) => {
        setRemainingCount(state.filter((todo) => !todo.completed).length);
      },

      { fireImmediately: true },
    );

    return unSub;
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-2 text-muted-foreground">
      {remainingCount} item{remainingCount === 1 ? "" : "s"} left
    </div>
  );
};
