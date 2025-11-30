'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  LoaderCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { AnimatedBlock } from './animated-block';
import { useTranslation } from '@/context/language-context';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';

const bookChapters = [
  {
    id: 1,
    title: 'Introducción: El Arte de la Compasión',
    duration: '0:15',
    audioSrc: 'https://storage.googleapis.com/studiopublic/prologo.mp3',
  },
  {
    id: 2,
    title: 'Pilar 1: Claridad',
    duration: '0:12',
    audioSrc: 'https://storage.googleapis.com/studiopublic/pilar1.mp3',
  },
  {
    id: 3,
    title: 'Pilar 2: Escucha Activa',
    duration: '0:11',
    audioSrc: 'https://storage.googleapis.com/studiopublic/pilar2.mp3',
  },
  {
    id: 4,
    title: 'Pilar 3: Respeto Mutuo',
    duration: '0:12',
    audioSrc: 'https://storage.googleapis.com/studiopublic/pilar3.mp3',
  },
  {
    id: 5,
    title: 'Casos de Estudio: Negociaciones Reales',
    duration: '0:18',
    audioSrc: '', // Placeholder
  },
  {
    id: 6,
    title: 'Conclusión: El Camino del Negociador',
    duration: '0:14',
    audioSrc: '', // Placeholder
  },
];

type Chapter = (typeof bookChapters)[0];

export default function AudioPlayerSection() {
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [chapters, setChapters] = useState<Chapter[]>(bookChapters);

  const currentChapter = chapters[currentChapterIndex];

  useEffect(() => {
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
      audio.pause();
      setIsPlaying(false);
    }
    
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [currentChapterIndex, currentChapter.audioSrc]);
  
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(error => console.error('Audio play failed:', error));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (!currentChapter.audioSrc) return;
    setIsPlaying(!isPlaying);
  };

  const selectChapter = (index: number) => {
    setCurrentChapterIndex(index);
    setIsPlaying(false);
  };

  const handleNext = () => {
    const nextIndex = (currentChapterIndex + 1) % chapters.length;
    selectChapter(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = (currentChapterIndex - 1 + chapters.length) % chapters.length;
    selectChapter(prevIndex);
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-24 sm:py-32 bg-secondary text-foreground">
      <div className="container mx-auto px-4">
        <AnimatedBlock animationType="slide-in-up">
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4 text-foreground">
            Escucha un adelanto
          </h2>
        </AnimatedBlock>
        <AnimatedBlock animationType="slide-in-up" delay={150}>
          <p className="text-xl md:text-2xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
            Sumérgete en los primeros capítulos y descubre el poder de negociar bonito.
          </p>
        </AnimatedBlock>
        <AnimatedBlock delay={300} animationType="zoom-in">
          <Card className="bg-background border-border shadow-2xl overflow-hidden rounded-2xl">
            <div className="md:grid md:grid-cols-3">
              <div className="md:col-span-1 p-8 bg-muted/30 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">
                    CAPÍTULO {currentChapter.id}
                  </p>
                  <h3 className="text-2xl font-bold font-headline text-foreground">
                    {currentChapter.title}
                  </h3>
                </div>
                <div className="mt-8">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-16 w-16 bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={handlePlayPause}
                      disabled={!currentChapter.audioSrc}
                    >
                      {isPlaying ? (
                        <Pause className="h-8 w-8" />
                      ) : (
                         currentChapter.audioSrc ? <Play className="h-8 w-8 ml-1" /> : <LoaderCircle className="h-8 w-8 animate-spin" />
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
                      disabled={!currentChapter.audioSrc}
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
                      Capítulos
                    </h4>
                    <ul className="space-y-1">
                      {chapters.map((chapter, index) => (
                        <li key={chapter.id}>
                          <button
                            onClick={() => selectChapter(index)}
                            className={cn(
                              'w-full text-left p-4 rounded-lg transition-colors flex items-center justify-between',
                              index === currentChapterIndex
                                ? 'bg-primary/10 text-primary'
                                : 'hover:bg-muted/50 text-foreground'
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
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={handleNext}
              preload="metadata"
            />
          </Card>
        </AnimatedBlock>
      </div>
    </section>
  );
}
