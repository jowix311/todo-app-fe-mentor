import {
  useTodoListStore,
  TodoList,
  getTodoList,
  TodoLayout,
  TodoCounter,
  TodoClearCompleted,
} from "@features/todo";

export default async function Sample() {
  const data = await getTodoList();

  // We can use this to derive state
  useTodoListStore.setState({ todoList: data });

  return (
    <>
      <TodoLayout.ListBlock>
        <TodoList data={data} />
        <div className="flex justify-between bg-blue-600">
          <TodoCounter />
          <TodoClearCompleted />
        </div>
      </TodoLayout.ListBlock>
    </>
  );
}
