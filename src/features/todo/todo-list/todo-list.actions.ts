"use server";

import prisma from "@lib/prisma";

export const getTodoList = async () => {
  const todoList = await prisma.todo.findMany();
  return todoList;
};