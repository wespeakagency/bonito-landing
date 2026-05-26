'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/language-context'; // Updated import
import { AnimatedBlock } from './animated-block';
import { PrivacyPolicyDialog } from './privacy-policy-dialog';
import { Button } from './ui/button';

export default function Footer() {
  const { translations } = useLanguage(); // Updated to use the new language context
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <>
      <PrivacyPolicyDialog isOpen={isPrivacyOpen} onOpenChange={setIsPrivacyOpen} />
      <AnimatedBlock animationType='fade-in'>
        <footer className="bg-background py-12">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-center items-center text-muted-foreground gap-2 sm:gap-4">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} {translations.footer.copyright}
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
