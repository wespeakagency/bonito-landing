'use client';

import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { AnimatedBlock } from './animated-block';
import { useTranslation } from '@/context/language-context';

export default function CtaSection() {
  const { t } = useTranslation();
  const purchaseLink =
    'https://thyrsoeditorial.com/producto/negociando-bonito-de-roberto-luna/';

  return (
    <section className="bg-secondary text-foreground py-24 sm:py-32">
      <div className="container mx-auto px-4 text-center">
        <AnimatedBlock animationType="zoom-in">
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-foreground">
            {t('cta.title')}
          </h2>
        </AnimatedBlock>
        <AnimatedBlock animationType="zoom-in" delay={150}>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            {t('cta.subtitle')}
          </p>
        </AnimatedBlock>
        <AnimatedBlock delay={300} animationType="slide-in-up">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-200 hover:scale-105 rounded-full px-8 py-6 text-lg"
            asChild
          >
            <a href={purchaseLink}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              {t('hero.buyButton')}
            </a>
          </Button>
        </AnimatedBlock>
      </div>
    </section>
  );
}
