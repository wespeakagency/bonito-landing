'use client';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { AnimatedBlock } from './animated-block';

const extracts = [
  "La claridad no es un punto de partida, es un resultado. Se construye.",
  "Escuchar para comprender, no para responder. Ahí está la clave.",
  "Negociar bonito es cuidar la relación sin traicionar tu intención.",
];

export default function ExtractsSection() {
  return (
    <section className="py-24 sm:py-40 bg-secondary">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-20">
          {extracts.map((extract, index) => (
            <AnimatedBlock key={index} delay={index * 150}>
              <h3 className="text-3xl md:text-5xl font-headline font-medium text-center text-secondary-foreground leading-tight">
                "{extract}"
              </h3>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
