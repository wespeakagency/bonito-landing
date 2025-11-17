import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, HeartHandshake } from 'lucide-react';
import { EarIcon } from './icons';
import { AnimatedBlock } from './animated-block';
import { cn } from '@/lib/utils';

const principles = [
  {
    icon: Eye,
    title: 'Claridad',
    description: 'Comunica tu intención con simpleza y honestidad. La transparencia es el camino más corto hacia la confianza.',
    hoverColor: 'hover:bg-blue-900/40',
    glowColor: 'hover:shadow-[0_0_25px_-5px_#60a5fa]',
  },
  {
    icon: EarIcon,
    title: 'Escucha Activa',
    description: 'Escucha para comprender, no solo para responder. Entiende las necesidades y motivaciones de la otra parte.',
    hoverColor: 'hover:bg-purple-900/40',
    glowColor: 'hover:shadow-[0_0_25px_-5px_#c084fc]',
  },
  {
    icon: HeartHandshake,
    title: 'Respeto Mutuo',
    description: 'Sostén tu posición sin romper la relación. El respeto es la base de cualquier acuerdo duradero y beneficioso.',
    hoverColor: 'hover:bg-red-900/40',
    glowColor: 'hover:shadow-[0_0_25px_-5px_#f87171]',
  },
];

export default function PrinciplesSection() {
  return (
    <section className="py-24 sm:py-32 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <AnimatedBlock>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-center mb-16 text-foreground">
            Los 3 pilares de la negociación.
          </h2>
        </AnimatedBlock>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {principles.map((principle, index) => (
            <AnimatedBlock key={principle.title} delay={100 * (index + 1)}>
              <div
                className={cn('flip-card group rounded-2xl', principle.hoverColor, principle.glowColor)}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flip-card-inner">
                  <Card className="flip-card-front text-center bg-secondary border-none p-6 transition-all duration-300">
                    <CardHeader className="p-0 mb-4">
                      <div className="text-primary mb-4">
                        <principle.icon className="h-12 w-12 text-foreground mx-auto" />
                      </div>
                      <CardTitle className="font-headline text-xl font-semibold text-foreground">{principle.title}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card className="flip-card-back text-center bg-secondary border-none p-6 transition-all duration-300">
                    <CardContent className="p-0">
                      <p className="text-muted-foreground text-sm text-justify">{principle.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
