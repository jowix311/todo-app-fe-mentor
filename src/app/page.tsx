// import TodoList from "@/component/todo/todo";
import { Hero } from "@/features/banner";
import prisma from "@lib/prisma";
import Image from "next/image";
import IconSun from "@public/icon-sun.svg";
import { TodoForm } from "@/features/todo";
import Sample from "@/features/todo/sample";
import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type ChildrenClassNameProps = PropsWithChildren & {
  className?: string;
};

// TODO Maybe separate this component
type TodoContainerProps = ChildrenClassNameProps;
const TodoContainer = ({ children, className }: TodoContainerProps) => {
  return (
    <section className={cn("relative z-20 px-8", className)}>
      {children}
    </section>
  );
};

type TodoContainerUpperSectionProps = ChildrenClassNameProps;
const TodoContainerUpperSection = ({
  children,
  className,
}: TodoContainerUpperSectionProps) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {children}
    </div>
  );
};

type TodoHeaderProps = ChildrenClassNameProps;
const TodoHeader = ({ children, className }: TodoHeaderProps) => {
  return (
    <h1
      className={cn(
        "text-2xl uppercase tracking-[0.5rem] text-white lg:text-5xl",
        className,
      )}
    >
      {children}
    </h1>
  );
};

const MainContainer = ({ children }: PropsWithChildren) => {
  return <section className="relative">{children}</section>;
};

export default async function Home() {
  // Optimized call as mention on NextJS docs
  // TODO clean up code
  // const [activeTodo, completedTodo] = await Promise.all([
  //   prisma.todo.findMany({ where: { completed: false } }),
  //   prisma.todo.findMany({ where: { completed: true } }),
  // ]);

  // const data = [{ title: "Sleep 8 hours" }, { title: "Drink water" }];

  return (
    <main className="min-h-screen">
      <MainContainer>
        <Hero className="absolute left-0 right-0" />
        <TodoContainer className="pt-10">
          <TodoContainerUpperSection className="mb-8">
            <TodoHeader>Todo</TodoHeader>
            <Image src={IconSun} alt="icon sun" width={18} height={18} />
          </TodoContainerUpperSection>
          <div>
            <TodoForm />
            {/* TODO create more appropriate meaning */}
            <Sample />
          </div>
        </TodoContainer>
      </MainContainer>
    </main>
  );
}
