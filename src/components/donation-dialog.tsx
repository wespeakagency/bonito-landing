'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { useTranslation } from '@/context/language-context';
import { Heart } from 'lucide-react';
import { PayPalIcon } from './icons';

interface DonationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DonationDialog({ isOpen, onClose, onConfirm }: DonationDialogProps) {
  const { t } = useTranslation();

  const handleListen = () => {
    onClose();
  };

  const handleSupport = () => {
    // IMPORTANT: Replace this with Roberto's actual PayPal.me link
    window.open('https://www.paypal.me/your-paypal-username', '_blank');
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
       <DialogContent className="bg-background/80 backdrop-blur-xl border-white/10 sm:max-w-md p-6 shadow-2xl">
        <div className="flex flex-col items-center text-center p-4">
            <div className="bg-primary/10 p-4 rounded-full mb-6">
                <Heart className="w-10 h-10 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-headline font-bold text-foreground mb-4">
              {t('donation.title')}
            </DialogTitle>
            <p className="text-muted-foreground mb-8 max-w-sm">
              {t('donation.subtitle')}
            </p>
            <div className="flex flex-col gap-4 w-full max-w-xs">
              <Button onClick={handleSupport} size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <PayPalIcon className="w-5 h-5 mr-2" />
                {t('donation.supportButton')}
              </Button>
              <Button onClick={handleListen} variant="ghost" size="lg" className="w-full text-muted-foreground hover:bg-white/5">
                {t('donation.listenButton')}
              </Button>
            </div>
          </div>
      </DialogContent>
    </Dialog>
  );
}
