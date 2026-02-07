'use client';

import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  LoaderCircle,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { AnimatedBlock } from './animated-block';
import { useTranslation } from '@/context/language-context';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';
import MiniPlayer from './mini-player';
import { DonationDialog } from './donation-dialog';
import { chapters, type Chapter } from '@/lib/chapters';

interface AudioPlayerSectionProps {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  isPlayerInView: boolean;
  setPlayerInView: Dispatch<SetStateAction<boolean>>;
  hasPlayedOnce: boolean;
  setHasPlayedOnce: Dispatch<SetStateAction<boolean>>;
}

export default function AudioPlayerSection({ 
  isPlaying, 
  setIsPlaying,
  isPlayerInView,
  setPlayerInView,
  hasPlayedOnce,
  setHasPlayedOnce,
}: AudioPlayerSectionProps) {
  const { t, language } = useTranslation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const [activeChapters, setActiveChapters] = useState<Chapter[]>(chapters[language]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false);
  const [hasInteractedWithDonation, setHasInteractedWithDonation] = useState(false);

  useEffect(() => {
    setActiveChapters(chapters[language]);
    setCurrentChapterIndex(0);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [language, setIsPlaying]);

  const currentChapter = activeChapters[currentChapterIndex];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPlayerInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, [setPlayerInView]);

  const updateMediaSession = () => {
    if ('mediaSession' in navigator && currentChapter) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentChapter.title,
        artist: 'Roberto Luna',
        album: 'Negociando Bonito',
        artwork: [
          { 
            src: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/WhatsApp%20Image%202025-11-27%20at%2018.21.40.jpeg', 
            sizes: '512x512', 
            type: 'image/jpeg' 
          },
        ]
      });
    }
  };

  useEffect(() => {
    if (!currentChapter) return;
    
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };
    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    if (currentChapter.audioSrc && audio.src !== currentChapter.audioSrc) {
      audio.src = currentChapter.audioSrc;
      audio.load();
    }
    
    if (isPlaying) {
      audio.play().catch(error => console.error("Audio play failed:", error));
      updateMediaSession();
    } else {
        audio.pause();
    }

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [currentChapterIndex, currentChapter, isPlaying]);
  
  useEffect(() => {
    if (!currentChapter) return;
    const audio = audioRef.current;
    if(!audio) return;
    
    if (isPlaying) {
      audio.play().catch(error => console.error('Audio play failed:', error));
      updateMediaSession();
    } else {
      audio.pause();
    }
  }, [isPlaying, currentChapter]);

  const handlePlayPause = () => {
    if (!currentChapter?.audioSrc) return;

    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (!hasInteractedWithDonation) {
        setIsDonationDialogOpen(true);
      } else {
        setIsPlaying(true);
        setHasPlayedOnce(true);
      }
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

  const handleNext = () => {
    if (!activeChapters.length) return;
    let nextIndex = (currentChapterIndex + 1) % activeChapters.length;
    while (!activeChapters[nextIndex].audioSrc && nextIndex !== currentChapterIndex) {
      nextIndex = (nextIndex + 1) % activeChapters.length;
    }
    setCurrentChapterIndex(nextIndex);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (!activeChapters.length) return;
    let prevIndex = (currentChapterIndex - 1 + activeChapters.length) % activeChapters.length;
    while (!activeChapters[prevIndex].audioSrc && prevIndex !== currentChapterIndex) {
      prevIndex = (prevIndex - 1 + activeChapters.length) % activeChapters.length;
    }
    setCurrentChapterIndex(prevIndex);
    setIsPlaying(true);
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => setIsPlaying(true));
      navigator.mediaSession.setActionHandler('pause', () => setIsPlaying(false));
      navigator.mediaSession.setActionHandler('previoustrack', handlePrevious);
      navigator.mediaSession.setActionHandler('nexttrack', handleNext);
    }
  }, [handlePrevious, handleNext, setIsPlaying]);


  return (
    <>
      <DonationDialog
        isOpen={isDonationDialogOpen}
        onAction={handleDialogAction}
      />
      <section ref={sectionRef} className="py-24 sm:py-32 bg-secondary text-foreground">
        <div className="container mx-auto px-4">
          <AnimatedBlock animationType="slide-in-up">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4 text-foreground">
              {t('audioPlayer.title')}
            </h2>
          </AnimatedBlock>
          <AnimatedBlock animationType="slide-in-up" delay={150}>
            <p className="text-xl md:text-2xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
              {t('audioPlayer.subtitle')}
            </p>
          </AnimatedBlock>
          
          {activeChapters.length > 0 ? (
            <AnimatedBlock delay={300} animationType="zoom-in">
              <Card className="bg-background border-border shadow-2xl overflow-hidden rounded-2xl">
                <div className="md:grid md:grid-cols-3">
                  <div className="md:col-span-1 p-8 bg-muted/30 flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium mb-1">
                        {t('audioPlayer.chapterLabel')} {currentChapter?.id}
                      </p>
                      <h3 className="text-2xl font-bold font-headline text-foreground">
                        {currentChapter?.title}
                      </h3>
                    </div>
                    <div className="mt-8">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full h-16 w-16 bg-primary text-primary-foreground hover:bg-primary/90"
                          onClick={handlePlayPause}
                          disabled={!currentChapter?.audioSrc}
                        >
                          {isPlaying ? (
                            <Pause className="h-8 w-8" />
                          ) : (
                            currentChapter?.audioSrc ? <Play className="h-8 w-8 ml-1" /> : <LoaderCircle className="h-8 w-8 animate-spin" />
                          )}
                        </Button>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full text-muted-foreground"
                            onClick={handlePrevious}
                          >
                            <SkipBack className="h-6 w-6" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full text-muted-foreground"
                            onClick={handleNext}
                          >
                            <SkipForward className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-6 space-y-2">
                        <Slider
                          value={[currentTime]}
                          max={duration || 100}
                          onValueChange={handleProgressChange}
                          className="w-full"
                          disabled={!currentChapter?.audioSrc}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground font-mono">
                          <span>{formatTime(currentTime)}</span>
                          <span>{formatTime(duration)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <ScrollArea className="h-96 w-full">
                      <div className="p-4">
                        <h4 className="text-lg font-semibold font-headline p-4 text-foreground">
                          {t('audioPlayer.chaptersTitle')}
                        </h4>
                        <ul className="space-y-1">
                          {activeChapters.map((chapter, index) => (
                            <li key={chapter.id}>
                              <button
                                onClick={() => selectChapter(index)}
                                disabled={!chapter.audioSrc}
                                className={cn(
                                  'w-full text-left p-4 rounded-lg transition-colors flex items-center justify-between',
                                  index === currentChapterIndex
                                    ? 'bg-primary/10 text-primary'
                                    : 'hover:bg-muted/50 text-foreground',
                                  !chapter.audioSrc && 'opacity-50 cursor-not-allowed'
                                )}
                              >
                                <div className="flex items-center gap-4">
                                  {!chapter.audioSrc ? (
                                    <LoaderCircle className="h-4 w-4 animate-spin text-muted-foreground" />
                                  ) : (
                                    <>
                                      {index === currentChapterIndex && isPlaying ? (
                                        <Pause className="h-4 w-4" />
                                      ) : (
                                        <Play className="h-4 w-4" />
                                      )}
                                    </>
                                  )}
                                  <span className="font-medium">
                                    {chapter.title}
                                  </span>
                                </div>
                                <span className="text-sm font-mono text-muted-foreground">
                                  {chapter.duration}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </ScrollArea>
                  </div>
                </div>
                <audio
                  ref={audioRef}
                  src={currentChapter?.audioSrc || ''}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={handleNext}
                  preload="metadata"
                />
              </Card>
            </AnimatedBlock>
          ) : (
             <AnimatedBlock delay={300} animationType="zoom-in">
                <Card className="bg-background border-border shadow-2xl rounded-2xl flex flex-col items-center justify-center p-16 h-[514px] md:h-auto">
                    <Clock className="w-16 h-16 text-primary mb-6" />
                    <h3 className="text-2xl font-bold font-headline text-foreground text-center">
                        {t('audioPlayer.comingSoon')}
                    </h3>
                </Card>
            </AnimatedBlock>
          )}

        </div>
      </section>
      {activeChapters.length > 0 && hasPlayedOnce && currentChapter && (
          <MiniPlayer 
            isVisible={!isPlayerInView}
            chapter={currentChapter}
            isPlaying={isPlaying}
            progress={(currentTime / duration) * 100}
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
      )}
    </>
  );
}
