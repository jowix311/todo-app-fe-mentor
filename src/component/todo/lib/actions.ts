"use server";

import prisma from "@lib/prisma";
import { revalidatePath } from "next/cache";

export const addTodo = async () => {
  const newEntry = {
    title: "Todo - This just statically generated",
    completed: false,
  };
  await prisma.todo.create({ data: newEntry });

  revalidatePath("/");
};

export const deleteTodo = async (id: string) => {
  await prisma.todo.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
};

export const updateCompletionStatus = async (id: string, isCompleted: boolean) => {
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      completed: isCompleted,
    },
  });

  revalidatePath("/");
};
