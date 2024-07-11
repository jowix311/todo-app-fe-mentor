import { Prisma, PrismaClient, Todo } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const todos: Prisma.TodoCreateInput[] = [
    {
      title: "Buy groceries",
      content: "Milk, eggs, bread, and vegetables",
      completed: false,
      order: 1,
    },
    {
      title: "Finish project report",
      content: "Complete the quarterly project report",
      completed: false,
      order: 2,
    },
  ];

  for (const todo of todos) {
    await prisma.todo.create({
      data: todo,
    });
  }

  console.log("Seeded todos successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
