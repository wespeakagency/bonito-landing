'use client';

import { Headphones } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/context/language-context';

export default function FloatingPlayerButton({ isVisible }: { isVisible: boolean }) {
  const { translations } = useLanguage();

  if (!isVisible) {
    return null;
  }

  return (
    <a
      href="#audiolibro"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <Button
        variant="outline"
        size="lg"
        className="rounded-full bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 float shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-primary/30 backdrop-blur-sm"
      >
        <Headphones className="mr-2 h-5 w-5" />
        {translations.audioPlayer.listenButton}
      </Button>
    </a>
  );
}
