import { Todo } from "@prisma/client";
import { create } from "zustand";

interface TodoListState {
  todoList: Todo[];
}

export const useTodoListStore = create<TodoListState>((set) => ({
  todoList: [],
}));
