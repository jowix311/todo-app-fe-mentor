export const TodoItem = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const TodoItemIndicator = () => {
  return (
    <div className="h-8 w-8 rounded-full border-[1px] border-blue-300"></div>
  );
};

const TodoItemTitle = () => {
  return <p className="text-white">Get 8 hours of sleep everyday.</p>;
};

TodoItem.Title = TodoItemTitle;
TodoItem.Indicator = TodoItemIndicator;
