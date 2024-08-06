"use client";

import { createContext, use, useContext, useEffect, useRef } from "react";
import { create, createStore } from "zustand";

// 1. Creating the Zustand store
// Official Docs: https://github.com/pmndrs/zustand/blob/main/docs/guides/initialize-state-with-props.md
interface TodoItemProps {
  title: string;
}
interface TodoItemState extends TodoItemProps {
  setTitle: (title: string) => void;
}

type TodoItemStore = ReturnType<typeof createTodoItemStore>;

const createTodoItemStore = (initProps?: Partial<TodoItemProps>) => {
  console.log("initProps", initProps);
  const DEFAULT_STATE = {
    title: "",
  };
  return createStore<TodoItemState>((set) => ({
    ...DEFAULT_STATE,
    ...initProps,
    setTitle: (title) => set({ title }),
  }));
};

// 2. Creating the context
export const TodoItemContext = createContext<TodoItemStore | null>(null);

// 3. Wrapping the context provider
type BearProviderProps = React.PropsWithChildren<TodoItemProps>;

export const TodoItemProvider = ({ children, ...props }: BearProviderProps) => {
  const storeRef = useRef<TodoItemStore>(); // Take note of the ref here

  if (!storeRef.current) {
    storeRef.current = createTodoItemStore(props); // This creates a new ref every render
  }

  return (
    <TodoItemContext.Provider value={storeRef.current}>
      {children}
    </TodoItemContext.Provider>
  );
};

// 4. Using custom hook for the context
export const useTodoItemContext = () => {
  const context = useContext(TodoItemContext);
  if (!context) {
    throw new Error(
      "useTodoItemContext must be used within a TodoItemProvider",
    );
  }
  return context;
};

// 5. Using it on the parent Compound Component
type Props = {
  children: React.ReactNode;
  prop: {
    title: string;
  };
};

export const TodoItem = ({ children, prop }: Props) => {
  // return <TodoItemProvider {...prop}>{children}</TodoItemProvider>; // Keeping this code for reference purposes.
  return <TodoItemProvider title={prop.title}>{children}</TodoItemProvider>;
};

const TodoItemIndicator = () => {
  return (
    <div className="h-8 w-8 rounded-full border-[1px] border-blue-300"></div>
  );
};

const TodoItemTitle = () => {
  const title = useTodoItemContext().getState().title;
  return <p className="text-white">{title}</p>;
};

TodoItem.Title = TodoItemTitle;
TodoItem.Indicator = TodoItemIndicator;
