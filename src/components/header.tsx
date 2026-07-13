'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { SpainFlag, UKFlag, ChinaFlag, PortugalFlag, IndiaFlag, FranceFlag, GreeceFlag, ItalyFlag } from './icons';
import { LanguageHint } from './language-hint';
import { PurchaseDialog } from '@/features/purchase/components/purchase-dialog';
import { trackPurchaseDialogOpen } from '@/features/analytics/track';
import { type Locale } from '@/lib/i18n';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { translations, changeLanguage, locale } = useLanguage();
  const [showHint, setShowHint] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPurchaseDialogOpen, setPurchaseDialogOpen] = useState(false);

  const openPurchaseDialog = () => {
    trackPurchaseDialogOpen('header_buy', locale);
    setPurchaseDialogOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    const hintTimer = setTimeout(() => setShowHint(true), 1500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(hintTimer);
    };
  }, []);

  const languageOptions = [
    { lang: 'es', flag: SpainFlag, name: 'Español' },
    { lang: 'en', flag: UKFlag, name: 'English' },
    { lang: 'fr', flag: FranceFlag, name: 'Français' },
    { lang: 'zh', flag: ChinaFlag, name: '中文' },
    { lang: 'pt', flag: PortugalFlag, name: 'Português' },
    { lang: 'hi', flag: IndiaFlag, name: 'हिन्दी' },
    { lang: 'el', flag: GreeceFlag, name: 'Ελληνικά' },
    { lang: 'it', flag: ItalyFlag, name: 'Italiano' },
  ];

  const handleMenuOpenChange = (open: boolean) => {
    setIsMenuOpen(open);
    if (open) {
      setShowHint(false);
    }
  };

  return (
    <>
      <PurchaseDialog
        isOpen={isPurchaseDialogOpen}
        onOpenChange={setPurchaseDialogOpen}
        origin="header_buy"
      />
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/80 backdrop-blur-lg border-b border-white/10'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-end items-center h-24">
            <div className="flex items-center gap-2">
              <LanguageHint isVisible={showHint && !isMenuOpen} />
              <div className="relative">
                <DropdownMenu onOpenChange={handleMenuOpenChange}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Globe />
                      <span className="sr-only">{translations.header.changeLanguageSr}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {languageOptions.map(({ lang, flag: Flag, name }) => (
                      <DropdownMenuItem
                        key={lang}
                        onClick={() => changeLanguage(lang as Locale)}
                        disabled={locale === lang}
                        className="flex items-center gap-2"
                      >
                        <Flag className="h-4 w-6 rounded-sm" />
                        <span>{name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Button onClick={openPurchaseDialog} className="bg-white text-black hover:bg-white/90 rounded-full">
                {translations.header.buy}
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
