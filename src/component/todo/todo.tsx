"use client";

import prisma from "@lib/prisma";
import { Todo } from "@prisma/client";
import { addTodo } from "./lib/actions";

type TodoProps = {
  todo: Todo[];
  handleAdd: () => Promise<void>;
};

export default function TodoList({ todo, handleAdd }: TodoProps) {
  return (
    <>
      <button onClick={addTodo}>Add a entry</button>
      {todo.map(({ id, title }) => (
        <div key={id} className="grid grid-cols-2">
          <span>{title}</span>
          <div className="flex gap-2">
            <button className="text-white">Mark as Complete</button>
            <button className="text-white">Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}
