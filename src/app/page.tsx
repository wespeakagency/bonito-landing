'use client';

import { useState } from 'react';
import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import IdeaSection from '@/components/idea-section';
import PrinciplesSection from '@/components/principles-section';
import ExtractsSection from '@/components/extracts-section';
import CtaSection from '@/components/cta-section';
import Footer from '@/components/footer';
import AudioPlayerSection from '@/components/audio-player-section';
import AuthorSection from '@/components/author-section';
import FloatingPlayerButton from '@/components/floating-player-button';
import SpotifySection from '@/components/spotify-section';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerInView, setPlayerInView] = useState(true);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <IdeaSection />
        <PrinciplesSection />
        <ExtractsSection />
        <AuthorSection />
        <div id="audiolibro">
          <AudioPlayerSection 
            isPlaying={isPlaying} 
            setIsPlaying={setIsPlaying}
            isPlayerInView={isPlayerInView}
            setPlayerInView={setPlayerInView}
            hasPlayedOnce={hasPlayedOnce}
            setHasPlayedOnce={setHasPlayedOnce}
          />
        </div>
        <SpotifySection />
        <div id="comprar">
          <CtaSection />
        </div>
      </main>
      <FloatingPlayerButton isVisible={!isPlayerInView && hasPlayedOnce && !isPlaying} />
      <Footer />
    </div>
  );
}
