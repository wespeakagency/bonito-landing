'use client';

import { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface VideoPlayerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  videoSrc: string;
}

export function VideoPlayerDialog({ isOpen, onOpenChange, videoSrc }: VideoPlayerDialogProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (isOpen && video) {
      video.play().catch(error => {
        // Autoplay might be blocked, this is fine.
        if (error.name !== 'AbortError') {
            console.error("Video play failed:", error);
        }
      });
    } else if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }, [isOpen]);

  const handleVideoEnd = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/90 backdrop-blur-lg border-none sm:max-w-4xl p-0 w-full h-auto aspect-video shadow-2xl overflow-hidden data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0">
        <video
          ref={videoRef}
          src={videoSrc}
          onEnded={handleVideoEnd}
          controls={false}
          className="w-full h-full object-contain"
          playsInline
          autoPlay
        />
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-full p-2 bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-all z-10"
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </button>
      </DialogContent>
    </Dialog>
  );
}
