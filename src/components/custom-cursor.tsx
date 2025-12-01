'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 300); // Duration of the animation
    };

    const onMouseOver = (e: MouseEvent) => {
      if (e.target instanceof HTMLAnchorElement || e.target instanceof HTMLButtonElement) {
        setIsHovering(true);
      }
    };
    
    const onMouseOut = (e: MouseEvent) => {
        if (e.target instanceof HTMLAnchorElement || e.target instanceof HTMLButtonElement) {
            setIsHovering(false);
        }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);


    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-200 ease-out"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <Image
        src="https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/golondrina.png"
        alt="Custom Cursor"
        width={40}
        height={40}
        className={cn(
          'transition-transform duration-300',
          isClicked && 'cursor-click',
          isHovering ? 'scale-125' : 'scale-100'
        )}
        style={{
          transform: isHovering ? 'scale(1.25) rotate(-15deg)' : 'scale(1) rotate(0deg)'
        }}
      />
    </div>
  );
}
