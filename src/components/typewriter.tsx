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
  const [displayedText, setDisplayedText] = useState(runOnce ? '' : text);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (runOnce && hasRun) {
      setDisplayedText(text);
      return;
    }
    if (runOnce && !hasRun) {
      onStart?.();
      setDisplayedText(''); 
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          setHasRun(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }
    
    // Original non-runOnce logic
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
  }, [text, speed, onComplete, onStart, runOnce, hasRun]);

  return <span className={className}>{displayedText}</span>;
}
