'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle, ChevronDown } from 'lucide-react';
import { Typewriter } from './typewriter';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/context/language-context';

export default function HeroSection() {
  const { t } = useTranslation();
  const phrases = t('hero.phrases', { returnObjects: true }) as string[];

  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < phrases.length - 1) {
      const timer = setTimeout(() => {
        setStep(step + 1);
      }, 5000); // Wait 5 seconds before going to next step
      return () => clearTimeout(timer);
    }
  }, [step, phrases.length]);

  const handleAnimationComplete = () => {
    if (step < phrases.length - 1) {
      // The useEffect will handle moving to the next step.
    }
  };
  
  const resetShowScroll = () => {
    // No longer needed
  }

  return (
    <section className="relative h-screen bg-black text-white">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none opacity-20"
          poster="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1280&h=720&fit=crop"
        >
          <source src="https://cdn.pixabay.com/video/2021/09/16/87411-611352485_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 text-center z-20">
          <div className="min-h-[150px] flex items-center justify-center">
              {step < phrases.length - 1 ? (
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-headline leading-tight">
                  <Typewriter
                    key={`${t('hero.phrases')}-${step}`}
                    text={phrases[step]}
                    speed={80}
                    onComplete={handleAnimationComplete}
                    onStart={resetShowScroll}
                  />
                </h1>
              ) : (
                <div className="animate-in fade-in duration-1000">
                   <div className="min-h-[150px] flex items-center justify-center">
                    <p className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-4xl mx-auto">
                      {phrases[phrases.length - 1]}
                    </p>
                  </div>
    
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                    <Button size="lg" className="font-semibold rounded-full px-8 py-6 text-lg bg-white text-black hover:bg-white/90" asChild>
                      <a href="#">
                        {t('hero.buyButton')}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </a>
                    </Button>
                    <Button size="lg" variant="ghost" className="font-semibold rounded-full px-8 py-6 text-lg text-white hover:bg-white/10" asChild>
                      <a href="#">
                        <PlayCircle className="mr-2 h-5 w-5" />
                        {t('hero.trailerButton')}
                      </a>
                    </Button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
