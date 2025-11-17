'use client';

import { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  onStart?: () => void;
}

export function Typewriter({ text, speed = 50, className, onComplete, onStart }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) {
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
        hasAnimated.current = true;
        onComplete?.();
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed, onComplete, onStart]);

  return <span className={className}>{displayedText}</span>;
}
