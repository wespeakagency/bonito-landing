'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslation } from '@/context/language-context';

interface PrivacyPolicyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrivacyPolicyDialog({ isOpen, onOpenChange }: PrivacyPolicyDialogProps) {
  const { t } = useTranslation();
  const policyContent = t('privacyPolicy.content', { returnObjects: true }) as string[];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background/80 backdrop-blur-xl border-white/10 sm:max-w-3xl p-6 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline font-bold text-foreground mb-2">
            {t('privacyPolicy.title')}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {t('privacyPolicy.lastUpdated')} {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96 w-full pr-4">
            <div className="text-muted-foreground text-sm space-y-4">
                {policyContent.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
