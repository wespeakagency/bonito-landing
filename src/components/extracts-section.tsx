'use client';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const useTypewriter = (text: string, speed: number = 50, start: boolean = false) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!start) {
        setDisplayText('');
        return;
    };

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed, start]);

  return displayText;
};

const TypewriterText = ({ text }: { text: string }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const displayText = useTypewriter(text, 50, isIntersecting);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            setIsIntersecting(true);
            observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
        if(currentRef) {
            observer.unobserve(currentRef);
        }
    }
  }, []);

  return (
    <p ref={ref} className="text-2xl md:text-3xl font-headline font-medium text-center min-h-[6rem] md:min-h-[4.5rem]">
      {displayText}
      <span className="animate-ping">|</span>
    </p>
  );
};

const extracts = [
  "Cuando sabes lo que valen tus palabras, no necesitas elevar la voz.",
  "Negociar bonito es cuidar la relación sin traicionar tu intención.",
  "Un buen acuerdo se nota al día siguiente: sabemos que hemos negociado bonito.",
];

export default function ExtractsSection() {
  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-16">
          {extracts.map((extract, index) => (
            <TypewriterText key={index} text={extract} />
          ))}
        </div>
      </div>
    </section>
  );
}
