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
import { useTranslation } from '@/context/language-context';

export default function AuthorVideosSection() {
  const { t } = useTranslation();
  const videoThumbnails = PlaceHolderImages.filter((img) =>
    img.id.startsWith('author-video')
  );

  return (
    <section className="py-24 sm:py-32 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <AnimatedBlock>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4 text-foreground">
            {t('authorVideos.title')}
          </h2>
          <p className="text-xl md:text-2xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
            {t('authorVideos.subtitle')}
          </p>
        </AnimatedBlock>
        <AnimatedBlock delay={200}>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {videoThumbnails.map((thumbnail, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-2">
                    <Card className="overflow-hidden group border-none rounded-2xl">
                      <CardContent className="relative flex aspect-video items-center justify-center p-0">
                        <Image
                          src={thumbnail.imageUrl}
                          alt={thumbnail.description}
                          width={1280}
                          height={720}
                          data-ai-hint={thumbnail.imageHint}
                          className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                          <PlayCircle className="h-20 w-20 text-white/70 group-hover:text-white transition-all duration-300 transform group-hover:scale-110" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex bg-background border-border text-foreground" />
            <CarouselNext className="hidden sm:flex bg-background border-border text-foreground" />
          </Carousel>
        </AnimatedBlock>
      </div>
    </section>
  );
}
