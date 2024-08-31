"use client";

import { Todo } from "@prisma/client";
import { TodoItem } from "@features/todo";
import { cn } from "@/lib/utils";

type TodoListProps = {
  data: Todo[];
  className?: string;
};

export const TodoList = ({ data, className }: TodoListProps) => {
  return (
    <div className={cn("mt-8 rounded-lg bg-blue-600", className)}>
      {data.map((item, index) => (
        <TodoItem prop={item} key={index}>
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
