"use client";

import { useEffect } from 'react';
import { create } from 'zustand'

interface TodoStore {
  title: string
  setTitle: (title: string) => void
}

export const useTodoStore = create<TodoStore>((set) => ({
  title: '',
  setTitle: (title) => set({ title }),
}))

type Props = {
  children: React.ReactNode;
  prop: {
    title: string;
  };
};

export const TodoItem = ({ children, prop }: Props) => {
  const { setTitle } = useTodoStore()

  useEffect(() => {
    setTitle(prop.title)
  }, [prop.title, setTitle])

  return <>{children}</>;
};

const TodoItemIndicator = () => {
  return (
    <div className="h-8 w-8 rounded-full border-[1px] border-blue-300"></div>
  );
};

const TodoItemTitle = () => {
  const title = useTodoStore( state => state.title) 
  return <p className="text-white">{title}</p>

};

TodoItem.Title = TodoItemTitle;
TodoItem.Indicator = TodoItemIndicator;
