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
