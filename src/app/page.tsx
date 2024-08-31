import { Hero } from "@/features/banner";
import Image from "next/image";
import IconSun from "@public/icon-sun.svg";
import { TodoForm } from "@/features/todo";
import Sample from "@/features/todo/sample";
import { PropsWithChildren } from "react";
import { TodoLayout } from "@/features/todo/todo-layout/todo-layout.component";

const MainContainer = ({ children }: PropsWithChildren) => {
  return <section className="relative">{children}</section>;
};

export default async function Home() {
  return (
    <main className="min-h-screen">
      <MainContainer>
        <Hero className="absolute left-0 right-0" />
        <TodoLayout>
          <TodoLayout.Container className="pt-10">
            <TodoLayout.UpperSection className="mb-6">
              <TodoLayout.Header>Todo</TodoLayout.Header>
              <Image src={IconSun} alt="icon sun" width={18} height={18} />
            </TodoLayout.UpperSection>
            <div>
              <TodoForm />
              {/* TODO create more appropriate meaning */}
              <Sample />
            </div>
          </TodoLayout.Container>
        </TodoLayout>
      </MainContainer>
    </main>
  );
}
