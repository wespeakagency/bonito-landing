'use client';

import { Button } from '@/components/ui/button';
import { AnimatedBlock } from './animated-block';
import { useLanguage } from '@/context/language-context';
import { spotifyLinks } from '@/lib/spotify-links';

export default function SpotifySection() {
  const { translations, locale } = useLanguage();
  const spotifyLink = spotifyLinks[locale];

  return (
    <section className="bg-secondary text-foreground py-24 sm:py-32">
      <div className="container mx-auto px-4 text-center">
        <AnimatedBlock animationType="zoom-in">
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-foreground">
            {translations.spotify.title}
          </h2>
        </AnimatedBlock>
        <AnimatedBlock animationType="zoom-in" delay={150}>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            {translations.spotify.subtitle}
          </p>
        </AnimatedBlock>
        <AnimatedBlock delay={300} animationType="slide-in-up">
          <Button
            size="lg"
            className="bg-[#1DB954] text-white hover:bg-[#1DB954]/90 transition-transform duration-200 hover:scale-105 rounded-full px-8 py-6 text-lg"
            asChild
          >
            <a href={spotifyLink} target="_blank" rel="noopener noreferrer">
              {translations.spotify.button}
            </a>
          </Button>
        </AnimatedBlock>
      </div>
    </section>
  );
}
