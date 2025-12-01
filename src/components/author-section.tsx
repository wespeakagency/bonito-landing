'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AnimatedBlock } from './animated-block';
import { useTranslation } from '@/context/language-context';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export default function AuthorSection() {
  const { t } = useTranslation();
  const shortBio = t('author.shortBio');
  const fullBioParagraphs = t('author.fullBio', { returnObjects: true }) as string[];
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
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
                  {shortBio}
                </p>
                <Button
                  variant="link"
                  className="text-lg p-0 h-auto text-primary hover:text-primary/80"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? t('author.showLess') : t('author.readMore')}
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
                    {t('author.fullBioTitle')}
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
