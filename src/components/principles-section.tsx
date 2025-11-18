'use client';
import type { ComponentType } from 'react';
import { useState } from 'react';
import type { LucideProps } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, HeartHandshake } from 'lucide-react';
import { EarIcon } from './icons';
import { AnimatedBlock } from './animated-block';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/context/language-context';

type Principle = {
  icon: ComponentType<LucideProps>;
  title: string;
  description: string;
};

export default function PrinciplesSection() {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const principles: Principle[] = [
    {
      icon: Eye,
      title: t('principles.clarity.title'),
      description: t('principles.clarity.description'),
    },
    {
      icon: EarIcon,
      title: t('principles.activeListening.title'),
      description: t('principles.activeListening.description'),
    },
    {
      icon: HeartHandshake,
      title: t('principles.mutualRespect.title'),
      description: t('principles.mutualRespect.description'),
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedBlock animationType='slide-in-up'>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-center mb-16 text-foreground">
            {t('principles.title')}
          </h2>
        </AnimatedBlock>
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {principles.map((principle, index) => (
             <AnimatedBlock key={principle.title} delay={150 * (index + 1)} animationType='zoom-in'>
              <div 
                onMouseEnter={() => setHoveredIndex(index)}
                className={cn(
                  "transition-all duration-300",
                  hoveredIndex !== null && hoveredIndex !== index ? 'blur-sm opacity-20' : 'blur-0 opacity-100',
                  hoveredIndex === index ? 'scale-105' : ''
                )}
              >
                <div className="flip-card rounded-lg">
                  <div className="flip-card-inner">
                    {/* Front of the card */}
                    <div className="flip-card-front">
                      <Card className="bg-secondary border-muted-foreground/20 w-full h-full flex flex-col items-center justify-center">
                        <CardHeader className="pt-8">
                          <CardTitle className="font-headline text-2xl font-semibold text-foreground text-center">{principle.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-center items-center pt-2">
                           <div className="bg-background rounded-lg p-4 border border-border mt-4">
                              <principle.icon className="h-10 w-10 text-foreground" />
                           </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Back of the card */}
                    <div className="flip-card-back">
                      <Card className="bg-secondary border-muted-foreground/20 w-full h-full flex items-center justify-center">
                        <CardContent className="p-6">
                          <CardDescription className="text-muted-foreground text-md text-center">
                            {principle.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
