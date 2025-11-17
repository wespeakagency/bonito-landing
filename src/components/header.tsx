'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

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
        scrolled ? 'bg-background/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          <a href="#" aria-label="Back to top">
            <Logo className="h-8 w-auto" />
          </a>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex text-white hover:bg-white/10 hover:text-white">Capítulos</Button>
            <Button variant="ghost" className="hidden sm:inline-flex text-white hover:bg-white/10 hover:text-white">Autor</Button>
            <Button className="bg-white text-black hover:bg-white/90 rounded-full">Comprar</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
