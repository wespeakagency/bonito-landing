'use client';

import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/language-context';

type Chapter = {
  id: number;
  title: string;
  duration: string;
  audioSrc: string | null;
};

interface MiniPlayerProps {
  isVisible: boolean;
  chapter: Chapter;
  isPlaying: boolean;
  progress: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function MiniPlayer({
  isVisible,
  chapter,
  isPlaying,
  progress,
  onPlayPause,
  onNext,
  onPrevious,
}: MiniPlayerProps) {
  const { translations } = useLanguage();

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 w-80 rounded-2xl bg-background/80 backdrop-blur-lg border border-border shadow-2xl transition-all duration-300',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
      )}
    >
      <div className="p-4 space-y-3">
        <div>
          <p className="text-sm font-bold truncate text-foreground">{chapter.title}</p>
          <p className="text-xs text-muted-foreground">
            {isPlaying ? translations.miniPlayer.playingNow : translations.miniPlayer.paused}
          </p>
        </div>
        <Progress value={progress} className="h-1 w-full" />
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={onPrevious}>
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10" onClick={onPlayPause}>
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={onNext}>
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
