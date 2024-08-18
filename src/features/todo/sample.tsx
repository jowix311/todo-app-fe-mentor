
import { TodoList, getTodoList } from "./todo-list";

export default async function Sample() {
  const data = await getTodoList();

  return (
    <>
      <TodoList data={data} />
    </>
  );
}
