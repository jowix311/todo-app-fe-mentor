import { Todo } from "@prisma/client";
import { create } from "zustand";
import { subscribeWithSelector } from 'zustand/middleware'

interface TodoListState {
  todoList: Todo[];
}

export const useTodoListStore = create<TodoListState>()(subscribeWithSelector((set) => ({
  todoList: [],
})));

export const addTodo = (todo: Todo) => {
  useTodoListStore.setState((state) => ({
    todoList: [...state.todoList, todo],
  }));
};

export const updateTodoStoreStatus = (id: string, completed: boolean) => {
  useTodoListStore.setState((state) => ({
    todoList: state.todoList.map((todo) => {
      return todo.id === id ? { ...todo, completed } : todo;
    }),
  }));
};

export const deleteTodoByIds = (ids: string[]) => {
  useTodoListStore.setState((state) => ({
    todoList: state.todoList.filter((todo) => !ids.includes(todo.id)),
  }));
};
