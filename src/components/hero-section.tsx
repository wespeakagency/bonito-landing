'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Headphones, PlayCircle } from 'lucide-react';
import { Typewriter } from './typewriter';
import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';
import {
  HERO_BACKGROUND_IMAGE_SRC,
  HERO_BUY_ICON_SRC,
  HERO_INTRO_VIDEO_SRC,
  HERO_SPOTIFY_ICON_SRC,
} from '@/config/media';
import { SPOTIFY_SHOW_LINKS } from '@/config/external-links';
import { PurchaseDialog } from '@/features/purchase/components/purchase-dialog';
import { VideoPlayerDialog } from './video-player-dialog';

export default function HeroSection() {
  const { translations, locale } = useLanguage();
  const phrases = translations.hero.phrases as string[];

  const [step, setStep] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const spotifyLink = SPOTIFY_SHOW_LINKS[locale];

  return (
    <>
      <PurchaseDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <VideoPlayerDialog isOpen={isVideoOpen} onOpenChange={setIsVideoOpen} videoSrc={HERO_INTRO_VIDEO_SRC} />
      <section className="relative bg-black text-white flex flex-col justify-center py-48 md:py-64 overflow-hidden">
        <div className="absolute inset-0 opacity-20 float">
          <Image
            src={HERO_BACKGROUND_IMAGE_SRC}
            alt={translations.hero.backgroundAlt}
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute top-24 md:top-36 inset-x-0 z-30 flex flex-col md:flex-row items-center justify-center gap-4 md:justify-between max-w-xs sm:max-w-sm md:max-w-lg mx-auto">
          {spotifyLink && (
            <a
              href="#spotify"
              className="flex float items-center gap-3 bg-background/50 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 shadow-lg hover:scale-105 hover:bg-background/70 transition-all"
            >
              <Image src={HERO_SPOTIFY_ICON_SRC} alt={translations.hero.spotifyBubble} width={24} height={24} className="h-6 w-6" />
              <span className="font-medium text-sm text-white">{translations.hero.spotifyBubble}</span>
            </a>
          )}

          <button
            onClick={() => setIsDialogOpen(true)}
            className="flex float items-center gap-3 bg-background/50 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 shadow-lg hover:scale-105 hover:bg-background/70 transition-all"
            style={{ animationDelay: '2s' }}
          >
            <Image src={HERO_BUY_ICON_SRC} alt={translations.hero.buyBubble} width={24} height={24} className="h-6 w-6 invert" />
            <span className="font-medium text-sm text-white">{translations.hero.buyBubble}</span>
          </button>
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

            <div className={cn('transition-opacity duration-1000', step >= 2 ? 'opacity-100' : 'opacity-0')}>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-4xl mx-auto mt-24">{phrases[2]}</p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                <Button size="lg" className="font-semibold rounded-full px-8 py-6 text-lg bg-white text-black hover:bg-white/90" onClick={() => setIsDialogOpen(true)}>
                  {translations.hero.buyButton}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="ghost" className="font-semibold rounded-full px-8 py-6 text-lg text-white hover:bg-white/10" asChild>
                  <a href="#audiolibro">
                    <Headphones className="mr-2 h-5 w-5" />
                    {translations.audioPlayer.listenButton}
                  </a>
                </Button>
              </div>
              {locale === 'es' && (
                <div className="mt-6">
                  <Button
                    size="lg"
                    variant="link"
                    className="font-semibold rounded-full px-8 py-6 text-lg text-white hover:text-white/80"
                    onClick={() => setIsVideoOpen(true)}
                  >
                    <PlayCircle className="mr-2 h-5 w-5" />
                    {translations.hero.introButton}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
