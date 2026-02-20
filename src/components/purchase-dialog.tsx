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

interface PurchaseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const audioStores = [
  { name: 'Odilo', href: 'https://marketplace.odilo.us/opac/?id=08823311#recordCard' },
  { name: 'OverDrive', href: 'https://www.overdrive.com/media/12642146' },
  { name: 'Apple Books', href: 'https://books.apple.com/us/audiobook/negociando-bonito/id1858248569' },
  { name: 'Kobo', href: 'https://www.kobo.com/mx/en/audiobook/negociando-bonito' },
  { name: 'Google Play', href: 'https://play.google.com/store/audiobooks/details?id=AQAAAEDq2hya5M' },
];

const physicalStores = [
    { name: 'Amazon', href: 'https://a.co/d/08Njuvns' },
    { name: 'Thyrso Editorial', href: 'https://thyrsoeditorial.com/producto/negociando-bonito-de-roberto-luna/' },
]

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
        <div className="flex flex-col gap-6 pt-4">
          <div>
            <h3 className="mb-3 text-lg font-semibold text-foreground">{t('purchaseDialog.audiobookTitle')}</h3>
            <div className="flex flex-col gap-2">
              {audioStores.map((store) => (
                <Button
                  key={store.name}
                  variant="outline"
                  size="lg"
                  className="w-full justify-start text-base"
                  asChild
                >
                  <a href={store.href} target="_blank" rel="noopener noreferrer">
                    {store.name}
                  </a>
                </Button>
              ))}
            </div>
          </div>
          <div>
             <h3 className="mb-3 text-lg font-semibold text-foreground">{t('purchaseDialog.physicalBookTitle')}</h3>
            <div className="flex flex-col gap-2">
              {physicalStores.map((store) => (
                <Button
                  key={store.name}
                  variant="outline"
                  size="lg"
                  className="w-full justify-start text-base"
                  asChild
                >
                  <a href={store.href} target="_blank" rel="noopener noreferrer">
                    {store.name}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
