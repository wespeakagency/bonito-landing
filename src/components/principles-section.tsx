import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, HeartHandshake } from 'lucide-react';
import { EarIcon } from './icons';
import { AnimatedBlock } from './animated-block';

const principles = [
  {
    icon: Eye,
    title: 'Claridad',
    description: 'Un poco de claridad es suficiente para poder compartir y comprender.',
  },
  {
    icon: EarIcon,
    title: 'Escucha',
    description: 'Escuchar no para responder, sino para comprender.',
  },
  {
    icon: HeartHandshake,
    title: 'Respeto',
    description: 'Negociar bonito no es ceder: es sostener lo importante sin imponerse y sin romper al otro.',
  },
];

export default function PrinciplesSection() {
  return (
    <section className="py-20 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <AnimatedBlock>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
            Principios del libro
          </h2>
        </AnimatedBlock>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {principles.map((principle, index) => (
            <AnimatedBlock key={principle.title} delay={100 * (index + 1)}>
              <Card className="text-center h-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-background">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
                    <principle.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline text-2xl">{principle.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{principle.description}</p>
                </CardContent>
              </Card>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
