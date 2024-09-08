"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { use, useState } from "react";
import { saveTodo, addTodo, useTodoListStore } from "@features/todo";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  title: z.string(),
});

export const TodoForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const todoCount = useTodoListStore((state) => state.todoList).length;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const response = await saveTodo(data);

    if (response !== false) {
      addTodo(response);
    }

    setIsLoading(false);

    form.reset();
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("space-y-8", {
            "pointer-events-none opacity-85": isLoading || todoCount === 10,
          })}
        >
          <div className="flex items-center gap-3 rounded-lg border-blue-600 bg-white p-3 dark:bg-blue-600">
            <div className="h-8 w-8 rounded-full border-[1px] border-blue-300"></div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Add a Todo"
                      {...field}
                      className="border-0 bg-white text-blue-300 dark:border-blue-600 dark:bg-blue-600"
                      disabled={todoCount === 10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      {todoCount >= 10 && (
        <p className="text-sm text-red-500">
          You can only add 10 items for now 😀
        </p>
      )}
    </div>
  );
};
