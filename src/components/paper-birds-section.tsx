'use client';
import { PaperBirdIcon } from './icons';
import { cn } from '@/lib/utils';

const text =
  'No se trata de ganar a toda costa. Se trata de construir puentes, de entender al otro y de encontrar un terreno común. Negociar bonito es, en esencia, un acto de empatía y estrategia.';

const birds = [
  { style: { animationDelay: '0s' } },
  { style: { animationDelay: '1.5s', transform: 'scale(0.8)', opacity: 0.8 } },
  { style: { animationDelay: '3s', transform: 'scale(0.9)', opacity: 0.9 } },
  { style: { animationDelay: '4.5s', transform: 'scale(0.7)', opacity: 0.7 } },
  { style: { animationDelay: '6s', transform: 'scale(1.1)', opacity: 1 } },
];

export default function PaperBirdsSection() {
  return (
    <section className="relative py-32 sm:py-48 bg-background overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <p className="text-xl md:text-2xl text-center font-headline leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white reveal-text-animation">
          {text}
        </p>
      </div>
      <div className="absolute inset-0 z-0">
        {birds.map((bird, i) => (
          <PaperBirdIcon
            key={i}
            className={cn(
              'absolute text-white/50 w-16 h-16 bird-animation',
            )}
            style={bird.style}
          />
        ))}
      </div>
    </section>
  );
}
