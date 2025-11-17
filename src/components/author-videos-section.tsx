'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { PlayCircle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimatedBlock } from './animated-block';

export default function AuthorVideosSection() {
  const videoThumbnails = PlaceHolderImages.filter((img) =>
    img.id.startsWith('author-video')
  );

  return (
    <section className="py-20 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedBlock>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-4">
            En voz de Roberto
          </h2>
          <p className="text-lg md:text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Clips del autor explicando ideas clave del libro.
          </p>
        </AnimatedBlock>
        <AnimatedBlock delay={200}>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {videoThumbnails.map((thumbnail, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden group">
                      <CardContent className="relative flex aspect-video items-center justify-center p-0">
                        <Image
                          src={thumbnail.imageUrl}
                          alt={thumbnail.description}
                          width={1280}
                          height={720}
                          data-ai-hint={thumbnail.imageHint}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white transition-colors" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </AnimatedBlock>
      </div>
    </section>
  );
}
