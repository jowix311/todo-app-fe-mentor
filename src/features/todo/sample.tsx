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
        <TodoLayout.ListFooter>
          <TodoCounter />
          <TodoClearCompleted />
        </TodoLayout.ListFooter>
      </TodoLayout.ListBlock>
      <TodoLayout.Filter className="mt-4">
        <TodoFilter label="All" url="/" />
        <TodoFilter label="Active" url="/active" />
        <TodoFilter label="Completed" url="/completed" />
      </TodoLayout.Filter>
    </>
  );
}
