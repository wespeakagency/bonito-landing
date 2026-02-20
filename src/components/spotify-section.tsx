'use client';

import { Button } from '@/components/ui/button';
import { AnimatedBlock } from './animated-block';
import { useTranslation } from '@/context/language-context';

type Locale = 'es' | 'en' | 'fr' | 'zh' | 'pt' | 'hi' | 'el';

const spotifyLinks: Partial<Record<Locale, string>> = {
  es: 'https://open.spotify.com/show/1ObwenjHOAGHVapd9V2y8B',
  en: 'https://open.spotify.com/show/24V2w0YX10O9c5opUWLIDz',
  fr: 'https://open.spotify.com/show/5i7nLg3STMY7DaURuCFV7z',
  zh: 'https://open.spotify.com/show/1GDPg4qyzrwfrRtKsOlGWH',
  pt: 'https://open.spotify.com/show/0I5E2nvtKi6CrmWmsTzZsT',
  hi: 'https://open.spotify.com/show/3PUZxVNRa2CNFAAqn3PWer',
};

export default function SpotifySection() {
  const { t, language } = useTranslation();
  const spotifyLink = spotifyLinks[language as Locale];

  if (!spotifyLink) {
    return null;
  }

  return (
    <section className="bg-secondary text-foreground py-24 sm:py-32">
      <div className="container mx-auto px-4 text-center">
        <AnimatedBlock animationType="zoom-in">
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-foreground">
            {t('spotify.title')}
          </h2>
        </AnimatedBlock>
        <AnimatedBlock animationType="zoom-in" delay={150}>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            {t('spotify.subtitle')}
          </p>
        </AnimatedBlock>
        <AnimatedBlock delay={300} animationType="slide-in-up">
          <Button
            size="lg"
            className="bg-[#1DB954] text-white hover:bg-[#1DB954]/90 transition-transform duration-200 hover:scale-105 rounded-full px-8 py-6 text-lg"
            asChild
          >
            <a href={spotifyLink} target="_blank" rel="noopener noreferrer">
              {t('spotify.button')}
            </a>
          </Button>
        </AnimatedBlock>
      </div>
    </section>
  );
}
