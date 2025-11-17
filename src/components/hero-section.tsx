import { Button } from '@/components/ui/button';
import { ArrowRight, Video } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline leading-tight mb-6">
          Negociar es abrazar con compasión a una persona mientras experimentamos los altibajos de la vida.
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-10">
          Un libro que nos recuerda que se puede negociar con palabras bonitas y que podemos habitar las situaciones más habituales y complejas de la vida desde tácticas compasivas y solidarias.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" className="font-bold" asChild>
            <a href="#">
              Leer primeros capítulos
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="font-bold" asChild>
            <a href="#">
              <Video className="mr-2 h-5 w-5" />
              Ver video del autor
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
