// import TodoList from "@/component/todo/todo";

import { Hero } from "@/features/banner";
import prisma from "@lib/prisma";
import Image from "next/image";
import IconSun from "@public/icon-sun.svg";
import { TodoForm } from "@/features/todo";
import { TodoItem } from "@/features/todo/todo-item.tsx";

export default async function Home() {
  // Optimized call as mention on NextJS docs
  const [activeTodo, completedTodo] = await Promise.all([
    prisma.todo.findMany({ where: { completed: false } }),
    prisma.todo.findMany({ where: { completed: true } }),
  ]);

  return (
    <main className="min-h-screen">
      <Hero />

      <section className="px-8">
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl uppercase tracking-[0.5rem] text-white">
            Todo
          </h1>

          <Image src={IconSun} alt="icon sun" width={18} height={18} />
        </div>
        <div>
          <TodoForm/>
          <TodoItem>
          <div className="flex items-center gap-3 p-3 border-blue-600 bg-blue-600 rounded-lg">
            <TodoItem.Indicator />
            <TodoItem.Title />
            </div>
          </TodoItem>
        </div>
      </section>
      {/* <h2>Active</h2>
      <TodoList todo={activeTodo} />

      <h2 className="mt-6">Completed</h2>
      <TodoList todo={completedTodo} /> */}
    </main>
  );
}
