'use client';
import { useEffect, useState, type ComponentType } from 'react';
import type { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconExplosionProps {
  icons: ComponentType<LucideProps>[];
  origin: { x: number; y: number };
  glowColor: string;
  onComplete: () => void;
}

interface Particle {
  id: number;
  Icon: ComponentType<LucideProps>;
  style: React.CSSProperties;
}

export function IconExplosion({ icons, origin, glowColor, onComplete }: IconExplosionProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = icons.map((Icon, index) => {
      const angle = Math.random() * 360;
      const distance = Math.random() * 300 + 200; // 200-500px away
      const endX = Math.cos(angle * (Math.PI / 180)) * distance;
      const endY = Math.sin(angle * (Math.PI / 180)) * distance;
      const duration = Math.random() * 1 + 0.5; // 0.5-1.5s
      const delay = Math.random() * 0.2;

      return {
        id: index,
        Icon,
        style: {
          left: `${origin.x}px`,
          top: `${origin.y}px`,
          color: glowColor,
          '--transform-end': `translate(${endX}px, ${endY}px)`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        } as React.CSSProperties,
      };
    });

    setParticles(newParticles);

    const timer = setTimeout(onComplete, 2000); // Cleanup after longest animation
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glowColor, icons, origin.x, origin.y]); // Depend on key values to re-run

  if (particles.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10">
      {particles.map((particle) => (
        <particle.Icon
          key={particle.id}
          className={cn(
            'icon-particle absolute text-2xl md:text-3xl'
          )}
          style={particle.style}
        />
      ))}
    </div>
  );
}
