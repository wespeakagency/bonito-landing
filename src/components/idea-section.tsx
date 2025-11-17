import { AnimatedBlock } from './animated-block';

const ideas = [
  "Sin darnos cuenta, negociamos todos los días. No sólo en el trabajo y en el hogar, también con nosotros mismos.",
  "La negociación más tradicional nos conduce a ganar, a centrarnos en nuestra necesidad. Negociar bonito es habitar al otro para comprender también lo que él necesita.",
  "Negociando Bonito propone un nuevo camino: negociar con compasión, con claridad y sobre todo con una profunda comprensión de nuestra contraparte."
];

export default function IdeaSection() {
  return (
    <section className="py-20 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="space-y-12">
          {ideas.map((idea, index) => (
            <AnimatedBlock key={index} delay={index * 150}>
              <p className="text-xl md:text-2xl text-center font-body leading-relaxed text-secondary-foreground">
                {idea}
              </p>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
