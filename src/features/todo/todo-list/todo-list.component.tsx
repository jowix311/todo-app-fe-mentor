"use client";

import { Todo } from "@prisma/client";
import { TodoItem, useTodoListStore } from "@features/todo";
import { cn } from "@/lib/utils";
import { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

enum STATUS {
  all = "",
  active = "active",
  completed = "completed",
}

const filteredTodoList = (todoList: Todo[], currentStatusFilter: STATUS) => {
  switch (currentStatusFilter) {
    case STATUS.active:
      return todoList.filter((todo) => !todo.completed);
    case STATUS.completed:
      return todoList.filter((todo) => todo.completed);
    default:
      return todoList;
  }
};

type TodoListProps = {
  data: Todo[];
  className?: string;
};

// TODO Revisit caching issue

export const TodoList = ({ data, className }: TodoListProps) => {
  const searchParams = useSearchParams();
  const currentStatusFilter = searchParams.get("status") as STATUS | null;
  // const todoListed = useTodoListStore((state) => state.todoList);
  const [finalFilteredTodo, setFinalFilteredTodo] = useState<Todo[]>([]);
  const router = useRouter();

  useEffect(() => {
    useTodoListStore.setState({ todoList: data });
  }, [data, searchParams, router]);

  useEffect(() => {
    const unsSub = useTodoListStore.subscribe(
      (state) => state.todoList,
      (state) => {
        setFinalFilteredTodo(
          filteredTodoList(state, currentStatusFilter || STATUS.all),
        );
      },
      { fireImmediately: true },
    );
    return unsSub;
  }, [currentStatusFilter]);

  return (
    <div className={cn("rounded-lg bg-white dark:bg-blue-600", className)}>
      {finalFilteredTodo.map((item, index) => (
        // The key here is SUPER important DO NO use index or else list will not render properly
        <TodoItem prop={item} key={`${item.id}_${Math.random()}`}>
          <TodoItem.Block>
            <TodoItem.Indicator />
            <TodoItem.Title />
            <div className="flex flex-grow justify-end">
              <div className="opacity-0 group-hover:opacity-100">
                <TodoItem.Delete />
              </div>
            </div>
          </TodoItem.Block>
        </TodoItem>
      ))}
    </div>
  );
};
