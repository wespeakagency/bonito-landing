'use client';

import { type RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MEDIA_SESSION_ARTWORK_SRC } from '@/config/media';
import {
  trackAudioChapterSelect,
  trackAudioComplete,
  trackAudioGateAction,
  trackAudioGateOpen,
  trackAudioNavigation,
  trackAudioPause,
  trackAudioPlay,
  trackAudioProgress,
  trackAudioSeek,
  trackAudioSessionEnd,
  trackDonationSupportClick,
} from '@/features/analytics/track';
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
  handleAudioEnded: () => void;
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
  const trackedMilestonesRef = useRef(new Set<number>());
  const previousGateOpenStateRef = useRef(false);
  const sessionSnapshotRef = useRef<{
    chapterId: number;
    chapterTitle: string;
    currentTime: number;
    duration: number;
    hasPlayback: boolean;
  } | null>(null);
  const sessionEndSentRef = useRef(false);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentChapterIndex(0);
    setCurrentTime(0);
    setDuration(0);
    trackedMilestonesRef.current.clear();
  }, [locale]);

  const currentChapter = activeChapters[currentChapterIndex];

  useEffect(() => {
    trackedMilestonesRef.current.clear();
    sessionEndSentRef.current = false;
    sessionSnapshotRef.current = null;
  }, [currentChapter?.id]);

  useEffect(() => {
    if (!currentChapter) return;
    if (currentTime <= 0) return;

    sessionSnapshotRef.current = {
      chapterId: currentChapter.id,
      chapterTitle: currentChapter.title,
      currentTime,
      duration,
      hasPlayback: true,
    };
    sessionEndSentRef.current = false;
  }, [currentChapter, currentTime, duration]);

  useEffect(() => {
    const flushSessionEnd = () => {
      const snapshot = sessionSnapshotRef.current;
      if (!snapshot || !snapshot.hasPlayback) return;
      if (sessionEndSentRef.current) return;

      sessionEndSentRef.current = true;
      trackAudioSessionEnd(
        snapshot.chapterId,
        snapshot.chapterTitle,
        locale,
        snapshot.currentTime,
        snapshot.duration
      );
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushSessionEnd();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', flushSessionEnd);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', flushSessionEnd);
    };
  }, [locale]);

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
    trackAudioNavigation('next', currentChapter?.id, currentChapter?.title, locale);

    if (!activeChapters.length) return;

    setCurrentChapterIndex((prevIndex) => getNextPlayableChapterIndex(prevIndex, 1));

    if (hasInteractedWithDonation) {
      setIsPlaying(true);
    }
  }, [
    activeChapters.length,
    currentChapter?.id,
    currentChapter?.title,
    getNextPlayableChapterIndex,
    hasInteractedWithDonation,
    locale,
  ]);

  const handlePrevious = useCallback(() => {
    trackAudioNavigation('previous', currentChapter?.id, currentChapter?.title, locale);

    if (!activeChapters.length) return;

    setCurrentChapterIndex((prevIndex) => getNextPlayableChapterIndex(prevIndex, -1));

    if (hasInteractedWithDonation) {
      setIsPlaying(true);
    }
  }, [
    activeChapters.length,
    currentChapter?.id,
    currentChapter?.title,
    getNextPlayableChapterIndex,
    hasInteractedWithDonation,
    locale,
  ]);

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

  useEffect(() => {
    if (isDonationDialogOpen && !previousGateOpenStateRef.current) {
      trackAudioGateOpen(currentChapter?.id, locale);
    }

    previousGateOpenStateRef.current = isDonationDialogOpen;
  }, [currentChapter?.id, isDonationDialogOpen, locale]);

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
      const selectedChapter = activeChapters[index];
      if (selectedChapter) {
        trackAudioChapterSelect(selectedChapter.id, selectedChapter.title, locale);
      }

      setCurrentChapterIndex(index);

      if (!hasInteractedWithDonation) {
        setIsDonationDialogOpen(true);
        return;
      }

      setIsPlaying(true);
      setHasPlayedOnce(true);
    },
    [activeChapters, hasInteractedWithDonation, locale]
  );

  const handleDialogAction = useCallback((action: DonationDialogAction) => {
    trackAudioGateAction(action, currentChapter?.id, locale);
    setIsDonationDialogOpen(false);

    if (action === 'listen') {
      setHasInteractedWithDonation(true);
      setHasPlayedOnce(true);
      setIsPlaying(true);
      return;
    }

    if (action === 'support') {
      trackDonationSupportClick(currentChapter?.id, locale);
      setHasInteractedWithDonation(true);
    }
  }, [currentChapter?.id, locale]);

  const handleProgressChange = useCallback((value: number[]) => {
    if (audioRef.current) {
      if (currentChapter) {
        trackAudioSeek(
          currentChapter.id,
          currentChapter.title,
          locale,
          audioRef.current.currentTime,
          value[0]
        );
      }

      audioRef.current.currentTime = value[0];
    }
  }, [currentChapter, locale]);

  const handleAudioPlay = useCallback(() => {
    if (currentChapter) {
      trackAudioPlay(currentChapter.id, currentChapter.title, locale);
    }

    setIsPlaying(true);
  }, [currentChapter, locale]);

  const handleAudioPause = useCallback(() => {
    if (currentChapter && currentTime > 0) {
      trackAudioPause(
        currentChapter.id,
        currentChapter.title,
        locale,
        currentTime,
        duration
      );
    }

    setIsPlaying(false);
  }, [currentChapter, currentTime, duration, locale]);

  const handleAudioEnded = useCallback(() => {
    if (currentChapter) {
      trackAudioComplete(currentChapter.id, currentChapter.title, locale, duration);
    }

    handleNext();
  }, [currentChapter, duration, handleNext, locale]);

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
      const nextTime = audioRef.current.currentTime;
      const nextDuration = audioRef.current.duration || 0;

      setCurrentTime(nextTime);

      if (!currentChapter || !nextDuration) {
        return;
      }

      const completionRatio = (nextTime / nextDuration) * 100;

      ([25, 50, 75, 90] as const).forEach((milestone) => {
        if (
          completionRatio >= milestone &&
          !trackedMilestonesRef.current.has(milestone)
        ) {
          trackedMilestonesRef.current.add(milestone);
          trackAudioProgress(currentChapter.id, currentChapter.title, locale, milestone);
        }
      });
    }
  }, [currentChapter, locale]);

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
    handleAudioEnded,
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
