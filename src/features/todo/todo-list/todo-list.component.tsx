"use client";

import { Todo } from "@prisma/client";
import { TodoItem } from "../todo-item";
import { cn } from "@/lib/utils";

type TodoListProps = {
  data: Todo[];
  className?: string;
};
//TODO: finalize styles
export const TodoList = ({ data, className }: TodoListProps) => {
  return (
    <div className={cn("mt-8 rounded-lg bg-blue-600", className)}>
      {data.map((item, index) => (
        <TodoItem prop={item} key={index}>
          <div className="group flex items-center gap-3 border-b-[1px] border-b-muted-foreground p-3">
            <TodoItem.Indicator />
            <TodoItem.Title />
            <div className="flex flex-grow justify-end">
              <div className="opacity-0 group-hover:opacity-100">
                <TodoItem.Delete />
              </div>
            </div>
          </div>
        </TodoItem>
      ))}
    </div>
  );
};
