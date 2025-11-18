'use client';

import { AnimatedBlock } from './animated-block';
import { useTranslation } from '@/context/language-context';

export default function IdeaSection() {
  const { t } = useTranslation();
  const ideas = t('idea.paragraphs', { returnObjects: true }) as string[];

  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-12">
          {ideas.map((idea: string, index: number) => (
            <AnimatedBlock key={index} delay={index * 200} animationType="zoom-in">
              <p className="text-xl md:text-2xl text-center font-headline leading-tight text-foreground">
                {idea}
              </p>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
