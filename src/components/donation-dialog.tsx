'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { useTranslation } from '@/context/language-context';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, X, CreditCard, CheckCircle } from 'lucide-react';
import { PayPalIcon, GooglePayIcon, ApplePayIcon } from './icons';

interface DonationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

type View = 'prompt' | 'payment' | 'success';

export function DonationDialog({ isOpen, onClose, onConfirm }: DonationDialogProps) {
  const { t } = useTranslation();
  const [view, setView] = useState<View>('prompt');

  const handleListen = () => {
    onClose();
  };

  const handleSupport = () => {
    setView('payment');
  };

  const handlePaymentSuccess = () => {
    setView('success');
    setTimeout(() => {
      onConfirm();
      onClose();
    }, 2500);
  };
  
  const handleClose = () => {
    onClose();
    // Reset to initial view after a short delay to allow for exit animation
    setTimeout(() => setView('prompt'), 300);
  }

  const renderContent = () => {
    switch (view) {
      case 'prompt':
        return (
          <motion.div
            key="prompt"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center p-4"
          >
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
                {t('donation.supportButton')}
              </Button>
              <Button onClick={handleListen} variant="ghost" size="lg" className="w-full text-muted-foreground hover:bg-white/5">
                {t('donation.listenButton')}
              </Button>
            </div>
          </motion.div>
        );
      case 'payment':
        return (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="w-full p-4"
          >
            <DialogTitle className="text-2xl font-headline font-bold text-foreground mb-6 text-center">
              {t('donation.paymentTitle')}
            </DialogTitle>
            <div className="space-y-4">
                <Button onClick={handlePaymentSuccess} variant="outline" size="lg" className="w-full justify-start text-base border-border hover:bg-white/5 h-14">
                    <PayPalIcon className="w-6 h-6 mr-4" /> PayPal
                </Button>
                <Button onClick={handlePaymentSuccess} variant="outline" size="lg" className="w-full justify-start text-base border-border hover:bg-white/5 h-14">
                    <GooglePayIcon className="w-6 h-6 mr-4" /> Google Pay
                </Button>
                <Button onClick={handlePaymentSuccess} variant="outline" size="lg" className="w-full justify-start text-base border-border hover:bg-white/5 h-14">
                    <ApplePayIcon className="w-6 h-6 mr-4" /> Apple Pay
                </Button>
                <Button onClick={handlePaymentSuccess} variant="outline" size="lg" className="w-full justify-start text-base border-border hover:bg-white/5 h-14">
                    <CreditCard className="w-6 h-6 mr-4" /> {t('donation.creditCard')}
                </Button>
            </div>
            <Button onClick={() => setView('prompt')} variant="link" size="sm" className="mt-6 mx-auto block text-muted-foreground">
                {t('donation.backButton')}
            </Button>
          </motion.div>
        );
        case 'success':
            return (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="flex flex-col items-center text-center p-4"
              >
                <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
                <DialogTitle className="text-2xl font-headline font-bold text-foreground mb-2">
                  {t('donation.successTitle')}
                </DialogTitle>
                <p className="text-muted-foreground">
                  {t('donation.successSubtitle')}
                </p>
              </motion.div>
            );
        default:
            return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
       <DialogContent className="bg-background/80 backdrop-blur-xl border-white/10 sm:max-w-md p-6 shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">
            {renderContent()}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
