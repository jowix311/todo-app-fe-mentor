"use client";

import { TodoItem } from "./todo-item.tsx";

export default function Sample() {
  const data = [
    { title: "Sleep 8 hours", isCompleted: Math.random() < 0.5 },
    { title: "Drink water", isCompleted: Math.random() < 0.5 },
    { title: "Eat well", isCompleted: Math.random() < 0.5 },
  ];

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
