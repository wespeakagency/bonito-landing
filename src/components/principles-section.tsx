'use client';
import type { ComponentType } from 'react';
import { useState } from 'react';
import type { LucideProps } from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Eye, HeartHandshake } from 'lucide-react';
import { EarIcon } from './icons';
import { AnimatedBlock } from './animated-block';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/language-context';

export default function PrinciplesSection() {
  const { translations } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const principles = [
    {
      icon: Eye,
      title: translations.principles.clarity.title,
      description: translations.principles.clarity.description,
    },
    {
      icon: EarIcon,
      title: translations.principles.activeListening.title,
      description: translations.principles.activeListening.description,
    },
    {
      icon: HeartHandshake,
      title: translations.principles.mutualRespect.title,
      description: translations.principles.mutualRespect.description,
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedBlock animationType='slide-in-up'>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-center mb-16 text-foreground">
            {translations.principles.title}
          </h2>
        </AnimatedBlock>
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {principles.map((principle, index) => (
             <AnimatedBlock 
                key={index} 
                delay={150 * (index + 1)} 
                animationType='zoom-in'
                onMouseEnter={() => setHoveredIndex(index)}
                className={cn(
                  "transition-all duration-300",
                  hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30 scale-95' : 'opacity-100 scale-100'
                )}
              >
              <Card className="bg-secondary border-none rounded-2xl text-center h-full flex flex-col pt-8">
                <CardContent className="flex flex-col items-center gap-6">
                    <div className="bg-primary/10 p-4 rounded-full">
                         <principle.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-2xl font-semibold text-foreground">
                        {principle.title}
                    </CardTitle>
                </CardContent>
                <CardContent className='pt-4 pb-8'>
                    <CardDescription className="text-muted-foreground text-md">
                        {principle.description}
                    </CardDescription>
                </CardContent>
              </Card>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
