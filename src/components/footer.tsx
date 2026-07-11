'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/language-context';
import { AnimatedBlock } from './animated-block';
import { PrivacyPolicyDialog } from './privacy-policy-dialog';
import { Button } from './ui/button';
import { COPYRIGHT_YEAR } from '@/config/site';

export default function Footer() {
  const { translations } = useLanguage();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <>
      <PrivacyPolicyDialog isOpen={isPrivacyOpen} onOpenChange={setIsPrivacyOpen} />
      <AnimatedBlock animationType='fade-in'>
        <footer className="bg-background py-12">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-center items-center text-muted-foreground gap-2 sm:gap-4">
            <p className="text-sm">
              &copy; {COPYRIGHT_YEAR} {translations.footer.copyright}
            </p>
            <span className="hidden sm:inline-block">·</span>
            <Button 
              variant="link" 
              className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setIsPrivacyOpen(true)}
            >
              {translations.footer.privacyPolicy}
            </Button>
          </div>
        </footer>
      </AnimatedBlock>
    </>
  );
}
