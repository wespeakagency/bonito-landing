'use client';

import { Button } from '@/components/ui/button';
import { ShoppingCart, BookOpen, Headphones, Globe } from 'lucide-react';
import { AnimatedBlock } from './animated-block';
import { useTranslation } from '@/context/language-context';

const channels = [
  { name: 'Amazon', icon: ShoppingCart, href: '#' },
  { name: 'Gandhi', icon: BookOpen, href: '#' },
  { name: 'Audible', icon: Headphones, href: '#' },
  { name: 'Sitio Oficial', icon: Globe, href: '#' },
];

export default function CtaSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-secondary text-foreground py-24 sm:py-32">
      <div className="container mx-auto px-4 text-center">
        <AnimatedBlock>
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-foreground">
            {t('cta.title')}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            {t('cta.subtitle')}
          </p>
        </AnimatedBlock>
        <AnimatedBlock delay={200}>
          <div className="flex flex-wrap justify-center gap-4">
            {channels.map((channel) => (
              <Button
                key={channel.name}
                variant="outline"
                size="lg"
                className="bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-transform duration-200 hover:scale-105 rounded-full"
                asChild
              >
                <a href={channel.href}>
                  <channel.icon className="mr-2 h-5 w-5" />
                  {channel.name}
                </a>
              </Button>
            ))}
          </div>
        </AnimatedBlock>
      </div>
    </section>
  );
}
