import { AnimatedBlock } from './animated-block';

const ideas = [
  "No se trata de ganar a toda costa. Se trata de construir puentes, de entender al otro y de encontrar un terreno común. Negociar bonito es, en esencia, un acto de empatía y estrategia.",
];

export default function IdeaSection() {
  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-12">
          {ideas.map((idea, index) => (
            <AnimatedBlock key={index} delay={index * 150}>
              <p className="text-xl md:text-2xl text-center font-headline leading-tight text-foreground">
                {idea}
              </p>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
