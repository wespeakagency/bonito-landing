'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimatedBlock } from './animated-block';
import { useTranslation } from '@/context/language-context';
import { cn } from '@/lib/utils';

export default function AuthorSection() {
  const { t } = useTranslation();
  const fullBioParagraphs = t('author.fullBio', { returnObjects: true }) as string[];
  const [isBioVisible, setIsBioVisible] = useState(false);

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            'transition-opacity duration-500',
            isBioVisible ? 'opacity-0' : 'opacity-100'
          )}
        >
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto">
            <AnimatedBlock animationType="slide-in-left">
              <Image
                src="https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/WhatsApp%20Image%202025-11-27%20at%2018.21.40.jpeg"
                alt="Roberto Luna, autor"
                width={400}
                height={500}
                className="rounded-lg object-cover w-full h-auto max-w-sm mx-auto aspect-[4/5]"
              />
            </AnimatedBlock>
            <AnimatedBlock animationType="slide-in-right" delay={200}>
              <div className="space-y-6 text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
                  {t('author.title')}
                </h2>
                <p className="text-xl md:text-2xl font-headline leading-tight text-foreground/80">
                  {t('author.shortBio')}
                </p>
                <Button
                  variant="link"
                  className="text-lg p-0 h-auto text-primary hover:text-primary/80"
                  onClick={() => setIsBioVisible(true)}
                >
                  {t('author.readMore')}
                </Button>
              </div>
            </AnimatedBlock>
          </div>
        </div>
      </div>

      {isBioVisible && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center animate-in fade-in-0">
          <div className="relative bg-background p-8 md:p-12 rounded-lg max-w-4xl w-full mx-4 shadow-2xl animate-in zoom-in-95">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              onClick={() => setIsBioVisible(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Cerrar</span>
            </Button>
            <h3 className="text-2xl md:text-3xl font-headline font-bold text-foreground mb-6">
              {t('author.fullBioTitle')}
            </h3>
            <ScrollArea className="max-h-[70vh] pr-6">
              <div className="text-muted-foreground text-base leading-relaxed md:columns-2 gap-8 space-y-4">
                {fullBioParagraphs.map((paragraph, index) => (
                  <p key={index} className="break-inside-avoid">{paragraph}</p>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </section>
  );
}
