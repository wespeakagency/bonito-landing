'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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
import MiniPlayer from '@/components/mini-player';
import { DonationDialog } from '@/components/donation-dialog';
import { useLanguage } from '@/context/language-context';
import { chapters, type Chapter } from '@/lib/chapters';
import { type Locale } from '@/lib/i18n';
import ContactSection from '@/components/contact-section';

export default function LandingPage() {
  const { locale } = useLanguage();

  const [isPlayerInView, setPlayerInView] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [activeChapters, setActiveChapters] = useState<Chapter[]>(chapters[locale as Locale] || []);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false);
  const [hasInteractedWithDonation, setHasInteractedWithDonation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  useEffect(() => {
    setActiveChapters(chapters[locale as Locale] || []);
    setIsPlaying(false);
    setCurrentChapterIndex(0);
    setCurrentTime(0);
    setDuration(0);
  }, [locale]);

  const currentChapter = activeChapters[currentChapterIndex];

  const handleNext = useCallback(() => {
    if (!activeChapters.length) return;
    setCurrentChapterIndex((prevIndex) => {
      let nextIndex = (prevIndex + 1) % activeChapters.length;
      while (!activeChapters[nextIndex].audioSrc && nextIndex !== prevIndex) {
        nextIndex = (nextIndex + 1) % activeChapters.length;
      }
      return nextIndex;
    });
    if (hasInteractedWithDonation) setIsPlaying(true);
  }, [activeChapters, hasInteractedWithDonation]);

  const handlePrevious = useCallback(() => {
    if (!activeChapters.length) return;
    setCurrentChapterIndex((prevIndex) => {
      let nextIndex = (prevIndex - 1 + activeChapters.length) % activeChapters.length;
      while (!activeChapters[nextIndex].audioSrc && nextIndex !== prevIndex) {
        nextIndex = (nextIndex - 1 + activeChapters.length) % activeChapters.length;
      }
      return nextIndex;
    });
    if (hasInteractedWithDonation) setIsPlaying(true);
  }, [activeChapters, hasInteractedWithDonation]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentChapter) return;

    const updateMediaSession = () => {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: currentChapter.title,
          artist: 'Roberto Luna',
          album: 'Negociando Bonito',
          artwork: [
            {
              src: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/WhatsApp%20Image%202025-11-27%20at%2018.21.40.jpeg',
              sizes: '512x512',
              type: 'image/jpeg',
            },
          ],
        });
      }
    };

    if (currentChapter.audioSrc && audio.src !== currentChapter.audioSrc) {
      audio.src = currentChapter.audioSrc;
      audio.load();
    }

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error.name !== 'AbortError') {
            console.error('Audio play failed:', error);
          }
        });
      }
      updateMediaSession();
    } else {
      audio.pause();
    }
  }, [currentChapter, isPlaying]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => {
        if (!hasInteractedWithDonation) {
          setIsDonationDialogOpen(true);
        } else {
          setIsPlaying(true);
        }
      });
      navigator.mediaSession.setActionHandler('pause', () => setIsPlaying(false));
      navigator.mediaSession.setActionHandler('previoustrack', handlePrevious);
      navigator.mediaSession.setActionHandler('nexttrack', handleNext);
    }
  }, [handlePrevious, handleNext, hasInteractedWithDonation]);

  const handlePlayPause = () => {
    if (!currentChapter?.audioSrc) return;
    if (isPlaying) {
      setIsPlaying(false);
    } else if (!hasInteractedWithDonation) {
      setIsDonationDialogOpen(true);
    } else {
      setIsPlaying(true);
      setHasPlayedOnce(true);
    }
  };

  const selectChapter = (index: number) => {
    setCurrentChapterIndex(index);
    if (!hasInteractedWithDonation) {
      setIsDonationDialogOpen(true);
    } else {
      setIsPlaying(true);
      setHasPlayedOnce(true);
    }
  };

  const handleDialogAction = (action: 'listen' | 'support' | 'close') => {
    setIsDonationDialogOpen(false);
    if (action === 'listen') {
      setHasInteractedWithDonation(true);
      setHasPlayedOnce(true);
      setIsPlaying(true);
    } else if (action === 'support') {
      setHasInteractedWithDonation(true);
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

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
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleNext}
        onLoadedData={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
            setCurrentTime(audioRef.current.currentTime);
            if (isPlaying) {
              audioRef.current.play().catch((error) => {
                if (error.name !== 'AbortError') {
                  console.error('Audio play on load failed:', error);
                }
              });
            }
          }
        }}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        preload="metadata"
      />

      {currentChapter && hasPlayedOnce && (
        <MiniPlayer
          isVisible={!isPlayerInView && isPlaying}
          chapter={currentChapter}
          isPlaying={isPlaying}
          progress={(currentTime / duration) * 100 || 0}
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
