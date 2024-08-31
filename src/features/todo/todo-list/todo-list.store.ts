import { Todo } from "@prisma/client";
import { create } from "zustand";

interface TodoListState {
  todoList: Todo[];
}

export const useTodoListStore = create<TodoListState>((set) => ({
  todoList: [],
}));

export const addTodo = (todo: Todo) => {
  useTodoListStore.setState((state) => ({
    todoList: [...state.todoList, todo],
  }));
};

export const updateTodoStoreStatus = (id: string, completed: boolean) => {
  console.log("updateTodoStoreStatus", id, completed);
  useTodoListStore.setState((state) => ({
    todoList: state.todoList.map((todo) => {
      console.log("updateTodoStoreStatus inside", completed);
      return todo.id === id ? { ...todo, completed } : todo;
    }),
  }));
};

export const deleteTodoByIds = (ids: string[]) => {
  useTodoListStore.setState((state) => ({
    todoList: state.todoList.filter((todo) => !ids.includes(todo.id)),
  }));
};
