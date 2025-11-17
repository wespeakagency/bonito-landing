import Image from 'next/image';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => (
  <Image
    src="/logo.png"
    alt="Bonito Logo"
    width={150}
    height={30}
    className={cn(className)}
    priority
  />
);
