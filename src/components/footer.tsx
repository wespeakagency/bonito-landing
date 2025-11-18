'use client';

import { useTranslation } from '@/context/language-context';
import { AnimatedBlock } from './animated-block';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <AnimatedBlock animationType='fade-in'>
      <footer className="bg-background py-12">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-center items-center text-muted-foreground">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
        </div>
      </footer>
    </AnimatedBlock>
  );
}
