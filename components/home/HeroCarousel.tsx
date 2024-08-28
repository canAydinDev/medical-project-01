import hero1 from "@/public/images/hero1.jpg";

import hero3 from "@/public/images/hero3.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";

const carouselImages = [hero1, hero3,];
const heroText = [ "hemen baslayin","hep yaninizdayiz"];
const heroContent = [
  "Tamamen ucretsiz modellerimizi kullanmaya hemen baslayin Tanilarinizi modellerimizle destekleyin",
  "Tum tani surecinde bizden destek alabilirsiniz",
];

function HeroCarousel() {
  return (
    <div className="hidden lg:block">
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {carouselImages.map((image, index) => {
            return (
              <CarouselItem key={index} className="relative">
                <div className="absolute top-10 left-10 z-10 text-color pt-12 grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                  <div className="text-center">
                    <h3 className="max-w-2xl font-bold text-2xl tracking-tight sm:text-4xl capitalize text-center text-gray-800">
                      {heroText[index]}
                    </h3>
                    <p className="mt-2 max-w-xl text-lg leading-8 text-muted-foreground text-gray-100">
                      {heroContent[index]}
                    </p>
                    <div className="mt-8">
                      <Button>Popüler Modeller</Button>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gray-700 opacity-40 rounded-md z--10"></div>
                <Image
                  src={image}
                  alt="hero"
                  className="w-full h-[24rem] rounded-md object-cover"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default HeroCarousel;
