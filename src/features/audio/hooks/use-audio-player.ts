'use client';

import { type RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MEDIA_SESSION_ARTWORK_SRC } from '@/config/media';
import { type Locale } from '@/lib/i18n';
import { getChaptersForLocale, type Chapter } from '@/features/audio/model/chapters';
import { type DonationDialogAction } from '@/features/audio/types';

export interface UseAudioPlayerResult {
  activeChapters: Chapter[];
  audioRef: RefObject<HTMLAudioElement>;
  currentChapter: Chapter | undefined;
  currentChapterIndex: number;
  currentTime: number;
  duration: number;
  handleAudioPause: () => void;
  handleAudioPlay: () => void;
  formatTime: (time: number) => string;
  handleDialogAction: (action: DonationDialogAction) => void;
  handleLoadedData: () => void;
  handleNext: () => void;
  handlePlayPause: () => void;
  handlePrevious: () => void;
  handleProgressChange: (value: number[]) => void;
  handleTimeUpdate: () => void;
  hasPlayedOnce: boolean;
  isDonationDialogOpen: boolean;
  isPlaying: boolean;
  progressPercent: number;
  selectChapter: (index: number) => void;
}

export function useAudioPlayer(locale: Locale): UseAudioPlayerResult {
  const audioRef = useRef<HTMLAudioElement>(null!);
  const activeChapters = useMemo(() => getChaptersForLocale(locale), [locale]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false);
  const [hasInteractedWithDonation, setHasInteractedWithDonation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentChapterIndex(0);
    setCurrentTime(0);
    setDuration(0);
  }, [locale]);

  const currentChapter = activeChapters[currentChapterIndex];

  const getNextPlayableChapterIndex = useCallback(
    (fromIndex: number, direction: 1 | -1) => {
      if (!activeChapters.length) {
        return fromIndex;
      }

      let nextIndex = fromIndex;

      do {
        nextIndex = (nextIndex + direction + activeChapters.length) % activeChapters.length;
      } while (!activeChapters[nextIndex].audioSrc && nextIndex !== fromIndex);

      return nextIndex;
    },
    [activeChapters]
  );

  const handleNext = useCallback(() => {
    if (!activeChapters.length) return;

    setCurrentChapterIndex((prevIndex) => getNextPlayableChapterIndex(prevIndex, 1));

    if (hasInteractedWithDonation) {
      setIsPlaying(true);
    }
  }, [activeChapters.length, getNextPlayableChapterIndex, hasInteractedWithDonation]);

  const handlePrevious = useCallback(() => {
    if (!activeChapters.length) return;

    setCurrentChapterIndex((prevIndex) => getNextPlayableChapterIndex(prevIndex, -1));

    if (hasInteractedWithDonation) {
      setIsPlaying(true);
    }
  }, [activeChapters.length, getNextPlayableChapterIndex, hasInteractedWithDonation]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentChapter) return;

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

      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: currentChapter.title,
          artist: 'Roberto Luna',
          album: 'Negociando Bonito',
          artwork: [
            {
              src: MEDIA_SESSION_ARTWORK_SRC,
              sizes: '512x512',
              type: 'image/jpeg',
            },
          ],
        });
      }
    } else {
      audio.pause();
    }
  }, [currentChapter, isPlaying]);

  useEffect(() => {
    if (!('mediaSession' in navigator)) {
      return;
    }

    navigator.mediaSession.setActionHandler('play', () => {
      if (!hasInteractedWithDonation) {
        setIsDonationDialogOpen(true);
        return;
      }

      setIsPlaying(true);
    });

    navigator.mediaSession.setActionHandler('pause', () => setIsPlaying(false));
    navigator.mediaSession.setActionHandler('previoustrack', handlePrevious);
    navigator.mediaSession.setActionHandler('nexttrack', handleNext);

    return () => {
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
      navigator.mediaSession.setActionHandler('previoustrack', null);
      navigator.mediaSession.setActionHandler('nexttrack', null);
    };
  }, [handleNext, handlePrevious, hasInteractedWithDonation]);

  const handlePlayPause = useCallback(() => {
    if (!currentChapter?.audioSrc) return;

    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    if (!hasInteractedWithDonation) {
      setIsDonationDialogOpen(true);
      return;
    }

    setIsPlaying(true);
    setHasPlayedOnce(true);
  }, [currentChapter?.audioSrc, hasInteractedWithDonation, isPlaying]);

  const selectChapter = useCallback(
    (index: number) => {
      setCurrentChapterIndex(index);

      if (!hasInteractedWithDonation) {
        setIsDonationDialogOpen(true);
        return;
      }

      setIsPlaying(true);
      setHasPlayedOnce(true);
    },
    [hasInteractedWithDonation]
  );

  const handleDialogAction = useCallback((action: DonationDialogAction) => {
    setIsDonationDialogOpen(false);

    if (action === 'listen') {
      setHasInteractedWithDonation(true);
      setHasPlayedOnce(true);
      setIsPlaying(true);
      return;
    }

    if (action === 'support') {
      setHasInteractedWithDonation(true);
    }
  }, []);

  const handleProgressChange = useCallback((value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
  }, []);

  const handleAudioPlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handleAudioPause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleLoadedData = useCallback(() => {
    if (!audioRef.current) return;

    setDuration(audioRef.current.duration);
    setCurrentTime(audioRef.current.currentTime);

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        if (error.name !== 'AbortError') {
          console.error('Audio play on load failed:', error);
        }
      });
    }
  }, [isPlaying]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const formatTime = useCallback((time: number) => {
    if (isNaN(time) || time === 0) return '0:00';

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    activeChapters,
    audioRef,
    currentChapter,
    currentChapterIndex,
    currentTime,
    duration,
    handleAudioPause,
    handleAudioPlay,
    formatTime,
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
    progressPercent: (currentTime / duration) * 100 || 0,
    selectChapter,
  };
}
