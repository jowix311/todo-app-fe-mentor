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
import { useState } from "react";
import { saveTodo, addTodo } from "@features/todo";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  title: z.string(),
});

export const TodoForm = () => {
  const [isLoading, setIsLoading] = useState(false);
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
            "pointer-events-none opacity-85": isLoading,
          })}
        >
          <div className="flex items-center gap-3 rounded-lg border-blue-600 bg-blue-600 p-3">
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
                      className="border-blue-600 bg-blue-600 text-blue-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};
