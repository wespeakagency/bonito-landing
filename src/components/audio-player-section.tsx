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
    title: 'Prólogo',
    duration: '0:15',
    audioSrc:
      'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/bb6467550019e13b9e379a43d2185f6bf5c0ce1f/Pro%CC%81logo.mp3',
  },
  {
    id: 2,
    title: 'C1 - Negociando con compasión',
    duration: '0:12',
    audioSrc:
      'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C1%20-%20Negociando%20con%20compasio%CC%81n.mp3',
  },
  {
    id: 3,
    title: 'C2 - La compasión como ventaja competitiva',
    duration: '0:11',
    audioSrc:
      'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C2%20-%20La%20compasio%CC%81n%20como%20ventaja%20competitiva.mp3',
  },
  {
    id: 4,
    title: 'C3 - Hagamos un intercambio ( el trueque )',
    duration: '0:12',
    audioSrc:
      'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C3%20-%20Hagamos%20un%20intercambio%20(%20el%20trueque%20).mp3',
  },
  {
    id: 5,
    title: "C4 - Habla bonito ( lección del pueblo Q'ero )",
    duration: '0:18',
    audioSrc:
      "https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C4%20-%20Habla%20bonito%20(%20leccio%CC%81n%20del%20pueblo%20Q'ero%20).mp3",
  },
  {
    id: 6,
    title: 'C5 - Las seis paramitas ( negociar desde la virtud )',
    duration: '0:14',
    audioSrc:
      'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C5%20-%20La%20seis%20paramitas%20(%20negociar%20desde%20la%20virtud%20).mp3',
  },
  {
    id: 7,
    title: 'C6 - Desaprender',
    duration: '0:10',
    audioSrc:
      'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C6%20-%20Desaprender.mp3',
  },
  {
    id: 8,
    title: 'C7 - Perder para ganar',
    duration: '0:10',
    audioSrc:
      'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C7%20-%20Perder%20para%20ganar.mp3',
  },
  {
    id: 9,
    title: 'C8 - Negociar para ayudar',
    duration: '0:10',
    audioSrc:
      'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C8%20-%20Negociar%20para%20ayudar.mp3',
  },
  {
    id: 10,
    title: 'C9 - Un secuestro',
    duration: '0:10',
    audioSrc:
      'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C9%20-%20Un%20secuestro.mp3',
  },
  {
    id: 11,
    title: 'C10 - Negociando con el espejo',
    duration: '0:10',
    audioSrc:
      'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C10%20-%20Negociando%20con%20el%20espejo.mp3',
  },
  {
    id: 12,
    title: 'C11 - Gracias por negociar bonito',
    duration: '0:10',
    audioSrc:
      'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/C11%20-%20Gracias%20por%20negociar%20bonito.mp3',
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
    }
    
    // If we select a new chapter, we want it to start playing if the player was already playing
    if (isPlaying) {
      audio.play().catch(error => console.error("Audio play failed:", error));
    } else {
        audio.pause();
    }

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [currentChapterIndex, currentChapter.audioSrc]);
  
  useEffect(() => {
    const audio = audioRef.current;
    if(!audio) return;
    
    if (isPlaying) {
      audio.play().catch(error => console.error('Audio play failed:', error));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (!currentChapter.audioSrc) return;
    setIsPlaying(!isPlaying);
  };

  const selectChapter = (index: number) => {
    setCurrentChapterIndex(index);
    // When a new chapter is selected, we pause it initially. 
    // The play state will be handled by the user clicking play.
    setIsPlaying(false);
  };

  const handleNext = () => {
    // Find the next available chapter with audio
    let nextIndex = (currentChapterIndex + 1) % chapters.length;
    while (!chapters[nextIndex].audioSrc && nextIndex !== currentChapterIndex) {
      nextIndex = (nextIndex + 1) % chapters.length;
    }
    selectChapter(nextIndex);
  };

  const handlePrevious = () => {
    // Find the previous available chapter with audio
    let prevIndex = (currentChapterIndex - 1 + chapters.length) % chapters.length;
    while (!chapters[prevIndex].audioSrc && prevIndex !== currentChapterIndex) {
      prevIndex = (prevIndex - 1 + chapters.length) % chapters.length;
    }
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
              src={chapters.find(c => c.audioSrc)?.audioSrc || ''}
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
