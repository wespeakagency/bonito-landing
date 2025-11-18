'use client';

import Image from 'next/image';
import { AnimatedBlock } from './animated-block';
import { useTranslation } from '@/context/language-context';

export default function IdeaSection() {
  const { t } = useTranslation();
  const ideas = t('idea.paragraphs', { returnObjects: true }) as string[];

  return (
    <section className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 opacity-10 float">
        <Image
          src="https://i.ibb.co/xK55mxcM/proto1.png"
          alt="Symbolic hands background"
          fill
          className="object-contain"
        />
      </div>
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
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
