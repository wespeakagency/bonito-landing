'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [angle, setAngle] = useState(0);

  const prevPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY };
      setPosition(newPos);

      const prevPos = prevPositionRef.current;
      const dx = newPos.x - prevPos.x;
      const dy = newPos.y - prevPos.y;

      if (dx !== 0 || dy !== 0) {
        // Corrected angle calculation: atan2 gives the angle relative to the positive x-axis.
        // We add 90 degrees because the swallow image is pointing upwards by default.
        const newAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        setAngle(newAngle);
      }

      prevPositionRef.current = newPos;
    };

    const onMouseDown = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 300); // Duration of the animation
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button')) {
        setIsHovering(true);
      }
    };
    
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button')) {
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
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out"
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
          isClicked && 'cursor-click'
        )}
        style={{
          transform: `
            translate(-50%, -50%)
            rotate(${isHovering ? angle - 15 : angle}deg) 
            scale(${isHovering ? 1.25 : 1})
          `,
          filter: 'invert(1)'
        }}
      />
    </div>
  );
}
