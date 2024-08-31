"use server";

import prisma from "@lib/prisma";
import { formSchema } from "./todo-form.component";
import { z } from "zod";

type SaveTodoProps = z.infer<typeof formSchema>;
export const saveTodo = async (data: SaveTodoProps) => {
  const initialData = {
    title: data.title,
    completed: false,
  };

  try {
    const newTodo = await prisma.todo.create({
      data: initialData,
    });
    return newTodo;
  } catch (error) {
    console.error("Error creating todo:", error);
    return false;
  }
};
