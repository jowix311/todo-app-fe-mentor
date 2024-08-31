"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createStore } from "zustand";
import IconCheck from "@public/icon-check.svg";
import IconCross from "@public/icon-cross.svg";
import Image from "next/image";
import { deleteTodo, updateTodoStatus, deleteTodoByIds } from "@/features/todo";
import { cn } from "@/lib/utils";

// 1. Creating the Zustand store
// Official Docs: https://github.com/pmndrs/zustand/blob/main/docs/guides/initialize-state-with-props.md
interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  isLoading?: boolean;
}
interface TodoItemState extends TodoItemProps {
  setTitle: (title: string) => void;
  toggleCompleted: () => void;
  toggleIsLoading: (isLoading: boolean) => void;
}

type TodoItemStore = ReturnType<typeof createTodoItemStore>;

const createTodoItemStore = (initProps?: Partial<TodoItemProps>) => {
  const DEFAULT_STATE = {
    id: "",
    title: "",
    completed: false,
    isLoading: false,
  };
  return createStore<TodoItemState>((set) => ({
    ...DEFAULT_STATE,
    ...initProps,
    setTitle: (title) => set({ title }),
    toggleCompleted: () => set((state) => ({ completed: !state.completed })),
    toggleIsLoading: (isLoading: boolean) => set({ isLoading }),
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
  // Keeping this code for manually assigning props to the store. Below overrides completed and title from the destructured props.
  // return (
  //   <TodoItemProvider {...prop} title={prop.title} completed={true}>
  //     {children}
  //   </TodoItemProvider>
  // );
  return <TodoItemProvider {...prop}>{children}</TodoItemProvider>;
};

const TodoItemIndicator = () => {
  const todoItemContext = useTodoItemContext();
  const todoId = useTodoItemContext().getState().id;
  const [isCompleted, setIsCompleted] = useState(
    useTodoItemContext().getState().completed,
  );

  const handleClick = async () => {
    todoItemContext.setState({
      isLoading: true,
    });

    const response = await updateTodoStatus(todoId, !isCompleted);

    // Update local state
    setIsCompleted(!isCompleted);
    // Update store state
    todoItemContext.setState({
      completed: !isCompleted,
    });
    todoItemContext.setState({
      isLoading: false,
    });
  };

  return (
    <Button
      className={cn(
        "group relative flex h-8 w-8 items-center justify-center rounded-full border-[1px] border-blue-300 from-sky-200 via-violet-300 to-violet-700 p-[1px]",
        {
          "bg-gradient-to-br": isCompleted,
          "hover:bg-gradient-to-br": !isCompleted,
        },
      )}
      onClick={handleClick}
    >
      {isCompleted && (
        <Image
          className=""
          src={IconCheck}
          alt="icon check"
          width={16}
          height={16}
        />
      )}

      {!isCompleted && (
        <div className="h-full w-full rounded-full bg-blue-600"></div>
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
      className={cn("text-white", {
        "text-muted-foreground line-through": isCompleted,
      })}
    >
      {title}
    </p>
  );
};
const TodoDelete = () => {
  const toggleIsLoading = useTodoItemContext().getState().toggleIsLoading;


  const id = useTodoItemContext().getState().id;
  const handleDelete = async () => {
    toggleIsLoading(true);

    const deleteResponse = await deleteTodo([id]);

    deleteTodoByIds([id]);

    toggleIsLoading(false);
  };

  return (
    <Button
      className="bg-transparent p-0 text-white hover:bg-transparent"
      onClick={handleDelete}
    >
      <Image src={IconCross} alt="icon cross" width={16} height={16} />
    </Button>
  );
};

const TodoItemBlock = ({
  children,
  className,
}: PropsWithChildren & { className?: string }) => {
  const [isLoading, setIsLoading] = useState(
    useTodoItemContext().getState().isLoading,
  );

  const todoItemContext = useTodoItemContext();

  useEffect(() => {
    const unsubscribe = todoItemContext.subscribe((state) =>
      setIsLoading(state.isLoading),
    );

    return unsubscribe;
  }, [todoItemContext]);
  return (
    <div
      className={cn(
        "group flex items-center gap-3 border-b-[1px] border-b-muted-foreground p-3",
        {
          "pointer-events-none opacity-50": isLoading,
        },
      )}
    >
      {children}
    </div>
  );
};

TodoItem.Title = TodoItemTitle;
TodoItem.Indicator = TodoItemIndicator;
TodoItem.Delete = TodoDelete;
TodoItem.Block = TodoItemBlock;
