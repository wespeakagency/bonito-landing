'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { purchaseStoreGroups } from '@/features/purchase/model/stores';
import { trackPurchaseStoreClick } from '@/features/analytics/track';

interface PurchaseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  origin: string;
}

export function PurchaseDialog({ isOpen, onOpenChange, origin }: PurchaseDialogProps) {
  const { translations, locale } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background/80 backdrop-blur-xl border-white/10 sm:max-w-lg p-6 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline font-bold text-foreground text-center mb-2">
            {translations.purchaseDialog.title}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {translations.purchaseDialog.subtitle}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6 pt-4">
          {purchaseStoreGroups.map((group) => (
            <div key={group.type}>
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                {translations.purchaseDialog[group.titleKey]}
              </h3>
              <div className="flex flex-col gap-2">
                {group.stores.map((store) => (
                  <Button
                    key={store.name}
                    variant="outline"
                    size="lg"
                    className="w-full justify-start text-base"
                    asChild
                  >
                    <a
                      href={store.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackPurchaseStoreClick(origin, store.name, group.type, locale)
                      }
                    >
                      {store.name}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
