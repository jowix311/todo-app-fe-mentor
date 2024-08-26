import Image from "next/image";
import HeroMobileBannerDark from "@public/bg-desktop-dark.jpg";
import { cn } from "@/lib/utils";

export const Hero = ({ className }: { className?: string }) => {
  return (
    <section className={cn("", className)}>
      <div className="relative h-[18.75rem]">
        <Image
          src={HeroMobileBannerDark}
          alt="Hero Banner"
          fill
          sizes="100%"
          priority={true}
        />
      </div>
    </section>
  );
};
