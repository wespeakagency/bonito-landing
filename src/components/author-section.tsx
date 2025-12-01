'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimatedBlock } from './animated-block';
import { useTranslation } from '@/context/language-context';

export default function AuthorSection() {
  const { t } = useTranslation();
  const fullBioParagraphs = t('author.fullBio', { returnObjects: true }) as string[];

  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto">
          <AnimatedBlock animationType="slide-in-left">
            <Image
              src="https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/WhatsApp%20Image%202025-11-27%20at%2018.21.40.jpeg"
              alt="Roberto Luna, autor"
              width={500}
              height={600}
              className="rounded-lg object-cover w-full h-auto aspect-[4/5]"
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-lg p-0 h-auto text-primary hover:text-primary/80">
                    {t('author.readMore')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-3xl bg-background border-border">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-headline text-foreground">
                      {t('author.fullBioTitle')}
                    </DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="max-h-[70vh] pr-6">
                    <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
                      {fullBioParagraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  );
}
