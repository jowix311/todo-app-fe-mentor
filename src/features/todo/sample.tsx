import {
  useTodoListStore,
  TodoList,
  getTodoList,
  TodoLayout,
  TodoCounter,
  TodoClearCompleted,
  TodoFilter,
} from "@features/todo";

export default async function Sample() {
  const data = await getTodoList();

  return (
    <>
      <TodoLayout.ListBlock>
        <TodoList data={data} />
        <TodoLayout.ListFooter className="items-center">
          <TodoCounter />
          <TodoLayout.Filter className="hidden gap-2 border-0 lg:flex">
            <TodoFilter label="All" url="/" />
            <TodoFilter label="Active" url="/active" />
            <TodoFilter label="Completed" url="/completed" />
          </TodoLayout.Filter>
          <TodoClearCompleted />
        </TodoLayout.ListFooter>
      </TodoLayout.ListBlock>
      <TodoLayout.Filter className="mt-4 lg:hidden">
        <TodoFilter label="All" url="/" />
        <TodoFilter label="Active" url="/active" />
        <TodoFilter label="Completed" url="/completed" />
      </TodoLayout.Filter>
    </>
  );
}
