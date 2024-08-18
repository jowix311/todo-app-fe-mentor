"use client";

import { Todo } from "@prisma/client";
import { TodoItem } from "../todo-item";

type TodoListProps = {
  data: Todo[];
};
//TODO: finalize styles
export const TodoList = ({ data }: TodoListProps) => {
  return (
    <>
      {data.map((item, index) => (
        <TodoItem key={index} prop={item}>
          <div className="flex items-center gap-3 rounded-lg border-blue-600 bg-blue-600 p-3">
            <TodoItem.Indicator />
            <TodoItem.Title />
            <TodoItem.Delete />
          </div>
        </TodoItem>
      ))}
    </>
  );
};
