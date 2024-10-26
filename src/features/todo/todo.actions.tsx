"use server";

import prisma from "@lib/prisma";

export const updateTodoStatus = async (id: string, isCompleted: boolean) => {
  try {
    await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        completed: isCompleted,
      },
    });
    return true;
  } catch (error) {
    console.error("Error updating todo completion status:", error);
    return false;
  }
};
export const deleteTodo = async (ids: string[]) => {
  try {
    await prisma.todo.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return true;
  } catch (error) {
    console.error("Error deleting todo:", error);
    return false;
  }
};
