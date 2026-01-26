'use client';

import { useState, useEffect } from 'react';
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

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerInView, setPlayerInView] = useState(true);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [showLanguageOverlay, setShowLanguageOverlay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanguageOverlay(false);
    }, 4000); // Hide after 4 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      {showLanguageOverlay && (
        <div
          onClick={() => setShowLanguageOverlay(false)}
          className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40 animate-in fade-in duration-500"
        />
      )}
      <Header setShowLanguageOverlay={setShowLanguageOverlay} />
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
        <div id="comprar">
          <CtaSection />
        </div>
      </main>
      <FloatingPlayerButton isVisible={!isPlayerInView && !hasPlayedOnce} />
      <Footer />
    </div>
  );
}
