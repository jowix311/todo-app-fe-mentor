"use client";

import Image from "next/image";
import IconSun from "@public/icon-sun.svg";
import IconMoon from "@public/icon-moon.svg";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const ICON_SIZE = 18;

// Followed ShadCN guide
export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";
  const oppositeTheme = isDark ? "light" : "dark";
  const iconSource = isDark ? IconSun : IconMoon;

  return (
    <>
      <Button
        className="bg-transparent hover:bg-transparent"
        onClick={() => setTheme(oppositeTheme)}
        aria-label={`Switch to ${oppositeTheme} theme`}
      >
        <Image
          src={iconSource}
          alt="`${oppositeTheme} theme icon`"
          width={ICON_SIZE}
          height={ICON_SIZE}
        />
      </Button>
    </>
  );
};
