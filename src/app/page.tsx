import TodoList from "@/component/todo/todo";
import prisma from "@lib/prisma";

export default async function Home() {
  const feed = await prisma.todo.findMany();

  const handleAdd = async () => {
    "use server";
    console.log("inside handleAdd");
    const newEntry = {
      title: "Todo - This just statically generated",
      completed: false,
    };
    prisma.todo.create({ data: newEntry });
    console.log("done");
  };

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <TodoList todo={feed} handleAdd={handleAdd} />
    </main>
  );
}
