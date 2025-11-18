'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, HeartHandshake } from 'lucide-react';
import { EarIcon } from './icons';
import { AnimatedBlock } from './animated-block';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/context/language-context';

export default function PrinciplesSection() {
  const { t } = useTranslation();

  const principles = [
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
    <section className="py-24 sm:py-32 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <AnimatedBlock animationType='slide-in-up'>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-center mb-16 text-foreground">
            {t('principles.title')}
          </h2>
        </AnimatedBlock>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto group">
          {principles.map((principle, index) => (
            <AnimatedBlock key={principle.title} delay={150 * (index + 1)} animationType='zoom-in'>
              <Card className={cn(
                "bg-secondary border-muted-foreground/20 text-center h-full flex flex-col transition-all duration-300 group-hover:blur-sm hover:!blur-none hover:scale-105 hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.1)] shadow-white/5"
              )}>
                <CardHeader className="pt-8">
                  <CardTitle className="font-headline text-xl font-semibold text-foreground">{principle.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between pt-2">
                  <CardDescription className="text-muted-foreground text-sm mb-6">
                    {principle.description}
                  </CardDescription>
                  <div className="flex justify-center items-end">
                    <div className="bg-background rounded-lg p-4 border border-border">
                        <principle.icon className="h-7 w-7 text-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
