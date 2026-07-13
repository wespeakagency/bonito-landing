'use client';

import { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

interface VideoPlayerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose?: () => void;
  onComplete?: () => void;
  videoSrc: string;
}

export function VideoPlayerDialog({
  isOpen,
  onOpenChange,
  onClose,
  onComplete,
  videoSrc,
}: VideoPlayerDialogProps) {
  const { translations } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeReasonRef = useRef<'complete' | 'manual' | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (isOpen && video) {
      video.play().catch(error => {
        // Autoplay might be blocked, this is fine.
        if (error.name !== 'AbortError') {
          console.error('Video play failed:', error);
        }
      });
    } else if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }, [isOpen]);

  const handleVideoEnd = () => {
    closeReasonRef.current = 'complete';
    onComplete?.();
    onOpenChange(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (closeReasonRef.current !== 'complete') {
        onClose?.();
      }

      closeReasonRef.current = null;
    }

    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-black/90 backdrop-blur-lg border-none sm:max-w-4xl p-0 w-full h-auto aspect-video shadow-2xl overflow-hidden data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0">
        <DialogTitle className="sr-only">{translations.videoDialog.title}</DialogTitle>
        <DialogDescription className="sr-only">{translations.videoDialog.description}</DialogDescription>
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
          onClick={() => handleOpenChange(false)}
          className="absolute right-4 top-4 rounded-full p-2 bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-all z-10"
        >
          <X className="h-6 w-6" />
          <span className="sr-only">{translations.videoDialog.close}</span>
        </button>
      </DialogContent>
    </Dialog>
  );
}
