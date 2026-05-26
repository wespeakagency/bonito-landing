'use client';

import Link from 'next/link';
import { BonitoLogo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/language-context';
import { getPathnameForLocale } from '@/lib/i18n';

export const Logo = ({ className }: { className?: string }) => {
  const { locale } = useLanguage();

  return (
    <Link href={getPathnameForLocale('/', locale)}>
      <BonitoLogo className={cn('h-auto', className)} />
    </Link>
  );
};
