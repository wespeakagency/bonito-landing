'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AnimatedBlock } from './animated-block';
import { useLanguage } from '@/context/language-context';
import { AnimatePresence, motion } from 'framer-motion';
import { AUTHOR_IMAGE_SRCS } from '@/config/media';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';
import { trackAuthorBioExpand } from '@/features/analytics/track';

export default function AuthorSection() {
  const { translations, locale } = useLanguage();
  const fullBioParagraphs = translations.author.fullBio as string[];
  const [isExpanded, setIsExpanded] = useState(false);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true }));

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <AnimatedBlock animationType="slide-in-left">
              <Carousel
                setApi={setApi}
                plugins={[plugin.current]}
                opts={{
                  loop: true,
                  align: 'center',
                }}
                className="w-full max-w-md mx-auto"
              >
                <CarouselContent className="-ml-4">
                  {AUTHOR_IMAGE_SRCS.map((src, index) => (
                    <CarouselItem key={index} className="pl-4 basis-3/4">
                      <div className="p-1">
                        <div
                          className={cn(
                            'aspect-[4/5] relative transition-transform duration-300 ease-out',
                            current === index ? 'scale-100' : 'scale-90 opacity-60'
                          )}
                        >
                          <Image
                            src={src}
                            alt={`${translations.author.imageAlt} ${index + 1}`}
                            fill
                            className="rounded-lg object-cover"
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </AnimatedBlock>
            <AnimatedBlock animationType="slide-in-right" delay={200}>
              <div className="space-y-6 text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
                  {translations.author.title}
                </h2>
                <p className="text-xl md:text-2xl font-headline leading-tight text-foreground/80">
                  {translations.author.shortBio}
                </p>
                <Button
                  variant="link"
                  className="text-lg p-0 h-auto text-primary hover:text-primary/80"
                  onClick={() => {
                    if (!isExpanded) {
                      trackAuthorBioExpand(locale);
                    }
                    setIsExpanded(!isExpanded);
                  }}
                >
                  {isExpanded ? translations.author.showLess : translations.author.readMore}
                </Button>
              </div>
            </AnimatedBlock>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-16">
                  <h3 className="text-2xl md:text-3xl font-headline font-bold text-foreground mb-6 text-center">
                    {translations.author.fullBioTitle}
                  </h3>
                  <div className="text-muted-foreground text-base leading-relaxed md:columns-2 gap-8 space-y-4">
                    {fullBioParagraphs.map((paragraph, index) => (
                      <p key={index} className="break-inside-avoid">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
