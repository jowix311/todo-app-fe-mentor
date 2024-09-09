"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export const TodoFilter = ({
  label,
  url = "",
}: {
  label: string;
  url: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    router.push(`?status=${url}`);
  };

  return (
    <Button
      className={`bg-transparent font-medium hover:bg-transparent ${searchParams.get("status") === url ? "text-blue-800 dark:text-blue-200" : "text-muted-foreground"}`}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};
