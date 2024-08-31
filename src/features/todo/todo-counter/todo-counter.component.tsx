import { useTodoListStore } from "@features/todo";

export const TodoCounter = () => {
  const remainingCount = useTodoListStore.getState().todoList.length;

  return (
    <div className="flex items-center justify-between px-4 py-2 text-muted-foreground">
      {remainingCount} item{remainingCount === 1 ? "" : "s"} left
    </div>
  );
};
