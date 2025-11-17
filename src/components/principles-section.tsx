import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, HeartHandshake } from 'lucide-react';
import { EarIcon } from './icons';
import { AnimatedBlock } from './animated-block';

const principles = [
  {
    icon: Eye,
    title: 'Claridad',
    description: 'Comunica tu intención con simpleza y honestidad. La transparencia es el camino más corto hacia la confianza.',
  },
  {
    icon: EarIcon,
    title: 'Escucha Activa',
    description: 'Escucha para comprender, no solo para responder. Entiende las necesidades y motivaciones de la otra parte.',
  },
  {
    icon: HeartHandshake,
    title: 'Respeto Mutuo',
    description: 'Sostén tu posición sin romper la relación. El respeto es la base de cualquier acuerdo duradero y beneficioso.',
  },
];

export default function PrinciplesSection() {
  return (
    <section className="py-24 sm:py-32 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <AnimatedBlock>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-center mb-16 text-white">
            Los 3 pilares de la negociación.
          </h2>
        </AnimatedBlock>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {principles.map((principle, index) => (
            <AnimatedBlock key={principle.title} delay={100 * (index + 1)}>
              <Card className="text-center h-full bg-secondary border-none rounded-2xl p-6 hover:bg-muted/80 transition-colors duration-300">
                <CardHeader className="p-0 mb-4 flex flex-col items-center">
                  <div className="text-primary mb-3">
                    <principle.icon className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="font-headline text-xl font-semibold text-white">{principle.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground text-base text-justify">{principle.description}</p>
                </CardContent>
              </Card>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
