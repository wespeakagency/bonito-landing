'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type AnimationType = 'fade-in' | 'slide-in-up' | 'slide-in-left' | 'slide-in-right' | 'zoom-in';

interface AnimatedBlockProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animationType?: AnimationType;
}

export function AnimatedBlock({
  children,
  className,
  delay = 0,
  animationType = 'slide-in-up',
}: AnimatedBlockProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const animationClasses = {
    'fade-in': 'opacity-0',
    'slide-in-up': 'opacity-0 translate-y-10',
    'slide-in-left': 'opacity-0 -translate-x-10',
    'slide-in-right': 'opacity-0 translate-x-10',
    'zoom-in': 'opacity-0 scale-95',
  };
  
  const visibleClasses = {
    'fade-in': 'opacity-100',
    'slide-in-up': 'opacity-100 translate-y-0',
    'slide-in-left': 'opacity-100 translate-x-0',
    'slide-in-right': 'opacity-100 translate-x-0',
    'zoom-in': 'opacity-100 scale-100',
  }

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-1000',
        isVisible ? visibleClasses[animationType] : animationClasses[animationType],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
