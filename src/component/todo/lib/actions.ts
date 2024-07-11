"use server";

import prisma from "@lib/prisma";
import { revalidatePath } from "next/cache";

export const addTodo = async () => {
  try {
    const newEntry = {
      title: "Todo - This just statically generated",
      completed: false,
    };
    await prisma.todo.create({ data: newEntry });
  } catch (error) {
    console.error("Error creating todo:", error);
    throw new Error("Failed to create todo");
  }
  revalidatePath("/");
};

export const deleteTodo = async (id: string) => {
  try {
    await prisma.todo.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw new Error("Failed to delete todo");
  }
  revalidatePath("/");
};

export const updateCompletionStatus = async (
  id: string,
  isCompleted: boolean,
) => {
  try {
    await prisma.todo.update({
      where: {
        id,
      },
      data: {
        completed: isCompleted,
      },
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    throw new Error("Failed to update todo");
  }
  revalidatePath("/");
};
