"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const TodoFilter = ({
  label,
  url = "",
}: {
  label: string;
  url: string;
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={url}
      className={`font-medium text-muted-foreground ${pathname === url ? "text-blue-200" : ""}`}
    >
      {label}
    </Link>
  );
};
