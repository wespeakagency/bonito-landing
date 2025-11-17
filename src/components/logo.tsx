'use client';

import { BonitoLogo } from '@/components/icons';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => (
  <BonitoLogo className={cn('h-auto', className)} />
);
