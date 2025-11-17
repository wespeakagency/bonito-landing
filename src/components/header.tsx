'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
import AccessibilityControls from './accessibility-controls';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-background/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="#" aria-label="Back to top">
            <Logo className="h-8 w-auto text-primary" />
          </a>
          <div className="flex items-center gap-2">
            <AccessibilityControls />
          </div>
        </div>
      </div>
    </header>
  );
}
