import Image from "next/image";
import HeroMobileBannerDark from "@public/bg-desktop-dark.jpg";

<section className="h-[200px] bg-blue-600">
  <p className="text-white">test!</p>
  <p className="text-primary-brightBlue">test</p>
</section>;

export const Hero = () => {
  return (
    <section className="h-[200px] bg-red-500">
      <div className="relative h-[12.5rem]">
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
