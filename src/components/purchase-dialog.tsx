'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { useTranslation } from '@/context/language-context';
import { AppleBooksIcon, GooglePlayIcon } from './icons';
import { BookOpen } from 'lucide-react';

interface PurchaseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const stores = [
  { name: 'Odilo', href: 'https://marketplace.odilo.us/opac/?id=08823311#recordCard', icon: BookOpen },
  { name: 'OverDrive', href: 'https://www.overdrive.com/media/12642146', icon: BookOpen },
  { name: 'Apple Books', href: 'https://books.apple.com/us/audiobook/negociando-bonito/id1858248569', icon: AppleBooksIcon },
  { name: 'Kobo', href: 'https://www.kobo.com/mx/en/audiobook/negociando-bonito', icon: BookOpen },
  { name: 'Google Play', href: 'https://play.google.com/store/audiobooks/details?id=AQAAAEDq2hya5M', icon: GooglePlayIcon },
];

export function PurchaseDialog({ isOpen, onOpenChange }: PurchaseDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background/80 backdrop-blur-xl border-white/10 sm:max-w-lg p-6 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline font-bold text-foreground text-center mb-2">
            {t('purchaseDialog.title')}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {t('purchaseDialog.subtitle')}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 pt-4">
          {stores.map((store) => (
            <Button
              key={store.name}
              variant="outline"
              size="lg"
              className="w-full justify-start text-base"
              asChild
            >
              <a href={store.href} target="_blank" rel="noopener noreferrer">
                <store.icon className="mr-3 h-5 w-5" />
                {store.name}
              </a>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
