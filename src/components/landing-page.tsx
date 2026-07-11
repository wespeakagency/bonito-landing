'use client';

import { useState } from 'react';
import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import IdeaSection from '@/components/idea-section';
import PrinciplesSection from '@/components/principles-section';
import ExtractsSection from '@/components/extracts-section';
import CtaSection from '@/components/cta-section';
import Footer from '@/components/footer';
import AuthorSection from '@/components/author-section';
import SpotifySection from '@/components/spotify-section';
import ContactSection from '@/components/contact-section';
import AudioPlayerSection from '@/features/audio/components/audio-player-section';
import { DonationDialog } from '@/features/audio/components/donation-dialog';
import FloatingPlayerButton from '@/features/audio/components/floating-player-button';
import MiniPlayer from '@/features/audio/components/mini-player';
import { useAudioPlayer } from '@/features/audio/hooks/use-audio-player';
import { useLanguage } from '@/context/language-context';

export default function LandingPage() {
  const { locale } = useLanguage();
  const [isPlayerInView, setPlayerInView] = useState(true);

  const {
    activeChapters,
    audioRef,
    currentChapter,
    currentChapterIndex,
    currentTime,
    duration,
    formatTime,
    handleAudioPause,
    handleAudioPlay,
    handleDialogAction,
    handleLoadedData,
    handleNext,
    handlePlayPause,
    handlePrevious,
    handleProgressChange,
    handleTimeUpdate,
    hasPlayedOnce,
    isDonationDialogOpen,
    isPlaying,
    progressPercent,
    selectChapter,
  } = useAudioPlayer(locale);

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
            setPlayerInView={setPlayerInView}
            chapters={activeChapters}
            currentChapterIndex={currentChapterIndex}
            currentChapter={currentChapter}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            selectChapter={selectChapter}
            handlePlayPause={handlePlayPause}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            handleProgressChange={handleProgressChange}
            formatTime={formatTime}
          />
        </div>
        <div id="spotify">
          <SpotifySection />
        </div>
        <div id="comprar">
          <CtaSection />
        </div>
        <div id="contacto">
          <ContactSection />
        </div>
      </main>

      <DonationDialog
        isOpen={isDonationDialogOpen}
        onAction={handleDialogAction}
      />

      <audio
        ref={audioRef}
        onPlay={handleAudioPlay}
        onPause={handleAudioPause}
        onEnded={handleNext}
        onLoadedData={handleLoadedData}
        onTimeUpdate={handleTimeUpdate}
        preload="metadata"
      />

      {currentChapter && hasPlayedOnce && (
        <MiniPlayer
          isVisible={!isPlayerInView && isPlaying}
          chapter={currentChapter}
          isPlaying={isPlaying}
          progress={progressPercent}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}

      <FloatingPlayerButton isVisible={!isPlayerInView && hasPlayedOnce && !isPlaying} />

      <Footer />
    </div>
  );
}
