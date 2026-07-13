'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { AnimatedBlock } from './animated-block';
import { useLanguage } from '@/context/language-context';
import { useTrackSectionView } from '@/features/analytics/hooks/use-track-section-view';
import { trackPurchaseDialogOpen } from '@/features/analytics/track';
import { PurchaseDialog } from '@/features/purchase/components/purchase-dialog';

export default function CtaSection() {
  const { translations, locale } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const sectionRef = useTrackSectionView<HTMLElement>('purchase_cta', locale);

  const openPurchaseDialog = () => {
    trackPurchaseDialogOpen('cta_buy', locale);
    setIsDialogOpen(true);
  };

  return (
    <>
      <PurchaseDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} origin="cta_buy" />
      <section ref={sectionRef} className="bg-secondary text-foreground py-24 sm:py-32">
        <div className="container mx-auto px-4 text-center">
          <AnimatedBlock animationType="zoom-in">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-foreground">
              {translations.cta.title}
            </h2>
          </AnimatedBlock>
          <AnimatedBlock animationType="zoom-in" delay={150}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              {translations.cta.subtitle}
            </p>
          </AnimatedBlock>
          <AnimatedBlock delay={300} animationType="slide-in-up">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-200 hover:scale-105 rounded-full px-8 py-6 text-lg"
              onClick={openPurchaseDialog}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {translations.hero.buyButton}
            </Button>
          </AnimatedBlock>
        </div>
      </section>
    </>
  );
}
