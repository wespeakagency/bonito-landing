'use client';
import { useState, useEffect, useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Typewriter } from '@/components/typewriter';
import { useLanguage } from '@/context/language-context';
import { AnimatedBlock } from './animated-block';

export default function ExtractsSection() {
  const { translations } = useLanguage();
  const extracts = translations.extracts as string[];
  
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const plugin = useRef(
    Autoplay({ delay: 1000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      // Reset and play the autoplay plugin when a new slide is selected
      plugin.current.reset();
      plugin.current.play();
    };

    api.on('select', onSelect);
    // Stop autoplay initially, it will be started by the typewriter
    plugin.current.stop();


    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const handleTypewriterComplete = () => {
    // The onSelect handler will take care of playing the autoplay
    // We just need to trigger the next slide after a short delay
    setTimeout(() => {
        api?.scrollNext();
    }, 1000);
  };

  const handleTypewriterStart = () => {
    plugin.current.stop();
  };


  return (
    <section className="py-12 sm:py-16 bg-secondary overflow-hidden">
      <AnimatedBlock className="container mx-auto px-4" animationType='zoom-in'>
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full max-w-2xl mx-auto"
        >
          <CarouselContent>
            {extracts.map((extract: string, index: number) => (
              <CarouselItem key={index}>
                <div className="text-center h-48 flex items-center justify-center">
                  <h3 className="text-2xl md:text-3xl font-headline font-medium text-foreground leading-tight">
                    {current === index ? (
                      <Typewriter 
                        text={`"${extract}"`} 
                        onComplete={handleTypewriterComplete}
                        onStart={handleTypewriterStart}
                      />
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
      </AnimatedBlock>
    </section>
  );
}
