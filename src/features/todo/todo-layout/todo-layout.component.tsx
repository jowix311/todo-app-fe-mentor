import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type ChildrenClassNameProps = PropsWithChildren & {
  className?: string;
};

type TodoContainerProps = ChildrenClassNameProps;
const TodoContainer = ({ children, className }: TodoContainerProps) => {
  return (
    <section className={cn("relative z-20 px-8 lg:max-w-[1024px] m-auto", className)}>
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

const TodoListBlock = ({ children, className }: ChildrenClassNameProps) => {
  return (
    <div
      className={cn(
        "mt-8 rounded-lg border-[1px] border-gray-200 dark:border-0 dark:bg-blue-600",
        className,
      )}
    >
      {children}
    </div>
  );
};

const TodoListFooter = ({ children, className }: ChildrenClassNameProps) => {
  return (
    <div
      className={cn(
        "flex justify-between rounded-lg dark:bg-blue-600",
        className,
      )}
    >
      {children}
    </div>
  );
};

const TodoListFilter = ({ children, className }: ChildrenClassNameProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 rounded border-[1px] border-gray-200 p-4 dark:border-0 dark:bg-blue-600",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const TodoLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

TodoLayout.Container = TodoContainer;
TodoLayout.UpperSection = TodoContainerUpperSection;
TodoLayout.Header = TodoHeader;
TodoLayout.ListBlock = TodoListBlock;
TodoLayout.ListFooter = TodoListFooter;
TodoLayout.Filter = TodoListFilter;
