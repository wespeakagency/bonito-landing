'use client';
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Typewriter } from '@/components/typewriter';

const extracts = [
  "La claridad no es un punto de partida, es un resultado. Se construye.",
  "Escuchar para comprender, no para responder. Ahí está la clave.",
  "Negociar bonito es cuidar la relación sin traicionar tu intención.",
];

export default function ExtractsSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <section className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
          }}
          className="w-full max-w-2xl mx-auto"
        >
          <CarouselContent>
            {extracts.map((extract, index) => (
              <CarouselItem key={index}>
                <div className="text-center h-48 flex items-center justify-center">
                  <h3 className="text-2xl md:text-3xl font-headline font-medium text-foreground leading-tight">
                    {current === index ? (
                      <Typewriter text={`"${extract}"`} />
                    ) : (
                      `"${extract}"`
                    )}
                  </h3>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex bg-background border-border text-foreground" />
          <CarouselNext className="hidden sm:flex bg-background border-border text-foreground" />
        </Carousel>
      </div>
    </section>
  );
}
