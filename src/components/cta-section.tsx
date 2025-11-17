import { Button } from '@/components/ui/button';
import { ShoppingCart, BookOpen, Headphones, Globe } from 'lucide-react';

const channels = [
  { name: 'Amazon', icon: ShoppingCart, href: '#' },
  { name: 'Gandhi', icon: BookOpen, href: '#' },
  { name: 'Audible', icon: Headphones, href: '#' },
  { name: 'Sitio Oficial', icon: Globe, href: '#' },
];

export default function CtaSection() {
  return (
    <section className="bg-foreground text-background py-20 sm:py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
          Hablar sobre negociar bonito hoy es una conversación que importa.
        </h2>
        <p className="text-lg md:text-xl text-background/80 mb-12">
          Disponible en físico, digital y audiolibro narrado por el autor.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {channels.map((channel) => (
            <Button
              key={channel.name}
              variant="outline"
              size="lg"
              className="bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground"
              asChild
            >
              <a href={channel.href}>
                <channel.icon className="mr-2 h-5 w-5" />
                {channel.name}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
