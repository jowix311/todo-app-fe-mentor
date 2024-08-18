"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createStore } from "zustand";
import IconCheck from "@public/icon-check.svg";
import IconCross from "@public/icon-cross.svg";
import Image from "next/image";
import { deleteTodo } from "@/features/todo/todo.actions";
import { useRouter } from "next/navigation";

// 1. Creating the Zustand store
// Official Docs: https://github.com/pmndrs/zustand/blob/main/docs/guides/initialize-state-with-props.md
interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
}
interface TodoItemState extends TodoItemProps {
  setTitle: (title: string) => void;
  toggleCompleted: () => void;
}

type TodoItemStore = ReturnType<typeof createTodoItemStore>;

const createTodoItemStore = (initProps?: Partial<TodoItemProps>) => {
  const DEFAULT_STATE = {
    id: "",
    title: "",
    completed: false,
  };
  return createStore<TodoItemState>((set) => ({
    ...DEFAULT_STATE,
    ...initProps,
    setTitle: (title) => set({ title }),
    toggleCompleted: () => set((state) => ({ completed: !state.completed })),
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
  prop: TodoItemProps;
};

export const TodoItem = ({ children, prop }: Props) => {
  // return <TodoItemProvider {...prop}>{children}</TodoItemProvider>; // Keeping this code for reference purposes.
  return (
    <TodoItemProvider {...prop} title={prop.title} completed={true}>
      {children}
    </TodoItemProvider>
  );
};

const TodoItemIndicator = () => {
  const toggleCompleted = useTodoItemContext().getState().toggleCompleted;
  const isCompleted = useTodoItemContext().getState().completed;

  return (
    <Button
      className={clsx(
        "flex h-8 w-8 items-center justify-center rounded-full border-[1px] border-blue-300",
        {
          "bg-gradient-to-br from-blue-200 via-violet-400 to-violet-700":
            isCompleted,
        },
      )}
      onClick={toggleCompleted}
    >
      {isCompleted && (
        <Image
          className="flex"
          src={IconCheck}
          alt="icon check"
          width={16}
          height={16}
        />
      )}
    </Button>
  );
};

const TodoItemTitle = () => {
  const title = useTodoItemContext().getState().title;
  const [isCompleted, setIsCompleted] = useState(
    useTodoItemContext().getState().completed,
  );

  const todoItemContext = useTodoItemContext();

  useEffect(() => {
    const unSubscribe = todoItemContext.subscribe((state, prevState) => {
      if (state.completed !== prevState.completed) {
        setIsCompleted(state.completed);
      }
    });

    return unSubscribe;
  }, [todoItemContext, isCompleted]);

  return (
    <p
      className={clsx("text-white", {
        "line-through": isCompleted,
      })}
    >
      {title}
    </p>
  );
};

const TodoDelete = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // TODO: add delete logic
  const id = useTodoItemContext().getState().id;
  const handleDelete = async () => {
    console.log(id);
    setIsLoading(true);
    const deleteResponse = await deleteTodo(id);

    // TODO: update styling or handle error
    setIsLoading(false);
    router.refresh();
  };

  return (
    <Button className="text-white" variant="destructive" onClick={handleDelete}>
      <Image src={IconCross} alt="icon cross" width={16} height={16} />
    </Button>
  );
};

TodoItem.Title = TodoItemTitle;
TodoItem.Indicator = TodoItemIndicator;
TodoItem.Delete = TodoDelete;
