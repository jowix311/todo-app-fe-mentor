"use client";

import Image from "next/image";
import HeroMobileBannerDark from "@public/bg-mobile-dark.jpg";
import HeroMobileBannerLight from "@public/bg-mobile-light.jpg";
import HeroDesktopBannerDark from "@public/bg-desktop-dark.jpg";
import HeroDesktopBannerLight from "@public/bg-desktop-light.jpg";

import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { useTheme } from "next-themes";

type HeroProps = PropsWithChildren & {
  className?: string;
};

export const Hero = ({ children, className }: HeroProps) => {
  const { theme } = useTheme();

  return (
    <section className={cn("", className)}>
      <div className="relative h-[18.75rem]">
        {theme === "dark" ? (
          <>
            <Image
              src={HeroMobileBannerDark}
              alt="Hero Banner"
              fill
              sizes="100%"
              priority={true}
              className="lg:hidden"
            />
            <Image
              src={HeroDesktopBannerDark}
              alt="Hero Banner"
              fill
              sizes="100%"
              className="hidden lg:block"
            />
          </>
        ) : (
          <>
            <Image
              src={HeroMobileBannerLight}
              alt="Hero Banner"
              fill
              sizes="100%"
              className="lg:hidden"
            />
            <Image
              src={HeroDesktopBannerLight}
              alt="Hero Banner"
              fill
              sizes="100%"
              className="hidden lg:block"
            />
          </>
        )}
      </div>
    </section>
  );
};
