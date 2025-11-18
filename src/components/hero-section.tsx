'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Typewriter } from './typewriter';
import { useTranslation } from '@/context/language-context';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  const { t } = useTranslation();
  const phrases = t('hero.phrases', { returnObjects: true }) as string[];

  const [step, setStep] = useState(0);
  const [showScrollContent, setShowScrollContent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollContent(true);
      } else {
        setShowScrollContent(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative bg-black text-white h-screen flex flex-col justify-center">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none opacity-20 object-cover"
          poster="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1280&h=720&fit=crop"
        >
          <source src="https://cdn.pixabay.com/video/2021/09/16/87411-611352485_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center z-20 relative">
        <div className="min-h-[300px] md:min-h-[350px] flex flex-col items-center justify-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-headline leading-tight whitespace-nowrap">
                <Typewriter text={phrases[0]} onComplete={() => setStep(1)} runOnce />
            </h1>

            {step >= 1 && (
                 <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium font-headline text-white/80 mt-4 animate-in fade-in duration-1000">
                    <Typewriter text={phrases[1]} onComplete={() => setStep(2)} runOnce />
                </h2>
            )}
            
            <div className={cn(
              "transition-opacity duration-1000",
              showScrollContent ? "opacity-100" : "opacity-0"
            )}>
               <p className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-4xl mx-auto mt-16">
                  {phrases[2]}
                </p>

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
        </div>
      </div>
    </section>
  );
}
