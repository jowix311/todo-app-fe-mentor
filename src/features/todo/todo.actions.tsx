"use server";

import prisma from "@lib/prisma";
import { formSchema } from "./todo-form/todo-form.component";
import { z } from "zod";

// TODO: move server actions here

// type SaveTodoProps = z.infer<typeof formSchema>;
// export const saveTodo = async (data: SaveTodoProps) => {
//   try {
//     const newTodo = await prisma.todo.create({
//       data: {
//         title: data.title,
//         completed: false,
//       },
//     });
//     return true;
//   } catch (error) {
//     console.error("Error creating todo:", error);
//     return false;
//   }
// };

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
export const deleteTodo = async (id: string) => {
  try {
    await prisma.todo.delete({
      where: {
        id: id,
      },
    });
    return true;
  } catch (error) {
    console.error("Error deleting todo:", error);
    return false;
  }
};
