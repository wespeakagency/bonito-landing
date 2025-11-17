'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle, ChevronDown } from 'lucide-react';
import { Typewriter } from './typewriter';
import { cn } from '@/lib/utils';

const phrases = [
  'Negociar es un arte.',
  'Practícalo con compasión.',
  'Un libro para transformar conversaciones difíciles en acuerdos mutuos.',
];

export default function HeroSection() {
  const [step, setStep] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const hasAnimated = useRef<boolean[]>([false, false, false]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const newStep = Math.min(Math.floor(scrollPosition / windowHeight), phrases.length - 1);
      setStep(newStep);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnimationComplete = () => {
    if (step < phrases.length - 1) {
      setShowScroll(true);
      hasAnimated.current[step] = true;
    }
  };
  
  const resetShowScroll = () => {
    setShowScroll(false);
  }

  return (
    <section className="relative h-[300vh] bg-black text-white">
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
          {step < 2 && (
            <div className="min-h-[150px]">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-headline leading-tight">
                <Typewriter
                  key={step}
                  text={phrases[step]}
                  speed={80}
                  onComplete={handleAnimationComplete}
                  onStart={resetShowScroll}
                  runOnce={hasAnimated.current[step]}
                />
              </h1>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in duration-1000 pt-10">
               <div className="min-h-[150px] flex items-center justify-center">
                <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
                  {phrases[2]}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                <Button size="lg" className="font-semibold rounded-full px-8 py-6 text-lg bg-white text-black hover:bg-white/90" asChild>
                  <a href="#">
                    Comprar ahora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="ghost" className="font-semibold rounded-full px-8 py-6 text-lg text-white hover:bg-white/10" asChild>
                  <a href="#">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Ver el trailer
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Scroll Down Indicator */}
        {showScroll && step < 2 && (
          <div className="absolute bottom-10 z-30 animate-in fade-in duration-500">
            <div className="scroll-down-indicator">
              <ChevronDown className="h-8 w-8 text-white/50" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
