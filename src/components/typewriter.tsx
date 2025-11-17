'use client';

import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  onStart?: () => void;
  runOnce?: boolean;
}

export function Typewriter({ text, speed = 50, className, onComplete, onStart, runOnce = false }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState(runOnce ? text : '');

  useEffect(() => {
    if (runOnce) {
      setDisplayedText(text);
      onComplete?.();
      return;
    }

    onStart?.();
    setDisplayedText(''); 
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        onComplete?.();
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed, onComplete, onStart, runOnce]);

  return <span className={className}>{displayedText}</span>;
}
