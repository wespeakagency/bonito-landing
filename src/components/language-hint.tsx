'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/context/language-context';

export function LanguageHint({ isVisible }: { isVisible: boolean }) {
  const { translations } = useLanguage();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.5 }}
          className="w-max pointer-events-none"
        >
          <div className="rounded-full bg-primary/10 border-primary/20 text-primary backdrop-blur-sm shadow-lg shadow-primary/20 border px-4 py-1.5 text-sm">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {translations.header.languageHint}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
