"use server";

import prisma from "@lib/prisma";
import { Todo } from "@prisma/client";

export const getTodoList = async () => {
  const todoList = await prisma.todo.findMany();
  return todoList as Todo[];
};
