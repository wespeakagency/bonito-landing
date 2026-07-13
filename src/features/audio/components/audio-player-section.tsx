'use client';

import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from 'react';
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
import { AnimatedBlock } from '@/components/animated-block';
import { useLanguage } from '@/context/language-context';
import { useTrackSectionView } from '@/features/analytics/hooks/use-track-section-view';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type Chapter } from '@/features/audio/model/chapters';

interface AudioPlayerSectionProps {
  setPlayerInView: Dispatch<SetStateAction<boolean>>;
  chapters: Chapter[];
  currentChapterIndex: number;
  currentChapter: Chapter | undefined;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  selectChapter: (index: number) => void;
  handlePlayPause: () => void;
  handlePrevious: () => void;
  handleNext: () => void;
  handleProgressChange: (value: number[]) => void;
  formatTime: (time: number) => string;
}

export default function AudioPlayerSection({
  setPlayerInView,
  chapters,
  currentChapterIndex,
  currentChapter,
  isPlaying,
  currentTime,
  duration,
  selectChapter,
  handlePlayPause,
  handlePrevious,
  handleNext,
  handleProgressChange,
  formatTime,
}: AudioPlayerSectionProps) {
  const { translations, locale } = useLanguage();
  const [sectionElement, setSectionElement] = useState<HTMLElement | null>(null);
  const sectionTrackingRef = useTrackSectionView<HTMLElement>('audiobook', locale);

  useEffect(() => {
    if (!sectionElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPlayerInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionElement);

    return () => {
      observer.unobserve(sectionElement);
    };
  }, [sectionElement, setPlayerInView]);

  const handleSectionRef = useCallback((node: HTMLElement | null) => {
    setSectionElement(node);
    sectionTrackingRef(node);
  }, [sectionTrackingRef]);

  return (
    <section
      ref={handleSectionRef}
      className="py-24 sm:py-32 bg-secondary text-foreground"
    >
      <div className="container mx-auto px-4">
        <AnimatedBlock animationType="slide-in-up">
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4 text-foreground">
            {translations.audioPlayer.title}
          </h2>
        </AnimatedBlock>
        <AnimatedBlock animationType="slide-in-up" delay={150}>
          <p className="text-xl md:text-2xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
            {translations.audioPlayer.subtitle}
          </p>
        </AnimatedBlock>
        
        {chapters.length > 0 ? (
          <AnimatedBlock delay={300} animationType="zoom-in">
            <Card className="bg-background border-border shadow-2xl overflow-hidden rounded-2xl">
              <div className="md:grid md:grid-cols-3">
                <div className="md:col-span-1 p-8 bg-muted/30 flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">
                      {translations.audioPlayer.chapterLabel} {currentChapter?.id}
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
                        {translations.audioPlayer.chaptersTitle}
                      </h4>
                      <ul className="space-y-1">
                        {chapters.map((chapter, index) => (
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
            </Card>
          </AnimatedBlock>
        ) : (
           <AnimatedBlock delay={300} animationType="zoom-in">
              <Card className="bg-background border-border shadow-2xl rounded-2xl flex flex-col items-center justify-center p-16 h-[514px] md:h-auto">
                  <Clock className="w-16 h-16 text-primary mb-6" />
                  <h3 className="text-2xl font-bold font-headline text-foreground text-center">
                      {translations.audioPlayer.comingSoon}
                  </h3>
              </Card>
          </AnimatedBlock>
        )}
      </div>
    </section>
  );
}
