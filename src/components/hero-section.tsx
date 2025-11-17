import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { AnimatedBlock } from './animated-block';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 bg-black text-white overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
       <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none opacity-30"
        poster="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1280&h=720&fit=crop"
       >
        <source src="https://cdn.pixabay.com/video/2021/09/16/87411-611352485_large.mp4" type="video/mp4" />
      </video>
      <div className="container mx-auto px-4 text-center z-20">
        <AnimatedBlock>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-headline leading-tight mb-6">
            Negociar es un arte.
            <br />
            Practícalo con compasión.
          </h1>
        </AnimatedBlock>
        <AnimatedBlock delay={150}>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10">
            Un libro para transformar conversaciones difíciles en acuerdos mutuos.
          </p>
        </AnimatedBlock>
        <AnimatedBlock delay={300}>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" className="font-semibold rounded-full px-8 py-6 text-lg bg-white text-black hover:bg-white/90" asChild>
              <a href="#">
                Comprar ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="ghost" className="font-semibold rounded-full px-8 py-6 text-lg text-white hover:bg-white/10" asChild>
              <a href="#">
                <PlayCircle className="mr-2 h-5 w-5" />
                Ver el trailer
              </a>
            </Button>
          </div>
        </AnimatedBlock>
      </div>
    </section>
  );
}
