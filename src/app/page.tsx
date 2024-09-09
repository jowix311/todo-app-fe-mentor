import { Hero } from "@/features/banner";
import { TodoForm } from "@/features/todo";
// import Sample from "@/features/todo/sample"; // keeping for reference
import { PropsWithChildren } from "react";
import { ThemeSwitcher } from "@/features/theme";
import {
  useTodoListStore,
  TodoList,
  getTodoList,
  TodoLayout,
  TodoCounter,
  TodoClearCompleted,
  TodoFilter,
} from "@/features/todo";

const MainContainer = ({ children }: PropsWithChildren) => {
  return <section className="relative">{children}</section>;
};

export default async function Home() {
  const data = await getTodoList();

  return (
    <main className="min-h-screen dark:bg-blue-700">
      <MainContainer>
        <Hero className="absolute left-0 right-0" />
        <TodoLayout>
          <TodoLayout.Container className="pt-10">
            <TodoLayout.UpperSection className="mb-6">
              <TodoLayout.Header>Todo</TodoLayout.Header>
              <ThemeSwitcher />
            </TodoLayout.UpperSection>
            <div>
              <TodoForm />
              <TodoLayout.ListBlock>
                <TodoList data={data} />
                <TodoLayout.ListFooter className="items-center">
                  <TodoCounter />
                  <TodoLayout.Filter className="hidden gap-2 border-0 lg:flex">
                    <TodoFilter label="All" url="" />
                    <TodoFilter label="Active" url="active" />
                    <TodoFilter label="Completed" url="completed" />
                  </TodoLayout.Filter>
                  <TodoClearCompleted />
                </TodoLayout.ListFooter>
              </TodoLayout.ListBlock>
              <TodoLayout.Filter className="mt-4 lg:hidden">
                <TodoFilter label="All" url="" />
                <TodoFilter label="Active" url="active" />
                <TodoFilter label="Completed" url="completed" />
              </TodoLayout.Filter>
            </div>
          </TodoLayout.Container>
        </TodoLayout>
      </MainContainer>
    </main>
  );
}
