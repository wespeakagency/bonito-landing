'use client';

import Image from 'next/image';
import { AnimatedBlock } from './animated-block';
import { useLanguage } from '@/context/language-context';
import { IDEA_MANTRA_IMAGE_SRC } from '@/config/media';

export default function IdeaSection() {
  const { translations } = useLanguage();
  const ideas = translations.idea.paragraphs as string[];

  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto">
          <AnimatedBlock animationType="slide-in-left">
            <Image
              src={IDEA_MANTRA_IMAGE_SRC}
              alt={translations.idea.imageAlt}
              width={500}
              height={500}
              className="rounded-lg object-contain w-full h-auto invert"
            />
          </AnimatedBlock>
          <AnimatedBlock animationType="slide-in-right" delay={200}>
            <div className="space-y-6">
              {ideas.map((idea: string, index: number) => (
                <p
                  key={index}
                  className="text-xl md:text-2xl font-headline leading-tight text-foreground text-center md:text-left"
                >
                  {idea}
                </p>
              ))}
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  );
}
