import TodoList from "@/component/todo/todo";
import prisma from "@lib/prisma";

export default async function Home() {
  // Optimized call as mention on NextJS docs
  const [activeTodo, completedTodo] = await Promise.all([
    prisma.todo.findMany({ where: { completed: false } }),
    prisma.todo.findMany({ where: { completed: true } }),
  ]);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h2>Active</h2>
      <TodoList todo={activeTodo} />

      <h2 className="mt-6">Completed</h2>
      <TodoList todo={completedTodo} />
    </main>
  );
}
