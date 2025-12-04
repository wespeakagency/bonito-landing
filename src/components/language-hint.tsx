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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="absolute -top-1 right-full mr-3 w-max"
        >
          <div className="relative bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm shadow-lg shadow-primary/20">
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
            <div className="absolute top-1/2 -right-1 w-2 h-2 bg-primary/10 border-r border-t border-primary/20 transform -translate-y-1/2 rotate-45" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
