'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Headphones } from 'lucide-react';
import { Typewriter } from './typewriter';
import { useTranslation } from '@/context/language-context';
import { cn } from '@/lib/utils';
import { PurchaseDialog } from './purchase-dialog';

export default function HeroSection() {
  const { t } = useTranslation();
  const phrases = t('hero.phrases', { returnObjects: true }) as string[];

  const [step, setStep] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <PurchaseDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <section className="relative bg-black text-white flex flex-col justify-center py-48 md:py-64 overflow-hidden">
        <div className="absolute inset-0 opacity-20 float">
          <Image
            src="https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/MANOS.png"
            alt="Symbolic hands background"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 text-center z-20 relative">
          <div className="min-h-[300px] md:min-h-[350px] flex flex-col items-center justify-center">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-headline leading-tight">
                  <Typewriter text={phrases[0]} onComplete={() => setStep(1)} runOnce />
              </h1>

              {step >= 1 && (
                   <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium font-headline text-white/80 mt-4 animate-in fade-in duration-1000">
                      <Typewriter text={phrases[1]} onComplete={() => setStep(2)} runOnce />
                  </h2>
              )}
              
              <div className={cn(
                "transition-opacity duration-1000",
                step >= 2 ? "opacity-100" : "opacity-0"
              )}>
                 <p className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-4xl mx-auto mt-24">
                    {phrases[2]}
                  </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                  <Button size="lg" className="font-semibold rounded-full px-8 py-6 text-lg bg-white text-black hover:bg-white/90" onClick={() => setIsDialogOpen(true)}>
                    {t('hero.buyButton')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="ghost" className="font-semibold rounded-full px-8 py-6 text-lg text-white hover:bg-white/10" asChild>
                    <a href="#audiolibro">
                      <Headphones className="mr-2 h-5 w-5" />
                      {t('audioPlayer.listenButton')}
                    </a>
                  </Button>
                </div>
              </div>
          </div>
        </div>
      </section>
    </>
  );
}
