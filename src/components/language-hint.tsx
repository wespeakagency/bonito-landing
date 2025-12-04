'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const languageHints = [
  'Select your language',
  'Selecciona tu idioma',
  '选择你的语言',
  'Selecione seu idioma',
  'अपनी भाषा चुनें',
];

export function LanguageHint({ isVisible }: { isVisible: boolean }) {
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setHintIndex((prevIndex) => (prevIndex + 1) % languageHints.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.5 }}
          className="absolute top-1/2 -translate-y-3/4 right-full mr-3 w-max pointer-events-none"
        >
          <div className="rounded-full bg-primary/10 border-primary/20 text-primary backdrop-blur-sm shadow-lg shadow-primary/20 border px-4 py-1.5 text-sm">
            <AnimatePresence mode="wait">
              <motion.span
                key={hintIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {languageHints[hintIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
