import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, HeartHandshake } from 'lucide-react';
import { EarIcon } from './icons';
import { AnimatedBlock } from './animated-block';
import { cn } from '@/lib/utils';

const principles = [
  {
    icon: Eye,
    title: 'Claridad',
    description: 'Comunica tu intención con simpleza y honestidad. La transparencia es el camino más corto hacia la confianza.',
    hoverColor: 'hover:border-blue-400',
    glowColor: 'hover:shadow-[0_0_25px_-5px_#60a5fa]',
  },
  {
    icon: EarIcon,
    title: 'Escucha Activa',
    description: 'Escucha para comprender, no solo para responder. Entiende las necesidades y motivaciones de la otra parte.',
    hoverColor: 'hover:border-purple-400',
    glowColor: 'hover:shadow-[0_0_25px_-5px_#c084fc]',
  },
  {
    icon: HeartHandshake,
    title: 'Respeto Mutuo',
    description: 'Sostén tu posición sin romper la relación. El respeto es la base de cualquier acuerdo duradero y beneficioso.',
    hoverColor: 'hover:border-red-400',
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
              <Card className={cn(
                "bg-secondary border-muted-foreground/20 text-center h-full flex flex-col transition-all duration-300",
                principle.hoverColor,
                principle.glowColor
              )}>
                <CardHeader className="pt-8">
                  <CardTitle className="font-headline text-xl font-semibold text-foreground">{principle.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between pt-2">
                  <CardDescription className="text-muted-foreground text-sm mb-6">
                    {principle.description}
                  </CardDescription>
                  <div className="flex justify-center items-end">
                    <div className="bg-background rounded-lg p-4 border border-border">
                        <principle.icon className="h-10 w-10 text-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  );
}