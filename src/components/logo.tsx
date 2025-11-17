import type { SVGProps } from 'react';
import { BonitoLogo } from '@/components/icons';
import { cn } from '@/lib/utils';

export const Logo = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <BonitoLogo className={cn('text-primary', className)} {...props} />
);
