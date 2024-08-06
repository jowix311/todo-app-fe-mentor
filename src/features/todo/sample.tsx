"use client";

import { TodoItem } from "./todo-item.tsx";

export default function Sample() {
  const data = [{ title: "Sleep 8 hours" }, { title: "Drink water" }, { title: "Eat well" }];

  return (
    <>
      {data.map((item, index) => (
        <TodoItem key={index} prop={item}>
          <div className="flex items-center gap-3 rounded-lg border-blue-600 bg-blue-600 p-3">
            <TodoItem.Indicator />
            <TodoItem.Title />
          </div>
        </TodoItem>
      ))}
    </>
  );
}
