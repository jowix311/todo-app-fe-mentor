"use client";

import { Todo } from "@prisma/client";
import { addTodo, deleteTodo, updateCompletionStatus } from "./lib/actions";

type TodoProps = {
  todo: Todo[];
};

export default function TodoList({ todo }: TodoProps) {
  return (
    <>
      <button type="button" onClick={addTodo}>
        Add a entry
      </button>
      {todo.map(({ id, title }) => (
        <div key={id} className="grid grid-cols-2">
          <span>{title}</span>
          <div className="flex gap-2">
            <button
              type="button"
              className="text-black dark:text-white"
              onClick={() => updateCompletionStatus(id, true)}
            >
              Mark as Complete
            </button>
            <button
              type="button"
              className="text-black dark:text-white"
              onClick={() => deleteTodo(id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
