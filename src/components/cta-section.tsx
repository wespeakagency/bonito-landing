'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  ShoppingCart,
  BookOpen,
  Headphones,
  Ellipsis,
  Globe,
} from 'lucide-react';
import { AppleBooksIcon, GooglePlayIcon } from './icons';
import { AnimatedBlock } from './animated-block';
import { useTranslation } from '@/context/language-context';

const allChannels = [
  { nameKey: 'cta.channels.amazon', icon: ShoppingCart, href: '#' },
  { nameKey: 'cta.channels.gandhi', icon: BookOpen, href: '#' },
  { nameKey: 'cta.channels.audible', icon: Headphones, href: '#' },
  { nameKey: 'cta.channels.appleBooks', icon: AppleBooksIcon, href: '#' },
  { nameKey: 'cta.channels.googlePlay', icon: GooglePlayIcon, href: '#' },
  { nameKey: 'cta.channels.international', icon: Globe, href: '#' },
];

const visibleChannels = allChannels.slice(0, 4);

export default function CtaSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-secondary text-foreground py-24 sm:py-32">
      <div className="container mx-auto px-4 text-center">
        <AnimatedBlock animationType="zoom-in">
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-foreground">
            {t('cta.title')}
          </h2>
        </AnimatedBlock>
        <AnimatedBlock animationType="zoom-in" delay={150}>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            {t('cta.subtitle')}
          </p>
        </AnimatedBlock>
        <div className="flex flex-wrap justify-center gap-4">
          {visibleChannels.map((channel, index) => (
            <AnimatedBlock
              key={channel.nameKey}
              delay={300 + index * 100}
              animationType="slide-in-up"
            >
              <Button
                variant="outline"
                size="lg"
                className="bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-transform duration-200 hover:scale-105 rounded-full"
                asChild
              >
                <a href={channel.href}>
                  <channel.icon className="mr-2 h-5 w-5" />
                  {t(channel.nameKey)}
                </a>
              </Button>
            </AnimatedBlock>
          ))}
          <AnimatedBlock
            delay={300 + visibleChannels.length * 100}
            animationType="slide-in-up"
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-transform duration-200 hover:scale-105 rounded-full"
                >
                  <Ellipsis className="mr-2 h-5 w-5" />
                  {t('cta.more')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-background border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground">
                    {t('cta.allStores')}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {allChannels.map((channel) => (
                    <Button
                      key={channel.nameKey}
                      variant="outline"
                      className="justify-start bg-muted/50 border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                      asChild
                    >
                      <a href={channel.href}>
                        <channel.icon className="mr-3 h-5 w-5" />
                        {t(channel.nameKey)}
                      </a>
                    </Button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  );
}
